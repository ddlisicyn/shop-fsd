import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { ProductCard } from '../../../entities/product';
import { useGetAllProducts } from '../api/getAllProducts';
import { Spinner } from './Spinner';

export function ProductsList() {
  const { isLoading, data, isError, error } = useGetAllProducts();

  // if (isLoading) {
  //   return <Spinner />
  // }

  // if (!data) {
  //   return null;
  // }

  return (
    <Box sx={{ flexGrow: 1, p: 0 }}>
      <Grid container spacing={0.2}>
        {(isLoading ? Array.from(new Array(20)) : data)?.map((product, index) => (
            <ProductCard key={index} product={product}/>
        ))}
      </Grid>
    </Box>
  );
}