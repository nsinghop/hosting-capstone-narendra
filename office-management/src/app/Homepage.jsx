import Head from 'next/head';
// import Layout from '../components/Layoutop/Layout';
import Layout from './components/Layout/Layout';
import TotalProjects from './components/Dashboard/TotalProject';
import UserTasks from './components/Dashboard/UserTask';
import CompletedProjects from './components/Dashboard/CompletedProjects';
import ProjectStatus from './components/Dashboard/ProjectStatus';
import TaskStatus from './components/Dashboard/TaskStatus';
import RecentProjects from './components/Dashboard/RecentProject';

export default function Homepage() {
  return (
    <>
      <Head>
        <title>Officium - Dashboard</title>
        <meta name="description" content="Officium project management dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>
          
          <div className="stats-container">
            <TotalProjects count={3} />
            <UserTasks count={0} />
            <CompletedProjects count={1} />
          </div>
          
          <div className="charts-container">
            <ProjectStatus />
            <TaskStatus />
          </div>
          
          <RecentProjects />
        </div>
      </Layout>
    </>
  );
}

// import React from 'react'

// export default function Home() {
//   return (
//     <div>page</div>
//   )
// }
