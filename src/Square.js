import React, { Component } from "react";

class Square extends Component {
  setStyle(Background) {
    //console.log(Background);
    return {
      backgroundImage: `url(${Background})`
    };
  }
  render() {
    return (
      <div>
        <button
          className="square"
          onClick={() => this.props.onClick()}
          style={this.setStyle(this.props.value)}
        ></button>
      </div>
    );
  }
}

export default Square;
