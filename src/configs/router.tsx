import { createBrowserRouter } from "react-router-dom";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error404 />,
  },
  {
    path: "/register",
    element: <div>This is the register page</div>,
  },
  {
    path: "/dashboard",
    element: <div>Sou um dashboard</div>,
  },
]);

export default router;
