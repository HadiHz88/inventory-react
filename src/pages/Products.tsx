import { Box, Paper } from "@mui/material";
import ProductList from "../components/products/ProductList";

export default function Products() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <ProductList />
      </Paper>
    </Box>
  );
}