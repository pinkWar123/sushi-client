import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dish, Section } from "../../@types/response/section";
import { IDishesQuery } from "../../@types/request/request";
import { callGetDishes } from "../../services/dish";
import { callGetSections } from "../../services/section";

export interface IClientSectionState {
  menuSections: Section[];
  selectedSection?: Section;
  dishes: Dish[];
}

const initialState: IClientSectionState = {
  dishes: [],
  menuSections: [],
  selectedSection: undefined,
};

export const fetchSections = createAsyncThunk("fetchSections", async () => {
  const res = await callGetSections();
  console.log(res);
  return res.data;
});

export const fetchDishes = createAsyncThunk(
  "fetchDishes",
  async (query: IDishesQuery) => {
    const res = await callGetDishes(query);
    return res.data;
  }
);

const clientSectionsSlice = createSlice({
  name: "clientSections",
  initialState,
  reducers: {
    changeSelectedSection: (state, action: PayloadAction<Section>) => {
      state.selectedSection = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSections.fulfilled, (state, action) => {
        const data = action.payload;
        state.menuSections = data;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        const data = action.payload;
        state.dishes = data;
      });
  },
});

export default clientSectionsSlice.reducer;
export const { changeSelectedSection } = clientSectionsSlice.actions;
