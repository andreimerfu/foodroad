import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { RestaurantCard } from './RestaurantCard';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';


class RestaurantIndex extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      latLng: cookies.get('latLng')
    };
  }

  renderRentals(){
    return this.props.restaurants.map((restaurant,i) => {
      return(
          <RestaurantCard key={i}
                      restaurant={restaurant}/>
        )
    } )
  }

  componentWillMount() {
    this.props.dispatch(actions.getRestaurants(this.state.latLng));
  }

  render(){
    return(
      <section id='restaurant-index'>
        <div className="row food-search">
          <div className="col-lg-12 search-input">
            <form className="card card-sm">
              <div className="card-body row no-gutters align-items-center">
                  <div className="col">
                      <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search restaurants, food or other shit" />
                  </div>
              </div>
            </form>
          </div>
        </div>
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

export default withCookies(connect(mapStateToProps)(RestaurantIndex))
