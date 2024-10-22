import { categories } from "../model/categories";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from "@mui/material";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const drawerWidth = '100%';

type DrawerModuleProps = {
    open: boolean;
    handleDrawerClose: () => void;
}

export function DrawerModule({ open, handleDrawerClose }: DrawerModuleProps) {
	const theme = useTheme();

    return (
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <Typography variant="h5" align="left">
                    Категории
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {
                    categories.map((category) => (
                        <ListItem disablePadding key={category.name + category.value}>
                            <ListItemButton onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });		
                                // navigate(`/${category.name}`);
                                handleDrawerClose();
                            }}>
                                <ListItemIcon>
                                    {category.icon}
                                </ListItemIcon>
                                <ListItemText>{category.value}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    )
}