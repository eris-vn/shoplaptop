import type { Address } from "./address";
import type { OrderDetails } from "./order_details";

interface Orders {
  id: number;
  user_id: number;
  address_id: number;
  status: number;
  total_price: number;
  order_details: OrderDetails[];
  address: Address[];
}

export type { Orders };
