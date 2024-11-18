import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { ProductCard } from '../../../entities/product';
import { Product } from '../../../entities/product/model/product';

export function ProductsList({
  isLoading,
  products,
}: {
  isLoading: boolean;
  products: Product[];
}) {
  return (
    <Box sx={{ flexGrow: 1, p: 0 }}>
      <Grid container spacing={0.2}>
        {(isLoading ? Array.from(new Array(20)) : products)?.map(
          (product, index) => <ProductCard key={index} product={product} />,
        )}
      </Grid>
    </Box>
  );
}
