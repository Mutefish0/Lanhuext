function execute(src, isFile) {
  const internalSrc = `(function () {${src}})();`;
  if (isFile) {
    const url = chrome.runtime.getURL(src);
    eval(`
  const script = document.createElement("script");
  script.src = ${JSON.stringify(url)};
  document.documentElement.appendChild(script);
`);
  } else {
    eval(`
  const script = document.createElement("script");
  script.innerText = ${JSON.stringify(internalSrc)};
  document.documentElement.appendChild(script);
`);
  }
}

function registerWebpackJsonpCallback(chunkId, cb) {
  const cbStr = cb.toString();
  execute(`
    window.registerWebpackJsonpCallback(${JSON.stringify(chunkId)}, ${cbStr})
  `);
}

function coreInit() {
  const core = `
  const utils = {
    str2fn: function (str) {
      return new Function("return " + str)();
    },

    stringify: function (ast) {
      if (ast.children.length > 0) {
        const childChunks = [];
        for (let child of ast.children) {
          childChunks.push(utils.stringify(child));
        }
        let ret = ast.wraps[0] || "";
        for (let i = 0; i < childChunks.length; i++) {
          ret += childChunks[i];
          ret += ast.wraps[i + 1] || "";
        }
        return ret;
      } else {
        return ast.body;
      }
    },

    parse: function parse(str, startIndex) {
      const validTokens = {
        "{": "}",
        "[": "]",
        "(": ")",
      };

      const root = {
        type: "root",
        children: [],
        parent: null,
      };

      const stack = [];

      let current = root;

      let i = startIndex || 0;

      let strOpen = false;

      while ((stack.length > 0 || root.children.length === 0) && i < str.length) {
        const ch = str[i];
        const head = stack[stack.length - 1];

        if (strOpen) {
          if (ch === '"') {
            strOpen = false;
          }
        } else if (validTokens[ch]) {
          current = {
            type: ch,
            children: [],
            wraps: [],
            parent: current,
            startIndex: i,
          };
          stack.push(ch);
        } else if (ch === validTokens[head]) {
          const parent = current.parent;

          current.body = str.slice(current.startIndex, i + 1);
          current.endIndex = i;

          if (current.children.length > 0) {
            const splitIndices = [current.startIndex - 1];
            for (let child of current.children) {
              splitIndices.push(child.startIndex);
              splitIndices.push(child.endIndex);
            }
            splitIndices.push(current.endIndex + 1);
            for (let i = 0; i < splitIndices.length; i += 2) {
              current.wraps.push(
                str.slice(splitIndices[i] + 1, splitIndices[i + 1])
              );
            }
          } else {
            current.wraps.push(current.type);
            current.wraps.push(validTokens[current.type]);
          }

          delete current.parent;
          parent.children.push(current);
          current = parent;
          stack.pop();
        } else if (ch === '"') {
          strOpen = true;
        }
        i++;
      }
      return root.children[0];
    },
  };
  const callbacks = {};
  window.registerWebpackJsonpCallback = function (chunkId, cb) {
    callbacks[chunkId] = cb;
  };
  window.webpackJsonp = [
  [
    ["webpack_install_hook"],
    {
      webpack_install_hook: function () {
        const p = window.webpackJsonp.push;
        window.webpackJsonp.push = function (x) {
          const chunkId = x[0][0];
          const modules = x[1];
          if (callbacks[chunkId]) {
            x[1] = callbacks[chunkId](modules, utils);
          }
          p(x);
        };
      },
    },
    [["webpack_install_hook"]],
  ],
];
  `;

  execute(core);
}

coreInit();

registerWebpackJsonpCallback("app", function (modules, utils) {
  for (let key in modules) {
    let modStr = modules[key].toString();
    let match;
    if ((match = /getImageName\((\w)\){/.exec(modStr))) {
      const index = match.index + match[0].length - 1;
      const ast = utils.parse(modStr, index);
      const { startIndex, endIndex } = ast;
      ast.wraps[0] = ast.wraps[0].replace(
        "{",
        `{if(arguments[0].image.name){ return arguments[0].image.name; }`
      );

      const modified = utils.stringify(ast);

      modStr =
        modStr.slice(0, startIndex) + modified + modStr.slice(endIndex + 1);

      modules[key] = utils.str2fn(modStr);
    }
  }

  return modules;
});

registerWebpackJsonpCallback("common-components", function (modules, utils) {
  for (let key in modules) {
    let modStr = modules[key].toString();

    if (/right-export-bar/.test(modStr)) {
      const arrStartIndex =
        modStr.indexOf('right-export-bar"') + 'right-export-bar"'.length;
      const ast = utils.parse(modStr, arrStartIndex);

      console.log(ast);

      const { startIndex, endIndex } = ast;
      const [_, preview] = ast.children;

      preview.children[0].body = JSON.stringify({
        staticClass: "preview",
        style: {
          gridArea: "auto",
        },
      });

      ast.children.unshift({
        body: `
        (
          "MButton",
          {
            staticClass: "export-button_1",
            attrs: {
              type: "highlight",
              size: "xs",
              tabindex: "0",
              asyncClick: this.exportAndUpload,
            },
            style: {
              marginBottom: "8px",
            },
            nativeOn: {
              mouseup: function (e) {
                e.stopPropagation();
              },
            },
          },
          [[this._v("导出到CDN")]],
          2
        )
        `,
        children: [],
      });

      ast.wraps.splice(1, 0, "," + ast.wraps[0].slice(1));

      const modified = utils.stringify(ast);

      modStr =
        modStr.slice(0, startIndex) + modified + modStr.slice(endIndex + 1);

      modules[key] = utils.str2fn(modStr);
    } else if (/getExportList\(\){/.test(modStr)) {
      function exportAndUpload() {
        const toast = this.$toast({
          content: "正在上传",
          persistent: !0,
          disabledTransition: !0,
          position: "bottom",
        });
        const file = this.getExportList()[0];
        const formData = new FormData();
        formData.append("quality", "0.6-0.8");
        formData.append("file", new Blob([file.buffer]), "export.png");

        fetch("https://growth-bi-service-fe.in.taou.com/upload/cdn/", {
          method: "POST",
          body: formData,
        }).then((resp) => {
          resp.json().then((data) => {
            toast.clearToast();
            navigator.clipboard.writeText(data.file).then(() => {
              this.$toast({
                content: "上传成功，已复制 URL 到剪切板",
                position: "bottom",
              });
            });
          });
        });
        fetch(
          "https://maimai.cn/n/platform/api/public/news?e=lanhu_upload_cdn"
        ).catch((e) => {});
      }

      const classStartIndex = modStr.indexOf("constructor()") - 1;
      const ast = utils.parse(modStr, classStartIndex);

      const { startIndex, endIndex } = ast;

      ast.wraps[ast.wraps.length - 1] =
        exportAndUpload.toString().replace(/^function/, "") + "}";

      const modified = utils.stringify(ast);

      modStr =
        modStr.slice(0, startIndex) + modified + modStr.slice(endIndex + 1);

      modules[key] = utils.str2fn(modStr);
    }
  }

  return modules;
});
