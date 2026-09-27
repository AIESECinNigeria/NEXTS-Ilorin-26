import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import Registration from './Registration/Registration.jsx'
import FirstPage from './Registration/FirstPage/FirstPage.jsx'
import SecondPage from './Registration/SecondPage/SecondPage.jsx'
import ThirdPage from './Registration/ThirdPage/ThirdPage.jsx'
import FourthPage from './Registration/FourthPage/FourthPage.jsx'
//import Success from './Registration/Success/Success.jsx'

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