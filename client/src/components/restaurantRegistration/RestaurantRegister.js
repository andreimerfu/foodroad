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

    this.registerUser = this.registerUser.bind(this);
  }


  registerUser(userData) {
    this.props.dispatch(actions.register(userData)).then(
      registerd=> this.setState({redirect: true})
    );
  }

  render() {


    const { redirect } = this.state;
    const { errors } = this.props.auth;
    if( errors.length === 0 && redirect) {
      return <Redirect to={{pathname: '/home', state: {registerSuccess: true  }}} />
    }

    return (
      <section id="register">
          <div class="page-holder d-flex align-items-center">
            <div class="container">
              <div class="row align-items-center py-5">
                <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
                  <div class="pr-lg-5"><img src="../images/home.png" alt="" class="img-fluid"></img></div>
                </div>
                <div class="col-lg-5 px-lg-4">
                  <h1 class="text-base text-primary text-uppercase mb-4">Create a FoodRoad Account</h1>
                  <h2 class="mb-4">Welcome back!</h2>
                  <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                  <RegisterForm submitCb={this.registerUser} errors={errors} />
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
