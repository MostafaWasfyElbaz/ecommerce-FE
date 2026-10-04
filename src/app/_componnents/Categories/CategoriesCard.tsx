import Image from "next/image";
import Link from "next/link";
import { Category } from "@/src/types/Category";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="group cursor-pointer rounded-lg bg-white p-4 text-center shadow-sm transition hover:shadow-md"
    >
      <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#dcfce7] transition group-hover:bg-[#bbf7d0]">
        <Image
          src={category.image}
          alt={category.name}
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="text-black ">{category.name}</h3>
    </Link>
  );
}
