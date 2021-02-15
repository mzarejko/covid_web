import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar.js";
import './MainPage.css';
import MainLogo from "../../components/MainLogo/MainLogo.js";
import {logout} from '../../actions/auth';
import Charts from '../../components/charts/chart';
import Footer from '../../components/footer/footer';

class MainPage extends Component {
    
    render(){    
        return (
            <div>
                <Navbar logout={logout} />
                <MainLogo />
                <Charts />
                <Footer />
            </div>
        );
    }
}
export default MainPage;
