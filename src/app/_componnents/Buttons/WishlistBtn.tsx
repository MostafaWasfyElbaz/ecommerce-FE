"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "@/src/api/Actions/wishlist.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useSession } from "next-auth/react";

export default function AddWishlistBtn({
  productId,
  variant = "icon",
  className = "",
}: {
  productId: string;
  variant?: "icon" | "large";
  className?: string;
}) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["GetWishlist"],
    queryFn: getWishlist,
    enabled: !!session,
    staleTime: 1000 * 60,
    retry: false,
  });

  const isInWishlist = Boolean(
    data?.some((item) => item._id === productId || item.id === productId),
  );

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: () => addToWishlist(productId),
    onSuccess: () => {
      toast.success("Added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["GetWishlist"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add to wishlist");
    },
  });

  const { mutate: removeMutate, isPending: isRemoving } = useMutation({
    mutationFn: () => removeFromWishlist(productId),
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["GetWishlist"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove from wishlist");
    },
  });

  const isLoading = isAdding || isRemoving;

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    if (isInWishlist) {
      removeMutate();
    } else {
      addMutate();
    }
  }

  if (variant === "large") {
    return (
      <button
        type="button"
        disabled={isLoading}
        onClick={handleToggleWishlist}
        className={`cursor-pointer flex-1 flex items-center gap-2 justify-center rounded-xl border-2 px-4 py-3 font-medium transition ${
          isInWishlist
            ? "text-red-600 border-red-200 bg-red-50 hover:bg-red-100"
            : "border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-500 hover:bg-red-50/50"
        } ${className}`}
      >
        {isLoading ? (
          <PulseLoader color={isInWishlist ? "#ef4444" : "#6b7280"} size={6} />
        ) : (
          <>
            <FontAwesomeIcon
              icon={isInWishlist ? faHeartSolid : faHeartRegular}
              className={isInWishlist ? "text-red-500" : ""}
            />
            <span>{isInWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleToggleWishlist}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm transition ${
        isInWishlist
          ? "text-red-500 hover:scale-110"
          : "text-gray-600 hover:text-red-500 hover:scale-110"
      } ${className}`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isLoading ? (
        <PulseLoader color="#ef4444" size={4} />
      ) : (
        <FontAwesomeIcon
          icon={isInWishlist ? faHeartSolid : faHeartRegular}
          className="h-4 w-4"
        />
      )}
    </button>
  );
}
