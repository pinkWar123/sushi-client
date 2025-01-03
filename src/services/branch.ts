import axios from "axios";
import { BranchNameDto, IDailyRevenue } from "../@types/response/branch";
import { IResponse } from "../@types/response/response";
import axiosInstance from "./axios.config";

const branchApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/branch`,
});

export const callGetAllBranchNames = async () => {
  return (
    await branchApi.get<IResponse<BranchNameDto[]>>("get-all/branch-name")
  ).data;
};

export const callGetBranchRevenueByDateRange = async (
  branchId: string,
  startDate: string,
  endDate: string
) => {
  return (
    await branchApi.get<IResponse<IDailyRevenue[]>>(
      "get-revenue-by-date-range",
      { params: { startDate, endDate, branchId } }
    )
  ).data;
};
