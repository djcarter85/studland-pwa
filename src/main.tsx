import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./root";
import "./globals.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LocationsPage from "./pages/locations-page";
import WeatherPage from "./pages/weather-page";
import TidesPage from "./pages/tides-page";
import InfoPage from "./pages/info-page";
import CalendarPage from "./pages/calendar-page";

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
        path: "/locations",
        element: <LocationsPage />,
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
  </React.StrictMode>,
);
