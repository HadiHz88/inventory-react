import { type Middleware } from '@reduxjs/toolkit';

// Example: simple logger middleware that logs every action
export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  return next(action);
};

// Export as an array so you can add more middleware easily
export default [loggerMiddleware];