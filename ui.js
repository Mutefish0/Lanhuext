window.uploadCDNInit = function () {
  const btnCon = document.querySelector(".right-export-bar");
  const preview = document.querySelector(".preview");
  preview.style["gridArea"] = "auto";
  const btn = document.createElement("button");
  btn.setAttribute(
    "class",
    "export-button m-button m-button--xs m-button--highlight"
  );
  btn.style.marginTop = "8px";
  btn.innerHTML = '<span class="m-button__content"> 导出到CDN </span>';
  btn.onclick = function () {
    execute("./export.js");
  };
  btnCon.insertBefore(btn, preview);
};
