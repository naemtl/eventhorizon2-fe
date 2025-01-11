import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Calendar from "./pages/Calendar/Calendar";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Results from "./pages/Results/Results";

import "./utils/i18n";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Calendar />,
    errorElement: <NotFound />,
  },
  {
    path: "/about",
    element: <About />,
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
