import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/src/types/Brands";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/products?brand=${brand._id}`}
      className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl sm:p-5"
    >
      <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-4">
        <Image
          src={brand.image}
          alt={brand.name}
          width={200}
          height={200}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <h3 className="truncate text-center text-sm font-semibold text-gray-900 transition-colors group-hover:text-violet-600">
        {brand.name}
      </h3>

      <div className="mt-1.5 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <span className="flex items-center gap-1 text-xs text-violet-600">
          View Products
          <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
        </span>
      </div>
    </Link>
  );
}
