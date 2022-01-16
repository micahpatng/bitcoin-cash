import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { News } from "./components/News";
import { getBchHistory, getBchPrice, getNews } from "./state/operations";
import { IStore } from "./state/store";
import { getPricePercentage } from "./utils/functions";

const Root = styled.div`
  display: grid;
`;

const Main = styled.div`
  margin: 10px 0px;
  display: flex;
`;

const Sidebar = styled.div`
  display: block;
  max-width: 450px;
`;

export function AppMain() {
  const bchList = useSelector((store: IStore) => store.app.bchList);
  const currentBch = useSelector((store: IStore) => store.app.currentBch);
  const newsList = useSelector((store: IStore) => store.app.newsList);
  const dispatch = useDispatch();

  const [repeater, setRepeater] = useState(0);

  useEffect(() => {
    dispatch(getBchPrice());
    setTimeout(() => setRepeater((prevState) => prevState + 1), 60000);
  }, [repeater, dispatch]);

  useEffect(() => {
    dispatch(getBchHistory());
    dispatch(getNews());
  }, [dispatch]);

  return (
    <Root>
      {currentBch && (
        <Header
          currentBch={currentBch.price}
          pricePercentage={getPricePercentage(currentBch.price, bchList)}
        />
      )}
      {bchList !== [] && (
        <Main>
          <Dashboard bchList={bchList} />
          <Sidebar>
            <Info />
            <News newsList={newsList} />
          </Sidebar>
        </Main>
      )}
    </Root>
  );
}
