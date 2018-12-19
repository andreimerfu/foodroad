import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
//import { OrderRow } from './OrderRow';
import axios from "axios";
import {RingLoader} from "react-spinners";

import * as actions from '../../actions';

class RestaurantActiveOrders extends React.Component {

  state = {
    orders: null
  }

  constructor(props) {
    super();
  }

  componentWillMount() {
    axios.get(`/api/v1/get_restaurant_id`, {
        headers: {
            'uid': localStorage.getItem('uid'),
            'client': localStorage.getItem('client'),
            'access-token': localStorage.getItem('accessToken'),
            'expiry': localStorage.getItem('expiry'),
        }
    }).then(res => {
      this.props.dispatch(actions.fetchActiveOrders(res.data));
    });
  }

  renderActiveOrders(orders) {
    return orders.map((order,i) => {
      var productsString = ""
      order.attributes.products.forEach(product => {
        productsString += product.name + ", "
      });

      return(
        <tr>
          <td></td>
          <td>{order.attributes.address}</td>
          <td>{productsString}</td>
          <td>{order.attributes.payment_type}</td>
          <td>{order.attributes.total}</td>
        </tr>
      )
    })
  }

  render() {
    if (this.props.activeOrders && this.props.activeOrders.length >= 0) {
      return(
        <div class="wrap py-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
                <th scope="col">Products</th>
                <th scope="col">Metoda de plata</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              { this.renderActiveOrders(this.props.activeOrders) }
            </tbody>
          </table>
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
    activeOrders: state.activeOrders.data
  }
}

export default connect(mapStateToProps)(RestaurantActiveOrders)
