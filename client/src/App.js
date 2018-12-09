import React, { Component } from 'react';
import Header  from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import { Router, Route} from 'react-router-dom';
import history from './history';
import Login  from './components/login/Login';
import Register from './components/register/Register';
import RestaurantSearch  from './components/home/RestaurantSearch';
import requireRestaurantLogin  from './components/restaurants/requireRestaurantLogin';
import RestaurantIndex  from './components/restaurants/RestaurantIndex';
import RestaurantMenu  from './components/restaurants/RestaurantMenu';
import RestaurantRegister  from './components/restaurantRegistration/RestaurantRegister';
import RestaurantHome from './components/restaurants/RestaurantHome';
import UserProfile from './components/users/UserProfile';
import Cart from './components/cart/Cart';
import OrdersHistory from './components/users/OrdersHistory';
import { Rest } from './components/restaurants/restaurantAdmin/Rest';

import './App.css';
import * as actions from './actions';


const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  componentDidMount() {
    document.title = "FoodRoad";
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
          <Router history={history}>
            <div className="App">
              <Header logout={this.logout}/>
                <div className="container">
                  <Route exact path='/' component={RestaurantSearch}/>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/restaurants' component={RestaurantIndex}/>
                  <Route exact path='/menu/:id' component={RestaurantMenu}/>
                  <Route exact path='/registerRestaurant' component={RestaurantRegister}/>
                  <Route exact path='/profile' component={UserProfile}/>
                  <Route exact path='/homeRestaurant' component={requireRestaurantLogin(RestaurantHome)}/>
                  <Route exact path='/cart' component={Cart}/>
                  <Route exact path='/orders' component={OrdersHistory}/>
                  <Route exact path='/restaurantAdmin' component={Rest}/>
                </div>
              <Footer />
            </div>
          </Router>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default App;
