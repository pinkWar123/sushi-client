import axios from "axios";
import axiosInstance from "./axios.config";
import { IPagedResponse, IResponse } from "../@types/response/response";
import { Dish } from "../@types/response/section";
import { IDishesQuery, ITopDishesQuery } from "../@types/request/request";
import { ITopDishResponse } from "../@types/response/dish";

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

export const callGetTop5BestDishes = async (query: ITopDishesQuery) => {
  return (
    await dishApi.get<IResponse<ITopDishResponse>>("TopDishes", {
      params: query,
    })
  ).data;
};

export const callGetTop5WorstDishes = async (query: ITopDishesQuery) => {
  return (
    await dishApi.get<IResponse<ITopDishResponse>>("WorstDishes", {
      params: query,
    })
  ).data;
};
