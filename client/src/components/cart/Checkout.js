import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import * as actions from '../../actions';

class Checkout extends React.Component {
  constructor(props) {
    super();
    this.checkout = this.checkout.bind(this);
  }

  checkout(orderDetails) {
    var orderDetails = orderDetails
    orderDetails['products'] = this.props.itemsList
    var total = 0;
    this.props.itemsList.forEach(item => {
      total += item.price;
    })
    orderDetails['total'] = total
    this.props.dispatch(actions.checkoutOrder(orderDetails));
    return <Redirect to={{pathname: '/'}} />
  }

  render() {
    const { isAuth, errors } = this.props.auth
    const { itemsList } = this.props.itemsList

    if (this.props.itemsList.length === 0) {
      return <Redirect to={{pathname: '/'}} />
    } else {
      return(
        <div className="row">
          <div className="col col-md-6">
            <CheckoutForm submitCb={this.checkout} errors={errors} />
          </div>
          <div className="col col-md-6">
            <CheckoutSummary />
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    itemsList: state.cart
  }
}
export default connect(mapStateToProps)(Checkout)
