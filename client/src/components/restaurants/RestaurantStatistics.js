import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import axios from "axios";

import {Doughnut, Line, Pie, Bar} from 'react-chartjs-2';


var statistics = 'my statistics'

class RestaurantStatistics extends React.Component {

	


	constructor(props) {
		super(props)

		this.state = {
      restaurant_id: null,
      statistics: []
  	}

  	this.getStatistics = this.getStatistics.bind(this)
	}
	componentDidMount() {
		axios.get(`/api/v1/get_restaurant_id`, {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
	  }).then(res => {
	  	this.getStatistics(res.data)
	  })


	}

	getStatistics(restaurant_id) {
		axios.get(`/api/v1/restaurants/${restaurant_id}/statistics`, {
				headers: {
	        'uid': localStorage.getItem('uid'),
	        'client': localStorage.getItem('client'),
	        'access-token': localStorage.getItem('accessToken'),
	        'expiry': localStorage.getItem('expiry'),
	      }
			}).then(res => {
				this.setState({
					statistics: res.data
				})
		})
	}

	render() {

		if (Object.keys(this.state.statistics).length > 0) {

			const dataa = {
			  labels: ['August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie', 'Ianuarie'],
			  datasets: [
			    {
			      label: 'Comenzi totale',
			      fill: false,
			      lineTension: 0.1,
			      backgroundColor: 'rgba(75,192,192,0.4)',
			      borderColor: 'rgba(75,192,192,1)',
			      borderCapStyle: 'butt',
			      borderDash: [],
			      borderDashOffset: 0.0,
			      borderJoinStyle: 'miter',
			      pointBorderColor: 'rgba(75,192,192,1)',
			      pointBackgroundColor: '#fff',
			      pointBorderWidth: 1,
			      pointHoverRadius: 5,
			      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			      pointHoverBorderColor: 'rgba(220,220,220,1)',
			      pointHoverBorderWidth: 2,
			      pointRadius: 1,
			      pointHitRadius: 10,
			      data: [650, 590, 800, 810, 560, 550, 400]
			    }
			  ]
			};

			const dataaa = {
				labels: ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'],
			  datasets: [
			    {
			      label: 'Comenzi pe saptamana',
			      backgroundColor: 'rgba(255,99,132,0.2)',
			      borderColor: 'rgba(255,99,132,1)',
			      borderWidth: 1,
			      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			      hoverBorderColor: 'rgba(255,99,132,1)',
			      data: [40, 32, 19, 27, 39, 60, 75]
			    }
			  ]
			};


			let labels = []
			let datas = []
			let colors = []

			this.state.statistics.most_wanted_product.forEach(product => {
				if (product.orders > 0) {
					labels.push(product.product_name)
					datas.push(product.orders)
				}
			})

			labels.forEach(product => {
				colors.push('#' + Math.random().toString(16).slice(2, 8).toUpperCase())
			})


			var data = {
				labels: labels,
				datasets: [{
						data: datas,
						backgroundColor: colors,
						hoverBackgroundColor: colors
				}]
			};

			return(
				<div className="wrap py-5">
					<div className="row">
						<div className="col-md-6">
							<Doughnut data={data} />
						</div>
						<div className="col-md-6">
							<Pie data={data} />
						</div>
					</div>

					<div className="row mt-5">
						<div className="col-md-6">
							<Line data={dataa} />
							

						</div>
						<div className="col-md-6">
							<Bar  data={dataaa}/>
						</div>
					</div>
				</div>
			)
		} else {
			return(
				<p>Loading</p>
			)
		}
	}
}

function mapStateToProps(state) {
  return {
    statistics: null
  }
}
export default connect(mapStateToProps)(RestaurantStatistics);
