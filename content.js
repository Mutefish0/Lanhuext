function execute(filePath) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(filePath);
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

const targetNode = document.documentElement;
const config = { subtree: true, childList: true };

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    for (let node of mutation.addedNodes || []) {
      if (node.nodeName === "SCRIPT") {
        if (/runtime/.test(node.src)) {
          node.src = chrome.runtime.getURL("webpackhook.js");
        }
        node.type = "javascript/blocked";
      }
      if (node.rel === "preload" && /runtime/.test(node.href)) {
        node.href = chrome.runtime.getURL("webpackhook.js");
      }
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 结束观察
// observer.disconnect();

//execute("./ui.js");
