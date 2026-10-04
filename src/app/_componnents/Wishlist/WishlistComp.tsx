"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faCartShopping,
  faTrash,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWishlist,
  removeFromWishlist,
} from "@/src/api/Actions/wishlist.actions";
import { addToCart, GetCart } from "@/src/api/Actions/cart.actions";
import { Product } from "@/src/types/Product";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function WishlistComp() {
  const queryClient = useQueryClient();
  const [addingCartId, setAddingCartId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addedProductIds, setAddedProductIds] = useState<string[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["GetWishlist"],
    queryFn: getWishlist,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 0,
    retry: false,
  });

  const { data: cartData } = useQuery({
    queryKey: ["GetCart"],
    queryFn: GetCart,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 0,
    retry: false,
  });

  const { mutate: removeWishlistItem } = useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["GetWishlist"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove item");
    },
    onSettled: () => {
      setRemovingId(null);
    },
  });

  const { mutate: addItemToCart } = useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });
    },
    onError: (error: Error, productId: string) => {
      setAddedProductIds((prev) => prev.filter((id) => id !== productId));
      toast.error(error.message || "Failed to add to cart");
    },
    onSettled: () => {
      setAddingCartId(null);
    },
  });

  function handleAddToCart(productId: string) {
    setAddingCartId(productId);
    setAddedProductIds((prev) =>
      prev.includes(productId) ? prev : [...prev, productId],
    );
    addItemToCart(productId);
  }

  const isInCart = (productId: string) => {
    return (
      addedProductIds.includes(productId) ||
      Boolean(
        cartData?.data?.products?.some(
          (p) =>
            p.product?._id === productId ||
            p.product?.id === productId ||
            (typeof p.product === "string" &&
              (p.product as string) === productId),
        ),
      )
    );
  };

  function confirmRemoveItem(productId: string, title: string) {
    Swal.fire({
      html: `
        <div class="text-center py-2">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Remove from Wishlist?</h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            Remove <span class="font-semibold text-gray-700">${title}</span> from your wishlist?
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Remove",
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
        setRemovingId(productId);
        removeWishlistItem(productId);
      }
    });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50/50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#16a34a]" />
      </div>
    );
  }

  const items: Product[] = data || [];
  const itemCount = items.length;

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-sm mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={faHeartRegular}
                className="text-3xl text-gray-400"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Browse products and save your favorites here.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors"
                href="/products"
              >
                Browse Products
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link className="hover:text-[#16a34a] transition-colors" href="/">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  className="text-xl text-red-500"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  My Wishlist
                </h1>
                <p className="text-gray-500 text-sm">
                  {itemCount} {itemCount === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((item) => {
              const productId = item._id || item.id;
              const isRemoving = removingId === productId;
              const isAdding = addingCartId === productId;
              const inCart = isInCart(productId);

              return (
                <div
                  key={productId}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                >
                  <div className="md:col-span-6 flex items-center gap-4">
                    <Link
                      className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center"
                      href={`/products/${productId}`}
                    >
                      <Image
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                        src={item.imageCover}
                        width={80}
                        height={80}
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        className="font-medium text-gray-900 hover:text-[#16a34a] transition-colors line-clamp-2"
                        href={`/products/${productId}`}
                      >
                        {item.title}
                      </Link>
                      {item.category?.name && (
                        <p className="text-sm text-gray-400 mt-1">
                          {item.category.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                    <span className="md:hidden text-sm text-gray-500">
                      Price:
                    </span>
                    <div className="text-right md:text-center">
                      <div className="font-semibold text-gray-900">
                        {item.priceAfterDiscount ? (
                          <>
                            <span>{item.priceAfterDiscount} EGP</span>
                            <span className="ml-1 text-xs text-gray-400 line-through">
                              {item.price} EGP
                            </span>
                          </>
                        ) : (
                          <span>{item.price} EGP</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex md:justify-center">
                    <span className="md:hidden text-sm text-gray-500 mr-2">
                      Status:
                    </span>
                    {inCart ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="text-[10px]"
                        />
                        In Cart
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        In Stock
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                    {inCart ? (
                      <Link
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                        href="/cart"
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-xs text-green-600"
                        />
                        <span className="md:hidden lg:inline">View Cart</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled={isAdding}
                        onClick={() => handleAddToCart(productId)}
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-[#16a34a] text-white hover:bg-[#15803d] disabled:opacity-50 cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="text-xs"
                        />
                        <span className="md:hidden lg:inline">
                          {isAdding ? "Adding..." : "Add to Cart"}
                        </span>
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={isRemoving}
                      onClick={() => confirmRemoveItem(productId, item.title)}
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50 cursor-pointer"
                      title="Remove"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            className="text-gray-500 hover:text-[#16a34a] text-sm font-medium transition-colors"
            href="/products"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
