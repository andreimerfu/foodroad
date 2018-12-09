import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { OrderRow } from './OrderRow';

import * as actions from '../../actions';

class OrdersHistory extends React.Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchOrders());
  }

  renderOrders() {
    return this.props.orders.map((order,i) => {
      return(
        <OrderRow key={i} order={order} />
      )
    })
  }

  render() {
    const orders  = this.props.orders;
    if (Object.keys(orders).length > 0) {
      return(
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Address</th>
              <th scope="col">Products</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            { this.renderOrders() }
          </tbody>
        </table>
      )
    } else {
      return (
        <p> Loading... </p>
      )
    }
  }
}


function mapStateToProps(state) {
  return {
    orders: state.orders.data
  }
}

export default connect(mapStateToProps)(OrdersHistory)
