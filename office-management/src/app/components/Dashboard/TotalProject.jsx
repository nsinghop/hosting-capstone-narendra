"use client"

import React from 'react';
import Card from '../UI/Card';

const TotalProjects = ({ count }) => {
  return (
    <Card className="stat-card">
      <h3>Total Projects</h3>
      <p className="subtitle">All managed projects</p>
      <div className="stat-value">{count}</div>
    </Card>
  );
};

export default TotalProjects;