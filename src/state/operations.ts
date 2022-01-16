import { createAsyncThunk } from "@reduxjs/toolkit";
import { XMLParser } from "fast-xml-parser";
import { fetchBchHistory, fetchBchPrice, fetchNews } from "../api";
import { IBchPriceResource, INewsListResource } from "./state";

export const getBchHistory = createAsyncThunk<[]>("getBchHistory", async () => {
  const res = await fetchBchHistory();
  return res.data;
});

export const getBchPrice = createAsyncThunk<IBchPriceResource>(
  "getBchPrice",
  async () => {
    const res = await fetchBchPrice();
    return res.data;
  }
);

export const getNews = createAsyncThunk<INewsListResource[]>(
  "getNews",
  async () => {
    const res = await fetchNews();
    const parser = new XMLParser();
    const parsedData = parser.parse(res.data);
    return parsedData.rss.channel.item;
  }
);
