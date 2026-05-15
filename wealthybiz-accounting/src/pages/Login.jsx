import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Login.css';

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ org_name: '', password: '' });
  const [createData, setCreateData] = useState({
    org_name: '',
    gstin: '',
    pan: '',
    address: '',
    state_code: 'MH',
    fy_start: '2024-04-01',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await window.electronAPI.dbQuery(
        'SELECT * FROM organisations WHERE name = ?',
        [loginData.org_name]
      );

      if (!result.success || result.data.length === 0) {
        setError('Organisation not found');
        setLoading(false);
        return;
      }

      // Simplified auth - in production use proper password hashing
      const org = result.data[0];
      onLogin(org.id, { name: org.name, role: 'owner' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orgId = uuidv4();
      
      const result = await window.electronAPI.dbRun(
        `INSERT INTO organisations (id, name, gstin, pan, address, state_code, fy_start) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [orgId, createData.org_name, createData.gstin, createData.pan, createData.address, createData.state_code, createData.fy_start]
      );

      if (!result.success) {
        setError('Failed to create organisation');
        setLoading(false);
        return;
      }

      // Create default ledgers
      const defaultLedgers = [
        { name: 'Cash', group_type: 'asset', sub_group: 'Cash & Bank' },
        { name: 'Bank Account', group_type: 'asset', sub_group: 'Cash & Bank' },
        { name: 'Accounts Receivable', group_type: 'asset', sub_group: 'Sundry Debtors' },
        { name: 'Inventory', group_type: 'asset', sub_group: 'Current Assets' },
        { name: 'Accounts Payable', group_type: 'liability', sub_group: 'Sundry Creditors' },
        { name: 'Capital', group_type: 'capital', sub_group: 'Capital' },
        { name: 'Sales', group_type: 'income', sub_group: 'Sales & Services' },
        { name: 'Purchases', group_type: 'expense', sub_group: 'Cost of Goods Sold' },
        { name: 'CGST Input', group_type: 'asset', sub_group: 'Current Assets' },
        { name: 'SGST Input', group_type: 'asset', sub_group: 'Current Assets' },
        { name: 'CGST Output', group_type: 'liability', sub_group: 'Current Liabilities' },
        { name: 'SGST Output', group_type: 'liability', sub_group: 'Current Liabilities' },
      ];

      for (const ledger of defaultLedgers) {
        await window.electronAPI.dbRun(
          `INSERT INTO ledgers (id, org_id, name, group_type, sub_group, opening_balance, balance_type, is_active)
           VALUES (?, ?, ?, ?, ?, 0, 'Dr', 1)`,
          [uuidv4(), orgId, ledger.name, ledger.group_type, ledger.sub_group]
        );
      }

      onLogin(orgId, { name: createData.org_name, role: 'owner' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg"></div>
      <div className="login-card">
        <div className="login-header">
          <div className="logo-large">💼</div>
          <h1>wealthyBIZ Accounting</h1>
          <p>Professional Accounting Software for Indian Businesses</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create New
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Organisation Name</label>
              <input
                type="text"
                value={loginData.org_name}
                onChange={(e) => setLoginData({ ...loginData, org_name: e.target.value })}
                placeholder="Enter organisation name"
                required
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '🔄 Logging in...' : '📊 Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreate} className="login-form">
            <div className="form-group">
              <label>Organisation Name *</label>
              <input
                type="text"
                value={createData.org_name}
                onChange={(e) => setCreateData({ ...createData, org_name: e.target.value })}
                placeholder="e.g. ABC Enterprises"
                required
              />
            </div>

            <div className="form-group">
              <label>GSTIN</label>
              <input
                type="text"
                value={createData.gstin}
                onChange={(e) => setCreateData({ ...createData, gstin: e.target.value })}
                placeholder="15-digit GSTIN"
                maxLength="15"
              />
            </div>

            <div className="form-group">
              <label>PAN</label>
              <input
                type="text"
                value={createData.pan}
                onChange={(e) => setCreateData({ ...createData, pan: e.target.value })}
                placeholder="10-digit PAN"
                maxLength="10"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                value={createData.address}
                onChange={(e) => setCreateData({ ...createData, address: e.target.value })}
                placeholder="Registered address"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <select
                value={createData.state_code}
                onChange={(e) => setCreateData({ ...createData, state_code: e.target.value })}
              >
                <option value="MH">Maharashtra (MH)</option>
                <option value="GJ">Gujarat (GJ)</option>
                <option value="TN">Tamil Nadu (TN)</option>
                <option value="KA">Karnataka (KA)</option>
                <option value="UP">Uttar Pradesh (UP)</option>
                <option value="DL">Delhi (DL)</option>
                <option value="HR">Haryana (HR)</option>
                <option value="KL">Kerala (KL)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Financial Year Start</label>
              <input
                type="date"
                value={createData.fy_start}
                onChange={(e) => setCreateData({ ...createData, fy_start: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '🔄 Creating...' : '🎉 Create Organisation'}
            </button>
          </form>
        )}

        <div className="login-footer">
          <p>💡 Tip: Start with creating a new organisation to test all features</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
