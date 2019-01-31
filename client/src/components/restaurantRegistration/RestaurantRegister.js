import React from 'react';
import RegisterForm from './RegisterForm';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as actions from '../../actions';

class RestaurantRegister extends React.Component {

  constructor() {
    super();

    this.state = {
      redirect: false
    }

    this.registerRestaurant = this.registerRestaurant.bind(this);
  }

  loginManager(restaurantData) {
    this.props.dispatch(actions.login({"email": restaurantData.email, "password": restaurantData.password})).then(
      registred => this.setState({redirect: true})
    );
  }

  registerRestaurant(restaurantData) {
    this.props.dispatch(actions.registerRestaurant(restaurantData)).then(
      data => this.loginManager(restaurantData)
    );
  }

  render() {
    const { redirect } = this.state;
    const { errors } = this.props.auth;
    if( errors.length === 0 && redirect) {
      return <Redirect to={{pathname: '/homeRestaurant', state: {registerSuccess: true  }}} />
    }

    return (
      <section id="register">
          <div class="page-holder d-flex align-items-center">
            <div class="wrap justify-content-center mx-auto">
              <div class="row wrap-login py-5">


                  <div class="col fc-r">

                      <h1 class="text-base text-primary text-uppercase mb-4">Devino partener Food Road</h1>
                      <h2 class="mb-4 pt-4">Cea mai rapida metoda de a livra comenzi clientilor</h2>
                      <RegisterForm submitCb={this.registerRestaurant} errors={errors} />

                </div>


              </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(RestaurantRegister)
