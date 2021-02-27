import React, { Component } from 'react';
import './users.css'
import SearchBar from '../Bar/Bar';  
import {listUsers} from '../../actions/profile';
import * as BiIcons from "react-icons/bi";
import CommentBox from './commentBox';

class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            pk_prompt: null,
            comments: [],
            text: ''
        }
    }

    prompt_change = (pk) => {
        if (this.state.pk_prompt !== pk){
            this.setState({pk_prompt: pk})
        }else{
            this.setState({pk_prompt: null})
        }
    }


    render() {
        return (
            <div className='user-back'>
            <div className='blocks'>
                {this.props.result.map((item) =>{
                    return (
                        <div key={item.pk}>
                            <div className="block">
                                <p>{item.username}</p>
                                <p>{item.telephone}</p>
                                <p>{item.country}</p>
                                <p>{item.town}</p>
                                <p>{item.email}</p>
                                <div className='chat_prompt' onClick={() => {this.prompt_change(item.pk)}}>
                                    <BiIcons.BiCommentDetail />
                                </div>
                            </div>
                            <div className={(this.state.pk_prompt === item.pk) ? "prompt-show" : "prompt-hide"}>
                                <CommentBox target_id={item.pk} image={item.image} /> 
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        )
    }
}

export default SearchBar(Users, 
                        null, 
                        listUsers,
                        "title",
                        "comment");
