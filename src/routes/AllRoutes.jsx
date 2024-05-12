import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import NeedVolunteer from "../pages/NeedVolunteer";
import PublicRoutes from "./PublicRoutes";
import Login from "../pages/Login";
import Join from "../pages/Join";
import PrivateRoutes from "./PrivateRoutes";
import AddPost from "../pages/AddPost";
import PostDetails from "../pages/PostDetails";
import ManagePosts from "../pages/ManagePosts";
import MyRequest from "../pages/MyRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
      // {
      //   path: "/branches",
      //   element: <Branches />,
      // },
      // {
      //   path: "/contact",
      //   element: <Contact />,
      // },
      // {
      //   path: "/user-profile",
      //   element: (
      //     <PrivateRoutes>
      //       <UserProfile />
      //     </PrivateRoutes>
      //   ),
      // },
      {
        path: "/need-volunteer",
        element: <NeedVolunteer />,
      },

      {
        path: "/manage-posts",
        element: (
          <PrivateRoutes>
            <ManagePosts />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-requests",
        element: (
          <PrivateRoutes>
            <MyRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-volunteer-post",
        element: (
          <PrivateRoutes>
            <AddPost />
          </PrivateRoutes>
        ),
      },
      {
        path: "/post-details/:id",
        element: (
          <PrivateRoutes>
            <PostDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "/join",
        element: (
          <PublicRoutes>
            <Join />
          </PublicRoutes>
        ),
      },
    ],
  },
]);

export default router;
