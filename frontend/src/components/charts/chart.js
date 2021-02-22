import React, { Component } from 'react';
import './chart.css';
import {getData} from '../../actions/covid';
import { Line } from 'react-chartjs-2';
import Error_displayer from '../../components/error_manager/error_displayer';
import {update_error, delete_error} from '../../actions/error_management'; 




class Charts extends Component {

    constructor(props){
        super(props);
        this.state= {
            confirmed_total : null,
            confirmed_x : null,
            confirmed_y : null,
            country : null,
            deaths_total : null,
            deaths_x : null,
            deaths_y : null,
            errors : []
        }
    }
    
    update_chart_error = (response) => {
        let updated = update_error(response, this.state.errors)
        this.setState({errors : updated})
    }

    delete_chart_error = (item) => {
        let deleted = delete_error(item, this.state.errors)
        this.setState({errors : deleted})
    }

    componentDidMount(){
        getData()
            .then((response)=>{
                this.setState({
                    confirmed_total: response.data[0].confirmed_total,
                    confirmed_x : response.data[0].confirmed_x,
                    confirmed_y : response.data[0].confirmed_y,
                    country : response.data[0].country,
                    deaths_total : response.data[0].deaths_total,
                    deaths_x : response.data[0].deaths_x,
                    deaths_y : response.data[0].deaths_y
                })
            })
        .catch((error) => {this.update_chart_error(error.request.response)})
    }

   
    create_chart_data = (confirmed_x, confirmed_y, label_conf, 
                        deaths_x, deaths_y, label_death) => {
        const chartData = {
            labels: confirmed_x,
            datasets: [
                {
                    label: label_conf,
                    data : confirmed_y,
                    borderColor: '#3e95cd',
                    fill: false,
                    borderWidth: 3,
                    pointRadius: 0
                },
                {
                    label: label_death,
                    data : deaths_y,
                    borderColor: '#450909',
                    fill: false,
                    borderWidth: 3,
                    pointRadius: 0
                }
            ]
        }

        return chartData
    }

    

    chartScroll = () => {
        if(document.getElementById("chart")){ 
            const id = document.getElementById("chart");
            var y = window.scrollY;
            if (y >= 800) {
                id.className = "chart chart-show"
            } else {
                id.className = "chart chart-hide"
            }
                
        }
    };

    chartnap = () => {
        if (document.getElementById("nap")){
            const id = document.getElementById("nap");
            var y = window.scrollY;
            if (y >= 600) {
                id.className = "nap nap-show"
            } else {
                id.className = "nap nap-hide"
            }
            
        }
    };

    render() {
        window.addEventListener("scroll", this.chartScroll);
        window.addEventListener("scroll", this.chartnap);
        return (
            <>
            <div className="field">
                <div className="nap" id="nap">
                    <h3>Total confirmed covid</h3> 
                    {this.state.confirmed_total}
                    <h3>Total death</h3> 
                    {this.state.deaths_total}
                </div>
                <div className="chart" id="chart">
                        <Line data={this.create_chart_data(this.state.confirmed_x, 
                                    this.state.confirmed_y, 'confirmed data '+this.state.country,
                                    this.state.deaths_x, this.state.deaths_y, 
                                    'deaths data '+ this.state.country)} 
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                        }}/>
                </div>
            </div>
                <Error_displayer  errors={this.state.errors} remove={this.delete_chart_error} /> 
            </>
        )
    }
}

export default Charts;
