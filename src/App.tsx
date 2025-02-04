import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="header-spacer" />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
