import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register";

import { createBrowserRouter } from "react-router-dom";
import UserRegister from "../components/Forms/User/Register";
import UsersList from "../components/List/User";
import TerapheuticContractsList from "../components/List/TerapheuticContract";
import Post from "../components/Forms/Blog/Post";
import PostsList from "../components/List/Blog";

import PageError404 from "../pages/Error404";
import { AuthGuard } from "./AuthGuard";
import EditRegister from "@/components/Forms/User/EditRegister";
import EditBlogPost from "@/components/Forms/Blog/Edit";

// import { EditTerapheuticContract } from "@/components/Forms/User/TerapheuticContract/Edit/EditTerapheuticContract";

const router = createBrowserRouter([
  {
    element: <AuthGuard isPrivate={false} />,
    children: [
      {
        path: "/",
        element: <Login />,
        errorElement: <PageError404 />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    element: <AuthGuard isPrivate={true} />,
    children: [
      {
        path: "dashboard",
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
                path: "patient/:userID",
                element: <EditRegister />,
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
              {
                path: "article/:postID",
                element: <EditBlogPost />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
