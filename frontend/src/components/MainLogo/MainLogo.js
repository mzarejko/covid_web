import React, { Component } from 'react';
import Button from '../Buttons/Buttons';
import './MainLogo.css';
import {setNeedy, setVolunteer} from '../../actions/profile';
import Error_displayer from '../../components/error_manager/error_displayer';

class MainLogo extends Component {

    constructor(props){
        super(props);
        this.state={
            errors: []
        }
        this.error_manager = React.createRef();
    }

    set_needy = () =>{
        setNeedy(this.error_manager.current.update_error)
    }

    set_volunteer = () => {
        setVolunteer(this.error_manager.current.update_error)
    }
    
    render() {
        return (
            <div className='MainLogo'>
                <h1>WHO ARE YOU?</h1>
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
                <Error_displayer ref={this.error_manager} />
            </div>
        )
    }
}

export default MainLogo;
