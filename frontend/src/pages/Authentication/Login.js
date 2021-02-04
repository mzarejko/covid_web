import React, { Component } from 'react';
import './auth_style.css';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    
    constructor(props){
        super(props)
        this.state={
            username: "",
            password: "",
            error: ""
        };
    }


    changeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://0.0.0.0:8000/accounts/login/', {
            "username": this.state.username,
            "password": this.state.password
        }).then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            this.props.history.push('/home/'); 
        }).catch((error) => {
            this.setState({error: error.request.response})
            console.log(error)
        });
    }
    

    render(){    
        return (
            <div className="box">
                <div className="columns">
                    <div className="rows">
                        <label className="items">
                            username
                            <input
                                name="username"
                                type="text"
                                value={this.state.username}
                                onChange={this.changeValue}
                            />
                        </label>
                        <label className="items">
                            password  
                            <input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.changeValue}
                            />
                        </label>
                        <div className='items'>
                            <p>{this.state.error}</p>
                        </div>
                    </div>
                    <div className="rows">
                        <div className='items'>
                        
                            <button onClick={this.handleSubmit}>login</button>
                        </div>
                        <div className='items'>
                            <Link to='/register'><button>Sign up</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
