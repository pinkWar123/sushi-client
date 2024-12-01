import { OrderStatus } from "../constants/order";

export const statuses = Object.entries(OrderStatus).filter(
  ([key]) => isNaN(Number(key)) // Exclude reverse mappings
);
