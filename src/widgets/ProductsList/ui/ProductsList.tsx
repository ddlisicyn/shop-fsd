import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { ProductCard } from '../../../entities/product';
import { useGetAllProducts } from '../api/getAllProducts';

export function ProductsList() {
  const { isLoading, data, isError, error } = useGetAllProducts();

  if (!data) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 0 }}>
      <Grid
        container
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        {data?.map((product, index) => (
            <ProductCard key={index} product={product}/>
        ))}
      </Grid>
    </Box>
  );
}