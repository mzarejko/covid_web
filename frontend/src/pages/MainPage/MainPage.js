import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar.js";
import './MainPage.css';
import MainLogo from "../../components/MainLogo/MainLogo.js";
import {logout} from '../../actions/auth';

class MainPage extends Component {
    
    render(){    
        return (
            <div>
                <Navbar logout={logout} />
                <MainLogo />
            </div>
        );
    }
}
export default MainPage;
