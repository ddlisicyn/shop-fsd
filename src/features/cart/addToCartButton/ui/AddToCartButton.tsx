import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function AddToCartButton() {
    return (
        <IconButton size="large" aria-label="4 products at cart" color="inherit">
            <Badge badgeContent={4} color="error">
                <ShoppingCartIcon sx={{ color: '#fff' }} />
            </Badge>
        </IconButton>
    )
}