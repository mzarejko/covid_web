import React, { Component } from 'react';
import './error_displayer.css';

class Error_displayer extends Component {
    
    render() {
        return (
            <div className='error-box'>
                {this.props.errors.map((item, index) => {
                    return (
                        <div className="error" 
                            id="show-hide"
                            onAnimationEnd={()=> this.props.remove(item)}
                            onClick={() => this.props.remove(item)}
                            key={index}>
                            <h4>{item[0]}</h4> 
                            <p>{item[1]}</p> 
                       </div>
                    )
                })}
            </div>
        )
    }
}

export default Error_displayer;
