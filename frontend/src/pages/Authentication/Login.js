import React, { Component } from 'react';
import {axiosInstance} from "../../components/Axios/axiosApi";
import './auth_style.css';
import { Link } from 'react-router-dom';

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
        try{
            const response = axiosInstance.post('/accounts/login/', {
                username: this.state.username,
                password: this.state.password
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        }catch (error){
            this.setState({
                error: 'złe hasło lub nazwa urzytkownika' 
            });
        }
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
                            <Link to='/register'><button>Signup</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
