import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import Root from './pages/Root'
import Register from './pages/Register'

  const router = createBrowserRouter([{
    path: '/',
    errorElement: <ErrorPage/>,
    element: <Root/>,
    children: [{
      path: '/Hogin',
      element: <Login/>
    },{
      path: '/Home',
      element: <Home/>
    },{
      path: 'Register',
      element: <Register/>
    }]
  }])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
