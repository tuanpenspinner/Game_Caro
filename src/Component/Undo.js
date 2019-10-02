import React from "react";

class Undo extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  undo = () => {
    const { undo } = this.props;
    undo();
  };

  render() {
    
    return (
      <div className="col-3 col-sm-3">
        <button type="button" className=" btn btn-primary fa fa-undo" onClick={this.undo}>
          Undo
        </button>
      </div>
    );
  }
}

export default Undo;
