import { IEmptyTableListResponse } from "../@types/response/table";
import axiosInstance from "./axios.config";

export const callGetEmptyTables = async (branchId: string) => {
  return (
    await axiosInstance.get<IEmptyTableListResponse>(
      "table-detail/empty-tables",
      {
        params: { branchId },
      }
    )
  ).data;
};
