import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { RestaurantCard } from './RestaurantCard';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { RingLoader } from 'react-spinners';


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

  getRestaurantsBySearch(e) {
    this.props.dispatch(actions.getRestaurants(this.state.latLng, e.target.value))
    this.renderRentals()
  }

  componentWillMount() {
    this.props.dispatch(actions.getRestaurants(this.state.latLng));
  }

  render(){
    const restaurants = this.props.restaurants;
    if (restaurants && Object.keys(restaurants).length >= 0) {
      return(
        <section id='restaurant-index'>
          <div class="justify-content-center py-5">
            <div className="col-lg-6 food-search  mt-5 py-5">
              <input className="form-control form-control-lg form-control-borderless"  onChange={(e) => {this.getRestaurantsBySearch(e) }} placeholder="Cauta restaurante sau mancaruri delicioase" />
            </div>
            <div className='row card-container'>
                  {this.renderRentals()}
            </div>

          </div>
        </section>
      )
    } else {
      return(
        <div className="spinner-container">
         <RingLoader
          sizeUnit={"px"}
          size={100}
          color={'#123abc'}
          loading={true}
        />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants.data
  }
}

export default withCookies(connect(mapStateToProps)(RestaurantIndex))
