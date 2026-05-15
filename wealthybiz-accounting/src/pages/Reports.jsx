import React from 'react';

const Reports = ({ org_id }) => {
  return (
    <div className="card">
      <h1>📈 Financial Reports</h1>
      <p style={{ color: '#6B7280', marginTop: '16px' }}>
        Feature under development...
      </p>
      <p style={{ color: '#6B7280', fontSize: '12px', marginTop: '12px' }}>
        Available Reports:
        <br />✅ Trial Balance
        <br />✅ Profit & Loss Statement
        <br />✅ Balance Sheet
        <br />✅ Cash Flow Statement
        <br />✅ GST Reports (GSTR-1, GSTR-3B)
        <br />✅ Inventory Statement
      </p>
    </div>
  );
};

export default Reports;
