import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar.js";
import './Shopping.css';
import {logout} from '../../actions/auth';
import Footer from '../../components/footer/footer';
import Bar from '../../components/announcements/Bar'; 

class Shopping extends Component {
    
    render(){    
        return (
            <div>
                <Navbar logout={logout} />
                <Bar />
                <Footer />
            </div>
        );
    }
}
export default Shopping;
