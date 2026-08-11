import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-chalk font-body">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
