import React from "react";

class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { newgame } = this.props;
    return (
      <div className="col-3 col-sm-3">
        <button
          type="button"
          className="btn btn-primary fa fa-play"
          onClick={newgame}
        >
          Ván mới
        </button>
      </div>
    );
  }
}

export default NewGame;
