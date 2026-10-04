import { Category } from "@/src/types/Category";
import { Subcategory } from "@/src/types/Subcategory";

export default async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.API}/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    const json: { data: Category[] } = await res.json();
    return json.data;
  } catch {
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category> {
  try {
    const res = await fetch(`${process.env.API}/categories/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch category: ${res.statusText}`);
    }
    const json: { data: Category } = await res.json();
    return json.data;
  } catch {
    return {} as Category;
  }
}

export async function getSubcategories(
  categoryId: string,
): Promise<Subcategory[]> {
  try {
    const res = await fetch(
      `${process.env.API}/categories/${categoryId}/subcategories`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch subcategories: ${res.statusText}`);
    }
    const json: { data: Subcategory[] } = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function getSubcategoryById(id: string): Promise<Subcategory> {
  try {
    const res = await fetch(`${process.env.API}/subcategories/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch subcategory: ${res.statusText}`);
    }
    const json: { data: Subcategory } = await res.json();
    return json.data;
  } catch {
    return {} as Subcategory;
  }
}
