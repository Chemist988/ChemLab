
import React from 'react';
import TopNav from './TopNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/50 transition-all duration-700">
      <TopNav />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
