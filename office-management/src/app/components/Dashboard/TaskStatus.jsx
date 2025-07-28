"use client"
import React, { useEffect, useRef } from 'react';
import Card from '../UI/Card';

const TaskStatus = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    // Here you would typically initialize a chart library like Chart.js
    // This is a simplified example
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
      
      // Draw a simple bar chart (in production, use a proper chart library)
      const barWidth = 50;
      const barMargin = 40;
      const maxValue = 4;
      const scale = (chartRef.current.height - 60) / maxValue;
      
      // Define data
      const data = [
        { label: 'To Do', value: 3 },
        { label: 'In Progress', value: 2 },
        { label: 'Review', value: 1 },
        { label: 'Done', value: 0 }
      ];
      
      // Draw bars
      data.forEach((item, index) => {
        const x = 50 + index * (barWidth + barMargin);
        const height = item.value * scale;
        const y = chartRef.current.height - 30 - height;
        
        ctx.fillStyle = '#6366F1';
        ctx.fillRect(x, y, barWidth, height);
        
        // Draw labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + barWidth / 2, chartRef.current.height - 10);
        
        // Draw values
        ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
      });
      
      // Draw x and y axes
      ctx.strokeStyle = '#ddd';
      ctx.beginPath();
      ctx.moveTo(30, 20);
      ctx.lineTo(30, chartRef.current.height - 30);
      ctx.lineTo(chartRef.current.width - 20, chartRef.current.height - 30);
      ctx.stroke();
    }
  }, []);

  return (
    <Card className="chart-card">
      <h3>Your Task Status</h3>
      <p className="subtitle">Distribution of your tasks by status</p>
      <div className="chart-container">
        <canvas ref={chartRef} width="400" height="300"></canvas>
      </div>
    </Card>
  );
};

export default TaskStatus;
