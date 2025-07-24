import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductRequest } from "./productTypes";

const backendUrl =
    import.meta.env.VITE_BACKEND_URL ??
    `http://test-1863767629.us-east-1.elb.amazonaws.com`;
const classifyUrl =
    import.meta.env.VITE_CLASSIFY_URL ?? `http://18.215.162.98:5000`;

const dynamicBaseQuery = async (args: any, api: any, extraOptions: any) => {
    const request = typeof args === "string" ? { url: args } : args;

    // Detect custom route
    const isClassification = request.url.startsWith("/classify");
    const baseUrl = isClassification ? classifyUrl : backendUrl;

    // Adjust request if needed (strip /classify if used just for routing)
    const adjustedUrl = isClassification
        ? request.url.replace(/^\/classify/, "")
        : request.url;

    return fetchBaseQuery({ baseUrl })(
        { ...request, url: adjustedUrl },
        api,
        extraOptions
    );
};

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: dynamicBaseQuery,
    tagTypes: ["Product"], // Used for cache invalidation
    endpoints: (builder) => ({
        // Query: Fetch all products
        getProducts: builder.query<Product[], void>({
            query: () => "/products",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Product" as const,
                              id,
                          })),
                          { type: "Product", id: "LIST" },
                      ]
                    : [{ type: "Product", id: "LIST" }],
        }),

        // Query: Search products by query string
        searchProducts: builder.query<Product[], string>({
            query: (searchQuery) =>
                `/products/search?q=${encodeURIComponent(searchQuery)}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Product" as const,
                              id,
                          })),
                          { type: "Product", id: "SEARCH" },
                      ]
                    : [{ type: "Product", id: "SEARCH" }],
        }),

        // Query: Fetch a single product by ID
        getProductById: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: (_, __, id) => [{ type: "Product", id }],
        }),

        // Mutation: Add a new product
        addProduct: builder.mutation<Product, ProductRequest>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: [{ type: "Product", id: "LIST" }], // Invalidate product list cache
        }),

        // Mutation: Delete a product
        deleteProduct: builder.mutation<
            { success: boolean; id: number },
            number
        >({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_, __, id) => [
                { type: "Product", id },
                { type: "Product", id: "LIST" },
            ],
        }),

        // Mutation: Update a product
        updateProduct: builder.mutation<Product, Product>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                body: product,
            }),
            invalidatesTags: (_, __, product) => [
                { type: "Product", id: product.id },
                { type: "Product", id: "LIST" },
            ],
        }),

        // Query: Fetch all product IDs that need classification
        findUncategorized: builder.query<number[], void>({
            query: () => ({
                url: `products/needs-classification`,
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((id) => ({
                              type: "Product" as const,
                              id,
                          })),
                          { type: "Product", id: "UNCATEGORIZED" },
                      ]
                    : [{ type: "Product", id: "UNCATEGORIZED" }],
        }),

        classifyProducts: builder.mutation<any, number[]>({
            query: (ids) => ({
                url: "/classify/products",
                method: "POST",
                body: { productIds: ids },
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetProductsQuery,
    useSearchProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useLazyFindUncategorizedQuery,
    useClassifyProductsMutation,
} = productApi;
