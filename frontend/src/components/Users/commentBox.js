import React, { Component } from 'react';
import {setComments, listComments} from '../../actions/profile';
import Button from '../Buttons/Buttons';
import Error_displayer from '../../components/error_manager/error_displayer';
import './commentBox.css';

class CommentBox extends Component {

    constructor(props){
        super(props)
        this.state={
            comments : [],
            text: '',
        }
        this.error_manager = React.createRef();

    }    


    updateComments = () => {
        listComments(this.props.target_id)
        .then(response => {
            console.log(response.data)
           this.setState({comments: response.data}) 
        }).catch(error => {
            console.log(error)
        })

    }


    componentDidMount(){
        this.updateComments()
    }


    changeValue = (event) =>{
        this.setState({
            ...this.state,
            [event.target.name] : event.target.value
        });
    }

    createComments = () => {
        setComments(this.state.text, this.props.target_id)
        .then(response => {
           this.updateComments() 
        })
    }

    render() {
        return (
            <div className="comment-box">
                <img src={this.props.image} alt="pic.png" />
                <div className="options-box">
                    <textarea
                        type="text"
                        name="text"
                        placeholder="comment"
                        value={this.state.text}
                        onChange={this.changeValue}
                    /> 
                    <div className='act_btn'>
                        <Button 
                            buttonStyle='outline'
                            ButtonsSize='medium'
                            onClick={this.createComments}
                            >add
                        </Button>
                    </div>
                </div>
            {this.state.comments.map((item) => {
                return (
                    <li key={item.pk}>
                        <div className='profile'>
                            <img src={item.source_info.image} alt={item.source_info.username+".png"} />
                            <p>{item.source_info.username}</p>
                        </div>
                        <div className='comment'>
                           <p>{item.text}</p> 
                        </div>
                    </li>
                )
            })}
            <Error_displayer ref={this.error_manager} />
            </div>
        )
    }
}

export default CommentBox

