import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../actions';
import { CartItem } from './CartItem';
class Cart extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return(
      <div class="container">
        <table id="cart" class="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{width: "60%"}}>Product</th>
              <th style={{width: 10}}>Price</th>
              <th style={{width: 5}}>Quantity</th>
              <th style={{width: 22}} class="text-center">Subtotal</th>
              <th style={{width: 10}}></th>
            </tr>
          </thead>
          <tbody>
            <CartItem />
            <CartItem />
          </tbody>
          <tfoot>
            <tr class="visible-xs">
              <td class="text-center"><strong>Total 1.99</strong></td>
            </tr>
            <tr>
              <td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
              <td colspan="2" class="hidden-xs"></td>
              <td class="hidden-xs text-center"><strong>Total $1.99</strong></td>
              <td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default Cart
