import { Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//@ts-ignore
import img from '../../../shared/ui/img/problem.png';

export function ErrorPage() {
  const navigate = useNavigate();

  const toPrevPage = () => navigate(-1);
  const toMainPage = () => navigate('/');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Ошибка</h1>
      <p>Что-то пошло не так!</p>
      <img style={{ width: '100%', maxWidth: '512px' }} src={img} />
      <Link onClick={toPrevPage}>Вернуться на прошлу страницу</Link>
      <Link onClick={toMainPage}>Вернуться на главную страницу</Link>
    </Box>
  );
}
