// import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./main.scss";
import { Provider } from "react-redux";
import store from "./app/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
