import { Outlet } from '@tanstack/react-router';

import Navbar from './components/Navbar/Navbar.tsx';

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
