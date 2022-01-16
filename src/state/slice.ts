import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBchHistory, getBchPrice, getNews } from "./operations";
import { AppState, IBchPriceResource, INewsListResource } from "./state";

const initialState: AppState = {
  bchList: [],
  currentBch: undefined,
  newsList: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBchHistory.fulfilled, (state, action: PayloadAction<[]>) => {
        state.bchList = action.payload;
      })
      .addCase(
        getBchPrice.fulfilled,
        (state, action: PayloadAction<IBchPriceResource>) => {
          state.currentBch = action.payload;
        }
      )
      .addCase(
        getNews.fulfilled,
        (state, action: PayloadAction<INewsListResource[]>) => {
          state.newsList = action.payload.slice(0, 4);
        }
      );
  },
});
