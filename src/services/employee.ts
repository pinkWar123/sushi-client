import axios from "axios";
import axiosInstance from "./axios.config";
import {
  IChangeEmployeeBranchQuery,
  IEmployeeQuery,
} from "../@types/request/request";
import { IPagedResponse } from "../@types/response/response";
import { IEmployee } from "../@types/response/employee";

const employeeApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/employee`,
});

export const callGetEmployee = async (query: IEmployeeQuery) => {
  return await employeeApi.get<IPagedResponse<IEmployee>>("", {
    params: query,
  });
};

export const callChangeEmployeeBranch = async (
  query: IChangeEmployeeBranchQuery
) => {
  return (
    await employeeApi.post(
      "changeEmployeeBranch",
      {},
      {
        params: query,
      }
    )
  ).data;
};
