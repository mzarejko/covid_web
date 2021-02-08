import React, { Component } from 'react';
import './auth_style.css';
import { Link } from 'react-router-dom';
import {login} from '../../actions/auth';
import {urls} from '../../utils/urls';

class Login extends Component {
    
    constructor(props){
        super(props)
        this.state={
            username: "",
            password: "",
            error: ""
        };
    }

    update_error = (response) => {
        this.setState({error: response})
    }

    changeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    sign_in = () => {
        login(this.state.username, this.state.password, this.update_error)
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
                            <button onClick={this.sign_in}>login</button>
                        </div>
                        <div className='items'>
                            <Link to={urls.REGISTER}><button>Sign up</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
