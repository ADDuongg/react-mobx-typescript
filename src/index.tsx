import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './component/error';
import DetailProduct from './pages/detailProduct';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Shop from './pages/shop';
import Login from './pages/login';
import Checkout from './pages/checkout';
import ProtedtedRoute from './protedtedRoute';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: '/product/:id',
    errorElement: <Error />,
    element: <DetailProduct />
  },
  {
    path: '/wishlist/',
    errorElement: <Error />,
    element: <Wishlist />
  },
  {
    path: '/cart/',
    errorElement: <Error />,
    element: <ProtedtedRoute><Cart /></ProtedtedRoute>
  },
  {
    path: '/shop',
    element: <Shop />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
    errorElement: <Error />,
  },
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
