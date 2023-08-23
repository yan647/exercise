const { contextBridge, ipcRenderer } = require('electron');

// contextBridge 接口定义 全局对象。
contextBridge.exposeInMainWorld('electronAPI', { // todo
  setTitle: (title) => ipcRenderer.send('set-title', title),
});

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  /**
   * 永远不要通过预加载直接暴露整个 ipcRenderer 模块，
   * 这将使得你的渲染器能够直接向主进程发送任意的 IPC 信息，会使得其成为恶意代码最强有力的攻击媒介。
   * */
  ping: () => ipcRenderer.invoke('ping'), // 发送器
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
