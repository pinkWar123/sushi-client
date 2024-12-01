import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDish, ISection } from "../@types/response/menu";
import { callGetAllDishes, callGetSections } from "../services/menu";
import { IDishesQuery } from "../@types/request/request";
import { IPagedResponse } from "../@types/response/response";
import { RootState } from "./store";
import { IPagedSelector } from "../@types/redux";

export interface MenuState extends IPagedResponse<IDish> {
  loading: boolean;
}

const initialState: MenuState = {
  data: [],
  loading: false,
  pageNumber: 1,
  pageSize: 5,
  firstPage: "",
  lastPage: "",
  totalPages: 0,
  totalRecords: 0,
  previousPage: "",
  nextPage: "",
};

export const fetchSection = createAsyncThunk(
  "section/fetch-section",
  async () => {
    const res = await callGetSections();
    return res.data;
  }
);

export const fetchDishesBySection = createAsyncThunk(
  "dish/fetch-dish-by-section",
  async (query: IDishesQuery) => {
    const res = await callGetAllDishes(query);
    return res;
  }
);

export const fetchMoreDishes = createAsyncThunk(
  "dish/fetch-more-dishes",
  async (query: IDishesQuery) => {
    const res = await callGetAllDishes(query);
    return res;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    resetPagination: (state) => {
      state.pageNumber = 1;
      state.pageSize = 5;
      state.totalPages = 0;
      state.totalRecords = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishesBySection.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDishesBySection.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchMoreDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload.data];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalRecords = action.payload.totalRecords;
      });
  },
});

export const selectMenuData = (state: RootState): IPagedSelector<IDish> => ({
  loading: state.menu.loading,
  data: state.menu.data,
  pagination: {
    pageNumber: state.menu.pageNumber,
    pageSize: state.menu.pageSize,
    totalRecords: state.menu.totalRecords,
  },
});

export interface SectionState {
  loading: boolean;
  data: ISection[];
}

const intialSectionState: SectionState = {
  data: [],
  loading: false,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState: intialSectionState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSection.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSection.rejected, (state) => {
        state.loading = false;
      });
  },
});

const menu = menuSlice.reducer;
const sections = sectionsSlice.reducer;

export { menu, sections };
export const { resetPagination } = menuSlice.actions;
