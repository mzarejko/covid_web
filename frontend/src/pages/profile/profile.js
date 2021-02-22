import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar.js";
import {logout} from '../../actions/auth';
import {base_paths} from '../../utils/Endpoints'; 

class Profile extends Component {
    
    render(){    
        return (
            <>
                <img src={base_paths.MAIN_VIDEO} />
                <Navbar logout={logout} />
            </>
        );
    }
}
export default Profile;
