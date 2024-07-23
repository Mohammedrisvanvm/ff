import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: StockState[];
};

export type StockState = {
  code: string;
  rate: number;
  volume: number;
  cap: number;
  delta?: {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
  };
};
const initialState = {
  value: [],
} as InitialState;

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addStocks: (state, action: PayloadAction<StockState[]>) => {
      state.value.push(...action.payload);
    },
    removeStocks: (state) => {
      state.value = [];
    },
  },
});
export const { addStocks,removeStocks } = stockSlice.actions;
export default stockSlice.reducer;
