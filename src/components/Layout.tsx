
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-all duration-700">
      <TopNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
