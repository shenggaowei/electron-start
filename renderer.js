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
  console.log("执行了");
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
});

getFileBtn.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue.toString();
  window.electronAPI.counterValue(newValue);
});

func();
