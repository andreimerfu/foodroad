import React from 'react';
import RegisterForm from './RegisterForm';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as actions from '../../actions';

class Register extends React.Component {

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
      return <Redirect to={{pathname: '/login', state: {registerSuccess: true  }}} />
    }

    return (
      <section id="register">
        <div className="bnb-form">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h1>Register</h1>
              <RegisterForm submitCb={this.registerUser} errors={errors}/>
              <div className='row auth-row'>
                <p className='span-12'> Already have an account? </p>
                <Link className='btn btn-outline-success auth-btn' to='/login'>Login</Link>
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