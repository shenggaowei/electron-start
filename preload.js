/**
 * 预处理脚本
 */

const { contextBridge, ipcRenderer } = require("electron/renderer");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 在预处理脚本中暴露一个被称为 ipcRenderer.invoke 的函数来触发该处理程序（handler）。异步的。
  ping: () => ipcRenderer.invoke("ping"),
});

// 预加载脚本处理暴露接口
contextBridge.exposeInMainWorld("electronAPI", {
  // send 同步的
  setTitle: (title) => ipcRenderer.send("set-title", title),
});
