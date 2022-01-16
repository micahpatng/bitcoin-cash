import React, { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppMain } from "./App";
import "./index.css";
import { store } from "./state/reducers";

function App() {
  return (
    <Provider store={store}>
      <AppMain />
    </Provider>
  );
}

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
