"use client";

import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ProductImagesProps {
  images: string[];
  title: string;
}

export default function ProductImages({ images, title }: ProductImagesProps) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleSelectImage = (index: number) => {
    setActiveIndex(index);
    mainSwiper?.slideTo(index);
    thumbSwiper?.slideTo(index);
  };

  return (
    <div id="product-images" className="lg:w-1/4">
      <div className="sticky top-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="relative select-none">
          <div className="relative overflow-hidden text-center leading-none">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              onSwiper={setMainSwiper}
              onSlideChange={(s) => {
                setActiveIndex(s.activeIndex);
                thumbSwiper?.slideTo(s.activeIndex);
              }}
              className="w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={`${image}-${index}`}>
                  <div className="relative flex items-center justify-center">
                    <Image
                      src={image}
                      alt={`${title} ${index + 1}`}
                      width={600}
                      height={600}
                      priority={index === 0}
                      className="block h-auto max-h-[calc(100vh-80px)] max-w-full w-full object-contain align-middle"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {images.length > 1 && (
            <div className="mt-4">
              <Swiper
                spaceBetween={8}
                slidesPerView="auto"
                watchSlidesProgress
                onSwiper={setThumbSwiper}
                className="w-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={`${image}-${index}`}
                    className="w-20! shrink-0 cursor-pointer"
                  >
                    <button
                      type="button"
                      tabIndex={0}
                      aria-pressed={activeIndex === index}
                      aria-label={`Go to image ${index + 1}`}
                      onClick={() => handleSelectImage(index)}
                      className={`cursor-pointer group block w-20 overflow-hidden rounded-lg border-2 p-1 transition-all duration-200 outline-none ${
                        activeIndex === index
                          ? "border-[#16a34a] shadow-sm"
                          : "border-transparent hover:border-gray-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${title} thumb ${index + 1}`}
                        width={80}
                        height={80}
                        loading="lazy"
                        className="block h-16 w-full object-contain align-middle"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
