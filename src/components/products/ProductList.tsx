import { useState } from "react";
import { useGetProductsQuery, useSearchProductsQuery } from "../../features/products/productApi";
import { Alert, Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { getErrorMessage } from "../../utils/helpers";
import ProductFilter from "./ProductFilter";


export default function ProductList({ onEdit, onDelete }: { onEdit?: any, onDelete?: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Always call both hooks, but skip the one we don't need
  const { data: allProducts, isLoading: isLoadingAll, error: errorAll } = useGetProductsQuery(undefined, {
    skip: isSearching
  });

  const { data: searchProducts, isLoading: isLoadingSearch, error: errorSearch } = useSearchProductsQuery(searchQuery, {
    skip: !isSearching || !searchQuery.trim()
  });

  // Use the appropriate data based on search state
  const products = isSearching ? searchProducts : allProducts;
  const isLoading = isSearching ? isLoadingSearch : isLoadingAll;
  const error = isSearching ? errorSearch : errorAll;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query.trim());
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <Box sx={{ width: '100%', mx: 'auto', py: 4, px: 2 }}>

      <ProductFilter
        onSearch={handleSearch}
        onClear={handleClear}
        searchQuery={searchQuery}
      />

      {isLoading ? (
        <Typography align="center">Loading products...</Typography>
      ) : error ? (
        <Alert severity="error">{getErrorMessage(error)}</Alert>
      ) : (
        <>
              <Typography variant="h6" sx={{ mb: 3 }} align="center">
                {isSearching ? `Search results for "${searchQuery}": ${products?.length || 0}` : `Number of products: ${products?.length || 0}`}
              </Typography>
              {(products || []).length > 0 ? (
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)'
                  },
                  gap: 4,
                  alignItems: 'stretch',
                  justifyItems: 'stretch',
                  width: '100%',
                }}>
                  {(products || []).map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))}
            </Box>
          ) : (
                  <Typography sx={{ mt: 4 }} align="center">
                    {isSearching ? `No products found for "${searchQuery}".` : "No products available."}
                  </Typography>
          )}
        </>
      )}
    </Box>
  );
}