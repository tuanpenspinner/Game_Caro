import React from "react";
import Board from "./Board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container mt-10">
        <Board />
      </div>
    );
  }
}

export default Game;
