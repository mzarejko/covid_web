import React, { Component } from 'react';
import Button from '../Buttons/Buttons';
import './Bar.css';
import '../Buttons/Buttons.css';
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import Error_displayer from '../../components/error_manager/error_displayer';

const SearchBar = (Results, submit_func, search_func, search_my, title_creator, descritpion_title) =>{
    class Head extends Component {
    
        constructor(){
            super()
            this.state={
                key : "",
                description : "",
                title : "",
                isActiveCreator: false,
                bar_char : '+',
                result : []
            }
            this.error_manager = React.createRef();
        }
   
        changeValue = (event) =>{
            this.setState({
                ...this.state,
                [event.target.name] : event.target.value
            });
        }

        update_result = (response) => {
            this.setState({result : response})
        }

        submit = () => {
            submit_func(this.state.description, this.state.title)
            .then(response => {
                this.search()
            }).catch(error => {
                this.error_manager.current.update_error(error.request.response)
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
    

        search = () => {
            search_func(this.state.key)
            .then(response => {
                this.update_result(response.data)
            })
        }
    
        componentDidMount(){
            this.search()
        }

        
        search_my_announcements= () => {
            search_my()
            .then(response=>{
                this.update_result(response.data)
            })
        }


        render_loupe = () => {
            if (search_func){
                return (
                    <div className="circle" onClick={this.search}>
                        <p><FaIcons.FaSearch /></p>
                    </div>
                )
            }
        }

        render_submit = () => {
            if (submit_func){
                return(
                    <div className="circle" onClick={this.activateCreator}>
                        <p>{this.state.bar_char}</p>
                    </div>
                )
            }
        }


        render_mysubmit = () => {
            if (search_my){
                return(
                    <div className="circle" onClick={this.search_my_announcements}>
                        <p><BiIcons.BiUserCircle /></p>
                    </div>
                )
            }
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
                        {this.render_loupe()}
                        {this.render_submit()}
                        {this.render_mysubmit()}
                    </div>
                </div>
                <div className="pos">
                    <div className={(this.state.isActiveCreator && submit_func) ? "creator creator-display" : "creator creator-hide"} >
                        <input
                            name="title"
                            type="text"
                            value={this.state.title}
                            placeholder={title_creator}
                            onChange={this.changeValue} />
                        <textarea
                            type="text"
                            name="description"
                            value={this.state.description}
                            placeholder={descritpion_title}
                            onChange={this.changeValue} />
                        <Button buttonSize='medium'    
                            buttonStyle='outline' 
                            onClick={this.submit}>
                                submit
                        </Button>
                    </div>
                </div>
                <Results result={this.state.result} />
                <Error_displayer ref={this.error_manager} />
                </>    
            )
        }
    }

    return Head;
}

export default SearchBar;
