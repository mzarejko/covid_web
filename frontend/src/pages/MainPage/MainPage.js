import React, { Component } from 'react';
import axiosInstance from "../../components/Axios/axiosApi";
import Navbar from "../../components/Navbar/Navbar.js";
import './MainPage.css';

class MainPage extends Component {
    
    logout = () => {
        console.log(axiosInstance)
        axiosInstance.post('/accounts/logout/', {
            "refresh" : localStorage.getItem('refresh_token')
        }).then((response) => {
            console.log(response)
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            this.props.history.push('/'); 
        }).catch((err) => {
            console.log(err)
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
