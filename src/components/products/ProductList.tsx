import { useGetProductsQuery } from "../../features/products/productApi";
import { Alert, Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { getErrorMessage } from "../../utils/helpers";


export default function ProductList() {

  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div>

      {isLoading ? (
        <Typography>Loading products...</Typography>
      ) : error ? (
        <Alert severity="error">{getErrorMessage(error)}</Alert>
      ) : (
        <>
          <Typography variant="h6">Number of products: {products?.length}</Typography>

              {(products || []).length > 0 ? (
                <Box sx={{ mt: 2, gap: 4, display: 'flex', flexWrap: 'wrap' }}>
                  {(products || []).map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
            </Box>
          ) : (
            <Typography sx={{ mt: 2 }}>No products available.</Typography>
          )}
        </>
      )}
    </div>
  );
}