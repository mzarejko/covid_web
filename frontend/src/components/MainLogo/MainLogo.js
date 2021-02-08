import React, { Component } from 'react';
import Button from '../Buttons/Buttons';
import {base_paths} from '../../utils/Endpoints'; 
import './MainLogo.css';
import {setNeedy, setVolunteer} from '../../actions/profile';

class MainLogo extends Component {

    constructor(props){
        super(props);
        this.state={
            error: ''
        }
    }

    update_error = (response) => {
        this.setState({
            error : response
        })
    }

    set_needy = () =>{
        setNeedy(this.update_error)
    }

    set_volunteer = () => {
        setVolunteer(this.update_error)
    }
    
    render() {
        return (
            <div className='MainLogo'>
                <video src={base_paths.MAIN_VIDEO} autoPlay loop muted type="video/mp4" />
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
                <p>{this.state.error}</p>
            </div>
        )
    }
}

export default MainLogo;
