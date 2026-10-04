"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBagShopping,
  faBoxOpen,
  faCartShopping,
  faCheck,
  faLock,
  faMinus,
  faPlus,
  faShieldHalved,
  faTag,
  faTrash,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCart,
  deleteCartItem,
  GetCart,
  updateCartQuantity,
} from "@/src/api/Actions/cart.actions";
import { CartProduct } from "@/src/types/Cart";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Cart() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["GetCart"],
    queryFn: GetCart,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 0,
  });

  const { mutate: updateQuantity } = useMutation({
    mutationFn: ({ productId, count }: { productId: string; count: number }) =>
      updateCartQuantity(productId, count),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update quantity");
    },
    onSettled: () => {
      setUpdatingItemId(null);
    },
  });

  const { mutate: delCartItem } = useMutation({
    mutationFn: (productId: string) => deleteCartItem(productId),
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove item");
    },
    onSettled: () => {
      setUpdatingItemId(null);
    },
  });

  const { mutate: delCart, isPending: isClearing } = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });

      Swal.fire({
        html: `
          <div class="text-center py-2">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Cart Cleared!</h3>
            <p class="text-gray-500 text-sm">Your cart is now empty.</p>
          </div>
        `,
        showConfirmButton: true,
        confirmButtonText: "Continue Shopping",
        showCancelButton: false,
        buttonsStyling: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "rounded-2xl shadow-2xl border-0 p-0",
          htmlContainer: "p-6 m-0",
          actions: "px-6 pb-6 pt-0 w-full flex justify-center",
          confirmButton:
            "bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 px-6 rounded-xl transition-all w-full cursor-pointer",
          timerProgressBar: "bg-[#16a34a]",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to clear cart");
    },
  });

  const itemsCount = data?.numOfCartItems ?? data?.data?.products?.length ?? 0;
  const subtotal = Number(data?.data?.totalCartPrice) || 0;
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

  function handleIncreaseQuantity(item: CartProduct) {
    const productId = item.product?._id;
    if (!productId) return;
    if (item.count >= (item.product?.quantity ?? 0)) return;
    setUpdatingItemId(productId);
    updateQuantity({ productId, count: item.count + 1 });
  }

  function handleDecreaseQuantity(item: CartProduct) {
    const productId = item.product?._id;
    if (!productId) return;
    if (item.count <= 1) return;
    setUpdatingItemId(productId);
    updateQuantity({ productId, count: item.count - 1 });
  }

  function removeItem(productId: string) {
    setUpdatingItemId(productId);
    delCartItem(productId);
  }

  function clearCart() {
    delCart();
  }

  function confirmClearCart() {
    Swal.fire({
      html: `
        <div class="text-center py-2">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center">
            <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Clear Your Cart?</h3>
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
            All items will be removed from your cart. This action cannot be undone.
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, Clear All",
      cancelButtonText: "Keep Shopping",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions: "px-6 pb-6 pt-0 gap-3 flex flex-row-reverse justify-center",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-red-500/20 cursor-pointer",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
      }
    });
  }

  function confirmRemoveItem(productId: string, title: string) {
    Swal.fire({
      html: `
        <div class="text-center py-2">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Remove Item?</h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            Remove <span class="font-semibold text-gray-700">${title}</span> from your cart?
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
        removeItem(productId);
      }
    });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#16a34a]" />
      </div>
    );
  }

  if (
    !data ||
    !data.data ||
    !data.data.products ||
    data.data.products.length === 0
  ) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-[#16a34a]">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-gray-900">Shopping Cart</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-[#16a34a] to-[#15803d] text-white">
                  <FontAwesomeIcon icon={faCartShopping} />
                </span>
                Shopping Cart
              </h1>

              <p className="mt-2 text-gray-500">
                You have{" "}
                <span className="font-semibold text-[#16a34a]">
                  {itemsCount} {itemsCount === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {data.data.products.map((item) => {
                const productId = item.product?._id;
                const isUpdating = updatingItemId === productId;
                return (
                  <div
                    key={item._id}
                    className={`relative rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
                      isUpdating ? "opacity-60" : ""
                    }`}
                  >
                    {isUpdating && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 rounded-2xl flex items-center justify-center">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
                          <div className="w-4 h-4 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm font-medium text-gray-600">
                            Updating...
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 sm:p-5">
                      <div className="flex gap-4 sm:gap-6">
                        <Link
                          href={`/products/${productId}`}
                          className="group relative shrink-0"
                        >
                          <div className="h-28 w-28 overflow-hidden rounded-xl border border-gray-100 bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 sm:h-32 sm:w-32">
                            <Image
                              src={
                                item.product?.imageCover ||
                                "/images/placeholder.png"
                              }
                              alt={item.product?.title || "Product image"}
                              width={128}
                              height={128}
                              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>

                          <div className="absolute -right-1 -bottom-1 flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-[8px]"
                            />
                            In Stock
                          </div>
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="mb-3">
                            <Link
                              href={`/products/${productId}`}
                              className="group/title"
                            >
                              <h3 className="text-base leading-relaxed font-semibold text-gray-900 transition-colors group-hover/title:text-[#16a34a] sm:text-lg">
                                {item.product?.title}
                              </h3>
                            </Link>

                            {item.product?.category?.name && (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="inline-block rounded-full bg-linear-to-r from-[#f0fdf4] to-emerald-50 px-2.5 py-1 text-xs font-medium text-[#15803d]">
                                  {item.product.category.name}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg font-bold text-[#16a34a]">
                                {item.price.toLocaleString()} EGP
                              </span>

                              <span className="text-xs text-gray-400">
                                per unit
                              </span>
                            </div>
                          </div>

                          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center">
                              <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
                                <button
                                  type="button"
                                  onClick={() => handleDecreaseQuantity(item)}
                                  disabled={isUpdating || item.count <= 1}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    className="text-xs"
                                  />
                                </button>

                                <span className="w-12 text-center font-bold text-gray-900">
                                  {item.count}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => handleIncreaseQuantity(item)}
                                  disabled={
                                    isUpdating ||
                                    item.count >= (item.product?.quantity ?? 0)
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#16a34a] text-white shadow-sm shadow-[#16a34a]/30 transition-all hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className="text-xs"
                                  />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="mb-0.5 text-xs text-gray-400">
                                  Total
                                </p>

                                <p className="text-xl font-bold text-gray-900">
                                  {(item.price * item.count).toLocaleString()}{" "}
                                  <span className="text-sm font-medium text-gray-400">
                                    EGP
                                  </span>
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  productId &&
                                  confirmRemoveItem(
                                    productId,
                                    item.product?.title,
                                  )
                                }
                                disabled={isUpdating}
                                className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Remove item"
                                aria-label="Remove from cart"
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="text-sm"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium text-[#16a34a] hover:text-[#15803d]"
              >
                <span>←</span>
                Continue Shopping
              </Link>

              <button
                type="button"
                onClick={confirmClearCart}
                disabled={isClearing}
                className="cursor-pointer group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-xs transition-transform group-hover:scale-110"
                />

                <span>Clear all items</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  <FontAwesomeIcon icon={faBagShopping} />
                  Order Summary
                </h2>

                <p className="mt-1 text-sm text-[#dcfce7]">
                  {" " + itemsCount}
                  {itemsCount === 1 ? " item " : " items "} in your cart
                </p>
              </div>

              <div className="space-y-5 p-6">
                {shipping === 0 ? (
                  <div className="flex items-center gap-3 rounded-xl bg-linear-to-r from-green-50 to-emerald-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="text-green-600"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-green-700">
                        Free Shipping!
                      </p>

                      <p className="text-sm text-green-600">
                        You qualify for free delivery
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-linear-to-r from-orange-50 to-amber-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="text-orange-500"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Add
                        {(500 - subtotal).toLocaleString()} EGP for free
                        shipping
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-orange-100">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-orange-400 to-amber-400 transition-all duration-500"
                        style={{
                          width: `${Math.min((subtotal / 500) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>

                    <span className="font-medium text-gray-900">
                      {subtotal.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>

                    <span
                      className={
                        shipping === 0
                          ? "font-medium text-green-600"
                          : "font-medium text-gray-900"
                      }
                    >
                      {shipping === 0 ? "FREE" : `${shipping} EGP`}
                    </span>
                  </div>

                  <div className="mt-3 border-t border-dashed border-gray-200 pt-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-gray-900">Total</span>

                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {total.toLocaleString()}
                        </span>

                        <span className="ml-1 text-sm text-gray-500">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-gray-600 transition-all hover:border-[#4ade80] hover:bg-[#f0fdf4] hover:text-[#16a34a]"
                >
                  <FontAwesomeIcon icon={faTag} />

                  <span className="text-sm font-medium">Apply Promo Code</span>
                </button>

                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4 font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition-all hover:from-[#15803d] hover:to-[#14532d] active:scale-[0.98]"
                >
                  <FontAwesomeIcon icon={faLock} />

                  <span>Secure Checkout</span>
                </Link>

                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="text-green-500"
                    />

                    <span>Secure Payment</span>
                  </div>

                  <div className="h-4 w-px bg-gray-200" />

                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FontAwesomeIcon icon={faTruck} className="text-blue-500" />

                    <span>Fast Delivery</span>
                  </div>
                </div>

                <Link
                  href="/"
                  className="block py-2 text-center text-sm font-medium text-[#16a34a] hover:text-[#15803d]"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-gray-100 to-gray-50">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="text-5xl text-gray-300"
            />
          </div>

          <div className="absolute -bottom-2 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-gray-100 blur-md" />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h2>

        <p className="mb-8 leading-relaxed text-gray-500">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#16a34a] to-[#15803d] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition-all hover:from-[#15803d] hover:to-[#14532d] active:scale-[0.98]"
        >
          Start Shopping
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </Link>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="mb-4 text-sm text-gray-400">Popular Categories</p>

          <div className="flex flex-wrap justify-center gap-2">
            {["Electronics", "Fashion", "Home", "Beauty"].map((category) => (
              <Link
                key={category}
                href="/categories"
                className="rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
