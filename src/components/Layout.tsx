
import React from 'react';
import TopNav from './TopNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen animated-gradient-bg transition-all duration-700">
      <TopNav />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
