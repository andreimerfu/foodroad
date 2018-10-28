import React, { Component } from 'react';
import Header  from './components/header/Header';
import { Provider } from 'react-redux';

import { BrowserRouter, Route} from 'react-router-dom';
import Login  from './components/login/Login';
//import { Register } from './components/register/Register';

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

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
              <Header />
              <div className="container">
                <Route exact path='/' />
                <Route exact path='/login' component={Login} />
              </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
