import { Box, Typography, Tooltip, IconButton, ButtonGroup, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Product } from "../../../entities/product/model/product";
import { BASE_IMG_URL } from "../../../shared/config";
import { useCart } from "../../../shared/model/context/context";
import { useState } from "react";

export const ProductCard = ({ product }: { product: Product }) => {
	const { name, code, images, lynxColorCode, lynxName, price, retailPrice } = product;
	const cartProducts = useCart() || {};
	const [amount, setAmount] = useState(cartProducts[code] || 0);
	const handleDelete = () => {};
	const handleAdd = () => {};
	const handleRemove = () => {};

  return (
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
        <Typography variant='subtitle2' gutterBottom>
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: `${lynxColorCode}`,
            }}
          />
          <Typography sx={{ marginLeft: '5px' }}>{lynxName}</Typography>
        </Box>
      </Box>
      <Tooltip title='Delete' sx={{ order: 999, marginLeft: 'auto' }}>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <ButtonGroup
          variant='outlined'
          sx={{ display: 'flex', alignItems: 'center' }}
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
            variant='outlined'
            className='cart-item__amount-input'
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
        <Box>
          <Typography variant='subtitle2'>
            {(retailPrice * amount).toLocaleString('ru-RU')},00 ₽
          </Typography>
          <Typography
            variant='caption'
            sx={{ textDecoration: 'line-through', color: '#e06666' }}
          >
            {(price * amount).toLocaleString('ru-RU')},00 ₽
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
