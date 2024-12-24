import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Calendar from "./pages/Calendar/Calendar";
import EventListing from "./pages/EventListing/EventListing";
import FAQ from "./pages/FAQ/FAQ";
import NotFound from "./pages/NotFound/NotFound";
import Results from "./pages/Results/Results";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Calendar />,
    errorElement: <NotFound />,
  },
  {
    path: "/event/:originalId",
    element: <EventListing />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
