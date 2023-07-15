import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filters: {
    gender: string;
    type: string;
    brand: string;
    price: {
      min: number;
      max: number;
    };
    size: string;
  };
  sort: string;
}

const initialState: FilterState = {
  filters: {
    gender: "",
    type: "",
    brand: "",
    price: {
      min: 0,
      max: 0,
    },
    size: "",
  },
  sort: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<{ type: string; gender: string }>) {
      state.filters.type = action.payload.type;
      state.filters.gender = action.payload.gender;
    },
    setBrand(state, action: PayloadAction<string>) {
      state.filters.brand = action.payload;
    },
    setPrice(state, action: PayloadAction<{ min: number; max: number }>) {
      state.filters.price = action.payload;
    },
    setSize(state, action: PayloadAction<string>) {
      state.filters.size = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    clearType(state) {
      state.filters.type = "";
      state.filters.gender = "";
    },
    clearBrand(state) {
      state.filters.brand = "";
    },
    clearPrice(state) {
      state.filters.price = {
        min: 0,
        max: 0,
      };
    },
    clearSize(state) {
      state.filters.size = "";
    },
    clearSort(state) {
      state.sort = "";
    },

    clearFilters(state) {
      state.filters = {
        gender: "",
        type: "",
        brand: "",
        price: {
          min: 0,
          max: 0,
        },
        size: "",
      };
    },
  },
});

export const {
  clearBrand,
  clearFilters,
  clearPrice,
  clearSize,
  clearSort,
  clearType,
  setType,
  setBrand,
  setPrice,
  setSize,
  setSort,
} = filterSlice.actions;

export default filterSlice.reducer;
