import React, { Component } from "react";
import Square from "./Square";
import NewGame from "./NewGame";
import Undo from "./Undo";
import InforWin from "./InforWin";

export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: true,
      size: 20,
      value: ["./X.png", "./O.png"],
      squares: [[null, null]],
      win: false
    };
  }

  handleClick = (i, j) => {
    var squares = this.state.squares;
    if (this.state.turn && this.state.squares[[i, j]] == null) {
      squares[[i, j]] = this.state.value[0];
      this.setState({
        squares: squares,
        turn: !this.state.turn
      });
      this.setHistory(this.state.squares);
    } else if (this.state.squares[[i, j]] == null) {
      squares[[i, j]] = this.state.value[1];
      this.setState({
        squares: squares,
        turn: !this.state.turn
      });
      this.setHistory(this.state.squares);
    }
    this.isEndGame(i, j)
      ? this.setState({
          win: true
        })
      : this.setState({
          win: this.state.win
        });
  };
  setHistory = squares => {
    return this.props.setHistory(squares);
  };

  renderSquare = (i, j) => {
    return (
      <Square
        key={[i, j]}
        value={this.state.squares[[i, j]]}
        onClick={() => this.handleClick(i, j)}
      />
    );
  };

  renderRowSquare = j => {
    var row = [];
    for (var i = 0; i < this.state.size; i++) {
      row.push(this.renderSquare(i, j));
    }
    return <div>{row}</div>;
  };

  renderBoard(){
    var board = [];
    for (var j = 0; j < this.state.size; j++) {
      board.push(
        <div className="row" key={j}>
          <div className="col-12">{this.renderRowSquare(j)}</div>
        </div>
      );
    }

   var InforWin = (this.state.win)?this.InforWin():"";
    return (
      <div className="board">
      {InforWin}
        {board}
      </div>
    );
  }

  InforWin(){
    var src=(!this.state.turn)?'./X.png':'./O.png'
    return <InforWin src={src}/>
  }

  newgame = () => {
    var squares = [[null, null]];
    this.setState({
      squares: squares,
      turn: true,
      win: false
    });
  };

  undo = () => {
    //   squares: undo[undo.length-1]
    // });
  };

  isEndGameHorizontal = (i, j) => {
    var countLeft, countRight;
    countLeft = 0;
    countRight = 0;
    for (let index = i; index >= 0; index--) {
      if (this.state.squares[[index, j]] === this.state.squares[[i, j]]) {
        countLeft++;
      } else {
        break;
      }
    }
    if (countLeft === 0) countRight++;
    for (let index = i + 1; index <= this.state.size; index++) {
      if (this.state.squares[[index, j]] === this.state.squares[[i, j]]) {
        countRight++;
      } else {
        break;
      }
    }
    return countLeft + countRight === 5;
  };
  isEndGameVertical = (i, j) => {
    var countTop, countBotton;
    countTop = 0;
    countBotton = 0;
    for (let index = j; index >= 0; index--) {
      if (this.state.squares[[i, index]] === this.state.squares[[i, j]]) {
        countTop++;
      } else {
        break;
      }
    }
    if (countTop === 0) countBotton++;
    for (let index = j + 1; index <= this.state.size; index++) {
      if (this.state.squares[[i, index]] === this.state.squares[[i, j]]) {
        countBotton++;
      } else {
        break;
      }
    }

    return countTop + countBotton === 5;
  };
  isEndGameCheoChinh = (i, j) => {
    var countTop, countBotton;
    countTop = 0;
    countBotton = 0;
    for (var index = 0; index <= i; index++) {
      if (
        this.state.squares[[i - index, j - index]] ===
        this.state.squares[[i, j]]
      ) {
        countTop++;
      } else {
        break;
      }
    }
    if (countTop === 0) countBotton++;
    for (let index = 1; index <= this.state.size; index++) {
      if (
        this.state.squares[[i + index, j + index]] ===
        this.state.squares[[i, j]]
      ) {
        countBotton++;
      } else {
        break;
      }
    }
    return countTop + countBotton === 5;
  };
  isEndGameCheoPhu = (i, j) => {
    var countTop, countBotton;
    countTop = 0;
    countBotton = 0;
    for (var index = 0; index <=this.state.size; index++) {
      if (
        this.state.squares[[i + index, j - index]] ===
        this.state.squares[[i, j]]
      ) {
        countTop++;
      } else {
        break;
      }
    }
    if (countTop === 0) countBotton++;
    for (let index = 1; index <= this.state.size; index++) {
      if (
        this.state.squares[[i - index, j + index]] ===
        this.state.squares[[i, j]]
      ) {
        countBotton++;
      } else {
        break;
      }
    }
    return countTop + countBotton === 5;
  };
  isEndGame = (i, j) => {
    return (
      this.isEndGameHorizontal(i, j) ||
      this.isEndGameVertical(i, j) ||
      this.isEndGameCheoChinh(i, j) ||
      this.isEndGameCheoPhu(i, j)
    );
  };

  win(winner) {
    return this.state.win ? winner + " win!" : "";
  }

  render() {
    var turn = this.state.turn ? "X" : "O";
    var winner = this.state.turn ? "O" : "X";
    return (
      <div>
        <NewGame newgame={() => this.newgame()} />
        <Undo undo={this.undo} />
        Đến lượt:{turn}
        <br />
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
