import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackendStatusBanner from './BackendStatusBanner';

const Layout = ({ children }) => {
  return (
    <div className="bg-background font-body-lg text-body-lg text-on-surface antialiased min-h-screen flex flex-col">
      <BackendStatusBanner />
      <Navbar />
      <main className="w-full pt-24 bg-background flex-grow">
        <div className="flex flex-col w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;