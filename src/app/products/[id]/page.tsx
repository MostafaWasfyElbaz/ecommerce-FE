import type { Metadata } from "next";
import { Suspense } from "react";
import { getProductDetails } from "@/src/api/Services/ProductDetails";
import ProductDetailsSkeleton from "@/src/app/_componnents/ProductDetails/ProductDetailsSkeleton";
import MainProductDetails from "@/src/app/_componnents/ProductDetails/MainProductDetails";
import ProductDetailsTabs from "@/src/app/_componnents/ProductDetails/ProductDetailsTabs";
import SimilarProduct from "@/src/app/_componnents/ProductDetails/SimilarProduct";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductDetails({ id });
    return {
      title: product?.title || "Product Details",
      description:
        product?.description?.slice(0, 160) ||
        "View product details, specifications, reviews, and order on FreshCart.",
      openGraph: {
        title: product?.title,
        description: product?.description?.slice(0, 160),
        images: product?.imageCover ? [product.imageCover] : [],
      },
    };
  } catch {
    return {
      title: "Product Details",
      description: "View product details and buy online on FreshCart.",
    };
  }
}

async function ProductContent({ id }: { id: string }) {
  const product = await getProductDetails({ id });
  return (
    <>
      <MainProductDetails product={product} />
      <ProductDetailsTabs product={product} />
      <SimilarProduct product={product} />
    </>
  );
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductContent id={id} />
    </Suspense>
  );
}
