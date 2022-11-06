import { createBrowserRouter } from "react-router-dom";
import Main from "../component/layout/Main";
import Blog from "../pages/Blog";
import Checkout from "../pages/Checkout";
import CourseDetails from "../pages/CourseDetails";
import Courses from "../pages/Courses";
import Error from "../pages/Error";
import Faq from "../pages/Faq";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />, 
        },
        {
            path:"/faq",
            element:<Faq />
        },
        {
            path:"/blog",
            element:<Blog />
        },
        {
            path:"/courses",
            element:<Courses />,
        },
        {
            path:"/course/:id",
            element:<CourseDetails />,
            loader:async({params}) => fetch(`${process.env.REACT_APP_API_URL}/product/${params.id}`),
            errorElement:<Error />
        },
        {
            path:"/course/checkout",
            element:<PrivateRoute><Checkout /></PrivateRoute>,
            errorElement:<Error />
            
        },
        {
            path:"/register",
            element:<PublicRoute><Register /></PublicRoute>
        },
        {
            path:"/login",
            element:<PublicRoute><Login /></PublicRoute>
        },
        {
            path: '*',
            element: <NotFound />
        }
      ],
    },
    {
      path: '*',
      element: <NotFound />
  }
  ]);