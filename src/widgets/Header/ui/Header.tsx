import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchModul } from '../../../features/search';
import { AddToCartButton } from '../../../features/cart/addToCartButton';
import { DrawerModule } from '../../../features/drawer';

export function Header() {
	const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <SearchModul />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex' } }}>
            <AddToCartButton />
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerModule open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  );
}