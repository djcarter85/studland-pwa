import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./layout";
import "./globals.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MapPage from "./map/page";
import WeatherPage from "./weather/page";
import TidesPage from "./tides/page";
import InfoPage from "./info/page";
import CalendarPage from "./calendar/page";

import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to="/weather" />,
      },
      {
        path: "/weather",
        element: <WeatherPage />,
      },
      {
        path: "/tides",
        element: <TidesPage />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/info",
        element: <InfoPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
