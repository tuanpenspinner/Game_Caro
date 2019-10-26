import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "../src/Component/Game";
import { Provider } from "react-redux";
import Receducer from "./Reducer/Reducer";
import { createStore } from "redux";
import * as serviceWorker from "../src/serviceWorker";
const store = createStore(
  Receducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
