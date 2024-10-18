import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import Root from './pages/Root'
import Register from './pages/Register'
import './styles.scss'
import ContextProvider from './context/ContextProvider'

  const router = createBrowserRouter([{
    path: '/',
    errorElement: <ErrorPage/>,
    element: <Root/>,
    children: [{
      path: '/Login',
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
  <ContextProvider>
    <RouterProvider router={router}/>
  </ContextProvider>
)
