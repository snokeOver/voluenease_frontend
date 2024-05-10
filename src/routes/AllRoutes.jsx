import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import NeedVolunteer from "../pages/NeedVolunteer";
import PublicRoutes from "./PublicRoutes";
import Login from "../pages/Login";
import Join from "../pages/Join";

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
      // {
      //   path: "/spots-by-country/:country",
      //   element: <SpotsByCountry />,
      // },
      // {
      //   path: "/my-list",
      //   element: (
      //     <PrivateRoutes>
      //       <MyList />
      //     </PrivateRoutes>
      //   ),
      // },
      // {
      //   path: "/add-spot",
      //   element: (
      //     <PrivateRoutes>
      //       <AddSpot />
      //     </PrivateRoutes>
      //   ),
      // },
      // {
      //   path: "/spot-details/:id",
      //   element: (
      //     <PrivateRoutes>
      //       <SpotDetails />
      //     </PrivateRoutes>
      //   ),
      // },
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
