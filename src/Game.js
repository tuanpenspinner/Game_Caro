import React, { Component } from "react";
import Board from "./Board";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      index:0
    };
  }
  setHistory = squares => {
    //console.log(squares);
    var history = this.state.history;
  
    //console.log(squares)
    this.setState({
      history: history,
      index:this.state.index+1
    });
    //var h=this.state.history
    //console.log(h);
    //console.log(squares);
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
