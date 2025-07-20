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
        <Card>
            <CardContent >
                <Typography variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{product.price}</Typography>
                <Typography variant="body2">
                    {product.description}
                    <br />
                    {product.category}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
                {/* Show Edit/Delete only if handlers are provided */}
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
