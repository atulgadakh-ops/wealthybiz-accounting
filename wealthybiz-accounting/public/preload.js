const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Database operations
  dbQuery: (sql, params) => ipcRenderer.invoke('db-query', sql, params),
  dbRun: (sql, params) => ipcRenderer.invoke('db-run', sql, params),
  
  // Export operations
  exportExcel: (data, filename) => ipcRenderer.invoke('export-excel', data, filename),
  savePDF: (html, filename) => ipcRenderer.invoke('save-pdf', html, filename),
  
  // File operations
  selectFile: () => ipcRenderer.invoke('select-file'),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  
  // App info
  getAppPath: () => ipcRenderer.invoke('get-app-path')
});
