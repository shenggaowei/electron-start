/**
 * 渲染进程
 */
const information = document.getElementById("info");
console.log(window.versions);
information.innerText = `This app is using chrome (v${window.versions.chrome()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};

func();
