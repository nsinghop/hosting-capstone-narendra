"use client"

import React from 'react';
import Card from '../UI/Card';

const RecentProjects = () => {
  const projects = [
    {
      id: 1,
      name: 'Mobile App Development',
      description: 'Develop a new mobile app for clients',
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      status: 'ongoing'
    },
    {
      id: 3,
      name: 'Database Migration',
      description: 'Migrate from SQL to NoSQL database',
      status: 'completed'
    }
  ];

  return (
    <Card className="projects-card">
      <div className="card-header">
        <h3>Recent Projects</h3>
        <p className="subtitle">Recently created or updated projects</p>
      </div>
      
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-item">
            <div className="project-info">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
            <div className={`project-status ${project.status}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentProjects;