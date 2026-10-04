import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFolderOpen,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getCategoryById,
  getSubcategories,
} from "@/src/api/Services/Categories";
import PageHeader from "@/src/app/_componnents/PageHeader/PageHeader";
import { LinkItem } from "@/src/types/LinkItem";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const category = await getCategoryById(id);
    return {
      title: category?.name ? `${category.name} Subcategories` : "Category",
      description: `Explore subcategories and products in ${category?.name || "this category"} on FreshCart.`,
    };
  } catch {
    return {
      title: "Category Details",
      description: "Explore category products on FreshCart.",
    };
  }
}

export default async function CategorySubcategories({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, subcategories] = await Promise.all([
    getCategoryById(id),
    getSubcategories(id),
  ]);

  const links: LinkItem[] = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category?.name },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader
        links={links}
        name={category?.name || "Subcategories"}
        description={`Browse ${category?.name || ""} subcategories`}
        icon={faFolderOpen}
        image={category?.image}
      />

      <div className="container mx-auto px-4 py-10">
        <Link
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#16a34a] transition-colors mb-6"
          href="/categories"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Categories</span>
        </Link>

        {subcategories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="text-3xl text-gray-400"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Subcategories Found
            </h3>
            <p className="text-gray-500 mb-6">
              This category doesn&apos;t have any subcategories yet.
            </p>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors"
              href={`/products?category=${id}`}
            >
              View All Products in {category?.name || "Category"}
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {subcategories.length} Subcategories in {category?.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {subcategories.map((subcategory) => (
                <Link
                  key={subcategory._id}
                  href={`/products?subcategory=${subcategory._id}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-[#bbf7d0] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#f0fdf4] flex items-center justify-center mb-4 group-hover:bg-[#dcfce7] transition-colors">
                    <FontAwesomeIcon
                      icon={faFolderOpen}
                      className="text-2xl text-[#16a34a]"
                    />
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#16a34a] transition-colors mb-2">
                    {subcategory.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-[#16a34a] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Browse Products</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
