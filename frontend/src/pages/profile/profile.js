import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar.js";
import {logout} from '../../actions/auth';
import {base_paths} from '../../utils/Endpoints'; 
import Users from '../../components/Users/users';
import './profile.css';

class Profile extends Component {
    
    render(){    
        return (
            <>
                <img src={base_paths.MAIN_VIDEO} />
                <Navbar logout={logout} />
                <Users />
            </>
        );
    }
}
export default Profile;
