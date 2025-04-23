import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Francais from "./views/Francais";
import WorkingDirectory from "./views/WorkingDirectory";

const router = createBrowserRouter([
  // DefaultLayout
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path:"/working-directory",
        element: <WorkingDirectory/>
      },
      {
        // path: "/dashboard/:annee",
        path: "/dashboard/filiere/:filiere/annee/:annee",
        element: <Dashboard />,
      },
      
      {
        path: "/dashboard/francais",
        element: <Francais />,
      },
    ],
  },
  
  // GuestLayout
  {
    path: "/auth",
    element: <GuestLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      
    ],
  },
  
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
