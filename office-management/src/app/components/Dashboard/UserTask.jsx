"use client"

import React from 'react';
import Card from '../UI/Card';

const UserTasks = ({ count }) => {
  return (
    <Card className="stat-card">
      <h3>My Tasks</h3>
      <p className="subtitle">Tasks assigned to you</p>
      <div className="stat-value">{count}</div>
    </Card>
  );
};

export default UserTasks;
