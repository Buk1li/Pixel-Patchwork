import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './assets/styles/styles.css'
import App from './App.jsx';
import Home from './pages/Home';
import Canvas from '../src/components/canvas/canvas.jsx'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/canvas',
        element: <Canvas />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
