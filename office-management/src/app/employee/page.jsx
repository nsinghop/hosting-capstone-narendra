"use client";
import React, { useState, useEffect } from "react";
import "./Employee.css";
import Layout from '../components/Layout/Layout';

function EmployeePageContent() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) setEmployees(JSON.parse(stored));
  }, []);

  const addEmployee = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    
    const newEmp = { 
      id: Date.now(), 
      name, 
      email, 
      department: department || 'General',
      joinedDate: new Date().toISOString(),
      status: 'Active'
    };
    
    const updated = [...employees, newEmp];
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
    
    setName("");
    setEmail("");
    setDepartment("");
    setIsFormVisible(false);
  };

  const deleteEmployee = (empId) => {
    const updated = employees.filter(emp => emp.id !== empId);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDepartmentColor = (dept) => {
    const colors = {
      'Engineering': '#3B82F6',
      'Design': '#8B5CF6',
      'Marketing': '#F59E0B',
      'Sales': '#10B981',
      'HR': '#EF4444',
      'General': '#6B7280'
    };
    return colors[dept] || '#6B7280';
  };

  return (
    <div className="employee-container">
      <div className="employee-header">
        <div className="header-content">
          <h1>Employee Management</h1>
          <p>Manage your team members and their information</p>
        </div>
        <button 
          className="add-employee-button"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="19" y1="8" x2="19" y2="14"></line>
            <line x1="16" y1="11" x2="22" y2="11"></line>
          </svg>
          {isFormVisible ? 'Cancel' : 'Add Employee'}
        </button>
      </div>

      {isFormVisible && (
        <div className="employee-form-container">
          <form onSubmit={addEmployee} className="employee-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter employee name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select 
                id="department"
                value={department} 
                onChange={e => setDepartment(e.target.value)}
              >
                <option value="">Select department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="General">General</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <line x1="19" y1="8" x2="19" y2="14"></line>
                  <line x1="16" y1="11" x2="22" y2="11"></line>
                </svg>
                Add Employee
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="employees-overview">
        <div className="employees-header">
          <div className="header-left">
            <h2>Team Members ({employees.length})</h2>
            <p>Manage your team's information and roles</p>
          </div>
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="employees-grid">
          {filteredEmployees.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="m22 21-2-2"></path>
                <path d="M16 16h6"></path>
              </svg>
              <h3>No employees found</h3>
              <p>{searchTerm ? 'Try adjusting your search terms' : 'Add your first team member to get started'}</p>
            </div>
          ) : (
            filteredEmployees.map(emp => (
              <div key={emp.id} className="employee-card">
                <div className="employee-avatar">
                  <div 
                    className="avatar-circle"
                    style={{ backgroundColor: getDepartmentColor(emp.department) + '20' }}
                  >
                    <span style={{ color: getDepartmentColor(emp.department) }}>
                      {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="employee-info">
                  <h3 className="employee-name">{emp.name}</h3>
                  <p className="employee-email">{emp.email}</p>
                  <div className="employee-meta">
                    <span 
                      className="department-badge"
                      style={{ 
                        backgroundColor: getDepartmentColor(emp.department) + '20',
                        color: getDepartmentColor(emp.department)
                      }}
                    >
                      {emp.department}
                    </span>
                    <span className="status-badge active">Active</span>
                  </div>
                </div>
                
                <div className="employee-actions">
                  <button className="action-button edit" title="Edit employee">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    className="action-button delete" 
                    onClick={() => deleteEmployee(emp.id)}
                    title="Remove employee"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function EmployeePage() {
  return (
    <Layout>
      <EmployeePageContent />
    </Layout>
  );
}
