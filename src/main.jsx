import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AllRoutes";
import AuthProvider from "./providers/AuthProvider";
import DataProvider from "./providers/DataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <DataProvider>
          <RouterProvider router={router}></RouterProvider>
        </DataProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
