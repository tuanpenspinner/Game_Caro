import React, { Component } from "react";

class NewGame extends Component {
  newgame = () => {
    this.props.newgame();
  };
  render() {
    return (
      <button className="btn btn-primary fa fa-play" onClick={() => this.newgame()}>
        Ván mới
      </button>
    );
  }
}

export default NewGame;
