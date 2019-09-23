import React from "react";

class InforWin extends React.Component {
  render() {
    return (
      <div className=" row col-6">
        <img src={this.props.src} alt="Tuaan" className=" imgwin" />
        <img src="./image/win.png" alt="Tuaan" className=" imgwin" />
      </div>
    );
  }
}

export default InforWin;
