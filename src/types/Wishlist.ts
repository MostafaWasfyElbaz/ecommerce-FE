import { Product } from "./Product";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}
