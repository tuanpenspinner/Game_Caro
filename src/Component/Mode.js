import React from "react";

class Mode extends React.Component {

  changeMode=()=>{
    const {mode}=this.props;
    const {check} = this.refs;

    return mode(check.checked)
  }

  render() {
    const check="check"
    return (
      <div className="col-3 col-sm-3">
        <input type="checkbox" ref={check} value="tuan" onChange={this.changeMode} />
      </div>
    );
  }
}

export default Mode;
