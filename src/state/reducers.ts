import { combineReducers } from "redux";
import { IStore } from "./store";
import { appSlice } from "./slice";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers<IStore>({
  app: appSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
