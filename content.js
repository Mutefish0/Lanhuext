function execute(filePath) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(filePath);
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

execute("./webpackhook.js");
execute("./mg-file.js");
execute("./ui.js");
