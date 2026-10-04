import { Address } from "./Address";
import { Brand } from "./Brands";
import { Category } from "./Category";
import { user } from "./next-auth";

export interface OrderItemProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  category?: Category;
  brand?: Brand;
}

export interface OrderCartItem {
  _id: string;
  count: number;
  price: number;
  product: OrderItemProduct;
}

export interface Order {
  _id: string;
  id: number | string;
  totalOrderPrice: number;
  taxPrice?: number;
  shippingPrice?: number;
  paymentMethodType: "cash" | "card" | string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  cartItems: OrderCartItem[];
  shippingAddress?: Address;
  user?: user;
}
