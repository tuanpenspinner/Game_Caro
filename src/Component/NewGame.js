import React from "react";

class NewGame extends React.Component {
  newgame = () => {
    this.props.newgame();
  };
  render() {
    return (
      <div className="col-3 col-sm-3">
        <button className="btn btn-primary fa fa-play" onClick={this.newgame}>
          Ván mới
        </button>
      </div>
    );
  }
}

export default NewGame;
