import React, { Component } from 'react';
import './error_displayer.css';

class Error_displayer extends Component {

    constructor(props){
        super(props)
        this.state={
            errors: []
        }
    }

    // transform if json is string and update 
    transform = (response) => {
        if(typeof(response) ==='string'){
            const json = JSON.parse(response)
            response = json
            console.log(response)
        }
        const keys = Object.keys(response)
        console.log(keys)
        let ref = [...this.state.errors]
        keys.forEach(key =>{
            if (typeof(response[key]) !== 'string'){
                const str = JSON.stringify(response[key])
                ref.push([key, str])
            }else{
                ref.push([key, response[key]])    
            }
        })
        console.log('wynik: '+ref)
        return ref
    }
    
    // at end of animation remove error from list
    exclude_error = (item) => {
        let ref = this.state.errors.filter(x => x !== item)
        return ref
    }

    update_error = (response) => {
        let updated = this.transform(response)
        this.setState({errors : updated})
    }

    delete_error = (item) => {
        let deleted = this.exclude_error(item)
        this.setState({errors : deleted})
    }
    
    render() {
        return (
            <div className='error-box'>
                {this.state.errors.map((item, index) => {
                    return (
                        <div className="error" 
                            id="show-hide"
                            onAnimationEnd={()=> this.delete_error(item)}
                            onClick={() => this.delete_error(item)}
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
