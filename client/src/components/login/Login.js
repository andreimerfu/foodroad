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
        <div className="bnb-form">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h1>Login</h1>
              {
                 registerSuccess&&
                 <Alert color="success" isOpen={this.state.visible} >
                    Thanks for signing up. Please confirm your email!
                  </Alert>
              }
              <LoginForm submitCb={this.loginUser} errors={errors}/>
              <div className='row auth-row'>
                <p className='span-12'> Don't have an account? </p>
                <Link className='btn btn-outline-info auth-btn' to='/register'>Register</Link>
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
