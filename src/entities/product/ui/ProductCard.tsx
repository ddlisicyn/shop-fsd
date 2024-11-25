import Grid from '@mui/material/Grid2';
import {
  CardMedia,
  Container,
  Typography,
  CardActions,
  Button,
  Link,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Product } from '../model/product';
import { BASE_IMG_URL } from '../../../shared/config';
import {
  CardStyleChanged,
  CardContentStyleChanged,
  NameTypography,
} from './styledComponents';
import { MouseEvent, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import fallbackImg from '../../../shared/ui/img/fallbackImg.png';
import { breakPoints } from '../../../shared/ui/breakpoints';
import { EXCHANGE_RATE, EXPENSES } from '../../../shared/config';
const { xs, sm, md, lg } = breakPoints;

export function ProductCard({
  product,
  devicePixelRatio,
}: {
  product: Product;
  devicePixelRatio: number;
}) {
  const navigate = useNavigate();
  const variants = product?.variants;
  const images = variants?.length
    ? variants?.[0].lynxPicture?.renditions
    : product?.images;
  const [xsImg, lgImg, mdImg, smImg] =
    images?.map((image) => `${BASE_IMG_URL}\\${image.url}`) ||
    new Array(4).fill('');
  const [image, setImage] = useState(lgImg);
  const srcSet = useMemo(
    () =>
      `${xsImg} ${xs * devicePixelRatio}w, ${smImg} ${sm * devicePixelRatio}w, ${mdImg} ${md * devicePixelRatio}w, ${lgImg} ${lg * devicePixelRatio}w`,
    [product],
  );
  const getCorrectedPrice = useCallback(
    (price: number): string =>
      Math.ceil((price * EXPENSES) / EXCHANGE_RATE).toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }),
    [],
  );

  const handleClickDetail = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(`/detail/${product.code}`);
  };

  const handleClickAddProduct = () => {};

  const handleImageError = () => {
    setImage(fallbackImg);
  };

  return (
    <Grid
      minHeight={300}
      size={{
        xs: 6,
        sm: 6,
        md: 4,
        lg: 3,
      }}
      spacing={0.2}
    >
      <Container disableGutters>
        <CardStyleChanged
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardContentStyleChanged sx={{ width: '100%' }}>
            <Link href={`/detail/${product?.code}`} onClick={handleClickDetail}>
              {product ? (
                <CardMedia
                  component='img'
                  width='100%'
                  height='100%'
                  loading='lazy'
                  image={image}
                  onError={handleImageError}
                  srcSet={srcSet}
                  alt={product.name}
                  sx={{ cursor: 'pointer' }}
                />
              ) : (
                <Skeleton variant='rectangular' width={212} height={212} />
              )}
            </Link>
            <Container sx={{ textAlign: 'center' }}>
              <Link
                href={`/detail/${product?.code}`}
                underline='none'
                color='black'
                onClick={handleClickDetail}
              >
                <NameTypography gutterBottom variant='subtitle1'>
                  {product ? (
                    product.name
                  ) : (
                    <>
                      <Skeleton />
                      <Skeleton />
                    </>
                  )}
                </NameTypography>
              </Link>
              <Typography variant='subtitle1' mt={'5px'} fontWeight='bold'>
                {product ? getCorrectedPrice(product.price) : <Skeleton />}
              </Typography>
              <Typography
                variant='caption'
                sx={{ textDecoration: 'line-through', color: '#e06666' }}
              >
                {product ? (
                  getCorrectedPrice(product.retailPrice)
                ) : (
                  <Skeleton />
                )}
              </Typography>
            </Container>
            <Container sx={{ height: '20px' }}>
              {variants?.length && variants.length - 1 > 0 ? (
                <Typography variant='caption' fontWeight='bold'>
                  Ещё {variants.length - 1} Цвета(-ов)
                </Typography>
              ) : null}
            </Container>
          </CardContentStyleChanged>
          <CardActions sx={{ flex: 'display', justifyContent: 'center' ,width: '100%' }}>
            <Button
              size='medium'
              variant='contained'
              sx={{ width: '80%',marginBottom: '10px' }}
              onClick={handleClickAddProduct}
            >
              Добавить
            </Button>
          </CardActions>
        </CardStyleChanged>
      </Container>
    </Grid>
  );
}
