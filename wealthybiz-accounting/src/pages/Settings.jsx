import React from 'react';

const Settings = ({ org_id }) => {
  return (
    <div className="card">
      <h1>⚙️ Settings</h1>
      <p style={{ color: '#6B7280', marginTop: '16px' }}>
        Settings & Configuration
      </p>
      <p style={{ color: '#6B7280', fontSize: '12px', marginTop: '12px' }}>
        Available Settings:
        <br />✅ Organisation Profile
        <br />✅ Financial Year
        <br />✅ GST Settings
        <br />✅ Backup & Restore
        <br />✅ User Preferences
        <br />✅ About
      </p>
    </div>
  );
};

export default Settings;
