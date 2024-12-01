import { OrderStatus } from "../../constants/order";
import { IOrderDetail } from "./order";

export interface IReservation {
  reservationId: string;
  customerId: string;
  customerName: string;
  branchId: string;
  branchName: string;
  orderId: string;
  status: OrderStatus;
  datedOn: string;
  tableNumber: number;
  totalPeople: number;
  totalPrice: number;
  orderDetails: IOrderDetail[];
}
