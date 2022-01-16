export interface AppState {
  bchList: [];
  currentBch: IBchPriceResource | undefined;
  newsList: INewsListResource[];
}

export interface IBchPriceResource {
  stamp: number;
  price: number;
}

export interface INewsListResource {
  title: string;
  pubDate: string;
  link: string;
}
