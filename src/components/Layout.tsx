
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

const Layout = () => {
  return (
    <div className="min-h-screen animated-gradient-bg transition-all duration-700">
      <TopNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
