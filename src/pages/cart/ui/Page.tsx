import { Container, Box, Typography, Stack, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getProductsByIds } from '../api/getProductsByIds';
import { useCart } from '../../../shared/model/context/context';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ProductCard } from './ProductCard';
import { useMemo, useCallback } from 'react';
import { EXPENSES, EXCHANGE_RATE } from '../../../shared/config';

export function CartPage() {
  const cartProducts = useCart() || {};
  const ids = Object.keys(cartProducts || {});
  const { isLoading, data, error } = useQuery({
    queryKey: ['cart', ...ids],
    queryFn: () => getProductsByIds(ids),
    placeholderData: keepPreviousData,
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

  console.log(data);

  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: '10px',
      }}
    >
      <Button
        variant='text'
        startIcon={<ArrowBackIosIcon />}
        onClick={() => history.back()}
      >
        Вернуться назад
      </Button>
      {data?.length ? (
        <>
          <Stack spacing={1} width='100%' mt='15px'>
            {data.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
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
            <Typography variant='h6'>
              {getCorrectedPrice(totalPrice)}
            </Typography>
            {/* <OrderForm /> */}
          </Box>
        </>
      ) : (
        <Typography variant='h5'>Корзина пока пустая</Typography>
      )}
    </Container>
  );
}
