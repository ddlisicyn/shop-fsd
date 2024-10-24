import Grid from '@mui/material/Grid2';
import { Product } from '../model/product';
import { Card, CardContent, CardMedia, Container, Box, 
	Typography, CardActions, Button, FormControl, 
	InputLabel, Select, MenuItem, Link  } from '@mui/material';
import { BASE_IMG_URL } from '../../../shared/config';

export function ProductCard({ product }: { product: Product }) {
    const { name, images, amwaySize, alias, code, price, retailPrice, lynxColorCode, lynxName, lynxPicture, variants } = product;
    const image = `${BASE_IMG_URL}/${images?.[2]?.url}`;

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
        >
            <Container disableGutters>
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <CardContent sx={{ width: '100%' }}>
                        <Link href={`/detail/${code}`} onClick={handleClickDetail}>
                            <CardMedia
                                component="img"
                                width="100%"
                                height="100%"
                                loading="lazy"
                                image={image}
                                alt={name}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Link>
                        <Container  sx={{ textAlign: 'center' }}>
                            <Link href={`/detail/${code}`} underline="none" color="black" onClick={handleClickDetail}>
                                <Typography 
                                    gutterBottom 
                                    variant="subtitle1" 
                                    component="div"
                                    sx={{ 
                                        wordWrap: 'normal',
                                        cursor: 'pointer',
                                        margin: 0,
                                        height: '56px',
                                        width: '100%',
                                        '-webkit-line-clamp': 2,
                                        display: '-webkit-box',
                                        '-webkit-box-orient': 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        lineHeight: 'normal',
                                    }}
                                >
                                {name}
                                </Typography>
                            </Link>
                            <Typography variant="subtitle1" mt={'5px'} fontWeight={'bold'}>
                                {price.toLocaleString('ru-RU')},00 ₽
                            </Typography>
                            <Typography variant="caption" sx={{ textDecoration: "line-through", color: "#e06666" }}>
                                {retailPrice.toLocaleString('ru-RU')},00 ₽
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
                    </CardContent>
                    <CardActions>
                        <Button size="medium" variant="contained" sx={{ marginBottom: '10px' }} onClick={handleClickAddProduct}>Добавить в корзину</Button>
                    </CardActions>
                </Card>
            </Container>
        </Grid>
    )
}