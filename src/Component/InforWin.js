import React from "react";

class InforWin extends React.PureComponent  {
  render() {
    const {src}=this.props
    return (
      <div className=" row col-6">
        <img src={src} alt="Tuaan" className=" imgwin" />
        <img src="./image/win.png" alt="Tuaan" className=" imgwin" />
      </div>
    );
  }
}

export default InforWin;
