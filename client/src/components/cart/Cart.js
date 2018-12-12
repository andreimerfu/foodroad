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

    const sum = subTotals.reduce((a, b) => a + b, 0).toFixed(2);

    return(
      <div class="wrap">
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
                <td class="text-center"><strong>Total {sum} LEI</strong></td>
              </tr>
              <tr>
                <td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                <td colspan="2" class="hidden-xs"></td>
                <td class="hidden-xs text-center"><strong>Total {sum} LEI</strong></td>
                <td><Link to='/checkout' className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></Link></td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="row justify-content-center">

        
          <img src='../images/cart1.png'  alt='' class='img-fluid'/>
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
