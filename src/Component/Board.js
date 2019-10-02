/* eslint-disable react/prop-types */
import React from "react";
import Square from "./Square";
import NewGame from "./NewGame";
import Undo from "./Undo";
import InforWin from "./InforWin";
import Mode from "./Mode";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: true,
      size: 20,
      value: ["./image/X.png", "./image/O.png"],
      squares: [[]],
      win: false,
      lineWin: [[]],
      modeTwohead: false,
      history: []
    };
  }

  handleClick = (i, j) => {
    const { win, squares, history, turn, value } = this.state;
    const valueO = value[0];
    const valueY = value[1];
    if (!win) {
      if (squares[[i, j]] == null) {
        if (turn) squares[[i, j]] = valueO;
        else squares[[i, j]] = valueY;
        this.setState({
          squares,
          turn: !turn,
          history: [...history, { i, j, value: squares[[i, j]] }]
        });
      }

      if (this.isEndGame(i, j))
        this.setState({
          win: !win
        }); 
    }
  };

  renderSquare = (i, j) => {
    const { lineWin, squares } = this.state;
    return (
      <Square
        key={[i, j]}
        lineWin={lineWin[[i, j]]}
        value={squares[[i, j]]}
        onClick={() => this.handleClick(i, j)}
      />
    );
  };

  renderRowSquare = j => {
    const row = [];
    const { size } = this.state;
    for (let i = 0; i < size; i += 1) {
      row.push(this.renderSquare(i, j));
    }
    return <div>{row}</div>;
  };

  renderBoard = () => {
    const board = [];
    const { size } = this.state;
    for (let j = 0; j < size; j += 1) {
      board.push(
        <div className="row" key={j}>
          <div className="col-12">{this.renderRowSquare(j)}</div>
        </div>
      );
    }
    return <div className="board row">{board}</div>;
  };

  isEndGameHorizontal = (i, j) => {
    let countLeft;
    let countRight;
    countLeft = 0;
    countRight = 0;
    const { lineWin, squares, value, size, modeTwohead } = this.state;
    let mode = 0;
    const squareClick = squares[[i, j]];

    for (let index = i; index >= 0; index -= 1) {
      if (squares[[index, j]] === squareClick) {
        lineWin[[index, j]] = "black";
        countLeft += 1;
        if (index === 0) mode += 1;
      } else {
        if (index > 0) {
          const head = squares[[index, j]];
          if (
            (head === value[0] || head === value[1]) &&
            head !== squareClick
          ) {
            mode += 1;
          }
        } else mode += 1;
        break;
      }
    }

    if (countLeft === 0) countRight += 1;

    for (let index = i + 1; index < size; index += 1) {
      if (squares[[index, j]] === squareClick) {
        countRight += 1;
        lineWin[[index, j]] = "black";
        if (index === size - 1) mode += 1;
      } else {
        if (index < size) {
          const head = squares[[index, j]];
          if (
            (head === value[0] || head === value[1]) &&
            head !== squareClick
          ) {
            mode += 1;
          }
        }
        break;
      }
    }
    if (!modeTwohead) {
      if (countLeft + countRight < 5) {
        this.setState({
          lineWin: [[null, null]]
        });
      } else {
        this.setState({
          lineWin
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
        lineWin
      });
    }
    return countLeft + countRight >= 5 && mode !== 2;
  };

  isEndGameVertical = (i, j) => {
    let countTop;
    let countBotton;
    countTop = 0;
    countBotton = 0;
    const { lineWin, squares, value, size, modeTwohead } = this.state;
    let mode = 0;
    const squareClick = squares[[i, j]];

    for (let index = j; index >= 0; index -= 1) {
      if (squares[[i, index]] === squares[[i, j]]) {
        countTop += 1;
        lineWin[[i, index]] = "black";
        if (index === 0) mode += 1;
      } else {
        if (index > 0) {
          const head = squares[[i, index]];
          if (
            (head === value[0] || head === value[1]) &&
            head !== squareClick
          ) {
            mode += 1;
          }
        } else mode += 1;
        break;
      }
    }
    if (countTop === 0) countBotton += 1;
    for (let index = j + 1; index <= size; index += 1) {
      if (squares[[i, index]] === squares[[i, j]]) {
        countBotton += 1;
        lineWin[[i, index]] = "black";
        if (index === size - 1) mode += 1;
      } else {
        if (index < size) {
          const head = squares[[i, index]];
          if (
            (head === value[0] || head === value[1]) &&
            head !== squareClick
          ) {
            mode += 1;
          }
        }
        break;
      }
    }
    if (!modeTwohead) {
      if (countTop + countBotton < 5) {
        this.setState({
          lineWin: [[null, null]]
        });
      } else {
        this.setState({
          lineWin
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
        lineWin
      });
    }
    return countTop + countBotton >= 5 && mode !== 2;
  };

  isEndGameCheoChinh = (i, j) => {
    let countTop;
    let countBotton;
    countTop = 0;
    countBotton = 0;
    const { lineWin, squares, value, size, modeTwohead } = this.state;
    let mode = 0;
    const squareClick = squares[[i, j]];
    for (let index = 0; index <= i; index += 1) {
      if (squares[[i - index, j - index]] === squares[[i, j]]) {
        countTop += 1;
        if (i - index === 0) mode += 1;
        lineWin[[i - index, j - index]] = "black";
      } else {
        if (index > 0) {
          const head = squares[[i - index, j - index]];
          if (
            (head === value[0] || head === value[1]) &&
            head !== squareClick
          ) {
            mode += 1;
          }
        } else mode += 1;
        break;
      }
    }
    if (countTop === 0) countBotton += 1;
    for (let index = 1; index < size; index += 1) {
      if (squares[[i + index, j + index]] === squares[[i, j]]) {
        countBotton += 1;
        lineWin[[i + index, j + index]] = "black";
        if (j + index === size - 1) mode += 1;
      } else {
        if (index < size) {
          const head = squares[[i + index, j + index]];
          if (
            (head === value[0] || head === value[1]) &&
            head !== squareClick
          ) {
            mode += 1;
          }
        }
        break;
      }
    }
    if (!modeTwohead) {
      if (countTop + countBotton < 5) {
        this.setState({
          lineWin: [[null, null]]
        });
      } else {
        this.setState({
          lineWin
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
        lineWin
      });
    }
    return countTop + countBotton >= 5 && mode !== 2;
  };

  isEndGameCheoPhu = (i, j) => {
    let countTop;
    let countBotton;
    countTop = 0;
    countBotton = 0;
    const { lineWin, squares, value, size, modeTwohead } = this.state;
    let mode = 0;
    const squareClick = squares[[i, j]];
    for (let index = 0; index <= i; index += 1) {
      if (squares[[i + index, j - index]] === squares[[i, j]]) {
        countTop += 1;
        if (i - index === 0) mode += 1;
        lineWin[[i + index, j - index]] = "black";
      } else {
        if (index > 0) {
          const head = squares[[i + index, j - index]];
          if (
            (head === value[0] || head === value[1]) &&
            head !== squareClick
          ) {
            mode += 1;
          }
        } else mode += 1;
        break;
      }
    }
    if (countTop === 0) countBotton += 1;
    for (let index = 1; index < size; index += 1) {
      if (squares[[i - index, j + index]] === squares[[i, j]]) {
        countBotton += 1;
        lineWin[[i - index, j + index]] = "black";
        if (j + index === size - 1) mode += 1;
      } else {
        if (index < size) {
          const head = squares[[i - index, j + index]];
          if (
            (head === value[0] || head === value[1]) &&
            head !== squareClick
          ) {
            mode += 1;
          }
        }
        break;
      }
    }
    if (!modeTwohead) {
      if (countTop + countBotton < 5) {
        this.setState({
          lineWin: [[null, null]]
        });
      } else {
        this.setState({
          lineWin
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
        lineWin
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

  InforWin = () => {
    const { turn, value } = this.state;
    const src = !turn ? value[0] : value[1];
    return <InforWin src={src} />;
  };

  newgame = () => {
    this.setState({
      squares: [[]],
      turn: true,
      win: false,
      lineWin: [[]],
      history: []
    });
  
  };

  undo = () => {
    const { history, win, turn } = this.state;
    if (!win && history) {
      history.pop();
      const undo = [[]];
      history.map(his => {
        undo[[his.i, his.j]] = his.value;
        return null;
      });
      this.setState({
        squares: undo,
        turn: !turn,
        history
      });
    }
  };

  setMode = modeTwohead => {
    this.setState({
      modeTwohead
    });
  };

  render() {
    const { win } = this.state;
    let { turn } = this.state;
    turn = turn ? "X" : "O";
    const inforWin = win ? this.InforWin() : "";
    return (
      <div>
        <div className="row menu">
          <div className="col-6 row ">
            <NewGame newgame={this.newgame} />
            <Undo undo={this.undo} />
            Chặn hai đầu:
            <Mode mode={this.setMode} />
            <div className="col-3 col-sm-3"> Đến lượt:{turn}</div>
          </div>
          {inforWin}
        </div>
        <br />
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
