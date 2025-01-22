var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_index = __commonJS({
  "index.js"(exports, module) {
    (function polyfill() {
      const relList = document.createElement("link").relList;
      if (relList && relList.supports && relList.supports("modulepreload")) {
        return;
      }
      for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
      }
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList") {
            continue;
          }
          for (const node of mutation.addedNodes) {
            if (node.tagName === "LINK" && node.rel === "modulepreload")
              processPreload(node);
          }
        }
      }).observe(document, { childList: true, subtree: true });
      function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity) fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === "use-credentials")
          fetchOpts.credentials = "include";
        else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
        else fetchOpts.credentials = "same-origin";
        return fetchOpts;
      }
      function processPreload(link) {
        if (link.ep)
          return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
      }
    })();
    const nlp$1 = {
      sanitize: (str) => {
        return str.toLowerCase().replace(/[^a-z ]/ig, "");
      },
      laplaceSmoothing: (d, f, s) => {
        return Math.log((1 - d) * f + s);
      },
      probability: (text, count, frequencies) => {
        let p2 = 0;
        const d = 0.05;
        const s = d * (1 / count);
        const n = 2;
        text = nlp$1.sanitize(text);
        for (let i = 0; i <= text.length - n; i++) {
          const ngram = text.slice(i, i + n);
          const f = frequencies[ngram] || 0;
          p2 += nlp$1.laplaceSmoothing(d, f, s);
        }
        return p2;
      }
    };
    module.exports = nlp$1;
    /**
    * @vue/shared v3.5.13
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    /*! #__NO_SIDE_EFFECTS__ */
    // @__NO_SIDE_EFFECTS__
    function makeMap(str) {
      const map = /* @__PURE__ */ Object.create(null);
      for (const key of str.split(",")) map[key] = 1;
      return (val) => val in map;
    }
    const EMPTY_OBJ = {};
    const EMPTY_ARR = [];
    const NOOP = () => {
    };
    const NO = () => false;
    const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
    (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
    const isModelListener = (key) => key.startsWith("onUpdate:");
    const extend = Object.assign;
    const remove = (arr, el2) => {
      const i = arr.indexOf(el2);
      if (i > -1) {
        arr.splice(i, 1);
      }
    };
    const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
    const isArray = Array.isArray;
    const isMap = (val) => toTypeString(val) === "[object Map]";
    const isSet = (val) => toTypeString(val) === "[object Set]";
    const isFunction = (val) => typeof val === "function";
    const isString = (val) => typeof val === "string";
    const isSymbol = (val) => typeof val === "symbol";
    const isObject = (val) => val !== null && typeof val === "object";
    const isPromise = (val) => {
      return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
    };
    const objectToString = Object.prototype.toString;
    const toTypeString = (value) => objectToString.call(value);
    const toRawType = (value) => {
      return toTypeString(value).slice(8, -1);
    };
    const isPlainObject = (val) => toTypeString(val) === "[object Object]";
    const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    const isReservedProp = /* @__PURE__ */ makeMap(
      // the leading comma is intentional so empty string "" is also included
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    );
    const cacheStringFunction = (fn2) => {
      const cache = /* @__PURE__ */ Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn2(str));
      };
    };
    const camelizeRE = /-(\w)/g;
    const camelize = cacheStringFunction(
      (str) => {
        return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
      }
    );
    const hyphenateRE = /\B([A-Z])/g;
    const hyphenate = cacheStringFunction(
      (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
    );
    const capitalize = cacheStringFunction((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    const toHandlerKey = cacheStringFunction(
      (str) => {
        const s = str ? `on${capitalize(str)}` : ``;
        return s;
      }
    );
    const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    const invokeArrayFns = (fns, ...arg) => {
      for (let i = 0; i < fns.length; i++) {
        fns[i](...arg);
      }
    };
    const def = (obj, key, value, writable = false) => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        writable,
        value
      });
    };
    const looseToNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
    let _globalThis;
    const getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    function normalizeStyle(value) {
      if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
          if (normalized) {
            for (const key in normalized) {
              res[key] = normalized[key];
            }
          }
        }
        return res;
      } else if (isString(value) || isObject(value)) {
        return value;
      }
    }
    const listDelimiterRE = /;(?![^(]*\))/g;
    const propertyDelimiterRE = /:([^]+)/;
    const styleCommentRE = /\/\*[^]*?\*\//g;
    function parseStringStyle(cssText) {
      const ret = {};
      cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
        if (item) {
          const tmp = item.split(propertyDelimiterRE);
          tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return ret;
    }
    function normalizeClass(value) {
      let res = "";
      if (isString(value)) {
        res = value;
      } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const normalized = normalizeClass(value[i]);
          if (normalized) {
            res += normalized + " ";
          }
        }
      } else if (isObject(value)) {
        for (const name in value) {
          if (value[name]) {
            res += name + " ";
          }
        }
      }
      return res.trim();
    }
    const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    function includeBooleanAttr(value) {
      return !!value || value === "";
    }
    const isRef$1 = (val) => {
      return !!(val && val["__v_isRef"] === true);
    };
    const toDisplayString = (val) => {
      return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
    };
    const replacer = (_key, val) => {
      if (isRef$1(val)) {
        return replacer(_key, val.value);
      } else if (isMap(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce(
            (entries, [key, val2], i) => {
              entries[stringifySymbol(key, i) + " =>"] = val2;
              return entries;
            },
            {}
          )
        };
      } else if (isSet(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
        };
      } else if (isSymbol(val)) {
        return stringifySymbol(val);
      } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    const stringifySymbol = (v, i = "") => {
      var _a;
      return (
        // Symbol.description in es2019+ so we need to cast here to pass
        // the lib: es2016 check
        isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
      );
    };
    /**
    * @vue/reactivity v3.5.13
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    let activeEffectScope;
    class EffectScope {
      constructor(detached = false) {
        this.detached = detached;
        this._active = true;
        this.effects = [];
        this.cleanups = [];
        this._isPaused = false;
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
            this
          ) - 1;
        }
      }
      get active() {
        return this._active;
      }
      pause() {
        if (this._active) {
          this._isPaused = true;
          let i, l;
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].pause();
            }
          }
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].pause();
          }
        }
      }
      /**
       * Resumes the effect scope, including all child scopes and effects.
       */
      resume() {
        if (this._active) {
          if (this._isPaused) {
            this._isPaused = false;
            let i, l;
            if (this.scopes) {
              for (i = 0, l = this.scopes.length; i < l; i++) {
                this.scopes[i].resume();
              }
            }
            for (i = 0, l = this.effects.length; i < l; i++) {
              this.effects[i].resume();
            }
          }
        }
      }
      run(fn2) {
        if (this._active) {
          const currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn2();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        }
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      on() {
        activeEffectScope = this;
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      off() {
        activeEffectScope = this.parent;
      }
      stop(fromParent) {
        if (this._active) {
          this._active = false;
          let i, l;
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].stop();
          }
          this.effects.length = 0;
          for (i = 0, l = this.cleanups.length; i < l; i++) {
            this.cleanups[i]();
          }
          this.cleanups.length = 0;
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].stop(true);
            }
            this.scopes.length = 0;
          }
          if (!this.detached && this.parent && !fromParent) {
            const last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.parent = void 0;
        }
      }
    }
    function getCurrentScope() {
      return activeEffectScope;
    }
    let activeSub;
    const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
    class ReactiveEffect {
      constructor(fn2) {
        this.fn = fn2;
        this.deps = void 0;
        this.depsTail = void 0;
        this.flags = 1 | 4;
        this.next = void 0;
        this.cleanup = void 0;
        this.scheduler = void 0;
        if (activeEffectScope && activeEffectScope.active) {
          activeEffectScope.effects.push(this);
        }
      }
      pause() {
        this.flags |= 64;
      }
      resume() {
        if (this.flags & 64) {
          this.flags &= -65;
          if (pausedQueueEffects.has(this)) {
            pausedQueueEffects.delete(this);
            this.trigger();
          }
        }
      }
      /**
       * @internal
       */
      notify() {
        if (this.flags & 2 && !(this.flags & 32)) {
          return;
        }
        if (!(this.flags & 8)) {
          batch(this);
        }
      }
      run() {
        if (!(this.flags & 1)) {
          return this.fn();
        }
        this.flags |= 2;
        cleanupEffect(this);
        prepareDeps(this);
        const prevEffect = activeSub;
        const prevShouldTrack = shouldTrack;
        activeSub = this;
        shouldTrack = true;
        try {
          return this.fn();
        } finally {
          cleanupDeps(this);
          activeSub = prevEffect;
          shouldTrack = prevShouldTrack;
          this.flags &= -3;
        }
      }
      stop() {
        if (this.flags & 1) {
          for (let link = this.deps; link; link = link.nextDep) {
            removeSub(link);
          }
          this.deps = this.depsTail = void 0;
          cleanupEffect(this);
          this.onStop && this.onStop();
          this.flags &= -2;
        }
      }
      trigger() {
        if (this.flags & 64) {
          pausedQueueEffects.add(this);
        } else if (this.scheduler) {
          this.scheduler();
        } else {
          this.runIfDirty();
        }
      }
      /**
       * @internal
       */
      runIfDirty() {
        if (isDirty(this)) {
          this.run();
        }
      }
      get dirty() {
        return isDirty(this);
      }
    }
    let batchDepth = 0;
    let batchedSub;
    let batchedComputed;
    function batch(sub, isComputed = false) {
      sub.flags |= 8;
      if (isComputed) {
        sub.next = batchedComputed;
        batchedComputed = sub;
        return;
      }
      sub.next = batchedSub;
      batchedSub = sub;
    }
    function startBatch() {
      batchDepth++;
    }
    function endBatch() {
      if (--batchDepth > 0) {
        return;
      }
      if (batchedComputed) {
        let e = batchedComputed;
        batchedComputed = void 0;
        while (e) {
          const next = e.next;
          e.next = void 0;
          e.flags &= -9;
          e = next;
        }
      }
      let error;
      while (batchedSub) {
        let e = batchedSub;
        batchedSub = void 0;
        while (e) {
          const next = e.next;
          e.next = void 0;
          e.flags &= -9;
          if (e.flags & 1) {
            try {
              ;
              e.trigger();
            } catch (err) {
              if (!error) error = err;
            }
          }
          e = next;
        }
      }
      if (error) throw error;
    }
    function prepareDeps(sub) {
      for (let link = sub.deps; link; link = link.nextDep) {
        link.version = -1;
        link.prevActiveLink = link.dep.activeLink;
        link.dep.activeLink = link;
      }
    }
    function cleanupDeps(sub) {
      let head;
      let tail = sub.depsTail;
      let link = tail;
      while (link) {
        const prev = link.prevDep;
        if (link.version === -1) {
          if (link === tail) tail = prev;
          removeSub(link);
          removeDep(link);
        } else {
          head = link;
        }
        link.dep.activeLink = link.prevActiveLink;
        link.prevActiveLink = void 0;
        link = prev;
      }
      sub.deps = head;
      sub.depsTail = tail;
    }
    function isDirty(sub) {
      for (let link = sub.deps; link; link = link.nextDep) {
        if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
          return true;
        }
      }
      if (sub._dirty) {
        return true;
      }
      return false;
    }
    function refreshComputed(computed2) {
      if (computed2.flags & 4 && !(computed2.flags & 16)) {
        return;
      }
      computed2.flags &= -17;
      if (computed2.globalVersion === globalVersion) {
        return;
      }
      computed2.globalVersion = globalVersion;
      const dep = computed2.dep;
      computed2.flags |= 2;
      if (dep.version > 0 && !computed2.isSSR && computed2.deps && !isDirty(computed2)) {
        computed2.flags &= -3;
        return;
      }
      const prevSub = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = computed2;
      shouldTrack = true;
      try {
        prepareDeps(computed2);
        const value = computed2.fn(computed2._value);
        if (dep.version === 0 || hasChanged(value, computed2._value)) {
          computed2._value = value;
          dep.version++;
        }
      } catch (err) {
        dep.version++;
        throw err;
      } finally {
        activeSub = prevSub;
        shouldTrack = prevShouldTrack;
        cleanupDeps(computed2);
        computed2.flags &= -3;
      }
    }
    function removeSub(link, soft = false) {
      const { dep, prevSub, nextSub } = link;
      if (prevSub) {
        prevSub.nextSub = nextSub;
        link.prevSub = void 0;
      }
      if (nextSub) {
        nextSub.prevSub = prevSub;
        link.nextSub = void 0;
      }
      if (dep.subs === link) {
        dep.subs = prevSub;
        if (!prevSub && dep.computed) {
          dep.computed.flags &= -5;
          for (let l = dep.computed.deps; l; l = l.nextDep) {
            removeSub(l, true);
          }
        }
      }
      if (!soft && !--dep.sc && dep.map) {
        dep.map.delete(dep.key);
      }
    }
    function removeDep(link) {
      const { prevDep, nextDep } = link;
      if (prevDep) {
        prevDep.nextDep = nextDep;
        link.prevDep = void 0;
      }
      if (nextDep) {
        nextDep.prevDep = prevDep;
        link.nextDep = void 0;
      }
    }
    let shouldTrack = true;
    const trackStack = [];
    function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
    }
    function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === void 0 ? true : last;
    }
    function cleanupEffect(e) {
      const { cleanup } = e;
      e.cleanup = void 0;
      if (cleanup) {
        const prevSub = activeSub;
        activeSub = void 0;
        try {
          cleanup();
        } finally {
          activeSub = prevSub;
        }
      }
    }
    let globalVersion = 0;
    class Link {
      constructor(sub, dep) {
        this.sub = sub;
        this.dep = dep;
        this.version = dep.version;
        this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
      }
    }
    class Dep {
      constructor(computed2) {
        this.computed = computed2;
        this.version = 0;
        this.activeLink = void 0;
        this.subs = void 0;
        this.map = void 0;
        this.key = void 0;
        this.sc = 0;
      }
      track(debugInfo) {
        if (!activeSub || !shouldTrack || activeSub === this.computed) {
          return;
        }
        let link = this.activeLink;
        if (link === void 0 || link.sub !== activeSub) {
          link = this.activeLink = new Link(activeSub, this);
          if (!activeSub.deps) {
            activeSub.deps = activeSub.depsTail = link;
          } else {
            link.prevDep = activeSub.depsTail;
            activeSub.depsTail.nextDep = link;
            activeSub.depsTail = link;
          }
          addSub(link);
        } else if (link.version === -1) {
          link.version = this.version;
          if (link.nextDep) {
            const next = link.nextDep;
            next.prevDep = link.prevDep;
            if (link.prevDep) {
              link.prevDep.nextDep = next;
            }
            link.prevDep = activeSub.depsTail;
            link.nextDep = void 0;
            activeSub.depsTail.nextDep = link;
            activeSub.depsTail = link;
            if (activeSub.deps === link) {
              activeSub.deps = next;
            }
          }
        }
        return link;
      }
      trigger(debugInfo) {
        this.version++;
        globalVersion++;
        this.notify(debugInfo);
      }
      notify(debugInfo) {
        startBatch();
        try {
          if (false) ;
          for (let link = this.subs; link; link = link.prevSub) {
            if (link.sub.notify()) {
              ;
              link.sub.dep.notify();
            }
          }
        } finally {
          endBatch();
        }
      }
    }
    function addSub(link) {
      link.dep.sc++;
      if (link.sub.flags & 4) {
        const computed2 = link.dep.computed;
        if (computed2 && !link.dep.subs) {
          computed2.flags |= 4 | 16;
          for (let l = computed2.deps; l; l = l.nextDep) {
            addSub(l);
          }
        }
        const currentTail = link.dep.subs;
        if (currentTail !== link) {
          link.prevSub = currentTail;
          if (currentTail) currentTail.nextSub = link;
        }
        link.dep.subs = link;
      }
    }
    const targetMap = /* @__PURE__ */ new WeakMap();
    const ITERATE_KEY = Symbol(
      ""
    );
    const MAP_KEY_ITERATE_KEY = Symbol(
      ""
    );
    const ARRAY_ITERATE_KEY = Symbol(
      ""
    );
    function track(target, type, key) {
      if (shouldTrack && activeSub) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
          targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
          depsMap.set(key, dep = new Dep());
          dep.map = depsMap;
          dep.key = key;
        }
        {
          dep.track();
        }
      }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
        globalVersion++;
        return;
      }
      const run = (dep) => {
        if (dep) {
          {
            dep.trigger();
          }
        }
      };
      startBatch();
      if (type === "clear") {
        depsMap.forEach(run);
      } else {
        const targetIsArray = isArray(target);
        const isArrayIndex = targetIsArray && isIntegerKey(key);
        if (targetIsArray && key === "length") {
          const newLength = Number(newValue);
          depsMap.forEach((dep, key2) => {
            if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
              run(dep);
            }
          });
        } else {
          if (key !== void 0 || depsMap.has(void 0)) {
            run(depsMap.get(key));
          }
          if (isArrayIndex) {
            run(depsMap.get(ARRAY_ITERATE_KEY));
          }
          switch (type) {
            case "add":
              if (!targetIsArray) {
                run(depsMap.get(ITERATE_KEY));
                if (isMap(target)) {
                  run(depsMap.get(MAP_KEY_ITERATE_KEY));
                }
              } else if (isArrayIndex) {
                run(depsMap.get("length"));
              }
              break;
            case "delete":
              if (!targetIsArray) {
                run(depsMap.get(ITERATE_KEY));
                if (isMap(target)) {
                  run(depsMap.get(MAP_KEY_ITERATE_KEY));
                }
              }
              break;
            case "set":
              if (isMap(target)) {
                run(depsMap.get(ITERATE_KEY));
              }
              break;
          }
        }
      }
      endBatch();
    }
    function reactiveReadArray(array) {
      const raw = toRaw(array);
      if (raw === array) return raw;
      track(raw, "iterate", ARRAY_ITERATE_KEY);
      return isShallow(array) ? raw : raw.map(toReactive);
    }
    function shallowReadArray(arr) {
      track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
      return arr;
    }
    const arrayInstrumentations = {
      __proto__: null,
      [Symbol.iterator]() {
        return iterator(this, Symbol.iterator, toReactive);
      },
      concat(...args) {
        return reactiveReadArray(this).concat(
          ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
        );
      },
      entries() {
        return iterator(this, "entries", (value) => {
          value[1] = toReactive(value[1]);
          return value;
        });
      },
      every(fn2, thisArg) {
        return apply(this, "every", fn2, thisArg, void 0, arguments);
      },
      filter(fn2, thisArg) {
        return apply(this, "filter", fn2, thisArg, (v) => v.map(toReactive), arguments);
      },
      find(fn2, thisArg) {
        return apply(this, "find", fn2, thisArg, toReactive, arguments);
      },
      findIndex(fn2, thisArg) {
        return apply(this, "findIndex", fn2, thisArg, void 0, arguments);
      },
      findLast(fn2, thisArg) {
        return apply(this, "findLast", fn2, thisArg, toReactive, arguments);
      },
      findLastIndex(fn2, thisArg) {
        return apply(this, "findLastIndex", fn2, thisArg, void 0, arguments);
      },
      // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
      forEach(fn2, thisArg) {
        return apply(this, "forEach", fn2, thisArg, void 0, arguments);
      },
      includes(...args) {
        return searchProxy(this, "includes", args);
      },
      indexOf(...args) {
        return searchProxy(this, "indexOf", args);
      },
      join(separator) {
        return reactiveReadArray(this).join(separator);
      },
      // keys() iterator only reads `length`, no optimisation required
      lastIndexOf(...args) {
        return searchProxy(this, "lastIndexOf", args);
      },
      map(fn2, thisArg) {
        return apply(this, "map", fn2, thisArg, void 0, arguments);
      },
      pop() {
        return noTracking(this, "pop");
      },
      push(...args) {
        return noTracking(this, "push", args);
      },
      reduce(fn2, ...args) {
        return reduce(this, "reduce", fn2, args);
      },
      reduceRight(fn2, ...args) {
        return reduce(this, "reduceRight", fn2, args);
      },
      shift() {
        return noTracking(this, "shift");
      },
      // slice could use ARRAY_ITERATE but also seems to beg for range tracking
      some(fn2, thisArg) {
        return apply(this, "some", fn2, thisArg, void 0, arguments);
      },
      splice(...args) {
        return noTracking(this, "splice", args);
      },
      toReversed() {
        return reactiveReadArray(this).toReversed();
      },
      toSorted(comparer) {
        return reactiveReadArray(this).toSorted(comparer);
      },
      toSpliced(...args) {
        return reactiveReadArray(this).toSpliced(...args);
      },
      unshift(...args) {
        return noTracking(this, "unshift", args);
      },
      values() {
        return iterator(this, "values", toReactive);
      }
    };
    function iterator(self2, method, wrapValue) {
      const arr = shallowReadArray(self2);
      const iter = arr[method]();
      if (arr !== self2 && !isShallow(self2)) {
        iter._next = iter.next;
        iter.next = () => {
          const result = iter._next();
          if (result.value) {
            result.value = wrapValue(result.value);
          }
          return result;
        };
      }
      return iter;
    }
    const arrayProto = Array.prototype;
    function apply(self2, method, fn2, thisArg, wrappedRetFn, args) {
      const arr = shallowReadArray(self2);
      const needsWrap = arr !== self2 && !isShallow(self2);
      const methodFn = arr[method];
      if (methodFn !== arrayProto[method]) {
        const result2 = methodFn.apply(self2, args);
        return needsWrap ? toReactive(result2) : result2;
      }
      let wrappedFn = fn2;
      if (arr !== self2) {
        if (needsWrap) {
          wrappedFn = function(item, index) {
            return fn2.call(this, toReactive(item), index, self2);
          };
        } else if (fn2.length > 2) {
          wrappedFn = function(item, index) {
            return fn2.call(this, item, index, self2);
          };
        }
      }
      const result = methodFn.call(arr, wrappedFn, thisArg);
      return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
    }
    function reduce(self2, method, fn2, args) {
      const arr = shallowReadArray(self2);
      let wrappedFn = fn2;
      if (arr !== self2) {
        if (!isShallow(self2)) {
          wrappedFn = function(acc, item, index) {
            return fn2.call(this, acc, toReactive(item), index, self2);
          };
        } else if (fn2.length > 3) {
          wrappedFn = function(acc, item, index) {
            return fn2.call(this, acc, item, index, self2);
          };
        }
      }
      return arr[method](wrappedFn, ...args);
    }
    function searchProxy(self2, method, args) {
      const arr = toRaw(self2);
      track(arr, "iterate", ARRAY_ITERATE_KEY);
      const res = arr[method](...args);
      if ((res === -1 || res === false) && isProxy(args[0])) {
        args[0] = toRaw(args[0]);
        return arr[method](...args);
      }
      return res;
    }
    function noTracking(self2, method, args = []) {
      pauseTracking();
      startBatch();
      const res = toRaw(self2)[method].apply(self2, args);
      endBatch();
      resetTracking();
      return res;
    }
    const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
    const builtInSymbols = new Set(
      /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
    );
    function hasOwnProperty(key) {
      if (!isSymbol(key)) key = String(key);
      const obj = toRaw(this);
      track(obj, "has", key);
      return obj.hasOwnProperty(key);
    }
    class BaseReactiveHandler {
      constructor(_isReadonly = false, _isShallow = false) {
        this._isReadonly = _isReadonly;
        this._isShallow = _isShallow;
      }
      get(target, key, receiver) {
        if (key === "__v_skip") return target["__v_skip"];
        const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_isShallow") {
          return isShallow2;
        } else if (key === "__v_raw") {
          if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
          // this means the receiver is a user proxy of the reactive proxy
          Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
            return target;
          }
          return;
        }
        const targetIsArray = isArray(target);
        if (!isReadonly2) {
          let fn2;
          if (targetIsArray && (fn2 = arrayInstrumentations[key])) {
            return fn2;
          }
          if (key === "hasOwnProperty") {
            return hasOwnProperty;
          }
        }
        const res = Reflect.get(
          target,
          key,
          // if this is a proxy wrapping a ref, return methods using the raw ref
          // as receiver so that we don't have to call `toRaw` on the ref in all
          // its class methods
          isRef(target) ? target : receiver
        );
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          return res;
        }
        if (!isReadonly2) {
          track(target, "get", key);
        }
        if (isShallow2) {
          return res;
        }
        if (isRef(res)) {
          return targetIsArray && isIntegerKey(key) ? res : res.value;
        }
        if (isObject(res)) {
          return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
      }
    }
    class MutableReactiveHandler extends BaseReactiveHandler {
      constructor(isShallow2 = false) {
        super(false, isShallow2);
      }
      set(target, key, value, receiver) {
        let oldValue = target[key];
        if (!this._isShallow) {
          const isOldValueReadonly = isReadonly(oldValue);
          if (!isShallow(value) && !isReadonly(value)) {
            oldValue = toRaw(oldValue);
            value = toRaw(value);
          }
          if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
            if (isOldValueReadonly) {
              return false;
            } else {
              oldValue.value = value;
              return true;
            }
          }
        }
        const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(
          target,
          key,
          value,
          isRef(target) ? target : receiver
        );
        if (target === toRaw(receiver)) {
          if (!hadKey) {
            trigger(target, "add", key, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key, value);
          }
        }
        return result;
      }
      deleteProperty(target, key) {
        const hadKey = hasOwn(target, key);
        target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      }
      has(target, key) {
        const result = Reflect.has(target, key);
        if (!isSymbol(key) || !builtInSymbols.has(key)) {
          track(target, "has", key);
        }
        return result;
      }
      ownKeys(target) {
        track(
          target,
          "iterate",
          isArray(target) ? "length" : ITERATE_KEY
        );
        return Reflect.ownKeys(target);
      }
    }
    class ReadonlyReactiveHandler extends BaseReactiveHandler {
      constructor(isShallow2 = false) {
        super(true, isShallow2);
      }
      set(target, key) {
        return true;
      }
      deleteProperty(target, key) {
        return true;
      }
    }
    const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
    const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
    const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
    const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
    const toShallow = (value) => value;
    const getProto = (v) => Reflect.getPrototypeOf(v);
    function createIterableMethod(method, isReadonly2, isShallow2) {
      return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const targetIsMap = isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(
          rawTarget,
          "iterate",
          isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
        );
        return {
          // iterator protocol
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          },
          // iterable protocol
          [Symbol.iterator]() {
            return this;
          }
        };
      };
    }
    function createReadonlyMethod(type) {
      return function(...args) {
        return type === "delete" ? false : type === "clear" ? void 0 : this;
      };
    }
    function createInstrumentations(readonly2, shallow) {
      const instrumentations = {
        get(key) {
          const target = this["__v_raw"];
          const rawTarget = toRaw(target);
          const rawKey = toRaw(key);
          if (!readonly2) {
            if (hasChanged(key, rawKey)) {
              track(rawTarget, "get", key);
            }
            track(rawTarget, "get", rawKey);
          }
          const { has } = getProto(rawTarget);
          const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
          if (has.call(rawTarget, key)) {
            return wrap(target.get(key));
          } else if (has.call(rawTarget, rawKey)) {
            return wrap(target.get(rawKey));
          } else if (target !== rawTarget) {
            target.get(key);
          }
        },
        get size() {
          const target = this["__v_raw"];
          !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
          return Reflect.get(target, "size", target);
        },
        has(key) {
          const target = this["__v_raw"];
          const rawTarget = toRaw(target);
          const rawKey = toRaw(key);
          if (!readonly2) {
            if (hasChanged(key, rawKey)) {
              track(rawTarget, "has", key);
            }
            track(rawTarget, "has", rawKey);
          }
          return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
        },
        forEach(callback, thisArg) {
          const observed = this;
          const target = observed["__v_raw"];
          const rawTarget = toRaw(target);
          const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
          !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
          return target.forEach((value, key) => {
            return callback.call(thisArg, wrap(value), wrap(key), observed);
          });
        }
      };
      extend(
        instrumentations,
        readonly2 ? {
          add: createReadonlyMethod("add"),
          set: createReadonlyMethod("set"),
          delete: createReadonlyMethod("delete"),
          clear: createReadonlyMethod("clear")
        } : {
          add(value) {
            if (!shallow && !isShallow(value) && !isReadonly(value)) {
              value = toRaw(value);
            }
            const target = toRaw(this);
            const proto = getProto(target);
            const hadKey = proto.has.call(target, value);
            if (!hadKey) {
              target.add(value);
              trigger(target, "add", value, value);
            }
            return this;
          },
          set(key, value) {
            if (!shallow && !isShallow(value) && !isReadonly(value)) {
              value = toRaw(value);
            }
            const target = toRaw(this);
            const { has, get } = getProto(target);
            let hadKey = has.call(target, key);
            if (!hadKey) {
              key = toRaw(key);
              hadKey = has.call(target, key);
            }
            const oldValue = get.call(target, key);
            target.set(key, value);
            if (!hadKey) {
              trigger(target, "add", key, value);
            } else if (hasChanged(value, oldValue)) {
              trigger(target, "set", key, value);
            }
            return this;
          },
          delete(key) {
            const target = toRaw(this);
            const { has, get } = getProto(target);
            let hadKey = has.call(target, key);
            if (!hadKey) {
              key = toRaw(key);
              hadKey = has.call(target, key);
            }
            get ? get.call(target, key) : void 0;
            const result = target.delete(key);
            if (hadKey) {
              trigger(target, "delete", key, void 0);
            }
            return result;
          },
          clear() {
            const target = toRaw(this);
            const hadItems = target.size !== 0;
            const result = target.clear();
            if (hadItems) {
              trigger(
                target,
                "clear",
                void 0,
                void 0
              );
            }
            return result;
          }
        }
      );
      const iteratorMethods = [
        "keys",
        "values",
        "entries",
        Symbol.iterator
      ];
      iteratorMethods.forEach((method) => {
        instrumentations[method] = createIterableMethod(method, readonly2, shallow);
      });
      return instrumentations;
    }
    function createInstrumentationGetter(isReadonly2, shallow) {
      const instrumentations = createInstrumentations(isReadonly2, shallow);
      return (target, key, receiver) => {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_raw") {
          return target;
        }
        return Reflect.get(
          hasOwn(instrumentations, key) && key in target ? instrumentations : target,
          key,
          receiver
        );
      };
    }
    const mutableCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    const shallowCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    const readonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    const shallowReadonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, true)
    };
    const reactiveMap = /* @__PURE__ */ new WeakMap();
    const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
    const readonlyMap = /* @__PURE__ */ new WeakMap();
    const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
    function targetTypeMap(rawType) {
      switch (rawType) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }
    function getTargetType(value) {
      return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
    }
    function reactive(target) {
      if (isReadonly(target)) {
        return target;
      }
      return createReactiveObject(
        target,
        false,
        mutableHandlers,
        mutableCollectionHandlers,
        reactiveMap
      );
    }
    function shallowReactive(target) {
      return createReactiveObject(
        target,
        false,
        shallowReactiveHandlers,
        shallowCollectionHandlers,
        shallowReactiveMap
      );
    }
    function readonly(target) {
      return createReactiveObject(
        target,
        true,
        readonlyHandlers,
        readonlyCollectionHandlers,
        readonlyMap
      );
    }
    function shallowReadonly(target) {
      return createReactiveObject(
        target,
        true,
        shallowReadonlyHandlers,
        shallowReadonlyCollectionHandlers,
        shallowReadonlyMap
      );
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
      if (!isObject(target)) {
        return target;
      }
      if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
      }
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
        return existingProxy;
      }
      const targetType = getTargetType(target);
      if (targetType === 0) {
        return target;
      }
      const proxy = new Proxy(
        target,
        targetType === 2 ? collectionHandlers : baseHandlers
      );
      proxyMap.set(target, proxy);
      return proxy;
    }
    function isReactive(value) {
      if (isReadonly(value)) {
        return isReactive(value["__v_raw"]);
      }
      return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
      return !!(value && value["__v_isReadonly"]);
    }
    function isShallow(value) {
      return !!(value && value["__v_isShallow"]);
    }
    function isProxy(value) {
      return value ? !!value["__v_raw"] : false;
    }
    function toRaw(observed) {
      const raw = observed && observed["__v_raw"];
      return raw ? toRaw(raw) : observed;
    }
    function markRaw(value) {
      if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
        def(value, "__v_skip", true);
      }
      return value;
    }
    const toReactive = (value) => isObject(value) ? reactive(value) : value;
    const toReadonly = (value) => isObject(value) ? readonly(value) : value;
    function isRef(r) {
      return r ? r["__v_isRef"] === true : false;
    }
    function unref(ref2) {
      return isRef(ref2) ? ref2.value : ref2;
    }
    const shallowUnwrapHandlers = {
      get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, receiver);
        }
      }
    };
    function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    class ComputedRefImpl {
      constructor(fn2, setter, isSSR) {
        this.fn = fn2;
        this.setter = setter;
        this._value = void 0;
        this.dep = new Dep(this);
        this.__v_isRef = true;
        this.deps = void 0;
        this.depsTail = void 0;
        this.flags = 16;
        this.globalVersion = globalVersion - 1;
        this.next = void 0;
        this.effect = this;
        this["__v_isReadonly"] = !setter;
        this.isSSR = isSSR;
      }
      /**
       * @internal
       */
      notify() {
        this.flags |= 16;
        if (!(this.flags & 8) && // avoid infinite self recursion
        activeSub !== this) {
          batch(this, true);
          return true;
        }
      }
      get value() {
        const link = this.dep.track();
        refreshComputed(this);
        if (link) {
          link.version = this.dep.version;
        }
        return this._value;
      }
      set value(newValue) {
        if (this.setter) {
          this.setter(newValue);
        }
      }
    }
    function computed$1(getterOrOptions, debugOptions, isSSR = false) {
      let getter;
      let setter;
      if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
      } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
      }
      const cRef = new ComputedRefImpl(getter, setter, isSSR);
      return cRef;
    }
    const INITIAL_WATCHER_VALUE = {};
    const cleanupMap = /* @__PURE__ */ new WeakMap();
    let activeWatcher = void 0;
    function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
      if (owner) {
        let cleanups = cleanupMap.get(owner);
        if (!cleanups) cleanupMap.set(owner, cleanups = []);
        cleanups.push(cleanupFn);
      }
    }
    function watch$1(source, cb2, options = EMPTY_OBJ) {
      const { immediate, deep, once, scheduler, augmentJob, call } = options;
      const reactiveGetter = (source2) => {
        if (deep) return source2;
        if (isShallow(source2) || deep === false || deep === 0)
          return traverse(source2, 1);
        return traverse(source2);
      };
      let effect2;
      let getter;
      let cleanup;
      let boundCleanup;
      let forceTrigger = false;
      let isMultiSource = false;
      if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = isShallow(source);
      } else if (isReactive(source)) {
        getter = () => reactiveGetter(source);
        forceTrigger = true;
      } else if (isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
        getter = () => source.map((s) => {
          if (isRef(s)) {
            return s.value;
          } else if (isReactive(s)) {
            return reactiveGetter(s);
          } else if (isFunction(s)) {
            return call ? call(s, 2) : s();
          } else ;
        });
      } else if (isFunction(source)) {
        if (cb2) {
          getter = call ? () => call(source, 2) : source;
        } else {
          getter = () => {
            if (cleanup) {
              pauseTracking();
              try {
                cleanup();
              } finally {
                resetTracking();
              }
            }
            const currentEffect = activeWatcher;
            activeWatcher = effect2;
            try {
              return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
            } finally {
              activeWatcher = currentEffect;
            }
          };
        }
      } else {
        getter = NOOP;
      }
      if (cb2 && deep) {
        const baseGetter = getter;
        const depth = deep === true ? Infinity : deep;
        getter = () => traverse(baseGetter(), depth);
      }
      const scope = getCurrentScope();
      const watchHandle = () => {
        effect2.stop();
        if (scope && scope.active) {
          remove(scope.effects, effect2);
        }
      };
      if (once && cb2) {
        const _cb = cb2;
        cb2 = (...args) => {
          _cb(...args);
          watchHandle();
        };
      }
      let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
      const job = (immediateFirstRun) => {
        if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
          return;
        }
        if (cb2) {
          const newValue = effect2.run();
          if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
            if (cleanup) {
              cleanup();
            }
            const currentWatcher = activeWatcher;
            activeWatcher = effect2;
            try {
              const args = [
                newValue,
                // pass undefined as the old value when it's changed for the first time
                oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
                boundCleanup
              ];
              call ? call(cb2, 3, args) : (
                // @ts-expect-error
                cb2(...args)
              );
              oldValue = newValue;
            } finally {
              activeWatcher = currentWatcher;
            }
          }
        } else {
          effect2.run();
        }
      };
      if (augmentJob) {
        augmentJob(job);
      }
      effect2 = new ReactiveEffect(getter);
      effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
      boundCleanup = (fn2) => onWatcherCleanup(fn2, false, effect2);
      cleanup = effect2.onStop = () => {
        const cleanups = cleanupMap.get(effect2);
        if (cleanups) {
          if (call) {
            call(cleanups, 4);
          } else {
            for (const cleanup2 of cleanups) cleanup2();
          }
          cleanupMap.delete(effect2);
        }
      };
      if (cb2) {
        if (immediate) {
          job(true);
        } else {
          oldValue = effect2.run();
        }
      } else if (scheduler) {
        scheduler(job.bind(null, true), true);
      } else {
        effect2.run();
      }
      watchHandle.pause = effect2.pause.bind(effect2);
      watchHandle.resume = effect2.resume.bind(effect2);
      watchHandle.stop = watchHandle;
      return watchHandle;
    }
    function traverse(value, depth = Infinity, seen) {
      if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
        return value;
      }
      seen = seen || /* @__PURE__ */ new Set();
      if (seen.has(value)) {
        return value;
      }
      seen.add(value);
      depth--;
      if (isRef(value)) {
        traverse(value.value, depth, seen);
      } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          traverse(value[i], depth, seen);
        }
      } else if (isSet(value) || isMap(value)) {
        value.forEach((v) => {
          traverse(v, depth, seen);
        });
      } else if (isPlainObject(value)) {
        for (const key in value) {
          traverse(value[key], depth, seen);
        }
        for (const key of Object.getOwnPropertySymbols(value)) {
          if (Object.prototype.propertyIsEnumerable.call(value, key)) {
            traverse(value[key], depth, seen);
          }
        }
      }
      return value;
    }
    /**
    * @vue/runtime-core v3.5.13
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    const stack = [];
    let isWarning = false;
    function warn$1(msg, ...args) {
      if (isWarning) return;
      isWarning = true;
      pauseTracking();
      const instance = stack.length ? stack[stack.length - 1].component : null;
      const appWarnHandler = instance && instance.appContext.config.warnHandler;
      const trace = getComponentTrace();
      if (appWarnHandler) {
        callWithErrorHandling(
          appWarnHandler,
          instance,
          11,
          [
            // eslint-disable-next-line no-restricted-syntax
            msg + args.map((a) => {
              var _a, _b;
              return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
            }).join(""),
            instance && instance.proxy,
            trace.map(
              ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
            ).join("\n"),
            trace
          ]
        );
      } else {
        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
        if (trace.length && // avoid spamming console during tests
        true) {
          warnArgs.push(`
`, ...formatTrace(trace));
        }
        console.warn(...warnArgs);
      }
      resetTracking();
      isWarning = false;
    }
    function getComponentTrace() {
      let currentVNode = stack[stack.length - 1];
      if (!currentVNode) {
        return [];
      }
      const normalizedStack = [];
      while (currentVNode) {
        const last = normalizedStack[0];
        if (last && last.vnode === currentVNode) {
          last.recurseCount++;
        } else {
          normalizedStack.push({
            vnode: currentVNode,
            recurseCount: 0
          });
        }
        const parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
      }
      return normalizedStack;
    }
    function formatTrace(trace) {
      const logs = [];
      trace.forEach((entry, i) => {
        logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
      });
      return logs;
    }
    function formatTraceEntry({ vnode, recurseCount }) {
      const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
      const isRoot = vnode.component ? vnode.component.parent == null : false;
      const open = ` at <${formatComponentName(
        vnode.component,
        vnode.type,
        isRoot
      )}`;
      const close = `>` + postfix;
      return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
    }
    function formatProps(props) {
      const res = [];
      const keys = Object.keys(props);
      keys.slice(0, 3).forEach((key) => {
        res.push(...formatProp(key, props[key]));
      });
      if (keys.length > 3) {
        res.push(` ...`);
      }
      return res;
    }
    function formatProp(key, value, raw) {
      if (isString(value)) {
        value = JSON.stringify(value);
        return raw ? value : [`${key}=${value}`];
      } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
        return raw ? value : [`${key}=${value}`];
      } else if (isRef(value)) {
        value = formatProp(key, toRaw(value.value), true);
        return raw ? value : [`${key}=Ref<`, value, `>`];
      } else if (isFunction(value)) {
        return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
      } else {
        value = toRaw(value);
        return raw ? value : [`${key}=`, value];
      }
    }
    function callWithErrorHandling(fn2, instance, type, args) {
      try {
        return args ? fn2(...args) : fn2();
      } catch (err) {
        handleError(err, instance, type);
      }
    }
    function callWithAsyncErrorHandling(fn2, instance, type, args) {
      if (isFunction(fn2)) {
        const res = callWithErrorHandling(fn2, instance, type, args);
        if (res && isPromise(res)) {
          res.catch((err) => {
            handleError(err, instance, type);
          });
        }
        return res;
      }
      if (isArray(fn2)) {
        const values = [];
        for (let i = 0; i < fn2.length; i++) {
          values.push(callWithAsyncErrorHandling(fn2[i], instance, type, args));
        }
        return values;
      }
    }
    function handleError(err, instance, type, throwInDev = true) {
      const contextVNode = instance ? instance.vnode : null;
      const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
      if (instance) {
        let cur = instance.parent;
        const exposedInstance = instance.proxy;
        const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
        while (cur) {
          const errorCapturedHooks = cur.ec;
          if (errorCapturedHooks) {
            for (let i = 0; i < errorCapturedHooks.length; i++) {
              if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                return;
              }
            }
          }
          cur = cur.parent;
        }
        if (errorHandler) {
          pauseTracking();
          callWithErrorHandling(errorHandler, null, 10, [
            err,
            exposedInstance,
            errorInfo
          ]);
          resetTracking();
          return;
        }
      }
      logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
    }
    function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
      if (throwInProd) {
        throw err;
      } else {
        console.error(err);
      }
    }
    const queue = [];
    let flushIndex = -1;
    const pendingPostFlushCbs = [];
    let activePostFlushCbs = null;
    let postFlushIndex = 0;
    const resolvedPromise = /* @__PURE__ */ Promise.resolve();
    let currentFlushPromise = null;
    function nextTick(fn2) {
      const p2 = currentFlushPromise || resolvedPromise;
      return fn2 ? p2.then(this ? fn2.bind(this) : fn2) : p2;
    }
    function findInsertionIndex(id2) {
      let start = flushIndex + 1;
      let end = queue.length;
      while (start < end) {
        const middle = start + end >>> 1;
        const middleJob = queue[middle];
        const middleJobId = getId(middleJob);
        if (middleJobId < id2 || middleJobId === id2 && middleJob.flags & 2) {
          start = middle + 1;
        } else {
          end = middle;
        }
      }
      return start;
    }
    function queueJob(job) {
      if (!(job.flags & 1)) {
        const jobId = getId(job);
        const lastJob = queue[queue.length - 1];
        if (!lastJob || // fast path when the job id is larger than the tail
        !(job.flags & 2) && jobId >= getId(lastJob)) {
          queue.push(job);
        } else {
          queue.splice(findInsertionIndex(jobId), 0, job);
        }
        job.flags |= 1;
        queueFlush();
      }
    }
    function queueFlush() {
      if (!currentFlushPromise) {
        currentFlushPromise = resolvedPromise.then(flushJobs);
      }
    }
    function queuePostFlushCb(cb2) {
      if (!isArray(cb2)) {
        if (activePostFlushCbs && cb2.id === -1) {
          activePostFlushCbs.splice(postFlushIndex + 1, 0, cb2);
        } else if (!(cb2.flags & 1)) {
          pendingPostFlushCbs.push(cb2);
          cb2.flags |= 1;
        }
      } else {
        pendingPostFlushCbs.push(...cb2);
      }
      queueFlush();
    }
    function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
      for (; i < queue.length; i++) {
        const cb2 = queue[i];
        if (cb2 && cb2.flags & 2) {
          if (instance && cb2.id !== instance.uid) {
            continue;
          }
          queue.splice(i, 1);
          i--;
          if (cb2.flags & 4) {
            cb2.flags &= -2;
          }
          cb2();
          if (!(cb2.flags & 4)) {
            cb2.flags &= -2;
          }
        }
      }
    }
    function flushPostFlushCbs(seen) {
      if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)].sort(
          (a, b) => getId(a) - getId(b)
        );
        pendingPostFlushCbs.length = 0;
        if (activePostFlushCbs) {
          activePostFlushCbs.push(...deduped);
          return;
        }
        activePostFlushCbs = deduped;
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
          const cb2 = activePostFlushCbs[postFlushIndex];
          if (cb2.flags & 4) {
            cb2.flags &= -2;
          }
          if (!(cb2.flags & 8)) cb2();
          cb2.flags &= -2;
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
      }
    }
    const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
    function flushJobs(seen) {
      try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
          const job = queue[flushIndex];
          if (job && !(job.flags & 8)) {
            if (false) ;
            if (job.flags & 4) {
              job.flags &= ~1;
            }
            callWithErrorHandling(
              job,
              job.i,
              job.i ? 15 : 14
            );
            if (!(job.flags & 4)) {
              job.flags &= ~1;
            }
          }
        }
      } finally {
        for (; flushIndex < queue.length; flushIndex++) {
          const job = queue[flushIndex];
          if (job) {
            job.flags &= -2;
          }
        }
        flushIndex = -1;
        queue.length = 0;
        flushPostFlushCbs();
        currentFlushPromise = null;
        if (queue.length || pendingPostFlushCbs.length) {
          flushJobs();
        }
      }
    }
    let currentRenderingInstance = null;
    let currentScopeId = null;
    function setCurrentRenderingInstance(instance) {
      const prev = currentRenderingInstance;
      currentRenderingInstance = instance;
      currentScopeId = instance && instance.type.__scopeId || null;
      return prev;
    }
    function withCtx(fn2, ctx = currentRenderingInstance, isNonScopedSlot) {
      if (!ctx) return fn2;
      if (fn2._n) {
        return fn2;
      }
      const renderFnWithContext = (...args) => {
        if (renderFnWithContext._d) {
          setBlockTracking(-1);
        }
        const prevInstance = setCurrentRenderingInstance(ctx);
        let res;
        try {
          res = fn2(...args);
        } finally {
          setCurrentRenderingInstance(prevInstance);
          if (renderFnWithContext._d) {
            setBlockTracking(1);
          }
        }
        return res;
      };
      renderFnWithContext._n = true;
      renderFnWithContext._c = true;
      renderFnWithContext._d = true;
      return renderFnWithContext;
    }
    function withDirectives(vnode, directives) {
      if (currentRenderingInstance === null) {
        return vnode;
      }
      const instance = getComponentPublicInstance(currentRenderingInstance);
      const bindings = vnode.dirs || (vnode.dirs = []);
      for (let i = 0; i < directives.length; i++) {
        let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
        if (dir) {
          if (isFunction(dir)) {
            dir = {
              mounted: dir,
              updated: dir
            };
          }
          if (dir.deep) {
            traverse(value);
          }
          bindings.push({
            dir,
            instance,
            value,
            oldValue: void 0,
            arg,
            modifiers
          });
        }
      }
      return vnode;
    }
    function invokeDirectiveHook(vnode, prevVNode, instance, name) {
      const bindings = vnode.dirs;
      const oldBindings = prevVNode && prevVNode.dirs;
      for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];
        if (oldBindings) {
          binding.oldValue = oldBindings[i].value;
        }
        let hook = binding.dir[name];
        if (hook) {
          pauseTracking();
          callWithAsyncErrorHandling(hook, instance, 8, [
            vnode.el,
            binding,
            vnode,
            prevVNode
          ]);
          resetTracking();
        }
      }
    }
    const TeleportEndKey = Symbol("_vte");
    const isTeleport = (type) => type.__isTeleport;
    function setTransitionHooks(vnode, hooks) {
      if (vnode.shapeFlag & 6 && vnode.component) {
        vnode.transition = hooks;
        setTransitionHooks(vnode.component.subTree, hooks);
      } else if (vnode.shapeFlag & 128) {
        vnode.ssContent.transition = hooks.clone(vnode.ssContent);
        vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
      } else {
        vnode.transition = hooks;
      }
    }
    function markAsyncBoundary(instance) {
      instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
    }
    function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
      if (isArray(rawRef)) {
        rawRef.forEach(
          (r, i) => setRef(
            r,
            oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
            parentSuspense,
            vnode,
            isUnmount
          )
        );
        return;
      }
      if (isAsyncWrapper(vnode) && !isUnmount) {
        if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
          setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
        }
        return;
      }
      const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
      const value = isUnmount ? null : refValue;
      const { i: owner, r: ref3 } = rawRef;
      const oldRef = oldRawRef && oldRawRef.r;
      const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
      const setupState = owner.setupState;
      const rawSetupState = toRaw(setupState);
      const canSetSetupRef = setupState === EMPTY_OBJ ? () => false : (key) => {
        return hasOwn(rawSetupState, key);
      };
      if (oldRef != null && oldRef !== ref3) {
        if (isString(oldRef)) {
          refs[oldRef] = null;
          if (canSetSetupRef(oldRef)) {
            setupState[oldRef] = null;
          }
        } else if (isRef(oldRef)) {
          oldRef.value = null;
        }
      }
      if (isFunction(ref3)) {
        callWithErrorHandling(ref3, owner, 12, [value, refs]);
      } else {
        const _isString = isString(ref3);
        const _isRef = isRef(ref3);
        if (_isString || _isRef) {
          const doSet = () => {
            if (rawRef.f) {
              const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
              if (isUnmount) {
                isArray(existing) && remove(existing, refValue);
              } else {
                if (!isArray(existing)) {
                  if (_isString) {
                    refs[ref3] = [refValue];
                    if (canSetSetupRef(ref3)) {
                      setupState[ref3] = refs[ref3];
                    }
                  } else {
                    ref3.value = [refValue];
                    if (rawRef.k) refs[rawRef.k] = ref3.value;
                  }
                } else if (!existing.includes(refValue)) {
                  existing.push(refValue);
                }
              }
            } else if (_isString) {
              refs[ref3] = value;
              if (canSetSetupRef(ref3)) {
                setupState[ref3] = value;
              }
            } else if (_isRef) {
              ref3.value = value;
              if (rawRef.k) refs[rawRef.k] = value;
            } else ;
          };
          if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
          } else {
            doSet();
          }
        }
      }
    }
    getGlobalThis().requestIdleCallback || ((cb2) => setTimeout(cb2, 1));
    getGlobalThis().cancelIdleCallback || ((id2) => clearTimeout(id2));
    const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
    const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
    function onActivated(hook, target) {
      registerKeepAliveHook(hook, "a", target);
    }
    function onDeactivated(hook, target) {
      registerKeepAliveHook(hook, "da", target);
    }
    function registerKeepAliveHook(hook, type, target = currentInstance) {
      const wrappedHook = hook.__wdc || (hook.__wdc = () => {
        let current = target;
        while (current) {
          if (current.isDeactivated) {
            return;
          }
          current = current.parent;
        }
        return hook();
      });
      injectHook(type, wrappedHook, target);
      if (target) {
        let current = target.parent;
        while (current && current.parent) {
          if (isKeepAlive(current.parent.vnode)) {
            injectToKeepAliveRoot(wrappedHook, type, target, current);
          }
          current = current.parent;
        }
      }
    }
    function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
      const injected = injectHook(
        type,
        hook,
        keepAliveRoot,
        true
        /* prepend */
      );
      onUnmounted(() => {
        remove(keepAliveRoot[type], injected);
      }, target);
    }
    function injectHook(type, hook, target = currentInstance, prepend = false) {
      if (target) {
        const hooks = target[type] || (target[type] = []);
        const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
          pauseTracking();
          const reset = setCurrentInstance(target);
          const res = callWithAsyncErrorHandling(hook, target, type, args);
          reset();
          resetTracking();
          return res;
        });
        if (prepend) {
          hooks.unshift(wrappedHook);
        } else {
          hooks.push(wrappedHook);
        }
        return wrappedHook;
      }
    }
    const createHook = (lifecycle) => (hook, target = currentInstance) => {
      if (!isInSSRComponentSetup || lifecycle === "sp") {
        injectHook(lifecycle, (...args) => hook(...args), target);
      }
    };
    const onBeforeMount = createHook("bm");
    const onMounted = createHook("m");
    const onBeforeUpdate = createHook(
      "bu"
    );
    const onUpdated = createHook("u");
    const onBeforeUnmount = createHook(
      "bum"
    );
    const onUnmounted = createHook("um");
    const onServerPrefetch = createHook(
      "sp"
    );
    const onRenderTriggered = createHook("rtg");
    const onRenderTracked = createHook("rtc");
    function onErrorCaptured(hook, target = currentInstance) {
      injectHook("ec", hook, target);
    }
    const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
    const getPublicInstance = (i) => {
      if (!i) return null;
      if (isStatefulComponent(i)) return getComponentPublicInstance(i);
      return getPublicInstance(i.parent);
    };
    const publicPropertiesMap = (
      // Move PURE marker to new line to workaround compiler discarding it
      // due to type annotation
      /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
        $: (i) => i,
        $el: (i) => i.vnode.el,
        $data: (i) => i.data,
        $props: (i) => i.props,
        $attrs: (i) => i.attrs,
        $slots: (i) => i.slots,
        $refs: (i) => i.refs,
        $parent: (i) => getPublicInstance(i.parent),
        $root: (i) => getPublicInstance(i.root),
        $host: (i) => i.ce,
        $emit: (i) => i.emit,
        $options: (i) => resolveMergedOptions(i),
        $forceUpdate: (i) => i.f || (i.f = () => {
          queueJob(i.update);
        }),
        $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
        $watch: (i) => instanceWatch.bind(i)
      })
    );
    const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
    const PublicInstanceProxyHandlers = {
      get({ _: instance }, key) {
        if (key === "__v_skip") {
          return true;
        }
        const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
        let normalizedProps;
        if (key[0] !== "$") {
          const n = accessCache[key];
          if (n !== void 0) {
            switch (n) {
              case 1:
                return setupState[key];
              case 2:
                return data[key];
              case 4:
                return ctx[key];
              case 3:
                return props[key];
            }
          } else if (hasSetupBinding(setupState, key)) {
            accessCache[key] = 1;
            return setupState[key];
          } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
            accessCache[key] = 2;
            return data[key];
          } else if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
          ) {
            accessCache[key] = 3;
            return props[key];
          } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
            accessCache[key] = 4;
            return ctx[key];
          } else if (shouldCacheAccess) {
            accessCache[key] = 0;
          }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        if (publicGetter) {
          if (key === "$attrs") {
            track(instance.attrs, "get", "");
          }
          return publicGetter(instance);
        } else if (
          // css module (injected by vue-loader)
          (cssModule = type.__cssModules) && (cssModule = cssModule[key])
        ) {
          return cssModule;
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (
          // global properties
          globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
        ) {
          {
            return globalProperties[key];
          }
        } else ;
      },
      set({ _: instance }, key, value) {
        const { data, setupState, ctx } = instance;
        if (hasSetupBinding(setupState, key)) {
          setupState[key] = value;
          return true;
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          data[key] = value;
          return true;
        } else if (hasOwn(instance.props, key)) {
          return false;
        }
        if (key[0] === "$" && key.slice(1) in instance) {
          return false;
        } else {
          {
            ctx[key] = value;
          }
        }
        return true;
      },
      has({
        _: { data, setupState, accessCache, ctx, appContext, propsOptions }
      }, key) {
        let normalizedProps;
        return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
      },
      defineProperty(target, key, descriptor) {
        if (descriptor.get != null) {
          target._.accessCache[key] = 0;
        } else if (hasOwn(descriptor, "value")) {
          this.set(target, key, descriptor.value, null);
        }
        return Reflect.defineProperty(target, key, descriptor);
      }
    };
    function normalizePropsOrEmits(props) {
      return isArray(props) ? props.reduce(
        (normalized, p2) => (normalized[p2] = null, normalized),
        {}
      ) : props;
    }
    let shouldCacheAccess = true;
    function applyOptions(instance) {
      const options = resolveMergedOptions(instance);
      const publicThis = instance.proxy;
      const ctx = instance.ctx;
      shouldCacheAccess = false;
      if (options.beforeCreate) {
        callHook(options.beforeCreate, instance, "bc");
      }
      const {
        // state
        data: dataOptions,
        computed: computedOptions,
        methods,
        watch: watchOptions,
        provide: provideOptions,
        inject: injectOptions,
        // lifecycle
        created,
        beforeMount,
        mounted,
        beforeUpdate,
        updated,
        activated,
        deactivated,
        beforeDestroy,
        beforeUnmount,
        destroyed,
        unmounted,
        render,
        renderTracked,
        renderTriggered,
        errorCaptured,
        serverPrefetch,
        // public API
        expose,
        inheritAttrs,
        // assets
        components,
        directives,
        filters
      } = options;
      const checkDuplicateProperties = null;
      if (injectOptions) {
        resolveInjections(injectOptions, ctx, checkDuplicateProperties);
      }
      if (methods) {
        for (const key in methods) {
          const methodHandler = methods[key];
          if (isFunction(methodHandler)) {
            {
              ctx[key] = methodHandler.bind(publicThis);
            }
          }
        }
      }
      if (dataOptions) {
        const data = dataOptions.call(publicThis, publicThis);
        if (!isObject(data)) ;
        else {
          instance.data = reactive(data);
        }
      }
      shouldCacheAccess = true;
      if (computedOptions) {
        for (const key in computedOptions) {
          const opt = computedOptions[key];
          const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
          const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
          const c = computed({
            get,
            set
          });
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => c.value,
            set: (v) => c.value = v
          });
        }
      }
      if (watchOptions) {
        for (const key in watchOptions) {
          createWatcher(watchOptions[key], ctx, publicThis, key);
        }
      }
      if (provideOptions) {
        const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
        Reflect.ownKeys(provides).forEach((key) => {
          provide(key, provides[key]);
        });
      }
      if (created) {
        callHook(created, instance, "c");
      }
      function registerLifecycleHook(register, hook) {
        if (isArray(hook)) {
          hook.forEach((_hook) => register(_hook.bind(publicThis)));
        } else if (hook) {
          register(hook.bind(publicThis));
        }
      }
      registerLifecycleHook(onBeforeMount, beforeMount);
      registerLifecycleHook(onMounted, mounted);
      registerLifecycleHook(onBeforeUpdate, beforeUpdate);
      registerLifecycleHook(onUpdated, updated);
      registerLifecycleHook(onActivated, activated);
      registerLifecycleHook(onDeactivated, deactivated);
      registerLifecycleHook(onErrorCaptured, errorCaptured);
      registerLifecycleHook(onRenderTracked, renderTracked);
      registerLifecycleHook(onRenderTriggered, renderTriggered);
      registerLifecycleHook(onBeforeUnmount, beforeUnmount);
      registerLifecycleHook(onUnmounted, unmounted);
      registerLifecycleHook(onServerPrefetch, serverPrefetch);
      if (isArray(expose)) {
        if (expose.length) {
          const exposed = instance.exposed || (instance.exposed = {});
          expose.forEach((key) => {
            Object.defineProperty(exposed, key, {
              get: () => publicThis[key],
              set: (val) => publicThis[key] = val
            });
          });
        } else if (!instance.exposed) {
          instance.exposed = {};
        }
      }
      if (render && instance.render === NOOP) {
        instance.render = render;
      }
      if (inheritAttrs != null) {
        instance.inheritAttrs = inheritAttrs;
      }
      if (components) instance.components = components;
      if (directives) instance.directives = directives;
      if (serverPrefetch) {
        markAsyncBoundary(instance);
      }
    }
    function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
      if (isArray(injectOptions)) {
        injectOptions = normalizeInject(injectOptions);
      }
      for (const key in injectOptions) {
        const opt = injectOptions[key];
        let injected;
        if (isObject(opt)) {
          if ("default" in opt) {
            injected = inject(
              opt.from || key,
              opt.default,
              true
            );
          } else {
            injected = inject(opt.from || key);
          }
        } else {
          injected = inject(opt);
        }
        if (isRef(injected)) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => injected.value,
            set: (v) => injected.value = v
          });
        } else {
          ctx[key] = injected;
        }
      }
    }
    function callHook(hook, instance, type) {
      callWithAsyncErrorHandling(
        isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
        instance,
        type
      );
    }
    function createWatcher(raw, ctx, publicThis, key) {
      let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
      if (isString(raw)) {
        const handler = ctx[raw];
        if (isFunction(handler)) {
          {
            watch(getter, handler);
          }
        }
      } else if (isFunction(raw)) {
        {
          watch(getter, raw.bind(publicThis));
        }
      } else if (isObject(raw)) {
        if (isArray(raw)) {
          raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
        } else {
          const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
          if (isFunction(handler)) {
            watch(getter, handler, raw);
          }
        }
      } else ;
    }
    function resolveMergedOptions(instance) {
      const base = instance.type;
      const { mixins, extends: extendsOptions } = base;
      const {
        mixins: globalMixins,
        optionsCache: cache,
        config: { optionMergeStrategies }
      } = instance.appContext;
      const cached = cache.get(base);
      let resolved;
      if (cached) {
        resolved = cached;
      } else if (!globalMixins.length && !mixins && !extendsOptions) {
        {
          resolved = base;
        }
      } else {
        resolved = {};
        if (globalMixins.length) {
          globalMixins.forEach(
            (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
          );
        }
        mergeOptions(resolved, base, optionMergeStrategies);
      }
      if (isObject(base)) {
        cache.set(base, resolved);
      }
      return resolved;
    }
    function mergeOptions(to2, from, strats, asMixin = false) {
      const { mixins, extends: extendsOptions } = from;
      if (extendsOptions) {
        mergeOptions(to2, extendsOptions, strats, true);
      }
      if (mixins) {
        mixins.forEach(
          (m) => mergeOptions(to2, m, strats, true)
        );
      }
      for (const key in from) {
        if (asMixin && key === "expose") ;
        else {
          const strat = internalOptionMergeStrats[key] || strats && strats[key];
          to2[key] = strat ? strat(to2[key], from[key]) : from[key];
        }
      }
      return to2;
    }
    const internalOptionMergeStrats = {
      data: mergeDataFn,
      props: mergeEmitsOrPropsOptions,
      emits: mergeEmitsOrPropsOptions,
      // objects
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      // lifecycle
      beforeCreate: mergeAsArray,
      created: mergeAsArray,
      beforeMount: mergeAsArray,
      mounted: mergeAsArray,
      beforeUpdate: mergeAsArray,
      updated: mergeAsArray,
      beforeDestroy: mergeAsArray,
      beforeUnmount: mergeAsArray,
      destroyed: mergeAsArray,
      unmounted: mergeAsArray,
      activated: mergeAsArray,
      deactivated: mergeAsArray,
      errorCaptured: mergeAsArray,
      serverPrefetch: mergeAsArray,
      // assets
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      // watch
      watch: mergeWatchOptions,
      // provide / inject
      provide: mergeDataFn,
      inject: mergeInject
    };
    function mergeDataFn(to2, from) {
      if (!from) {
        return to2;
      }
      if (!to2) {
        return from;
      }
      return function mergedDataFn() {
        return extend(
          isFunction(to2) ? to2.call(this, this) : to2,
          isFunction(from) ? from.call(this, this) : from
        );
      };
    }
    function mergeInject(to2, from) {
      return mergeObjectOptions(normalizeInject(to2), normalizeInject(from));
    }
    function normalizeInject(raw) {
      if (isArray(raw)) {
        const res = {};
        for (let i = 0; i < raw.length; i++) {
          res[raw[i]] = raw[i];
        }
        return res;
      }
      return raw;
    }
    function mergeAsArray(to2, from) {
      return to2 ? [...new Set([].concat(to2, from))] : from;
    }
    function mergeObjectOptions(to2, from) {
      return to2 ? extend(/* @__PURE__ */ Object.create(null), to2, from) : from;
    }
    function mergeEmitsOrPropsOptions(to2, from) {
      if (to2) {
        if (isArray(to2) && isArray(from)) {
          return [.../* @__PURE__ */ new Set([...to2, ...from])];
        }
        return extend(
          /* @__PURE__ */ Object.create(null),
          normalizePropsOrEmits(to2),
          normalizePropsOrEmits(from != null ? from : {})
        );
      } else {
        return from;
      }
    }
    function mergeWatchOptions(to2, from) {
      if (!to2) return from;
      if (!from) return to2;
      const merged = extend(/* @__PURE__ */ Object.create(null), to2);
      for (const key in from) {
        merged[key] = mergeAsArray(to2[key], from[key]);
      }
      return merged;
    }
    function createAppContext() {
      return {
        app: null,
        config: {
          isNativeTag: NO,
          performance: false,
          globalProperties: {},
          optionMergeStrategies: {},
          errorHandler: void 0,
          warnHandler: void 0,
          compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: /* @__PURE__ */ Object.create(null),
        optionsCache: /* @__PURE__ */ new WeakMap(),
        propsCache: /* @__PURE__ */ new WeakMap(),
        emitsCache: /* @__PURE__ */ new WeakMap()
      };
    }
    let uid$1 = 0;
    function createAppAPI(render, hydrate) {
      return function createApp2(rootComponent, rootProps = null) {
        if (!isFunction(rootComponent)) {
          rootComponent = extend({}, rootComponent);
        }
        if (rootProps != null && !isObject(rootProps)) {
          rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = /* @__PURE__ */ new WeakSet();
        const pluginCleanupFns = [];
        let isMounted = false;
        const app = context.app = {
          _uid: uid$1++,
          _component: rootComponent,
          _props: rootProps,
          _container: null,
          _context: context,
          _instance: null,
          version,
          get config() {
            return context.config;
          },
          set config(v) {
          },
          use(plugin, ...options) {
            if (installedPlugins.has(plugin)) ;
            else if (plugin && isFunction(plugin.install)) {
              installedPlugins.add(plugin);
              plugin.install(app, ...options);
            } else if (isFunction(plugin)) {
              installedPlugins.add(plugin);
              plugin(app, ...options);
            } else ;
            return app;
          },
          mixin(mixin) {
            {
              if (!context.mixins.includes(mixin)) {
                context.mixins.push(mixin);
              }
            }
            return app;
          },
          component(name, component) {
            if (!component) {
              return context.components[name];
            }
            context.components[name] = component;
            return app;
          },
          directive(name, directive) {
            if (!directive) {
              return context.directives[name];
            }
            context.directives[name] = directive;
            return app;
          },
          mount(rootContainer, isHydrate, namespace) {
            if (!isMounted) {
              const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
              vnode.appContext = context;
              if (namespace === true) {
                namespace = "svg";
              } else if (namespace === false) {
                namespace = void 0;
              }
              {
                render(vnode, rootContainer, namespace);
              }
              isMounted = true;
              app._container = rootContainer;
              rootContainer.__vue_app__ = app;
              return getComponentPublicInstance(vnode.component);
            }
          },
          onUnmount(cleanupFn) {
            pluginCleanupFns.push(cleanupFn);
          },
          unmount() {
            if (isMounted) {
              callWithAsyncErrorHandling(
                pluginCleanupFns,
                app._instance,
                16
              );
              render(null, app._container);
              delete app._container.__vue_app__;
            }
          },
          provide(key, value) {
            context.provides[key] = value;
            return app;
          },
          runWithContext(fn2) {
            const lastApp = currentApp;
            currentApp = app;
            try {
              return fn2();
            } finally {
              currentApp = lastApp;
            }
          }
        };
        return app;
      };
    }
    let currentApp = null;
    function provide(key, value) {
      if (!currentInstance) ;
      else {
        let provides = currentInstance.provides;
        const parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) {
          provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
      }
    }
    function inject(key, defaultValue, treatDefaultAsFactory = false) {
      const instance = currentInstance || currentRenderingInstance;
      if (instance || currentApp) {
        const provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
        if (provides && key in provides) {
          return provides[key];
        } else if (arguments.length > 1) {
          return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
        } else ;
      }
    }
    const internalObjectProto = {};
    const createInternalObject = () => Object.create(internalObjectProto);
    const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
    function initProps(instance, rawProps, isStateful, isSSR = false) {
      const props = {};
      const attrs = createInternalObject();
      instance.propsDefaults = /* @__PURE__ */ Object.create(null);
      setFullProps(instance, rawProps, props, attrs);
      for (const key in instance.propsOptions[0]) {
        if (!(key in props)) {
          props[key] = void 0;
        }
      }
      if (isStateful) {
        instance.props = isSSR ? props : shallowReactive(props);
      } else {
        if (!instance.type.props) {
          instance.props = attrs;
        } else {
          instance.props = props;
        }
      }
      instance.attrs = attrs;
    }
    function updateProps(instance, rawProps, rawPrevProps, optimized) {
      const {
        props,
        attrs,
        vnode: { patchFlag }
      } = instance;
      const rawCurrentProps = toRaw(props);
      const [options] = instance.propsOptions;
      let hasAttrsChanged = false;
      if (
        // always force full diff in dev
        // - #1942 if hmr is enabled with sfc component
        // - vite#872 non-sfc component used by sfc component
        (optimized || patchFlag > 0) && !(patchFlag & 16)
      ) {
        if (patchFlag & 8) {
          const propsToUpdate = instance.vnode.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            let key = propsToUpdate[i];
            if (isEmitListener(instance.emitsOptions, key)) {
              continue;
            }
            const value = rawProps[key];
            if (options) {
              if (hasOwn(attrs, key)) {
                if (value !== attrs[key]) {
                  attrs[key] = value;
                  hasAttrsChanged = true;
                }
              } else {
                const camelizedKey = camelize(key);
                props[camelizedKey] = resolvePropValue(
                  options,
                  rawCurrentProps,
                  camelizedKey,
                  value,
                  instance,
                  false
                );
              }
            } else {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            }
          }
        }
      } else {
        if (setFullProps(instance, rawProps, props, attrs)) {
          hasAttrsChanged = true;
        }
        let kebabKey;
        for (const key in rawCurrentProps) {
          if (!rawProps || // for camelCase
          !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
          // and converted to camelCase (#955)
          ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
            if (options) {
              if (rawPrevProps && // for camelCase
              (rawPrevProps[key] !== void 0 || // for kebab-case
              rawPrevProps[kebabKey] !== void 0)) {
                props[key] = resolvePropValue(
                  options,
                  rawCurrentProps,
                  key,
                  void 0,
                  instance,
                  true
                );
              }
            } else {
              delete props[key];
            }
          }
        }
        if (attrs !== rawCurrentProps) {
          for (const key in attrs) {
            if (!rawProps || !hasOwn(rawProps, key) && true) {
              delete attrs[key];
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (hasAttrsChanged) {
        trigger(instance.attrs, "set", "");
      }
    }
    function setFullProps(instance, rawProps, props, attrs) {
      const [options, needCastKeys] = instance.propsOptions;
      let hasAttrsChanged = false;
      let rawCastValues;
      if (rawProps) {
        for (let key in rawProps) {
          if (isReservedProp(key)) {
            continue;
          }
          const value = rawProps[key];
          let camelKey;
          if (options && hasOwn(options, camelKey = camelize(key))) {
            if (!needCastKeys || !needCastKeys.includes(camelKey)) {
              props[camelKey] = value;
            } else {
              (rawCastValues || (rawCastValues = {}))[camelKey] = value;
            }
          } else if (!isEmitListener(instance.emitsOptions, key)) {
            if (!(key in attrs) || value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (needCastKeys) {
        const rawCurrentProps = toRaw(props);
        const castValues = rawCastValues || EMPTY_OBJ;
        for (let i = 0; i < needCastKeys.length; i++) {
          const key = needCastKeys[i];
          props[key] = resolvePropValue(
            options,
            rawCurrentProps,
            key,
            castValues[key],
            instance,
            !hasOwn(castValues, key)
          );
        }
      }
      return hasAttrsChanged;
    }
    function resolvePropValue(options, props, key, value, instance, isAbsent) {
      const opt = options[key];
      if (opt != null) {
        const hasDefault = hasOwn(opt, "default");
        if (hasDefault && value === void 0) {
          const defaultValue = opt.default;
          if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
            const { propsDefaults } = instance;
            if (key in propsDefaults) {
              value = propsDefaults[key];
            } else {
              const reset = setCurrentInstance(instance);
              value = propsDefaults[key] = defaultValue.call(
                null,
                props
              );
              reset();
            }
          } else {
            value = defaultValue;
          }
          if (instance.ce) {
            instance.ce._setProp(key, value);
          }
        }
        if (opt[
          0
          /* shouldCast */
        ]) {
          if (isAbsent && !hasDefault) {
            value = false;
          } else if (opt[
            1
            /* shouldCastTrue */
          ] && (value === "" || value === hyphenate(key))) {
            value = true;
          }
        }
      }
      return value;
    }
    const mixinPropsCache = /* @__PURE__ */ new WeakMap();
    function normalizePropsOptions(comp, appContext, asMixin = false) {
      const cache = asMixin ? mixinPropsCache : appContext.propsCache;
      const cached = cache.get(comp);
      if (cached) {
        return cached;
      }
      const raw = comp.props;
      const normalized = {};
      const needCastKeys = [];
      let hasExtends = false;
      if (!isFunction(comp)) {
        const extendProps = (raw2) => {
          hasExtends = true;
          const [props, keys] = normalizePropsOptions(raw2, appContext, true);
          extend(normalized, props);
          if (keys) needCastKeys.push(...keys);
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendProps);
        }
        if (comp.extends) {
          extendProps(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendProps);
        }
      }
      if (!raw && !hasExtends) {
        if (isObject(comp)) {
          cache.set(comp, EMPTY_ARR);
        }
        return EMPTY_ARR;
      }
      if (isArray(raw)) {
        for (let i = 0; i < raw.length; i++) {
          const normalizedKey = camelize(raw[i]);
          if (validatePropName(normalizedKey)) {
            normalized[normalizedKey] = EMPTY_OBJ;
          }
        }
      } else if (raw) {
        for (const key in raw) {
          const normalizedKey = camelize(key);
          if (validatePropName(normalizedKey)) {
            const opt = raw[key];
            const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
            const propType = prop.type;
            let shouldCast = false;
            let shouldCastTrue = true;
            if (isArray(propType)) {
              for (let index = 0; index < propType.length; ++index) {
                const type = propType[index];
                const typeName = isFunction(type) && type.name;
                if (typeName === "Boolean") {
                  shouldCast = true;
                  break;
                } else if (typeName === "String") {
                  shouldCastTrue = false;
                }
              }
            } else {
              shouldCast = isFunction(propType) && propType.name === "Boolean";
            }
            prop[
              0
              /* shouldCast */
            ] = shouldCast;
            prop[
              1
              /* shouldCastTrue */
            ] = shouldCastTrue;
            if (shouldCast || hasOwn(prop, "default")) {
              needCastKeys.push(normalizedKey);
            }
          }
        }
      }
      const res = [normalized, needCastKeys];
      if (isObject(comp)) {
        cache.set(comp, res);
      }
      return res;
    }
    function validatePropName(key) {
      if (key[0] !== "$" && !isReservedProp(key)) {
        return true;
      }
      return false;
    }
    const isInternalKey = (key) => key[0] === "_" || key === "$stable";
    const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
    const normalizeSlot = (key, rawSlot, ctx) => {
      if (rawSlot._n) {
        return rawSlot;
      }
      const normalized = withCtx((...args) => {
        if (false) ;
        return normalizeSlotValue(rawSlot(...args));
      }, ctx);
      normalized._c = false;
      return normalized;
    };
    const normalizeObjectSlots = (rawSlots, slots, instance) => {
      const ctx = rawSlots._ctx;
      for (const key in rawSlots) {
        if (isInternalKey(key)) continue;
        const value = rawSlots[key];
        if (isFunction(value)) {
          slots[key] = normalizeSlot(key, value, ctx);
        } else if (value != null) {
          const normalized = normalizeSlotValue(value);
          slots[key] = () => normalized;
        }
      }
    };
    const normalizeVNodeSlots = (instance, children) => {
      const normalized = normalizeSlotValue(children);
      instance.slots.default = () => normalized;
    };
    const assignSlots = (slots, children, optimized) => {
      for (const key in children) {
        if (optimized || key !== "_") {
          slots[key] = children[key];
        }
      }
    };
    const initSlots = (instance, children, optimized) => {
      const slots = instance.slots = createInternalObject();
      if (instance.vnode.shapeFlag & 32) {
        const type = children._;
        if (type) {
          assignSlots(slots, children, optimized);
          if (optimized) {
            def(slots, "_", type, true);
          }
        } else {
          normalizeObjectSlots(children, slots);
        }
      } else if (children) {
        normalizeVNodeSlots(instance, children);
      }
    };
    const updateSlots = (instance, children, optimized) => {
      const { vnode, slots } = instance;
      let needDeletionCheck = true;
      let deletionComparisonTarget = EMPTY_OBJ;
      if (vnode.shapeFlag & 32) {
        const type = children._;
        if (type) {
          if (optimized && type === 1) {
            needDeletionCheck = false;
          } else {
            assignSlots(slots, children, optimized);
          }
        } else {
          needDeletionCheck = !children.$stable;
          normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
      } else if (children) {
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = { default: 1 };
      }
      if (needDeletionCheck) {
        for (const key in slots) {
          if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
            delete slots[key];
          }
        }
      }
    };
    const queuePostRenderEffect = queueEffectWithSuspense;
    function createRenderer(options) {
      return baseCreateRenderer(options);
    }
    function baseCreateRenderer(options, createHydrationFns) {
      const target = getGlobalThis();
      target.__VUE__ = true;
      const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        createComment: hostCreateComment,
        setText: hostSetText,
        setElementText: hostSetElementText,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
        setScopeId: hostSetScopeId = NOOP,
        insertStaticContent: hostInsertStaticContent
      } = options;
      const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
        if (n1 === n2) {
          return;
        }
        if (n1 && !isSameVNodeType(n1, n2)) {
          anchor = getNextHostNode(n1);
          unmount(n1, parentComponent, parentSuspense, true);
          n1 = null;
        }
        if (n2.patchFlag === -2) {
          optimized = false;
          n2.dynamicChildren = null;
        }
        const { type, ref: ref3, shapeFlag } = n2;
        switch (type) {
          case Text:
            processText(n1, n2, container, anchor);
            break;
          case Comment:
            processCommentNode(n1, n2, container, anchor);
            break;
          case Static:
            if (n1 == null) {
              mountStaticNode(n2, container, anchor, namespace);
            }
            break;
          case Fragment:
            processFragment(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            break;
          default:
            if (shapeFlag & 1) {
              processElement(
                n1,
                n2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            } else if (shapeFlag & 6) {
              processComponent(
                n1,
                n2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            } else if (shapeFlag & 64) {
              type.process(
                n1,
                n2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized,
                internals
              );
            } else if (shapeFlag & 128) {
              type.process(
                n1,
                n2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized,
                internals
              );
            } else ;
        }
        if (ref3 != null && parentComponent) {
          setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
        }
      };
      const processText = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(
            n2.el = hostCreateText(n2.children),
            container,
            anchor
          );
        } else {
          const el2 = n2.el = n1.el;
          if (n2.children !== n1.children) {
            hostSetText(el2, n2.children);
          }
        }
      };
      const processCommentNode = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(
            n2.el = hostCreateComment(n2.children || ""),
            container,
            anchor
          );
        } else {
          n2.el = n1.el;
        }
      };
      const mountStaticNode = (n2, container, anchor, namespace) => {
        [n2.el, n2.anchor] = hostInsertStaticContent(
          n2.children,
          container,
          anchor,
          namespace,
          n2.el,
          n2.anchor
        );
      };
      const moveStaticNode = ({ el: el2, anchor }, container, nextSibling) => {
        let next;
        while (el2 && el2 !== anchor) {
          next = hostNextSibling(el2);
          hostInsert(el2, container, nextSibling);
          el2 = next;
        }
        hostInsert(anchor, container, nextSibling);
      };
      const removeStaticNode = ({ el: el2, anchor }) => {
        let next;
        while (el2 && el2 !== anchor) {
          next = hostNextSibling(el2);
          hostRemove(el2);
          el2 = next;
        }
        hostRemove(anchor);
      };
      const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        if (n2.type === "svg") {
          namespace = "svg";
        } else if (n2.type === "math") {
          namespace = "mathml";
        }
        if (n1 == null) {
          mountElement(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          patchElement(
            n1,
            n2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      };
      const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        let el2;
        let vnodeHook;
        const { props, shapeFlag, transition, dirs } = vnode;
        el2 = vnode.el = hostCreateElement(
          vnode.type,
          namespace,
          props && props.is,
          props
        );
        if (shapeFlag & 8) {
          hostSetElementText(el2, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(
            vnode.children,
            el2,
            null,
            parentComponent,
            parentSuspense,
            resolveChildrenNamespace(vnode, namespace),
            slotScopeIds,
            optimized
          );
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        setScopeId(el2, vnode, vnode.scopeId, slotScopeIds, parentComponent);
        if (props) {
          for (const key in props) {
            if (key !== "value" && !isReservedProp(key)) {
              hostPatchProp(el2, key, null, props[key], namespace, parentComponent);
            }
          }
          if ("value" in props) {
            hostPatchProp(el2, "value", null, props.value, namespace);
          }
          if (vnodeHook = props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
        }
        const needCallTransitionHooks = needTransition(parentSuspense, transition);
        if (needCallTransitionHooks) {
          transition.beforeEnter(el2);
        }
        hostInsert(el2, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el2);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          }, parentSuspense);
        }
      };
      const setScopeId = (el2, vnode, scopeId, slotScopeIds, parentComponent) => {
        if (scopeId) {
          hostSetScopeId(el2, scopeId);
        }
        if (slotScopeIds) {
          for (let i = 0; i < slotScopeIds.length; i++) {
            hostSetScopeId(el2, slotScopeIds[i]);
          }
        }
        if (parentComponent) {
          let subTree = parentComponent.subTree;
          if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
            const parentVNode = parentComponent.vnode;
            setScopeId(
              el2,
              parentVNode,
              parentVNode.scopeId,
              parentVNode.slotScopeIds,
              parentComponent.parent
            );
          }
        }
      };
      const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
        for (let i = start; i < children.length; i++) {
          const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
          patch(
            null,
            child,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      };
      const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        const el2 = n2.el = n1.el;
        let { patchFlag, dynamicChildren, dirs } = n2;
        patchFlag |= n1.patchFlag & 16;
        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        let vnodeHook;
        parentComponent && toggleRecurse(parentComponent, false);
        if (vnodeHook = newProps.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        }
        if (dirs) {
          invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
        }
        parentComponent && toggleRecurse(parentComponent, true);
        if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
          hostSetElementText(el2, "");
        }
        if (dynamicChildren) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            el2,
            parentComponent,
            parentSuspense,
            resolveChildrenNamespace(n2, namespace),
            slotScopeIds
          );
        } else if (!optimized) {
          patchChildren(
            n1,
            n2,
            el2,
            null,
            parentComponent,
            parentSuspense,
            resolveChildrenNamespace(n2, namespace),
            slotScopeIds,
            false
          );
        }
        if (patchFlag > 0) {
          if (patchFlag & 16) {
            patchProps(el2, oldProps, newProps, parentComponent, namespace);
          } else {
            if (patchFlag & 2) {
              if (oldProps.class !== newProps.class) {
                hostPatchProp(el2, "class", null, newProps.class, namespace);
              }
            }
            if (patchFlag & 4) {
              hostPatchProp(el2, "style", oldProps.style, newProps.style, namespace);
            }
            if (patchFlag & 8) {
              const propsToUpdate = n2.dynamicProps;
              for (let i = 0; i < propsToUpdate.length; i++) {
                const key = propsToUpdate[i];
                const prev = oldProps[key];
                const next = newProps[key];
                if (next !== prev || key === "value") {
                  hostPatchProp(el2, key, prev, next, namespace, parentComponent);
                }
              }
            }
          }
          if (patchFlag & 1) {
            if (n1.children !== n2.children) {
              hostSetElementText(el2, n2.children);
            }
          }
        } else if (!optimized && dynamicChildren == null) {
          patchProps(el2, oldProps, newProps, parentComponent, namespace);
        }
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
          }, parentSuspense);
        }
      };
      const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
        for (let i = 0; i < newChildren.length; i++) {
          const oldVNode = oldChildren[i];
          const newVNode = newChildren[i];
          const container = (
            // oldVNode may be an errored async setup() component inside Suspense
            // which will not have a mounted element
            oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
            // of the Fragment itself so it can move its children.
            (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
            // which also requires the correct parent container
            !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
            oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
              // In other cases, the parent container is not actually used so we
              // just pass the block element here to avoid a DOM parentNode call.
              fallbackContainer
            )
          );
          patch(
            oldVNode,
            newVNode,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            true
          );
        }
      };
      const patchProps = (el2, oldProps, newProps, parentComponent, namespace) => {
        if (oldProps !== newProps) {
          if (oldProps !== EMPTY_OBJ) {
            for (const key in oldProps) {
              if (!isReservedProp(key) && !(key in newProps)) {
                hostPatchProp(
                  el2,
                  key,
                  oldProps[key],
                  null,
                  namespace,
                  parentComponent
                );
              }
            }
          }
          for (const key in newProps) {
            if (isReservedProp(key)) continue;
            const next = newProps[key];
            const prev = oldProps[key];
            if (next !== prev && key !== "value") {
              hostPatchProp(el2, key, prev, next, namespace, parentComponent);
            }
          }
          if ("value" in newProps) {
            hostPatchProp(el2, "value", oldProps.value, newProps.value, namespace);
          }
        }
      };
      const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
        const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
        let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
        if (fragmentSlotScopeIds) {
          slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        if (n1 == null) {
          hostInsert(fragmentStartAnchor, container, anchor);
          hostInsert(fragmentEndAnchor, container, anchor);
          mountChildren(
            // #10007
            // such fragment like `<></>` will be compiled into
            // a fragment which doesn't have a children.
            // In this case fallback to an empty array
            n2.children || [],
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
          // of renderSlot() with no valid children
          n1.dynamicChildren) {
            patchBlockChildren(
              n1.dynamicChildren,
              dynamicChildren,
              container,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds
            );
            if (
              // #2080 if the stable fragment has a key, it's a <template v-for> that may
              //  get moved around. Make sure all root level vnodes inherit el.
              // #2134 or if it's a component root, it may also get moved around
              // as the component is being moved.
              n2.key != null || parentComponent && n2 === parentComponent.subTree
            ) {
              traverseStaticChildren(
                n1,
                n2,
                true
                /* shallow */
              );
            }
          } else {
            patchChildren(
              n1,
              n2,
              container,
              fragmentEndAnchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      };
      const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        n2.slotScopeIds = slotScopeIds;
        if (n1 == null) {
          if (n2.shapeFlag & 512) {
            parentComponent.ctx.activate(
              n2,
              container,
              anchor,
              namespace,
              optimized
            );
          } else {
            mountComponent(
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              optimized
            );
          }
        } else {
          updateComponent(n1, n2, optimized);
        }
      };
      const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
        const instance = initialVNode.component = createComponentInstance(
          initialVNode,
          parentComponent,
          parentSuspense
        );
        if (isKeepAlive(initialVNode)) {
          instance.ctx.renderer = internals;
        }
        {
          setupComponent(instance, false, optimized);
        }
        if (instance.asyncDep) {
          parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
          if (!initialVNode.el) {
            const placeholder = instance.subTree = createVNode(Comment);
            processCommentNode(null, placeholder, container, anchor);
          }
        } else {
          setupRenderEffect(
            instance,
            initialVNode,
            container,
            anchor,
            parentSuspense,
            namespace,
            optimized
          );
        }
      };
      const updateComponent = (n1, n2, optimized) => {
        const instance = n2.component = n1.component;
        if (shouldUpdateComponent(n1, n2, optimized)) {
          if (instance.asyncDep && !instance.asyncResolved) {
            updateComponentPreRender(instance, n2, optimized);
            return;
          } else {
            instance.next = n2;
            instance.update();
          }
        } else {
          n2.el = n1.el;
          instance.vnode = n2;
        }
      };
      const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
        const componentUpdateFn = () => {
          if (!instance.isMounted) {
            let vnodeHook;
            const { el: el2, props } = initialVNode;
            const { bm: bm2, m, parent, root, type } = instance;
            const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
            toggleRecurse(instance, false);
            if (bm2) {
              invokeArrayFns(bm2);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
              invokeVNodeHook(vnodeHook, parent, initialVNode);
            }
            toggleRecurse(instance, true);
            {
              if (root.ce) {
                root.ce._injectChildStyle(type);
              }
              const subTree = instance.subTree = renderComponentRoot(instance);
              patch(
                null,
                subTree,
                container,
                anchor,
                instance,
                parentSuspense,
                namespace
              );
              initialVNode.el = subTree.el;
            }
            if (m) {
              queuePostRenderEffect(m, parentSuspense);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
              const scopedInitialVNode = initialVNode;
              queuePostRenderEffect(
                () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
                parentSuspense
              );
            }
            if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
              instance.a && queuePostRenderEffect(instance.a, parentSuspense);
            }
            instance.isMounted = true;
            initialVNode = container = anchor = null;
          } else {
            let { next, bu: bu2, u, parent, vnode } = instance;
            {
              const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
              if (nonHydratedAsyncRoot) {
                if (next) {
                  next.el = vnode.el;
                  updateComponentPreRender(instance, next, optimized);
                }
                nonHydratedAsyncRoot.asyncDep.then(() => {
                  if (!instance.isUnmounted) {
                    componentUpdateFn();
                  }
                });
                return;
              }
            }
            let originNext = next;
            let vnodeHook;
            toggleRecurse(instance, false);
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            } else {
              next = vnode;
            }
            if (bu2) {
              invokeArrayFns(bu2);
            }
            if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
              invokeVNodeHook(vnodeHook, parent, next, vnode);
            }
            toggleRecurse(instance, true);
            const nextTree = renderComponentRoot(instance);
            const prevTree = instance.subTree;
            instance.subTree = nextTree;
            patch(
              prevTree,
              nextTree,
              // parent may have changed if it's in a teleport
              hostParentNode(prevTree.el),
              // anchor may have changed if it's in a fragment
              getNextHostNode(prevTree),
              instance,
              parentSuspense,
              namespace
            );
            next.el = nextTree.el;
            if (originNext === null) {
              updateHOCHostEl(instance, nextTree.el);
            }
            if (u) {
              queuePostRenderEffect(u, parentSuspense);
            }
            if (vnodeHook = next.props && next.props.onVnodeUpdated) {
              queuePostRenderEffect(
                () => invokeVNodeHook(vnodeHook, parent, next, vnode),
                parentSuspense
              );
            }
          }
        };
        instance.scope.on();
        const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
        instance.scope.off();
        const update = instance.update = effect2.run.bind(effect2);
        const job = instance.job = effect2.runIfDirty.bind(effect2);
        job.i = instance;
        job.id = instance.uid;
        effect2.scheduler = () => queueJob(job);
        toggleRecurse(instance, true);
        update();
      };
      const updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children, optimized);
        pauseTracking();
        flushPreFlushCbs(instance);
        resetTracking();
      };
      const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const { patchFlag, shapeFlag } = n2;
        if (patchFlag > 0) {
          if (patchFlag & 128) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            return;
          } else if (patchFlag & 256) {
            patchUnkeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            return;
          }
        }
        if (shapeFlag & 8) {
          if (prevShapeFlag & 16) {
            unmountChildren(c1, parentComponent, parentSuspense);
          }
          if (c2 !== c1) {
            hostSetElementText(container, c2);
          }
        } else {
          if (prevShapeFlag & 16) {
            if (shapeFlag & 16) {
              patchKeyedChildren(
                c1,
                c2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            } else {
              unmountChildren(c1, parentComponent, parentSuspense, true);
            }
          } else {
            if (prevShapeFlag & 8) {
              hostSetElementText(container, "");
            }
            if (shapeFlag & 16) {
              mountChildren(
                c2,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            }
          }
        }
      };
      const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        c1 = c1 || EMPTY_ARR;
        c2 = c2 || EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          patch(
            c1[i],
            nextChild,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
        if (oldLength > newLength) {
          unmountChildren(
            c1,
            parentComponent,
            parentSuspense,
            true,
            false,
            commonLength
          );
        } else {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            commonLength
          );
        }
      };
      const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;
        while (i <= e1 && i <= e2) {
          const n1 = c1[i];
          const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (isSameVNodeType(n1, n2)) {
            patch(
              n1,
              n2,
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            break;
          }
          i++;
        }
        while (i <= e1 && i <= e2) {
          const n1 = c1[e1];
          const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
          if (isSameVNodeType(n1, n2)) {
            patch(
              n1,
              n2,
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            break;
          }
          e1--;
          e2--;
        }
        if (i > e1) {
          if (i <= e2) {
            const nextPos = e2 + 1;
            const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
            while (i <= e2) {
              patch(
                null,
                c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
              i++;
            }
          }
        } else if (i > e2) {
          while (i <= e1) {
            unmount(c1[i], parentComponent, parentSuspense, true);
            i++;
          }
        } else {
          const s1 = i;
          const s2 = i;
          const keyToNewIndexMap = /* @__PURE__ */ new Map();
          for (i = s2; i <= e2; i++) {
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            if (nextChild.key != null) {
              keyToNewIndexMap.set(nextChild.key, i);
            }
          }
          let j;
          let patched = 0;
          const toBePatched = e2 - s2 + 1;
          let moved = false;
          let maxNewIndexSoFar = 0;
          const newIndexToOldIndexMap = new Array(toBePatched);
          for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
          for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];
            if (patched >= toBePatched) {
              unmount(prevChild, parentComponent, parentSuspense, true);
              continue;
            }
            let newIndex;
            if (prevChild.key != null) {
              newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
              for (j = s2; j <= e2; j++) {
                if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                  newIndex = j;
                  break;
                }
              }
            }
            if (newIndex === void 0) {
              unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
              newIndexToOldIndexMap[newIndex - s2] = i + 1;
              if (newIndex >= maxNewIndexSoFar) {
                maxNewIndexSoFar = newIndex;
              } else {
                moved = true;
              }
              patch(
                prevChild,
                c2[newIndex],
                container,
                null,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
              patched++;
            }
          }
          const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
          j = increasingNewIndexSequence.length - 1;
          for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const nextChild = c2[nextIndex];
            const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
            if (newIndexToOldIndexMap[i] === 0) {
              patch(
                null,
                nextChild,
                container,
                anchor,
                parentComponent,
                parentSuspense,
                namespace,
                slotScopeIds,
                optimized
              );
            } else if (moved) {
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                move(nextChild, container, anchor, 2);
              } else {
                j--;
              }
            }
          }
        }
      };
      const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
        const { el: el2, type, transition, children, shapeFlag } = vnode;
        if (shapeFlag & 6) {
          move(vnode.component.subTree, container, anchor, moveType);
          return;
        }
        if (shapeFlag & 128) {
          vnode.suspense.move(container, anchor, moveType);
          return;
        }
        if (shapeFlag & 64) {
          type.move(vnode, container, anchor, internals);
          return;
        }
        if (type === Fragment) {
          hostInsert(el2, container, anchor);
          for (let i = 0; i < children.length; i++) {
            move(children[i], container, anchor, moveType);
          }
          hostInsert(vnode.anchor, container, anchor);
          return;
        }
        if (type === Static) {
          moveStaticNode(vnode, container, anchor);
          return;
        }
        const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
        if (needTransition2) {
          if (moveType === 0) {
            transition.beforeEnter(el2);
            hostInsert(el2, container, anchor);
            queuePostRenderEffect(() => transition.enter(el2), parentSuspense);
          } else {
            const { leave, delayLeave, afterLeave } = transition;
            const remove22 = () => hostInsert(el2, container, anchor);
            const performLeave = () => {
              leave(el2, () => {
                remove22();
                afterLeave && afterLeave();
              });
            };
            if (delayLeave) {
              delayLeave(el2, remove22, performLeave);
            } else {
              performLeave();
            }
          }
        } else {
          hostInsert(el2, container, anchor);
        }
      };
      const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
        const {
          type,
          props,
          ref: ref3,
          children,
          dynamicChildren,
          shapeFlag,
          patchFlag,
          dirs,
          cacheIndex
        } = vnode;
        if (patchFlag === -2) {
          optimized = false;
        }
        if (ref3 != null) {
          setRef(ref3, null, parentSuspense, vnode, true);
        }
        if (cacheIndex != null) {
          parentComponent.renderCache[cacheIndex] = void 0;
        }
        if (shapeFlag & 256) {
          parentComponent.ctx.deactivate(vnode);
          return;
        }
        const shouldInvokeDirs = shapeFlag & 1 && dirs;
        const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
        let vnodeHook;
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        if (shapeFlag & 6) {
          unmountComponent(vnode.component, parentSuspense, doRemove);
        } else {
          if (shapeFlag & 128) {
            vnode.suspense.unmount(parentSuspense, doRemove);
            return;
          }
          if (shouldInvokeDirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
          }
          if (shapeFlag & 64) {
            vnode.type.remove(
              vnode,
              parentComponent,
              parentSuspense,
              internals,
              doRemove
            );
          } else if (dynamicChildren && // #5154
          // when v-once is used inside a block, setBlockTracking(-1) marks the
          // parent block with hasOnce: true
          // so that it doesn't take the fast path during unmount - otherwise
          // components nested in v-once are never unmounted.
          !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
          (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
            unmountChildren(
              dynamicChildren,
              parentComponent,
              parentSuspense,
              false,
              true
            );
          } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
            unmountChildren(children, parentComponent, parentSuspense);
          }
          if (doRemove) {
            remove2(vnode);
          }
        }
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
          }, parentSuspense);
        }
      };
      const remove2 = (vnode) => {
        const { type, el: el2, anchor, transition } = vnode;
        if (type === Fragment) {
          {
            removeFragment(el2, anchor);
          }
          return;
        }
        if (type === Static) {
          removeStaticNode(vnode);
          return;
        }
        const performRemove = () => {
          hostRemove(el2);
          if (transition && !transition.persisted && transition.afterLeave) {
            transition.afterLeave();
          }
        };
        if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
          const { leave, delayLeave } = transition;
          const performLeave = () => leave(el2, performRemove);
          if (delayLeave) {
            delayLeave(vnode.el, performRemove, performLeave);
          } else {
            performLeave();
          }
        } else {
          performRemove();
        }
      };
      const removeFragment = (cur, end) => {
        let next;
        while (cur !== end) {
          next = hostNextSibling(cur);
          hostRemove(cur);
          cur = next;
        }
        hostRemove(end);
      };
      const unmountComponent = (instance, parentSuspense, doRemove) => {
        const { bum, scope, job, subTree, um: um2, m, a } = instance;
        invalidateMount(m);
        invalidateMount(a);
        if (bum) {
          invokeArrayFns(bum);
        }
        scope.stop();
        if (job) {
          job.flags |= 8;
          unmount(subTree, instance, parentSuspense, doRemove);
        }
        if (um2) {
          queuePostRenderEffect(um2, parentSuspense);
        }
        queuePostRenderEffect(() => {
          instance.isUnmounted = true;
        }, parentSuspense);
        if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0) {
            parentSuspense.resolve();
          }
        }
      };
      const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
        for (let i = start; i < children.length; i++) {
          unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
        }
      };
      const getNextHostNode = (vnode) => {
        if (vnode.shapeFlag & 6) {
          return getNextHostNode(vnode.component.subTree);
        }
        if (vnode.shapeFlag & 128) {
          return vnode.suspense.next();
        }
        const el2 = hostNextSibling(vnode.anchor || vnode.el);
        const teleportEnd = el2 && el2[TeleportEndKey];
        return teleportEnd ? hostNextSibling(teleportEnd) : el2;
      };
      let isFlushing = false;
      const render = (vnode, container, namespace) => {
        if (vnode == null) {
          if (container._vnode) {
            unmount(container._vnode, null, null, true);
          }
        } else {
          patch(
            container._vnode || null,
            vnode,
            container,
            null,
            null,
            null,
            namespace
          );
        }
        container._vnode = vnode;
        if (!isFlushing) {
          isFlushing = true;
          flushPreFlushCbs();
          flushPostFlushCbs();
          isFlushing = false;
        }
      };
      const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove2,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
      };
      let hydrate;
      return {
        render,
        hydrate,
        createApp: createAppAPI(render)
      };
    }
    function resolveChildrenNamespace({ type, props }, currentNamespace) {
      return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
    }
    function toggleRecurse({ effect: effect2, job }, allowed) {
      if (allowed) {
        effect2.flags |= 32;
        job.flags |= 4;
      } else {
        effect2.flags &= -33;
        job.flags &= -5;
      }
    }
    function needTransition(parentSuspense, transition) {
      return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    }
    function traverseStaticChildren(n1, n2, shallow = false) {
      const ch1 = n1.children;
      const ch2 = n2.children;
      if (isArray(ch1) && isArray(ch2)) {
        for (let i = 0; i < ch1.length; i++) {
          const c1 = ch1[i];
          let c2 = ch2[i];
          if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
            if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
              c2 = ch2[i] = cloneIfMounted(ch2[i]);
              c2.el = c1.el;
            }
            if (!shallow && c2.patchFlag !== -2)
              traverseStaticChildren(c1, c2);
          }
          if (c2.type === Text) {
            c2.el = c1.el;
          }
        }
      }
    }
    function getSequence(arr) {
      const p2 = arr.slice();
      const result = [0];
      let i, j, u, v, c;
      const len = arr.length;
      for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
          j = result[result.length - 1];
          if (arr[j] < arrI) {
            p2[i] = j;
            result.push(i);
            continue;
          }
          u = 0;
          v = result.length - 1;
          while (u < v) {
            c = u + v >> 1;
            if (arr[result[c]] < arrI) {
              u = c + 1;
            } else {
              v = c;
            }
          }
          if (arrI < arr[result[u]]) {
            if (u > 0) {
              p2[i] = result[u - 1];
            }
            result[u] = i;
          }
        }
      }
      u = result.length;
      v = result[u - 1];
      while (u-- > 0) {
        result[u] = v;
        v = p2[v];
      }
      return result;
    }
    function locateNonHydratedAsyncRoot(instance) {
      const subComponent = instance.subTree.component;
      if (subComponent) {
        if (subComponent.asyncDep && !subComponent.asyncResolved) {
          return subComponent;
        } else {
          return locateNonHydratedAsyncRoot(subComponent);
        }
      }
    }
    function invalidateMount(hooks) {
      if (hooks) {
        for (let i = 0; i < hooks.length; i++)
          hooks[i].flags |= 8;
      }
    }
    const ssrContextKey = Symbol.for("v-scx");
    const useSSRContext = () => {
      {
        const ctx = inject(ssrContextKey);
        return ctx;
      }
    };
    function watch(source, cb2, options) {
      return doWatch(source, cb2, options);
    }
    function doWatch(source, cb2, options = EMPTY_OBJ) {
      const { immediate, deep, flush, once } = options;
      const baseWatchOptions = extend({}, options);
      const runsImmediately = cb2 && immediate || !cb2 && flush !== "post";
      let ssrCleanup;
      if (isInSSRComponentSetup) {
        if (flush === "sync") {
          const ctx = useSSRContext();
          ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
        } else if (!runsImmediately) {
          const watchStopHandle = () => {
          };
          watchStopHandle.stop = NOOP;
          watchStopHandle.resume = NOOP;
          watchStopHandle.pause = NOOP;
          return watchStopHandle;
        }
      }
      const instance = currentInstance;
      baseWatchOptions.call = (fn2, type, args) => callWithAsyncErrorHandling(fn2, instance, type, args);
      let isPre = false;
      if (flush === "post") {
        baseWatchOptions.scheduler = (job) => {
          queuePostRenderEffect(job, instance && instance.suspense);
        };
      } else if (flush !== "sync") {
        isPre = true;
        baseWatchOptions.scheduler = (job, isFirstRun) => {
          if (isFirstRun) {
            job();
          } else {
            queueJob(job);
          }
        };
      }
      baseWatchOptions.augmentJob = (job) => {
        if (cb2) {
          job.flags |= 4;
        }
        if (isPre) {
          job.flags |= 2;
          if (instance) {
            job.id = instance.uid;
            job.i = instance;
          }
        }
      };
      const watchHandle = watch$1(source, cb2, baseWatchOptions);
      if (isInSSRComponentSetup) {
        if (ssrCleanup) {
          ssrCleanup.push(watchHandle);
        } else if (runsImmediately) {
          watchHandle();
        }
      }
      return watchHandle;
    }
    function instanceWatch(source, value, options) {
      const publicThis = this.proxy;
      const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
      let cb2;
      if (isFunction(value)) {
        cb2 = value;
      } else {
        cb2 = value.handler;
        options = value;
      }
      const reset = setCurrentInstance(this);
      const res = doWatch(getter, cb2.bind(publicThis), options);
      reset();
      return res;
    }
    function createPathGetter(ctx, path) {
      const segments = path.split(".");
      return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) {
          cur = cur[segments[i]];
        }
        return cur;
      };
    }
    const getModelModifiers = (props, modelName) => {
      return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
    };
    function emit(instance, event, ...rawArgs) {
      if (instance.isUnmounted) return;
      const props = instance.vnode.props || EMPTY_OBJ;
      let args = rawArgs;
      const isModelListener2 = event.startsWith("update:");
      const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
      if (modifiers) {
        if (modifiers.trim) {
          args = rawArgs.map((a) => isString(a) ? a.trim() : a);
        }
        if (modifiers.number) {
          args = rawArgs.map(looseToNumber);
        }
      }
      let handlerName;
      let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
      props[handlerName = toHandlerKey(camelize(event))];
      if (!handler && isModelListener2) {
        handler = props[handlerName = toHandlerKey(hyphenate(event))];
      }
      if (handler) {
        callWithAsyncErrorHandling(
          handler,
          instance,
          6,
          args
        );
      }
      const onceHandler = props[handlerName + `Once`];
      if (onceHandler) {
        if (!instance.emitted) {
          instance.emitted = {};
        } else if (instance.emitted[handlerName]) {
          return;
        }
        instance.emitted[handlerName] = true;
        callWithAsyncErrorHandling(
          onceHandler,
          instance,
          6,
          args
        );
      }
    }
    function normalizeEmitsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.emitsCache;
      const cached = cache.get(comp);
      if (cached !== void 0) {
        return cached;
      }
      const raw = comp.emits;
      let normalized = {};
      let hasExtends = false;
      if (!isFunction(comp)) {
        const extendEmits = (raw2) => {
          const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
          if (normalizedFromExtend) {
            hasExtends = true;
            extend(normalized, normalizedFromExtend);
          }
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendEmits);
        }
        if (comp.extends) {
          extendEmits(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendEmits);
        }
      }
      if (!raw && !hasExtends) {
        if (isObject(comp)) {
          cache.set(comp, null);
        }
        return null;
      }
      if (isArray(raw)) {
        raw.forEach((key) => normalized[key] = null);
      } else {
        extend(normalized, raw);
      }
      if (isObject(comp)) {
        cache.set(comp, normalized);
      }
      return normalized;
    }
    function isEmitListener(options, key) {
      if (!options || !isOn(key)) {
        return false;
      }
      key = key.slice(2).replace(/Once$/, "");
      return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
    }
    function markAttrsAccessed() {
    }
    function renderComponentRoot(instance) {
      const {
        type: Component,
        vnode,
        proxy,
        withProxy,
        propsOptions: [propsOptions],
        slots,
        attrs,
        emit: emit2,
        render,
        renderCache,
        props,
        data,
        setupState,
        ctx,
        inheritAttrs
      } = instance;
      const prev = setCurrentRenderingInstance(instance);
      let result;
      let fallthroughAttrs;
      try {
        if (vnode.shapeFlag & 4) {
          const proxyToUse = withProxy || proxy;
          const thisProxy = false ? new Proxy(proxyToUse, {
            get(target, key, receiver) {
              warn$1(
                `Property '${String(
                  key
                )}' was accessed via 'this'. Avoid using 'this' in templates.`
              );
              return Reflect.get(target, key, receiver);
            }
          }) : proxyToUse;
          result = normalizeVNode(
            render.call(
              thisProxy,
              proxyToUse,
              renderCache,
              false ? shallowReadonly(props) : props,
              setupState,
              data,
              ctx
            )
          );
          fallthroughAttrs = attrs;
        } else {
          const render2 = Component;
          if (false) ;
          result = normalizeVNode(
            render2.length > 1 ? render2(
              false ? shallowReadonly(props) : props,
              false ? {
                get attrs() {
                  markAttrsAccessed();
                  return shallowReadonly(attrs);
                },
                slots,
                emit: emit2
              } : { attrs, slots, emit: emit2 }
            ) : render2(
              false ? shallowReadonly(props) : props,
              null
            )
          );
          fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
        }
      } catch (err) {
        blockStack.length = 0;
        handleError(err, instance, 1);
        result = createVNode(Comment);
      }
      let root = result;
      if (fallthroughAttrs && inheritAttrs !== false) {
        const keys = Object.keys(fallthroughAttrs);
        const { shapeFlag } = root;
        if (keys.length) {
          if (shapeFlag & (1 | 6)) {
            if (propsOptions && keys.some(isModelListener)) {
              fallthroughAttrs = filterModelListeners(
                fallthroughAttrs,
                propsOptions
              );
            }
            root = cloneVNode(root, fallthroughAttrs, false, true);
          }
        }
      }
      if (vnode.dirs) {
        root = cloneVNode(root, null, false, true);
        root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
      }
      if (vnode.transition) {
        setTransitionHooks(root, vnode.transition);
      }
      {
        result = root;
      }
      setCurrentRenderingInstance(prev);
      return result;
    }
    const getFunctionalFallthrough = (attrs) => {
      let res;
      for (const key in attrs) {
        if (key === "class" || key === "style" || isOn(key)) {
          (res || (res = {}))[key] = attrs[key];
        }
      }
      return res;
    };
    const filterModelListeners = (attrs, props) => {
      const res = {};
      for (const key in attrs) {
        if (!isModelListener(key) || !(key.slice(9) in props)) {
          res[key] = attrs[key];
        }
      }
      return res;
    };
    function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
      const { props: prevProps, children: prevChildren, component } = prevVNode;
      const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
      const emits = component.emitsOptions;
      if (nextVNode.dirs || nextVNode.transition) {
        return true;
      }
      if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024) {
          return true;
        }
        if (patchFlag & 16) {
          if (!prevProps) {
            return !!nextProps;
          }
          return hasPropsChanged(prevProps, nextProps, emits);
        } else if (patchFlag & 8) {
          const dynamicProps = nextVNode.dynamicProps;
          for (let i = 0; i < dynamicProps.length; i++) {
            const key = dynamicProps[i];
            if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
              return true;
            }
          }
        }
      } else {
        if (prevChildren || nextChildren) {
          if (!nextChildren || !nextChildren.$stable) {
            return true;
          }
        }
        if (prevProps === nextProps) {
          return false;
        }
        if (!prevProps) {
          return !!nextProps;
        }
        if (!nextProps) {
          return true;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      }
      return false;
    }
    function hasPropsChanged(prevProps, nextProps, emitsOptions) {
      const nextKeys = Object.keys(nextProps);
      if (nextKeys.length !== Object.keys(prevProps).length) {
        return true;
      }
      for (let i = 0; i < nextKeys.length; i++) {
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
          return true;
        }
      }
      return false;
    }
    function updateHOCHostEl({ vnode, parent }, el2) {
      while (parent) {
        const root = parent.subTree;
        if (root.suspense && root.suspense.activeBranch === vnode) {
          root.el = vnode.el;
        }
        if (root === vnode) {
          (vnode = parent.vnode).el = el2;
          parent = parent.parent;
        } else {
          break;
        }
      }
    }
    const isSuspense = (type) => type.__isSuspense;
    function queueEffectWithSuspense(fn2, suspense) {
      if (suspense && suspense.pendingBranch) {
        if (isArray(fn2)) {
          suspense.effects.push(...fn2);
        } else {
          suspense.effects.push(fn2);
        }
      } else {
        queuePostFlushCb(fn2);
      }
    }
    const Fragment = Symbol.for("v-fgt");
    const Text = Symbol.for("v-txt");
    const Comment = Symbol.for("v-cmt");
    const Static = Symbol.for("v-stc");
    const blockStack = [];
    let currentBlock = null;
    function openBlock(disableTracking = false) {
      blockStack.push(currentBlock = disableTracking ? null : []);
    }
    function closeBlock() {
      blockStack.pop();
      currentBlock = blockStack[blockStack.length - 1] || null;
    }
    let isBlockTreeEnabled = 1;
    function setBlockTracking(value, inVOnce = false) {
      isBlockTreeEnabled += value;
      if (value < 0 && currentBlock && inVOnce) {
        currentBlock.hasOnce = true;
      }
    }
    function setupBlock(vnode) {
      vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
      closeBlock();
      if (isBlockTreeEnabled > 0 && currentBlock) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
      return setupBlock(
        createBaseVNode(
          type,
          props,
          children,
          patchFlag,
          dynamicProps,
          shapeFlag,
          true
        )
      );
    }
    function isVNode(value) {
      return value ? value.__v_isVNode === true : false;
    }
    function isSameVNodeType(n1, n2) {
      return n1.type === n2.type && n1.key === n2.key;
    }
    const normalizeKey = ({ key }) => key != null ? key : null;
    const normalizeRef = ({
      ref: ref3,
      ref_key,
      ref_for
    }) => {
      if (typeof ref3 === "number") {
        ref3 = "" + ref3;
      }
      return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
    };
    function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
      const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null,
        ctx: currentRenderingInstance
      };
      if (needFullChildrenNormalization) {
        normalizeChildren(vnode, children);
        if (shapeFlag & 128) {
          type.normalize(vnode);
        }
      } else if (children) {
        vnode.shapeFlag |= isString(children) ? 8 : 16;
      }
      if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
      !isBlockNode && // has current parent block
      currentBlock && // presence of a patch flag indicates this node needs patching on updates.
      // component nodes also should always be patched, because even if the
      // component doesn't need to update, it needs to persist the instance on to
      // the next vnode so that it can be properly unmounted later.
      (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
      // vnode should not be considered dynamic due to handler caching.
      vnode.patchFlag !== 32) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    const createVNode = _createVNode;
    function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
      if (!type || type === NULL_DYNAMIC_COMPONENT) {
        type = Comment;
      }
      if (isVNode(type)) {
        const cloned = cloneVNode(
          type,
          props,
          true
          /* mergeRef: true */
        );
        if (children) {
          normalizeChildren(cloned, children);
        }
        if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
          if (cloned.shapeFlag & 6) {
            currentBlock[currentBlock.indexOf(type)] = cloned;
          } else {
            currentBlock.push(cloned);
          }
        }
        cloned.patchFlag = -2;
        return cloned;
      }
      if (isClassComponent(type)) {
        type = type.__vccOpts;
      }
      if (props) {
        props = guardReactiveProps(props);
        let { class: klass, style } = props;
        if (klass && !isString(klass)) {
          props.class = normalizeClass(klass);
        }
        if (isObject(style)) {
          if (isProxy(style) && !isArray(style)) {
            style = extend({}, style);
          }
          props.style = normalizeStyle(style);
        }
      }
      const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
      return createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        isBlockNode,
        true
      );
    }
    function guardReactiveProps(props) {
      if (!props) return null;
      return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
    }
    function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
      const { props, ref: ref3, patchFlag, children, transition } = vnode;
      const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
      const cloned = {
        __v_isVNode: true,
        __v_skip: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref ? (
          // #2078 in the case of <component :is="vnode" ref="extra"/>
          // if the vnode itself already has a ref, cloneVNode will need to merge
          // the refs so the single vnode can be set on multiple refs
          mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
        ) : ref3,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children,
        target: vnode.target,
        targetStart: vnode.targetStart,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: preserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition,
        // These should technically only be non-null on mounted VNodes. However,
        // they *should* be copied for kept-alive vnodes. So we just always copy
        // them since them being non-null during a mount doesn't affect the logic as
        // they will simply be overwritten.
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor,
        ctx: vnode.ctx,
        ce: vnode.ce
      };
      if (transition && cloneTransition) {
        setTransitionHooks(
          cloned,
          transition.clone(cloned)
        );
      }
      return cloned;
    }
    function createTextVNode(text = " ", flag = 0) {
      return createVNode(Text, null, text, flag);
    }
    function normalizeVNode(child) {
      if (child == null || typeof child === "boolean") {
        return createVNode(Comment);
      } else if (isArray(child)) {
        return createVNode(
          Fragment,
          null,
          // #3666, avoid reference pollution when reusing vnode
          child.slice()
        );
      } else if (isVNode(child)) {
        return cloneIfMounted(child);
      } else {
        return createVNode(Text, null, String(child));
      }
    }
    function cloneIfMounted(child) {
      return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
    }
    function normalizeChildren(vnode, children) {
      let type = 0;
      const { shapeFlag } = vnode;
      if (children == null) {
        children = null;
      } else if (isArray(children)) {
        type = 16;
      } else if (typeof children === "object") {
        if (shapeFlag & (1 | 64)) {
          const slot = children.default;
          if (slot) {
            slot._c && (slot._d = false);
            normalizeChildren(vnode, slot());
            slot._c && (slot._d = true);
          }
          return;
        } else {
          type = 32;
          const slotFlag = children._;
          if (!slotFlag && !isInternalObject(children)) {
            children._ctx = currentRenderingInstance;
          } else if (slotFlag === 3 && currentRenderingInstance) {
            if (currentRenderingInstance.slots._ === 1) {
              children._ = 1;
            } else {
              children._ = 2;
              vnode.patchFlag |= 1024;
            }
          }
        }
      } else if (isFunction(children)) {
        children = { default: children, _ctx: currentRenderingInstance };
        type = 32;
      } else {
        children = String(children);
        if (shapeFlag & 64) {
          type = 16;
          children = [createTextVNode(children)];
        } else {
          type = 8;
        }
      }
      vnode.children = children;
      vnode.shapeFlag |= type;
    }
    function mergeProps(...args) {
      const ret = {};
      for (let i = 0; i < args.length; i++) {
        const toMerge = args[i];
        for (const key in toMerge) {
          if (key === "class") {
            if (ret.class !== toMerge.class) {
              ret.class = normalizeClass([ret.class, toMerge.class]);
            }
          } else if (key === "style") {
            ret.style = normalizeStyle([ret.style, toMerge.style]);
          } else if (isOn(key)) {
            const existing = ret[key];
            const incoming = toMerge[key];
            if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
              ret[key] = existing ? [].concat(existing, incoming) : incoming;
            }
          } else if (key !== "") {
            ret[key] = toMerge[key];
          }
        }
      }
      return ret;
    }
    function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
      callWithAsyncErrorHandling(hook, instance, 7, [
        vnode,
        prevVNode
      ]);
    }
    const emptyAppContext = createAppContext();
    let uid = 0;
    function createComponentInstance(vnode, parent, suspense) {
      const type = vnode.type;
      const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
      const instance = {
        uid: uid++,
        vnode,
        type,
        parent,
        appContext,
        root: null,
        // to be immediately set
        next: null,
        subTree: null,
        // will be set synchronously right after creation
        effect: null,
        update: null,
        // will be set synchronously right after creation
        job: null,
        scope: new EffectScope(
          true
          /* detached */
        ),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        ids: parent ? parent.ids : ["", 0, 0],
        accessCache: null,
        renderCache: [],
        // local resolved assets
        components: null,
        directives: null,
        // resolved props and emits options
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        // emit
        emit: null,
        // to be set immediately
        emitted: null,
        // props default value
        propsDefaults: EMPTY_OBJ,
        // inheritAttrs
        inheritAttrs: type.inheritAttrs,
        // state
        ctx: EMPTY_OBJ,
        data: EMPTY_OBJ,
        props: EMPTY_OBJ,
        attrs: EMPTY_OBJ,
        slots: EMPTY_OBJ,
        refs: EMPTY_OBJ,
        setupState: EMPTY_OBJ,
        setupContext: null,
        // suspense related
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        // lifecycle hooks
        // not using enums here because it results in computed properties
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
      };
      {
        instance.ctx = { _: instance };
      }
      instance.root = parent ? parent.root : instance;
      instance.emit = emit.bind(null, instance);
      if (vnode.ce) {
        vnode.ce(instance);
      }
      return instance;
    }
    let currentInstance = null;
    let internalSetCurrentInstance;
    let setInSSRSetupState;
    {
      const g = getGlobalThis();
      const registerGlobalSetter = (key, setter) => {
        let setters;
        if (!(setters = g[key])) setters = g[key] = [];
        setters.push(setter);
        return (v) => {
          if (setters.length > 1) setters.forEach((set) => set(v));
          else setters[0](v);
        };
      };
      internalSetCurrentInstance = registerGlobalSetter(
        `__VUE_INSTANCE_SETTERS__`,
        (v) => currentInstance = v
      );
      setInSSRSetupState = registerGlobalSetter(
        `__VUE_SSR_SETTERS__`,
        (v) => isInSSRComponentSetup = v
      );
    }
    const setCurrentInstance = (instance) => {
      const prev = currentInstance;
      internalSetCurrentInstance(instance);
      instance.scope.on();
      return () => {
        instance.scope.off();
        internalSetCurrentInstance(prev);
      };
    };
    const unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off();
      internalSetCurrentInstance(null);
    };
    function isStatefulComponent(instance) {
      return instance.vnode.shapeFlag & 4;
    }
    let isInSSRComponentSetup = false;
    function setupComponent(instance, isSSR = false, optimized = false) {
      isSSR && setInSSRSetupState(isSSR);
      const { props, children } = instance.vnode;
      const isStateful = isStatefulComponent(instance);
      initProps(instance, props, isStateful, isSSR);
      initSlots(instance, children, optimized);
      const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
      isSSR && setInSSRSetupState(false);
      return setupResult;
    }
    function setupStatefulComponent(instance, isSSR) {
      const Component = instance.type;
      instance.accessCache = /* @__PURE__ */ Object.create(null);
      instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
      const { setup } = Component;
      if (setup) {
        pauseTracking();
        const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
        const reset = setCurrentInstance(instance);
        const setupResult = callWithErrorHandling(
          setup,
          instance,
          0,
          [
            instance.props,
            setupContext
          ]
        );
        const isAsyncSetup = isPromise(setupResult);
        resetTracking();
        reset();
        if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
          markAsyncBoundary(instance);
        }
        if (isAsyncSetup) {
          setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
          if (isSSR) {
            return setupResult.then((resolvedResult) => {
              handleSetupResult(instance, resolvedResult);
            }).catch((e) => {
              handleError(e, instance, 0);
            });
          } else {
            instance.asyncDep = setupResult;
          }
        } else {
          handleSetupResult(instance, setupResult);
        }
      } else {
        finishComponentSetup(instance);
      }
    }
    function handleSetupResult(instance, setupResult, isSSR) {
      if (isFunction(setupResult)) {
        if (instance.type.__ssrInlineRender) {
          instance.ssrRender = setupResult;
        } else {
          instance.render = setupResult;
        }
      } else if (isObject(setupResult)) {
        instance.setupState = proxyRefs(setupResult);
      } else ;
      finishComponentSetup(instance);
    }
    function finishComponentSetup(instance, isSSR, skipOptions) {
      const Component = instance.type;
      if (!instance.render) {
        instance.render = Component.render || NOOP;
      }
      {
        const reset = setCurrentInstance(instance);
        pauseTracking();
        try {
          applyOptions(instance);
        } finally {
          resetTracking();
          reset();
        }
      }
    }
    const attrsProxyHandlers = {
      get(target, key) {
        track(target, "get", "");
        return target[key];
      }
    };
    function createSetupContext(instance) {
      const expose = (exposed) => {
        instance.exposed = exposed || {};
      };
      {
        return {
          attrs: new Proxy(instance.attrs, attrsProxyHandlers),
          slots: instance.slots,
          emit: instance.emit,
          expose
        };
      }
    }
    function getComponentPublicInstance(instance) {
      if (instance.exposed) {
        return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
          get(target, key) {
            if (key in target) {
              return target[key];
            } else if (key in publicPropertiesMap) {
              return publicPropertiesMap[key](instance);
            }
          },
          has(target, key) {
            return key in target || key in publicPropertiesMap;
          }
        }));
      } else {
        return instance.proxy;
      }
    }
    const classifyRE = /(?:^|[-_])(\w)/g;
    const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
    function getComponentName(Component, includeInferred = true) {
      return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
    }
    function formatComponentName(instance, Component, isRoot = false) {
      let name = getComponentName(Component);
      if (!name && Component.__file) {
        const match = Component.__file.match(/([^/\\]+)\.\w+$/);
        if (match) {
          name = match[1];
        }
      }
      if (!name && instance && instance.parent) {
        const inferFromRegistry = (registry) => {
          for (const key in registry) {
            if (registry[key] === Component) {
              return key;
            }
          }
        };
        name = inferFromRegistry(
          instance.components || instance.parent.type.components
        ) || inferFromRegistry(instance.appContext.components);
      }
      return name ? classify(name) : isRoot ? `App` : `Anonymous`;
    }
    function isClassComponent(value) {
      return isFunction(value) && "__vccOpts" in value;
    }
    const computed = (getterOrOptions, debugOptions) => {
      const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
      return c;
    };
    const version = "3.5.13";
    /**
    * @vue/runtime-dom v3.5.13
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    let policy = void 0;
    const tt$5 = typeof window !== "undefined" && window.trustedTypes;
    if (tt$5) {
      try {
        policy = /* @__PURE__ */ tt$5.createPolicy("vue", {
          createHTML: (val) => val
        });
      } catch (e) {
      }
    }
    const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
    const svgNS = "http://www.w3.org/2000/svg";
    const mathmlNS = "http://www.w3.org/1998/Math/MathML";
    const doc = typeof document !== "undefined" ? document : null;
    const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
    const nodeOps = {
      insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
      },
      remove: (child) => {
        const parent = child.parentNode;
        if (parent) {
          parent.removeChild(child);
        }
      },
      createElement: (tag, namespace, is2, props) => {
        const el2 = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is2 ? doc.createElement(tag, { is: is2 }) : doc.createElement(tag);
        if (tag === "select" && props && props.multiple != null) {
          el2.setAttribute("multiple", props.multiple);
        }
        return el2;
      },
      createText: (text) => doc.createTextNode(text),
      createComment: (text) => doc.createComment(text),
      setText: (node, text) => {
        node.nodeValue = text;
      },
      setElementText: (el2, text) => {
        el2.textContent = text;
      },
      parentNode: (node) => node.parentNode,
      nextSibling: (node) => node.nextSibling,
      querySelector: (selector) => doc.querySelector(selector),
      setScopeId(el2, id2) {
        el2.setAttribute(id2, "");
      },
      // __UNSAFE__
      // Reason: innerHTML.
      // Static content here can only come from compiled templates.
      // As long as the user only uses trusted templates, this is safe.
      insertStaticContent(content, parent, anchor, namespace, start, end) {
        const before = anchor ? anchor.previousSibling : parent.lastChild;
        if (start && (start === end || start.nextSibling)) {
          while (true) {
            parent.insertBefore(start.cloneNode(true), anchor);
            if (start === end || !(start = start.nextSibling)) break;
          }
        } else {
          templateContainer.innerHTML = unsafeToTrustedHTML(
            namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
          );
          const template = templateContainer.content;
          if (namespace === "svg" || namespace === "mathml") {
            const wrapper = template.firstChild;
            while (wrapper.firstChild) {
              template.appendChild(wrapper.firstChild);
            }
            template.removeChild(wrapper);
          }
          parent.insertBefore(template, anchor);
        }
        return [
          // first
          before ? before.nextSibling : parent.firstChild,
          // last
          anchor ? anchor.previousSibling : parent.lastChild
        ];
      }
    };
    const vtcKey = Symbol("_vtc");
    function patchClass(el2, value, isSVG) {
      const transitionClasses = el2[vtcKey];
      if (transitionClasses) {
        value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
      }
      if (value == null) {
        el2.removeAttribute("class");
      } else if (isSVG) {
        el2.setAttribute("class", value);
      } else {
        el2.className = value;
      }
    }
    const vShowOriginalDisplay = Symbol("_vod");
    const vShowHidden = Symbol("_vsh");
    const CSS_VAR_TEXT = Symbol("");
    const displayRE = /(^|;)\s*display\s*:/;
    function patchStyle(el2, prev, next) {
      const style = el2.style;
      const isCssString = isString(next);
      let hasControlledDisplay = false;
      if (next && !isCssString) {
        if (prev) {
          if (!isString(prev)) {
            for (const key in prev) {
              if (next[key] == null) {
                setStyle(style, key, "");
              }
            }
          } else {
            for (const prevStyle of prev.split(";")) {
              const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
              if (next[key] == null) {
                setStyle(style, key, "");
              }
            }
          }
        }
        for (const key in next) {
          if (key === "display") {
            hasControlledDisplay = true;
          }
          setStyle(style, key, next[key]);
        }
      } else {
        if (isCssString) {
          if (prev !== next) {
            const cssVarText = style[CSS_VAR_TEXT];
            if (cssVarText) {
              next += ";" + cssVarText;
            }
            style.cssText = next;
            hasControlledDisplay = displayRE.test(next);
          }
        } else if (prev) {
          el2.removeAttribute("style");
        }
      }
      if (vShowOriginalDisplay in el2) {
        el2[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
        if (el2[vShowHidden]) {
          style.display = "none";
        }
      }
    }
    const importantRE = /\s*!important$/;
    function setStyle(style, name, val) {
      if (isArray(val)) {
        val.forEach((v) => setStyle(style, name, v));
      } else {
        if (val == null) val = "";
        if (name.startsWith("--")) {
          style.setProperty(name, val);
        } else {
          const prefixed = autoPrefix(style, name);
          if (importantRE.test(val)) {
            style.setProperty(
              hyphenate(prefixed),
              val.replace(importantRE, ""),
              "important"
            );
          } else {
            style[prefixed] = val;
          }
        }
      }
    }
    const prefixes = ["Webkit", "Moz", "ms"];
    const prefixCache = {};
    function autoPrefix(style, rawName) {
      const cached = prefixCache[rawName];
      if (cached) {
        return cached;
      }
      let name = camelize(rawName);
      if (name !== "filter" && name in style) {
        return prefixCache[rawName] = name;
      }
      name = capitalize(name);
      for (let i = 0; i < prefixes.length; i++) {
        const prefixed = prefixes[i] + name;
        if (prefixed in style) {
          return prefixCache[rawName] = prefixed;
        }
      }
      return rawName;
    }
    const xlinkNS = "http://www.w3.org/1999/xlink";
    function patchAttr(el2, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
      if (isSVG && key.startsWith("xlink:")) {
        if (value == null) {
          el2.removeAttributeNS(xlinkNS, key.slice(6, key.length));
        } else {
          el2.setAttributeNS(xlinkNS, key, value);
        }
      } else {
        if (value == null || isBoolean && !includeBooleanAttr(value)) {
          el2.removeAttribute(key);
        } else {
          el2.setAttribute(
            key,
            isBoolean ? "" : isSymbol(value) ? String(value) : value
          );
        }
      }
    }
    function patchDOMProp(el2, key, value, parentComponent, attrName) {
      if (key === "innerHTML" || key === "textContent") {
        if (value != null) {
          el2[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
        }
        return;
      }
      const tag = el2.tagName;
      if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
      !tag.includes("-")) {
        const oldValue = tag === "OPTION" ? el2.getAttribute("value") || "" : el2.value;
        const newValue = value == null ? (
          // #11647: value should be set as empty string for null and undefined,
          // but <input type="checkbox"> should be set as 'on'.
          el2.type === "checkbox" ? "on" : ""
        ) : String(value);
        if (oldValue !== newValue || !("_value" in el2)) {
          el2.value = newValue;
        }
        if (value == null) {
          el2.removeAttribute(key);
        }
        el2._value = value;
        return;
      }
      let needRemove = false;
      if (value === "" || value == null) {
        const type = typeof el2[key];
        if (type === "boolean") {
          value = includeBooleanAttr(value);
        } else if (value == null && type === "string") {
          value = "";
          needRemove = true;
        } else if (type === "number") {
          value = 0;
          needRemove = true;
        }
      }
      try {
        el2[key] = value;
      } catch (e) {
      }
      needRemove && el2.removeAttribute(attrName || key);
    }
    function addEventListener(el2, event, handler, options) {
      el2.addEventListener(event, handler, options);
    }
    function removeEventListener(el2, event, handler, options) {
      el2.removeEventListener(event, handler, options);
    }
    const veiKey = Symbol("_vei");
    function patchEvent(el2, rawName, prevValue, nextValue, instance = null) {
      const invokers = el2[veiKey] || (el2[veiKey] = {});
      const existingInvoker = invokers[rawName];
      if (nextValue && existingInvoker) {
        existingInvoker.value = nextValue;
      } else {
        const [name, options] = parseName(rawName);
        if (nextValue) {
          const invoker = invokers[rawName] = createInvoker(
            nextValue,
            instance
          );
          addEventListener(el2, name, invoker, options);
        } else if (existingInvoker) {
          removeEventListener(el2, name, existingInvoker, options);
          invokers[rawName] = void 0;
        }
      }
    }
    const optionsModifierRE = /(?:Once|Passive|Capture)$/;
    function parseName(name) {
      let options;
      if (optionsModifierRE.test(name)) {
        options = {};
        let m;
        while (m = name.match(optionsModifierRE)) {
          name = name.slice(0, name.length - m[0].length);
          options[m[0].toLowerCase()] = true;
        }
      }
      const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
      return [event, options];
    }
    let cachedNow = 0;
    const p = /* @__PURE__ */ Promise.resolve();
    const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
    function createInvoker(initialValue, instance) {
      const invoker = (e) => {
        if (!e._vts) {
          e._vts = Date.now();
        } else if (e._vts <= invoker.attached) {
          return;
        }
        callWithAsyncErrorHandling(
          patchStopImmediatePropagation(e, invoker.value),
          instance,
          5,
          [e]
        );
      };
      invoker.value = initialValue;
      invoker.attached = getNow();
      return invoker;
    }
    function patchStopImmediatePropagation(e, value) {
      if (isArray(value)) {
        const originalStop = e.stopImmediatePropagation;
        e.stopImmediatePropagation = () => {
          originalStop.call(e);
          e._stopped = true;
        };
        return value.map(
          (fn2) => (e2) => !e2._stopped && fn2 && fn2(e2)
        );
      } else {
        return value;
      }
    }
    const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
    key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
    const patchProp = (el2, key, prevValue, nextValue, namespace, parentComponent) => {
      const isSVG = namespace === "svg";
      if (key === "class") {
        patchClass(el2, nextValue, isSVG);
      } else if (key === "style") {
        patchStyle(el2, prevValue, nextValue);
      } else if (isOn(key)) {
        if (!isModelListener(key)) {
          patchEvent(el2, key, prevValue, nextValue, parentComponent);
        }
      } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el2, key, nextValue, isSVG)) {
        patchDOMProp(el2, key, nextValue);
        if (!el2.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
          patchAttr(el2, key, nextValue, isSVG, parentComponent, key !== "value");
        }
      } else if (
        // #11081 force set props for possible async custom element
        el2._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
      ) {
        patchDOMProp(el2, camelize(key), nextValue, parentComponent, key);
      } else {
        if (key === "true-value") {
          el2._trueValue = nextValue;
        } else if (key === "false-value") {
          el2._falseValue = nextValue;
        }
        patchAttr(el2, key, nextValue, isSVG);
      }
    };
    function shouldSetAsProp(el2, key, value, isSVG) {
      if (isSVG) {
        if (key === "innerHTML" || key === "textContent") {
          return true;
        }
        if (key in el2 && isNativeOn(key) && isFunction(value)) {
          return true;
        }
        return false;
      }
      if (key === "spellcheck" || key === "draggable" || key === "translate") {
        return false;
      }
      if (key === "form") {
        return false;
      }
      if (key === "list" && el2.tagName === "INPUT") {
        return false;
      }
      if (key === "type" && el2.tagName === "TEXTAREA") {
        return false;
      }
      if (key === "width" || key === "height") {
        const tag = el2.tagName;
        if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
          return false;
        }
      }
      if (isNativeOn(key) && isString(value)) {
        return false;
      }
      return key in el2;
    }
    const getModelAssigner = (vnode) => {
      const fn2 = vnode.props["onUpdate:modelValue"] || false;
      return isArray(fn2) ? (value) => invokeArrayFns(fn2, value) : fn2;
    };
    function onCompositionStart(e) {
      e.target.composing = true;
    }
    function onCompositionEnd(e) {
      const target = e.target;
      if (target.composing) {
        target.composing = false;
        target.dispatchEvent(new Event("input"));
      }
    }
    const assignKey = Symbol("_assign");
    const vModelText = {
      created(el2, { modifiers: { lazy, trim, number } }, vnode) {
        el2[assignKey] = getModelAssigner(vnode);
        const castToNumber = number || vnode.props && vnode.props.type === "number";
        addEventListener(el2, lazy ? "change" : "input", (e) => {
          if (e.target.composing) return;
          let domValue = el2.value;
          if (trim) {
            domValue = domValue.trim();
          }
          if (castToNumber) {
            domValue = looseToNumber(domValue);
          }
          el2[assignKey](domValue);
        });
        if (trim) {
          addEventListener(el2, "change", () => {
            el2.value = el2.value.trim();
          });
        }
        if (!lazy) {
          addEventListener(el2, "compositionstart", onCompositionStart);
          addEventListener(el2, "compositionend", onCompositionEnd);
          addEventListener(el2, "change", onCompositionEnd);
        }
      },
      // set value on mounted so it's after min/max for type="range"
      mounted(el2, { value }) {
        el2.value = value == null ? "" : value;
      },
      beforeUpdate(el2, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
        el2[assignKey] = getModelAssigner(vnode);
        if (el2.composing) return;
        const elValue = (number || el2.type === "number") && !/^0\d/.test(el2.value) ? looseToNumber(el2.value) : el2.value;
        const newValue = value == null ? "" : value;
        if (elValue === newValue) {
          return;
        }
        if (document.activeElement === el2 && el2.type !== "range") {
          if (lazy && value === oldValue) {
            return;
          }
          if (trim && el2.value.trim() === newValue) {
            return;
          }
        }
        el2.value = newValue;
      }
    };
    const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
    let renderer;
    function ensureRenderer() {
      return renderer || (renderer = createRenderer(rendererOptions));
    }
    const createApp = (...args) => {
      const app = ensureRenderer().createApp(...args);
      const { mount } = app;
      app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container) return;
        const component = app._component;
        if (!isFunction(component) && !component.render && !component.template) {
          component.template = container.innerHTML;
        }
        if (container.nodeType === 1) {
          container.textContent = "";
        }
        const proxy = mount(container, false, resolveRootNamespace(container));
        if (container instanceof Element) {
          container.removeAttribute("v-cloak");
          container.setAttribute("data-v-app", "");
        }
        return proxy;
      };
      return app;
    };
    function resolveRootNamespace(container) {
      if (container instanceof SVGElement) {
        return "svg";
      }
      if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
        return "mathml";
      }
    }
    function normalizeContainer(container) {
      if (isString(container)) {
        const res = document.querySelector(container);
        return res;
      }
      return container;
    }
    const aa$4 = 3376044e-10;
    const ab$4 = 969675e-9;
    const ac$4 = 3698019e-10;
    const ad$4 = 188152e-8;
    const ae$4 = 2669576e-10;
    const af$4 = 3766165e-9;
    const ag$4 = 3650192e-9;
    const ah$4 = 129415e-9;
    const ai$4 = 2478892e-10;
    const aj$4 = 1719282e-10;
    const ak$4 = 972801e-9;
    const al$4 = 52113e-7;
    const am$4 = 2404181e-9;
    const an$4 = 0.0121969;
    const ao$4 = 4032498e-11;
    const ap$4 = 5417301e-10;
    const aq$4 = 8752708e-12;
    const ar$4 = 7488254e-9;
    const as$4 = 1573924e-9;
    const at$4 = 6836177e-9;
    const au$4 = 4529526e-10;
    const av$4 = 1623627e-9;
    const aw$4 = 2750851e-11;
    const ax$4 = 4813989e-11;
    const ay$4 = 1003435e-10;
    const az$4 = 4470133e-11;
    const ba$4 = 158299e-8;
    const bb$4 = 1994367e-10;
    const bc$4 = 2000619e-11;
    const bd$4 = 2075642e-10;
    const be$4 = 4167227e-9;
    const bf$4 = 1250387e-11;
    const bg$4 = 2313216e-11;
    const bh$4 = 1813061e-11;
    const bi$4 = 8268183e-10;
    const bj$4 = 1272269e-10;
    const bk$4 = 4313835e-11;
    const bl$4 = 2214435e-9;
    const bm$4 = 475147e-10;
    const bn$4 = 1528598e-10;
    const bo$4 = 1163798e-9;
    const bp$4 = 1625503e-11;
    const bq$4 = 3125967e-13;
    const br$4 = 1683646e-9;
    const bs$4 = 2006871e-10;
    const bt$4 = 1719282e-10;
    const bu$4 = 5873692e-10;
    const bv$4 = 5939337e-12;
    const bw$4 = 9065305e-12;
    const bx$4 = 9377901e-13;
    const by$4 = 5089074e-10;
    const bz$4 = 3125967e-13;
    const ca$4 = 3785546e-10;
    const cb$4 = 1750542e-11;
    const cc$4 = 1053451e-10;
    const cd$4 = 2188177e-11;
    const ce$4 = 1215063e-9;
    const cf$4 = 5939337e-12;
    const cg$4 = 3125967e-12;
    const ch$4 = 9596719e-10;
    const ci$4 = 455766e-9;
    const cj$4 = 1250387e-12;
    const ck$4 = 2782111e-10;
    const cl$4 = 9159084e-11;
    const cm$4 = 2500774e-11;
    const cn$4 = 1000309e-11;
    const co$4 = 4507645e-10;
    const cp$4 = 6877128e-12;
    const cq$4 = 1562984e-12;
    const cr$4 = 8877747e-11;
    const cs$4 = 6095636e-11;
    const ct$4 = 2019375e-10;
    const cu$4 = 6502012e-11;
    const cv$4 = 6251934e-12;
    const cw$4 = 9377901e-13;
    const cx$4 = 0;
    const cy$4 = 7908697e-11;
    const cz$4 = 2500774e-12;
    const da$4 = 3464509e-9;
    const db$4 = 47671e-8;
    const dc$4 = 5376663e-11;
    const dd$4 = 6880254e-10;
    const de$4 = 0.02444069;
    const df$4 = 2669576e-10;
    const dg$4 = 3204116e-10;
    const dh$4 = 2106902e-10;
    const di$4 = 198749e-8;
    const dj$4 = 1428567e-10;
    const dk$4 = 3169731e-10;
    const dl$4 = 9018415e-10;
    const dm$4 = 2803992e-10;
    const dn$4 = 4426369e-10;
    const dp$4 = 9377901e-11;
    const dq$4 = 1250387e-12;
    const dr$4 = 1729285e-9;
    const ds$4 = 2819935e-9;
    const dt$4 = 2041257e-9;
    const du$4 = 5235995e-10;
    const dv$4 = 5204735e-10;
    const dw$4 = 1688022e-11;
    const dx$4 = 0;
    const dy$4 = 1853698e-10;
    const dz$4 = 4063757e-12;
    const ea$4 = 6064376e-10;
    const eb$4 = 6892757e-10;
    const ec$4 = 3047818e-10;
    const ed$4 = 8612977e-9;
    const ee$4 = 3657382e-10;
    const ef$4 = 1346667e-9;
    const eg$4 = 2402306e-9;
    const eh$4 = 5232869e-10;
    const ei$4 = 2822748e-10;
    const ej$4 = 1651448e-9;
    const ek$4 = 151922e-8;
    const el$4 = 658485e-8;
    const em$4 = 3064386e-9;
    const en$4 = 0.02472296;
    const eo$4 = 2422624e-10;
    const ep$4 = 5223491e-10;
    const eq$4 = 6877128e-12;
    const er$4 = 0.03208962;
    const es$4 = 5162222e-9;
    const et$4 = 0.01185648;
    const eu$4 = 3466698e-10;
    const ev$4 = 1736475e-9;
    const ew$4 = 8408851e-11;
    const ex$4 = 9565459e-11;
    const ey$4 = 8502631e-11;
    const ez$4 = 284463e-10;
    const fa$4 = 117974e-8;
    const fb$4 = 381368e-10;
    const fc$4 = 9346642e-11;
    const fd$4 = 1572361e-10;
    const fe$4 = 1041885e-9;
    const ff$4 = 3938719e-10;
    const fg$4 = 1437945e-10;
    const fh$4 = 5376663e-11;
    const fi$4 = 1273206e-9;
    const fj$4 = 1190993e-10;
    const fk$4 = 4032498e-11;
    const fl$4 = 1426691e-9;
    const fm$4 = 2719591e-11;
    const fn$4 = 8721448e-11;
    const fo$4 = 651389e-8;
    const fp$4 = 2625812e-11;
    const fq$4 = 3125967e-13;
    const fr$4 = 3212556e-9;
    const fs$4 = 2106902e-10;
    const ft$4 = 1520158e-9;
    const fu$4 = 3272888e-10;
    const fv$4 = 7346023e-11;
    const fw$4 = 3125967e-13;
    const fx$4 = 6251934e-12;
    const fy$4 = 2169421e-10;
    const fz$4 = 3125967e-13;
    const ga$4 = 1463265e-9;
    const gb$4 = 8940266e-11;
    const gc$4 = 1312906e-11;
    const gd$4 = 3004054e-10;
    const ge$4 = 0.0113185;
    const gf$4 = 8940266e-11;
    const gg$4 = 6392603e-10;
    const gh$4 = 6089384e-10;
    const gi$4 = 1020941e-9;
    const gj$4 = 1334788e-10;
    const gk$4 = 5751779e-11;
    const gl$4 = 7721139e-10;
    const gm$4 = 1497338e-10;
    const gn$4 = 7589848e-10;
    const go$4 = 6183163e-10;
    const gp$4 = 4970288e-11;
    const gq$4 = 3125967e-13;
    const gr$4 = 1724909e-9;
    const gs$4 = 1725221e-9;
    const gt$4 = 1822126e-9;
    const gu$4 = 2453884e-10;
    const gv$4 = 1169112e-10;
    const gw$4 = 7189724e-12;
    const gx$4 = 3125967e-13;
    const gy$4 = 155048e-9;
    const gz$4 = 3125967e-13;
    const ha$4 = 5436682e-9;
    const hb$4 = 7346023e-11;
    const hc$4 = 1281647e-11;
    const hd$4 = 1969359e-11;
    const he$4 = 2906212e-9;
    const hf$4 = 1719282e-11;
    const hg$4 = 6251934e-12;
    const hh$4 = 4688951e-12;
    const hi$4 = 3663633e-10;
    const hj$4 = 7086567e-10;
    const hk$4 = 2657072e-11;
    const hl$4 = 7002166e-11;
    const hm$4 = 4251315e-11;
    const hn$4 = 303844e-9;
    const ho$4 = 1651136e-9;
    const hp$4 = 1500464e-11;
    const hq$4 = 9377901e-13;
    const hr$4 = 3663633e-10;
    const hs$4 = 3719901e-11;
    const ht$4 = 4532652e-11;
    const hu$4 = 8655803e-10;
    const hv$4 = 1621439e-9;
    const hw$4 = 2438254e-11;
    const hx$4 = 9377901e-13;
    const hy$4 = 7189724e-11;
    const hz$4 = 9377901e-13;
    const ia$4 = 7818044e-10;
    const ib$4 = 3122841e-10;
    const ic$4 = 5501702e-10;
    const id$4 = 2856196e-9;
    const ie$4 = 1653949e-9;
    const ig$4 = 6762405e-9;
    const ih$4 = 4657691e-11;
    const ii$4 = 5751779e-11;
    const ij$4 = 2063138e-11;
    const ik$4 = 3576419e-9;
    const il$4 = 7261309e-9;
    const im$4 = 6580161e-10;
    const io$4 = 1619876e-9;
    const ip$4 = 19381e-8;
    const iq$4 = 9065305e-12;
    const ir$4 = 1184742e-9;
    const is$4 = 4017493e-9;
    const it$4 = 1847134e-9;
    const iu$4 = 5220365e-11;
    const iv$4 = 2006871e-9;
    const iw$4 = 5314144e-12;
    const ix$4 = 3094707e-11;
    const iy$4 = 5939337e-12;
    const iz$4 = 4438873e-11;
    const ja$4 = 4135654e-10;
    const jb$4 = 2000619e-11;
    const jc$4 = 3438564e-12;
    const jd$4 = 5064067e-10;
    const je$4 = 2410433e-9;
    const jf$4 = 9690498e-12;
    const jg$4 = 1156608e-11;
    const jh$4 = 8127514e-12;
    const ji$4 = 3469823e-11;
    const jj$4 = 187558e-11;
    const jk$4 = 5439183e-11;
    const jl$4 = 4057505e-10;
    const jm$4 = 1187867e-11;
    const jn$4 = 384494e-10;
    const jo$4 = 5751779e-10;
    const jp$4 = 1437945e-11;
    const jq$4 = 0;
    const jr$4 = 3554225e-10;
    const js$4 = 1459827e-10;
    const jt$4 = 4939028e-11;
    const ju$4 = 2904023e-10;
    const jv$4 = 2969669e-11;
    const jw$4 = 0;
    const jx$4 = 0;
    const jy$4 = 1237883e-10;
    const jz$4 = 6251934e-13;
    const ka$4 = 3964039e-9;
    const kb$4 = 3310399e-10;
    const kc$4 = 8440111e-12;
    const kd$4 = 9034045e-11;
    const ke$4 = 6978722e-9;
    const kf$4 = 5126586e-11;
    const kg$4 = 2469514e-11;
    const kh$4 = 572052e-10;
    const ki$4 = 7333519e-10;
    const kj$4 = 8096255e-11;
    const kk$4 = 2842754e-9;
    const kl$4 = 1311968e-9;
    const km$4 = 1209749e-10;
    const kn$4 = 418567e-9;
    const ko$4 = 2855258e-9;
    const kp$4 = 2500774e-11;
    const kq$4 = 0;
    const kr$4 = 2059075e-9;
    const ks$4 = 1096277e-9;
    const kt$4 = 1315094e-9;
    const ku$4 = 1473581e-9;
    const kv$4 = 3785546e-10;
    const kw$4 = 5626741e-12;
    const kx$4 = 0;
    const ky$4 = 2210059e-10;
    const kz$4 = 0;
    const la$4 = 3979669e-9;
    const lb$4 = 7292881e-10;
    const lc$4 = 3719901e-11;
    const ld$4 = 267364e-8;
    const le$4 = 8898065e-9;
    const lf$4 = 3075952e-10;
    const lg$4 = 1203185e-9;
    const lh$4 = 8971526e-11;
    const li$4 = 6272566e-9;
    const lj$4 = 1781801e-10;
    const lk$4 = 5157846e-10;
    const ll$4 = 4026558e-9;
    const lm$4 = 3938719e-10;
    const ln$4 = 341043e-9;
    const lo$4 = 115442e-8;
    const lp$4 = 2013123e-10;
    const lq$4 = 5626741e-12;
    const lr$4 = 3344785e-10;
    const ls$4 = 2533909e-9;
    const lt$4 = 1315407e-9;
    const lu$4 = 8808975e-10;
    const lv$4 = 7583596e-10;
    const lw$4 = 6564531e-12;
    const lx$4 = 3125967e-13;
    const ly$4 = 7074064e-10;
    const lz$4 = 6251934e-12;
    const ma$4 = 3701458e-9;
    const mb$4 = 3025936e-10;
    const mc$4 = 4438873e-11;
    const md$4 = 3313525e-10;
    const me$4 = 8464494e-9;
    const mf$4 = 1556732e-10;
    const mg$4 = 1300402e-10;
    const mh$4 = 2347601e-10;
    const mi$4 = 2276954e-9;
    const mj$4 = 1250387e-11;
    const mk$4 = 192247e-9;
    const ml$4 = 7108449e-10;
    const mm$4 = 2274454e-9;
    const mn$4 = 3704271e-10;
    const mo$4 = 1260077e-9;
    const mp$4 = 8383844e-10;
    const mq$4 = 6251934e-13;
    const mr$4 = 3823058e-10;
    const ms$4 = 5895574e-10;
    const mt$4 = 5617363e-10;
    const mu$4 = 8987155e-10;
    const mv$4 = 4032498e-11;
    const mw$4 = 2281956e-11;
    const mx$4 = 4688951e-12;
    const my$4 = 9409161e-11;
    const mz$4 = 0;
    const na$4 = 1489836e-9;
    const nb$4 = 2385113e-10;
    const nc$4 = 5145342e-10;
    const nd$4 = 0.01047699;
    const ne$4 = 8541392e-9;
    const nf$4 = 3019684e-10;
    const ng$4 = 6293197e-9;
    const nh$4 = 5226617e-10;
    const ni$4 = 2884017e-9;
    const nj$4 = 1241009e-10;
    const nk$4 = 1048762e-9;
    const nl$4 = 3679263e-10;
    const nm$4 = 510783e-9;
    const nn$4 = 128571e-8;
    const no$4 = 1440133e-9;
    const np$4 = 1194119e-10;
    const nq$4 = 1250387e-12;
    const nr$4 = 6205045e-10;
    const ns$4 = 4723649e-9;
    const nt$4 = 2864324e-9;
    const nu$4 = 1087524e-9;
    const nv$4 = 357298e-9;
    const nw$4 = 1031569e-11;
    const nx$4 = 9377901e-13;
    const ny$4 = 7592974e-10;
    const nz$4 = 4126277e-11;
    const oa$4 = 1078459e-10;
    const ob$4 = 5804921e-10;
    const oc$4 = 4013742e-10;
    const od$4 = 1650511e-9;
    const oe$4 = 2272578e-10;
    const of$4 = 4629557e-10;
    const og$4 = 6451058e-9;
    const oh$4 = 1190993e-10;
    const oi$4 = 1262891e-10;
    const oj$4 = 8283813e-11;
    const ok$4 = 6667688e-10;
    const ol$4 = 3065636e-9;
    const om$4 = 5347905e-9;
    const on$4 = 3707397e-9;
    const oo$4 = 2019375e-10;
    const op$4 = 1825565e-9;
    const oq$4 = 1562984e-12;
    const or$4 = 9941513e-9;
    const os$4 = 9618601e-10;
    const ot$4 = 5342278e-10;
    const ou$4 = 2847756e-10;
    const ov$4 = 1736787e-9;
    const ow$4 = 1081585e-10;
    const ox$4 = 3469823e-11;
    const oy$4 = 475147e-10;
    const oz$4 = 381368e-10;
    const pa$4 = 1059078e-9;
    const pb$4 = 5658e-8;
    const pc$4 = 1950603e-10;
    const pd$4 = 110034e-9;
    const pe$4 = 2096274e-9;
    const pf$4 = 110034e-9;
    const pg$4 = 1228505e-10;
    const ph$4 = 1269143e-10;
    const pi$4 = 1039071e-9;
    const pj$4 = 1594243e-11;
    const pk$4 = 7127205e-11;
    const pl$4 = 1025317e-9;
    const pm$4 = 6720829e-11;
    const pn$4 = 8158774e-11;
    const po$4 = 1166298e-9;
    const pp$4 = 5745528e-10;
    const pq$4 = 0;
    const pr$4 = 2080644e-9;
    const ps$4 = 2578923e-10;
    const pt$4 = 2335097e-10;
    const pu$4 = 2847756e-10;
    const pv$4 = 4282575e-11;
    const pw$4 = 4688951e-12;
    const px$4 = 6251934e-13;
    const py$4 = 1375426e-11;
    const pz$4 = 1250387e-12;
    const qa$4 = 1187867e-11;
    const qb$4 = 0;
    const qc$4 = 3125967e-13;
    const qd$4 = 3125967e-13;
    const qe$4 = 3125967e-13;
    const qf$4 = 6251934e-13;
    const qg$4 = 0;
    const qh$4 = 6251934e-13;
    const qi$4 = 2188177e-12;
    const qj$4 = 0;
    const qk$4 = 0;
    const ql$4 = 3125967e-12;
    const qm$4 = 3125967e-13;
    const qn$4 = 0;
    const qo$4 = 3125967e-13;
    const qp$4 = 0;
    const qq$4 = 0;
    const qr$4 = 6251934e-13;
    const qs$4 = 6251934e-13;
    const qt$4 = 9377901e-13;
    const qu$4 = 4188796e-11;
    const qv$4 = 187558e-11;
    const qw$4 = 0;
    const qx$4 = 1250387e-12;
    const qy$4 = 0;
    const qz$4 = 0;
    const ra$4 = 3940594e-9;
    const rb$4 = 1104404e-9;
    const rc$4 = 1828691e-10;
    const rd$4 = 264113e-8;
    const re$4 = 0.01383428;
    const rf$4 = 7117827e-10;
    const rg$4 = 1249762e-9;
    const rh$4 = 7174094e-10;
    const ri$4 = 4801485e-9;
    const rj$4 = 9002785e-11;
    const rk$4 = 2037818e-9;
    const rl$4 = 9037171e-10;
    const rm$4 = 1233819e-9;
    const rn$4 = 3245692e-9;
    const ro$4 = 2306651e-9;
    const rp$4 = 16974e-8;
    const rq$4 = 1250387e-12;
    const rr$4 = 8271309e-10;
    const rs$4 = 3404803e-9;
    const rt$4 = 2418873e-9;
    const ru$4 = 1802745e-9;
    const rv$4 = 8590158e-10;
    const rw$4 = 2344475e-11;
    const rx$4 = 2500774e-12;
    const ry$4 = 4560786e-10;
    const rz$4 = 6564531e-12;
    const sa$4 = 2411371e-9;
    const sb$4 = 3566728e-10;
    const sc$4 = 3876199e-10;
    const sd$4 = 5895574e-10;
    const se$4 = 7019359e-9;
    const sf$4 = 3363541e-10;
    const sg$4 = 4698329e-10;
    const sh$4 = 4019994e-10;
    const si$4 = 4274135e-9;
    const sj$4 = 1322284e-10;
    const sk$4 = 630445e-8;
    const sl$4 = 1234444e-9;
    const sm$4 = 7918075e-10;
    const sn$4 = 5836181e-10;
    const so$4 = 277117e-8;
    const sp$4 = 1790241e-9;
    const sq$4 = 5939337e-12;
    const sr$4 = 4438873e-10;
    const ss$4 = 1584865e-9;
    const st$4 = 8589532e-9;
    const su$4 = 6054998e-10;
    const sv$4 = 7467935e-10;
    const sw$4 = 1781801e-11;
    const sx$4 = 6251934e-13;
    const sy$4 = 5983101e-10;
    const sz$4 = 9377901e-12;
    const ta$4 = 3008118e-9;
    const tb$4 = 1353544e-10;
    const tc$4 = 5970597e-11;
    const td$4 = 2829e-7;
    const te$4 = 0.01013407;
    const tf$4 = 206939e-9;
    const tg$4 = 8346332e-11;
    const th$4 = 4788982e-10;
    const ti$4 = 852545e-8;
    const tj$4 = 3119715e-10;
    const tk$4 = 1190993e-10;
    const tl$4 = 472021e-9;
    const tm$4 = 206939e-9;
    const tn$4 = 6258186e-10;
    const to$4 = 2230065e-9;
    const tp$4 = 1053451e-10;
    const tq$4 = 3125967e-13;
    const tr$4 = 3010932e-9;
    const ts$4 = 1215063e-9;
    const tt$4 = 1873079e-9;
    const tu$4 = 7036552e-10;
    const tv$4 = 3538595e-10;
    const tw$4 = 3313525e-11;
    const tx$4 = 281337e-11;
    const ty$4 = 6305076e-10;
    const tz$4 = 5470442e-11;
    const ua$4 = 2963417e-10;
    const ub$4 = 3369793e-10;
    const uc$4 = 1600495e-10;
    const ud$4 = 2421999e-9;
    const ue$4 = 3891829e-10;
    const uf$4 = 1641133e-10;
    const ug$4 = 737103e-9;
    const uh$4 = 6158155e-11;
    const ui$4 = 6783349e-11;
    const uj$4 = 8127514e-12;
    const uk$4 = 3744909e-10;
    const ul$4 = 1194432e-9;
    const um$4 = 4476385e-10;
    const un$4 = 3334157e-9;
    const uo$4 = 2156917e-11;
    const up$4 = 4357598e-10;
    const uq$4 = 3125967e-13;
    const ur$4 = 13326e-7;
    const us$4 = 1371049e-9;
    const ut$4 = 7155339e-10;
    const uu$4 = 1844321e-11;
    const uv$4 = 8127514e-11;
    const uw$4 = 4376354e-12;
    const ux$4 = 2094398e-11;
    const uy$4 = 6251934e-12;
    const uz$4 = 1062829e-11;
    const va$4 = 2408558e-9;
    const vb$4 = 472021e-10;
    const vc$4 = 3125967e-12;
    const vd$4 = 3691767e-10;
    const ve$4 = 6955589e-9;
    const vf$4 = 8252553e-11;
    const vg$4 = 1181616e-10;
    const vh$4 = 1688022e-11;
    const vi$4 = 4604862e-9;
    const vj$4 = 5001547e-12;
    const vk$4 = 1359796e-10;
    const vl$4 = 2269452e-10;
    const vm$4 = 7846177e-11;
    const vn$4 = 4338842e-10;
    const vo$4 = 1138477e-9;
    const vp$4 = 1344166e-11;
    const vq$4 = 3125967e-13;
    const vr$4 = 1193182e-9;
    const vs$4 = 2150665e-10;
    const vt$4 = 1031569e-10;
    const vu$4 = 1391055e-10;
    const vv$4 = 190684e-10;
    const vw$4 = 4376354e-12;
    const vx$4 = 6251934e-13;
    const vy$4 = 6877128e-12;
    const vz$4 = 0;
    const wa$4 = 1441071e-10;
    const wb$4 = 6877128e-12;
    const wc$4 = 4376354e-12;
    const wd$4 = 3751161e-12;
    const we$4 = 1831817e-10;
    const wf$4 = 3438564e-12;
    const wg$4 = 9377901e-13;
    const wh$4 = 8752708e-12;
    const wi$4 = 1362922e-10;
    const wj$4 = 1250387e-12;
    const wk$4 = 281337e-11;
    const wl$4 = 9690498e-12;
    const wm$4 = 281337e-11;
    const wn$4 = 2625812e-11;
    const wo$4 = 8096255e-11;
    const wp$4 = 3438564e-12;
    const wq$4 = 0;
    const wr$4 = 8440111e-12;
    const ws$4 = 4532652e-11;
    const wt$4 = 4063757e-12;
    const wu$4 = 3438564e-12;
    const wv$4 = 6251934e-13;
    const ww$4 = 2688332e-11;
    const wx$4 = 3125967e-13;
    const wy$4 = 2188177e-12;
    const wz$4 = 6251934e-13;
    const xa$4 = 2094398e-11;
    const xb$4 = 1187867e-11;
    const xc$4 = 6251934e-12;
    const xd$4 = 3125967e-12;
    const xe$4 = 3344785e-11;
    const xf$4 = 6564531e-12;
    const xg$4 = 0;
    const xh$4 = 2500774e-12;
    const xi$4 = 2532033e-11;
    const xj$4 = 9377901e-13;
    const xk$4 = 1562984e-12;
    const xl$4 = 5626741e-12;
    const xm$4 = 9065305e-12;
    const xn$4 = 9377901e-13;
    const xo$4 = 9690498e-12;
    const xp$4 = 1750542e-11;
    const xq$4 = 0;
    const xr$4 = 3125967e-13;
    const xs$4 = 5314144e-12;
    const xt$4 = 8752708e-12;
    const xu$4 = 3751161e-12;
    const xv$4 = 187558e-11;
    const xw$4 = 9377901e-13;
    const xx$4 = 1250387e-12;
    const xy$4 = 2188177e-12;
    const xz$4 = 3125967e-13;
    const ya$4 = 7877437e-11;
    const yb$4 = 7783658e-11;
    const yc$4 = 8440111e-12;
    const yd$4 = 6386351e-10;
    const ye$4 = 397623e-9;
    const yf$4 = 1312906e-11;
    const yg$4 = 4623305e-10;
    const yh$4 = 8346332e-11;
    const yi$4 = 1281647e-11;
    const yj$4 = 2188177e-12;
    const yk$4 = 3576106e-10;
    const yl$4 = 30697e-8;
    const ym$4 = 9971835e-11;
    const yn$4 = 5298514e-10;
    const yo$4 = 6001857e-11;
    const yp$4 = 7158465e-11;
    const yq$4 = 0;
    const yr$4 = 4538904e-10;
    const ys$4 = 6089384e-10;
    const yt$4 = 2988425e-10;
    const yu$4 = 9690498e-12;
    const yv$4 = 1203497e-10;
    const yw$4 = 6877128e-12;
    const yx$4 = 0;
    const yy$4 = 0;
    const yz$4 = 187558e-11;
    const za$4 = 8064995e-11;
    const zb$4 = 7814918e-12;
    const zc$4 = 6251934e-13;
    const zd$4 = 5314144e-12;
    const ze$4 = 5001547e-11;
    const zf$4 = 1562984e-12;
    const zg$4 = 9377901e-13;
    const zh$4 = 5314144e-12;
    const zi$4 = 572052e-10;
    const zj$4 = 0;
    const zk$4 = 4063757e-12;
    const zl$4 = 5626741e-12;
    const zm$4 = 3125967e-12;
    const zn$4 = 1750542e-11;
    const zo$4 = 3407304e-11;
    const zp$4 = 187558e-11;
    const zq$4 = 0;
    const zr$4 = 2500774e-12;
    const zs$4 = 187558e-11;
    const zt$4 = 3125967e-13;
    const zu$4 = 1156608e-11;
    const zv$4 = 1250387e-12;
    const zw$4 = 1562984e-12;
    const zx$4 = 0;
    const zy$4 = 1250387e-11;
    const zz$4 = 1594243e-11;
    const bigram_danish = {
      aa: aa$4,
      ab: ab$4,
      ac: ac$4,
      ad: ad$4,
      ae: ae$4,
      af: af$4,
      ag: ag$4,
      ah: ah$4,
      ai: ai$4,
      aj: aj$4,
      ak: ak$4,
      al: al$4,
      am: am$4,
      an: an$4,
      ao: ao$4,
      ap: ap$4,
      aq: aq$4,
      ar: ar$4,
      as: as$4,
      at: at$4,
      au: au$4,
      av: av$4,
      aw: aw$4,
      ax: ax$4,
      ay: ay$4,
      az: az$4,
      "a ": 2624249e-9,
      ba: ba$4,
      bb: bb$4,
      bc: bc$4,
      bd: bd$4,
      be: be$4,
      bf: bf$4,
      bg: bg$4,
      bh: bh$4,
      bi: bi$4,
      bj: bj$4,
      bk: bk$4,
      bl: bl$4,
      bm: bm$4,
      bn: bn$4,
      bo: bo$4,
      bp: bp$4,
      bq: bq$4,
      br: br$4,
      bs: bs$4,
      bt: bt$4,
      bu: bu$4,
      bv: bv$4,
      bw: bw$4,
      bx: bx$4,
      by: by$4,
      bz: bz$4,
      "b ": 5014051e-10,
      ca: ca$4,
      cb: cb$4,
      cc: cc$4,
      cd: cd$4,
      ce: ce$4,
      cf: cf$4,
      cg: cg$4,
      ch: ch$4,
      ci: ci$4,
      cj: cj$4,
      ck: ck$4,
      cl: cl$4,
      cm: cm$4,
      cn: cn$4,
      co: co$4,
      cp: cp$4,
      cq: cq$4,
      cr: cr$4,
      cs: cs$4,
      ct: ct$4,
      cu: cu$4,
      cv: cv$4,
      cw: cw$4,
      cx: cx$4,
      cy: cy$4,
      cz: cz$4,
      "c ": 2291334e-10,
      da: da$4,
      db: db$4,
      dc: dc$4,
      dd: dd$4,
      de: de$4,
      df: df$4,
      dg: dg$4,
      dh: dh$4,
      di: di$4,
      dj: dj$4,
      dk: dk$4,
      dl: dl$4,
      dm: dm$4,
      dn: dn$4,
      "do": 8590158e-10,
      dp: dp$4,
      dq: dq$4,
      dr: dr$4,
      ds: ds$4,
      dt: dt$4,
      du: du$4,
      dv: dv$4,
      dw: dw$4,
      dx: dx$4,
      dy: dy$4,
      dz: dz$4,
      "d ": 7755524e-9,
      ea: ea$4,
      eb: eb$4,
      ec: ec$4,
      ed: ed$4,
      ee: ee$4,
      ef: ef$4,
      eg: eg$4,
      eh: eh$4,
      ei: ei$4,
      ej: ej$4,
      ek: ek$4,
      el: el$4,
      em: em$4,
      en: en$4,
      eo: eo$4,
      ep: ep$4,
      eq: eq$4,
      er: er$4,
      es: es$4,
      et: et$4,
      eu: eu$4,
      ev: ev$4,
      ew: ew$4,
      ex: ex$4,
      ey: ey$4,
      ez: ez$4,
      "e ": 0.02984298,
      fa: fa$4,
      fb: fb$4,
      fc: fc$4,
      fd: fd$4,
      fe: fe$4,
      ff: ff$4,
      fg: fg$4,
      fh: fh$4,
      fi: fi$4,
      fj: fj$4,
      fk: fk$4,
      fl: fl$4,
      fm: fm$4,
      fn: fn$4,
      fo: fo$4,
      fp: fp$4,
      fq: fq$4,
      fr: fr$4,
      fs: fs$4,
      ft: ft$4,
      fu: fu$4,
      fv: fv$4,
      fw: fw$4,
      fx: fx$4,
      fy: fy$4,
      fz: fz$4,
      "f ": 304688e-8,
      ga: ga$4,
      gb: gb$4,
      gc: gc$4,
      gd: gd$4,
      ge: ge$4,
      gf: gf$4,
      gg: gg$4,
      gh: gh$4,
      gi: gi$4,
      gj: gj$4,
      gk: gk$4,
      gl: gl$4,
      gm: gm$4,
      gn: gn$4,
      go: go$4,
      gp: gp$4,
      gq: gq$4,
      gr: gr$4,
      gs: gs$4,
      gt: gt$4,
      gu: gu$4,
      gv: gv$4,
      gw: gw$4,
      gx: gx$4,
      gy: gy$4,
      gz: gz$4,
      "g ": 0.01103842,
      ha: ha$4,
      hb: hb$4,
      hc: hc$4,
      hd: hd$4,
      he: he$4,
      hf: hf$4,
      hg: hg$4,
      hh: hh$4,
      hi: hi$4,
      hj: hj$4,
      hk: hk$4,
      hl: hl$4,
      hm: hm$4,
      hn: hn$4,
      ho: ho$4,
      hp: hp$4,
      hq: hq$4,
      hr: hr$4,
      hs: hs$4,
      ht: ht$4,
      hu: hu$4,
      hv: hv$4,
      hw: hw$4,
      hx: hx$4,
      hy: hy$4,
      hz: hz$4,
      "h ": 2588301e-10,
      ia: ia$4,
      ib: ib$4,
      ic: ic$4,
      id: id$4,
      ie: ie$4,
      "if": 6436366e-10,
      ig: ig$4,
      ih: ih$4,
      ii: ii$4,
      ij: ij$4,
      ik: ik$4,
      il: il$4,
      im: im$4,
      "in": 8518886e-9,
      io: io$4,
      ip: ip$4,
      iq: iq$4,
      ir: ir$4,
      is: is$4,
      it: it$4,
      iu: iu$4,
      iv: iv$4,
      iw: iw$4,
      ix: ix$4,
      iy: iy$4,
      iz: iz$4,
      "i ": 7697694e-9,
      ja: ja$4,
      jb: jb$4,
      jc: jc$4,
      jd: jd$4,
      je: je$4,
      jf: jf$4,
      jg: jg$4,
      jh: jh$4,
      ji: ji$4,
      jj: jj$4,
      jk: jk$4,
      jl: jl$4,
      jm: jm$4,
      jn: jn$4,
      jo: jo$4,
      jp: jp$4,
      jq: jq$4,
      jr: jr$4,
      js: js$4,
      jt: jt$4,
      ju: ju$4,
      jv: jv$4,
      jw: jw$4,
      jx: jx$4,
      jy: jy$4,
      jz: jz$4,
      "j ": 3326029e-10,
      ka: ka$4,
      kb: kb$4,
      kc: kc$4,
      kd: kd$4,
      ke: ke$4,
      kf: kf$4,
      kg: kg$4,
      kh: kh$4,
      ki: ki$4,
      kj: kj$4,
      kk: kk$4,
      kl: kl$4,
      km: km$4,
      kn: kn$4,
      ko: ko$4,
      kp: kp$4,
      kq: kq$4,
      kr: kr$4,
      ks: ks$4,
      kt: kt$4,
      ku: ku$4,
      kv: kv$4,
      kw: kw$4,
      kx: kx$4,
      ky: ky$4,
      kz: kz$4,
      "k ": 231259e-8,
      la: la$4,
      lb: lb$4,
      lc: lc$4,
      ld: ld$4,
      le: le$4,
      lf: lf$4,
      lg: lg$4,
      lh: lh$4,
      li: li$4,
      lj: lj$4,
      lk: lk$4,
      ll: ll$4,
      lm: lm$4,
      ln: ln$4,
      lo: lo$4,
      lp: lp$4,
      lq: lq$4,
      lr: lr$4,
      ls: ls$4,
      lt: lt$4,
      lu: lu$4,
      lv: lv$4,
      lw: lw$4,
      lx: lx$4,
      ly: ly$4,
      lz: lz$4,
      "l ": 6516391e-9,
      ma: ma$4,
      mb: mb$4,
      mc: mc$4,
      md: md$4,
      me: me$4,
      mf: mf$4,
      mg: mg$4,
      mh: mh$4,
      mi: mi$4,
      mj: mj$4,
      mk: mk$4,
      ml: ml$4,
      mm: mm$4,
      mn: mn$4,
      mo: mo$4,
      mp: mp$4,
      mq: mq$4,
      mr: mr$4,
      ms: ms$4,
      mt: mt$4,
      mu: mu$4,
      mv: mv$4,
      mw: mw$4,
      mx: mx$4,
      my: my$4,
      mz: mz$4,
      "m ": 4496078e-9,
      na: na$4,
      nb: nb$4,
      nc: nc$4,
      nd: nd$4,
      ne: ne$4,
      nf: nf$4,
      ng: ng$4,
      nh: nh$4,
      ni: ni$4,
      nj: nj$4,
      nk: nk$4,
      nl: nl$4,
      nm: nm$4,
      nn: nn$4,
      no: no$4,
      np: np$4,
      nq: nq$4,
      nr: nr$4,
      ns: ns$4,
      nt: nt$4,
      nu: nu$4,
      nv: nv$4,
      nw: nw$4,
      nx: nx$4,
      ny: ny$4,
      nz: nz$4,
      "n ": 0.01975049,
      oa: oa$4,
      ob: ob$4,
      oc: oc$4,
      od: od$4,
      oe: oe$4,
      of: of$4,
      og: og$4,
      oh: oh$4,
      oi: oi$4,
      oj: oj$4,
      ok: ok$4,
      ol: ol$4,
      om: om$4,
      on: on$4,
      oo: oo$4,
      op: op$4,
      oq: oq$4,
      or: or$4,
      os: os$4,
      ot: ot$4,
      ou: ou$4,
      ov: ov$4,
      ow: ow$4,
      ox: ox$4,
      oy: oy$4,
      oz: oz$4,
      "o ": 1145354e-9,
      pa: pa$4,
      pb: pb$4,
      pc: pc$4,
      pd: pd$4,
      pe: pe$4,
      pf: pf$4,
      pg: pg$4,
      ph: ph$4,
      pi: pi$4,
      pj: pj$4,
      pk: pk$4,
      pl: pl$4,
      pm: pm$4,
      pn: pn$4,
      po: po$4,
      pp: pp$4,
      pq: pq$4,
      pr: pr$4,
      ps: ps$4,
      pt: pt$4,
      pu: pu$4,
      pv: pv$4,
      pw: pw$4,
      px: px$4,
      py: py$4,
      pz: pz$4,
      "p ": 3910585e-9,
      qa: qa$4,
      qb: qb$4,
      qc: qc$4,
      qd: qd$4,
      qe: qe$4,
      qf: qf$4,
      qg: qg$4,
      qh: qh$4,
      qi: qi$4,
      qj: qj$4,
      qk: qk$4,
      ql: ql$4,
      qm: qm$4,
      qn: qn$4,
      qo: qo$4,
      qp: qp$4,
      qq: qq$4,
      qr: qr$4,
      qs: qs$4,
      qt: qt$4,
      qu: qu$4,
      qv: qv$4,
      qw: qw$4,
      qx: qx$4,
      qy: qy$4,
      qz: qz$4,
      "q ": 5939337e-12,
      ra: ra$4,
      rb: rb$4,
      rc: rc$4,
      rd: rd$4,
      re: re$4,
      rf: rf$4,
      rg: rg$4,
      rh: rh$4,
      ri: ri$4,
      rj: rj$4,
      rk: rk$4,
      rl: rl$4,
      rm: rm$4,
      rn: rn$4,
      ro: ro$4,
      rp: rp$4,
      rq: rq$4,
      rr: rr$4,
      rs: rs$4,
      rt: rt$4,
      ru: ru$4,
      rv: rv$4,
      rw: rw$4,
      rx: rx$4,
      ry: ry$4,
      rz: rz$4,
      "r ": 0.02761135,
      sa: sa$4,
      sb: sb$4,
      sc: sc$4,
      sd: sd$4,
      se: se$4,
      sf: sf$4,
      sg: sg$4,
      sh: sh$4,
      si: si$4,
      sj: sj$4,
      sk: sk$4,
      sl: sl$4,
      sm: sm$4,
      sn: sn$4,
      so: so$4,
      sp: sp$4,
      sq: sq$4,
      sr: sr$4,
      ss: ss$4,
      st: st$4,
      su: su$4,
      sv: sv$4,
      sw: sw$4,
      sx: sx$4,
      sy: sy$4,
      sz: sz$4,
      "s ": 8789907e-9,
      ta: ta$4,
      tb: tb$4,
      tc: tc$4,
      td: td$4,
      te: te$4,
      tf: tf$4,
      tg: tg$4,
      th: th$4,
      ti: ti$4,
      tj: tj$4,
      tk: tk$4,
      tl: tl$4,
      tm: tm$4,
      tn: tn$4,
      to: to$4,
      tp: tp$4,
      tq: tq$4,
      tr: tr$4,
      ts: ts$4,
      tt: tt$4,
      tu: tu$4,
      tv: tv$4,
      tw: tw$4,
      tx: tx$4,
      ty: ty$4,
      tz: tz$4,
      "t ": 0.0202075,
      ua: ua$4,
      ub: ub$4,
      uc: uc$4,
      ud: ud$4,
      ue: ue$4,
      uf: uf$4,
      ug: ug$4,
      uh: uh$4,
      ui: ui$4,
      uj: uj$4,
      uk: uk$4,
      ul: ul$4,
      um: um$4,
      un: un$4,
      uo: uo$4,
      up: up$4,
      uq: uq$4,
      ur: ur$4,
      us: us$4,
      ut: ut$4,
      uu: uu$4,
      uv: uv$4,
      uw: uw$4,
      ux: ux$4,
      uy: uy$4,
      uz: uz$4,
      "u ": 9753017e-10,
      va: va$4,
      vb: vb$4,
      vc: vc$4,
      vd: vd$4,
      ve: ve$4,
      vf: vf$4,
      vg: vg$4,
      vh: vh$4,
      vi: vi$4,
      vj: vj$4,
      vk: vk$4,
      vl: vl$4,
      vm: vm$4,
      vn: vn$4,
      vo: vo$4,
      vp: vp$4,
      vq: vq$4,
      vr: vr$4,
      vs: vs$4,
      vt: vt$4,
      vu: vu$4,
      vv: vv$4,
      vw: vw$4,
      vx: vx$4,
      vy: vy$4,
      vz: vz$4,
      "v ": 1411687e-9,
      wa: wa$4,
      wb: wb$4,
      wc: wc$4,
      wd: wd$4,
      we: we$4,
      wf: wf$4,
      wg: wg$4,
      wh: wh$4,
      wi: wi$4,
      wj: wj$4,
      wk: wk$4,
      wl: wl$4,
      wm: wm$4,
      wn: wn$4,
      wo: wo$4,
      wp: wp$4,
      wq: wq$4,
      wr: wr$4,
      ws: ws$4,
      wt: wt$4,
      wu: wu$4,
      wv: wv$4,
      ww: ww$4,
      wx: wx$4,
      wy: wy$4,
      wz: wz$4,
      "w ": 8221293e-11,
      xa: xa$4,
      xb: xb$4,
      xc: xc$4,
      xd: xd$4,
      xe: xe$4,
      xf: xf$4,
      xg: xg$4,
      xh: xh$4,
      xi: xi$4,
      xj: xj$4,
      xk: xk$4,
      xl: xl$4,
      xm: xm$4,
      xn: xn$4,
      xo: xo$4,
      xp: xp$4,
      xq: xq$4,
      xr: xr$4,
      xs: xs$4,
      xt: xt$4,
      xu: xu$4,
      xv: xv$4,
      xw: xw$4,
      xx: xx$4,
      xy: xy$4,
      xz: xz$4,
      "x ": 114723e-9,
      ya: ya$4,
      yb: yb$4,
      yc: yc$4,
      yd: yd$4,
      ye: ye$4,
      yf: yf$4,
      yg: yg$4,
      yh: yh$4,
      yi: yi$4,
      yj: yj$4,
      yk: yk$4,
      yl: yl$4,
      ym: ym$4,
      yn: yn$4,
      yo: yo$4,
      yp: yp$4,
      yq: yq$4,
      yr: yr$4,
      ys: ys$4,
      yt: yt$4,
      yu: yu$4,
      yv: yv$4,
      yw: yw$4,
      yx: yx$4,
      yy: yy$4,
      yz: yz$4,
      "y ": 5501702e-10,
      za: za$4,
      zb: zb$4,
      zc: zc$4,
      zd: zd$4,
      ze: ze$4,
      zf: zf$4,
      zg: zg$4,
      zh: zh$4,
      zi: zi$4,
      zj: zj$4,
      zk: zk$4,
      zl: zl$4,
      zm: zm$4,
      zn: zn$4,
      zo: zo$4,
      zp: zp$4,
      zq: zq$4,
      zr: zr$4,
      zs: zs$4,
      zt: zt$4,
      zu: zu$4,
      zv: zv$4,
      zw: zw$4,
      zx: zx$4,
      zy: zy$4,
      zz: zz$4,
      "z ": 5345404e-11,
      " a": 0.0116386,
      " b": 7284129e-9,
      " c": 1221628e-9,
      " d": 0.0130034,
      " e": 0.01078584,
      " f": 0.01176239,
      " g": 3609242e-9,
      " h": 9463865e-9,
      " i": 0.01002248,
      " j": 1723033e-9,
      " k": 7195351e-9,
      " l": 4256942e-9,
      " m": 0.01009187,
      " n": 4141594e-9,
      " o": 9393844e-9,
      " p": 7075314e-9,
      " q": 2657072e-11,
      " r": 3969353e-9,
      " s": 0.01667703,
      " t": 7842739e-9,
      " u": 2981547e-9,
      " v": 6490445e-9,
      " w": 3397926e-10,
      " x": 4001238e-11,
      " y": 1612999e-10,
      " z": 6314454e-11,
      "  ": 4193172e-9
    };
    const aa$3 = 6330445e-11;
    const ab$3 = 1298629e-9;
    const ac$3 = 2891593e-9;
    const ad$3 = 2481298e-9;
    const ae$3 = 1076767e-10;
    const af$3 = 6998987e-10;
    const ag$3 = 1394177e-9;
    const ah$3 = 182518e-9;
    const ai$3 = 2804032e-9;
    const aj$3 = 1109307e-10;
    const ak$3 = 977965e-9;
    const al$3 = 673867e-8;
    const am$3 = 2366817e-9;
    const an$3 = 0.01259729;
    const ao$3 = 3727271e-11;
    const ap$3 = 107588e-8;
    const aq$3 = 3520201e-11;
    const ar$3 = 7703915e-9;
    const as$3 = 5843533e-9;
    const at$3 = 9152522e-9;
    const au$3 = 8942493e-10;
    const av$3 = 1575512e-9;
    const aw$3 = 5150142e-10;
    const ax$3 = 1351875e-10;
    const ay$3 = 243308e-8;
    const az$3 = 1419913e-10;
    const ba$3 = 1507474e-9;
    const bb$3 = 1171428e-10;
    const bc$3 = 3904761e-11;
    const bd$3 = 136075e-10;
    const be$3 = 3808029e-9;
    const bf$3 = 4733043e-12;
    const bg$3 = 3549782e-12;
    const bh$3 = 1597402e-11;
    const bi$3 = 7930805e-10;
    const bj$3 = 4023087e-11;
    const bk$3 = 1183261e-12;
    const bl$3 = 1287092e-9;
    const bm$3 = 2958152e-11;
    const bn$3 = 9761901e-12;
    const bo$3 = 1470793e-9;
    const bp$3 = 5028858e-12;
    const bq$3 = 2366522e-12;
    const br$3 = 8137876e-10;
    const bs$3 = 241681e-9;
    const bt$3 = 6567097e-11;
    const bu$3 = 1519898e-9;
    const bv$3 = 174531e-10;
    const bw$3 = 1183261e-11;
    const bx$3 = 5916304e-13;
    const by$3 = 9054903e-10;
    const bz$3 = 1183261e-12;
    const ca$3 = 3595634e-9;
    const cb$3 = 1686147e-11;
    const cc$3 = 5132394e-10;
    const cd$3 = 2544011e-11;
    const ce$3 = 3884349e-9;
    const cf$3 = 9761901e-12;
    const cg$3 = 1094516e-11;
    const ch$3 = 3695323e-9;
    const ci$3 = 172194e-8;
    const cj$3 = 3253967e-12;
    const ck$3 = 131549e-8;
    const cl$3 = 1112265e-9;
    const cm$3 = 2011543e-11;
    const cn$3 = 1597402e-11;
    const co$3 = 5328223e-9;
    const cp$3 = 1508657e-11;
    const cq$3 = 174531e-10;
    const cr$3 = 9903893e-10;
    const cs$3 = 1523448e-10;
    const ct$3 = 2301738e-9;
    const cu$3 = 8596389e-10;
    const cv$3 = 2958152e-12;
    const cw$3 = 7099565e-12;
    const cx$3 = 2958152e-13;
    const cy$3 = 241681e-9;
    const cz$3 = 7099565e-12;
    const da$3 = 1839675e-9;
    const db$3 = 7750358e-11;
    const dc$3 = 8460314e-11;
    const dd$3 = 3916593e-10;
    const de$3 = 4759962e-9;
    const df$3 = 6774168e-11;
    const dg$3 = 23044e-8;
    const dh$3 = 8519478e-11;
    const di$3 = 3030331e-9;
    const dj$3 = 3520201e-11;
    const dk$3 = 5324673e-12;
    const dl$3 = 2481889e-10;
    const dm$3 = 1561904e-10;
    const dn$3 = 2354689e-10;
    const dp$3 = 4880951e-11;
    const dq$3 = 739538e-11;
    const dr$3 = 7445668e-10;
    const ds$3 = 9714571e-10;
    const dt$3 = 228961e-9;
    const du$3 = 8501729e-10;
    const dv$3 = 1251298e-10;
    const dw$3 = 1700937e-10;
    const dx$3 = 5916304e-13;
    const dy$3 = 3526117e-10;
    const dz$3 = 798701e-11;
    const ea$3 = 5465777e-9;
    const eb$3 = 4117747e-10;
    const ec$3 = 2896031e-9;
    const ed$3 = 7336808e-9;
    const ee$3 = 2889523e-9;
    const ef$3 = 9081526e-10;
    const eg$3 = 8593431e-10;
    const eh$3 = 2810244e-10;
    const ei$3 = 1359271e-9;
    const ej$3 = 428932e-10;
    const ek$3 = 3035064e-10;
    const el$3 = 3353065e-9;
    const em$3 = 2185778e-9;
    const en$3 = 8896346e-9;
    const eo$3 = 6229868e-10;
    const ep$3 = 1126464e-9;
    const eq$3 = 1739393e-10;
    const er$3 = 0.01294458;
    const es$3 = 842245e-8;
    const et$3 = 306435e-8;
    const eu$3 = 1686147e-10;
    const ev$3 = 1691175e-9;
    const ew$3 = 1074697e-9;
    const ex$3 = 1083571e-9;
    const ey$3 = 127733e-8;
    const ez$3 = 739538e-10;
    const fa$3 = 1098066e-9;
    const fb$3 = 9761901e-12;
    const fc$3 = 2011543e-11;
    const fd$3 = 1094516e-11;
    const fe$3 = 1463398e-9;
    const ff$3 = 1103391e-9;
    const fg$3 = 1893217e-11;
    const fh$3 = 6212119e-12;
    const fi$3 = 2056803e-9;
    const fj$3 = 1183261e-12;
    const fk$3 = 2070706e-12;
    const fl$3 = 3739104e-10;
    const fm$3 = 1331168e-11;
    const fn$3 = 3549782e-12;
    const fo$3 = 350541e-8;
    const fp$3 = 5028858e-12;
    const fq$3 = 0;
    const fr$3 = 1470793e-9;
    const fs$3 = 7424961e-11;
    const ft$3 = 6155914e-10;
    const fu$3 = 6623302e-10;
    const fv$3 = 1774891e-12;
    const fw$3 = 8578641e-12;
    const fx$3 = 1183261e-12;
    const fy$3 = 4200576e-11;
    const fz$3 = 2958152e-13;
    const ga$3 = 1313124e-9;
    const gb$3 = 4614717e-11;
    const gc$3 = 1390331e-11;
    const gd$3 = 2455266e-11;
    const ge$3 = 2591933e-9;
    const gf$3 = 2100288e-11;
    const gg$3 = 1813347e-10;
    const gh$3 = 1614559e-9;
    const gi$3 = 9596245e-10;
    const gj$3 = 4141413e-12;
    const gk$3 = 6212119e-12;
    const gl$3 = 3517243e-10;
    const gm$3 = 7750358e-11;
    const gn$3 = 3573448e-10;
    const go$3 = 125189e-8;
    const gp$3 = 1419913e-11;
    const gq$3 = 2958152e-13;
    const gr$3 = 1272005e-9;
    const gs$3 = 4283404e-10;
    const gt$3 = 187251e-9;
    const gu$3 = 5567242e-10;
    const gv$3 = 2662337e-12;
    const gw$3 = 3283549e-11;
    const gx$3 = 0;
    const gy$3 = 1292712e-10;
    const gz$3 = 2366522e-12;
    const ha$3 = 6346715e-9;
    const hb$3 = 7513706e-11;
    const hc$3 = 2100288e-11;
    const hd$3 = 4525972e-11;
    const he$3 = 0.01777908;
    const hf$3 = 2366522e-11;
    const hg$3 = 9761901e-12;
    const hh$3 = 1863636e-11;
    const hi$3 = 4452019e-9;
    const hj$3 = 2662337e-12;
    const hk$3 = 8874456e-12;
    const hl$3 = 1195093e-10;
    const hm$3 = 8341988e-11;
    const hn$3 = 1547113e-10;
    const ho$3 = 3764544e-9;
    const hp$3 = 1922799e-11;
    const hq$3 = 6803749e-12;
    const hr$3 = 6232826e-10;
    const hs$3 = 1576695e-10;
    const ht$3 = 8992782e-10;
    const hu$3 = 5144226e-10;
    const hv$3 = 1094516e-11;
    const hw$3 = 5975467e-11;
    const hx$3 = 2958152e-13;
    const hy$3 = 2331024e-10;
    const hz$3 = 2070706e-12;
    const ia$3 = 1681414e-9;
    const ib$3 = 4292278e-10;
    const ic$3 = 3926355e-9;
    const id$3 = 2862012e-9;
    const ie$3 = 2267423e-9;
    const ig$3 = 1708924e-9;
    const ih$3 = 1567821e-11;
    const ii$3 = 3638527e-11;
    const ij$3 = 3224386e-11;
    const ik$3 = 451414e-9;
    const il$3 = 3767206e-9;
    const im$3 = 1786428e-9;
    const io$3 = 402427e-8;
    const ip$3 = 5712191e-10;
    const iq$3 = 4880951e-11;
    const ir$3 = 2132532e-9;
    const is$3 = 6621231e-9;
    const it$3 = 7161982e-9;
    const iu$3 = 7099565e-11;
    const iv$3 = 1764538e-9;
    const iw$3 = 1449494e-11;
    const ix$3 = 1381457e-10;
    const iy$3 = 1479076e-11;
    const iz$3 = 3659234e-10;
    const ja$3 = 2718542e-10;
    const jb$3 = 1774891e-12;
    const jc$3 = 4141413e-12;
    const jd$3 = 2366522e-12;
    const je$3 = 2964068e-10;
    const jf$3 = 1183261e-12;
    const jg$3 = 5916304e-13;
    const jh$3 = 1774891e-12;
    const ji$3 = 5472581e-11;
    const jj$3 = 2366522e-12;
    const jk$3 = 1479076e-12;
    const jl$3 = 1479076e-12;
    const jm$3 = 8874456e-13;
    const jn$3 = 8874456e-13;
    const jo$3 = 5369046e-10;
    const jp$3 = 5028858e-12;
    const jq$3 = 0;
    const jr$3 = 8578641e-12;
    const js$3 = 3253967e-12;
    const jt$3 = 3253967e-12;
    const ju$3 = 6170705e-10;
    const jv$3 = 1774891e-12;
    const jw$3 = 1479076e-12;
    const jx$3 = 0;
    const jy$3 = 1479076e-12;
    const jz$3 = 0;
    const ka$3 = 2869407e-10;
    const kb$3 = 1922799e-11;
    const kc$3 = 1153679e-11;
    const kd$3 = 1508657e-11;
    const ke$3 = 207396e-8;
    const kf$3 = 3046896e-11;
    const kg$3 = 195238e-10;
    const kh$3 = 5738815e-11;
    const ki$3 = 1001039e-9;
    const kj$3 = 4141413e-12;
    const kk$3 = 1242424e-11;
    const kl$3 = 1224675e-10;
    const km$3 = 2691918e-11;
    const kn$3 = 3043938e-10;
    const ko$3 = 1156637e-10;
    const kp$3 = 2248195e-11;
    const kq$3 = 1183261e-12;
    const kr$3 = 4023087e-11;
    const ks$3 = 5046607e-10;
    const kt$3 = 505844e-10;
    const ku$3 = 505844e-10;
    const kv$3 = 5028858e-12;
    const kw$3 = 2869407e-11;
    const kx$3 = 0;
    const ky$3 = 8341988e-11;
    const kz$3 = 8874456e-13;
    const la$3 = 3555699e-9;
    const lb$3 = 9761901e-11;
    const lc$3 = 9761901e-11;
    const ld$3 = 1886709e-9;
    const le$3 = 5514291e-9;
    const lf$3 = 2810244e-10;
    const lg$3 = 4023087e-11;
    const lh$3 = 3904761e-11;
    const li$3 = 4137271e-9;
    const lj$3 = 6803749e-12;
    const lk$3 = 2082539e-10;
    const ll$3 = 476647e-8;
    const lm$3 = 1979004e-10;
    const ln$3 = 4378065e-11;
    const lo$3 = 266352e-8;
    const lp$3 = 2348773e-10;
    const lq$3 = 3549782e-12;
    const lr$3 = 8933619e-11;
    const ls$3 = 1171132e-9;
    const lt$3 = 7806563e-10;
    const lu$3 = 7697111e-10;
    const lv$3 = 1993794e-10;
    const lw$3 = 1198052e-10;
    const lx$3 = 2958152e-13;
    const ly$3 = 2361788e-9;
    const lz$3 = 3549782e-12;
    const ma$3 = 3542091e-9;
    const mb$3 = 6895452e-10;
    const mc$3 = 9880227e-11;
    const md$3 = 1863636e-11;
    const me$3 = 5176174e-9;
    const mf$3 = 3816016e-11;
    const mg$3 = 7099565e-12;
    const mh$3 = 233694e-10;
    const mi$3 = 2217726e-9;
    const mj$3 = 3845597e-12;
    const mk$3 = 7691195e-12;
    const ml$3 = 2544011e-11;
    const mm$3 = 7501873e-10;
    const mn$3 = 6005048e-11;
    const mo$3 = 2255591e-9;
    const mp$3 = 1371399e-9;
    const mq$3 = 8874456e-13;
    const mr$3 = 8489896e-11;
    const ms$3 = 5434125e-10;
    const mt$3 = 1038311e-10;
    const mu$3 = 7288886e-10;
    const mv$3 = 5916304e-12;
    const mw$3 = 2839826e-11;
    const mx$3 = 1183261e-12;
    const my$3 = 4221283e-10;
    const mz$3 = 2070706e-12;
    const na$3 = 232067e-8;
    const nb$3 = 1053102e-10;
    const nc$3 = 2252633e-9;
    const nd$3 = 8352046e-9;
    const ne$3 = 4876218e-9;
    const nf$3 = 3836723e-10;
    const ng$3 = 7381476e-9;
    const nh$3 = 1127056e-10;
    const ni$3 = 2561168e-9;
    const nj$3 = 136075e-9;
    const nk$3 = 4798122e-10;
    const nl$3 = 3597113e-10;
    const nm$3 = 2511471e-10;
    const nn$3 = 8120127e-10;
    const no$3 = 2702568e-9;
    const np$3 = 6537516e-11;
    const nq$3 = 1212842e-11;
    const nr$3 = 7040402e-11;
    const ns$3 = 3070266e-9;
    const nt$3 = 7127667e-9;
    const nu$3 = 5505121e-10;
    const nv$3 = 3558657e-10;
    const nw$3 = 1212842e-10;
    const nx$3 = 1064935e-11;
    const ny$3 = 7158728e-10;
    const nz$3 = 3135641e-11;
    const oa$3 = 6013923e-10;
    const ob$3 = 6164789e-10;
    const oc$3 = 1095995e-9;
    const od$3 = 1064343e-9;
    const oe$3 = 2789537e-10;
    const of$3 = 5152805e-9;
    const og$3 = 5194515e-10;
    const oh$3 = 1703896e-10;
    const oi$3 = 6676549e-10;
    const oj$3 = 1097474e-10;
    const ok$3 = 5635279e-10;
    const ol$3 = 2446392e-9;
    const om$3 = 3843823e-9;
    const on$3 = 0.01064195;
    const oo$3 = 1937885e-9;
    const op$3 = 1725786e-9;
    const oq$3 = 6212119e-12;
    const or$3 = 8546693e-9;
    const os$3 = 1946168e-9;
    const ot$3 = 2797524e-9;
    const ou$3 = 6662646e-9;
    const ov$3 = 1439733e-9;
    const ow$3 = 2373325e-9;
    const ox$3 = 9229434e-11;
    const oy$3 = 3091269e-10;
    const oz$3 = 4733043e-11;
    const pa$3 = 2239321e-9;
    const pb$3 = 2484848e-11;
    const pc$3 = 3046896e-11;
    const pd$3 = 4466809e-11;
    const pe$3 = 3033881e-9;
    const pf$3 = 1656565e-11;
    const pg$3 = 1538239e-11;
    const ph$3 = 4203534e-10;
    const pi$3 = 8909954e-10;
    const pj$3 = 1774891e-12;
    const pk$3 = 1153679e-11;
    const pl$3 = 1877835e-9;
    const pm$3 = 2236363e-10;
    const pn$3 = 1508657e-11;
    const po$3 = 2226601e-9;
    const pp$3 = 9276764e-10;
    const pq$3 = 8874456e-13;
    const pr$3 = 2652279e-9;
    const ps$3 = 3605987e-10;
    const pt$3 = 4783332e-10;
    const pu$3 = 6945741e-10;
    const pv$3 = 6212119e-12;
    const pw$3 = 174531e-10;
    const px$3 = 2958152e-13;
    const py$3 = 6271282e-11;
    const pz$3 = 5916304e-13;
    const qa$3 = 1035353e-11;
    const qb$3 = 3253967e-12;
    const qc$3 = 2958152e-13;
    const qd$3 = 2958152e-13;
    const qe$3 = 5916304e-13;
    const qf$3 = 2958152e-13;
    const qg$3 = 0;
    const qh$3 = 0;
    const qi$3 = 6803749e-12;
    const qj$3 = 0;
    const qk$3 = 0;
    const ql$3 = 2958152e-13;
    const qm$3 = 2958152e-13;
    const qn$3 = 5916304e-13;
    const qo$3 = 0;
    const qp$3 = 0;
    const qq$3 = 2958152e-13;
    const qr$3 = 1183261e-12;
    const qs$3 = 2958152e-12;
    const qt$3 = 1183261e-12;
    const qu$3 = 6534558e-10;
    const qv$3 = 5916304e-13;
    const qw$3 = 0;
    const qx$3 = 0;
    const qy$3 = 0;
    const qz$3 = 0;
    const ra$3 = 4062134e-9;
    const rb$3 = 2014501e-10;
    const rc$3 = 7800647e-10;
    const rd$3 = 144979e-8;
    const re$3 = 0.01154922;
    const rf$3 = 2221572e-10;
    const rg$3 = 6703172e-10;
    const rh$3 = 1097474e-10;
    const ri$3 = 4604659e-9;
    const rj$3 = 8874456e-12;
    const rk$3 = 8614138e-10;
    const rl$3 = 5780229e-10;
    const rm$3 = 8738381e-10;
    const rn$3 = 1174386e-9;
    const ro$3 = 4841607e-9;
    const rp$3 = 2067748e-10;
    const rq$3 = 9466086e-12;
    const rr$3 = 7824312e-10;
    const rs$3 = 33365e-7;
    const rt$3 = 2691327e-9;
    const ru$3 = 9190978e-10;
    const rv$3 = 4724169e-10;
    const rw$3 = 1348917e-10;
    const rx$3 = 2366522e-12;
    const ry$3 = 1571666e-9;
    const rz$3 = 1005772e-11;
    const sa$3 = 2451125e-9;
    const sb$3 = 1727561e-10;
    const sc$3 = 1084754e-9;
    const sd$3 = 2402019e-10;
    const se$3 = 5418743e-9;
    const sf$3 = 1325252e-10;
    const sg$3 = 5413418e-11;
    const sh$3 = 2418289e-9;
    const si$3 = 3558657e-9;
    const sj$3 = 195238e-10;
    const sk$3 = 3679941e-10;
    const sl$3 = 3952091e-10;
    const sm$3 = 416212e-9;
    const sn$3 = 2245237e-10;
    const so$3 = 2671803e-9;
    const sp$3 = 1318448e-9;
    const sq$3 = 5886722e-11;
    const sr$3 = 9613994e-11;
    const ss$3 = 2453787e-9;
    const st$3 = 7889095e-9;
    const su$3 = 1669581e-9;
    const sv$3 = 3668108e-11;
    const sw$3 = 3177055e-10;
    const sx$3 = 1479076e-12;
    const sy$3 = 2517387e-10;
    const sz$3 = 4733043e-12;
    const ta$3 = 3416961e-9;
    const tb$3 = 1337085e-10;
    const tc$3 = 3097185e-10;
    const td$3 = 5206347e-11;
    const te$3 = 7651852e-9;
    const tf$3 = 7868684e-11;
    const tg$3 = 3638527e-11;
    const th$3 = 0.02087775;
    const ti$3 = 7093352e-9;
    const tj$3 = 1153679e-11;
    const tk$3 = 1301587e-11;
    const tl$3 = 5901513e-10;
    const tm$3 = 2564718e-10;
    const tn$3 = 112114e-9;
    const to$3 = 7909211e-9;
    const tp$3 = 5709233e-11;
    const tq$3 = 2070706e-12;
    const tr$3 = 2584833e-9;
    const ts$3 = 2895143e-9;
    const tt$3 = 1406305e-9;
    const tu$3 = 1464877e-9;
    const tv$3 = 3816016e-11;
    const tw$3 = 5584991e-10;
    const tx$3 = 3253967e-12;
    const ty$3 = 1567821e-9;
    const tz$3 = 4052668e-11;
    const ua$3 = 7200142e-10;
    const ub$3 = 5451874e-10;
    const uc$3 = 9545956e-10;
    const ud$3 = 7280012e-10;
    const ue$3 = 9217601e-10;
    const uf$3 = 9702738e-11;
    const ug$3 = 8569766e-10;
    const uh$3 = 1331168e-11;
    const ui$3 = 6093793e-10;
    const uj$3 = 6803749e-12;
    const uk$3 = 5502163e-11;
    const ul$3 = 197575e-8;
    const um$3 = 7534413e-10;
    const un$3 = 3178534e-9;
    const uo$3 = 4111831e-11;
    const up$3 = 1030324e-9;
    const uq$3 = 3253967e-12;
    const ur$3 = 3587647e-9;
    const us$3 = 2940995e-9;
    const ut$3 = 2849884e-9;
    const uu$3 = 3845597e-12;
    const uv$3 = 3993505e-11;
    const uw$3 = 9466086e-12;
    const ux$3 = 1715728e-11;
    const uy$3 = 9613994e-11;
    const uz$3 = 3283549e-11;
    const va$3 = 7288886e-10;
    const vb$3 = 1774891e-12;
    const vc$3 = 6507934e-12;
    const vd$3 = 5620489e-12;
    const ve$3 = 5776679e-9;
    const vf$3 = 2366522e-12;
    const vg$3 = 8874456e-13;
    const vh$3 = 1774891e-12;
    const vi$3 = 1867777e-9;
    const vj$3 = 0;
    const vk$3 = 0;
    const vl$3 = 3845597e-12;
    const vm$3 = 2366522e-12;
    const vn$3 = 2958152e-12;
    const vo$3 = 4700503e-10;
    const vp$3 = 5028858e-12;
    const vq$3 = 0;
    const vr$3 = 8874456e-12;
    const vs$3 = 1686147e-11;
    const vt$3 = 4141413e-12;
    const vu$3 = 1035353e-11;
    const vv$3 = 3253967e-12;
    const vw$3 = 8874456e-13;
    const vx$3 = 0;
    const vy$3 = 3579364e-11;
    const vz$3 = 2958152e-13;
    const wa$3 = 2816161e-9;
    const wb$3 = 2189032e-11;
    const wc$3 = 3076478e-11;
    const wd$3 = 3963924e-11;
    const we$3 = 2785692e-9;
    const wf$3 = 1449494e-11;
    const wg$3 = 4733043e-12;
    const wh$3 = 2215064e-9;
    const wi$3 = 3103101e-9;
    const wj$3 = 4141413e-12;
    const wk$3 = 1863636e-11;
    const wl$3 = 8489896e-11;
    const wm$3 = 2425685e-11;
    const wn$3 = 6457646e-10;
    const wo$3 = 1726969e-9;
    const wp$3 = 136075e-10;
    const wq$3 = 8874456e-13;
    const wr$3 = 1768975e-10;
    const ws$3 = 3330879e-10;
    const wt$3 = 5797978e-11;
    const wu$3 = 5916304e-12;
    const wv$3 = 2662337e-12;
    const ww$3 = 4525972e-11;
    const wx$3 = 2958152e-13;
    const wy$3 = 292857e-10;
    const wz$3 = 5916304e-13;
    const xa$3 = 1162554e-10;
    const xb$3 = 2662337e-12;
    const xc$3 = 1153679e-10;
    const xd$3 = 5916304e-13;
    const xe$3 = 1032395e-10;
    const xf$3 = 7099565e-12;
    const xg$3 = 1774891e-12;
    const xh$3 = 2514429e-11;
    const xi$3 = 1461327e-10;
    const xj$3 = 0;
    const xk$3 = 2958152e-13;
    const xl$3 = 1183261e-12;
    const xm$3 = 6507934e-12;
    const xn$3 = 8874456e-13;
    const xo$3 = 1301587e-11;
    const xp$3 = 4031961e-10;
    const xq$3 = 1183261e-12;
    const xr$3 = 2070706e-12;
    const xs$3 = 1094516e-11;
    const xt$3 = 2514429e-10;
    const xu$3 = 3549782e-11;
    const xv$3 = 1242424e-11;
    const xw$3 = 2958152e-12;
    const xx$3 = 1479076e-12;
    const xy$3 = 8874456e-12;
    const xz$3 = 0;
    const ya$3 = 2650504e-10;
    const yb$3 = 1112265e-10;
    const yc$3 = 9673157e-11;
    const yd$3 = 5797978e-11;
    const ye$3 = 1093037e-9;
    const yf$3 = 4052668e-11;
    const yg$3 = 2573592e-11;
    const yh$3 = 4851369e-11;
    const yi$3 = 334567e-9;
    const yj$3 = 9466086e-12;
    const yk$3 = 1390331e-11;
    const yl$3 = 1452453e-10;
    const ym$3 = 1573737e-10;
    const yn$3 = 112114e-9;
    const yo$3 = 1425829e-9;
    const yp$3 = 9406923e-11;
    const yq$3 = 1183261e-12;
    const yr$3 = 9821064e-11;
    const ys$3 = 8655552e-10;
    const yt$3 = 265642e-9;
    const yu$3 = 2751081e-11;
    const yv$3 = 2159451e-11;
    const yw$3 = 973232e-10;
    const yx$3 = 5916304e-13;
    const yy$3 = 1390331e-11;
    const yz$3 = 8874456e-12;
    const za$3 = 1493867e-10;
    const zb$3 = 3845597e-12;
    const zc$3 = 2366522e-12;
    const zd$3 = 2070706e-12;
    const ze$3 = 334567e-9;
    const zf$3 = 1479076e-12;
    const zg$3 = 2958152e-12;
    const zh$3 = 1153679e-11;
    const zi$3 = 1127056e-10;
    const zj$3 = 2958152e-13;
    const zk$3 = 4733043e-12;
    const zl$3 = 1774891e-11;
    const zm$3 = 2070706e-12;
    const zn$3 = 2958152e-12;
    const zo$3 = 7957429e-11;
    const zp$3 = 3549782e-12;
    const zq$3 = 0;
    const zr$3 = 2958152e-13;
    const zs$3 = 5324673e-12;
    const zt$3 = 4733043e-12;
    const zu$3 = 2041125e-11;
    const zv$3 = 1479076e-12;
    const zw$3 = 1774891e-12;
    const zx$3 = 0;
    const zy$3 = 1686147e-11;
    const zz$3 = 4200576e-11;
    const bigram_english = {
      aa: aa$3,
      ab: ab$3,
      ac: ac$3,
      ad: ad$3,
      ae: ae$3,
      af: af$3,
      ag: ag$3,
      ah: ah$3,
      ai: ai$3,
      aj: aj$3,
      ak: ak$3,
      al: al$3,
      am: am$3,
      an: an$3,
      ao: ao$3,
      ap: ap$3,
      aq: aq$3,
      ar: ar$3,
      as: as$3,
      at: at$3,
      au: au$3,
      av: av$3,
      aw: aw$3,
      ax: ax$3,
      ay: ay$3,
      az: az$3,
      "a ": 5687047e-9,
      ba: ba$3,
      bb: bb$3,
      bc: bc$3,
      bd: bd$3,
      be: be$3,
      bf: bf$3,
      bg: bg$3,
      bh: bh$3,
      bi: bi$3,
      bj: bj$3,
      bk: bk$3,
      bl: bl$3,
      bm: bm$3,
      bn: bn$3,
      bo: bo$3,
      bp: bp$3,
      bq: bq$3,
      br: br$3,
      bs: bs$3,
      bt: bt$3,
      bu: bu$3,
      bv: bv$3,
      bw: bw$3,
      bx: bx$3,
      by: by$3,
      bz: bz$3,
      "b ": 2579508e-10,
      ca: ca$3,
      cb: cb$3,
      cc: cc$3,
      cd: cd$3,
      ce: ce$3,
      cf: cf$3,
      cg: cg$3,
      ch: ch$3,
      ci: ci$3,
      cj: cj$3,
      ck: ck$3,
      cl: cl$3,
      cm: cm$3,
      cn: cn$3,
      co: co$3,
      cp: cp$3,
      cq: cq$3,
      cr: cr$3,
      cs: cs$3,
      ct: ct$3,
      cu: cu$3,
      cv: cv$3,
      cw: cw$3,
      cx: cx$3,
      cy: cy$3,
      cz: cz$3,
      "c ": 8670343e-10,
      da: da$3,
      db: db$3,
      dc: dc$3,
      dd: dd$3,
      de: de$3,
      df: df$3,
      dg: dg$3,
      dh: dh$3,
      di: di$3,
      dj: dj$3,
      dk: dk$3,
      dl: dl$3,
      dm: dm$3,
      dn: dn$3,
      "do": 1605981e-9,
      dp: dp$3,
      dq: dq$3,
      dr: dr$3,
      ds: ds$3,
      dt: dt$3,
      du: du$3,
      dv: dv$3,
      dw: dw$3,
      dx: dx$3,
      dy: dy$3,
      dz: dz$3,
      "d ": 0.01595627,
      ea: ea$3,
      eb: eb$3,
      ec: ec$3,
      ed: ed$3,
      ee: ee$3,
      ef: ef$3,
      eg: eg$3,
      eh: eh$3,
      ei: ei$3,
      ej: ej$3,
      ek: ek$3,
      el: el$3,
      em: em$3,
      en: en$3,
      eo: eo$3,
      ep: ep$3,
      eq: eq$3,
      er: er$3,
      es: es$3,
      et: et$3,
      eu: eu$3,
      ev: ev$3,
      ew: ew$3,
      ex: ex$3,
      ey: ey$3,
      ez: ez$3,
      "e ": 0.03137416,
      fa: fa$3,
      fb: fb$3,
      fc: fc$3,
      fd: fd$3,
      fe: fe$3,
      ff: ff$3,
      fg: fg$3,
      fh: fh$3,
      fi: fi$3,
      fj: fj$3,
      fk: fk$3,
      fl: fl$3,
      fm: fm$3,
      fn: fn$3,
      fo: fo$3,
      fp: fp$3,
      fq: fq$3,
      fr: fr$3,
      fs: fs$3,
      ft: ft$3,
      fu: fu$3,
      fv: fv$3,
      fw: fw$3,
      fx: fx$3,
      fy: fy$3,
      fz: fz$3,
      "f ": 5264327e-9,
      ga: ga$3,
      gb: gb$3,
      gc: gc$3,
      gd: gd$3,
      ge: ge$3,
      gf: gf$3,
      gg: gg$3,
      gh: gh$3,
      gi: gi$3,
      gj: gj$3,
      gk: gk$3,
      gl: gl$3,
      gm: gm$3,
      gn: gn$3,
      go: go$3,
      gp: gp$3,
      gq: gq$3,
      gr: gr$3,
      gs: gs$3,
      gt: gt$3,
      gu: gu$3,
      gv: gv$3,
      gw: gw$3,
      gx: gx$3,
      gy: gy$3,
      gz: gz$3,
      "g ": 6022206e-9,
      ha: ha$3,
      hb: hb$3,
      hc: hc$3,
      hd: hd$3,
      he: he$3,
      hf: hf$3,
      hg: hg$3,
      hh: hh$3,
      hi: hi$3,
      hj: hj$3,
      hk: hk$3,
      hl: hl$3,
      hm: hm$3,
      hn: hn$3,
      ho: ho$3,
      hp: hp$3,
      hq: hq$3,
      hr: hr$3,
      hs: hs$3,
      ht: ht$3,
      hu: hu$3,
      hv: hv$3,
      hw: hw$3,
      hx: hx$3,
      hy: hy$3,
      hz: hz$3,
      "h ": 4191405e-9,
      ia: ia$3,
      ib: ib$3,
      ic: ic$3,
      id: id$3,
      ie: ie$3,
      "if": 1085938e-9,
      ig: ig$3,
      ih: ih$3,
      ii: ii$3,
      ij: ij$3,
      ik: ik$3,
      il: il$3,
      im: im$3,
      "in": 0.01621156,
      io: io$3,
      ip: ip$3,
      iq: iq$3,
      ir: ir$3,
      is: is$3,
      it: it$3,
      iu: iu$3,
      iv: iv$3,
      iw: iw$3,
      ix: ix$3,
      iy: iy$3,
      iz: iz$3,
      "i ": 1324956e-9,
      ja: ja$3,
      jb: jb$3,
      jc: jc$3,
      jd: jd$3,
      je: je$3,
      jf: jf$3,
      jg: jg$3,
      jh: jh$3,
      ji: ji$3,
      jj: jj$3,
      jk: jk$3,
      jl: jl$3,
      jm: jm$3,
      jn: jn$3,
      jo: jo$3,
      jp: jp$3,
      jq: jq$3,
      jr: jr$3,
      js: js$3,
      jt: jt$3,
      ju: ju$3,
      jv: jv$3,
      jw: jw$3,
      jx: jx$3,
      jy: jy$3,
      jz: jz$3,
      "j ": 2780663e-11,
      ka: ka$3,
      kb: kb$3,
      kc: kc$3,
      kd: kd$3,
      ke: ke$3,
      kf: kf$3,
      kg: kg$3,
      kh: kh$3,
      ki: ki$3,
      kj: kj$3,
      kk: kk$3,
      kl: kl$3,
      km: km$3,
      kn: kn$3,
      ko: ko$3,
      kp: kp$3,
      kq: kq$3,
      kr: kr$3,
      ks: ks$3,
      kt: kt$3,
      ku: ku$3,
      kv: kv$3,
      kw: kw$3,
      kx: kx$3,
      ky: ky$3,
      kz: kz$3,
      "k ": 1847662e-9,
      la: la$3,
      lb: lb$3,
      lc: lc$3,
      ld: ld$3,
      le: le$3,
      lf: lf$3,
      lg: lg$3,
      lh: lh$3,
      li: li$3,
      lj: lj$3,
      lk: lk$3,
      ll: ll$3,
      lm: lm$3,
      ln: ln$3,
      lo: lo$3,
      lp: lp$3,
      lq: lq$3,
      lr: lr$3,
      ls: ls$3,
      lt: lt$3,
      lu: lu$3,
      lv: lv$3,
      lw: lw$3,
      lx: lx$3,
      ly: ly$3,
      lz: lz$3,
      "l ": 5716924e-9,
      ma: ma$3,
      mb: mb$3,
      mc: mc$3,
      md: md$3,
      me: me$3,
      mf: mf$3,
      mg: mg$3,
      mh: mh$3,
      mi: mi$3,
      mj: mj$3,
      mk: mk$3,
      ml: ml$3,
      mm: mm$3,
      mn: mn$3,
      mo: mo$3,
      mp: mp$3,
      mq: mq$3,
      mr: mr$3,
      ms: ms$3,
      mt: mt$3,
      mu: mu$3,
      mv: mv$3,
      mw: mw$3,
      mx: mx$3,
      my: my$3,
      mz: mz$3,
      "m ": 2669732e-9,
      na: na$3,
      nb: nb$3,
      nc: nc$3,
      nd: nd$3,
      ne: ne$3,
      nf: nf$3,
      ng: ng$3,
      nh: nh$3,
      ni: ni$3,
      nj: nj$3,
      nk: nk$3,
      nl: nl$3,
      nm: nm$3,
      nn: nn$3,
      no: no$3,
      np: np$3,
      nq: nq$3,
      nr: nr$3,
      ns: ns$3,
      nt: nt$3,
      nu: nu$3,
      nv: nv$3,
      nw: nw$3,
      nx: nx$3,
      ny: ny$3,
      nz: nz$3,
      "n ": 0.01417606,
      oa: oa$3,
      ob: ob$3,
      oc: oc$3,
      od: od$3,
      oe: oe$3,
      of: of$3,
      og: og$3,
      oh: oh$3,
      oi: oi$3,
      oj: oj$3,
      ok: ok$3,
      ol: ol$3,
      om: om$3,
      on: on$3,
      oo: oo$3,
      op: op$3,
      oq: oq$3,
      or: or$3,
      os: os$3,
      ot: ot$3,
      ou: ou$3,
      ov: ov$3,
      ow: ow$3,
      ox: ox$3,
      oy: oy$3,
      oz: oz$3,
      "o ": 7964824e-9,
      pa: pa$3,
      pb: pb$3,
      pc: pc$3,
      pd: pd$3,
      pe: pe$3,
      pf: pf$3,
      pg: pg$3,
      ph: ph$3,
      pi: pi$3,
      pj: pj$3,
      pk: pk$3,
      pl: pl$3,
      pm: pm$3,
      pn: pn$3,
      po: po$3,
      pp: pp$3,
      pq: pq$3,
      pr: pr$3,
      ps: ps$3,
      pt: pt$3,
      pu: pu$3,
      pv: pv$3,
      pw: pw$3,
      px: px$3,
      py: py$3,
      pz: pz$3,
      "p ": 1323181e-9,
      qa: qa$3,
      qb: qb$3,
      qc: qc$3,
      qd: qd$3,
      qe: qe$3,
      qf: qf$3,
      qg: qg$3,
      qh: qh$3,
      qi: qi$3,
      qj: qj$3,
      qk: qk$3,
      ql: ql$3,
      qm: qm$3,
      qn: qn$3,
      qo: qo$3,
      qp: qp$3,
      qq: qq$3,
      qr: qr$3,
      qs: qs$3,
      qt: qt$3,
      qu: qu$3,
      qv: qv$3,
      qw: qw$3,
      qx: qx$3,
      qy: qy$3,
      qz: qz$3,
      "q ": 2366522e-11,
      ra: ra$3,
      rb: rb$3,
      rc: rc$3,
      rd: rd$3,
      re: re$3,
      rf: rf$3,
      rg: rg$3,
      rh: rh$3,
      ri: ri$3,
      rj: rj$3,
      rk: rk$3,
      rl: rl$3,
      rm: rm$3,
      rn: rn$3,
      ro: ro$3,
      rp: rp$3,
      rq: rq$3,
      rr: rr$3,
      rs: rs$3,
      rt: rt$3,
      ru: ru$3,
      rv: rv$3,
      rw: rw$3,
      rx: rx$3,
      ry: ry$3,
      rz: rz$3,
      "r ": 0.01024822,
      sa: sa$3,
      sb: sb$3,
      sc: sc$3,
      sd: sd$3,
      se: se$3,
      sf: sf$3,
      sg: sg$3,
      sh: sh$3,
      si: si$3,
      sj: sj$3,
      sk: sk$3,
      sl: sl$3,
      sm: sm$3,
      sn: sn$3,
      so: so$3,
      sp: sp$3,
      sq: sq$3,
      sr: sr$3,
      ss: ss$3,
      st: st$3,
      su: su$3,
      sv: sv$3,
      sw: sw$3,
      sx: sx$3,
      sy: sy$3,
      sz: sz$3,
      "s ": 0.02166343,
      ta: ta$3,
      tb: tb$3,
      tc: tc$3,
      td: td$3,
      te: te$3,
      tf: tf$3,
      tg: tg$3,
      th: th$3,
      ti: ti$3,
      tj: tj$3,
      tk: tk$3,
      tl: tl$3,
      tm: tm$3,
      tn: tn$3,
      to: to$3,
      tp: tp$3,
      tq: tq$3,
      tr: tr$3,
      ts: ts$3,
      tt: tt$3,
      tu: tu$3,
      tv: tv$3,
      tw: tw$3,
      tx: tx$3,
      ty: ty$3,
      tz: tz$3,
      "t ": 0.01592521,
      ua: ua$3,
      ub: ub$3,
      uc: uc$3,
      ud: ud$3,
      ue: ue$3,
      uf: uf$3,
      ug: ug$3,
      uh: uh$3,
      ui: ui$3,
      uj: uj$3,
      uk: uk$3,
      ul: ul$3,
      um: um$3,
      un: un$3,
      uo: uo$3,
      up: up$3,
      uq: uq$3,
      ur: ur$3,
      us: us$3,
      ut: ut$3,
      uu: uu$3,
      uv: uv$3,
      uw: uw$3,
      ux: ux$3,
      uy: uy$3,
      uz: uz$3,
      "u ": 7918973e-10,
      va: va$3,
      vb: vb$3,
      vc: vc$3,
      vd: vd$3,
      ve: ve$3,
      vf: vf$3,
      vg: vg$3,
      vh: vh$3,
      vi: vi$3,
      vj: vj$3,
      vk: vk$3,
      vl: vl$3,
      vm: vm$3,
      vn: vn$3,
      vo: vo$3,
      vp: vp$3,
      vq: vq$3,
      vr: vr$3,
      vs: vs$3,
      vt: vt$3,
      vu: vu$3,
      vv: vv$3,
      vw: vw$3,
      vx: vx$3,
      vy: vy$3,
      vz: vz$3,
      "v ": 1514574e-10,
      wa: wa$3,
      wb: wb$3,
      wc: wc$3,
      wd: wd$3,
      we: we$3,
      wf: wf$3,
      wg: wg$3,
      wh: wh$3,
      wi: wi$3,
      wj: wj$3,
      wk: wk$3,
      wl: wl$3,
      wm: wm$3,
      wn: wn$3,
      wo: wo$3,
      wp: wp$3,
      wq: wq$3,
      wr: wr$3,
      ws: ws$3,
      wt: wt$3,
      wu: wu$3,
      wv: wv$3,
      ww: ww$3,
      wx: wx$3,
      wy: wy$3,
      wz: wz$3,
      "w ": 1541493e-9,
      xa: xa$3,
      xb: xb$3,
      xc: xc$3,
      xd: xd$3,
      xe: xe$3,
      xf: xf$3,
      xg: xg$3,
      xh: xh$3,
      xi: xi$3,
      xj: xj$3,
      xk: xk$3,
      xl: xl$3,
      xm: xm$3,
      xn: xn$3,
      xo: xo$3,
      xp: xp$3,
      xq: xq$3,
      xr: xr$3,
      xs: xs$3,
      xt: xt$3,
      xu: xu$3,
      xv: xv$3,
      xw: xw$3,
      xx: xx$3,
      xy: xy$3,
      xz: xz$3,
      "x ": 2600216e-10,
      ya: ya$3,
      yb: yb$3,
      yc: yc$3,
      yd: yd$3,
      ye: ye$3,
      yf: yf$3,
      yg: yg$3,
      yh: yh$3,
      yi: yi$3,
      yj: yj$3,
      yk: yk$3,
      yl: yl$3,
      ym: ym$3,
      yn: yn$3,
      yo: yo$3,
      yp: yp$3,
      yq: yq$3,
      yr: yr$3,
      ys: ys$3,
      yt: yt$3,
      yu: yu$3,
      yv: yv$3,
      yw: yw$3,
      yx: yx$3,
      yy: yy$3,
      yz: yz$3,
      "y ": 9639138e-9,
      za: za$3,
      zb: zb$3,
      zc: zc$3,
      zd: zd$3,
      ze: ze$3,
      zf: zf$3,
      zg: zg$3,
      zh: zh$3,
      zi: zi$3,
      zj: zj$3,
      zk: zk$3,
      zl: zl$3,
      zm: zm$3,
      zn: zn$3,
      zo: zo$3,
      zp: zp$3,
      zq: zq$3,
      zr: zr$3,
      zs: zs$3,
      zt: zt$3,
      zu: zu$3,
      zv: zv$3,
      zw: zw$3,
      zx: zx$3,
      zy: zy$3,
      zz: zz$3,
      "z ": 1106349e-10,
      " a": 0.01947973,
      " b": 7749471e-9,
      " c": 9353381e-9,
      " d": 5165821e-9,
      " e": 3850922e-9,
      " f": 7408396e-9,
      " g": 3408087e-9,
      " h": 7161982e-9,
      " i": 0.0103349,
      " j": 1250411e-9,
      " k": 1044819e-9,
      " l": 4243469e-9,
      " m": 6370676e-9,
      " n": 357966e-8,
      " o": 0.01039317,
      " p": 723209e-8,
      " q": 312085e-9,
      " r": 4846044e-9,
      " s": 0.01201453,
      " t": 0.02464614,
      " u": 1878722e-9,
      " v": 1273189e-9,
      " w": 9990566e-9,
      " x": 3904761e-11,
      " y": 1892921e-9,
      " z": 1067893e-10,
      "  ": 3403058e-9
    };
    const aa$2 = 7196313e-11;
    const ab$2 = 1146417e-9;
    const ac$2 = 2255236e-9;
    const ad$2 = 102687e-8;
    const ae$2 = 6373878e-11;
    const af$2 = 6714601e-10;
    const ag$2 = 1671895e-9;
    const ah$2 = 2599485e-10;
    const ai$2 = 8371809e-9;
    const aj$2 = 2144208e-10;
    const ak$2 = 1374643e-10;
    const al$2 = 4596829e-9;
    const am$2 = 1817877e-9;
    const an$2 = 0.01079858;
    const ao$2 = 160375e-9;
    const ap$2 = 1556166e-9;
    const aq$2 = 2349817e-10;
    const ar$2 = 6379752e-9;
    const as$2 = 2938446e-9;
    const at$2 = 5425433e-9;
    const au$2 = 5215124e-9;
    const av$2 = 2583036e-9;
    const aw$2 = 596266e-10;
    const ax$2 = 9634248e-11;
    const ay$2 = 5386955e-10;
    const az$2 = 1207218e-10;
    const ba$2 = 121603e-8;
    const bb$2 = 4963988e-11;
    const bc$2 = 5022733e-11;
    const bd$2 = 4053434e-11;
    const be$2 = 8676698e-10;
    const bf$2 = 3818452e-12;
    const bg$2 = 2643544e-12;
    const bh$2 = 8224358e-12;
    const bi$2 = 9654809e-10;
    const bj$2 = 7578159e-11;
    const bk$2 = 4112179e-12;
    const bl$2 = 1725353e-9;
    const bm$2 = 1351145e-11;
    const bn$2 = 7431295e-11;
    const bo$2 = 906148e-9;
    const bp$2 = 1997344e-11;
    const bq$2 = 1762362e-12;
    const br$2 = 100719e-8;
    const bs$2 = 1550879e-10;
    const bt$2 = 1077978e-10;
    const bu$2 = 5842232e-10;
    const bv$2 = 1057417e-11;
    const bw$2 = 1468635e-12;
    const bx$2 = 5874542e-13;
    const by$2 = 4141552e-11;
    const bz$2 = 1468635e-12;
    const ca$2 = 2464664e-9;
    const cb$2 = 1233654e-11;
    const cc$2 = 6356254e-10;
    const cd$2 = 1404015e-10;
    const ce$2 = 6541889e-9;
    const cf$2 = 3730334e-11;
    const cg$2 = 2026717e-11;
    const ch$2 = 3648971e-9;
    const ci$2 = 2330431e-9;
    const cj$2 = 2643544e-12;
    const ck$2 = 2106023e-10;
    const cl$2 = 9264152e-10;
    const cm$2 = 2878525e-11;
    const cn$2 = 6755723e-11;
    const co$2 = 615417e-8;
    const cp$2 = 1351145e-11;
    const cq$2 = 6579487e-11;
    const cr$2 = 1133787e-9;
    const cs$2 = 252899e-9;
    const ct$2 = 2083406e-9;
    const cu$2 = 1049781e-9;
    const cv$2 = 4699633e-12;
    const cw$2 = 2937271e-13;
    const cx$2 = 5874542e-13;
    const cy$2 = 5228342e-11;
    const cz$2 = 4112179e-12;
    const da$2 = 350152e-8;
    const db$2 = 207665e-9;
    const dc$2 = 5592564e-10;
    const dd$2 = 6785095e-11;
    const de$2 = 0.01744005;
    const df$2 = 2549551e-10;
    const dg$2 = 1145536e-10;
    const dh$2 = 2067839e-10;
    const di$2 = 3737971e-9;
    const dj$2 = 1988532e-10;
    const dk$2 = 1762362e-12;
    const dl$2 = 1847543e-10;
    const dm$2 = 2470245e-10;
    const dn$2 = 7196313e-11;
    const dp$2 = 3427795e-10;
    const dq$2 = 1263026e-11;
    const dr$2 = 1254508e-9;
    const ds$2 = 5043294e-10;
    const dt$2 = 2608296e-10;
    const du$2 = 3757063e-9;
    const dv$2 = 1865167e-10;
    const dw$2 = 9105539e-12;
    const dx$2 = 8811812e-13;
    const dy$2 = 704945e-10;
    const dz$2 = 3818452e-12;
    const ea$2 = 1181664e-9;
    const eb$2 = 2029654e-10;
    const ec$2 = 2597429e-9;
    const ed$2 = 737255e-9;
    const ee$2 = 3007765e-10;
    const ef$2 = 5290025e-10;
    const eg$2 = 2135396e-10;
    const eh$2 = 4875869e-11;
    const ei$2 = 9672433e-10;
    const ej$2 = 1292399e-10;
    const ek$2 = 6902586e-11;
    const el$2 = 4198535e-9;
    const em$2 = 4368015e-9;
    const en$2 = 0.01575111;
    const eo$2 = 1633123e-10;
    const ep$2 = 1114694e-9;
    const eq$2 = 8371222e-11;
    const er$2 = 0.01000082;
    const es$2 = 0.0187953;
    const et$2 = 5929468e-9;
    const eu$2 = 5790242e-9;
    const ev$2 = 9011547e-10;
    const ew$2 = 8870558e-11;
    const ex$2 = 9690056e-10;
    const ey$2 = 1104414e-10;
    const ez$2 = 3586408e-10;
    const fa$2 = 1901002e-9;
    const fb$2 = 3818452e-12;
    const fc$2 = 3260371e-11;
    const fd$2 = 8018749e-11;
    const fe$2 = 8568019e-10;
    const ff$2 = 1159047e-9;
    const fg$2 = 2379189e-11;
    const fh$2 = 5874542e-13;
    const fi$2 = 1944767e-9;
    const fj$2 = 3230998e-12;
    const fk$2 = 5874542e-13;
    const fl$2 = 243206e-9;
    const fm$2 = 2937271e-11;
    const fn$2 = 8518085e-12;
    const fo$2 = 1385217e-9;
    const fp$2 = 4963988e-11;
    const fq$2 = 8811812e-13;
    const fr$2 = 1406953e-9;
    const fs$2 = 1380517e-10;
    const ft$2 = 704945e-10;
    const fu$2 = 2314569e-10;
    const fv$2 = 4846497e-11;
    const fw$2 = 2937271e-13;
    const fx$2 = 2937271e-13;
    const fy$2 = 1468635e-12;
    const fz$2 = 2937271e-13;
    const ga$2 = 1257152e-9;
    const gb$2 = 1615499e-11;
    const gc$2 = 1556754e-11;
    const gd$2 = 205609e-10;
    const ge$2 = 2225864e-9;
    const gf$2 = 5287087e-12;
    const gg$2 = 3642216e-11;
    const gh$2 = 1025107e-10;
    const gi$2 = 8662011e-10;
    const gj$2 = 8811812e-13;
    const gk$2 = 6168269e-12;
    const gl$2 = 2649418e-10;
    const gm$2 = 1001609e-10;
    const gn$2 = 9916226e-10;
    const go$2 = 5243028e-10;
    const gp$2 = 1380517e-11;
    const gq$2 = 5874542e-13;
    const gr$2 = 1320303e-9;
    const gs$2 = 9252403e-11;
    const gt$2 = 1201344e-10;
    const gu$2 = 5874542e-10;
    const gv$2 = 5874542e-12;
    const gw$2 = 1762362e-12;
    const gx$2 = 0;
    const gy$2 = 281978e-10;
    const gz$2 = 8811812e-13;
    const ha$2 = 1846075e-9;
    const hb$2 = 1644872e-11;
    const hc$2 = 1791735e-11;
    const hd$2 = 205609e-10;
    const he$2 = 1726528e-9;
    const hf$2 = 2937271e-12;
    const hg$2 = 2349817e-12;
    const hh$2 = 2643544e-12;
    const hi$2 = 7989376e-10;
    const hj$2 = 6168269e-12;
    const hk$2 = 5287087e-12;
    const hl$2 = 6931959e-11;
    const hm$2 = 8224358e-11;
    const hn$2 = 1624311e-10;
    const ho$2 = 9737053e-10;
    const hp$2 = 4082806e-11;
    const hq$2 = 1703617e-11;
    const hr$2 = 1856355e-10;
    const hs$2 = 1257152e-10;
    const ht$2 = 1098539e-10;
    const hu$2 = 3095883e-10;
    const hv$2 = 8224358e-12;
    const hw$2 = 1057417e-11;
    const hx$2 = 0;
    const hy$2 = 749004e-10;
    const hz$2 = 4699633e-12;
    const ia$2 = 1291224e-9;
    const ib$2 = 6573612e-10;
    const ic$2 = 2707576e-9;
    const id$2 = 1284469e-9;
    const ie$2 = 5872779e-9;
    const ig$2 = 1090021e-9;
    const ih$2 = 173299e-10;
    const ii$2 = 5257715e-11;
    const ij$2 = 3436607e-11;
    const ik$2 = 608015e-10;
    const il$2 = 4863827e-9;
    const im$2 = 1795847e-9;
    const io$2 = 5168422e-9;
    const ip$2 = 612421e-9;
    const iq$2 = 1575552e-9;
    const ir$2 = 4594479e-9;
    const is$2 = 8363879e-9;
    const it$2 = 7309105e-9;
    const iu$2 = 5698305e-11;
    const iv$2 = 1290931e-9;
    const iw$2 = 7343177e-12;
    const ix$2 = 36804e-8;
    const iy$2 = 8811812e-12;
    const iz$2 = 8958676e-11;
    const ja$2 = 4452902e-10;
    const jb$2 = 8811812e-13;
    const jc$2 = 4112179e-12;
    const jd$2 = 5580814e-12;
    const je$2 = 1142011e-9;
    const jf$2 = 5874542e-13;
    const jg$2 = 8811812e-13;
    const jh$2 = 5874542e-13;
    const ji$2 = 3201625e-11;
    const jj$2 = 1762362e-12;
    const jk$2 = 205609e-11;
    const jl$2 = 3818452e-12;
    const jm$2 = 4112179e-12;
    const jn$2 = 0;
    const jo$2 = 1209274e-9;
    const jp$2 = 3524725e-12;
    const jq$2 = 2937271e-13;
    const jr$2 = 217358e-10;
    const js$2 = 9399266e-12;
    const jt$2 = 1233654e-11;
    const ju$2 = 5651309e-10;
    const jv$2 = 2937271e-13;
    const jw$2 = 0;
    const jx$2 = 0;
    const jy$2 = 1174908e-12;
    const jz$2 = 0;
    const ka$2 = 170068e-9;
    const kb$2 = 7343177e-12;
    const kc$2 = 5287087e-12;
    const kd$2 = 5580814e-12;
    const ke$2 = 1973846e-10;
    const kf$2 = 205609e-11;
    const kg$2 = 6755723e-12;
    const kh$2 = 531646e-10;
    const ki$2 = 1947411e-10;
    const kj$2 = 5874542e-13;
    const kk$2 = 8224358e-12;
    const kl$2 = 2672916e-11;
    const km$2 = 3084134e-11;
    const kn$2 = 9986721e-12;
    const ko$2 = 1577314e-10;
    const kp$2 = 5874542e-12;
    const kq$2 = 0;
    const kr$2 = 2261698e-11;
    const ks$2 = 3935943e-11;
    const kt$2 = 9105539e-12;
    const ku$2 = 1938599e-11;
    const kv$2 = 3230998e-12;
    const kw$2 = 3230998e-12;
    const kx$2 = 2937271e-13;
    const ky$2 = 2526053e-11;
    const kz$2 = 0;
    const la$2 = 0.01002021;
    const lb$2 = 9134912e-11;
    const lc$2 = 2288134e-10;
    const ld$2 = 1586126e-10;
    const le$2 = 0.01637675;
    const lf$2 = 4141552e-11;
    const lg$2 = 3671588e-10;
    const lh$2 = 230282e-9;
    const li$2 = 4837097e-9;
    const lj$2 = 1674244e-11;
    const lk$2 = 2702289e-11;
    const ll$2 = 389159e-8;
    const lm$2 = 3222186e-10;
    const ln$2 = 5815796e-11;
    const lo$2 = 2807737e-9;
    const lp$2 = 1318835e-10;
    const lq$2 = 2581861e-10;
    const lr$2 = 1227779e-10;
    const ls$2 = 742542e-9;
    const lt$2 = 5354645e-10;
    const lu$2 = 2328668e-9;
    const lv$2 = 1806422e-10;
    const lw$2 = 499336e-11;
    const lx$2 = 1174908e-12;
    const ly$2 = 2341005e-10;
    const lz$2 = 5874542e-12;
    const ma$2 = 4654693e-9;
    const mb$2 = 896455e-9;
    const mc$2 = 6814468e-11;
    const md$2 = 1891602e-10;
    const me$2 = 6847366e-9;
    const mf$2 = 1116163e-11;
    const mg$2 = 1380517e-11;
    const mh$2 = 9399266e-12;
    const mi$2 = 3008353e-9;
    const mj$2 = 4112179e-12;
    const mk$2 = 2349817e-12;
    const ml$2 = 9017421e-11;
    const mm$2 = 1971496e-9;
    const mn$2 = 1486259e-10;
    const mo$2 = 2169174e-9;
    const mp$2 = 1801428e-9;
    const mq$2 = 3524725e-12;
    const mr$2 = 2881463e-10;
    const ms$2 = 1318835e-10;
    const mt$2 = 1685993e-10;
    const mu$2 = 4726069e-10;
    const mv$2 = 5580814e-12;
    const mw$2 = 108679e-10;
    const mx$2 = 8811812e-13;
    const my$2 = 3994688e-11;
    const mz$2 = 1468635e-12;
    const na$2 = 3351132e-9;
    const nb$2 = 455277e-10;
    const nc$2 = 364809e-8;
    const nd$2 = 3657783e-9;
    const ne$2 = 7572871e-9;
    const nf$2 = 6876151e-10;
    const ng$2 = 109942e-8;
    const nh$2 = 4934615e-11;
    const ni$2 = 2871182e-9;
    const nj$2 = 8635576e-11;
    const nk$2 = 6256387e-11;
    const nl$2 = 2232326e-10;
    const nm$2 = 1139661e-10;
    const nn$2 = 2348642e-9;
    const no$2 = 266851e-8;
    const np$2 = 7666277e-11;
    const nq$2 = 3571721e-10;
    const nr$2 = 2849153e-10;
    const ns$2 = 6248162e-9;
    const nt$2 = 0.01379989;
    const nu$2 = 8118616e-10;
    const nv$2 = 5198969e-10;
    const nw$2 = 6168269e-12;
    const nx$2 = 2643544e-12;
    const ny$2 = 1471573e-10;
    const nz$2 = 5727678e-11;
    const oa$2 = 1257152e-10;
    const ob$2 = 6224077e-10;
    const oc$2 = 1228073e-9;
    const od$2 = 5008047e-10;
    const oe$2 = 166837e-9;
    const of$2 = 4141552e-10;
    const og$2 = 5149036e-10;
    const oh$2 = 7930631e-11;
    const oi$2 = 3698905e-9;
    const oj$2 = 1418702e-10;
    const ok$2 = 7636904e-11;
    const ol$2 = 1910988e-9;
    const om$2 = 2869126e-9;
    const on$2 = 0.01517805;
    const oo$2 = 3818452e-10;
    const op$2 = 113173e-8;
    const oq$2 = 1677182e-10;
    const or$2 = 4215571e-9;
    const os$2 = 1615793e-9;
    const ot$2 = 1249221e-9;
    const ou$2 = 9658921e-9;
    const ov$2 = 2655293e-10;
    const ow$2 = 8606203e-11;
    const ox$2 = 5404578e-11;
    const oy$2 = 3430732e-10;
    const oz$2 = 7166941e-11;
    const pa$2 = 532909e-8;
    const pb$2 = 6168269e-12;
    const pc$2 = 1559691e-10;
    const pd$2 = 5580814e-11;
    const pe$2 = 3069448e-9;
    const pf$2 = 1174908e-11;
    const pg$2 = 5580814e-12;
    const ph$2 = 4288415e-10;
    const pi$2 = 8271354e-10;
    const pj$2 = 2937271e-12;
    const pk$2 = 1116163e-11;
    const pl$2 = 2380952e-9;
    const pm$2 = 1556754e-11;
    const pn$2 = 4963988e-11;
    const po$2 = 4948126e-9;
    const pp$2 = 9340521e-10;
    const pq$2 = 7930631e-12;
    const pr$2 = 5196326e-9;
    const ps$2 = 3524725e-10;
    const pt$2 = 6911398e-10;
    const pu$2 = 100484e-8;
    const pv$2 = 6461996e-12;
    const pw$2 = 205609e-11;
    const px$2 = 0;
    const py$2 = 1263026e-11;
    const pz$2 = 5874542e-13;
    const qa$2 = 2202953e-11;
    const qb$2 = 0;
    const qc$2 = 3818452e-12;
    const qd$2 = 5874542e-13;
    const qe$2 = 2937271e-13;
    const qf$2 = 0;
    const qg$2 = 2937271e-13;
    const qh$2 = 0;
    const qi$2 = 4405906e-12;
    const qj$2 = 2937271e-13;
    const qk$2 = 0;
    const ql$2 = 2937271e-12;
    const qm$2 = 4112179e-12;
    const qn$2 = 1174908e-12;
    const qo$2 = 1468635e-12;
    const qp$2 = 0;
    const qq$2 = 2937271e-13;
    const qr$2 = 5874542e-13;
    const qs$2 = 5874542e-13;
    const qt$2 = 0;
    const qu$2 = 8085425e-9;
    const qv$2 = 5874542e-13;
    const qw$2 = 2937271e-13;
    const qx$2 = 0;
    const qy$2 = 2937271e-13;
    const qz$2 = 0;
    const ra$2 = 6717538e-9;
    const rb$2 = 1876916e-10;
    const rc$2 = 1493308e-9;
    const rd$2 = 1478916e-9;
    const re$2 = 0.0134198;
    const rf$2 = 301364e-9;
    const rg$2 = 9258277e-10;
    const rh$2 = 4729006e-11;
    const ri$2 = 4941664e-9;
    const rj$2 = 4170924e-11;
    const rk$2 = 1436325e-10;
    const rl$2 = 5372268e-10;
    const rm$2 = 1343508e-9;
    const rn$2 = 1307673e-9;
    const ro$2 = 468994e-8;
    const rp$2 = 4335412e-10;
    const rq$2 = 2100149e-10;
    const rr$2 = 118372e-8;
    const rs$2 = 5229811e-9;
    const rt$2 = 3357888e-9;
    const ru$2 = 7410734e-10;
    const rv$2 = 7290306e-10;
    const rw$2 = 1527381e-11;
    const rx$2 = 2349817e-12;
    const ry$2 = 1359956e-10;
    const rz$2 = 1791735e-11;
    const sa$2 = 33573e-7;
    const sb$2 = 878244e-10;
    const sc$2 = 9607813e-10;
    const sd$2 = 1832857e-10;
    const se$2 = 7484166e-9;
    const sf$2 = 9458012e-11;
    const sg$2 = 3818452e-11;
    const sh$2 = 1788798e-10;
    const si$2 = 4056958e-9;
    const sj$2 = 8841185e-11;
    const sk$2 = 7871886e-11;
    const sl$2 = 7795517e-10;
    const sm$2 = 3515913e-10;
    const sn$2 = 1324709e-10;
    const so$2 = 4051965e-9;
    const sp$2 = 1079447e-9;
    const sq$2 = 5809922e-10;
    const sr$2 = 2505492e-10;
    const ss$2 = 3699199e-9;
    const st$2 = 5545273e-9;
    const su$2 = 3029501e-9;
    const sv$2 = 6579487e-11;
    const sw$2 = 2202953e-11;
    const sx$2 = 2349817e-12;
    const sy$2 = 220589e-9;
    const sz$2 = 7636904e-12;
    const ta$2 = 4360378e-9;
    const tb$2 = 5404578e-11;
    const tc$2 = 3254496e-10;
    const td$2 = 8048122e-11;
    const te$2 = 887937e-8;
    const tf$2 = 3084134e-11;
    const tg$2 = 1404015e-10;
    const th$2 = 4314851e-10;
    const ti$2 = 7908014e-9;
    const tj$2 = 3818452e-11;
    const tk$2 = 8518085e-12;
    const tl$2 = 3800828e-10;
    const tm$2 = 1759425e-10;
    const tn$2 = 4670261e-11;
    const to$2 = 262592e-8;
    const tp$2 = 1116163e-10;
    const tq$2 = 1556754e-11;
    const tr$2 = 5963835e-9;
    const ts$2 = 2344236e-9;
    const tt$2 = 1884553e-9;
    const tu$2 = 1343214e-9;
    const tv$2 = 3289743e-11;
    const tw$2 = 3348489e-11;
    const tx$2 = 4405906e-12;
    const ty$2 = 9164285e-11;
    const tz$2 = 2555426e-11;
    const ua$2 = 9272964e-10;
    const ub$2 = 6829155e-10;
    const uc$2 = 8112742e-10;
    const ud$2 = 695252e-9;
    const ue$2 = 5823139e-9;
    const uf$2 = 1956222e-10;
    const ug$2 = 3075322e-10;
    const uh$2 = 5727678e-11;
    const ui$2 = 4204116e-9;
    const uj$2 = 2699352e-10;
    const uk$2 = 2849153e-11;
    const ul$2 = 1523856e-9;
    const um$2 = 5254777e-10;
    const un$2 = 5375499e-9;
    const uo$2 = 3383736e-10;
    const up$2 = 881475e-9;
    const uq$2 = 2202953e-11;
    const ur$2 = 0.01002314;
    const us$2 = 3980002e-9;
    const ut$2 = 3309423e-9;
    const uu$2 = 1122037e-10;
    const uv$2 = 1420758e-9;
    const uw$2 = 4405906e-12;
    const ux$2 = 1964447e-9;
    const uy$2 = 4729006e-11;
    const uz$2 = 4112179e-11;
    const va$2 = 2019667e-9;
    const vb$2 = 1174908e-12;
    const vc$2 = 1909226e-11;
    const vd$2 = 108679e-10;
    const ve$2 = 4250525e-9;
    const vf$2 = 1762362e-12;
    const vg$2 = 1204281e-11;
    const vh$2 = 3407234e-11;
    const vi$2 = 2239963e-9;
    const vj$2 = 8811812e-13;
    const vk$2 = 2937271e-13;
    const vl$2 = 6315132e-11;
    const vm$2 = 7636904e-12;
    const vn$2 = 4347161e-11;
    const vo$2 = 1731521e-9;
    const vp$2 = 3524725e-12;
    const vq$2 = 7636904e-12;
    const vr$2 = 7213937e-10;
    const vs$2 = 4817124e-11;
    const vt$2 = 3113507e-11;
    const vu$2 = 1953285e-10;
    const vv$2 = 1174908e-12;
    const vw$2 = 0;
    const vx$2 = 0;
    const vy$2 = 9105539e-12;
    const vz$2 = 0;
    const wa$2 = 1656621e-10;
    const wb$2 = 3818452e-12;
    const wc$2 = 3524725e-12;
    const wd$2 = 205609e-11;
    const we$2 = 1195469e-10;
    const wf$2 = 2937271e-13;
    const wg$2 = 8811812e-13;
    const wh$2 = 8811812e-12;
    const wi$2 = 1324709e-10;
    const wj$2 = 0;
    const wk$2 = 5874542e-12;
    const wl$2 = 6168269e-12;
    const wm$2 = 2643544e-12;
    const wn$2 = 1498008e-11;
    const wo$2 = 5845169e-11;
    const wp$2 = 1174908e-12;
    const wq$2 = 0;
    const wr$2 = 8224358e-12;
    const ws$2 = 3671588e-11;
    const wt$2 = 4112179e-12;
    const wu$2 = 205609e-11;
    const wv$2 = 8811812e-13;
    const ww$2 = 9105539e-12;
    const wx$2 = 5874542e-13;
    const wy$2 = 704945e-11;
    const wz$2 = 5874542e-13;
    const xa$2 = 1036857e-10;
    const xb$2 = 8811812e-12;
    const xc$2 = 1480384e-10;
    const xd$2 = 1204281e-11;
    const xe$2 = 2100149e-10;
    const xf$2 = 4112179e-12;
    const xg$2 = 1174908e-12;
    const xh$2 = 1174908e-11;
    const xi$2 = 281978e-9;
    const xj$2 = 5874542e-12;
    const xk$2 = 0;
    const xl$2 = 4288415e-11;
    const xm$2 = 1879853e-11;
    const xn$2 = 1263026e-11;
    const xo$2 = 2291071e-11;
    const xp$2 = 3645153e-10;
    const xq$2 = 9105539e-12;
    const xr$2 = 5580814e-12;
    const xs$2 = 1351145e-11;
    const xt$2 = 1459824e-10;
    const xu$2 = 2878525e-11;
    const xv$2 = 9986721e-12;
    const xw$2 = 5874542e-13;
    const xx$2 = 8811812e-12;
    const xy$2 = 8224358e-12;
    const xz$2 = 2937271e-13;
    const ya$2 = 3768518e-10;
    const yb$2 = 1498008e-11;
    const yc$2 = 6638232e-11;
    const yd$2 = 314288e-10;
    const ye$2 = 3286806e-10;
    const yf$2 = 1468635e-12;
    const yg$2 = 1527381e-11;
    const yh$2 = 1174908e-12;
    const yi$2 = 140989e-10;
    const yj$2 = 499336e-11;
    const yk$2 = 2643544e-12;
    const yl$2 = 6344505e-11;
    const ym$2 = 1095602e-10;
    const yn$2 = 1133787e-10;
    const yo$2 = 1374643e-10;
    const yp$2 = 7695649e-11;
    const yq$2 = 8811812e-13;
    const yr$2 = 358347e-10;
    const ys$2 = 4499899e-10;
    const yt$2 = 3407234e-11;
    const yu$2 = 173299e-10;
    const yv$2 = 2085462e-11;
    const yw$2 = 8224358e-12;
    const yx$2 = 8811812e-13;
    const yy$2 = 1468635e-12;
    const yz$2 = 1174908e-12;
    const za$2 = 1245403e-10;
    const zb$2 = 7636904e-12;
    const zc$2 = 205609e-11;
    const zd$2 = 2643544e-12;
    const ze$2 = 9105539e-11;
    const zf$2 = 205609e-11;
    const zg$2 = 2643544e-12;
    const zh$2 = 9105539e-12;
    const zi$2 = 7783768e-11;
    const zj$2 = 2937271e-13;
    const zk$2 = 8811812e-13;
    const zl$2 = 1879853e-11;
    const zm$2 = 499336e-11;
    const zn$2 = 8518085e-12;
    const zo$2 = 1030982e-10;
    const zp$2 = 1468635e-12;
    const zq$2 = 1468635e-12;
    const zr$2 = 7636904e-12;
    const zs$2 = 7343177e-12;
    const zt$2 = 8811812e-13;
    const zu$2 = 2731662e-11;
    const zv$2 = 3495352e-11;
    const zw$2 = 2937271e-13;
    const zx$2 = 2937271e-13;
    const zy$2 = 531646e-10;
    const zz$2 = 3230998e-11;
    const bigram_french = {
      aa: aa$2,
      ab: ab$2,
      ac: ac$2,
      ad: ad$2,
      ae: ae$2,
      af: af$2,
      ag: ag$2,
      ah: ah$2,
      ai: ai$2,
      aj: aj$2,
      ak: ak$2,
      al: al$2,
      am: am$2,
      an: an$2,
      ao: ao$2,
      ap: ap$2,
      aq: aq$2,
      ar: ar$2,
      as: as$2,
      at: at$2,
      au: au$2,
      av: av$2,
      aw: aw$2,
      ax: ax$2,
      ay: ay$2,
      az: az$2,
      "a ": 0.01044523,
      ba: ba$2,
      bb: bb$2,
      bc: bc$2,
      bd: bd$2,
      be: be$2,
      bf: bf$2,
      bg: bg$2,
      bh: bh$2,
      bi: bi$2,
      bj: bj$2,
      bk: bk$2,
      bl: bl$2,
      bm: bm$2,
      bn: bn$2,
      bo: bo$2,
      bp: bp$2,
      bq: bq$2,
      br: br$2,
      bs: bs$2,
      bt: bt$2,
      bu: bu$2,
      bv: bv$2,
      bw: bw$2,
      bx: bx$2,
      by: by$2,
      bz: bz$2,
      "b ": 1715366e-10,
      ca: ca$2,
      cb: cb$2,
      cc: cc$2,
      cd: cd$2,
      ce: ce$2,
      cf: cf$2,
      cg: cg$2,
      ch: ch$2,
      ci: ci$2,
      cj: cj$2,
      ck: ck$2,
      cl: cl$2,
      cm: cm$2,
      cn: cn$2,
      co: co$2,
      cp: cp$2,
      cq: cq$2,
      cr: cr$2,
      cs: cs$2,
      ct: ct$2,
      cu: cu$2,
      cv: cv$2,
      cw: cw$2,
      cx: cx$2,
      cy: cy$2,
      cz: cz$2,
      "c ": 1602869e-9,
      da: da$2,
      db: db$2,
      dc: dc$2,
      dd: dd$2,
      de: de$2,
      df: df$2,
      dg: dg$2,
      dh: dh$2,
      di: di$2,
      dj: dj$2,
      dk: dk$2,
      dl: dl$2,
      dm: dm$2,
      dn: dn$2,
      "do": 1679238e-9,
      dp: dp$2,
      dq: dq$2,
      dr: dr$2,
      ds: ds$2,
      dt: dt$2,
      du: du$2,
      dv: dv$2,
      dw: dw$2,
      dx: dx$2,
      dy: dy$2,
      dz: dz$2,
      "d ": 1422227e-9,
      ea: ea$2,
      eb: eb$2,
      ec: ec$2,
      ed: ed$2,
      ee: ee$2,
      ef: ef$2,
      eg: eg$2,
      eh: eh$2,
      ei: ei$2,
      ej: ej$2,
      ek: ek$2,
      el: el$2,
      em: em$2,
      en: en$2,
      eo: eo$2,
      ep: ep$2,
      eq: eq$2,
      er: er$2,
      es: es$2,
      et: et$2,
      eu: eu$2,
      ev: ev$2,
      ew: ew$2,
      ex: ex$2,
      ey: ey$2,
      ez: ez$2,
      "e ": 0.04610076,
      fa: fa$2,
      fb: fb$2,
      fc: fc$2,
      fd: fd$2,
      fe: fe$2,
      ff: ff$2,
      fg: fg$2,
      fh: fh$2,
      fi: fi$2,
      fj: fj$2,
      fk: fk$2,
      fl: fl$2,
      fm: fm$2,
      fn: fn$2,
      fo: fo$2,
      fp: fp$2,
      fq: fq$2,
      fr: fr$2,
      fs: fs$2,
      ft: ft$2,
      fu: fu$2,
      fv: fv$2,
      fw: fw$2,
      fx: fx$2,
      fy: fy$2,
      fz: fz$2,
      "f ": 435891e-9,
      ga: ga$2,
      gb: gb$2,
      gc: gc$2,
      gd: gd$2,
      ge: ge$2,
      gf: gf$2,
      gg: gg$2,
      gh: gh$2,
      gi: gi$2,
      gj: gj$2,
      gk: gk$2,
      gl: gl$2,
      gm: gm$2,
      gn: gn$2,
      go: go$2,
      gp: gp$2,
      gq: gq$2,
      gr: gr$2,
      gs: gs$2,
      gt: gt$2,
      gu: gu$2,
      gv: gv$2,
      gw: gw$2,
      gx: gx$2,
      gy: gy$2,
      gz: gz$2,
      "g ": 4461714e-10,
      ha: ha$2,
      hb: hb$2,
      hc: hc$2,
      hd: hd$2,
      he: he$2,
      hf: hf$2,
      hg: hg$2,
      hh: hh$2,
      hi: hi$2,
      hj: hj$2,
      hk: hk$2,
      hl: hl$2,
      hm: hm$2,
      hn: hn$2,
      ho: ho$2,
      hp: hp$2,
      hq: hq$2,
      hr: hr$2,
      hs: hs$2,
      ht: ht$2,
      hu: hu$2,
      hv: hv$2,
      hw: hw$2,
      hx: hx$2,
      hy: hy$2,
      hz: hz$2,
      "h ": 5783486e-10,
      ia: ia$2,
      ib: ib$2,
      ic: ic$2,
      id: id$2,
      ie: ie$2,
      "if": 938458e-9,
      ig: ig$2,
      ih: ih$2,
      ii: ii$2,
      ij: ij$2,
      ik: ik$2,
      il: il$2,
      im: im$2,
      "in": 7387236e-9,
      io: io$2,
      ip: ip$2,
      iq: iq$2,
      ir: ir$2,
      is: is$2,
      it: it$2,
      iu: iu$2,
      iv: iv$2,
      iw: iw$2,
      ix: ix$2,
      iy: iy$2,
      iz: iz$2,
      "i ": 4534265e-9,
      ja: ja$2,
      jb: jb$2,
      jc: jc$2,
      jd: jd$2,
      je: je$2,
      jf: jf$2,
      jg: jg$2,
      jh: jh$2,
      ji: ji$2,
      jj: jj$2,
      jk: jk$2,
      jl: jl$2,
      jm: jm$2,
      jn: jn$2,
      jo: jo$2,
      jp: jp$2,
      jq: jq$2,
      jr: jr$2,
      js: js$2,
      jt: jt$2,
      ju: ju$2,
      jv: jv$2,
      jw: jw$2,
      jx: jx$2,
      jy: jy$2,
      jz: jz$2,
      "j ": 1530318e-10,
      ka: ka$2,
      kb: kb$2,
      kc: kc$2,
      kd: kd$2,
      ke: ke$2,
      kf: kf$2,
      kg: kg$2,
      kh: kh$2,
      ki: ki$2,
      kj: kj$2,
      kk: kk$2,
      kl: kl$2,
      km: km$2,
      kn: kn$2,
      ko: ko$2,
      kp: kp$2,
      kq: kq$2,
      kr: kr$2,
      ks: ks$2,
      kt: kt$2,
      ku: ku$2,
      kv: kv$2,
      kw: kw$2,
      kx: kx$2,
      ky: ky$2,
      kz: kz$2,
      "k ": 2714038e-10,
      la: la$2,
      lb: lb$2,
      lc: lc$2,
      ld: ld$2,
      le: le$2,
      lf: lf$2,
      lg: lg$2,
      lh: lh$2,
      li: li$2,
      lj: lj$2,
      lk: lk$2,
      ll: ll$2,
      lm: lm$2,
      ln: ln$2,
      lo: lo$2,
      lp: lp$2,
      lq: lq$2,
      lr: lr$2,
      ls: ls$2,
      lt: lt$2,
      lu: lu$2,
      lv: lv$2,
      lw: lw$2,
      lx: lx$2,
      ly: ly$2,
      lz: lz$2,
      "l ": 3821977e-9,
      ma: ma$2,
      mb: mb$2,
      mc: mc$2,
      md: md$2,
      me: me$2,
      mf: mf$2,
      mg: mg$2,
      mh: mh$2,
      mi: mi$2,
      mj: mj$2,
      mk: mk$2,
      ml: ml$2,
      mm: mm$2,
      mn: mn$2,
      mo: mo$2,
      mp: mp$2,
      mq: mq$2,
      mr: mr$2,
      ms: ms$2,
      mt: mt$2,
      mu: mu$2,
      mv: mv$2,
      mw: mw$2,
      mx: mx$2,
      my: my$2,
      mz: mz$2,
      "m ": 737255e-9,
      na: na$2,
      nb: nb$2,
      nc: nc$2,
      nd: nd$2,
      ne: ne$2,
      nf: nf$2,
      ng: ng$2,
      nh: nh$2,
      ni: ni$2,
      nj: nj$2,
      nk: nk$2,
      nl: nl$2,
      nm: nm$2,
      nn: nn$2,
      no: no$2,
      np: np$2,
      nq: nq$2,
      nr: nr$2,
      ns: ns$2,
      nt: nt$2,
      nu: nu$2,
      nv: nv$2,
      nw: nw$2,
      nx: nx$2,
      ny: ny$2,
      nz: nz$2,
      "n ": 0.0134248,
      oa: oa$2,
      ob: ob$2,
      oc: oc$2,
      od: od$2,
      oe: oe$2,
      of: of$2,
      og: og$2,
      oh: oh$2,
      oi: oi$2,
      oj: oj$2,
      ok: ok$2,
      ol: ol$2,
      om: om$2,
      on: on$2,
      oo: oo$2,
      op: op$2,
      oq: oq$2,
      or: or$2,
      os: os$2,
      ot: ot$2,
      ou: ou$2,
      ov: ov$2,
      ow: ow$2,
      ox: ox$2,
      oy: oy$2,
      oz: oz$2,
      "o ": 9458012e-10,
      pa: pa$2,
      pb: pb$2,
      pc: pc$2,
      pd: pd$2,
      pe: pe$2,
      pf: pf$2,
      pg: pg$2,
      ph: ph$2,
      pi: pi$2,
      pj: pj$2,
      pk: pk$2,
      pl: pl$2,
      pm: pm$2,
      pn: pn$2,
      po: po$2,
      pp: pp$2,
      pq: pq$2,
      pr: pr$2,
      ps: ps$2,
      pt: pt$2,
      pu: pu$2,
      pv: pv$2,
      pw: pw$2,
      px: px$2,
      py: py$2,
      pz: pz$2,
      "p ": 4996298e-10,
      qa: qa$2,
      qb: qb$2,
      qc: qc$2,
      qd: qd$2,
      qe: qe$2,
      qf: qf$2,
      qg: qg$2,
      qh: qh$2,
      qi: qi$2,
      qj: qj$2,
      qk: qk$2,
      ql: ql$2,
      qm: qm$2,
      qn: qn$2,
      qo: qo$2,
      qp: qp$2,
      qq: qq$2,
      qr: qr$2,
      qs: qs$2,
      qt: qt$2,
      qu: qu$2,
      qv: qv$2,
      qw: qw$2,
      qx: qx$2,
      qy: qy$2,
      qz: qz$2,
      "q ": 8694321e-11,
      ra: ra$2,
      rb: rb$2,
      rc: rc$2,
      rd: rd$2,
      re: re$2,
      rf: rf$2,
      rg: rg$2,
      rh: rh$2,
      ri: ri$2,
      rj: rj$2,
      rk: rk$2,
      rl: rl$2,
      rm: rm$2,
      rn: rn$2,
      ro: ro$2,
      rp: rp$2,
      rq: rq$2,
      rr: rr$2,
      rs: rs$2,
      rt: rt$2,
      ru: ru$2,
      rv: rv$2,
      rw: rw$2,
      rx: rx$2,
      ry: ry$2,
      rz: rz$2,
      "r ": 0.01154612,
      sa: sa$2,
      sb: sb$2,
      sc: sc$2,
      sd: sd$2,
      se: se$2,
      sf: sf$2,
      sg: sg$2,
      sh: sh$2,
      si: si$2,
      sj: sj$2,
      sk: sk$2,
      sl: sl$2,
      sm: sm$2,
      sn: sn$2,
      so: so$2,
      sp: sp$2,
      sq: sq$2,
      sr: sr$2,
      ss: ss$2,
      st: st$2,
      su: su$2,
      sv: sv$2,
      sw: sw$2,
      sx: sx$2,
      sy: sy$2,
      sz: sz$2,
      "s ": 0.03208968,
      ta: ta$2,
      tb: tb$2,
      tc: tc$2,
      td: td$2,
      te: te$2,
      tf: tf$2,
      tg: tg$2,
      th: th$2,
      ti: ti$2,
      tj: tj$2,
      tk: tk$2,
      tl: tl$2,
      tm: tm$2,
      tn: tn$2,
      to: to$2,
      tp: tp$2,
      tq: tq$2,
      tr: tr$2,
      ts: ts$2,
      tt: tt$2,
      tu: tu$2,
      tv: tv$2,
      tw: tw$2,
      tx: tx$2,
      ty: ty$2,
      tz: tz$2,
      "t ": 0.02101324,
      ua: ua$2,
      ub: ub$2,
      uc: uc$2,
      ud: ud$2,
      ue: ue$2,
      uf: uf$2,
      ug: ug$2,
      uh: uh$2,
      ui: ui$2,
      uj: uj$2,
      uk: uk$2,
      ul: ul$2,
      um: um$2,
      un: un$2,
      uo: uo$2,
      up: up$2,
      uq: uq$2,
      ur: ur$2,
      us: us$2,
      ut: ut$2,
      uu: uu$2,
      uv: uv$2,
      uw: uw$2,
      ux: ux$2,
      uy: uy$2,
      uz: uz$2,
      "u ": 5844288e-9,
      va: va$2,
      vb: vb$2,
      vc: vc$2,
      vd: vd$2,
      ve: ve$2,
      vf: vf$2,
      vg: vg$2,
      vh: vh$2,
      vi: vi$2,
      vj: vj$2,
      vk: vk$2,
      vl: vl$2,
      vm: vm$2,
      vn: vn$2,
      vo: vo$2,
      vp: vp$2,
      vq: vq$2,
      vr: vr$2,
      vs: vs$2,
      vt: vt$2,
      vu: vu$2,
      vv: vv$2,
      vw: vw$2,
      vx: vx$2,
      vy: vy$2,
      vz: vz$2,
      "v ": 1891602e-10,
      wa: wa$2,
      wb: wb$2,
      wc: wc$2,
      wd: wd$2,
      we: we$2,
      wf: wf$2,
      wg: wg$2,
      wh: wh$2,
      wi: wi$2,
      wj: wj$2,
      wk: wk$2,
      wl: wl$2,
      wm: wm$2,
      wn: wn$2,
      wo: wo$2,
      wp: wp$2,
      wq: wq$2,
      wr: wr$2,
      ws: ws$2,
      wt: wt$2,
      wu: wu$2,
      wv: wv$2,
      ww: ww$2,
      wx: wx$2,
      wy: wy$2,
      wz: wz$2,
      "w ": 8811812e-11,
      xa: xa$2,
      xb: xb$2,
      xc: xc$2,
      xd: xd$2,
      xe: xe$2,
      xf: xf$2,
      xg: xg$2,
      xh: xh$2,
      xi: xi$2,
      xj: xj$2,
      xk: xk$2,
      xl: xl$2,
      xm: xm$2,
      xn: xn$2,
      xo: xo$2,
      xp: xp$2,
      xq: xq$2,
      xr: xr$2,
      xs: xs$2,
      xt: xt$2,
      xu: xu$2,
      xv: xv$2,
      xw: xw$2,
      xx: xx$2,
      xy: xy$2,
      xz: xz$2,
      "x ": 2058439e-9,
      ya: ya$2,
      yb: yb$2,
      yc: yc$2,
      yd: yd$2,
      ye: ye$2,
      yf: yf$2,
      yg: yg$2,
      yh: yh$2,
      yi: yi$2,
      yj: yj$2,
      yk: yk$2,
      yl: yl$2,
      ym: ym$2,
      yn: yn$2,
      yo: yo$2,
      yp: yp$2,
      yq: yq$2,
      yr: yr$2,
      ys: ys$2,
      yt: yt$2,
      yu: yu$2,
      yv: yv$2,
      yw: yw$2,
      yx: yx$2,
      yy: yy$2,
      yz: yz$2,
      "y ": 7566409e-10,
      za: za$2,
      zb: zb$2,
      zc: zc$2,
      zd: zd$2,
      ze: ze$2,
      zf: zf$2,
      zg: zg$2,
      zh: zh$2,
      zi: zi$2,
      zj: zj$2,
      zk: zk$2,
      zl: zl$2,
      zm: zm$2,
      zn: zn$2,
      zo: zo$2,
      zp: zp$2,
      zq: zq$2,
      zr: zr$2,
      zs: zs$2,
      zt: zt$2,
      zu: zu$2,
      zv: zv$2,
      zw: zw$2,
      zx: zx$2,
      zy: zy$2,
      zz: zz$2,
      "z ": 3609906e-10,
      " a": 0.011856,
      " b": 3074735e-9,
      " c": 0.01144243,
      " d": 0.0258098,
      " e": 9825464e-9,
      " f": 4653812e-9,
      " g": 2423248e-9,
      " h": 1272426e-9,
      " i": 2667336e-9,
      " j": 2249362e-9,
      " k": 3216311e-10,
      " l": 0.01882438,
      " m": 7392229e-9,
      " n": 4060189e-9,
      " o": 2496093e-9,
      " p": 0.01520361,
      " q": 4580674e-9,
      " r": 5543805e-9,
      " s": 0.0122023,
      " t": 6154463e-9,
      " u": 3391079e-9,
      " v": 3304723e-9,
      " w": 2975455e-10,
      " x": 596266e-10,
      " y": 3812577e-10,
      " z": 1365831e-10,
      "  ": 7936799e-9
    };
    const aa$1 = 3225511e-10;
    const ab$1 = 2647594e-9;
    const ac$1 = 2465323e-9;
    const ad$1 = 9010903e-10;
    const ae$1 = 1710734e-10;
    const af$1 = 1023641e-9;
    const ag$1 = 2346816e-9;
    const ah$1 = 180809e-8;
    const ai$1 = 5897367e-10;
    const aj$1 = 2363924e-11;
    const ak$1 = 7371709e-10;
    const al$1 = 5195033e-9;
    const am$1 = 2564235e-9;
    const an$1 = 8910748e-9;
    const ao$1 = 2270611e-11;
    const ap$1 = 533127e-9;
    const aq$1 = 1337483e-11;
    const ar$1 = 4712606e-9;
    const as$1 = 4594099e-9;
    const at$1 = 3931267e-9;
    const au$1 = 6741226e-9;
    const av$1 = 1937795e-10;
    const aw$1 = 606533e-10;
    const ax$1 = 9362381e-11;
    const ay$1 = 2202181e-10;
    const az$1 = 2307936e-10;
    const ba$1 = 1525975e-9;
    const bb$1 = 6687415e-11;
    const bc$1 = 3888032e-11;
    const bd$1 = 357699e-10;
    const be$1 = 9015569e-9;
    const bf$1 = 3763615e-11;
    const bg$1 = 1530329e-10;
    const bh$1 = 8522566e-11;
    const bi$1 = 1405601e-9;
    const bj$1 = 2830487e-11;
    const bk$1 = 3701407e-11;
    const bl$1 = 8052892e-10;
    const bm$1 = 29238e-9;
    const bn$1 = 1225508e-10;
    const bo$1 = 5682748e-10;
    const bp$1 = 1399692e-11;
    const bq$1 = 0;
    const br$1 = 115459e-8;
    const bs$1 = 56983e-8;
    const bt$1 = 4920693e-10;
    const bu$1 = 7489905e-10;
    const bv$1 = 2301715e-11;
    const bw$1 = 7682752e-11;
    const bx$1 = 124417e-11;
    const by$1 = 5318828e-11;
    const bz$1 = 5660975e-11;
    const ca$1 = 2681187e-10;
    const cb$1 = 9953362e-12;
    const cc$1 = 3825824e-11;
    const cd$1 = 4261283e-11;
    const ce$1 = 3384143e-10;
    const cf$1 = 5287724e-12;
    const cg$1 = 3110426e-12;
    const ch$1 = 0.02065509;
    const ci$1 = 102333e-9;
    const cj$1 = 3110426e-13;
    const ck$1 = 150949e-8;
    const cl$1 = 1088649e-10;
    const cm$1 = 5909809e-12;
    const cn$1 = 6220851e-12;
    const co$1 = 379783e-9;
    const cp$1 = 9020235e-12;
    const cq$1 = 4354596e-12;
    const cr$1 = 1116643e-10;
    const cs$1 = 4914473e-11;
    const ct$1 = 6003122e-11;
    const cu$1 = 8491462e-11;
    const cv$1 = 6842937e-12;
    const cw$1 = 3110426e-12;
    const cx$1 = 2488341e-12;
    const cy$1 = 1772943e-11;
    const cz$1 = 964232e-11;
    const da$1 = 4790056e-9;
    const db$1 = 8709192e-11;
    const dc$1 = 5443245e-11;
    const dd$1 = 1237949e-10;
    const de$1 = 0.01713907;
    const df$1 = 671852e-10;
    const dg$1 = 9766737e-11;
    const dh$1 = 8242628e-11;
    const di$1 = 7514166e-9;
    const dj$1 = 167963e-10;
    const dk$1 = 5474349e-11;
    const dl$1 = 3101094e-10;
    const dm$1 = 8118211e-11;
    const dn$1 = 1377919e-10;
    const dp$1 = 109798e-9;
    const dq$1 = 5909809e-12;
    const dr$1 = 9318835e-10;
    const ds$1 = 3981345e-10;
    const dt$1 = 2758948e-10;
    const du$1 = 9894264e-10;
    const dv$1 = 3639198e-11;
    const dw$1 = 1213066e-10;
    const dx$1 = 1555213e-12;
    const dy$1 = 5660975e-11;
    const dz$1 = 2208402e-11;
    const ea$1 = 7147758e-10;
    const eb$1 = 1851636e-9;
    const ec$1 = 1271542e-9;
    const ed$1 = 1845727e-9;
    const ee$1 = 5216184e-10;
    const ef$1 = 1069986e-9;
    const eg$1 = 2448527e-9;
    const eh$1 = 2901405e-9;
    const ei$1 = 0.01588557;
    const ej$1 = 2954904e-11;
    const ek$1 = 9001572e-10;
    const el$1 = 5609031e-9;
    const em$1 = 3601251e-9;
    const en$1 = 0.03137642;
    const eo$1 = 241058e-9;
    const ep$1 = 4211516e-10;
    const eq$1 = 314153e-10;
    const er$1 = 0.03091825;
    const es$1 = 8061601e-9;
    const et$1 = 3596585e-9;
    const eu$1 = 2413068e-9;
    const ev$1 = 2587874e-10;
    const ew$1 = 9247296e-10;
    const ex$1 = 3754284e-10;
    const ey$1 = 9082443e-11;
    const ez$1 = 4037333e-10;
    const fa$1 = 1489894e-9;
    const fb$1 = 7340605e-11;
    const fc$1 = 606533e-10;
    const fd$1 = 5598766e-11;
    const fe$1 = 2305759e-9;
    const ff$1 = 9797841e-10;
    const fg$1 = 2534997e-10;
    const fh$1 = 4404363e-10;
    const fi$1 = 9446363e-10;
    const fj$1 = 7776064e-12;
    const fk$1 = 3328156e-11;
    const fl$1 = 796269e-9;
    const fm$1 = 4012449e-11;
    const fn$1 = 2528776e-10;
    const fo$1 = 1036083e-9;
    const fp$1 = 3825824e-11;
    const fq$1 = 6220851e-13;
    const fr$1 = 2700783e-9;
    const fs$1 = 2357703e-10;
    const ft$1 = 1531263e-9;
    const fu$1 = 4139977e-10;
    const fv$1 = 1586317e-11;
    const fw$1 = 3981345e-11;
    const fx$1 = 964232e-11;
    const fy$1 = 6842937e-12;
    const fz$1 = 4199075e-11;
    const ga$1 = 1414311e-9;
    const gb$1 = 7682752e-11;
    const gc$1 = 1399692e-11;
    const gd$1 = 1433906e-10;
    const ge$1 = 0.01195554;
    const gf$1 = 4945577e-11;
    const gg$1 = 1066876e-10;
    const gh$1 = 1157078e-10;
    const gi$1 = 1108556e-9;
    const gj$1 = 1213066e-11;
    const gk$1 = 1430796e-10;
    const gl$1 = 8740296e-10;
    const gm$1 = 6251956e-11;
    const gn$1 = 3303272e-10;
    const go$1 = 2594095e-10;
    const gp$1 = 3452573e-11;
    const gq$1 = 1866255e-12;
    const gr$1 = 1544015e-9;
    const gs$1 = 1158011e-9;
    const gt$1 = 1272475e-9;
    const gu$1 = 686471e-9;
    const gv$1 = 2612758e-11;
    const gw$1 = 460343e-10;
    const gx$1 = 6220851e-13;
    const gy$1 = 2270611e-11;
    const gz$1 = 4696743e-11;
    const ha$1 = 4237955e-9;
    const hb$1 = 1116643e-10;
    const hc$1 = 482116e-10;
    const hd$1 = 153344e-9;
    const he$1 = 7440449e-9;
    const hf$1 = 2080875e-10;
    const hg$1 = 7589439e-11;
    const hh$1 = 1657857e-10;
    const hi$1 = 1631729e-9;
    const hj$1 = 1493004e-11;
    const hk$1 = 1412133e-10;
    const hl$1 = 1911668e-9;
    const hm$1 = 7841383e-10;
    const hn$1 = 1342149e-9;
    const ho$1 = 1116332e-9;
    const hp$1 = 4012449e-11;
    const hq$1 = 3110426e-12;
    const hr$1 = 390825e-8;
    const hs$1 = 6550557e-10;
    const ht$1 = 4411517e-9;
    const hu$1 = 7069998e-10;
    const hv$1 = 3017113e-11;
    const hw$1 = 5206853e-10;
    const hx$1 = 3110426e-13;
    const hy$1 = 4696743e-11;
    const hz$1 = 6936249e-11;
    const ia$1 = 6612765e-10;
    const ib$1 = 628617e-9;
    const ic$1 = 7274042e-9;
    const id$1 = 1017109e-9;
    const ie$1 = 0.01445166;
    const ig$1 = 3284299e-9;
    const ih$1 = 9007793e-10;
    const ii$1 = 4541222e-11;
    const ij$1 = 1493004e-11;
    const ik$1 = 8525677e-10;
    const il$1 = 2460347e-9;
    const im$1 = 24224e-7;
    const io$1 = 1646037e-9;
    const ip$1 = 2858481e-10;
    const iq$1 = 167963e-10;
    const ir$1 = 179907e-8;
    const is$1 = 6019296e-9;
    const it$1 = 7041382e-9;
    const iu$1 = 1197514e-10;
    const iv$1 = 6273729e-10;
    const iw$1 = 43857e-9;
    const ix$1 = 5412141e-11;
    const iy$1 = 4043553e-12;
    const iz$1 = 503889e-9;
    const ja$1 = 8248849e-10;
    const jb$1 = 6220851e-13;
    const jc$1 = 9331277e-13;
    const jd$1 = 7153979e-12;
    const je$1 = 6668753e-10;
    const jf$1 = 0;
    const jg$1 = 964232e-11;
    const jh$1 = 1573875e-10;
    const ji$1 = 1928464e-11;
    const jj$1 = 1555213e-12;
    const jk$1 = 2799383e-12;
    const jl$1 = 3110426e-13;
    const jm$1 = 2177298e-12;
    const jn$1 = 3950241e-11;
    const jo$1 = 1573875e-10;
    const jp$1 = 2488341e-12;
    const jq$1 = 0;
    const jr$1 = 2239507e-11;
    const js$1 = 4354596e-12;
    const jt$1 = 6220851e-13;
    const ju$1 = 27745e-8;
    const jv$1 = 2488341e-12;
    const jw$1 = 3110426e-13;
    const jx$1 = 0;
    const jy$1 = 0;
    const jz$1 = 3110426e-13;
    const ka$1 = 1664389e-9;
    const kb$1 = 4199075e-11;
    const kc$1 = 1959568e-11;
    const kd$1 = 3950241e-11;
    const ke$1 = 2329709e-9;
    const kf$1 = 7931586e-11;
    const kg$1 = 5287724e-11;
    const kh$1 = 6314164e-11;
    const ki$1 = 4687412e-10;
    const kj$1 = 5598766e-12;
    const kk$1 = 6314164e-11;
    const kl$1 = 9045118e-10;
    const km$1 = 1188183e-10;
    const kn$1 = 6584771e-10;
    const ko$1 = 1808402e-9;
    const kp$1 = 4727847e-11;
    const kq$1 = 2799383e-12;
    const kr$1 = 8572333e-10;
    const ks$1 = 3153972e-10;
    const kt$1 = 168274e-8;
    const ku$1 = 8074665e-10;
    const kv$1 = 1524109e-11;
    const kw$1 = 5629871e-11;
    const kx$1 = 3110426e-13;
    const ky$1 = 3297051e-11;
    const kz$1 = 460343e-10;
    const la$1 = 328181e-8;
    const lb$1 = 5424582e-10;
    const lc$1 = 4357706e-10;
    const ld$1 = 1006845e-9;
    const le$1 = 6315097e-9;
    const lf$1 = 3828934e-10;
    const lg$1 = 4513228e-10;
    const lh$1 = 7993794e-11;
    const li$1 = 5225515e-9;
    const lj$1 = 102644e-10;
    const lk$1 = 2351482e-10;
    const ll$1 = 422458e-8;
    const lm$1 = 2149304e-10;
    const ln$1 = 5225515e-10;
    const lo$1 = 1003112e-9;
    const lp$1 = 1107312e-10;
    const lq$1 = 5598766e-12;
    const lr$1 = 2373255e-10;
    const ls$1 = 1864078e-9;
    const lt$1 = 2480253e-9;
    const lu$1 = 1100158e-9;
    const lv$1 = 1017109e-10;
    const lw$1 = 9175756e-11;
    const lx$1 = 124417e-11;
    const ly$1 = 1290827e-10;
    const lz$1 = 1396581e-10;
    const ma$1 = 3131577e-9;
    const mb$1 = 3166413e-10;
    const mc$1 = 8491462e-11;
    const md$1 = 1057545e-10;
    const me$1 = 4343398e-9;
    const mf$1 = 9144652e-11;
    const mg$1 = 2650083e-10;
    const mh$1 = 5225515e-11;
    const mi$1 = 3845108e-9;
    const mj$1 = 3421468e-12;
    const mk$1 = 4727847e-11;
    const ml$1 = 1468121e-10;
    const mm$1 = 1613067e-9;
    const mn$1 = 1953347e-10;
    const mo$1 = 8423033e-10;
    const mp$1 = 5738735e-10;
    const mq$1 = 3732511e-12;
    const mr$1 = 1091759e-10;
    const ms$1 = 5947134e-10;
    const mt$1 = 503889e-9;
    const mu$1 = 6743403e-10;
    const mv$1 = 2332819e-11;
    const mw$1 = 606533e-10;
    const mx$1 = 2799383e-12;
    const my$1 = 2488341e-11;
    const mz$1 = 29238e-9;
    const na$1 = 3354905e-9;
    const nb$1 = 6569219e-10;
    const nc$1 = 4805608e-10;
    const nd$1 = 0.01075834;
    const ne$1 = 8832676e-9;
    const nf$1 = 9486798e-10;
    const ng$1 = 6318208e-9;
    const nh$1 = 4737178e-10;
    const ni$1 = 3482433e-9;
    const nj$1 = 6998458e-11;
    const nk$1 = 1328774e-9;
    const nl$1 = 5891146e-10;
    const nm$1 = 4105762e-10;
    const nn$1 = 2996584e-9;
    const no$1 = 1232662e-9;
    const np$1 = 1701403e-10;
    const nq$1 = 1150858e-11;
    const nr$1 = 2373255e-10;
    const ns$1 = 3379478e-9;
    const nt$1 = 5103898e-9;
    const nu$1 = 1314777e-9;
    const nv$1 = 2989119e-10;
    const nw$1 = 4790056e-10;
    const nx$1 = 5909809e-12;
    const ny$1 = 4883368e-11;
    const nz$1 = 1355835e-9;
    const oa$1 = 139036e-9;
    const ob$1 = 7779175e-10;
    const oc$1 = 1409956e-9;
    const od$1 = 8124432e-10;
    const oe$1 = 2105758e-10;
    const of$1 = 6895814e-10;
    const og$1 = 5461908e-10;
    const oh$1 = 6183526e-10;
    const oi$1 = 1048213e-10;
    const oj$1 = 7931586e-11;
    const ok$1 = 3054438e-10;
    const ol$1 = 2487718e-9;
    const om$1 = 1579163e-9;
    const on$1 = 5451643e-9;
    const oo$1 = 29238e-8;
    const op$1 = 6830495e-10;
    const oq$1 = 2177298e-12;
    const or$1 = 4012449e-9;
    const os$1 = 1140282e-9;
    const ot$1 = 986627e-9;
    const ou$1 = 3446352e-10;
    const ov$1 = 1636084e-10;
    const ow$1 = 3477456e-10;
    const ox$1 = 5692079e-11;
    const oy$1 = 2799383e-11;
    const oz$1 = 3660971e-10;
    const pa$1 = 1267498e-9;
    const pb$1 = 1275275e-11;
    const pc$1 = 4012449e-11;
    const pd$1 = 8709192e-11;
    const pe$1 = 1142148e-9;
    const pf$1 = 5253509e-10;
    const pg$1 = 1306379e-11;
    const ph$1 = 2457236e-10;
    const pi$1 = 1018353e-9;
    const pj$1 = 3110426e-12;
    const pk$1 = 2737175e-11;
    const pl$1 = 6174195e-10;
    const pm$1 = 1835151e-11;
    const pn$1 = 1804047e-11;
    const po$1 = 9315725e-10;
    const pp$1 = 5023338e-10;
    const pq$1 = 3110426e-13;
    const pr$1 = 1997826e-9;
    const ps$1 = 1592538e-10;
    const pt$1 = 4000007e-10;
    const pu$1 = 3567658e-10;
    const pv$1 = 964232e-11;
    const pw$1 = 5287724e-12;
    const px$1 = 124417e-11;
    const py$1 = 1057545e-11;
    const pz$1 = 3328156e-11;
    const qa$1 = 3421468e-12;
    const qb$1 = 3110426e-13;
    const qc$1 = 9331277e-13;
    const qd$1 = 6220851e-13;
    const qe$1 = 1555213e-12;
    const qf$1 = 3110426e-13;
    const qg$1 = 0;
    const qh$1 = 6220851e-13;
    const qi$1 = 4665639e-12;
    const qj$1 = 0;
    const qk$1 = 0;
    const ql$1 = 6220851e-13;
    const qm$1 = 0;
    const qn$1 = 0;
    const qo$1 = 0;
    const qp$1 = 0;
    const qq$1 = 0;
    const qr$1 = 6220851e-13;
    const qs$1 = 124417e-11;
    const qt$1 = 124417e-11;
    const qu$1 = 2622089e-10;
    const qv$1 = 6220851e-13;
    const qw$1 = 6220851e-13;
    const qx$1 = 3110426e-13;
    const qy$1 = 0;
    const qz$1 = 0;
    const ra$1 = 4146197e-9;
    const rb$1 = 1229551e-9;
    const rc$1 = 9928479e-10;
    const rd$1 = 2955838e-9;
    const re$1 = 8726299e-9;
    const rf$1 = 1071853e-9;
    const rg$1 = 1529085e-9;
    const rh$1 = 8631431e-10;
    const ri$1 = 3930956e-9;
    const rj$1 = 6376373e-11;
    const rk$1 = 1325041e-9;
    const rl$1 = 9987577e-10;
    const rm$1 = 9682755e-10;
    const rn$1 = 2159569e-9;
    const ro$1 = 2820845e-9;
    const rp$1 = 2370144e-10;
    const rq$1 = 1337483e-11;
    const rr$1 = 6886483e-10;
    const rs$1 = 3052261e-9;
    const rt$1 = 4325047e-9;
    const ru$1 = 2158946e-9;
    const rv$1 = 2401249e-10;
    const rw$1 = 570141e-9;
    const rx$1 = 1866255e-12;
    const ry$1 = 73095e-9;
    const rz$1 = 7371709e-10;
    const sa$1 = 1981652e-9;
    const sb$1 = 3962682e-10;
    const sc$1 = 6488348e-9;
    const sd$1 = 3107315e-10;
    const se$1 = 6538737e-9;
    const sf$1 = 226439e-9;
    const sg$1 = 4618982e-10;
    const sh$1 = 4423025e-10;
    const si$1 = 4906074e-9;
    const sj$1 = 2954904e-11;
    const sk$1 = 4628313e-10;
    const sl$1 = 4805608e-10;
    const sm$1 = 3586321e-10;
    const sn$1 = 1648526e-10;
    const so$1 = 2473722e-9;
    const sp$1 = 1997826e-9;
    const sq$1 = 1524109e-11;
    const sr$1 = 2569212e-10;
    const ss$1 = 3931889e-9;
    const st$1 = 999442e-8;
    const su$1 = 7138427e-10;
    const sv$1 = 2183519e-10;
    const sw$1 = 3259726e-10;
    const sx$1 = 3110426e-12;
    const sy$1 = 2678077e-10;
    const sz$1 = 1984452e-10;
    const ta$1 = 3292075e-9;
    const tb$1 = 2656304e-10;
    const tc$1 = 14619e-8;
    const td$1 = 6167974e-10;
    const te$1 = 0.01527095;
    const tf$1 = 2139973e-10;
    const tg$1 = 3312603e-10;
    const th$1 = 6780728e-10;
    const ti$1 = 4324114e-9;
    const tj$1 = 3483677e-11;
    const tk$1 = 1197514e-10;
    const tl$1 = 9950252e-10;
    const tm$1 = 3026444e-10;
    const tn$1 = 3744953e-10;
    const to$1 = 1458479e-9;
    const tp$1 = 1866255e-10;
    const tq$1 = 7776064e-12;
    const tr$1 = 271478e-8;
    const ts$1 = 2503582e-9;
    const tt$1 = 241649e-8;
    const tu$1 = 153655e-8;
    const tv$1 = 1776053e-10;
    const tw$1 = 8668756e-10;
    const tx$1 = 6220851e-12;
    const ty$1 = 1054434e-10;
    const tz$1 = 1997515e-9;
    const ua$1 = 3377922e-10;
    const ub$1 = 4936246e-10;
    const uc$1 = 165879e-8;
    const ud$1 = 3735621e-10;
    const ue$1 = 1293626e-9;
    const uf$1 = 2606848e-9;
    const ug$1 = 6186637e-10;
    const uh$1 = 2858481e-10;
    const ui$1 = 1004668e-10;
    const uj$1 = 1275275e-11;
    const uk$1 = 2762058e-10;
    const ul$1 = 6625207e-10;
    const um$1 = 2081808e-9;
    const un$1 = 9899863e-9;
    const uo$1 = 4416805e-11;
    const up$1 = 3953351e-10;
    const uq$1 = 9331277e-13;
    const ur$1 = 3217735e-9;
    const us$1 = 3543086e-9;
    const ut$1 = 218974e-8;
    const uu$1 = 2052881e-11;
    const uv$1 = 8367045e-11;
    const uw$1 = 482116e-10;
    const ux$1 = 2799383e-11;
    const uy$1 = 1119753e-11;
    const uz$1 = 942459e-10;
    const va$1 = 2926911e-10;
    const vb$1 = 1990672e-11;
    const vc$1 = 5598766e-12;
    const vd$1 = 1866255e-11;
    const ve$1 = 3385076e-9;
    const vf$1 = 1928464e-11;
    const vg$1 = 1181962e-11;
    const vh$1 = 124417e-11;
    const vi$1 = 9667203e-10;
    const vj$1 = 1555213e-12;
    const vk$1 = 1119753e-11;
    const vl$1 = 5381036e-11;
    const vm$1 = 8398149e-12;
    const vn$1 = 2177298e-12;
    const vo$1 = 314464e-8;
    const vp$1 = 3110426e-11;
    const vq$1 = 6220851e-13;
    const vr$1 = 2146194e-11;
    const vs$1 = 3048217e-11;
    const vt$1 = 1306379e-11;
    const vu$1 = 1399692e-11;
    const vv$1 = 4354596e-12;
    const vw$1 = 2986009e-11;
    const vx$1 = 3110426e-13;
    const vy$1 = 3732511e-12;
    const vz$1 = 4043553e-12;
    const wa$1 = 2156458e-9;
    const wb$1 = 7153979e-12;
    const wc$1 = 4790056e-11;
    const wd$1 = 1524109e-11;
    const we$1 = 4397831e-9;
    const wf$1 = 167963e-10;
    const wg$1 = 8709192e-12;
    const wh$1 = 2149304e-10;
    const wi$1 = 3425201e-9;
    const wj$1 = 7776064e-12;
    const wk$1 = 1088649e-11;
    const wl$1 = 7122875e-11;
    const wm$1 = 43857e-9;
    const wn$1 = 628306e-10;
    const wo$1 = 1134994e-9;
    const wp$1 = 5909809e-12;
    const wq$1 = 0;
    const wr$1 = 3412137e-10;
    const ws$1 = 1539661e-10;
    const wt$1 = 1772943e-11;
    const wu$1 = 4870927e-10;
    const wv$1 = 1866255e-12;
    const ww$1 = 3483677e-11;
    const wx$1 = 0;
    const wy$1 = 2799383e-12;
    const wz$1 = 1866255e-12;
    const xa$1 = 3545885e-11;
    const xb$1 = 1399692e-11;
    const xc$1 = 8398149e-12;
    const xd$1 = 6220851e-12;
    const xe$1 = 5816496e-11;
    const xf$1 = 8087107e-12;
    const xg$1 = 9331277e-13;
    const xh$1 = 5598766e-12;
    const xi$1 = 102022e-9;
    const xj$1 = 6220851e-13;
    const xk$1 = 1710734e-11;
    const xl$1 = 6842937e-12;
    const xm$1 = 4976681e-12;
    const xn$1 = 2799383e-12;
    const xo$1 = 6842937e-12;
    const xp$1 = 1054434e-10;
    const xq$1 = 9331277e-13;
    const xr$1 = 1866255e-12;
    const xs$1 = 1119753e-11;
    const xt$1 = 7931586e-11;
    const xu$1 = 2332819e-11;
    const xv$1 = 3110426e-12;
    const xw$1 = 2488341e-12;
    const xx$1 = 8087107e-12;
    const xy$1 = 964232e-11;
    const xz$1 = 2799383e-12;
    const ya$1 = 4945577e-11;
    const yb$1 = 3110426e-11;
    const yc$1 = 2643862e-11;
    const yd$1 = 2270611e-11;
    const ye$1 = 1331262e-10;
    const yf$1 = 7153979e-12;
    const yg$1 = 1088649e-11;
    const yh$1 = 4043553e-12;
    const yi$1 = 964232e-11;
    const yj$1 = 6220851e-13;
    const yk$1 = 1430796e-11;
    const yl$1 = 7807169e-11;
    const ym$1 = 7496126e-11;
    const yn$1 = 4572326e-11;
    const yo$1 = 6469685e-11;
    const yp$1 = 6936249e-11;
    const yq$1 = 0;
    const yr$1 = 6749624e-11;
    const ys$1 = 2304825e-10;
    const yt$1 = 335926e-10;
    const yu$1 = 1213066e-11;
    const yv$1 = 5287724e-12;
    const yw$1 = 1088649e-11;
    const yx$1 = 3110426e-13;
    const yy$1 = 1866255e-12;
    const yz$1 = 2488341e-12;
    const za$1 = 3060659e-10;
    const zb$1 = 1045103e-10;
    const zc$1 = 9331277e-12;
    const zd$1 = 6998458e-11;
    const ze$1 = 2650083e-9;
    const zf$1 = 3421468e-11;
    const zg$1 = 7278396e-11;
    const zh$1 = 8646983e-11;
    const zi$1 = 9968914e-10;
    const zj$1 = 6220851e-13;
    const zk$1 = 3888032e-11;
    const zl$1 = 1421465e-10;
    const zm$1 = 4416805e-11;
    const zn$1 = 2737175e-11;
    const zo$1 = 1763611e-10;
    const zp$1 = 2177298e-11;
    const zq$1 = 9331277e-13;
    const zr$1 = 335926e-10;
    const zs$1 = 7465022e-11;
    const zt$1 = 6752734e-10;
    const zu$1 = 3590986e-9;
    const zv$1 = 1586317e-11;
    const zw$1 = 7069998e-10;
    const zx$1 = 6220851e-13;
    const zy$1 = 1181962e-11;
    const zz$1 = 3670302e-11;
    const bigram_german = {
      aa: aa$1,
      ab: ab$1,
      ac: ac$1,
      ad: ad$1,
      ae: ae$1,
      af: af$1,
      ag: ag$1,
      ah: ah$1,
      ai: ai$1,
      aj: aj$1,
      ak: ak$1,
      al: al$1,
      am: am$1,
      an: an$1,
      ao: ao$1,
      ap: ap$1,
      aq: aq$1,
      ar: ar$1,
      as: as$1,
      at: at$1,
      au: au$1,
      av: av$1,
      aw: aw$1,
      ax: ax$1,
      ay: ay$1,
      az: az$1,
      "a ": 1518821e-9,
      ba: ba$1,
      bb: bb$1,
      bc: bc$1,
      bd: bd$1,
      be: be$1,
      bf: bf$1,
      bg: bg$1,
      bh: bh$1,
      bi: bi$1,
      bj: bj$1,
      bk: bk$1,
      bl: bl$1,
      bm: bm$1,
      bn: bn$1,
      bo: bo$1,
      bp: bp$1,
      bq: bq$1,
      br: br$1,
      bs: bs$1,
      bt: bt$1,
      bu: bu$1,
      bv: bv$1,
      bw: bw$1,
      bx: bx$1,
      by: by$1,
      bz: bz$1,
      "b ": 7032673e-10,
      ca: ca$1,
      cb: cb$1,
      cc: cc$1,
      cd: cd$1,
      ce: ce$1,
      cf: cf$1,
      cg: cg$1,
      ch: ch$1,
      ci: ci$1,
      cj: cj$1,
      ck: ck$1,
      cl: cl$1,
      cm: cm$1,
      cn: cn$1,
      co: co$1,
      cp: cp$1,
      cq: cq$1,
      cr: cr$1,
      cs: cs$1,
      ct: ct$1,
      cu: cu$1,
      cv: cv$1,
      cw: cw$1,
      cx: cx$1,
      cy: cy$1,
      cz: cz$1,
      "c ": 2037329e-10,
      da: da$1,
      db: db$1,
      dc: dc$1,
      dd: dd$1,
      de: de$1,
      df: df$1,
      dg: dg$1,
      dh: dh$1,
      di: di$1,
      dj: dj$1,
      dk: dk$1,
      dl: dl$1,
      dm: dm$1,
      dn: dn$1,
      "do": 9312615e-10,
      dp: dp$1,
      dq: dq$1,
      dr: dr$1,
      ds: ds$1,
      dt: dt$1,
      du: du$1,
      dv: dv$1,
      dw: dw$1,
      dx: dx$1,
      dy: dy$1,
      dz: dz$1,
      "d ": 6132515e-9,
      ea: ea$1,
      eb: eb$1,
      ec: ec$1,
      ed: ed$1,
      ee: ee$1,
      ef: ef$1,
      eg: eg$1,
      eh: eh$1,
      ei: ei$1,
      ej: ej$1,
      ek: ek$1,
      el: el$1,
      em: em$1,
      en: en$1,
      eo: eo$1,
      ep: ep$1,
      eq: eq$1,
      er: er$1,
      es: es$1,
      et: et$1,
      eu: eu$1,
      ev: ev$1,
      ew: ew$1,
      ex: ex$1,
      ey: ey$1,
      ez: ez$1,
      "e ": 0.02186629,
      fa: fa$1,
      fb: fb$1,
      fc: fc$1,
      fd: fd$1,
      fe: fe$1,
      ff: ff$1,
      fg: fg$1,
      fh: fh$1,
      fi: fi$1,
      fj: fj$1,
      fk: fk$1,
      fl: fl$1,
      fm: fm$1,
      fn: fn$1,
      fo: fo$1,
      fp: fp$1,
      fq: fq$1,
      fr: fr$1,
      fs: fs$1,
      ft: ft$1,
      fu: fu$1,
      fv: fv$1,
      fw: fw$1,
      fx: fx$1,
      fy: fy$1,
      fz: fz$1,
      "f ": 205257e-8,
      ga: ga$1,
      gb: gb$1,
      gc: gc$1,
      gd: gd$1,
      ge: ge$1,
      gf: gf$1,
      gg: gg$1,
      gh: gh$1,
      gi: gi$1,
      gj: gj$1,
      gk: gk$1,
      gl: gl$1,
      gm: gm$1,
      gn: gn$1,
      go: go$1,
      gp: gp$1,
      gq: gq$1,
      gr: gr$1,
      gs: gs$1,
      gt: gt$1,
      gu: gu$1,
      gv: gv$1,
      gw: gw$1,
      gx: gx$1,
      gy: gy$1,
      gz: gz$1,
      "g ": 4046664e-9,
      ha: ha$1,
      hb: hb$1,
      hc: hc$1,
      hd: hd$1,
      he: he$1,
      hf: hf$1,
      hg: hg$1,
      hh: hh$1,
      hi: hi$1,
      hj: hj$1,
      hk: hk$1,
      hl: hl$1,
      hm: hm$1,
      hn: hn$1,
      ho: ho$1,
      hp: hp$1,
      hq: hq$1,
      hr: hr$1,
      hs: hs$1,
      ht: ht$1,
      hu: hu$1,
      hv: hv$1,
      hw: hw$1,
      hx: hx$1,
      hy: hy$1,
      hz: hz$1,
      "h ": 6069996e-9,
      ia: ia$1,
      ib: ib$1,
      ic: ic$1,
      id: id$1,
      ie: ie$1,
      "if": 5129092e-10,
      ig: ig$1,
      ih: ih$1,
      ii: ii$1,
      ij: ij$1,
      ik: ik$1,
      il: il$1,
      im: im$1,
      "in": 0.01514,
      io: io$1,
      ip: ip$1,
      iq: iq$1,
      ir: ir$1,
      is: is$1,
      it: it$1,
      iu: iu$1,
      iv: iv$1,
      iw: iw$1,
      ix: ix$1,
      iy: iy$1,
      iz: iz$1,
      "i ": 2008402e-9,
      ja: ja$1,
      jb: jb$1,
      jc: jc$1,
      jd: jd$1,
      je: je$1,
      jf: jf$1,
      jg: jg$1,
      jh: jh$1,
      ji: ji$1,
      jj: jj$1,
      jk: jk$1,
      jl: jl$1,
      jm: jm$1,
      jn: jn$1,
      jo: jo$1,
      jp: jp$1,
      jq: jq$1,
      jr: jr$1,
      js: js$1,
      jt: jt$1,
      ju: ju$1,
      jv: jv$1,
      jw: jw$1,
      jx: jx$1,
      jy: jy$1,
      jz: jz$1,
      "j ": 1493004e-11,
      ka: ka$1,
      kb: kb$1,
      kc: kc$1,
      kd: kd$1,
      ke: ke$1,
      kf: kf$1,
      kg: kg$1,
      kh: kh$1,
      ki: ki$1,
      kj: kj$1,
      kk: kk$1,
      kl: kl$1,
      km: km$1,
      kn: kn$1,
      ko: ko$1,
      kp: kp$1,
      kq: kq$1,
      kr: kr$1,
      ks: ks$1,
      kt: kt$1,
      ku: ku$1,
      kv: kv$1,
      kw: kw$1,
      kx: kx$1,
      ky: ky$1,
      kz: kz$1,
      "k ": 9881822e-10,
      la: la$1,
      lb: lb$1,
      lc: lc$1,
      ld: ld$1,
      le: le$1,
      lf: lf$1,
      lg: lg$1,
      lh: lh$1,
      li: li$1,
      lj: lj$1,
      lk: lk$1,
      ll: ll$1,
      lm: lm$1,
      ln: ln$1,
      lo: lo$1,
      lp: lp$1,
      lq: lq$1,
      lr: lr$1,
      ls: ls$1,
      lt: lt$1,
      lu: lu$1,
      lv: lv$1,
      lw: lw$1,
      lx: lx$1,
      ly: ly$1,
      lz: lz$1,
      "l ": 3090519e-9,
      ma: ma$1,
      mb: mb$1,
      mc: mc$1,
      md: md$1,
      me: me$1,
      mf: mf$1,
      mg: mg$1,
      mh: mh$1,
      mi: mi$1,
      mj: mj$1,
      mk: mk$1,
      ml: ml$1,
      mm: mm$1,
      mn: mn$1,
      mo: mo$1,
      mp: mp$1,
      mq: mq$1,
      mr: mr$1,
      ms: ms$1,
      mt: mt$1,
      mu: mu$1,
      mv: mv$1,
      mw: mw$1,
      mx: mx$1,
      my: my$1,
      mz: mz$1,
      "m ": 6497368e-9,
      na: na$1,
      nb: nb$1,
      nc: nc$1,
      nd: nd$1,
      ne: ne$1,
      nf: nf$1,
      ng: ng$1,
      nh: nh$1,
      ni: ni$1,
      nj: nj$1,
      nk: nk$1,
      nl: nl$1,
      nm: nm$1,
      nn: nn$1,
      no: no$1,
      np: np$1,
      nq: nq$1,
      nr: nr$1,
      ns: ns$1,
      nt: nt$1,
      nu: nu$1,
      nv: nv$1,
      nw: nw$1,
      nx: nx$1,
      ny: ny$1,
      nz: nz$1,
      "n ": 0.03082743,
      oa: oa$1,
      ob: ob$1,
      oc: oc$1,
      od: od$1,
      oe: oe$1,
      of: of$1,
      og: og$1,
      oh: oh$1,
      oi: oi$1,
      oj: oj$1,
      ok: ok$1,
      ol: ol$1,
      om: om$1,
      on: on$1,
      oo: oo$1,
      op: op$1,
      oq: oq$1,
      or: or$1,
      os: os$1,
      ot: ot$1,
      ou: ou$1,
      ov: ov$1,
      ow: ow$1,
      ox: ox$1,
      oy: oy$1,
      oz: oz$1,
      "o ": 160218e-8,
      pa: pa$1,
      pb: pb$1,
      pc: pc$1,
      pd: pd$1,
      pe: pe$1,
      pf: pf$1,
      pg: pg$1,
      ph: ph$1,
      pi: pi$1,
      pj: pj$1,
      pk: pk$1,
      pl: pl$1,
      pm: pm$1,
      pn: pn$1,
      po: po$1,
      pp: pp$1,
      pq: pq$1,
      pr: pr$1,
      ps: ps$1,
      pt: pt$1,
      pu: pu$1,
      pv: pv$1,
      pw: pw$1,
      px: px$1,
      py: py$1,
      pz: pz$1,
      "p ": 3427689e-10,
      qa: qa$1,
      qb: qb$1,
      qc: qc$1,
      qd: qd$1,
      qe: qe$1,
      qf: qf$1,
      qg: qg$1,
      qh: qh$1,
      qi: qi$1,
      qj: qj$1,
      qk: qk$1,
      ql: ql$1,
      qm: qm$1,
      qn: qn$1,
      qo: qo$1,
      qp: qp$1,
      qq: qq$1,
      qr: qr$1,
      qs: qs$1,
      qt: qt$1,
      qu: qu$1,
      qv: qv$1,
      qw: qw$1,
      qx: qx$1,
      qy: qy$1,
      qz: qz$1,
      "q ": 8709192e-12,
      ra: ra$1,
      rb: rb$1,
      rc: rc$1,
      rd: rd$1,
      re: re$1,
      rf: rf$1,
      rg: rg$1,
      rh: rh$1,
      ri: ri$1,
      rj: rj$1,
      rk: rk$1,
      rl: rl$1,
      rm: rm$1,
      rn: rn$1,
      ro: ro$1,
      rp: rp$1,
      rq: rq$1,
      rr: rr$1,
      rs: rs$1,
      rt: rt$1,
      ru: ru$1,
      rv: rv$1,
      rw: rw$1,
      rx: rx$1,
      ry: ry$1,
      rz: rz$1,
      "r ": 0.01928993,
      sa: sa$1,
      sb: sb$1,
      sc: sc$1,
      sd: sd$1,
      se: se$1,
      sf: sf$1,
      sg: sg$1,
      sh: sh$1,
      si: si$1,
      sj: sj$1,
      sk: sk$1,
      sl: sl$1,
      sm: sm$1,
      sn: sn$1,
      so: so$1,
      sp: sp$1,
      sq: sq$1,
      sr: sr$1,
      ss: ss$1,
      st: st$1,
      su: su$1,
      sv: sv$1,
      sw: sw$1,
      sx: sx$1,
      sy: sy$1,
      sz: sz$1,
      "s ": 0.01196425,
      ta: ta$1,
      tb: tb$1,
      tc: tc$1,
      td: td$1,
      te: te$1,
      tf: tf$1,
      tg: tg$1,
      th: th$1,
      ti: ti$1,
      tj: tj$1,
      tk: tk$1,
      tl: tl$1,
      tm: tm$1,
      tn: tn$1,
      to: to$1,
      tp: tp$1,
      tq: tq$1,
      tr: tr$1,
      ts: ts$1,
      tt: tt$1,
      tu: tu$1,
      tv: tv$1,
      tw: tw$1,
      tx: tx$1,
      ty: ty$1,
      tz: tz$1,
      "t ": 0.0151599,
      ua: ua$1,
      ub: ub$1,
      uc: uc$1,
      ud: ud$1,
      ue: ue$1,
      uf: uf$1,
      ug: ug$1,
      uh: uh$1,
      ui: ui$1,
      uj: uj$1,
      uk: uk$1,
      ul: ul$1,
      um: um$1,
      un: un$1,
      uo: uo$1,
      up: up$1,
      uq: uq$1,
      ur: ur$1,
      us: us$1,
      ut: ut$1,
      uu: uu$1,
      uv: uv$1,
      uw: uw$1,
      ux: ux$1,
      uy: uy$1,
      uz: uz$1,
      "u ": 1907935e-9,
      va: va$1,
      vb: vb$1,
      vc: vc$1,
      vd: vd$1,
      ve: ve$1,
      vf: vf$1,
      vg: vg$1,
      vh: vh$1,
      vi: vi$1,
      vj: vj$1,
      vk: vk$1,
      vl: vl$1,
      vm: vm$1,
      vn: vn$1,
      vo: vo$1,
      vp: vp$1,
      vq: vq$1,
      vr: vr$1,
      vs: vs$1,
      vt: vt$1,
      vu: vu$1,
      vv: vv$1,
      vw: vw$1,
      vx: vx$1,
      vy: vy$1,
      vz: vz$1,
      "v ": 1832041e-10,
      wa: wa$1,
      wb: wb$1,
      wc: wc$1,
      wd: wd$1,
      we: we$1,
      wf: wf$1,
      wg: wg$1,
      wh: wh$1,
      wi: wi$1,
      wj: wj$1,
      wk: wk$1,
      wl: wl$1,
      wm: wm$1,
      wn: wn$1,
      wo: wo$1,
      wp: wp$1,
      wq: wq$1,
      wr: wr$1,
      ws: ws$1,
      wt: wt$1,
      wu: wu$1,
      wv: wv$1,
      ww: ww$1,
      wx: wx$1,
      wy: wy$1,
      wz: wz$1,
      "w ": 1819599e-10,
      xa: xa$1,
      xb: xb$1,
      xc: xc$1,
      xd: xd$1,
      xe: xe$1,
      xf: xf$1,
      xg: xg$1,
      xh: xh$1,
      xi: xi$1,
      xj: xj$1,
      xk: xk$1,
      xl: xl$1,
      xm: xm$1,
      xn: xn$1,
      xo: xo$1,
      xp: xp$1,
      xq: xq$1,
      xr: xr$1,
      xs: xs$1,
      xt: xt$1,
      xu: xu$1,
      xv: xv$1,
      xw: xw$1,
      xx: xx$1,
      xy: xy$1,
      xz: xz$1,
      "x ": 1791605e-10,
      ya: ya$1,
      yb: yb$1,
      yc: yc$1,
      yd: yd$1,
      ye: ye$1,
      yf: yf$1,
      yg: yg$1,
      yh: yh$1,
      yi: yi$1,
      yj: yj$1,
      yk: yk$1,
      yl: yl$1,
      ym: ym$1,
      yn: yn$1,
      yo: yo$1,
      yp: yp$1,
      yq: yq$1,
      yr: yr$1,
      ys: ys$1,
      yt: yt$1,
      yu: yu$1,
      yv: yv$1,
      yw: yw$1,
      yx: yx$1,
      yy: yy$1,
      yz: yz$1,
      "y ": 3461904e-10,
      za: za$1,
      zb: zb$1,
      zc: zc$1,
      zd: zd$1,
      ze: ze$1,
      zf: zf$1,
      zg: zg$1,
      zh: zh$1,
      zi: zi$1,
      zj: zj$1,
      zk: zk$1,
      zl: zl$1,
      zm: zm$1,
      zn: zn$1,
      zo: zo$1,
      zp: zp$1,
      zq: zq$1,
      zr: zr$1,
      zs: zs$1,
      zt: zt$1,
      zu: zu$1,
      zv: zv$1,
      zw: zw$1,
      zx: zx$1,
      zy: zy$1,
      zz: zz$1,
      "z ": 8668756e-10,
      " a": 0.01088276,
      " b": 738384e-8,
      " c": 9144652e-10,
      " d": 0.01904296,
      " e": 9995042e-9,
      " f": 4981658e-9,
      " g": 6080571e-9,
      " h": 441836e-8,
      " i": 7677464e-9,
      " j": 1742149e-9,
      " k": 4475281e-9,
      " l": 275366e-8,
      " m": 6746513e-9,
      " n": 4926603e-9,
      " o": 1444793e-9,
      " p": 3161126e-9,
      " q": 1452569e-10,
      " r": 2570456e-9,
      " s": 0.01287934,
      " t": 2587252e-9,
      " u": 5687102e-9,
      " v": 5694878e-9,
      " w": 7376064e-9,
      " x": 4914473e-11,
      " y": 7216188e-11,
      " z": 4365171e-9,
      "  ": 3705761e-9
    };
    const aa = 9695637e-11;
    const ab = 5657783e-10;
    const ac = 5605913e-10;
    const ad = 4649517e-9;
    const ae = 1743619e-10;
    const af = 7301652e-10;
    const ag = 4116057e-9;
    const ah = 2362065e-10;
    const ai = 2541613e-10;
    const aj = 1847358e-10;
    const ak = 1502624e-9;
    const al = 4762034e-9;
    const am = 285722e-8;
    const an = 0.01354157;
    const ao = 6463758e-11;
    const ap = 8797893e-10;
    const aq = 917694e-11;
    const ar = 0.01512559;
    const as = 336275e-8;
    const at = 953923e-8;
    const au = 2238375e-10;
    const av = 291707e-8;
    const aw = 2872781e-11;
    const ax = 1081283e-10;
    const ay = 917694e-10;
    const az = 6383958e-11;
    const ba = 1827408e-9;
    const bb = 6028851e-10;
    const bc = 6024861e-11;
    const bd = 1998977e-10;
    const be = 2898317e-9;
    const bf = 8777943e-12;
    const bg = 1755589e-11;
    const bh = 1236892e-11;
    const bi = 8889662e-10;
    const bj = 1867308e-10;
    const bk = 147629e-10;
    const bl = 1671799e-9;
    const bm = 1755589e-11;
    const bn = 3670776e-11;
    const bo = 1471502e-9;
    const bp = 1715689e-11;
    const bq = 0;
    const br = 1809852e-9;
    const bs = 2222416e-10;
    const bt = 2250345e-10;
    const bu = 4943578e-10;
    const bv = 1037393e-11;
    const bw = 4388971e-12;
    const bx = 0;
    const by = 4775999e-10;
    const bz = 7979948e-13;
    const ca = 3347588e-10;
    const cb = 9974935e-12;
    const cc = 6822856e-11;
    const cd = 1795488e-11;
    const ce = 8857742e-10;
    const cf = 4787969e-12;
    const cg = 2792982e-12;
    const ch = 5641424e-9;
    const ci = 4704179e-10;
    const cj = 0;
    const ck = 3182004e-9;
    const cl = 5745563e-11;
    const cm = 8777943e-12;
    const cn = 8378945e-12;
    const co = 1967057e-10;
    const cp = 3590977e-12;
    const cq = 2393984e-12;
    const cr = 5546064e-11;
    const cs = 4229372e-11;
    const ct = 5147066e-11;
    const cu = 7979948e-11;
    const cv = 4388971e-12;
    const cw = 7979948e-13;
    const cx = 3989974e-13;
    const cy = 5266766e-11;
    const cz = 2792982e-12;
    const da = 4295606e-9;
    const db = 1699729e-10;
    const dc = 3231879e-11;
    const dd = 8139547e-10;
    const de = 0.01679979;
    const df = 1779528e-10;
    const dg = 148427e-9;
    const dh = 1141133e-10;
    const di = 1768755e-9;
    const dj = 2593483e-10;
    const dk = 1232902e-10;
    const dl = 5988951e-10;
    const dm = 2294235e-10;
    const dn = 6248299e-10;
    const dp = 6822856e-11;
    const dq = 1675789e-11;
    const dr = 2353686e-9;
    const ds = 1242079e-9;
    const dt = 1611949e-10;
    const du = 6407898e-10;
    const dv = 2178526e-10;
    const dw = 159599e-10;
    const dx = 1196992e-12;
    const dy = 1189012e-10;
    const dz = 1994987e-12;
    const ea = 3766535e-10;
    const eb = 6683206e-10;
    const ec = 5873242e-10;
    const ed = 4803929e-9;
    const ee = 2006957e-10;
    const ef = 1345818e-9;
    const eg = 1059338e-9;
    const eh = 4125633e-10;
    const ei = 2421914e-10;
    const ej = 2421914e-10;
    const ek = 1202179e-9;
    const el = 4822283e-9;
    const em = 1888455e-9;
    const en = 0.02022478;
    const eo = 1408461e-10;
    const ep = 4337102e-10;
    const eq = 3590977e-12;
    const er = 0.01814082;
    const es = 3439358e-9;
    const et = 0.01231665;
    const eu = 300445e-9;
    const ev = 8019848e-10;
    const ew = 6503658e-11;
    const ex = 5809402e-10;
    const ey = 9695637e-11;
    const ez = 2154586e-11;
    const fa = 1414047e-9;
    const fb = 8378945e-12;
    const fc = 1037393e-11;
    const fd = 5027367e-11;
    const fe = 7165993e-10;
    const ff = 6020871e-10;
    const fg = 3152079e-11;
    const fh = 5984961e-12;
    const fi = 1369758e-9;
    const fj = 913704e-10;
    const fk = 4189473e-11;
    const fl = 9986905e-10;
    const fm = 1117193e-11;
    const fn = 1181032e-10;
    const fo = 1093652e-9;
    const fp = 2234385e-11;
    const fq = 0;
    const fr = 8522185e-9;
    const fs = 1236892e-10;
    const ft = 1618333e-9;
    const fu = 308026e-9;
    const fv = 8378945e-12;
    const fw = 7979948e-13;
    const fx = 0;
    const fy = 2397974e-10;
    const fz = 0;
    const ga = 4035061e-9;
    const gb = 1416441e-10;
    const gc = 7979948e-12;
    const gd = 3978004e-10;
    const ge = 6502062e-9;
    const gf = 8139547e-11;
    const gg = 762883e-9;
    const gh = 46563e-8;
    const gi = 9619827e-10;
    const gj = 2892731e-10;
    const gk = 6862755e-11;
    const gl = 5637833e-10;
    const gm = 1396491e-10;
    const gn = 9966955e-10;
    const go = 9332549e-10;
    const gp = 8618344e-11;
    const gq = 8777943e-12;
    const gr = 2539219e-9;
    const gs = 1493447e-9;
    const gt = 1742821e-9;
    const gu = 309622e-9;
    const gv = 1823418e-10;
    const gw = 9575938e-12;
    const gx = 3989974e-13;
    const gy = 6503658e-11;
    const gz = 7979948e-13;
    const ha = 5302276e-9;
    const hb = 1356591e-11;
    const hc = 2513684e-11;
    const hd = 1915188e-11;
    const he = 2569144e-9;
    const hf = 1675789e-11;
    const hg = 2808942e-10;
    const hh = 6782956e-12;
    const hi = 4807919e-10;
    const hj = 311218e-9;
    const hk = 4069773e-11;
    const hl = 6304159e-10;
    const hm = 6902655e-11;
    const hn = 2346105e-10;
    const ho = 1493447e-9;
    const hp = 8777943e-12;
    const hq = 1196992e-12;
    const hr = 8055757e-10;
    const hs = 1376541e-10;
    const ht = 4907668e-11;
    const hu = 8063737e-10;
    const hv = 1723669e-10;
    const hw = 151619e-10;
    const hx = 2792982e-12;
    const hy = 1189012e-10;
    const hz = 3989974e-13;
    const ia = 7377462e-10;
    const ib = 1855338e-10;
    const ic = 1048565e-9;
    const id = 2217229e-9;
    const ie = 1151107e-9;
    const ig = 5094399e-9;
    const ih = 1013453e-10;
    const ii = 462837e-10;
    const ij = 4189473e-11;
    const ik = 2252739e-9;
    const il = 522926e-8;
    const im = 5011407e-10;
    const io = 149624e-8;
    const ip = 2541613e-10;
    const iq = 6782956e-12;
    const ir = 9069211e-10;
    const is = 4089324e-9;
    const it = 296096e-8;
    const iu = 6304159e-11;
    const iv = 1356192e-9;
    const iw = 6782956e-12;
    const ix = 454857e-10;
    const iy = 3590977e-12;
    const iz = 3710676e-11;
    const ja = 1911996e-9;
    const jb = 1915188e-11;
    const jc = 6782956e-12;
    const jd = 1647859e-10;
    const je = 7912118e-10;
    const jf = 1077293e-11;
    const jg = 1037393e-11;
    const jh = 1236892e-11;
    const ji = 3590977e-11;
    const jj = 2792982e-12;
    const jk = 7940048e-11;
    const jl = 5506164e-10;
    const jm = 1232902e-10;
    const jn = 2868791e-10;
    const jo = 1104824e-9;
    const jp = 2952581e-11;
    const jq = 3989974e-13;
    const jr = 310021e-9;
    const js = 6623357e-11;
    const jt = 1304721e-10;
    const ju = 1179835e-9;
    const jv = 2154586e-11;
    const jw = 3989974e-13;
    const jx = 0;
    const jy = 7979948e-13;
    const jz = 0;
    const ka = 685677e-8;
    const kb = 5745563e-11;
    const kc = 917694e-11;
    const kd = 1280782e-10;
    const ke = 2985299e-9;
    const kf = 770065e-10;
    const kg = 4508671e-11;
    const kh = 300046e-9;
    const ki = 770863e-9;
    const kj = 6942555e-11;
    const kk = 9775436e-11;
    const kl = 1523771e-9;
    const km = 1013453e-10;
    const kn = 1228912e-9;
    const ko = 3388685e-9;
    const kp = 2709192e-10;
    const kq = 159599e-11;
    const kr = 1999775e-9;
    const ks = 9863216e-10;
    const kt = 2645353e-9;
    const ku = 122173e-8;
    const kv = 7114124e-10;
    const kw = 6782956e-12;
    const kx = 0;
    const ky = 2298225e-10;
    const kz = 1994987e-12;
    const la = 7141255e-9;
    const lb = 3283749e-10;
    const lc = 5346565e-11;
    const ld = 1554095e-9;
    const le = 4895698e-9;
    const lf = 308425e-9;
    const lg = 5945061e-10;
    const lh = 1232902e-10;
    const li = 562307e-8;
    const lj = 1104026e-9;
    const lk = 7050284e-10;
    const ll = 8415653e-9;
    const lm = 8115607e-10;
    const ln = 1153501e-9;
    const lo = 1124375e-9;
    const lp = 3191979e-10;
    const lq = 917694e-11;
    const lr = 3794465e-10;
    const ls = 1995785e-9;
    const lt = 1760377e-9;
    const lu = 1106819e-9;
    const lv = 7860249e-10;
    const lw = 5984961e-12;
    const lx = 3590977e-12;
    const ly = 5661773e-10;
    const lz = 6383958e-12;
    const ma = 4291217e-9;
    const mb = 3946084e-10;
    const mc = 3551077e-11;
    const md = 1791498e-10;
    const me = 6231142e-9;
    const mf = 2856821e-10;
    const mg = 158003e-9;
    const mh = 2214436e-10;
    const mi = 2395979e-9;
    const mj = 1951097e-10;
    const mk = 153614e-9;
    const ml = 7002404e-10;
    const mm = 2101918e-9;
    const mn = 1322676e-9;
    const mo = 1537337e-9;
    const mp = 5414395e-10;
    const mq = 9974935e-12;
    const mr = 4305182e-10;
    const ms = 8666224e-10;
    const mt = 7173973e-10;
    const mu = 4488721e-10;
    const mv = 7979948e-11;
    const mw = 7979948e-12;
    const mx = 9575938e-12;
    const my = 4077753e-10;
    const mz = 1196992e-12;
    const na = 6893877e-9;
    const nb = 3339608e-10;
    const nc = 2278275e-10;
    const nd = 7331178e-9;
    const ne = 3715065e-9;
    const nf = 6320119e-10;
    const ng = 7327986e-9;
    const nh = 4233362e-10;
    const ni = 3691524e-9;
    const nj = 2964551e-10;
    const nk = 1088864e-9;
    const nl = 7185943e-10;
    const nm = 4245332e-10;
    const nn = 3342002e-9;
    const no = 1793493e-9;
    const np = 149624e-9;
    const nq = 1117193e-11;
    const nr = 1051757e-9;
    const ns = 5852893e-9;
    const nt = 4601238e-9;
    const nu = 1017044e-9;
    const nv = 4680239e-10;
    const nw = 1037393e-11;
    const nx = 1196992e-12;
    const ny = 8454755e-10;
    const nz = 1795488e-11;
    const oa = 1336641e-10;
    const ob = 5741573e-10;
    const oc = 5861671e-9;
    const od = 7541051e-10;
    const oe = 1352601e-10;
    const of = 3914164e-10;
    const og = 7038314e-10;
    const oh = 2046857e-10;
    const oi = 5266766e-11;
    const oj = 1404471e-10;
    const ok = 5151056e-10;
    const ol = 2767845e-9;
    const om = 7606885e-9;
    const on = 5621075e-9;
    const oo = 1300732e-10;
    const op = 914901e-9;
    const oq = 2792982e-12;
    const or = 5674142e-9;
    const os = 1090859e-9;
    const ot = 2107105e-9;
    const ou = 2282265e-10;
    const ov = 4309172e-10;
    const ow = 6703156e-11;
    const ox = 4309172e-11;
    const oy = 2553583e-11;
    const oz = 1077293e-11;
    const pa = 1838181e-9;
    const pb = 3191979e-11;
    const pc = 2034887e-11;
    const pd = 8498645e-11;
    const pe = 2637373e-9;
    const pf = 8219346e-11;
    const pg = 2194486e-10;
    const ph = 1021433e-10;
    const pi = 3798455e-10;
    const pj = 1715689e-11;
    const pk = 3551077e-11;
    const pl = 9001381e-10;
    const pm = 9974935e-11;
    const pn = 1735639e-10;
    const po = 1215745e-9;
    const pp = 2289846e-9;
    const pq = 3989974e-13;
    const pr = 1896834e-9;
    const ps = 3782495e-10;
    const pt = 3682746e-10;
    const pu = 2210446e-10;
    const pv = 7780449e-11;
    const pw = 1196992e-12;
    const px = 0;
    const py = 159599e-10;
    const pz = 3989974e-13;
    const qa = 7979948e-12;
    const qb = 1994987e-12;
    const qc = 0;
    const qd = 0;
    const qe = 0;
    const qf = 3989974e-13;
    const qg = 0;
    const qh = 0;
    const qi = 3989974e-13;
    const qj = 3989974e-13;
    const qk = 0;
    const ql = 159599e-11;
    const qm = 0;
    const qn = 0;
    const qo = 3989974e-13;
    const qp = 0;
    const qq = 0;
    const qr = 3989974e-13;
    const qs = 2393984e-12;
    const qt = 159599e-11;
    const qu = 3590977e-11;
    const qv = 4827869e-11;
    const qw = 0;
    const qx = 3989974e-13;
    const qy = 0;
    const qz = 0;
    const ra = 9076792e-9;
    const rb = 1036196e-9;
    const rc = 1923167e-10;
    const rd = 2540416e-9;
    const re = 7825536e-9;
    const rf = 6048801e-10;
    const rg = 1362975e-9;
    const rh = 4700189e-10;
    const ri = 5159834e-9;
    const rj = 459645e-9;
    const rk = 1877682e-9;
    const rl = 1172653e-9;
    const rm = 1202977e-9;
    const rn = 4631562e-9;
    const ro = 3223899e-9;
    const rp = 2126656e-10;
    const rq = 1994987e-12;
    const rr = 9544018e-10;
    const rs = 3670776e-9;
    const rt = 3195171e-9;
    const ru = 11539e-7;
    const rv = 6974475e-10;
    const rw = 2952581e-11;
    const rx = 1994987e-12;
    const ry = 5653793e-10;
    const rz = 9974935e-12;
    const sa = 3486838e-9;
    const sb = 4289222e-10;
    const sc = 3606936e-10;
    const sd = 5897182e-10;
    const se = 4126431e-9;
    const sf = 3387488e-10;
    const sg = 1095248e-9;
    const sh = 453261e-9;
    const si = 2998864e-9;
    const sj = 6371988e-10;
    const sk = 6642509e-9;
    const sl = 1816236e-9;
    const sm = 8023838e-10;
    const sn = 7983938e-10;
    const so = 4893703e-9;
    const sp = 1646263e-9;
    const sq = 7580951e-12;
    const sr = 4173513e-10;
    const ss = 2897519e-9;
    const st = 0.01003319;
    const su = 6411888e-10;
    const sv = 1687759e-9;
    const sw = 2832882e-11;
    const sx = 7979948e-13;
    const sy = 4093713e-10;
    const sz = 1077293e-11;
    const ta = 7469231e-9;
    const tb = 3830375e-10;
    const tc = 3610926e-10;
    const td = 464832e-9;
    const te = 0.0101892;
    const tf = 4073763e-10;
    const tg = 1783518e-10;
    const th = 4133613e-10;
    const ti = 7455266e-9;
    const tj = 4281242e-10;
    const tk = 1867308e-10;
    const tl = 8797893e-10;
    const tm = 4329122e-10;
    const tn = 1119986e-9;
    const to = 2489345e-9;
    const tp = 146432e-9;
    const tq = 1196992e-12;
    const tr = 384833e-8;
    const ts = 282969e-8;
    const tt = 0.01059857;
    const tu = 8526574e-10;
    const tv = 116587e-8;
    const tw = 1436391e-11;
    const tx = 159599e-11;
    const ty = 76009e-8;
    const tz = 2912681e-11;
    const ua = 146033e-9;
    const ub = 3447338e-10;
    const uc = 1061333e-10;
    const ud = 5446315e-10;
    const ue = 1979027e-10;
    const uf = 9974935e-11;
    const ug = 1943117e-10;
    const uh = 2114686e-11;
    const ui = 6264259e-11;
    const uj = 9974935e-12;
    const uk = 5139087e-10;
    const ul = 1156294e-9;
    const um = 4835848e-10;
    const un = 283368e-8;
    const uo = 1675789e-11;
    const up = 1329858e-9;
    const uq = 3989974e-13;
    const ur = 1367763e-9;
    const us = 142881e-8;
    const ut = 2652136e-9;
    const uu = 5984961e-12;
    const uv = 1879278e-10;
    const uw = 159599e-11;
    const ux = 4428871e-11;
    const uy = 4787969e-12;
    const uz = 155609e-10;
    const va = 4302389e-9;
    const vb = 5386465e-11;
    const vc = 2792982e-11;
    const vd = 2597473e-10;
    const ve = 3719454e-9;
    const vf = 4189473e-11;
    const vg = 4225382e-10;
    const vh = 307228e-10;
    const vi = 4012318e-9;
    const vj = 4029874e-11;
    const vk = 7062254e-11;
    const vl = 7776459e-10;
    const vm = 1444371e-10;
    const vn = 62084e-8;
    const vo = 2090746e-10;
    const vp = 3351578e-11;
    const vq = 0;
    const vr = 1051358e-9;
    const vs = 5721623e-10;
    const vt = 2733132e-10;
    const vu = 1783518e-10;
    const vv = 4907668e-11;
    const vw = 159599e-11;
    const vx = 9376439e-11;
    const vy = 5585964e-12;
    const vz = 0;
    const wa = 150821e-9;
    const wb = 159599e-11;
    const wc = 7979948e-13;
    const wd = 2792982e-12;
    const we = 1356591e-10;
    const wf = 159599e-11;
    const wg = 1196992e-12;
    const wh = 159599e-10;
    const wi = 1133153e-10;
    const wj = 0;
    const wk = 3989974e-12;
    const wl = 7181953e-12;
    const wm = 4388971e-12;
    const wn = 1117193e-11;
    const wo = 3790475e-11;
    const wp = 7979948e-13;
    const wq = 0;
    const wr = 1077293e-11;
    const ws = 2912681e-11;
    const wt = 2393984e-12;
    const wu = 1196992e-12;
    const wv = 3989974e-13;
    const ww = 5984961e-12;
    const wx = 0;
    const wy = 1196992e-12;
    const wz = 0;
    const xa = 9815336e-11;
    const xb = 1077293e-11;
    const xc = 7181953e-12;
    const xd = 7979948e-12;
    const xe = 153215e-9;
    const xf = 7181953e-12;
    const xg = 159599e-11;
    const xh = 4787969e-12;
    const xi = 6503658e-11;
    const xj = 9575938e-12;
    const xk = 1276792e-11;
    const xl = 1955087e-11;
    const xm = 5186966e-12;
    const xn = 2154586e-11;
    const xo = 1316691e-11;
    const xp = 1232902e-10;
    const xq = 0;
    const xr = 159599e-11;
    const xs = 9974935e-12;
    const xt = 1611949e-10;
    const xu = 2513684e-11;
    const xv = 7181953e-12;
    const xw = 3989974e-13;
    const xx = 2393984e-12;
    const xy = 3989974e-13;
    const xz = 0;
    const ya = 3403448e-10;
    const yb = 3870275e-11;
    const yc = 7154023e-10;
    const yd = 3203949e-10;
    const ye = 466827e-10;
    const yf = 8219346e-11;
    const yg = 5143076e-10;
    const yh = 774055e-10;
    const yi = 917694e-11;
    const yj = 4787969e-12;
    const yk = 158801e-9;
    const yl = 2302215e-10;
    const ym = 1667809e-10;
    const yn = 307228e-9;
    const yo = 5625863e-11;
    const yp = 8059747e-11;
    const yq = 3989974e-13;
    const yr = 5949051e-10;
    const ys = 4827869e-10;
    const yt = 5015397e-10;
    const yu = 1196992e-11;
    const yv = 3630876e-11;
    const yw = 9974935e-12;
    const yx = 155609e-10;
    const yy = 159599e-11;
    const yz = 7979948e-13;
    const za = 5226866e-11;
    const zb = 9575938e-12;
    const zc = 1994987e-12;
    const zd = 1196992e-12;
    const ze = 4069773e-11;
    const zf = 1196992e-12;
    const zg = 7979948e-13;
    const zh = 5585964e-12;
    const zi = 458847e-10;
    const zj = 2792982e-12;
    const zk = 2393984e-12;
    const zl = 3471277e-11;
    const zm = 1196992e-12;
    const zn = 6383958e-12;
    const zo = 2753082e-11;
    const zp = 1994987e-12;
    const zq = 3989974e-13;
    const zr = 3191979e-12;
    const zs = 2393984e-12;
    const zt = 2792982e-12;
    const zu = 7580951e-12;
    const zv = 2393984e-12;
    const zw = 7979948e-13;
    const zx = 0;
    const zy = 7580951e-12;
    const zz = 151619e-10;
    const bigram_swedish = {
      aa,
      ab,
      ac,
      ad,
      ae,
      af,
      ag,
      ah,
      ai,
      aj,
      ak,
      al,
      am,
      an,
      ao,
      ap,
      aq,
      ar,
      as,
      at,
      au,
      av,
      aw,
      ax,
      ay,
      az,
      "a ": 0.01702123,
      ba,
      bb,
      bc,
      bd,
      be,
      bf,
      bg,
      bh,
      bi,
      bj,
      bk,
      bl,
      bm,
      bn,
      bo,
      bp,
      bq,
      br,
      bs,
      bt,
      bu,
      bv,
      bw,
      bx,
      by,
      bz,
      "b ": 1787508e-10,
      ca,
      cb,
      cc,
      cd,
      ce,
      cf,
      cg,
      ch,
      ci,
      cj,
      ck,
      cl,
      cm,
      cn,
      co,
      cp,
      cq,
      cr,
      cs,
      ct,
      cu,
      cv,
      cw,
      cx,
      cy,
      cz,
      "c ": 1272802e-10,
      da,
      db,
      dc,
      dd,
      de,
      df,
      dg,
      dh,
      di,
      dj,
      dk,
      dl,
      dm,
      dn,
      "do": 8263236e-10,
      dp,
      dq,
      dr,
      ds,
      dt,
      du,
      dv,
      dw,
      dx,
      dy,
      dz,
      "d ": 5852893e-9,
      ea,
      eb,
      ec,
      ed,
      ee,
      ef,
      eg,
      eh,
      ei,
      ej,
      ek,
      el,
      em,
      en,
      eo,
      ep,
      eq,
      er,
      es,
      et,
      eu,
      ev,
      ew,
      ex,
      ey,
      ez,
      "e ": 0.01230269,
      fa,
      fb,
      fc,
      fd,
      fe,
      ff,
      fg,
      fh,
      fi,
      fj,
      fk,
      fl,
      fm,
      fn,
      fo,
      fp,
      fq,
      fr,
      fs,
      ft,
      fu,
      fv,
      fw,
      fx,
      fy,
      fz,
      "f ": 5949051e-10,
      ga,
      gb,
      gc,
      gd,
      ge,
      gf,
      gg,
      gh,
      gi,
      gj,
      gk,
      gl,
      gm,
      gn,
      go,
      gp,
      gq,
      gr,
      gs,
      gt,
      gu,
      gv,
      gw,
      gx,
      gy,
      gz,
      "g ": 553968e-8,
      ha,
      hb,
      hc,
      hd,
      he,
      hf,
      hg,
      hh,
      hi,
      hj,
      hk,
      hl,
      hm,
      hn,
      ho,
      hp,
      hq,
      hr,
      hs,
      ht,
      hu,
      hv,
      hw,
      hx,
      hy,
      hz,
      "h ": 493879e-8,
      ia,
      ib,
      ic,
      id,
      ie,
      "if": 5438335e-10,
      ig,
      ih,
      ii,
      ij,
      ik,
      il,
      im,
      "in": 0.01156534,
      io,
      ip,
      iq,
      ir,
      is,
      it,
      iu,
      iv,
      iw,
      ix,
      iy,
      iz,
      "i ": 6931782e-9,
      ja,
      jb,
      jc,
      jd,
      je,
      jf,
      jg,
      jh,
      ji,
      jj,
      jk,
      jl,
      jm,
      jn,
      jo,
      jp,
      jq,
      jr,
      js,
      jt,
      ju,
      jv,
      jw,
      jx,
      jy,
      jz,
      "j ": 2006957e-10,
      ka,
      kb,
      kc,
      kd,
      ke,
      kf,
      kg,
      kh,
      ki,
      kj,
      kk,
      kl,
      km,
      kn,
      ko,
      kp,
      kq,
      kr,
      ks,
      kt,
      ku,
      kv,
      kw,
      kx,
      ky,
      kz,
      "k ": 1864116e-9,
      la,
      lb,
      lc,
      ld,
      le,
      lf,
      lg,
      lh,
      li,
      lj,
      lk,
      ll,
      lm,
      ln,
      lo,
      lp,
      lq,
      lr,
      ls,
      lt,
      lu,
      lv,
      lw,
      lx,
      ly,
      lz,
      "l ": 4543383e-9,
      ma,
      mb,
      mc,
      md,
      me,
      mf,
      mg,
      mh,
      mi,
      mj,
      mk,
      ml,
      mm,
      mn,
      mo,
      mp,
      mq,
      mr,
      ms,
      mt,
      mu,
      mv,
      mw,
      mx,
      my,
      mz,
      "m ": 6523208e-9,
      na,
      nb,
      nc,
      nd,
      ne,
      nf,
      ng,
      nh,
      ni,
      nj,
      nk,
      nl,
      nm,
      nn,
      no,
      np,
      nq,
      nr,
      ns,
      nt,
      nu,
      nv,
      nw,
      nx,
      ny,
      nz,
      "n ": 0.02317137,
      oa,
      ob,
      oc,
      od,
      oe,
      of,
      og,
      oh,
      oi,
      oj,
      ok,
      ol,
      om,
      on,
      oo,
      op,
      oq,
      or,
      os,
      ot,
      ou,
      ov,
      ow,
      ox,
      oy,
      oz,
      "o ": 6910635e-10,
      pa,
      pb,
      pc,
      pd,
      pe,
      pf,
      pg,
      ph,
      pi,
      pj,
      pk,
      pl,
      pm,
      pn,
      po,
      pp,
      pq,
      pr,
      ps,
      pt,
      pu,
      pv,
      pw,
      px,
      py,
      pz,
      "p ": 3976408e-9,
      qa,
      qb,
      qc,
      qd,
      qe,
      qf,
      qg,
      qh,
      qi,
      qj,
      qk,
      ql,
      qm,
      qn,
      qo,
      qp,
      qq,
      qr,
      qs,
      qt,
      qu,
      qv,
      qw,
      qx,
      qy,
      qz,
      "q ": 1157092e-11,
      ra,
      rb,
      rc,
      rd,
      re,
      rf,
      rg,
      rh,
      ri,
      rj,
      rk,
      rl,
      rm,
      rn,
      ro,
      rp,
      rq,
      rr,
      rs,
      rt,
      ru,
      rv,
      rw,
      rx,
      ry,
      rz,
      "r ": 0.02598111,
      sa,
      sb,
      sc,
      sd,
      se,
      sf,
      sg,
      sh,
      si,
      sj,
      sk,
      sl,
      sm,
      sn,
      so,
      sp,
      sq,
      sr,
      ss,
      st,
      su,
      sv,
      sw,
      sx,
      sy,
      sz,
      "s ": 9192102e-9,
      ta,
      tb,
      tc,
      td,
      te,
      tf,
      tg,
      th,
      ti,
      tj,
      tk,
      tl,
      tm,
      tn,
      to,
      tp,
      tq,
      tr,
      ts,
      tt,
      tu,
      tv,
      tw,
      tx,
      ty,
      tz,
      "t ": 0.02350653,
      ua,
      ub,
      uc,
      ud,
      ue,
      uf,
      ug,
      uh,
      ui,
      uj,
      uk,
      ul,
      um,
      un,
      uo,
      up,
      uq,
      ur,
      us,
      ut,
      uu,
      uv,
      uw,
      ux,
      uy,
      uz,
      "u ": 1230109e-9,
      va,
      vb,
      vc,
      vd,
      ve,
      vf,
      vg,
      vh,
      vi,
      vj,
      vk,
      vl,
      vm,
      vn,
      vo,
      vp,
      vq,
      vr,
      vs,
      vt,
      vu,
      vv,
      vw,
      vx,
      vy,
      vz,
      "v ": 3036769e-9,
      wa,
      wb,
      wc,
      wd,
      we,
      wf,
      wg,
      wh,
      wi,
      wj,
      wk,
      wl,
      wm,
      wn,
      wo,
      wp,
      wq,
      wr,
      ws,
      wt,
      wu,
      wv,
      ww,
      wx,
      wy,
      wz,
      "w ": 7261753e-11,
      xa,
      xb,
      xc,
      xd,
      xe,
      xf,
      xg,
      xh,
      xi,
      xj,
      xk,
      xl,
      xm,
      xn,
      xo,
      xp,
      xq,
      xr,
      xs,
      xt,
      xu,
      xv,
      xw,
      xx,
      xy,
      xz,
      "x ": 2110696e-10,
      ya,
      yb,
      yc,
      yd,
      ye,
      yf,
      yg,
      yh,
      yi,
      yj,
      yk,
      yl,
      ym,
      yn,
      yo,
      yp,
      yq,
      yr,
      ys,
      yt,
      yu,
      yv,
      yw,
      yx,
      yy,
      yz,
      "y ": 4959538e-10,
      za,
      zb,
      zc,
      zd,
      ze,
      zf,
      zg,
      zh,
      zi,
      zj,
      zk,
      zl,
      zm,
      zn,
      zo,
      zp,
      zq,
      zr,
      zs,
      zt,
      zu,
      zv,
      zw,
      zx,
      zy,
      zz,
      "z ": 5186966e-11,
      " a": 0.01104943,
      " b": 6940959e-9,
      " c": 923679e-9,
      " d": 9576736e-9,
      " e": 6998015e-9,
      " f": 0.01111806,
      " g": 3981196e-9,
      " h": 8675001e-9,
      " i": 9518482e-9,
      " j": 2026109e-9,
      " k": 7005995e-9,
      " l": 4411315e-9,
      " m": 0.01001244,
      " n": 460842e-8,
      " o": 7900149e-9,
      " p": 7199908e-9,
      " q": 1755589e-11,
      " r": 705986e-8,
      " s": 0.01912594,
      " t": 8196205e-9,
      " u": 3436964e-9,
      " v": 7900149e-9,
      " w": 2733132e-10,
      " x": 2274285e-11,
      " y": 1883268e-10,
      " z": 8099647e-11,
      "  ": 2851235e-9
    };
    const _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };
    const _sfc_main$1 = {
      name: "InputSentence",
      data() {
        return {
          sentence: "",
          p_da: 0,
          p_en: 0,
          p_fr: 0,
          p_ge: 0,
          p_sw: 0
        };
      },
      methods: {
        clear() {
          this.sentence = "";
          this.p_da = 0;
          this.p_en = 0;
          this.p_fr = 0;
          this.p_ge = 0;
          this.p_sw = 0;
        },
        predict() {
          this.p_da = nlp.probability(this.sentence, 3199010, bigram_danish);
          this.p_en = nlp.probability(this.sentence, 3380488, bigram_english);
          this.p_fr = nlp.probability(this.sentence, 3404521, bigram_french);
          this.p_ge = nlp.probability(this.sentence, 3214994, bigram_german);
          this.p_sw = nlp.probability(this.sentence, 2506282, bigram_swedish);
        },
        isDanish() {
          return this.p_da > this.p_en && this.p_da > this.p_fr && this.p_da > this.p_ge && this.p_da > this.p_sw;
        },
        isEnglish() {
          return this.p_en > this.p_da && this.p_en > this.p_fr && this.p_en > this.p_ge && this.p_en > this.p_sw;
        },
        isFrench() {
          return this.p_fr > this.p_da && this.p_fr > this.p_en && this.p_fr > this.p_ge && this.p_fr > this.p_sw;
        },
        isGerman() {
          return this.p_ge > this.p_da && this.p_ge > this.p_en && this.p_ge > this.p_fr && this.p_ge > this.p_sw;
        },
        isSwedish() {
          return this.p_sw > this.p_da && this.p_sw > this.p_en && this.p_sw > this.p_fr && this.p_sw > this.p_ge;
        },
        getLanguage() {
          if (this.isDanish()) return "Danish 🇩🇰";
          if (this.isEnglish()) return "English 🇬🇧";
          if (this.isFrench()) return "French 🇫🇷";
          if (this.isGerman()) return "German 🇩🇪";
          if (this.isSwedish()) return "Swedish 🇸🇪";
          return "🤔";
        }
      }
    };
    const _hoisted_1$1 = { class: "card mb-3" };
    const _hoisted_2$1 = { class: "card-body" };
    const _hoisted_3 = { class: "list-group list-group-flush" };
    const _hoisted_4 = { class: "list-group-item" };
    const _hoisted_5 = { class: "list-group-item" };
    const _hoisted_6 = { class: "list-group-item" };
    const _hoisted_7 = { class: "list-group-item" };
    const _hoisted_8 = { class: "list-group-item" };
    const _hoisted_9 = { class: "card-footer text-white bg-primary" };
    const _hoisted_10 = { class: "lead" };
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          _cache[2] || (_cache[2] = createBaseVNode("h5", { class: "card-title" }, " Detect Language ", -1)),
          withDirectives(createBaseVNode("input", {
            type: "text",
            class: "form-control",
            placeholder: "Enter sentence to detect language",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.sentence = $event),
            onInput: _cache[1] || (_cache[1] = ($event) => $options.predict())
          }, null, 544), [
            [vModelText, $data.sentence]
          ])
        ]),
        createBaseVNode("ul", _hoisted_3, [
          createBaseVNode("li", _hoisted_4, " Log Probability Danish: " + toDisplayString($data.p_da.toFixed(4)), 1),
          createBaseVNode("li", _hoisted_5, " Log Probability English: " + toDisplayString($data.p_en.toFixed(4)), 1),
          createBaseVNode("li", _hoisted_6, " Log Probability French: " + toDisplayString($data.p_fr.toFixed(4)), 1),
          createBaseVNode("li", _hoisted_7, " Log Probability German: " + toDisplayString($data.p_ge.toFixed(4)), 1),
          createBaseVNode("li", _hoisted_8, " Log Probability Swedish: " + toDisplayString($data.p_sw.toFixed(4)), 1)
        ]),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("p", _hoisted_10, [
            _cache[3] || (_cache[3] = createTextVNode("This sentence is ")),
            createBaseVNode("b", null, toDisplayString($options.getLanguage()), 1)
          ])
        ])
      ]);
    }
    const InputSentence = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
    const _hoisted_1 = {
      class: "d-flex flex-column justify-content-center align-items-center",
      style: { "min-height": "100vh" },
      role: "main"
    };
    const _hoisted_2 = { class: "col-md-6 mt-4" };
    const _sfc_main = {
      __name: "app",
      setup(__props) {
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock("main", _hoisted_1, [
            _cache[0] || (_cache[0] = createBaseVNode("h1", { class: "display-4" }, " Natural Language Processing ", -1)),
            _cache[1] || (_cache[1] = createBaseVNode("p", { class: "lead" }, [
              createTextVNode(" Automatic Language Identification using "),
              createBaseVNode("a", { href: "https://en.wikipedia.org/wiki/N-gram" }, "n-gram"),
              createTextVNode(" based models. ")
            ], -1)),
            createBaseVNode("div", _hoisted_2, [
              createVNode(InputSentence)
            ])
          ]);
        };
      }
    };
    createApp(_sfc_main).mount("#app");
  }
});
export default require_index();
