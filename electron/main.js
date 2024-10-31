const { app, BrowserWindow, ipcMain, clipboard, globalShortcut } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Watch clipboard changes
  let lastClipboardContent = clipboard.readText();
  setInterval(() => {
    const newContent = clipboard.readText();
    if (newContent !== lastClipboardContent) {
      lastClipboardContent = newContent;
      mainWindow.webContents.send('clipboard-change', {
        type: 'text',
        content: newContent,
        timestamp: Date.now(),
      });
    }

    const image = clipboard.readImage();
    if (!image.isEmpty()) {
      const imageData = image.toDataURL();
      mainWindow.webContents.send('clipboard-change', {
        type: 'image',
        content: imageData,
        timestamp: Date.now(),
      });
    }
  }, 1000);
};

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register('CommandOrControl+Shift+V', () => {
    mainWindow.show();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('pin-item', (event, item) => {
  const pinnedItems = store.get('pinnedItems') || [];
  store.set('pinnedItems', [...pinnedItems, item]);
});

ipcMain.on('unpin-item', (event, timestamp) => {
  const pinnedItems = store.get('pinnedItems') || [];
  store.set('pinnedItems', pinnedItems.filter(item => item.timestamp !== timestamp));
});