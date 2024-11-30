import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReservation } from "../@types/response/reservation";
import { RootState } from "./store";
import {
  ICreateInvoiceQuery,
  IDetailedReservationCardsQuery,
} from "../@types/request/request";
import { callGetDetailedReservationCards } from "../services/reservation";
import { callCreateNewInvoice } from "../services/invoice";
import { OrderStatus } from "../constants/order";

export interface ReservationState {
  loading: boolean;
  createInvoiceLoading: boolean;
  status: OrderStatus;
  data: IReservation[];
}

const initialState: ReservationState = {
  loading: false,
  createInvoiceLoading: false,
  data: [],
  status: OrderStatus.Placed,
};

export const fetchReservations = createAsyncThunk(
  "reservations",
  async (query: IDetailedReservationCardsQuery) => {
    const res = await callGetDetailedReservationCards(query);
    console.log(res);
    return res.data;
  }
);

export const createInvoice = createAsyncThunk(
  "create-invoice",
  async (query: ICreateInvoiceQuery) => {
    const res = await callCreateNewInvoice(query);
    console.log(res);
    return res;
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    changeStatus(state: ReservationState, action: PayloadAction<OrderStatus>) {
      const status = action.payload;
      state.status = status;
    },
  },
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
      })
      .addCase(createInvoice.pending, (state) => {
        state.createInvoiceLoading = true;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.createInvoiceLoading = false;
        const orderToUpdate = action.payload;
        state.data = state.data.map((data) => {
          if (data.orderId !== orderToUpdate.orderId) return data;
          return {
            ...data,
            status: OrderStatus.Done,
          };
        });
      })
      .addCase(createInvoice.rejected, (state) => {
        state.createInvoiceLoading = false;
      });
  },
});

export const selectReservationData = (state: RootState) => ({
  loading: state.reservations.loading,
  createInvoiceLoading: state.reservations.createInvoiceLoading,
  data: state.reservations.data,
  status: state.reservations.status,
});

export const { changeStatus } = reservationSlice.actions;
export default reservationSlice.reducer;
