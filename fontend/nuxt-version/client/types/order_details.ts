import type { Product } from "./product";

interface OrderDetails {
  id: number;
  order_id: number;
  product_id: number;
  price: number;
  discount: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

export type { OrderDetails };
