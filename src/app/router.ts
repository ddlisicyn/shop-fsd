import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '../pages/main'
import { ErrorPage } from '../pages/error'
import { baseLayout } from './baseLayout'

export function router() {
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