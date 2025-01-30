import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByName } from '../api/getProductsByName';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { Product } from '../../../entities/product/model/product';
import { useQuery } from '@tanstack/react-query';

const style = {
  p: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  position: 'absolute',
  marginTop: '10px',
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export function SearchModul() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (searchValue !== '' && searchValue.length >= 2) {
      getProductsByName(searchValue);
    }
  };

  const { data } = useQuery({
    queryKey: ['products', searchValue],
    queryFn: () => getProductsByName(searchValue),
  });

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Поиска товара'
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={searchValue}
      />
      <List sx={style} aria-label='mailbox folders'>
        {data?.map((product) => (
          <>
            <ListItem>
              <ListItemText primary={product.name} />
            </ListItem>
            <Divider component='li' />
          </>
        ))}
      </List>
    </Search>
  );
}
