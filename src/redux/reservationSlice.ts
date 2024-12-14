import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReservation } from "../@types/response/reservation";
import { RootState } from "./store";
import {
  ICreateInvoiceQuery,
  IDetailedReservationCardsQuery,
  IUpdateReservationStatusRequest,
} from "../@types/request/request";
import {
  callGetDetailedReservationCards,
  callUpdateReservationStatus,
} from "../services/reservation";
import { callCreateNewInvoice, callPurchaseInvoice } from "../services/invoice";
import { OrderStatus } from "../constants/order";
import { IEmptyTableListResponse } from "../@types/response/table";
import { callGetEmptyTables } from "../services/table";

export interface ReservationState {
  loading: boolean;
  createInvoiceLoading: boolean;
  status: OrderStatus;
  data: IReservation[];
  emptyTables: IEmptyTableListResponse;
}

const initialState: ReservationState = {
  loading: false,
  createInvoiceLoading: false,
  data: [],
  status: OrderStatus.Placed,
  emptyTables: [],
};

export const fetchReservations = createAsyncThunk(
  "reservations",
  async (query: IDetailedReservationCardsQuery) => {
    const res = await callGetDetailedReservationCards(query);
    console.log(res);
    return res.data;
  }
);

export const updateReservationStatus = createAsyncThunk(
  "updateReservationStatus",
  async (request: IUpdateReservationStatusRequest) => {
    await callUpdateReservationStatus(request);
    return request;
  }
);

export const createInvoice = createAsyncThunk(
  "create-invoice",
  async (query: ICreateInvoiceQuery) => {
    const res = await callCreateNewInvoice(query);
    return res.data;
  }
);

interface IPurchaseInvoice {
  invoiceId: string;
  reservationId: string;
}

export const purchaseInvoice = createAsyncThunk(
  "update-invoice",
  async (data: IPurchaseInvoice) => {
    const { invoiceId, reservationId } = data;
    await callPurchaseInvoice(invoiceId);
    return { invoiceId, reservationId };
  }
);

export const fetchEmptyTables = createAsyncThunk(
  "empty-tables",
  async (branchId: string) => {
    const res = await callGetEmptyTables(branchId);
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
    finishReservation(state: ReservationState, action: PayloadAction<string>) {
      const reservationId = action.payload;
      state.data = state.data.map((data) => {
        if (data.reservationId !== reservationId) return data;
        return {
          ...data,
          status: OrderStatus.Done,
        };
      });
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
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        const { tableId, reservationId } = action.payload;
        const tableNumber =
          state.emptyTables.find((e) => e.TableId === tableId)?.tableNumber ??
          0;
        state.data = state.data.map((reservation) =>
          reservation.reservationId === reservationId
            ? { ...reservation, status: reservation.status + 1, tableNumber }
            : reservation
        );
        state.emptyTables = state.emptyTables.filter(
          (table) => table.TableId !== tableId
        );
      })
      .addCase(createInvoice.fulfilled, (state) => {
        state.createInvoiceLoading = false;
        // const orderToUpdate = action.payload;
        // state.data = state.data.map((data) => {
        //   if (data.orderId !== orderToUpdate.orderId) return data;
        //   return {
        //     ...data,
        //     status: OrderStatus.Done,
        //   };
        // });
      })
      .addCase(createInvoice.rejected, (state) => {
        state.createInvoiceLoading = false;
      })
      .addCase(purchaseInvoice.fulfilled, () => {
        // const { reservationId } = action.payload;
        // state.data = state.data.map((reservation) =>
        //   reservation.reservationId === reservationId
        //     ? {
        //         ...reservation,
        //         status: OrderStatus.Done,
        //       }
        //     : reservation
        // );
      })
      .addCase(fetchEmptyTables.fulfilled, (state, action) => {
        state.emptyTables = action.payload;
      });
  },
});

export const selectReservationData = (state: RootState) => ({
  loading: state.reservations.loading,
  createInvoiceLoading: state.reservations.createInvoiceLoading,
  data: state.reservations.data,
  status: state.reservations.status,
});

export const { changeStatus, finishReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
