import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import WorkingDirectory from "./views/WorkingDirectory";
import GestionResources from "./views/GestionResources";
import Passage1Vers2 from "./views/Passage1Vers2";
import StudentGradeReport from "./views/bulletin/StudentGradeReport";

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
        path: "/dashboard/filiere/:filiere/annee/:annee",
        element: <Dashboard />,
      },
      {
        path:"/dashboard/resources",
        element:<GestionResources/>
      },
      {
        path:"/dashboard/filieres/:filiere/passage-deuxieme-annee",
        element:<Passage1Vers2/>
      },
      {
        path:"/dashboard/bulletin",
        element:<StudentGradeReport/>
      }

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
