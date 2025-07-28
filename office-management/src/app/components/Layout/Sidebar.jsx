"use client"

import React from 'react';
import Link from 'next/link';
import '../../styles/components/sidebar.css';
import { Building } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <Building className="logo-icon" />
          <h1 className="logo">LeadLoop</h1>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Main</h3>
          <ul className="nav-menu">
            <li className="nav-item active">
              <Link href="/" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link href="/todo" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span>Tasks</span>
                <span className="nav-badge">12</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h3 className="nav-section-title">Management</h3>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link href="/employee" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Employees</span>
                <span className="nav-badge">8</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link href="/messages" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Messages</span>
                <span className="nav-badge new">5</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile-mini">
          <div className="mini-avatar">U</div>
          <div className="mini-user-info">
            <div className="mini-user-name">User</div>
            <div className="mini-user-role">Employee</div>
          </div>
        </div>
        
        <Link href="/logout" className="logout-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;