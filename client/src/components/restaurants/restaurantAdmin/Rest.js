import React from 'react';
import axios from 'axios';
import { RestaurantCRUD } from './RestaurantCRUD';

export class Rest extends React.Component {

	state = {
    products: []
  }

	componentDidMount() {
    axios.get(`/api/v1/restaurants/9/products`)
      .then(res => {
        const products = res.data.data;
        this.setState({ products });
      })
  	}

	render() {
		if (this.state.products.length > 0) {
			var products = []
			this.state.products.forEach(product => {
				products.push(product.attributes);
			})
			return(
				<div class="wrap"> 
					<RestaurantCRUD products={products}/>
				</div>
			)
		} else {
				return (
					<p> Loading </p>
				)
		}
	}
}

