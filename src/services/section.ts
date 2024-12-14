import axios from "axios";
import axiosInstance from "./axios.config";
import { IResponse } from "../@types/response/response";
import { Section } from "../@types/response/section";

const sectionApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/section`,
});

export const callGetSections = async () => {
  return (await sectionApi.get<IResponse<Section[]>>("")).data;
};
