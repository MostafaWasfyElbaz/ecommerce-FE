import { Product } from "@/src/types/Product";

export default async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.API}/products`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const json: { data: Product[] } = await res.json();
    return json.data;
  } catch {
    return [];
  }
}

export async function getProductsByCategory(
  categoryId: string,
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.API}/products?category[in]=${categoryId}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch products by category: ${res.statusText}`,
      );
    }
    const json: { data: Product[] } = await res.json();
    return json.data;
  } catch {
    return [];
  }
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.API}/products?brand=${brandId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch products by brand: ${res.statusText}`);
    }
    const json: { data: Product[] } = await res.json();
    return json.data;
  } catch {
    return [];
  }
}

export async function getProductsBySubcategory(
  subcategoryId: string,
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.API}/products?subcategory=${subcategoryId}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch products by subcategory: ${res.statusText}`,
      );
    }
    const json: { data: Product[] } = await res.json();
    return json.data;
  } catch {
    return [];
  }
}
