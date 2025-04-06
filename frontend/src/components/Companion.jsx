import React, { useState, useEffect, useRef } from 'react';
import './Companion.css';

const Companion = ({ elderName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock initial conversation
        setMessages([
          {
            id: 1,
            text: `Hello ${elderName}! How are you feeling today?`,
            sender: 'ai',
            timestamp: new Date().toISOString()
          }
        ]);

        // Mock suggested activities
        setActivities([
          {
            id: 1,
            title: 'Memory Game',
            description: 'Exercise your mind with a fun card matching game',
            type: 'cognitive'
          },
          {
            id: 2,
            title: 'Guided Meditation',
            description: '10-minute relaxation session',
            type: 'wellness'
          },
          {
            id: 3,
            title: 'Photo Albums',
            description: 'Browse through your digital photo collection',
            type: 'social'
          }
        ]);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching companion data:', err);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [elderName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `I understand how you feel about "${inputMessage}". Would you like to talk more about it?`,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleVoiceInput = () => {
    setIsListening(prev => !prev);
    // In a real implementation, this would handle voice input
    if (!isListening) {
      alert('Voice input feature would start here');
    }
  };

  const startActivity = (activity) => {
    alert(`Starting activity: ${activity.title}`);
  };

  if (loading) return <div className="loading-container">Loading companion...</div>;

  return (
    <div className="companion-container">
      <div className="companion-grid">
        <div className="chat-section">
          <div className="chat-messages">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender}`}
              >
                <div className="message-content">{message.text}</div>
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button type="button" onClick={toggleVoiceInput} className="voice-input-btn">
              {isListening ? '🔴' : '🎤'}
            </button>
            <button type="submit" className="send-btn">Send</button>
          </form>
        </div>

        <div className="activities-section">
          <h3>Suggested Activities</h3>
          <div className="activities-grid">
            {activities.map(activity => (
              <div key={activity.id} className="activity-card">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                <button 
                  onClick={() => startActivity(activity)}
                  className="start-activity-btn"
                >
                  Start Activity
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companion;
