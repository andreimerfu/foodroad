import React from 'react';
import LoginForm from './LoginForm';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

class Login extends React.Component {

  constructor() {
    super();

    this.loginUser = this.loginUser.bind(this);

    this.state = {
      visible: true
    }

    setTimeout(() => {
      this.setState({
        visible: false
      })
    }, 3000);
  }

  loginUser(userData) {
    this.props.dispatch(actions.login(userData));
  }

   render() {

    const { isAuth, errors } = this.props.auth;
    //location.state is undefined if register is not true so registerSuccess is false in this case
    const { registerSuccess } = this.props.location.state || false;

    if (isAuth) {
      return <Redirect to={{pathname: '/'}} />
    }

    return (
      <section id="login">
        <div class="page-holder d-flex align-items-center">
            <div class="container">
              <div class="row align-items-center py-5">
                <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">

                  <div class="pr-lg-5"><img src="../images/login.png" alt="" class="img-fluid img-login"></img></div>

                </div>
                <div class="col-lg-5 px-lg-4">

                  <h1 class="text-base text-primary text-uppercase mb-4">Welcome back!</h1>
                  <h2 class="mb-4">Welcome back!</h2>
                  <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                  {
                     registerSuccess&&
                     <Alert color="success" isOpen={this.state.visible} >
                        Thanks for signing up. Please confirm your email!
                    </Alert>
                  }
                  <LoginForm submitCb={this.loginUser} errors={errors}/>
                  <div class="row form-group mb-4 mx-0">
                    <p class="text-muted mb-0 py-1"> Don't have an account? </p>
                    <Link className='btn btn-outline-primary shadow px-5 ml-3' to='/register'>Sign up</Link>
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
export default connect(mapStateToProps)(Login)
