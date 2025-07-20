import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';

// Combine all feature reducers here
const rootReducer = combineReducers({
  products: productReducer,
  // add other reducers here as your app grows
});

export default rootReducer;