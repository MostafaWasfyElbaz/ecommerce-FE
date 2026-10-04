"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faBolt,
  faMinus,
  faPlus,
  faShareNodes,
  faShieldHalved,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/src/types/Product";
import ProductImages from "./ProductImages";
import AddToCartButton from "@/src/app/_componnents/Buttons/CartBtn";
import AddWishlistBtn from "@/src/app/_componnents/Buttons/WishlistBtn";

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section id="product-detail" className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 lg:flex-row">
          <ProductImages images={product.images} title={product.title} />

          <div id="product-info" className="lg:w-3/4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap gap-2">
                <Link
                  className="rounded-full bg-[#f0fdf4] px-3 py-1.5 text-xs text-[#15803d] transition hover:bg-[#dcfce7]"
                  href={`/categories/${product.category._id}`}
                >
                  {product.category.name}
                </Link>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
                  {product.brand.name}
                </span>
              </div>

              <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
                {product.title}
              </h1>

              <div className="mb-4 flex items-center gap-3">
                <div
                  className="text-yellow-400"
                  aria-label={`${product.ratingsAverage} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className={
                        index < Math.round(product.ratingsAverage)
                          ? ""
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <span className="text-sm text-gray-600">
                  {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                </span>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                {product.priceAfterDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">
                      {product.priceAfterDiscount} EGP
                    </span>

                    <span className="text-sm text-gray-500 line-through">
                      {product.price} EGP
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price} EGP
                  </span>
                )}
              </div>

              <div className="mb-6 flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  In Stock
                </span>
              </div>

              <div className="mb-6 border-t border-gray-100 pt-5">
                <p className="leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Quantity
                </label>

                <div className="flex items-center gap-4">
                  <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-200">
                    <button
                      onClick={decreaseQuantity}
                      type="button"
                      disabled={quantity === 1}
                      className="cursor-pointer px-4 py-3 text-gray-600 transition hover:bg-gray-100 hover:text-[#16a34a] disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>

                    <input
                      min="1"
                      max={product.quantity}
                      className="text-black w-16 border-0 text-center text-lg font-medium focus:outline-none focus:ring-0"
                      value={quantity}
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value >= 1 && value <= product.quantity) {
                          setQuantity(value);
                        }
                      }}
                    />

                    <button
                      onClick={increaseQuantity}
                      type="button"
                      disabled={quantity === product.quantity}
                      className="cursor-pointer px-4 py-3 text-gray-600 transition hover:bg-gray-100 hover:text-[#16a34a] disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  <span className="text-sm text-gray-500">
                    {product.quantity} available
                  </span>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Price:</span>

                  <span className="text-2xl font-bold text-[#16a34a]">
                    {(
                      (product.priceAfterDiscount ?? product.price) * quantity
                    ).toFixed(2)}{" "}
                    EGP
                  </span>
                </div>
              </div>

              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton productId={product._id} variant="large" />

                <button
                  type="button"
                  className="cursor-pointer flex-1 rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faBolt} />
                    Buy Now
                  </span>
                </button>
              </div>

              <div className="mb-6 flex gap-3">
                <AddWishlistBtn
                  productId={product._id || product.id}
                  variant="large"
                />

                <button
                  type="button"
                  className="cursor-pointer rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition hover:border-[#86efac] hover:text-[#16a34a]"
                >
                  <FontAwesomeIcon icon={faShareNodes} />
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                      <FontAwesomeIcon icon={faTruckFast} />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Free Delivery
                      </h4>
                      <p className="text-xs text-gray-500">Orders over $50</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                      <FontAwesomeIcon icon={faArrowRotateLeft} />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        30 Days Return
                      </h4>
                      <p className="text-xs text-gray-500">Money back</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Secure Payment
                      </h4>
                      <p className="text-xs text-gray-500">100% Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
