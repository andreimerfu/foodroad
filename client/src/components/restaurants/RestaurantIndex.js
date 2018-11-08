import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { RestaurantCard } from './RestaurantCard';

 class RestaurantIndex extends React.Component {


renderRentals(){

    return this.props.restaurants.map((restaurant,i) => {
      return(
          <RestaurantCard key={i}
                      restaurant={restaurant}/>
        )
    } )
  }

 componentWillMount() {
    this.props.dispatch(actions.fetchRestaurants());
  }

  render(){

    return(
      <section id='restaurant-index'>
        <h1 className='page-title'> Good food is Good mood </h1>
          <div className='row'>
            {this.renderRentals()}
          </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants.data
  }
}
 export default connect(mapStateToProps)(RestaurantIndex)
