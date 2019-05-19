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

    return <section id="register">
        <div class="page-holder d-flex align-items-center">
          <ToastContainer />
          <div class="wrap py-5">
            <div class="row align-items-center">
              <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
                <div class="pr-lg-5">
                  <img src="../images/login.png" alt="" class="img-fluid img-login" />
                </div>
              </div>
              <div class="col-lg-5 px-lg-4 wrap-login py-5 mt-5">
                <h1 class="text-base text-primary text-uppercase mb-4 pb-5">
                  Inregistrare
                </h1>
                <RegisterForm submitCb={this.registerUser} errors={errors} />
                <div class="row form-group mb-1 mx-0 pt-4">
                  <div class="mr-1">
                    <span class="txt2 pr-2">Ai un cont? </span>
                  </div>
                  <Link to="/login" class="txt2 bo1">
                    {" "}
                    Autentifica-te
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(Register)
