import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component  {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  renderAuthButtons() {
    const { isAuth } = this.props.auth;
    if (isAuth) {
      return (
        <div className="btn-group">
          <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="far fa-user-circle"></i>
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            <Link to="/profile" className="dropdown-item"> Profile </Link>
            <Link to="/orders" className="dropdown-item">Istoric comenzi</Link>
            <div className="dropdown-divider"></div>
            <a className='dropdown-item' onClick={this.handleLogout} > Logout </a>
          </div>
        </div>
      )
    }
    return (
        <Link className='btn btn-outline-primary' to='/login'>Login <span className='sr-only'>(current)</span></Link>
    )
  }

  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand d-inline-block align-top' href='/'>
            Food
            <img src='../images/logo.jpg' width='40' height='42'  alt=''/>
            Road
          </a>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <form className="form-inline">
            <Link to='/cart' className="btn btn-danger"><i style={{"margin-right": "5px"}}class="fas fa-cart-plus"></i>{this.props.cart.length}</Link>
            { this.renderAuthButtons() }
          </form>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cart: state.cart
  }
}

export default withRouter(connect(mapStateToProps)(Header));
