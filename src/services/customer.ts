import { ICustomerQuery } from "../@types/request/request";
import { ICustomer } from "../@types/response/customer";
import { IPagedResponse } from "../@types/response/response";
import axiosInstance from "./axios.config";

export const callGetAllCustomers = async (query: ICustomerQuery) => {
  return (
    await axiosInstance.get<IPagedResponse<ICustomer>>("Customer/all", {
      params: query,
    })
  ).data;
};
