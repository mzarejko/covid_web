import React, { Component } from 'react';
import Button from '../Buttons/Buttons';
import {assignProducts, setProducts, listAssignedProducts, listUnassignedProducts,
                deleteProducts, deleteAnnouncement} from '../../actions/stuff';
import './ProductsBox.css';
import Error_displayer from '../../components/error_manager/error_displayer';

class ProductsBox extends Component {
   
    constructor(props){
        super(props)
        this.state={
            assigned_products : [],
            unassigned_products : [],
            name : "",
            description : "",
            priority : "",
        }
        this.error_manager = React.createRef();
    }

    deleteAnnouncement = () => {
        deleteAnnouncement(this.props.announcement_id)
            .then(response => {
                this.props.exit()
            }).catch(error => {
                this.error_manager.current.update_error(error.request.response)
            })
    }
    

    update_assigned_products = (response) => {
        this.setState({assigned_products : response})
    }

    update_unassigned_products = (response) => {
        this.setState({unassigned_products : response})
    }

    listAssigned = () => {
        listAssignedProducts(this.props.announcement_id)
        .then((response) => {
            this.update_assigned_products(response.data)
        }).catch((error) => {
            this.error_manager.current.update_error(error.request.response)
        })
    }

    listUnassigned = () => {
        listUnassignedProducts(this.props.announcement_id)
        .then((response) => {
            this.update_unassigned_products(response.data)
        }).catch((error) => {
            this.error_manager.current.update_error(error.request.response)
        })
    }

    componentDidMount(){
        this.listAssigned()
        this.listUnassigned()
    }

    

    add_product = () => {
        setProducts(this.props.announcement_id,
                    this.state.name,
                    this.state.description,
                    this.state.priority)
        .then((response) => {
            this.listAssigned()
            this.listUnassigned()
        }).catch((error)=> {
            this.error_manager.current.update_error(error.request.response)
        })
    }
    
    
    changeValue = (event) =>{
        this.setState({
            ...this.state,
            [event.target.name] : event.target.value
        });
    }

    deleteProduct = (key1, key2) => {
        deleteProducts(key1, key2)
        .then(response => {
            this.listUnassigned()
            this.listAssigned()
        }).catch(error => {
            this.error_manager.current.update_error(error.request.response)
        })
    }    

    assign = (key1, key2) => {
        assignProducts(key1, key2)
        .then(response => {
            this.listUnassigned()
            this.listAssigned()
        }).catch(error => {
            console.log(error.message)
            this.error_manager.current.update_error(error.request.response)
        })
    }


    render() {
        return (
            <div className="Box">
                <div className="innerBox">
                    <div className='options'>
                        <div className="inputs">
                            <input 
                                name="name"
                                type="text"
                                value={this.state.new_product}
                                placeholder="name of product"
                                onChange={this.changeValue} />
                            <input 
                                name="description"
                                type="text"
                                value={this.state.description}
                                placeholder="description"
                                onChange={this.changeValue} />
                            <input 
                                placeholder="priority"
                                name="priority"
                                type="number" 
                                min="1" 
                                max="10" 
                                value={this.state.priority}
                                onChange={this.changeValue} />
                        </div>
                        <div className='act_btn'>
                            <Button 
                                buttonStyle='outline'
                                ButtonsSize='medium'
                                onClick={this.add_product}
                                >add
                            </Button>
                            <Button 
                                onClick={this.deleteAnnouncement}
                                buttonStyle='outline'
                                ButtonsSize='medium'
                                >delete
                            </Button>
                            <Button 
                                buttonStyle='outline'
                                ButtonsSize='medium'
                                onClick={this.props.exit}
                                    >X
                            </Button>
                        </div>
                    </div>
                    <div className='rows'>
                    <div className='unassigned'>
                    {this.state.unassigned_products.map((item) =>{
                        return (
                            <li key={item.pk}>
                                <div  className='item' >
                                    <div className="main_inf">
                                        <h2>{item.name}</h2>
                                        <div className="main_btn">
                                            <Button 
                                                buttonStyle='outline'
                                                ButtonsSize='medium'
                                                onClick={(event)=> this.deleteProduct(this.props.announcement_id,
                                                                item.pk)}
                                                >-
                                            </Button>
                                            <Button  
                                                buttonStyle='outline'
                                                ButtonsSize='medium'
                                                onClick={(event) => this.assign(
                                                                this.props.announcement_id, item.pk)} 
                                                >assign
                                            </Button>
                                        </div>
                                        <p>{item.priority}</p>
                                        <p>{item.date}</p>
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                        )
                    })}
                    </div>
                    <div className='assigned'>
                    {this.state.assigned_products.map((item, index) =>{
                        return (
                            <li key={index}>
                                <div  className='item' >
                                    <div className="main_inf">
                                        <h2>{item.name}</h2>
                                        <Button 
                                            buttonStyle='outline'
                                            ButtonsSize='medium'
                                            onClick={(event)=> this.deleteProduct(this.props.announcement_id,
                                                                item.pk)}
                                            >-
                                        </Button>
                                        <p>{item.priority}</p>
                                        <p>{item.date}</p>
                                        <p>{item.username}</p>
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                        )
                    })}
                </div>
                </div>
                </div>
                <Error_displayer ref={this.error_manager} />
            </div>
       )
    }
}

export default ProductsBox;
