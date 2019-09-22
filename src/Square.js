import React, { Component } from "react";

class Square extends Component {
  setStyle(Background,BackgroundColor) {
    return {
      backgroundImage: `url(${Background})`,
      backgroundColor: `${BackgroundColor}`
    };
  }
  render() {
    return (
      <div>
        <button
          className="square"
          onClick={() => this.props.onClick()}
          style={this.setStyle(this.props.value,this.props.lineWin)}
        ></button>
      </div>
    );
  }
}

export default Square;
