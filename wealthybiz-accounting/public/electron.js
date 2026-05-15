const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const Database = require('better-sqlite3');

const store = new Store();
let mainWindow;
let db;

// Initialize database
function initDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'wealthybiz.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS organisations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      gstin TEXT,
      pan TEXT,
      address TEXT,
      state_code TEXT,
      fy_start TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ledgers (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL,
      name TEXT NOT NULL,
      group_type TEXT NOT NULL,
      sub_group TEXT,
      opening_balance REAL DEFAULT 0,
      balance_type TEXT,
      gstin TEXT,
      is_active BOOLEAN DEFAULT 1,
      FOREIGN KEY(org_id) REFERENCES organisations(id)
    );

    CREATE TABLE IF NOT EXISTS vouchers (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL,
      type TEXT NOT NULL,
      number TEXT NOT NULL,
      date TEXT NOT NULL,
      party_id TEXT,
      total_amount REAL DEFAULT 0,
      gst_amount REAL DEFAULT 0,
      narration TEXT,
      status TEXT DEFAULT 'draft',
      created_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(org_id) REFERENCES organisations(id),
      FOREIGN KEY(party_id) REFERENCES ledgers(id)
    );

    CREATE TABLE IF NOT EXISTS voucher_items (
      id TEXT PRIMARY KEY,
      voucher_id TEXT NOT NULL,
      ledger_id TEXT NOT NULL,
      debit REAL DEFAULT 0,
      credit REAL DEFAULT 0,
      item_id TEXT,
      qty REAL DEFAULT 0,
      rate REAL DEFAULT 0,
      FOREIGN KEY(voucher_id) REFERENCES vouchers(id),
      FOREIGN KEY(ledger_id) REFERENCES ledgers(id)
    );

    CREATE TABLE IF NOT EXISTS inventory_items (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL,
      name TEXT NOT NULL,
      hsn_sac TEXT,
      unit TEXT,
      gst_rate REAL DEFAULT 0,
      opening_stock REAL DEFAULT 0,
      opening_rate REAL DEFAULT 0,
      reorder_level REAL DEFAULT 0,
      FOREIGN KEY(org_id) REFERENCES organisations(id)
    );

    CREATE TABLE IF NOT EXISTS gst_entries (
      id TEXT PRIMARY KEY,
      voucher_id TEXT NOT NULL,
      taxable_value REAL DEFAULT 0,
      cgst REAL DEFAULT 0,
      sgst REAL DEFAULT 0,
      igst REAL DEFAULT 0,
      supply_type TEXT,
      FOREIGN KEY(voucher_id) REFERENCES vouchers(id)
    );
  `);

  console.log('Database initialized at:', dbPath);
}

// Create main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    },
    icon: path.join(__dirname, '../assets/icon.png')
  });

  const startUrl = isDev 
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers
ipcMain.handle('db-query', async (event, sql, params = []) => {
  try {
    const stmt = db.prepare(sql);
    const result = stmt.all(...params);
    return { success: true, data: result };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db-run', async (event, sql, params = []) => {
  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(...params);
    return { success: true, changes: info.changes, lastInsertRowid: info.lastInsertRowid };
  } catch (error) {
    console.error('Database run error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('export-excel', async (event, data, filename) => {
  const XLSX = require('xlsx');
  try {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    
    const filePath = path.join(app.getPath('downloads'), filename);
    XLSX.writeFile(wb, filePath);
    
    return { success: true, path: filePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-pdf', async (event, htmlContent, filename) => {
  try {
    const jsPDF = require('jspdf').jsPDF;
    const html2canvas = require('html2canvas');
    
    const canvas = await html2canvas(htmlContent);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    const filePath = path.join(app.getPath('downloads'), filename);
    pdf.save(filePath);
    
    return { success: true, path: filePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// App events
app.on('ready', () => {
  initDatabase();
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Create menu
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About wealthyBIZ',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About wealthyBIZ Accounting',
              message: 'wealthyBIZ Accounting v1.0',
              detail: 'Open source accounting software for Indian businesses'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
