import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Registration from './Registration/Registration.jsx'

import Success from './Registration/Success/Success.jsx'


const NotFound = () => <h1>Page Not Found</h1>

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/registration/*',
    element: <Registration />
  },
  {
    path: '/success',
    element: <Success />,
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
