import React, { Component } from 'react';
import {urls} from '../../utils/urls';
import {history} from '../../utils/history';
import './footer.css';

class Footer extends Component {


    
    render() {
        return (
            <div className='footer'>
                <div className='column'>
                    <h2>CONTACT</h2>
                    <ul>
                        <li>abdulmufasaabdul@gmail.com</li>
                    </ul>
                </div>
                <div className='column'>
                    <h2>MENU</h2>
                    <ul>
                        <div className='item' onClick= {() => history.push(urls.HOME)}>
                            <li>HOME</li>
                        </div>
                        <div className='item' onClick= {() => history.push(urls.SHOPPING)}>
                            <li>SHOPPING</li>
                        </div>
                        <div className='item' onClick= {() => history.push(urls.PROFIL)}>
                            <li>PROFIL</li>
                        </div>
                        <div className='item' onClick= {() => history.push(urls.COVID)}>
                            <li>COVID</li>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Footer;
