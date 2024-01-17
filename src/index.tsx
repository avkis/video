import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./pages/errors/error-page";
import Contact from "./routes/contacts";
import Video from "./pages/video/Video";
import {loader as routerLoader} from "./loader";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: routerLoader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "video",
        element: <Video />,
      },
    ],  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
