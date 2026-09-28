import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Registration from './Registration/Registration.jsx'
// Import paths must match the file names' capitals exactly: Vercel builds on Linux, which is case-sensitive
import Success from './Registration/Success/Success.jsx'
import BackgroundMusic from './components/BackgroundMusic.jsx'

const NotFound = () => <h1>Page Not Found</h1>

// Site map:
//   /                 intro screens (App.jsx)
//   /registration/*   the 4-page form (Registration.jsx has its own step-one … step-four routes)
//   /success          confirmation page after submitting
// vercel.json sends every URL to index.html so these routes also work on refresh.
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
    {/* Sits outside the router so the song keeps playing across page changes.
        It's given the router only to know when the visitor reaches /success. */}
    <BackgroundMusic router={router} />
  </React.StrictMode>
)
