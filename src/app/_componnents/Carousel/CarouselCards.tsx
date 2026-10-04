import { CarouselSlide } from "@/src/types/Carousel";
import Image from "next/image";
import Link from "next/link";

export default function CarouselCards({ slide }: { slide: CarouselSlide }) {
  return (
    <div className="relative h-full w-full shrink-0 overflow-hidden">
      <Image
        src={slide.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50" />

      <div className="relative z-10 mx-auto flex h-full w-full items-center px-6 py-20 text-white sm:px-10 lg:px-12">
        <div className="container h-full content-center text-white p-12">
          <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
            {slide.title}
          </h2>

          <p className="mt-4 text-[15px] font-normal sm:text-[16px]">
            {slide.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href={slide.primaryHref}
              className="inline-flex h-10.5 items-center justify-center rounded-md bg-white px-5 text-[14px] font-semibold text-[#16a34a] transition-all duration-200 hover:scale-[1.05] "
            >
              {slide.primaryText}
            </Link>

            <Link
              href={slide.secondaryHref}
              className="inline-flex h-10.5 items-center justify-center rounded-md border-2 border-white/50 bg-transparent px-5 text-[14px] font-semibold  text-gray-50 transition-all duration-200 hover:scale-[1.05] "
            >
              {slide.secondaryText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
