import { ReactElement } from 'react';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import HouseIcon from '@mui/icons-material/House';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CleanHandsIcon from '@mui/icons-material/CleanHands';

type category = {
    name: string;
    value: string;
    icon: ReactElement;
}

export const categories: category[] = [
    { name: 'all', value: 'Весь каталог', icon: <ImportContactsIcon /> },
	{ name: 'home', value: 'Дом', icon: <HouseIcon /> },
	{ name: 'beauty', value: 'Красота', icon: <AutoFixHighIcon />},
	{ name: 'health', value: 'Здоровье', icon: <FavoriteBorderIcon /> },
	{ name: 'body-care', value: 'Уход за телом', icon: <CleanHandsIcon /> }
];