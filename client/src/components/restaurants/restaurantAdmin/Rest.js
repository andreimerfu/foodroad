import React from 'react';
import axios from 'axios';
import { RestaurantCRUD } from './RestaurantCRUD';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';

class Rest extends React.Component {

    state = {
        products: null
    };

	componentDidMount() {
    axios.get(`/api/v1/get_restaurant_id`, {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
    }).then(res => {
      axios.get(`/api/v1/restaurants/${res.data}/products`)
      .then(res => {
        if (res.data.data) {
          this.setState({ products: res.data.data });
        }
      })
    })
  }

	render() {
		if (this.state.products && this.state.products.length >= 0) {
            let products = [];
            this.state.products.forEach(product => {
				products.push(product.attributes);
			});
			return(
				<div class="wrap">
					<RestaurantCRUD products={products}/>
				</div>
        )
    } else {
				return (
					 <RingLoader
            sizeUnit={"px"}
            size={100}
            color={'#123abc'}
            loading={true}
          />
				)
		}
	}
}

function mapStateToProps(state) {
  return {
    profile: state.userProfile.data,
    restaurant: state.restaurant.data
  }
}

export default connect(mapStateToProps)(Rest)

