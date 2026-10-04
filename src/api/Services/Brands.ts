import { Brand } from "@/src/types/Brands";

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const result = await fetch(`${process.env.API}/brands`, {
      next: { revalidate: 3600 },
    });
    if (!result.ok) {
      throw new Error(`Failed to fetch brands: ${result.statusText}`);
    }
    const data: { data: Brand[] } = await result.json();
    return data.data;
  } catch {
    return [];
  }
}

export async function getBrandById(id: string): Promise<Brand> {
  try {
    const result = await fetch(`${process.env.API}/brands/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!result.ok) {
      throw new Error(`Failed to fetch brand: ${result.statusText}`);
    }
    const data: { data: Brand } = await result.json();
    return data.data;
  } catch {
    return {} as Brand;
  }
}
