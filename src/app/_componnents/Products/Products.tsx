import getProducts from "@/src/api/Services/Products";
import ProductCard from "./ProductCard";
import { Product } from "@/src/types/Product";

export default async function Products() {
  const products: Product[] = await getProducts();
  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center gap-3 sm:mb-10">
          <span className="h-8 w-1.5 rounded-full bg-[#00a651]" />

          <h2 className="text-2xl font-bold leading-none tracking-tight sm:text-[32px]">
            <span className="text-[#21313c]">Featured </span>
            <span className="text-[#00a651]">Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
