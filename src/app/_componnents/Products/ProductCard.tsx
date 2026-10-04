"use client";

import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import AddToCartButton from "@/src/app/_componnents/Buttons/CartBtn";
import AddWishlistBtn from "@/src/app/_componnents/Buttons/WishlistBtn";

export default function ProductCard({ product }: { product: Product }) {
  function handleRefresh() {}
  return (
    <article className="product-card relative z-0 overflow-hidden rounded-lg border border-gray-200 bg-white hover:z-10">
      <div className="relative">
        <Image
          className="h-52 w-full bg-white object-contain sm:h-60"
          alt={product.title}
          src={product.imageCover}
          width={600}
          height={600}
        />
        {product.priceAfterDiscount && (
          <div className="absolute left-3 top-3">
            <span className="rounded bg-red-500 px-2 py-1 text-xs text-white">
              -
              {Math.round(
                ((product.price - product.priceAfterDiscount) / product.price) *
                  100,
              )}
              %
            </span>
          </div>
        )}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <AddWishlistBtn
            productId={product._id || product.id}
            variant="icon"
          />

          <button
            onClick={handleRefresh}
            type="button"
            className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:text-[#16a34a]"
            title="Compare product"
            aria-label={`Compare ${product.title}`}
          >
            <FontAwesomeIcon icon={faArrowsRotate} className="h-4 w-4" />
          </button>

          <Link
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:text-[#16a34a]"
            href={`/products/${product.id}`}
            title="View product"
            aria-label={`View ${product.title}`}
          >
            <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-1 text-xs text-gray-500">
          {product.category.name}
        </div>

        <h3 className="mb-1 font-medium" title={product.title}>
          <Link
            className="line-clamp-2 text-black"
            href={`/products/${product.id}`}
          >
            {product.title}
          </Link>
        </h3>

        <div className="mb-2 flex items-center">
          <div
            className="mr-2 flex text-yellow-400"
            aria-label={`${product.ratingsAverage} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="text-sm">
                {index + 1 <= Math.round(product.ratingsAverage) ? "★" : "☆"}
              </span>
            ))}
          </div>

          <span className="text-xs text-gray-500">
            {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {product.priceAfterDiscount ? (
              <>
                <span className="text-lg font-bold text-[#16a34a]">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                {product.price} EGP
              </span>
            )}
          </div>
          <AddToCartButton variant="small" productId={product.id} />
        </div>
      </div>
    </article>
  );
}
