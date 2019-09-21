import React, { Component } from 'react';

class InforWin extends Component {
    render() {
        return (
            <div  className="imgwin row">

                <img src={this.props.src} alt="Tuaan" className="col-4" /> 
                <img src='./win.png' alt="Tuaan" className="col-6"/> 
            </div>
        );
    }
}

export default InforWin;