
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './auth-reducer';
import { restaurantReducer, restaurantCategoriesReducer, productsReducer, restaurantInfoReducer } from './restaurant-reducer';
import { userProfileReducer } from './user-reducer';

export const init = () => {
  const reducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    restaurants: restaurantReducer,
    categories: restaurantCategoriesReducer,
    products: productsReducer,
    restaurant: restaurantInfoReducer,
    userProfile: userProfileReducer
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
