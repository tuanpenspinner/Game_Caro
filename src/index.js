import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "../src/Component/Game";
import * as serviceWorker from "../src/serviceWorker";

ReactDOM.render(<Game />, document.getElementById("root"));
serviceWorker.unregister();
