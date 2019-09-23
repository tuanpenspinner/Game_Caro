import React from "react";

class Mode extends React.Component {

  changeMode=()=>{
    return this.props.mode(this.refs.check.checked)
  }

  render() {
    return (
      <div className="col-3 col-sm-3">
        <input type="checkbox" ref='check' value="tuan" onChange={this.changeMode}></input>
      </div>
    );
  }
}

export default Mode;
