"use client";

import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Layout from '../components/Layout/Layout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

  const chartData = [
    { name: 'Pending', value: statusCount.Pending || 0 },
    { name: 'In Progress', value: statusCount["In Progress"] || 0 },
    { name: 'Completed', value: statusCount.Completed || 0 }
  ];
  const COLORS = ['#FFB347', '#6495ED', '#90EE90'];

  return (
    <div className="dashboard-container">
      <h2>Task Dashboard</h2>
      <div className="dashboard-graphs">
        <div className="dashboard-graph">
          <h4>Task Status Overview</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="dashboard-tasks">
        <h3>Upcoming & Pending Tasks</h3>
        <ul className="dashboard-list">
          {upcoming.length === 0 ? (
            <li>No upcoming or pending tasks.</li>
          ) : (
            upcoming.map(task => (
              <li key={task.id} className={`task-item status-${task.status.replace(/\s/g, '').toLowerCase()}`}>
                <div className="task-title">{task.title}</div>
                <div className="task-desc">{task.desc}</div>
                <div className="task-meta">
                  <span>Status: <strong>{task.status}</strong></span>
                  <span>Assigned: <em>{task.assigned}</em></span>
                </div>
              </li>
            ))
          )}
        </ul>
        <h3>Completed Tasks</h3>
        <ul className="dashboard-list">
          {tasks.filter(t => t.status === "Completed").length === 0 ? (
            <li>No completed tasks.</li>
          ) : (
            tasks.filter(t => t.status === "Completed").map(task => (
              <li key={task.id} className="task-item status-completed">
                <div className="task-title">{task.title}</div>
                <div className="task-desc">{task.desc}</div>
                <div className="task-meta">
                  <span>Status: <strong>{task.status}</strong></span>
                  <span>Assigned: <em>{task.assigned}</em></span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Layout>
      <DashboardPageContent />
    </Layout>
  );
}
