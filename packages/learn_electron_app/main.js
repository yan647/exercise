/**
 * app，它是应用程序的事件生命周期。
 * BrowserWindow，它负责创建和管理应用窗口。
 */
const {
  app, BrowserWindow, ipcMain, dialog, Menu, screen,
} = require('electron');
const path = require('path');

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
}

export const OS = {
  Windows: 'win32',
  Mac: 'darwin',
};

export function byOS(handlers) {
  const handler = handlers[process.platform];
  if (typeof handler === 'function') return handler();
  return handler;
}

let mainWindow;
let shutdownStarted = false;

// createWindow函数将您的页面加载到新的 BrowserWindow 实例中
const createWindow = () => {
  mainWindow = new BrowserWindow({ // 创建并控制浏览器窗口
    width: 800,
    height: 800,
    frame: false, // 默认值为true。false表示创建无边框窗口
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

  mainWindow.on('close', () => {
    if (!shutdownStarted) {
      shutdownStarted = true;
    }
  });

  // 获取当前屏幕的缩放比，Mac和Windows使用的函数也不同
  const getScaleFactor = () => {
    let scaleFactor = 1;
    const bounds = byOS({
      [OS.Windows]: () => screen.dipToScreenRect(mainWindow, mainWindow.getBounds()),
      [OS.Mac]: () => mainWindow.getBounds(),
    });
    const currentDisplay = screen.getDisplayMatching(bounds);
    scaleFactor = currentDisplay.scaleFactor;
    return scaleFactor;
  };

  const getScaleFactor2 = () => {
    const point = screen.getCursorScreenPoint();
    const primaryDisplay = screen.getDisplayNearestPoint(point);
    const { scaleFactor } = primaryDisplay;
  };

  const getScaleFactor3 = () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { scaleFactor } = primaryDisplay;
  };

  const getScaleFactor4 = () => window.devicePixelRatio;
};

// electron初始化完成
app.whenReady().then(() => {
  // ipcMain 从主进程到渲染进程的异步通信
  ipcMain.handle('ping', () => 'pong');// 监听器，接收器，当渲染进程ipcRenderer.invoke时会到handle这里
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

// 第二个实例被执行时
app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.focus();
  } else if (!shutdownStarted) {
    // This instance is a zombie and we should shut down.
    app.exit();
  }
});

console.log('hello world!');
