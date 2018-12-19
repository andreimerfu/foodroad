import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { CategoryCard } from './CategoryCard';
import { RestaurantInfo } from './RestaurantInfo';

class RestaurantMenu extends React.Component {

  componentWillMount() {
    const restaurantId = this.props.match.params.id;
    this.props.dispatch(actions.getRestaurantInfo(restaurantId));
    this.props.dispatch(actions.fetchRestaurantCategories(restaurantId));
    this.props.dispatch(actions.fetchRestaurantProducts(restaurantId));
  }

  renderCategories(){
    return this.props.categories.map((category,i) => {
      return(
        <li className="nav-item" key={i}>
          <a href={"#" + category.attributes.name} class="nav-link active" aria-selected="true">{category.attributes.name}</a>
        </li>
      )
    })
  }

  renderCategoriesWithProducts() {
    var lastCategory = 0
    var showCategory = true
    return this.props.products.map((product, i) => {
      if (product.attributes.category.id != lastCategory) {
        lastCategory = product.attributes.category.id
        showCategory = true;
      } else {
        showCategory = false;
      }
      return(
        <CategoryCard key={i} product={product} showCategory={showCategory}/>
        )
    })
  }

  renderRestaurantName(restaurant) {
    if (Object.keys(restaurant).length > 0) {
      return(
          <h3>{restaurant.attributes.name}</h3>
        )
    }
  }

  renderRestaurantInfo(restaurant) {
    return(
      <RestaurantInfo restaurant={restaurant} />
    )
  }

  render(){
    const categories = this.props.categories;
    const restaurant = this.props.restaurant;
    const products = this.props.products;

    if (categories.length > 0 && Object.keys(restaurant).length > 0) {
      return(
        <section id='restaurant-menu'>
          <div className="row justify-content-center wrap py-5">
            <div className="col-md-12">
              <div className="mb-5 d-flex">
                <h2 class="row text-center pr-4 ml-5">{this.renderRestaurantName(restaurant)}'s Menu</h2>
                <button className="info-button btn btn-info" data-toggle="modal" data-target="#exampleModalCenter">
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>       
              <ul className="menu-tab-nav">
                  {this.renderCategories()}
              </ul>
              <div>
                  { this.renderCategoriesWithProducts() }
              </div>
            </div>
              { this.renderRestaurantInfo(restaurant) }
          </div>
      </section>
    )
    } else {
        return (
            <p> Loading </p>
            )
    }
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.data,
    restaurant: state.restaurant.data,
    products: state.products.data
  }
}

export default connect(mapStateToProps)(RestaurantMenu)
