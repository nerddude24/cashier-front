const { contextBridge, ipcRenderer } = require('electron');

// تعريض API آمنة فقط
contextBridge.exposeInMainWorld('electronAPI', {
  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
  onAppVersion: (callback) => ipcRenderer.on('app-version', (event, version) => callback(version))
});
