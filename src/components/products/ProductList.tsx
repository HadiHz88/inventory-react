import { useGetProductsQuery } from "../../features/products/productApi";
import { Alert, Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { getErrorMessage } from "../../utils/helpers";


export default function ProductList({ onEdit, onDelete }: { onEdit?: any, onDelete?: any }) {

  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <Box sx={{ width: '100%', mx: 'auto', py: 4, px: 2 }}>

      {isLoading ? (
        <Typography align="center">Loading products...</Typography>
      ) : error ? (
        <Alert severity="error">{getErrorMessage(error)}</Alert>
      ) : (
        <>
              <Typography variant="h6" sx={{ mb: 3 }} align="center">Number of products: {products?.length}</Typography>
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
                  <Typography sx={{ mt: 4 }} align="center">No products available.</Typography>
          )}
        </>
      )}
    </Box>
  );
}