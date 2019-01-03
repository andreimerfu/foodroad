import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { withCookies, Cookies } from 'react-cookie';
import axios from "axios";
import { addToCart, syncQuantity } from '../../actions/index';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';

class RecommendationModal extends Component {
  state = {
    modal: false,
    product: null
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    const { cookies } = this.props
    var showModal = cookies.get('showModal')

    if (!showModal) {
      this.setState({
        modal: true
      });
      var tomorrow = new Date();
      var today = new Date();
      tomorrow.setDate(today.getDate()+1);

      cookies.set('showModal', 'false', {
        expires: tomorrow
      });

      axios.get(`/api/v1/profiles/recommendations/random`, {
        headers: {
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
          'access-token': localStorage.getItem('accessToken'),
          'expiry': localStorage.getItem('expiry'),
        }
      }).then(res => {
        this.setState({
          product: res.data.data.attributes.product
        });
      });
    }
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

    this.toggle();
  };

  render() {
    if (this.state.product) {
      return (
        <div>
         <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" side position="bottom-right">
            <ModalHeader toggle={this.toggle}>FoodRoad Recommendation System</ModalHeader>
            <ModalBody>
            <div className="row">
            <div className="col md-4">
              <img src={this.state.product.image} height="300px" width="300px" alt="" />
            </div>
            <div className="col md-8">
              <p>{this.state.product.name}</p>
              <p>{this.state.product.description}</p>
             <StarRatings
                rating={4.33}
                starDimension="32px"
                starSpacing="12px"
              />
              <br/>
              <br/>
              <br/>
              <p>{this.state.product.price} LEI</p>
            </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Nope</Button>
              <Button color="primary" onClick={() => {this._addToCart(this.state.product.id, this.state.product.image, this.state.product.price, this.state.product.name, this.state.product.description, 1, this.state.product.restaurant_id)}}>Order</Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(withCookies(RecommendationModal));
