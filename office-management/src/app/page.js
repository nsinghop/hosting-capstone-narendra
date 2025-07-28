"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./dashboard/Dashboard.css";
import Layout from './components/Layout/Layout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useAuthState } from "react-firebase-hooks/auth";
import { author } from "../../firebase/clientApp";
import './Styles/page/page.css';

function DashboardPageContent() {
  const [tasks, setTasks] = useState([]);
  const [statusCount, setStatusCount] = useState({});
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);
      setTasks(parsed);
      const count = { Pending: 0, "In Progress": 0, Completed: 0 };
      const upcomingTasks = [];
      parsed.forEach(t => {
        count[t.status]++;
        if (t.status !== "Completed") upcomingTasks.push(t);
      });
      setStatusCount(count);
      setUpcoming(upcomingTasks);
    }
  }, []);

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    const count = { Pending: 0, "In Progress": 0, Completed: 0 };
    const upcomingTasks = [];
    updatedTasks.forEach(t => {
      count[t.status]++;
      if (t.status !== "Completed") upcomingTasks.push(t);
    });
    setStatusCount(count);
    setUpcoming(upcomingTasks);
  };

  const chartData = [
    { name: 'Pending', value: statusCount.Pending || 0 },
    { name: 'In Progress', value: statusCount["In Progress"] || 0 },
    { name: 'Completed', value: statusCount.Completed || 0 }
  ];
  const COLORS = ['#F59E0B', '#3B82F6', '#10B981'];

  return (
    <div className="dashboard-container home-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Task Dashboard</h1>
        <p className="dashboard-subtitle">Monitor and manage your team&apos;s progress</p>
      </div>
      
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon pending">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p className="stat-number">{statusCount.Pending || 0}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon progress">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
              <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
              <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
              <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <p className="stat-number">{statusCount["In Progress"] || 0}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon completed">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22,4 12,14.01 9,11.01"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p className="stat-number">{statusCount.Completed || 0}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-graphs">
        <div className="dashboard-graph">
          <div className="graph-header">
            <h3>Task Status Overview</h3>
            <p>Visual representation of task distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" tick={{fontWeight: 600, fontSize: 14}} />
              <YAxis allowDecimals={false} tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="value" radius={[8,8,0,0]} barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-tasks">
        <div className="tasks-section">
          <div className="section-header">
            <h3>Active Tasks</h3>
            <p>Tasks that need attention</p>
          </div>
          <div className="tasks-grid">
            {upcoming.length === 0 ? (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"></path>
                  <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"></path>
                </svg>
                <p>No active tasks at the moment</p>
                <span>All caught up! 🎉</span>
              </div>
            ) : (
              upcoming.map(task => (
                <div key={task.id} className={`task-card status-${task.status.replace(/\s/g, '').toLowerCase()}`}> 
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    <span className={`status-badge ${task.status.replace(/\s/g, '').toLowerCase()}`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="task-desc">{task.desc}</p>
                  <div className="task-footer">
                    <span className="assigned-to">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      {task.assigned}
                    </span>
                    <select
                      className="status-select"
                      value={task.status}
                      onChange={e => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="tasks-section">
          <div className="section-header">
            <h3>Completed Tasks</h3>
            <p>Successfully finished tasks</p>
          </div>
          <div className="tasks-grid">
            {tasks.filter(t => t.status === "Completed").length === 0 ? (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"></path>
                  <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"></path>
                </svg>
                <p>No completed tasks yet</p>
                <span>Start working on tasks to see them here</span>
              </div>
            ) : (
              tasks.filter(t => t.status === "Completed").map(task => (
                <div key={task.id} className="task-card status-completed">
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    <span className="status-badge completed">
                      {task.status}
                    </span>
                  </div>
                  <p className="task-desc">{task.desc}</p>
                  <div className="task-footer">
                    <span className="assigned-to">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      {task.assigned}
                    </span>
                    <select
                      className="status-select"
                      value={task.status}
                      onChange={e => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [user, loading, error] = useAuthState(author);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <h3>Something went wrong</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {user ? (
        <Layout>
          <DashboardPageContent />
        </Layout>
      ) : (
        <div className="auth-container">
          <div className="welcome-card">
            <div className="welcome-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="m22 21-2-2"></path>
                <path d="M16 16h6"></path>
              </svg>
            </div>
            <h2>Welcome to LeadLoop</h2>
            <p className="welcome-text">
              Please sign in to access your office dashboard and manage your team&apos;s tasks efficiently.
            </p>
            <Link className="login-button" href="/auth">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10,17 15,12 10,7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

