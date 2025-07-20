import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from './productTypes';
import api from '../../services/api';

/**
 * Async thunk to fetch products from the API
 * Dispatches pending, fulfilled, and rejected actions automatically
 */
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Make a GET request to the /products endpoint
      const response = await api.get('/products');
      // Return the array of products from the response
      return response.data.products;
    } catch (error: any) {
      // If there's an error, return a rejected value
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);