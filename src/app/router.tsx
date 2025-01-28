import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../pages/main';
import { ErrorPage } from '../pages/error';
import { baseLayout } from './baseLayout';
import { DetailPage } from '../pages/detail';
import { CartPage } from '../pages/cart';

export function router() {
  return createBrowserRouter([
    {
      element: baseLayout,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/detail/:id',
          element: <DetailPage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
      ],
    },
  ]);
}
