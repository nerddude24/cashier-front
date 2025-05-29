const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const express = require('express');
const next = require('next');

let win = null;
let server = null;

// 🧠 إعداد السيرفر المحلي
async function createServer() {
  const dev = false;
  const port = process.env.PORT || 3000;
  const nextApp = next({ dev, dir: __dirname, distDir: '.next' });

  await nextApp.prepare();
  const handle = nextApp.getRequestHandler();
  const expressApp = express();

  expressApp.use('/_next', express.static(path.join(__dirname, '.next')));
  expressApp.use(express.static(path.join(__dirname, 'public')));
  expressApp.all('*', (req, res) => handle(req, res));

  server = expressApp.listen(port, err => {
    if (err) throw err;
    console.log(`🚀 Server running on http://localhost:${port}`);
  });

  return port;
}

// 🪟 إنشاء نافذة التطبيق
async function createWindow() {
  const port = await createServer();

  win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'build/supermarketLogo.ico'),
    title: 'Supermarket App',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // ✅ استدعاء preload
    }
  });

  await win.loadURL(`http://localhost:${port}`);

  win.once('ready-to-show', () => {
    win.show();
    // أرسل نسخة التطبيق بعد التحميل
    win.webContents.send('app-version', app.getVersion());
  });

  // اختصار ملء الشاشة
  globalShortcut.register('CommandOrControl+F', () => {
    if (win) {
      const isFull = win.isFullScreen();
      win.setFullScreen(!isFull);
      win.setMenuBarVisibility(!isFull);
    }
  });

  win.on('closed', () => {
    win = null;
    if (server) server.close();
  });
}

// 🧩 معالجة أحداث النظام
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (server) server.close();
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  if (server) server.close();
});

// ⚡️ قناة IPC
ipcMain.on('toggle-fullscreen', () => {
  if (win) {
    const isFull = win.isFullScreen();
    win.setFullScreen(!isFull);
    win.setMenuBarVisibility(!isFull);
  }
});
