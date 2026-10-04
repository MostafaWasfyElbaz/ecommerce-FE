"use client";

import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/src/app/_componnents/Products/ProductCard";
import { Product } from "@/src/types/Product";

export default function SimilarProductSlider({
  products,
}: {
  products: Product[];
}) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!products?.length) {
    return null;
  }

  return (
    <section id="similar-products" className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-700" />

            <h2 className="text-2xl font-bold text-gray-800">
              You May Also <span className="text-emerald-600">Like</span>
            </h2>
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous products"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#f0fdf4] hover:text-[#16a34a] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gray-100 disabled:hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span className="sr-only">Previous</span>
            </button>

            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              disabled={isEnd}
              aria-label="Next products"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#f0fdf4] hover:text-[#16a34a] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gray-100 disabled:hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faChevronRight} />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        <div className="py-1">
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 16,
              },
            }}
            onSwiper={(s) => {
              setSwiper(s);
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            onSlideChange={(s) => {
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            className="w-full"
          >
            {products.map((item) => (
              <SwiperSlide key={item._id || item.id} className="h-auto">
                <ProductCard product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
