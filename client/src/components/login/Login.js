import React from 'react';
import LoginForm from './LoginForm';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Login extends React.Component {

  constructor() {
    super();

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(userData) {
    console.log(userData);
    this.props.dispatch(actions.login(userData));
  }

   render() {

    const { isAuth } = this.props.auth;
    //location.state is undefined if register is not true so registerSuccess is false in this case
    const { registerSuccess } = this.props.location.state || false ;

    if (isAuth) {
      return <Redirect to={{pathname: '/'}} />
    }

    return (

      <section id="login">
        <div className="bnb-form">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h1>Login</h1>
              {
                registerSuccess &&
                 <div className='alert alert-success'>
                  <p> Thanks for signing up. Please confirm your email! </p>
                 </div>
              }
              <LoginForm submitCb={this.loginUser} />
              <div className='row  btn-register'>
                <p className='span-12'> Don't have an account? </p>
                <Link className='btn btn-outline-success' to='/register'>Register</Link>
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
