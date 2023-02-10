function vuehook(target) {
  // Handle apps initialized before hook injection
  if (target.__VUE_DEVTOOLS_HOOK_REPLAY__) {
    try {
      target.__VUE_DEVTOOLS_HOOK_REPLAY__.forEach((cb) => cb(hook));
      target.__VUE_DEVTOOLS_HOOK_REPLAY__ = [];
    } catch (e) {
      console.error("[vue-devtools] Error during hook replay", e);
    }
  }
  let listeners = {};

  const hook = {
    devtoolsVersion: "6.0",
    Vue: null,
    enabled: undefined,
    _buffer: [],
    _bufferMap: new Map(),
    _bufferToRemove: new Map(),
    store: null,
    initialState: null,
    storeModules: null,
    flushStoreModules: null,
    apps: [],

    _replayBuffer(event) {
      const buffer = this._buffer;
      this._buffer = [];
      this._bufferMap.clear();
      this._bufferToRemove.clear();

      for (let i = 0, l = buffer.length; i < l; i++) {
        const allArgs = buffer[i].slice(1);
        allArgs[0] === event
          ? // eslint-disable-next-line prefer-spread
            this.emit.apply(this, allArgs)
          : this._buffer.push(buffer[i]);
      }
    },

    on(event, fn) {
      const $event = "$" + event;
      if (listeners[$event]) {
        listeners[$event].push(fn);
      } else {
        listeners[$event] = [fn];
        this._replayBuffer(event);
      }
    },

    once(event, fn) {
      const on = (...args) => {
        this.off(event, on);
        return fn.apply(this, args);
      };
      this.on(event, on);
    },

    off(event, fn) {
      event = "$" + event;
      if (!arguments.length) {
        listeners = {};
      } else {
        const cbs = listeners[event];
        if (cbs) {
          if (!fn) {
            listeners[event] = null;
          } else {
            for (let i = 0, l = cbs.length; i < l; i++) {
              const cb = cbs[i];
              if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
              }
            }
          }
        }
      }
    },

    emit(event, ...args) {
      const $event = "$" + event;
      let cbs = listeners[$event];
      if (cbs) {
        cbs = cbs.slice();
        for (let i = 0, l = cbs.length; i < l; i++) {
          try {
            const result = cbs[i].apply(this, args);
            if (typeof result?.catch === "function") {
              result.catch((e) => {
                console.error(
                  `[Hook] Error in async event handler for ${event} with args:`,
                  args
                );
                console.error(e);
              });
            }
          } catch (e) {
            console.error(
              `[Hook] Error in event handler for ${event} with args:`,
              args
            );
            console.error(e);
          }
        }
      } else {
        const buffered = [Date.now(), event, ...args];
        this._buffer.push(buffered);

        for (let i = 2; i < args.length; i++) {
          if (typeof args[i] === "object" && args[i]) {
            // Save by component instance  (3rd, 4th or 5th arg)
            this._bufferMap.set(args[i], buffered);
            break;
          }
        }
      }
    },

    /**
     * Remove buffered events with any argument that is equal to the given value.
     * @param matchArg Given value to match.
     */
    cleanupBuffer(matchArg) {
      const inBuffer = this._bufferMap.has(matchArg);
      if (inBuffer) {
        // Mark event for removal
        this._bufferToRemove.set(this._bufferMap.get(matchArg), true);
      }
      return inBuffer;
    },

    _cleanupBuffer() {
      const now = Date.now();
      // Clear buffer events that are older than 10 seconds or marked for removal
      this._buffer = this._buffer.filter(
        (args) => !this._bufferToRemove.has(args) && now - args[0] < 10_000
      );
      this._bufferToRemove.clear();
      this._bufferMap.clear();
    },
  };

  setInterval(() => {
    hook._cleanupBuffer();
  }, 10_000);

  hook.once("init", (Vue) => {
    console.log("hook init!!");

    hook.Vue = Vue;

    if (Vue) {
      Vue.prototype.$inspect = function () {
        const fn = target.__VUE_DEVTOOLS_INSPECT__;
        fn && fn(this);
      };
    }
  });

  hook.on("app:init", (app, version, types) => {
    const appRecord = {
      app,
      version,
      types,
    };
    hook.apps.push(appRecord);
    hook.emit("app:add", appRecord);
  });

  hook.once("vuex:init", (store) => {
    hook.store = store;
    hook.initialState = clone(store.state);
    const origReplaceState = store.replaceState.bind(store);
    store.replaceState = (state) => {
      hook.initialState = clone(state);
      origReplaceState(state);
    };
    // Dynamic modules
    let origRegister, origUnregister;
    if (store.registerModule) {
      hook.storeModules = [];
      origRegister = store.registerModule.bind(store);
      store.registerModule = (path, module, options) => {
        if (typeof path === "string") path = [path];
        hook.storeModules.push({ path, module, options });
        origRegister(path, module, options);
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.log("early register module", path, module, options);
        }
      };
      origUnregister = store.unregisterModule.bind(store);
      store.unregisterModule = (path) => {
        if (typeof path === "string") path = [path];
        const key = path.join("/");
        const index = hook.storeModules.findIndex(
          (m) => m.path.join("/") === key
        );
        if (index !== -1) hook.storeModules.splice(index, 1);
        origUnregister(path);
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.log("early unregister module", path);
        }
      };
    }
    hook.flushStoreModules = () => {
      store.replaceState = origReplaceState;
      if (store.registerModule) {
        store.registerModule = origRegister;
        store.unregisterModule = origUnregister;
      }
      return hook.storeModules || [];
    };
  });

  Object.defineProperty(target, "__VUE_DEVTOOLS_GLOBAL_HOOK__", {
    get() {
      return hook;
    },
  });
}

vuehook(window);
