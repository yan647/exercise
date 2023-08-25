const setButton = document.getElementById('btn');
const titleInput = document.getElementById('title');
const openFileBtn = document.getElementById('openFileBtn');
const filePathEle = document.getElementById('filePath');

setButton.addEventListener('click', () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
});

openFileBtn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile();
  filePathEle.innerText = filePath;
});

const versionInfo = document.getElementById('versionInfo');
versionInfo.innerText = `本应用正在使用:
Chrome(v${window.versions.chrome()}),
Node(v${window.versions.node()}),
Electron(v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();// 从渲染器发送到主进程
  console.log(response);
};

func();
