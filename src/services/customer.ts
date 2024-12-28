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

interface ICreateCardCustomerQuery {
  customerId: string;
  employeeId: string;
}
export const createCardCustomer = async (query: ICreateCardCustomerQuery) => {
  console.log("query: ", query);

  const response = await axiosInstance.post(
    `/Card/createCardForCustomer?customerId=${query.customerId}&employeeId=${query.employeeId}`
  );
  console.log("response: ", response.data);

  return response.data;
};
