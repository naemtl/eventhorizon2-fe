import { createRootRoute } from "@tanstack/react-router";

import App from "src/App";
import NotFound from "src/pages/NotFound/NotFound";

export const Route = createRootRoute({
  component: App,
  notFoundComponent: NotFound,
});
