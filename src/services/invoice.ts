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
    await invoiceApi.post<ICreateInvoiceResponse>(
      "createInvoice",
      {},
      {
        params: query,
      }
    )
  ).data;
};
