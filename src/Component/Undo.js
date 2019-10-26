import React from "react";
import { connect } from "react-redux";
import * as actions from "../Action/actions";

class Undo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  undo = () => {
    const { undo } = this.props;
    let { state } = this.props;
    if(!state.win){
      state.history.pop();
      const un= [[]];
      state.history.map(his => {
        un[[his.i, his.j]] = his.value;
        return null;
      });
      state = {
        ...state,
        squares: un,
        history: state.history,
        turn: !state.turn
      };
    }
   
    undo(state.history, state.turn,state.squares);
    
  };

  render() {
    return (
      <div className="col-3 col-sm-3">
        <button
          type="button"
          className=" btn btn-primary fa fa-undo"
          onClick={this.undo}
        >
          Undo
        </button>
      </div>
    );
  }
}
const mapStatetoProsps = state => {
  return {
    state
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    undo: (history, turn, squares) => {
      dispatch(actions.undo(history, turn, squares));
    }
  };
};
export default connect(
  mapStatetoProsps,
  mapDispatchtoProps
)(Undo);
