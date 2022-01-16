import axios from "axios";
import { IBchPriceResource } from "../state/state";

export function fetchBchHistory() {
  return axios.get<[]>(
    `https://index-api.bitcoin.com/api/v0/cash/history?span=all`
  );
}

export function fetchBchPrice() {
  return axios.get<IBchPriceResource>(
    `https://index-api.bitcoin.com/api/v0/cash/price/usd`
  );
}

export function fetchNews() {
  return axios.get(`https://news.bitcoin.com/feed/`);
}
