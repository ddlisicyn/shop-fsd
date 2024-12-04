import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/getProductById';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Skeleton,
  SelectChangeEvent
} from '@mui/material';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { BASE_IMG_URL } from '../../../shared/config';
import { breakPoints } from '../../../shared/ui/breakpoints';
//@ts-ignore
import fallbackImg from '../../../shared/ui/img/fallbackImg.png';
import { EXCHANGE_RATE, EXPENSES } from '../../../shared/config';
import './index.css';

const { xs, sm, md, lg } = breakPoints;
export function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    placeholderData: keepPreviousData
  });
  const [xsImg, lgImg, mdImg, smImg] = 
    data?.images?.map((image) => `${BASE_IMG_URL}\\${image.url}`) ||
    new Array(4).fill('');
  const [image, setImage] = useState(fallbackImg);
  const srcSet = useMemo(
    () =>
      `${xsImg} ${xs * devicePixelRatio}w, ${smImg} ${sm * devicePixelRatio}w, ${mdImg} ${md * devicePixelRatio}w, ${lgImg} ${lg * devicePixelRatio}w`,
    [data],
  );
  const getCorrectedPrice = useCallback(
    (price: number): string =>
      Math.ceil((price * EXPENSES) / EXCHANGE_RATE).toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }),
    [],
  );

  useEffect(() => {
    setImage(mdImg);
  }, [data]);

  const handleImageError = () => {
    setImage(fallbackImg);
  };

  const handleClickAddProduct = () => {};

  // const handleOpen = () => setAlert(true);

  // const handleClose = () => setAlert(false);

  const handleChange = (event: SelectChangeEvent) => {
    const code = data?.variants?.filter(variant => variant.lynxColorCode === event.target.value)[0].code;
    navigate(`/detail/${code}`);
  };

  // if (isLoading) {
  //   return
  // }

  return (
    <Container disableGutters>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          background: '#fff',
          minHeight: '100vh',
        }}
      >
        <img
          src={image}
          alt={data?.name}
          className='main-card__img'
          onError={handleImageError}
        ></img>
        <Typography
          gutterBottom
          variant='h6'
          component='div'
          sx={{ wordWrap: 'break-word', lineHieght: '1.25', marginTop: '25px' }}
        >
          {data?.name}
        </Typography>
        <Typography variant="button" mt="25px" >
					{data ? getCorrectedPrice(data.price) : <Skeleton />}
				</Typography>
				<Typography variant="overline" sx={{ textDecoration: "line-through", color: "#e06666", }}>
					{data ? getCorrectedPrice(data.retailPrice) : <Skeleton />}
				</Typography>
				<Typography >
					Вес/объем: {data?.amwaySize || ''}
				</Typography>
				{
					data && data.variants && data.variants.length ? 
					<Box sx={{ minWidth: 120, marginTop: '30px' }}>
						<FormControl>
							<InputLabel>Цвет</InputLabel>
							<Select
                className="product-card__color-select"
                value={data.variants.filter(variant => variant.code === id)[0].lynxColorCode}
                label="Цвет"
                onChange={handleChange}
                autoWidth
							>
								{
									data.variants.map((variant) => (
										<MenuItem key={variant.code} value={variant.lynxColorCode} >
											<Box sx={{ width: '20px', height: '20px', backgroundColor: `${variant.lynxColorCode}` }}/>
											<Typography sx={{ marginLeft: '5px' }}>{variant.lynxName}</Typography>
										</MenuItem>
									))
								}
							</Select>
						</FormControl>
					</Box> :
					<></>
				}
        <Button
          size='medium'
          variant='contained'
          sx={{ marginTop: '35px' }}
          onClick={handleClickAddProduct}
        >
          Добавить в корзину
        </Button>
        {/* <Typography
          variant='h6'
          component='div'
          mt='50px'
          sx={{ wordWrap: 'break-word', textAlign: 'left' }}
        >
          Описание
        </Typography>
        {
					description.length ? 
					<Typography variant="body1" component="div" mb="20px" sx={{ wordWrap: 'break-word', textAlign: 'left' }} >
						{formatted}
					</Typography> :
					<>У продукта пока нет описания</>
				} */}
      </Container>
    </Container>
  );
}
