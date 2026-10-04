import { ProductDetails } from "@/src/types/ProductDetails";
import { getProductsByCategory } from "@/src/api/Services/Products";
import SimilarProductSlider from "./SimilarProductSlider";

export default async function SimilarProduct({
  product,
}: {
  product: ProductDetails;
}) {
  const products = await getProductsByCategory(product.category._id);
  const filteredProducts = products.filter((item) => item._id !== product._id);

  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  return <SimilarProductSlider products={filteredProducts} />;
}
