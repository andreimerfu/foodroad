import React from 'react';
import { connect } from 'react-redux';

import { addToCart, syncQuantity } from '../../actions/index';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  _addToCart = (id, price, productName, description, quantity, restaurant) => {
    const itemDetails = {
      id: id,
      item: productName,
      quantity: quantity,
      description: description,
      price: price,
      restaurant: restaurant
    }

    this.setState({
      quantity: 1
    })

    const syncMenu = {
      item: productName,
      quantity: quantity
    }

    this.props.dispatch(addToCart(itemDetails));
    this.props.dispatch(syncQuantity(syncMenu));
  };

  render() {
    return (
      <div className="row">
        <div className="col md-6">
          <h4>{this.props.product.name}</h4>
          <p>{this.props.product.description}</p>
        </div>
        <div className="col md-4">
          <p>{this.props.product.price} LEI</p>
        </div>
        <div className="col md-2">
          <button onClick={() => {this._addToCart(this.props.product.id, this.props.product.price, this.props.product.name, this.props.product.description, 1, this.props.product.restaurant.id)}} className="btn btn-primary">Buy</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    menu: state.menu
  }
}
export default connect(mapStateToProps)(Item)
