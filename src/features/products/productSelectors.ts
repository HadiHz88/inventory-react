import type { RootState } from '../../store';
import type { Product } from './productTypes';

/**
 * Select all products from the state
 */
export const selectAllProducts = (state: RootState): Product[] => state.products.products;

/**
 * Select products by category
 */
export const selectProductsByCategory = (category: string) => (state: RootState): Product[] =>
  state.products.products.filter((product: Product) => product.category === category);

/**
 * Select loading state
 */
export const selectProductsLoading = (state: RootState): boolean => state.products.loading;

/**
 * Select error state
 */
export const selectProductsError = (state: RootState): string | null => state.products.error;