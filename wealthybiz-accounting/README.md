# 💼 wealthyBIZ Accounting

Professional accounting software for Indian businesses — Open source, offline-first, with real-time sync.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Features

✅ **Multi-Organisation Support** — Manage multiple companies in one app
✅ **Complete Ledger System** — Assets, Liabilities, Income, Expenses, Capital
✅ **Vouchers** — Purchase, Sales, Payment, Receipt, Journal, Contra entries
✅ **GST Ready** — Auto CGST/SGST/IGST calculations, GSTR-1 & GSTR-3B reports
✅ **Invoicing** — Professional GST-compliant invoices with PDF export
✅ **Inventory** — Stock tracking with HSN/SAC codes
✅ **Financial Reports** — Trial Balance, P&L, Balance Sheet, Cash Flow
✅ **Offline First** — Works without internet, syncs when online
✅ **Local Database** — SQLite for complete data privacy
✅ **Dark Mode** — Beautiful dark interface optimized for long hours

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Tailwind CSS
- **Desktop:** Electron (Windows, Mac, Linux)
- **Database:** SQLite 3 (local, encrypted)
- **Build:** Vite + Electron Builder
- **Export:** Excel (XLSX), PDF, JSON

---

## 📥 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Windows 7+ (for .exe)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/wealthybiz-accounting.git
cd wealthybiz-accounting
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm start
```

This will start both the React dev server and Electron app together.

---

## 📦 Build Executable

### Build for Windows (.exe)
```bash
npm run build
```

The installer will be created in the `release/` directory.

### For Mac/Linux
```bash
# Mac
npm run build -- --mac

# Linux
npm run build -- --linux
```

---

## 📱 Project Structure

```
wealthybiz-accounting/
├── src/
│   ├── pages/
│   │   ├── Login.jsx          # Login & Create Org
│   │   ├── Dashboard.jsx       # Main overview
│   │   ├── Masters.jsx         # Ledgers & Items
│   │   ├── Vouchers.jsx        # Transaction entry
│   │   ├── Reports.jsx         # Financial reports
│   │   └── Settings.jsx        # Configuration
│   ├── components/
│   │   └── Sidebar.jsx         # Navigation
│   ├── App.jsx                # Main app component
│   └── main.jsx               # React entry point
├── public/
│   ├── electron.js            # Electron main process
│   └── preload.js             # IPC bridge
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🗄️ Database Schema

### organisations
- Organisation details, GSTIN, address, FY start

### ledgers
- Chart of accounts (5 groups: Asset/Liability/Income/Expense/Capital)

### vouchers
- Transaction headers (Purchase, Sales, Payment, Receipt, Journal, Contra)

### voucher_items
- Debit/Credit entries for each voucher

### inventory_items
- Stock items with HSN/SAC codes, quantities

### gst_entries
- GST calculations (CGST/SGST/IGST) per voucher

---

## 🔐 Security

- **Row Level Security:** Each organisation's data is isolated
- **Local Storage:** All data stored locally in SQLite
- **Encryption:** Data can be encrypted before cloud backup
- **No Cloud Required:** Works 100% offline

---

## 💰 Pricing (Future SaaS Version)

- **Free Tier:** 1 org, basic features
- **Basic:** ₹499/month — 1 org, unlimited entries
- **Pro:** ₹1,499/month — 3 orgs, inventory, GST
- **Enterprise:** ₹3,999/month — Unlimited, API, white label

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For bugs, feature requests, or questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/wealthybiz-accounting/issues)
- Email: support@wealthybiz.in

---

## 📄 License

This project is licensed under MIT License — see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built for Indian businesses, by developers who understand accounting.

Made with ❤️ for the wealthyBIZ Group

---

## 🚀 Roadmap

**Phase 1 (Current):** Core MVP Desktop App
- ✅ Login & Org Management
- ✅ Ledger Master
- ✅ Basic Vouchers
- ✅ Trial Balance & P&L
- 📅 GST Module (Week 3-4)
- 📅 Invoicing (Week 5-6)

**Phase 2:** Web & Mobile
- Move to Supabase
- React web app
- React Native mobile
- Google Drive sync

**Phase 3:** Enterprise Features
- White label
- API marketplace
- AI insights
- Bank sync

---

**Current Version:** 1.0.0 (Beta)
**Last Updated:** May 15, 2026
