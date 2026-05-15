import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Masters.css';

const Masters = ({ org_id }) => {
  const [tab, setTab] = useState('ledgers');
  const [ledgers, setLedgers] = useState([]);
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    group_type: 'asset',
    sub_group: '',
    opening_balance: 0
  });

  useEffect(() => {
    loadData();
  }, [tab, org_id]);

  const loadData = async () => {
    try {
      setLoading(true);
      if (tab === 'ledgers') {
        const result = await window.electronAPI.dbQuery(
          'SELECT * FROM ledgers WHERE org_id = ? AND is_active = 1',
          [org_id]
        );
        if (result.success) setLedgers(result.data);
      } else if (tab === 'items') {
        const result = await window.electronAPI.dbQuery(
          'SELECT * FROM inventory_items WHERE org_id = ?',
          [org_id]
        );
        if (result.success) setItems(result.data);
      }
    } catch (error) {
      console.error('Error loading masters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLedger = async (e) => {
    e.preventDefault();
    try {
      const result = await window.electronAPI.dbRun(
        `INSERT INTO ledgers (id, org_id, name, group_type, sub_group, opening_balance, balance_type, is_active)
         VALUES (?, ?, ?, ?, ?, ?, 'Dr', 1)`,
        [uuidv4(), org_id, formData.name, formData.group_type, formData.sub_group, formData.opening_balance]
      );

      if (result.success) {
        setFormData({ name: '', group_type: 'asset', sub_group: '', opening_balance: 0 });
        setShowForm(false);
        loadData();
      }
    } catch (error) {
      console.error('Error adding ledger:', error);
    }
  };

  return (
    <div className="masters">
      <div className="page-header">
        <h1>📒 Masters</h1>
        <p>Manage ledgers, items and parties</p>
      </div>

      <div className="master-tabs">
        <button className={`tab ${tab === 'ledgers' ? 'active' : ''}`} onClick={() => setTab('ledgers')}>
          📒 Ledgers
        </button>
        <button className={`tab ${tab === 'items' ? 'active' : ''}`} onClick={() => setTab('items')}>
          📦 Items
        </button>
        <button className={`tab ${tab === 'parties' ? 'active' : ''}`} onClick={() => setTab('parties')}>
          👥 Parties
        </button>
      </div>

      {tab === 'ledgers' && (
        <div className="card">
          <div className="card-header">
            <h2>Ledger Accounts</h2>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              ➕ Add Ledger
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddLedger} className="master-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Ledger Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Cash, Bank, Sales"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Group Type</label>
                  <select
                    value={formData.group_type}
                    onChange={(e) => setFormData({ ...formData, group_type: e.target.value })}
                  >
                    <option value="asset">Asset</option>
                    <option value="liability">Liability</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="capital">Capital</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sub Group</label>
                  <input
                    type="text"
                    value={formData.sub_group}
                    onChange={(e) => setFormData({ ...formData, sub_group: e.target.value })}
                    placeholder="e.g. Cash & Bank, Current Assets"
                  />
                </div>
                <div className="form-group">
                  <label>Opening Balance (₹)</label>
                  <input
                    type="number"
                    value={formData.opening_balance}
                    onChange={(e) => setFormData({ ...formData, opening_balance: parseFloat(e.target.value) })}
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">💾 Save Ledger</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="loading"></div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Sub Group</th>
                    <th>Opening Balance</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgers.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#6B7280' }}>
                        No ledgers found. Add one now!
                      </td>
                    </tr>
                  ) : (
                    ledgers.map((ledger) => (
                      <tr key={ledger.id}>
                        <td>{ledger.name}</td>
                        <td><span className="badge">{ledger.group_type}</span></td>
                        <td>{ledger.sub_group}</td>
                        <td>₹{ledger.opening_balance.toLocaleString('en-IN')}</td>
                        <td>
                          <button className="action-link">✏️ Edit</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'items' && (
        <div className="card">
          <h2>📦 Inventory Items</h2>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Feature coming soon...</p>
        </div>
      )}

      {tab === 'parties' && (
        <div className="card">
          <h2>👥 Customers & Vendors</h2>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Feature coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default Masters;
