import React, { Component } from 'react';
import {urls} from '../../utils/urls';
import {history} from '../../utils/history';
import './footer.css';
import {getAdmin} from '../../actions/profile';

class Footer extends Component {

    constructor(){
        super()
        this.state = {
            image: null,
            username: '',
            email: '',
            telephone: null,
            country: '',
            town: ''
        }
    }

    componentDidMount(){
        getAdmin()
            .then(response => {
                const res = JSON.parse(response.request.response)
                this.setState({
                    image: res[0].image,
                    username: res[0].username,
                    email: res[0].email,
                    telephone: res[0].telephone,
                    country: res[0].country,
                    town: res[0].town 
                })
            })
    }

    
    render() {
        return (
            <div className='footer'>
                <div className='grid-column'>
                    <h2>CONTACT</h2>
                    <ul>
                        <li>{this.state.username}</li>
                        <li>{this.state.email}</li>
                        <li>{this.state.telephone}</li>
                        <li>{this.state.country}</li>
                        <li>{this.state.town}</li>
                        <img src={this.state.image} alt='img.png' />
                    </ul>
                </div>
                <div className='grid-column'>
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
                    </ul>
                </div>
            </div>
        )
    }
}

export default Footer;
