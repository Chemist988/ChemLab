
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-black dark:to-slate-800 transition-all duration-700">
      <TopNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
