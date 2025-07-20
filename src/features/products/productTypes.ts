/**
 * Product entity type
 * Represents a single product in our application.
 */
export interface Product {
    id: number;           // Unique identifier for the product
    name: string;         // Name of the product
    description: string;  // Description of the product
    price: number;        // Price of the product
    category: string;     // Category the product belongs to
    stock: number;        // Stock of the product
  }
  
  /**
   * API response for fetching products
   * Used to type the response from the backend when fetching products.
   */
  export interface ProductResponse {
    products: Product[];  // Array of products
    total: number;        // Total number of products (for pagination, etc.)
  }
  
  /**
   * API request for creating/updating a product
   * Used to type the data sent to the backend when creating or updating a product.
   */
  export interface ProductRequest {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  }