import React from 'react';
import LoginForm from './LoginForm';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends React.Component {

  constructor() {
    super();

    this.loginUser = this.loginUser.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

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

  responseFacebook(response) {
    if (Object.keys(response).length > 0) {
      this.props.dispatch(actions.facebookLogin(response));
    }
  }

  notify = (error) => toast.error(error);


   render() {
    const { isAuth, errors } = this.props.auth;

    if (errors && errors.length > 0) {
      this.notify(errors[0]);
    }
    //location.state is undefined if register is not true so registerSuccess is false in this case
    const { registerSuccess } = this.props.location.state || false;
    const role = localStorage.getItem('role');
    if (isAuth && role === 'user') {
      return <Redirect to={{pathname: '/'}} />
    } else if( isAuth && role === 'restaurant') {
      return <Redirect to={{pathname: '/homeRestaurant'}} />
    }


    return (
      <section id="login">
        <div class="page-holder d-flex align-items-center">
            <div class="wrap">
              <div class="row align-items-center py-5">
                <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">

                  <div class="pr-lg-5"><img src="../images/login.png" alt="" class="img-fluid img-login"></img></div>

                </div>
                <div class="col-lg-5 px-lg-4">
                  <ToastContainer />
                  <h1 class="text-base text-primary text-uppercase mb-4">Food Delivery</h1>
                  <h2 class="mb-4">Welcome back!</h2>
                  <p class="text-muted">Don’t feel like cooking tonight? Then let us deliver your favourite meals </p>
                  {
                     registerSuccess&&
                     <Alert color="success" isOpen={this.state.visible} >
                        Thanks for signing up. Please confirm your email!
                    </Alert>
                  }
                  <LoginForm submitCb={this.loginUser} errors={errors}/>
                  <div class="row form-group mx-0">
                    <p class="text-muted mb-0 py-1"> Don't have an account? </p>
                  </div>

                  <div class="row form-group mb-1 mx-0">
                    <div>
                      <Link className='btn btn-outline-primary shadow px-5 ml-3' to='/register'>Sign up</Link>
                    </div>
                    <p class="text-muted mb-0 ml-3 mr-3"> or </p>
                    <div>
                    <FacebookLogin
                        appId="1948869098482449"
                        autoLoad={false}
                        fields="name,email,picture"
                        icon="fa-facebook"
                        cssClass="btn btn-primary shadow fb-btn"
                        textButton=""
                        callback={this.responseFacebook} />
                    </div>
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
