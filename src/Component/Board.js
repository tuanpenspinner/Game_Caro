import React from "react";
import { connect } from "react-redux";
import Square from "./Square";
import NewGame from "./NewGame";
import Undo from "./Undo";
import InforWin from "./InforWin";
import Mode from "./Mode";

class Board extends React.Component {
  renderSquare = (i, j) => {
    return <Square key={[i, j]} i={i} j={j} />;
  };

  renderRowSquare = j => {
    const row = [];
    const { size } = this.props;
    for (let i = 0; i < size; i += 1) {
      row.push(this.renderSquare(i, j));
    }
    return <div>{row}</div>;
  };

  renderBoard = () => {
    const board = [];
    const { size } = this.props;
    for (let j = 0; j < size; j += 1) {
      board.push(
        <div className="row" key={j}>
          <div className="col-12">{this.renderRowSquare(j)}</div>
        </div>
      );
    }
    return <div className="board row">{board}</div>;
  };

  InforWin = () => {
    return <InforWin />;
  };

  render() {
    const { win } = this.props;
    let { turn } = this.props;
    turn = turn ? "X" : "O";
    const inforWin = win ? this.InforWin() : "";
    return (
      <div>
        <div className="row menu">
          <div className="col-6 row ">
            <NewGame />
            <Undo />
            Chặn hai đầu:
            <Mode />
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
const mapStatetoProps = state => {
  return {
    squares: state.squares,
    lineWin: state.lineWin,
    size: state.size,
    turn: state.turn,
    win: state.win
  };
};
export default connect(
  mapStatetoProps,
  null
)(Board);
