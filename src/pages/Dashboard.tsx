import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  Snackbar,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLazyFindUncategorizedQuery,
  useClassifyProductsMutation
} from '../features/products/productApi';

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export default function Dashboard() {
  // Fetch products query
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  // Fetch uncategorized products query
  const [triggerFindUncategorized] = useLazyFindUncategorizedQuery();

  // Mutation hooks
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [classifyProduct] = useClassifyProductsMutation();

  // Modal and form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
  });

  // Notifications
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  // Open modal for add or edit
  const openAddModal = () => {
    setEditingProduct(null);
    setForm({ name: '', description: '', price: 0, category: '', stock: 0 });
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setForm({ name: '', description: '', price: 0, category: '', stock: 0 });
  };

  // Form input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  // Submit add/update
  const handleSubmit = async () => {
    try {
      if (editingProduct && editingProduct.id !== undefined) {
        await updateProduct({ id: editingProduct.id, ...form }).unwrap();
        setNotification({ message: 'Product updated successfully', severity: 'success' });
      } else {
        await addProduct(form).unwrap();
        setNotification({ message: 'Product added successfully', severity: 'success' });
      }
      closeModal();
    } catch {
      setNotification({ message: 'Operation failed, please try again', severity: 'error' });
    }
  };

  // Delete handler
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
      setNotification({ message: 'Product deleted successfully', severity: 'success' });
    } catch {
      setNotification({ message: 'Failed to delete product', severity: 'error' });
    }
  };

  // Classify logic
  const handleClassify = async () => {
    try {
      // Fetch uncategorized product IDs
      const ids = await triggerFindUncategorized().unwrap();
      console.log("Uncategorized Product IDs:", ids);

      // Send them to classification backend
      await classifyProduct(ids).unwrap();

      setNotification({
        message: "Products classified successfully.",
        severity: "success",
      });
    } catch (err) {
      console.error("Error during classification", err);
      setNotification({
        message: "Failed to classify products.",
        severity: "error",
      });
    }
  };




  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">Product Dashboard</Typography>
          <Button variant="contained" color="primary" onClick={openAddModal}>
            Add Product
          </Button>
        </Box>

        {isLoading ? (
          <Typography>Loading products...</Typography>
        ) : error ? (
          <Alert severity="error">Failed to load products.</Alert>
        ) : (
          <>
            <Typography variant="subtitle1">Total Products: {products.length}</Typography>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {products.length === 0 && <Typography>No products available.</Typography>}
              {products.map((product) => (
                <Paper
                  key={product.id}
                  sx={{
                    p: 2,
                    minWidth: 250,
                    flex: '1 1 250px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  elevation={2}
                >
                  <Box>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography>Price: ${product.price.toFixed(2)}</Typography>
                    <Typography>Category: {product.category || 'Uncategorized'}</Typography>
                    <Typography>Stock: {product.stock}</Typography>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button size="small" variant="outlined" onClick={() => openEditModal(product)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => product.id && handleDelete(product.id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Classify Products</Typography>
          <Button variant="contained" color="secondary" onClick={handleClassify}>
            Classify
          </Button>
        </Box>
      </Paper>

      {/* Modal for Add/Edit Product */}
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Name" name="name" fullWidth value={form.name} onChange={handleChange} />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            minRows={2}
            value={form.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            fullWidth
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            value={form.price}
            onChange={handleChange}
          />
          <TextField margin="dense" label="Category" name="category" fullWidth value={form.category} onChange={handleChange} />
          <TextField
            margin="dense"
            label="Stock"
            name="stock"
            fullWidth
            type="number"
            inputProps={{ min: 0, step: 1 }}
            value={form.stock}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={isAdding || isUpdating}>
            {editingProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar notifications */}
      <Snackbar
        open={!!notification}
        autoHideDuration={1000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity={notification?.severity ?? 'success'}>
          {notification?.message ?? ''}
        </Alert>
      </Snackbar>
    </Box>
  );
};
