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
