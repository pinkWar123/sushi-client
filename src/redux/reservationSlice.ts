import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IReservation } from "../@types/response/reservation";
import { RootState } from "./store";
import { IDetailedReservationCardsQuery } from "../@types/request/request";
import { callGetDetailedReservationCards } from "../services/reservation";

export interface MenuState {
  loading: boolean;
  data: IReservation[];
}

const initialState: MenuState = {
  loading: false,
  data: [],
};

export const fetchReservations = createAsyncThunk(
  "reservations",
  async (query: IDetailedReservationCardsQuery) => {
    const res = await callGetDetailedReservationCards(query);
    console.log(res);
    return res.data;
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReservations.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectReservationData = (state: RootState) => ({
  loading: state.reservations.loading,
  data: state.reservations.data,
});

export default reservationSlice.reducer;
