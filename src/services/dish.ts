import axios from "axios";
import axiosInstance from "./axios.config";
import { IPagedResponse } from "../@types/response/response";
import { Dish } from "../@types/response/section";
import { IDishesQuery } from "../@types/request/request";

const dishApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/dish`,
});

export const callGetDishes = async (query: IDishesQuery) => {
  return (
    await dishApi.get<IPagedResponse<Dish>>("", {
      params: query,
    })
  ).data;
};
