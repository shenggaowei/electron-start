/**
 * 主进程
 */

// app 控制应用程序的事件生命周期
// BrowserWindow 创建和管理应用程序窗口
const { app, Menu, BrowserWindow, nativeTheme, ipcMain, dialog } = require("electron/main");
const path = require("node:path");

function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      // 预加载（preload）脚本包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => win.webContents.send("update-counter", 1),
          label: "Increment",
        },
        {
          click: () => win.webContents.send("update-counter", -1),
          label: "Decrement",
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  win.loadFile("index.html");
};

ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});

// 在 Electron 中，只有在 app 模块的 ready 事件触发后才能创建 BrowserWindows 实例。
app.whenReady().then(() => {
  ipcMain.on("set-title", handleSetTitle);
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value);
  });
  ipcMain.handle("dialog:openFile", handleFileOpen);

  createWindow();
  // ipcMain 通信，设置主进程处理程序
  ipcMain.handle("ping", () => "pong");

  // 没有窗口打开，则打开一个窗口（macOS)
  // 当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  // 如果用户不是在 macOS 上运行程序，退出程序
  if (process.platform !== "darwin") {
    app.quit();
  }
});
