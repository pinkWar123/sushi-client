export interface ICreateInvoiceResponse {
  id: string;
  total: number;
  paymentMethod: string;
  afterDiscount: number;
  bonusPoint: number;
  paid: boolean;
  datedOn: string;
  orderId: string;
}

export interface IUserInvoice {
  name: string;
  id: string;
  total: number;
  paymentMethod: "cash" | "credit";
  afterDiscount: number;
  bonusPoint: number;
  paid: string;
  datedOn: string;
}

export type IUserInvoiceResponse = IUserInvoice[];

export interface ILatestCustomerInvoice {
  id: string;
  total: number;
  paymentMethod: string;
  afterDiscount: number;
  bonusPoint: number;
  paid: boolean;
  datedOn: string;
  orderId: string;
}

export type ILastestCustomerInvoiceResponse = ILatestCustomerInvoice[];

export interface ILatestInvoicesByOrder {
  id: string;
  total: number;
  paymentMethod: string;
  afterDiscount: number;
  bonusPoint: number;
  paid: boolean;
  datedOn: string;
}

export type ILastestInvoicesByOrderResponse = ILatestInvoicesByOrder[];

export interface IInvoiceDish {
  dishId: string;
  dishName: string;
  quantity: number;
  price: number;
}
