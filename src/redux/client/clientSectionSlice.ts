import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dish, Section } from "../../@types/response/section";
import { IDishesQuery } from "../../@types/request/request";
import { callGetDishes } from "../../services/dish";
import { callGetSections } from "../../services/section";
import { RootState } from "../store";
import { BranchNameDto } from "../../@types/response/branch";
import { callGetAllBranchNames } from "../../services/branch";

export interface SelectedDish {
  dish: Dish;
  quantity: number;
}
export interface IClientSectionState {
  menuSections: Section[];
  selectedSection?: Section;
  dishes: Dish[];
  selectedDishes: SelectedDish[];
  branches: BranchNameDto[];
  selectedBranchId?: string;
}

const initialState: IClientSectionState = {
  dishes: [],
  menuSections: [],
  selectedSection: undefined,
  selectedDishes: [],
  branches: [],
};

export const fetchSections = createAsyncThunk("fetchSections", async () => {
  const res = await callGetSections();
  return res.data;
});

export const fetchDishes = createAsyncThunk(
  "fetchDishes",
  async (query: IDishesQuery) => {
    const res = await callGetDishes(query);
    return res.data;
  }
);

export const fetchBranches = createAsyncThunk("fetchBranches", async () => {
  const res = await callGetAllBranchNames();
  return res.data;
});

const clientSectionsSlice = createSlice({
  name: "clientSections",
  initialState,
  reducers: {
    changeSelectedSection: (state, action: PayloadAction<Section>) => {
      state.selectedSection = action.payload;
    },
    addDishToCart: (state, action: PayloadAction<SelectedDish>) => {
      const dish = action.payload;
      if (
        !state.selectedDishes
          .map((dish) => dish.dish.dishId)
          .includes(dish.dish.dishId)
      )
        state.selectedDishes.push(dish);
    },
    updateDishQuantity: (state, action: PayloadAction<SelectedDish>) => {
      const dish = action.payload;
      state.selectedDishes = state.selectedDishes.map((_dish) =>
        _dish.dish.dishId === dish.dish.dishId
          ? { ..._dish, quantity: dish.quantity }
          : _dish
      );
    },
    removeDish: (state, action: PayloadAction<string>) => {
      const dishId = action.payload;
      state.selectedDishes = state.selectedDishes.filter(
        (dish) => dish.dish.dishId !== dishId
      );
    },
    changeBranch: (state, action: PayloadAction<string>) => {
      const branchId = action.payload;
      if (state.branches.map((b) => b.branchId).includes(branchId)) {
        state.selectedBranchId = action.payload;
        state.selectedDishes = [];
      }
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

    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      state.branches = action.payload;
    });
  },
});

export const findSelectedDishById = (state: RootState, id: string) => {
  return state.clientSections.selectedDishes.find(
    (dish) => dish.dish.dishId === id
  );
};

export default clientSectionsSlice.reducer;
export const {
  changeSelectedSection,
  addDishToCart,
  updateDishQuantity,
  removeDish,
  changeBranch,
} = clientSectionsSlice.actions;
