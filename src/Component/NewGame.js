import React from "react";
import { connect } from "react-redux";
import * as actions from "../Action/actions";

class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  newgame = () => {
    const { newgame } = this.props;
    newgame();
  };

  render() {
    return (
      <div className="col-3 col-sm-3">
        <button
          type="button"
          className="btn btn-primary fa fa-play"
          onClick={this.newgame}
        >
          Ván mới
        </button>
      </div>
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
    newgame: () => {
      dispatch(actions.newGame());
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(NewGame);
