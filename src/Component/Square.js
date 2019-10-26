import React from "react";
import { connect } from "react-redux";
import * as actions from "../Action/actions";

class Square extends React.Component {
  setStyle = (Background, BackgroundColor) => {
    return {
      backgroundColor: `${BackgroundColor}`,
      backgroundImage: `url(${Background})`
    };
  };

  onClick=()=>{
    const {i,j,onClick}=this.props;
    return onClick(i,j)
  }

  render() {
    const {state,i,j}=this.props
    const Background=state.squares[[i,j]];
    const BackgroundColor= state.lineWin[[i,j]]
    return (
      <button
        type="button"
        className="square"
        onClick={this.onClick}
        style={this.setStyle(Background,BackgroundColor)}
      >
      .
      </button>
    );
  }
}

const mapStatetoProps = state => {
  return {
    state
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    onClick:(i, j)=>{
      dispatch(actions.onClick(i, j));
    }
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Square);
