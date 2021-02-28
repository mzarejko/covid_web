import React, { Component } from 'react';
import './cards.css'
import ProductsBox from './ProductsBox'; 
import SearchBar from '../Bar/Bar';  
import {setAnnouncement, listAnnoncement, listMyAnnouncement} from '../../actions/stuff';

class Cards extends Component {

    constructor(props){
        super(props)
        this.state={
            announcement_id : null,
            popup: false
        }

    }    
    
    update_id = (index) => {
        this.setState({
            announcement_id : index,
            popup: true
        })
    }

    exit_popup = () => {
        this.setState({
            popup: false
        })
    }

    render() {
        return (
            <>
            <div className='cards'>
                {this.props.result.map((item) =>{
                    return (
                        <li key={item.pk}>
                            <div className='card' onClick={(event) => 
                                                                this.update_id(item.pk)}>
                                <h2>{item.address}</h2>
                                <p>{item.description}</p>
                            </div>
                        </li>
                    )
                })}
            </div>
            {this.state.popup ? 
                <ProductsBox  announcement_id={this.state.announcement_id} exit={this.exit_popup}/> :
                null }
            </>
        )
    }
}

export default SearchBar(Cards, 
                        setAnnouncement, 
                        listAnnoncement,
                        listMyAnnouncement,                
                        "address",
                        "description");
