import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register";
import { TbError404 } from "react-icons/tb";
import { createBrowserRouter } from "react-router-dom";
import UserRegister from "./components/Forms/User/Register";
import UsersList from "./components/List/User";
import TerapheuticContractsList from "./components/List/TerapheuticContract";
import Post from "./components/Forms/Blog/Post";
import PostsList from "./components/List/Blog";

// import { EditTerapheuticContract } from "@/components/Forms/User/TerapheuticContract/Edit/EditTerapheuticContract";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <TbError404 />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "psi",
        children: [
          {
            path: "user-register",
            element: <UserRegister />,
          },
          {
            path: "patients",
            element: <UsersList />,
          },
          {
            path: "terapheutic-contracts",
            element: <TerapheuticContractsList />,
          },
        ],
      },
      {
        path: "blog",
        children: [
          {
            path: "create-article",
            element: <Post />,
          },
          {
            path: "articles",
            element: <PostsList />,
          },
        ],
      },
    ],
  },
]);

export default router;
