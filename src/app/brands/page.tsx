import type { Metadata } from "next";
import { getAllBrands } from "@/src/api/Services/Brands";
import BrandCard from "@/src/app/_componnents/BrandCard/BrandCard";
import { Brand } from "@/src/types/Brands";
import PageHeader from "@/src/app/_componnents/PageHeader/PageHeader";
import { LinkItem } from "@/src/types/LinkItem";
import { faTags } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Top Brands",
  description:
    "Explore and shop products from your favorite authentic brands on FreshCart.",
};

export default async function Brands() {
  const brands: Brand[] = await getAllBrands();
  const links: LinkItem[] = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "/brands" },
  ];
  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader
        links={links}
        icon={faTags}
        name="Top Brands"
        description="Shop from your favorite brands"
        color="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400"
      />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand: Brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
