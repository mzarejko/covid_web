import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar.js";
import {logout} from '../../actions/auth';
import {base_paths} from '../../utils/Endpoints'; 
import Cards from '../../components/Cards/cards';
import './Shopping.css';

class Shopping extends Component {
    
    render(){    
        return (
            <>
                <img src={base_paths.MAIN_VIDEO} alt="background.png" />
                <Navbar logout={logout} />
                <Cards />
            </>
        );
    }
}
export default Shopping;
