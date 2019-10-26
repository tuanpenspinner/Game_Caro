import React from "react";
import {connect} from "react-redux"

class InforWin extends React.PureComponent  {
  render() {
    const { turn, value } = this.props;
    const src = !turn ? value[0] : value[1];
    return (
      <div className=" row col-6">
        <img src={src} alt="Tuaan" className=" imgwin" />
        <img src="./image/win.png" alt="Tuaan" className=" imgwin" />
      </div>
    );
  }
}

const mapStatetoProps=(state)=>{
  return{
    turn:state.turn,
    value:state.value
  }
}

export default connect(mapStatetoProps,null) (InforWin);
