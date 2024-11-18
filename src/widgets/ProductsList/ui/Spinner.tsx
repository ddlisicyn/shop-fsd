import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Spinner({ size }: { size: string }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={size} />
    </Box>
  );
}
