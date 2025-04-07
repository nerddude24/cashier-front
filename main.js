const { app, BrowserWindow } = require('electron');
const path = require('path');
const { isColonToken } = require('typescript');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'public/icon_transparent.ico'),
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.loadURL('http://localhost:3000'); // رابط Next.js
  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});