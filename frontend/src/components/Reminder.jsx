import React, { useState, useEffect } from 'react';
import './Reminder.css';

const Reminder = ({ elderName }) => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    time: '',
    date: '',
    type: 'medication',
    repeat: 'once',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emotionState, setEmotionState] = useState('neutral'); // neutral, happy, sad, tired
  const [voicePreference, setVoicePreference] = useState('gentle');
  
  useEffect(() => {
    // Fetch reminders - in production, replace with actual API calls
    const fetchReminders = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        setReminders([
          {
            id: 1,
            title: 'Morning Medication',
            description: 'Take blood pressure medication with water',
            time: '08:00',
            type: 'medication',
            repeat: 'daily',
            completed: false,
            priority: 'high'
          },
          {
            id: 2,
            title: 'Lunch',
            description: 'Have a balanced meal with vegetables',
            time: '12:30',
            type: 'meal',
            repeat: 'daily',
            completed: false,
            priority: 'medium'
          },
          {
            id: 3,
            title: 'Evening Walk',
            description: '15-minute walk in the garden',
            time: '17:00',
            type: 'activity',
            repeat: 'daily',
            completed: false,
            priority: 'medium'
          },
          {
            id: 4,
            title: 'Doctor Appointment',
            description: 'Checkup with Dr. Williams',
            time: '10:00',
            date: '2025-04-08',
            type: 'appointment',
            repeat: 'once',
            completed: false,
            priority: 'high'
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load reminders. Please try again later.');
        setLoading(false);
        console.error('Error fetching reminders:', err);
      }
    };
    
    fetchReminders();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder({ ...newReminder, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newReminder.title || !newReminder.time) {
      alert('Please provide a title and time for the reminder');
      return;
    }
    
    try {
      // In production, this would be an API call
      const createdReminder = {
        id: Date.now(),
        ...newReminder,
        completed: false,
        priority: 'medium'
      };
      
      setReminders([...reminders, createdReminder]);
      
      // Reset form
      setNewReminder({
        title: '',
        description: '',
        time: '',
        date: '',
        type: 'medication',
        repeat: 'once',
      });
      
    } catch (err) {
      setError('Failed to create reminder. Please try again.');
      console.error('Error creating reminder:', err);
    }
  };
  
  const toggleComplete = (id) => {
    setReminders(
      reminders.map(reminder => 
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };
  
  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };
  
  const triggerVoiceReminder = (reminder) => {
    // In a real implementation, this would use a voice synthesis API
    // For now, we'll just show an alert
    alert(`Voice reminder: ${reminder.title} - ${reminder.description}`);
    
    // Simulate API call for emotion detection
    setTimeout(() => {
      // Random emotion for demo purposes
      const emotions = ['neutral', 'happy', 'sad', 'tired'];
      setEmotionState(emotions[Math.floor(Math.random() * emotions.length)]);
    }, 1000);
  };
  
  const getReminderIcon = (type) => {
    switch(type) {
      case 'medication': return '💊';
      case 'meal': return '🍽️';
      case 'activity': return '🚶';
      case 'appointment': return '🗓️';
      default: return '⏰';
    }
  };
  
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  if (loading) {
    return <div className="loading-container">Loading reminders...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }
  
  return (
    <div className="reminder-container">
      <div className="reminder-header">
        <h2>Daily Reminders for {elderName}</h2>
        <div className="emotion-indicator">
          <div className="emotion-label">Detected Mood:</div>
          <div className={`emotion-icon emotion-${emotionState}`}>
            {emotionState === 'happy' && '😊'}
            {emotionState === 'sad' && '😢'}
            {emotionState === 'tired' && '😴'}
            {emotionState === 'neutral' && '😐'}
          </div>
        </div>
      </div>
      
      <div className="preferences-bar">
        <div className="voice-preference">
          <label>Voice Tone:</label>
          <select 
            value={voicePreference} 
            onChange={(e) => setVoicePreference(e.target.value)}
          >
            <option value="gentle">Gentle</option>
            <option value="cheerful">Cheerful</option>
            <option value="clear">Clear & Direct</option>
            <option value="motivating">Motivating</option>
          </select>
        </div>
      </div>
      
      <div className="reminder-grid">
        <div className="reminders-list">
          <h3>Today's Reminders</h3>
          
          {reminders.length === 0 ? (
            <div className="no-reminders">No reminders scheduled for today</div>
          ) : (
            <div className="reminders-items">
              {reminders.map(reminder => (
                <div 
                  key={reminder.id} 
                  className={`reminder-item ${reminder.completed ? 'completed' : ''} ${getPriorityClass(reminder.priority)}`}
                >
                  <div className="reminder-icon">{getReminderIcon(reminder.type)}</div>
                  <div className="reminder-details">
                    <div className="reminder-title">{reminder.title}</div>
                    <div className="reminder-description">{reminder.description}</div>
                    <div className="reminder-meta">
                      <span className="reminder-time">{reminder.time}</span>
                      {reminder.date && <span className="reminder-date">{reminder.date}</span>}
                      <span className="reminder-repeat">{reminder.repeat}</span>
                    </div>
                  </div>
                  <div className="reminder-actions">
                    <button 
                      className="voice-btn"
                      onClick={() => triggerVoiceReminder(reminder)}
                      title="Trigger voice reminder"
                    >
                      🔊
                    </button>
                    <button 
                      className={`complete-btn ${reminder.completed ? 'completed' : ''}`}
                      onClick={() => toggleComplete(reminder.id)}
                      title={reminder.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {reminder.completed ? '✓' : '○'}
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteReminder(reminder.id)}
                      title="Delete reminder"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="add-reminder-form">
          <h3>Add New Reminder</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={newReminder.title}
                onChange={handleInputChange}
                placeholder="Reminder title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newReminder.description}
                onChange={handleInputChange}
                placeholder="Add details about this reminder"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  id="time"
                  type="time"
                  name="time"
                  value={newReminder.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="date">Date (Optional)</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={newReminder.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  name="type"
                  value={newReminder.type}
                  onChange={handleInputChange}
                >
                  <option value="medication">Medication</option>
                  <option value="meal">Meal</option>
                  <option value="activity">Activity</option>
                  <option value="appointment">Appointment</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="repeat">Repeat</label>
                <select
                  id="repeat"
                  name="repeat"
                  value={newReminder.repeat}
                  onChange={handleInputChange}
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="submit-btn">Add Reminder</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reminder;