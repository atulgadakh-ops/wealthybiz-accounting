# 🎮 Command Reference — wealthyBIZ Accounting

## Installation & Setup

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```
Launches React dev server + Electron automatically

---

## Development Commands

### Run Web Only (React)
```bash
npm run react-start
```

### Run Electron Only (if React already running)
```bash
npm run electron-start
```

### Run Both (Default)
```bash
npm start
```

---

## Build & Release

### Build for Windows
```bash
npm run build
```
Creates: `release/wealthyBIZ-Accounting-Setup-1.0.0.exe`

### Create Distribution
```bash
npm run dist
```
Same as build (creates installer)

### Build React Files Only
```bash
npm run react-build
```

---

## Database Commands

### View Database (Command Line)
```bash
sqlite3 ~/.config/wealthybiz-accounting/wealthybiz.db
```

### Common SQLite Commands
```sql
-- List all tables
.tables

-- Show organisations
SELECT * FROM organisations;

-- Show ledgers for an org
SELECT * FROM ledgers WHERE org_id = 'id-here';

-- Count vouchers
SELECT COUNT(*) FROM vouchers;

-- Exit SQLite
.exit
```

---

## Git Commands

### Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Phase 1 MVP"
git branch -M main
git remote add origin https://github.com/yourusername/wealthybiz-accounting.git
git push -u origin main
```

### Regular Commits
```bash
git add .
git commit -m "Feature: Your feature description"
git push origin main
```

### Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### Push Feature Branch
```bash
git push origin feature/your-feature-name
```

---

## Directory Navigation

### Open Project Folder
```bash
cd wealthybiz-accounting
pwd  # Show current path
```

### View Project Structure
```bash
tree -L 2  # Shows 2 levels deep
# or
find . -type f -name "*.jsx" -o -name "*.js"
```

---

## Debugging

### Clear Node Modules (If Issues)
```bash
rm -rf node_modules
npm install
```

### Check Port Usage (Port 5173)
```bash
# Windows
netstat -ano | findstr :5173

# Mac/Linux
lsof -i :5173
```

### View Electron App Logs
Press `Ctrl+Shift+I` in Electron window to open DevTools

---

## Environment Variables

### Create .env File (If Needed)
```bash
echo "VITE_API_URL=http://localhost:3000" > .env
```

---

## Production Build Checklist

- [ ] Test all features locally
- [ ] Run `npm run build`
- [ ] Install & test the .exe
- [ ] Check database persists
- [ ] Verify exports (Excel/PDF)
- [ ] Test with multiple organisations
- [ ] Review all pages work
- [ ] Check styling on different resolutions

---

## Common Issues & Solutions

### App Won't Start
```bash
# 1. Check if React server is running
# 2. Check if port 5173 is in use
# 3. Restart npm start
npm start
```

### Database Errors
```bash
# Delete database to reset (data will be lost!)
rm ~/.config/wealthybiz-accounting/wealthybiz.db

# On Windows:
# Delete %APPDATA%\wealthybiz-accounting\wealthybiz.db
```

### Module Not Found
```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working
```bash
# Restart development server
# Ctrl+C to stop
# npm start to restart
```

---

## Performance Testing

### Check Bundle Size
```bash
npm run react-build
# Check dist/ folder size
```

### Monitor Memory Usage
- Open DevTools (Ctrl+Shift+I)
- Go to Performance tab
- Record user interactions
- Analyze flame charts

---

## File Locations

### SQLite Database
- **Windows:** `C:\Users\[Username]\AppData\Roaming\wealthybiz-accounting\wealthybiz.db`
- **Mac:** `~/Library/Application Support/wealthybiz-accounting/wealthybiz.db`
- **Linux:** `~/.config/wealthybiz-accounting/wealthybiz.db`

### Application Files
- React build output: `./dist/`
- Source code: `./src/`
- Electron files: `./public/`

---

## Useful Tools

### SQLite Browser (GUI)
Download: https://sqlitebrowser.org/

### VS Code Extensions Recommended
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- SQLite (browse database)
- Electron Tools

### DevTools Shortcuts
- `Ctrl+Shift+I` — Open DevTools
- `Ctrl+Shift+C` — Inspect element
- `Ctrl+Shift+J` — Open console
- `F5` — Reload app
- `Ctrl+R` — Reload Electron

---

## Key Files to Remember

| File | Purpose | Edit When |
|------|---------|-----------|
| `package.json` | Dependencies | Adding npm packages |
| `src/App.jsx` | Main routing | Adding new pages |
| `src/pages/*.jsx` | Page components | Building features |
| `public/electron.js` | Electron main | Database changes |
| `vite.config.js` | Build config | Build issues |
| `.gitignore` | Git settings | Excluding files |

---

**Last Updated: May 15, 2026**
