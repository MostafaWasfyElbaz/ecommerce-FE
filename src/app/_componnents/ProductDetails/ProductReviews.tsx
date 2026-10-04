"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { ProductDetails } from "@/src/types/ProductDetails";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
} from "@/src/api/Actions/reviews.actions";
import { Review, ReviewFormData } from "@/src/types/Review";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ProductReviews({
  product,
}: {
  product: ProductDetails;
}) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const isAdmin = session?.user?.role === "admin";
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number>(0);
  const [editHoverRating, setEditHoverRating] = useState<number | null>(null);
  const [editReviewText, setEditReviewText] = useState<string>("");
  const [editError, setEditError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({});
  const { data: reviewsData } = useQuery({
    queryKey: ["productReviews", product._id],
    queryFn: () => getAllReviews(product._id),
  });

  const reviews = reviewsData || [];
  const selectedRating = useWatch({
    control,
    name: "rating",
    defaultValue: 0,
  });

  const { mutate: addReviewMutation, isPending: isAdding } = useMutation({
    mutationFn: (data: ReviewFormData) => addReview(data, product._id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productReviews", product._id],
      });
      toast.success("Review added successfully");
      reset({ rating: 0, review: "" });
      setShowReviewForm(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add review");
    },
  });

  const { mutate: updateReviewMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReviewFormData }) =>
      updateReview(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productReviews", product._id],
      });
      toast.success("Review updated successfully");
      handleCancelEdit();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update review");
    },
  });

  const { mutate: deleteReviewMutation, isPending: isDeleting } = useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productReviews", product._id],
      });
      toast.success("Review deleted successfully");
      if (editingReviewId) {
        handleCancelEdit();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete review");
    },
  });

  const handleAddReview = (data: ReviewFormData) => {
    if (!data.rating || !data.review || !product._id) return;
    addReviewMutation(data);
  };

  const handleStartEdit = (review: Review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditHoverRating(null);
    setEditReviewText(review.review);
    setEditError(null);
    setShowReviewForm(false);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditRating(0);
    setEditHoverRating(null);
    setEditReviewText("");
    setEditError(null);
  };

  const handleSaveEdit = (reviewId: string) => {
    if (!editRating || editRating < 1) {
      setEditError("Please select a rating");
      return;
    }
    if (!editReviewText || editReviewText.trim().length < 5) {
      setEditError("Review must be at least 5 characters");
      return;
    }
    setEditError(null);
    updateReviewMutation({
      id: reviewId,
      data: { rating: editRating, review: editReviewText.trim() },
    });
  };

  const handleDeleteReview = (
    reviewId: string,
    isOwnReview: boolean = true,
  ) => {
    Swal.fire({
      html: `
      <div class="text-center py-2">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">${isOwnReview ? "Delete Review?" : "Delete Review as Admin?"}</h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          ${
            isOwnReview
              ? "Are you sure you want to delete your review? This action cannot be undone."
              : "Are you sure you want to remove this review? As an admin, this action cannot be undone."
          }
        </p>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions: "px-6 pb-6 pt-0 gap-3 flex flex-row-reverse justify-center",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReviewMutation(reviewId);
      }
    });
  };

  const handleOpenWriteReview = () => {
    if (!session) {
      toast.error("Please login to write a review");
      router.push("/login");
      return;
    }
    setShowReviewForm(true);
  };

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
  }));

  const totalReviews = reviews.length;
  const currentUserReview = reviews.find(
    (review) => (currentUserId && review.user?._id) === currentUserId,
  );

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
          <div className="text-center">
            <div className="mb-2 text-5xl font-bold text-gray-900">
              {product.ratingsAverage}
            </div>

            <div className="text-yellow-400">
              {Array.from({ length: 5 }, (_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={
                    index < Math.round(product.ratingsAverage)
                      ? faStar
                      : farStar
                  }
                  className={
                    index < Math.round(product.ratingsAverage)
                      ? ""
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Based on {product.ratingsQuantity} reviews
            </p>
          </div>

          <div className="w-full flex-1">
            {ratingCounts.map(({ rating, count }) => {
              const percentage =
                totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

              return (
                <div key={rating} className="mb-2 flex items-center gap-3">
                  <span className="w-8 text-sm text-gray-600">
                    {rating} star
                  </span>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <span className="w-10 text-sm text-gray-500">
                    {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-6">
          {totalReviews > 0 && (
            <div className="space-y-4">
              {reviews.map((review) => {
                const isOwner =
                  (currentUserId && review.user?._id) === currentUserId;
                const canDelete = isOwner || isAdmin;
                const isEditingThis = editingReviewId === review._id;

                return (
                  <div
                    key={review._id}
                    className={`rounded-xl border transition-all duration-200 ${
                      isOwner
                        ? "border-[#16a34a]/30 bg-green-50/20 p-5 shadow-xs"
                        : "border-gray-100 bg-gray-50 p-5"
                    }`}
                  >
                    {isEditingThis ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                          <span className="text-sm font-semibold text-gray-900">
                            Edit Your Review
                          </span>
                          <span className="text-xs text-gray-500">
                            Updating your rating & feedback
                          </span>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-gray-700">
                            Your Rating
                          </label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const isFilled =
                                star <=
                                (editHoverRating !== null
                                  ? editHoverRating
                                  : editRating);

                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setEditRating(star)}
                                  onMouseEnter={() => setEditHoverRating(star)}
                                  onMouseLeave={() => setEditHoverRating(null)}
                                  className="cursor-pointer text-xl transition-transform hover:scale-110 focus:outline-none"
                                  aria-label={`Rate ${star} out of 5 stars`}
                                >
                                  <FontAwesomeIcon
                                    icon={isFilled ? faStar : farStar}
                                    className={
                                      isFilled
                                        ? "text-yellow-400"
                                        : "text-gray-300 hover:text-yellow-200"
                                    }
                                  />
                                </button>
                              );
                            })}
                            {editRating > 0 && (
                              <span className="ml-2 text-xs font-medium text-gray-600">
                                {editRating} / 5
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-gray-700">
                            Your Review
                          </label>
                          <textarea
                            rows={3}
                            value={editReviewText}
                            onChange={(e) => setEditReviewText(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                            placeholder="Update your review..."
                          />
                          {editError && (
                            <p className="mt-1 text-xs text-red-500">
                              {editError}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(review._id)}
                            disabled={isUpdating}
                            className="cursor-pointer rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d] disabled:opacity-50"
                          >
                            {isUpdating ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={isUpdating}
                            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900">
                                {review.user.name}
                              </h4>
                              {isOwner && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-[#16a34a]">
                                  Your Review
                                </span>
                              )}
                              {isAdmin && !isOwner && (
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-medium text-purple-700">
                                  Admin
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-yellow-400">
                              {Array.from({ length: 5 }, (_, index) => (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={
                                    index < review.rating ? faStar : farStar
                                  }
                                  className={
                                    index < review.rating ? "" : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>

                            {canDelete && (
                              <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
                                {isOwner && (
                                  <button
                                    type="button"
                                    onClick={() => handleStartEdit(review)}
                                    disabled={isDeleting || isUpdating}
                                    className="cursor-pointer rounded-md p-1.5 text-gray-400 transition-colors hover:bg-green-50 hover:text-[#16a34a]"
                                    title="Edit review"
                                    aria-label="Edit review"
                                  >
                                    <FontAwesomeIcon
                                      icon={faPen}
                                      className="text-xs"
                                    />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteReview(review._id, isOwner)
                                  }
                                  disabled={isDeleting || isUpdating}
                                  className="cursor-pointer rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                  title={
                                    isAdmin && !isOwner
                                      ? "Delete review (Admin)"
                                      : "Delete review"
                                  }
                                  aria-label={
                                    isAdmin && !isOwner
                                      ? "Delete review (Admin)"
                                      : "Delete review"
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-xs"
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="leading-relaxed text-gray-600">
                          {review.review}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {showReviewForm ? (
            <form
              onSubmit={handleSubmit(handleAddReview)}
              className="rounded-lg bg-gray-50 p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Write a Review
              </h3>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Your Rating
                </label>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled =
                      star <=
                      (hoverRating !== null ? hoverRating : selectedRating);

                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setValue("rating", star, { shouldValidate: true });
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="cursor-pointer text-2xl transition-transform hover:scale-110 focus:outline-none"
                        aria-label={`Rate ${star} out of 5 stars`}
                      >
                        <FontAwesomeIcon
                          icon={isFilled ? faStar : farStar}
                          className={
                            isFilled
                              ? "text-yellow-400"
                              : "text-gray-300 hover:text-yellow-200"
                          }
                        />
                      </button>
                    );
                  })}

                  {selectedRating > 0 && (
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      {selectedRating} / 5
                    </span>
                  )}
                </div>
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="review"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Your Review
                </label>

                <textarea
                  id="review"
                  rows={5}
                  {...register("review", {
                    required: "Please write a review",
                    minLength: {
                      value: 5,
                      message: "Review must be at least 5 characters",
                    },
                  })}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-black outline-none focus:ring-1 ${
                    errors.review
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#16a34a] focus:ring-[#16a34a]"
                  }`}
                  placeholder="Write your review..."
                />
                {errors.review && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.review.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isAdding || isSubmitting}
                  className="cursor-pointer rounded-lg bg-[#16a34a] px-6 py-3 font-medium text-white hover:bg-[#15803d] disabled:opacity-50"
                >
                  {isAdding || isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset({ rating: 0, review: "" });
                    setShowReviewForm(false);
                  }}
                  className="cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : currentUserReview ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-center">
              <p className="text-sm text-gray-600">
                You have already reviewed this product.
              </p>
              <button
                type="button"
                onClick={() => handleStartEdit(currentUserReview)}
                className="cursor-pointer mt-2 inline-flex items-center gap-2 rounded-lg border border-[#16a34a] bg-white px-4 py-2 text-sm font-medium text-[#16a34a] transition-all hover:bg-green-50"
              >
                <FontAwesomeIcon icon={faPen} className="text-xs" />
                Edit Your Review
              </button>
            </div>
          ) : totalReviews === 0 ? (
            <div className="py-8 text-center">
              <FontAwesomeIcon
                icon={farStar}
                className="mb-3 text-4xl text-gray-300"
              />

              <p className="text-gray-500">
                Customer reviews will be displayed here.
              </p>

              <button
                type="button"
                onClick={handleOpenWriteReview}
                className="cursor-pointer mt-4 font-medium text-[#16a34a] hover:text-[#15803d]"
              >
                Write a Review
              </button>
            </div>
          ) : (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleOpenWriteReview}
                className="cursor-pointer rounded-lg bg-[#16a34a] px-6 py-3 font-medium text-white hover:bg-[#15803d]"
              >
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
