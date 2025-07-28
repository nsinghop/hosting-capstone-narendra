"use client";

import React, { useState, useEffect } from "react";
import "./Todo.css";
import Layout from '../components/Layout/Layout';

const statusOptions = ["Pending", "In Progress", "Completed"];

function TodoPageContent() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);
  const [employees, setEmployees] = useState([]);
  const [assigned, setAssigned] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    const storedEmps = localStorage.getItem("employees");
    if (storedEmps) setEmployees(JSON.parse(storedEmps));
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!title || !desc || !assigned) return;
    
    const newTask = {
      id: Date.now(),
      title,
      desc,
      status,
      assigned,
      createdAt: new Date().toISOString()
    };
    
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    
    setTitle("");
    setDesc("");
    setStatus(statusOptions[0]);
    setAssigned("");
    setIsFormVisible(false);
  };

  const deleteTask = (taskId) => {
    const updated = tasks.filter(task => task.id !== taskId);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updated = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#F59E0B';
      case 'In Progress': return '#3B82F6';
      case 'Completed': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="header-content">
          <h1>Task Management</h1>
          <p>Create and manage your team's tasks efficiently</p>
        </div>
        <button 
          className="add-task-button"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {isFormVisible ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {isFormVisible && (
        <div className="task-form-container">
          <form onSubmit={addTask} className="task-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                  id="status"
                  value={status} 
                  onChange={e => setStatus(e.target.value)}
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Describe the task details"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="assigned">Assign To</label>
              <select 
                id="assigned"
                value={assigned} 
                onChange={e => setAssigned(e.target.value)}
                required
              >
                <option value="">Select an employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"></path>
                  <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"></path>
                </svg>
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tasks-overview">
        <div className="tasks-header">
          <h2>All Tasks ({tasks.length})</h2>
          <div className="tasks-filters">
            <button className="filter-button active">All</button>
            <button className="filter-button">Pending</button>
            <button className="filter-button">In Progress</button>
            <button className="filter-button">Completed</button>
          </div>
        </div>

        <div className="tasks-grid">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4"></path>
                <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"></path>
                <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"></path>
              </svg>
              <h3>No tasks yet</h3>
              <p>Create your first task to get started</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-actions">
                    <select
                      className="status-select"
                      value={task.status}
                      onChange={e => updateTaskStatus(task.id, e.target.value)}
                      style={{ borderColor: getStatusColor(task.status) }}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <button 
                      className="delete-button"
                      onClick={() => deleteTask(task.id)}
                      title="Delete task"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="task-description">{task.desc}</p>
                
                <div className="task-footer">
                  <div className="task-assigned">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>{task.assigned}</span>
                  </div>
                  
                  <div className="task-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(task.status) + '20', color: getStatusColor(task.status) }}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function TodoPage() {
  return (
    <Layout>
      <TodoPageContent />
    </Layout>
  );
}
