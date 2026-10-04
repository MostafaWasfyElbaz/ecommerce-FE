import type { Metadata } from "next";
import getCategories from "@/src/api/Services/Categories";
import CategoryCard from "@/src/app/_componnents/CategoryCard/CategoryCard";
import { Category } from "@/src/types/Category";
import PageHeader from "@/src/app/_componnents/PageHeader/PageHeader";
import { LinkItem } from "@/src/types/LinkItem";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "All Categories",
  description:
    "Browse our wide range of product categories and discover essentials for your home on FreshCart.",
};

export default async function Categories() {
  const categories: Category[] = await getCategories();
  const links: LinkItem[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Categories",
      href: "/categories",
    },
  ];
  const name = "All Categories";
  const description = "Browse our wide range of product categories";
  const icon = faLayerGroup;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader
        links={links}
        name={name}
        description={description}
        icon={icon}
      />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
