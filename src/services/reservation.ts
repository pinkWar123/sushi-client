import axios from "axios";
import {
  ICreateReservationRequest,
  ICreateSurveyRequest,
  IDetailedReservationCardsQuery,
  IUpdateReservationStatusRequest,
} from "../@types/request/request";
import { IResponse } from "../@types/response/response";
import axiosInstance from "./axios.config";
import { IReservation } from "../@types/response/reservation";

const reservationApi = axios.create({
  baseURL: `${axiosInstance.defaults.baseURL}/reservation`,
});

export const callGetDetailedReservationCards = async (
  query: IDetailedReservationCardsQuery
) => {
  return (
    await reservationApi.get<IResponse<IReservation[]>>(
      "getDetailReservationCards",
      {
        params: query,
      }
    )
  ).data;
};

export const callCreateReservation = async (
  request: ICreateReservationRequest
) => {
  return (await axiosInstance.post("reservation/submit", request)).data;
};

export const callUpdateReservationStatus = async (
  request: IUpdateReservationStatusRequest
) => {
  return (
    await axiosInstance.post("reservation/updateReservationStatus", request)
  ).data;
};

export const callCreateSurvey = async (request: ICreateSurveyRequest) => {
  return (await axiosInstance.post("Survey/create", request)).data;
};
