import { ProductDetails } from "@/src/types/ProductDetails";

export async function getProductDetails({
  id,
}: {
  id: string;
}): Promise<ProductDetails> {
  try {
    const res = await fetch(`${process.env.API}/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch product details: ${res.statusText}`);
    }
    const json: { data: ProductDetails } = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}
