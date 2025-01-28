import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../../../shared/model/context/context';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function CartButton() {
  const navigate = useNavigate();
  const cartProducts = useCart();
  const amountProductsAtCart =
    cartProducts &&
    useMemo(
      () => Object.values(cartProducts).reduce((acc, curr) => (acc += curr), 0),
      [cartProducts],
    );

  return (
    <IconButton
      size='large'
      aria-label='4 products at cart'
      color='inherit'
      onClick={() => {
        navigate('/cart');
      }}
    >
      <Badge badgeContent={amountProductsAtCart} color='error'>
        <ShoppingCartIcon sx={{ color: '#fff' }} />
      </Badge>
    </IconButton>
  );
}
