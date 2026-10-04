import { Suspense } from "react";
import type { Metadata } from "next";
import getProducts from "@/src/api/Services/Products";
import getCategories from "@/src/api/Services/Categories";
import { getAllBrands } from "@/src/api/Services/Brands";
import SearchResults from "@/src/app/_componnents/Search/SearchResults";
import SearchSkeleton from "@/src/app/_componnents/Search/SearchSkeleton";

export const metadata: Metadata = {
  title: "Search Results | FreshCart",
  description:
    "Search and discover fresh groceries, electronics, fashion, and essentials on FreshCart.",
};


export default async function SearchPage() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getAllBrands(),
  ]);

  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchResults
        initialProducts={products}
        categories={categories}
        brands={brands}
      />
    </Suspense>
  );
}
