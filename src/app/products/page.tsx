import type { Metadata } from "next";
import { LinkItem } from "@/src/types/LinkItem";
import {
  faBoxOpen,
  faFilter,
  faTags,
  faXmark,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "@/src/app/_componnents/PageHeader/PageHeader";
import getProducts, {
  getProductsByBrand,
  getProductsByCategory,
  getProductsBySubcategory,
} from "@/src/api/Services/Products";
import ProductCard from "@/src/app/_componnents/Products/ProductCard";
import { Product } from "@/src/types/Product";
import { getBrandById } from "@/src/api/Services/Brands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Brand } from "@/src/types/Brands";
import { Category } from "@/src/types/Category";
import { Subcategory } from "@/src/types/Subcategory";
import {
  getCategoryById,
  getSubcategoryById,
} from "@/src/api/Services/Categories";
import { Suspense } from "react";
import ProductsContentSkeleton from "@/src/app/_componnents/Products/ProductsContentSkeleton";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    subcategory?: string;
  }>;
}): Promise<Metadata> {
  const { brand, category, subcategory } = await searchParams;
  if (brand) {
    try {
      const brandData = await getBrandById(brand);
      if (brandData?.name) {
        return {
          title: `${brandData.name} Products`,
          description: `Shop original ${brandData.name} products on FreshCart with fast delivery.`,
        };
      }
    } catch {}
  }
  if (category) {
    try {
      const categoryData = await getCategoryById(category);
      if (categoryData?.name) {
        return {
          title: `${categoryData.name} Products`,
          description: `Explore quality ${categoryData.name} products and daily essentials on FreshCart.`,
        };
      }
    } catch {}
  }
  if (subcategory) {
    try {
      const subcategoryData = await getSubcategoryById(subcategory);
      if (subcategoryData?.name) {
        return {
          title: `${subcategoryData.name} Products`,
          description: `Browse ${subcategoryData.name} items on FreshCart.`,
        };
      }
    } catch {}
  }
  return {
    title: "Shop All Products",
    description:
      "Explore our full catalog of fresh groceries, electronics, fashion, and daily essentials.",
  };
}

async function ProductsList({
  brand,
  category,
  subcategory,
}: {
  brand?: string;
  category?: string;
  subcategory?: string;
}) {
  let products: Product[] = [];
  let brandData: Brand | undefined;
  let categoryData: Category | undefined;
  let subcategoryData: Subcategory | undefined;

  if (brand) {
    [products, brandData] = await Promise.all([
      getProductsByBrand(brand),
      getBrandById(brand),
    ]);
  } else if (category) {
    [products, categoryData] = await Promise.all([
      getProductsByCategory(category),
      getCategoryById(category),
    ]);
  } else if (subcategory) {
    [products, subcategoryData] = await Promise.all([
      getProductsBySubcategory(subcategory),
      getSubcategoryById(subcategory),
    ]);
  } else {
    products = await getProducts();
  }

  const activeFilterName =
    brandData?.name || categoryData?.name || subcategoryData?.name;

  return (
    <div className="container mx-auto px-4 py-8">
      {(brand || category || subcategory) && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon icon={faFilter} />
            Active Filters:
          </span>

          <Link
            href="/products"
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-violet-200 ${
              brand
                ? "bg-violet-100 text-violet-700"
                : subcategory
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-green-100 text-green-700"
            }`}
          >
            <FontAwesomeIcon icon={faTags} className="text-xs" />
            {activeFilterName}
            <FontAwesomeIcon icon={faXmark} className="text-xs" />
          </Link>
          <Link
            href="/products"
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            Clear all
          </Link>
        </div>
      )}

      <div className="mb-6 text-sm text-gray-500">
        Showing {products.length} products
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="text-3xl text-gray-400"
            />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 mb-6">
            No products match your current filters.
          </p>
          <Link
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors"
            href="/products"
          >
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function AllProducts({
  searchParams,
}: {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    subcategory?: string;
  }>;
}) {
  const { brand, category, subcategory } = await searchParams;
  let links: LinkItem[] = [];
  let pageName: string = "";
  let pageDescription: string = "";
  let icon: IconDefinition | null = null;
  let image: string | null = null;
  let headerColor: string | undefined;

  if (brand) {
    const brandData = await getBrandById(brand);
    links = [
      { label: "Home", href: "/" },
      { label: "Brands", href: "/brands" },
      { label: brandData?.name },
    ];
    pageName = brandData?.name || "";
    pageDescription = `Shop ${brandData?.name} products`;
    image = brandData?.image;
    headerColor =
      "bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400";
  } else if (category) {
    const categoryData = await getCategoryById(category);
    links = [
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: categoryData?.name },
    ];
    pageName = categoryData?.name || "";
    pageDescription = `Browse products in ${categoryData?.name}`;
    image = categoryData?.image;
  } else if (subcategory) {
    const subcategoryData = await getSubcategoryById(subcategory);
    links = [
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: subcategoryData?.name },
    ];
    pageName = subcategoryData?.name || "";
    pageDescription = `Browse products in ${subcategoryData?.name}`;
    icon = faTags;
  } else {
    links = [
      { label: "Home", href: "/" },
      { label: "All Products", href: "/products" },
    ];
    pageName = "All Products";
    pageDescription = "Explore our complete product collection";
    icon = faBoxOpen;
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        links={links}
        icon={icon}
        name={pageName}
        description={pageDescription}
        image={image}
        color={headerColor}
      />
      <Suspense
        key={`${brand || ""}-${category || ""}-${subcategory || ""}`}
        fallback={<ProductsContentSkeleton />}
      >
        <ProductsList
          brand={brand}
          category={category}
          subcategory={subcategory}
        />
      </Suspense>
    </div>
  );
}
