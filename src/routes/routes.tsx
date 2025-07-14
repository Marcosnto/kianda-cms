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
import EditRegister from "@/components/Forms/User/EditRegister/Admin";
import EditBlogPost from "@/components/Forms/Blog/Edit";
import TerapheuticContract from "@/components/Forms/User/TerapheuticContract";
import UserEditRegister from "@/components/Forms/User/EditRegister/Patient";
import Schedule from "@/ui/Schedule";
import DefaultDashboardComponent from "@/pages/Dashboard/components/DefaultDashboardComponent";
import NewsLetterList from "@/components/List/NewsLetter";
import NewsLetter from "@/components/Forms/NewsLetter";

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
        path: "/login",
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
            path: "",
            element: <DefaultDashboardComponent />,
          },
          {
            path: "psi",
            children: [
              {
                path: "users-list/:type",
                element: <UsersList />,
              },
              {
                path: "users-list/patient/:userID",
                element: <EditRegister />,
              },
              {
                path: "edit-register",
                element: <UserEditRegister />,
              },
              {
                path: "terapheutic-contracts",
                element: <TerapheuticContractsList />,
              },
              {
                path: "terapheutic-contracts/:contractID",
                element: <TerapheuticContract />,
              },
              {
                path: "schedule",
                element: <Schedule />,
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
                path: "article/:articleID",
                element: <EditBlogPost />,
              },
            ],
          },
          {
            path: "admin",
            children: [
              {
                path: "user-register",
                element: <UserRegister />,
              },
              {
                path: "users-list/:type",
                element: <UsersList />,
              },
              {
                path: "users-list/all/:userID",
                element: <EditRegister />,
              },
              {
                path: "users-list/blog_editor/:userID",
                element: <EditRegister />,
              },
              {
                path: "newsletter",
                element: <NewsLetterList />,
              },
              {
                path: "write-newsletter-email",
                element: <NewsLetter />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
