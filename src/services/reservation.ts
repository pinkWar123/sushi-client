import axios from "axios";
import { IDetailedReservationCardsQuery } from "../@types/request/request";
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
