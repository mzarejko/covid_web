import React, { Component } from 'react';
import {setAnnouncement} from '../../actions/profile';
import Button from '../Buttons/Buttons';
import './Bar.css';
import '../Buttons/Buttons.css';
import * as FaIcons from "react-icons/fa";
import {listAnnoncement} from '../../actions/profile';
import Cards from './cards';

class Bar extends Component {
    
    constructor(props){
        super(props)
        this.state={
            key : "",
            description : "",
            address : "",
            error: "",
            isActiveCreator: false,
            bar_char : '+',
            result : [],
        }
    }
   
    changeValue = (event) =>{
        this.setState({
            ...this.state,
            [event.target.name] : event.target.value
        });
    }
    
    error_updater = (response) => {
        this.setState({error : response})
    }

    update_result = (response) => {
        this.setState({result : response})
    }

    submit_announcement = () => {
        setAnnouncement(this.state.description, this.state.address)
        .then(response => {
            return response
        }).catch(error => {
            this.error_updater(error.request.response)
        })
    }

    activateCreator = () => {
        if(this.state.isActiveCreator){
            this.setState({
                isActiveCreator : false,
                bar_char : '+'
            })
        }else{
            this.setState({
                isActiveCreator : true,
                bar_char : '-'
            })
        }
    }
    

    search = (show_my) => {
        listAnnoncement(this.state.key, show_my)
        .then(response => {
            this.error_updater(response.request.response)
            this.update_result(response.data)
        }).catch(error => {
            this.error_updater(error.request.response)
        })
    }
    
    componentDidMount(){
        this.search()
    }

    render() {
        return (
            <>
            <div className='container'>
                <div className='bar'>
                    <div className="search-bar">
                        <input
                            name="key"
                            type="text"
                            value = {this.state.key}
                            placeholder="search" 
                            onChange={this.changeValue} />
                    </div>
                    <div className="circle" onClick={(event) => this.search(false)}>
                        <p><FaIcons.FaSearch /></p>
                    </div>
                    <div className="circle" onClick={(event) => this.search(true)}>
                        <p><FaIcons.FaRegCalendarPlus /></p>
                    </div>
                    <div className="circle" onClick={this.activateCreator}>
                        <p>{this.state.bar_char}</p>
                    </div>
                </div>
            </div>
            <div className="creator">
            <div className={this.state.isActiveCreator ? "display" : "hide"} >
                    <input
                        name="address"
                        type="text"
                        value={this.state.address}
                        placeholder="address" 
                        onChange={this.changeValue} />
                    <textarea
                        type="text"
                        name="description"
                        value={this.state.description}
                        placeholder="description"
                        onChange={this.changeValue} />
                    <Button buttonSize='medium'    
                        buttonStyle='outline' 
                        onClick={this.submit_announcement}>
                            submit
                    </Button>
                    <p>{this.state.error}</p>
            </div>
            </div>
            <Cards result={this.state.result} />
            </>    
        )
    }
}

export default Bar;
