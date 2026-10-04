import Link from "next/link";
import CategoryCard from "./CategoriesCard";
import getCategories from "@/src/api/Services/Categories";
import { Category } from "@/src/types/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function Categories() {
  const categories: Category[] = await getCategories();

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#00a651]" />

            <h2 className="text-[32px] font-bold leading-none tracking-tight">
              <span className="text-[#21313c]">Shop By </span>
              <span className="text-[#00a651]">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="flex items-center gap-3 text-[17px] font-medium text-[#00a651] transition-colors hover:text-[#008f45]"
          >
            <span>View All Categories</span>
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category: Category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
