"use client";

import { useState } from "react";
import CarouselCards from "./CarouselCards";
import { CarouselSlide } from "@/src/types/Carousel";
import homeSlider from "@/src/assets/images/home-slider-1.d79601a8.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: homeSlider.src,
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    primaryText: "Shop Now",
    primaryHref: "/products",
    secondaryText: "View Deals",
    secondaryHref: "/deals",
  },
  {
    id: 2,
    image: homeSlider.src,
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    primaryText: "Shop Now",
    primaryHref: "/products",
    secondaryText: "Learn More",
    secondaryHref: "/about",
  },
  {
    id: 3,
    image: homeSlider.src,
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    primaryText: "Order Now",
    primaryHref: "/products",
    secondaryText: "Delivery Info",
    secondaryHref: "/delivery",
  },
];

export default function HeroCarousel() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-82.5 sm:h-95 md:h-105 lg:h-112.5">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="h-full w-full"
        >
          {slides.map((item) => (
            <SwiperSlide key={item.id} className="h-full">
              <CarouselCards slide={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          aria-label="Previous slide"
          className="cursor-pointer absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-green-500 hover:text-green-600 w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          aria-label="Next slide"
          className="cursor-pointer absolute right-5 top-1/2 z-20 -translate-y-1/2 bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => swiper?.slideToLoop(index)}
              className={`cursor-pointer h-2 rounded-full transition-all duration-200 hover:scale-120 ${
                index === active ? "w-6 bg-white" : "w-2 bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
