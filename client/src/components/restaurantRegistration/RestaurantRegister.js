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
            <div class="">
              <div class="row  py-5">
                <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
                  <div class="col pr-lg-5">
                    <img src="../images/partner.png" alt="" class="img-fluid img-partner pb-3"></img>
                    <img src="../images/partner1.png" alt="" class="img-fluid img-partner py-5"></img>
                  </div>
                </div>
                <div class="col-lg-5 px-lg-4">
                  <h1 class="text-base text-primary text-uppercase mb-4">Become our partner</h1>
                  <h2 class="mb-4">Create a Food Road Account</h2>
                  <p class="text-muted">The fast way to get food to your customers</p>
                  <RegisterForm submitCb={this.registerRestaurant} errors={errors} />
                  <div class="row form-group mb-4">
                      <p class="text-muted mb-0 py-1"> Already have an account? </p>
                      <Link className='btn btn-outline-primary shadow px-5 mx-3' to='/login'>Log In</Link>
                  </div>
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
