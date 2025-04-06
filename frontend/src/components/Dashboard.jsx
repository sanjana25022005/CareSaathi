import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ elderName }) => {
  const [healthStats, setHealthStats] = useState({
    heartRate: "--",
    sleepHours: "--",
    steps: "--",
    medicationAdherence: "--",
  });
  
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState('all');

  useEffect(() => {
    // In a real app, this would be fetched from your backend
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in production, replace with actual API calls
        setHealthStats({
          heartRate: Math.floor(Math.random() * (90 - 65) + 65),
          sleepHours: (Math.random() * (8.5 - 5.5) + 5.5).toFixed(1),
          steps: Math.floor(Math.random() * (4000 - 1000) + 1000),
          medicationAdherence: `${Math.floor(Math.random() * (100 - 70) + 70)}%`,
        });
        
        setActivities([
          { time: '8:00 AM', description: 'Took morning medication', type: 'medication' },
          { time: '9:30 AM', description: 'Breakfast', type: 'meal' },
          { time: '10:15 AM', description: 'Short walk in the garden', type: 'activity' },
          { time: '12:30 PM', description: 'Video call with daughter', type: 'social' },
          { time: '1:45 PM', description: 'Lunch', type: 'meal' },
          { time: '3:00 PM', description: 'Reading time', type: 'activity' },
          { time: '5:00 PM', description: 'Afternoon medication', type: 'medication' },
          { time: '6:30 PM', description: 'Dinner', type: 'meal' },
        ]);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
        console.error('Error fetching dashboard data:', err);
      }
    };
    
    fetchDashboardData();
    
    // Set up refresh interval - refresh every 30 minutes
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Filter activities based on type
  const getActivityIcon = (type) => {
    switch(type) {
      case 'medication': return '💊';
      case 'meal': return '🍽️';
      case 'activity': return '🚶';
      case 'social': return '👋';
      default: return '📝';
    }
  };

  if (loading) {
    return <div className="loading-container">Loading dashboard information...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Daily Overview for {elderName}</h2>
      
      <div className="dashboard-grid">
        <div className="health-stats-card">
          <h3>Health Summary</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">❤️</div>
              <div className="stat-value">{healthStats.heartRate}</div>
              <div className="stat-label">Heart Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">😴</div>
              <div className="stat-value">{healthStats.sleepHours}</div>
              <div className="stat-label">Sleep Hours</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👣</div>
              <div className="stat-value">{healthStats.steps}</div>
              <div className="stat-label">Steps</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💊</div>
              <div className="stat-value">{healthStats.medicationAdherence}</div>
              <div className="stat-label">Medication</div>
            </div>
          </div>
        </div>
        
        <div className="activities-card">
          <h3>Today's Activities</h3>
          <div className="activity-list">
            {activities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-time">{activity.time}</div>
                <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                <div className="activity-description">{activity.description}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="upcoming-card">
          <h3>Upcoming Events</h3>
          <div className="event-list">
            <div className="event-item">
              <div className="event-date">Tomorrow, 10:00 AM</div>
              <div className="event-title">Doctor's Appointment</div>
              <div className="event-details">Annual checkup with Dr. Williams</div>
            </div>
            <div className="event-item">
              <div className="event-date">Wednesday, 3:00 PM</div>
              <div className="event-title">Family Visit</div>
              <div className="event-details">John and kids coming over</div>
            </div>
            <div className="event-item">
              <div className="event-date">Friday, 11:00 AM</div>
              <div className="event-title">Grocery Delivery</div>
              <div className="event-details">Weekly delivery from Whole Foods</div>
            </div>
          </div>
        </div>
        
        <div className="family-card">
          <h3>Family Connection</h3>
          <div className="family-filter">
            <select 
              value={selectedFamily} 
              onChange={(e) => setSelectedFamily(e.target.value)}
            >
              <option value="all">All Family Members</option>
              <option value="sarah">Sarah (Daughter)</option>
              <option value="mike">Mike (Son)</option>
              <option value="emma">Emma (Granddaughter)</option>
            </select>
          </div>
          <div className="family-updates">
            <div className="family-update-item">
              <div className="update-time">Today, 12:30 PM</div>
              <div className="update-content">
                <strong>Sarah:</strong> Had a nice video call with mom. She seemed in good spirits today.
              </div>
            </div>
            <div className="family-update-item">
              <div className="update-time">Yesterday, 5:45 PM</div>
              <div className="update-content">
                <strong>Mike:</strong> Reminded mom about tomorrow's doctor appointment. She's prepared.
              </div>
            </div>
            <div className="family-update-item">
              <div className="update-time">2 days ago</div>
              <div className="update-content">
                <strong>Emma:</strong> Sent grandma some photos from my graduation. She loved them!
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="export-section">
        <button className="export-btn">Export Today's Report</button>
        <p className="export-note">Reports are automatically sent to connected family members daily.</p>
      </div>
    </div>
  );
};

export default Dashboard;