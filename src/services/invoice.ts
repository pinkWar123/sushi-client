import axios from "axios";
import axiosInstance from "./axios.config";
import {
  ICreateInvoiceQuery,
  IUserInvoiceQuery,
} from "../@types/request/request";
import { IResponse } from "../@types/response/response";
import {
  ICreateInvoiceResponse,
  IInvoiceDish,
  ILastestCustomerInvoiceResponse,
  ILastestInvoicesByOrderResponse,
  IUserInvoiceResponse,
} from "../@types/response/invoice";

const invoiceApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/Invoice`,
});

export const callCreateNewInvoice = async (query: ICreateInvoiceQuery) => {
  return (
    await invoiceApi.post<IResponse<ICreateInvoiceResponse>>(
      "createInvoice",
      {},
      {
        params: query,
      }
    )
  ).data;
};

export const callPurchaseInvoice = async (invoiceId: string) => {
  return (await invoiceApi.patch(`UpdatePaidInvoice/${invoiceId}`)).data;
};

export const callGetAllInvoices = async (query: IUserInvoiceQuery) => {
  return (
    await invoiceApi.get<IResponse<IUserInvoiceResponse>>("query", {
      params: query,
    })
  ).data;
};

export const callGetLatestInvoicesByCustomer = async (customerId: string) => {
  return (
    await invoiceApi.get<IResponse<ILastestCustomerInvoiceResponse>>(
      "latestInvoicesByCustomer",
      {
        params: { customerId },
      }
    )
  ).data;
};

export const callGetLastestInvoicesByOrder = async (orderId: string) => {
  return (
    await invoiceApi.get<IResponse<ILastestInvoicesByOrderResponse>>(
      "latestInvoicesByOrder",
      { params: { orderId } }
    )
  ).data;
};

export const callGetInvoiceDetails = async (invoiceId: string) => {
  return (
    await invoiceApi.get<IResponse<IInvoiceDish[]>>(`${invoiceId}/dishes`)
  ).data;
};
