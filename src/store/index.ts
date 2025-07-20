import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducers';
import middleware from './middleware';
import { productApi } from '../features/products/productApi';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware).concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;