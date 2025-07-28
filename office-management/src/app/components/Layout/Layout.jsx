"use client"

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import '../../styles/components/layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
