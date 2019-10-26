import React from "react";
import {connect} from "react-redux"
import * as actions from "../Action/actions"

class Mode extends React.Component {
  changeMode = () => {
    const { check } =this.refs;
    const{changeMode}=this.props
    return changeMode(check.checked);
  };
 
  render() {
    const check="check"
    return (
      <div className="col-3 col-sm-3">
        <input
          type="checkbox"
          ref={check}
          value="tuan"
          onChange={this.changeMode}
        />
      </div>
    );
  }
}

const mapStatetoProsps=(state)=>{
  return{
    state
  }
}
const mapDispatchtoProps=(dispatch)=>{
  return{
    changeMode:(modeTwohead)=>{
      dispatch(actions.changeMode(modeTwohead))
    }
  }
}
export default connect(mapStatetoProsps,mapDispatchtoProps)(Mode);
