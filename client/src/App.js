import React, { Component } from 'react';
import Header  from './components/header/Header';
import { Provider } from 'react-redux';
import { CookiesProvider, withCookies } from 'react-cookie';

import { BrowserRouter, Route} from 'react-router-dom';
import Login  from './components/login/Login';
import Register from './components/register/Register';
import  RestaurantSearch  from './components/home/RestaurantSearch';
import  RestaurantIndex  from './components/restaurants/RestaurantIndex';

import './App.css';
import * as actions from './actions';


const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <div className="App">
                <Header logout={this.logout}/>
                <div className="container">
                  <Route exact path='/' render={() => (<RestaurantSearch cookies={this.props.cookies}/>)} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/restaurants' component={RestaurantIndex}/>
                </div>
            </div>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default withCookies(App);
