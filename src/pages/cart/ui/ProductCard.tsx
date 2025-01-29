import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  ButtonGroup,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Product } from '../../../entities/product/model/product';
import { BASE_IMG_URL } from '../../../shared/config';
import {
  useCart,
  useCartDispatch,
} from '../../../shared/model/context/context';
import { useState, useCallback } from 'react';
import { EXPENSES, EXCHANGE_RATE } from '../../../shared/config';

export const ProductCard = ({ product }: { product: Product }) => {
  const { handleIncrease, handleDecrease, handleDelete } = useCartDispatch();
  const { name, code, images, price, retailPrice } = product;
  const cartProducts = useCart() || {};
  const [amount, setAmount] = useState(cartProducts[code] || 0);
  const getCorrectedPrice = useCallback(
    (price: number): string =>
      Math.ceil(((price * EXPENSES) / EXCHANGE_RATE) * amount).toLocaleString(
        'ru-RU',
        {
          style: 'currency',
          currency: 'RUB',
        },
      ),
    [amount],
  );
  const handleDeleteProduct = () => {
    handleDelete(code);
    setAmount(0);
  };
  const handleAdd = () => {
    handleIncrease(code);
    setAmount((amount) => amount + 1);
  };
  const handleRemove = () => {
    handleDecrease(code);
    setAmount((amount) => amount - 1);
  };

  if (amount === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          rowGap: 1,
        }}
      >
        <img
          src={`${BASE_IMG_URL}${images[3].url}`}
          style={{ width: '20%', maxWidth: '120px' }}
          alt={name}
        ></img>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption' gutterBottom>
            {name}
          </Typography>
          <ButtonGroup
            variant='outlined'
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100px',
              height: '24px',
            }}
          >
            <IconButton
              variant='outlined'
              color='error'
              disabled={amount === 1}
              onClick={handleRemove}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              variant='standard'
              value={amount}
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton
              variant='outlined'
              color='primary'
              disabled={amount === 99}
              onClick={handleAdd}
            >
              <AddIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Tooltip title='Delete' sx={{ order: 999, marginLeft: 'auto' }}>
          <IconButton onClick={handleDeleteProduct}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '160px',
          marginTop: '10px',
        }}
      >
        <Typography variant='subtitle2'>{getCorrectedPrice(price)}</Typography>
        <Typography
          variant='caption'
          sx={{ textDecoration: 'line-through', color: '#e06666' }}
        >
          {getCorrectedPrice(retailPrice)}
        </Typography>
      </Box>
    </Box>
  );
};
