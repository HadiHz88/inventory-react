import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, Typography } from "@mui/material";
import type { Product } from '../../features/products/productTypes';

type Props = {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (product: Product) => void;
}

function ProductCard({ product, onEdit, onDelete }: Props) {
    return (
        <Card sx={{ width: '100%', height: '100%', minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    {product.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    {product.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {product.category}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
                {onEdit && (
                    <Button size="small" onClick={() => onEdit(product)}>Edit</Button>
                )}
                {onDelete && (
                    <Button size="small" color="error" onClick={() => onDelete(product)}>Delete</Button>
                )}
            </CardActions>
        </Card>
    );
}

export default ProductCard;
