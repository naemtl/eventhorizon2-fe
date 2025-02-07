import { createRootRoute } from "@tanstack/react-router";

import App from "src/App.tsx";
import NotFound from "src/pages/NotFound/NotFound.tsx";

export const Route = createRootRoute({
  component: App,
  notFoundComponent: NotFound,
});
