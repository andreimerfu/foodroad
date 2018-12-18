import React, { Component } from 'react';
import Header  from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import { Router, Route} from 'react-router-dom';
import history from './history';
import requireRestaurantLogin  from './components/shared/protected/requireRestaurantLogin';
import requireUserLogin  from './components/shared/protected/requireUserLogin';
import requireLogin  from './components/shared/protected/requireLogin';
import Login  from './components/login/Login';
import Register from './components/register/Register';
import RestaurantSearch  from './components/home/RestaurantSearch';

import RestaurantIndex  from './components/restaurants/RestaurantIndex';
import RestaurantMenu  from './components/restaurants/RestaurantMenu';
import RestaurantRegister  from './components/restaurantRegistration/RestaurantRegister';
import RestaurantHome from './components/restaurants/RestaurantHome';
import UserProfile from './components/users/UserProfile';
import Rest from './components/restaurants/restaurantAdmin/Rest';
import Cart from './components/cart/Cart';
import OrdersHistory from './components/users/OrdersHistory';
import Checkout from './components/cart/Checkout';
import RestaurantInfoEdit from './components/restaurants/RestaurantInfoEdit';
import RestaurantActiveOrders from './components/restaurants/RestaurantActiveOrders';
import './App.css';
import * as actions from './actions';

import  ScrollToTop from './ScrollToTop';


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
          <ScrollToTop>
            <div className="App">
              <Header logout={this.logout}/>
                <div className="container">
                  <Route exact path='/' component={RestaurantSearch}/>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/restaurants' component={RestaurantIndex}/>
                  <Route exact path='/menu/:id' component={RestaurantMenu}/>
                  <Route exact path='/registerRestaurant' component={RestaurantRegister}/>
                  <Route exact path='/profile' component={requireLogin(UserProfile)}/>
                  <Route exact path='/homeRestaurant' component={requireRestaurantLogin(RestaurantHome)}/>
                  <Route exact path='/restaurantAdmin' component={requireRestaurantLogin(Rest)}/>
                  <Route exact path='/cart' component={requireUserLogin(Cart)}/>
                  <Route exact path='/orders' component={requireUserLogin(OrdersHistory)}/>
                  <Route exact path='/checkout' component={requireUserLogin(Checkout)}/>
                  <Route exact path='/restaurantInfo' component={requireRestaurantLogin(RestaurantInfoEdit)} />
                  <Route exact path='/activeOrders' component={requireRestaurantLogin(RestaurantActiveOrders)}/>
                </div>
              <Footer />
            </div>
            </ScrollToTop>
          </Router>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default App;
