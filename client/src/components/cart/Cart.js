import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { removeItem, syncQuantity } from '../../actions/index';
import CartItem from './CartItem';
import * as actions from '../../actions';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
class Cart extends React.Component {
  constructor(props) {
    super();
  }

  _removeFromCart(item) {
    this.props.dispatch(removeItem(item));
    this.props.dispatch(syncQuantity({"item": item, "quantity": 0}));
  }

  componentDidMount() {
    if (this.props.itemsList.length > 0) {
      this.props.dispatch(actions.getRestaurantInfo(this.props.itemsList[0].restaurant));
    }
  }

  notify = () => toast.error("Add more products in your cart !");

  renderCheckoutButton(valid, min_order) {
    debugger;
    if (valid) {
      return (
        <Link to='/checkout' className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></Link>
      )
    } else {
      return (
        <div>
          <button className="btn btn-success btn-block" onClick={this.notify}>Checkout <i className="fa fa-angle-right"></i></button>
          <ToastContainer />
        </div>
      )
    }
  }

  render() {
    const { itemsList } = this.props;
    const { restaurant } = this.props;

    let subTotals = [];
    itemsList.map((item) => {
      subTotals.push(item.quantity * item.price);
    });

    const sum = subTotals.reduce((a, b) => a + b, 0).toFixed(2);

    var isValidForCheckout = false;
    var min_order = 0;
    if (restaurant && Object.keys(restaurant).length > 0) {
      min_order = restaurant.attributes.min_order
      if (restaurant.attributes.min_order <= sum) {
        isValidForCheckout = true;
      }
    }

    return(
      <div class="wrap">
        {itemsList.length !== 0 ? (
          <div class="py-5">
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
              <tr class="visible-xs">
                <td class="text-center"><strong>Minimal order {min_order} LEI</strong></td>
              </tr>
              <tr>
                <td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                <td colspan="2" class="hidden-xs"></td>
                <td class="hidden-xs text-center"><strong>Total {sum} LEI</strong></td>
                <td>{this.renderCheckoutButton(isValidForCheckout)}</td>
              </tr>
            </tfoot>
          </table>

          </div>
        ) : (
          <div className="row justify-content-center py-5">


          <img src='../images/cart1.png'  alt='' class='img-fluid'/>
          </div>
        )}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    itemsList: state.cart,
    restaurant: state.restaurant.data
  }
}

export default connect(mapStateToProps)(Cart)
