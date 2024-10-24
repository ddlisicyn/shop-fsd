import Grid from '@mui/material/Grid2';
import { CardMedia, Container, Box, 
	Typography, CardActions, Button, FormControl, 
	InputLabel, Select, MenuItem, Link  } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Product } from '../model/product';
import { BASE_IMG_URL } from '../../../shared/config';
import { CardStyleChanged, CardContentStyleChanged, NameTypography } from './styledComponents';

export function ProductCard({ product }: { product: Product }) {
    const handleClickDetail = () => {

    }

    const handleClickAddProduct = () => {

    }

    console.log(product);
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
                <CardStyleChanged sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <CardContentStyleChanged sx={{ width: '100%' }}>
                        <Link href={`/detail/${product?.code}`} onClick={handleClickDetail}>
                            {product ? (
                            <CardMedia
                                component="img"
                                width="100%"
                                height="100%"
                                loading="lazy"
                                image={`${BASE_IMG_URL}/${product.images?.[2]?.url}`}
                                alt={product.name}
                                sx={{ cursor: 'pointer' }}
                            />
                            ) : (
                                <Skeleton variant="rectangular" width={212} height={212}/>
                            )}
                        </Link>
                        <Container  sx={{ textAlign: 'center' }}>
                            <Link href={`/detail/${product?.code}`} underline="none" color="black" onClick={handleClickDetail}>
                                    <NameTypography 
                                        gutterBottom 
                                        variant="subtitle1"
                                    >
                                        {product ? product.name : (
                                            <>
                                                <Skeleton />
                                                <Skeleton />
                                            </>
                                        )}
                                    </NameTypography>
                            </Link>
                            <Typography variant="subtitle1" mt={'5px'} fontWeight={'bold'}>
                                {product ? `${product.price.toLocaleString('ru-RU')},00 ₽` : <Skeleton />}
                            </Typography>
                            <Typography variant="caption" sx={{ textDecoration: "line-through", color: "#e06666" }}>
                                {product ? `${product.retailPrice.toLocaleString('ru-RU')},00 ₽` : <Skeleton />}
                            </Typography>
                        </Container>
                        {
                        // colors && Object.keys(colors).length ? 
                        // <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 120, marginTop: '5px' }}>
                        //     <FormControl>
                        //         <InputLabel>Цвет</InputLabel>
                        //         <Select
                        //             className="thumbnail-card__color-select"
                        //             value={colorId}
                        //             label="Цвет"
                        //             onChange={handleChange}
                        //         >
                        //             {
                        //                 colors.map((color) => (
                        //                     <MenuItem key={color.id} value={color.id}>
                        //                         <Box sx={{ width: '20px', height: '20px', backgroundColor: `${color.colorHex}` }} />
                        //                         <Typography sx={{ marginLeft: '5px' }}>{color.colorName}</Typography>
                        //                     </MenuItem>
                        //                 ))
                        //             }
                        //         </Select>
                        //     </FormControl>
                        // </Box> :
                        // <Box sx={{ height: '45px' }}/>
                        }
                    </CardContentStyleChanged>
                    <CardActions>
                        <Button size="medium" variant="contained" sx={{ marginBottom: '10px' }} onClick={handleClickAddProduct}>Добавить в корзину</Button>
                    </CardActions>
                </CardStyleChanged>
            </Container>
        </Grid>
    )
}