
import thunk from 'redux-thunk';
import { autoRehydrate, persistStore, persistReducer } from 'redux-persist';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './auth-reducer';
import { restaurantReducer, restaurantCategoriesReducer, productsReducer, restaurantInfoReducer } from './restaurant-reducer';
import { userProfileReducer } from './user-reducer';
import { cartReducer } from './cart-reducer';

export const init = () => {
  const reducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    restaurants: restaurantReducer,
    categories: restaurantCategoriesReducer,
    products: productsReducer,
    restaurant: restaurantInfoReducer,
    userProfile: userProfileReducer,
    cart: cartReducer
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  persistStore(store);
  return store;
}
