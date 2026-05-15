# 🚀 wealthyBIZ Accounting — Quick Start Guide

## What's Been Built (Phase 1 - Week 1-2 MVP)

✅ **Complete Electron + React Setup**
✅ **SQLite Database with Schema**
✅ **Authentication System**
✅ **Organisation Management**
✅ **Ledger Master Creation**
✅ **Beautiful Dark UI**
✅ **Dashboard with KPIs**
✅ **Database Query & Export APIs**

---

## 📦 Installation & Running

### Step 1: Setup Project
```bash
# Navigate to project directory
cd wealthybiz-accounting

# Install all dependencies
npm install
```

### Step 2: Run in Development
```bash
# This starts both Electron and React dev server simultaneously
npm start
```

The app will:
1. Start React dev server at `http://localhost:5173`
2. Launch Electron window automatically
3. Open DevTools for debugging

### Step 3: Test the App

**First Time:**
1. Click "Create New" tab
2. Enter organisation name (e.g., "My Company")
3. Fill in GSTIN, PAN, address
4. Click "Create Organisation"

**Login:**
1. Click "Login" tab
2. Enter same organisation name
3. Click "Login"

**Explore Dashboard:**
- See KPI cards with sample data
- View recent vouchers
- Check navigation menu

---

## 🔧 Development Workflow

### Edit React Components
All files in `src/` automatically reload when saved:
```bash
src/
├── pages/
│   ├── Login.jsx       ← Edit for auth
│   ├── Dashboard.jsx   ← Edit for dashboard
│   ├── Masters.jsx     ← Edit for ledgers/items
│   └── *.css          ← Styling
├── components/
│   └── Sidebar.jsx     ← Navigation
└── App.jsx            ← Main app
```

### Edit Electron Process
Changes to `public/electron.js` require restart:
1. Close the app
2. Run `npm start` again

### Database Schema Changes
Edit `initDatabase()` in `public/electron.js`:
```javascript
db.exec(`
  CREATE TABLE IF NOT EXISTS new_table (
    id TEXT PRIMARY KEY,
    ...
  );
`);
```

---

## 🗄️ Database Location

SQLite database is stored at:
- **Windows:** `C:\Users\YourName\AppData\Roaming\wealthybiz-accounting\wealthybiz.db`
- **Mac:** `~/Library/Application Support/wealthybiz-accounting/wealthybiz.db`
- **Linux:** `~/.config/wealthybiz-accounting/wealthybiz.db`

You can inspect it with:
```bash
sqlite3 wealthybiz.db ".tables"
sqlite3 wealthybiz.db "SELECT * FROM organisations;"
```

---

## 🎨 Styling & Theme

**Colors Used:**
```css
--o: #F97316      /* Orange (primary) */
--t: #0891B2      /* Teal (secondary) */
--dark: #030712   /* Dark background */
--card: #0C1220   /* Card background */
--text: #F9FAFB   /* Light text */
--muted: #6B7280  /* Muted text */
```

All CSS is in component `.css` files next to `.jsx`

---

## 🧪 Testing Features

### Create Test Data
Run in browser console (F12):
```javascript
// Test database operations
await window.electronAPI.dbQuery('SELECT * FROM organisations');
```

### Export to Excel
Button functionality exists but requires user interaction

### PDF Export
Set up when needed (uses jsPDF library)

---

## 📝 Next Steps (Phase 2)

### Week 3-4: Complete Voucher Entry
1. Implement Vouchers.jsx with:
   - Purchase, Sales, Payment, Receipt forms
   - Journal entry interface
   - Auto debit/credit calculation
   - Real-time ledger balance update

2. Add GST calculations:
   - CGST/SGST auto-calculation
   - IGST for inter-state
   - Input credit tracking

### Week 5-6: Reports
1. Implement Reports.jsx:
   - Trial Balance query & display
   - P&L Statement generation
   - Balance Sheet calculation
   - PDF export

2. Add GST Reports:
   - GSTR-1 compilation
   - GSTR-3B summary

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### App won't start
```bash
# Check if port 5173 is in use
# Kill the process or use a different port
```

### Database errors
- Delete the `.db` file to reset
- Database auto-creates on first run

### Electron not loading
- Check console (DevTools)
- Verify IPC handlers in electron.js

---

## 📊 Project Stats

- **Total Files:** 20+
- **React Components:** 6
- **Database Tables:** 6
- **CSS Files:** 5
- **Lines of Code:** 2000+
- **Build Size:** ~150MB (dev), ~50MB (release)

---

## 🔑 Key Files to Modify

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `public/electron.js` | Database & IPC handlers |
| `src/App.jsx` | Main app routing |
| `src/pages/*.jsx` | Page components |
| `src/App.css` | Global styles |

---

## 📱 For Windows .exe

When ready to build:
```bash
# Build Windows installer
npm run dist

# Creates: release/wealthyBIZ-Accounting-Setup-1.0.0.exe
```

Installer will include:
- Auto-installer with wizard
- Desktop shortcut
- Start menu entry
- Auto-updater (configurable)

---

## ✅ Checklist for Week 1-2

- [x] Project setup complete
- [x] Database schema created
- [x] Login/Auth working
- [x] Organisation creation working
- [x] Ledger master module started
- [x] Dashboard with KPIs
- [x] Dark UI implemented
- [ ] Test with all MD Group companies
- [ ] Collect feedback
- [ ] Week 3: Start voucher module

---

**Ready to code? Happy building!** 🚀

For questions: See README.md or GitHub Issues
