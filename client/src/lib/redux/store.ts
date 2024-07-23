import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "../features/stockSlice";
import topFiveStockReducer from "../features/topFiveStock";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { stockReducer, topFiveStockReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
