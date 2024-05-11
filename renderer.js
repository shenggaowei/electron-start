/**
 * 渲染进程
 */
const information = document.getElementById("info");
const setButton = document.getElementById("btn");
const getFileBtn = document.getElementById("btn2");
const titleInput = document.getElementById("title");
const filePathElement = document.getElementById("filePath");
const counter = document.getElementById("counter");

information.innerText = `This app is using chrome (v${window.versions.chrome()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};

setButton.addEventListener("click", () => {
  const title = titleInput.value;
  // 渲染进程调用主进程方法
  window.electronAPI.setTitle(title);
});

getFileBtn.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});

// 主进程向渲染进程通信通过回调的方式
window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue.toString();
  window.electronAPI.counterValue(newValue);
});

document.getElementById("toggle-dark-mode").addEventListener("click", async () => {
  const isDarkMode = await window.darkMode.toggle();
  document.getElementById("theme-source").innerHTML = isDarkMode ? "Dark" : "Light";
});

document.getElementById("reset-to-system").addEventListener("click", async () => {
  await window.darkMode.system();
  document.getElementById("theme-source").innerHTML = "System";
});

func();
