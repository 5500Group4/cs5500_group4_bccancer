import React from 'react';
import './Dashboard.css'; 
import UserInfo from '../components/UserInfo';
import profilePic from '../assets/profile-test-avatar.png'; // Importing the profile picture

const Dashboard: React.FC = () => {
  // Mock data for demonstration purposes
  const ongoingJobs = [
    { id: '0001', name: '2024 Porche Pink Parade Vancouver', progress: false },
    { id: '0002', name: 'The Multiple Myeloma March', progress: false },
    { id: '0003', name: 'Royal Victoria Marathon', progress: false },
  ];

  return (
    <div className="dashboard">
    <header className="dashboard-header">
      <h1>Dashboard</h1>
    </header>
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <button className="dashboard-button">Add Event</button>
        <button className="dashboard-button">Edit Event</button>
        <button className="dashboard-button">View Events</button>
        <button className="dashboard-button">Users</button>
      </aside>
      <main className="dashboard-main">
        <UserInfo
              role="Coordinator"
              employeeNumber="12345"
              userName="Test User"
              ongoingJobsCount={ongoingJobs.length}
              profilePic={profilePic} // Passing the profile picture as a prop
            />
        <section className="ongoing-jobs-section">
          <div className="ongoing-jobs-table">
            <div className='ongoing-jobs-header' id='ongoing-label'>Ongoing Jobs</div>
            <div className="ongoing-jobs-header">
              <span>ID</span>
              <span>Name</span>
              <span>Progress Status</span>
            </div>
            <div className="ongoing-jobs-list">
              {ongoingJobs.map((job) => (
                <div key={job.id} className="ongoing-job-item">
                  <span>{job.id}</span>
                  <span>{job.name}</span>
                  <input type="checkbox" checked={job.progress} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
  );
};

export default Dashboard;
