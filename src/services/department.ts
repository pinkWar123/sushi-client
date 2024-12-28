import { IDepartmentResponse } from "../@types/response/department";
import axiosInstance from "./axios.config";

export const callGetAllDepartments = async () => {
  return (await axiosInstance.get<IDepartmentResponse>("department")).data;
};
