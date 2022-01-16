import { format, subDays, subWeeks, subMonths } from "date-fns";
import { BchTimeFrame } from "../state/types";

const currentDate = new Date();

export function convertToDollar(price: number | undefined) {
  return price ? `$${price / 100}` : "";
}

export function formatDatetime(dateTime: string) {
  return format(new Date(dateTime), "yyyy-MM-dd");
}

export function getCurrentDate() {
  return format(new Date(currentDate), "yyyy-MM-dd");
}

export function getPrevDate(timeFrame: BchTimeFrame) {
  switch (timeFrame) {
    case "1D":
      return format(subDays(currentDate, 1), "yyyy-MM-dd");
    case "7D":
      return format(subWeeks(currentDate, 1), "yyyy-MM-dd");
    case "1M":
      return format(subMonths(currentDate, 1), "yyyy-MM-dd");
  }
  return "";
}

export function getPricePercentage(currPrice: number, bchList: []) {
  const prevDay = getPrevDate("1D");
  const prevDayBch = bchList.filter(
    (bch) => formatDatetime(bch[0]) === prevDay
  );

  return ((currPrice - prevDayBch[0][1]) / prevDayBch[0][1]) * 100;
}

export function filterBchListByTimeFrame(bchList: [], timeFrame: BchTimeFrame) {
  return bchList
    .map((bch) => {
      return {
        date: formatDatetime(bch[0]),
        price: bch[1],
      };
    })
    .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
    .filter((bch) => isDateInTimeFrame(bch.date, timeFrame));
}

function isDateInTimeFrame(date: string, timeFrame: BchTimeFrame) {
  switch (timeFrame) {
    case "1D":
      return date >= getPrevDate("1D");
    case "7D":
      return date >= getPrevDate("7D");
    case "1M":
      return date >= getPrevDate("1M");
    case "ALL":
      return date;
  }
}

export function getTimeFrameRange(
  timeFrame: BchTimeFrame,
  bch: { date: string; price: number }
) {
  let fromDate = "";
  switch (timeFrame) {
    case "1D":
      fromDate = getPrevDate("1D");
      break;
    case "7D":
      fromDate = getPrevDate("7D");
      break;
    case "1M":
      fromDate = getPrevDate("1M");
      break;
    case "ALL":
      if (bch) {
        fromDate = bch.date;
      }
  }

  const formatCurrDate = format(currentDate, "MMM dd, yyyy");
  const formatFromDate = format(new Date(fromDate), "MMM dd, yyyy");

  return `${formatFromDate} - ${formatCurrDate}`;
}

export function decodeXml(str: string) {
  return str.replace(/&#(\d+);/g, function (_match, dec) {
    return String.fromCharCode(dec);
  });
}
