function execute(filePath) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(filePath);
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

execute("./webpackhook.js");
execute("./mg-file.js");
execute("./ui.js");

// function onShow(selector, cb) {
//   let visible = false;
//   setInterval(() => {
//     const el = document.querySelector(selector);
//     if (!visible && el) {
//       visible = true;
//       cb(el);
//     } else if (visible && !el) {
//       visible = false;
//     }
//   }, 400);
// }

// function run() {
//   onShow(".right-export-bar", () => {
//     const btnCon = document.querySelector(".right-export-bar");
//     const preview = document.querySelector(".preview");
//     preview.style["gridArea"] = "auto";
//     const btn = document.createElement("button");
//     btn.setAttribute(
//       "class",
//       "export-button m-button m-button--xs m-button--highlight"
//     );
//     btn.style.marginTop = "8px";
//     btn.innerHTML = '<span class="m-button__content"> 导出到CDN </span>';
//     btn.onclick = function () {
//       execute("./export.js");
//     };
//     btnCon.insertBefore(btn, preview);
//   });
// }

// window.addEventListener("load", run);
