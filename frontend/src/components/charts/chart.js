import React, { Component } from 'react';
import './chart.css';
import {getData} from '../../actions/covid';
import { Line } from 'react-chartjs-2';



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
            deaths_y : null
        }
    }

    componentDidMount(){
        getData()
            .then((response)=>{
                console.log(response.data)
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
        .catch((error) => {console.log(error)})
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



    render() {
        const styleRed = {color : 'red'};
        return (
            <div className="chart">
                <h1>Total confirmed covid <span style={styleRed}>
                                {this.state.confirmed_total}</span></h1>
                <h1>Total death <span style={styleRed}>
                                {this.state.deaths_total}</span></h1>
                <Line data={this.create_chart_data(this.state.confirmed_x, 
                            this.state.confirmed_y, 'confirmed data '+this.state.country,
                            this.state.deaths_x, this.state.deaths_y, 
                            'deaths data '+ this.state.country)} />
            </div>
        )
    }
}

export default Charts;
