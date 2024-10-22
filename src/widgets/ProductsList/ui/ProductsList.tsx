import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { ProductCard } from '../../../entities/product';

export function ProductsList() {
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
        {[...Array(20)].map((_, index) => (
            <ProductCard key={index} />
        ))}
      </Grid>
    </Box>
  );
}