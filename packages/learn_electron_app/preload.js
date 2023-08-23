const { contextBridge, ipcRenderer } = require('electron');

// contextBridge 接口定义 全局对象。
contextBridge.exposeInMainWorld('electronAPI', { // todo
  setTitle: (title) => ipcRenderer.send('set-title', title),
});

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
