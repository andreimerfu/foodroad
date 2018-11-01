import React from 'react';
import RegisterForm from './RegisterForm';
import { Redirect, Link } from 'react-router-dom';

import * as actions from '../../actions';

export class Register extends React.Component {

  constructor() {
    super();

    this.state = {
      redirect: false
    }

    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(userData) {
    actions.register(userData).then(
      registerd => this.setState({redirect: true}),
      );
  }

  render() {
    const {redirect } = this.state;

    if(redirect) {
      return <Redirect to={{pathname: '/login', state: {registerSuccess: true  }}} />
    }

    return (
      <section id="register">
        <div className="bnb-form">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h1>Register</h1>
              <RegisterForm submitCb={this.registerUser} />
              <div className='row  btn-register'>
                <p className='span-12'> Already have an account? </p>
                <Link className='btn btn-outline-success' to='/login'>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
