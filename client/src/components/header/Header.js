import React from 'react';
import { Link, withRouter, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import RecommendationModal from '../shared/RecommendationModal';

class Header extends React.Component  {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  renderAuthButtons(role, isAuth) {

    if (isAuth && role === 'restaurant') {
      return (

         <div className="btn-group">

          <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="far fa-user-circle"></i>
            <span className="sr-only">Toggle Dropdown</span>
          </button>

          <div className="dropdown-menu dropdown-menu-right">
            <Link to="/profile" className="dropdown-item"> Profil </Link>
            <Link to="/restaurantAdmin" className="dropdown-item">Administrare</Link>
            <Link to="/restaurantInfo" className="dropdown-item">Informatii </Link>
              <Link to="/activeOrders" className="dropdown-item">Comenzi active</Link>
            <div className="dropdown-divider"></div>
            <a className='dropdown-item' onClick={this.handleLogout} > Deconectare </a>
          </div>
        </div>
      )
    } else if (isAuth) {
      return (
       <div className="btn-group">
          <Link to='/cart' className="btn btn-danger"><i style={{"margin-right": "5px"}}class="fas fa-cart-plus"></i>{this.props.cart.length}</Link>

          <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="far fa-user-circle"></i>
            <span className="sr-only">Toggle Dropdown</span>
          </button>

          <div className="dropdown-menu dropdown-menu-right">
            <Link to="/profile" className="dropdown-item"> Profil </Link>
            <Link to="/orders" className="dropdown-item">Istoric comenzi</Link>
            <div className="dropdown-divider"></div>
            <a className='dropdown-item' onClick={this.handleLogout} > Deconectare </a>
          </div>

          <div style={{display: "flex"}}>
            <RecommendationModal />
          </div>
        </div>
      )
    }
    return (
        <Link className='btn btn-outline-primary' to='/login'> Conectare <span className='sr-only'>(current)</span></Link>
    )
  }

  render() {
    const role = localStorage.getItem('role');
    const { isAuth } = this.props.auth;
    if (isAuth && role === 'restaurant') {
      return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <a className='navbar-brand d-inline-block align-top' href='homeRestaurant'>
              Food
              <img src='../images/logo.jpg' width='40' height='42'  alt=''/>
              Road
            </a>
            <form className="form-inline">
              { this.renderAuthButtons(role, isAuth) }
            </form>
          </div>
        </nav>
      )
  } else {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <a className='navbar-brand d-inline-block align-top' href='/'>
              Food
              <img src='../images/logo.jpg' width='40' height='42'  alt=''/>
              Road
            </a>
            <form className="form-inline">
              { this.renderAuthButtons(role, isAuth) }
            </form>
          </div>
        </nav>
      )
  }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cart: state.cart
  }
}

export default withRouter(connect(mapStateToProps)(Header));
