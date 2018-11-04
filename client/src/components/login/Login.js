import React from 'react';
import LoginForm from './LoginForm';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

class Login extends React.Component {

  constructor() {
    super();

    this.loginUser = this.loginUser.bind(this);
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
        <div className="bnb-form">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h1>Login</h1>
              {
                registerSuccess &&
                 <div className='alert alert-success'>
                   <p> A confirmation email was sent to your account </p> 
                 </div>
              }
              <LoginForm submitCb={this.loginUser} errors={errors}/>
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
