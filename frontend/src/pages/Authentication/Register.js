import React, {Component} from 'react';
import './auth_style.css';
import axios from 'axios';

class Register extends Component {
    
    constructor(props){
        super(props)
        this.state = ({
            username: "",
            email: "",
            country: "",
            town: "",
            telephone: "",
            password: "",
            firstname: "",
            lastname: "",
            birth: "",
            description: "",
            error: "",
        })
    }

    changeValue = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    

    value2null = (value) => {
        if(value === ''){
            return null
        }
        return value
    }

    handleSubmit = () => {
        axios.post('http://0.0.0.0:8000/accounts/register/', {
            username: this.value2null(this.state.username),
            email: this.value2null(this.state.mail),
            country: this.value2null(this.state.country),
            town: this.value2null(this.state.town),
            telephone: this.value2null(this.state.telephone),
            birth: this.value2null(this.state.birth),
            description: this.value2null(this.state.description),
            password: this.value2null(this.state.password),
            firstname: this.value2null(this.state.firstname),
            lastname: this.value2null(this.state.lastname) 
        }).then((response) =>{
            this.setState({error: 'Mail aktywujący twoje konto został wysłany na poczte!'})
        }).catch((err) => {
            console.log(err)
            this.setState({error: 'Nie uzupełniono wymaganych pól lub są nie prawidłowe!'})
        });
    }
   
    render(){
        return (
                <div className='box'>
                    <div className='columns'>
                        <div className='rows'> 
                            <label className='items'>
                            username* 
                                <input 
                                    type="text" 
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.changeValue}
                                /> 
                            </label> 
                            <label className='items'>
                                first name 
                                <input 
                                    type="text" 
                                    name="firstname"
                                    value={this.state.firstname}
                                    onChange={this.changeValue}
                                /> 
                            </label> 
                            <label className='items'>
                                country*  
                                <input 
                                    type="text" 
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.changeValue}
                                /> 
                            </label> 
                            <label className='items'>
                                telephone*   
                                <input 
                                    type="tel" 
                                    name="telephone"
                                    value={this.state.telephone}
                                    onChange={this.changeValue}
                                /> 
                            </label> 
                        </div>
                        <div className='rows'>
                            <label className='items'>
                                email*  
                                <input 
                                    type="email" 
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.changeValue}
                                /> 
                            </label>
                            <label className='items'>
                                last name
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    value={this.state.lastname}
                                    onChange={this.changeValue}
                                /> 
                            </label>
                            <label className='items'>
                                town*  
                                <input 
                                    type="text" 
                                    name="town" 
                                    value={this.state.town}
                                    onChange={this.changeValue}
                                /> 
                            </label>
                            <label className='items'>
                                password*
                                <input 
                                    type="password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.changeValue}
                                /> 
                            </label>
                        </div>
                    </div>
                    <label className='items'>
                        description    
                        <textarea
                           type="text"
                           name="description"
                           value={this.state.description}
                           onChange={this.changeValue}
                       /> 
                   </label>
                   <label className='items'>
                       date of birth     
                       <input 
                           type="date" 
                           name="birth"
                           value={this.state.birth}
                           onChange={this.changeValue}
                       /> 
                   </label>
                   <div className='items'>
                       <button onClick={this.handleSubmit}>register</button>
                   </div>
                   <div className='items'>
                       <p>{this.state.error}</p>
                   </div>
                </div>
        );
    }
}

export default Register;
