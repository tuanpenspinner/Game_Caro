import React from "react";

class Square extends React.Component {
  setStyle = (Background, BackgroundColor) => {
    return {
      backgroundColor: `${BackgroundColor}`,
      backgroundImage: `url(${Background})`
    };
  };

  render() {
    const { value, onClick, lineWin } = this.props;
    return (
      <div>
        <button
          type="button"
          className="square"
          onClick={onClick}
          style={this.setStyle(value, lineWin)}
        />
      </div>
    );
  }
}

export default Square;
