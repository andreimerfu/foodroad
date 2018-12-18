import React from 'react';
import RegisterForm from './RegisterForm';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as actions from '../../actions';

class Register extends React.Component {

  constructor() {
    super();

    this.state = {
      redirect: false,
    };

    this.registerUser = this.registerUser.bind(this);
  }


  registerUser(userData) {
    this.props.dispatch(actions.register(userData)).then(
      response => {
        if (response) {
          this.setState({redirect: true})
        }
      }
    );
  }

  notify = (error) => toast.error(error);


  render() {
    const { redirect } = this.state;
    const { errors } = this.props.auth;

    if(errors && errors.length === 0 && redirect) {
      return <Redirect to={{pathname: '/login', state: {registerSuccess: true  }}} />
    }

    if (errors && errors.length > 0) {
      errors.forEach(error => {
        this.notify(error);
      });
    }

    return (
      <section id="register">
        <div class="page-holder d-flex align-items-center">
          <ToastContainer />
          <div class="container">
              <div class="row align-items-center py-5">
                <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
                  <div class="pr-lg-5"><img src="../images/login.png" alt="" class="img-fluid img-login"></img></div>
                </div>
                <div class="col-lg-5 px-lg-4">
                  <h1 class="text-base text-primary text-uppercase mb-4">Create a FoodRoad Account</h1>
                  <h2 class="mb-4">Welcome back!</h2>
                  <p class="text-muted">Don’t feel like cooking tonight? Then let us deliver your favourite meals</p>
                  <RegisterForm submitCb={this.registerUser} errors={errors} />
                  <div class="row form-group mb-4 mx-0">
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
export default connect(mapStateToProps)(Register)
