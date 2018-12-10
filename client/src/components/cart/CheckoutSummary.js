import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as actions from '../../actions';

class CheckoutSummary extends React.Component {
  constructor(props) {
    super();
  }

  renderItems() {
    return this.props.itemsList.map((item,i) => {
      return (
        <tr>
          <th scope="row"></th>
          <td>{item.item}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
        </tr>
      )
    });
  }

  renderTotal() {
    var total = 0;
    this.props.itemsList.forEach(item => {
      total += item.price;
    })
    return (
      <tr>
        <th scope="row"></th>
        <td></td>
        <td>Total</td>
        <td>{total.toFixed(2)} LEI</td>
      </tr>
    )
  }

  render() {
    return(
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          { this.renderItems() }
          { this.renderTotal() }
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    itemsList: state.cart
  }
}
export default connect(mapStateToProps)(CheckoutSummary)
