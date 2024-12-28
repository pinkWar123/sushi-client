import axios from "axios";
import axiosInstance from "./axios.config";
import {
  ICreateInvoiceQuery,
  IUserInvoiceQuery,
} from "../@types/request/request";
import { IResponse } from "../@types/response/response";
import {
  ICreateInvoiceResponse,
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
