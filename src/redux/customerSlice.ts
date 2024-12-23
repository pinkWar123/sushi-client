import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICustomer } from "../@types/response/customer";
import { IPagedResponse } from "../@types/response/response";
import { ICustomerQuery } from "../@types/request/request";
import { callGetAllCustomers } from "../services/customer";
import { RootState } from "./store";

export interface ICustomerState extends IPagedResponse<ICustomer> {
  loading: boolean;
}

const initialState: ICustomerState = {
  loading: false,
  data: [],
  pageNumber: 1,
  pageSize: 10,
  firstPage: "",
  lastPage: "",
  totalPages: 0,
  totalRecords: 0,
  previousPage: "",
  nextPage: "",
};

export const fetchCustomers = createAsyncThunk(
  "customers/get-all",
  async (query: ICustomerQuery) => {
    const res = await callGetAllCustomers(query);
    return res.data;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalRecords = action.payload.totalRecords;
      });
  },
});

export const selectCustomer = (state: RootState) => {
  return {
    loading: state.customers.loading,
    // pagination: {
    pageNumber: state.customers.pageNumber,
    pageSize: state.customers.pageSize,
    totalRecords: state.customers.totalRecords,
    // },
    data: state.customers.data,
  };
};

export default customerSlice.reducer;
// export const { resetPagination, updatePageSize } = employeeSlice.actions;
