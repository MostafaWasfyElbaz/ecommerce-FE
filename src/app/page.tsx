import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Carousel from "./_componnents/Carousel/Carousel";
import Features from "./_componnents/Features/Features";
import Newsletter from "./_componnents/Newsletter/Newsletter";
import Vouchers from "./_componnents/Voucher/Vouchers";
import CategoriesSkeleton from "./_componnents/Categories/CategoriesSkeleton";
import ProductsSkeleton from "./_componnents/Products/ProductsSkeleton";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover fresh deals, top categories, and quality groceries delivered fast with FreshCart.",
};

const Categories = dynamic(
  () => import("./_componnents/Categories/Categories"),
  {
    loading: () => <CategoriesSkeleton />,
  },
);

const Products = dynamic(() => import("./_componnents/Products/Products"), {
  loading: () => <ProductsSkeleton />,
});

export default async function Home() {
  return (
    <>
      <Carousel />
      <Features />
      <Categories />
      <Vouchers />
      <Products />
      <Newsletter />
    </>
  );
}
