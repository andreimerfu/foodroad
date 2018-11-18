import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { CategoryCard } from './CategoryCard';


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
        <li className="active" key={i}>
          <a href="#">{category.attributes.name}</a>
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

  render(){
    const categories = this.props.categories;
    const restaurant = this.props.restaurant;
    const products = this.props.products;

    if (categories.length > 0 && Object.keys(restaurant).length > 0) {
      return(
        <section id='restaurant-menu'>
        <div className="wrapper">
          <nav id="sidebar">
              <div className="sidebar-header">
                  {this.renderRestaurantName(restaurant)}
              </div>

              <ul className="list-unstyled components">
                  {this.renderCategories()}
              </ul>

              <ul className="list-unstyled CTAs">
                  <li>
                      <a href="" className="download">Recenzii</a>
                  </li>
                  <li>
                      <a href="" className="article">Info</a>
                  </li>
              </ul>
          </nav>

          <div id="content">
            {this.renderCategoriesWithProducts()}
          </div>
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
