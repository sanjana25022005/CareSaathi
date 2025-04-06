import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Reminder from './components/Reminder';
import Safety from './components/Safety';
import Companion from './components/Companion';
import './App.css';

function App() {
  const [elderName, setElderName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('elderName');
    if (savedName) {
      setElderName(savedName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (elderName.trim()) {
      localStorage.setItem('elderName', elderName);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('elderName');
    setIsLoggedIn(false);
    setElderName('');
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>ElderCare Assistant</h1>
          <p>Your caring AI companion</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={elderName}
              onChange={(e) => setElderName(e.target.value)}
              placeholder="Enter your name"
              required
            />
            <button type="submit">Get Started</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>ElderCare Assistant</h1>
          <p>Hello, {elderName}!</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>
        
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/reminders">Reminders</Link></li>
            <li><Link to="/safety">Safety</Link></li>
            <li><Link to="/companion">Companion</Link></li>
          </ul>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Dashboard elderName={elderName} />} />
            <Route path="/reminders" element={<Reminder elderName={elderName} />} />
            <Route path="/safety" element={<Safety elderName={elderName} />} />
            <Route path="/companion" element={<Companion elderName={elderName} />} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; 2025 ElderCare Assistant by Jab We Code</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
