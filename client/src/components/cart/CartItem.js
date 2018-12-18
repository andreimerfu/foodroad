import React from 'react';
import { connect } from 'react-redux';
import { removeItem, syncQuantity } from '../../actions/index';

class CartItem extends React.Component {

  _removeFromCart(item) {
    this.props.dispatch(removeItem(item));
    this.props.dispatch(syncQuantity({"item": item, "quantity": 0}));
  }

  render() {
    return (
      <tr>
        <td data-th="Product">
          <div class="row">
            <div class="col-sm-2 hidden-xs"><img src={this.props.item.image} alt="..." class="img-responsive" height="80" width="100"/></div>
            <div class="col-sm-10">
              <h4 class="nomargin">{this.props.item.item}</h4>
              <p>{this.props.item.description}</p>
            </div>
          </div>
        </td>
        <td data-th="Price">{this.props.item.price}</td>
        <td data-th="Quantity">
          <input type="number" class="form-control text-center" value={this.props.item.quantity} />
        </td>
        <td data-th="Subtotal" class="text-center">{this.props.subTotal}</td>
        <td class="actions" data-th="">
          <button onClick={() => {this._removeFromCart(this.props.item.item)}}class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    )
  }
}

function mapStateToProps(state) {
  return {
    menu: state.menu
  }
}
export default connect(mapStateToProps)(CartItem)
