/* eslint-disable react/prop-types */
import React from "react";
import Square from "./Square";
import NewGame from "./NewGame";
import Undo from "./Undo";
import InforWin from "./InforWin";
import Mode from "./Mode";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: true,
      size: 20,
      value: ["./image/X.png", "./image/O.png"],
      squares: [[null, null]],
      win: false,
      lineWin: [[null, null]],
      modeTwohead: false
    };
  }

  handleClick = (i, j) => {
    if (!this.state.win) {
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
    }
  };

  setHistory = squares => {
    return this.props.setHistory(squares);
  };

  renderSquare = (i, j) => {
    return (
      <Square
        key={[i, j]}
        lineWin={this.state.lineWin[[i, j]]}
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

  renderBoard() {
    var board = [];
    for (var j = 0; j < this.state.size; j++) {
      board.push(
        <div className="row" key={j}>
          <div className="col-12">{this.renderRowSquare(j)}</div>
        </div>
      );
    }
    return <div className="board row">{board}</div>;
  }

  InforWin() {
    var src = !this.state.turn ? this.state.value[0] : this.state.value[1];
    return <InforWin src={src} />;
  }

  newgame = () => {
    this.setState({
      squares: [[null, null]],
      turn: true,
      win: false,
      lineWin: [[null, null]]
    });
  };

  undo = () => {
    
  };

  isEndGameHorizontal = (i, j) => {
    var countLeft, countRight;
    countLeft = 0;
    countRight = 0;
    var lineWin = this.state.lineWin;
    var mode = 0;
    var squareClick = this.state.squares[[i, j]];

    for (let index = i; index >= 0; index--) {
      if (this.state.squares[[index, j]] === squareClick) {
        lineWin[[index, j]] = "black";
        countLeft++;
        if (index === 0) mode = mode + 1;
      } else {
        if (index > 0) {
          var head = this.state.squares[[index, j]];
          if (
            (head === this.state.value[0] || head === this.state.value[1]) &&
            head !== squareClick
          ) {
            mode = mode + 1;
          }
        } else mode = mode + 1;
        break;
      }
    }

    if (countLeft === 0) countRight++;

    for (let index = i + 1; index < this.state.size; index++) {
      if (this.state.squares[[index, j]] === squareClick) {
        countRight++;
        lineWin[[index, j]] = "black";
        if (index === this.state.size - 1) mode = mode + 1;
      } else {
        if (index < this.state.size) {
          head = this.state.squares[[index, j]];
          if (
            (head === this.state.value[0] || head === this.state.value[1]) &&
            head !== squareClick
          ) {
            mode = mode + 1;
          }
        }
        break;
      }
    }
    if (!this.state.modeTwohead) {
      if (countLeft + countRight < 5) {
        this.setState({
          lineWin: [[null, null]]
        });
      } else {
        this.setState({
          lineWin: lineWin
        });
      }
      return countLeft + countRight >= 5;
    }

    if (countLeft + countRight < 5 || mode === 2) {
      this.setState({
        lineWin: [[null, null]]
      });
    } else {
      this.setState({
        lineWin: lineWin
      });
    }
    return countLeft + countRight >= 5 && mode !== 2;
  };

  isEndGameVertical = (i, j) => {
    var countTop, countBotton;
    countTop = 0;
    countBotton = 0;
    var lineWin = this.state.lineWin;
    var mode = 0;
    var squareClick = this.state.squares[[i, j]];

    for (let index = j; index >= 0; index--) {
      if (this.state.squares[[i, index]] === this.state.squares[[i, j]]) {
        countTop++;
        lineWin[[i, index]] = "black";
        if (index === 0) mode = mode + 1;
      } else {
        if (index > 0) {
          var head = this.state.squares[[i, index]];
          //console.log(head);
          if (
            (head === this.state.value[0] || head === this.state.value[1]) &&
            head !== squareClick
          ) {
            mode = mode + 1;
          }
        } else mode = mode + 1;
        break;
      }
    }
    if (countTop === 0) countBotton++;
    for (let index = j + 1; index <= this.state.size; index++) {
      if (this.state.squares[[i, index]] === this.state.squares[[i, j]]) {
        countBotton++;
        lineWin[[i, index]] = "black";
        if (index === this.state.size - 1) mode = mode + 1;
      } else {
        if (index < this.state.size) {
          head = this.state.squares[[i, index]];
          if (
            (head === this.state.value[0] || head === this.state.value[1]) &&
            head !== squareClick
          ) {
            mode = mode + 1;
          }
        }
        break;
      }
    }
    if (!this.state.modeTwohead) {
      if (countTop + countBotton < 5) {
        this.setState({
          lineWin: [[null, null]]
        });
      } else {
        this.setState({
          lineWin: lineWin
        });
      }
      return countTop + countBotton >= 5;
    }
    if (countTop + countBotton < 5 || mode === 2) {
      this.setState({
        lineWin: [[null, null]]
      });
    } else {
      this.setState({
        lineWin: lineWin
      });
    }
    return countTop + countBotton >= 5 && mode !== 2;
  };

  isEndGameCheoChinh = (i, j) => {
    var countTop, countBotton;
    countTop = 0;
    countBotton = 0;
    var lineWin = this.state.lineWin;
    var mode = 0;
    var squareClick = this.state.squares[[i, j]];
    for (var index = 0; index <= i; index++) {
      if (
        this.state.squares[[i - index, j - index]] ===
        this.state.squares[[i, j]]
      ) {
        countTop++;
        if (i - index === 0) mode = mode + 1;
        lineWin[[i - index, j - index]] = "black";
      } else {
        if (index > 0) {
          var head = this.state.squares[[i - index, j - index]];
          if (
            (head === this.state.value[0] || head === this.state.value[1]) &&
            head !== squareClick
          ) {
            mode = mode + 1;
          }
        } else mode = mode + 1;
        break;
      }
    }
    if (countTop === 0) countBotton++;
    for (let index = 1; index < this.state.size; index++) {
      if (
        this.state.squares[[i + index, j + index]] ===
        this.state.squares[[i, j]]
      ) {
        countBotton++;
        lineWin[[i + index, j + index]] = "black";
        if (j + index === this.state.size - 1) mode = mode + 1;
      } else {
        if (index < this.state.size) {
          head = this.state.squares[[i + index, j + index]];
          if (
            (head === this.state.value[0] || head === this.state.value[1]) &&
            head !== squareClick
          ) {
            mode = mode + 1;
          }
        }
        break;
      }
    }
    if (!this.state.modeTwohead) {
      if (countTop + countBotton < 5) {
        this.setState({
          lineWin: [[null, null]]
        });
      } else {
        this.setState({
          lineWin: lineWin
        });
      }
      return countTop + countBotton >= 5;
    }
    if (countTop + countBotton < 5 || mode === 2) {
      this.setState({
        lineWin: [[null, null]]
      });
    } else {
      this.setState({
        lineWin: lineWin
      });
    }
    return countTop + countBotton >= 5 && mode !== 2;
  };

  isEndGameCheoPhu = (i, j) => {
    var countTop, countBotton;
    countTop = 0;
    countBotton = 0;
    var lineWin = this.state.lineWin;
    var mode = 0;
    var squareClick = this.state.squares[[i, j]];
    for (var index = 0; index <= i; index++) {
      if (
        this.state.squares[[i + index, j - index]] ===
        this.state.squares[[i, j]]
      ) {
        countTop++;
        if (i - index === 0) mode = mode + 1;
        lineWin[[i + index, j - index]] = "black";
      } else {
        if (index > 0) {
          var head = this.state.squares[[i + index, j - index]];
          if (
            (head === this.state.value[0] || head === this.state.value[1]) &&
            head !== squareClick
          ) {
            mode = mode + 1;
          }
        } else mode = mode + 1;
        break;
      }
    }
    if (countTop === 0) countBotton++;
    for (let index = 1; index < this.state.size; index++) {
      if (
        this.state.squares[[i - index, j + index]] ===
        this.state.squares[[i, j]]
      ) {
        countBotton++;
        lineWin[[i - index, j + index]] = "black";
        if (j + index === this.state.size - 1) mode = mode + 1;
      } else {
        if (index < this.state.size) {
          head = this.state.squares[[i - index, j + index]];
          if (
            (head === this.state.value[0] || head === this.state.value[1]) &&
            head !== squareClick
          ) {
            mode = mode + 1;
          }
        }
        break;
      }
    }
    if (!this.state.modeTwohead) {
      if (countTop + countBotton < 5) {
        this.setState({
          lineWin: [[null, null]]
        });
      } else {
        this.setState({
          lineWin: lineWin
        });
      }
      return countTop + countBotton >= 5;
    }
    if (countTop + countBotton < 5 || mode === 2) {
      this.setState({
        lineWin: [[null, null]]
      });
    } else {
      this.setState({
        lineWin: lineWin
      });
    }

    return countTop + countBotton >= 5 && mode !== 2;
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

  setMode = (modeTwohead)=> {
    this.setState({
      modeTwohead: modeTwohead
    });
  };

  render() {
    var turn = this.state.turn ? "X" : "O";
    var InforWin = this.state.win ? this.InforWin() : "";
    return (
      <div>
        <div className="row menu">
          <div className="col-6 row ">
            <NewGame newgame={() => this.newgame()} />
            <Undo undo={this.undo} />
            Chặn hai đầu:
            <Mode mode={this.setMode} />
            <div className="col-3 col-sm-3">Đến lượt:{turn}</div>
          </div>
          {InforWin}
        </div>
        <br />
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
