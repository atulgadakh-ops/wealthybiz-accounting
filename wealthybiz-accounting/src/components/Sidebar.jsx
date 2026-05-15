import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ currentOrg, user, onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '📒', label: 'Masters', path: '/masters' },
    { icon: '🧾', label: 'Vouchers', path: '/vouchers' },
    { icon: '📈', label: 'Reports', path: '/reports' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo">💼</div>
        <div>
          <div className="app-name">wealthyBIZ</div>
          <div className="version">v1.0.0</div>
        </div>
      </div>

      {/* Org Info */}
      {currentOrg && (
        <div className="org-info">
          <div className="org-label">Organisation</div>
          <div className="org-name">{currentOrg.name || 'Loading...'}</div>
        </div>
      )}

      {/* Menu */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className="menu-item"
            onClick={() => navigate(item.path)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <div className="user-name">{user?.name || 'User'}</div>
            <div className="user-role">{user?.role || 'Owner'}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
