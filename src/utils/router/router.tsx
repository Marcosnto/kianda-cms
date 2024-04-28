import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { TbError404 } from "react-icons/tb";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <TbError404 />,
  },
  {
    path: "/register",
    element: <div>This is the register page</div>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
