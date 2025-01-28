import { Container, Box, Typography, Stack } from '@mui/material';
import { getProductsByIds } from '../api/getProductsByIds';
import { useCart } from '../../../shared/model/context/context';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from './ProductCard';
import { useMemo, useCallback } from 'react';
import { EXPENSES, EXCHANGE_RATE } from '../../../shared/config';

export function CartPage() {
  const cartProducts = useCart() || {};
  const ids = Object.keys(cartProducts || {});
  const { isLoading, data, error } = useQuery({
    queryKey: ['cart', ...ids],
    queryFn: () => getProductsByIds(ids),
  });
  const totalPrice = useMemo(
    () =>
      Object.entries(cartProducts)
        .map(
          ([code, amount]) =>
            amount *
            (data?.filter((item) => item.code === code)?.[0]?.price || 0),
        )
        .reduce((acc, item) => acc + item, 0),
    [cartProducts, data],
  );
  const getCorrectedPrice = useCallback(
    (price: number): string =>
      Math.ceil((price * EXPENSES) / EXCHANGE_RATE).toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }),
    [totalPrice],
  );

  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <Stack spacing={1}>
        {data
          ? data.map((product) => <ProductCard product={product} />)
          : 'Корзина пуста'}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '10px',
        }}
      >
        <Typography variant='h6'>Итого:</Typography>
        <Typography variant='h6'>{getCorrectedPrice(totalPrice)}</Typography>
      </Box>
      {/* <OrderForm /> */}
    </Container>
  );
}
