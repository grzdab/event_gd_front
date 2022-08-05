import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./componentSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  }
})