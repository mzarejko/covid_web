import React, { Component } from 'react';
import {axiosInstance} from "../../components/Axios/axiosApi";
import Navbar from "../../components/Navbar/Navbar.js";
import './MainPage.css';

class MainPage extends Component {
    
    logout = () => {
        axiosInstance.post('http://0.0.0.0:8000/accounts/register/', {
            refresh :  localStorage.getItem('refresh_token')
        }).catch((err) => {
            console.log("invalid token access or refresh, you can't logout")
        });
    }
   

    
    render(){    
        return (
            <div>
                <Navbar logout={this.logout} />
            </div>
        );
    }
}
export default MainPage;
