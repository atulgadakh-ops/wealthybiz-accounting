import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ org_id }) => {
  const [orgData, setOrgData] = useState(null);
  const [stats, setStats] = useState({ totalIncome: 0, totalExpense: 0, totalVouchers: 0 });
  const [recentVouchers, setRecentVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [org_id]);

  const loadDashboard = async () => {
    try {
      // Load org data
      const orgResult = await window.electronAPI.dbQuery(
        'SELECT * FROM organisations WHERE id = ?',
        [org_id]
      );
      if (orgResult.success && orgResult.data.length > 0) {
        setOrgData(orgResult.data[0]);
      }

      // Load vouchers for stats
      const vouchersResult = await window.electronAPI.dbQuery(
        'SELECT * FROM vouchers WHERE org_id = ? ORDER BY date DESC LIMIT 10',
        [org_id]
      );

      if (vouchersResult.success) {
        setRecentVouchers(vouchersResult.data);
        
        let totalIncome = 0, totalExpense = 0;
        vouchersResult.data.forEach(v => {
          if (v.type === 'sales' || v.type === 'receipt') totalIncome += v.total_amount;
          if (v.type === 'purchase' || v.type === 'payment') totalExpense += v.total_amount;
        });

        setStats({
          totalIncome,
          totalExpense,
          totalVouchers: vouchersResult.data.length
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard"><div className="loading"></div></div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>{orgData?.name || 'Loading...'}</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card income">
          <div className="kpi-icon">💰</div>
          <div className="kpi-content">
            <div className="kpi-label">Total Income</div>
            <div className="kpi-value">₹{stats.totalIncome.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="kpi-card expense">
          <div className="kpi-icon">📤</div>
          <div className="kpi-content">
            <div className="kpi-label">Total Expenses</div>
            <div className="kpi-value">₹{stats.totalExpense.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="kpi-card profit">
          <div className="kpi-icon">📈</div>
          <div className="kpi-content">
            <div className="kpi-label">Net Profit</div>
            <div className="kpi-value">₹{(stats.totalIncome - stats.totalExpense).toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="kpi-card vouchers">
          <div className="kpi-icon">🧾</div>
          <div className="kpi-content">
            <div className="kpi-label">Total Vouchers</div>
            <div className="kpi-value">{stats.totalVouchers}</div>
          </div>
        </div>
      </div>

      {/* Recent Vouchers */}
      <div className="card">
        <h2>🧾 Recent Vouchers</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Number</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentVouchers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#6B7280', padding: '20px' }}>
                    No vouchers yet. Create your first voucher!
                  </td>
                </tr>
              ) : (
                recentVouchers.map((v) => (
                  <tr key={v.id}>
                    <td>{new Date(v.date).toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className={`badge badge-${v.type}`}>
                        {v.type.charAt(0).toUpperCase() + v.type.slice(1)}
                      </span>
                    </td>
                    <td>{v.number}</td>
                    <td>₹{v.total_amount.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`status status-${v.status}`}>
                        {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>⚡ Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">➕ New Voucher</button>
          <button className="action-btn">📒 New Ledger</button>
          <button className="action-btn">📊 View Reports</button>
          <button className="action-btn">💾 Backup Data</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
