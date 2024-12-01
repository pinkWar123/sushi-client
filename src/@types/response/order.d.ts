import { IReservation } from "./reservation";

export interface IOrderDetail {
  orderDishId: string;
  price: number;
  quantity: number;
  dishId: string;
  dishName: string;
}
