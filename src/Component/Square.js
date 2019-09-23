import React from "react";

class Square extends React.Component {
  setStyle(Background, BackgroundColor) {
    console.log(BackgroundColor+" df");
    return {
      backgroundColor: `${BackgroundColor}`,
      backgroundImage: `url(${Background})`
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
