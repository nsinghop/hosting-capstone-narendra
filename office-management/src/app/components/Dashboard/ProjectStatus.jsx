"use client"

import React, { useEffect, useRef } from 'react';
import Card from '../UI/Card';

const ProjectStatus = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Here you would typically initialize a chart library like Chart.js
    // This is a simplified example
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Draw a simple pie chart (in production, use a proper chart library)
      const drawPieSlice = (ctx, centerX, centerY, radius, startAngle, endAngle, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
      };
      
      const centerX = chartRef.current.width / 2;
      const centerY = chartRef.current.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      
      // Clear canvas
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
      
      // Draw slices
      drawPieSlice(ctx, centerX, centerY, radius, 0, Math.PI * 2 * 0.33, '#2196F3'); // Ongoing: 33%
      drawPieSlice(ctx, centerX, centerY, radius, Math.PI * 2 * 0.33, Math.PI * 2 * 0.66, '#4CAF50'); // Completed: 33%
      drawPieSlice(ctx, centerX, centerY, radius, Math.PI * 2 * 0.66, Math.PI * 2, '#FFC107'); // Upcoming: 34%
    }
  }, []);
  
  return (
    <Card className="chart-card">
      <h3>Project Status</h3>
      <p className="subtitle">Distribution of projects by status</p>
      <div className="chart-container">
        <canvas ref={chartRef} width="300" height="300"></canvas>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#2196F3' }}></span>
            <span>Ongoing: 33%</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
            <span>Completed: 33%</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#FFC107' }}></span>
            <span>Upcoming: 33%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectStatus;