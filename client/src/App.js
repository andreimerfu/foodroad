import React, { Component } from 'react';
<<<<<<< Updated upstream
import { Header } from './components/header/Header';
=======
import Header  from './components/header/Header';
import { Provider } from 'react-redux';

import { BrowserRouter, Route} from 'react-router-dom';
import Login  from './components/login/Login';
//import { Register } from './components/register/Register';
>>>>>>> Stashed changes

import './App.css';
import * as actions from './actions';


class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  render() {
    return (
<<<<<<< Updated upstream
      <div className="App">
        <Header />
      </div>
=======
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
>>>>>>> Stashed changes
    );
  }
}

export default App;
