import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Masters from './pages/Masters';
import Vouchers from './pages/Vouchers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedAuth = localStorage.getItem('wealthybiz_auth');
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setCurrentOrg(auth.org_id);
      setUser(auth.user);
    }
  }, []);

  const handleLogin = (org_id, user_data) => {
    setIsAuthenticated(true);
    setCurrentOrg(org_id);
    setUser(user_data);
    localStorage.setItem('wealthybiz_auth', JSON.stringify({ org_id, user: user_data }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentOrg(null);
    setUser(null);
    localStorage.removeItem('wealthybiz_auth');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar currentOrg={currentOrg} user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard org_id={currentOrg} />} />
            <Route path="/masters" element={<Masters org_id={currentOrg} />} />
            <Route path="/vouchers" element={<Vouchers org_id={currentOrg} />} />
            <Route path="/reports" element={<Reports org_id={currentOrg} />} />
            <Route path="/settings" element={<Settings org_id={currentOrg} />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
