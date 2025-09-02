import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { OverlayProvider } from "./contexts/OverlayContext";
import { routes } from "./routes";
import { SocketProvider } from "./contexts/SocketContext";
import "../firebase.config";
import { UserProvider } from "./contexts/UserContext";
import { GetUserProvider } from "./contexts/GetUsersContext";
import { GetClassProvider } from "./contexts/GetClassesContext";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OverlayProvider>
      <UserProvider>
        <GetUserProvider>
          <GetClassProvider>
            <SocketProvider>
              <ToastContainer />
              <RouterProvider router={router} />
            </SocketProvider>
          </GetClassProvider>
        </GetUserProvider>
      </UserProvider>
    </OverlayProvider>
  </React.StrictMode>
);
