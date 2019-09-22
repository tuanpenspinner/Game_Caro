import React, { Component } from "react";

class Undo extends Component {
  undo = () => {
    this.props.undo();
  };
  render() {
    return (
      <div className="col-3 col-sm-3">
        <button
          className=" btn btn-primary fa fa-undo"
          onClick={() => this.undo()}
        >
          Undo
        </button>
      </div>
    );
  }
}

export default Undo;
