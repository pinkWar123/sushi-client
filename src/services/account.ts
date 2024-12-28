import axios from "axios";
import axiosInstance from "./axios.config";
import { ILoginRequest, IRegisterRequest } from "../@types/request/request";
import { IResponse } from "../@types/response/response";
import { ILoginResponse, IUserCredentials } from "../@types/response/account";

const accountApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/account`,
});

export const callRegister = async (request: IRegisterRequest) => {
  return (await accountApi.post("Register", request)).data;
};

export const callLogin = async (request: ILoginRequest) => {
  return (
    await axiosInstance.post<IResponse<ILoginResponse>>(
      "account/login",
      request
    )
  ).data;
};

export const callGetUserCredentials = async () => {
  return (await axiosInstance.get<IResponse<IUserCredentials>>("account/me"))
    .data;
};
