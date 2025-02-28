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
const remove = (arr, el) => {
  const i = arr.indexOf(el);
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
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
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
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
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
  constructor(fn) {
    this.fn = fn;
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
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
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
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
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
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
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
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
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
  constructor(fn, setter, isSSR) {
    this.fn = fn;
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
function watch$1(source, cb, options = EMPTY_OBJ) {
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
    if (cb) {
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
  if (cb && deep) {
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
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
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
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
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
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
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
  if (cb) {
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
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
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
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
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
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
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
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
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
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
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
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
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
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
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
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
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
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
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
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
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
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
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
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
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
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
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
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
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
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
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
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
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
    const el = n2.el = n1.el;
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
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
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
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
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
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
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
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
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
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
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
        let { next, bu, u, parent, vnode } = instance;
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
        if (bu) {
          invokeArrayFns(bu);
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
    const { el, type, transition, children, shapeFlag } = vnode;
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
      hostInsert(el, container, anchor);
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
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
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
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
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
    const { bum, scope, job, subTree, um, m, a } = instance;
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
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
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
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
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
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
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
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
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
    if (cb) {
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
  const watchHandle = watch$1(source, cb, baseWatchOptions);
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
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
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
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
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
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
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
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
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
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const CSS_VAR_TEXT = Symbol("");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
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
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
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
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
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
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
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
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
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
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
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
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
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
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue);
      }
      el[assignKey](domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
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
const nlp = {
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
    text = nlp.sanitize(text);
    for (let i = 0; i <= text.length - n; i++) {
      const ngram = text.slice(i, i + n);
      const f = frequencies[ngram] || 0;
      p2 += nlp.laplaceSmoothing(d, f, s);
    }
    return p2;
  }
};
const total_count$e = 180659;
const probabilities$e = { "cc": 72e-6, "cp": 6e-6, "cv": 0, "cd": 22e-6, "ch": 1273e-6, "ck": 565e-6, "ca": 819e-6, "cs": 11e-6, "cw": 0, "cu": 116e-6, "cz": 22e-6, "ct": 66e-6, "ce": 1234e-6, "cr": 116e-6, "cl": 177e-6, "cj": 0, "cb": 17e-6, "cx": 0, "ci": 476e-6, "cq": 6e-6, "cf": 22e-6, "cg": 6e-6, "cm": 33e-6, "cn": 6e-6, "c ": 271e-6, "cy": 138e-6, "co": 592e-6, "pc": 28e-6, "pp": 498e-6, "pv": 17e-6, "pd": 133e-6, "ph": 26e-5, "pk": 39e-6, "pa": 1245e-6, "ps": 232e-6, "pw": 6e-6, "pu": 365e-6, "pz": 0, "pt": 271e-6, "pe": 1644e-6, "pr": 1854e-6, "pl": 531e-6, "pj": 11e-6, "pb": 55e-6, "px": 0, "pi": 2009e-6, "pq": 0, "pf": 194e-6, "pg": 22e-6, "pm": 17e-6, "pn": 72e-6, "p ": 2768e-6, "py": 33e-6, "po": 1306e-6, "vc": 6e-6, "vp": 22e-6, "vv": 39e-6, "vd": 249e-6, "vh": 11e-6, "vk": 77e-6, "va": 3581e-6, "vs": 443e-6, "vw": 0, "vu": 55e-6, "vz": 0, "vt": 1e-4, "ve": 5912e-6, "vr": 786e-6, "vl": 83e-6, "vj": 11e-6, "vb": 83e-6, "vx": 0, "vi": 2469e-6, "vq": 0, "vf": 33e-6, "vg": 77e-6, "vm": 17e-6, "vn": 83e-5, "v ": 1777e-6, "vy": 28e-6, "vo": 841e-6, "dc": 39e-6, "dp": 44e-6, "dv": 664e-6, "dd": 769e-6, "dh": 199e-6, "dk": 293e-6, "da": 3072e-6, "ds": 3603e-6, "dw": 61e-6, "du": 371e-6, "dz": 6e-6, "dt": 2109e-6, "de": 0.020198, "dr": 1423e-6, "dl": 1262e-6, "dj": 83e-6, "db": 1461e-6, "dx": 0, "di": 1666e-6, "dq": 0, "df": 194e-6, "dg": 459e-6, "dm": 299e-6, "dn": 249e-6, "d ": 7954e-6, "dy": 266e-6, "do": 659e-6, "hc": 33e-6, "hp": 0, "hv": 775e-6, "hd": 22e-6, "hh": 6e-6, "hk": 28e-6, "ha": 4722e-6, "hs": 39e-6, "hw": 5e-5, "hu": 1068e-6, "hz": 6e-6, "ht": 83e-6, "he": 2247e-6, "hr": 653e-6, "hl": 133e-6, "hj": 625e-6, "hb": 11e-6, "hx": 0, "hi": 637e-6, "hq": 0, "hf": 22e-6, "hg": 5e-5, "hm": 105e-6, "hn": 354e-6, "h ": 587e-6, "hy": 127e-6, "ho": 2103e-6, "kc": 6e-6, "kp": 33e-6, "kv": 304e-6, "kd": 89e-6, "kh": 116e-6, "kk": 974e-6, "ka": 3105e-6, "ks": 88e-5, "kw": 0, "ku": 1146e-6, "kz": 6e-6, "kt": 1107e-6, "ke": 5735e-6, "kr": 1572e-6, "kl": 98e-5, "kj": 94e-6, "kb": 376e-6, "kx": 0, "ki": 1627e-6, "kq": 0, "kf": 5e-5, "kg": 55e-6, "km": 52e-5, "kn": 393e-6, "k ": 4622e-6, "ky": 199e-6, "ko": 3072e-6, "ac": 515e-6, "ap": 509e-6, "av": 1749e-6, "ad": 1876e-6, "ah": 183e-6, "ak": 836e-6, "aa": 41e-5, "as": 1904e-6, "aw": 122e-6, "au": 736e-6, "az": 94e-6, "at": 4439e-6, "ae": 205e-6, "ar": 8331e-6, "al": 4755e-6, "aj": 232e-6, "ab": 803e-6, "ax": 77e-6, "ai": 288e-6, "aq": 6e-6, "af": 4113e-6, "ag": 2175e-6, "am": 2851e-6, "an": 0.013678, "a ": 4196e-6, "ay": 166e-6, "ao": 33e-6, "sc": 537e-6, "sp": 2474e-6, "sv": 103e-5, "sd": 232e-6, "sh": 697e-6, "sk": 7605e-6, "sa": 2198e-6, "ss": 1616e-6, "sw": 33e-6, "su": 548e-6, "sz": 33e-6, "st": 0.012117, "se": 522e-5, "sr": 36e-5, "sl": 1157e-6, "sj": 271e-6, "sb": 819e-6, "sx": 0, "si": 3476e-6, "sq": 17e-6, "sf": 155e-6, "sg": 188e-6, "sm": 609e-6, "sn": 509e-6, "s ": 7727e-6, "sy": 1113e-6, "so": 393e-5, "wc": 0, "wp": 0, "wv": 0, "wd": 6e-6, "wh": 28e-6, "wk": 11e-6, "wa": 316e-6, "ws": 44e-6, "ww": 6e-6, "wu": 11e-6, "wz": 6e-6, "wt": 17e-6, "we": 271e-6, "wr": 17e-6, "wl": 6e-6, "wj": 0, "wb": 0, "wx": 0, "wi": 282e-6, "wq": 0, "wf": 6e-6, "wg": 0, "wm": 6e-6, "wn": 28e-6, "w ": 149e-6, "wy": 6e-6, "wo": 133e-6, "uc": 249e-6, "up": 686e-6, "uv": 161e-6, "ud": 191e-5, "uh": 22e-6, "uk": 31e-5, "ua": 194e-6, "us": 1965e-6, "uw": 11e-6, "uu": 22e-6, "uz": 28e-6, "ut": 515e-6, "ue": 841e-6, "ur": 1395e-6, "ul": 935e-6, "uj": 0, "ub": 531e-6, "ux": 22e-6, "ui": 244e-6, "uq": 6e-6, "uf": 127e-6, "ug": 969e-6, "um": 913e-6, "un": 4068e-6, "u ": 371e-6, "uy": 11e-6, "uo": 44e-6, "zc": 6e-6, "zp": 6e-6, "zv": 0, "zd": 0, "zh": 17e-6, "zk": 0, "za": 122e-6, "zs": 11e-6, "zw": 17e-6, "zu": 0, "zz": 61e-6, "zt": 11e-6, "ze": 116e-6, "zr": 6e-6, "zl": 11e-6, "zj": 11e-6, "zb": 6e-6, "zx": 6e-6, "zi": 83e-6, "zq": 0, "zf": 0, "zg": 0, "zm": 22e-6, "zn": 0, "z ": 155e-6, "zy": 28e-6, "zo": 105e-6, "tc": 55e-6, "tp": 33e-6, "tv": 41e-5, "td": 5e-5, "th": 792e-6, "tk": 83e-6, "ta": 3471e-6, "ts": 1046e-6, "tw": 55e-6, "tu": 952e-6, "tz": 77e-6, "tt": 1439e-6, "te": 0.010119, "tr": 388e-5, "tl": 675e-6, "tj": 343e-6, "tb": 221e-6, "tx": 6e-6, "ti": 786e-5, "tq": 0, "tf": 188e-6, "tg": 55e-6, "tm": 194e-6, "tn": 603e-6, "t ": 0.016888, "ty": 98e-5, "to": 243e-5, "ec": 244e-6, "ep": 57e-5, "ev": 1943e-6, "ed": 7096e-6, "eh": 36e-5, "ek": 1107e-6, "ea": 858e-6, "es": 6133e-6, "ew": 1e-4, "eu": 493e-6, "ez": 55e-6, "et": 0.010827, "ee": 232e-6, "er": 0.031097, "el": 6963e-6, "ej": 1124e-6, "eb": 88e-5, "ex": 122e-6, "ei": 57e-5, "eq": 0, "ef": 963e-6, "eg": 1572e-6, "em": 2546e-6, "en": 0.024577, "e ": 0.02259, "ey": 327e-6, "eo": 238e-6, "rc": 188e-6, "rp": 199e-6, "rv": 504e-6, "rd": 3216e-6, "rh": 531e-6, "rk": 2347e-6, "ra": 4766e-6, "rs": 3133e-6, "rw": 11e-6, "ru": 2142e-6, "rz": 44e-6, "rt": 2552e-6, "re": 0.010273, "rr": 119e-5, "rl": 736e-6, "rj": 72e-6, "rb": 88e-5, "rx": 17e-6, "ri": 636e-5, "rq": 0, "rf": 592e-6, "rg": 1744e-6, "rm": 1113e-6, "rn": 243e-5, "r ": 0.02792, "ry": 426e-6, "ro": 3122e-6, "lc": 44e-6, "lp": 172e-6, "lv": 498e-6, "ld": 2419e-6, "lh": 221e-6, "lk": 554e-6, "la": 4926e-6, "ls": 2319e-6, "lw": 22e-6, "lu": 958e-6, "lz": 22e-6, "lt": 1002e-6, "le": 9908e-6, "lr": 238e-6, "ll": 5812e-6, "lj": 161e-6, "lb": 792e-6, "lx": 0, "li": 6327e-6, "lq": 0, "lf": 188e-6, "lg": 692e-6, "lm": 958e-6, "ln": 216e-6, "l ": 5259e-6, "ly": 415e-6, "lo": 1821e-6, "jc": 11e-6, "jp": 0, "jv": 33e-6, "jd": 321e-6, "jh": 28e-6, "jk": 6e-6, "ja": 67e-5, "js": 199e-6, "jw": 0, "ju": 443e-6, "jz": 0, "jt": 39e-6, "je": 1793e-6, "jr": 205e-6, "jl": 382e-6, "jj": 6e-6, "jb": 33e-6, "jx": 0, "ji": 77e-6, "jq": 0, "jf": 17e-6, "jg": 22e-6, "jm": 5e-5, "jn": 83e-6, "j ": 493e-6, "jy": 216e-6, "jo": 637e-6, "bc": 11e-6, "bp": 6e-6, "bv": 0, "bd": 155e-6, "bh": 17e-6, "bk": 127e-6, "ba": 1948e-6, "bs": 194e-6, "bw": 0, "bu": 637e-6, "bz": 0, "bt": 111e-6, "be": 4129e-6, "br": 1777e-6, "bl": 233e-5, "bj": 349e-6, "bb": 244e-6, "bx": 0, "bi": 875e-6, "bq": 0, "bf": 0, "bg": 28e-6, "bm": 5e-5, "bn": 138e-6, "b ": 47e-5, "by": 2469e-6, "bo": 1766e-6, "xc": 0, "xp": 0, "xv": 0, "xd": 0, "xh": 0, "xk": 0, "xa": 5e-5, "xs": 6e-6, "xw": 0, "xu": 0, "xz": 0, "xt": 11e-6, "xe": 66e-6, "xr": 0, "xl": 6e-6, "xj": 0, "xb": 0, "xx": 0, "xi": 5e-5, "xq": 0, "xf": 11e-6, "xg": 0, "xm": 6e-6, "xn": 6e-6, "x ": 205e-6, "xy": 6e-6, "xo": 28e-6, "ic": 808e-6, "ip": 194e-6, "iv": 1257e-6, "id": 2662e-6, "ih": 77e-6, "ik": 2817e-6, "ia": 1013e-6, "is": 4478e-6, "iw": 11e-6, "iu": 232e-6, "iz": 66e-6, "it": 2026e-6, "ie": 2292e-6, "ir": 1312e-6, "il": 7107e-6, "ij": 44e-6, "ib": 393e-6, "ix": 55e-6, "ii": 72e-6, "iq": 17e-6, "if": 448e-6, "ig": 5286e-6, "im": 509e-6, "in": 8657e-6, "i ": 967e-5, "iy": 17e-6, "io": 2352e-6, "qc": 0, "qp": 0, "qv": 6e-6, "qd": 0, "qh": 0, "qk": 0, "qa": 17e-6, "qs": 0, "qw": 0, "qu": 77e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 22e-6, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 6e-6, "qy": 0, "qo": 0, "fc": 122e-6, "fp": 0, "fv": 28e-6, "fd": 172e-6, "fh": 72e-6, "fk": 28e-6, "fa": 991e-6, "fs": 1e-4, "fw": 0, "fu": 349e-6, "fz": 0, "ft": 952e-6, "fe": 841e-6, "fr": 336e-5, "fl": 919e-6, "fj": 288e-6, "fb": 17e-6, "fx": 22e-6, "fi": 1334e-6, "fq": 0, "ff": 404e-6, "fg": 28e-6, "fm": 39e-6, "fn": 22e-6, "f ": 377e-5, "fy": 282e-6, "fo": 5292e-6, "gc": 28e-6, "gp": 17e-6, "gv": 61e-6, "gd": 149e-6, "gh": 371e-6, "gk": 5e-5, "ga": 1367e-6, "gs": 1478e-6, "gw": 11e-6, "gu": 709e-6, "gz": 6e-6, "gt": 1461e-6, "ge": 8773e-6, "gr": 1832e-6, "gl": 769e-6, "gj": 83e-6, "gb": 149e-6, "gx": 0, "gi": 1162e-6, "gq": 6e-6, "gf": 61e-6, "gg": 2026e-6, "gm": 72e-6, "gn": 1328e-6, "g ": 0.010788, "gy": 161e-6, "go": 542e-6, "mc": 17e-6, "mp": 493e-6, "mv": 28e-6, "md": 55e-6, "mh": 61e-6, "mk": 266e-6, "ma": 3498e-6, "ms": 548e-6, "mw": 33e-6, "mu": 1439e-6, "mz": 6e-6, "mt": 531e-6, "me": 7057e-6, "mr": 664e-6, "ml": 62e-5, "mj": 22e-6, "mb": 531e-6, "mx": 0, "mi": 1959e-6, "mq": 0, "mf": 227e-6, "mg": 44e-6, "mm": 2159e-6, "mn": 31e-5, "m ": 5242e-6, "my": 105e-6, "mo": 145e-5, "nc": 316e-6, "np": 77e-6, "nv": 26e-5, "nd": 0.011137, "nh": 421e-6, "nk": 648e-6, "na": 2048e-6, "ns": 6033e-6, "nw": 22e-6, "nu": 498e-6, "nz": 66e-6, "nt": 2679e-6, "ne": 7628e-6, "nr": 581e-6, "nl": 371e-6, "nj": 105e-6, "nb": 41e-5, "nx": 22e-6, "ni": 3011e-6, "nq": 0, "nf": 216e-6, "ng": 5569e-6, "nm": 432e-6, "nn": 1362e-6, "n ": 0.022329, "ny": 465e-6, "no": 1854e-6, " c": 2281e-6, " p": 5784e-6, " v": 6067e-6, " d": 0.011392, " h": 8458e-6, " k": 7329e-6, " a": 9654e-6, " s": 0.01613, " w": 625e-6, " u": 2386e-6, " z": 172e-6, " t": 7445e-6, " e": 0.015842, " r": 3786e-6, " l": 4522e-6, " j": 1793e-6, " b": 8491e-6, " x": 17e-6, " i": 0.010855, " q": 61e-6, " f": 0.01044, " g": 3421e-6, " m": 8137e-6, " n": 3714e-6, "  ": 6914e-6, " y": 249e-6, " o": 0.010157, "yc": 22e-6, "yp": 116e-6, "yv": 39e-6, "yd": 1201e-6, "yh": 22e-6, "yk": 31e-5, "ya": 155e-6, "ys": 958e-6, "yw": 17e-6, "yu": 17e-6, "yz": 6e-6, "yt": 304e-6, "ye": 736e-6, "yr": 454e-6, "yl": 448e-6, "yj": 0, "yb": 111e-6, "yx": 0, "yi": 22e-6, "yq": 0, "yf": 22e-6, "yg": 963e-6, "ym": 221e-6, "yn": 393e-6, "y ": 16e-4, "yy": 0, "yo": 21e-5, "oc": 432e-6, "op": 1666e-6, "ov": 1661e-6, "od": 207e-5, "oh": 244e-6, "ok": 653e-6, "oa": 66e-6, "os": 1168e-6, "ow": 133e-6, "ou": 78e-5, "oz": 17e-6, "ot": 692e-6, "oe": 271e-6, "or": 9626e-6, "ol": 4251e-6, "oj": 33e-6, "ob": 515e-6, "ox": 83e-6, "oi": 61e-6, "oq": 11e-6, "of": 736e-6, "og": 801e-5, "om": 5491e-6, "on": 4533e-6, "o ": 14e-4, "oy": 116e-6, "oo": 205e-6 };
const bigram_da = {
  total_count: total_count$e,
  probabilities: probabilities$e
};
const total_count$d = 174931;
const probabilities$d = { "cc": 366e-6, "cp": 11e-6, "cv": 0, "cd": 11e-6, "ch": 4144e-6, "ck": 1138e-6, "ca": 4265e-6, "cs": 297e-6, "cw": 17e-6, "cu": 777e-6, "cz": 29e-6, "ct": 243e-5, "ce": 3939e-6, "cr": 897e-6, "cl": 909e-6, "cj": 0, "cb": 34e-6, "cx": 0, "ci": 2367e-6, "cq": 6e-6, "cf": 17e-6, "cg": 0, "cm": 29e-6, "cn": 4e-5, "c ": 1732e-6, "cy": 24e-5, "co": 5231e-6, "pc": 17e-6, "pp": 589e-6, "pv": 6e-6, "pd": 17e-6, "ph": 697e-6, "pk": 29e-6, "pa": 2853e-6, "ps": 32e-5, "pw": 17e-6, "pu": 886e-6, "pz": 0, "pt": 463e-6, "pe": 2675e-6, "pr": 2612e-6, "pl": 1475e-6, "pj": 0, "pb": 23e-6, "px": 0, "pi": 1246e-6, "pq": 0, "pf": 6e-6, "pg": 17e-6, "pm": 29e-6, "pn": 23e-6, "p ": 903e-6, "py": 63e-6, "po": 1835e-6, "vc": 17e-6, "vp": 0, "vv": 6e-6, "vd": 0, "vh": 0, "vk": 6e-6, "va": 955e-6, "vs": 23e-6, "vw": 0, "vu": 17e-6, "vz": 0, "vt": 0, "ve": 3784e-6, "vr": 4e-5, "vl": 29e-6, "vj": 0, "vb": 0, "vx": 0, "vi": 2269e-6, "vq": 0, "vf": 0, "vg": 23e-6, "vm": 0, "vn": 23e-6, "v ": 177e-6, "vy": 91e-6, "vo": 389e-6, "dc": 86e-6, "dp": 34e-6, "dv": 103e-6, "dd": 246e-6, "dh": 57e-6, "dk": 17e-6, "da": 1435e-6, "ds": 692e-6, "dw": 86e-6, "du": 938e-6, "dz": 17e-6, "dt": 57e-6, "de": 4962e-6, "dr": 492e-6, "dl": 154e-6, "dj": 29e-6, "db": 109e-6, "dx": 0, "di": 3401e-6, "dq": 46e-6, "df": 17e-6, "dg": 183e-6, "dm": 194e-6, "dn": 63e-6, "d ": 0.016298, "dy": 28e-5, "do": 932e-6, "hc": 17e-6, "hp": 57e-6, "hv": 17e-6, "hd": 46e-6, "hh": 29e-6, "hk": 57e-6, "ha": 3413e-6, "hs": 114e-6, "hw": 263e-6, "hu": 646e-6, "hz": 0, "ht": 514e-6, "he": 0.017538, "hr": 463e-6, "hl": 223e-6, "hj": 0, "hb": 86e-6, "hx": 0, "hi": 3699e-6, "hq": 34e-6, "hf": 34e-6, "hg": 17e-6, "hm": 63e-6, "hn": 274e-6, "h ": 4756e-6, "hy": 28e-5, "ho": 3013e-6, "kc": 11e-6, "kp": 0, "kv": 0, "kd": 23e-6, "kh": 194e-6, "kk": 23e-6, "ka": 537e-6, "ks": 274e-6, "kw": 34e-6, "ku": 154e-6, "kz": 0, "kt": 51e-6, "ke": 1115e-6, "kr": 91e-6, "kl": 131e-6, "kj": 6e-6, "kb": 29e-6, "kx": 0, "ki": 749e-6, "kq": 0, "kf": 23e-6, "kg": 17e-6, "km": 149e-6, "kn": 446e-6, "k ": 1732e-6, "ky": 166e-6, "ko": 423e-6, "ac": 2624e-6, "ap": 1166e-6, "av": 646e-6, "ad": 2252e-6, "ah": 229e-6, "ak": 783e-6, "aa": 234e-6, "as": 8683e-6, "aw": 343e-6, "au": 875e-6, "az": 303e-6, "at": 8483e-6, "ae": 474e-6, "ar": 8152e-6, "al": 8443e-6, "aj": 263e-6, "ab": 1092e-6, "ax": 8e-5, "ai": 1972e-6, "aq": 4e-5, "af": 537e-6, "ag": 1361e-6, "am": 383e-5, "an": 0.015766, "a ": 9347e-6, "ay": 1561e-6, "ao": 51e-6, "sc": 1212e-6, "sp": 1035e-6, "sv": 69e-6, "sd": 97e-6, "sh": 2847e-6, "sk": 326e-6, "sa": 1383e-6, "ss": 1966e-6, "sw": 189e-6, "su": 1366e-6, "sz": 34e-6, "st": 8712e-6, "se": 5448e-6, "sr": 8e-5, "sl": 514e-6, "sj": 11e-6, "sb": 74e-6, "sx": 0, "si": 4116e-6, "sq": 109e-6, "sf": 51e-6, "sg": 6e-6, "sm": 372e-6, "sn": 63e-6, "s ": 0.023489, "sy": 292e-6, "so": 279e-5, "wc": 29e-6, "wp": 6e-6, "wv": 0, "wd": 11e-6, "wh": 1343e-6, "wk": 6e-6, "wa": 3893e-6, "ws": 177e-6, "ww": 11e-6, "wu": 6e-6, "wz": 0, "wt": 23e-6, "we": 1778e-6, "wr": 326e-6, "wl": 86e-6, "wj": 0, "wb": 11e-6, "wx": 0, "wi": 1749e-6, "wq": 0, "wf": 23e-6, "wg": 0, "wm": 6e-6, "wn": 96e-5, "w ": 886e-6, "wy": 29e-6, "wo": 1166e-6, "uc": 903e-6, "up": 492e-6, "uv": 86e-6, "ud": 857e-6, "uh": 34e-6, "uk": 223e-6, "ua": 823e-6, "us": 2984e-6, "uw": 17e-6, "uu": 17e-6, "uz": 74e-6, "ut": 1869e-6, "ue": 955e-6, "ur": 2801e-6, "ul": 1332e-6, "uj": 4e-5, "ub": 955e-6, "ux": 29e-6, "ui": 806e-6, "uq": 46e-6, "uf": 8e-5, "ug": 577e-6, "um": 1303e-6, "un": 3636e-6, "u ": 383e-6, "uy": 23e-6, "uo": 63e-6, "zc": 23e-6, "zp": 0, "zv": 6e-6, "zd": 6e-6, "zh": 63e-6, "zk": 6e-6, "za": 212e-6, "zs": 23e-6, "zw": 11e-6, "zu": 46e-6, "zz": 8e-5, "zt": 0, "ze": 412e-6, "zr": 0, "zl": 23e-6, "zj": 0, "zb": 11e-6, "zx": 0, "zi": 194e-6, "zq": 6e-6, "zf": 0, "zg": 6e-6, "zm": 0, "zn": 6e-6, "z ": 229e-6, "zy": 63e-6, "zo": 183e-6, "tc": 309e-6, "tp": 17e-6, "tv": 63e-6, "td": 29e-6, "th": 0.018899, "tk": 29e-6, "ta": 4087e-6, "ts": 1721e-6, "tw": 68e-5, "tu": 1669e-6, "tz": 57e-6, "tt": 1075e-6, "te": 85e-4, "tr": 3281e-6, "tl": 743e-6, "tj": 6e-6, "tb": 383e-6, "tx": 6e-6, "ti": 6808e-6, "tq": 0, "tf": 29e-6, "tg": 23e-6, "tm": 171e-6, "tn": 91e-6, "t ": 0.01109, "ty": 1978e-6, "to": 5265e-6, "ec": 2675e-6, "ep": 1195e-6, "ev": 1321e-6, "ed": 8603e-6, "eh": 166e-6, "ek": 257e-6, "ea": 4265e-6, "es": 8152e-6, "ew": 692e-6, "eu": 274e-6, "ez": 103e-6, "et": 2412e-6, "ee": 1601e-6, "er": 0.013154, "el": 379e-5, "ej": 51e-6, "eb": 452e-6, "ex": 835e-6, "ei": 932e-6, "eq": 8e-5, "ef": 589e-6, "eg": 983e-6, "em": 2155e-6, "en": 8169e-6, "e ": 0.028154, "ey": 732e-6, "eo": 577e-6, "rc": 732e-6, "rp": 349e-6, "rv": 572e-6, "rd": 1412e-6, "rh": 12e-5, "rk": 772e-6, "ra": 5362e-6, "rs": 239e-5, "rw": 166e-6, "ru": 926e-6, "rz": 8e-5, "rt": 2881e-6, "re": 9249e-6, "rr": 835e-6, "rl": 737e-6, "rj": 29e-6, "rb": 349e-6, "rx": 46e-6, "ri": 6746e-6, "rq": 11e-6, "rf": 263e-6, "rg": 726e-6, "rm": 1281e-6, "rn": 1458e-6, "r ": 9049e-6, "ry": 1532e-6, "ro": 5231e-6, "lc": 8e-5, "lp": 149e-6, "lv": 126e-6, "ld": 1155e-6, "lh": 69e-6, "lk": 12e-5, "la": 5202e-6, "ls": 1029e-6, "lw": 149e-6, "lu": 96e-5, "lz": 11e-6, "lt": 72e-5, "le": 5476e-6, "lr": 4e-5, "ll": 3882e-6, "lj": 6e-6, "lb": 537e-6, "lx": 6e-6, "li": 4676e-6, "lq": 0, "lf": 206e-6, "lg": 114e-6, "lm": 686e-6, "ln": 29e-6, "l ": 5962e-6, "ly": 2367e-6, "lo": 259e-5, "jc": 6e-6, "jp": 6e-6, "jv": 0, "jd": 6e-6, "jh": 4e-5, "jk": 6e-6, "ja": 709e-6, "js": 0, "jw": 6e-6, "ju": 412e-6, "jz": 0, "jt": 0, "je": 229e-6, "jr": 23e-6, "jl": 6e-6, "jj": 0, "jb": 0, "jx": 0, "ji": 131e-6, "jq": 0, "jf": 0, "jg": 6e-6, "jm": 0, "jn": 6e-6, "j ": 74e-6, "jy": 6e-6, "jo": 709e-6, "bc": 86e-6, "bp": 23e-6, "bv": 6e-6, "bd": 29e-6, "bh": 57e-6, "bk": 0, "ba": 2275e-6, "bs": 24e-5, "bw": 17e-6, "bu": 1623e-6, "bz": 0, "bt": 29e-6, "be": 3138e-6, "br": 1195e-6, "bl": 1143e-6, "bj": 4e-5, "bb": 12e-5, "bx": 0, "bi": 1012e-6, "bq": 0, "bf": 6e-6, "bg": 0, "bm": 4e-5, "bn": 46e-6, "b ": 394e-6, "by": 2172e-6, "bo": 1246e-6, "xc": 8e-5, "xp": 126e-6, "xv": 11e-6, "xd": 0, "xh": 34e-6, "xk": 0, "xa": 131e-6, "xs": 17e-6, "xw": 0, "xu": 17e-6, "xz": 0, "xt": 189e-6, "xe": 109e-6, "xr": 6e-6, "xl": 6e-6, "xj": 0, "xb": 6e-6, "xx": 11e-6, "xi": 303e-6, "xq": 0, "xf": 11e-6, "xg": 0, "xm": 0, "xn": 0, "x ": 32e-5, "xy": 29e-6, "xo": 74e-6, "ic": 5711e-6, "ip": 1046e-6, "iv": 1801e-6, "id": 1383e-6, "ih": 4e-5, "ik": 246e-6, "ia": 3544e-6, "is": 0.010313, "iw": 63e-6, "iu": 194e-6, "iz": 343e-6, "it": 7769e-6, "ie": 2532e-6, "ir": 2281e-6, "il": 3944e-6, "ij": 8e-5, "ib": 652e-6, "ix": 143e-6, "ii": 183e-6, "iq": 91e-6, "if": 657e-6, "ig": 1641e-6, "im": 1155e-6, "in": 0.016578, "i ": 1406e-6, "iy": 57e-6, "io": 5088e-6, "qc": 0, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 6e-6, "qa": 23e-6, "qs": 0, "qw": 0, "qu": 64e-5, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 17e-6, "qq": 6e-6, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 34e-6, "qy": 0, "qo": 0, "fc": 57e-6, "fp": 0, "fv": 0, "fd": 11e-6, "fh": 0, "fk": 0, "fa": 1012e-6, "fs": 6e-6, "fw": 0, "fu": 206e-6, "fz": 0, "ft": 446e-6, "fe": 1441e-6, "fr": 1509e-6, "fl": 343e-6, "fj": 0, "fb": 17e-6, "fx": 0, "fi": 2195e-6, "fq": 0, "ff": 537e-6, "fg": 11e-6, "fm": 17e-6, "fn": 0, "f ": 6866e-6, "fy": 6e-6, "fo": 2915e-6, "gc": 23e-6, "gp": 6e-6, "gv": 0, "gd": 57e-6, "gh": 1018e-6, "gk": 0, "ga": 1572e-6, "gs": 286e-6, "gw": 57e-6, "gu": 823e-6, "gz": 6e-6, "gt": 74e-6, "ge": 2875e-6, "gr": 1e-3, "gl": 726e-6, "gj": 0, "gb": 74e-6, "gx": 0, "gi": 1389e-6, "gq": 0, "gf": 11e-6, "gg": 12e-5, "gm": 97e-6, "gn": 337e-6, "g ": 371e-5, "gy": 183e-6, "go": 697e-6, "mc": 46e-6, "mp": 1429e-6, "mv": 0, "md": 11e-6, "mh": 6e-6, "mk": 11e-6, "ma": 4402e-6, "ms": 383e-6, "mw": 17e-6, "mu": 1138e-6, "mz": 6e-6, "mt": 6e-6, "me": 5556e-6, "mr": 11e-6, "ml": 86e-6, "mj": 0, "mb": 112e-5, "mx": 17e-6, "mi": 2475e-6, "mq": 0, "mf": 23e-6, "mg": 17e-6, "mm": 817e-6, "mn": 74e-6, "m ": 3281e-6, "my": 343e-6, "mo": 2138e-6, "nc": 2367e-6, "np": 23e-6, "nv": 12e-5, "nd": 8855e-6, "nh": 97e-6, "nk": 292e-6, "na": 4465e-6, "ns": 2904e-6, "nw": 103e-6, "nu": 737e-6, "nz": 114e-6, "nt": 5734e-6, "ne": 4407e-6, "nr": 86e-6, "nl": 354e-6, "nj": 109e-6, "nb": 166e-6, "nx": 23e-6, "ni": 3384e-6, "nq": 11e-6, "nf": 32e-5, "ng": 5488e-6, "nm": 217e-6, "nn": 766e-6, "n ": 0.019831, "ny": 583e-6, "no": 2487e-6, " c": 9375e-6, " p": 7323e-6, " v": 1549e-6, " d": 4539e-6, " h": 5151e-6, " k": 1623e-6, " a": 0.021506, " s": 0.011587, " w": 7763e-6, " u": 1812e-6, " z": 28e-5, " t": 0.021271, " e": 3378e-6, " r": 5591e-6, " l": 4156e-6, " j": 1629e-6, " b": 8055e-6, " x": 8e-5, " i": 0.015538, " q": 234e-6, " f": 6986e-6, " g": 3041e-6, " m": 6791e-6, " n": 375e-5, "  ": 6465e-6, " y": 743e-6, " o": 0.011496, "yc": 217e-6, "yp": 177e-6, "yv": 0, "yd": 143e-6, "yh": 11e-6, "yk": 23e-6, "ya": 52e-5, "ys": 497e-6, "yw": 69e-6, "yu": 57e-6, "yz": 6e-6, "yt": 8e-5, "ye": 726e-6, "yr": 223e-6, "yl": 32e-5, "yj": 0, "yb": 69e-6, "yx": 11e-6, "yi": 126e-6, "yq": 0, "yf": 11e-6, "yg": 6e-6, "ym": 252e-6, "yn": 189e-6, "y ": 9804e-6, "yy": 6e-6, "yo": 423e-6, "oc": 1858e-6, "op": 1543e-6, "ov": 1343e-6, "od": 1126e-6, "oh": 309e-6, "ok": 383e-6, "oa": 514e-6, "os": 1572e-6, "ow": 1755e-6, "ou": 419e-5, "oz": 63e-6, "ot": 1721e-6, "oe": 69e-6, "or": 8112e-6, "ol": 279e-5, "oj": 8e-5, "ob": 509e-6, "ox": 194e-6, "oi": 457e-6, "oq": 6e-6, "of": 7157e-6, "og": 76e-5, "om": 3761e-6, "on": 0.01125, "o ": 5345e-6, "oy": 143e-6, "oo": 1309e-6 };
const bigram_en = {
  total_count: total_count$d,
  probabilities: probabilities$d
};
const total_count$c = 168515;
const probabilities$c = { "cc": 398e-6, "cp": 6e-6, "cv": 12e-6, "cd": 83e-6, "ch": 3614e-6, "ck": 451e-6, "ca": 2967e-6, "cs": 172e-6, "cw": 0, "cu": 843e-6, "cz": 47e-6, "ct": 1846e-6, "ce": 3934e-6, "cr": 1062e-6, "cl": 884e-6, "cj": 0, "cb": 0, "cx": 0, "ci": 2581e-6, "cq": 3e-5, "cf": 18e-6, "cg": 6e-6, "cm": 6e-6, "cn": 131e-6, "c ": 1175e-6, "cy": 119e-6, "co": 5768e-6, "pc": 498e-6, "pp": 742e-6, "pv": 18e-6, "pd": 53e-6, "ph": 813e-6, "pk": 12e-6, "pa": 4836e-6, "ps": 267e-6, "pw": 0, "pu": 1092e-6, "pz": 6e-6, "pt": 926e-6, "pe": 2403e-6, "pr": 2967e-6, "pl": 1418e-6, "pj": 12e-6, "pb": 18e-6, "px": 0, "pi": 1169e-6, "pq": 0, "pf": 18e-6, "pg": 0, "pm": 18e-6, "pn": 59e-6, "p ": 231e-6, "py": 42e-6, "po": 3958e-6, "vc": 36e-6, "vp": 0, "vv": 0, "vd": 6e-6, "vh": 18e-6, "vk": 12e-6, "va": 14e-4, "vs": 24e-6, "vw": 0, "vu": 36e-6, "vz": 6e-6, "vt": 24e-6, "ve": 3074e-6, "vr": 694e-6, "vl": 3e-5, "vj": 0, "vb": 0, "vx": 0, "vi": 3394e-6, "vq": 47e-6, "vf": 6e-6, "vg": 3e-5, "vm": 6e-6, "vn": 59e-6, "v ": 285e-6, "vy": 47e-6, "vo": 1056e-6, "dc": 404e-6, "dp": 641e-6, "dv": 107e-6, "dd": 113e-6, "dh": 231e-6, "dk": 0, "da": 5388e-6, "ds": 386e-6, "dw": 47e-6, "du": 4065e-6, "dz": 24e-6, "dt": 255e-6, "de": 0.018592, "dr": 872e-6, "dl": 125e-6, "dj": 71e-6, "db": 136e-6, "dx": 6e-6, "di": 2825e-6, "dq": 6e-6, "df": 95e-6, "dg": 77e-6, "dm": 344e-6, "dn": 65e-6, "d ": 2249e-6, "dy": 83e-6, "do": 184e-5, "hc": 12e-6, "hp": 0, "hv": 6e-6, "hd": 47e-6, "hh": 0, "hk": 18e-6, "ha": 254e-5, "hs": 53e-6, "hw": 65e-6, "hu": 51e-5, "hz": 0, "ht": 368e-6, "he": 178e-5, "hr": 386e-6, "hl": 125e-6, "hj": 12e-6, "hb": 12e-6, "hx": 0, "hi": 1851e-6, "hq": 83e-6, "hf": 12e-6, "hg": 0, "hm": 166e-6, "hn": 261e-6, "h ": 593e-6, "hy": 107e-6, "ho": 1543e-6, "kc": 0, "kp": 6e-6, "kv": 0, "kd": 6e-6, "kh": 101e-6, "kk": 3e-5, "ka": 463e-6, "ks": 89e-6, "kw": 6e-6, "ku": 119e-6, "kz": 0, "kt": 36e-6, "ke": 493e-6, "kr": 107e-6, "kl": 119e-6, "kj": 0, "kb": 0, "kx": 12e-6, "ki": 409e-6, "kq": 0, "kf": 18e-6, "kg": 12e-6, "km": 267e-6, "kn": 24e-6, "k ": 564e-6, "ky": 59e-6, "ko": 362e-6, "ac": 1851e-6, "ap": 1395e-6, "av": 146e-5, "ad": 1169e-6, "ah": 202e-6, "ak": 285e-6, "aa": 119e-6, "as": 2308e-6, "aw": 131e-6, "au": 4706e-6, "az": 267e-6, "at": 5157e-6, "ae": 617e-6, "ar": 7619e-6, "al": 6308e-6, "aj": 113e-6, "ab": 1169e-6, "ax": 119e-6, "ai": 6177e-6, "aq": 231e-6, "af": 415e-6, "ag": 1751e-6, "am": 2558e-6, "an": 0.013269, "a ": 0.010444, "ay": 546e-6, "ao": 368e-6, "sc": 1027e-6, "sp": 1193e-6, "sv": 53e-6, "sd": 178e-6, "sh": 593e-6, "sk": 32e-5, "sa": 257e-5, "ss": 2795e-6, "sw": 59e-6, "su": 2397e-6, "sz": 107e-6, "st": 0.011779, "se": 6142e-6, "sr": 16e-5, "sl": 386e-6, "sj": 6e-6, "sb": 166e-6, "sx": 6e-6, "si": 4546e-6, "sq": 225e-6, "sf": 95e-6, "sg": 53e-6, "sm": 279e-6, "sn": 142e-6, "s ": 0.021725, "sy": 243e-6, "so": 2759e-6, "wc": 6e-6, "wp": 0, "wv": 0, "wd": 0, "wh": 12e-6, "wk": 12e-6, "wa": 54e-5, "ws": 47e-6, "ww": 0, "wu": 24e-6, "wz": 6e-6, "wt": 24e-6, "we": 255e-6, "wr": 6e-6, "wl": 0, "wj": 0, "wb": 6e-6, "wx": 0, "wi": 522e-6, "wq": 0, "wf": 6e-6, "wg": 12e-6, "wm": 0, "wn": 119e-6, "w ": 338e-6, "wy": 6e-6, "wo": 184e-6, "uc": 635e-6, "up": 665e-6, "uv": 938e-6, "ud": 991e-6, "uh": 59e-6, "uk": 101e-6, "ua": 855e-6, "us": 308e-5, "uw": 12e-6, "uu": 36e-6, "uz": 83e-6, "ut": 1899e-6, "ue": 6077e-6, "ur": 6261e-6, "ul": 1638e-6, "uj": 65e-6, "ub": 712e-6, "ux": 1217e-6, "ui": 2908e-6, "uq": 24e-6, "uf": 113e-6, "ug": 487e-6, "um": 742e-6, "un": 9127e-6, "u ": 7026e-6, "uy": 71e-6, "uo": 77e-6, "zc": 18e-6, "zp": 0, "zv": 6e-6, "zd": 6e-6, "zh": 24e-6, "zk": 18e-6, "za": 249e-6, "zs": 18e-6, "zw": 65e-6, "zu": 77e-6, "zz": 71e-6, "zt": 6e-6, "ze": 237e-6, "zr": 6e-6, "zl": 77e-6, "zj": 0, "zb": 36e-6, "zx": 0, "zi": 178e-6, "zq": 0, "zf": 0, "zg": 18e-6, "zm": 6e-6, "zn": 36e-6, "z ": 261e-6, "zy": 83e-6, "zo": 291e-6, "tc": 267e-6, "tp": 95e-6, "tv": 24e-6, "td": 18e-6, "th": 1086e-6, "tk": 12e-6, "ta": 4985e-6, "ts": 1679e-6, "tw": 6e-6, "tu": 2694e-6, "tz": 59e-6, "tt": 1027e-6, "te": 8302e-6, "tr": 4332e-6, "tl": 291e-6, "tj": 36e-6, "tb": 297e-6, "tx": 0, "ti": 6195e-6, "tq": 18e-6, "tf": 47e-6, "tg": 142e-6, "tm": 172e-6, "tn": 89e-6, "t ": 0.023025, "ty": 32e-5, "to": 267e-5, "ec": 1721e-6, "ep": 1003e-6, "ev": 57e-5, "ed": 582e-6, "eh": 101e-6, "ek": 77e-6, "ea": 1211e-6, "es": 0.019256, "ew": 279e-6, "eu": 375e-5, "ez": 172e-6, "et": 5845e-6, "ee": 279e-6, "er": 7216e-6, "el": 4006e-6, "ej": 83e-6, "eb": 22e-5, "ex": 576e-6, "ei": 985e-6, "eq": 59e-6, "ef": 392e-6, "eg": 344e-6, "em": 4225e-6, "en": 0.013263, "e ": 0.056968, "ey": 356e-6, "eo": 196e-6, "rc": 1104e-6, "rp": 433e-6, "rv": 404e-6, "rd": 1205e-6, "rh": 166e-6, "rk": 279e-6, "ra": 6124e-6, "rs": 2807e-6, "rw": 12e-6, "ru": 938e-6, "rz": 107e-6, "rt": 4059e-6, "re": 0.010278, "rr": 146e-5, "rl": 593e-6, "rj": 24e-6, "rb": 225e-6, "rx": 0, "ri": 629e-5, "rq": 178e-6, "rf": 243e-6, "rg": 1573e-6, "rm": 979e-6, "rn": 1015e-6, "r ": 7596e-6, "ry": 255e-6, "ro": 489e-5, "lc": 237e-6, "lp": 285e-6, "lv": 225e-6, "ld": 285e-6, "lh": 38e-5, "lk": 77e-6, "la": 0.011032, "ls": 528e-6, "lw": 12e-6, "lu": 2059e-6, "lz": 3e-5, "lt": 843e-6, "le": 0.016319, "lr": 77e-6, "ll": 597e-5, "lj": 6e-6, "lb": 237e-6, "lx": 0, "li": 5626e-6, "lq": 59e-6, "lf": 119e-6, "lg": 516e-6, "lm": 427e-6, "ln": 16e-5, "l ": 4379e-6, "ly": 433e-6, "lo": 3104e-6, "jc": 3e-5, "jp": 0, "jv": 6e-6, "jd": 6e-6, "jh": 0, "jk": 0, "ja": 766e-6, "js": 18e-6, "jw": 0, "ju": 676e-6, "jz": 12e-6, "jt": 0, "je": 498e-6, "jr": 42e-6, "jl": 12e-6, "jj": 0, "jb": 0, "jx": 0, "ji": 89e-6, "jq": 0, "jf": 0, "jg": 0, "jm": 0, "jn": 3e-5, "j ": 71e-6, "jy": 6e-6, "jo": 872e-6, "bc": 42e-6, "bp": 6e-6, "bv": 0, "bd": 59e-6, "bh": 18e-6, "bk": 6e-6, "ba": 1846e-6, "bs": 125e-6, "bw": 3e-5, "bu": 611e-6, "bz": 18e-6, "bt": 89e-6, "be": 1145e-6, "br": 219e-5, "bl": 866e-6, "bj": 47e-6, "bb": 77e-6, "bx": 0, "bi": 1038e-6, "bq": 0, "bf": 6e-6, "bg": 6e-6, "bm": 6e-6, "bn": 47e-6, "b ": 202e-6, "by": 113e-6, "bo": 1015e-6, "xc": 47e-6, "xp": 166e-6, "xv": 65e-6, "xd": 0, "xh": 0, "xk": 0, "xa": 59e-6, "xs": 6e-6, "xw": 0, "xu": 3e-5, "xz": 0, "xt": 113e-6, "xe": 237e-6, "xr": 6e-6, "xl": 0, "xj": 0, "xb": 6e-6, "xx": 18e-6, "xi": 398e-6, "xq": 0, "xf": 12e-6, "xg": 6e-6, "xm": 6e-6, "xn": 18e-6, "x ": 1406e-6, "xy": 42e-6, "xo": 12e-6, "ic": 3394e-6, "ip": 92e-5, "iv": 1311e-6, "id": 1264e-6, "ih": 3e-5, "ik": 196e-6, "ia": 1555e-6, "is": 7952e-6, "iw": 3e-5, "iu": 184e-6, "iz": 89e-6, "it": 7109e-6, "ie": 6759e-6, "ir": 311e-5, "il": 5976e-6, "ij": 42e-6, "ib": 32e-5, "ix": 291e-6, "ii": 225e-6, "iq": 2237e-6, "if": 694e-6, "ig": 1264e-6, "im": 1234e-6, "in": 8189e-6, "i ": 3044e-6, "iy": 3e-5, "io": 3869e-6, "qc": 0, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 0, "qa": 12e-6, "qs": 0, "qw": 0, "qu": 5003e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 6e-6, "ql": 6e-6, "qj": 0, "qb": 0, "qx": 0, "qi": 0, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 3e-5, "qy": 0, "qo": 12e-6, "fc": 36e-6, "fp": 12e-6, "fv": 172e-6, "fd": 24e-6, "fh": 6e-6, "fk": 0, "fa": 1145e-6, "fs": 42e-6, "fw": 6e-6, "fu": 32e-5, "fz": 0, "ft": 24e-6, "fe": 706e-6, "fr": 2024e-6, "fl": 487e-6, "fj": 0, "fb": 6e-6, "fx": 0, "fi": 997e-6, "fq": 0, "ff": 593e-6, "fg": 24e-6, "fm": 77e-6, "fn": 12e-6, "f ": 504e-6, "fy": 0, "fo": 143e-5, "gc": 59e-6, "gp": 12e-6, "gv": 6e-6, "gd": 53e-6, "gh": 231e-6, "gk": 6e-6, "ga": 13e-4, "gs": 107e-6, "gw": 6e-6, "gu": 105e-5, "gz": 0, "gt": 208e-6, "ge": 2249e-6, "gr": 1377e-6, "gl": 593e-6, "gj": 0, "gb": 83e-6, "gx": 6e-6, "gi": 1662e-6, "gq": 0, "gf": 12e-6, "gg": 53e-6, "gm": 131e-6, "gn": 1484e-6, "g ": 736e-6, "gy": 89e-6, "go": 635e-6, "mc": 65e-6, "mp": 1418e-6, "mv": 6e-6, "md": 19e-5, "mh": 0, "mk": 12e-6, "ma": 3816e-6, "ms": 243e-6, "mw": 3e-5, "mu": 1584e-6, "mz": 0, "mt": 564e-6, "me": 5726e-6, "mr": 724e-6, "ml": 77e-6, "mj": 0, "mb": 1454e-6, "mx": 0, "mi": 2801e-6, "mq": 0, "mf": 0, "mg": 53e-6, "mm": 2213e-6, "mn": 166e-6, "m ": 1389e-6, "my": 125e-6, "mo": 2273e-6, "nc": 2267e-6, "np": 24e-6, "nv": 623e-6, "nd": 3744e-6, "nh": 142e-6, "nk": 125e-6, "na": 4623e-6, "ns": 5382e-6, "nw": 3e-5, "nu": 593e-6, "nz": 208e-6, "nt": 9412e-6, "ne": 9946e-6, "nr": 475e-6, "nl": 113e-6, "nj": 89e-6, "nb": 16e-5, "nx": 12e-6, "ni": 3276e-6, "nq": 65e-6, "nf": 309e-6, "ng": 1739e-6, "nm": 119e-6, "nn": 251e-5, "n ": 0.016829, "ny": 178e-6, "no": 2854e-6, " c": 0.010468, " p": 0.011061, " v": 3026e-6, " d": 0.028075, " h": 248e-5, " k": 1056e-6, " a": 9785e-6, " s": 0.010705, " w": 831e-6, " u": 6896e-6, " z": 368e-6, " t": 4623e-6, " e": 0.017387, " r": 4712e-6, " l": 0.020384, " j": 2469e-6, " b": 3483e-6, " x": 261e-6, " i": 2961e-6, " q": 1703e-6, " f": 5056e-6, " g": 3204e-6, " m": 6332e-6, " n": 4219e-6, "  ": 0.014183, " y": 291e-6, " o": 2083e-6, "yc": 131e-6, "yp": 231e-6, "yv": 3e-5, "yd": 83e-6, "yh": 6e-6, "yk": 24e-6, "ya": 315e-6, "ys": 427e-6, "yw": 18e-6, "yu": 3e-5, "yz": 6e-6, "yt": 71e-6, "ye": 208e-6, "yr": 148e-6, "yl": 16e-5, "yj": 0, "yb": 47e-6, "yx": 6e-6, "yi": 36e-6, "yq": 0, "yf": 0, "yg": 53e-6, "ym": 285e-6, "yn": 16e-5, "y ": 1222e-6, "yy": 0, "yo": 243e-6, "oc": 14e-4, "op": 1264e-6, "ov": 1222e-6, "od": 807e-6, "oh": 237e-6, "ok": 172e-6, "oa": 255e-6, "os": 1495e-6, "ow": 451e-6, "ou": 5572e-6, "oz": 101e-6, "ot": 1584e-6, "oe": 83e-6, "or": 5198e-6, "ol": 2783e-6, "oj": 59e-6, "ob": 736e-6, "ox": 125e-6, "oi": 2178e-6, "oq": 101e-6, "of": 368e-6, "og": 724e-6, "om": 4332e-6, "on": 0.011192, "o ": 1626e-6, "oy": 297e-6, "oo": 481e-6 };
const bigram_fr = {
  total_count: total_count$c,
  probabilities: probabilities$c
};
const total_count$b = 208397;
const probabilities$b = { "cc": 72e-6, "cp": 1e-5, "cv": 5e-6, "cd": 24e-6, "ch": 0.018772, "ck": 1224e-6, "ca": 888e-6, "cs": 14e-6, "cw": 5e-6, "cu": 168e-6, "cz": 14e-6, "ct": 144e-6, "ce": 523e-6, "cr": 139e-6, "cl": 168e-6, "cj": 5e-6, "cb": 24e-6, "cx": 0, "ci": 336e-6, "cq": 19e-6, "cf": 0, "cg": 5e-6, "cm": 0, "cn": 19e-6, "c ": 427e-6, "cy": 91e-6, "co": 893e-6, "pc": 19e-6, "pp": 326e-6, "pv": 0, "pd": 43e-6, "ph": 528e-6, "pk": 0, "pa": 1468e-6, "ps": 101e-6, "pw": 0, "pu": 384e-6, "pz": 24e-6, "pt": 489e-6, "pe": 1084e-6, "pr": 1679e-6, "pl": 398e-6, "pj": 0, "pb": 5e-6, "px": 0, "pi": 1243e-6, "pq": 0, "pf": 624e-6, "pg": 1e-5, "pm": 38e-6, "pn": 24e-6, "p ": 278e-6, "py": 24e-6, "po": 1204e-6, "vc": 19e-6, "vp": 5e-6, "vv": 0, "vd": 1e-5, "vh": 0, "vk": 5e-6, "va": 595e-6, "vs": 14e-6, "vw": 5e-6, "vu": 19e-6, "vz": 19e-6, "vt": 14e-6, "ve": 2706e-6, "vr": 14e-6, "vl": 72e-6, "vj": 5e-6, "vb": 0, "vx": 0, "vi": 1017e-6, "vq": 0, "vf": 0, "vg": 1e-5, "vm": 5e-6, "vn": 0, "v ": 173e-6, "vy": 14e-6, "vo": 3354e-6, "dc": 24e-6, "dp": 178e-6, "dv": 43e-6, "dd": 53e-6, "dh": 202e-6, "dk": 393e-6, "da": 261e-5, "ds": 648e-6, "dw": 274e-6, "du": 96e-5, "dz": 24e-6, "dt": 1147e-6, "de": 0.021589, "dr": 768e-6, "dl": 437e-6, "dj": 19e-6, "db": 139e-6, "dx": 0, "di": 5869e-6, "dq": 5e-6, "df": 106e-6, "dg": 91e-6, "dm": 96e-6, "dn": 24e-5, "d ": 7327e-6, "dy": 101e-6, "do": 1132e-6, "hc": 72e-6, "hp": 38e-6, "hv": 24e-6, "hd": 43e-6, "hh": 144e-6, "hk": 139e-6, "ha": 3877e-6, "hs": 955e-6, "hw": 696e-6, "hu": 1022e-6, "hz": 19e-6, "ht": 2087e-6, "he": 9952e-6, "hr": 3138e-6, "hl": 1344e-6, "hj": 19e-6, "hb": 154e-6, "hx": 0, "hi": 1953e-6, "hq": 0, "hf": 178e-6, "hg": 149e-6, "hm": 59e-5, "hn": 202e-5, "h ": 3858e-6, "hy": 12e-5, "ho": 1617e-6, "kc": 0, "kp": 43e-6, "kv": 19e-6, "kd": 1e-5, "kh": 72e-6, "kk": 91e-6, "ka": 2303e-6, "ks": 389e-6, "kw": 38e-6, "ku": 595e-6, "kz": 48e-6, "kt": 1012e-6, "ke": 2111e-6, "kr": 1219e-6, "kl": 691e-6, "kj": 24e-6, "kb": 53e-6, "kx": 0, "ki": 1075e-6, "kq": 0, "kf": 82e-6, "kg": 106e-6, "km": 633e-6, "kn": 269e-6, "k ": 1099e-6, "ky": 77e-6, "ko": 1065e-6, "ac": 1843e-6, "ap": 566e-6, "av": 302e-6, "ad": 2284e-6, "ah": 1852e-6, "ak": 557e-6, "aa": 533e-6, "as": 333e-5, "aw": 12e-5, "au": 5897e-6, "az": 197e-6, "at": 3738e-6, "ae": 571e-6, "ar": 6785e-6, "al": 6689e-6, "aj": 72e-6, "ab": 1084e-6, "ax": 173e-6, "ai": 854e-6, "aq": 91e-6, "af": 984e-6, "ag": 1089e-6, "am": 3196e-6, "an": 9348e-6, "a ": 3253e-6, "ay": 509e-6, "ao": 48e-6, "sc": 964e-5, "sp": 1943e-6, "sv": 101e-6, "sd": 686e-6, "sh": 523e-6, "sk": 6e-4, "sa": 1867e-6, "ss": 2802e-6, "sw": 269e-6, "su": 542e-6, "sz": 168e-6, "st": 0.014703, "se": 5096e-6, "sr": 226e-6, "sl": 437e-6, "sj": 19e-6, "sb": 59e-5, "sx": 0, "si": 4266e-6, "sq": 19e-6, "sf": 163e-6, "sg": 413e-6, "sm": 36e-5, "sn": 149e-6, "s ": 0.01178, "sy": 202e-6, "so": 1387e-6, "wc": 82e-6, "wp": 0, "wv": 0, "wd": 14e-6, "wh": 12e-5, "wk": 19e-6, "wa": 3258e-6, "ws": 12e-5, "ww": 14e-6, "wu": 95e-5, "wz": 0, "wt": 0, "we": 3244e-6, "wr": 206e-6, "wl": 77e-6, "wj": 19e-6, "wb": 19e-6, "wx": 0, "wi": 2068e-6, "wq": 0, "wf": 5e-6, "wg": 0, "wm": 0, "wn": 48e-6, "w ": 298e-6, "wy": 24e-6, "wo": 988e-6, "uc": 883e-6, "up": 576e-6, "uv": 13e-5, "ud": 672e-6, "uh": 101e-6, "uk": 278e-6, "ua": 389e-6, "us": 3608e-6, "uw": 115e-6, "uu": 29e-6, "uz": 139e-6, "ut": 2284e-6, "ue": 888e-6, "ur": 4223e-6, "ul": 835e-6, "uj": 34e-6, "ub": 734e-6, "ux": 96e-6, "ui": 341e-6, "uq": 0, "uf": 1689e-6, "ug": 696e-6, "um": 1579e-6, "un": 9779e-6, "u ": 1008e-6, "uy": 1e-5, "uo": 24e-6, "zc": 14e-6, "zp": 5e-6, "zv": 0, "zd": 19e-6, "zh": 13e-5, "zk": 43e-6, "za": 322e-6, "zs": 355e-6, "zw": 6e-4, "zu": 178e-5, "zz": 82e-6, "zt": 494e-6, "ze": 1843e-6, "zr": 38e-6, "zl": 115e-6, "zj": 1e-5, "zb": 96e-6, "zx": 0, "zi": 835e-6, "zq": 14e-6, "zf": 14e-6, "zg": 13e-5, "zm": 34e-6, "zn": 1e-5, "z ": 1262e-6, "zy": 53e-6, "zo": 24e-5, "tc": 91e-6, "tp": 115e-6, "tv": 77e-6, "td": 139e-6, "th": 1488e-6, "tk": 178e-6, "ta": 4026e-6, "ts": 2721e-6, "tw": 393e-6, "tu": 1675e-6, "tz": 1531e-6, "tt": 2231e-6, "te": 0.012817, "tr": 2716e-6, "tl": 1032e-6, "tj": 106e-6, "tb": 245e-6, "tx": 5e-6, "ti": 382e-5, "tq": 5e-6, "tf": 317e-6, "tg": 384e-6, "tm": 221e-6, "tn": 216e-6, "t ": 0.01559, "ty": 379e-6, "to": 1795e-6, "ec": 1017e-6, "ep": 451e-6, "ev": 331e-6, "ed": 1751e-6, "eh": 2207e-6, "ek": 686e-6, "ea": 845e-6, "es": 8033e-6, "ew": 662e-6, "eu": 2068e-6, "ez": 576e-6, "et": 3599e-6, "ee": 705e-6, "er": 0.031953, "el": 548e-5, "ej": 43e-6, "eb": 1555e-6, "ex": 206e-6, "ei": 0.015922, "eq": 24e-6, "ef": 729e-6, "eg": 2265e-6, "em": 4347e-6, "en": 0.022975, "e ": 0.021742, "ey": 293e-6, "eo": 379e-6, "rc": 1392e-6, "rp": 264e-6, "rv": 178e-6, "rd": 2975e-6, "rh": 974e-6, "rk": 1305e-6, "ra": 4635e-6, "rs": 2788e-6, "rw": 518e-6, "ru": 1641e-6, "rz": 648e-6, "rt": 4482e-6, "re": 7515e-6, "rr": 1166e-6, "rl": 931e-6, "rj": 38e-6, "rb": 1228e-6, "rx": 0, "ri": 5619e-6, "rq": 14e-6, "rf": 988e-6, "rg": 1972e-6, "rm": 1171e-6, "rn": 238e-5, "r ": 0.022016, "ry": 139e-6, "ro": 3076e-6, "lc": 288e-6, "lp": 182e-6, "lv": 154e-6, "ld": 883e-6, "lh": 125e-6, "lk": 317e-6, "la": 4098e-6, "ls": 237e-5, "lw": 106e-6, "lu": 1176e-6, "lz": 23e-5, "lt": 2015e-6, "le": 5326e-6, "lr": 178e-6, "ll": 3033e-6, "lj": 19e-6, "lb": 619e-6, "lx": 0, "li": 6046e-6, "lq": 5e-6, "lf": 384e-6, "lg": 585e-6, "lm": 475e-6, "ln": 509e-6, "l ": 3119e-6, "ly": 158e-6, "lo": 1516e-6, "jc": 0, "jp": 0, "jv": 5e-6, "jd": 53e-6, "jh": 58e-6, "jk": 5e-6, "ja": 1142e-6, "js": 1e-5, "jw": 5e-6, "ju": 384e-6, "jz": 0, "jt": 14e-6, "je": 355e-6, "jr": 53e-6, "jl": 0, "jj": 0, "jb": 0, "jx": 0, "ji": 48e-6, "jq": 0, "jf": 0, "jg": 0, "jm": 5e-6, "jn": 53e-6, "j ": 58e-6, "jy": 24e-6, "jo": 374e-6, "bc": 53e-6, "bp": 1e-5, "bv": 14e-6, "bd": 34e-6, "bh": 173e-6, "bk": 38e-6, "ba": 3018e-6, "bs": 211e-6, "bw": 72e-6, "bu": 1569e-6, "bz": 58e-6, "bt": 259e-6, "be": 6267e-6, "br": 1281e-6, "bl": 542e-6, "bj": 29e-6, "bb": 101e-6, "bx": 0, "bi": 1915e-6, "bq": 0, "bf": 19e-6, "bg": 125e-6, "bm": 5e-6, "bn": 58e-6, "b ": 533e-6, "by": 43e-6, "bo": 657e-6, "xc": 5e-6, "xp": 19e-6, "xv": 0, "xd": 0, "xh": 24e-6, "xk": 0, "xa": 62e-6, "xs": 1e-5, "xw": 0, "xu": 19e-6, "xz": 5e-6, "xt": 53e-6, "xe": 96e-6, "xr": 0, "xl": 0, "xj": 0, "xb": 0, "xx": 0, "xi": 168e-6, "xq": 0, "xf": 19e-6, "xg": 5e-6, "xm": 5e-6, "xn": 0, "x ": 13e-5, "xy": 1e-5, "xo": 24e-6, "ic": 4736e-6, "ip": 307e-6, "iv": 571e-6, "id": 854e-6, "ih": 441e-6, "ik": 1521e-6, "ia": 107e-5, "is": 0.01333, "iw": 62e-6, "iu": 216e-6, "iz": 437e-6, "it": 523e-5, "ie": 0.012049, "ir": 1737e-6, "il": 3239e-6, "ij": 48e-6, "ib": 384e-6, "ix": 58e-6, "ii": 163e-6, "iq": 34e-6, "if": 552e-6, "ig": 2438e-6, "im": 3498e-6, "in": 0.018551, "i ": 1876e-6, "iy": 1e-5, "io": 1943e-6, "qc": 5e-6, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 0, "qa": 0, "qs": 1e-5, "qw": 5e-6, "qu": 393e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 5e-6, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 1e-5, "qy": 0, "qo": 0, "fc": 62e-6, "fp": 1e-5, "fv": 5e-6, "fd": 29e-6, "fh": 393e-6, "fk": 72e-6, "fa": 1416e-6, "fs": 221e-6, "fw": 14e-6, "fu": 48e-5, "fz": 5e-6, "ft": 119e-5, "fe": 1723e-6, "fr": 2107e-6, "fl": 849e-6, "fj": 14e-6, "fb": 67e-6, "fx": 0, "fi": 969e-6, "fq": 0, "ff": 624e-6, "fg": 25e-5, "fm": 43e-6, "fn": 12e-5, "f ": 1785e-6, "fy": 19e-6, "fo": 84e-5, "gc": 11e-5, "gp": 19e-6, "gv": 24e-6, "gd": 34e-6, "gh": 226e-6, "gk": 139e-6, "ga": 1286e-6, "gs": 998e-6, "gw": 72e-6, "gu": 528e-6, "gz": 43e-6, "gt": 84e-5, "ge": 952e-5, "gr": 1967e-6, "gl": 941e-6, "gj": 14e-6, "gb": 77e-6, "gx": 0, "gi": 1507e-6, "gq": 5e-6, "gf": 62e-6, "gg": 106e-6, "gm": 62e-6, "gn": 317e-6, "g ": 3508e-6, "gy": 82e-6, "go": 47e-5, "mc": 62e-6, "mp": 475e-6, "mv": 1e-5, "md": 43e-6, "mh": 11e-5, "mk": 24e-6, "ma": 3397e-6, "ms": 326e-6, "mw": 19e-6, "mu": 686e-6, "mz": 1e-5, "mt": 451e-6, "me": 5019e-6, "mr": 115e-6, "ml": 163e-6, "mj": 1e-5, "mb": 619e-6, "mx": 0, "mi": 3138e-6, "mq": 0, "mf": 11e-5, "mg": 86e-6, "mm": 893e-6, "mn": 24e-5, "m ": 7279e-6, "my": 11e-5, "mo": 936e-6, "nc": 509e-6, "np": 154e-6, "nv": 13e-5, "nd": 0.011896, "nh": 648e-6, "nk": 1233e-6, "na": 3685e-6, "ns": 2908e-6, "nw": 653e-6, "nu": 691e-6, "nz": 132e-5, "nt": 4597e-6, "ne": 8114e-6, "nr": 446e-6, "nl": 432e-6, "nj": 48e-6, "nb": 792e-6, "nx": 0, "ni": 3561e-6, "nq": 1e-5, "nf": 451e-6, "ng": 5274e-6, "nm": 206e-6, "nn": 1852e-6, "n ": 0.028167, "ny": 91e-6, "no": 1416e-6, " c": 2313e-6, " p": 3412e-6, " v": 5384e-6, " d": 0.02096, " h": 3916e-6, " k": 3772e-6, " a": 8911e-6, " s": 0.011157, " w": 6094e-6, " u": 642e-5, " z": 2764e-6, " t": 226e-5, " e": 0.011094, " r": 3081e-6, " l": 3599e-6, " j": 1987e-6, " b": 7764e-6, " x": 34e-6, " i": 0.012327, " q": 149e-6, " f": 4405e-6, " g": 6041e-6, " m": 5163e-6, " n": 3393e-6, "  ": 5365e-6, " y": 125e-6, " o": 2217e-6, "yc": 72e-6, "yp": 154e-6, "yv": 29e-6, "yd": 48e-6, "yh": 5e-6, "yk": 34e-6, "ya": 101e-6, "ys": 221e-6, "yw": 5e-6, "yu": 19e-6, "yz": 0, "yt": 62e-6, "ye": 36e-5, "yr": 173e-6, "yl": 144e-6, "yj": 0, "yb": 14e-6, "yx": 0, "yi": 38e-6, "yq": 0, "yf": 14e-6, "yg": 14e-6, "ym": 134e-6, "yn": 125e-6, "y ": 931e-6, "yy": 0, "yo": 67e-6, "oc": 605e-6, "op": 734e-6, "ov": 542e-6, "od": 912e-6, "oh": 979e-6, "ok": 451e-6, "oa": 163e-6, "os": 13e-4, "ow": 758e-6, "ou": 825e-6, "oz": 178e-6, "ot": 917e-6, "oe": 278e-6, "or": 4645e-6, "ol": 227e-5, "oj": 62e-6, "ob": 72e-5, "ox": 82e-6, "oi": 254e-6, "oq": 34e-6, "of": 787e-6, "og": 715e-6, "om": 1574e-6, "on": 6588e-6, "o ": 1233e-6, "oy": 58e-6, "oo": 274e-6 };
const bigram_de = {
  total_count: total_count$b,
  probabilities: probabilities$b
};
const total_count$a = 176196;
const probabilities$a = { "cc": 85e-6, "cp": 11e-6, "cv": 0, "cd": 11e-6, "ch": 6686e-6, "ck": 1674e-6, "ca": 1181e-6, "cs": 74e-6, "cw": 0, "cu": 131e-6, "cz": 0, "ct": 102e-6, "ce": 143e-5, "cr": 119e-6, "cl": 96e-6, "cj": 0, "cb": 4e-5, "cx": 0, "ci": 1061e-6, "cq": 11e-6, "cf": 0, "cg": 6e-6, "cm": 23e-6, "cn": 45e-6, "c ": 324e-6, "cy": 91e-6, "co": 1254e-6, "pc": 11e-6, "pp": 942e-6, "pv": 4e-5, "pd": 45e-6, "ph": 142e-6, "pk": 45e-6, "pa": 1799e-6, "ps": 306e-6, "pw": 6e-6, "pu": 335e-6, "pz": 0, "pt": 363e-6, "pe": 2514e-6, "pr": 1884e-6, "pl": 397e-6, "pj": 0, "pb": 23e-6, "px": 0, "pi": 607e-6, "pq": 6e-6, "pf": 114e-6, "pg": 74e-6, "pm": 28e-6, "pn": 4e-5, "p ": 151e-5, "py": 51e-6, "po": 902e-6, "vc": 28e-6, "vp": 34e-6, "vv": 68e-6, "vd": 68e-6, "vh": 23e-6, "vk": 17e-6, "va": 3627e-6, "vs": 2236e-6, "vw": 0, "vu": 1754e-6, "vz": 0, "vt": 136e-6, "ve": 4342e-6, "vr": 732e-6, "vl": 142e-6, "vj": 68e-6, "vb": 45e-6, "vx": 204e-6, "vi": 3019e-6, "vq": 0, "vf": 28e-6, "vg": 278e-6, "vm": 68e-6, "vn": 1425e-6, "v ": 3717e-6, "vy": 23e-6, "vo": 369e-6, "dc": 11e-6, "dp": 34e-6, "dv": 936e-6, "dd": 2128e-6, "dh": 85e-6, "dk": 79e-6, "da": 2514e-6, "ds": 3695e-6, "dw": 68e-6, "du": 295e-6, "dz": 23e-6, "dt": 79e-6, "de": 0.017412, "dr": 1839e-6, "dl": 414e-6, "dj": 176e-6, "db": 204e-6, "dx": 6e-6, "di": 1839e-6, "dq": 6e-6, "df": 57e-6, "dg": 79e-6, "dm": 306e-6, "dn": 17e-5, "d ": 727e-5, "dy": 142e-6, "do": 164e-5, "hc": 4e-5, "hp": 11e-6, "hv": 45e-6, "hd": 17e-6, "hh": 6e-6, "hk": 28e-6, "ha": 4257e-6, "hs": 91e-6, "hw": 79e-6, "hu": 2089e-6, "hz": 0, "ht": 165e-6, "he": 1924e-6, "hr": 602e-6, "hl": 358e-6, "hj": 165e-6, "hb": 28e-6, "hx": 0, "hi": 783e-6, "hq": 0, "hf": 51e-6, "hg": 182e-6, "hm": 51e-6, "hn": 221e-6, "h ": 5789e-6, "hy": 176e-6, "ho": 1254e-6, "kc": 4e-5, "kp": 102e-6, "kv": 403e-6, "kd": 318e-6, "kh": 414e-6, "kk": 187e-6, "ka": 5545e-6, "ks": 658e-6, "kw": 6e-6, "ku": 533e-6, "kz": 0, "kt": 2089e-6, "ke": 2514e-6, "kr": 1816e-6, "kl": 692e-6, "kj": 68e-6, "kb": 68e-6, "kx": 0, "ki": 1731e-6, "kq": 0, "kf": 57e-6, "kg": 28e-6, "km": 1311e-6, "kn": 795e-6, "k ": 3116e-6, "ky": 38e-5, "ko": 4347e-6, "ac": 857e-6, "ap": 1322e-6, "av": 5108e-6, "ad": 5176e-6, "ah": 289e-6, "ak": 829e-6, "aa": 295e-6, "as": 2707e-6, "aw": 119e-6, "au": 1056e-6, "az": 91e-6, "at": 4489e-6, "ae": 227e-6, "ar": 0.012872, "al": 5329e-6, "aj": 38e-5, "ab": 431e-6, "ax": 244e-6, "ai": 675e-6, "aq": 34e-6, "af": 477e-6, "ag": 1425e-6, "am": 332e-5, "an": 0.014166, "a ": 0.012957, "ay": 369e-6, "ao": 51e-6, "sc": 568e-6, "sp": 1521e-6, "sv": 126e-5, "sd": 953e-6, "sh": 846e-6, "sk": 6232e-6, "sa": 3252e-6, "ss": 1969e-6, "sw": 34e-6, "su": 528e-6, "sz": 23e-6, "st": 0.012543, "se": 3343e-6, "sr": 284e-6, "sl": 1175e-6, "sj": 101e-5, "sb": 403e-6, "sx": 6e-6, "si": 2577e-6, "sq": 6e-6, "sf": 21e-5, "sg": 193e-6, "sm": 63e-5, "sn": 528e-6, "s ": 8542e-6, "sy": 1328e-6, "so": 3734e-6, "wc": 0, "wp": 6e-6, "wv": 0, "wd": 0, "wh": 28e-6, "wk": 0, "wa": 42e-5, "ws": 28e-6, "ww": 0, "wu": 0, "wz": 0, "wt": 17e-6, "we": 25e-5, "wr": 0, "wl": 11e-6, "wj": 0, "wb": 0, "wx": 0, "wi": 443e-6, "wq": 0, "wf": 0, "wg": 0, "wm": 0, "wn": 57e-6, "w ": 199e-6, "wy": 6e-6, "wo": 125e-6, "uc": 255e-6, "up": 749e-6, "uv": 1822e-6, "ud": 2015e-6, "uh": 17e-6, "uk": 25e-5, "ua": 602e-6, "us": 202e-5, "uw": 6e-6, "uu": 28e-6, "uz": 119e-6, "ut": 971e-6, "ue": 585e-6, "ur": 1663e-6, "ul": 1061e-6, "uj": 51e-6, "ub": 426e-6, "ux": 136e-6, "ui": 38e-5, "uq": 17e-6, "uf": 57e-6, "ug": 375e-6, "um": 568e-6, "un": 5011e-6, "u ": 42e-5, "uy": 34e-6, "uo": 96e-6, "zc": 23e-6, "zp": 0, "zv": 0, "zd": 0, "zh": 34e-6, "zk": 11e-6, "za": 153e-6, "zs": 6e-6, "zw": 17e-6, "zu": 34e-6, "zz": 28e-6, "zt": 0, "ze": 148e-6, "zr": 17e-6, "zl": 0, "zj": 57e-6, "zb": 17e-6, "zx": 0, "zi": 79e-6, "zq": 11e-6, "zf": 0, "zg": 0, "zm": 0, "zn": 6e-6, "z ": 238e-6, "zy": 0, "zo": 148e-6, "tc": 74e-6, "tp": 68e-6, "tv": 488e-6, "td": 4e-5, "th": 704e-6, "tk": 272e-6, "ta": 8173e-6, "ts": 1061e-6, "tw": 0, "tu": 783e-6, "tz": 45e-6, "tt": 37e-4, "te": 9682e-6, "tr": 4211e-6, "tl": 851e-6, "tj": 358e-6, "tb": 295e-6, "tx": 0, "ti": 5097e-6, "tq": 0, "tf": 102e-6, "tg": 199e-6, "tm": 125e-6, "tn": 817e-6, "t ": 0.014189, "ty": 999e-6, "to": 3127e-6, "ec": 698e-6, "ep": 846e-6, "ev": 738e-6, "ed": 2361e-6, "eh": 199e-6, "ek": 1095e-6, "ea": 105e-5, "es": 3837e-6, "ew": 233e-6, "eu": 369e-6, "ez": 119e-6, "et": 0.010749, "ee": 255e-6, "er": 0.017197, "el": 6935e-6, "ej": 142e-6, "eb": 755e-6, "ex": 647e-6, "ei": 545e-6, "eq": 11e-6, "ef": 755e-6, "eg": 1555e-6, "em": 1981e-6, "en": 0.026981, "e ": 0.010437, "ey": 363e-6, "eo": 329e-6, "rc": 284e-6, "rp": 159e-6, "rv": 709e-6, "rd": 2866e-6, "rh": 221e-6, "rk": 1833e-6, "ra": 8343e-6, "rs": 3394e-6, "rw": 17e-6, "ru": 1322e-6, "rz": 34e-6, "rt": 357e-5, "re": 7889e-6, "rr": 1913e-6, "rl": 823e-6, "rj": 165e-6, "rb": 63e-5, "rx": 11e-6, "ri": 6646e-6, "rq": 23e-6, "rf": 329e-6, "rg": 1487e-6, "rm": 812e-6, "rn": 2747e-6, "r ": 0.02365, "ry": 42e-5, "ro": 3178e-6, "lc": 91e-6, "lp": 289e-6, "lv": 511e-6, "ld": 936e-6, "lh": 482e-6, "lk": 868e-6, "la": 8456e-6, "ls": 2162e-6, "lw": 6e-6, "lu": 806e-6, "lz": 23e-6, "lt": 726e-6, "le": 5721e-6, "lr": 176e-6, "ll": 4926e-6, "lj": 647e-6, "lb": 255e-6, "lx": 6e-6, "li": 7395e-6, "lq": 6e-6, "lf": 17e-5, "lg": 409e-6, "lm": 931e-6, "ln": 976e-6, "l ": 3371e-6, "ly": 312e-6, "lo": 2548e-6, "jc": 11e-6, "jp": 0, "jv": 23e-6, "jd": 62e-6, "jh": 6e-6, "jk": 17e-6, "ja": 936e-6, "js": 85e-6, "jw": 0, "ju": 812e-6, "jz": 0, "jt": 45e-6, "je": 942e-6, "jr": 619e-6, "jl": 131e-6, "jj": 0, "jb": 23e-6, "jx": 0, "ji": 114e-6, "jq": 0, "jf": 11e-6, "jg": 23e-6, "jm": 91e-6, "jn": 516e-6, "j ": 539e-6, "jy": 11e-6, "jo": 874e-6, "bc": 51e-6, "bp": 0, "bv": 11e-6, "bd": 91e-6, "bh": 6e-6, "bk": 28e-6, "ba": 1339e-6, "bs": 108e-6, "bw": 0, "bu": 84e-5, "bz": 0, "bt": 23e-6, "be": 2741e-6, "br": 1629e-6, "bl": 851e-6, "bj": 51e-6, "bb": 255e-6, "bx": 0, "bi": 533e-6, "bq": 0, "bf": 6e-6, "bg": 0, "bm": 6e-6, "bn": 45e-6, "b ": 238e-6, "by": 653e-6, "bo": 1532e-6, "xc": 11e-6, "xp": 28e-6, "xv": 6e-6, "xd": 0, "xh": 6e-6, "xk": 0, "xa": 51e-6, "xs": 6e-6, "xw": 0, "xu": 11e-6, "xz": 0, "xt": 221e-6, "xe": 165e-6, "xr": 6e-6, "xl": 0, "xj": 11e-6, "xb": 0, "xx": 6e-6, "xi": 539e-6, "xq": 0, "xf": 11e-6, "xg": 0, "xm": 17e-6, "xn": 28e-6, "x ": 306e-6, "xy": 0, "xo": 23e-6, "ic": 1328e-6, "ip": 261e-6, "iv": 1203e-6, "id": 1737e-6, "ih": 114e-6, "ik": 3235e-6, "ia": 1487e-6, "is": 4478e-6, "iw": 6e-6, "iu": 284e-6, "iz": 153e-6, "it": 2588e-6, "ie": 2282e-6, "ir": 1022e-6, "il": 4955e-6, "ij": 74e-6, "ib": 21e-5, "ix": 102e-6, "ii": 159e-6, "iq": 62e-6, "if": 59e-5, "ig": 4887e-6, "im": 641e-6, "in": 0.010976, "i ": 0.014762, "iy": 17e-6, "io": 2253e-6, "qc": 0, "qp": 0, "qv": 6e-6, "qd": 0, "qh": 0, "qk": 0, "qa": 11e-6, "qs": 0, "qw": 0, "qu": 261e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 6e-6, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 28e-6, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 0, "qy": 0, "qo": 0, "fc": 4e-5, "fp": 11e-6, "fv": 11e-6, "fd": 1215e-6, "fh": 6e-6, "fk": 57e-6, "fa": 999e-6, "fs": 74e-6, "fw": 0, "fu": 114e-6, "fz": 0, "ft": 88e-5, "fe": 692e-6, "fr": 4211e-6, "fl": 647e-6, "fj": 79e-6, "fb": 6e-6, "fx": 0, "fi": 1697e-6, "fq": 0, "ff": 238e-6, "fg": 131e-6, "fm": 6e-6, "fn": 4e-5, "f ": 42e-5, "fy": 176e-6, "fo": 1447e-6, "gc": 6e-6, "gp": 28e-6, "gv": 79e-6, "gd": 409e-6, "gh": 278e-6, "gk": 17e-6, "ga": 2168e-6, "gs": 1181e-6, "gw": 6e-6, "gu": 942e-6, "gz": 11e-6, "gt": 613e-6, "ge": 5806e-6, "gr": 2003e-6, "gl": 585e-6, "gj": 102e-6, "gb": 62e-6, "gx": 0, "gi": 1691e-6, "gq": 11e-6, "gf": 426e-6, "gg": 3218e-6, "gm": 51e-6, "gn": 556e-6, "g ": 378e-5, "gy": 102e-6, "go": 647e-6, "mc": 51e-6, "mp": 437e-6, "mv": 23e-6, "md": 51e-6, "mh": 79e-6, "mk": 414e-6, "ma": 3349e-6, "ms": 772e-6, "mw": 0, "mu": 2667e-6, "mz": 6e-6, "mt": 261e-6, "me": 6113e-6, "mr": 636e-6, "ml": 573e-6, "mj": 62e-6, "mb": 919e-6, "mx": 0, "mi": 2128e-6, "mq": 0, "mf": 136e-6, "mg": 131e-6, "mm": 2974e-6, "mn": 812e-6, "m ": 6822e-6, "my": 204e-6, "mo": 993e-6, "nc": 545e-6, "np": 23e-6, "nv": 1447e-6, "nd": 8099e-6, "nh": 187e-6, "nk": 755e-6, "na": 5534e-6, "ns": 5335e-6, "nw": 68e-6, "nu": 573e-6, "nz": 68e-6, "nt": 4609e-6, "ne": 5034e-6, "nr": 431e-6, "nl": 936e-6, "nj": 267e-6, "nb": 278e-6, "nx": 0, "ni": 3439e-6, "nq": 11e-6, "nf": 176e-6, "ng": 6107e-6, "nm": 221e-6, "nn": 1952e-6, "n ": 0.030631, "ny": 358e-6, "no": 3456e-6, " c": 3076e-6, " p": 4728e-6, " v": 622e-5, " d": 0.011232, " h": 7185e-6, " k": 8695e-6, " a": 9325e-6, " s": 0.015534, " w": 743e-6, " u": 214e-5, " z": 165e-6, " t": 4648e-6, " e": 8865e-6, " r": 0.010057, " l": 8195e-6, " j": 181e-5, " b": 5159e-6, " x": 51e-6, " i": 0.016351, " q": 96e-6, " f": 8474e-6, " g": 3002e-6, " m": 655e-5, " n": 4569e-6, "  ": 0.013388, " y": 284e-6, " o": 9807e-6, "yc": 91e-6, "yp": 119e-6, "yv": 51e-6, "yd": 1078e-6, "yh": 28e-6, "yk": 114e-6, "ya": 25e-5, "ys": 675e-6, "yw": 17e-6, "yu": 62e-6, "yz": 0, "yt": 38e-5, "ye": 204e-6, "yr": 641e-6, "yl": 278e-6, "yj": 0, "yb": 74e-6, "yx": 0, "yi": 11e-6, "yq": 0, "yf": 204e-6, "yg": 386e-6, "ym": 159e-6, "yn": 289e-6, "y ": 1294e-6, "yy": 6e-6, "yo": 165e-6, "oc": 6181e-6, "op": 454e-6, "ov": 1243e-6, "od": 602e-6, "oh": 341e-6, "ok": 465e-6, "oa": 182e-6, "os": 1203e-6, "ow": 159e-6, "ou": 965e-6, "oz": 119e-6, "ot": 1493e-6, "oe": 102e-6, "or": 6896e-6, "ol": 2843e-6, "oj": 148e-6, "ob": 431e-6, "ox": 34e-6, "oi": 289e-6, "oq": 0, "of": 516e-6, "og": 607e-6, "om": 9745e-6, "on": 6771e-6, "o ": 244e-5, "oy": 74e-6, "oo": 176e-6 };
const bigram_sv = {
  total_count: total_count$a,
  probabilities: probabilities$a
};
const total_count$9 = 173161;
const probabilities$9 = { "cc": 508e-6, "cp": 4e-5, "cv": 6e-6, "cd": 29e-6, "ch": 1802e-6, "ck": 398e-6, "ca": 7063e-6, "cs": 139e-6, "cw": 0, "cu": 2281e-6, "cz": 6e-6, "ct": 1767e-6, "ce": 2755e-6, "cr": 1161e-6, "cl": 624e-6, "cj": 0, "cb": 0, "cx": 0, "ci": 965e-5, "cq": 6e-6, "cf": 12e-6, "cg": 17e-6, "cm": 92e-6, "cn": 162e-6, "c ": 462e-6, "cy": 17e-6, "co": 9581e-6, "pc": 87e-6, "pp": 35e-6, "pv": 6e-6, "pd": 6e-6, "ph": 173e-6, "pk": 0, "pa": 451e-5, "ps": 162e-6, "pw": 0, "pu": 1011e-6, "pz": 6e-6, "pt": 41e-5, "pe": 365e-5, "pr": 3378e-6, "pl": 612e-6, "pj": 0, "pb": 208e-6, "px": 0, "pi": 2125e-6, "pq": 6e-6, "pf": 0, "pg": 17e-6, "pm": 12e-6, "pn": 52e-6, "p ": 162e-6, "py": 35e-6, "po": 5053e-6, "vc": 29e-6, "vp": 0, "vv": 12e-6, "vd": 17e-6, "vh": 0, "vk": 0, "va": 1617e-6, "vs": 4e-5, "vw": 0, "vu": 58e-6, "vz": 0, "vt": 0, "ve": 1646e-6, "vr": 46e-6, "vl": 23e-6, "vj": 0, "vb": 6e-6, "vx": 0, "vi": 2553e-6, "vq": 0, "vf": 0, "vg": 6e-6, "vm": 0, "vn": 64e-6, "v ": 121e-6, "vy": 35e-6, "vo": 774e-6, "dc": 98e-6, "dp": 23e-6, "dv": 12e-6, "dd": 87e-6, "dh": 4e-5, "dk": 0, "da": 6312e-6, "ds": 69e-6, "dw": 4e-5, "du": 855e-6, "dz": 4e-5, "dt": 0, "de": 0.025664, "dr": 693e-6, "dl": 69e-6, "dj": 23e-6, "db": 12e-6, "dx": 12e-6, "di": 3361e-6, "dq": 0, "df": 6e-6, "dg": 35e-6, "dm": 162e-6, "dn": 81e-6, "d ": 2345e-6, "dy": 75e-6, "do": 8195e-6, "hc": 23e-6, "hp": 6e-6, "hv": 0, "hd": 23e-6, "hh": 6e-6, "hk": 12e-6, "ha": 2229e-6, "hs": 29e-6, "hw": 17e-6, "hu": 462e-6, "hz": 17e-6, "ht": 11e-5, "he": 964e-6, "hr": 127e-6, "hl": 69e-6, "hj": 0, "hb": 4e-5, "hx": 0, "hi": 964e-6, "hq": 0, "hf": 6e-6, "hg": 6e-6, "hm": 46e-6, "hn": 127e-6, "h ": 445e-6, "hy": 58e-6, "ho": 901e-6, "kc": 0, "kp": 12e-6, "kv": 0, "kd": 6e-6, "kh": 35e-6, "kk": 6e-6, "ka": 214e-6, "ks": 98e-6, "kw": 6e-6, "ku": 133e-6, "kz": 0, "kt": 17e-6, "ke": 214e-6, "kr": 75e-6, "kl": 17e-6, "kj": 6e-6, "kb": 12e-6, "kx": 6e-6, "ki": 208e-6, "kq": 0, "kf": 0, "kg": 23e-6, "km": 427e-6, "kn": 29e-6, "k ": 508e-6, "ky": 52e-6, "ko": 115e-6, "ac": 4383e-6, "ap": 959e-6, "av": 739e-6, "ad": 8882e-6, "ah": 15e-5, "ak": 144e-6, "aa": 474e-6, "as": 6849e-6, "aw": 52e-6, "au": 1132e-6, "az": 491e-6, "at": 2691e-6, "ae": 681e-6, "ar": 8813e-6, "al": 9084e-6, "aj": 595e-6, "ab": 1871e-6, "ax": 69e-6, "ai": 583e-6, "aq": 115e-6, "af": 352e-6, "ag": 936e-6, "am": 3604e-6, "an": 9182e-6, "a ": 0.033934, "ay": 664e-6, "ao": 1028e-6, "sc": 1386e-6, "sp": 1629e-6, "sv": 35e-6, "sd": 358e-6, "sh": 283e-6, "sk": 139e-6, "sa": 2581e-6, "ss": 364e-6, "sw": 23e-6, "su": 2732e-6, "sz": 12e-6, "st": 8027e-6, "se": 4949e-6, "sr": 121e-6, "sl": 416e-6, "sj": 12e-6, "sb": 75e-6, "sx": 0, "si": 4279e-6, "sq": 139e-6, "sf": 98e-6, "sg": 6e-6, "sm": 45e-5, "sn": 162e-6, "s ": 0.022557, "sy": 23e-6, "so": 2119e-6, "wc": 0, "wp": 0, "wv": 0, "wd": 0, "wh": 6e-6, "wk": 0, "wa": 231e-6, "ws": 17e-6, "ww": 0, "wu": 0, "wz": 0, "wt": 12e-6, "we": 156e-6, "wr": 4e-5, "wl": 17e-6, "wj": 0, "wb": 0, "wx": 0, "wi": 214e-6, "wq": 0, "wf": 0, "wg": 0, "wm": 6e-6, "wn": 29e-6, "w ": 139e-6, "wy": 17e-6, "wo": 69e-6, "uc": 964e-6, "up": 456e-6, "uv": 196e-6, "ud": 1011e-6, "uh": 35e-6, "uk": 35e-6, "ua": 1923e-6, "us": 149e-5, "uw": 0, "uu": 12e-6, "uz": 64e-6, "ut": 982e-6, "ue": 6907e-6, "ur": 2714e-6, "ul": 1588e-6, "uj": 139e-6, "ub": 1022e-6, "ux": 29e-6, "ui": 1172e-6, "uq": 46e-6, "uf": 58e-6, "ug": 618e-6, "um": 785e-6, "un": 9904e-6, "u ": 138e-5, "uy": 329e-6, "uo": 104e-6, "zc": 29e-6, "zp": 6e-6, "zv": 0, "zd": 12e-6, "zh": 29e-6, "zk": 0, "za": 138e-5, "zs": 0, "zw": 0, "zu": 98e-6, "zz": 12e-6, "zt": 12e-6, "ze": 15e-5, "zr": 12e-6, "zl": 6e-6, "zj": 0, "zb": 12e-6, "zx": 0, "zi": 69e-6, "zq": 29e-6, "zf": 6e-6, "zg": 6e-6, "zm": 6e-6, "zn": 17e-6, "z ": 837e-6, "zy": 17e-6, "zo": 41e-5, "tc": 139e-6, "tp": 46e-6, "tv": 35e-6, "td": 12e-6, "th": 549e-6, "tk": 0, "ta": 8732e-6, "ts": 289e-6, "tw": 29e-6, "tu": 2212e-6, "tz": 29e-6, "tt": 231e-6, "te": 9067e-6, "tr": 5174e-6, "tl": 295e-6, "tj": 12e-6, "tb": 289e-6, "tx": 0, "ti": 5186e-6, "tq": 0, "tf": 115e-6, "tg": 23e-6, "tm": 133e-6, "tn": 676e-6, "t ": 1265e-6, "ty": 144e-6, "to": 5717e-6, "ec": 3378e-6, "ep": 1207e-6, "ev": 855e-6, "ed": 175e-5, "eh": 81e-6, "ek": 81e-6, "ea": 1738e-6, "es": 0.016915, "ew": 58e-6, "eu": 312e-6, "ez": 508e-6, "et": 149e-5, "ee": 231e-6, "er": 0.010314, "el": 0.011925, "ej": 52e-5, "eb": 572e-6, "ex": 808e-6, "ei": 485e-6, "eq": 231e-6, "ef": 387e-6, "eg": 1842e-6, "em": 2183e-6, "en": 0.018024, "e ": 0.033247, "ey": 422e-6, "eo": 86e-5, "rc": 1097e-6, "rp": 266e-6, "rv": 271e-6, "rd": 901e-6, "rh": 46e-6, "rk": 179e-6, "ra": 9823e-6, "rs": 1016e-6, "rw": 12e-6, "ru": 1219e-6, "rz": 196e-6, "rt": 3552e-6, "re": 8431e-6, "rr": 1784e-6, "rl": 289e-6, "rj": 35e-6, "rb": 254e-6, "rx": 17e-6, "ri": 6976e-6, "rq": 375e-6, "rf": 312e-6, "rg": 123e-5, "rm": 1224e-6, "rn": 1011e-6, "r ": 6786e-6, "ry": 196e-6, "ro": 6843e-6, "lc": 393e-6, "lp": 173e-6, "lv": 329e-6, "ld": 352e-6, "lh": 58e-6, "lk": 35e-6, "la": 0.013127, "ls": 318e-6, "lw": 6e-6, "lu": 918e-6, "lz": 35e-6, "lt": 1039e-6, "le": 4164e-6, "lr": 52e-6, "ll": 2108e-6, "lj": 6e-6, "lb": 271e-6, "lx": 0, "li": 4268e-6, "lq": 52e-6, "lf": 139e-6, "lg": 295e-6, "lm": 716e-6, "ln": 243e-6, "l ": 0.014287, "ly": 144e-6, "lo": 4995e-6, "jc": 0, "jp": 6e-6, "jv": 6e-6, "jd": 6e-6, "jh": 0, "jk": 12e-6, "ja": 722e-6, "js": 12e-6, "jw": 0, "ju": 878e-6, "jz": 0, "jt": 29e-6, "je": 52e-5, "jr": 46e-6, "jl": 0, "jj": 0, "jb": 0, "jx": 0, "ji": 133e-6, "jq": 0, "jf": 0, "jg": 0, "jm": 0, "jn": 12e-6, "j ": 115e-6, "jy": 0, "jo": 832e-6, "bc": 4e-5, "bp": 12e-6, "bv": 0, "bd": 17e-6, "bh": 12e-6, "bk": 29e-6, "ba": 2327e-6, "bs": 81e-6, "bw": 0, "bu": 762e-6, "bz": 0, "bt": 75e-6, "be": 1149e-6, "br": 1981e-6, "bl": 1617e-6, "bj": 52e-6, "bb": 46e-6, "bx": 0, "bi": 2333e-6, "bq": 0, "bf": 23e-6, "bg": 0, "bm": 23e-6, "bn": 35e-6, "b ": 173e-6, "by": 46e-6, "bo": 112e-5, "xc": 69e-6, "xp": 115e-6, "xv": 46e-6, "xd": 0, "xh": 0, "xk": 0, "xa": 75e-6, "xs": 0, "xw": 0, "xu": 12e-6, "xz": 0, "xt": 295e-6, "xe": 46e-6, "xr": 0, "xl": 6e-6, "xj": 35e-6, "xb": 6e-6, "xx": 92e-6, "xi": 433e-6, "xq": 0, "xf": 52e-6, "xg": 0, "xm": 23e-6, "xn": 0, "x ": 306e-6, "xy": 0, "xo": 29e-6, "ic": 6503e-6, "ip": 1473e-6, "iv": 1242e-6, "id": 4955e-6, "ih": 46e-6, "ik": 115e-6, "ia": 5273e-6, "is": 4741e-6, "iw": 6e-6, "iu": 537e-6, "iz": 993e-6, "it": 3927e-6, "ie": 3863e-6, "ir": 1386e-6, "il": 287e-5, "ij": 115e-6, "ib": 739e-6, "ix": 127e-6, "ii": 335e-6, "iq": 92e-6, "if": 526e-6, "ig": 1438e-6, "im": 1727e-6, "in": 9633e-6, "i ": 1294e-6, "iy": 46e-6, "io": 4614e-6, "qc": 6e-6, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 0, "qa": 12e-6, "qs": 0, "qw": 0, "qu": 35e-4, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 6e-6, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 6e-6, "qy": 0, "qo": 0, "fc": 35e-6, "fp": 6e-6, "fv": 6e-6, "fd": 12e-6, "fh": 0, "fk": 6e-6, "fa": 93e-5, "fs": 52e-6, "fw": 0, "fu": 2252e-6, "fz": 0, "ft": 127e-6, "fe": 1034e-6, "fr": 1057e-6, "fl": 318e-6, "fj": 17e-6, "fb": 0, "fx": 0, "fi": 1426e-6, "fq": 0, "ff": 115e-6, "fg": 17e-6, "fm": 29e-6, "fn": 23e-6, "f ": 185e-6, "fy": 0, "fo": 947e-6, "gc": 29e-6, "gp": 6e-6, "gv": 0, "gd": 29e-6, "gh": 127e-6, "gk": 17e-6, "ga": 2108e-6, "gs": 4e-5, "gw": 0, "gu": 1617e-6, "gz": 6e-6, "gt": 46e-6, "ge": 1426e-6, "gr": 153e-5, "gl": 543e-6, "gj": 0, "gb": 6e-6, "gx": 0, "gi": 1363e-6, "gq": 0, "gf": 17e-6, "gg": 35e-6, "gm": 81e-6, "gn": 664e-6, "g ": 346e-6, "gy": 29e-6, "go": 1265e-6, "mc": 58e-6, "mp": 1681e-6, "mv": 35e-6, "md": 35e-6, "mh": 12e-6, "mk": 0, "ma": 4389e-6, "ms": 826e-6, "mw": 6e-6, "mu": 1883e-6, "mz": 0, "mt": 162e-6, "me": 4187e-6, "mr": 185e-6, "ml": 58e-6, "mj": 0, "mb": 149e-5, "mx": 115e-6, "mi": 3067e-6, "mq": 6e-6, "mf": 6e-6, "mg": 17e-6, "mm": 139e-6, "mn": 266e-6, "m ": 1057e-6, "my": 133e-6, "mo": 3072e-6, "nc": 3309e-6, "np": 12e-6, "nv": 202e-6, "nd": 3159e-6, "nh": 52e-6, "nk": 46e-6, "na": 8847e-6, "ns": 2466e-6, "nw": 35e-6, "nu": 526e-6, "nz": 387e-6, "nt": 9454e-6, "ne": 3892e-6, "nr": 115e-6, "nl": 92e-6, "nj": 115e-6, "nb": 81e-6, "nx": 0, "ni": 4406e-6, "nq": 121e-6, "nf": 335e-6, "ng": 982e-6, "nm": 219e-6, "nn": 329e-6, "n ": 0.018815, "ny": 69e-6, "no": 4522e-6, " c": 0.013589, " p": 0.012503, " v": 1906e-6, " d": 0.0256, " h": 2991e-6, " k": 872e-6, " a": 0.011134, " s": 9078e-6, " w": 474e-6, " u": 764e-5, " z": 219e-6, " t": 477e-5, " e": 0.023914, " r": 4418e-6, " l": 0.012999, " j": 149e-5, " b": 3269e-6, " x": 271e-6, " i": 2778e-6, " q": 2183e-6, " f": 5527e-6, " g": 3194e-6, " m": 6728e-6, " n": 3009e-6, "  ": 5007e-6, " y": 5197e-6, " o": 2674e-6, "yc": 46e-6, "yp": 52e-6, "yv": 17e-6, "yd": 29e-6, "yh": 0, "yk": 6e-6, "ya": 41e-5, "ys": 139e-6, "yw": 6e-6, "yu": 104e-6, "yz": 12e-6, "yt": 4e-5, "ye": 358e-6, "yr": 92e-6, "yl": 144e-6, "yj": 6e-6, "yb": 0, "yx": 0, "yi": 12e-6, "yq": 0, "yf": 0, "yg": 0, "ym": 29e-6, "yn": 69e-6, "y ": 6029e-6, "yy": 0, "yo": 37e-5, "oc": 2374e-6, "op": 993e-6, "ov": 1091e-6, "od": 1022e-6, "oh": 156e-6, "ok": 87e-6, "oa": 277e-6, "os": 7744e-6, "ow": 185e-6, "ou": 82e-5, "oz": 121e-6, "ot": 1132e-6, "oe": 404e-6, "or": 9026e-6, "ol": 2737e-6, "oj": 15e-5, "ob": 1675e-6, "ox": 92e-6, "oi": 231e-6, "oq": 127e-6, "of": 502e-6, "og": 589e-6, "om": 4037e-6, "on": 879e-5, "o ": 0.021627, "oy": 219e-6, "oo": 196e-6 };
const bigram_es = {
  total_count: total_count$9,
  probabilities: probabilities$9
};
const total_count$8 = 184902;
const probabilities$8 = { "cc": 1357e-6, "cp": 11e-6, "cv": 5e-6, "cd": 38e-6, "ch": 3699e-6, "ck": 427e-6, "ca": 7198e-6, "cs": 59e-6, "cw": 0, "cu": 827e-6, "cz": 32e-6, "ct": 233e-6, "ce": 391e-5, "cr": 984e-6, "cl": 573e-6, "cj": 0, "cb": 11e-6, "cx": 0, "ci": 5452e-6, "cq": 124e-6, "cf": 5e-6, "cg": 11e-6, "cm": 27e-6, "cn": 38e-6, "c ": 341e-6, "cy": 43e-6, "co": 0.010362, "pc": 32e-6, "pp": 1184e-6, "pv": 0, "pd": 0, "ph": 206e-6, "pk": 5e-6, "pa": 3688e-6, "ps": 173e-6, "pw": 5e-6, "pu": 838e-6, "pz": 0, "pt": 65e-6, "pe": 3131e-6, "pr": 3515e-6, "pl": 465e-6, "pj": 0, "pb": 5e-6, "px": 0, "pi": 2353e-6, "pq": 0, "pf": 11e-6, "pg": 0, "pm": 11e-6, "pn": 5e-6, "p ": 2e-4, "py": 5e-6, "po": 3542e-6, "vc": 27e-6, "vp": 0, "vv": 151e-6, "vd": 27e-6, "vh": 11e-6, "vk": 5e-6, "va": 219e-5, "vs": 32e-6, "vw": 0, "vu": 76e-6, "vz": 0, "vt": 0, "ve": 2764e-6, "vr": 119e-6, "vl": 32e-6, "vj": 0, "vb": 0, "vx": 0, "vi": 3413e-6, "vq": 0, "vf": 0, "vg": 27e-6, "vm": 0, "vn": 32e-6, "v ": 292e-6, "vy": 81e-6, "vo": 1374e-6, "dc": 22e-6, "dp": 22e-6, "dv": 27e-6, "dd": 92e-6, "dh": 16e-6, "dk": 11e-6, "da": 4754e-6, "ds": 114e-6, "dw": 49e-6, "du": 865e-6, "dz": 5e-6, "dt": 49e-6, "de": 0.012066, "dr": 644e-6, "dl": 11e-6, "dj": 16e-6, "db": 11e-6, "dx": 0, "di": 0.013229, "dq": 0, "df": 11e-6, "dg": 59e-6, "dm": 43e-6, "dn": 59e-6, "d ": 1779e-6, "dy": 49e-6, "do": 2244e-6, "hc": 11e-6, "hp": 0, "hv": 5e-6, "hd": 5e-6, "hh": 5e-6, "hk": 11e-6, "ha": 1287e-6, "hs": 54e-6, "hw": 0, "hu": 254e-6, "hz": 16e-6, "ht": 49e-6, "he": 2791e-6, "hr": 141e-6, "hl": 65e-6, "hj": 5e-6, "hb": 11e-6, "hx": 0, "hi": 1466e-6, "hq": 5e-6, "hf": 5e-6, "hg": 0, "hm": 32e-6, "hn": 114e-6, "h ": 427e-6, "hy": 43e-6, "ho": 671e-6, "kc": 0, "kp": 11e-6, "kv": 11e-6, "kd": 5e-6, "kh": 114e-6, "kk": 11e-6, "ka": 368e-6, "ks": 141e-6, "kw": 16e-6, "ku": 146e-6, "kz": 0, "kt": 49e-6, "ke": 373e-6, "kr": 65e-6, "kl": 27e-6, "kj": 0, "kb": 11e-6, "kx": 0, "ki": 362e-6, "kq": 0, "kf": 11e-6, "kg": 0, "km": 206e-6, "kn": 27e-6, "k ": 552e-6, "ky": 65e-6, "ko": 308e-6, "ac": 1898e-6, "ap": 1385e-6, "av": 1195e-6, "ad": 1525e-6, "ah": 157e-6, "ak": 211e-6, "aa": 92e-6, "as": 285e-5, "aw": 146e-6, "au": 979e-6, "az": 1801e-6, "at": 0.011228, "ae": 627e-6, "ar": 7545e-6, "al": 0.01179, "aj": 141e-6, "ab": 1769e-6, "ax": 54e-6, "ai": 1163e-6, "aq": 97e-6, "af": 671e-6, "ag": 2104e-6, "am": 3002e-6, "an": 0.01205, "a ": 0.033791, "ay": 324e-6, "ao": 119e-6, "sc": 2288e-6, "sp": 1276e-6, "sv": 438e-6, "sd": 7e-5, "sh": 416e-6, "sk": 243e-6, "sa": 2504e-6, "ss": 2655e-6, "sw": 49e-6, "su": 2223e-6, "sz": 32e-6, "st": 9632e-6, "se": 5533e-6, "sr": 54e-6, "sl": 297e-6, "sj": 0, "sb": 7e-5, "sx": 5e-6, "si": 5657e-6, "sq": 43e-6, "sf": 13e-5, "sg": 27e-6, "sm": 184e-6, "sn": 76e-6, "s ": 2461e-6, "sy": 108e-6, "so": 3304e-6, "wc": 0, "wp": 0, "wv": 0, "wd": 5e-6, "wh": 16e-6, "wk": 11e-6, "wa": 406e-6, "ws": 54e-6, "ww": 0, "wu": 22e-6, "wz": 0, "wt": 16e-6, "we": 151e-6, "wr": 97e-6, "wl": 22e-6, "wj": 0, "wb": 0, "wx": 0, "wi": 26e-5, "wq": 0, "wf": 5e-6, "wg": 0, "wm": 0, "wn": 43e-6, "w ": 184e-6, "wy": 16e-6, "wo": 103e-6, "uc": 644e-6, "up": 535e-6, "uv": 76e-6, "ud": 644e-6, "uh": 32e-6, "uk": 97e-6, "ua": 219e-5, "us": 1655e-6, "uw": 11e-6, "uu": 5e-6, "uz": 319e-6, "ut": 1606e-6, "ue": 1238e-6, "ur": 1877e-6, "ul": 1168e-6, "uj": 27e-6, "ub": 746e-6, "ux": 59e-6, "ui": 1147e-6, "uq": 0, "uf": 157e-6, "ug": 438e-6, "um": 833e-6, "un": 0.010692, "u ": 941e-6, "uy": 27e-6, "uo": 1109e-6, "zc": 5e-6, "zp": 16e-6, "zv": 0, "zd": 5e-6, "zh": 43e-6, "zk": 0, "za": 1287e-6, "zs": 11e-6, "zw": 11e-6, "zu": 81e-6, "zz": 1082e-6, "zt": 5e-6, "ze": 443e-6, "zr": 11e-6, "zl": 27e-6, "zj": 0, "zb": 11e-6, "zx": 0, "zi": 271e-5, "zq": 0, "zf": 0, "zg": 5e-6, "zm": 0, "zn": 16e-6, "z ": 206e-6, "zy": 27e-6, "zo": 611e-6, "tc": 81e-6, "tp": 16e-6, "tv": 22e-6, "td": 16e-6, "th": 649e-6, "tk": 27e-6, "ta": 0.012855, "ts": 146e-6, "tw": 49e-6, "tu": 265e-5, "tz": 87e-6, "tt": 5949e-6, "te": 9102e-6, "tr": 5003e-6, "tl": 206e-6, "tj": 27e-6, "tb": 227e-6, "tx": 0, "ti": 8248e-6, "tq": 0, "tf": 16e-6, "tg": 65e-6, "tm": 43e-6, "tn": 76e-6, "t ": 2472e-6, "ty": 97e-6, "to": 0.012791, "ec": 1547e-6, "ep": 59e-5, "ev": 752e-6, "ed": 2142e-6, "eh": 59e-6, "ek": 124e-6, "ea": 1666e-6, "es": 6187e-6, "ew": 162e-6, "eu": 411e-6, "ez": 433e-6, "et": 3743e-6, "ee": 33e-5, "er": 0.010643, "el": 0.014013, "ej": 38e-6, "eb": 357e-6, "ex": 471e-6, "ei": 1206e-6, "eq": 7e-5, "ef": 254e-6, "eg": 2553e-6, "em": 1752e-6, "en": 9443e-6, "e ": 0.0314, "ey": 222e-6, "eo": 784e-6, "rc": 1071e-6, "rp": 211e-6, "rv": 352e-6, "rd": 99e-5, "rh": 38e-6, "rk": 168e-6, "ra": 9129e-6, "rs": 1033e-6, "rw": 16e-6, "ru": 1287e-6, "rz": 222e-6, "rt": 3131e-6, "re": 9827e-6, "rr": 1449e-6, "rl": 362e-6, "rj": 5e-6, "rb": 319e-6, "rx": 0, "ri": 8761e-6, "rq": 22e-6, "rf": 206e-6, "rg": 757e-6, "rm": 1076e-6, "rn": 1022e-6, "r ": 2585e-6, "ry": 26e-5, "ro": 5949e-6, "lc": 698e-6, "lp": 178e-6, "lv": 254e-6, "ld": 297e-6, "lh": 103e-6, "lk": 59e-6, "la": 0.01259, "ls": 254e-6, "lw": 5e-6, "lu": 1585e-6, "lz": 27e-6, "lt": 133e-5, "le": 7161e-6, "lr": 32e-6, "ll": 0.011206, "lj": 22e-6, "lb": 276e-6, "lx": 5e-6, "li": 8702e-6, "lq": 0, "lf": 124e-6, "lg": 195e-6, "lm": 817e-6, "ln": 54e-6, "l ": 0.010557, "ly": 135e-6, "lo": 4245e-6, "jc": 5e-6, "jp": 11e-6, "jv": 0, "jd": 16e-6, "jh": 16e-6, "jk": 11e-6, "ja": 324e-6, "js": 16e-6, "jw": 0, "ju": 151e-6, "jz": 5e-6, "jt": 5e-6, "je": 103e-6, "jr": 38e-6, "jl": 5e-6, "jj": 5e-6, "jb": 5e-6, "jx": 0, "ji": 65e-6, "jq": 0, "jf": 0, "jg": 0, "jm": 0, "jn": 16e-6, "j ": 146e-6, "jy": 0, "jo": 346e-6, "bc": 22e-6, "bp": 0, "bv": 0, "bd": 32e-6, "bh": 27e-6, "bk": 16e-6, "ba": 1698e-6, "bs": 32e-6, "bw": 0, "bu": 546e-6, "bz": 0, "bt": 22e-6, "be": 1168e-6, "br": 1282e-6, "bl": 66e-5, "bj": 5e-6, "bb": 703e-6, "bx": 0, "bi": 2261e-6, "bq": 0, "bf": 5e-6, "bg": 5e-6, "bm": 5e-6, "bn": 22e-6, "b ": 157e-6, "by": 76e-6, "bo": 741e-6, "xc": 0, "xp": 5e-6, "xv": 65e-6, "xd": 0, "xh": 0, "xk": 0, "xa": 87e-6, "xs": 22e-6, "xw": 0, "xu": 0, "xz": 0, "xt": 22e-6, "xe": 16e-6, "xr": 0, "xl": 0, "xj": 0, "xb": 11e-6, "xx": 49e-6, "xi": 124e-6, "xq": 0, "xf": 16e-6, "xg": 0, "xm": 0, "xn": 0, "x ": 573e-6, "xy": 11e-6, "xo": 16e-6, "ic": 6668e-6, "ip": 1271e-6, "iv": 2034e-6, "id": 1412e-6, "ih": 43e-6, "ik": 151e-6, "ia": 8248e-6, "is": 5024e-6, "iw": 27e-6, "iu": 514e-6, "iz": 1244e-6, "it": 8523e-6, "ie": 3018e-6, "ir": 1558e-6, "il": 5533e-6, "ij": 114e-6, "ib": 525e-6, "ix": 97e-6, "ii": 33e-5, "iq": 32e-6, "if": 752e-6, "ig": 1574e-6, "im": 2704e-6, "in": 9957e-6, "i ": 0.020779, "iy": 16e-6, "io": 7566e-6, "qc": 0, "qp": 0, "qv": 0, "qd": 0, "qh": 5e-6, "qk": 0, "qa": 11e-6, "qs": 0, "qw": 0, "qu": 1282e-6, "qz": 0, "qt": 11e-6, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 0, "qq": 0, "qf": 5e-6, "qg": 0, "qm": 0, "qn": 0, "q ": 43e-6, "qy": 0, "qo": 0, "fc": 22e-6, "fp": 0, "fv": 0, "fd": 11e-6, "fh": 0, "fk": 0, "fa": 1168e-6, "fs": 11e-6, "fw": 0, "fu": 687e-6, "fz": 0, "ft": 76e-6, "fe": 1244e-6, "fr": 1514e-6, "fl": 211e-6, "fj": 5e-6, "fb": 11e-6, "fx": 0, "fi": 1963e-6, "fq": 0, "ff": 465e-6, "fg": 16e-6, "fm": 5e-6, "fn": 11e-6, "f ": 287e-6, "fy": 0, "fo": 1439e-6, "gc": 16e-6, "gp": 11e-6, "gv": 0, "gd": 0, "gh": 422e-6, "gk": 16e-6, "ga": 1347e-6, "gs": 65e-6, "gw": 22e-6, "gu": 1082e-6, "gz": 5e-6, "gt": 38e-6, "ge": 1801e-6, "gr": 1168e-6, "gl": 1812e-6, "gj": 0, "gb": 32e-6, "gx": 5e-6, "gi": 3602e-6, "gq": 0, "gf": 5e-6, "gg": 898e-6, "gm": 38e-6, "gn": 1141e-6, "g ": 525e-6, "gy": 16e-6, "go": 1422e-6, "mc": 22e-6, "mp": 1309e-6, "mv": 0, "md": 11e-6, "mh": 5e-6, "mk": 16e-6, "ma": 4808e-6, "ms": 114e-6, "mw": 22e-6, "mu": 2023e-6, "mz": 16e-6, "mt": 22e-6, "me": 5381e-6, "mr": 43e-6, "ml": 27e-6, "mj": 16e-6, "mb": 736e-6, "mx": 0, "mi": 272e-5, "mq": 0, "mf": 16e-6, "mg": 0, "mm": 671e-6, "mn": 38e-6, "m ": 1184e-6, "my": 76e-6, "mo": 2704e-6, "nc": 2699e-6, "np": 32e-6, "nv": 178e-6, "nd": 3169e-6, "nh": 65e-6, "nk": 168e-6, "na": 7615e-6, "ns": 1936e-6, "nw": 32e-6, "nu": 698e-6, "nz": 903e-6, "nt": 8745e-6, "ne": 0.01166, "nr": 92e-6, "nl": 59e-6, "nj": 22e-6, "nb": 92e-6, "nx": 0, "ni": 5635e-6, "nq": 119e-6, "nf": 395e-6, "ng": 1714e-6, "nm": 54e-6, "nn": 1433e-6, "n ": 0.010508, "ny": 146e-6, "no": 6382e-6, " c": 0.014597, " p": 9762e-6, " v": 2948e-6, " d": 0.024635, " h": 1195e-6, " k": 909e-6, " a": 0.010854, " s": 0.014527, " w": 622e-6, " u": 8502e-6, " z": 26e-5, " t": 4343e-6, " e": 7134e-6, " r": 4738e-6, " l": 7025e-6, " j": 806e-6, " b": 3007e-6, " x": 216e-6, " i": 8372e-6, " q": 822e-6, " f": 5484e-6, " g": 3791e-6, " m": 5987e-6, " n": 6349e-6, "  ": 0.012931, " y": 173e-6, " o": 2315e-6, "yc": 7e-5, "yp": 49e-6, "yv": 0, "yd": 22e-6, "yh": 5e-6, "yk": 43e-6, "ya": 119e-6, "ys": 13e-5, "yw": 11e-6, "yu": 27e-6, "yz": 5e-6, "yt": 27e-6, "ye": 146e-6, "yr": 32e-6, "yl": 97e-6, "yj": 27e-6, "yb": 22e-6, "yx": 11e-6, "yi": 16e-6, "yq": 0, "yf": 0, "yg": 16e-6, "ym": 16e-6, "yn": 7e-5, "y ": 1006e-6, "yy": 5e-6, "yo": 103e-6, "oc": 1969e-6, "op": 1558e-6, "ov": 2142e-6, "od": 1076e-6, "oh": 124e-6, "ok": 135e-6, "oa": 233e-6, "os": 2482e-6, "ow": 157e-6, "ou": 514e-6, "oz": 119e-6, "ot": 2001e-6, "oe": 233e-6, "or": 7604e-6, "ol": 5219e-6, "oj": 11e-6, "ob": 519e-6, "ox": 43e-6, "oi": 492e-6, "oq": 22e-6, "of": 395e-6, "og": 1233e-6, "om": 4473e-6, "on": 0.011768, "o ": 0.025976, "oy": 54e-6, "oo": 352e-6 };
const bigram_it = {
  total_count: total_count$8,
  probabilities: probabilities$8
};
const total_count$7 = 187162;
const probabilities$7 = { "cc": 96e-6, "cp": 5e-6, "cv": 0, "cd": 16e-6, "ch": 7079e-6, "ck": 315e-6, "ca": 1138e-6, "cs": 11e-6, "cw": 16e-6, "cu": 449e-6, "cz": 43e-6, "ct": 1256e-6, "ce": 1603e-6, "cr": 294e-6, "cl": 246e-6, "cj": 5e-6, "cb": 0, "cx": 5e-6, "ci": 1159e-6, "cq": 27e-6, "cf": 11e-6, "cg": 5e-6, "cm": 16e-6, "cn": 11e-6, "c ": 283e-6, "cy": 118e-6, "co": 1565e-6, "pc": 11e-6, "pp": 1074e-6, "pv": 43e-6, "pd": 16e-6, "ph": 459e-6, "pk": 48e-6, "pa": 1886e-6, "ps": 305e-6, "pw": 0, "pu": 94e-5, "pz": 21e-6, "pt": 31e-5, "pe": 3297e-6, "pr": 1421e-6, "pl": 125e-5, "pj": 16e-6, "pb": 48e-6, "px": 0, "pi": 1127e-6, "pq": 0, "pf": 11e-6, "pg": 176e-6, "pm": 37e-6, "pn": 11e-6, "p ": 2084e-6, "py": 48e-6, "po": 133e-5, "vc": 21e-6, "vp": 5e-6, "vv": 11e-6, "vd": 11e-6, "vh": 0, "vk": 11e-6, "va": 8437e-6, "vs": 43e-6, "vw": 27e-6, "vu": 69e-6, "vz": 0, "vt": 0, "ve": 4146e-6, "vr": 289e-6, "vl": 978e-6, "vj": 21e-6, "vb": 11e-6, "vx": 0, "vi": 187e-5, "vq": 0, "vf": 0, "vg": 0, "vm": 0, "vn": 37e-6, "v ": 16e-5, "vy": 27e-6, "vo": 3468e-6, "dc": 37e-6, "dp": 118e-6, "dv": 48e-6, "dd": 278e-6, "dh": 176e-6, "dk": 182e-6, "da": 2885e-6, "ds": 1736e-6, "dw": 246e-6, "du": 834e-6, "dz": 53e-6, "dt": 657e-6, "de": 0.022948, "dr": 101e-5, "dl": 96e-6, "dj": 48e-6, "db": 112e-6, "dx": 0, "di": 4579e-6, "dq": 5e-6, "df": 21e-6, "dg": 64e-6, "dm": 75e-6, "dn": 8e-5, "d ": 6609e-6, "dy": 107e-6, "do": 2725e-6, "hc": 0, "hp": 11e-6, "hv": 37e-6, "hd": 5e-6, "hh": 11e-6, "hk": 16e-6, "ha": 3136e-6, "hs": 32e-6, "hw": 32e-6, "hu": 63e-5, "hz": 27e-6, "ht": 1843e-6, "he": 9751e-6, "hr": 609e-6, "hl": 64e-6, "hj": 5e-6, "hb": 21e-6, "hx": 0, "hi": 2404e-6, "hq": 0, "hf": 5e-6, "hg": 11e-6, "hm": 37e-6, "hn": 144e-6, "h ": 962e-6, "hy": 182e-6, "ho": 1988e-6, "kc": 16e-6, "kp": 32e-6, "kv": 27e-6, "kd": 48e-6, "kh": 155e-6, "kk": 369e-6, "ka": 1731e-6, "ks": 54e-5, "kw": 112e-6, "ku": 401e-6, "kz": 27e-6, "kt": 1218e-6, "ke": 3687e-6, "kr": 486e-6, "kl": 54e-5, "kj": 27e-6, "kb": 59e-6, "kx": 0, "ki": 732e-6, "kq": 0, "kf": 32e-6, "kg": 96e-6, "km": 337e-6, "kn": 176e-6, "k ": 3078e-6, "ky": 75e-6, "ko": 1047e-6, "ac": 1736e-6, "ap": 1549e-6, "av": 582e-6, "ad": 1817e-6, "ah": 91e-6, "ak": 1619e-6, "aa": 8629e-6, "as": 3329e-6, "aw": 75e-6, "au": 972e-6, "az": 278e-6, "at": 4777e-6, "ae": 1411e-6, "ar": 6465e-6, "al": 5696e-6, "aj": 134e-6, "ab": 609e-6, "ax": 112e-6, "ai": 823e-6, "aq": 37e-6, "af": 759e-6, "ag": 1085e-6, "am": 4312e-6, "an": 0.016937, "a ": 3703e-6, "ay": 23e-5, "ao": 96e-6, "sc": 3959e-6, "sp": 1817e-6, "sv": 23e-5, "sd": 337e-6, "sh": 395e-6, "sk": 609e-6, "sa": 1272e-6, "ss": 1886e-6, "sw": 118e-6, "su": 502e-6, "sz": 85e-6, "st": 9388e-6, "se": 5295e-6, "sr": 128e-6, "sl": 1101e-6, "sj": 23e-5, "sb": 342e-6, "sx": 0, "si": 1651e-6, "sq": 11e-6, "sf": 8e-5, "sg": 102e-6, "sm": 251e-6, "sn": 246e-6, "s ": 0.01675, "sy": 198e-6, "so": 2078e-6, "wc": 5e-6, "wp": 5e-6, "wv": 0, "wd": 91e-6, "wh": 27e-6, "wk": 21e-6, "wa": 2869e-6, "ws": 91e-6, "ww": 32e-6, "wu": 16e-6, "wz": 27e-6, "wt": 21e-6, "we": 4082e-6, "wr": 59e-6, "wl": 16e-6, "wj": 0, "wb": 11e-6, "wx": 0, "wi": 1127e-6, "wq": 0, "wf": 27e-6, "wg": 5e-6, "wm": 11e-6, "wn": 48e-6, "w ": 395e-6, "wy": 43e-6, "wo": 2046e-6, "uc": 545e-6, "up": 182e-6, "uv": 85e-6, "ud": 55e-5, "uh": 11e-6, "uk": 144e-6, "ua": 417e-6, "us": 2137e-6, "uw": 85e-5, "uu": 545e-6, "uz": 224e-6, "ut": 801e-6, "ue": 294e-6, "ur": 2281e-6, "ul": 844e-6, "uj": 16e-6, "ub": 1047e-6, "ux": 85e-6, "ui": 4408e-6, "uq": 16e-6, "uf": 64e-6, "ug": 443e-6, "um": 834e-6, "un": 1133e-6, "u ": 422e-6, "uy": 53e-6, "uo": 48e-6, "zc": 5e-6, "zp": 5e-6, "zv": 0, "zd": 0, "zh": 11e-6, "zk": 5e-6, "za": 556e-6, "zs": 21e-6, "zw": 23e-5, "zu": 47e-5, "zz": 75e-6, "zt": 21e-6, "ze": 1309e-6, "zr": 48e-6, "zl": 21e-6, "zj": 69e-6, "zb": 21e-6, "zx": 0, "zi": 172e-5, "zq": 0, "zf": 0, "zg": 11e-6, "zm": 11e-6, "zn": 27e-6, "z ": 192e-6, "zy": 37e-6, "zo": 646e-6, "tc": 75e-6, "tp": 123e-6, "tv": 182e-6, "td": 118e-6, "th": 1453e-6, "tk": 8e-5, "ta": 3836e-6, "ts": 2517e-6, "tw": 614e-6, "tu": 1277e-6, "tz": 75e-6, "tt": 705e-6, "te": 0.011461, "tr": 2468e-6, "tl": 267e-6, "tj": 176e-6, "tb": 465e-6, "tx": 0, "ti": 3884e-6, "tq": 5e-6, "tf": 53e-6, "tg": 315e-6, "tm": 182e-6, "tn": 64e-6, "t ": 0.021078, "ty": 219e-6, "to": 28e-4, "ec": 1224e-6, "ep": 1726e-6, "ev": 1822e-6, "ed": 265e-5, "eh": 449e-6, "ek": 1758e-6, "ea": 663e-6, "es": 4606e-6, "ew": 369e-6, "eu": 1539e-6, "ez": 695e-6, "et": 0.01013, "ee": 0.015083, "er": 0.019566, "el": 9901e-6, "ej": 69e-6, "eb": 1069e-6, "ex": 203e-6, "ei": 2308e-6, "eq": 27e-6, "ef": 994e-6, "eg": 2009e-6, "em": 3371e-6, "en": 0.028975, "e ": 0.032982, "ey": 15e-5, "eo": 534e-6, "rc": 331e-6, "rp": 502e-6, "rv": 7e-4, "rd": 4654e-6, "rh": 31e-5, "rk": 1175e-6, "ra": 4365e-6, "rs": 3751e-6, "rw": 315e-6, "ru": 1309e-6, "rz": 251e-6, "rt": 3313e-6, "re": 4996e-6, "rr": 908e-6, "rl": 1405e-6, "rj": 48e-6, "rb": 598e-6, "rx": 0, "ri": 5631e-6, "rq": 21e-6, "rf": 208e-6, "rg": 1325e-6, "rm": 1069e-6, "rn": 93e-5, "r ": 9735e-6, "ry": 214e-6, "ro": 4643e-6, "lc": 102e-6, "lp": 128e-6, "lv": 294e-6, "ld": 2356e-6, "lh": 123e-6, "lk": 502e-6, "la": 5712e-6, "ls": 1838e-6, "lw": 91e-6, "lu": 967e-6, "lz": 59e-6, "lt": 1127e-6, "le": 4899e-6, "lr": 107e-6, "ll": 2287e-6, "lj": 75e-6, "lb": 24e-5, "lx": 0, "li": 7982e-6, "lq": 0, "lf": 443e-6, "lg": 417e-6, "lm": 374e-6, "ln": 75e-6, "l ": 3772e-6, "ly": 315e-6, "lo": 2159e-6, "jc": 0, "jp": 11e-6, "jv": 112e-6, "jd": 524e-6, "jh": 32e-6, "jk": 2057e-6, "ja": 1042e-6, "js": 283e-6, "jw": 21e-6, "ju": 23e-5, "jz": 69e-6, "jt": 21e-6, "je": 689e-6, "jr": 32e-6, "jl": 48e-6, "jj": 0, "jb": 11e-6, "jx": 0, "ji": 59e-6, "jq": 0, "jf": 155e-6, "jg": 27e-6, "jm": 16e-6, "jn": 1149e-6, "j ": 1923e-6, "jy": 16e-6, "jo": 534e-6, "bc": 5e-6, "bp": 16e-6, "bv": 11e-6, "bd": 48e-6, "bh": 16e-6, "bk": 11e-6, "ba": 1619e-6, "bs": 91e-6, "bw": 0, "bu": 775e-6, "bz": 5e-6, "bt": 27e-6, "be": 4146e-6, "br": 1224e-6, "bl": 109e-5, "bj": 64e-6, "bb": 208e-6, "bx": 0, "bi": 1897e-6, "bq": 0, "bf": 0, "bg": 0, "bm": 43e-6, "bn": 43e-6, "b ": 219e-6, "by": 139e-6, "bo": 1224e-6, "xc": 11e-6, "xp": 37e-6, "xv": 32e-6, "xd": 0, "xh": 16e-6, "xk": 0, "xa": 53e-6, "xs": 11e-6, "xw": 0, "xu": 0, "xz": 0, "xt": 32e-6, "xe": 85e-6, "xr": 0, "xl": 5e-6, "xj": 0, "xb": 0, "xx": 0, "xi": 96e-6, "xq": 0, "xf": 5e-6, "xg": 0, "xm": 0, "xn": 0, "x ": 176e-6, "xy": 5e-6, "xo": 48e-6, "ic": 288e-5, "ip": 39e-5, "iv": 593e-6, "id": 2671e-6, "ih": 21e-6, "ik": 956e-6, "ia": 1341e-6, "is": 0.010568, "iw": 75e-6, "iu": 267e-6, "iz": 235e-6, "it": 514e-5, "ie": 7587e-6, "ir": 823e-6, "il": 3703e-6, "ij": 6363e-6, "ib": 267e-6, "ix": 69e-6, "ii": 331e-6, "iq": 48e-6, "if": 289e-6, "ig": 2949e-6, "im": 582e-6, "in": 0.01371, "i ": 1795e-6, "iy": 27e-6, "io": 1774e-6, "qc": 11e-6, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 0, "qa": 11e-6, "qs": 5e-6, "qw": 0, "qu": 23e-5, "qz": 0, "qt": 0, "qe": 11e-6, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 0, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 11e-6, "qy": 0, "qo": 11e-6, "fc": 102e-6, "fp": 43e-6, "fv": 43e-6, "fd": 358e-6, "fh": 27e-6, "fk": 69e-6, "fa": 1459e-6, "fs": 208e-6, "fw": 75e-6, "fu": 203e-6, "fz": 5e-6, "ft": 7e-4, "fe": 598e-6, "fr": 86e-5, "fl": 134e-6, "fj": 43e-6, "fb": 53e-6, "fx": 0, "fi": 561e-6, "fq": 0, "ff": 224e-6, "fg": 91e-6, "fm": 16e-6, "fn": 27e-6, "f ": 1159e-6, "fy": 21e-6, "fo": 422e-6, "gc": 91e-6, "gp": 11e-6, "gv": 64e-6, "gd": 411e-6, "gh": 24e-5, "gk": 69e-6, "ga": 972e-6, "gs": 454e-6, "gw": 37e-6, "gu": 369e-6, "gz": 5e-6, "gt": 689e-6, "ge": 0.010141, "gr": 1619e-6, "gl": 267e-6, "gj": 43e-6, "gb": 75e-6, "gx": 5e-6, "gi": 962e-6, "gq": 5e-6, "gf": 5e-6, "gg": 96e-6, "gm": 8e-5, "gn": 15e-5, "g ": 3719e-6, "gy": 75e-6, "go": 545e-6, "mc": 37e-6, "mp": 807e-6, "mv": 8e-5, "md": 315e-6, "mh": 11e-6, "mk": 5e-6, "ma": 3131e-6, "ms": 508e-6, "mw": 16e-6, "mu": 684e-6, "mz": 32e-6, "mt": 342e-6, "me": 5952e-6, "mr": 59e-6, "ml": 5e-6, "mj": 0, "mb": 641e-6, "mx": 0, "mi": 2789e-6, "mq": 0, "mf": 48e-6, "mg": 48e-6, "mm": 406e-6, "mn": 64e-6, "m ": 312e-5, "my": 112e-6, "mo": 1127e-6, "nc": 839e-6, "np": 8e-5, "nv": 337e-6, "nd": 6999e-6, "nh": 246e-6, "nk": 657e-6, "na": 4061e-6, "ns": 4472e-6, "nw": 1085e-6, "nu": 433e-6, "nz": 198e-6, "nt": 4659e-6, "ne": 4472e-6, "nr": 171e-6, "nl": 208e-6, "nj": 85e-6, "nb": 374e-6, "nx": 37e-6, "ni": 2538e-6, "nq": 5e-6, "nf": 16e-5, "ng": 3521e-6, "nm": 118e-6, "nn": 1079e-6, "n ": 0.03746, "ny": 155e-6, "no": 1865e-6, " c": 281e-5, " p": 4253e-6, " v": 0.013117, " d": 0.020528, " h": 0.010403, " k": 3436e-6, " a": 6278e-6, " s": 7929e-6, " w": 639e-5, " u": 2837e-6, " z": 2891e-6, " t": 5338e-6, " e": 0.014303, " r": 2362e-6, " l": 3302e-6, " j": 1448e-6, " b": 6209e-6, " x": 59e-6, " i": 0.014399, " q": 69e-6, " f": 281e-5, " g": 7309e-6, " m": 5546e-6, " n": 4103e-6, "  ": 631e-5, " y": 102e-6, " o": 5749e-6, "yc": 144e-6, "yp": 118e-6, "yv": 11e-6, "yd": 96e-6, "yh": 16e-6, "yk": 53e-6, "ya": 144e-6, "ys": 24e-5, "yw": 0, "yu": 0, "yz": 5e-6, "yt": 75e-6, "ye": 107e-6, "yr": 155e-6, "yl": 246e-6, "yj": 0, "yb": 48e-6, "yx": 0, "yi": 37e-6, "yq": 0, "yf": 5e-6, "yg": 21e-6, "ym": 214e-6, "yn": 155e-6, "y ": 801e-6, "yy": 5e-6, "yo": 91e-6, "oc": 673e-6, "op": 2923e-6, "ov": 1181e-6, "od": 834e-6, "oh": 187e-6, "ok": 876e-6, "oa": 219e-6, "os": 1448e-6, "ow": 251e-6, "ou": 1533e-6, "oz": 128e-6, "ot": 1902e-6, "oe": 2522e-6, "or": 9265e-6, "ol": 2725e-6, "oj": 75e-6, "ob": 379e-6, "ox": 37e-6, "oi": 379e-6, "oq": 11e-6, "of": 109e-5, "og": 1074e-6, "om": 2404e-6, "on": 6941e-6, "o ": 1389e-6, "oy": 118e-6, "oo": 803e-5 };
const bigram_nl = {
  total_count: total_count$7,
  probabilities: probabilities$7
};
const total_count$6 = 171425;
const probabilities$6 = { "cc": 175e-6, "cp": 478e-6, "cv": 29e-6, "cd": 41e-6, "ch": 1715e-6, "ck": 257e-6, "ca": 6586e-6, "cs": 117e-6, "cw": 0, "cu": 933e-6, "cz": 6e-6, "ct": 49e-5, "ce": 3325e-6, "cr": 1149e-6, "cl": 98e-5, "cj": 18e-6, "cb": 0, "cx": 0, "ci": 5314e-6, "cq": 18e-6, "cf": 58e-6, "cg": 23e-6, "cm": 53e-6, "cn": 105e-6, "c ": 531e-6, "cy": 82e-6, "co": 0.010366, "pc": 799e-6, "pp": 111e-6, "pv": 12e-6, "pd": 18e-6, "ph": 414e-6, "pk": 12e-6, "pa": 427e-5, "ps": 274e-6, "pw": 6e-6, "pu": 974e-6, "pz": 0, "pt": 408e-6, "pe": 3821e-6, "pr": 3191e-6, "pl": 642e-6, "pj": 0, "pb": 134e-6, "px": 0, "pi": 1808e-6, "pq": 0, "pf": 23e-6, "pg": 12e-6, "pm": 29e-6, "pn": 0, "p ": 274e-6, "py": 29e-6, "po": 5775e-6, "vc": 18e-6, "vp": 0, "vv": 12e-6, "vd": 53e-6, "vh": 12e-6, "vk": 0, "va": 2129e-6, "vs": 128e-6, "vw": 0, "vu": 47e-6, "vz": 0, "vt": 12e-6, "ve": 2573e-6, "vr": 233e-6, "vl": 23e-6, "vj": 12e-6, "vb": 29e-6, "vx": 0, "vi": 1849e-6, "vq": 35e-6, "vf": 0, "vg": 6e-6, "vm": 0, "vn": 257e-6, "v ": 158e-6, "vy": 12e-6, "vo": 1009e-6, "dc": 158e-6, "dp": 35e-6, "dv": 76e-6, "dd": 58e-6, "dh": 18e-6, "dk": 6e-6, "da": 0.010459, "ds": 187e-6, "dw": 18e-6, "du": 1038e-6, "dz": 0, "dt": 76e-6, "de": 0.020353, "dr": 63e-5, "dl": 41e-6, "dj": 18e-6, "db": 12e-6, "dx": 0, "di": 3255e-6, "dq": 6e-6, "df": 6e-6, "dg": 29e-6, "dm": 665e-6, "dn": 111e-6, "d ": 881e-6, "dy": 88e-6, "do": 0.011655, "hc": 18e-6, "hp": 6e-6, "hv": 12e-6, "hd": 18e-6, "hh": 0, "hk": 0, "ha": 3914e-6, "hs": 41e-6, "hw": 12e-6, "hu": 327e-6, "hz": 0, "ht": 88e-6, "he": 1744e-6, "hr": 14e-5, "hl": 41e-6, "hj": 0, "hb": 12e-6, "hx": 0, "hi": 992e-6, "hq": 6e-6, "hf": 12e-6, "hg": 0, "hm": 41e-6, "hn": 99e-6, "h ": 426e-6, "hy": 193e-6, "ho": 168e-5, "kc": 0, "kp": 0, "kv": 0, "kd": 18e-6, "kh": 35e-6, "kk": 12e-6, "ka": 356e-6, "ks": 82e-6, "kw": 35e-6, "ku": 7e-5, "kz": 0, "kt": 6e-6, "ke": 245e-6, "kr": 88e-6, "kl": 41e-6, "kj": 0, "kb": 0, "kx": 0, "ki": 222e-6, "kq": 0, "kf": 12e-6, "kg": 0, "km": 1219e-6, "kn": 29e-6, "k ": 379e-6, "ky": 76e-6, "ko": 117e-6, "ac": 2298e-6, "ap": 1243e-6, "av": 1149e-6, "ad": 9013e-6, "ah": 193e-6, "ak": 198e-6, "aa": 233e-6, "as": 686e-5, "aw": 58e-6, "au": 846e-6, "az": 49e-5, "at": 4375e-6, "ae": 1272e-6, "ar": 7274e-6, "al": 7467e-6, "aj": 82e-6, "ab": 2106e-6, "ax": 58e-6, "ai": 2246e-6, "aq": 158e-6, "af": 292e-6, "ag": 1149e-6, "am": 5373e-6, "an": 0.010179, "a ": 0.040047, "ay": 292e-6, "ao": 1943e-6, "sc": 1499e-6, "sp": 1803e-6, "sv": 53e-6, "sd": 245e-6, "sh": 321e-6, "sk": 105e-6, "sa": 2888e-6, "ss": 2508e-6, "sw": 35e-6, "su": 2147e-6, "sz": 18e-6, "st": 8488e-6, "se": 6102e-6, "sr": 327e-6, "sl": 175e-6, "sj": 0, "sb": 163e-6, "sx": 0, "si": 3844e-6, "sq": 21e-5, "sf": 7e-5, "sg": 47e-6, "sm": 391e-6, "sn": 163e-6, "s ": 0.017874, "sy": 76e-6, "so": 3109e-6, "wc": 0, "wp": 0, "wv": 0, "wd": 6e-6, "wh": 41e-6, "wk": 6e-6, "wa": 274e-6, "ws": 35e-6, "ww": 18e-6, "wu": 6e-6, "wz": 0, "wt": 0, "we": 128e-6, "wr": 35e-6, "wl": 6e-6, "wj": 0, "wb": 12e-6, "wx": 12e-6, "wi": 181e-6, "wq": 0, "wf": 18e-6, "wg": 0, "wm": 0, "wn": 64e-6, "w ": 88e-6, "wy": 12e-6, "wo": 163e-6, "uc": 42e-5, "up": 519e-6, "uv": 152e-6, "ud": 718e-6, "uh": 29e-6, "uk": 23e-6, "ua": 2438e-6, "us": 2048e-6, "uw": 6e-6, "uu": 0, "uz": 286e-6, "ut": 1575e-6, "ue": 2864e-6, "ur": 2106e-6, "ul": 2293e-6, "uj": 7e-5, "ub": 764e-6, "ux": 7e-5, "ui": 1686e-6, "uq": 35e-6, "uf": 82e-6, "ug": 56e-5, "um": 8039e-6, "un": 3821e-6, "u ": 2193e-6, "uy": 41e-6, "uo": 193e-6, "zc": 0, "zp": 0, "zv": 6e-6, "zd": 0, "zh": 6e-6, "zk": 12e-6, "za": 1196e-6, "zs": 0, "zw": 0, "zu": 111e-6, "zz": 76e-6, "zt": 6e-6, "ze": 362e-6, "zr": 6e-6, "zl": 12e-6, "zj": 0, "zb": 0, "zx": 0, "zi": 263e-6, "zq": 6e-6, "zf": 0, "zg": 6e-6, "zm": 12e-6, "zn": 64e-6, "z ": 718e-6, "zy": 35e-6, "zo": 163e-6, "tc": 88e-6, "tp": 41e-6, "tv": 117e-6, "td": 158e-6, "th": 729e-6, "tk": 18e-6, "ta": 8704e-6, "ts": 268e-6, "tw": 41e-6, "tu": 2491e-6, "tz": 58e-6, "tt": 35e-5, "te": 0.011294, "tr": 5373e-6, "tl": 327e-6, "tj": 6e-6, "tb": 7e-5, "tx": 6e-6, "ti": 5349e-6, "tq": 0, "tf": 41e-6, "tg": 47e-6, "tm": 93e-6, "tn": 449e-6, "t ": 1289e-6, "ty": 111e-6, "to": 6108e-6, "ec": 2083e-6, "ep": 1493e-6, "ev": 858e-6, "ed": 1365e-6, "eh": 41e-6, "ek": 82e-6, "ea": 2363e-6, "es": 0.013434, "ew": 111e-6, "eu": 1248e-6, "ez": 42e-5, "et": 2112e-6, "ee": 28e-5, "er": 8628e-6, "el": 434e-5, "ej": 228e-6, "eb": 706e-6, "ex": 904e-6, "ei": 3063e-6, "eq": 315e-6, "ef": 432e-6, "eg": 2234e-6, "em": 5892e-6, "en": 0.010629, "e ": 0.033117, "ey": 222e-6, "eo": 1062e-6, "rc": 881e-6, "rp": 286e-6, "rv": 315e-6, "rd": 928e-6, "rh": 7e-5, "rk": 111e-6, "ra": 0.011451, "rs": 817e-6, "rw": 23e-6, "ru": 904e-6, "rz": 47e-6, "rt": 3646e-6, "re": 8727e-6, "rr": 1108e-6, "rl": 239e-6, "rj": 12e-6, "rb": 216e-6, "rx": 23e-6, "ri": 7111e-6, "rq": 222e-6, "rf": 88e-6, "rg": 718e-6, "rm": 1342e-6, "rn": 1167e-6, "r ": 5763e-6, "ry": 28e-5, "ro": 6662e-6, "lc": 268e-6, "lp": 193e-6, "lv": 385e-6, "ld": 344e-6, "lh": 922e-6, "lk": 53e-6, "la": 4766e-6, "ls": 257e-6, "lw": 18e-6, "lu": 1283e-6, "lz": 18e-6, "lt": 1108e-6, "le": 4043e-6, "lr": 47e-6, "ll": 1155e-6, "lj": 53e-6, "lb": 397e-6, "lx": 99e-6, "li": 5273e-6, "lq": 29e-6, "lf": 193e-6, "lg": 286e-6, "lm": 1196e-6, "ln": 163e-6, "l ": 4533e-6, "ly": 152e-6, "lo": 3144e-6, "jc": 0, "jp": 18e-6, "jv": 6e-6, "jd": 0, "jh": 0, "jk": 0, "ja": 665e-6, "js": 12e-6, "jw": 0, "ju": 589e-6, "jz": 0, "jt": 0, "je": 268e-6, "jr": 47e-6, "jl": 18e-6, "jj": 0, "jb": 0, "jx": 0, "ji": 53e-6, "jq": 0, "jf": 6e-6, "jg": 0, "jm": 6e-6, "jn": 29e-6, "j ": 14e-5, "jy": 0, "jo": 1003e-6, "bc": 58e-6, "bp": 12e-6, "bv": 0, "bd": 47e-6, "bh": 12e-6, "bk": 28e-5, "ba": 1698e-6, "bs": 181e-6, "bw": 0, "bu": 624e-6, "bz": 6e-6, "bt": 58e-6, "be": 1079e-6, "br": 2153e-6, "bl": 478e-6, "bj": 35e-6, "bb": 93e-6, "bx": 0, "bi": 1943e-6, "bq": 6e-6, "bf": 35e-6, "bg": 64e-6, "bm": 391e-6, "bn": 0, "b ": 233e-6, "by": 41e-6, "bo": 1563e-6, "xc": 82e-6, "xp": 88e-6, "xv": 41e-6, "xd": 6e-6, "xh": 6e-6, "xk": 0, "xa": 193e-6, "xs": 0, "xw": 0, "xu": 23e-6, "xz": 0, "xt": 216e-6, "xe": 134e-6, "xr": 23e-6, "xl": 18e-6, "xj": 12e-6, "xb": 35e-6, "xx": 29e-6, "xi": 49e-5, "xq": 0, "xf": 88e-6, "xg": 12e-6, "xm": 6e-6, "xn": 0, "x ": 251e-6, "xy": 12e-6, "xo": 111e-6, "ic": 5688e-6, "ip": 875e-6, "iv": 1703e-6, "id": 476e-5, "ih": 35e-6, "ik": 111e-6, "ia": 6627e-6, "is": 637e-5, "iw": 18e-6, "iu": 239e-6, "iz": 1208e-6, "it": 4253e-6, "ie": 2024e-6, "ir": 3173e-6, "il": 3098e-6, "ij": 58e-6, "ib": 537e-6, "ix": 268e-6, "ii": 292e-6, "iq": 64e-6, "if": 537e-6, "ig": 1283e-6, "im": 1948e-6, "in": 7683e-6, "i ": 3302e-6, "iy": 41e-6, "io": 5384e-6, "qc": 6e-6, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 0, "qa": 0, "qs": 0, "qw": 0, "qu": 3214e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 12e-6, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 0, "qy": 6e-6, "qo": 0, "fc": 76e-6, "fp": 0, "fv": 0, "fd": 0, "fh": 6e-6, "fk": 0, "fa": 1651e-6, "fs": 64e-6, "fw": 0, "fu": 7e-4, "fz": 0, "ft": 82e-6, "fe": 1009e-6, "fr": 1668e-6, "fl": 292e-6, "fj": 6e-6, "fb": 58e-6, "fx": 0, "fi": 1511e-6, "fq": 0, "ff": 7e-5, "fg": 12e-6, "fm": 23e-6, "fn": 18e-6, "f ": 181e-6, "fy": 6e-6, "fo": 273e-5, "gc": 105e-6, "gp": 0, "gv": 6e-6, "gd": 29e-6, "gh": 105e-6, "gk": 0, "ga": 1861e-6, "gs": 53e-6, "gw": 12e-6, "gu": 1727e-6, "gz": 0, "gt": 47e-6, "ge": 1278e-6, "gr": 1663e-6, "gl": 28e-5, "gj": 23e-6, "gb": 6e-6, "gx": 0, "gi": 1966e-6, "gq": 0, "gf": 6e-6, "gg": 41e-6, "gm": 53e-6, "gn": 916e-6, "g ": 537e-6, "gy": 18e-6, "go": 1528e-6, "mc": 47e-6, "mp": 1348e-6, "mv": 23e-6, "md": 14e-5, "mh": 18e-6, "mk": 6e-6, "ma": 9433e-6, "ms": 251e-6, "mw": 0, "mu": 245e-5, "mz": 0, "mt": 82e-6, "me": 5851e-6, "mr": 228e-6, "ml": 986e-6, "mj": 6e-6, "mb": 1272e-6, "mx": 35e-6, "mi": 2829e-6, "mq": 6e-6, "mf": 6e-6, "mg": 0, "mm": 146e-6, "mn": 187e-6, "m ": 0.011054, "my": 123e-6, "mo": 2928e-6, "nc": 3238e-6, "np": 88e-6, "nv": 298e-6, "nd": 4783e-6, "nh": 2036e-6, "nk": 111e-6, "na": 8721e-6, "ns": 2718e-6, "nw": 18e-6, "nu": 478e-6, "nz": 134e-6, "nt": 959e-5, "ne": 2567e-6, "nr": 152e-6, "nl": 82e-6, "nj": 7e-5, "nb": 76e-6, "nx": 0, "ni": 4288e-6, "nq": 93e-6, "nf": 303e-6, "ng": 1318e-6, "nm": 117e-6, "nn": 408e-6, "n ": 1919e-6, "ny": 14e-5, "no": 6347e-6, " c": 0.013073, " p": 0.012688, " v": 2013e-6, " d": 0.02579, " h": 2911e-6, " k": 1523e-6, " a": 0.013359, " s": 8354e-6, " w": 525e-6, " u": 8079e-6, " z": 204e-6, " t": 5594e-6, " e": 0.015814, " r": 4982e-6, " l": 4136e-6, " j": 2024e-6, " b": 3722e-6, " x": 204e-6, " i": 3232e-6, " q": 1978e-6, " f": 728e-5, " g": 3337e-6, " m": 6697e-6, " n": 7239e-6, "  ": 0.014514, " y": 216e-6, " o": 5711e-6, "yc": 93e-6, "yp": 53e-6, "yv": 0, "yd": 53e-6, "yh": 0, "yk": 12e-6, "ya": 128e-6, "ys": 187e-6, "yw": 6e-6, "yu": 99e-6, "yz": 0, "yt": 29e-6, "ye": 134e-6, "yr": 82e-6, "yl": 169e-6, "yj": 0, "yb": 23e-6, "yx": 0, "yi": 35e-6, "yq": 0, "yf": 29e-6, "yg": 64e-6, "ym": 47e-6, "yn": 82e-6, "y ": 91e-5, "yy": 0, "yo": 204e-6, "oc": 168e-5, "op": 1663e-6, "ov": 1342e-6, "od": 1289e-6, "oh": 146e-6, "ok": 105e-6, "oa": 525e-6, "os": 7414e-6, "ow": 146e-6, "ou": 238e-5, "oz": 88e-6, "ot": 933e-6, "oe": 368e-6, "or": 8651e-6, "ol": 3039e-6, "oj": 128e-6, "ob": 648e-6, "ox": 163e-6, "oi": 2473e-6, "oq": 53e-6, "of": 478e-6, "og": 1009e-6, "om": 5676e-6, "on": 6236e-6, "o ": 0.033887, "oy": 14e-5, "oo": 338e-6 };
const bigram_pt = {
  total_count: total_count$6,
  probabilities: probabilities$6
};
const total_count$5 = 182040;
const probabilities$5 = { "cc": 22e-6, "cp": 5e-6, "cv": 0, "cd": 27e-6, "ch": 1159e-6, "ck": 275e-6, "ca": 994e-6, "cs": 38e-6, "cw": 0, "cu": 22e-5, "cz": 5e-6, "ct": 17e-5, "ce": 5e-4, "cr": 154e-6, "cl": 93e-6, "cj": 0, "cb": 5e-6, "cx": 0, "ci": 341e-6, "cq": 16e-6, "cf": 11e-6, "cg": 0, "cm": 38e-6, "cn": 16e-6, "c ": 286e-6, "cy": 71e-6, "co": 1472e-6, "pc": 5e-6, "pp": 1434e-6, "pv": 49e-6, "pd": 115e-6, "ph": 313e-6, "pk": 55e-6, "pa": 1675e-6, "ps": 324e-6, "pw": 0, "pu": 341e-6, "pz": 0, "pt": 341e-6, "pe": 2406e-6, "pr": 1741e-6, "pl": 588e-6, "pj": 0, "pb": 33e-6, "px": 0, "pi": 1945e-6, "pq": 0, "pf": 77e-6, "pg": 44e-6, "pm": 33e-6, "pn": 99e-6, "p ": 2565e-6, "py": 66e-6, "po": 1263e-6, "vc": 0, "vp": 38e-6, "vv": 27e-6, "vd": 148e-6, "vh": 55e-6, "vk": 88e-6, "va": 4274e-6, "vs": 269e-6, "vw": 0, "vu": 49e-6, "vz": 0, "vt": 93e-6, "ve": 6163e-6, "vr": 39e-5, "vl": 137e-6, "vj": 66e-6, "vb": 16e-6, "vx": 0, "vi": 2549e-6, "vq": 0, "vf": 16e-6, "vg": 82e-6, "vm": 6e-5, "vn": 522e-6, "v ": 4461e-6, "vy": 77e-6, "vo": 621e-6, "dc": 33e-6, "dp": 55e-6, "dv": 324e-6, "dd": 835e-6, "dh": 121e-6, "dk": 99e-6, "da": 3043e-6, "ds": 1555e-6, "dw": 5e-6, "du": 352e-6, "dz": 0, "dt": 692e-6, "de": 0.014782, "dr": 1461e-6, "dl": 829e-6, "dj": 44e-6, "db": 291e-6, "dx": 0, "di": 1648e-6, "dq": 0, "df": 17e-5, "dg": 71e-6, "dm": 236e-6, "dn": 137e-6, "d ": 4911e-6, "dy": 253e-6, "do": 901e-6, "hc": 11e-6, "hp": 5e-6, "hv": 28e-5, "hd": 11e-6, "hh": 0, "hk": 88e-6, "ha": 4735e-6, "hs": 11e-5, "hw": 11e-6, "hu": 961e-6, "hz": 0, "ht": 126e-6, "he": 2192e-6, "hr": 632e-6, "hl": 115e-6, "hj": 132e-6, "hb": 22e-6, "hx": 0, "hi": 555e-6, "hq": 0, "hf": 5e-6, "hg": 27e-6, "hm": 49e-6, "hn": 247e-6, "h ": 632e-6, "hy": 379e-6, "ho": 1648e-6, "kc": 11e-6, "kp": 27e-6, "kv": 412e-6, "kd": 11e-6, "kh": 165e-6, "kk": 1456e-6, "ka": 3422e-6, "ks": 1033e-6, "kw": 0, "ku": 791e-6, "kz": 0, "kt": 1857e-6, "ke": 6015e-6, "kr": 1302e-6, "kl": 1093e-6, "kj": 84e-5, "kb": 6e-5, "kx": 0, "ki": 1406e-6, "kq": 0, "kf": 71e-6, "kg": 16e-6, "km": 269e-6, "kn": 374e-6, "k ": 4834e-6, "ky": 247e-6, "ko": 3455e-6, "ac": 385e-6, "ap": 1022e-6, "av": 5208e-6, "ad": 1648e-6, "ah": 264e-6, "ak": 1285e-6, "aa": 214e-6, "as": 3301e-6, "aw": 66e-6, "au": 835e-6, "az": 176e-6, "at": 4142e-6, "ae": 714e-6, "ar": 9212e-6, "al": 5938e-6, "aj": 143e-6, "ab": 692e-6, "ax": 38e-6, "ai": 494e-6, "aq": 16e-6, "af": 566e-6, "ag": 1763e-6, "am": 3466e-6, "an": 0.012234, "a ": 6499e-6, "ay": 286e-6, "ao": 11e-5, "sc": 483e-6, "sp": 2126e-6, "sv": 1225e-6, "sd": 319e-6, "sh": 621e-6, "sk": 8163e-6, "sa": 2335e-6, "ss": 2049e-6, "sw": 33e-6, "su": 566e-6, "sz": 38e-6, "st": 0.011179, "se": 5708e-6, "sr": 1313e-6, "sl": 1752e-6, "sj": 1873e-6, "sb": 412e-6, "sx": 0, "si": 3065e-6, "sq": 16e-6, "sf": 275e-6, "sg": 99e-6, "sm": 742e-6, "sn": 439e-6, "s ": 6905e-6, "sy": 494e-6, "so": 4587e-6, "wc": 0, "wp": 0, "wv": 0, "wd": 0, "wh": 27e-6, "wk": 0, "wa": 264e-6, "ws": 38e-6, "ww": 0, "wu": 0, "wz": 0, "wt": 0, "we": 209e-6, "wr": 16e-6, "wl": 22e-6, "wj": 0, "wb": 11e-6, "wx": 0, "wi": 231e-6, "wq": 0, "wf": 0, "wg": 0, "wm": 5e-6, "wn": 33e-6, "w ": 126e-6, "wy": 5e-6, "wo": 121e-6, "uc": 143e-6, "up": 505e-6, "uv": 115e-6, "ud": 428e-6, "uh": 27e-6, "uk": 593e-6, "ua": 428e-6, "us": 2065e-6, "uw": 0, "uu": 11e-6, "uz": 33e-6, "ut": 1505e-6, "ue": 643e-6, "ur": 1582e-6, "ul": 835e-6, "uj": 33e-6, "ub": 566e-6, "ux": 38e-6, "ui": 225e-6, "uq": 5e-6, "uf": 132e-6, "ug": 725e-6, "um": 549e-6, "un": 4988e-6, "u ": 335e-6, "uy": 33e-6, "uo": 27e-6, "zc": 11e-6, "zp": 5e-6, "zv": 5e-6, "zd": 0, "zh": 16e-6, "zk": 5e-6, "za": 143e-6, "zs": 11e-6, "zw": 0, "zu": 22e-6, "zz": 11e-6, "zt": 0, "ze": 93e-6, "zr": 0, "zl": 16e-6, "zj": 5e-6, "zb": 0, "zx": 0, "zi": 93e-6, "zq": 0, "zf": 0, "zg": 0, "zm": 5e-6, "zn": 5e-6, "z ": 148e-6, "zy": 0, "zo": 104e-6, "tc": 55e-6, "tp": 49e-6, "tv": 45e-5, "td": 11e-5, "th": 742e-6, "tk": 82e-6, "ta": 4224e-6, "ts": 1791e-6, "tw": 16e-6, "tu": 994e-6, "tz": 93e-6, "tt": 3664e-6, "te": 0.012041, "tr": 3741e-6, "tl": 632e-6, "tj": 192e-6, "tb": 604e-6, "tx": 5e-6, "ti": 6488e-6, "tq": 0, "tf": 225e-6, "tg": 126e-6, "tm": 121e-6, "tn": 516e-6, "t ": 0.01704, "ty": 1571e-6, "to": 2582e-6, "ec": 231e-6, "ep": 967e-6, "ev": 106e-5, "ed": 4345e-6, "eh": 291e-6, "ek": 2016e-6, "ea": 637e-6, "es": 6246e-6, "ew": 148e-6, "eu": 385e-6, "ez": 66e-6, "et": 0.011503, "ee": 346e-6, "er": 0.029873, "el": 768e-5, "ej": 44e-6, "eb": 637e-6, "ex": 143e-6, "ei": 2263e-6, "eq": 22e-6, "ef": 676e-6, "eg": 2412e-6, "em": 1818e-6, "en": 0.026714, "e ": 0.021089, "ey": 187e-6, "eo": 291e-6, "rc": 22e-5, "rp": 258e-6, "rv": 692e-6, "rd": 3181e-6, "rh": 313e-6, "rk": 1747e-6, "ra": 6147e-6, "rs": 3082e-6, "rw": 44e-6, "ru": 2098e-6, "rz": 11e-6, "rt": 3823e-6, "re": 0.011069, "rr": 961e-6, "rl": 917e-6, "rj": 77e-6, "rb": 637e-6, "rx": 5e-6, "ri": 5812e-6, "rq": 0, "rf": 758e-6, "rg": 1478e-6, "rm": 95e-5, "rn": 1566e-6, "r ": 0.026796, "ry": 56e-5, "ro": 2977e-6, "lc": 66e-6, "lp": 533e-6, "lv": 851e-6, "ld": 1209e-6, "lh": 428e-6, "lk": 956e-6, "la": 4834e-6, "ls": 256e-5, "lw": 11e-6, "lu": 956e-6, "lz": 0, "lt": 1483e-6, "le": 9773e-6, "lr": 242e-6, "ll": 574e-5, "lj": 148e-6, "lb": 302e-6, "lx": 0, "li": 7141e-6, "lq": 5e-6, "lf": 286e-6, "lg": 742e-6, "lm": 758e-6, "ln": 214e-6, "l ": 5307e-6, "ly": 626e-6, "lo": 2285e-6, "jc": 0, "jp": 33e-6, "jv": 27e-6, "jd": 38e-6, "jh": 27e-6, "jk": 11e-6, "ja": 632e-6, "js": 44e-6, "jw": 0, "ju": 313e-6, "jz": 5e-6, "jt": 27e-6, "je": 2675e-6, "jr": 341e-6, "jl": 33e-6, "jj": 0, "jb": 33e-6, "jx": 0, "ji": 55e-6, "jq": 0, "jf": 22e-6, "jg": 11e-6, "jm": 0, "jn": 11e-6, "j ": 143e-6, "jy": 5e-6, "jo": 2258e-6, "bc": 0, "bp": 5e-6, "bv": 0, "bd": 11e-5, "bh": 38e-6, "bk": 38e-6, "ba": 2011e-6, "bs": 66e-6, "bw": 0, "bu": 813e-6, "bz": 0, "bt": 71e-6, "be": 2857e-6, "br": 1725e-6, "bl": 2203e-6, "bj": 17e-5, "bb": 417e-6, "bx": 0, "bi": 111e-5, "bq": 0, "bf": 11e-6, "bg": 0, "bm": 11e-6, "bn": 38e-6, "b ": 143e-6, "by": 1862e-6, "bo": 917e-6, "xc": 0, "xp": 22e-6, "xv": 0, "xd": 0, "xh": 0, "xk": 0, "xa": 55e-6, "xs": 5e-6, "xw": 0, "xu": 0, "xz": 0, "xt": 5e-6, "xe": 55e-6, "xr": 0, "xl": 11e-6, "xj": 0, "xb": 0, "xx": 16e-6, "xi": 6e-5, "xq": 0, "xf": 5e-6, "xg": 0, "xm": 0, "xn": 0, "x ": 121e-6, "xy": 16e-6, "xo": 11e-6, "ic": 632e-6, "ip": 396e-6, "iv": 917e-6, "id": 2988e-6, "ih": 66e-6, "ik": 3708e-6, "ia": 1763e-6, "is": 5768e-6, "iw": 0, "iu": 143e-6, "iz": 66e-6, "it": 2697e-6, "ie": 2516e-6, "ir": 1302e-6, "il": 7251e-6, "ij": 33e-6, "ib": 225e-6, "ix": 55e-6, "ii": 275e-6, "iq": 49e-6, "if": 428e-6, "ig": 3527e-6, "im": 758e-6, "in": 8185e-6, "i ": 0.012354, "iy": 33e-6, "io": 1209e-6, "qc": 0, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 0, "qa": 22e-6, "qs": 0, "qw": 5e-6, "qu": 17e-5, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 5e-6, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 11e-6, "qy": 0, "qo": 0, "fc": 6e-5, "fp": 11e-6, "fv": 11e-6, "fd": 11e-5, "fh": 5e-6, "fk": 44e-6, "fa": 1626e-6, "fs": 33e-6, "fw": 5e-6, "fu": 45e-5, "fz": 0, "ft": 588e-6, "fe": 917e-6, "fr": 3373e-6, "fl": 884e-6, "fj": 84e-5, "fb": 5e-6, "fx": 0, "fi": 1505e-6, "fq": 0, "ff": 308e-6, "fg": 5e-6, "fm": 11e-6, "fn": 33e-6, "f ": 439e-6, "fy": 511e-6, "fo": 4049e-6, "gc": 11e-6, "gp": 27e-6, "gv": 115e-6, "gd": 341e-6, "gh": 341e-6, "gk": 71e-6, "ga": 15e-4, "gs": 1357e-6, "gw": 11e-6, "gu": 571e-6, "gz": 5e-6, "gt": 423e-6, "ge": 6911e-6, "gr": 251e-5, "gl": 687e-6, "gj": 604e-6, "gb": 71e-6, "gx": 0, "gi": 1417e-6, "gq": 0, "gf": 104e-6, "gg": 1802e-6, "gm": 38e-6, "gn": 725e-6, "g ": 9278e-6, "gy": 159e-6, "go": 5e-4, "mc": 22e-6, "mp": 483e-6, "mv": 38e-6, "md": 82e-6, "mh": 77e-6, "mk": 121e-6, "ma": 3076e-6, "ms": 709e-6, "mw": 16e-6, "mu": 1758e-6, "mz": 11e-6, "mt": 363e-6, "me": 6268e-6, "mr": 527e-6, "ml": 396e-6, "mj": 16e-6, "mb": 577e-6, "mx": 0, "mi": 2412e-6, "mq": 0, "mf": 286e-6, "mg": 27e-6, "mm": 2384e-6, "mn": 154e-6, "m ": 5889e-6, "my": 231e-6, "mo": 1555e-6, "nc": 357e-6, "np": 66e-6, "nv": 22e-5, "nd": 5988e-6, "nh": 286e-6, "nk": 67e-5, "na": 2878e-6, "ns": 5416e-6, "nw": 38e-6, "nu": 379e-6, "nz": 71e-6, "nt": 4246e-6, "ne": 9223e-6, "nr": 439e-6, "nl": 577e-6, "nj": 104e-6, "nb": 577e-6, "nx": 5e-6, "ni": 2741e-6, "nq": 0, "nf": 341e-6, "ng": 4598e-6, "nm": 187e-6, "nn": 4812e-6, "n ": 0.023786, "ny": 439e-6, "no": 3076e-6, " c": 273e-5, " p": 573e-5, " v": 6273e-6, " d": 9547e-6, " h": 7339e-6, " k": 6416e-6, " a": 9218e-6, " s": 0.016733, " w": 527e-6, " u": 2285e-6, " z": 88e-6, " t": 6955e-6, " e": 0.016853, " r": 3801e-6, " l": 5015e-6, " j": 1357e-6, " b": 7949e-6, " x": 49e-6, " i": 0.013255, " q": 55e-6, " f": 0.010371, " g": 3884e-6, " m": 6773e-6, " n": 4334e-6, "  ": 7114e-6, " y": 45e-5, " o": 9866e-6, "yc": 104e-6, "yp": 214e-6, "yv": 55e-6, "yd": 483e-6, "yh": 27e-6, "yk": 22e-5, "ya": 428e-6, "ys": 813e-6, "yw": 5e-6, "yu": 16e-6, "yz": 0, "yt": 511e-6, "ye": 791e-6, "yr": 687e-6, "yl": 599e-6, "yj": 0, "yb": 55e-6, "yx": 5e-6, "yi": 16e-6, "yq": 5e-6, "yf": 55e-6, "yg": 884e-6, "ym": 231e-6, "yn": 368e-6, "y ": 1928e-6, "yy": 5e-6, "yo": 143e-6, "oc": 33e-5, "op": 1494e-6, "ov": 1846e-6, "od": 775e-6, "oh": 225e-6, "ok": 956e-6, "oa": 137e-6, "os": 1401e-6, "ow": 165e-6, "ou": 1093e-6, "oz": 22e-6, "ot": 1692e-6, "oe": 368e-6, "or": 8861e-6, "ol": 3411e-6, "oj": 22e-6, "ob": 417e-6, "ox": 22e-6, "oi": 236e-6, "oq": 22e-6, "of": 626e-6, "og": 7257e-6, "om": 7982e-6, "on": 4757e-6, "o ": 1829e-6, "oy": 82e-6, "oo": 198e-6 };
const bigram_no = {
  total_count: total_count$5,
  probabilities: probabilities$5
};
const total_count$4 = 242727;
const probabilities$4 = { "cc": 7e-5, "cp": 4e-6, "cv": 0, "cd": 16e-6, "ch": 865e-6, "ck": 42e-5, "ca": 503e-6, "cs": 49e-6, "cw": 0, "cu": 136e-6, "cz": 12e-6, "ct": 103e-6, "ce": 358e-6, "cr": 14e-5, "cl": 91e-6, "cj": 0, "cb": 16e-6, "cx": 0, "ci": 301e-6, "cq": 16e-6, "cf": 8e-6, "cg": 8e-6, "cm": 21e-6, "cn": 29e-6, "c ": 222e-6, "cy": 41e-6, "co": 585e-6, "pc": 33e-6, "pp": 943e-6, "pv": 33e-6, "pd": 12e-6, "ph": 202e-6, "pk": 128e-6, "pa": 3399e-6, "ps": 309e-6, "pw": 0, "pu": 2472e-6, "pz": 0, "pt": 239e-6, "pe": 323e-5, "pr": 626e-6, "pl": 404e-6, "pj": 12e-6, "pb": 0, "px": 0, "pi": 297e-5, "pq": 0, "pf": 4e-6, "pg": 0, "pm": 54e-6, "pn": 58e-6, "p ": 128e-6, "py": 416e-6, "po": 1784e-6, "vc": 4e-6, "vp": 0, "vv": 4e-6, "vd": 4e-6, "vh": 62e-6, "vk": 152e-6, "va": 7267e-6, "vs": 91e-6, "vw": 0, "vu": 304e-5, "vz": 0, "vt": 313e-6, "ve": 2064e-6, "vr": 103e-6, "vl": 387e-6, "vj": 4e-6, "vb": 0, "vx": 0, "vi": 3378e-6, "vq": 0, "vf": 4e-6, "vg": 8e-6, "vm": 0, "vn": 152e-6, "v ": 391e-6, "vy": 251e-6, "vo": 1207e-6, "dc": 21e-6, "dp": 12e-6, "dv": 49e-6, "dd": 66e-6, "dh": 66e-6, "dk": 29e-6, "da": 1121e-6, "ds": 177e-6, "dw": 54e-6, "du": 54e-5, "dz": 4e-6, "dt": 66e-6, "de": 4095e-6, "dr": 251e-6, "dl": 74e-6, "dj": 29e-6, "db": 21e-6, "dx": 4e-6, "di": 1681e-6, "dq": 8e-6, "df": 4e-6, "dg": 54e-6, "dm": 66e-6, "dn": 111e-6, "d ": 807e-6, "dy": 758e-6, "do": 989e-6, "hc": 29e-6, "hp": 12e-6, "hv": 111e-6, "hd": 1644e-6, "hh": 12e-6, "hk": 297e-6, "ha": 2365e-6, "hs": 62e-6, "hw": 41e-6, "hu": 531e-6, "hz": 4e-6, "ht": 2216e-6, "he": 2596e-6, "hr": 152e-6, "hl": 264e-6, "hj": 919e-6, "hb": 21e-6, "hx": 0, "hi": 1409e-6, "hq": 8e-6, "hf": 25e-6, "hg": 21e-6, "hm": 396e-6, "hn": 1788e-6, "h ": 416e-6, "hy": 569e-6, "ho": 1001e-6, "kc": 4e-6, "kp": 62e-6, "kv": 25e-6, "kd": 21e-6, "kh": 111e-6, "kk": 3156e-6, "ka": 0.010415, "ks": 4194e-6, "kw": 4e-6, "ku": 6621e-6, "kz": 0, "kt": 321e-6, "ke": 4346e-6, "kr": 622e-6, "kl": 293e-6, "kj": 87e-6, "kb": 12e-6, "kx": 0, "ki": 5986e-6, "kq": 0, "kf": 37e-6, "kg": 8e-6, "km": 152e-6, "kn": 317e-6, "k ": 1018e-6, "ky": 1561e-6, "ko": 5105e-6, "ac": 511e-6, "ap": 15e-4, "av": 1866e-6, "ad": 861e-6, "ah": 1071e-6, "ak": 3003e-6, "aa": 9158e-6, "as": 6546e-6, "aw": 115e-6, "au": 2991e-6, "az": 66e-6, "at": 4635e-6, "ae": 379e-6, "ar": 5619e-6, "al": 0.012409, "aj": 2674e-6, "ab": 293e-6, "ax": 41e-6, "ai": 9698e-6, "aq": 8e-6, "af": 227e-6, "ag": 396e-6, "am": 3007e-6, "an": 0.014576, "a ": 0.031809, "ay": 268e-6, "ao": 173e-6, "sc": 305e-6, "sp": 63e-5, "sv": 1281e-6, "sd": 111e-6, "sh": 449e-6, "sk": 2954e-6, "sa": 0.011045, "ss": 7894e-6, "sw": 49e-6, "su": 3448e-6, "sz": 8e-6, "st": 0.011882, "se": 9117e-6, "sr": 157e-6, "sl": 667e-6, "sj": 161e-6, "sb": 103e-6, "sx": 0, "si": 0.010584, "sq": 37e-6, "sf": 45e-6, "sg": 16e-6, "sm": 379e-6, "sn": 272e-6, "s ": 5385e-6, "sy": 775e-6, "so": 1767e-6, "wc": 4e-6, "wp": 8e-6, "wv": 0, "wd": 0, "wh": 16e-6, "wk": 21e-6, "wa": 387e-6, "ws": 74e-6, "ww": 8e-6, "wu": 0, "wz": 0, "wt": 16e-6, "we": 268e-6, "wr": 54e-6, "wl": 41e-6, "wj": 0, "wb": 8e-6, "wx": 0, "wi": 293e-6, "wq": 0, "wf": 4e-6, "wg": 0, "wm": 0, "wn": 54e-6, "w ": 161e-6, "wy": 4e-6, "wo": 132e-6, "uc": 128e-6, "up": 1162e-6, "uv": 2002e-6, "ud": 968e-6, "uh": 696e-6, "uk": 2872e-6, "ua": 807e-6, "us": 5129e-6, "uw": 12e-6, "uu": 4697e-6, "uz": 8e-6, "ut": 3885e-6, "ue": 1566e-6, "ur": 274e-5, "ul": 3448e-6, "uj": 28e-5, "ub": 128e-6, "ux": 29e-6, "ui": 164e-5, "uq": 0, "uf": 29e-6, "ug": 95e-6, "um": 943e-6, "un": 5376e-6, "u ": 213e-5, "uy": 29e-6, "uo": 5999e-6, "zc": 0, "zp": 8e-6, "zv": 0, "zd": 0, "zh": 25e-6, "zk": 0, "za": 103e-6, "zs": 0, "zw": 4e-6, "zu": 33e-6, "zz": 99e-6, "zt": 4e-6, "ze": 115e-6, "zr": 0, "zl": 4e-6, "zj": 4e-6, "zb": 25e-6, "zx": 0, "zi": 107e-6, "zq": 0, "zf": 4e-6, "zg": 0, "zm": 0, "zn": 12e-6, "z ": 14e-5, "zy": 8e-6, "zo": 78e-6, "tc": 25e-6, "tp": 87e-6, "tv": 499e-6, "td": 8e-6, "th": 906e-6, "tk": 873e-6, "ta": 0.01477, "ts": 187e-5, "tw": 62e-6, "tu": 5739e-6, "tz": 78e-6, "tt": 7791e-6, "te": 8174e-6, "tr": 1425e-6, "tl": 218e-6, "tj": 305e-6, "tb": 25e-6, "tx": 16e-6, "ti": 8231e-6, "tq": 0, "tf": 41e-6, "tg": 21e-6, "tm": 449e-6, "tn": 787e-6, "t ": 702e-5, "ty": 2604e-6, "to": 4837e-6, "ec": 202e-6, "ep": 428e-6, "ev": 1215e-6, "ed": 1149e-6, "eh": 1075e-6, "ek": 1912e-6, "ea": 1079e-6, "es": 6015e-6, "ew": 14e-5, "eu": 1116e-6, "ez": 128e-6, "et": 5854e-6, "ee": 4458e-6, "er": 6283e-6, "el": 9472e-6, "ej": 255e-6, "eb": 202e-6, "ex": 58e-6, "ei": 4033e-6, "eq": 16e-6, "ef": 45e-6, "eg": 305e-6, "em": 1755e-6, "en": 0.018354, "e ": 5957e-6, "ey": 404e-6, "eo": 482e-6, "rc": 185e-6, "rp": 297e-6, "rv": 84e-5, "rd": 519e-6, "rh": 482e-6, "rk": 1751e-6, "ra": 4573e-6, "rs": 762e-6, "rw": 45e-6, "ru": 1718e-6, "rz": 62e-6, "rt": 1335e-6, "re": 2336e-6, "rr": 581e-6, "rl": 33e-5, "rj": 1496e-6, "rb": 91e-6, "rx": 8e-6, "ri": 6419e-6, "rq": 4e-6, "rf": 95e-6, "rg": 577e-6, "rm": 61e-5, "rn": 556e-6, "r ": 1038e-6, "ry": 412e-6, "ro": 267e-5, "lc": 21e-6, "lp": 486e-6, "lv": 424e-6, "ld": 218e-6, "lh": 47e-5, "lk": 1837e-6, "la": 0.010658, "ls": 523e-6, "lw": 8e-6, "lu": 4845e-6, "lz": 25e-6, "lt": 2748e-6, "le": 4944e-6, "lr": 25e-6, "ll": 8108e-6, "lj": 461e-6, "lb": 325e-6, "lx": 0, "li": 0.011144, "lq": 8e-6, "lf": 7e-5, "lg": 87e-6, "lm": 1994e-6, "ln": 589e-6, "l ": 2027e-6, "ly": 672e-6, "lo": 3671e-6, "jc": 0, "jp": 21e-6, "jv": 8e-6, "jd": 12e-6, "jh": 41e-6, "jk": 132e-6, "ja": 0.010506, "js": 148e-6, "jw": 0, "ju": 1149e-6, "jz": 0, "jt": 54e-6, "je": 1187e-6, "jr": 511e-6, "jl": 264e-6, "jj": 0, "jb": 0, "jx": 0, "ji": 704e-6, "jq": 0, "jf": 8e-6, "jg": 0, "jm": 49e-6, "jn": 202e-6, "j ": 7e-4, "jy": 49e-6, "jo": 4676e-6, "bc": 8e-6, "bp": 0, "bv": 8e-6, "bd": 12e-6, "bh": 29e-6, "bk": 12e-6, "ba": 56e-5, "bs": 7e-5, "bw": 0, "bu": 531e-6, "bz": 0, "bt": 8e-6, "be": 63e-5, "br": 457e-6, "bl": 169e-6, "bj": 12e-6, "bb": 95e-6, "bx": 0, "bi": 342e-6, "bq": 0, "bf": 0, "bg": 8e-6, "bm": 21e-6, "bn": 29e-6, "b ": 128e-6, "by": 91e-6, "bo": 416e-6, "xc": 0, "xp": 16e-6, "xv": 4e-6, "xd": 0, "xh": 0, "xk": 0, "xa": 33e-6, "xs": 8e-6, "xw": 0, "xu": 4e-6, "xz": 0, "xt": 12e-6, "xe": 25e-6, "xr": 8e-6, "xl": 0, "xj": 0, "xb": 29e-6, "xx": 8e-6, "xi": 78e-6, "xq": 0, "xf": 8e-6, "xg": 0, "xm": 4e-6, "xn": 0, "x ": 111e-6, "xy": 4e-6, "xo": 0, "ic": 56e-5, "ip": 828e-6, "iv": 1767e-6, "id": 1767e-6, "ih": 902e-6, "ik": 4738e-6, "ia": 4079e-6, "is": 0.014547, "iw": 12e-6, "iu": 268e-6, "iz": 54e-6, "it": 8211e-6, "ie": 3506e-6, "ir": 2163e-6, "il": 5887e-6, "ij": 2097e-6, "ib": 173e-6, "ix": 41e-6, "ii": 4824e-6, "iq": 16e-6, "if": 136e-6, "ig": 441e-6, "im": 3869e-6, "in": 0.018057, "i ": 0.012512, "iy": 82e-6, "io": 2188e-6, "qc": 0, "qp": 0, "qv": 12e-6, "qd": 0, "qh": 0, "qk": 0, "qa": 0, "qs": 0, "qw": 0, "qu": 169e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 0, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 4e-6, "q ": 12e-6, "qy": 4e-6, "qo": 0, "fc": 29e-6, "fp": 0, "fv": 0, "fd": 0, "fh": 12e-6, "fk": 8e-6, "fa": 206e-6, "fs": 33e-6, "fw": 0, "fu": 111e-6, "fz": 4e-6, "ft": 91e-6, "fe": 358e-6, "fr": 313e-6, "fl": 148e-6, "fj": 8e-6, "fb": 0, "fx": 0, "fi": 371e-6, "fq": 0, "ff": 87e-6, "fg": 21e-6, "fm": 0, "fn": 0, "f ": 247e-6, "fy": 25e-6, "fo": 284e-6, "gc": 8e-6, "gp": 21e-6, "gv": 8e-6, "gd": 16e-6, "gh": 95e-6, "gk": 16e-6, "ga": 849e-6, "gs": 87e-6, "gw": 0, "gu": 218e-6, "gz": 4e-6, "gt": 29e-6, "ge": 639e-6, "gr": 363e-6, "gl": 268e-6, "gj": 8e-6, "gb": 8e-6, "gx": 0, "gi": 1063e-6, "gq": 0, "gf": 4e-6, "gg": 95e-6, "gm": 45e-6, "gn": 148e-6, "g ": 474e-6, "gy": 29e-6, "go": 441e-6, "mc": 49e-6, "mp": 964e-6, "mv": 4e-6, "md": 21e-6, "mh": 8e-6, "mk": 103e-6, "ma": 7267e-6, "ms": 206e-6, "mw": 8e-6, "mu": 2427e-6, "mz": 0, "mt": 7e-5, "me": 4487e-6, "mr": 128e-6, "ml": 99e-6, "mj": 16e-6, "mb": 218e-6, "mx": 16e-6, "mi": 5278e-6, "mq": 0, "mf": 25e-6, "mg": 12e-6, "mm": 1487e-6, "mn": 408e-6, "m ": 935e-6, "my": 96e-5, "mo": 1203e-6, "nc": 264e-6, "np": 33e-5, "nv": 342e-6, "nd": 927e-6, "nh": 354e-6, "nk": 2109e-6, "na": 6097e-6, "ns": 3123e-6, "nw": 66e-6, "nu": 1318e-6, "nz": 54e-6, "nt": 5162e-6, "ne": 7832e-6, "nr": 177e-6, "nl": 342e-6, "nj": 391e-6, "nb": 136e-6, "nx": 0, "ni": 487e-5, "nq": 4e-6, "nf": 91e-6, "ng": 15e-4, "nm": 338e-6, "nn": 5187e-6, "n ": 0.040094, "ny": 1042e-6, "no": 2196e-6, " c": 1285e-6, " p": 7955e-6, " v": 7004e-6, " d": 1252e-6, " h": 5018e-6, " k": 0.013113, " a": 5657e-6, " s": 0.011474, " w": 663e-6, " u": 1331e-6, " z": 14e-5, " t": 7568e-6, " e": 4899e-6, " r": 3481e-6, " l": 5685e-6, " j": 0.010543, " b": 1384e-6, " x": 74e-6, " i": 2134e-6, " q": 7e-5, " f": 981e-6, " g": 1013e-6, " m": 735e-5, " n": 3733e-6, "  ": 6081e-6, " y": 2657e-6, " o": 0.011082, "yc": 16e-6, "yp": 243e-6, "yv": 375e-6, "yd": 21e-5, "yh": 2109e-6, "yk": 1046e-6, "ya": 152e-6, "ys": 2249e-6, "yw": 29e-6, "yu": 16e-6, "yz": 0, "yt": 1673e-6, "ye": 404e-6, "yr": 391e-6, "yl": 1425e-6, "yj": 58e-6, "yb": 29e-6, "yx": 0, "yi": 56e-5, "yq": 0, "yf": 4e-6, "yg": 29e-6, "ym": 61e-5, "yn": 1001e-6, "y ": 1182e-6, "yy": 783e-6, "yo": 74e-6, "oc": 251e-6, "op": 1438e-6, "ov": 1005e-6, "od": 1339e-6, "oh": 1829e-6, "ok": 3794e-6, "oa": 849e-6, "os": 3881e-6, "ow": 231e-6, "ou": 1327e-6, "oz": 25e-6, "ot": 2575e-6, "oe": 383e-6, "or": 302e-5, "ol": 5891e-6, "oj": 601e-6, "ob": 297e-6, "ox": 58e-6, "oi": 5628e-6, "oq": 4e-6, "of": 371e-6, "og": 222e-6, "om": 2802e-6, "on": 0.012545, "o ": 2501e-6, "oy": 173e-6, "oo": 1393e-6 };
const bigram_fi = {
  total_count: total_count$4,
  probabilities: probabilities$4
};
const total_count$3 = 177067;
const probabilities$3 = { "cc": 107e-6, "cp": 17e-6, "cv": 23e-6, "cd": 17e-6, "ch": 192e-5, "ck": 277e-6, "ca": 6348e-6, "cs": 102e-6, "cw": 0, "cu": 458e-5, "cz": 34e-6, "ct": 2169e-6, "ce": 4569e-6, "cr": 2332e-6, "cl": 813e-6, "cj": 0, "cb": 11e-6, "cx": 0, "ci": 4196e-6, "cq": 6e-6, "cf": 0, "cg": 0, "cm": 56e-6, "cn": 294e-6, "c ": 2383e-6, "cy": 34e-6, "co": 5727e-6, "pc": 45e-6, "pp": 85e-6, "pv": 6e-6, "pd": 68e-6, "ph": 265e-6, "pk": 34e-6, "pa": 2451e-6, "ps": 175e-6, "pw": 0, "pu": 1802e-6, "pz": 6e-6, "pt": 542e-6, "pe": 5868e-6, "pr": 6145e-6, "pl": 762e-6, "pj": 0, "pb": 0, "px": 0, "pi": 1519e-6, "pq": 0, "pf": 0, "pg": 6e-6, "pm": 4e-5, "pn": 282e-6, "p ": 751e-6, "py": 4e-5, "po": 3501e-6, "vc": 141e-6, "vp": 6e-6, "vv": 0, "vd": 56e-6, "vh": 0, "vk": 649e-6, "va": 1875e-6, "vs": 215e-6, "vw": 0, "vu": 158e-6, "vz": 11e-6, "vt": 4e-5, "ve": 2287e-6, "vr": 215e-6, "vl": 119e-6, "vj": 6e-6, "vb": 0, "vx": 0, "vi": 2152e-6, "vq": 0, "vf": 0, "vg": 11e-6, "vm": 6e-6, "vn": 254e-6, "v ": 1034e-6, "vy": 11e-6, "vo": 954e-6, "dc": 68e-6, "dp": 6e-6, "dv": 62e-6, "dd": 4e-5, "dh": 51e-6, "dk": 23e-6, "da": 2039e-6, "ds": 79e-6, "dw": 4e-5, "du": 153e-5, "dz": 11e-6, "dt": 23e-6, "de": 0.012882, "dr": 921e-6, "dl": 56e-6, "dj": 28e-6, "db": 56e-6, "dx": 6e-6, "di": 9544e-6, "dq": 0, "df": 6e-6, "dg": 34e-6, "dm": 22e-5, "dn": 119e-6, "d ": 2558e-6, "dy": 102e-6, "do": 1446e-6, "hc": 0, "hp": 0, "hv": 17e-6, "hd": 28e-6, "hh": 17e-6, "hk": 11e-6, "ha": 2372e-6, "hs": 28e-6, "hw": 23e-6, "hu": 26e-5, "hz": 0, "ht": 124e-6, "he": 1254e-6, "hr": 367e-6, "hl": 102e-6, "hj": 11e-6, "hb": 6e-6, "hx": 0, "hi": 1434e-6, "hq": 0, "hf": 0, "hg": 11e-6, "hm": 85e-6, "hn": 243e-6, "h ": 474e-6, "hy": 68e-6, "ho": 74e-5, "kc": 6e-6, "kp": 11e-6, "kv": 28e-6, "kd": 11e-6, "kh": 79e-6, "kk": 28e-6, "ka": 1463e-6, "ks": 102e-6, "kw": 6e-6, "ku": 215e-6, "kz": 0, "kt": 23e-6, "ke": 39e-5, "kr": 203e-6, "kl": 102e-6, "kj": 0, "kb": 11e-6, "kx": 0, "ki": 616e-6, "kq": 0, "kf": 17e-6, "kg": 0, "km": 328e-6, "kn": 28e-6, "k ": 904e-6, "ky": 56e-6, "ko": 537e-6, "ac": 2637e-6, "ap": 1141e-6, "av": 1135e-6, "ad": 1327e-6, "ah": 226e-6, "ak": 215e-6, "aa": 215e-6, "as": 2519e-6, "aw": 51e-6, "au": 1937e-6, "az": 825e-6, "at": 0.011493, "ae": 1158e-6, "ar": 0.010092, "al": 9454e-6, "aj": 254e-6, "ab": 745e-6, "ax": 102e-6, "ai": 5405e-6, "aq": 17e-6, "af": 1852e-6, "ag": 796e-6, "am": 2654e-6, "an": 959e-5, "a ": 0.027363, "ay": 265e-6, "ao": 73e-6, "sc": 2999e-6, "sp": 1361e-6, "sv": 113e-6, "sd": 102e-6, "sh": 248e-6, "sk": 649e-6, "sa": 3965e-6, "ss": 446e-6, "sw": 4e-5, "su": 3411e-6, "sz": 4e-5, "st": 0.013916, "se": 3084e-6, "sr": 169e-6, "sl": 395e-6, "sj": 17e-6, "sb": 119e-6, "sx": 0, "si": 2044e-6, "sq": 0, "sf": 198e-6, "sg": 11e-6, "sm": 537e-6, "sn": 192e-6, "s ": 4405e-6, "sy": 56e-6, "so": 1288e-6, "wc": 0, "wp": 0, "wv": 0, "wd": 11e-6, "wh": 28e-6, "wk": 23e-6, "wa": 435e-6, "ws": 34e-6, "ww": 0, "wu": 0, "wz": 0, "wt": 0, "we": 237e-6, "wr": 17e-6, "wl": 23e-6, "wj": 0, "wb": 11e-6, "wx": 0, "wi": 226e-6, "wq": 0, "wf": 11e-6, "wg": 0, "wm": 6e-6, "wn": 4e-5, "w ": 9e-5, "wy": 0, "wo": 85e-6, "uc": 209e-5, "up": 2248e-6, "uv": 13e-5, "ud": 1378e-6, "uh": 113e-6, "uk": 107e-6, "ua": 785e-6, "us": 2316e-6, "uw": 0, "uu": 17e-6, "uz": 429e-6, "ut": 1621e-6, "ue": 633e-6, "ur": 3304e-6, "ul": 0.01051, "uj": 73e-6, "ub": 1135e-6, "ux": 113e-6, "ui": 314e-5, "uq": 28e-6, "uf": 68e-6, "ug": 412e-6, "um": 2197e-6, "un": 0.010482, "u ": 5326e-6, "uy": 23e-6, "uo": 96e-6, "zc": 0, "zp": 11e-6, "zv": 96e-6, "zd": 4e-5, "zh": 17e-6, "zk": 23e-6, "za": 1169e-6, "zs": 0, "zw": 6e-6, "zu": 169e-6, "zz": 51e-6, "zt": 23e-6, "ze": 683e-6, "zr": 45e-6, "zl": 17e-6, "zj": 0, "zb": 136e-6, "zx": 0, "zi": 1344e-6, "zq": 0, "zf": 0, "zg": 23e-6, "zm": 6e-6, "zn": 51e-6, "z ": 915e-6, "zy": 28e-6, "zo": 587e-6, "tc": 45e-6, "tp": 28e-6, "tv": 51e-6, "td": 79e-6, "th": 644e-6, "tk": 28e-6, "ta": 5744e-6, "ts": 164e-6, "tw": 62e-6, "tu": 4032e-6, "tz": 107e-6, "tt": 345e-6, "te": 0.016141, "tr": 5162e-6, "tl": 277e-6, "tj": 28e-6, "tb": 186e-6, "tx": 0, "ti": 5823e-6, "tq": 0, "tf": 62e-6, "tg": 17e-6, "tm": 85e-6, "tn": 26e-5, "t ": 0.013441, "ty": 13e-5, "to": 4371e-6, "ec": 2626e-6, "ep": 131e-5, "ev": 892e-6, "ed": 2078e-6, "eh": 181e-6, "ek": 141e-6, "ea": 6399e-6, "es": 9567e-6, "ew": 68e-6, "eu": 1197e-6, "ez": 1107e-6, "et": 2412e-6, "ee": 1096e-6, "er": 8522e-6, "el": 4863e-6, "ej": 113e-5, "eb": 345e-6, "ex": 587e-6, "ei": 27e-4, "eq": 6e-6, "ef": 373e-6, "eg": 3264e-6, "em": 1649e-6, "en": 6839e-6, "e ": 0.036794, "ey": 136e-6, "eo": 593e-6, "rc": 616e-6, "rp": 248e-6, "rv": 514e-6, "rd": 932e-6, "rh": 243e-6, "rk": 265e-6, "ra": 0.010499, "rs": 926e-6, "rw": 23e-6, "ru": 3372e-6, "rz": 248e-6, "rt": 2378e-6, "re": 0.011566, "rr": 367e-6, "rl": 356e-6, "rj": 68e-6, "rb": 412e-6, "rx": 0, "ri": 0.011312, "rq": 6e-6, "rf": 124e-6, "rg": 841e-6, "rm": 1621e-6, "rn": 1124e-6, "r ": 5173e-6, "ry": 322e-6, "ro": 6692e-6, "lc": 198e-6, "lp": 96e-6, "lv": 367e-6, "ld": 599e-6, "lh": 68e-6, "lk": 22e-5, "la": 5552e-6, "ls": 175e-6, "lw": 23e-6, "lu": 3886e-6, "lz": 34e-6, "lt": 1107e-6, "le": 6009e-6, "lr": 56e-6, "ll": 853e-6, "lj": 4e-5, "lb": 395e-6, "lx": 0, "li": 6133e-6, "lq": 0, "lf": 107e-6, "lg": 158e-6, "lm": 729e-6, "ln": 412e-6, "l ": 0.013023, "ly": 22e-5, "lo": 4111e-6, "jc": 6e-6, "jp": 6e-6, "jv": 0, "jd": 11e-6, "jh": 6e-6, "jk": 11e-6, "ja": 1372e-6, "js": 11e-6, "jw": 0, "ju": 1039e-6, "jz": 0, "jt": 79e-6, "je": 288e-6, "jr": 73e-6, "jl": 62e-6, "jj": 34e-6, "jb": 0, "jx": 0, "ji": 79e-6, "jq": 0, "jf": 6e-6, "jg": 11e-6, "jm": 6e-6, "jn": 45e-6, "j ": 186e-6, "jy": 0, "jo": 599e-6, "bc": 34e-6, "bp": 0, "bv": 0, "bd": 34e-6, "bh": 0, "bk": 0, "ba": 161e-5, "bs": 198e-6, "bw": 0, "bu": 1113e-6, "bz": 11e-6, "bt": 45e-6, "be": 994e-6, "br": 1299e-6, "bl": 774e-6, "bj": 6e-6, "bb": 45e-6, "bx": 0, "bi": 1361e-6, "bq": 0, "bf": 11e-6, "bg": 11e-6, "bm": 0, "bn": 79e-6, "b ": 452e-6, "by": 79e-6, "bo": 1062e-6, "xc": 23e-6, "xp": 96e-6, "xv": 28e-6, "xd": 0, "xh": 0, "xk": 0, "xa": 164e-6, "xs": 17e-6, "xw": 0, "xu": 4e-5, "xz": 0, "xt": 124e-6, "xe": 119e-6, "xr": 0, "xl": 79e-6, "xj": 0, "xb": 11e-6, "xx": 62e-6, "xi": 243e-6, "xq": 0, "xf": 0, "xg": 0, "xm": 0, "xn": 0, "x ": 328e-6, "xy": 17e-6, "xo": 28e-6, "ic": 5738e-6, "ip": 808e-6, "iv": 2304e-6, "id": 1186e-6, "ih": 237e-6, "ik": 215e-6, "ia": 7189e-6, "is": 3857e-6, "iw": 0, "iu": 3202e-6, "iz": 105e-5, "it": 6241e-6, "ie": 5405e-6, "ir": 1265e-6, "il": 4315e-6, "ij": 113e-6, "ib": 429e-6, "ix": 169e-6, "ii": 3507e-6, "iq": 11e-6, "if": 486e-6, "ig": 683e-6, "im": 2174e-6, "in": 0.016672, "i ": 0.016536, "iy": 11e-6, "io": 3259e-6, "qc": 0, "qp": 0, "qv": 6e-6, "qd": 0, "qh": 0, "qk": 0, "qa": 17e-6, "qs": 0, "qw": 0, "qu": 107e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 6e-6, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 17e-6, "qy": 0, "qo": 0, "fc": 107e-6, "fp": 6e-6, "fv": 0, "fd": 0, "fh": 6e-6, "fk": 11e-6, "fa": 2197e-6, "fs": 11e-6, "fw": 0, "fu": 322e-6, "fz": 0, "ft": 96e-6, "fe": 926e-6, "fr": 887e-6, "fl": 457e-6, "fj": 11e-6, "fb": 6e-6, "fx": 0, "fi": 196e-5, "fq": 0, "ff": 56e-6, "fg": 6e-6, "fm": 6e-6, "fn": 45e-6, "f ": 356e-6, "fy": 6e-6, "fo": 3191e-6, "gc": 6e-6, "gp": 0, "gv": 11e-6, "gd": 56e-6, "gh": 395e-6, "gk": 28e-6, "ga": 966e-6, "gs": 169e-6, "gw": 28e-6, "gu": 576e-6, "gz": 6e-6, "gt": 85e-6, "ge": 183e-5, "gr": 1807e-6, "gl": 26e-5, "gj": 11e-6, "gb": 11e-6, "gx": 0, "gi": 2824e-6, "gq": 6e-6, "gf": 0, "gg": 51e-6, "gm": 45e-6, "gn": 198e-6, "g ": 683e-6, "gy": 68e-6, "go": 548e-6, "mc": 56e-6, "mp": 144e-5, "mv": 23e-6, "md": 0, "mh": 34e-6, "mk": 51e-6, "ma": 493e-5, "ms": 79e-6, "mw": 6e-6, "mu": 3598e-6, "mz": 0, "mt": 68e-6, "me": 4128e-6, "mr": 288e-6, "ml": 56e-6, "mj": 11e-6, "mb": 864e-6, "mx": 0, "mi": 3055e-6, "mq": 6e-6, "mf": 4e-5, "mg": 6e-6, "mm": 152e-6, "mn": 1395e-6, "m ": 2107e-6, "my": 136e-6, "mo": 1931e-6, "nc": 2016e-6, "np": 28e-6, "nv": 175e-6, "nd": 3129e-6, "nh": 79e-6, "nk": 345e-6, "na": 6184e-6, "ns": 2829e-6, "nw": 4e-5, "nu": 3908e-6, "nz": 378e-6, "nt": 8522e-6, "ne": 5919e-6, "nr": 277e-6, "nl": 192e-6, "nj": 79e-6, "nb": 107e-6, "nx": 11e-6, "ni": 6822e-6, "nq": 17e-6, "nf": 418e-6, "ng": 1034e-6, "nm": 147e-6, "nn": 452e-6, "n ": 0.020913, "ny": 152e-6, "no": 2276e-6, " c": 0.014119, " p": 0.013165, " v": 2073e-6, " d": 0.019608, " h": 2524e-6, " k": 153e-5, " a": 0.015892, " s": 0.012346, " w": 627e-6, " u": 7432e-6, " z": 745e-6, " t": 3383e-6, " e": 9036e-6, " r": 802e-5, " l": 5659e-6, " j": 196e-5, " b": 3422e-6, " x": 181e-6, " i": 8545e-6, " q": 4e-5, " f": 637e-5, " g": 2581e-6, " m": 6404e-6, " n": 0.010448, "  ": 6263e-6, " y": 158e-6, " o": 6935e-6, "yc": 4e-5, "yp": 6e-6, "yv": 17e-6, "yd": 34e-6, "yh": 17e-6, "yk": 17e-6, "ya": 79e-6, "ys": 9e-5, "yw": 6e-6, "yu": 45e-6, "yz": 28e-6, "yt": 85e-6, "ye": 9e-5, "yr": 85e-6, "yl": 136e-6, "yj": 0, "yb": 45e-6, "yx": 0, "yi": 45e-6, "yq": 6e-6, "yf": 0, "yg": 23e-6, "ym": 147e-6, "yn": 85e-6, "y ": 1e-3, "yy": 6e-6, "yo": 119e-6, "oc": 2293e-6, "op": 227e-5, "ov": 2129e-6, "od": 1124e-6, "oh": 277e-6, "ok": 26e-5, "oa": 1627e-6, "os": 3349e-6, "ow": 232e-6, "ou": 825e-6, "oz": 316e-6, "ot": 2372e-6, "oe": 282e-6, "or": 833e-5, "ol": 388e-5, "oj": 51e-6, "ob": 706e-6, "ox": 147e-6, "oi": 1034e-6, "oq": 6e-6, "of": 463e-6, "og": 678e-6, "om": 5162e-6, "on": 6822e-6, "o ": 5992e-6, "oy": 124e-6, "oo": 322e-6 };
const bigram_ro = {
  total_count: total_count$3,
  probabilities: probabilities$3
};
const total_count$2 = 206202;
const probabilities$2 = { "cc": 204e-6, "cp": 15e-6, "cv": 1e-5, "cd": 29e-6, "ch": 2047e-6, "ck": 349e-6, "ca": 1426e-6, "cs": 2677e-6, "cw": 5e-6, "cu": 276e-6, "cz": 53e-6, "ct": 276e-6, "ce": 1886e-6, "cr": 315e-6, "cl": 252e-6, "cj": 1e-5, "cb": 63e-6, "cx": 0, "ci": 2241e-6, "cq": 131e-6, "cf": 19e-6, "cg": 53e-6, "cm": 252e-6, "cn": 29e-6, "c ": 679e-6, "cy": 97e-6, "co": 1421e-6, "pc": 78e-6, "pp": 213e-6, "pv": 194e-6, "pd": 15e-6, "ph": 335e-6, "pk": 175e-6, "pa": 1765e-6, "ps": 432e-6, "pw": 0, "pu": 306e-6, "pz": 48e-6, "pt": 8e-4, "pe": 1566e-6, "pr": 897e-6, "pl": 2784e-6, "pj": 267e-6, "pb": 58e-6, "px": 5e-6, "pi": 1193e-6, "pq": 0, "pf": 68e-6, "pg": 0, "pm": 19e-6, "pn": 17e-5, "p ": 407e-6, "py": 34e-6, "po": 1756e-6, "vc": 39e-6, "vp": 0, "vv": 63e-6, "vd": 223e-6, "vh": 44e-6, "vk": 199e-6, "va": 2924e-6, "vs": 315e-6, "vw": 0, "vu": 58e-6, "vz": 175e-6, "vt": 281e-6, "ve": 3322e-6, "vr": 1499e-6, "vl": 742e-6, "vj": 116e-6, "vb": 16e-5, "vx": 0, "vi": 3026e-6, "vq": 15e-6, "vf": 44e-6, "vg": 267e-6, "vm": 19e-6, "vn": 616e-6, "v ": 858e-6, "vy": 48e-6, "vo": 1416e-6, "dc": 19e-6, "dp": 48e-6, "dv": 15e-5, "dd": 112e-6, "dh": 48e-6, "dk": 252e-6, "da": 2808e-6, "ds": 718e-6, "dw": 44e-6, "du": 577e-6, "dz": 223e-6, "dt": 475e-6, "de": 3666e-6, "dr": 761e-6, "dl": 407e-6, "dj": 1246e-6, "db": 233e-6, "dx": 0, "di": 1964e-6, "dq": 0, "df": 58e-6, "dg": 44e-6, "dm": 141e-6, "dn": 364e-6, "d ": 2245e-6, "dy": 53e-6, "do": 1465e-6, "hc": 24e-6, "hp": 24e-6, "hv": 58e-6, "hd": 53e-6, "hh": 19e-6, "hk": 15e-6, "ha": 4617e-6, "hs": 58e-6, "hw": 48e-6, "hu": 349e-6, "hz": 344e-6, "ht": 291e-6, "he": 2769e-6, "hr": 529e-6, "hl": 281e-6, "hj": 29e-6, "hb": 116e-6, "hx": 0, "hi": 907e-6, "hq": 5e-6, "hf": 0, "hg": 29e-6, "hm": 68e-6, "hn": 233e-6, "h ": 538e-6, "hy": 131e-6, "ho": 1954e-6, "kc": 82e-6, "kp": 388e-6, "kv": 364e-6, "kd": 15e-5, "kh": 403e-6, "kk": 1853e-6, "ka": 3176e-6, "ks": 839e-6, "kw": 0, "ku": 926e-6, "kz": 3244e-6, "kt": 786e-6, "ke": 4287e-6, "kr": 1048e-6, "kl": 761e-6, "kj": 92e-6, "kb": 708e-6, "kx": 0, "ki": 2177e-6, "kq": 0, "kf": 126e-6, "kg": 39e-6, "km": 301e-6, "kn": 868e-6, "k ": 0.010509, "ky": 78e-6, "ko": 4311e-6, "ac": 1285e-6, "ap": 1629e-6, "av": 902e-6, "ad": 2148e-6, "ah": 349e-6, "ak": 7624e-6, "aa": 145e-6, "as": 3506e-6, "aw": 73e-6, "au": 1591e-6, "az": 4559e-6, "at": 6392e-6, "ae": 79e-5, "ar": 7308e-6, "al": 8249e-6, "aj": 1872e-6, "ab": 1266e-6, "ax": 68e-6, "ai": 5451e-6, "aq": 24e-6, "af": 524e-6, "ag": 2866e-6, "am": 3327e-6, "an": 0.013249, "a ": 0.022269, "ay": 519e-6, "ao": 1091e-6, "sc": 752e-6, "sp": 892e-6, "sv": 412e-6, "sd": 184e-6, "sh": 436e-6, "sk": 732e-6, "sa": 6358e-6, "ss": 2245e-6, "sw": 53e-6, "su": 849e-6, "sz": 0.016595, "st": 34e-4, "se": 3618e-6, "sr": 582e-6, "sl": 664e-6, "sj": 58e-6, "sb": 1009e-6, "sx": 0, "si": 1853e-6, "sq": 48e-6, "sf": 16e-5, "sg": 3269e-6, "sm": 441e-6, "sn": 533e-6, "s ": 0.017095, "sy": 107e-6, "so": 1891e-6, "wc": 0, "wp": 5e-6, "wv": 0, "wd": 0, "wh": 63e-6, "wk": 1e-5, "wa": 407e-6, "ws": 15e-6, "ww": 24e-6, "wu": 1e-5, "wz": 0, "wt": 34e-6, "we": 257e-6, "wr": 58e-6, "wl": 5e-6, "wj": 0, "wb": 0, "wx": 0, "wi": 252e-6, "wq": 0, "wf": 1e-5, "wg": 0, "wm": 0, "wn": 39e-6, "w ": 131e-6, "wy": 1e-5, "wo": 73e-6, "uc": 378e-6, "up": 189e-6, "uv": 213e-6, "ud": 611e-6, "uh": 82e-6, "uk": 349e-6, "ua": 199e-6, "us": 2764e-6, "uw": 29e-6, "uu": 5e-6, "uz": 213e-6, "ut": 1295e-6, "ue": 815e-6, "ur": 3254e-6, "ul": 1479e-6, "uj": 39e-6, "ub": 32e-5, "ux": 344e-6, "ui": 456e-6, "uq": 5e-6, "uf": 48e-6, "ug": 732e-6, "um": 723e-6, "un": 883e-6, "u ": 524e-6, "uy": 58e-6, "uo": 24e-6, "zc": 68e-6, "zp": 378e-6, "zv": 349e-6, "zd": 451e-6, "zh": 87e-6, "zk": 921e-6, "za": 2289e-6, "zs": 3007e-6, "zw": 48e-6, "zu": 31e-5, "zz": 378e-6, "zt": 3123e-6, "ze": 4709e-6, "zr": 572e-6, "zl": 1028e-6, "zj": 194e-6, "zb": 179e-6, "zx": 5e-6, "zi": 2042e-6, "zq": 0, "zf": 92e-6, "zg": 2842e-6, "zm": 2168e-6, "zn": 1149e-6, "z ": 5941e-6, "zy": 73e-6, "zo": 1814e-6, "tc": 175e-6, "tp": 276e-6, "tv": 742e-6, "td": 233e-6, "th": 1086e-6, "tk": 1353e-6, "ta": 5931e-6, "ts": 1862e-6, "tw": 19e-6, "tu": 79e-5, "tz": 233e-6, "tt": 45e-4, "te": 8657e-6, "tr": 4229e-6, "tl": 2095e-6, "tj": 795e-6, "tb": 863e-6, "tx": 0, "ti": 3463e-6, "tq": 1e-5, "tf": 16e-5, "tg": 296e-6, "tm": 315e-6, "tn": 1023e-6, "t ": 0.012468, "ty": 296e-6, "to": 4714e-6, "ec": 114e-5, "ep": 2755e-6, "ev": 1528e-6, "ed": 1741e-6, "eh": 533e-6, "ek": 4112e-6, "ea": 815e-6, "es": 6387e-6, "ew": 116e-6, "eu": 931e-6, "ez": 2633e-6, "et": 7483e-6, "ee": 301e-6, "er": 9864e-6, "el": 0.012856, "ej": 495e-6, "eb": 747e-6, "ex": 126e-6, "ei": 1295e-6, "eq": 19e-6, "ef": 359e-6, "eg": 7216e-6, "em": 3007e-6, "en": 0.010684, "e ": 0.01015, "ey": 335e-6, "eo": 325e-6, "rc": 96e-5, "rp": 339e-6, "rv": 873e-6, "rd": 1237e-6, "rh": 306e-6, "rk": 839e-6, "ra": 5524e-6, "rs": 5718e-6, "rw": 15e-6, "ru": 674e-6, "rz": 582e-6, "rt": 404e-5, "re": 6057e-6, "rr": 781e-6, "rl": 1969e-6, "rj": 296e-6, "rb": 824e-6, "rx": 5e-6, "ri": 4234e-6, "rq": 29e-6, "rf": 276e-6, "rg": 1886e-6, "rm": 194e-5, "rn": 1499e-6, "r ": 5097e-6, "ry": 407e-6, "ro": 5989e-6, "lc": 31e-5, "lp": 242e-6, "lv": 684e-6, "ld": 1465e-6, "lh": 723e-6, "lk": 1571e-6, "la": 8758e-6, "ls": 3545e-6, "lw": 1e-5, "lu": 781e-6, "lz": 242e-6, "lt": 3705e-6, "le": 9607e-6, "lr": 213e-6, "ll": 5485e-6, "lj": 364e-6, "lb": 757e-6, "lx": 1e-5, "li": 3463e-6, "lq": 5e-6, "lf": 242e-6, "lg": 912e-6, "lm": 1009e-6, "ln": 892e-6, "l ": 7541e-6, "ly": 3613e-6, "lo": 3089e-6, "jc": 68e-6, "jp": 15e-6, "jv": 73e-6, "jd": 335e-6, "jh": 87e-6, "jk": 233e-6, "ja": 3249e-6, "js": 136e-6, "jw": 0, "ju": 296e-6, "jz": 141e-6, "jt": 902e-6, "je": 1678e-6, "jr": 771e-6, "jl": 223e-6, "jj": 39e-6, "jb": 989e-6, "jx": 0, "ji": 107e-6, "jq": 0, "jf": 24e-6, "jg": 34e-6, "jm": 19e-6, "jn": 1014e-6, "j ": 64e-5, "jy": 0, "jo": 582e-6, "bc": 82e-6, "bp": 5e-6, "bv": 34e-6, "bd": 412e-6, "bh": 68e-6, "bk": 175e-6, "ba": 8336e-6, "bs": 155e-6, "bw": 19e-6, "bu": 732e-6, "bz": 92e-6, "bt": 102e-6, "be": 6241e-6, "br": 1217e-6, "bl": 66e-5, "bj": 53e-6, "bb": 1528e-6, "bx": 0, "bi": 1111e-6, "bq": 0, "bf": 15e-6, "bg": 5e-6, "bm": 15e-6, "bn": 242e-6, "b ": 1164e-6, "by": 44e-6, "bo": 1149e-6, "xc": 0, "xp": 0, "xv": 19e-6, "xd": 24e-6, "xh": 5e-6, "xk": 5e-6, "xa": 39e-6, "xs": 44e-6, "xw": 0, "xu": 29e-6, "xz": 0, "xt": 24e-6, "xe": 15e-6, "xr": 1e-5, "xl": 5e-6, "xj": 5e-6, "xb": 19e-6, "xx": 0, "xi": 131e-6, "xq": 5e-6, "xf": 1e-5, "xg": 1e-5, "xm": 0, "xn": 5e-6, "x ": 383e-6, "xy": 0, "xo": 19e-6, "ic": 1528e-6, "ip": 417e-6, "iv": 718e-6, "id": 1552e-6, "ih": 175e-6, "ik": 3938e-6, "ia": 3632e-6, "is": 4088e-6, "iw": 0, "iu": 48e-5, "iz": 64e-5, "it": 1591e-6, "ie": 1324e-6, "ir": 1688e-6, "il": 3409e-6, "ij": 349e-6, "ib": 1086e-6, "ix": 73e-6, "ii": 339e-6, "iq": 53e-6, "if": 572e-6, "ig": 129e-5, "im": 1014e-6, "in": 6862e-6, "i ": 903e-5, "iy": 5e-6, "io": 863e-6, "qc": 0, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 0, "qa": 0, "qs": 0, "qw": 0, "qu": 354e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 0, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 78e-6, "qy": 0, "qo": 0, "fc": 58e-6, "fp": 5e-6, "fv": 87e-6, "fd": 1e-5, "fh": 15e-6, "fk": 53e-6, "fa": 1145e-6, "fs": 53e-6, "fw": 5e-6, "fu": 276e-6, "fz": 29e-6, "ft": 102e-6, "fe": 1726e-6, "fr": 1605e-6, "fl": 892e-6, "fj": 87e-6, "fb": 39e-6, "fx": 0, "fi": 834e-6, "fq": 0, "ff": 112e-6, "fg": 58e-6, "fm": 15e-6, "fn": 102e-6, "f ": 1969e-6, "fy": 0, "fo": 1867e-6, "gc": 63e-6, "gp": 68e-6, "gv": 15e-5, "gd": 92e-6, "gh": 349e-6, "gk": 238e-6, "ga": 2328e-6, "gs": 398e-6, "gw": 19e-6, "gu": 592e-6, "gz": 116e-6, "gt": 349e-6, "ge": 2852e-6, "gr": 1009e-6, "gl": 606e-6, "gj": 47e-5, "gb": 2517e-6, "gx": 0, "gi": 1523e-6, "gq": 0, "gf": 97e-6, "gg": 349e-6, "gm": 136e-6, "gn": 1188e-6, "g ": 3414e-6, "gy": 741e-5, "go": 1338e-6, "mc": 107e-6, "mp": 621e-6, "mv": 349e-6, "md": 102e-6, "mh": 53e-6, "mk": 175e-6, "ma": 5955e-6, "ms": 849e-6, "mw": 1e-5, "mu": 766e-6, "mz": 592e-6, "mt": 427e-6, "me": 7822e-6, "mr": 558e-6, "ml": 485e-6, "mj": 126e-6, "mb": 1431e-6, "mx": 0, "mi": 2013e-6, "mq": 0, "mf": 73e-6, "mg": 155e-6, "mm": 31e-5, "mn": 1324e-6, "m ": 1945e-6, "my": 87e-6, "mo": 2202e-6, "nc": 2192e-6, "np": 306e-6, "nv": 422e-6, "nd": 2667e-6, "nh": 286e-6, "nk": 674e-6, "na": 5756e-6, "ns": 1198e-6, "nw": 68e-6, "nu": 1518e-6, "nz": 315e-6, "nt": 4947e-6, "ne": 4966e-6, "nr": 165e-6, "nl": 79e-5, "nj": 184e-6, "nb": 485e-6, "nx": 1e-5, "ni": 2216e-6, "nq": 15e-6, "nf": 257e-6, "ng": 1751e-6, "nm": 572e-6, "nn": 113e-5, "n ": 0.016557, "ny": 3967e-6, "no": 2134e-6, " c": 4685e-6, " p": 3943e-6, " v": 662e-5, " d": 3201e-6, " h": 5543e-6, " k": 9161e-6, " a": 0.019903, " s": 0.015034, " w": 655e-6, " u": 892e-6, " z": 946e-6, " t": 853e-5, " e": 6072e-6, " r": 4816e-6, " l": 7362e-6, " j": 4093e-6, " b": 5596e-6, " x": 92e-6, " i": 2619e-6, " q": 63e-6, " f": 7464e-6, " g": 2444e-6, " m": 9903e-6, " n": 4976e-6, "  ": 7861e-6, " y": 126e-6, " o": 29e-4, "yc": 82e-6, "yp": 92e-6, "yv": 291e-6, "yd": 131e-6, "yh": 16e-5, "yk": 335e-6, "ya": 144e-5, "ys": 669e-6, "yw": 15e-6, "yu": 403e-6, "yz": 238e-6, "yt": 456e-6, "ye": 2852e-6, "yr": 529e-6, "yl": 373e-6, "yj": 276e-6, "yb": 1945e-6, "yx": 15e-6, "yi": 1271e-6, "yq": 0, "yf": 87e-6, "yg": 136e-6, "ym": 87e-6, "yn": 723e-6, "y ": 3982e-6, "yy": 5e-6, "yo": 1023e-6, "oc": 436e-6, "op": 718e-6, "ov": 1164e-6, "od": 946e-6, "oh": 189e-6, "ok": 2177e-6, "oa": 145e-6, "os": 7527e-6, "ow": 126e-6, "ou": 1261e-6, "oz": 1586e-6, "ot": 2279e-6, "oe": 97e-6, "or": 8118e-6, "ol": 5373e-6, "oj": 97e-6, "ob": 718e-6, "ox": 53e-6, "oi": 538e-6, "oq": 5e-6, "of": 247e-6, "og": 989e-6, "om": 2735e-6, "on": 5752e-6, "o ": 2022e-6, "oy": 112e-6, "oo": 175e-6 };
const bigram_hu = {
  total_count: total_count$2,
  probabilities: probabilities$2
};
const total_count$1 = 202685;
const probabilities$1 = { "cc": 99e-6, "cp": 0, "cv": 0, "cd": 69e-6, "ch": 1085e-6, "ck": 41e-5, "ca": 2087e-6, "cs": 178e-6, "cw": 0, "cu": 1475e-6, "cz": 2e-5, "ct": 168e-6, "ce": 15e-4, "cr": 212e-6, "cl": 474e-6, "cj": 0, "cb": 39e-6, "cx": 0, "ci": 1796e-6, "cq": 25e-6, "cf": 0, "cg": 1e-5, "cm": 187e-6, "cn": 89e-6, "c ": 112e-5, "cy": 84e-6, "co": 77e-5, "pc": 44e-6, "pp": 192e-6, "pv": 15e-6, "pd": 39e-6, "ph": 192e-6, "pk": 1e-5, "pa": 2191e-6, "ps": 192e-6, "pw": 0, "pu": 207e-6, "pz": 1e-5, "pt": 424e-6, "pe": 775e-6, "pr": 73e-5, "pl": 1367e-6, "pj": 0, "pb": 0, "px": 0, "pi": 883e-6, "pq": 0, "pf": 0, "pg": 2e-5, "pm": 503e-6, "pn": 128e-6, "p ": 1076e-6, "py": 3e-5, "po": 1377e-6, "vc": 104e-6, "vp": 0, "vv": 84e-6, "vd": 59e-6, "vh": 3e-5, "vk": 44e-6, "va": 1771e-6, "vs": 25e-6, "vw": 0, "vu": 276e-6, "vz": 15e-6, "vt": 15e-6, "ve": 6843e-6, "vr": 464e-6, "vl": 488e-6, "vj": 0, "vb": 25e-6, "vx": 0, "vi": 1115e-6, "vq": 0, "vf": 15e-6, "vg": 2e-5, "vm": 0, "vn": 25e-6, "v ": 518e-6, "vy": 104e-6, "vo": 217e-6, "dc": 15e-6, "dp": 1e-5, "dv": 3e-5, "dd": 306e-6, "dh": 1e-5, "dk": 104e-6, "da": 9981e-6, "ds": 187e-6, "dw": 25e-6, "du": 1944e-6, "dz": 498e-6, "dt": 3e-5, "de": 9621e-6, "dr": 3271e-6, "dl": 444e-6, "dj": 1e-5, "db": 15e-6, "dx": 5e-6, "di": 748e-5, "dq": 0, "df": 25e-6, "dg": 44e-6, "dm": 183e-6, "dn": 1179e-6, "d ": 2625e-6, "dy": 454e-6, "do": 1451e-6, "hc": 54e-6, "hp": 2e-5, "hv": 1e-5, "hd": 49e-6, "hh": 0, "hk": 128e-6, "ha": 3424e-6, "hs": 84e-6, "hw": 2e-5, "hu": 469e-6, "hz": 44e-6, "ht": 197e-6, "he": 1638e-6, "hr": 562e-6, "hl": 222e-6, "hj": 0, "hb": 2e-5, "hx": 0, "hi": 2274e-6, "hq": 0, "hf": 0, "hg": 0, "hm": 207e-6, "hn": 252e-6, "h ": 607e-6, "hy": 54e-6, "ho": 592e-6, "kc": 163e-6, "kp": 54e-6, "kv": 15e-6, "kd": 104e-6, "kh": 35e-6, "kk": 286e-6, "ka": 6429e-6, "ks": 1322e-6, "kw": 1e-5, "ku": 2329e-6, "kz": 104e-6, "kt": 2531e-6, "ke": 3098e-6, "kr": 706e-6, "kl": 2378e-6, "kj": 0, "kb": 104e-6, "kx": 5e-6, "ki": 4426e-6, "kq": 0, "kf": 39e-6, "kg": 15e-6, "km": 1155e-6, "kn": 449e-6, "k ": 7751e-6, "ky": 706e-6, "ko": 222e-5, "ac": 1278e-6, "ap": 2112e-6, "av": 1406e-6, "ad": 4514e-6, "ah": 1895e-6, "ak": 7307e-6, "aa": 913e-6, "as": 5624e-6, "aw": 153e-6, "au": 508e-6, "az": 2018e-6, "at": 3814e-6, "ae": 572e-6, "ar": 0.015601, "al": 0.011654, "aj": 138e-6, "ab": 151e-5, "ax": 44e-6, "ai": 789e-6, "aq": 25e-6, "af": 149e-5, "ag": 479e-6, "am": 4702e-6, "an": 0.019301, "a ": 0.017387, "ay": 45e-4, "ao": 84e-6, "sc": 479e-6, "sp": 429e-6, "sv": 143e-6, "sd": 212e-6, "sh": 459e-6, "sk": 1105e-6, "sa": 4159e-6, "ss": 538e-6, "sw": 3e-5, "su": 1944e-6, "sz": 434e-6, "st": 3858e-6, "se": 2926e-6, "sr": 804e-6, "sl": 893e-6, "sj": 5e-6, "sb": 94e-6, "sx": 0, "si": 6902e-6, "sq": 5e-6, "sf": 84e-6, "sg": 25e-6, "sm": 543e-6, "sn": 1855e-6, "s ": 4421e-6, "sy": 109e-5, "so": 1742e-6, "wc": 0, "wp": 0, "wv": 0, "wd": 3e-5, "wh": 54e-6, "wk": 0, "wa": 4e-4, "ws": 44e-6, "ww": 84e-6, "wu": 0, "wz": 0, "wt": 0, "we": 237e-6, "wr": 3e-5, "wl": 2e-5, "wj": 0, "wb": 0, "wx": 0, "wi": 291e-6, "wq": 0, "wf": 0, "wg": 5e-6, "wm": 0, "wn": 44e-6, "w ": 183e-6, "wy": 1e-5, "wo": 104e-6, "uc": 429e-6, "up": 484e-6, "uv": 207e-6, "ud": 928e-6, "uh": 143e-6, "uk": 755e-6, "ua": 405e-6, "us": 2378e-6, "uw": 0, "uu": 622e-6, "uz": 1031e-6, "ut": 1495e-6, "ue": 222e-6, "ur": 3878e-6, "ul": 3838e-6, "uj": 2e-5, "ub": 429e-6, "ux": 39e-6, "ui": 133e-6, "uq": 5e-6, "uf": 54e-6, "ug": 227e-6, "um": 1046e-6, "un": 518e-5, "u ": 4569e-6, "uy": 385e-6, "uo": 25e-6, "zc": 99e-6, "zp": 5e-6, "zv": 5e-6, "zd": 301e-6, "zh": 44e-6, "zk": 39e-6, "za": 1406e-6, "zs": 2e-5, "zw": 0, "zu": 266e-6, "zz": 59e-6, "zt": 25e-6, "ze": 1835e-6, "zr": 64e-6, "zl": 982e-6, "zj": 0, "zb": 1e-5, "zx": 0, "zi": 1599e-6, "zq": 0, "zf": 0, "zg": 113e-6, "zm": 35e-5, "zn": 237e-6, "z ": 1954e-6, "zy": 335e-6, "zo": 247e-6, "tc": 104e-6, "tp": 84e-6, "tv": 64e-6, "td": 133e-6, "th": 775e-6, "tk": 513e-6, "ta": 8328e-6, "ts": 429e-6, "tw": 54e-6, "tu": 1115e-6, "tz": 79e-6, "tt": 794e-6, "te": 5245e-6, "tr": 3681e-6, "tl": 1638e-6, "tj": 0, "tb": 691e-6, "tx": 5e-6, "ti": 6266e-6, "tq": 0, "tf": 133e-6, "tg": 44e-6, "tm": 804e-6, "tn": 414e-6, "t ": 3513e-6, "ty": 291e-6, "to": 2038e-6, "ec": 696e-6, "ep": 479e-6, "ev": 1761e-6, "ed": 3745e-6, "eh": 789e-6, "ek": 3977e-6, "ea": 73e-5, "es": 5042e-6, "ew": 153e-6, "eu": 168e-6, "ez": 992e-6, "et": 5195e-6, "ee": 4e-4, "er": 0.013079, "el": 557e-5, "ej": 59e-6, "eb": 474e-6, "ex": 89e-6, "ei": 1564e-6, "eq": 0, "ef": 75e-5, "eg": 306e-6, "em": 2674e-6, "en": 9586e-6, "e ": 0.019039, "ey": 2768e-6, "eo": 488e-6, "rc": 553e-6, "rp": 178e-6, "rv": 252e-6, "rd": 2482e-6, "rh": 118e-6, "rk": 2141e-6, "ra": 8881e-6, "rs": 11e-4, "rw": 2e-5, "ru": 186e-5, "rz": 187e-6, "rt": 1727e-6, "re": 4776e-6, "rr": 335e-6, "rl": 2827e-6, "rj": 133e-6, "rb": 493e-6, "rx": 0, "ri": 931e-5, "rq": 2e-5, "rf": 133e-6, "rg": 567e-6, "rm": 1845e-6, "rn": 2408e-6, "r ": 0.021186, "ry": 755e-6, "ro": 2353e-6, "lc": 543e-6, "lp": 143e-6, "lv": 128e-6, "ld": 2225e-6, "lh": 173e-6, "lk": 1618e-6, "la": 0.013785, "ls": 242e-6, "lw": 1e-5, "lu": 3399e-6, "lz": 44e-6, "lt": 947e-6, "le": 0.012221, "lr": 281e-6, "ll": 3217e-6, "lj": 5e-6, "lb": 528e-6, "lx": 5e-6, "li": 7894e-6, "lq": 5e-6, "lf": 79e-6, "lg": 962e-6, "lm": 3671e-6, "ln": 1377e-6, "l ": 8017e-6, "ly": 1332e-6, "lo": 1589e-6, "jc": 0, "jp": 5e-6, "jv": 5e-6, "jd": 5e-6, "jh": 0, "jk": 2e-5, "ja": 498e-6, "js": 5e-6, "jw": 0, "ju": 74e-6, "jz": 0, "jt": 5e-6, "je": 316e-6, "jr": 3e-5, "jl": 3e-5, "jj": 0, "jb": 5e-6, "jx": 0, "ji": 572e-6, "jq": 0, "jf": 1e-5, "jg": 0, "jm": 5e-6, "jn": 2e-5, "j ": 69e-6, "jy": 5e-6, "jo": 286e-6, "bc": 69e-6, "bp": 0, "bv": 0, "bd": 212e-6, "bh": 44e-6, "bk": 15e-6, "ba": 523e-5, "bs": 79e-6, "bw": 0, "bu": 3143e-6, "bz": 15e-6, "bt": 39e-6, "be": 2087e-6, "br": 686e-6, "bl": 937e-6, "bj": 5e-6, "bb": 133e-6, "bx": 0, "bi": 7702e-6, "bq": 0, "bf": 0, "bg": 15e-6, "bm": 311e-6, "bn": 143e-6, "b ": 281e-6, "by": 562e-6, "bo": 1411e-6, "xc": 1e-5, "xp": 1e-5, "xv": 5e-6, "xd": 5e-6, "xh": 0, "xk": 0, "xa": 25e-6, "xs": 25e-6, "xw": 0, "xu": 0, "xz": 0, "xt": 59e-6, "xe": 3e-5, "xr": 5e-6, "xl": 5e-6, "xj": 0, "xb": 59e-6, "xx": 1e-5, "xi": 39e-6, "xq": 0, "xf": 0, "xg": 0, "xm": 15e-6, "xn": 0, "x ": 207e-6, "xy": 5e-6, "xo": 1e-5, "ic": 987e-6, "ip": 1046e-6, "iv": 582e-6, "id": 2556e-6, "ih": 952e-6, "ik": 4544e-6, "ia": 1071e-6, "is": 4653e-6, "iw": 15e-6, "iu": 99e-6, "iz": 1515e-6, "it": 3582e-6, "ie": 112e-5, "ir": 0.01268, "il": 0.01078, "ij": 212e-6, "ib": 893e-6, "ix": 44e-6, "ii": 2176e-6, "iq": 15e-6, "if": 326e-6, "ig": 375e-6, "im": 2452e-6, "in": 0.015906, "i ": 0.014515, "iy": 3118e-6, "io": 523e-6, "qc": 5e-6, "qp": 0, "qv": 0, "qd": 0, "qh": 0, "qk": 0, "qa": 5e-6, "qs": 0, "qw": 0, "qu": 148e-6, "qz": 0, "qt": 5e-6, "qe": 0, "qr": 0, "ql": 0, "qj": 0, "qb": 0, "qx": 0, "qi": 0, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 0, "qy": 0, "qo": 0, "fc": 3e-5, "fp": 0, "fv": 0, "fd": 5e-6, "fh": 0, "fk": 54e-6, "fa": 1253e-6, "fs": 3e-5, "fw": 0, "fu": 1327e-6, "fz": 15e-6, "ft": 173e-6, "fe": 1021e-6, "fr": 74e-5, "fl": 291e-6, "fj": 0, "fb": 1e-5, "fx": 0, "fi": 1209e-6, "fq": 0, "ff": 79e-6, "fg": 2e-5, "fm": 0, "fn": 888e-6, "f ": 464e-6, "fy": 15e-6, "fo": 701e-6, "gc": 217e-6, "gp": 0, "gv": 54e-6, "gd": 192e-6, "gh": 138e-6, "gk": 237e-6, "ga": 1312e-6, "gs": 242e-6, "gw": 1e-5, "gu": 493e-6, "gz": 148e-6, "gt": 74e-6, "ge": 2827e-6, "gr": 1628e-6, "gl": 365e-6, "gj": 0, "gb": 15e-6, "gx": 0, "gi": 1668e-6, "gq": 0, "gf": 1e-5, "gg": 39e-6, "gm": 69e-6, "gn": 849e-6, "g ": 464e-6, "gy": 3e-5, "go": 474e-6, "mc": 464e-6, "mp": 548e-6, "mv": 1e-5, "md": 538e-6, "mh": 296e-6, "mk": 69e-6, "ma": 7139e-6, "ms": 449e-6, "mw": 5e-6, "mu": 1248e-6, "mz": 405e-6, "mt": 814e-6, "me": 5565e-6, "mr": 133e-6, "ml": 1312e-6, "mj": 5e-6, "mb": 266e-6, "mx": 0, "mi": 4357e-6, "mq": 0, "mf": 0, "mg": 3e-5, "mm": 232e-6, "mn": 1209e-6, "m ": 4445e-6, "my": 419e-6, "mo": 947e-6, "nc": 1954e-6, "np": 35e-6, "nv": 59e-6, "nd": 0.011624, "nh": 35e-6, "nk": 395e-6, "na": 5768e-6, "ns": 1919e-6, "nw": 15e-6, "nu": 2003e-6, "nz": 217e-6, "nt": 1959e-6, "ne": 5674e-6, "nr": 76e-5, "nl": 2733e-6, "nj": 59e-6, "nb": 192e-6, "nx": 3e-5, "ni": 5876e-6, "nq": 0, "nf": 849e-6, "ng": 1327e-6, "nm": 1416e-6, "nn": 3172e-6, "n ": 0.024274, "ny": 1199e-6, "no": 1021e-6, " c": 2817e-6, " p": 3478e-6, " v": 6715e-6, " d": 8126e-6, " h": 3419e-6, " k": 0.010746, " a": 0.01306, " s": 8649e-6, " w": 73e-5, " u": 1549e-6, " z": 1243e-6, " t": 8461e-6, " e": 6123e-6, " r": 2418e-6, " l": 221e-5, " j": 967e-6, " b": 0.016592, " x": 158e-6, " i": 966e-5, " q": 54e-6, " f": 3829e-6, " g": 63e-4, " m": 6197e-6, " n": 3256e-6, "  ": 593e-5, " y": 8654e-6, " o": 6695e-6, "yc": 163e-6, "yp": 84e-6, "yv": 183e-6, "yd": 794e-6, "yh": 3e-5, "yk": 809e-6, "ya": 9123e-6, "ys": 326e-6, "yw": 39e-6, "yu": 1278e-6, "yz": 553e-6, "yt": 84e-6, "ye": 3838e-6, "yr": 493e-6, "yl": 3513e-6, "yj": 0, "yb": 163e-6, "yx": 0, "yi": 587e-6, "yq": 0, "yf": 35e-6, "yg": 158e-6, "ym": 518e-6, "yn": 1584e-6, "y ": 1934e-6, "yy": 44e-6, "yo": 1954e-6, "oc": 523e-6, "op": 1011e-6, "ov": 523e-6, "od": 691e-6, "oh": 212e-6, "ok": 1105e-6, "oa": 439e-6, "os": 1396e-6, "ow": 163e-6, "ou": 982e-6, "oz": 35e-5, "ot": 76e-5, "oe": 64e-6, "or": 3375e-6, "ol": 6251e-6, "oj": 345e-6, "ob": 36e-5, "ox": 89e-6, "oi": 168e-6, "oq": 1e-5, "of": 385e-6, "og": 454e-6, "om": 1821e-6, "on": 5013e-6, "o ": 149e-5, "oy": 1337e-6, "oo": 311e-6 };
const bigram_tr = {
  total_count: total_count$1,
  probabilities: probabilities$1
};
const total_count = 204401;
const probabilities = { "cc": 49e-6, "cp": 5e-6, "cv": 5e-6, "cd": 44e-6, "ch": 1057e-6, "ck": 22e-5, "ca": 2074e-6, "cs": 15e-6, "cw": 0, "cu": 269e-6, "cz": 5e-6, "ct": 294e-6, "ce": 685e-6, "cr": 117e-6, "cl": 132e-6, "cj": 5e-6, "cb": 1e-5, "cx": 0, "ci": 851e-6, "cq": 0, "cf": 5e-6, "cg": 0, "cm": 29e-6, "cn": 24e-6, "c ": 323e-6, "cy": 24e-6, "co": 739e-6, "pc": 29e-6, "pp": 68e-6, "pv": 5e-6, "pd": 24e-6, "ph": 191e-6, "pk": 54e-6, "pa": 8821e-6, "ps": 78e-6, "pw": 5e-6, "pu": 2143e-6, "pz": 0, "pt": 357e-6, "pe": 6864e-6, "pr": 1619e-6, "pl": 225e-6, "pj": 0, "pb": 0, "px": 0, "pi": 1629e-6, "pq": 0, "pf": 1e-5, "pg": 1e-5, "pm": 1e-5, "pn": 68e-6, "p ": 93e-5, "py": 39e-6, "po": 1228e-6, "vc": 29e-6, "vp": 5e-6, "vv": 0, "vd": 5e-6, "vh": 1e-5, "vk": 1e-5, "va": 568e-6, "vs": 1e-5, "vw": 0, "vu": 2e-5, "vz": 0, "vt": 0, "ve": 67e-5, "vr": 83e-6, "vl": 1e-5, "vj": 0, "vb": 0, "vx": 0, "vi": 1076e-6, "vq": 0, "vf": 0, "vg": 0, "vm": 0, "vn": 24e-6, "v ": 122e-6, "vy": 1e-5, "vo": 196e-6, "dc": 5e-6, "dp": 83e-6, "dv": 1e-5, "dd": 117e-6, "dh": 88e-6, "dk": 34e-6, "da": 0.01819, "ds": 113e-6, "dw": 59e-6, "du": 2197e-6, "dz": 15e-6, "dt": 29e-6, "de": 3723e-6, "dr": 739e-6, "dl": 5e-6, "dj": 39e-6, "db": 15e-6, "dx": 0, "di": 0.012564, "dq": 0, "df": 0, "dg": 24e-6, "dm": 127e-6, "dn": 44e-6, "d ": 1204e-6, "dy": 98e-6, "do": 1541e-6, "hc": 24e-6, "hp": 24e-6, "hv": 0, "hd": 15e-6, "hh": 15e-6, "hk": 157e-6, "ha": 3699e-6, "hs": 73e-6, "hw": 113e-6, "hu": 183e-5, "hz": 0, "ht": 161e-6, "he": 92e-5, "hr": 201e-6, "hl": 93e-6, "hj": 2e-5, "hb": 39e-6, "hx": 0, "hi": 1835e-6, "hq": 5e-6, "hf": 0, "hg": 24e-6, "hm": 64e-6, "hn": 21e-5, "h ": 0.010597, "hy": 113e-6, "ho": 577e-6, "kc": 24e-6, "kp": 29e-6, "kv": 0, "kd": 5e-6, "kh": 504e-6, "kk": 113e-6, "ka": 0.010934, "ks": 925e-6, "kw": 5e-6, "ku": 1962e-6, "kz": 0, "kt": 861e-6, "ke": 567e-5, "kr": 328e-6, "kl": 382e-6, "kj": 5e-6, "kb": 49e-6, "kx": 0, "ki": 2329e-6, "kq": 0, "kf": 0, "kg": 1e-5, "km": 259e-6, "kn": 25e-5, "k ": 6252e-6, "ky": 201e-6, "ko": 2916e-6, "ac": 704e-6, "ap": 2427e-6, "av": 25e-5, "ad": 8591e-6, "ah": 0.010827, "ak": 638e-5, "aa": 1228e-6, "as": 7265e-6, "aw": 1208e-6, "au": 2221e-6, "az": 205e-6, "at": 9902e-6, "ae": 685e-6, "ar": 0.012701, "al": 0.012696, "aj": 519e-6, "ab": 1659e-6, "ax": 88e-6, "ai": 4658e-6, "aq": 2e-5, "af": 357e-6, "ag": 3332e-6, "am": 6742e-6, "an": 0.038048, "a ": 0.025621, "ay": 158e-5, "ao": 93e-6, "sc": 294e-6, "sp": 568e-6, "sv": 49e-6, "sd": 39e-6, "sh": 66e-5, "sk": 783e-6, "sa": 7065e-6, "ss": 416e-6, "sw": 235e-6, "su": 2431e-6, "sz": 34e-6, "st": 2886e-6, "se": 9584e-6, "sr": 166e-6, "sl": 289e-6, "sj": 2e-5, "sb": 93e-6, "sx": 0, "si": 8253e-6, "sq": 44e-6, "sf": 44e-6, "sg": 1e-5, "sm": 313e-6, "sn": 127e-6, "s ": 6365e-6, "sy": 196e-6, "so": 621e-6, "wc": 5e-6, "wp": 5e-6, "wv": 0, "wd": 1e-5, "wh": 34e-6, "wk": 1e-5, "wa": 2613e-6, "ws": 2e-5, "ww": 1e-5, "wu": 34e-6, "wz": 0, "wt": 5e-6, "we": 328e-6, "wr": 15e-6, "wl": 2e-5, "wj": 0, "wb": 1e-5, "wx": 0, "wi": 793e-6, "wq": 0, "wf": 5e-6, "wg": 5e-6, "wm": 5e-6, "wn": 98e-6, "w ": 157e-6, "wy": 2e-5, "wo": 161e-6, "uc": 181e-6, "up": 2162e-6, "uv": 39e-6, "ud": 1228e-6, "uh": 621e-6, "uk": 3312e-6, "ua": 3522e-6, "us": 3459e-6, "uw": 49e-6, "uu": 5e-6, "uz": 68e-6, "ut": 3053e-6, "ue": 181e-6, "ur": 2828e-6, "ul": 2505e-6, "uj": 318e-6, "ub": 1008e-6, "ux": 1e-5, "ui": 298e-6, "uq": 0, "uf": 108e-6, "ug": 714e-6, "um": 2118e-6, "un": 7402e-6, "u ": 4012e-6, "uy": 15e-6, "uo": 24e-6, "zc": 1e-5, "zp": 0, "zv": 0, "zd": 0, "zh": 78e-6, "zk": 5e-6, "za": 274e-6, "zs": 15e-6, "zw": 0, "zu": 54e-6, "zz": 15e-6, "zt": 0, "ze": 73e-6, "zr": 0, "zl": 15e-6, "zj": 0, "zb": 5e-6, "zx": 0, "zi": 137e-6, "zq": 0, "zf": 0, "zg": 5e-6, "zm": 5e-6, "zn": 5e-6, "z ": 147e-6, "zy": 0, "zo": 44e-6, "tc": 49e-6, "tp": 5e-6, "tv": 103e-6, "td": 5e-6, "th": 704e-6, "tk": 215e-6, "ta": 0.013953, "ts": 274e-6, "tw": 2e-5, "tu": 4066e-6, "tz": 44e-6, "tt": 264e-6, "te": 7549e-6, "tr": 1766e-6, "tl": 88e-6, "tj": 15e-6, "tb": 49e-6, "tx": 0, "ti": 4775e-6, "tq": 2e-5, "tf": 5e-6, "tg": 0, "tm": 54e-6, "tn": 23e-5, "t ": 6101e-6, "ty": 254e-6, "to": 2148e-6, "ec": 112e-5, "ep": 1977e-6, "ev": 352e-6, "ed": 1424e-6, "eh": 1463e-6, "ek": 2143e-6, "ea": 685e-6, "es": 4237e-6, "ew": 431e-6, "eu": 445e-6, "ez": 103e-6, "et": 3102e-6, "ee": 289e-6, "er": 0.017495, "el": 4814e-6, "ej": 886e-6, "eb": 4506e-6, "ex": 64e-6, "ei": 386e-6, "eq": 5e-6, "ef": 205e-6, "eg": 1194e-6, "em": 4804e-6, "en": 0.011399, "e ": 3102e-6, "ey": 152e-6, "eo": 89e-5, "rc": 264e-6, "rp": 406e-6, "rv": 73e-6, "rd": 1071e-6, "rh": 21e-5, "rk": 1321e-6, "ra": 0.011761, "rs": 1614e-6, "rw": 215e-6, "ru": 3107e-6, "rz": 24e-6, "rt": 2138e-6, "re": 3288e-6, "rr": 157e-6, "rl": 1003e-6, "rj": 45e-5, "rb": 1003e-6, "rx": 5e-6, "ri": 84e-4, "rq": 5e-6, "rf": 49e-6, "rg": 636e-6, "rm": 1067e-6, "rn": 1115e-6, "r ": 5832e-6, "ry": 235e-6, "ro": 2627e-6, "lc": 68e-6, "lp": 39e-6, "lv": 54e-6, "ld": 201e-6, "lh": 44e-6, "lk": 289e-6, "la": 0.013576, "ls": 166e-6, "lw": 68e-6, "lu": 2128e-6, "lz": 2e-5, "lt": 323e-6, "le": 4222e-6, "lr": 1e-5, "ll": 66e-5, "lj": 2e-5, "lb": 289e-6, "lx": 0, "li": 5245e-6, "lq": 0, "lf": 64e-6, "lg": 88e-6, "lm": 778e-6, "ln": 201e-6, "l ": 5303e-6, "ly": 161e-6, "lo": 1526e-6, "jc": 0, "jp": 0, "jv": 5e-6, "jd": 0, "jh": 1e-5, "jk": 34e-6, "ja": 387e-5, "js": 5e-6, "jw": 0, "ju": 1634e-6, "jz": 0, "jt": 0, "je": 983e-6, "jr": 78e-6, "jl": 1e-5, "jj": 0, "jb": 0, "jx": 0, "ji": 523e-6, "jq": 0, "jf": 5e-6, "jg": 0, "jm": 5e-6, "jn": 0, "j ": 49e-6, "jy": 0, "jo": 254e-6, "bc": 64e-6, "bp": 1e-5, "bv": 5e-6, "bd": 49e-6, "bh": 24e-6, "bk": 73e-6, "ba": 7324e-6, "bs": 59e-6, "bw": 5e-6, "bu": 4418e-6, "bz": 5e-6, "bt": 39e-6, "be": 593e-5, "br": 46e-5, "bl": 406e-6, "bj": 59e-6, "bb": 64e-6, "bx": 0, "bi": 1727e-6, "bq": 0, "bf": 5e-6, "bg": 0, "bm": 1e-5, "bn": 15e-6, "b ": 563e-6, "by": 122e-6, "bo": 817e-6, "xc": 1e-5, "xp": 5e-6, "xv": 0, "xd": 0, "xh": 1e-5, "xk": 0, "xa": 2e-5, "xs": 0, "xw": 0, "xu": 5e-6, "xz": 0, "xt": 5e-6, "xe": 15e-6, "xr": 0, "xl": 0, "xj": 0, "xb": 5e-6, "xx": 0, "xi": 54e-6, "xq": 0, "xf": 0, "xg": 0, "xm": 0, "xn": 0, "x ": 152e-6, "xy": 34e-6, "xo": 1e-5, "ic": 665e-6, "ip": 1062e-6, "iv": 411e-6, "id": 1668e-6, "ih": 978e-6, "ik": 5201e-6, "ia": 6424e-6, "is": 4907e-6, "iw": 25e-5, "iu": 793e-6, "iz": 83e-6, "it": 3249e-6, "ie": 851e-6, "ir": 2539e-6, "il": 4579e-6, "ij": 215e-6, "ib": 1076e-6, "ix": 68e-6, "ii": 352e-6, "iq": 39e-6, "if": 675e-6, "ig": 802e-6, "im": 2069e-6, "in": 0.010793, "i ": 0.021903, "iy": 113e-6, "io": 1404e-6, "qc": 0, "qp": 0, "qv": 0, "qd": 5e-6, "qh": 0, "qk": 0, "qa": 5e-6, "qs": 0, "qw": 0, "qu": 132e-6, "qz": 0, "qt": 0, "qe": 0, "qr": 5e-6, "ql": 0, "qj": 0, "qb": 5e-6, "qx": 0, "qi": 15e-6, "qq": 0, "qf": 0, "qg": 0, "qm": 0, "qn": 0, "q ": 59e-6, "qy": 0, "qo": 0, "fc": 44e-6, "fp": 0, "fv": 0, "fd": 0, "fh": 0, "fk": 15e-6, "fa": 631e-6, "fs": 5e-6, "fw": 0, "fu": 127e-6, "fz": 0, "ft": 147e-6, "fe": 558e-6, "fr": 235e-6, "fl": 113e-6, "fj": 0, "fb": 5e-6, "fx": 0, "fi": 1321e-6, "fq": 0, "ff": 68e-6, "fg": 5e-6, "fm": 1e-5, "fn": 1e-5, "f ": 563e-6, "fy": 2e-5, "fo": 338e-6, "gc": 44e-6, "gp": 39e-6, "gv": 0, "gd": 127e-6, "gh": 465e-6, "gk": 1174e-6, "ga": 8503e-6, "gs": 264e-6, "gw": 15e-6, "gu": 2138e-6, "gz": 0, "gt": 29e-6, "ge": 1502e-6, "gr": 656e-6, "gl": 166e-6, "gj": 1e-5, "gb": 68e-6, "gx": 0, "gi": 2236e-6, "gq": 0, "gf": 1e-5, "gg": 2241e-6, "gm": 39e-6, "gn": 142e-6, "g ": 8958e-6, "gy": 29e-6, "go": 1037e-6, "mc": 44e-6, "mp": 1903e-6, "mv": 1e-5, "md": 49e-6, "mh": 1e-5, "mk": 83e-6, "ma": 7402e-6, "ms": 98e-6, "mw": 5e-6, "mu": 2329e-6, "mz": 0, "mt": 39e-6, "me": 8674e-6, "mr": 29e-6, "ml": 108e-6, "mj": 5e-6, "mb": 2079e-6, "mx": 0, "mi": 2427e-6, "mq": 0, "mf": 59e-6, "mg": 2e-5, "mm": 132e-6, "mn": 225e-6, "m ": 4452e-6, "my": 113e-6, "mo": 1008e-6, "nc": 749e-6, "np": 88e-6, "nv": 68e-6, "nd": 3821e-6, "nh": 113e-6, "nk": 45e-5, "na": 6502e-6, "ns": 1458e-6, "nw": 1e-5, "nu": 136e-5, "nz": 49e-6, "nt": 4428e-6, "ne": 252e-5, "nr": 29e-6, "nl": 73e-6, "nj": 1433e-6, "nb": 147e-6, "nx": 0, "ni": 5103e-6, "nq": 0, "nf": 132e-6, "ng": 0.017837, "nm": 117e-6, "nn": 68e-5, "n ": 0.025763, "ny": 3596e-6, "no": 998e-6, " c": 228e-5, " p": 0.012529, " v": 768e-6, " d": 0.02159, " h": 2402e-6, " k": 0.010793, " a": 0.011199, " s": 0.015083, " w": 135e-5, " u": 2657e-6, " z": 171e-6, " t": 956e-5, " e": 1389e-6, " r": 2417e-6, " l": 3591e-6, " j": 3386e-6, " b": 9437e-6, " x": 39e-6, " i": 5788e-6, " q": 88e-6, " f": 2016e-6, " g": 2417e-6, " m": 0.010969, " n": 2275e-6, "  ": 5396e-6, " y": 4721e-6, " o": 2554e-6, "yc": 78e-6, "yp": 2e-5, "yv": 5e-6, "yd": 24e-6, "yh": 1e-5, "yk": 5e-6, "ya": 8933e-6, "ys": 122e-6, "yw": 24e-6, "yu": 352e-6, "yz": 15e-6, "yt": 15e-6, "ye": 396e-6, "yr": 44e-6, "yl": 54e-6, "yj": 0, "yb": 2e-5, "yx": 0, "yi": 279e-6, "yq": 0, "yf": 2e-5, "yg": 15e-6, "ym": 24e-6, "yn": 68e-6, "y ": 1076e-6, "yy": 1e-5, "yo": 455e-6, "oc": 147e-6, "op": 949e-6, "ov": 636e-6, "od": 949e-6, "oh": 279e-6, "ok": 114e-5, "oa": 23e-5, "os": 905e-6, "ow": 284e-6, "ou": 391e-6, "oz": 29e-6, "ot": 1869e-6, "oe": 122e-6, "or": 3361e-6, "ol": 3508e-6, "oj": 64e-6, "ob": 612e-6, "ox": 49e-6, "oi": 117e-6, "oq": 0, "of": 372e-6, "og": 499e-6, "om": 1551e-6, "on": 407e-5, "o ": 1864e-6, "oy": 21e-5, "oo": 264e-6 };
const bigram_id = {
  total_count,
  probabilities
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
      probabilities: {},
      languages: ["en", "es", "de", "fr", "it", "nl", "pt", "da", "sv", "no", "fi", "ro", "hu", "tr", "id"],
      bigramData: {
        da: bigram_da,
        en: bigram_en,
        fr: bigram_fr,
        de: bigram_de,
        sv: bigram_sv,
        es: bigram_es,
        it: bigram_it,
        nl: bigram_nl,
        pt: bigram_pt,
        no: bigram_no,
        fi: bigram_fi,
        ro: bigram_ro,
        hu: bigram_hu,
        tr: bigram_tr,
        id: bigram_id
      },
      languageNames: {
        en: "English 🇬🇧",
        es: "Spanish 🇪🇸",
        de: "German 🇩🇪",
        fr: "French 🇫🇷",
        it: "Italian 🇮🇹",
        nl: "Dutch 🇳🇱",
        pt: "Portuguese 🇵🇹",
        da: "Danish 🇩🇰",
        sv: "Swedish 🇸🇪",
        no: "Norwegian 🇳🇴",
        fi: "Finnish 🇫🇮",
        ro: "Romanian 🇷🇴",
        hu: "Hungarian 🇭🇺",
        tr: "Turkish 🇹🇷",
        id: "Indonesian 🇮🇩"
      }
    };
  },
  methods: {
    clear() {
      this.sentence = "";
      this.probabilities = {};
    },
    predict() {
      this.probabilities = {};
      this.languages.forEach((lang) => {
        const bigram = this.bigramData[lang].probabilities;
        const total_bigrams = this.bigramData[lang].total_count;
        this.probabilities[lang] = nlp.probability(this.sentence, total_bigrams, bigram);
      });
    },
    getLanguage() {
      const bestLang = Object.entries(this.probabilities).reduce((max, entry) => entry[1] > max[1] ? entry : max, ["", -Infinity])[0];
      return bestLang ? this.languageNames[bestLang] : "🤔";
    }
  }
};
const _hoisted_1$1 = { class: "card mb-3" };
const _hoisted_2$1 = { class: "card-body" };
const _hoisted_3 = { class: "list-group list-group-flush" };
const _hoisted_4 = { class: "card-footer text-white bg-primary" };
const _hoisted_5 = { class: "lead" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      _cache[2] || (_cache[2] = createBaseVNode("h5", { class: "card-title" }, "Detect Language", -1)),
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
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.probabilities, (prob, lang) => {
        return openBlock(), createElementBlock("li", {
          key: lang,
          class: "list-group-item"
        }, " Log Probability " + toDisplayString($data.languageNames[lang]) + ": " + toDisplayString(prob.toFixed(4)), 1);
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_4, [
      createBaseVNode("p", _hoisted_5, [
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
