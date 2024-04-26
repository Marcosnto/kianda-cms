import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/home",
    element: <div>This is the Home</div>,
  },
]);

export default router;
