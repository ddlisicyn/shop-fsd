import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainPage } from '../pages/main'
import { ErrorPage } from '../pages/error'
import { baseLayout } from './baseLayout'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function router() {
  return createBrowserRouter([
    {
      element: baseLayout,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        }
      ]
    }
  ])
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router()} />
  </StrictMode>,
)