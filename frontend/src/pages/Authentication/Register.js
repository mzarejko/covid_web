import React, {Component} from 'react';
import './auth_style.css';
import {register} from '../../actions/auth';
import {base_paths} from '../../utils/Endpoints'; 
import Error_displayer from '../../components/error_manager/error_displayer';

class Register extends Component {
    
    constructor(props){
        super(props)
        this.state = ({
            username: "",
            image: null,
            email: "",
            country: "",
            town: "",
            telephone: "",
            password: "",
            firstname: "",
            lastname: "",
            birth: "",
            description: "",
        })
        this.error_manager = React.createRef();
    }

    changeValue = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    

    handleSubmit = () => {
        register(
            this.state.username,
            this.state.image,
            this.state.email,
            this.state.country,
            this.state.town,
            this.state.telephone,
            this.state.birth,
            this.state.description,
            this.state.password,
            this.state.firstname,
            this.state.lastname,
            this.error_manager.current.update_error
        )
    }
   
    render(){
        return (
            <div className="outbox">
                <img src={base_paths.MAIN_VIDEO} />
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
                </div>
                <Error_displayer ref={this.error_manager} />
            </div>
        );
    }
}

export default Register;
