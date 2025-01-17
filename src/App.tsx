import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="header-spacer" />
      <Outlet />
    </>
  );
}

export default App;
