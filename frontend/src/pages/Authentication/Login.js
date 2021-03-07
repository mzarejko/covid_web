import React, { Component } from 'react';
import './auth_style.css';
import { Link } from 'react-router-dom';
import {login} from '../../actions/auth';
import {urls} from '../../utils/urls';
import {base_paths} from '../../utils/Endpoints'; 
import Error_displayer from '../../components/error_manager/error_displayer';

class Login extends Component {

    
    constructor(props){
        super(props)
        this.state={
            username: "",
            password: "",
        };
        this.error_manager = React.createRef();
    }


    changeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    sign_in = () => {
        login(this.state.username, this.state.password, 
            this.error_manager.current.update_error
        )
    }
   
    render(){    
        return (
            <div className="outbox">
                <img src={base_paths.MAIN_VIDEO} />
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
            <Error_displayer ref={this.error_manager} />
            </div>
        );
    }
}

export default Login;
