import { Outlet } from 'react-router-dom';
import { Header } from '../widgets/Header';

export const baseLayout = (
  <div className='app-lay'>
    <Header />
    <Outlet />
  </div>
);
