import React, { useState, useEffect } from 'react';
import './Safety.css';

const Safety = ({ elderName }) => {
  const [safetyStatus, setSafetyStatus] = useState('normal');
  const [alerts, setAlerts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSafetyData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        setAlerts([
          {
            id: 1,
            type: 'movement',
            severity: 'low',
            message: 'No movement detected in living room for 2 hours',
            timestamp: '2024-01-20T14:30:00Z'
          },
          {
            id: 2,
            type: 'door',
            severity: 'medium',
            message: 'Front door left open for 15 minutes',
            timestamp: '2024-01-20T13:15:00Z'
          }
        ]);

        setContacts([
          {
            id: 1,
            name: 'Sarah Johnson',
            relation: 'Daughter',
            phone: '+1 (555) 123-4567',
            isEmergency: true
          },
          {
            id: 2,
            name: 'Dr. Williams',
            relation: 'Primary Doctor',
            phone: '+1 (555) 987-6543',
            isEmergency: true
          }
        ]);

        setSafetyStatus('normal');
        setLoading(false);
      } catch (err) {
        setError('Failed to load safety data');
        setLoading(false);
      }
    };

    fetchSafetyData();
    
    const intervalId = setInterval(fetchSafetyData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleEmergencyCall = (contact) => {
    alert(`Simulating emergency call to ${contact.name}: ${contact.phone}`);
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'movement': return '🚶';
      case 'door': return '🚪';
      case 'temperature': return '🌡️';
      case 'smoke': return '🚬';
      default: return '⚠️';
    }
  };

  if (loading) return <div className="loading-container">Loading safety information...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="safety-container">
      <div className="safety-header">
        <h2>Safety Monitor for {elderName}</h2>
        <div className={`status-indicator status-${safetyStatus}`}>
          System Status: {safetyStatus.toUpperCase()}
        </div>
      </div>

      <div className="safety-grid">
        <div className="alerts-card">
          <h3>Recent Alerts</h3>
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-item severity-${alert.severity}`}>
                <div className="alert-icon">{getAlertIcon(alert.type)}</div>
                <div className="alert-content">
                  <div className="alert-message">{alert.message}</div>
                  <div className="alert-time">
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contacts-card">
          <h3>Emergency Contacts</h3>
          <div className="contacts-list">
            {contacts.map(contact => (
              <div key={contact.id} className="contact-item">
                <div className="contact-info">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-relation">{contact.relation}</div>
                  <div className="contact-phone">{contact.phone}</div>
                </div>
                {contact.isEmergency && (
                  <button
                    className="emergency-call-btn"
                    onClick={() => handleEmergencyCall(contact)}
                  >
                    📞 Call Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="safety-actions">
        <button className="sos-button">
          🆘 SOS - Emergency Services
        </button>
      </div>
    </div>
  );
};

export default Safety;
