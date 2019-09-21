import React, { Component } from "react";
import Board from "./Board";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history:[]
    };
  }
  setHistory = squares => {
    //console.log(squares);
   // console.log(this.state.history);
    var history = this.state.history;
    history.push(squares);
    this.setState({
      history: history
    });
  
  };
  render() {
    return (
      <div className="container mt-10">
       
        <Board getHistory={this.state.history} setHistory={this.setHistory} />
      </div>
    );
  }
}

export default Game;
