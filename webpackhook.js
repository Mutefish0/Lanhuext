(function (e) {
  if (window["webpackJsonp"]) {
    return;
  }
  function n(n) {
    for (
      var o, r, c = n[0], g = n[1], u = n[2], d = n[3] || [], f = 0, l = [];
      f < c.length;
      f++
    )
      (r = c[f]),
        Object.prototype.hasOwnProperty.call(m, r) && m[r] && l.push(m[r][0]),
        (m[r] = 0);
    for (o in g) Object.prototype.hasOwnProperty.call(g, o) && (e[o] = g[o]);
    h && h(n), i.push.apply(i, d);
    while (l.length) l.shift()();
    return a.push.apply(a, u || []), t();
  }
  function t() {
    for (var e, n = 0; n < a.length; n++) {
      for (var t = a[n], o = !0, r = 1; r < t.length; r++) {
        var g = t[r];
        0 !== m[g] && (o = !1);
      }
      o && (a.splice(n--, 1), (e = d((d.s = t[0]))));
    }
    return (
      0 === a.length &&
        (i.forEach(function (e) {
          if (void 0 === m[e]) {
            m[e] = null;
            var n = document.createElement("link");
            d.nc && n.setAttribute("nonce", d.nc),
              (n.rel = "prefetch"),
              (n.as = "script"),
              (n.href = c(e)),
              document.head.appendChild(n);
          }
        }),
        (i.length = 0)),
      e
    );
  }
  var o = {},
    r = {
      runtime: 0,
    },
    m = {
      runtime: 0,
    },
    a = [],
    i = [];
  function c(e) {
    return (
      d.p +
      "static/js/" +
      ({
        "mg-common": "mg-common",
        "mg-embed": "mg-embed",
        "mg-figma": "mg-figma",
        "mg-invite-team": "mg-invite-team",
        "mg-login": "mg-login",
        "mg-mirror": "mg-mirror",
        "mg-navigate-out": "mg-navigate-out",
        "mg-prototype": "mg-prototype",
        "mg-preview": "mg-preview",
        "mg-share-middle": "mg-share-middle",
        "vendors~mg-file": "vendors~mg-file",
        "mg-file": "mg-file",
        "vendors~mg-image-tool": "vendors~mg-image-tool",
        "mg-image-tool": "mg-image-tool",
        "vendors~mg-main": "vendors~mg-main",
        "mg-main": "mg-main",
        "vendors~mg-oss-tool": "vendors~mg-oss-tool",
        "mg-animation": "mg-animation",
        "mobile-signupguide": "mobile-signupguide",
      }[e] || e) +
      "." +
      {
        "chunk-52835c86": "90607349",
        "mg-common": "b75de546",
        "mg-embed": "af2b8c6d",
        "mg-figma": "6d788847",
        "mg-invite-team": "70618fa7",
        "mg-login": "054d61ba",
        "mg-mirror": "212535ad",
        "mg-navigate-out": "8dd15330",
        "mg-prototype": "c6f88342",
        "mg-preview": "c7cfb9f8",
        "mg-share-middle": "395af9ee",
        "vendors~mg-file": "635d0053",
        "mg-file": "ab84e81a",
        "vendors~mg-image-tool": "3b4156e2",
        "mg-image-tool": "76a8784d",
        "vendors~mg-main": "dd4f8474",
        "mg-main": "c3189885",
        "vendors~mg-oss-tool": "498e0aac",
        "chunk-2d0f08c9": "347f2ace",
        "chunk-4f4741f6": "0be58244",
        "chunk-674b69f2": "f24233f6",
        "chunk-19a4975c": "5fc09e3b",
        "chunk-6ef91bab": "e491d982",
        "chunk-7c2d5252": "24f1cbf9",
        "chunk-7eb88820": "4375aa3f",
        "chunk-953ff80a": "e1fcf42b",
        "chunk-d5d99076": "806d4308",
        "chunk-473db15e": "2b93be1d",
        "chunk-3a3647be": "3f96e025",
        "chunk-3b9e2eca": "43c6954d",
        "chunk-75758bda": "663b5a75",
        "chunk-0ba4e76e": "251e5287",
        "chunk-2d0a43cc": "49266fa8",
        "chunk-2d2223c5": "fcc15950",
        "chunk-319cb479": "39cc2f49",
        "chunk-391800e8": "5976dfef",
        "chunk-64fb5e79": "9bd1d962",
        "mg-animation": "c76bea07",
        "mobile-signupguide": "3388ac11",
      }[e] +
      ".js"
    );
  }
  if ("function" === typeof c) {
    var g = c;
    function u() {
      try {
        if ("function" !== typeof replaceSrc)
          throw new Error(
            "WebpackRequireFrom: 'replaceSrc' is not a function or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting"
          );
        var e = replaceSrc(g.apply(this, arguments));
        if (!e || "string" !== typeof e)
          throw new Error(
            "WebpackRequireFrom: 'replaceSrc' does not return string. See https://github.com/agoldis/webpack-require-from#troubleshooting"
          );
        return e;
      } catch (n) {
        return console.error(n), g.apply(this, arguments);
      }
    }
    c = u;
  }
  function d(n) {
    if (o[n]) return o[n].exports;
    var t = (o[n] = {
      i: n,
      l: !1,
      exports: {},
    });

    const fnStr = o[n].toString();

    if (/Vue\.js v2\.6\.12/.test(fnStr.slice(0, 100))) {
      fnStr = fnStr.replace("devtools:!1", "devtools:1");
      o[n] = new Function(`return ${fnStr}`)();
    }

    return e[n].call(t.exports, t, t.exports, d), (t.l = !0), t.exports;
  }
  (d.e = function (e) {
    var n = [],
      t = {
        "chunk-52835c86": 1,
        "mg-common": 1,
        "mg-embed": 1,
        "mg-invite-team": 1,
        "mg-login": 1,
        "mg-mirror": 1,
        "mg-navigate-out": 1,
        "mg-prototype": 1,
        "mg-preview": 1,
        "mg-share-middle": 1,
        "vendors~mg-file": 1,
        "mg-file": 1,
        "vendors~mg-main": 1,
        "mg-main": 1,
        "chunk-4f4741f6": 1,
        "chunk-19a4975c": 1,
        "chunk-6ef91bab": 1,
        "chunk-7c2d5252": 1,
        "chunk-7eb88820": 1,
        "chunk-953ff80a": 1,
        "chunk-d5d99076": 1,
        "chunk-473db15e": 1,
        "chunk-3a3647be": 1,
        "chunk-3b9e2eca": 1,
        "chunk-75758bda": 1,
        "chunk-0ba4e76e": 1,
        "chunk-319cb479": 1,
        "chunk-391800e8": 1,
        "chunk-64fb5e79": 1,
        "mg-animation": 1,
        "mobile-signupguide": 1,
      };
    r[e]
      ? n.push(r[e])
      : 0 !== r[e] &&
        t[e] &&
        n.push(
          (r[e] = new Promise(function (n, t) {
            for (
              var o =
                  "static/css/" +
                  ({
                    "mg-common": "mg-common",
                    "mg-embed": "mg-embed",
                    "mg-figma": "mg-figma",
                    "mg-invite-team": "mg-invite-team",
                    "mg-login": "mg-login",
                    "mg-mirror": "mg-mirror",
                    "mg-navigate-out": "mg-navigate-out",
                    "mg-prototype": "mg-prototype",
                    "mg-preview": "mg-preview",
                    "mg-share-middle": "mg-share-middle",
                    "vendors~mg-file": "vendors~mg-file",
                    "mg-file": "mg-file",
                    "vendors~mg-image-tool": "vendors~mg-image-tool",
                    "mg-image-tool": "mg-image-tool",
                    "vendors~mg-main": "vendors~mg-main",
                    "mg-main": "mg-main",
                    "vendors~mg-oss-tool": "vendors~mg-oss-tool",
                    "mg-animation": "mg-animation",
                    "mobile-signupguide": "mobile-signupguide",
                  }[e] || e) +
                  "." +
                  {
                    "chunk-52835c86": "da016b3a",
                    "mg-common": "735fb30b",
                    "mg-embed": "547cd35c",
                    "mg-figma": "31d6cfe0",
                    "mg-invite-team": "99f5b297",
                    "mg-login": "439f7e68",
                    "mg-mirror": "063f6894",
                    "mg-navigate-out": "4ca538ce",
                    "mg-prototype": "a6a6d5ac",
                    "mg-preview": "370dd6de",
                    "mg-share-middle": "230bf7f8",
                    "vendors~mg-file": "70fdb878",
                    "mg-file": "e53319d5",
                    "vendors~mg-image-tool": "31d6cfe0",
                    "mg-image-tool": "31d6cfe0",
                    "vendors~mg-main": "70fdb878",
                    "mg-main": "e74b9b0b",
                    "vendors~mg-oss-tool": "31d6cfe0",
                    "chunk-2d0f08c9": "31d6cfe0",
                    "chunk-4f4741f6": "1a554cab",
                    "chunk-674b69f2": "31d6cfe0",
                    "chunk-19a4975c": "45649778",
                    "chunk-6ef91bab": "95196642",
                    "chunk-7c2d5252": "249632fc",
                    "chunk-7eb88820": "aaf1b057",
                    "chunk-953ff80a": "70564124",
                    "chunk-d5d99076": "dd3f677d",
                    "chunk-473db15e": "e998545f",
                    "chunk-3a3647be": "8eb156cb",
                    "chunk-3b9e2eca": "0116b991",
                    "chunk-75758bda": "c89be9d2",
                    "chunk-0ba4e76e": "2ec77174",
                    "chunk-2d0a43cc": "31d6cfe0",
                    "chunk-2d2223c5": "31d6cfe0",
                    "chunk-319cb479": "ffcec75f",
                    "chunk-391800e8": "1262b3b9",
                    "chunk-64fb5e79": "aa5b3680",
                    "mg-animation": "9bb27842",
                    "mobile-signupguide": "a5088999",
                  }[e] +
                  ".css",
                m = d.p + o,
                a = document.getElementsByTagName("link"),
                i = 0;
              i < a.length;
              i++
            ) {
              var c = a[i],
                g = c.getAttribute("data-href") || c.getAttribute("href");
              if ("stylesheet" === c.rel && (g === o || g === m)) return n();
            }
            var u = document.getElementsByTagName("style");
            for (i = 0; i < u.length; i++) {
              (c = u[i]), (g = c.getAttribute("data-href"));
              if (g === o || g === m) return n();
            }
            var f = document.createElement("link");
            (f.rel = "stylesheet"),
              (f.type = "text/css"),
              (f.onload = n),
              (f.onerror = function (n) {
                var o = (n && n.target && n.target.src) || m,
                  a = new Error(
                    "Loading CSS chunk " + e + " failed.\n(" + o + ")"
                  );
                (a.code = "CSS_CHUNK_LOAD_FAILED"),
                  (a.request = o),
                  delete r[e],
                  f.parentNode.removeChild(f),
                  t(a);
              }),
              (f.href = m);
            var l = document.getElementsByTagName("head")[0];
            l.appendChild(f);
          }).then(function () {
            r[e] = 0;
          }))
        );
    var o = m[e];
    if (0 !== o)
      if (o) n.push(o[2]);
      else {
        var a = new Promise(function (n, t) {
          o = m[e] = [n, t];
        });
        n.push((o[2] = a));
        var i,
          g = document.createElement("script");
        (g.charset = "utf-8"),
          (g.timeout = 120),
          d.nc && g.setAttribute("nonce", d.nc),
          (g.src = c(e));
        var u = new Error();
        i = function (n) {
          (g.onerror = g.onload = null), clearTimeout(f);
          var t = m[e];
          if (0 !== t) {
            if (t) {
              var o = n && ("load" === n.type ? "missing" : n.type),
                r = n && n.target && n.target.src;
              (u.message =
                "Loading chunk " + e + " failed.\n(" + o + ": " + r + ")"),
                (u.name = "ChunkLoadError"),
                (u.type = o),
                (u.request = r),
                t[1](u);
            }
            m[e] = void 0;
          }
        };
        var f = setTimeout(function () {
          i({
            type: "timeout",
            target: g,
          });
        }, 12e4);
        (g.onerror = g.onload = i), document.head.appendChild(g);
      }
    return Promise.all(n);
  }),
    (d.m = e),
    (d.c = o),
    (d.d = function (e, n, t) {
      d.o(e, n) ||
        Object.defineProperty(e, n, {
          enumerable: !0,
          get: t,
        });
    }),
    (d.r = function (e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(e, "__esModule", {
          value: !0,
        });
    }),
    (d.t = function (e, n) {
      if ((1 & n && (e = d(e)), 8 & n)) return e;
      if (4 & n && "object" === typeof e && e && e.__esModule) return e;
      var t = Object.create(null);
      if (
        (d.r(t),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          value: e,
        }),
        2 & n && "string" != typeof e)
      )
        for (var o in e)
          d.d(
            t,
            o,
            function (n) {
              return e[n];
            }.bind(null, o)
          );
      return t;
    }),
    (d.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e["default"];
            }
          : function () {
              return e;
            };
      return d.d(n, "a", n), n;
    }),
    (d.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (d.p = "https://static.mastergo.com/"),
    (d.oe = function (e) {
      throw (console.error(e), e);
    });
  var f = (this["webpackJsonp"] = this["webpackJsonp"] || []),
    l = f.push.bind(f);
  (f.push = n), (f = f.slice());
  for (var s = 0; s < f.length; s++) n(f[s]);
  var h = l;
  t();
})([]);
