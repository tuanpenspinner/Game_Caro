import React, { Component } from 'react';

class InforWin extends Component {
    render() {
        return (
            <div  className=" row col-4">
                <img src={this.props.src} alt="Tuaan" className=" imgwin" /> 
                <img src='./win.png' alt="Tuaan" className=" imgwin"/> 
            </div>
        );
    }
}

export default InforWin;