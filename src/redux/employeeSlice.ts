import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "../@types/response/employee";
import {
  callChangeEmployeeBranch,
  callGetEmployee,
} from "../services/employee";
import {
  IChangeEmployeeBranchQuery,
  IEmployeeQuery,
} from "../@types/request/request";
import { IPagedResponse } from "../@types/response/response";
import { RootState } from "./store";

export interface IEmployeeState extends IPagedResponse<IEmployee> {
  loading: boolean;
}

const initialState: IEmployeeState = {
  loading: false,
  data: [],
  pageNumber: 1,
  pageSize: 5,
  firstPage: "",
  lastPage: "",
  totalPages: 0,
  totalRecords: 0,
  previousPage: "",
  nextPage: "",
};

export const fetchEmployee = createAsyncThunk(
  "employee/get-all",
  async (query: IEmployeeQuery) => {
    const res = await callGetEmployee(query);
    return res.data;
  }
);

export const changeEmployeeBranch = createAsyncThunk(
  "employee/change-branch",
  async (query: IChangeEmployeeBranchQuery) => {
    await callChangeEmployeeBranch(query);
    return { employeeId: query.employeeId, branchId: query.newBranchId };
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetPagination: (state) => {
      state.pageNumber = 1;
      state.totalRecords = 0;
    },
    updatePageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchEmployee.rejected, (state) => {
        state.loading = false;
      });

    builder.addCase(changeEmployeeBranch.fulfilled, (state, action) => {
      const employee = state.data.find(
        (employee) => employee.id === action.payload.employeeId
      );
      if (employee) {
        console.log("old branch:", employee.branchId);
        console.log("new branch:", action.payload.branchId);
        employee.branchId = action.payload.branchId;
      }

      // state.data = state.data.map((employee) =>
      //   employee.id === action.payload.employeeId
      //     ? { ...employee, branchId: action.payload.branchId }
      //     : employee
      // );
    });
  },
});

export const selectEmployee = (state: RootState) => {
  return {
    loading: state.employee.loading,
    // pagination: {
    pageNumber: state.employee.pageNumber,
    pageSize: state.employee.pageSize,
    totalRecords: state.employee.totalRecords,
    // },
    data: state.employee.data,
  };
};

export default employeeSlice.reducer;
export const { resetPagination, updatePageSize } = employeeSlice.actions;
