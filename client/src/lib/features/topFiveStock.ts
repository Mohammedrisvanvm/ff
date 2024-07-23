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

export const topFiveStock = createSlice({
  name: "topFiveStock",
  initialState,
  reducers: {
    addStocksTopFive: (state, action: PayloadAction<StockState[]>) => {
      state.value.push(...action.payload);
    },
    removeStocksTopFive: (state) => {
      state.value = [];
    },
  },
});
export const { addStocksTopFive,removeStocksTopFive } = topFiveStock.actions;
export default topFiveStock.reducer;
