/**
 * app，它是您应用程序的事件生命周期。
 * BrowserWindow，它负责创建和管理应用窗口。
 */
const {
  app, BrowserWindow, ipcMain, dialog, Menu,
} = require('electron');
const path = require('path');

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
}

// createWindow函数将您的页面加载到新的 BrowserWindow 实例中
const createWindow = () => {
  const mainWindow = new BrowserWindow({ // 创建并控制浏览器窗口
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 将脚本附在渲染进程上
    },
  });

  const menu = Menu.buildFromTemplate([{
    label: app.name,
    submenu: [
      {
        label: 'Increment',
        click: () => mainWindow.webContents.send('update-counter', 1),
      },
      {
        label: 'Decrement',
        click: () => mainWindow.webContents.send('update-counter', -1),
      },
    ],
  }]);

  Menu.setApplicationMenu(menu);

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;// 接收preload.js中ipcRenderer.send发送的内容
    const win = BrowserWindow.fromWebContents(webContents);// 返回拥有给定webContents的窗口
    win.setTitle(title);
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();// 打开devTools
};

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');// 监听器，接收器
  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.on('counter-value', (_event, value) => {
    console.log('counter-value', value);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

console.log('hello world!');
