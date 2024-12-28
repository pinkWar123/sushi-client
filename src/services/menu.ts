import axios from "axios";
import { IPagedResponse, IResponse } from "../@types/response/response";
import axiosInstance from "./axios.config";
import { IDish, IDishBySection, ISection } from "../@types/response/menu";
import { IDishesQuery } from "../@types/request/request";

const sectionApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/section`,
});

const dishApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/dish`,
});

export const callGetSections = async () => {
  return (await sectionApi.get<IResponse<ISection[]>>("")).data;
};

export const callGetDishBySections = async (sectionId: string) => {
  return (
    await dishApi.get<IResponse<IDishBySection[]>>(`by-section:${sectionId}`)
  ).data;
};

export const callGetAllDishes = async (query: IDishesQuery) => {
  console.log(query);
  return (
    await dishApi.get<IPagedResponse<IDish>>("", {
      params: query,
    })
  ).data;
};
