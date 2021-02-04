import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavbarItems } from './NavbarItems';
import './Navbar.css'
import {IconContext} from 'react-icons';
import Button from '../Buttons/Buttons.js';

class Navbar extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            active_bar: true,
        }
    }

    handleClick = () => {
        this.setState({
            active_bar: !this.state.active_bar
        })
    }
    

    render() {
        return (
            <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className="navbar">
                    <Link to="#" className='menu-bars left'>
                        <FaIcons.FaBars onClick={this.handleClick} />
                    </Link>
                    <Button buttonStyle='outline' onClick={this.props.logout} >logout</Button>
                </div>
                <nav className={this.state.active_bar ? 'nav-menu' : 'nav-active'}>
                    <ul className='nav-menu-items' onClick={this.handleClick}>
                        <li className="nav-text">
                            <Link to="#">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {NavbarItems.map((item, index) =>{
                            return (
                                <div key ={index} className={ 'border'}>
                                    <li className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                        </Link>
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
            </>
        )   
    }
}


export default Navbar; 
