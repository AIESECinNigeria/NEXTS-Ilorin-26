import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Registration from './Registration/Registration.jsx'
// File is Success.jsx — the import must match its case or the build fails on Linux hosts
import Success from './Registration/Success/Success.jsx'

// Example NotFound page
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

// Rendering to DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
