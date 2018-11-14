
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './auth-reducer';
import { restaurantReducer, selectedRestaurantReducer } from './restaurant-reducer';


export const init = () => {
  const reducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    restaurants: restaurantReducer,
    restaurant: selectedRestaurantReducer
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
