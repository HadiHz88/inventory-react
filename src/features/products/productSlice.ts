import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './productTypes';
import { fetchProducts } from './productThunks';

// Define the shape of the product state
interface ProductState {
  products: Product[];      // List of products
  loading: boolean;         // Loading state for async actions
  error: string | null;     // Error message, if any
}

// Initial state for the product slice
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Add synchronous reducers here if needed (e.g., for local state changes)
  },
  extraReducers: (builder) => {
    // Handle async thunk actions
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

// Export the reducer to be used in the store
export default productSlice.reducer;