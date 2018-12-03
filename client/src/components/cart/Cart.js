import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { removeItem, syncQuantity } from '../../actions/index';
import CartItem from './CartItem';

class Cart extends React.Component {
  constructor(props) {
    super();
  }

  _removeFromCart(item) {
    this.props.dispatch(removeItem(item));
    this.props.dispatch(syncQuantity({"item": item, "quantity": 0}));
  }

  render() {
    const { itemsList } = this.props;
    let subTotals = [];

    itemsList.map((item) => {
      subTotals.push(item.quantity * item.price);
    });
    return(
      <div class="container">
        {itemsList.length !== 0 ? (
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
              { itemsList && itemsList.map((item, i) => (
                <CartItem key={i} item={item} subTotal={subTotals[i]}/>
              ))}
            </tbody>
            <tfoot>
              <tr class="visible-xs">
                <td class="text-center"><strong>Total {this.subTotals}</strong></td>
              </tr>
              <tr>
                <td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                <td colspan="2" class="hidden-xs"></td>
                <td class="hidden-xs text-center"><strong>Total </strong></td>
                <td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="row">
          <h3>Oops! Your cart is empty!</h3>
          </div>
        )}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    itemsList: state.cart
  }
}

export default connect(mapStateToProps)(Cart)
