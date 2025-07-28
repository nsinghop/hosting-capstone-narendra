"use client"

import React from 'react';
import Card from '../UI/Card';

const CompletedProjects = ({ count }) => {
  return (
    <Card className="stat-card">
      <h3>Completed Projects</h3>
      <p className="subtitle">Successfully delivered</p>
      <div className="stat-value">{count}</div>
    </Card>
  );
};

export default CompletedProjects;