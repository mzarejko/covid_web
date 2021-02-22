import React, { Component } from 'react';
import Button from '../Buttons/Buttons';
import {base_paths} from '../../utils/Endpoints'; 
import './MainLogo.css';
import {setNeedy, setVolunteer} from '../../actions/profile';
import Error_displayer from '../../components/error_manager/error_displayer';
import {update_error, delete_error} from '../../actions/error_management'; 

class MainLogo extends Component {

    constructor(props){
        super(props);
        this.state={
            errors: []
        }
    }


    update_main_error = (response) => {
        let updated = update_error(response, this.state.errors)
        this.setState({errors : updated})
    }

    delete_main_error = (item) => {
        let deleted = delete_error(item, this.state.errors)
        this.setState({errors : deleted})
    }

    set_needy = () =>{
        setNeedy(this.update_main_error)
    }

    set_volunteer = () => {
        setVolunteer(this.update_main_error)
    }
    
    render() {
        return (
            <div className='MainLogo'>
                <img src={base_paths.MAIN_VIDEO} />
                <h1>WHO YOU ARE?</h1>
                <p>select a class</p>
                <div className="ctg">
                    <Button 
                        buttonStyle='outline'
                        buttonSize='large'
                        onClick={this.set_needy}
                    >NEEDY</Button>
                    <Button 
                        buttonStyle='outline'
                        buttonSize='large'
                        onClick={this.set_volunteer}
                    >VOLUNTEER</Button>
                </div>
                <Error_displayer  errors={this.state.errors} remove={this.delete_main_error} /> 
            </div>
        )
    }
}

export default MainLogo;
