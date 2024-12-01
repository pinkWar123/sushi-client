import axios from "axios";
import axiosInstance from "./axios.config";
import { ICreateInvoiceQuery } from "../@types/request/request";
import { IResponse } from "../@types/response/response";
import { ICreateInvoiceResponse } from "../@types/response/invoice";

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
