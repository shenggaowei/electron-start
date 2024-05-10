/**
 * 渲染进程
 */
const information = document.getElementById("info");
const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");

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

func();
