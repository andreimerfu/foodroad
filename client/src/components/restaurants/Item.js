import React from 'react';
import { connect } from 'react-redux';

import { addToCart, syncQuantity } from '../../actions/index';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  _addToCart = (id, image, price,  productName, description, quantity, restaurant) => {
    const itemDetails = {
      id: id,
      item: productName,
      quantity: quantity,
      description: description,
      price: price,
      image: image,
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
      <div class="d-block d-md-flex menu-food-item">
        <div className="col md-2">
             <img src={this.props.product.image} alt="Smiley face" height="150" width="180"/>
           </div>
          <div class="text">
            <h4>{this.props.product.name}</h4>
            <p>{this.props.product.description}</p>
          </div>
          <div class="price my-auto">
            <strong className="price">{this.props.product.price} RON</strong>
          </div>
          <div className="col md-1 my-auto">
             <button onClick={() => {this._addToCart(this.props.product.id, this.props.product.image, this.props.product.price, this.props.product.name, this.props.product.description, 1, this.props.product.restaurant.id)}} className="btn btn-primary"><i class="fas fa-shopping-bag"></i></button>
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
