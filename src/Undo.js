import React, { Component } from "react";

class Undo extends Component {
  undo = () => {
    this.props.undo();
  };
  render() {
    return (
      <button
        className=" btn btn-primary m-2 fa fa-undo"
        onClick={() => this.undo()}
      >
        Undo
      </button>
    );
  }
}

export default Undo;
