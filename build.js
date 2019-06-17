/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export Store */
/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapState; });
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.1.1
 * (c) 2019 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (false) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (false) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (false) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (false) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if (false) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    false
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if (false) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return result.then(function (res) {
    try {
      this$1._actionSubscribers
        .filter(function (sub) { return sub.after; })
        .forEach(function (sub) { return sub.after(action, this$1.state); });
    } catch (e) {
      if (false) {
        console.warn("[vuex] error in after action subscribers: ");
        console.error(e);
      }
    }
    return res
  })
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (false) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure enviroment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (false) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (false) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (false) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (false) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (false) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (false) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.1.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_tone__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_tone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_tone__);





__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

let sounds = "./src/assets/sounds/";
let pictures = "./src/assets/pictures/";

const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({

  state: {
    playState: 0,
    firstPlay: false,

    sounds: [{
      type: "elephant",
      src: [sounds + "elephant1.mp3", sounds + "elephant2.mp3", sounds + "elephant3.mp3", sounds + "elephant4.mp3"],
      isPlaying: -1,
      id: "one",
      img: [`${pictures}elephant.gif`, `${pictures}elephantActive.gif`]
    }, {
      type: "chicken",
      src: [sounds + "chicken1.mp3", sounds + "chicken2.mp3", sounds + "chicken3.mp3", sounds + "chicken4.mp3"],
      isPlaying: -1,
      id: "two",
      img: [`${pictures}chicken.gif`, `${pictures}chickenActive.gif`]
    }, {
      type: "dog",
      src: [sounds + "dog1.mp3", sounds + "dog2.mp3", sounds + "dog3.mp3", sounds + "dog4.mp3"],
      isPlaying: -1,
      id: "three",
      img: [`${pictures}dog.gif`, `${pictures}dogActive.gif`]
    }, {
      type: "synth",
      src: [sounds + "synth1.mp3", sounds + "synth2.mp3", sounds + "synth3.mp3", sounds + "synth4.mp3"],
      isPlaying: -1,
      id: "four",
      img: [`${pictures}synth.gif`, `${pictures}synthActive.gif`]
    }, {
      type: "drums",
      src: [sounds + "drums1.mp3", sounds + "drums2.mp3", sounds + "drums3.mp3", sounds + "drums4.mp3"],
      isPlaying: -1,
      id: "five",
      img: [`${pictures}drums.gif`, `${pictures}drumsActive.gif`]
    }, {
      type: "whale",
      src: [sounds + "whale1.mp3", sounds + "whale2.mp3", sounds + "whale3.mp3", sounds + "whale4.mp3", sounds + "whale5.mp3", sounds + "whale6.mp3", sounds + "whale7.mp3", sounds + "whale8.mp3"],
      isPlaying: -1,
      id: "six",
      img: [`${pictures}whale.gif`, `${pictures}whaleActive.gif`]
    }]

  },

  mutations: {
    changePlayState(state, val) {

      state.playState += val;
    }
  },

  actions: {
    stop() {
      __WEBPACK_IMPORTED_MODULE_2_tone___default.a.Transport.cancel();
    },
    play() {
      this.state.firstPlay = true;
      __WEBPACK_IMPORTED_MODULE_2_tone___default.a.Transport.bpm.value = 95;
      __WEBPACK_IMPORTED_MODULE_2_tone___default.a.Transport.scheduleRepeat(repeat.bind(this), '2n');
      __WEBPACK_IMPORTED_MODULE_2_tone___default.a.Transport.start();
      let repeatIndex = 0;

      function repeat() {

        let playingSounds = this.state.sounds.filter(sound => sound.isPlaying == 1);

        playingSounds.forEach(element => {
          let soundIndex = repeatIndex;
          if (!element.src[soundIndex]) {
            soundIndex = repeatIndex - 4;
          }
          let sound = new __WEBPACK_IMPORTED_MODULE_2_tone___default.a.Sampler({
            "C3": element.src[soundIndex]
          }, () => {
            sound.triggerAttack("C3");
          }).toMaster();
        });
        repeatIndex++;
        if (repeatIndex > 7) {
          repeatIndex = 0;
        }
      }
    },

    animalClicked(context, animal, dispatch) {

      let playState = this.state.playState;
      let animalReadyToPlay = this.state.sounds.filter(item => item.type == animal);

      if (playState == 0 && animalReadyToPlay[0].isPlaying == -1) {
        context.dispatch("play");
        console.log("nu spelar vi", playState);
      };
      if (playState == 1 && animalReadyToPlay[0].isPlaying == 1) {
        context.dispatch("stop");
        console.log("nu stoppar vi");
      };

      animalReadyToPlay[0].isPlaying = -1 * animalReadyToPlay[0].isPlaying;

      context.commit("changePlayState", animalReadyToPlay[0].isPlaying);
    }
  }
});

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("my-menu", {
  template: `<div><ul>
  
    <li v-for="item in sounds" v-bind:id="item.type" :class="item.id" v-on:click="$emit(item.type)"> <a href="#">
        <span v-bind:class="{spin: sharedState.playState}" class="icon">
        <img v-if="item.isPlaying==1" :src=item.img[1]>
        <img v-else :src=item.img[0]></span>
      </a></li> 

  </ul>
  <svg height="0" width="0">
      <defs>
        <clipPath clipPathUnits="objectBoundingBox" id="sector">
          <path fill="none" stroke="#111" stroke-width="1" class="sector" d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
        </clipPath>
      </defs>
    </svg></div>`,
  data() {
    return {
      privateState: {},
      sharedState: store.state,
      sounds: store.state.sounds

    };
  }
});



new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  store,
  data: {},
  computed: Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapState */])(['playState']),

  methods: {

    animalClicked(animal) {

      this.$store.dispatch("animalClicked", animal);
    }

  }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (false) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (false) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (false
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (false
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "production" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (false) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    false
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (false) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (false) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (false) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (false) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (false) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (false) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (false) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 false
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (false) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (false) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (false) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (false) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (false) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (false) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (false) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (false) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (false) {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (false) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (false
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (false
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    false
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (false) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (false) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (false) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (false
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        false
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (false
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (false) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (false) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (false) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (false) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (false
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        if (false) {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else if (false) {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (false) {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "production" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        if (false) {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (false) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        if (false) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (false) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (false) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (false) {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (false) {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (false) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (false) {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (false) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (false) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        if (false) {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving the component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        if (false) {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else if (false) {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (false) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          false
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (false) {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (false) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      false
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (false) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "production" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (false
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (false) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (false) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (false) {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (false) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (false) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      if (false) {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "production" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (false) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (false) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (false) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "production" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (false) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(4).setImmediate))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(5);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Tone=e():t.Tone=e()}("undefined"!=typeof self?self:this,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=155)}([function(t,e,i){(function(n){var o,s;
/**
 *  Tone.js
 *  @author Yotam Mann
 *  @license http://opensource.org/licenses/MIT MIT License
 *  @copyright 2014-2019 Yotam Mann
 */o=[i(153)],void 0===(s=function(t){"use strict";var e=function(){if(!(this instanceof e))throw new Error("constructor needs to be called with the 'new' keyword")};return e.prototype.toString=function(){for(var t in e){var i=t[0].match(/^[A-Z]$/),n=e[t]===this.constructor;if(e.isFunction(e[t])&&i&&n)return t}return"Tone"},e.prototype.dispose=function(){return this},e.prototype.set=function(t,i,n){if(e.isObject(t))n=i;else if(e.isString(t)){var o={};o[t]=i,t=o}t:for(var s in t){i=t[s];var r=this;if(-1!==s.indexOf(".")){for(var a=s.split("."),l=0;l<a.length-1;l++)if((r=r[a[l]])instanceof e){a.splice(0,l+1);var h=a.join(".");r.set(h,i);continue t}s=a[a.length-1]}var u=r[s];e.isUndef(u)||(e.Signal&&u instanceof e.Signal||e.Param&&u instanceof e.Param?u.value!==i&&(e.isUndef(n)?u.value=i:u.rampTo(i,n)):u instanceof AudioParam?u.value!==i&&(u.value=i):e.TimeBase&&u instanceof e.TimeBase?r[s]=i:u instanceof e?u.set(i):u!==i&&(r[s]=i))}return this},e.prototype.get=function(t){e.isUndef(t)?t=this._collectDefaults(this.constructor):e.isString(t)&&(t=[t]);for(var i={},n=0;n<t.length;n++){var o=t[n],s=this,r=i;if(-1!==o.indexOf(".")){for(var a=o.split("."),l=0;l<a.length-1;l++){var h=a[l];r[h]=r[h]||{},r=r[h],s=s[h]}o=a[a.length-1]}var u=s[o];e.isObject(t[o])?r[o]=u.get():e.Signal&&u instanceof e.Signal?r[o]=u.value:e.Param&&u instanceof e.Param?r[o]=u.value:u instanceof AudioParam?r[o]=u.value:u instanceof e?r[o]=u.get():!e.isFunction(u)&&e.isDefined(u)&&(r[o]=u)}return i},e.prototype._collectDefaults=function(t){var i=[];if(e.isDefined(t.defaults)&&(i=Object.keys(t.defaults)),e.isDefined(t._super))for(var n=this._collectDefaults(t._super),o=0;o<n.length;o++)-1===i.indexOf(n[o])&&i.push(n[o]);return i},e.defaults=function(t,i,n){var o={};if(1===t.length&&e.isObject(t[0]))o=t[0];else for(var s=0;s<i.length;s++)o[i[s]]=t[s];return e.isDefined(n.defaults)?e.defaultArg(o,n.defaults):e.isObject(n)?e.defaultArg(o,n):o},e.defaultArg=function(t,i){if(e.isObject(t)&&e.isObject(i)){var n={};for(var o in t)n[o]=e.defaultArg(i[o],t[o]);for(var s in i)n[s]=e.defaultArg(t[s],i[s]);return n}return e.isUndef(t)?i:t},e.prototype.log=function(){if(this.debug||this.toString()===e.global.TONE_DEBUG_CLASS){var t=Array.from(arguments);t.unshift(this.toString()+":"),console.log.apply(void 0,t)}},e.prototype.assert=function(t,e){if(!t)throw new Error(e)},e.connectSeries=function(){for(var t=arguments[0],i=1;i<arguments.length;i++){var n=arguments[i];t.connect(n),t=n}return e},e.isUndef=function(t){return void 0===t},e.isDefined=function(t){return!e.isUndef(t)},e.isFunction=function(t){return"function"==typeof t},e.isNumber=function(t){return"number"==typeof t},e.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)&&t.constructor===Object},e.isBoolean=function(t){return"boolean"==typeof t},e.isArray=function(t){return Array.isArray(t)},e.isString=function(t){return"string"==typeof t},e.isNote=function(t){return e.isString(t)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(t)},e.noOp=function(){},e.prototype._readOnly=function(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)this._readOnly(t[e]);else Object.defineProperty(this,t,{writable:!1,enumerable:!0})},e.prototype._writable=function(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)this._writable(t[e]);else Object.defineProperty(this,t,{writable:!0})},e.State={Started:"started",Stopped:"stopped",Paused:"paused"},e.global=e.isUndef(n)?window:n,e.equalPowerScale=function(t){var e=.5*Math.PI;return Math.sin(t*e)},e.dbToGain=function(t){return Math.pow(10,t/20)},e.gainToDb=function(t){return Math.log(t)/Math.LN10*20},e.intervalToFrequencyRatio=function(t){return Math.pow(2,t/12)},e.prototype.now=function(){return e.context.now()},e.now=function(){return e.context.now()},e.prototype.immediate=function(){return e.context.currentTime},e.immediate=function(){return e.context.currentTime},e.extend=function(t,i){function n(){}e.isUndef(i)&&(i=e),n.prototype=i.prototype,t.prototype=new n,t.prototype.constructor=t,t._super=i},e._audioContext=null,e.start=function(){return e.context.resume()},Object.defineProperty(e,"context",{get:function(){return e._audioContext},set:function(t){t.isContext?e._audioContext=t:e._audioContext=new e.Context(t),e.Context.emit("init",e._audioContext)}}),Object.defineProperty(e.prototype,"context",{get:function(){return e.context}}),e.setContext=function(t){e.context=t},Object.defineProperty(e.prototype,"blockTime",{get:function(){return 128/this.context.sampleRate}}),Object.defineProperty(e.prototype,"sampleTime",{get:function(){return 1/this.context.sampleRate}}),Object.defineProperty(e,"supported",{get:function(){var t=e.global.hasOwnProperty("AudioContext")||e.global.hasOwnProperty("webkitAudioContext"),i=e.global.hasOwnProperty("Promise");return t&&i}}),Object.defineProperty(e,"initialized",{get:function(){return Boolean(e.context)}}),e.getContext=function(t){if(e.initialized)t(e.context);else{var i=function(){t(e.context),e.Context.off("init",i)};e.Context.on("init",i)}return e},e.version=t,e}.apply(e,o))||(t.exports=s)}).call(this,i(154))},function(t,e,i){var n,o;n=[i(0),i(7),i(4),i(14),i(97),i(3)],void 0===(o=function(t){"use strict";return t.Signal=function(){var e=t.defaults(arguments,["value","units"],t.Signal);t.Param.call(this,e),this._constantSource=this.context.createConstantSource(),this._constantSource.start(0),this._param=this._constantSource.offset,this.value=e.value,this.output=this._constantSource,this.input=this._param=this.output.offset},t.extend(t.Signal,t.Param),t.Signal.defaults={value:0,units:t.Type.Default,convert:!0},t.Signal.prototype.connect=t.SignalBase.prototype.connect,t.Signal.prototype.disconnect=t.SignalBase.prototype.disconnect,t.Signal.prototype.getValueAtTime=function(e){return this._param.getValueAtTime?this._param.getValueAtTime(e):t.Param.prototype.getValueAtTime.call(this,e)},t.Signal.prototype.dispose=function(){return t.Param.prototype.dispose.call(this),this._constantSource.disconnect(),this._constantSource=null,this},t.Signal}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(20)],void 0===(o=function(t){return t.AudioNode=function(){t.call(this);var e=t.defaults(arguments,["context"],{context:t.context});this._context=e.context},t.extend(t.AudioNode),Object.defineProperty(t.AudioNode.prototype,"context",{get:function(){return this._context}}),t.AudioNode.prototype.createInsOuts=function(t,e){1===t?this.input=this.context.createGain():t>1&&(this.input=new Array(t)),1===e?this.output=this.context.createGain():e>1&&(this.output=new Array(e))},Object.defineProperty(t.AudioNode.prototype,"channelCount",{get:function(){return this.output.channelCount},set:function(t){return this.output.channelCount=t}}),Object.defineProperty(t.AudioNode.prototype,"channelCountMode",{get:function(){return this.output.channelCountMode},set:function(t){return this.output.channelCountMode=t}}),Object.defineProperty(t.AudioNode.prototype,"channelInterpretation",{get:function(){return this.output.channelInterpretation},set:function(t){return this.output.channelInterpretation=t}}),Object.defineProperty(t.AudioNode.prototype,"numberOfInputs",{get:function(){return this.input?t.isArray(this.input)?this.input.length:1:0}}),Object.defineProperty(t.AudioNode.prototype,"numberOfOutputs",{get:function(){return this.output?t.isArray(this.output)?this.output.length:1:0}}),t.AudioNode.prototype.connect=function(e,i,n){return t.isArray(this.output)?(i=t.defaultArg(i,0),this.output[i].connect(e,0,n)):this.output.connect(e,i,n),this},t.AudioNode.prototype.disconnect=function(e,i,n){t.isArray(this.output)?t.isNumber(e)?this.output[e].disconnect():(i=t.defaultArg(i,0),this.output[i].disconnect(e,0,n)):this.output.disconnect.apply(this.output,arguments)},t.AudioNode.prototype.chain=function(){for(var t=this,e=0;e<arguments.length;e++){var i=arguments[e];t.connect(i),t=i}return this},t.AudioNode.prototype.fan=function(){for(var t=0;t<arguments.length;t++)this.connect(arguments[t]);return this},t.global.AudioNode&&(AudioNode.prototype.chain=t.AudioNode.prototype.chain,AudioNode.prototype.fan=t.AudioNode.prototype.fan),t.AudioNode.prototype.dispose=function(){return t.isDefined(this.input)&&(this.input instanceof AudioNode&&this.input.disconnect(),this.input=null),t.isDefined(this.output)&&(this.output instanceof AudioNode&&this.output.disconnect(),this.output=null),this._context=null,this},t.AudioNode}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(14),i(4),i(2)],void 0===(o=function(t){"use strict";return t.Gain=function(){var e=t.defaults(arguments,["gain","units"],t.Gain);t.AudioNode.call(this,e),this.input=this.output=this._gainNode=this.context.createGain(),this.gain=new t.Param({param:this._gainNode.gain,units:e.units,value:e.gain,convert:e.convert}),this._readOnly("gain")},t.extend(t.Gain,t.AudioNode),t.Gain.defaults={gain:1,convert:!0},t.Gain.prototype.dispose=function(){t.AudioNode.prototype.dispose.call(this),this._gainNode.disconnect(),this._gainNode=null,this._writable("gain"),this.gain.dispose(),this.gain=null},t.Gain}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(65),i(46),i(45),i(20)],void 0===(o=function(t){return t.Type={Default:"number",Time:"time",Frequency:"frequency",TransportTime:"transportTime",Ticks:"ticks",NormalRange:"normalRange",AudioRange:"audioRange",Decibels:"db",Interval:"interval",BPM:"bpm",Positive:"positive",Gain:"gain",Cents:"cents",Degrees:"degrees",MIDI:"midi",BarsBeatsSixteenths:"barsBeatsSixteenths",Samples:"samples",Hertz:"hertz",Note:"note",Milliseconds:"milliseconds",Seconds:"seconds",Notation:"notation"},t.prototype.toSeconds=function(e){return t.isNumber(e)?e:t.isUndef(e)?this.now():t.isString(e)||t.isObject(e)?new t.Time(e).toSeconds():e instanceof t.TimeBase?e.toSeconds():void 0},t.prototype.toFrequency=function(e){return t.isNumber(e)?e:t.isString(e)||t.isUndef(e)||t.isObject(e)?new t.Frequency(e).valueOf():e instanceof t.TimeBase?e.toFrequency():void 0},t.prototype.toTicks=function(e){return t.isNumber(e)||t.isString(e)||t.isObject(e)?new t.TransportTime(e).toTicks():t.isUndef(e)?t.Transport.ticks:e instanceof t.TimeBase?e.toTicks():void 0},t}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(14),i(3),i(36)],void 0===(o=function(t){"use strict";return t.Multiply=function(e){t.Signal.call(this),this.createInsOuts(2,0),this._mult=this.input[0]=this.output=new t.Gain,this._param=this.input[1]=this.output.gain,this.value=t.defaultArg(e,0),this.proxy=!1},t.extend(t.Multiply,t.Signal),t.Multiply.prototype.dispose=function(){return t.Signal.prototype.dispose.call(this),this._mult.dispose(),this._mult=null,this._param=null,this},t.Multiply}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(16),i(27),i(40),i(4),i(33),i(1),i(2)],void 0===(o=function(t){"use strict";return t.Source=function(e){e=t.defaultArg(e,t.Source.defaults),t.AudioNode.call(this),this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._readOnly("volume"),this._state=new t.TimelineState(t.State.Stopped),this._state.memory=100,this._synced=!1,this._scheduled=[],this._volume.output.output.channelCount=2,this._volume.output.output.channelCountMode="explicit",this.mute=e.mute},t.extend(t.Source,t.AudioNode),t.Source.defaults={volume:0,mute:!1},Object.defineProperty(t.Source.prototype,"state",{get:function(){return this._synced?t.Transport.state===t.State.Started?this._state.getValueAtTime(t.Transport.seconds):t.State.Stopped:this._state.getValueAtTime(this.now())}}),Object.defineProperty(t.Source.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),t.Source.prototype._start=t.noOp,t.Source.prototype.restart=t.noOp,t.Source.prototype._stop=t.noOp,t.Source.prototype.start=function(e,i,n){if(e=t.isUndef(e)&&this._synced?t.Transport.seconds:this.toSeconds(e),this._state.getValueAtTime(e)===t.State.Started)this._state.cancel(e),this._state.setStateAtTime(t.State.Started,e),this.restart(e,i,n);else if(this._state.setStateAtTime(t.State.Started,e),this._synced){var o=this._state.get(e);o.offset=t.defaultArg(i,0),o.duration=n;var s=t.Transport.schedule(function(t){this._start(t,i,n)}.bind(this),e);this._scheduled.push(s),t.Transport.state===t.State.Started&&this._syncedStart(this.now(),t.Transport.seconds)}else this._start.apply(this,arguments);return this},t.Source.prototype.stop=function(e){if(e=t.isUndef(e)&&this._synced?t.Transport.seconds:this.toSeconds(e),this._synced){var i=t.Transport.schedule(this._stop.bind(this),e);this._scheduled.push(i)}else this._stop.apply(this,arguments);return this._state.cancel(e),this._state.setStateAtTime(t.State.Stopped,e),this},t.Source.prototype.sync=function(){return this._synced=!0,this._syncedStart=function(e,i){if(i>0){var n=this._state.get(i);if(n&&n.state===t.State.Started&&n.time!==i){var o,s=i-this.toSeconds(n.time);n.duration&&(o=this.toSeconds(n.duration)-s),this._start(e,this.toSeconds(n.offset)+s,o)}}}.bind(this),this._syncedStop=function(e){var i=t.Transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(i)===t.State.Started&&this._stop(e)}.bind(this),t.Transport.on("start loopStart",this._syncedStart),t.Transport.on("stop pause loopEnd",this._syncedStop),this},t.Source.prototype.unsync=function(){this._synced&&(t.Transport.off("stop pause loopEnd",this._syncedStop),t.Transport.off("start loopStart",this._syncedStart)),this._synced=!1;for(var e=0;e<this._scheduled.length;e++){var i=this._scheduled[e];t.Transport.clear(i)}return this._scheduled=[],this._state.cancel(0),this},t.Source.prototype.dispose=function(){t.AudioNode.prototype.dispose.call(this),this.unsync(),this._scheduled=null,this._writable("volume"),this._volume.dispose(),this._volume=null,this.volume=null,this._state.dispose(),this._state=null},t.Source}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(36),i(98)],void 0===(o=function(t){"use strict";return t.WaveShaper=function(e,i){t.SignalBase.call(this),this._shaper=this.input=this.output=this.context.createWaveShaper(),this._curve=null,Array.isArray(e)?this.curve=e:isFinite(e)||t.isUndef(e)?this._curve=new Float32Array(t.defaultArg(e,1024)):t.isFunction(e)&&(this._curve=new Float32Array(t.defaultArg(i,1024)),this.setMap(e))},t.extend(t.WaveShaper,t.SignalBase),t.WaveShaper.prototype.setMap=function(t){for(var e=new Array(this._curve.length),i=0,n=this._curve.length;i<n;i++){var o=i/(n-1)*2-1;e[i]=t(o,i)}return this.curve=e,this},Object.defineProperty(t.WaveShaper.prototype,"curve",{get:function(){return this._shaper.curve},set:function(t){this._curve=new Float32Array(t),this._shaper.curve=this._curve}}),Object.defineProperty(t.WaveShaper.prototype,"oversample",{get:function(){return this._shaper.oversample},set:function(t){if(!["none","2x","4x"].includes(t))throw new RangeError("Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'");this._shaper.oversample=t}}),t.WaveShaper.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._shaper.disconnect(),this._shaper=null,this._curve=null,this},t.WaveShaper}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(23),i(2)],void 0===(o=function(t){"use strict";return t.Effect=function(){var e=t.defaults(arguments,["wet"],t.Effect);t.AudioNode.call(this),this.createInsOuts(1,1),this._dryWet=new t.CrossFade(e.wet),this.wet=this._dryWet.fade,this.effectSend=new t.Gain,this.effectReturn=new t.Gain,this.input.connect(this._dryWet.a),this.input.connect(this.effectSend),this.effectReturn.connect(this._dryWet.b),this._dryWet.connect(this.output),this._readOnly(["wet"])},t.extend(t.Effect,t.AudioNode),t.Effect.defaults={wet:1},t.Effect.prototype.connectEffect=function(t){return this.effectSend.chain(t,this.effectReturn),this},t.Effect.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._dryWet.dispose(),this._dryWet=null,this.effectSend.dispose(),this.effectSend=null,this.effectReturn.dispose(),this.effectReturn=null,this._writable(["wet"]),this.wet=null,this},t.Effect}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(2)],void 0===(o=function(t){"use strict";return t.Filter=function(){var e=t.defaults(arguments,["frequency","type","rolloff"],t.Filter);t.AudioNode.call(this),this.createInsOuts(1,1),this._filters=[],this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=new t.Signal(0,t.Type.Cents),this.gain=new t.Signal({value:e.gain,convert:!0,type:t.Type.Decibels}),this.Q=new t.Signal(e.Q),this._type=e.type,this._rolloff=e.rolloff,this.rolloff=e.rolloff,this._readOnly(["detune","frequency","gain","Q"])},t.extend(t.Filter,t.AudioNode),t.Filter.defaults={type:"lowpass",frequency:350,rolloff:-12,Q:1,gain:0},Object.defineProperty(t.Filter.prototype,"type",{get:function(){return this._type},set:function(t){if(-1===["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(t))throw new TypeError("Tone.Filter: invalid type "+t);this._type=t;for(var e=0;e<this._filters.length;e++)this._filters[e].type=t}}),Object.defineProperty(t.Filter.prototype,"rolloff",{get:function(){return this._rolloff},set:function(e){e=parseInt(e,10);var i=[-12,-24,-48,-96].indexOf(e);if(-1===i)throw new RangeError("Tone.Filter: rolloff can only be -12, -24, -48 or -96");i+=1,this._rolloff=e,this.input.disconnect();for(var n=0;n<this._filters.length;n++)this._filters[n].disconnect(),this._filters[n]=null;this._filters=new Array(i);for(var o=0;o<i;o++){var s=this.context.createBiquadFilter();s.type=this._type,this.frequency.connect(s.frequency),this.detune.connect(s.detune),this.Q.connect(s.Q),this.gain.connect(s.gain),this._filters[o]=s}var r=[this.input].concat(this._filters).concat([this.output]);t.connectSeries.apply(t,r)}}),t.Filter.prototype.getFrequencyResponse=function(e){e=t.defaultArg(e,128);for(var i=new Float32Array(e).map(function(){return 1}),n=new Float32Array(e),o=0;o<e;o++){var s=19980*Math.pow(o/e,2)+20;n[o]=s}var r=new Float32Array(e),a=new Float32Array(e);return this._filters.forEach(function(){var t=this.context.createBiquadFilter();t.type=this._type,t.Q.value=this.Q.value,t.frequency.value=this.frequency.value,t.gain.value=this.gain.value,t.getFrequencyResponse(n,r,a),r.forEach(function(t,e){i[e]*=t})}.bind(this)),i},t.Filter.prototype.dispose=function(){t.AudioNode.prototype.dispose.call(this);for(var e=0;e<this._filters.length;e++)this._filters[e].disconnect(),this._filters[e]=null;return this._filters=null,this._writable(["detune","frequency","gain","Q"]),this.frequency.dispose(),this.Q.dispose(),this.frequency=null,this.Q=null,this.detune.dispose(),this.detune=null,this.gain.dispose(),this.gain=null,this},t.Filter}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(2)],void 0===(o=function(t){"use strict";return t.Merge=function(){t.AudioNode.call(this),this.createInsOuts(2,0),this.left=this.input[0]=new t.Gain,this.right=this.input[1]=new t.Gain,this._merger=this.output=this.context.createChannelMerger(2),this.left.connect(this._merger,0,0),this.right.connect(this._merger,0,1),this.left.channelCount=1,this.right.channelCount=1,this.left.channelCountMode="explicit",this.right.channelCountMode="explicit"},t.extend(t.Merge,t.AudioNode),t.Merge.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this.left.dispose(),this.left=null,this.right.dispose(),this.right=null,this._merger.disconnect(),this._merger=null,this},t.Merge}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(35),i(4),i(81)],void 0===(o=function(t){"use strict";return t.Buffer=function(){var e=t.defaults(arguments,["url","onload","onerror"],t.Buffer);t.call(this),this._buffer=null,this._reversed=e.reverse,this._xhr=null,this.onload=t.noOp,e.url instanceof AudioBuffer||e.url instanceof t.Buffer?(this.set(e.url),this.loaded||(this.onload=e.onload)):t.isString(e.url)&&this.load(e.url).then(e.onload).catch(e.onerror)},t.extend(t.Buffer),t.Buffer.defaults={url:void 0,reverse:!1,onload:t.noOp,onerror:t.noOp},t.Buffer.prototype.set=function(e){return e instanceof t.Buffer?e.loaded?this._buffer=e.get():e.onload=function(){this.set(e),this.onload(this)}.bind(this):this._buffer=e,this},t.Buffer.prototype.get=function(){return this._buffer},t.Buffer.prototype.load=function(e,i,n){return new Promise(function(o,s){this._xhr=t.Buffer.load(e,function(t){this._xhr=null,this.set(t),o(this),this.onload(this),i&&i(this)}.bind(this),function(t){this._xhr=null,s(t),n&&n(t)}.bind(this))}.bind(this))},t.Buffer.prototype.dispose=function(){return t.prototype.dispose.call(this),this._buffer=null,this._xhr&&(t.Buffer._removeFromDownloadQueue(this._xhr),this._xhr.abort(),this._xhr=null),this},Object.defineProperty(t.Buffer.prototype,"loaded",{get:function(){return this.length>0}}),Object.defineProperty(t.Buffer.prototype,"duration",{get:function(){return this._buffer?this._buffer.duration:0}}),Object.defineProperty(t.Buffer.prototype,"length",{get:function(){return this._buffer?this._buffer.length:0}}),Object.defineProperty(t.Buffer.prototype,"numberOfChannels",{get:function(){return this._buffer?this._buffer.numberOfChannels:0}}),t.Buffer.prototype.fromArray=function(t){var e=t[0].length>0,i=e?t.length:1,n=e?t[0].length:t.length,o=this.context.createBuffer(i,n,this.context.sampleRate);e||1!==i||(t=[t]);for(var s=0;s<i;s++)o.copyToChannel(t[s],s);return this._buffer=o,this},t.Buffer.prototype.toMono=function(e){if(t.isNumber(e))this.fromArray(this.toArray(e));else{for(var i=new Float32Array(this.length),n=this.numberOfChannels,o=0;o<n;o++)for(var s=this.toArray(o),r=0;r<s.length;r++)i[r]+=s[r];i=i.map(function(t){return t/n}),this.fromArray(i)}return this},t.Buffer.prototype.toArray=function(e){if(t.isNumber(e))return this.getChannelData(e);if(1===this.numberOfChannels)return this.toArray(0);for(var i=[],n=0;n<this.numberOfChannels;n++)i[n]=this.getChannelData(n);return i},t.Buffer.prototype.getChannelData=function(t){return this._buffer.getChannelData(t)},t.Buffer.prototype.slice=function(e,i){i=t.defaultArg(i,this.duration);for(var n=Math.floor(this.context.sampleRate*this.toSeconds(e)),o=Math.floor(this.context.sampleRate*this.toSeconds(i)),s=[],r=0;r<this.numberOfChannels;r++)s[r]=this.toArray(r).slice(n,o);return(new t.Buffer).fromArray(s)},t.Buffer.prototype._reverse=function(){if(this.loaded)for(var t=0;t<this.numberOfChannels;t++)Array.prototype.reverse.call(this.getChannelData(t));return this},Object.defineProperty(t.Buffer.prototype,"reverse",{get:function(){return this._reversed},set:function(t){this._reversed!==t&&(this._reversed=t,this._reverse())}}),t.Emitter.mixin(t.Buffer),t.Buffer._downloadQueue=[],t.Buffer.baseUrl="",t.Buffer.fromArray=function(e){return(new t.Buffer).fromArray(e)},t.Buffer.fromUrl=function(e){var i=new t.Buffer;return i.load(e).then(function(){return i})},t.Buffer._removeFromDownloadQueue=function(e){var i=t.Buffer._downloadQueue.indexOf(e);-1!==i&&t.Buffer._downloadQueue.splice(i,1)},t.Buffer.load=function(e,i,n){i=t.defaultArg(i,t.noOp);var o=e.match(/\[(.+\|?)+\]$/);if(o){for(var s=o[1].split("|"),r=s[0],a=0;a<s.length;a++)if(t.Buffer.supportsType(s[a])){r=s[a];break}e=e.replace(o[0],r)}function l(e){if(t.Buffer._removeFromDownloadQueue(u),t.Buffer.emit("error",e),!n)throw e;n(e)}function h(){for(var e=0,i=0;i<t.Buffer._downloadQueue.length;i++)e+=t.Buffer._downloadQueue[i].progress;t.Buffer.emit("progress",e/t.Buffer._downloadQueue.length)}var u=new XMLHttpRequest;return u.open("GET",t.Buffer.baseUrl+e,!0),u.responseType="arraybuffer",u.progress=0,t.Buffer._downloadQueue.push(u),u.addEventListener("load",function(){200===u.status?t.context.decodeAudioData(u.response).then(function(e){u.progress=1,h(),i(e),t.Buffer._removeFromDownloadQueue(u),0===t.Buffer._downloadQueue.length&&t.Buffer.emit("load")}).catch(function(){t.Buffer._removeFromDownloadQueue(u),l("Tone.Buffer: could not decode audio data: "+e)}):l("Tone.Buffer: could not locate file: "+e)}),u.addEventListener("error",l),u.addEventListener("progress",function(t){t.lengthComputable&&(u.progress=t.loaded/t.total*.95,h())}),u.send(),u},t.Buffer.cancelDownloads=function(){return t.Buffer._downloadQueue.slice().forEach(function(e){t.Buffer._removeFromDownloadQueue(e),e.abort()}),t.Buffer},t.Buffer.supportsType=function(t){var e=t.split(".");return e=e[e.length-1],""!==document.createElement("audio").canPlayType("audio/"+e)},t.loaded=function(){var e,i;function n(){t.Buffer.off("load",e),t.Buffer.off("error",i)}return new Promise(function(n,o){e=function(){n()},i=function(){o()},t.Buffer.on("load",e),t.Buffer.on("error",i)}).then(n).catch(function(t){throw n(),new Error(t)})},t.Buffer}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(17),i(26),i(2),i(1),i(22),i(4),i(28)],void 0===(o=function(t){"use strict";return t.LFO=function(){var e=t.defaults(arguments,["frequency","min","max"],t.LFO);t.AudioNode.call(this),this._oscillator=new t.Oscillator({frequency:e.frequency,type:e.type}),this.frequency=this._oscillator.frequency,this.amplitude=this._oscillator.volume,this.amplitude.units=t.Type.NormalRange,this.amplitude.value=e.amplitude,this._stoppedSignal=new t.Signal(0,t.Type.AudioRange),this._zeros=new t.Zero,this._stoppedValue=0,this._a2g=new t.AudioToGain,this._scaler=this.output=new t.Scale(e.min,e.max),this._units=t.Type.Default,this.units=e.units,this._oscillator.chain(this._a2g,this._scaler),this._zeros.connect(this._a2g),this._stoppedSignal.connect(this._a2g),this._readOnly(["amplitude","frequency"]),this.phase=e.phase},t.extend(t.LFO,t.AudioNode),t.LFO.defaults={type:"sine",min:0,max:1,phase:0,frequency:"4n",amplitude:1,units:t.Type.Default},t.LFO.prototype.start=function(t){return t=this.toSeconds(t),this._stoppedSignal.setValueAtTime(0,t),this._oscillator.start(t),this},t.LFO.prototype.stop=function(t){return t=this.toSeconds(t),this._stoppedSignal.setValueAtTime(this._stoppedValue,t),this._oscillator.stop(t),this},t.LFO.prototype.sync=function(){return this._oscillator.sync(),this._oscillator.syncFrequency(),this},t.LFO.prototype.unsync=function(){return this._oscillator.unsync(),this._oscillator.unsyncFrequency(),this},Object.defineProperty(t.LFO.prototype,"min",{get:function(){return this._toUnits(this._scaler.min)},set:function(t){t=this._fromUnits(t),this._scaler.min=t}}),Object.defineProperty(t.LFO.prototype,"max",{get:function(){return this._toUnits(this._scaler.max)},set:function(t){t=this._fromUnits(t),this._scaler.max=t}}),Object.defineProperty(t.LFO.prototype,"type",{get:function(){return this._oscillator.type},set:function(t){this._oscillator.type=t,this._stoppedValue=this._oscillator._getInitialValue(),this._stoppedSignal.value=this._stoppedValue}}),Object.defineProperty(t.LFO.prototype,"phase",{get:function(){return this._oscillator.phase},set:function(t){this._oscillator.phase=t,this._stoppedValue=this._oscillator._getInitialValue(),this._stoppedSignal.value=this._stoppedValue}}),Object.defineProperty(t.LFO.prototype,"units",{get:function(){return this._units},set:function(t){var e=this.min,i=this.max;this._units=t,this.min=e,this.max=i}}),Object.defineProperty(t.LFO.prototype,"mute",{get:function(){return this._oscillator.mute},set:function(t){this._oscillator.mute=t}}),Object.defineProperty(t.LFO.prototype,"state",{get:function(){return this._oscillator.state}}),t.LFO.prototype.connect=function(e){return e.constructor!==t.Signal&&e.constructor!==t.Param||(this.convert=e.convert,this.units=e.units),t.SignalBase.prototype.connect.apply(this,arguments),this},t.LFO.prototype._fromUnits=t.Param.prototype._fromUnits,t.LFO.prototype._toUnits=t.Param.prototype._toUnits,t.LFO.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["amplitude","frequency"]),this._oscillator.dispose(),this._oscillator=null,this._stoppedSignal.dispose(),this._stoppedSignal=null,this._zeros.dispose(),this._zeros=null,this._scaler.dispose(),this._scaler=null,this._a2g.dispose(),this._a2g=null,this.frequency=null,this.amplitude=null,this},t.LFO}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(29),i(94),i(1),i(3)],void 0===(o=function(t){"use strict";return t.Subtract=function(e){t.Signal.call(this),this.createInsOuts(2,0),this._sum=this.input[0]=this.output=new t.Gain,this._neg=new t.Negate,this._param=this.input[1]=new t.Signal(e),this._param.chain(this._neg,this._sum),this.proxy=!1},t.extend(t.Subtract,t.Signal),t.Subtract.prototype.dispose=function(){return t.Signal.prototype.dispose.call(this),this._neg.dispose(),this._neg=null,this._sum.disconnect(),this._sum=null,this},t.Subtract}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(4),i(2),i(24)],void 0===(o=function(t){"use strict";return t.Param=function(){var e=t.defaults(arguments,["param","units","convert"],t.Param);t.AudioNode.call(this,e),this._param=this.input=e.param,this.units=e.units,this.convert=e.convert,this.overridden=!1,this._events=new t.Timeline(1e3),t.isDefined(e.value)&&this._param&&this.setValueAtTime(e.value,0)},t.extend(t.Param,t.AudioNode),t.Param.defaults={units:t.Type.Default,convert:!0,param:void 0},Object.defineProperty(t.Param.prototype,"value",{get:function(){var t=this.now();return this._toUnits(this.getValueAtTime(t))},set:function(t){this._initialValue=this._fromUnits(t),this.cancelScheduledValues(this.now()),this.setValueAtTime(t,this.now())}}),Object.defineProperty(t.Param.prototype,"minValue",{get:function(){return this.units===t.Type.Time||this.units===t.Type.Frequency||this.units===t.Type.NormalRange||this.units===t.Type.Positive||this.units===t.Type.BPM?0:this.units===t.Type.AudioRange?-1:this.units===t.Type.Decibels?-1/0:this._param.minValue}}),Object.defineProperty(t.Param.prototype,"maxValue",{get:function(){return this.units===t.Type.NormalRange||this.units===t.Type.AudioRange?1:this._param.maxValue}}),t.Param.prototype._fromUnits=function(e){if(!this.convert&&!t.isUndef(this.convert)||this.overridden)return e;switch(this.units){case t.Type.Time:return this.toSeconds(e);case t.Type.Frequency:return this.toFrequency(e);case t.Type.Decibels:return t.dbToGain(e);case t.Type.NormalRange:return Math.min(Math.max(e,0),1);case t.Type.AudioRange:return Math.min(Math.max(e,-1),1);case t.Type.Positive:return Math.max(e,0);default:return e}},t.Param.prototype._toUnits=function(e){if(!this.convert&&!t.isUndef(this.convert))return e;switch(this.units){case t.Type.Decibels:return t.gainToDb(e);default:return e}},t.Param.prototype._minOutput=1e-5,t.Param.AutomationType={Linear:"linearRampToValueAtTime",Exponential:"exponentialRampToValueAtTime",Target:"setTargetAtTime",SetValue:"setValueAtTime",Cancel:"cancelScheduledValues"},t.Param.prototype.setValueAtTime=function(e,i){return i=this.toSeconds(i),e=this._fromUnits(e),this._events.add({type:t.Param.AutomationType.SetValue,value:e,time:i}),this.log(t.Param.AutomationType.SetValue,e,i),this._param.setValueAtTime(e,i),this},t.Param.prototype.getValueAtTime=function(e){e=this.toSeconds(e);var i=this._events.getAfter(e),n=this._events.get(e),o=t.defaultArg(this._initialValue,this._param.defaultValue),s=o;if(null===n)s=o;else if(n.type===t.Param.AutomationType.Target){var r,a=this._events.getBefore(n.time);r=null===a?o:a.value,s=this._exponentialApproach(n.time,r,n.value,n.constant,e)}else s=null===i?n.value:i.type===t.Param.AutomationType.Linear?this._linearInterpolate(n.time,n.value,i.time,i.value,e):i.type===t.Param.AutomationType.Exponential?this._exponentialInterpolate(n.time,n.value,i.time,i.value,e):n.value;return s},t.Param.prototype.setRampPoint=function(t){t=this.toSeconds(t);var e=this.getValueAtTime(t);return this.cancelAndHoldAtTime(t),0===e&&(e=this._minOutput),this.setValueAtTime(this._toUnits(e),t),this},t.Param.prototype.linearRampToValueAtTime=function(e,i){return e=this._fromUnits(e),i=this.toSeconds(i),this._events.add({type:t.Param.AutomationType.Linear,value:e,time:i}),this.log(t.Param.AutomationType.Linear,e,i),this._param.linearRampToValueAtTime(e,i),this},t.Param.prototype.exponentialRampToValueAtTime=function(e,i){return e=this._fromUnits(e),e=Math.max(this._minOutput,e),i=this.toSeconds(i),this._events.add({type:t.Param.AutomationType.Exponential,time:i,value:e}),this.log(t.Param.AutomationType.Exponential,e,i),this._param.exponentialRampToValueAtTime(e,i),this},t.Param.prototype.exponentialRampTo=function(t,e,i){return i=this.toSeconds(i),this.setRampPoint(i),this.exponentialRampToValueAtTime(t,i+this.toSeconds(e)),this},t.Param.prototype.linearRampTo=function(t,e,i){return i=this.toSeconds(i),this.setRampPoint(i),this.linearRampToValueAtTime(t,i+this.toSeconds(e)),this},t.Param.prototype.targetRampTo=function(t,e,i){return i=this.toSeconds(i),this.setRampPoint(i),this.exponentialApproachValueAtTime(t,i,e),this},t.Param.prototype.exponentialApproachValueAtTime=function(t,e,i){var n=Math.log(this.toSeconds(i)+1)/Math.log(200);return e=this.toSeconds(e),this.setTargetAtTime(t,e,n)},t.Param.prototype.setTargetAtTime=function(e,i,n){if(e=this._fromUnits(e),n<=0)throw new Error("timeConstant must be greater than 0");return i=this.toSeconds(i),this._events.add({type:t.Param.AutomationType.Target,value:e,time:i,constant:n}),this.log(t.Param.AutomationType.Target,e,i,n),this._param.setTargetAtTime(e,i,n),this},t.Param.prototype.setValueCurveAtTime=function(e,i,n,o){o=t.defaultArg(o,1),n=this.toSeconds(n),i=this.toSeconds(i),this.setValueAtTime(e[0]*o,i);for(var s=n/(e.length-1),r=1;r<e.length;r++)this.linearRampToValueAtTime(e[r]*o,i+r*s);return this},t.Param.prototype.cancelScheduledValues=function(e){return e=this.toSeconds(e),this._events.cancel(e),this._param.cancelScheduledValues(e),this.log(t.Param.AutomationType.Cancel,e),this},t.Param.prototype.cancelAndHoldAtTime=function(e){var i=this.getValueAtTime(e);this.log("cancelAndHoldAtTime",e,"value="+i),this._param.cancelScheduledValues(e);var n=this._events.get(e),o=this._events.getAfter(e);return n&&n.time===e?o?this._events.cancel(o.time):this._events.cancel(e+this.sampleTime):o&&(this._events.cancel(o.time),o.type===t.Param.AutomationType.Linear?this.linearRampToValueAtTime(i,e):o.type===t.Param.AutomationType.Exponential&&this.exponentialRampToValueAtTime(i,e)),this._events.add({type:t.Param.AutomationType.SetValue,value:i,time:e}),this._param.setValueAtTime(i,e),this},t.Param.prototype.rampTo=function(e,i,n){return i=t.defaultArg(i,.1),this.units===t.Type.Frequency||this.units===t.Type.BPM||this.units===t.Type.Decibels?this.exponentialRampTo(e,i,n):this.linearRampTo(e,i,n),this},t.Param.prototype._exponentialApproach=function(t,e,i,n,o){return i+(e-i)*Math.exp(-(o-t)/n)},t.Param.prototype._linearInterpolate=function(t,e,i,n,o){return e+(o-t)/(i-t)*(n-e)},t.Param.prototype._exponentialInterpolate=function(t,e,i,n,o){return e*Math.pow(n/e,(o-t)/(i-t))},t.Param.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._param=null,this._events=null,this},t.Param}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(19),i(10),i(23)],void 0===(o=function(t){"use strict";return t.StereoEffect=function(){t.AudioNode.call(this);var e=t.defaults(arguments,["wet"],t.Effect);this.createInsOuts(1,1),this._dryWet=new t.CrossFade(e.wet),this.wet=this._dryWet.fade,this._split=new t.Split,this.effectSendL=this._split.left,this.effectSendR=this._split.right,this._merge=new t.Merge,this.effectReturnL=this._merge.left,this.effectReturnR=this._merge.right,this.input.connect(this._split),this.input.connect(this._dryWet,0,0),this._merge.connect(this._dryWet,0,1),this._dryWet.connect(this.output),this._readOnly(["wet"])},t.extend(t.StereoEffect,t.Effect),t.StereoEffect.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._dryWet.dispose(),this._dryWet=null,this._split.dispose(),this._split=null,this._merge.dispose(),this._merge=null,this.effectSendL=null,this.effectSendR=null,this.effectReturnL=null,this.effectReturnR=null,this._writable(["wet"]),this.wet=null,this},t.StereoEffect}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(86),i(4),i(24),i(35),i(3),i(84),i(83),i(55)],void 0===(o=function(t){"use strict";t.Transport=function(){t.Emitter.call(this),t.getContext(function(){this.loop=!1,this._loopStart=0,this._loopEnd=0,this._ppq=e.defaults.PPQ,this._clock=new t.Clock({callback:this._processTick.bind(this),frequency:0}),this._bindClockEvents(),this.bpm=this._clock.frequency,this.bpm._toUnits=this._toUnits.bind(this),this.bpm._fromUnits=this._fromUnits.bind(this),this.bpm.units=t.Type.BPM,this.bpm.value=e.defaults.bpm,this._readOnly("bpm"),this._timeSignature=e.defaults.timeSignature,this._scheduledEvents={},this._timeline=new t.Timeline,this._repeatedEvents=new t.IntervalTimeline,this._syncedSignals=[],this._swingTicks=e.defaults.PPQ/2,this._swingAmount=0,this.context.transport=this}.bind(this))},t.extend(t.Transport,t.Emitter),t.Transport.defaults={bpm:120,swing:0,swingSubdivision:"8n",timeSignature:4,loopStart:0,loopEnd:"4m",PPQ:192},t.Transport.prototype.isTransport=!0,t.Transport.prototype._processTick=function(e,i){if(this._swingAmount>0&&i%this._ppq!=0&&i%(2*this._swingTicks)!=0){var n=i%(2*this._swingTicks)/(2*this._swingTicks),o=Math.sin(n*Math.PI)*this._swingAmount;e+=t.Ticks(2*this._swingTicks/3).toSeconds()*o}this.loop&&i>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),i=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._timeline.forEachAtTime(i,function(t){t.invoke(e)})},t.Transport.prototype.schedule=function(e,i){var n=new t.TransportEvent(this,{time:t.TransportTime(i),callback:e});return this._addEvent(n,this._timeline)},t.Transport.prototype.scheduleRepeat=function(e,i,n,o){var s=new t.TransportRepeatEvent(this,{callback:e,interval:t.Time(i),time:t.TransportTime(n),duration:t.Time(t.defaultArg(o,1/0))});return this._addEvent(s,this._repeatedEvents)},t.Transport.prototype.scheduleOnce=function(e,i){var n=new t.TransportEvent(this,{time:t.TransportTime(i),callback:e,once:!0});return this._addEvent(n,this._timeline)},t.Transport.prototype.clear=function(t){if(this._scheduledEvents.hasOwnProperty(t)){var e=this._scheduledEvents[t.toString()];e.timeline.remove(e.event),e.event.dispose(),delete this._scheduledEvents[t.toString()]}return this},t.Transport.prototype._addEvent=function(t,e){return this._scheduledEvents[t.id.toString()]={event:t,timeline:e},e.add(t),t.id},t.Transport.prototype.cancel=function(e){return e=t.defaultArg(e,0),e=this.toTicks(e),this._timeline.forEachFrom(e,function(t){this.clear(t.id)}.bind(this)),this._repeatedEvents.forEachFrom(e,function(t){this.clear(t.id)}.bind(this)),this},t.Transport.prototype._bindClockEvents=function(){this._clock.on("start",function(e,i){i=t.Ticks(i).toSeconds(),this.emit("start",e,i)}.bind(this)),this._clock.on("stop",function(t){this.emit("stop",t)}.bind(this)),this._clock.on("pause",function(t){this.emit("pause",t)}.bind(this))},Object.defineProperty(t.Transport.prototype,"state",{get:function(){return this._clock.getStateAtTime(this.now())}}),t.Transport.prototype.start=function(e,i){return t.isDefined(i)&&(i=this.toTicks(i)),this._clock.start(e,i),this},t.Transport.prototype.stop=function(t){return this._clock.stop(t),this},t.Transport.prototype.pause=function(t){return this._clock.pause(t),this},t.Transport.prototype.toggle=function(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!==t.State.Started?this.start(e):this.stop(e),this},Object.defineProperty(t.Transport.prototype,"timeSignature",{get:function(){return this._timeSignature},set:function(e){t.isArray(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}}),Object.defineProperty(t.Transport.prototype,"loopStart",{get:function(){return t.Ticks(this._loopStart).toSeconds()},set:function(t){this._loopStart=this.toTicks(t)}}),Object.defineProperty(t.Transport.prototype,"loopEnd",{get:function(){return t.Ticks(this._loopEnd).toSeconds()},set:function(t){this._loopEnd=this.toTicks(t)}}),t.Transport.prototype.setLoopPoints=function(t,e){return this.loopStart=t,this.loopEnd=e,this},Object.defineProperty(t.Transport.prototype,"swing",{get:function(){return this._swingAmount},set:function(t){this._swingAmount=t}}),Object.defineProperty(t.Transport.prototype,"swingSubdivision",{get:function(){return t.Ticks(this._swingTicks).toNotation()},set:function(t){this._swingTicks=this.toTicks(t)}}),Object.defineProperty(t.Transport.prototype,"position",{get:function(){var e=this.now(),i=this._clock.getTicksAtTime(e);return t.Ticks(i).toBarsBeatsSixteenths()},set:function(t){var e=this.toTicks(t);this.ticks=e}}),Object.defineProperty(t.Transport.prototype,"seconds",{get:function(){return this._clock.seconds},set:function(t){var e=this.now(),i=this.bpm.timeToTicks(t,e);this.ticks=i}}),Object.defineProperty(t.Transport.prototype,"progress",{get:function(){if(this.loop){var t=this.now();return(this._clock.getTicksAtTime(t)-this._loopStart)/(this._loopEnd-this._loopStart)}return 0}}),Object.defineProperty(t.Transport.prototype,"ticks",{get:function(){return this._clock.ticks},set:function(e){if(this._clock.ticks!==e){var i=this.now();this.state===t.State.Started?(this.emit("stop",i),this._clock.setTicksAtTime(e,i),this.emit("start",i,this.seconds)):this._clock.setTicksAtTime(e,i)}}}),t.Transport.prototype.getTicksAtTime=function(t){return Math.round(this._clock.getTicksAtTime(t))},t.Transport.prototype.getSecondsAtTime=function(t){return this._clock.getSecondsAtTime(t)},Object.defineProperty(t.Transport.prototype,"PPQ",{get:function(){return this._ppq},set:function(t){var e=this.bpm.value;this._ppq=t,this.bpm.value=e}}),t.Transport.prototype._fromUnits=function(t){return 1/(60/t/this.PPQ)},t.Transport.prototype._toUnits=function(t){return t/this.PPQ*60},t.Transport.prototype.nextSubdivision=function(e){if(e=this.toTicks(e),this.state!==t.State.Started)return 0;var i=this.now(),n=e-this.getTicksAtTime(i)%e;return this._clock.nextTickTime(n,i)},t.Transport.prototype.syncSignal=function(e,i){if(!i){var n=this.now();i=0!==e.getValueAtTime(n)?e.getValueAtTime(n)/this.bpm.getValueAtTime(n):0}var o=new t.Gain(i);return this.bpm.chain(o,e._param),this._syncedSignals.push({ratio:o,signal:e,initial:e.value}),e.value=0,this},t.Transport.prototype.unsyncSignal=function(t){for(var e=this._syncedSignals.length-1;e>=0;e--){var i=this._syncedSignals[e];i.signal===t&&(i.ratio.dispose(),i.signal.value=i.initial,this._syncedSignals.splice(e,1))}return this},t.Transport.prototype.dispose=function(){return t.Emitter.prototype.dispose.call(this),this._clock.dispose(),this._clock=null,this._writable("bpm"),this.bpm=null,this._timeline.dispose(),this._timeline=null,this._repeatedEvents.dispose(),this._repeatedEvents=null,this};var e=t.Transport;return t.Transport=new e,t.Context.on("init",function(i){i.transport&&i.transport.isTransport?t.Transport=i.transport:t.Transport=new e}),t.Context.on("close",function(t){t.transport&&t.transport.isTransport&&t.transport.dispose()}),t.Transport}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(6),i(16),i(82)],void 0===(o=function(t){"use strict";return t.Oscillator=function(){var e=t.defaults(arguments,["frequency","type"],t.Oscillator);t.Source.call(this,e),this._oscillator=null,this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this._wave=null,this._partials=e.partials,this._partialCount=e.partialCount,this._phase=e.phase,this._type=e.type,e.partialCount&&e.type!==t.Oscillator.Type.Custom&&(this._type=this.baseType+e.partialCount.toString()),this.phase=this._phase,this._readOnly(["frequency","detune"])},t.extend(t.Oscillator,t.Source),t.Oscillator.defaults={type:"sine",frequency:440,detune:0,phase:0,partials:[],partialCount:0},t.Oscillator.Type={Sine:"sine",Triangle:"triangle",Sawtooth:"sawtooth",Square:"square",Custom:"custom"},t.Oscillator.prototype._start=function(e){this.log("start",e),this._oscillator=new t.OscillatorNode,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),e=this.toSeconds(e),this._oscillator.start(e)},t.Oscillator.prototype._stop=function(t){return this.log("stop",t),this._oscillator&&(t=this.toSeconds(t),this._oscillator.stop(t)),this},t.Oscillator.prototype.restart=function(t){return this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(this.toSeconds(t)),this},t.Oscillator.prototype.syncFrequency=function(){return t.Transport.syncSignal(this.frequency),this},t.Oscillator.prototype.unsyncFrequency=function(){return t.Transport.unsyncSignal(this.frequency),this},Object.defineProperty(t.Oscillator.prototype,"type",{get:function(){return this._type},set:function(t){var e=this._getRealImaginary(t,this._phase),i=this.context.createPeriodicWave(e[0],e[1]);this._wave=i,null!==this._oscillator&&this._oscillator.setPeriodicWave(this._wave),this._type=t}}),Object.defineProperty(t.Oscillator.prototype,"baseType",{get:function(){return this._type.replace(this.partialCount,"")},set:function(e){this.partialCount&&this._type!==t.Oscillator.Type.Custom&&e!==t.Oscillator.Type.Custom?this.type=e+this.partialCount:this.type=e}}),Object.defineProperty(t.Oscillator.prototype,"partialCount",{get:function(){return this._partialCount},set:function(e){var i=this._type,n=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);n&&(i=n[1]),this._type!==t.Oscillator.Type.Custom&&(this.type=0===e?i:i+e.toString())}}),t.Oscillator.prototype.get=function(){const e=t.prototype.get.apply(this,arguments);return e.type!==t.Oscillator.Type.Custom&&delete e.partials,e},t.Oscillator.prototype._getRealImaginary=function(e,i){var n=2048,o=new Float32Array(n),s=new Float32Array(n),r=1;if(e===t.Oscillator.Type.Custom)r=this._partials.length+1,this._partialCount=this._partials.length,n=r;else{var a=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);a?(r=parseInt(a[2])+1,this._partialCount=parseInt(a[2]),e=a[1],n=r=Math.max(r,2)):this._partialCount=0,this._partials=[]}for(var l=1;l<n;++l){var h,u=2/(l*Math.PI);switch(e){case t.Oscillator.Type.Sine:h=l<=r?1:0,this._partials[l-1]=h;break;case t.Oscillator.Type.Square:h=1&l?2*u:0,this._partials[l-1]=h;break;case t.Oscillator.Type.Sawtooth:h=u*(1&l?1:-1),this._partials[l-1]=h;break;case t.Oscillator.Type.Triangle:h=1&l?u*u*2*(l-1>>1&1?-1:1):0,this._partials[l-1]=h;break;case t.Oscillator.Type.Custom:h=this._partials[l-1];break;default:throw new TypeError("Tone.Oscillator: invalid type: "+e)}0!==h?(o[l]=-h*Math.sin(i*l),s[l]=h*Math.cos(i*l)):(o[l]=0,s[l]=0)}return[o,s]},t.Oscillator.prototype._inverseFFT=function(t,e,i){for(var n=0,o=t.length,s=0;s<o;s++)n+=t[s]*Math.cos(s*i)+e[s]*Math.sin(s*i);return n},t.Oscillator.prototype._getInitialValue=function(){for(var t=this._getRealImaginary(this._type,0),e=t[0],i=t[1],n=0,o=2*Math.PI,s=0;s<8;s++)n=Math.max(this._inverseFFT(e,i,s/8*o),n);return-this._inverseFFT(e,i,this._phase)/n},Object.defineProperty(t.Oscillator.prototype,"partials",{get:function(){return this._partials},set:function(e){this._partials=e,this.type=t.Oscillator.Type.Custom}}),Object.defineProperty(t.Oscillator.prototype,"phase",{get:function(){return this._phase*(180/Math.PI)},set:function(t){this._phase=t*Math.PI/180,this.type=this._type}}),t.Oscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),null!==this._oscillator&&(this._oscillator.dispose(),this._oscillator=null),this._wave=null,this._writable(["frequency","detune"]),this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this._partials=null,this},t.Oscillator}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(14),i(2)],void 0===(o=function(t){"use strict";return t.Delay=function(){var e=t.defaults(arguments,["delayTime","maxDelay"],t.Delay);t.AudioNode.call(this,e),this._maxDelay=Math.max(this.toSeconds(e.maxDelay),this.toSeconds(e.delayTime)),this._delayNode=this.input=this.output=this.context.createDelay(this._maxDelay),this.delayTime=new t.Param({param:this._delayNode.delayTime,units:t.Type.Time,value:e.delayTime}),this._readOnly("delayTime")},t.extend(t.Delay,t.AudioNode),t.Delay.defaults={maxDelay:1,delayTime:0},Object.defineProperty(t.Delay.prototype,"maxDelay",{get:function(){return this._maxDelay}}),t.Delay.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._delayNode.disconnect(),this._delayNode=null,this._writable("delayTime"),this.delayTime=null,this},t.Delay}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(3),i(2)],void 0===(o=function(t){"use strict";return t.Split=function(){t.AudioNode.call(this),this.createInsOuts(0,2),this._splitter=this.input=this.context.createChannelSplitter(2),this.left=this.output[0]=new t.Gain,this.right=this.output[1]=new t.Gain,this._splitter.connect(this.left,0,0),this._splitter.connect(this.right,1,0)},t.extend(t.Split,t.AudioNode),t.Split.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._splitter.disconnect(),this.left.dispose(),this.left=null,this.right.dispose(),this.right=null,this._splitter=null,this},t.Split}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(35),i(24),i(34)],void 0===(o=function(t){t.Context=function(){t.Emitter.call(this);var i=t.defaults(arguments,["context"],t.Context);if(!i.context&&(i.context=new t.global.AudioContext,!i.context))throw new Error("could not create AudioContext. Possibly too many AudioContexts running already.");for(this._context=i.context;this._context.rawContext;)this._context=this._context.rawContext;for(var n in this._context)this._defineProperty(this._context,n);this._latencyHint=i.latencyHint,this._constants={},this.lookAhead=i.lookAhead,this._computedUpdateInterval=0,this._ticker=new e(this.emit.bind(this,"tick"),i.clockSource,i.updateInterval),this._timeouts=new t.Timeline,this._timeoutIds=0,this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=function(t){this.emit("statechange",t)}.bind(this)},t.extend(t.Context,t.Emitter),t.Emitter.mixin(t.Context),t.Context.defaults={clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.03},t.Context.prototype.isContext=!0,t.Context.prototype._defineProperty=function(e,i){t.isUndef(this[i])&&Object.defineProperty(this,i,{get:function(){return"function"==typeof e[i]?e[i].bind(e):e[i]},set:function(t){e[i]=t}})},t.Context.prototype.now=function(){return this._context.currentTime+this.lookAhead},Object.defineProperty(t.Context.prototype,"destination",{get:function(){return this.master?this.master:this._context.destination}}),t.Context.prototype.resume=function(){return"suspended"===this._context.state&&this._context instanceof AudioContext?this._context.resume():Promise.resolve()},t.Context.prototype.close=function(){var e=Promise.resolve();return this!==t.global.TONE_AUDIO_CONTEXT&&(e=this.rawContext.close()),e.then(function(){t.Context.emit("close",this)}.bind(this))},t.Context.prototype.getConstant=function(t){if(this._constants[t])return this._constants[t];for(var e=this._context.createBuffer(1,128,this._context.sampleRate),i=e.getChannelData(0),n=0;n<i.length;n++)i[n]=t;var o=this._context.createBufferSource();return o.channelCount=1,o.channelCountMode="explicit",o.buffer=e,o.loop=!0,o.start(0),this._constants[t]=o,o},t.Context.prototype._timeoutLoop=function(){for(var t=this.now();this._timeouts&&this._timeouts.length&&this._timeouts.peek().time<=t;)this._timeouts.shift().callback()},t.Context.prototype.setTimeout=function(t,e){this._timeoutIds++;var i=this.now();return this._timeouts.add({callback:t,time:i+e,id:this._timeoutIds}),this._timeoutIds},t.Context.prototype.clearTimeout=function(t){return this._timeouts.forEach(function(e){e.id===t&&this.remove(e)}),this},Object.defineProperty(t.Context.prototype,"updateInterval",{get:function(){return this._ticker.updateInterval},set:function(t){this._ticker.updateInterval=t}}),Object.defineProperty(t.Context.prototype,"rawContext",{get:function(){return this._context}}),Object.defineProperty(t.Context.prototype,"clockSource",{get:function(){return this._ticker.type},set:function(t){this._ticker.type=t}}),Object.defineProperty(t.Context.prototype,"latencyHint",{get:function(){return this._latencyHint},set:function(e){var i=e;if(this._latencyHint=e,t.isString(e))switch(e){case"interactive":i=.1,this._context.latencyHint=e;break;case"playback":i=.8,this._context.latencyHint=e;break;case"balanced":i=.25,this._context.latencyHint=e;break;case"fastest":this._context.latencyHint="interactive",i=.01}this.lookAhead=i,this.updateInterval=i/3}}),t.Context.prototype.dispose=function(){return this.close().then(function(){for(var e in t.Emitter.prototype.dispose.call(this),this._ticker.dispose(),this._ticker=null,this._timeouts.dispose(),this._timeouts=null,this._constants)this._constants[e].disconnect();this._constants=null}.bind(this))};var e=function(e,i,n){this._type=i,this._updateInterval=n,this._callback=t.defaultArg(e,t.noOp),this._createClock()};if(e.Type={Worker:"worker",Timeout:"timeout",Offline:"offline"},e.prototype._createWorker=function(){t.global.URL=t.global.URL||t.global.webkitURL;var e=new Blob(["var timeoutTime = "+(1e3*this._updateInterval).toFixed(1)+";self.onmessage = function(msg){\ttimeoutTime = parseInt(msg.data);};function tick(){\tsetTimeout(tick, timeoutTime);\tself.postMessage('tick');}tick();"]),i=URL.createObjectURL(e),n=new Worker(i);n.onmessage=this._callback.bind(this),this._worker=n},e.prototype._createTimeout=function(){this._timeout=setTimeout(function(){this._createTimeout(),this._callback()}.bind(this),1e3*this._updateInterval)},e.prototype._createClock=function(){if(this._type===e.Type.Worker)try{this._createWorker()}catch(t){this._type=e.Type.Timeout,this._createClock()}else this._type===e.Type.Timeout&&this._createTimeout()},Object.defineProperty(e.prototype,"updateInterval",{get:function(){return this._updateInterval},set:function(t){this._updateInterval=Math.max(t,128/44100),this._type===e.Type.Worker&&this._worker.postMessage(Math.max(1e3*t,1))}}),Object.defineProperty(e.prototype,"type",{get:function(){return this._type},set:function(t){this._disposeClock(),this._type=t,this._createClock()}}),e.prototype._disposeClock=function(){this._timeout&&(clearTimeout(this._timeout),this._timeout=null),this._worker&&(this._worker.terminate(),this._worker.onmessage=null,this._worker=null)},e.prototype.dispose=function(){this._disposeClock(),this._callback=null},t.getContext(function(){var e=AudioNode.prototype.connect,i=AudioNode.prototype.disconnect;function n(i,n,o){if(i.input)return o=t.defaultArg(o,0),t.isArray(i.input)?this.connect(i.input[o]):this.connect(i.input,n,o);try{return i instanceof AudioNode?(e.call(this,i,n,o),i):(e.call(this,i,n),i)}catch(t){throw new Error("error connecting to node: "+i+"\n"+t)}}AudioNode.prototype.connect!==n&&(AudioNode.prototype.connect=n,AudioNode.prototype.disconnect=function(e,n,o){if(e&&e.input&&t.isArray(e.input))o=t.defaultArg(o,0),this.disconnect(e.input[o],n,0);else if(e&&e.input)this.disconnect(e.input,n,o);else try{e instanceof AudioParam?i.call(this,e,n):i.apply(this,arguments)}catch(t){throw new Error("error disconnecting node: "+e+"\n"+t)}})}),t.supported&&!t.initialized){if(t.global.TONE_AUDIO_CONTEXT||(t.global.TONE_AUDIO_CONTEXT=new t.Context),t.context=t.global.TONE_AUDIO_CONTEXT,!t.global.TONE_SILENCE_VERSION_LOGGING){var i="v";"dev"===t.version&&(i="");var n=" * Tone.js "+i+t.version+" * ";console.log("%c"+n,"background: #000; color: #fff")}}else t.supported||console.warn("This browser does not support Tone.js");return t.Context}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(4),i(40)],void 0===(o=function(t){"use strict";return t.Instrument=function(e){e=t.defaultArg(e,t.Instrument.defaults),t.AudioNode.call(this),this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._readOnly("volume"),this._scheduledEvents=[]},t.extend(t.Instrument,t.AudioNode),t.Instrument.defaults={volume:0},t.Instrument.prototype.triggerAttack=t.noOp,t.Instrument.prototype.triggerRelease=t.noOp,t.Instrument.prototype.sync=function(){return this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this},t.Instrument.prototype._syncMethod=function(e,i){var n=this["_original_"+e]=this[e];this[e]=function(){var e=Array.prototype.slice.call(arguments),o=e[i],s=t.Transport.schedule(function(t){e[i]=t,n.apply(this,e)}.bind(this),o);this._scheduledEvents.push(s)}.bind(this)},t.Instrument.prototype.unsync=function(){return this._scheduledEvents.forEach(function(e){t.Transport.clear(e)}),this._scheduledEvents=[],this._original_triggerAttack&&(this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease),this},t.Instrument.prototype.triggerAttackRelease=function(t,e,i,n){return i=this.toSeconds(i),e=this.toSeconds(e),this.triggerAttack(t,i,n),this.triggerRelease(i+e),this},t.Instrument.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._volume.dispose(),this._volume=null,this._writable(["volume"]),this.volume=null,this.unsync(),this._scheduledEvents=null,this},t.Instrument}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(7),i(1)],void 0===(o=function(t){"use strict";return t.AudioToGain=function(){t.SignalBase.call(this),this._norm=this.input=this.output=new t.WaveShaper(function(t){return(t+1)/2})},t.extend(t.AudioToGain,t.SignalBase),t.AudioToGain.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._norm.dispose(),this._norm=null,this},t.AudioToGain}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(13),i(93),i(3),i(2)],void 0===(o=function(t){"use strict";return t.CrossFade=function(e){t.AudioNode.call(this),this.createInsOuts(2,1),this.a=this.input[0]=new t.Gain,this.b=this.input[1]=new t.Gain,this.fade=new t.Signal(t.defaultArg(e,.5),t.Type.NormalRange),this._equalPowerA=new t.EqualPowerGain,this._equalPowerB=new t.EqualPowerGain,this._one=this.context.getConstant(1),this._invert=new t.Subtract,this.a.connect(this.output),this.b.connect(this.output),this.fade.chain(this._equalPowerB,this.b.gain),this._one.connect(this._invert,0,0),this.fade.connect(this._invert,0,1),this._invert.chain(this._equalPowerA,this.a.gain),this._readOnly("fade")},t.extend(t.CrossFade,t.AudioNode),t.CrossFade.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable("fade"),this._equalPowerA.dispose(),this._equalPowerA=null,this._equalPowerB.dispose(),this._equalPowerB=null,this.fade.dispose(),this.fade=null,this._invert.dispose(),this._invert=null,this._one=null,this.a.dispose(),this.a=null,this.b.dispose(),this.b=null,this},t.CrossFade}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0)],void 0===(o=function(t){"use strict";return t.Timeline=function(){var e=t.defaults(arguments,["memory"],t.Timeline);t.call(this),this._timeline=[],this.memory=e.memory},t.extend(t.Timeline),t.Timeline.defaults={memory:1/0},Object.defineProperty(t.Timeline.prototype,"length",{get:function(){return this._timeline.length}}),t.Timeline.prototype.add=function(e){if(t.isUndef(e.time))throw new Error("Tone.Timeline: events must have a time attribute");e.time=e.time.valueOf();var i=this._search(e.time);if(this._timeline.splice(i+1,0,e),this.length>this.memory){var n=this.length-this.memory;this._timeline.splice(0,n)}return this},t.Timeline.prototype.remove=function(t){var e=this._timeline.indexOf(t);return-1!==e&&this._timeline.splice(e,1),this},t.Timeline.prototype.get=function(e,i){i=t.defaultArg(i,"time");var n=this._search(e,i);return-1!==n?this._timeline[n]:null},t.Timeline.prototype.peek=function(){return this._timeline[0]},t.Timeline.prototype.shift=function(){return this._timeline.shift()},t.Timeline.prototype.getAfter=function(e,i){i=t.defaultArg(i,"time");var n=this._search(e,i);return n+1<this._timeline.length?this._timeline[n+1]:null},t.Timeline.prototype.getBefore=function(e,i){i=t.defaultArg(i,"time");var n=this._timeline.length;if(n>0&&this._timeline[n-1][i]<e)return this._timeline[n-1];var o=this._search(e,i);return o-1>=0?this._timeline[o-1]:null},t.Timeline.prototype.cancel=function(t){if(this._timeline.length>1){var e=this._search(t);if(e>=0)if(this._timeline[e].time===t){for(var i=e;i>=0&&this._timeline[i].time===t;i--)e=i;this._timeline=this._timeline.slice(0,e)}else this._timeline=this._timeline.slice(0,e+1);else this._timeline=[]}else 1===this._timeline.length&&this._timeline[0].time>=t&&(this._timeline=[]);return this},t.Timeline.prototype.cancelBefore=function(t){var e=this._search(t);return e>=0&&(this._timeline=this._timeline.slice(e+1)),this},t.Timeline.prototype.previousEvent=function(t){var e=this._timeline.indexOf(t);return e>0?this._timeline[e-1]:null},t.Timeline.prototype._search=function(e,i){if(0===this._timeline.length)return-1;i=t.defaultArg(i,"time");var n=0,o=this._timeline.length,s=o;if(o>0&&this._timeline[o-1][i]<=e)return o-1;for(;n<s;){var r=Math.floor(n+(s-n)/2),a=this._timeline[r],l=this._timeline[r+1];if(a[i]===e){for(var h=r;h<this._timeline.length;h++){this._timeline[h][i]===e&&(r=h)}return r}if(a[i]<e&&l[i]>e)return r;a[i]>e?s=r:n=r+1}return-1},t.Timeline.prototype._iterate=function(e,i,n){i=t.defaultArg(i,0),n=t.defaultArg(n,this._timeline.length-1),this._timeline.slice(i,n+1).forEach(function(t){e.call(this,t)}.bind(this))},t.Timeline.prototype.forEach=function(t){return this._iterate(t),this},t.Timeline.prototype.forEachBefore=function(t,e){var i=this._search(t);return-1!==i&&this._iterate(e,0,i),this},t.Timeline.prototype.forEachAfter=function(t,e){var i=this._search(t);return this._iterate(e,i+1),this},t.Timeline.prototype.forEachBetween=function(t,e,i){var n=this._search(t),o=this._search(e);return-1!==n&&-1!==o?(this._timeline[n].time!==t&&(n+=1),this._timeline[o].time===e&&(o-=1),this._iterate(i,n,o)):-1===n&&this._iterate(i,0,o),this},t.Timeline.prototype.forEachFrom=function(t,e){for(var i=this._search(t);i>=0&&this._timeline[i].time>=t;)i--;return this._iterate(e,i+1),this},t.Timeline.prototype.forEachAtTime=function(t,e){var i=this._search(t);return-1!==i&&this._iterate(function(i){i.time===t&&e.call(this,i)},0,i),this},t.Timeline.prototype.dispose=function(){return t.prototype.dispose.call(this),this._timeline=null,this},t.Timeline}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(21),i(1)],void 0===(o=function(t){"use strict";return t.Monophonic=function(e){e=t.defaultArg(e,t.Monophonic.defaults),t.Instrument.call(this,e),this.portamento=e.portamento},t.extend(t.Monophonic,t.Instrument),t.Monophonic.defaults={portamento:0},t.Monophonic.prototype.triggerAttack=function(t,e,i){return this.log("triggerAttack",t,e,i),e=this.toSeconds(e),this._triggerEnvelopeAttack(e,i),this.setNote(t,e),this},t.Monophonic.prototype.triggerRelease=function(t){return this.log("triggerRelease",t),t=this.toSeconds(t),this._triggerEnvelopeRelease(t),this},t.Monophonic.prototype._triggerEnvelopeAttack=function(){},t.Monophonic.prototype._triggerEnvelopeRelease=function(){},t.Monophonic.prototype.getLevelAtTime=function(t){return t=this.toSeconds(t),this.envelope.getValueAtTime(t)},t.Monophonic.prototype.setNote=function(t,e){if(e=this.toSeconds(e),this.portamento>0&&this.getLevelAtTime(e)>.05){var i=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(t,i,e)}else this.frequency.setValueAtTime(t,e);return this},t.Monophonic}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(29),i(5),i(1)],void 0===(o=function(t){"use strict";return t.Scale=function(e,i){t.SignalBase.call(this),this._outputMin=t.defaultArg(e,0),this._outputMax=t.defaultArg(i,1),this._scale=this.input=new t.Multiply(1),this._add=this.output=new t.Add(0),this._scale.connect(this._add),this._setRange()},t.extend(t.Scale,t.SignalBase),Object.defineProperty(t.Scale.prototype,"min",{get:function(){return this._outputMin},set:function(t){this._outputMin=t,this._setRange()}}),Object.defineProperty(t.Scale.prototype,"max",{get:function(){return this._outputMax},set:function(t){this._outputMax=t,this._setRange()}}),t.Scale.prototype._setRange=function(){this._add.value=this._outputMin,this._scale.value=this._outputMax-this._outputMin},t.Scale.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._add.dispose(),this._add=null,this._scale.dispose(),this._scale=null,this},t.Scale}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(3),i(2)],void 0===(o=function(t){"use strict";return t.Volume=function(){var e=t.defaults(arguments,["volume"],t.Volume);t.AudioNode.call(this,e),this.output=this.input=new t.Gain(e.volume,t.Type.Decibels),this._unmutedVolume=e.volume,this.volume=this.output.gain,this._readOnly("volume"),this.mute=e.mute},t.extend(t.Volume,t.AudioNode),t.Volume.defaults={volume:0,mute:!1},Object.defineProperty(t.Volume.prototype,"mute",{get:function(){return this.volume.value===-1/0},set:function(t){!this.mute&&t?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!t&&(this.volume.value=this._unmutedVolume)}}),t.Volume.prototype.dispose=function(){return this.input.dispose(),t.AudioNode.prototype.dispose.call(this),this._writable("volume"),this.volume.dispose(),this.volume=null,this},t.Volume}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(3),i(36)],void 0===(o=function(t){return t.Zero=function(){t.SignalBase.call(this),this._gain=this.input=this.output=new t.Gain,this.context.getConstant(0).connect(this._gain)},t.extend(t.Zero,t.SignalBase),t.Zero.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._gain.dispose(),this._gain=null,this},t.Zero}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(3)],void 0===(o=function(t){"use strict";return t.Add=function(e){t.Signal.call(this),this.createInsOuts(2,0),this._sum=this.input[0]=this.input[1]=this.output=new t.Gain,this._param=this.input[1]=new t.Signal(e),this._param.connect(this._sum),this.proxy=!1},t.extend(t.Add,t.Signal),t.Add.prototype.dispose=function(){return t.Signal.prototype.dispose.call(this),this._sum.dispose(),this._sum=null,this},t.Add}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(47),i(3)],void 0===(o=function(t){"use strict";return t.AmplitudeEnvelope=function(){t.Envelope.apply(this,arguments),this.input=this.output=new t.Gain,this._sig.connect(this.output.gain)},t.extend(t.AmplitudeEnvelope,t.Envelope),t.AmplitudeEnvelope.prototype.dispose=function(){return t.Envelope.prototype.dispose.call(this),this},t.AmplitudeEnvelope}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(11),i(6),i(3),i(2),i(63)],void 0===(o=function(t){return t.BufferSource=function(){var e=t.defaults(arguments,["buffer","onload"],t.BufferSource);t.AudioNode.call(this,e),this.onended=e.onended,this._startTime=-1,this._sourceStarted=!1,this._sourceStopped=!1,this._stopTime=-1,this._gainNode=this.output=new t.Gain(0),this._source=this.context.createBufferSource(),this._source.connect(this._gainNode),this._source.onended=this._onended.bind(this),this._buffer=new t.Buffer(e.buffer,e.onload),this.playbackRate=new t.Param({param:this._source.playbackRate,units:t.Type.Positive,value:e.playbackRate}),this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut,this.curve=e.curve,this._onendedTimeout=-1,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd},t.extend(t.BufferSource,t.AudioNode),t.BufferSource.defaults={onended:t.noOp,onload:t.noOp,loop:!1,loopStart:0,loopEnd:0,fadeIn:0,fadeOut:0,curve:"linear",playbackRate:1},Object.defineProperty(t.BufferSource.prototype,"state",{get:function(){return this.getStateAtTime(this.now())}}),t.BufferSource.prototype.getStateAtTime=function(e){return e=this.toSeconds(e),-1!==this._startTime&&this._startTime<=e&&(-1===this._stopTime||e<this._stopTime)&&!this._sourceStopped?t.State.Started:t.State.Stopped},t.BufferSource.prototype.start=function(e,i,n,o){this.log("start",e,i,n,o),this.assert(-1===this._startTime,"can only be started once"),this.assert(this.buffer.loaded,"buffer is either not set or not loaded"),this.assert(!this._sourceStopped,"source is already stopped"),e=this.toSeconds(e),i=this.loop?t.defaultArg(i,this.loopStart):t.defaultArg(i,0),i=this.toSeconds(i),i=Math.max(i,0),o=t.defaultArg(o,1);var s=this.toSeconds(this.fadeIn);if(s>0?(this._gainNode.gain.setValueAtTime(0,e),"linear"===this.curve?this._gainNode.gain.linearRampToValueAtTime(o,e+s):this._gainNode.gain.exponentialApproachValueAtTime(o,e,s)):this._gainNode.gain.setValueAtTime(o,e),this._startTime=e,t.isDefined(n)){var r=this.toSeconds(n);r=Math.max(r,0),this.stop(e+r)}if(this.loop){var a=this.loopEnd||this.buffer.duration,l=this.loopStart;i>=a&&(i=(i-l)%(a-l)+l)}return this._source.buffer=this.buffer.get(),this._source.loopEnd=this.loopEnd||this.buffer.duration,i<this.buffer.duration&&(this._sourceStarted=!0,this._source.start(e,i)),this},t.BufferSource.prototype.stop=function(e){this.log("stop",e),this.assert(this.buffer.loaded,"buffer is either not set or not loaded"),this.assert(!this._sourceStopped,"source is already stopped"),e=this.toSeconds(e),-1!==this._stopTime&&this.cancelStop();var i=this.toSeconds(this.fadeOut);return this._stopTime=e+i,i>0?"linear"===this.curve?this._gainNode.gain.linearRampTo(0,i,e):this._gainNode.gain.targetRampTo(0,i,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),t.context.clearTimeout(this._onendedTimeout),this._onendedTimeout=t.context.setTimeout(this._onended.bind(this),this._stopTime-this.now()),this},t.BufferSource.prototype.cancelStop=function(){if(-1!==this._startTime&&!this._sourceStopped){var t=this.toSeconds(this.fadeIn);this._gainNode.gain.cancelScheduledValues(this._startTime+t+this.sampleTime),this.context.clearTimeout(this._onendedTimeout),this._stopTime=-1}return this},t.BufferSource.prototype._onended=function(){if(!this._sourceStopped){this._sourceStopped=!0;var t="exponential"===this.curve?2*this.fadeOut:0;this._sourceStarted&&-1!==this._stopTime&&this._source.stop(this._stopTime+t),this.onended(this)}},Object.defineProperty(t.BufferSource.prototype,"loopStart",{get:function(){return this._source.loopStart},set:function(t){this._source.loopStart=this.toSeconds(t)}}),Object.defineProperty(t.BufferSource.prototype,"loopEnd",{get:function(){return this._source.loopEnd},set:function(t){this._source.loopEnd=this.toSeconds(t)}}),Object.defineProperty(t.BufferSource.prototype,"buffer",{get:function(){return this._buffer},set:function(t){this._buffer.set(t)}}),Object.defineProperty(t.BufferSource.prototype,"loop",{get:function(){return this._source.loop},set:function(t){this._source.loop=t,this.cancelStop()}}),t.BufferSource.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this.onended=null,this._source.onended=null,this._source.disconnect(),this._source=null,this._gainNode.dispose(),this._gainNode=null,this._buffer.dispose(),this._buffer=null,this._startTime=-1,this.playbackRate=null,t.context.clearTimeout(this._onendedTimeout),this},t.BufferSource}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(1),i(5),i(3)],void 0===(o=function(t){"use strict";return t.FeedbackEffect=function(){var e=t.defaults(arguments,["feedback"],t.FeedbackEffect);t.Effect.call(this,e),this._feedbackGain=new t.Gain(e.feedback,t.Type.NormalRange),this.feedback=this._feedbackGain.gain,this.effectReturn.chain(this._feedbackGain,this.effectSend),this._readOnly(["feedback"])},t.extend(t.FeedbackEffect,t.Effect),t.FeedbackEffect.defaults={feedback:.125},t.FeedbackEffect.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._writable(["feedback"]),this._feedbackGain.dispose(),this._feedbackGain=null,this.feedback=null,this},t.FeedbackEffect}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(24),i(4)],void 0===(o=function(t){"use strict";return t.TimelineState=function(e){t.Timeline.call(this),this._initial=e},t.extend(t.TimelineState,t.Timeline),t.TimelineState.prototype.getValueAtTime=function(t){var e=this.get(t);return null!==e?e.state:this._initial},t.TimelineState.prototype.setStateAtTime=function(t,e){return this.add({state:t,time:e}),this},t.TimelineState.prototype.getLastState=function(t,e){e=this.toSeconds(e);for(var i=this._search(e);i>=0;i--){var n=this._timeline[i];if(n.state===t)return n}},t.TimelineState.prototype.getNextState=function(t,e){e=this.toSeconds(e);var i=this._search(e);if(-1!==i)for(var n=i;n<this._timeline.length;n++){var o=this._timeline[n];if(o.state===t)return o}},t.TimelineState}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(66)],void 0===(o=function(t){if(t.supported){!t.global.hasOwnProperty("AudioContext")&&t.global.hasOwnProperty("webkitAudioContext")&&(t.global.AudioContext=t.global.webkitAudioContext),AudioContext.prototype.close||(AudioContext.prototype.close=function(){return t.isFunction(this.suspend)&&this.suspend(),Promise.resolve()}),AudioContext.prototype.resume||(AudioContext.prototype.resume=function(){var t=this.createBuffer(1,1,this.sampleRate),e=this.createBufferSource();return e.buffer=t,e.connect(this.destination),e.start(0),Promise.resolve()}),!AudioContext.prototype.createGain&&AudioContext.prototype.createGainNode&&(AudioContext.prototype.createGain=AudioContext.prototype.createGainNode),!AudioContext.prototype.createDelay&&AudioContext.prototype.createDelayNode&&(AudioContext.prototype.createDelay=AudioContext.prototype.createDelayNode);var e=!1,i=new OfflineAudioContext(1,1,44100),n=new Uint32Array([1179011410,48,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,8,0,0,0,0]).buffer;try{var o=i.decodeAudioData(n);o&&t.isFunction(o.then)&&(e=!0)}catch(t){e=!1}e||(AudioContext.prototype._native_decodeAudioData=AudioContext.prototype.decodeAudioData,AudioContext.prototype.decodeAudioData=function(t){return new Promise(function(e,i){this._native_decodeAudioData(t,e,i)}.bind(this))})}}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0)],void 0===(o=function(t){"use strict";return t.Emitter=function(){t.call(this),this._events={}},t.extend(t.Emitter),t.Emitter.prototype.on=function(t,e){for(var i=t.split(/\W+/),n=0;n<i.length;n++){var o=i[n];this._events.hasOwnProperty(o)||(this._events[o]=[]),this._events[o].push(e)}return this},t.Emitter.prototype.once=function(t,e){var i=function(){e.apply(this,arguments),this.off(t,i)}.bind(this);return this.on(t,i),this},t.Emitter.prototype.off=function(e,i){for(var n=e.split(/\W+/),o=0;o<n.length;o++)if(e=n[o],this._events.hasOwnProperty(e))if(t.isUndef(i))this._events[e]=[];else for(var s=this._events[e],r=0;r<s.length;r++)s[r]===i&&s.splice(r,1);return this},t.Emitter.prototype.emit=function(t){if(this._events){var e=Array.apply(null,arguments).slice(1);if(this._events.hasOwnProperty(t))for(var i=this._events[t].slice(0),n=0,o=i.length;n<o;n++)i[n].apply(this,e)}return this},t.Emitter.mixin=function(e){var i=["on","once","off","emit"];e._events={};for(var n=0;n<i.length;n++){var o=i[n],s=t.Emitter.prototype[o];e[o]=s}return t.Emitter},t.Emitter.prototype.dispose=function(){return t.prototype.dispose.call(this),this._events=null,this},t.Emitter}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(2)],void 0===(o=function(t){"use strict";return t.SignalBase=function(){t.AudioNode.call(this)},t.extend(t.SignalBase,t.AudioNode),t.SignalBase.prototype.connect=function(e,i,n){return t.Signal&&t.Signal===e.constructor||t.Param&&t.Param===e.constructor?(e._param.cancelScheduledValues(0),e._param.setValueAtTime(0,0),e.overridden=!0):e instanceof AudioParam&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0)),t.AudioNode.prototype.connect.call(this,e,i,n),this},t.SignalBase}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(6),i(17),i(49),i(71),i(48),i(70),i(69)],void 0===(o=function(t){"use strict";t.OmniOscillator=function(){var e=t.defaults(arguments,["frequency","type"],t.OmniOscillator);t.Source.call(this,e),this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this._sourceType=void 0,this._oscillator=null,this.type=e.type,this._readOnly(["frequency","detune"]),this.set(e)},t.extend(t.OmniOscillator,t.Source),t.OmniOscillator.defaults={frequency:440,detune:0,type:"sine",phase:0};var e="PulseOscillator",i="PWMOscillator",n="Oscillator",o="FMOscillator",s="AMOscillator",r="FatOscillator";t.OmniOscillator.prototype._start=function(t){this._oscillator.start(t)},t.OmniOscillator.prototype._stop=function(t){this._oscillator.stop(t)},t.OmniOscillator.prototype.restart=function(t){this._oscillator.restart(t)},Object.defineProperty(t.OmniOscillator.prototype,"type",{get:function(){var t="";return this._sourceType===o?t="fm":this._sourceType===s?t="am":this._sourceType===r&&(t="fat"),t+this._oscillator.type},set:function(t){"fm"===t.substr(0,2)?(this._createNewOscillator(o),this._oscillator.type=t.substr(2)):"am"===t.substr(0,2)?(this._createNewOscillator(s),this._oscillator.type=t.substr(2)):"fat"===t.substr(0,3)?(this._createNewOscillator(r),this._oscillator.type=t.substr(3)):"pwm"===t?this._createNewOscillator(i):"pulse"===t?this._createNewOscillator(e):(this._createNewOscillator(n),this._oscillator.type=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"partials",{get:function(){return this._oscillator.partials},set:function(t){this._oscillator.partials=t}}),Object.defineProperty(t.OmniOscillator.prototype,"partialCount",{get:function(){return this._oscillator.partialCount},set:function(t){this._oscillator.partialCount=t}}),t.OmniOscillator.prototype.set=function(e,i){return"type"===e?this.type=i:t.isObject(e)&&e.hasOwnProperty("type")&&(this.type=e.type),t.prototype.set.apply(this,arguments),this},t.OmniOscillator.prototype.get=function(t){var e=this._oscillator.get(t);return e.type=this.type,e},t.OmniOscillator.prototype._createNewOscillator=function(e){if(e!==this._sourceType){this._sourceType=e;var i=t[e],n=this.now();if(null!==this._oscillator){var o=this._oscillator;o.stop(n),this.context.setTimeout(function(){o.dispose(),o=null},this.blockTime)}this._oscillator=new i,this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this.state===t.State.Started&&this._oscillator.start(n)}},Object.defineProperty(t.OmniOscillator.prototype,"phase",{get:function(){return this._oscillator.phase},set:function(t){this._oscillator.phase=t}});var a={PulseOscillator:"pulse",PWMOscillator:"pwm",Oscillator:"oscillator",FMOscillator:"fm",AMOscillator:"am",FatOscillator:"fat"};return Object.defineProperty(t.OmniOscillator.prototype,"sourceType",{get:function(){return a[this._sourceType]},set:function(t){var e="sine";"pwm"!==this._oscillator.type&&"pulse"!==this._oscillator.type&&(e=this._oscillator.type),t===a.FMOscillator?this.type="fm"+e:t===a.AMOscillator?this.type="am"+e:t===a.FatOscillator?this.type="fat"+e:t===a.Oscillator?this.type=e:t===a.PulseOscillator?this.type="pulse":t===a.PWMOscillator&&(this.type="pwm")}}),Object.defineProperty(t.OmniOscillator.prototype,"baseType",{get:function(){return this._oscillator.baseType},set:function(t){this.sourceType!==a.PulseOscillator&&this.sourceType!==a.PWMOscillator&&(this._oscillator.baseType=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"width",{get:function(){if(this._sourceType===e)return this._oscillator.width}}),Object.defineProperty(t.OmniOscillator.prototype,"count",{get:function(){if(this._sourceType===r)return this._oscillator.count},set:function(t){this._sourceType===r&&(this._oscillator.count=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"spread",{get:function(){if(this._sourceType===r)return this._oscillator.spread},set:function(t){this._sourceType===r&&(this._oscillator.spread=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"modulationType",{get:function(){if(this._sourceType===o||this._sourceType===s)return this._oscillator.modulationType},set:function(t){this._sourceType!==o&&this._sourceType!==s||(this._oscillator.modulationType=t)}}),Object.defineProperty(t.OmniOscillator.prototype,"modulationIndex",{get:function(){if(this._sourceType===o)return this._oscillator.modulationIndex}}),Object.defineProperty(t.OmniOscillator.prototype,"harmonicity",{get:function(){if(this._sourceType===o||this._sourceType===s)return this._oscillator.harmonicity}}),Object.defineProperty(t.OmniOscillator.prototype,"modulationFrequency",{get:function(){if(this._sourceType===i)return this._oscillator.modulationFrequency}}),t.OmniOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._writable(["frequency","detune"]),this.detune.dispose(),this.detune=null,this.frequency.dispose(),this.frequency=null,this._oscillator.dispose(),this._oscillator=null,this._sourceType=null,this},t.OmniOscillator}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(30),i(37),i(1),i(25)],void 0===(o=function(t){"use strict";return t.Synth=function(e){e=t.defaultArg(e,t.Synth.defaults),t.Monophonic.call(this,e),this.oscillator=new t.OmniOscillator(e.oscillator),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new t.AmplitudeEnvelope(e.envelope),this.oscillator.chain(this.envelope,this.output),this._readOnly(["oscillator","frequency","detune","envelope"])},t.extend(t.Synth,t.Monophonic),t.Synth.defaults={oscillator:{type:"triangle"},envelope:{attack:.005,decay:.1,sustain:.3,release:1}},t.Synth.prototype._triggerEnvelopeAttack=function(t,e){return this.envelope.triggerAttack(t,e),this.oscillator.start(t),0===this.envelope.sustain&&this.oscillator.stop(t+this.envelope.attack+this.envelope.decay),this},t.Synth.prototype._triggerEnvelopeRelease=function(t){return t=this.toSeconds(t),this.envelope.triggerRelease(t),this.oscillator.stop(t+this.envelope.release),this},t.Synth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["oscillator","frequency","detune","envelope"]),this.oscillator.dispose(),this.oscillator=null,this.envelope.dispose(),this.envelope=null,this.frequency=null,this.detune=null,this},t.Synth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(6),i(11),i(31)],void 0===(o=function(t){"use strict";t.Noise=function(){var e=t.defaults(arguments,["type"],t.Noise);t.Source.call(this,e),this._source=null,this._type=e.type,this._playbackRate=e.playbackRate},t.extend(t.Noise,t.Source),t.Noise.defaults={type:"white",playbackRate:1},Object.defineProperty(t.Noise.prototype,"type",{get:function(){return this._type},set:function(i){if(this._type!==i){if(!(i in e))throw new TypeError("Tone.Noise: invalid type: "+i);if(this._type=i,this.state===t.State.Started){var n=this.now();this._stop(n),this._start(n)}}}}),Object.defineProperty(t.Noise.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this._source&&(this._source.playbackRate.value=t)}}),t.Noise.prototype._start=function(i){var n=e[this._type];this._source=new t.BufferSource(n).connect(this.output),this._source.loop=!0,this._source.playbackRate.value=this._playbackRate,this._source.start(this.toSeconds(i),Math.random()*(n.duration-.001))},t.Noise.prototype._stop=function(t){this._source&&(this._source.stop(this.toSeconds(t)),this._source=null)},t.Noise.prototype.restart=function(t){return this._stop(t),this._start(t),this},t.Noise.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),null!==this._source&&(this._source.disconnect(),this._source=null),this._buffer=null,this};var e={},i={};return Object.defineProperty(e,"pink",{get:function(){if(!i.pink){for(var e=[],n=0;n<2;n++){var o,s,r,a,l,h,u,c=new Float32Array(220500);e[n]=c,o=s=r=a=l=h=u=0;for(var p=0;p<220500;p++){var f=2*Math.random()-1;o=.99886*o+.0555179*f,s=.99332*s+.0750759*f,r=.969*r+.153852*f,a=.8665*a+.3104856*f,l=.55*l+.5329522*f,h=-.7616*h-.016898*f,c[p]=o+s+r+a+l+h+u+.5362*f,c[p]*=.11,u=.115926*f}}i.pink=(new t.Buffer).fromArray(e)}return i.pink}}),Object.defineProperty(e,"brown",{get:function(){if(!i.brown){for(var e=[],n=0;n<2;n++){var o=new Float32Array(220500);e[n]=o;for(var s=0,r=0;r<220500;r++){var a=2*Math.random()-1;o[r]=(s+.02*a)/1.02,s=o[r],o[r]*=3.5}}i.brown=(new t.Buffer).fromArray(e)}return i.brown}}),Object.defineProperty(e,"white",{get:function(){if(!i.white){for(var e=[],n=0;n<2;n++){var o=new Float32Array(220500);e[n]=o;for(var s=0;s<220500;s++)o[s]=2*Math.random()-1}i.white=(new t.Buffer).fromArray(e)}return i.white}}),t.Noise}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(27),i(20),i(2)],void 0===(o=function(t){"use strict";t.Master=function(){t.AudioNode.call(this),t.getContext(function(){this.createInsOuts(1,0),this._volume=this.output=new t.Volume,this.volume=this._volume.volume,this._readOnly("volume"),this.input.chain(this.output,this.context.destination),this.context.master=this}.bind(this))},t.extend(t.Master,t.AudioNode),t.Master.defaults={volume:0,mute:!1},t.Master.prototype.isMaster=!0,Object.defineProperty(t.Master.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),t.Master.prototype.chain=function(){this.input.disconnect(),this.input.chain.apply(this.input,arguments),arguments[arguments.length-1].connect(this.output)},t.Master.prototype.dispose=function(){t.AudioNode.prototype.dispose.call(this),this._writable("volume"),this._volume.dispose(),this._volume=null,this.volume=null},t.AudioNode.prototype.toMaster=function(){return this.connect(this.context.master),this};var e=t.Master;return t.Master=new e,t.Context.on("init",function(i){i.master&&i.master.isMaster?t.Master=i.master:t.Master=new e}),t.Context.on("close",function(t){t.master&&t.master.isMaster&&t.master.dispose()}),t.Master}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(89),i(47)],void 0===(o=function(t){"use strict";return t.FrequencyEnvelope=function(){var e=t.defaults(arguments,["attack","decay","sustain","release"],t.Envelope);e=t.defaultArg(e,t.FrequencyEnvelope.defaults),t.ScaledEnvelope.call(this,e),this._octaves=e.octaves,this.baseFrequency=e.baseFrequency,this.octaves=e.octaves,this.exponent=e.exponent},t.extend(t.FrequencyEnvelope,t.Envelope),t.FrequencyEnvelope.defaults={baseFrequency:200,octaves:4,exponent:1},Object.defineProperty(t.FrequencyEnvelope.prototype,"baseFrequency",{get:function(){return this._scale.min},set:function(t){this._scale.min=this.toFrequency(t),this.octaves=this._octaves}}),Object.defineProperty(t.FrequencyEnvelope.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t,this._scale.max=this.baseFrequency*Math.pow(2,t)}}),Object.defineProperty(t.FrequencyEnvelope.prototype,"exponent",{get:function(){return this._exp.value},set:function(t){this._exp.value=t}}),t.FrequencyEnvelope.prototype.dispose=function(){return t.ScaledEnvelope.prototype.dispose.call(this),this},t.FrequencyEnvelope}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(26),i(61)],void 0===(o=function(t){return t.ScaleExp=function(e,i,n){t.SignalBase.call(this),this._scale=this.output=new t.Scale(e,i),this._exp=this.input=new t.Pow(t.defaultArg(n,2)),this._exp.connect(this._scale)},t.extend(t.ScaleExp,t.SignalBase),Object.defineProperty(t.ScaleExp.prototype,"exponent",{get:function(){return this._exp.value},set:function(t){this._exp.value=t}}),Object.defineProperty(t.ScaleExp.prototype,"min",{get:function(){return this._scale.min},set:function(t){this._scale.min=t}}),Object.defineProperty(t.ScaleExp.prototype,"max",{get:function(){return this._scale.max},set:function(t){this._scale.max=t}}),t.ScaleExp.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._scale.dispose(),this._scale=null,this._exp.dispose(),this._exp=null,this},t.ScaleExp}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(14),i(2)],void 0===(o=function(t){"use strict";return t.Compressor=function(){var e=t.defaults(arguments,["threshold","ratio"],t.Compressor);t.AudioNode.call(this),this._compressor=this.input=this.output=this.context.createDynamicsCompressor(),this.threshold=new t.Param({param:this._compressor.threshold,units:t.Type.Decibels,convert:!1}),this.attack=new t.Param(this._compressor.attack,t.Type.Time),this.release=new t.Param(this._compressor.release,t.Type.Time),this.knee=new t.Param({param:this._compressor.knee,units:t.Type.Decibels,convert:!1}),this.ratio=new t.Param({param:this._compressor.ratio,convert:!1}),this._readOnly(["knee","release","attack","ratio","threshold"]),this.set(e)},t.extend(t.Compressor,t.AudioNode),t.Compressor.defaults={ratio:12,threshold:-24,release:.25,attack:.003,knee:30},t.Compressor.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["knee","release","attack","ratio","threshold"]),this._compressor.disconnect(),this._compressor=null,this.attack.dispose(),this.attack=null,this.release.dispose(),this.release=null,this.threshold.dispose(),this.threshold=null,this.ratio.dispose(),this.ratio=null,this.knee.dispose(),this.knee=null,this},t.Compressor}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(2),i(96)],void 0===(o=function(t){"use strict";return t.Analyser=function(){var e=t.defaults(arguments,["type","size"],t.Analyser);t.AudioNode.call(this),this._analyser=this.input=this.output=this.context.createAnalyser(),this._type=e.type,this._buffer=null,this.size=e.size,this.type=e.type},t.extend(t.Analyser,t.AudioNode),t.Analyser.defaults={size:1024,type:"fft",smoothing:.8},t.Analyser.Type={Waveform:"waveform",FFT:"fft"},t.Analyser.prototype.getValue=function(){return this._type===t.Analyser.Type.FFT?this._analyser.getFloatFrequencyData(this._buffer):this._type===t.Analyser.Type.Waveform&&this._analyser.getFloatTimeDomainData(this._buffer),this._buffer},Object.defineProperty(t.Analyser.prototype,"size",{get:function(){return this._analyser.frequencyBinCount},set:function(t){this._analyser.fftSize=2*t,this._buffer=new Float32Array(t)}}),Object.defineProperty(t.Analyser.prototype,"type",{get:function(){return this._type},set:function(e){if(e!==t.Analyser.Type.Waveform&&e!==t.Analyser.Type.FFT)throw new TypeError("Tone.Analyser: invalid type: "+e);this._type=e}}),Object.defineProperty(t.Analyser.prototype,"smoothing",{get:function(){return this._analyser.smoothingTimeConstant},set:function(t){this._analyser.smoothingTimeConstant=t}}),t.Analyser.prototype.dispose=function(){t.AudioNode.prototype.dispose.call(this),this._analyser.disconnect(),this._analyser=null,this._buffer=null},t.Analyser}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(65)],void 0===(o=function(t){return t.TransportTime=function(e,i){if(!(this instanceof t.TransportTime))return new t.TransportTime(e,i);t.Time.call(this,e,i)},t.extend(t.TransportTime,t.Time),t.TransportTime.prototype._now=function(){return t.Transport.seconds},t.TransportTime}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(64)],void 0===(o=function(t){t.Frequency=function(e,i){if(!(this instanceof t.Frequency))return new t.Frequency(e,i);t.TimeBase.call(this,e,i)},t.extend(t.Frequency,t.TimeBase),t.Frequency.prototype._expressions=Object.assign({},t.TimeBase.prototype._expressions,{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method:function(e){return"midi"===this._defaultUnits?e:t.Frequency.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,method:function(i,n){var o=e[i.toLowerCase()]+12*(parseInt(n)+1);return"midi"===this._defaultUnits?o:t.Frequency.mtof(o)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method:function(t,e,i){var n=1;return t&&"0"!==t&&(n*=this._beatsToUnits(this._getTimeSignature()*parseFloat(t))),e&&"0"!==e&&(n*=this._beatsToUnits(parseFloat(e))),i&&"0"!==i&&(n*=this._beatsToUnits(parseFloat(i)/4)),n}}}),t.Frequency.prototype.transpose=function(e){return new this.constructor(this.valueOf()*t.intervalToFrequencyRatio(e))},t.Frequency.prototype.harmonize=function(t){return t.map(function(t){return this.transpose(t)}.bind(this))},t.Frequency.prototype.toMidi=function(){return t.Frequency.ftom(this.valueOf())},t.Frequency.prototype.toNote=function(){var e=this.toFrequency(),n=Math.log2(e/t.Frequency.A4),o=Math.round(12*n)+57,s=Math.floor(o/12);return s<0&&(o+=-12*s),i[o%12]+s.toString()},t.Frequency.prototype.toSeconds=function(){return 1/t.TimeBase.prototype.toSeconds.call(this)},t.Frequency.prototype.toFrequency=function(){return t.TimeBase.prototype.toFrequency.call(this)},t.Frequency.prototype.toTicks=function(){var e=this._beatsToUnits(1),i=this.valueOf()/e;return Math.floor(i*t.Transport.PPQ)},t.Frequency.prototype._noArg=function(){return 0},t.Frequency.prototype._frequencyToUnits=function(t){return t},t.Frequency.prototype._ticksToUnits=function(e){return 1/(60*e/(t.Transport.bpm.value*t.Transport.PPQ))},t.Frequency.prototype._beatsToUnits=function(e){return 1/t.TimeBase.prototype._beatsToUnits.call(this,e)},t.Frequency.prototype._secondsToUnits=function(t){return 1/t},t.Frequency.prototype._defaultUnits="hz";var e={cbb:-2,cb:-1,c:0,"c#":1,cx:2,dbb:0,db:1,d:2,"d#":3,dx:4,ebb:2,eb:3,e:4,"e#":5,ex:6,fbb:3,fb:4,f:5,"f#":6,fx:7,gbb:5,gb:6,g:7,"g#":8,gx:9,abb:7,ab:8,a:9,"a#":10,ax:11,bbb:9,bb:10,b:11,"b#":12,bx:13},i=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];return t.Frequency.A4=440,t.Frequency.mtof=function(e){return t.Frequency.A4*Math.pow(2,(e-69)/12)},t.Frequency.ftom=function(e){return 69+Math.round(12*Math.log2(e/t.Frequency.A4))},t.Frequency}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(61),i(4),i(2)],void 0===(o=function(t){"use strict";return t.Envelope=function(){var e=t.defaults(arguments,["attack","decay","sustain","release"],t.Envelope);t.AudioNode.call(this),this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this._attackCurve="linear",this._releaseCurve="exponential",this._sig=this.output=new t.Signal(0),this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve},t.extend(t.Envelope,t.AudioNode),t.Envelope.defaults={attack:.01,decay:.1,sustain:.5,release:1,attackCurve:"linear",decayCurve:"exponential",releaseCurve:"exponential"},Object.defineProperty(t.Envelope.prototype,"value",{get:function(){return this.getValueAtTime(this.now())}}),t.Envelope.prototype._getCurve=function(e,i){if(t.isString(e))return e;if(t.isArray(e)){for(var n in t.Envelope.Type)if(t.Envelope.Type[n][i]===e)return n;return e}},t.Envelope.prototype._setCurve=function(e,i,n){if(t.Envelope.Type.hasOwnProperty(n)){var o=t.Envelope.Type[n];t.isObject(o)?this[e]=o[i]:this[e]=o}else{if(!t.isArray(n))throw new Error("Tone.Envelope: invalid curve: "+n);this[e]=n}},Object.defineProperty(t.Envelope.prototype,"attackCurve",{get:function(){return this._getCurve(this._attackCurve,"In")},set:function(t){this._setCurve("_attackCurve","In",t)}}),Object.defineProperty(t.Envelope.prototype,"releaseCurve",{get:function(){return this._getCurve(this._releaseCurve,"Out")},set:function(t){this._setCurve("_releaseCurve","Out",t)}}),Object.defineProperty(t.Envelope.prototype,"decayCurve",{get:function(){return this._decayCurve},set:function(t){if(!["linear","exponential"].includes(t))throw new Error("Tone.Envelope: invalid curve: "+t);this._decayCurve=t}}),t.Envelope.prototype.triggerAttack=function(e,i){this.log("triggerAttack",e,i),e=this.toSeconds(e);var n=this.toSeconds(this.attack),o=this.toSeconds(this.decay);i=t.defaultArg(i,1);var s=this.getValueAtTime(e);s>0&&(n=(1-s)/(1/n));if("linear"===this._attackCurve)this._sig.linearRampTo(i,n,e);else if("exponential"===this._attackCurve)this._sig.targetRampTo(i,n,e);else if(n>0){this._sig.cancelAndHoldAtTime(e);for(var r=this._attackCurve,a=1;a<r.length;a++)if(r[a-1]<=s&&s<=r[a]){(r=this._attackCurve.slice(a))[0]=s;break}this._sig.setValueCurveAtTime(r,e,n,i)}if(o){var l=i*this.sustain,h=e+n;this.log("decay",h),"linear"===this._decayCurve?this._sig.linearRampTo(l,o,h+this.sampleTime):"exponential"===this._decayCurve&&this._sig.exponentialApproachValueAtTime(l,h,o)}return this},t.Envelope.prototype.triggerRelease=function(e){this.log("triggerRelease",e),e=this.toSeconds(e);var i=this.getValueAtTime(e);if(i>0){var n=this.toSeconds(this.release);if("linear"===this._releaseCurve)this._sig.linearRampTo(0,n,e);else if("exponential"===this._releaseCurve)this._sig.targetRampTo(0,n,e);else{var o=this._releaseCurve;t.isArray(o)&&(this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(o,e,n,i))}}return this},t.Envelope.prototype.getValueAtTime=function(t){return this._sig.getValueAtTime(t)},t.Envelope.prototype.triggerAttackRelease=function(t,e,i){return e=this.toSeconds(e),this.triggerAttack(e,i),this.triggerRelease(e+this.toSeconds(t)),this},t.Envelope.prototype.cancel=function(t){return this._sig.cancelScheduledValues(t),this},t.Envelope.prototype.connect=t.SignalBase.prototype.connect,function(){var e,i,n=[];for(e=0;e<128;e++)n[e]=Math.sin(e/127*(Math.PI/2));var o=[];for(e=0;e<127;e++){i=e/127;var s=Math.sin(i*(2*Math.PI)*6.4-Math.PI/2)+1;o[e]=s/10+.83*i}o[127]=1;var r=[];for(e=0;e<128;e++)r[e]=Math.ceil(e/127*5)/5;var a=[];for(e=0;e<128;e++)i=e/127,a[e]=.5*(1-Math.cos(Math.PI*i));var l,h=[];for(e=0;e<128;e++){i=e/127;var u=4*Math.pow(i,3)+.2,c=Math.cos(u*Math.PI*2*i);h[e]=Math.abs(c*(1-i))}function p(t){for(var e=new Array(t.length),i=0;i<t.length;i++)e[i]=1-t[i];return e}t.Envelope.Type={linear:"linear",exponential:"exponential",bounce:{In:p(h),Out:h},cosine:{In:n,Out:(l=n,l.slice(0).reverse())},step:{In:r,Out:p(r)},ripple:{In:o,Out:p(o)},sine:{In:a,Out:p(a)}}}(),t.Envelope.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._sig.dispose(),this._sig=null,this._attackCurve=null,this._releaseCurve=null,this},t.Envelope}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(6),i(17),i(5),i(3)],void 0===(o=function(t){"use strict";return t.FMOscillator=function(){var e=t.defaults(arguments,["frequency","type","modulationType"],t.FMOscillator);t.Source.call(this,e),this._carrier=new t.Oscillator(e.frequency,e.type),this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=this._carrier.detune,this.detune.value=e.detune,this.modulationIndex=new t.Multiply(e.modulationIndex),this.modulationIndex.units=t.Type.Positive,this._modulator=new t.Oscillator(e.frequency,e.modulationType),this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this._modulationNode=new t.Gain(0),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),this.phase=e.phase,this._readOnly(["modulationIndex","frequency","detune","harmonicity"])},t.extend(t.FMOscillator,t.Source),t.FMOscillator.defaults={frequency:440,detune:0,phase:0,type:"sine",modulationIndex:2,modulationType:"square",harmonicity:1},t.FMOscillator.prototype._start=function(t){this._modulator.start(t),this._carrier.start(t)},t.FMOscillator.prototype._stop=function(t){this._modulator.stop(t),this._carrier.stop(t)},t.FMOscillator.prototype.restart=function(t){this._modulator.restart(t),this._carrier.restart(t)},Object.defineProperty(t.FMOscillator.prototype,"type",{get:function(){return this._carrier.type},set:function(t){this._carrier.type=t}}),Object.defineProperty(t.FMOscillator.prototype,"baseType",{get:function(){return this._carrier.baseType},set:function(t){this._carrier.baseType=t}}),Object.defineProperty(t.FMOscillator.prototype,"partialCount",{get:function(){return this._carrier.partialCount},set:function(t){this._carrier.partialCount=t}}),Object.defineProperty(t.FMOscillator.prototype,"modulationType",{get:function(){return this._modulator.type},set:function(t){this._modulator.type=t}}),Object.defineProperty(t.FMOscillator.prototype,"phase",{get:function(){return this._carrier.phase},set:function(t){this._carrier.phase=t,this._modulator.phase=t}}),Object.defineProperty(t.FMOscillator.prototype,"partials",{get:function(){return this._carrier.partials},set:function(t){this._carrier.partials=t}}),t.FMOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._writable(["modulationIndex","frequency","detune","harmonicity"]),this.frequency.dispose(),this.frequency=null,this.detune=null,this.harmonicity.dispose(),this.harmonicity=null,this._carrier.dispose(),this._carrier=null,this._modulator.dispose(),this._modulator=null,this._modulationNode.dispose(),this._modulationNode=null,this.modulationIndex.dispose(),this.modulationIndex=null,this},t.FMOscillator}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(6),i(17),i(1),i(7),i(3)],void 0===(o=function(t){"use strict";return t.PulseOscillator=function(){var e=t.defaults(arguments,["frequency","width"],t.Oscillator);t.Source.call(this,e),this.width=new t.Signal(e.width,t.Type.NormalRange),this._widthGate=new t.Gain(0),this._sawtooth=new t.Oscillator({frequency:e.frequency,detune:e.detune,type:"sawtooth",phase:e.phase}),this.frequency=this._sawtooth.frequency,this.detune=this._sawtooth.detune,this._thresh=new t.WaveShaper(function(t){return t<0?-1:1}),this._sawtooth.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),this._readOnly(["width","frequency","detune"])},t.extend(t.PulseOscillator,t.Source),t.PulseOscillator.defaults={frequency:440,detune:0,phase:0,width:.2},t.PulseOscillator.prototype._start=function(t){t=this.toSeconds(t),this._sawtooth.start(t),this._widthGate.gain.setValueAtTime(1,t)},t.PulseOscillator.prototype._stop=function(t){t=this.toSeconds(t),this._sawtooth.stop(t),this._widthGate.gain.setValueAtTime(0,t)},t.PulseOscillator.prototype.restart=function(t){this._sawtooth.restart(t),this._widthGate.gain.cancelScheduledValues(t),this._widthGate.gain.setValueAtTime(1,t)},Object.defineProperty(t.PulseOscillator.prototype,"phase",{get:function(){return this._sawtooth.phase},set:function(t){this._sawtooth.phase=t}}),Object.defineProperty(t.PulseOscillator.prototype,"type",{get:function(){return"pulse"}}),Object.defineProperty(t.PulseOscillator.prototype,"baseType",{get:function(){return"pulse"}}),Object.defineProperty(t.PulseOscillator.prototype,"partials",{get:function(){return[]}}),t.PulseOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._sawtooth.dispose(),this._sawtooth=null,this._writable(["width","frequency","detune"]),this.width.dispose(),this.width=null,this._widthGate.dispose(),this._widthGate=null,this._thresh.dispose(),this._thresh=null,this.frequency=null,this.detune=null,this},t.PulseOscillator}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(16),i(4),i(33)],void 0===(o=function(t){"use strict";return t.Event=function(){var e=t.defaults(arguments,["callback","value"],t.Event);t.call(this),this._loop=e.loop,this.callback=e.callback,this.value=e.value,this._loopStart=this.toTicks(e.loopStart),this._loopEnd=this.toTicks(e.loopEnd),this._state=new t.TimelineState(t.State.Stopped),this._playbackRate=1,this._startOffset=0,this._probability=e.probability,this._humanize=e.humanize,this.mute=e.mute,this.playbackRate=e.playbackRate},t.extend(t.Event),t.Event.defaults={callback:t.noOp,loop:!1,loopEnd:"1m",loopStart:0,playbackRate:1,value:null,probability:1,mute:!1,humanize:!1},t.Event.prototype._rescheduleEvents=function(e){return e=t.defaultArg(e,-1),this._state.forEachFrom(e,function(e){var i;if(e.state===t.State.Started){t.isDefined(e.id)&&t.Transport.clear(e.id);var n=e.time+Math.round(this.startOffset/this._playbackRate);if(this._loop){i=1/0,t.isNumber(this._loop)&&(i=this._loop*this._getLoopDuration());var o=this._state.getAfter(n);null!==o&&(i=Math.min(i,o.time-n)),i!==1/0&&(this._state.setStateAtTime(t.State.Stopped,n+i+1),i=t.Ticks(i));var s=t.Ticks(this._getLoopDuration());e.id=t.Transport.scheduleRepeat(this._tick.bind(this),s,t.Ticks(n),i)}else e.id=t.Transport.schedule(this._tick.bind(this),t.Ticks(n))}}.bind(this)),this},Object.defineProperty(t.Event.prototype,"state",{get:function(){return this._state.getValueAtTime(t.Transport.ticks)}}),Object.defineProperty(t.Event.prototype,"startOffset",{get:function(){return this._startOffset},set:function(t){this._startOffset=t}}),Object.defineProperty(t.Event.prototype,"probability",{get:function(){return this._probability},set:function(t){this._probability=t}}),Object.defineProperty(t.Event.prototype,"humanize",{get:function(){return this._humanize},set:function(t){this._humanize=t}}),t.Event.prototype.start=function(e){return e=this.toTicks(e),this._state.getValueAtTime(e)===t.State.Stopped&&(this._state.add({state:t.State.Started,time:e,id:void 0}),this._rescheduleEvents(e)),this},t.Event.prototype.stop=function(e){if(this.cancel(e),e=this.toTicks(e),this._state.getValueAtTime(e)===t.State.Started){this._state.setStateAtTime(t.State.Stopped,e);var i=this._state.getBefore(e),n=e;null!==i&&(n=i.time),this._rescheduleEvents(n)}return this},t.Event.prototype.cancel=function(e){return e=t.defaultArg(e,-1/0),e=this.toTicks(e),this._state.forEachFrom(e,function(e){t.Transport.clear(e.id)}),this._state.cancel(e),this},t.Event.prototype._tick=function(e){var i=t.Transport.getTicksAtTime(e);if(!this.mute&&this._state.getValueAtTime(i)===t.State.Started){if(this.probability<1&&Math.random()>this.probability)return;if(this.humanize){var n=.02;t.isBoolean(this.humanize)||(n=this.toSeconds(this.humanize)),e+=(2*Math.random()-1)*n}this.callback(e,this.value)}},t.Event.prototype._getLoopDuration=function(){return Math.round((this._loopEnd-this._loopStart)/this._playbackRate)},Object.defineProperty(t.Event.prototype,"loop",{get:function(){return this._loop},set:function(t){this._loop=t,this._rescheduleEvents()}}),Object.defineProperty(t.Event.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this._rescheduleEvents()}}),Object.defineProperty(t.Event.prototype,"loopEnd",{get:function(){return t.Ticks(this._loopEnd).toSeconds()},set:function(t){this._loopEnd=this.toTicks(t),this._loop&&this._rescheduleEvents()}}),Object.defineProperty(t.Event.prototype,"loopStart",{get:function(){return t.Ticks(this._loopStart).toSeconds()},set:function(t){this._loopStart=this.toTicks(t),this._loop&&this._rescheduleEvents()}}),Object.defineProperty(t.Event.prototype,"progress",{get:function(){if(this._loop){var e=t.Transport.ticks,i=this._state.get(e);if(null!==i&&i.state===t.State.Started){var n=this._getLoopDuration();return(e-i.time)%n/n}return 0}return 0}}),t.Event.prototype.dispose=function(){this.cancel(),this._state.dispose(),this._state=null,this.callback=null,this.value=null},t.Event}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(13),i(29),i(10),i(3),i(2)],void 0===(o=function(t){"use strict";return t.MidSideMerge=function(){t.AudioNode.call(this),this.createInsOuts(2,0),this.mid=this.input[0]=new t.Gain,this._left=new t.Add,this._timesTwoLeft=new t.Multiply(Math.SQRT1_2),this.side=this.input[1]=new t.Gain,this._right=new t.Subtract,this._timesTwoRight=new t.Multiply(Math.SQRT1_2),this._merge=this.output=new t.Merge,this.mid.connect(this._left,0,0),this.side.connect(this._left,0,1),this.mid.connect(this._right,0,0),this.side.connect(this._right,0,1),this._left.connect(this._timesTwoLeft),this._right.connect(this._timesTwoRight),this._timesTwoLeft.connect(this._merge,0,0),this._timesTwoRight.connect(this._merge,0,1)},t.extend(t.MidSideMerge,t.AudioNode),t.MidSideMerge.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this.mid.dispose(),this.mid=null,this.side.dispose(),this.side=null,this._left.dispose(),this._left=null,this._timesTwoLeft.dispose(),this._timesTwoLeft=null,this._right.dispose(),this._right=null,this._timesTwoRight.dispose(),this._timesTwoRight=null,this._merge.dispose(),this._merge=null,this},t.MidSideMerge}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(29),i(13),i(1),i(19),i(2)],void 0===(o=function(t){"use strict";return t.MidSideSplit=function(){t.AudioNode.call(this),this.createInsOuts(0,2),this._split=this.input=new t.Split,this._midAdd=new t.Add,this.mid=this.output[0]=new t.Multiply(Math.SQRT1_2),this._sideSubtract=new t.Subtract,this.side=this.output[1]=new t.Multiply(Math.SQRT1_2),this._split.connect(this._midAdd,0,0),this._split.connect(this._midAdd,1,1),this._split.connect(this._sideSubtract,0,0),this._split.connect(this._sideSubtract,1,1),this._midAdd.connect(this.mid),this._sideSubtract.connect(this.side)},t.extend(t.MidSideSplit,t.AudioNode),t.MidSideSplit.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this.mid.dispose(),this.mid=null,this.side.dispose(),this.side=null,this._midAdd.dispose(),this._midAdd=null,this._sideSubtract.dispose(),this._sideSubtract=null,this._split.dispose(),this._split=null,this},t.MidSideSplit}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(9),i(2),i(58)],void 0===(o=function(t){"use strict";return t.LowpassCombFilter=function(){var e=t.defaults(arguments,["delayTime","resonance","dampening"],t.LowpassCombFilter);t.AudioNode.call(this),this._combFilter=this.output=new t.FeedbackCombFilter(e.delayTime,e.resonance),this.delayTime=this._combFilter.delayTime,this._lowpass=this.input=new t.Filter({frequency:e.dampening,type:"lowpass",Q:0,rolloff:-12}),this.dampening=this._lowpass.frequency,this.resonance=this._combFilter.resonance,this._lowpass.connect(this._combFilter),this._readOnly(["dampening","resonance","delayTime"])},t.extend(t.LowpassCombFilter,t.AudioNode),t.LowpassCombFilter.defaults={delayTime:.1,resonance:.5,dampening:3e3},t.LowpassCombFilter.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["dampening","resonance","delayTime"]),this._combFilter.dispose(),this._combFilter=null,this.resonance=null,this.delayTime=null,this._lowpass.dispose(),this._lowpass=null,this.dampening=null,this},t.LowpassCombFilter}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(45)],void 0===(o=function(t){return t.Ticks=function(e,i){if(!(this instanceof t.Ticks))return new t.Ticks(e,i);t.TransportTime.call(this,e,i)},t.extend(t.Ticks,t.TransportTime),t.Ticks.prototype._defaultUnits="i",t.Ticks.prototype._now=function(){return t.Transport.ticks},t.Ticks.prototype._beatsToUnits=function(t){return this._getPPQ()*t},t.Ticks.prototype._secondsToUnits=function(t){return Math.floor(t/(60/this._getBpm())*this._getPPQ())},t.Ticks.prototype._ticksToUnits=function(t){return t},t.Ticks.prototype.toTicks=function(){return this.valueOf()},t.Ticks.prototype.toSeconds=function(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())},t.Ticks}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(54)],void 0===(o=function(t){return t.TransportEvent=function(e,i){i=t.defaultArg(i,t.TransportEvent.defaults),t.call(this),this.Transport=e,this.id=t.TransportEvent._eventId++,this.time=t.Ticks(i.time),this.callback=i.callback,this._once=i.once},t.extend(t.TransportEvent),t.TransportEvent.defaults={once:!1,callback:t.noOp},t.TransportEvent._eventId=0,t.TransportEvent.prototype.invoke=function(t){this.callback&&(this.callback(t),this._once&&this.Transport&&this.Transport.clear(this.id))},t.TransportEvent.prototype.dispose=function(){return t.prototype.dispose.call(this),this.Transport=null,this.callback=null,this.time=null,this},t.TransportEvent}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(85),i(33),i(24),i(14)],void 0===(o=function(t){"use strict";return t.TickSource=function(){var e=t.defaults(arguments,["frequency"],t.TickSource);this.frequency=new t.TickSignal(e.frequency),this._readOnly("frequency"),this._state=new t.TimelineState(t.State.Stopped),this._state.setStateAtTime(t.State.Stopped,0),this._tickOffset=new t.Timeline,this.setTicksAtTime(0,0)},t.extend(t.TickSource),t.TickSource.defaults={frequency:1},Object.defineProperty(t.TickSource.prototype,"state",{get:function(){return this._state.getValueAtTime(this.now())}}),t.TickSource.prototype.start=function(e,i){return e=this.toSeconds(e),this._state.getValueAtTime(e)!==t.State.Started&&(this._state.setStateAtTime(t.State.Started,e),t.isDefined(i)&&this.setTicksAtTime(i,e)),this},t.TickSource.prototype.stop=function(e){if(e=this.toSeconds(e),this._state.getValueAtTime(e)===t.State.Stopped){var i=this._state.get(e);i.time>0&&(this._tickOffset.cancel(i.time),this._state.cancel(i.time))}return this._state.cancel(e),this._state.setStateAtTime(t.State.Stopped,e),this.setTicksAtTime(0,e),this},t.TickSource.prototype.pause=function(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)===t.State.Started&&this._state.setStateAtTime(t.State.Paused,e),this},t.TickSource.prototype.cancel=function(t){return t=this.toSeconds(t),this._state.cancel(t),this._tickOffset.cancel(t),this},t.TickSource.prototype.getTicksAtTime=function(e){e=this.toSeconds(e);var i=this._state.getLastState(t.State.Stopped,e),n={state:t.State.Paused,time:e};this._state.add(n);var o=i,s=0;return this._state.forEachBetween(i.time,e+this.sampleTime,function(e){var i=o.time,n=this._tickOffset.get(e.time);n.time>=o.time&&(s=n.ticks,i=n.time),o.state===t.State.Started&&e.state!==t.State.Started&&(s+=this.frequency.getTicksAtTime(e.time)-this.frequency.getTicksAtTime(i)),o=e}.bind(this)),this._state.remove(n),s},Object.defineProperty(t.TickSource.prototype,"ticks",{get:function(){return this.getTicksAtTime(this.now())},set:function(t){this.setTicksAtTime(t,this.now())}}),Object.defineProperty(t.TickSource.prototype,"seconds",{get:function(){return this.getSecondsAtTime(this.now())},set:function(t){var e=this.now(),i=this.frequency.timeToTicks(t,e);this.setTicksAtTime(i,e)}}),t.TickSource.prototype.getSecondsAtTime=function(e){e=this.toSeconds(e);var i=this._state.getLastState(t.State.Stopped,e),n={state:t.State.Paused,time:e};this._state.add(n);var o=i,s=0;return this._state.forEachBetween(i.time,e+this.sampleTime,function(e){var i=o.time,n=this._tickOffset.get(e.time);n.time>=o.time&&(s=n.seconds,i=n.time),o.state===t.State.Started&&e.state!==t.State.Started&&(s+=e.time-i),o=e}.bind(this)),this._state.remove(n),s},t.TickSource.prototype.setTicksAtTime=function(t,e){return e=this.toSeconds(e),this._tickOffset.cancel(e),this._tickOffset.add({time:e,ticks:t,seconds:this.frequency.getDurationOfTicks(t,e)}),this},t.TickSource.prototype.getStateAtTime=function(t){return t=this.toSeconds(t),this._state.getValueAtTime(t)},t.TickSource.prototype.getTimeOfTick=function(e,i){i=t.defaultArg(i,this.now());var n=this._tickOffset.get(i),o=this._state.get(i),s=Math.max(n.time,o.time),r=this.frequency.getTicksAtTime(s)+e-n.ticks;return this.frequency.getTimeOfTick(r)},t.TickSource.prototype.forEachTickBetween=function(e,i,n){var o=this._state.get(e);if(this._state.forEachBetween(e,i,function(i){o.state===t.State.Started&&i.state!==t.State.Started&&this.forEachTickBetween(Math.max(o.time,e),i.time-this.sampleTime,n),o=i}.bind(this)),e=Math.max(o.time,e),o.state===t.State.Started&&this._state){var s=this.frequency.getTicksAtTime(e),r=(s-this.frequency.getTicksAtTime(o.time))%1;0!==r&&(r=1-r);for(var a=this.frequency.getTimeOfTick(s+r),l=null;a<i&&this._state;){try{n(a,Math.round(this.getTicksAtTime(a)))}catch(t){l=t;break}this._state&&(a+=this.frequency.getDurationOfTicks(1,a))}}if(l)throw l;return this},t.TickSource.prototype.dispose=function(){return t.Param.prototype.dispose.call(this),this._state.dispose(),this._state=null,this._tickOffset.dispose(),this._tickOffset=null,this._writable("frequency"),this.frequency.dispose(),this.frequency=null,this},t.TickSource}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(90),i(13),i(1),i(4),i(18),i(2)],void 0===(o=function(t){"use strict";return t.Follower=function(){var e=t.defaults(arguments,["smoothing"],t.Follower);t.AudioNode.call(this),this.createInsOuts(1,1),this._abs=new t.Abs,this._filter=this.context.createBiquadFilter(),this._filter.type="lowpass",this._filter.frequency.value=0,this._filter.Q.value=0,this._sub=new t.Subtract,this._delay=new t.Delay(this.blockTime),this._smoothing=e.smoothing,this.input.connect(this._delay,this._sub),this.input.connect(this._sub,0,1),this._sub.chain(this._abs,this._filter,this.output),this.smoothing=e.smoothing},t.extend(t.Follower,t.AudioNode),t.Follower.defaults={smoothing:.05},Object.defineProperty(t.Follower.prototype,"smoothing",{get:function(){return this._smoothing},set:function(e){this._smoothing=e,this._filter.frequency.value=.5*t.Time(e).toFrequency()}}),t.Follower.prototype.connect=t.SignalBase.prototype.connect,t.Follower.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._filter.disconnect(),this._filter=null,this._delay.dispose(),this._delay=null,this._sub.disconnect(),this._sub=null,this._abs.dispose(),this._abs=null,this},t.Follower}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(42),i(1),i(14),i(18),i(3),i(2)],void 0===(o=function(t){"use strict";return t.FeedbackCombFilter=function(){var e=t.defaults(arguments,["delayTime","resonance"],t.FeedbackCombFilter);t.AudioNode.call(this),this._delay=this.input=this.output=new t.Delay(e.delayTime),this.delayTime=this._delay.delayTime,this._feedback=new t.Gain(e.resonance,t.Type.NormalRange),this.resonance=this._feedback.gain,this._delay.chain(this._feedback,this._delay),this._readOnly(["resonance","delayTime"])},t.extend(t.FeedbackCombFilter,t.AudioNode),t.FeedbackCombFilter.defaults={delayTime:.1,resonance:.5},t.FeedbackCombFilter.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["resonance","delayTime"]),this._delay.dispose(),this._delay=null,this.delayTime=null,this._feedback.dispose(),this._feedback=null,this.resonance=null,this},t.FeedbackCombFilter}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(9),i(1),i(3),i(2)],void 0===(o=function(t){"use strict";return t.MultibandSplit=function(){var e=t.defaults(arguments,["lowFrequency","highFrequency"],t.MultibandSplit);t.AudioNode.call(this),this.input=new t.Gain,this.output=new Array(3),this.low=this.output[0]=new t.Filter(0,"lowpass"),this._lowMidFilter=new t.Filter(0,"highpass"),this.mid=this.output[1]=new t.Filter(0,"lowpass"),this.high=this.output[2]=new t.Filter(0,"highpass"),this.lowFrequency=new t.Signal(e.lowFrequency,t.Type.Frequency),this.highFrequency=new t.Signal(e.highFrequency,t.Type.Frequency),this.Q=new t.Signal(e.Q),this.input.fan(this.low,this.high),this.input.chain(this._lowMidFilter,this.mid),this.lowFrequency.connect(this.low.frequency),this.lowFrequency.connect(this._lowMidFilter.frequency),this.highFrequency.connect(this.mid.frequency),this.highFrequency.connect(this.high.frequency),this.Q.connect(this.low.Q),this.Q.connect(this._lowMidFilter.Q),this.Q.connect(this.mid.Q),this.Q.connect(this.high.Q),this._readOnly(["high","mid","low","highFrequency","lowFrequency"])},t.extend(t.MultibandSplit,t.AudioNode),t.MultibandSplit.defaults={lowFrequency:400,highFrequency:2500,Q:1},t.MultibandSplit.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["high","mid","low","highFrequency","lowFrequency"]),this.low.dispose(),this.low=null,this._lowMidFilter.dispose(),this._lowMidFilter=null,this.mid.dispose(),this.mid=null,this.high.dispose(),this.high=null,this.lowFrequency.dispose(),this.lowFrequency=null,this.highFrequency.dispose(),this.highFrequency=null,this.Q.dispose(),this.Q=null,this},t.MultibandSplit}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(23),i(10),i(19),i(92),i(1),i(22),i(28),i(2)],void 0===(o=function(t){"use strict";return t.Panner=function(e){t.AudioNode.call(this),this._panner=this.input=this.output=this.context.createStereoPanner(),this.pan=this._panner.pan,this.pan.value=t.defaultArg(e,0),this._readOnly("pan")},t.extend(t.Panner,t.AudioNode),t.Panner.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable("pan"),this._panner.disconnect(),this._panner=null,this.pan=null,this},t.Panner}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(7)],void 0===(o=function(t){"use strict";return t.Pow=function(e){t.SignalBase.call(this),this._exp=t.defaultArg(e,1),this._expScaler=this.input=this.output=new t.WaveShaper(this._expFunc(this._exp),8192)},t.extend(t.Pow,t.SignalBase),Object.defineProperty(t.Pow.prototype,"value",{get:function(){return this._exp},set:function(t){this._exp=t,this._expScaler.setMap(this._expFunc(this._exp))}}),t.Pow.prototype._expFunc=function(t){return function(e){return Math.pow(Math.abs(e),t)}},t.Pow.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._expScaler.dispose(),this._expScaler=null,this},t.Pow}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(20),i(66)],void 0===(o=function(t){return t.OfflineContext=function(e,i,n){var o=new OfflineAudioContext(e,i*n,n);t.Context.call(this,{context:o,clockSource:"offline",lookAhead:0,updateInterval:128/n}),this._duration=i,this._currentTime=0},t.extend(t.OfflineContext,t.Context),t.OfflineContext.prototype.now=function(){return this._currentTime},t.OfflineContext.prototype.resume=function(){return Promise.resolve()},t.OfflineContext.prototype.render=function(){for(;this._duration-this._currentTime>=0;)this.emit("tick"),this._currentTime+=this.blockTime;return this._context.startRendering()},t.OfflineContext.prototype.close=function(){return this._context=null,Promise.resolve()},t.OfflineContext}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(62)],void 0===(o=function(t){if(t.supported){var e=navigator.userAgent.toLowerCase();e.includes("safari")&&!e.includes("chrome")&&e.includes("mobile")&&(t.OfflineContext.prototype.createBufferSource=function(){var t=this._context.createBufferSource(),e=t.start;return t.start=function(i){this.setTimeout(function(){e.call(t,i)}.bind(this),0)}.bind(this),t})}}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0)],void 0===(o=function(t){return t.TimeBase=function(e,i){if(!(this instanceof t.TimeBase))return new t.TimeBase(e,i);if(this._val=e,this._units=i,t.isUndef(this._units)&&t.isString(this._val)&&parseFloat(this._val)==this._val&&"+"!==this._val.charAt(0))this._val=parseFloat(this._val),this._units=this._defaultUnits;else if(e&&e.constructor===this.constructor)this._val=e._val,this._units=e._units;else if(e instanceof t.TimeBase)switch(this._defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break;default:throw new Error("Unrecognized default units "+this._defaultUnits)}},t.extend(t.TimeBase),t.TimeBase.prototype._expressions={n:{regexp:/^(\d+)n(\.?)$/i,method:function(t,e){t=parseInt(t);var i="."===e?1.5:1;return 1===t?this._beatsToUnits(this._getTimeSignature())*i:this._beatsToUnits(4/t)*i}},t:{regexp:/^(\d+)t$/i,method:function(t){return t=parseInt(t),this._beatsToUnits(8/(3*parseInt(t)))}},m:{regexp:/^(\d+)m$/i,method:function(t){return this._beatsToUnits(parseInt(t)*this._getTimeSignature())}},i:{regexp:/^(\d+)i$/i,method:function(t){return this._ticksToUnits(parseInt(t))}},hz:{regexp:/^(\d+(?:\.\d+)?)hz$/i,method:function(t){return this._frequencyToUnits(parseFloat(t))}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/,method:function(t,e,i){var n=0;return t&&"0"!==t&&(n+=this._beatsToUnits(this._getTimeSignature()*parseFloat(t))),e&&"0"!==e&&(n+=this._beatsToUnits(parseFloat(e))),i&&"0"!==i&&(n+=this._beatsToUnits(parseFloat(i)/4)),n}},s:{regexp:/^(\d+(?:\.\d+)?)s$/,method:function(t){return this._secondsToUnits(parseFloat(t))}},samples:{regexp:/^(\d+)samples$/,method:function(t){return parseInt(t)/this.context.sampleRate}},default:{regexp:/^(\d+(?:\.\d+)?)$/,method:function(t){return this._expressions[this._defaultUnits].method.call(this,t)}}},t.TimeBase.prototype._defaultUnits="s",t.TimeBase.prototype._getBpm=function(){return t.Transport?t.Transport.bpm.value:120},t.TimeBase.prototype._getTimeSignature=function(){return t.Transport?t.Transport.timeSignature:4},t.TimeBase.prototype._getPPQ=function(){return t.Transport?t.Transport.PPQ:192},t.TimeBase.prototype._now=function(){return this.now()},t.TimeBase.prototype._frequencyToUnits=function(t){return 1/t},t.TimeBase.prototype._beatsToUnits=function(t){return 60/this._getBpm()*t},t.TimeBase.prototype._secondsToUnits=function(t){return t},t.TimeBase.prototype._ticksToUnits=function(t){return t*(this._beatsToUnits(1)/this._getPPQ())},t.TimeBase.prototype._noArg=function(){return this._now()},t.TimeBase.prototype.valueOf=function(){if(t.isUndef(this._val))return this._noArg();if(t.isString(this._val)&&t.isUndef(this._units)){for(var e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(t.isObject(this._val)){var i=0;for(var n in this._val){var o=this._val[n];i+=new this.constructor(n).valueOf()*o}return i}if(t.isDefined(this._units)){var s=this._expressions[this._units],r=this._val.toString().trim().match(s.regexp);return r?s.method.apply(this,r.slice(1)):s.method.call(this,parseFloat(this._val))}return this._val},t.TimeBase.prototype.toSeconds=function(){return this.valueOf()},t.TimeBase.prototype.toFrequency=function(){return 1/this.toSeconds()},t.TimeBase.prototype.toSamples=function(){return this.toSeconds()*this.context.sampleRate},t.TimeBase.prototype.toMilliseconds=function(){return 1e3*this.toSeconds()},t.TimeBase.prototype.dispose=function(){this._val=null,this._units=null},t.TimeBase}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(64),i(46)],void 0===(o=function(t){return t.Time=function(e,i){if(!(this instanceof t.Time))return new t.Time(e,i);t.TimeBase.call(this,e,i)},t.extend(t.Time,t.TimeBase),t.Time.prototype._expressions=Object.assign({},t.TimeBase.prototype._expressions,{quantize:{regexp:/^@(.+)/,method:function(e){if(t.Transport){var i=new this.constructor(e);return this._secondsToUnits(t.Transport.nextSubdivision(i))}return 0}},now:{regexp:/^\+(.+)/,method:function(t){return this._now()+new this.constructor(t)}}}),t.Time.prototype.quantize=function(e,i){i=t.defaultArg(i,1);var n=new this.constructor(e),o=this.valueOf();return o+(Math.round(o/n)*n-o)*i},t.Time.prototype.toNotation=function(){for(var e=this.toSeconds(),i=["1m"],n=1;n<8;n++){var o=Math.pow(2,n);i.push(o+"n."),i.push(o+"n"),i.push(o+"t")}i.push("0");var s=i[0],r=t.Time(i[0]).toSeconds();return i.forEach(function(i){var n=t.Time(i).toSeconds();Math.abs(n-e)<Math.abs(r-e)&&(s=i,r=n)}),s},t.Time.prototype.toBarsBeatsSixteenths=function(){var t=this._beatsToUnits(1),e=this.valueOf()/t;e=parseFloat(e.toFixed(4));var i=Math.floor(e/this._getTimeSignature()),n=e%1*4;return e=Math.floor(e)%this._getTimeSignature(),(n=n.toString()).length>3&&(n=parseFloat(parseFloat(n).toFixed(3))),[i,e,n].join(":")},t.Time.prototype.toTicks=function(){var t=this._beatsToUnits(1),e=this.valueOf()/t;return Math.round(e*this._getPPQ())},t.Time.prototype.toSeconds=function(){return this.valueOf()},t.Time.prototype.toMidi=function(){return t.Frequency.ftom(this.toFrequency())},t.Time}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0)],void 0===(o=function(t){if(t.supported){!t.global.hasOwnProperty("OfflineAudioContext")&&t.global.hasOwnProperty("webkitOfflineAudioContext")&&(t.global.OfflineAudioContext=t.global.webkitOfflineAudioContext);var e=new OfflineAudioContext(1,1,44100).startRendering();e&&t.isFunction(e.then)||(OfflineAudioContext.prototype._native_startRendering=OfflineAudioContext.prototype.startRendering,OfflineAudioContext.prototype.startRendering=function(){return new Promise(function(t){this.oncomplete=function(e){t(e.renderedBuffer)},this._native_startRendering()}.bind(this))})}}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(11),i(6),i(56),i(31)],void 0===(o=function(t){"use strict";return t.Player=function(e){var i;e instanceof t.Buffer&&e.loaded?(e=e.get(),i=t.Player.defaults):i=t.defaults(arguments,["url","onload"],t.Player),t.Source.call(this,i),this.autostart=i.autostart,this._buffer=new t.Buffer({url:i.url,onload:this._onload.bind(this,i.onload),reverse:i.reverse}),e instanceof AudioBuffer&&this._buffer.set(e),this._loop=i.loop,this._loopStart=i.loopStart,this._loopEnd=i.loopEnd,this._playbackRate=i.playbackRate,this._activeSources=[],this.fadeIn=i.fadeIn,this.fadeOut=i.fadeOut},t.extend(t.Player,t.Source),t.Player.defaults={onload:t.noOp,playbackRate:1,loop:!1,autostart:!1,loopStart:0,loopEnd:0,reverse:!1,fadeIn:0,fadeOut:0},t.Player.prototype.load=function(t,e){return this._buffer.load(t,this._onload.bind(this,e))},t.Player.prototype._onload=function(e){(e=t.defaultArg(e,t.noOp))(this),this.autostart&&this.start()},t.Player.prototype._onSourceEnd=function(e){var i=this._activeSources.indexOf(e);this._activeSources.splice(i,1),0!==this._activeSources.length||this._synced||this._state.setStateAtTime(t.State.Stopped,t.now())},t.Player.prototype._start=function(e,i,n){i=this._loop?t.defaultArg(i,this._loopStart):t.defaultArg(i,0),i=this.toSeconds(i);var o=t.defaultArg(n,Math.max(this._buffer.duration-i,0));o=this.toSeconds(o),o/=this._playbackRate,e=this.toSeconds(e);var s=new t.BufferSource({buffer:this._buffer,loop:this._loop,loopStart:this._loopStart,loopEnd:this._loopEnd,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate,fadeIn:this.fadeIn,fadeOut:this.fadeOut}).connect(this.output);return this._loop||this._synced||this._state.setStateAtTime(t.State.Stopped,e+o),this._activeSources.push(s),this._loop&&t.isUndef(n)?s.start(e,i):s.start(e,i,o-this.toSeconds(this.fadeOut)),this},t.Player.prototype._stop=function(t){return t=this.toSeconds(t),this._activeSources.forEach(function(e){e.stop(t)}),this},t.Player.prototype.restart=function(t,e,i){return this._stop(t),this._start(t,e,i),this},t.Player.prototype.seek=function(e,i){return i=this.toSeconds(i),this._state.getValueAtTime(i)===t.State.Started&&(e=this.toSeconds(e),this._stop(i),this._start(i,e)),this},t.Player.prototype.setLoopPoints=function(t,e){return this.loopStart=t,this.loopEnd=e,this},Object.defineProperty(t.Player.prototype,"loopStart",{get:function(){return this._loopStart},set:function(t){this._loopStart=t,this._activeSources.forEach(function(e){e.loopStart=t})}}),Object.defineProperty(t.Player.prototype,"loopEnd",{get:function(){return this._loopEnd},set:function(t){this._loopEnd=t,this._activeSources.forEach(function(e){e.loopEnd=t})}}),Object.defineProperty(t.Player.prototype,"buffer",{get:function(){return this._buffer},set:function(t){this._buffer.set(t)}}),Object.defineProperty(t.Player.prototype,"loop",{get:function(){return this._loop},set:function(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(function(t){t.loop=e}),e)){var i=this._state.getNextState(t.State.Stopped,this.now());i&&this._state.cancel(i.time)}}}),Object.defineProperty(t.Player.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(e){this._playbackRate=e;var i=this.now(),n=this._state.getNextState(t.State.Stopped,i);n&&this._state.cancel(n.time),this._activeSources.forEach(function(t){t.cancelStop(),t.playbackRate.setValueAtTime(e,i)})}}),Object.defineProperty(t.Player.prototype,"reverse",{get:function(){return this._buffer.reverse},set:function(t){this._buffer.reverse=t}}),Object.defineProperty(t.Player.prototype,"loaded",{get:function(){return this._buffer.loaded}}),t.Player.prototype.dispose=function(){return this._activeSources.forEach(function(t){t.dispose()}),this._activeSources=null,t.Source.prototype.dispose.call(this),this._buffer.dispose(),this._buffer=null,this},t.Player}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(30),i(41),i(37),i(1),i(9),i(25)],void 0===(o=function(t){"use strict";return t.MonoSynth=function(e){e=t.defaultArg(e,t.MonoSynth.defaults),t.Monophonic.call(this,e),this.oscillator=new t.OmniOscillator(e.oscillator),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.filter=new t.Filter(e.filter),this.filter.frequency.value=5e3,this.filterEnvelope=new t.FrequencyEnvelope(e.filterEnvelope),this.envelope=new t.AmplitudeEnvelope(e.envelope),this.oscillator.chain(this.filter,this.envelope,this.output),this.filterEnvelope.connect(this.filter.frequency),this._readOnly(["oscillator","frequency","detune","filter","filterEnvelope","envelope"])},t.extend(t.MonoSynth,t.Monophonic),t.MonoSynth.defaults={frequency:"C4",detune:0,oscillator:{type:"square"},filter:{Q:6,type:"lowpass",rolloff:-24},envelope:{attack:.005,decay:.1,sustain:.9,release:1},filterEnvelope:{attack:.06,decay:.2,sustain:.5,release:2,baseFrequency:200,octaves:7,exponent:2}},t.MonoSynth.prototype._triggerEnvelopeAttack=function(t,e){return t=this.toSeconds(t),this.envelope.triggerAttack(t,e),this.filterEnvelope.triggerAttack(t),this.oscillator.start(t),0===this.envelope.sustain&&this.oscillator.stop(t+this.envelope.attack+this.envelope.decay),this},t.MonoSynth.prototype._triggerEnvelopeRelease=function(t){return this.envelope.triggerRelease(t),this.filterEnvelope.triggerRelease(t),this.oscillator.stop(t+this.envelope.release),this},t.MonoSynth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["oscillator","frequency","detune","filter","filterEnvelope","envelope"]),this.oscillator.dispose(),this.oscillator=null,this.envelope.dispose(),this.envelope=null,this.filterEnvelope.dispose(),this.filterEnvelope=null,this.filter.dispose(),this.filter=null,this.frequency=null,this.detune=null,this},t.MonoSynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(6),i(17),i(5),i(3)],void 0===(o=function(t){"use strict";return t.FatOscillator=function(){var e=t.defaults(arguments,["frequency","type","spread"],t.FatOscillator);t.Source.call(this,e),this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this._oscillators=[],this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,this._readOnly(["frequency","detune"])},t.extend(t.FatOscillator,t.Source),t.FatOscillator.defaults={frequency:440,detune:0,phase:0,spread:20,count:3,type:"sawtooth",partials:[],partialCount:0},t.FatOscillator.prototype._start=function(t){t=this.toSeconds(t),this._forEach(function(e){e.start(t)})},t.FatOscillator.prototype._stop=function(t){t=this.toSeconds(t),this._forEach(function(e){e.stop(t)})},t.FatOscillator.prototype.restart=function(t){t=this.toSeconds(t),this._forEach(function(e){e.restart(t)})},t.FatOscillator.prototype._forEach=function(t){for(var e=0;e<this._oscillators.length;e++)t.call(this,this._oscillators[e],e)},Object.defineProperty(t.FatOscillator.prototype,"type",{get:function(){return this._type},set:function(t){this._type=t,this._forEach(function(e){e.type=t})}}),Object.defineProperty(t.FatOscillator.prototype,"spread",{get:function(){return this._spread},set:function(t){if(this._spread=t,this._oscillators.length>1){var e=-t/2,i=t/(this._oscillators.length-1);this._forEach(function(t,n){t.detune.value=e+i*n})}}}),Object.defineProperty(t.FatOscillator.prototype,"count",{get:function(){return this._oscillators.length},set:function(e){if(e=Math.max(e,1),this._oscillators.length!==e){this._forEach(function(t){t.dispose()}),this._oscillators=[];for(var i=0;i<e;i++){var n=new t.Oscillator;this.type===t.Oscillator.Type.Custom?n.partials=this._partials:n.type=this._type,n.partialCount=this._partialCount,n.phase=this._phase+i/e*360,n.volume.value=-6-1.1*e,this.frequency.connect(n.frequency),this.detune.connect(n.detune),n.connect(this.output),this._oscillators[i]=n}this.spread=this._spread,this.state===t.State.Started&&this._forEach(function(t){t.start()})}}}),Object.defineProperty(t.FatOscillator.prototype,"phase",{get:function(){return this._phase},set:function(t){this._phase=t,this._forEach(function(e){e.phase=t})}}),Object.defineProperty(t.FatOscillator.prototype,"baseType",{get:function(){return this._oscillators[0].baseType},set:function(t){this._forEach(function(e){e.baseType=t}),this._type=this._oscillators[0].type}}),Object.defineProperty(t.FatOscillator.prototype,"partials",{get:function(){return this._oscillators[0].partials},set:function(e){this._partials=e,this._type=t.Oscillator.Type.Custom,this._forEach(function(t){t.partials=e})}}),Object.defineProperty(t.FatOscillator.prototype,"partialCount",{get:function(){return this._oscillators[0].partialCount},set:function(t){this._partialCount=t,this._forEach(function(e){e.partialCount=t}),this._type=this._oscillators[0].type}}),t.FatOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._writable(["frequency","detune"]),this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this._forEach(function(t){t.dispose()}),this._oscillators=null,this._partials=null,this},t.FatOscillator}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(6),i(17),i(5),i(3),i(22)],void 0===(o=function(t){"use strict";return t.AMOscillator=function(){var e=t.defaults(arguments,["frequency","type","modulationType"],t.AMOscillator);t.Source.call(this,e),this._carrier=new t.Oscillator(e.frequency,e.type),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this.detune.value=e.detune,this._modulator=new t.Oscillator(e.frequency,e.modulationType),this._modulationScale=new t.AudioToGain,this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this._modulationNode=new t.Gain(0),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.detune.connect(this._modulator.detune),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),this.phase=e.phase,this._readOnly(["frequency","detune","harmonicity"])},t.extend(t.AMOscillator,t.Oscillator),t.AMOscillator.defaults={frequency:440,detune:0,phase:0,type:"sine",modulationType:"square",harmonicity:1},t.AMOscillator.prototype._start=function(t){this._modulator.start(t),this._carrier.start(t)},t.AMOscillator.prototype._stop=function(t){this._modulator.stop(t),this._carrier.stop(t)},t.AMOscillator.prototype.restart=function(t){this._modulator.restart(t),this._carrier.restart(t)},Object.defineProperty(t.AMOscillator.prototype,"type",{get:function(){return this._carrier.type},set:function(t){this._carrier.type=t}}),Object.defineProperty(t.AMOscillator.prototype,"baseType",{get:function(){return this._carrier.baseType},set:function(t){this._carrier.baseType=t}}),Object.defineProperty(t.AMOscillator.prototype,"partialCount",{get:function(){return this._carrier.partialCount},set:function(t){this._carrier.partialCount=t}}),Object.defineProperty(t.AMOscillator.prototype,"modulationType",{get:function(){return this._modulator.type},set:function(t){this._modulator.type=t}}),Object.defineProperty(t.AMOscillator.prototype,"phase",{get:function(){return this._carrier.phase},set:function(t){this._carrier.phase=t,this._modulator.phase=t}}),Object.defineProperty(t.AMOscillator.prototype,"partials",{get:function(){return this._carrier.partials},set:function(t){this._carrier.partials=t}}),t.AMOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._writable(["frequency","detune","harmonicity"]),this.frequency=null,this.detune=null,this.harmonicity.dispose(),this.harmonicity=null,this._carrier.dispose(),this._carrier=null,this._modulator.dispose(),this._modulator=null,this._modulationNode.dispose(),this._modulationNode=null,this._modulationScale.dispose(),this._modulationScale=null,this},t.AMOscillator}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(6),i(49),i(17),i(5)],void 0===(o=function(t){"use strict";return t.PWMOscillator=function(){var e=t.defaults(arguments,["frequency","modulationFrequency"],t.PWMOscillator);t.Source.call(this,e),this._pulse=new t.PulseOscillator(e.modulationFrequency),this._pulse._sawtooth.type="sine",this._modulator=new t.Oscillator({frequency:e.frequency,detune:e.detune,phase:e.phase}),this._scale=new t.Multiply(2),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this.modulationFrequency=this._pulse.frequency,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),this._readOnly(["modulationFrequency","frequency","detune"])},t.extend(t.PWMOscillator,t.Source),t.PWMOscillator.defaults={frequency:440,detune:0,phase:0,modulationFrequency:.4},t.PWMOscillator.prototype._start=function(t){t=this.toSeconds(t),this._modulator.start(t),this._pulse.start(t)},t.PWMOscillator.prototype._stop=function(t){t=this.toSeconds(t),this._modulator.stop(t),this._pulse.stop(t)},t.PWMOscillator.prototype.restart=function(t){this._modulator.restart(t),this._pulse.restart(t)},Object.defineProperty(t.PWMOscillator.prototype,"type",{get:function(){return"pwm"}}),Object.defineProperty(t.PWMOscillator.prototype,"baseType",{get:function(){return"pwm"}}),Object.defineProperty(t.PWMOscillator.prototype,"partials",{get:function(){return[]}}),Object.defineProperty(t.PWMOscillator.prototype,"phase",{get:function(){return this._modulator.phase},set:function(t){this._modulator.phase=t}}),t.PWMOscillator.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this._pulse.dispose(),this._pulse=null,this._scale.dispose(),this._scale=null,this._modulator.dispose(),this._modulator=null,this._writable(["modulationFrequency","frequency","detune"]),this.frequency=null,this.detune=null,this.modulationFrequency=null,this},t.PWMOscillator}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(50),i(4),i(16)],void 0===(o=function(t){"use strict";return t.Part=function(){var e=t.defaults(arguments,["callback","events"],t.Part);t.Event.call(this,e),this._events=[];for(var i=0;i<e.events.length;i++)Array.isArray(e.events[i])?this.add(e.events[i][0],e.events[i][1]):this.add(e.events[i])},t.extend(t.Part,t.Event),t.Part.defaults={callback:t.noOp,loop:!1,loopEnd:"1m",loopStart:0,playbackRate:1,probability:1,humanize:!1,mute:!1,events:[]},t.Part.prototype.start=function(e,i){var n=this.toTicks(e);return this._state.getValueAtTime(n)!==t.State.Started&&(i=this._loop?t.defaultArg(i,this._loopStart):t.defaultArg(i,0),i=this.toTicks(i),this._state.add({state:t.State.Started,time:n,offset:i}),this._forEach(function(t){this._startNote(t,n,i)})),this},t.Part.prototype._startNote=function(e,i,n){i-=n,this._loop?e.startOffset>=this._loopStart&&e.startOffset<this._loopEnd?(e.startOffset<n&&(i+=this._getLoopDuration()),e.start(t.Ticks(i))):e.startOffset<this._loopStart&&e.startOffset>=n&&(e.loop=!1,e.start(t.Ticks(i))):e.startOffset>=n&&e.start(t.Ticks(i))},Object.defineProperty(t.Part.prototype,"startOffset",{get:function(){return this._startOffset},set:function(t){this._startOffset=t,this._forEach(function(t){t.startOffset+=this._startOffset})}}),t.Part.prototype.stop=function(e){var i=this.toTicks(e);return this._state.cancel(i),this._state.setStateAtTime(t.State.Stopped,i),this._forEach(function(t){t.stop(e)}),this},t.Part.prototype.at=function(e,i){e=t.TransportTime(e);for(var n=t.Ticks(1).toSeconds(),o=0;o<this._events.length;o++){var s=this._events[o];if(Math.abs(e.toTicks()-s.startOffset)<n)return t.isDefined(i)&&(s.value=i),s}return t.isDefined(i)?(this.add(e,i),this._events[this._events.length-1]):null},t.Part.prototype.add=function(e,i){var n;return e.hasOwnProperty("time")&&(e=(i=e).time),e=this.toTicks(e),i instanceof t.Event?(n=i).callback=this._tick.bind(this):n=new t.Event({callback:this._tick.bind(this),value:i}),n.startOffset=e,n.set({loopEnd:this.loopEnd,loopStart:this.loopStart,loop:this.loop,humanize:this.humanize,playbackRate:this.playbackRate,probability:this.probability}),this._events.push(n),this._restartEvent(n),this},t.Part.prototype._restartEvent=function(e){this._state.forEach(function(i){i.state===t.State.Started?this._startNote(e,i.time,i.offset):e.stop(t.Ticks(i.time))}.bind(this))},t.Part.prototype.remove=function(e,i){e.hasOwnProperty("time")&&(e=(i=e).time),e=this.toTicks(e);for(var n=this._events.length-1;n>=0;n--){var o=this._events[n];o.startOffset===e&&(t.isUndef(i)||t.isDefined(i)&&o.value===i)&&(this._events.splice(n,1),o.dispose())}return this},t.Part.prototype.removeAll=function(){return this._forEach(function(t){t.dispose()}),this._events=[],this},t.Part.prototype.cancel=function(t){return this._forEach(function(e){e.cancel(t)}),this._state.cancel(this.toTicks(t)),this},t.Part.prototype._forEach=function(e,i){if(this._events){i=t.defaultArg(i,this);for(var n=this._events.length-1;n>=0;n--){var o=this._events[n];o instanceof t.Part?o._forEach(e,i):e.call(i,o)}}return this},t.Part.prototype._setAll=function(t,e){this._forEach(function(i){i[t]=e})},t.Part.prototype._tick=function(t,e){this.mute||this.callback(t,e)},t.Part.prototype._testLoopBoundries=function(e){e.startOffset<this._loopStart||e.startOffset>=this._loopEnd?e.cancel(0):e.state===t.State.Stopped&&this._restartEvent(e)},Object.defineProperty(t.Part.prototype,"probability",{get:function(){return this._probability},set:function(t){this._probability=t,this._setAll("probability",t)}}),Object.defineProperty(t.Part.prototype,"humanize",{get:function(){return this._humanize},set:function(t){this._humanize=t,this._setAll("humanize",t)}}),Object.defineProperty(t.Part.prototype,"loop",{get:function(){return this._loop},set:function(t){this._loop=t,this._forEach(function(e){e._loopStart=this._loopStart,e._loopEnd=this._loopEnd,e.loop=t,this._testLoopBoundries(e)})}}),Object.defineProperty(t.Part.prototype,"loopEnd",{get:function(){return t.Ticks(this._loopEnd).toSeconds()},set:function(t){this._loopEnd=this.toTicks(t),this._loop&&this._forEach(function(e){e.loopEnd=t,this._testLoopBoundries(e)})}}),Object.defineProperty(t.Part.prototype,"loopStart",{get:function(){return t.Ticks(this._loopStart).toSeconds()},set:function(t){this._loopStart=this.toTicks(t),this._loop&&this._forEach(function(t){t.loopStart=this.loopStart,this._testLoopBoundries(t)})}}),Object.defineProperty(t.Part.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this._setAll("playbackRate",t)}}),Object.defineProperty(t.Part.prototype,"length",{get:function(){return this._events.length}}),t.Part.prototype.dispose=function(){return t.Event.prototype.dispose.call(this),this.removeAll(),this.callback=null,this._events=null,this},t.Part}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(50)],void 0===(o=function(t){return t.Loop=function(){var e=t.defaults(arguments,["callback","interval"],t.Loop);t.call(this),this._event=new t.Event({callback:this._tick.bind(this),loop:!0,loopEnd:e.interval,playbackRate:e.playbackRate,probability:e.probability}),this.callback=e.callback,this.iterations=e.iterations},t.extend(t.Loop),t.Loop.defaults={interval:"4n",callback:t.noOp,playbackRate:1,iterations:1/0,probability:!0,mute:!1},t.Loop.prototype.start=function(t){return this._event.start(t),this},t.Loop.prototype.stop=function(t){return this._event.stop(t),this},t.Loop.prototype.cancel=function(t){return this._event.cancel(t),this},t.Loop.prototype._tick=function(t){this.callback(t)},Object.defineProperty(t.Loop.prototype,"state",{get:function(){return this._event.state}}),Object.defineProperty(t.Loop.prototype,"progress",{get:function(){return this._event.progress}}),Object.defineProperty(t.Loop.prototype,"interval",{get:function(){return this._event.loopEnd},set:function(t){this._event.loopEnd=t}}),Object.defineProperty(t.Loop.prototype,"playbackRate",{get:function(){return this._event.playbackRate},set:function(t){this._event.playbackRate=t}}),Object.defineProperty(t.Loop.prototype,"humanize",{get:function(){return this._event.humanize},set:function(t){this._event.humanize=t}}),Object.defineProperty(t.Loop.prototype,"probability",{get:function(){return this._event.probability},set:function(t){this._event.probability=t}}),Object.defineProperty(t.Loop.prototype,"mute",{get:function(){return this._event.mute},set:function(t){this._event.mute=t}}),Object.defineProperty(t.Loop.prototype,"iterations",{get:function(){return!0===this._event.loop?1/0:this._event.loop},set:function(t){this._event.loop=t===1/0||t}}),t.Loop.prototype.dispose=function(){this._event.dispose(),this._event=null,this.callback=null},t.Loop}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(15),i(32)],void 0===(o=function(t){"use strict";return t.StereoXFeedbackEffect=function(){var e=t.defaults(arguments,["feedback"],t.FeedbackEffect);t.StereoEffect.call(this,e),this.feedback=new t.Signal(e.feedback,t.Type.NormalRange),this._feedbackLR=new t.Gain,this._feedbackRL=new t.Gain,this.effectReturnL.chain(this._feedbackLR,this.effectSendR),this.effectReturnR.chain(this._feedbackRL,this.effectSendL),this.feedback.fan(this._feedbackLR.gain,this._feedbackRL.gain),this._readOnly(["feedback"])},t.extend(t.StereoXFeedbackEffect,t.StereoEffect),t.StereoXFeedbackEffect.prototype.dispose=function(){return t.StereoEffect.prototype.dispose.call(this),this._writable(["feedback"]),this.feedback.dispose(),this.feedback=null,this._feedbackLR.dispose(),this._feedbackLR=null,this._feedbackRL.dispose(),this._feedbackRL=null,this},t.StereoXFeedbackEffect}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(52),i(51)],void 0===(o=function(t){"use strict";return t.MidSideEffect=function(){t.Effect.apply(this,arguments),this._midSideSplit=new t.MidSideSplit,this._midSideMerge=new t.MidSideMerge,this.midSend=this._midSideSplit.mid,this.sideSend=this._midSideSplit.side,this.midReturn=this._midSideMerge.mid,this.sideReturn=this._midSideMerge.side,this.effectSend.connect(this._midSideSplit),this._midSideMerge.connect(this.effectReturn)},t.extend(t.MidSideEffect,t.Effect),t.MidSideEffect.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._midSideSplit.dispose(),this._midSideSplit=null,this._midSideMerge.dispose(),this._midSideMerge=null,this.midSend=null,this.sideSend=null,this.midReturn=null,this.sideReturn=null,this},t.MidSideEffect}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(11),i(8)],void 0===(o=function(t){"use strict";return t.Convolver=function(){var e=t.defaults(arguments,["url","onload"],t.Convolver);t.Effect.call(this,e),this._convolver=this.context.createConvolver(),this._buffer=new t.Buffer(e.url,function(t){this.buffer=t.get(),e.onload()}.bind(this)),this._buffer.loaded&&(this.buffer=this._buffer),this.normalize=e.normalize,this.connectEffect(this._convolver)},t.extend(t.Convolver,t.Effect),t.Convolver.defaults={onload:t.noOp,normalize:!0},Object.defineProperty(t.Convolver.prototype,"buffer",{get:function(){return this._buffer.length?this._buffer:null},set:function(t){this._buffer.set(t),this._convolver.buffer&&(this.effectSend.disconnect(),this._convolver.disconnect(),this._convolver=this.context.createConvolver(),this.connectEffect(this._convolver)),this._convolver.buffer=this._buffer.get()}}),Object.defineProperty(t.Convolver.prototype,"normalize",{get:function(){return this._convolver.normalize},set:function(t){this._convolver.normalize=t}}),t.Convolver.prototype.load=function(t,e){return this._buffer.load(t,function(t){this.buffer=t,e&&e()}.bind(this))},t.Convolver.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._buffer.dispose(),this._buffer=null,this._convolver.disconnect(),this._convolver=null,this},t.Convolver}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(7),i(5),i(13)],void 0===(o=function(t){"use strict";return t.Modulo=function(e){t.SignalBase.call(this),this.createInsOuts(1,0),this._shaper=new t.WaveShaper(Math.pow(2,16)),this._multiply=new t.Multiply,this._subtract=this.output=new t.Subtract,this._modSignal=new t.Signal(e),this.input.fan(this._shaper,this._subtract),this._modSignal.connect(this._multiply,0,0),this._shaper.connect(this._multiply,0,1),this._multiply.connect(this._subtract,0,1),this._setWaveShaper(e)},t.extend(t.Modulo,t.SignalBase),t.Modulo.prototype._setWaveShaper=function(t){this._shaper.setMap(function(e){return Math.floor((e+1e-4)/t)})},Object.defineProperty(t.Modulo.prototype,"value",{get:function(){return this._modSignal.value},set:function(t){this._modSignal.value=t,this._setWaveShaper(t)}}),t.Modulo.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._shaper.dispose(),this._shaper=null,this._multiply.dispose(),this._multiply=null,this._subtract.dispose(),this._subtract=null,this._modSignal.dispose(),this._modSignal=null,this},t.Modulo}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(16),i(11),i(62),i(40)],void 0===(o=function(t){return t.Offline=function(e,i){var n=t.context.sampleRate,o=t.context,s=new t.OfflineContext(2,i,n);t.context=s;var r=e(t.Transport),a=null;return a=r&&t.isFunction(r.then)?r.then(function(){return s.render()}):s.render(),t.context=o,a.then(function(e){return new t.Buffer(e)})},t.Offline}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(11)],void 0===(o=function(t){return t.Buffers=function(e){var i=Array.prototype.slice.call(arguments);i.shift();var n=t.defaults(i,["onload","baseUrl"],t.Buffers);for(var o in t.call(this),this._buffers={},this.baseUrl=n.baseUrl,this._loadingCount=0,e)this._loadingCount++,this.add(o,e[o],this._bufferLoaded.bind(this,n.onload))},t.extend(t.Buffers),t.Buffers.defaults={onload:t.noOp,baseUrl:""},t.Buffers.prototype.has=function(t){return this._buffers.hasOwnProperty(t)},t.Buffers.prototype.get=function(t){if(this.has(t))return this._buffers[t];throw new Error("Tone.Buffers: no buffer named "+t)},t.Buffers.prototype._bufferLoaded=function(t){this._loadingCount--,0===this._loadingCount&&t&&t(this)},Object.defineProperty(t.Buffers.prototype,"loaded",{get:function(){var t=!0;for(var e in this._buffers){var i=this.get(e);t=t&&i.loaded}return t}}),t.Buffers.prototype.add=function(e,i,n){return n=t.defaultArg(n,t.noOp),i instanceof t.Buffer?(this._buffers[e]=i,n(this)):i instanceof AudioBuffer?(this._buffers[e]=new t.Buffer(i),n(this)):t.isString(i)&&(this._buffers[e]=new t.Buffer(this.baseUrl+i,n)),this},t.Buffers.prototype.dispose=function(){for(var e in t.prototype.dispose.call(this),this._buffers)this._buffers[e].dispose();return this._buffers=null,this},t.Buffers}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0)],void 0===(o=function(t){"use strict";return t.CtrlPattern=function(){var e=t.defaults(arguments,["values","type"],t.CtrlPattern);t.call(this),this.values=e.values,this.index=0,this._type=null,this._shuffled=null,this._direction=null,this.type=e.type},t.extend(t.CtrlPattern),t.CtrlPattern.Type={Up:"up",Down:"down",UpDown:"upDown",DownUp:"downUp",AlternateUp:"alternateUp",AlternateDown:"alternateDown",Random:"random",RandomWalk:"randomWalk",RandomOnce:"randomOnce"},t.CtrlPattern.defaults={type:t.CtrlPattern.Type.Up,values:[]},Object.defineProperty(t.CtrlPattern.prototype,"value",{get:function(){if(0!==this.values.length){if(1===this.values.length)return this.values[0];this.index=Math.min(this.index,this.values.length-1);var e=this.values[this.index];return this.type===t.CtrlPattern.Type.RandomOnce&&(this.values.length!==this._shuffled.length&&this._shuffleValues(),e=this.values[this._shuffled[this.index]]),e}}}),Object.defineProperty(t.CtrlPattern.prototype,"type",{get:function(){return this._type},set:function(e){this._type=e,this._shuffled=null,this._type===t.CtrlPattern.Type.Up||this._type===t.CtrlPattern.Type.UpDown||this._type===t.CtrlPattern.Type.RandomOnce||this._type===t.CtrlPattern.Type.AlternateUp?this.index=0:this._type!==t.CtrlPattern.Type.Down&&this._type!==t.CtrlPattern.Type.DownUp&&this._type!==t.CtrlPattern.Type.AlternateDown||(this.index=this.values.length-1),this._type===t.CtrlPattern.Type.UpDown||this._type===t.CtrlPattern.Type.AlternateUp?this._direction=t.CtrlPattern.Type.Up:this._type!==t.CtrlPattern.Type.DownUp&&this._type!==t.CtrlPattern.Type.AlternateDown||(this._direction=t.CtrlPattern.Type.Down),this._type===t.CtrlPattern.Type.RandomOnce?this._shuffleValues():this._type===t.CtrlPattern.Random&&(this.index=Math.floor(Math.random()*this.values.length))}}),t.CtrlPattern.prototype.next=function(){var e=this.type;return e===t.CtrlPattern.Type.Up?(this.index++,this.index>=this.values.length&&(this.index=0)):e===t.CtrlPattern.Type.Down?(this.index--,this.index<0&&(this.index=this.values.length-1)):e===t.CtrlPattern.Type.UpDown||e===t.CtrlPattern.Type.DownUp?(this._direction===t.CtrlPattern.Type.Up?this.index++:this.index--,this.index<0?(this.index=1,this._direction=t.CtrlPattern.Type.Up):this.index>=this.values.length&&(this.index=this.values.length-2,this._direction=t.CtrlPattern.Type.Down)):e===t.CtrlPattern.Type.Random?this.index=Math.floor(Math.random()*this.values.length):e===t.CtrlPattern.Type.RandomWalk?Math.random()<.5?(this.index--,this.index=Math.max(this.index,0)):(this.index++,this.index=Math.min(this.index,this.values.length-1)):e===t.CtrlPattern.Type.RandomOnce?(this.index++,this.index>=this.values.length&&(this.index=0,this._shuffleValues())):e===t.CtrlPattern.Type.AlternateUp?(this._direction===t.CtrlPattern.Type.Up?(this.index+=2,this._direction=t.CtrlPattern.Type.Down):(this.index-=1,this._direction=t.CtrlPattern.Type.Up),this.index>=this.values.length&&(this.index=0,this._direction=t.CtrlPattern.Type.Up)):e===t.CtrlPattern.Type.AlternateDown&&(this._direction===t.CtrlPattern.Type.Up?(this.index+=1,this._direction=t.CtrlPattern.Type.Down):(this.index-=2,this._direction=t.CtrlPattern.Type.Up),this.index<0&&(this.index=this.values.length-1,this._direction=t.CtrlPattern.Type.Down)),this.value},t.CtrlPattern.prototype._shuffleValues=function(){var t=[];this._shuffled=[];for(var e=0;e<this.values.length;e++)t[e]=e;for(;t.length>0;){var i=t.splice(Math.floor(t.length*Math.random()),1);this._shuffled.push(i[0])}},t.CtrlPattern.prototype.dispose=function(){this._shuffled=null,this.values=null},t.CtrlPattern}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0)],void 0===(o=function(t){t.supported&&(AudioBuffer.prototype.copyToChannel||(AudioBuffer.prototype.copyToChannel=function(t,e,i){var n=this.getChannelData(e);i=i||0;for(var o=0;o<n.length;o++)n[o+i]=t[o]},AudioBuffer.prototype.copyFromChannel=function(t,e,i){var n=this.getChannelData(e);i=i||0;for(var o=0;o<t.length;o++)t[o]=n[o+i]}))}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(11),i(6),i(3),i(2)],void 0===(o=function(t){return t.OscillatorNode=function(){var e=t.defaults(arguments,["frequency","type"],t.OscillatorNode);t.AudioNode.call(this,e),this.onended=e.onended,this._startTime=-1,this._stopTime=-1,this._gainNode=this.output=new t.Gain(0),this._oscillator=this.context.createOscillator(),this._oscillator.connect(this._gainNode),this.type=e.type,this.frequency=new t.Param({param:this._oscillator.frequency,units:t.Type.Frequency,value:e.frequency}),this.detune=new t.Param({param:this._oscillator.detune,units:t.Type.Cents,value:e.detune}),this._gain=1},t.extend(t.OscillatorNode,t.AudioNode),t.OscillatorNode.defaults={frequency:440,detune:0,type:"sine",onended:t.noOp},Object.defineProperty(t.OscillatorNode.prototype,"state",{get:function(){return this.getStateAtTime(this.now())}}),t.OscillatorNode.prototype.getStateAtTime=function(e){return e=this.toSeconds(e),-1!==this._startTime&&e>=this._startTime&&(-1===this._stopTime||e<=this._stopTime)?t.State.Started:t.State.Stopped},t.OscillatorNode.prototype.start=function(t){if(this.log("start",t),-1!==this._startTime)throw new Error("cannot call OscillatorNode.start more than once");return this._startTime=this.toSeconds(t),this._oscillator.start(this._startTime),this._gainNode.gain.setValueAtTime(1,this._startTime),this},t.OscillatorNode.prototype.setPeriodicWave=function(t){return this._oscillator.setPeriodicWave(t),this},t.OscillatorNode.prototype.stop=function(t){return this.log("stop",t),this.assert(-1!==this._startTime,"'start' must be called before 'stop'"),this.cancelStop(),this._stopTime=this.toSeconds(t),this._stopTime>this._startTime?(this._gainNode.gain.setValueAtTime(0,this._stopTime),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(function(){this._oscillator.stop(this.now()),this.onended()}.bind(this),this._stopTime-this.context.currentTime)):this._gainNode.gain.cancelScheduledValues(this._startTime),this},t.OscillatorNode.prototype.cancelStop=function(){return-1!==this._startTime&&(this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1),this},Object.defineProperty(t.OscillatorNode.prototype,"type",{get:function(){return this._oscillator.type},set:function(t){this._oscillator.type=t}}),t.OscillatorNode.prototype.dispose=function(){return this.context.clearTimeout(this._timeout),t.AudioNode.prototype.dispose.call(this),this.onended=null,this._oscillator.disconnect(),this._oscillator=null,this._gainNode.dispose(),this._gainNode=null,this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this},t.OscillatorNode}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(55),i(54)],void 0===(o=function(t){return t.TransportRepeatEvent=function(e,i){t.TransportEvent.call(this,e,i),i=t.defaultArg(i,t.TransportRepeatEvent.defaults),this.duration=t.Ticks(i.duration),this._interval=t.Ticks(i.interval),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this),this.Transport.on("start loopStart",this._boundRestart),this._restart()},t.extend(t.TransportRepeatEvent,t.TransportEvent),t.TransportRepeatEvent.defaults={duration:1/0,interval:1},t.TransportRepeatEvent.prototype.invoke=function(e){this._createEvents(e),t.TransportEvent.prototype.invoke.call(this,e)},t.TransportRepeatEvent.prototype._createEvents=function(e){var i=this.Transport.getTicksAtTime(e);i>=this.time&&i>=this._nextTick&&this._nextTick+this._interval<this.time+this.duration&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.Transport.scheduleOnce(this.invoke.bind(this),t.Ticks(this._nextTick)))},t.TransportRepeatEvent.prototype._restart=function(e){this.Transport.clear(this._currentId),this.Transport.clear(this._nextId),this._nextTick=this.time;var i=this.Transport.getTicksAtTime(e);i>this.time&&(this._nextTick=this.time+Math.ceil((i-this.time)/this._interval)*this._interval),this._currentId=this.Transport.scheduleOnce(this.invoke.bind(this),t.Ticks(this._nextTick)),this._nextTick+=this._interval,this._nextId=this.Transport.scheduleOnce(this.invoke.bind(this),t.Ticks(this._nextTick))},t.TransportRepeatEvent.prototype.dispose=function(){return this.Transport.clear(this._currentId),this.Transport.clear(this._nextId),this.Transport.off("start loopStart",this._boundRestart),this._boundCreateEvents=null,t.TransportEvent.prototype.dispose.call(this),this.duration=null,this._interval=null,this},t.TransportRepeatEvent}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(4)],void 0===(o=function(t){"use strict";t.IntervalTimeline=function(){t.call(this),this._root=null,this._length=0},t.extend(t.IntervalTimeline),t.IntervalTimeline.prototype.add=function(i){if(t.isUndef(i.time)||t.isUndef(i.duration))throw new Error("Tone.IntervalTimeline: events must have time and duration parameters");i.time=i.time.valueOf();var n=new e(i.time,i.time+i.duration,i);for(null===this._root?this._root=n:this._root.insert(n),this._length++;null!==n;)n.updateHeight(),n.updateMax(),this._rebalance(n),n=n.parent;return this},t.IntervalTimeline.prototype.remove=function(t){if(null!==this._root){var e=[];this._root.search(t.time,e);for(var i=0;i<e.length;i++){var n=e[i];if(n.event===t){this._removeNode(n),this._length--;break}}}return this},Object.defineProperty(t.IntervalTimeline.prototype,"length",{get:function(){return this._length}}),t.IntervalTimeline.prototype.cancel=function(t){return this.forEachFrom(t,function(t){this.remove(t)}.bind(this)),this},t.IntervalTimeline.prototype._setRoot=function(t){this._root=t,null!==this._root&&(this._root.parent=null)},t.IntervalTimeline.prototype._replaceNodeInParent=function(t,e){null!==t.parent?(t.isLeftChild()?t.parent.left=e:t.parent.right=e,this._rebalance(t.parent)):this._setRoot(e)},t.IntervalTimeline.prototype._removeNode=function(t){if(null===t.left&&null===t.right)this._replaceNodeInParent(t,null);else if(null===t.right)this._replaceNodeInParent(t,t.left);else if(null===t.left)this._replaceNodeInParent(t,t.right);else{var e,i;if(t.getBalance()>0)if(null===t.left.right)(e=t.left).right=t.right,i=e;else{for(e=t.left.right;null!==e.right;)e=e.right;e.parent.right=e.left,i=e.parent,e.left=t.left,e.right=t.right}else if(null===t.right.left)(e=t.right).left=t.left,i=e;else{for(e=t.right.left;null!==e.left;)e=e.left;e.parent=e.parent,e.parent.left=e.right,i=e.parent,e.left=t.left,e.right=t.right}null!==t.parent?t.isLeftChild()?t.parent.left=e:t.parent.right=e:this._setRoot(e),this._rebalance(i)}t.dispose()},t.IntervalTimeline.prototype._rotateLeft=function(t){var e=t.parent,i=t.isLeftChild(),n=t.right;t.right=n.left,n.left=t,null!==e?i?e.left=n:e.right=n:this._setRoot(n)},t.IntervalTimeline.prototype._rotateRight=function(t){var e=t.parent,i=t.isLeftChild(),n=t.left;t.left=n.right,n.right=t,null!==e?i?e.left=n:e.right=n:this._setRoot(n)},t.IntervalTimeline.prototype._rebalance=function(t){var e=t.getBalance();e>1?t.left.getBalance()<0?this._rotateLeft(t.left):this._rotateRight(t):e<-1&&(t.right.getBalance()>0?this._rotateRight(t.right):this._rotateLeft(t))},t.IntervalTimeline.prototype.get=function(t){if(null!==this._root){var e=[];if(this._root.search(t,e),e.length>0){for(var i=e[0],n=1;n<e.length;n++)e[n].low>i.low&&(i=e[n]);return i.event}}return null},t.IntervalTimeline.prototype.forEach=function(t){if(null!==this._root){var e=[];this._root.traverse(function(t){e.push(t)});for(var i=0;i<e.length;i++){var n=e[i].event;n&&t(n)}}return this},t.IntervalTimeline.prototype.forEachAtTime=function(t,e){if(null!==this._root){var i=[];this._root.search(t,i);for(var n=i.length-1;n>=0;n--){var o=i[n].event;o&&e(o)}}return this},t.IntervalTimeline.prototype.forEachFrom=function(t,e){if(null!==this._root){var i=[];this._root.searchAfter(t,i);for(var n=i.length-1;n>=0;n--){e(i[n].event)}}return this},t.IntervalTimeline.prototype.dispose=function(){var t=[];null!==this._root&&this._root.traverse(function(e){t.push(e)});for(var e=0;e<t.length;e++)t[e].dispose();return t=null,this._root=null,this};var e=function(t,e,i){this.event=i,this.low=t,this.high=e,this.max=this.high,this._left=null,this._right=null,this.parent=null,this.height=0};return e.prototype.insert=function(t){t.low<=this.low?null===this.left?this.left=t:this.left.insert(t):null===this.right?this.right=t:this.right.insert(t)},e.prototype.search=function(t,e){t>this.max||(null!==this.left&&this.left.search(t,e),this.low<=t&&this.high>t&&e.push(this),this.low>t||null!==this.right&&this.right.search(t,e))},e.prototype.searchAfter=function(t,e){this.low>=t&&(e.push(this),null!==this.left&&this.left.searchAfter(t,e)),null!==this.right&&this.right.searchAfter(t,e)},e.prototype.traverse=function(t){t(this),null!==this.left&&this.left.traverse(t),null!==this.right&&this.right.traverse(t)},e.prototype.updateHeight=function(){null!==this.left&&null!==this.right?this.height=Math.max(this.left.height,this.right.height)+1:null!==this.right?this.height=this.right.height+1:null!==this.left?this.height=this.left.height+1:this.height=0},e.prototype.updateMax=function(){this.max=this.high,null!==this.left&&(this.max=Math.max(this.max,this.left.max)),null!==this.right&&(this.max=Math.max(this.max,this.right.max))},e.prototype.getBalance=function(){var t=0;return null!==this.left&&null!==this.right?t=this.left.height-this.right.height:null!==this.left?t=this.left.height+1:null!==this.right&&(t=-(this.right.height+1)),t},e.prototype.isLeftChild=function(){return null!==this.parent&&this.parent.left===this},Object.defineProperty(e.prototype,"left",{get:function(){return this._left},set:function(t){this._left=t,null!==t&&(t.parent=this),this.updateHeight(),this.updateMax()}}),Object.defineProperty(e.prototype,"right",{get:function(){return this._right},set:function(t){this._right=t,null!==t&&(t.parent=this),this.updateHeight(),this.updateMax()}}),e.prototype.dispose=function(){this.parent=null,this._left=null,this._right=null,this.event=null},t.IntervalTimeline}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1)],void 0===(o=function(t){function e(t){return function(e,i){i=this.toSeconds(i),t.apply(this,arguments);var n=this._events.get(i),o=this._events.previousEvent(n),s=this._getTicksUntilEvent(o,i);return n.ticks=Math.max(s,0),this}}return t.TickSignal=function(e){e=t.defaultArg(e,1),t.Signal.call(this,{units:t.Type.Ticks,value:e}),this._events.memory=1/0,this.cancelScheduledValues(0),this._events.add({type:t.Param.AutomationType.SetValue,time:0,value:e})},t.extend(t.TickSignal,t.Signal),t.TickSignal.prototype.setValueAtTime=e(t.Signal.prototype.setValueAtTime),t.TickSignal.prototype.linearRampToValueAtTime=e(t.Signal.prototype.linearRampToValueAtTime),t.TickSignal.prototype.setTargetAtTime=function(t,e,i){e=this.toSeconds(e),this.setRampPoint(e),t=this._fromUnits(t);for(var n=this._events.get(e),o=Math.round(Math.max(1/i,1)),s=0;s<=o;s++){var r=i*s+e,a=this._exponentialApproach(n.time,n.value,t,i,r);this.linearRampToValueAtTime(this._toUnits(a),r)}return this},t.TickSignal.prototype.exponentialRampToValueAtTime=function(t,e){e=this.toSeconds(e),t=this._fromUnits(t);var i=this._events.get(e);null===i&&(i={value:this._initialValue,time:0});for(var n=Math.round(Math.max(10*(e-i.time),1)),o=(e-i.time)/n,s=0;s<=n;s++){var r=o*s+i.time,a=this._exponentialInterpolate(i.time,i.value,e,t,r);this.linearRampToValueAtTime(this._toUnits(a),r)}return this},t.TickSignal.prototype._getTicksUntilEvent=function(e,i){if(null===e)e={ticks:0,time:0};else if(t.isUndef(e.ticks)){var n=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(n,e.time)}var o=this.getValueAtTime(e.time),s=this.getValueAtTime(i);return this._events.get(i).time===i&&this._events.get(i).type===t.Param.AutomationType.SetValue&&(s=this.getValueAtTime(i-this.sampleTime)),.5*(i-e.time)*(o+s)+e.ticks},t.TickSignal.prototype.getTicksAtTime=function(t){t=this.toSeconds(t);var e=this._events.get(t);return Math.max(this._getTicksUntilEvent(e,t),0)},t.TickSignal.prototype.getDurationOfTicks=function(t,e){e=this.toSeconds(e);var i=this.getTicksAtTime(e);return this.getTimeOfTick(i+t)-e},t.TickSignal.prototype.getTimeOfTick=function(e){var i=this._events.get(e,"ticks"),n=this._events.getAfter(e,"ticks");if(i&&i.ticks===e)return i.time;if(i&&n&&n.type===t.Param.AutomationType.Linear&&i.value!==n.value){var o=this.getValueAtTime(i.time),s=(this.getValueAtTime(n.time)-o)/(n.time-i.time),r=Math.sqrt(Math.pow(o,2)-2*s*(i.ticks-e)),a=(-o+r)/s;return(a>0?a:(-o-r)/s)+i.time}return i?0===i.value?1/0:i.time+(e-i.ticks)/i.value:e/this._initialValue},t.TickSignal.prototype.ticksToTime=function(e,i){return i=this.toSeconds(i),new t.Time(this.getDurationOfTicks(e,i))},t.TickSignal.prototype.timeToTicks=function(e,i){i=this.toSeconds(i),e=this.toSeconds(e);var n=this.getTicksAtTime(i),o=this.getTicksAtTime(i+e);return new t.Ticks(o-n)},t.TickSignal}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(56),i(33),i(35),i(20)],void 0===(o=function(t){"use strict";return t.Clock=function(){var e=t.defaults(arguments,["callback","frequency"],t.Clock);t.Emitter.call(this),this.callback=e.callback,this._nextTick=0,this._tickSource=new t.TickSource(e.frequency),this._lastUpdate=0,this.frequency=this._tickSource.frequency,this._readOnly("frequency"),this._state=new t.TimelineState(t.State.Stopped),this._state.setStateAtTime(t.State.Stopped,0),this._boundLoop=this._loop.bind(this),this.context.on("tick",this._boundLoop)},t.extend(t.Clock,t.Emitter),t.Clock.defaults={callback:t.noOp,frequency:1},Object.defineProperty(t.Clock.prototype,"state",{get:function(){return this._state.getValueAtTime(this.now())}}),t.Clock.prototype.start=function(e,i){return this.context.resume(),e=this.toSeconds(e),this._state.getValueAtTime(e)!==t.State.Started&&(this._state.setStateAtTime(t.State.Started,e),this._tickSource.start(e,i),e<this._lastUpdate&&this.emit("start",e,i)),this},t.Clock.prototype.stop=function(e){return e=this.toSeconds(e),this._state.cancel(e),this._state.setStateAtTime(t.State.Stopped,e),this._tickSource.stop(e),e<this._lastUpdate&&this.emit("stop",e),this},t.Clock.prototype.pause=function(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)===t.State.Started&&(this._state.setStateAtTime(t.State.Paused,e),this._tickSource.pause(e),e<this._lastUpdate&&this.emit("pause",e)),this},Object.defineProperty(t.Clock.prototype,"ticks",{get:function(){return Math.ceil(this.getTicksAtTime(this.now()))},set:function(t){this._tickSource.ticks=t}}),Object.defineProperty(t.Clock.prototype,"seconds",{get:function(){return this._tickSource.seconds},set:function(t){this._tickSource.seconds=t}}),t.Clock.prototype.getSecondsAtTime=function(t){return this._tickSource.getSecondsAtTime(t)},t.Clock.prototype.setTicksAtTime=function(t,e){return this._tickSource.setTicksAtTime(t,e),this},t.Clock.prototype.getTicksAtTime=function(t){return this._tickSource.getTicksAtTime(t)},t.Clock.prototype.nextTickTime=function(t,e){e=this.toSeconds(e);var i=this.getTicksAtTime(e);return this._tickSource.getTimeOfTick(i+t,e)},t.Clock.prototype._loop=function(){var e=this._lastUpdate,i=this.now();this._lastUpdate=i,e!==i&&(this._state.forEachBetween(e,i,function(e){switch(e.state){case t.State.Started:var i=this._tickSource.getTicksAtTime(e.time);this.emit("start",e.time,i);break;case t.State.Stopped:0!==e.time&&this.emit("stop",e.time);break;case t.State.Paused:this.emit("pause",e.time)}}.bind(this)),this._tickSource.forEachTickBetween(e,i,function(t,e){this.callback(t,e)}.bind(this)))},t.Clock.prototype.getStateAtTime=function(t){return t=this.toSeconds(t),this._state.getValueAtTime(t)},t.Clock.prototype.dispose=function(){t.Emitter.prototype.dispose.call(this),this.context.off("tick",this._boundLoop),this._writable("frequency"),this._tickSource.dispose(),this._tickSource=null,this.frequency=null,this._boundLoop=null,this._nextTick=1/0,this.callback=null,this._state.dispose(),this._state=null},t.Clock}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(1),i(5),i(7)],void 0===(o=function(t){"use strict";return t.GreaterThanZero=function(){t.SignalBase.call(this),this._thresh=this.output=new t.WaveShaper(function(t){return t<=0?0:1},127),this._scale=this.input=new t.Multiply(1e4),this._scale.connect(this._thresh)},t.extend(t.GreaterThanZero,t.SignalBase),t.GreaterThanZero.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._scale.dispose(),this._scale=null,this._thresh.dispose(),this._thresh=null,this},t.GreaterThanZero}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(87),i(13),i(1)],void 0===(o=function(t){"use strict";return t.GreaterThan=function(e){t.Signal.call(this),this.createInsOuts(2,0),this._param=this.input[0]=new t.Subtract(e),this.input[1]=this._param.input[1],this._gtz=this.output=new t.GreaterThanZero,this._param.connect(this._gtz),this.proxy=!1},t.extend(t.GreaterThan,t.Signal),t.GreaterThan.prototype.dispose=function(){return t.Signal.prototype.dispose.call(this),this._gtz.dispose(),this._gtz=null,this},t.GreaterThan}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(47),i(26)],void 0===(o=function(t){"use strict";return t.ScaledEnvelope=function(){var e=t.defaults(arguments,["attack","decay","sustain","release"],t.Envelope);t.Envelope.call(this,e),e=t.defaultArg(e,t.ScaledEnvelope.defaults),this._exp=this.output=new t.Pow(e.exponent),this._scale=this.output=new t.Scale(e.min,e.max),this._sig.chain(this._exp,this._scale)},t.extend(t.ScaledEnvelope,t.Envelope),t.ScaledEnvelope.defaults={min:0,max:1,exponent:1},Object.defineProperty(t.ScaledEnvelope.prototype,"min",{get:function(){return this._scale.min},set:function(t){this._scale.min=t}}),Object.defineProperty(t.ScaledEnvelope.prototype,"max",{get:function(){return this._scale.max},set:function(t){this._scale.max=t}}),Object.defineProperty(t.ScaledEnvelope.prototype,"exponent",{get:function(){return this._exp.value},set:function(t){this._exp.value=t}}),t.ScaledEnvelope.prototype.dispose=function(){return t.Envelope.prototype.dispose.call(this),this._scale.dispose(),this._scale=null,this._exp.dispose(),this._exp=null,this},t.ScaledEnvelope}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(7),i(36)],void 0===(o=function(t){"use strict";return t.Abs=function(){t.SignalBase.call(this),this._abs=this.input=this.output=new t.WaveShaper(function(t){return Math.abs(t)<.001?0:Math.abs(t)},1024)},t.extend(t.Abs,t.SignalBase),t.Abs.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._abs.dispose(),this._abs=null,this},t.Abs}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(3),i(2)],void 0===(o=function(t){return t.Solo=function(){var e=t.defaults(arguments,["solo"],t.Solo);t.AudioNode.call(this),this.input=this.output=new t.Gain,this._soloBind=this._soloed.bind(this),this.context.on("solo",this._soloBind),this.solo=e.solo},t.extend(t.Solo,t.AudioNode),t.Solo.defaults={solo:!1},Object.defineProperty(t.Solo.prototype,"solo",{get:function(){return this._isSoloed()},set:function(t){t?this._addSolo():this._removeSolo(),this.context.emit("solo",this)}}),Object.defineProperty(t.Solo.prototype,"muted",{get:function(){return 0===this.input.gain.value}}),t.Solo.prototype._addSolo=function(){t.isArray(this.context._currentSolo)||(this.context._currentSolo=[]),this._isSoloed()||this.context._currentSolo.push(this)},t.Solo.prototype._removeSolo=function(){if(this._isSoloed()){var t=this.context._currentSolo.indexOf(this);this.context._currentSolo.splice(t,1)}},t.Solo.prototype._isSoloed=function(){return!!t.isArray(this.context._currentSolo)&&(0!==this.context._currentSolo.length&&-1!==this.context._currentSolo.indexOf(this))},t.Solo.prototype._noSolos=function(){return!t.isArray(this.context._currentSolo)||0===this.context._currentSolo.length},t.Solo.prototype._soloed=function(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0},t.Solo.prototype.dispose=function(){return this.context.off("solo",this._soloBind),this._removeSolo(),this._soloBind=null,t.AudioNode.prototype.dispose.call(this),this},t.Solo}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(7),i(10),i(28),i(19),i(3),i(1),i(20)],void 0===(o=function(t){if(t.supported&&!t.global.AudioContext.prototype.createStereoPanner){var e=function(e){this.context=e,this.pan=new t.Signal(0,t.Type.AudioRange);var i=new t.WaveShaper(function(e){return t.equalPowerScale((e+1)/2)},4096),n=new t.WaveShaper(function(e){return t.equalPowerScale(1-(e+1)/2)},4096),o=new t.Gain,s=new t.Gain,r=this.input=new t.Split;r._splitter.channelCountMode="explicit",(new t.Zero).fan(i,n);var a=this.output=new t.Merge;r.left.chain(o,a.left),r.right.chain(s,a.right),this.pan.chain(n,o.gain),this.pan.chain(i,s.gain)};e.prototype.disconnect=function(){this.output.disconnect.apply(this.output,arguments)},e.prototype.connect=function(){this.output.connect.apply(this.output,arguments)},AudioContext.prototype.createStereoPanner=function(){return new e(this)},t.Context.prototype.createStereoPanner=function(){return new e(this)}}}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(7)],void 0===(o=function(t){"use strict";return t.EqualPowerGain=function(){t.SignalBase.call(this),this._eqPower=this.input=this.output=new t.WaveShaper(function(e){return Math.abs(e)<.001?0:t.equalPowerScale(e)}.bind(this),4096)},t.extend(t.EqualPowerGain,t.SignalBase),t.EqualPowerGain.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._eqPower.dispose(),this._eqPower=null,this},t.EqualPowerGain}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(5),i(1)],void 0===(o=function(t){"use strict";return t.Negate=function(){t.SignalBase.call(this),this._multiply=this.input=this.output=new t.Multiply(-1)},t.extend(t.Negate,t.SignalBase),t.Negate.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._multiply.dispose(),this._multiply=null,this},t.Negate}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(60),i(27),i(2)],void 0===(o=function(t){"use strict";return t.PanVol=function(){var e=t.defaults(arguments,["pan","volume"],t.PanVol);t.AudioNode.call(this),this._panner=this.input=new t.Panner(e.pan),this.pan=this._panner.pan,this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,this._readOnly(["pan","volume"])},t.extend(t.PanVol,t.AudioNode),t.PanVol.defaults={pan:0,volume:0,mute:!1},Object.defineProperty(t.PanVol.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),t.PanVol.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["pan","volume"]),this._panner.dispose(),this._panner=null,this.pan=null,this._volume.dispose(),this._volume=null,this.volume=null,this},t.PanVol}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(34)],void 0===(o=function(t){t.supported&&(AnalyserNode.prototype.getFloatTimeDomainData||(AnalyserNode.prototype.getFloatTimeDomainData=function(t){var e=new Uint8Array(t.length);this.getByteTimeDomainData(e);for(var i=0;i<e.length;i++)t[i]=(e[i]-128)/128}))}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(34),i(63),i(20),i(3)],void 0===(o=function(t){if(t.supported&&!t.global.AudioContext.prototype.createConstantSource){var e=function(t){this.context=t;for(var e=t.createBuffer(1,128,t.sampleRate),i=e.getChannelData(0),n=0;n<i.length;n++)i[n]=1;this._bufferSource=t.createBufferSource(),this._bufferSource.channelCount=1,this._bufferSource.channelCountMode="explicit",this._bufferSource.buffer=e,this._bufferSource.loop=!0;var o=this._output=t.createGain();this.offset=o.gain,this._bufferSource.connect(o)};e.prototype.start=function(t){return this._bufferSource.start(t),this},e.prototype.stop=function(t){return this._bufferSource.stop(t),this},e.prototype.connect=function(){return this._output.connect.apply(this._output,arguments),this},e.prototype.disconnect=function(){return this._output.disconnect.apply(this._output,arguments),this},AudioContext.prototype.createConstantSource=function(){return new e(this)},t.Context.prototype.createConstantSource=function(){return new e(this)}}}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(34)],void 0===(o=function(t){if(t.supported&&!t.global.AudioContext.prototype._native_createWaveShaper){var e=navigator.userAgent.toLowerCase();if(e.includes("safari")&&!e.includes("chrome")){var i=function(t){for(var e in this._internalNode=this.input=this.output=t._native_createWaveShaper(),this._curve=null,this._internalNode)this._defineProperty(this._internalNode,e)};Object.defineProperty(i.prototype,"curve",{get:function(){return this._curve},set:function(t){this._curve=t;var e=new Float32Array(t.length+1);e.set(t,1),e[0]=t[0],this._internalNode.curve=e}}),i.prototype._defineProperty=function(e,i){t.isUndef(this[i])&&Object.defineProperty(this,i,{get:function(){return"function"==typeof e[i]?e[i].bind(e):e[i]},set:function(t){e[i]=t}})},t.global.AudioContext.prototype._native_createWaveShaper=t.global.AudioContext.prototype.createWaveShaper,t.global.AudioContext.prototype.createWaveShaper=function(){return new i(this)}}}}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(46)],void 0===(o=function(t){return t.Midi=function(e,i){if(!(this instanceof t.Midi))return new t.Midi(e,i);t.Frequency.call(this,e,i)},t.extend(t.Midi,t.Frequency),t.Midi.prototype._defaultUnits="midi",t.Midi.prototype._frequencyToUnits=function(e){return t.Frequency.ftom(t.Frequency.prototype._frequencyToUnits.call(this,e))},t.Midi.prototype._ticksToUnits=function(e){return t.Frequency.ftom(t.Frequency.prototype._ticksToUnits.call(this,e))},t.Midi.prototype._beatsToUnits=function(e){return t.Frequency.ftom(t.Frequency.prototype._beatsToUnits.call(this,e))},t.Midi.prototype._secondsToUnits=function(e){return t.Frequency.ftom(t.Frequency.prototype._secondsToUnits.call(this,e))},t.Midi.prototype.toMidi=function(){return this.valueOf()},t.Midi.prototype.toFrequency=function(){return t.Frequency.mtof(this.toMidi())},t.Midi.prototype.transpose=function(t){return new this.constructor(this.toMidi()+t)},t.Midi}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(27),i(2)],void 0===(o=function(t){"use strict";return t.UserMedia=function(){var e=t.defaults(arguments,["volume"],t.UserMedia);t.AudioNode.call(this),this._mediaStream=null,this._stream=null,this._device=null,this._volume=this.output=new t.Volume(e.volume),this.volume=this._volume.volume,this._readOnly("volume"),this.mute=e.mute},t.extend(t.UserMedia,t.AudioNode),t.UserMedia.defaults={volume:0,mute:!1},t.UserMedia.prototype.open=function(e){return this.state===t.State.Started&&this.close(),t.UserMedia.enumerateDevices().then(function(i){var n;if(t.isNumber(e))n=i[e];else if(!(n=i.find(function(t){return t.label===e||t.deviceId===e}))&&i.length>0)n=i[0];else if(!n&&t.isDefined(e))throw new Error("Tone.UserMedia: no matching device: "+e);this._device=n;var o={audio:{echoCancellation:!1,sampleRate:this.context.sampleRate,noiseSuppression:!1,mozNoiseSuppression:!1}};return n&&(o.audio.deviceId=n.deviceId),navigator.mediaDevices.getUserMedia(o).then(function(t){return this._stream||(this._stream=t,this._mediaStream=this.context.createMediaStreamSource(t),this._mediaStream.connect(this.output)),this}.bind(this))}.bind(this))},t.UserMedia.prototype.close=function(){return this._stream&&(this._stream.getAudioTracks().forEach(function(t){t.stop()}),this._stream=null,this._mediaStream.disconnect(),this._mediaStream=null),this._device=null,this},t.UserMedia.enumerateDevices=function(){return navigator.mediaDevices.enumerateDevices().then(function(t){return t.filter(function(t){return"audioinput"===t.kind})})},Object.defineProperty(t.UserMedia.prototype,"state",{get:function(){return this._stream&&this._stream.active?t.State.Started:t.State.Stopped}}),Object.defineProperty(t.UserMedia.prototype,"deviceId",{get:function(){if(this._device)return this._device.deviceId}}),Object.defineProperty(t.UserMedia.prototype,"groupId",{get:function(){if(this._device)return this._device.groupId}}),Object.defineProperty(t.UserMedia.prototype,"label",{get:function(){if(this._device)return this._device.label}}),Object.defineProperty(t.UserMedia.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),t.UserMedia.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this.close(),this._writable("volume"),this._volume.dispose(),this._volume=null,this.volume=null,this},Object.defineProperty(t.UserMedia,"supported",{get:function(){return t.isDefined(navigator.mediaDevices)&&t.isFunction(navigator.mediaDevices.getUserMedia)}}),t.UserMedia}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(67),i(27),i(2)],void 0===(o=function(t){"use strict";return t.Players=function(e){var i=Array.prototype.slice.call(arguments);i.shift();var n=t.defaults(i,["onload"],t.Players);for(var o in t.AudioNode.call(this,n),this._volume=this.output=new t.Volume(n.volume),this.volume=this._volume.volume,this._readOnly("volume"),this._volume.output.output.channelCount=2,this._volume.output.output.channelCountMode="explicit",this.mute=n.mute,this._players={},this._loadingCount=0,this._fadeIn=n.fadeIn,this._fadeOut=n.fadeOut,e)this._loadingCount++,this.add(o,e[o],this._bufferLoaded.bind(this,n.onload))},t.extend(t.Players,t.AudioNode),t.Players.defaults={volume:0,mute:!1,onload:t.noOp,fadeIn:0,fadeOut:0},t.Players.prototype._bufferLoaded=function(t){this._loadingCount--,0===this._loadingCount&&t&&t(this)},Object.defineProperty(t.Players.prototype,"mute",{get:function(){return this._volume.mute},set:function(t){this._volume.mute=t}}),Object.defineProperty(t.Players.prototype,"fadeIn",{get:function(){return this._fadeIn},set:function(t){this._fadeIn=t,this._forEach(function(e){e.fadeIn=t})}}),Object.defineProperty(t.Players.prototype,"fadeOut",{get:function(){return this._fadeOut},set:function(t){this._fadeOut=t,this._forEach(function(e){e.fadeOut=t})}}),Object.defineProperty(t.Players.prototype,"state",{get:function(){var e=!1;return this._forEach(function(i){e=e||i.state===t.State.Started}),e?t.State.Started:t.State.Stopped}}),t.Players.prototype.has=function(t){return this._players.hasOwnProperty(t)},t.Players.prototype.get=function(t){if(this.has(t))return this._players[t];throw new Error("Tone.Players: no player named "+t)},t.Players.prototype._forEach=function(t){for(var e in this._players)t(this._players[e],e);return this},Object.defineProperty(t.Players.prototype,"loaded",{get:function(){var t=!0;return this._forEach(function(e){t=t&&e.loaded}),t}}),t.Players.prototype.add=function(e,i,n){return this._players[e]=new t.Player(i,n).connect(this.output),this._players[e].fadeIn=this._fadeIn,this._players[e].fadeOut=this._fadeOut,this},t.Players.prototype.stopAll=function(t){this._forEach(function(e){e.stop(t)})},t.Players.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._volume.dispose(),this._volume=null,this._writable("volume"),this.volume=null,this.output=null,this._forEach(function(t){t.dispose()}),this._players=null,this},t.Players}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(6),i(11),i(31)],void 0===(o=function(t){return t.GrainPlayer=function(){var e=t.defaults(arguments,["url","onload"],t.GrainPlayer);t.Source.call(this,e),this.buffer=new t.Buffer(e.url,e.onload),this._clock=new t.Clock(this._tick.bind(this),e.grainSize),this._loopStart=0,this._loopEnd=0,this._activeSources=[],this._playbackRate=e.playbackRate,this._grainSize=e.grainSize,this._overlap=e.overlap,this.detune=e.detune,this.overlap=e.overlap,this.loop=e.loop,this.playbackRate=e.playbackRate,this.grainSize=e.grainSize,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.reverse=e.reverse,this._clock.on("stop",this._onstop.bind(this))},t.extend(t.GrainPlayer,t.Source),t.GrainPlayer.defaults={onload:t.noOp,overlap:.1,grainSize:.2,playbackRate:1,detune:0,loop:!1,loopStart:0,loopEnd:0,reverse:!1},t.GrainPlayer.prototype._start=function(e,i,n){i=t.defaultArg(i,0),i=this.toSeconds(i),e=this.toSeconds(e),this._offset=i,this._clock.start(e),n&&this.stop(e+this.toSeconds(n))},t.GrainPlayer.prototype._stop=function(t){this._clock.stop(t)},t.GrainPlayer.prototype._onstop=function(t){this._activeSources.forEach(function(e){e.fadeOut=0,e.stop(t)})},t.GrainPlayer.prototype._tick=function(e){if(!this.loop&&this._offset>this.buffer.duration)this.stop(e);else{var i=this._offset<this._overlap?0:this._overlap,n=new t.BufferSource({buffer:this.buffer,fadeIn:i,fadeOut:this._overlap,loop:this.loop,loopStart:this._loopStart,loopEnd:this._loopEnd,playbackRate:t.intervalToFrequencyRatio(this.detune/100)}).connect(this.output);n.start(e,this._offset),this._offset+=this.grainSize,n.stop(e+this.grainSize/this.playbackRate),this._activeSources.push(n),n.onended=function(){var t=this._activeSources.indexOf(n);-1!==t&&this._activeSources.splice(t,1)}.bind(this)}},Object.defineProperty(t.GrainPlayer.prototype,"playbackRate",{get:function(){return this._playbackRate},set:function(t){this._playbackRate=t,this.grainSize=this._grainSize}}),Object.defineProperty(t.GrainPlayer.prototype,"loopStart",{get:function(){return this._loopStart},set:function(t){this._loopStart=this.toSeconds(t)}}),Object.defineProperty(t.GrainPlayer.prototype,"loopEnd",{get:function(){return this._loopEnd},set:function(t){this._loopEnd=this.toSeconds(t)}}),Object.defineProperty(t.GrainPlayer.prototype,"reverse",{get:function(){return this.buffer.reverse},set:function(t){this.buffer.reverse=t}}),Object.defineProperty(t.GrainPlayer.prototype,"grainSize",{get:function(){return this._grainSize},set:function(t){this._grainSize=this.toSeconds(t),this._clock.frequency.value=this._playbackRate/this._grainSize}}),Object.defineProperty(t.GrainPlayer.prototype,"overlap",{get:function(){return this._overlap},set:function(t){this._overlap=this.toSeconds(t)}}),Object.defineProperty(t.GrainPlayer.prototype,"loaded",{get:function(){return this.buffer.loaded}}),t.GrainPlayer.prototype.dispose=function(){return t.Source.prototype.dispose.call(this),this.buffer.dispose(),this.buffer=null,this._clock.dispose(),this._clock=null,this._activeSources.forEach(function(t){t.dispose()}),this._activeSources=null,this},t.GrainPlayer}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(16),i(1),i(45)],void 0===(o=function(t){return t.TransportTimelineSignal=function(){t.Signal.apply(this,arguments),this.output=this._outputSig=new t.Signal(this._initialValue),this._lastVal=this.value,this._synced=t.Transport.scheduleRepeat(this._onTick.bind(this),"1i"),this._bindAnchorValue=this._anchorValue.bind(this),t.Transport.on("start stop pause",this._bindAnchorValue),this._events.memory=1/0},t.extend(t.TransportTimelineSignal,t.Signal),t.TransportTimelineSignal.prototype._onTick=function(e){var i=this.getValueAtTime(t.Transport.seconds);this._lastVal!==i&&(this._lastVal=i,this._outputSig.linearRampToValueAtTime(i,e))},t.TransportTimelineSignal.prototype._anchorValue=function(e){var i=this.getValueAtTime(t.Transport.seconds);return this._lastVal=i,this._outputSig.cancelScheduledValues(e),this._outputSig.setValueAtTime(i,e),this},t.TransportTimelineSignal.prototype.getValueAtTime=function(e){return e=t.TransportTime(e),t.Signal.prototype.getValueAtTime.call(this,e)},t.TransportTimelineSignal.prototype.setValueAtTime=function(e,i){return i=t.TransportTime(i),t.Signal.prototype.setValueAtTime.call(this,e,i),this},t.TransportTimelineSignal.prototype.linearRampToValueAtTime=function(e,i){return i=t.TransportTime(i),t.Signal.prototype.linearRampToValueAtTime.call(this,e,i),this},t.TransportTimelineSignal.prototype.exponentialRampToValueAtTime=function(e,i){return i=t.TransportTime(i),t.Signal.prototype.exponentialRampToValueAtTime.call(this,e,i),this},t.TransportTimelineSignal.prototype.setTargetAtTime=function(e,i,n){return i=t.TransportTime(i),t.Signal.prototype.setTargetAtTime.call(this,e,i,n),this},t.TransportTimelineSignal.prototype.cancelScheduledValues=function(e){return e=t.TransportTime(e),t.Signal.prototype.cancelScheduledValues.call(this,e),this},t.TransportTimelineSignal.prototype.setValueCurveAtTime=function(e,i,n,o){return i=t.TransportTime(i),n=t.TransportTime(n),t.Signal.prototype.setValueCurveAtTime.call(this,e,i,n,o),this},t.TransportTimelineSignal.prototype.cancelAndHoldAtTime=function(e){return t.Signal.prototype.cancelAndHoldAtTime.call(this,t.TransportTime(e))},t.TransportTimelineSignal.prototype.dispose=function(){t.Transport.clear(this._synced),t.Transport.off("start stop pause",this._syncedCallback),this._events.cancel(0),t.Signal.prototype.dispose.call(this),this._outputSig.dispose(),this._outputSig=null},t.TransportTimelineSignal}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(29),i(5)],void 0===(o=function(t){"use strict";return t.Normalize=function(e,i){t.SignalBase.call(this),this._inputMin=t.defaultArg(e,0),this._inputMax=t.defaultArg(i,1),this._sub=this.input=new t.Add(0),this._div=this.output=new t.Multiply(1),this._sub.connect(this._div),this._setRange()},t.extend(t.Normalize,t.SignalBase),Object.defineProperty(t.Normalize.prototype,"min",{get:function(){return this._inputMin},set:function(t){this._inputMin=t,this._setRange()}}),Object.defineProperty(t.Normalize.prototype,"max",{get:function(){return this._inputMax},set:function(t){this._inputMax=t,this._setRange()}}),t.Normalize.prototype._setRange=function(){this._sub.value=-this._inputMin,this._div.value=1/(this._inputMax-this._inputMin)},t.Normalize.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._sub.dispose(),this._sub=null,this._div.dispose(),this._div=null,this},t.Normalize}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(7),i(1)],void 0===(o=function(t){"use strict";return t.GainToAudio=function(){t.SignalBase.call(this),this._norm=this.input=this.output=new t.WaveShaper(function(t){return 2*Math.abs(t)-1})},t.extend(t.GainToAudio,t.SignalBase),t.GainToAudio.prototype.dispose=function(){return t.SignalBase.prototype.dispose.call(this),this._norm.dispose(),this._norm=null,this},t.GainToAudio}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0)],void 0===(o=function(t){t.supported&&(OscillatorNode.prototype.setPeriodicWave||(OscillatorNode.prototype.setPeriodicWave=OscillatorNode.prototype.setWaveTable),AudioContext.prototype.createPeriodicWave||(AudioContext.prototype.createPeriodicWave=AudioContext.prototype.createWaveTable))}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(21),i(79),i(31)],void 0===(o=function(t){return t.Sampler=function(e){var i=Array.prototype.slice.call(arguments);i.shift();var n=t.defaults(i,["onload","baseUrl"],t.Sampler);t.Instrument.call(this,n);var o={};for(var s in e)if(t.isNote(s)){o[t.Frequency(s).toMidi()]=e[s]}else{if(isNaN(parseFloat(s)))throw new Error("Tone.Sampler: url keys must be the note's pitch");o[s]=e[s]}this._buffers=new t.Buffers(o,n.onload,n.baseUrl),this._activeSources={},this.attack=n.attack,this.release=n.release,this.curve=n.curve},t.extend(t.Sampler,t.Instrument),t.Sampler.defaults={attack:0,release:.1,onload:t.noOp,baseUrl:"",curve:"exponential"},t.Sampler.prototype._findClosest=function(t){for(var e=0;e<96;){if(this._buffers.has(t+e))return-e;if(this._buffers.has(t-e))return e;e++}return null},t.Sampler.prototype.triggerAttack=function(e,i,n){this.log("triggerAttack",e,i,n),Array.isArray(e)||(e=[e]);for(var o=0;o<e.length;o++){var s=t.Frequency(e[o]).toMidi(),r=this._findClosest(s);if(null!==r){var a=s-r,l=this._buffers.get(a),h=t.intervalToFrequencyRatio(r),u=new t.BufferSource({buffer:l,playbackRate:h,fadeIn:this.attack,fadeOut:this.release,curve:this.curve}).connect(this.output);u.start(i,0,l.duration/h,n),t.isArray(this._activeSources[s])||(this._activeSources[s]=[]),this._activeSources[s].push(u),u.onended=function(){if(this._activeSources&&this._activeSources[s]){var t=this._activeSources[s].indexOf(u);-1!==t&&this._activeSources[s].splice(t,1)}}.bind(this)}}return this},t.Sampler.prototype.triggerRelease=function(e,i){this.log("triggerRelease",e,i),Array.isArray(e)||(e=[e]);for(var n=0;n<e.length;n++){var o=t.Frequency(e[n]).toMidi();if(this._activeSources[o]&&this._activeSources[o].length){var s=this._activeSources[o].shift();i=this.toSeconds(i),s.stop(i)}}return this},t.Sampler.prototype.releaseAll=function(t){for(var e in t=this.toSeconds(t),this._activeSources)for(var i=this._activeSources[e];i.length;){i.shift().stop(t)}return this},t.Sampler.prototype.sync=function(){return this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1),this},t.Sampler.prototype.triggerAttackRelease=function(e,i,n,o){if(n=this.toSeconds(n),this.triggerAttack(e,n,o),t.isArray(i)&&t.isArray(e))for(var s=0;s<e.length;s++){var r=i[Math.min(s,i.length-1)];this.triggerRelease(e[s],n+this.toSeconds(r))}else this.triggerRelease(e,n+this.toSeconds(i));return this},t.Sampler.prototype.add=function(e,i,n){if(t.isNote(e)){var o=t.Frequency(e).toMidi();this._buffers.add(o,i,n)}else{if(isNaN(parseFloat(e)))throw new Error("Tone.Sampler: note must be the note's pitch. Instead got "+e);this._buffers.add(e,i,n)}},Object.defineProperty(t.Sampler.prototype,"loaded",{get:function(){return this._buffers.loaded}}),t.Sampler.prototype.dispose=function(){for(var e in t.Instrument.prototype.dispose.call(this),this._buffers.dispose(),this._buffers=null,this._activeSources)this._activeSources[e].forEach(function(t){t.dispose()});return this._activeSources=null,this},t.Sampler}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(38),i(6)],void 0===(o=function(t){"use strict";return t.PolySynth=function(){var e=t.defaults(arguments,["polyphony","voice"],t.PolySynth);t.Instrument.call(this,e),(e=t.defaultArg(e,t.Instrument.defaults)).polyphony=Math.min(t.PolySynth.MAX_POLYPHONY,e.polyphony),this.voices=new Array(e.polyphony),this.assert(e.polyphony>0,"polyphony must be greater than 0"),this.detune=new t.Signal(e.detune,t.Type.Cents),this._readOnly("detune");for(var i=0;i<e.polyphony;i++){var n=new e.voice(arguments[2],arguments[3]);if(!(n instanceof t.Monophonic))throw new Error("Synth constructor must be instance of Tone.Monophonic");this.voices[i]=n,n.index=i,n.connect(this.output),n.hasOwnProperty("detune")&&this.detune.connect(n.detune)}},t.extend(t.PolySynth,t.Instrument),t.PolySynth.defaults={polyphony:4,volume:0,detune:0,voice:t.Synth},t.PolySynth.prototype._getClosestVoice=function(e,i){var n=this.voices.find(function(n){if(Math.abs(n.frequency.getValueAtTime(e)-t.Frequency(i))<1e-4&&n.getLevelAtTime(e)>1e-5)return n});return n||this.voices.slice().sort(function(t,i){var n=t.getLevelAtTime(e+this.blockTime),o=i.getLevelAtTime(e+this.blockTime);return n<1e-5&&(n=0),o<1e-5&&(o=0),n-o}.bind(this))[0]},t.PolySynth.prototype.triggerAttack=function(t,e,i){return Array.isArray(t)||(t=[t]),e=this.toSeconds(e),t.forEach(function(t){var n=this._getClosestVoice(e,t);n.triggerAttack(t,e,i),this.log("triggerAttack",n.index,t)}.bind(this)),this},t.PolySynth.prototype.triggerRelease=function(t,e){return Array.isArray(t)||(t=[t]),e=this.toSeconds(e),t.forEach(function(t){var i=this._getClosestVoice(e,t);this.log("triggerRelease",i.index,t),i.triggerRelease(e)}.bind(this)),this},t.PolySynth.prototype.triggerAttackRelease=function(e,i,n,o){if(n=this.toSeconds(n),this.triggerAttack(e,n,o),t.isArray(i)&&t.isArray(e))for(var s=0;s<e.length;s++){var r=i[Math.min(s,i.length-1)];this.triggerRelease(e[s],n+this.toSeconds(r))}else this.triggerRelease(e,n+this.toSeconds(i));return this},t.PolySynth.prototype.sync=function(){return this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1),this},t.PolySynth.prototype.set=function(t,e,i){for(var n=0;n<this.voices.length;n++)this.voices[n].set(t,e,i);return this},t.PolySynth.prototype.get=function(t){return this.voices[0].get(t)},t.PolySynth.prototype.releaseAll=function(t){return t=this.toSeconds(t),this.voices.forEach(function(e){e.triggerRelease(t)}),this},t.PolySynth.prototype.dispose=function(){return t.Instrument.prototype.dispose.call(this),this.voices.forEach(function(t){t.dispose()}),this._writable("detune"),this.detune.dispose(),this.detune=null,this.voices=null,this},t.PolySynth.MAX_POLYPHONY=20,t.PolySynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(21),i(39),i(53)],void 0===(o=function(t){"use strict";return t.PluckSynth=function(e){e=t.defaultArg(e,t.PluckSynth.defaults),t.Instrument.call(this,e),this._noise=new t.Noise("pink"),this.attackNoise=e.attackNoise,this._lfcf=new t.LowpassCombFilter({resonance:e.resonance,dampening:e.dampening}),this.resonance=this._lfcf.resonance,this.dampening=this._lfcf.dampening,this._noise.connect(this._lfcf),this._lfcf.connect(this.output),this._readOnly(["resonance","dampening"])},t.extend(t.PluckSynth,t.Instrument),t.PluckSynth.defaults={attackNoise:1,dampening:4e3,resonance:.7},t.PluckSynth.prototype.triggerAttack=function(t,e){t=this.toFrequency(t),e=this.toSeconds(e);var i=1/t;return this._lfcf.delayTime.setValueAtTime(i,e),this._noise.start(e),this._noise.stop(e+i*this.attackNoise),this},t.PluckSynth.prototype.dispose=function(){return t.Instrument.prototype.dispose.call(this),this._noise.dispose(),this._lfcf.dispose(),this._noise=null,this._lfcf=null,this._writable(["resonance","dampening"]),this.dampening=null,this.resonance=null,this},t.PluckSynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(30),i(41),i(39),i(1),i(9),i(21)],void 0===(o=function(t){"use strict";return t.NoiseSynth=function(e){e=t.defaultArg(e,t.NoiseSynth.defaults),t.Instrument.call(this,e),this.noise=new t.Noise(e.noise),this.envelope=new t.AmplitudeEnvelope(e.envelope),this.noise.chain(this.envelope,this.output),this._readOnly(["noise","envelope"])},t.extend(t.NoiseSynth,t.Instrument),t.NoiseSynth.defaults={noise:{type:"white"},envelope:{attack:.005,decay:.1,sustain:0}},t.NoiseSynth.prototype.triggerAttack=function(t,e){return t=this.toSeconds(t),this.envelope.triggerAttack(t,e),this.noise.start(t),0===this.envelope.sustain&&this.noise.stop(t+this.envelope.attack+this.envelope.decay),this},t.NoiseSynth.prototype.triggerRelease=function(t){return this.envelope.triggerRelease(t),this.noise.stop(t+this.envelope.release),this},t.NoiseSynth.prototype.sync=function(){return this._syncMethod("triggerAttack",0),this._syncMethod("triggerRelease",0),this},t.NoiseSynth.prototype.triggerAttackRelease=function(t,e,i){return e=this.toSeconds(e),t=this.toSeconds(t),this.triggerAttack(e,i),this.triggerRelease(e+t),this},t.NoiseSynth.prototype.dispose=function(){return t.Instrument.prototype.dispose.call(this),this._writable(["noise","envelope"]),this.noise.dispose(),this.noise=null,this.envelope.dispose(),this.envelope=null,this},t.NoiseSynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(21),i(48),i(9),i(41),i(30),i(3),i(26),i(5)],void 0===(o=function(t){var e=[1,1.483,1.932,2.546,2.63,3.897];return t.MetalSynth=function(i){i=t.defaultArg(i,t.MetalSynth.defaults),t.Instrument.call(this,i),this.frequency=new t.Signal(i.frequency,t.Type.Frequency),this._oscillators=[],this._freqMultipliers=[],this._amplitue=new t.Gain(0).connect(this.output),this._highpass=new t.Filter({type:"highpass",Q:-3.0102999566398125}).connect(this._amplitue),this._octaves=i.octaves,this._filterFreqScaler=new t.Scale(i.resonance,7e3),this.envelope=new t.Envelope({attack:i.envelope.attack,attackCurve:"linear",decay:i.envelope.decay,sustain:0,release:i.envelope.release}).chain(this._filterFreqScaler,this._highpass.frequency),this.envelope.connect(this._amplitue.gain);for(var n=0;n<e.length;n++){var o=new t.FMOscillator({type:"square",modulationType:"square",harmonicity:i.harmonicity,modulationIndex:i.modulationIndex});o.connect(this._highpass),this._oscillators[n]=o;var s=new t.Multiply(e[n]);this._freqMultipliers[n]=s,this.frequency.chain(s,o.frequency)}this.octaves=i.octaves},t.extend(t.MetalSynth,t.Instrument),t.MetalSynth.defaults={frequency:200,envelope:{attack:.001,decay:1.4,release:.2},harmonicity:5.1,modulationIndex:32,resonance:4e3,octaves:1.5},t.MetalSynth.prototype.triggerAttack=function(e,i){return e=this.toSeconds(e),i=t.defaultArg(i,1),this.envelope.triggerAttack(e,i),this._oscillators.forEach(function(t){t.start(e)}),0===this.envelope.sustain&&this._oscillators.forEach(function(t){t.stop(e+this.envelope.attack+this.envelope.decay)}.bind(this)),this},t.MetalSynth.prototype.triggerRelease=function(t){return t=this.toSeconds(t),this.envelope.triggerRelease(t),this._oscillators.forEach(function(e){e.stop(t+this.envelope.release)}.bind(this)),this},t.MetalSynth.prototype.sync=function(){return this._syncMethod("triggerAttack",0),this._syncMethod("triggerRelease",0),this},t.MetalSynth.prototype.triggerAttackRelease=function(t,e,i){return e=this.toSeconds(e),t=this.toSeconds(t),this.triggerAttack(e,i),this.triggerRelease(e+t),this},Object.defineProperty(t.MetalSynth.prototype,"modulationIndex",{get:function(){return this._oscillators[0].modulationIndex.value},set:function(t){for(var e=0;e<this._oscillators.length;e++)this._oscillators[e].modulationIndex.value=t}}),Object.defineProperty(t.MetalSynth.prototype,"harmonicity",{get:function(){return this._oscillators[0].harmonicity.value},set:function(t){for(var e=0;e<this._oscillators.length;e++)this._oscillators[e].harmonicity.value=t}}),Object.defineProperty(t.MetalSynth.prototype,"resonance",{get:function(){return this._filterFreqScaler.min},set:function(t){this._filterFreqScaler.min=t,this.octaves=this._octaves}}),Object.defineProperty(t.MetalSynth.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t,this._filterFreqScaler.max=this._filterFreqScaler.min*Math.pow(2,t)}}),t.MetalSynth.prototype.dispose=function(){t.Instrument.prototype.dispose.call(this);for(var e=0;e<this._oscillators.length;e++)this._oscillators[e].dispose(),this._freqMultipliers[e].dispose();this._oscillators=null,this._freqMultipliers=null,this.frequency.dispose(),this.frequency=null,this._filterFreqScaler.dispose(),this._filterFreqScaler=null,this._amplitue.dispose(),this._amplitue=null,this.envelope.dispose(),this.envelope=null,this._highpass.dispose(),this._highpass=null},t.MetalSynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(37),i(21),i(30)],void 0===(o=function(t){"use strict";return t.MembraneSynth=function(e){e=t.defaultArg(e,t.MembraneSynth.defaults),t.Instrument.call(this,e),this.oscillator=new t.OmniOscillator(e.oscillator),this.envelope=new t.AmplitudeEnvelope(e.envelope),this.octaves=e.octaves,this.pitchDecay=e.pitchDecay,this.oscillator.chain(this.envelope,this.output),this._readOnly(["oscillator","envelope"])},t.extend(t.MembraneSynth,t.Instrument),t.MembraneSynth.defaults={pitchDecay:.05,octaves:10,oscillator:{type:"sine"},envelope:{attack:.001,decay:.4,sustain:.01,release:1.4,attackCurve:"exponential"}},t.MembraneSynth.prototype.triggerAttack=function(t,e,i){e=this.toSeconds(e);var n=(t=this.toFrequency(t))*this.octaves;return this.oscillator.frequency.setValueAtTime(n,e),this.oscillator.frequency.exponentialRampToValueAtTime(t,e+this.toSeconds(this.pitchDecay)),this.envelope.triggerAttack(e,i),this.oscillator.start(e),0===this.envelope.sustain&&this.oscillator.stop(e+this.envelope.attack+this.envelope.decay),this},t.MembraneSynth.prototype.triggerRelease=function(t){return t=this.toSeconds(t),this.envelope.triggerRelease(t),this.oscillator.stop(t+this.envelope.release),this},t.MembraneSynth.prototype.dispose=function(){return t.Instrument.prototype.dispose.call(this),this._writable(["oscillator","envelope"]),this.oscillator.dispose(),this.oscillator=null,this.envelope.dispose(),this.envelope=null,this},t.MembraneSynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(38),i(1),i(5),i(25)],void 0===(o=function(t){"use strict";return t.FMSynth=function(e){e=t.defaultArg(e,t.FMSynth.defaults),t.Monophonic.call(this,e),this._carrier=new t.Synth(e.carrier),this._carrier.volume.value=-10,this.oscillator=this._carrier.oscillator,this.envelope=this._carrier.envelope.set(e.envelope),this._modulator=new t.Synth(e.modulator),this._modulator.volume.value=-10,this.modulation=this._modulator.oscillator.set(e.modulation),this.modulationEnvelope=this._modulator.envelope.set(e.modulationEnvelope),this.frequency=new t.Signal(440,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this.modulationIndex=new t.Multiply(e.modulationIndex),this.modulationIndex.units=t.Type.Positive,this._modulationNode=new t.Gain(0),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this.detune.fan(this._carrier.detune,this._modulator.detune),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this._readOnly(["frequency","harmonicity","modulationIndex","oscillator","envelope","modulation","modulationEnvelope","detune"])},t.extend(t.FMSynth,t.Monophonic),t.FMSynth.defaults={harmonicity:3,modulationIndex:10,detune:0,oscillator:{type:"sine"},envelope:{attack:.01,decay:.01,sustain:1,release:.5},modulation:{type:"square"},modulationEnvelope:{attack:.5,decay:0,sustain:1,release:.5}},t.FMSynth.prototype._triggerEnvelopeAttack=function(t,e){return t=this.toSeconds(t),this._carrier._triggerEnvelopeAttack(t,e),this._modulator._triggerEnvelopeAttack(t),this},t.FMSynth.prototype._triggerEnvelopeRelease=function(t){return t=this.toSeconds(t),this._carrier._triggerEnvelopeRelease(t),this._modulator._triggerEnvelopeRelease(t),this},t.FMSynth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["frequency","harmonicity","modulationIndex","oscillator","envelope","modulation","modulationEnvelope","detune"]),this._carrier.dispose(),this._carrier=null,this._modulator.dispose(),this._modulator=null,this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this.modulationIndex.dispose(),this.modulationIndex=null,this.harmonicity.dispose(),this.harmonicity=null,this._modulationNode.dispose(),this._modulationNode=null,this.oscillator=null,this.envelope=null,this.modulationEnvelope=null,this.modulation=null,this},t.FMSynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(68),i(12),i(1),i(5),i(25),i(14)],void 0===(o=function(t){"use strict";return t.DuoSynth=function(e){e=t.defaultArg(e,t.DuoSynth.defaults),t.Monophonic.call(this,e),this.voice0=new t.MonoSynth(e.voice0),this.voice0.volume.value=-10,this.voice1=new t.MonoSynth(e.voice1),this.voice1.volume.value=-10,this._vibrato=new t.LFO(e.vibratoRate,-50,50),this._vibrato.start(),this.vibratoRate=this._vibrato.frequency,this._vibratoGain=new t.Gain(e.vibratoAmount,t.Type.Positive),this.vibratoAmount=this._vibratoGain.gain,this.frequency=new t.Signal(440,t.Type.Frequency),this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this.frequency.connect(this.voice0.frequency),this.frequency.chain(this.harmonicity,this.voice1.frequency),this._vibrato.connect(this._vibratoGain),this._vibratoGain.fan(this.voice0.detune,this.voice1.detune),this.voice0.connect(this.output),this.voice1.connect(this.output),this._readOnly(["voice0","voice1","frequency","vibratoAmount","vibratoRate"])},t.extend(t.DuoSynth,t.Monophonic),t.DuoSynth.defaults={vibratoAmount:.5,vibratoRate:5,harmonicity:1.5,voice0:{volume:-10,portamento:0,oscillator:{type:"sine"},filterEnvelope:{attack:.01,decay:0,sustain:1,release:.5},envelope:{attack:.01,decay:0,sustain:1,release:.5}},voice1:{volume:-10,portamento:0,oscillator:{type:"sine"},filterEnvelope:{attack:.01,decay:0,sustain:1,release:.5},envelope:{attack:.01,decay:0,sustain:1,release:.5}}},t.DuoSynth.prototype._triggerEnvelopeAttack=function(t,e){return t=this.toSeconds(t),this.voice0._triggerEnvelopeAttack(t,e),this.voice1._triggerEnvelopeAttack(t,e),this},t.DuoSynth.prototype._triggerEnvelopeRelease=function(t){return this.voice0._triggerEnvelopeRelease(t),this.voice1._triggerEnvelopeRelease(t),this},t.DuoSynth.prototype.getLevelAtTime=function(t){return(this.voice0.getLevelAtTime(t)+this.voice1.getLevelAtTime(t))/2},t.DuoSynth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["voice0","voice1","frequency","vibratoAmount","vibratoRate"]),this.voice0.dispose(),this.voice0=null,this.voice1.dispose(),this.voice1=null,this.frequency.dispose(),this.frequency=null,this._vibratoGain.dispose(),this._vibratoGain=null,this._vibrato=null,this.harmonicity.dispose(),this.harmonicity=null,this.vibratoAmount.dispose(),this.vibratoAmount=null,this.vibratoRate=null,this},t.DuoSynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(38),i(1),i(5),i(25),i(22),i(3)],void 0===(o=function(t){"use strict";return t.AMSynth=function(e){e=t.defaultArg(e,t.AMSynth.defaults),t.Monophonic.call(this,e),this._carrier=new t.Synth,this._carrier.volume.value=-10,this.oscillator=this._carrier.oscillator.set(e.oscillator),this.envelope=this._carrier.envelope.set(e.envelope),this._modulator=new t.Synth,this._modulator.volume.value=-10,this.modulation=this._modulator.oscillator.set(e.modulation),this.modulationEnvelope=this._modulator.envelope.set(e.modulationEnvelope),this.frequency=new t.Signal(440,t.Type.Frequency),this.detune=new t.Signal(e.detune,t.Type.Cents),this.harmonicity=new t.Multiply(e.harmonicity),this.harmonicity.units=t.Type.Positive,this._modulationScale=new t.AudioToGain,this._modulationNode=new t.Gain,this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.detune.fan(this._carrier.detune,this._modulator.detune),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),this._readOnly(["frequency","harmonicity","oscillator","envelope","modulation","modulationEnvelope","detune"])},t.extend(t.AMSynth,t.Monophonic),t.AMSynth.defaults={harmonicity:3,detune:0,oscillator:{type:"sine"},envelope:{attack:.01,decay:.01,sustain:1,release:.5},modulation:{type:"square"},modulationEnvelope:{attack:.5,decay:0,sustain:1,release:.5}},t.AMSynth.prototype._triggerEnvelopeAttack=function(t,e){return t=this.toSeconds(t),this._carrier._triggerEnvelopeAttack(t,e),this._modulator._triggerEnvelopeAttack(t),this},t.AMSynth.prototype._triggerEnvelopeRelease=function(t){return this._carrier._triggerEnvelopeRelease(t),this._modulator._triggerEnvelopeRelease(t),this},t.AMSynth.prototype.dispose=function(){return t.Monophonic.prototype.dispose.call(this),this._writable(["frequency","harmonicity","oscillator","envelope","modulation","modulationEnvelope","detune"]),this._carrier.dispose(),this._carrier=null,this._modulator.dispose(),this._modulator=null,this.frequency.dispose(),this.frequency=null,this.detune.dispose(),this.detune=null,this.harmonicity.dispose(),this.harmonicity=null,this._modulationScale.dispose(),this._modulationScale=null,this._modulationNode.dispose(),this._modulationNode=null,this.oscillator=null,this.envelope=null,this.modulationEnvelope=null,this.modulation=null,this},t.AMSynth}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(72),i(16)],void 0===(o=function(t){"use strict";return t.Sequence=function(){var e=t.defaults(arguments,["callback","events","subdivision"],t.Sequence),i=e.events;if(delete e.events,t.Part.call(this,e),this._subdivision=this.toTicks(e.subdivision),t.isUndef(e.loopEnd)&&t.isDefined(i)&&(this._loopEnd=i.length*this._subdivision),this._loop=!0,t.isDefined(i))for(var n=0;n<i.length;n++)this.add(n,i[n])},t.extend(t.Sequence,t.Part),t.Sequence.defaults={subdivision:"4n"},Object.defineProperty(t.Sequence.prototype,"subdivision",{get:function(){return t.Ticks(this._subdivision).toSeconds()}}),t.Sequence.prototype.at=function(e,i){return t.isArray(i)&&this.remove(e),t.Part.prototype.at.call(this,this._indexTime(e),i)},t.Sequence.prototype.add=function(e,i){if(null===i)return this;if(t.isArray(i)){var n=Math.round(this._subdivision/i.length);i=new t.Sequence(this._tick.bind(this),i,t.Ticks(n))}return t.Part.prototype.add.call(this,this._indexTime(e),i),this},t.Sequence.prototype.remove=function(e,i){return t.Part.prototype.remove.call(this,this._indexTime(e),i),this},t.Sequence.prototype._indexTime=function(e){return e instanceof t.TransportTime?e:t.Ticks(e*this._subdivision+this.startOffset).toSeconds()},t.Sequence.prototype.dispose=function(){return t.Part.prototype.dispose.call(this),this},t.Sequence}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(73),i(80)],void 0===(o=function(t){return t.Pattern=function(){var e=t.defaults(arguments,["callback","values","pattern"],t.Pattern);t.Loop.call(this,e),this._pattern=new t.CtrlPattern({values:e.values,type:e.pattern,index:e.index})},t.extend(t.Pattern,t.Loop),t.Pattern.defaults={pattern:t.CtrlPattern.Type.Up,callback:t.noOp,values:[]},t.Pattern.prototype._tick=function(t){this.callback(t,this._pattern.value),this._pattern.next()},Object.defineProperty(t.Pattern.prototype,"index",{get:function(){return this._pattern.index},set:function(t){this._pattern.index=t}}),Object.defineProperty(t.Pattern.prototype,"values",{get:function(){return this._pattern.values},set:function(t){this._pattern.values=t}}),Object.defineProperty(t.Pattern.prototype,"value",{get:function(){return this._pattern.value}}),Object.defineProperty(t.Pattern.prototype,"pattern",{get:function(){return this._pattern.type},set:function(t){this._pattern.type=t}}),t.Pattern.prototype.dispose=function(){t.Loop.prototype.dispose.call(this),this._pattern.dispose(),this._pattern=null},t.Pattern}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(18),i(12)],void 0===(o=function(t){"use strict";return t.Vibrato=function(){var e=t.defaults(arguments,["frequency","depth"],t.Vibrato);t.Effect.call(this,e),this._delayNode=new t.Delay(0,e.maxDelay),this._lfo=new t.LFO({type:e.type,min:0,max:e.maxDelay,frequency:e.frequency,phase:-90}).start().connect(this._delayNode.delayTime),this.frequency=this._lfo.frequency,this.depth=this._lfo.amplitude,this.depth.value=e.depth,this._readOnly(["frequency","depth"]),this.effectSend.chain(this._delayNode,this.effectReturn)},t.extend(t.Vibrato,t.Effect),t.Vibrato.defaults={maxDelay:.005,frequency:5,depth:.1,type:"sine"},Object.defineProperty(t.Vibrato.prototype,"type",{get:function(){return this._lfo.type},set:function(t){this._lfo.type=t}}),t.Vibrato.prototype.dispose=function(){t.Effect.prototype.dispose.call(this),this._delayNode.dispose(),this._delayNode=null,this._lfo.dispose(),this._lfo=null,this._writable(["frequency","depth"]),this.frequency=null,this.depth=null},t.Vibrato}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(12),i(15)],void 0===(o=function(t){"use strict";return t.Tremolo=function(){var e=t.defaults(arguments,["frequency","depth"],t.Tremolo);t.StereoEffect.call(this,e),this._lfoL=new t.LFO({phase:e.spread,min:1,max:0}),this._lfoR=new t.LFO({phase:e.spread,min:1,max:0}),this._amplitudeL=new t.Gain,this._amplitudeR=new t.Gain,this.frequency=new t.Signal(e.frequency,t.Type.Frequency),this.depth=new t.Signal(e.depth,t.Type.NormalRange),this._readOnly(["frequency","depth"]),this.effectSendL.chain(this._amplitudeL,this.effectReturnL),this.effectSendR.chain(this._amplitudeR,this.effectReturnR),this._lfoL.connect(this._amplitudeL.gain),this._lfoR.connect(this._amplitudeR.gain),this.frequency.fan(this._lfoL.frequency,this._lfoR.frequency),this.depth.fan(this._lfoR.amplitude,this._lfoL.amplitude),this.type=e.type,this.spread=e.spread},t.extend(t.Tremolo,t.StereoEffect),t.Tremolo.defaults={frequency:10,type:"sine",depth:.5,spread:180},t.Tremolo.prototype.start=function(t){return this._lfoL.start(t),this._lfoR.start(t),this},t.Tremolo.prototype.stop=function(t){return this._lfoL.stop(t),this._lfoR.stop(t),this},t.Tremolo.prototype.sync=function(e){return this._lfoL.sync(e),this._lfoR.sync(e),t.Transport.syncSignal(this.frequency),this},t.Tremolo.prototype.unsync=function(){return this._lfoL.unsync(),this._lfoR.unsync(),t.Transport.unsyncSignal(this.frequency),this},Object.defineProperty(t.Tremolo.prototype,"type",{get:function(){return this._lfoL.type},set:function(t){this._lfoL.type=t,this._lfoR.type=t}}),Object.defineProperty(t.Tremolo.prototype,"spread",{get:function(){return this._lfoR.phase-this._lfoL.phase},set:function(t){this._lfoL.phase=90-t/2,this._lfoR.phase=t/2+90}}),t.Tremolo.prototype.dispose=function(){return t.StereoEffect.prototype.dispose.call(this),this._writable(["frequency","depth"]),this._lfoL.dispose(),this._lfoL=null,this._lfoR.dispose(),this._lfoR=null,this._amplitudeL.dispose(),this._amplitudeL=null,this._amplitudeR.dispose(),this._amplitudeR=null,this.frequency=null,this.depth=null,this},t.Tremolo}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(75),i(1),i(5),i(13)],void 0===(o=function(t){"use strict";return t.StereoWidener=function(){var e=t.defaults(arguments,["width"],t.StereoWidener);t.MidSideEffect.call(this,e),this.width=new t.Signal(e.width,t.Type.NormalRange),this._readOnly(["width"]),this._twoTimesWidthMid=new t.Multiply(2),this._twoTimesWidthSide=new t.Multiply(2),this._midMult=new t.Multiply,this._twoTimesWidthMid.connect(this._midMult,0,1),this.midSend.chain(this._midMult,this.midReturn),this._oneMinusWidth=new t.Subtract,this._oneMinusWidth.connect(this._twoTimesWidthMid),this.context.getConstant(1).connect(this._oneMinusWidth,0,0),this.width.connect(this._oneMinusWidth,0,1),this._sideMult=new t.Multiply,this.width.connect(this._twoTimesWidthSide),this._twoTimesWidthSide.connect(this._sideMult,0,1),this.sideSend.chain(this._sideMult,this.sideReturn)},t.extend(t.StereoWidener,t.MidSideEffect),t.StereoWidener.defaults={width:.5},t.StereoWidener.prototype.dispose=function(){return t.MidSideEffect.prototype.dispose.call(this),this._writable(["width"]),this.width.dispose(),this.width=null,this._midMult.dispose(),this._midMult=null,this._sideMult.dispose(),this._sideMult=null,this._twoTimesWidthMid.dispose(),this._twoTimesWidthMid=null,this._twoTimesWidthSide.dispose(),this._twoTimesWidthSide=null,this._oneMinusWidth.dispose(),this._oneMinusWidth=null,this},t.StereoWidener}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(15),i(32),i(3)],void 0===(o=function(t){"use strict";return t.StereoFeedbackEffect=function(){var e=t.defaults(arguments,["feedback"],t.FeedbackEffect);t.StereoEffect.call(this,e),this.feedback=new t.Signal(e.feedback,t.Type.NormalRange),this._feedbackL=new t.Gain,this._feedbackR=new t.Gain,this.effectReturnL.chain(this._feedbackL,this.effectSendL),this.effectReturnR.chain(this._feedbackR,this.effectSendR),this.feedback.fan(this._feedbackL.gain,this._feedbackR.gain),this._readOnly(["feedback"])},t.extend(t.StereoFeedbackEffect,t.StereoEffect),t.StereoFeedbackEffect.prototype.dispose=function(){return t.StereoEffect.prototype.dispose.call(this),this._writable(["feedback"]),this.feedback.dispose(),this.feedback=null,this._feedbackL.dispose(),this._feedbackL=null,this._feedbackR.dispose(),this._feedbackR=null,this},t.StereoFeedbackEffect}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(78),i(9),i(10),i(39),i(3),i(76)],void 0===(o=function(t){"use strict";return t.Reverb=function(){var e=t.defaults(arguments,["decay"],t.Reverb);t.Effect.call(this,e),this._convolver=this.context.createConvolver(),this.decay=e.decay,this.preDelay=e.preDelay,this.connectEffect(this._convolver)},t.extend(t.Reverb,t.Effect),t.Reverb.defaults={decay:1.5,preDelay:.01},t.Reverb.prototype.generate=function(){return t.Offline(function(){var e=new t.Noise,i=new t.Noise,n=new t.Merge;e.connect(n.left),i.connect(n.right);var o=(new t.Gain).toMaster();n.connect(o),e.start(0),i.start(0),o.gain.setValueAtTime(0,0),o.gain.linearRampToValueAtTime(1,this.preDelay),o.gain.exponentialApproachValueAtTime(0,this.preDelay,this.decay-this.preDelay)}.bind(this),this.decay).then(function(t){return this._convolver.buffer=t.get(),this}.bind(this))},t.Reverb.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._convolver.disconnect(),this._convolver=null,this},t.Reverb}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(12),i(23),i(1),i(32),i(18)],void 0===(o=function(t){"use strict";return t.PitchShift=function(){var e=t.defaults(arguments,["pitch"],t.PitchShift);t.FeedbackEffect.call(this,e),this._frequency=new t.Signal(0),this._delayA=new t.Delay(0,1),this._lfoA=new t.LFO({min:0,max:.1,type:"sawtooth"}).connect(this._delayA.delayTime),this._delayB=new t.Delay(0,1),this._lfoB=new t.LFO({min:0,max:.1,type:"sawtooth",phase:180}).connect(this._delayB.delayTime),this._crossFade=new t.CrossFade,this._crossFadeLFO=new t.LFO({min:0,max:1,type:"triangle",phase:90}).connect(this._crossFade.fade),this._feedbackDelay=new t.Delay(e.delayTime),this.delayTime=this._feedbackDelay.delayTime,this._readOnly("delayTime"),this._pitch=e.pitch,this._windowSize=e.windowSize,this._delayA.connect(this._crossFade.a),this._delayB.connect(this._crossFade.b),this._frequency.fan(this._lfoA.frequency,this._lfoB.frequency,this._crossFadeLFO.frequency),this.effectSend.fan(this._delayA,this._delayB),this._crossFade.chain(this._feedbackDelay,this.effectReturn);var i=this.now();this._lfoA.start(i),this._lfoB.start(i),this._crossFadeLFO.start(i),this.windowSize=this._windowSize},t.extend(t.PitchShift,t.FeedbackEffect),t.PitchShift.defaults={pitch:0,windowSize:.1,delayTime:0,feedback:0},Object.defineProperty(t.PitchShift.prototype,"pitch",{get:function(){return this._pitch},set:function(e){this._pitch=e;var i=0;e<0?(this._lfoA.min=0,this._lfoA.max=this._windowSize,this._lfoB.min=0,this._lfoB.max=this._windowSize,i=t.intervalToFrequencyRatio(e-1)+1):(this._lfoA.min=this._windowSize,this._lfoA.max=0,this._lfoB.min=this._windowSize,this._lfoB.max=0,i=t.intervalToFrequencyRatio(e)-1),this._frequency.value=i*(1.2/this._windowSize)}}),Object.defineProperty(t.PitchShift.prototype,"windowSize",{get:function(){return this._windowSize},set:function(t){this._windowSize=this.toSeconds(t),this.pitch=this._pitch}}),t.PitchShift.prototype.dispose=function(){return t.FeedbackEffect.prototype.dispose.call(this),this._frequency.dispose(),this._frequency=null,this._delayA.disconnect(),this._delayA=null,this._delayB.disconnect(),this._delayB=null,this._lfoA.dispose(),this._lfoA=null,this._lfoB.dispose(),this._lfoB=null,this._crossFade.dispose(),this._crossFade=null,this._crossFadeLFO.dispose(),this._crossFadeLFO=null,this._writable("delayTime"),this._feedbackDelay.dispose(),this._feedbackDelay=null,this.delayTime=null,this},t.PitchShift}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(74),i(1),i(18)],void 0===(o=function(t){"use strict";return t.PingPongDelay=function(){var e=t.defaults(arguments,["delayTime","feedback"],t.PingPongDelay);t.StereoXFeedbackEffect.call(this,e),this._leftDelay=new t.Delay(0,e.maxDelayTime),this._rightDelay=new t.Delay(0,e.maxDelayTime),this._rightPreDelay=new t.Delay(0,e.maxDelayTime),this.delayTime=new t.Signal(e.delayTime,t.Type.Time),this.effectSendL.chain(this._leftDelay,this.effectReturnL),this.effectSendR.chain(this._rightPreDelay,this._rightDelay,this.effectReturnR),this.delayTime.fan(this._leftDelay.delayTime,this._rightDelay.delayTime,this._rightPreDelay.delayTime),this._feedbackLR.disconnect(),this._feedbackLR.connect(this._rightDelay),this._readOnly(["delayTime"])},t.extend(t.PingPongDelay,t.StereoXFeedbackEffect),t.PingPongDelay.defaults={delayTime:.25,maxDelayTime:1},t.PingPongDelay.prototype.dispose=function(){return t.StereoXFeedbackEffect.prototype.dispose.call(this),this._leftDelay.dispose(),this._leftDelay=null,this._rightDelay.dispose(),this._rightDelay=null,this._rightPreDelay.dispose(),this._rightPreDelay=null,this._writable(["delayTime"]),this.delayTime.dispose(),this.delayTime=null,this},t.PingPongDelay}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(12),i(9),i(15)],void 0===(o=function(t){"use strict";return t.Phaser=function(){var e=t.defaults(arguments,["frequency","octaves","baseFrequency"],t.Phaser);t.StereoEffect.call(this,e),this._lfoL=new t.LFO(e.frequency,0,1),this._lfoR=new t.LFO(e.frequency,0,1),this._lfoR.phase=180,this._baseFrequency=e.baseFrequency,this._octaves=e.octaves,this.Q=new t.Signal(e.Q,t.Type.Positive),this._filtersL=this._makeFilters(e.stages,this._lfoL,this.Q),this._filtersR=this._makeFilters(e.stages,this._lfoR,this.Q),this.frequency=this._lfoL.frequency,this.frequency.value=e.frequency,this.effectSendL.connect(this._filtersL[0]),this.effectSendR.connect(this._filtersR[0]),this._filtersL[e.stages-1].connect(this.effectReturnL),this._filtersR[e.stages-1].connect(this.effectReturnR),this._lfoL.frequency.connect(this._lfoR.frequency),this.baseFrequency=e.baseFrequency,this.octaves=e.octaves,this._lfoL.start(),this._lfoR.start(),this._readOnly(["frequency","Q"])},t.extend(t.Phaser,t.StereoEffect),t.Phaser.defaults={frequency:.5,octaves:3,stages:10,Q:10,baseFrequency:350},t.Phaser.prototype._makeFilters=function(e,i,n){for(var o=new Array(e),s=0;s<e;s++){var r=this.context.createBiquadFilter();r.type="allpass",n.connect(r.Q),i.connect(r.frequency),o[s]=r}return t.connectSeries.apply(t,o),o},Object.defineProperty(t.Phaser.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t;var e=this._baseFrequency*Math.pow(2,t);this._lfoL.max=e,this._lfoR.max=e}}),Object.defineProperty(t.Phaser.prototype,"baseFrequency",{get:function(){return this._baseFrequency},set:function(t){this._baseFrequency=t,this._lfoL.min=t,this._lfoR.min=t,this.octaves=this._octaves}}),t.Phaser.prototype.dispose=function(){t.StereoEffect.prototype.dispose.call(this),this._writable(["frequency","Q"]),this.Q.dispose(),this.Q=null,this._lfoL.dispose(),this._lfoL=null,this._lfoR.dispose(),this._lfoR=null;for(var e=0;e<this._filtersL.length;e++)this._filtersL[e].disconnect(),this._filtersL[e]=null;this._filtersL=null;for(var i=0;i<this._filtersR.length;i++)this._filtersR[i].disconnect(),this._filtersR[i]=null;return this._filtersR=null,this.frequency=null,this},t.Phaser}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(58),i(15),i(26)],void 0===(o=function(t){"use strict";var e=[.06748,.06404,.08212,.09004],i=[.773,.802,.753,.733],n=[347,113,37];return t.JCReverb=function(){var o=t.defaults(arguments,["roomSize"],t.JCReverb);t.StereoEffect.call(this,o),this.roomSize=new t.Signal(o.roomSize,t.Type.NormalRange),this._scaleRoomSize=new t.Scale(-.733,.197),this._allpassFilters=[],this._feedbackCombFilters=[];for(var s=0;s<n.length;s++){var r=this.context.createBiquadFilter();r.type="allpass",r.frequency.value=n[s],this._allpassFilters.push(r)}for(var a=0;a<e.length;a++){var l=new t.FeedbackCombFilter(e[a],.1);this._scaleRoomSize.connect(l.resonance),l.resonance.value=i[a],this._allpassFilters[this._allpassFilters.length-1].connect(l),a<e.length/2?l.connect(this.effectReturnL):l.connect(this.effectReturnR),this._feedbackCombFilters.push(l)}this.roomSize.connect(this._scaleRoomSize),t.connectSeries.apply(t,this._allpassFilters),this.effectSendL.connect(this._allpassFilters[0]),this.effectSendR.connect(this._allpassFilters[0]),this._readOnly(["roomSize"])},t.extend(t.JCReverb,t.StereoEffect),t.JCReverb.defaults={roomSize:.5},t.JCReverb.prototype.dispose=function(){t.StereoEffect.prototype.dispose.call(this);for(var e=0;e<this._allpassFilters.length;e++)this._allpassFilters[e].disconnect(),this._allpassFilters[e]=null;this._allpassFilters=null;for(var i=0;i<this._feedbackCombFilters.length;i++)this._feedbackCombFilters[i].dispose(),this._feedbackCombFilters[i]=null;return this._feedbackCombFilters=null,this._writable(["roomSize"]),this.roomSize.dispose(),this.roomSize=null,this._scaleRoomSize.dispose(),this._scaleRoomSize=null,this},t.JCReverb}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(53),i(15),i(1),i(19),i(10),i(42)],void 0===(o=function(t){"use strict";var e=[1557/44100,1617/44100,1491/44100,1422/44100,1277/44100,1356/44100,1188/44100,1116/44100],i=[225,556,441,341];return t.Freeverb=function(){var n=t.defaults(arguments,["roomSize","dampening"],t.Freeverb);t.StereoEffect.call(this,n),this.roomSize=new t.Signal(n.roomSize,t.Type.NormalRange),this.dampening=new t.Signal(n.dampening,t.Type.Frequency),this._combFilters=[],this._allpassFiltersL=[],this._allpassFiltersR=[];for(var o=0;o<i.length;o++){var s=this.context.createBiquadFilter();s.type="allpass",s.frequency.value=i[o],this._allpassFiltersL.push(s)}for(var r=0;r<i.length;r++){var a=this.context.createBiquadFilter();a.type="allpass",a.frequency.value=i[r],this._allpassFiltersR.push(a)}for(var l=0;l<e.length;l++){var h=new t.LowpassCombFilter(e[l]);l<e.length/2?this.effectSendL.chain(h,this._allpassFiltersL[0]):this.effectSendR.chain(h,this._allpassFiltersR[0]),this.roomSize.connect(h.resonance),this.dampening.connect(h.dampening),this._combFilters.push(h)}t.connectSeries.apply(t,this._allpassFiltersL),t.connectSeries.apply(t,this._allpassFiltersR),this._allpassFiltersL[this._allpassFiltersL.length-1].connect(this.effectReturnL),this._allpassFiltersR[this._allpassFiltersR.length-1].connect(this.effectReturnR),this._readOnly(["roomSize","dampening"])},t.extend(t.Freeverb,t.StereoEffect),t.Freeverb.defaults={roomSize:.7,dampening:3e3},t.Freeverb.prototype.dispose=function(){t.StereoEffect.prototype.dispose.call(this);for(var e=0;e<this._allpassFiltersL.length;e++)this._allpassFiltersL[e].disconnect(),this._allpassFiltersL[e]=null;this._allpassFiltersL=null;for(var i=0;i<this._allpassFiltersR.length;i++)this._allpassFiltersR[i].disconnect(),this._allpassFiltersR[i]=null;this._allpassFiltersR=null;for(var n=0;n<this._combFilters.length;n++)this._combFilters[n].dispose(),this._combFilters[n]=null;return this._combFilters=null,this._writable(["roomSize","dampening"]),this.roomSize.dispose(),this.roomSize=null,this.dampening.dispose(),this.dampening=null,this},t.Freeverb}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(32),i(1),i(18)],void 0===(o=function(t){"use strict";return t.FeedbackDelay=function(){var e=t.defaults(arguments,["delayTime","feedback"],t.FeedbackDelay);t.FeedbackEffect.call(this,e),this._delayNode=new t.Delay(e.delayTime,e.maxDelay),this.delayTime=this._delayNode.delayTime,this.connectEffect(this._delayNode),this._readOnly(["delayTime"])},t.extend(t.FeedbackDelay,t.FeedbackEffect),t.FeedbackDelay.defaults={delayTime:.25,maxDelay:1},t.FeedbackDelay.prototype.dispose=function(){return t.FeedbackEffect.prototype.dispose.call(this),this._delayNode.dispose(),this._delayNode=null,this._writable(["delayTime"]),this.delayTime=null,this},t.FeedbackDelay}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(7)],void 0===(o=function(t){"use strict";return t.Distortion=function(){var e=t.defaults(arguments,["distortion"],t.Distortion);t.Effect.call(this,e),this._shaper=new t.WaveShaper(4096),this._distortion=e.distortion,this.connectEffect(this._shaper),this.distortion=e.distortion,this.oversample=e.oversample},t.extend(t.Distortion,t.Effect),t.Distortion.defaults={distortion:.4,oversample:"none"},Object.defineProperty(t.Distortion.prototype,"distortion",{get:function(){return this._distortion},set:function(t){this._distortion=t;var e=100*t,i=Math.PI/180;this._shaper.setMap(function(t){return Math.abs(t)<.001?0:(3+e)*t*20*i/(Math.PI+e*Math.abs(t))})}}),Object.defineProperty(t.Distortion.prototype,"oversample",{get:function(){return this._shaper.oversample},set:function(t){this._shaper.oversample=t}}),t.Distortion.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._shaper.dispose(),this._shaper=null,this},t.Distortion}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(12),i(15),i(18)],void 0===(o=function(t){"use strict";return t.Chorus=function(){var e=t.defaults(arguments,["frequency","delayTime","depth"],t.Chorus);t.StereoEffect.call(this,e),this._depth=e.depth,this._delayTime=e.delayTime/1e3,this._lfoL=new t.LFO({frequency:e.frequency,min:0,max:1}),this._lfoR=new t.LFO({frequency:e.frequency,min:0,max:1,phase:180}),this._delayNodeL=new t.Delay,this._delayNodeR=new t.Delay,this.frequency=this._lfoL.frequency,this.effectSendL.chain(this._delayNodeL,this.effectReturnL),this.effectSendR.chain(this._delayNodeR,this.effectReturnR),this.effectSendL.connect(this.effectReturnL),this.effectSendR.connect(this.effectReturnR),this._lfoL.connect(this._delayNodeL.delayTime),this._lfoR.connect(this._delayNodeR.delayTime),this._lfoL.start(),this._lfoR.start(),this._lfoL.frequency.connect(this._lfoR.frequency),this.depth=this._depth,this.frequency.value=e.frequency,this.type=e.type,this._readOnly(["frequency"]),this.spread=e.spread},t.extend(t.Chorus,t.StereoEffect),t.Chorus.defaults={frequency:1.5,delayTime:3.5,depth:.7,type:"sine",spread:180},Object.defineProperty(t.Chorus.prototype,"depth",{get:function(){return this._depth},set:function(t){this._depth=t;var e=this._delayTime*t;this._lfoL.min=Math.max(this._delayTime-e,0),this._lfoL.max=this._delayTime+e,this._lfoR.min=Math.max(this._delayTime-e,0),this._lfoR.max=this._delayTime+e}}),Object.defineProperty(t.Chorus.prototype,"delayTime",{get:function(){return 1e3*this._delayTime},set:function(t){this._delayTime=t/1e3,this.depth=this._depth}}),Object.defineProperty(t.Chorus.prototype,"type",{get:function(){return this._lfoL.type},set:function(t){this._lfoL.type=t,this._lfoR.type=t}}),Object.defineProperty(t.Chorus.prototype,"spread",{get:function(){return this._lfoR.phase-this._lfoL.phase},set:function(t){this._lfoL.phase=90-t/2,this._lfoR.phase=t/2+90}}),t.Chorus.prototype.dispose=function(){return t.StereoEffect.prototype.dispose.call(this),this._lfoL.dispose(),this._lfoL=null,this._lfoR.dispose(),this._lfoR=null,this._delayNodeL.dispose(),this._delayNodeL=null,this._delayNodeR.dispose(),this._delayNodeR=null,this._writable("frequency"),this.frequency=null,this},t.Chorus}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(7)],void 0===(o=function(t){"use strict";return t.Chebyshev=function(){var e=t.defaults(arguments,["order"],t.Chebyshev);t.Effect.call(this,e),this._shaper=new t.WaveShaper(4096),this._order=e.order,this.connectEffect(this._shaper),this.order=e.order,this.oversample=e.oversample},t.extend(t.Chebyshev,t.Effect),t.Chebyshev.defaults={order:1,oversample:"none"},t.Chebyshev.prototype._getCoefficient=function(t,e,i){return i.hasOwnProperty(e)?i[e]:(i[e]=0===e?0:1===e?t:2*t*this._getCoefficient(t,e-1,i)-this._getCoefficient(t,e-2,i),i[e])},Object.defineProperty(t.Chebyshev.prototype,"order",{get:function(){return this._order},set:function(t){this._order=t;for(var e=new Array(4096),i=e.length,n=0;n<i;++n){var o=2*n/i-1;e[n]=0===o?0:this._getCoefficient(o,t,{})}this._shaper.curve=e}}),Object.defineProperty(t.Chebyshev.prototype,"oversample",{get:function(){return this._shaper.oversample},set:function(t){this._shaper.oversample=t}}),t.Chebyshev.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._shaper.dispose(),this._shaper=null,this},t.Chebyshev}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(13),i(77)],void 0===(o=function(t){"use strict";return t.BitCrusher=function(){var e=t.defaults(arguments,["bits"],t.BitCrusher);t.Effect.call(this,e);var i=1/Math.pow(2,e.bits-1);this._subtract=new t.Subtract,this._modulo=new t.Modulo(i),this._bits=e.bits,this.effectSend.fan(this._subtract,this._modulo),this._modulo.connect(this._subtract,0,1),this._subtract.connect(this.effectReturn)},t.extend(t.BitCrusher,t.Effect),t.BitCrusher.defaults={bits:4},Object.defineProperty(t.BitCrusher.prototype,"bits",{get:function(){return this._bits},set:function(t){this._bits=t;var e=1/Math.pow(2,t-1);this._modulo.value=e}}),t.BitCrusher.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._subtract.dispose(),this._subtract=null,this._modulo.dispose(),this._modulo=null,this},t.BitCrusher}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(57),i(42),i(8),i(9)],void 0===(o=function(t){"use strict";return t.AutoWah=function(){var e=t.defaults(arguments,["baseFrequency","octaves","sensitivity"],t.AutoWah);t.Effect.call(this,e),this.follower=new t.Follower(e.follower),this._sweepRange=new t.ScaleExp(0,1,.5),this._baseFrequency=e.baseFrequency,this._octaves=e.octaves,this._inputBoost=new t.Gain,this._bandpass=new t.Filter({rolloff:-48,frequency:0,Q:e.Q}),this._peaking=new t.Filter(0,"peaking"),this._peaking.gain.value=e.gain,this.gain=this._peaking.gain,this.Q=this._bandpass.Q,this.effectSend.chain(this._inputBoost,this.follower,this._sweepRange),this._sweepRange.connect(this._bandpass.frequency),this._sweepRange.connect(this._peaking.frequency),this.effectSend.chain(this._bandpass,this._peaking,this.effectReturn),this._setSweepRange(),this.sensitivity=e.sensitivity,this._readOnly(["gain","Q"])},t.extend(t.AutoWah,t.Effect),t.AutoWah.defaults={baseFrequency:100,octaves:6,sensitivity:0,Q:2,gain:2,follower:{attack:.3,release:.5}},Object.defineProperty(t.AutoWah.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t,this._setSweepRange()}}),Object.defineProperty(t.AutoWah.prototype,"baseFrequency",{get:function(){return this._baseFrequency},set:function(t){this._baseFrequency=t,this._setSweepRange()}}),Object.defineProperty(t.AutoWah.prototype,"sensitivity",{get:function(){return t.gainToDb(1/this._inputBoost.gain.value)},set:function(e){this._inputBoost.gain.value=1/t.dbToGain(e)}}),t.AutoWah.prototype._setSweepRange=function(){this._sweepRange.min=this._baseFrequency,this._sweepRange.max=Math.min(this._baseFrequency*Math.pow(2,this._octaves),this.context.sampleRate/2)},t.AutoWah.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this.follower.dispose(),this.follower=null,this._sweepRange.dispose(),this._sweepRange=null,this._bandpass.dispose(),this._bandpass=null,this._peaking.dispose(),this._peaking=null,this._inputBoost.dispose(),this._inputBoost=null,this._writable(["gain","Q"]),this.gain=null,this.Q=null,this},t.AutoWah}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(12),i(60)],void 0===(o=function(t){"use strict";return t.AutoPanner=function(){var e=t.defaults(arguments,["frequency"],t.AutoPanner);t.Effect.call(this,e),this._lfo=new t.LFO({frequency:e.frequency,amplitude:e.depth,min:-1,max:1}),this.depth=this._lfo.amplitude,this._panner=new t.Panner,this.frequency=this._lfo.frequency,this.connectEffect(this._panner),this._lfo.connect(this._panner.pan),this.type=e.type,this._readOnly(["depth","frequency"])},t.extend(t.AutoPanner,t.Effect),t.AutoPanner.defaults={frequency:1,type:"sine",depth:1},t.AutoPanner.prototype.start=function(t){return this._lfo.start(t),this},t.AutoPanner.prototype.stop=function(t){return this._lfo.stop(t),this},t.AutoPanner.prototype.sync=function(t){return this._lfo.sync(t),this},t.AutoPanner.prototype.unsync=function(){return this._lfo.unsync(),this},Object.defineProperty(t.AutoPanner.prototype,"type",{get:function(){return this._lfo.type},set:function(t){this._lfo.type=t}}),t.AutoPanner.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._lfo.dispose(),this._lfo=null,this._panner.dispose(),this._panner=null,this._writable(["depth","frequency"]),this.frequency=null,this.depth=null,this},t.AutoPanner}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(8),i(12),i(9)],void 0===(o=function(t){"use strict";return t.AutoFilter=function(){var e=t.defaults(arguments,["frequency","baseFrequency","octaves"],t.AutoFilter);t.Effect.call(this,e),this._lfo=new t.LFO({frequency:e.frequency,amplitude:e.depth}),this.depth=this._lfo.amplitude,this.frequency=this._lfo.frequency,this.filter=new t.Filter(e.filter),this._octaves=0,this.connectEffect(this.filter),this._lfo.connect(this.filter.frequency),this.type=e.type,this._readOnly(["frequency","depth"]),this.octaves=e.octaves,this.baseFrequency=e.baseFrequency},t.extend(t.AutoFilter,t.Effect),t.AutoFilter.defaults={frequency:1,type:"sine",depth:1,baseFrequency:200,octaves:2.6,filter:{type:"lowpass",rolloff:-12,Q:1}},t.AutoFilter.prototype.start=function(t){return this._lfo.start(t),this},t.AutoFilter.prototype.stop=function(t){return this._lfo.stop(t),this},t.AutoFilter.prototype.sync=function(t){return this._lfo.sync(t),this},t.AutoFilter.prototype.unsync=function(){return this._lfo.unsync(),this},Object.defineProperty(t.AutoFilter.prototype,"type",{get:function(){return this._lfo.type},set:function(t){this._lfo.type=t}}),Object.defineProperty(t.AutoFilter.prototype,"baseFrequency",{get:function(){return this._lfo.min},set:function(t){this._lfo.min=this.toFrequency(t),this.octaves=this._octaves}}),Object.defineProperty(t.AutoFilter.prototype,"octaves",{get:function(){return this._octaves},set:function(t){this._octaves=t,this._lfo.max=this.baseFrequency*Math.pow(2,t)}}),t.AutoFilter.prototype.dispose=function(){return t.Effect.prototype.dispose.call(this),this._lfo.dispose(),this._lfo=null,this.filter.dispose(),this.filter=null,this._writable(["frequency","depth"]),this.frequency=null,this.depth=null,this},t.AutoFilter}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(23),i(10),i(19),i(1),i(22),i(28)],void 0===(o=function(t){"use strict";t.Listener=function(){t.call(this),this._orientation=[0,0,0,0,0,0],this._position=[0,0,0],t.getContext(function(){this.set(e.defaults),this.context.listener=this}.bind(this))},t.extend(t.Listener),t.Listener.defaults={positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:1,upX:0,upY:1,upZ:0},t.Listener.prototype.isListener=!0,t.Listener.prototype._rampTimeConstant=.01,t.Listener.prototype.setPosition=function(t,e,i){if(this.context.rawContext.listener.positionX){var n=this.now();this.context.rawContext.listener.positionX.setTargetAtTime(t,n,this._rampTimeConstant),this.context.rawContext.listener.positionY.setTargetAtTime(e,n,this._rampTimeConstant),this.context.rawContext.listener.positionZ.setTargetAtTime(i,n,this._rampTimeConstant)}else this.context.rawContext.listener.setPosition(t,e,i);return this._position=Array.prototype.slice.call(arguments),this},t.Listener.prototype.setOrientation=function(t,e,i,n,o,s){if(this.context.rawContext.listener.forwardX){var r=this.now();this.context.rawContext.listener.forwardX.setTargetAtTime(t,r,this._rampTimeConstant),this.context.rawContext.listener.forwardY.setTargetAtTime(e,r,this._rampTimeConstant),this.context.rawContext.listener.forwardZ.setTargetAtTime(i,r,this._rampTimeConstant),this.context.rawContext.listener.upX.setTargetAtTime(n,r,this._rampTimeConstant),this.context.rawContext.listener.upY.setTargetAtTime(o,r,this._rampTimeConstant),this.context.rawContext.listener.upZ.setTargetAtTime(s,r,this._rampTimeConstant)}else this.context.rawContext.listener.setOrientation(t,e,i,n,o,s);return this._orientation=Array.prototype.slice.call(arguments),this},Object.defineProperty(t.Listener.prototype,"positionX",{set:function(t){this._position[0]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[0]}}),Object.defineProperty(t.Listener.prototype,"positionY",{set:function(t){this._position[1]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[1]}}),Object.defineProperty(t.Listener.prototype,"positionZ",{set:function(t){this._position[2]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[2]}}),Object.defineProperty(t.Listener.prototype,"forwardX",{set:function(t){this._orientation[0]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[0]}}),Object.defineProperty(t.Listener.prototype,"forwardY",{set:function(t){this._orientation[1]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[1]}}),Object.defineProperty(t.Listener.prototype,"forwardZ",{set:function(t){this._orientation[2]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[2]}}),Object.defineProperty(t.Listener.prototype,"upX",{set:function(t){this._orientation[3]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[3]}}),Object.defineProperty(t.Listener.prototype,"upY",{set:function(t){this._orientation[4]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[4]}}),Object.defineProperty(t.Listener.prototype,"upZ",{set:function(t){this._orientation[5]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[5]}}),t.Listener.prototype.dispose=function(){return this._orientation=null,this._position=null,this};var e=t.Listener;return t.Listener=new e,t.Context.on("init",function(i){i.listener&&i.listener.isListener?t.Listener=i.listener:t.Listener=new e}),t.Listener}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(24)],void 0===(o=function(t){"use strict";return t.Draw=function(){t.call(this),this._events=new t.Timeline,this.expiration=.25,this.anticipation=.008,this._boundDrawLoop=this._drawLoop.bind(this)},t.extend(t.Draw),t.Draw.prototype.schedule=function(t,e){return this._events.add({callback:t,time:this.toSeconds(e)}),1===this._events.length&&requestAnimationFrame(this._boundDrawLoop),this},t.Draw.prototype.cancel=function(t){return this._events.cancel(this.toSeconds(t)),this},t.Draw.prototype._drawLoop=function(){for(var e=t.context.currentTime;this._events.length&&this._events.peek().time-this.anticipation<=e;){var i=this._events.shift();e-i.time<=this.expiration&&i.callback()}this._events.length>0&&requestAnimationFrame(this._boundDrawLoop)},t.Draw=new t.Draw,t.Draw}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(3)],void 0===(o=function(t){"use strict";var e={};return t.prototype.send=function(i,n){e.hasOwnProperty(i)||(e[i]=this.context.createGain()),n=t.defaultArg(n,0);var o=new t.Gain(n,t.Type.Decibels);return this.connect(o),o.connect(e[i]),o},t.prototype.receive=function(t,i){return e.hasOwnProperty(t)||(e[t]=this.context.createGain()),e[t].connect(this,0,i),this},t.Context.on("init",function(t){t.buses?e=t.buses:(e={},t.buses=e)}),t}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(4)],void 0===(o=function(t){"use strict";return t.CtrlRandom=function(){var e=t.defaults(arguments,["min","max"],t.CtrlRandom);t.call(this),this.min=e.min,this.max=e.max,this.integer=e.integer},t.extend(t.CtrlRandom),t.CtrlRandom.defaults={min:0,max:1,integer:!1},Object.defineProperty(t.CtrlRandom.prototype,"value",{get:function(){var t=this.toSeconds(this.min),e=this.toSeconds(this.max),i=Math.random(),n=i*t+(1-i)*e;return this.integer&&(n=Math.floor(n)),n}}),t.CtrlRandom}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0)],void 0===(o=function(t){"use strict";return t.CtrlMarkov=function(e,i){t.call(this),this.values=t.defaultArg(e,{}),this.value=t.defaultArg(i,Object.keys(this.values)[0])},t.extend(t.CtrlMarkov),t.CtrlMarkov.prototype.next=function(){if(this.values.hasOwnProperty(this.value)){var e=this.values[this.value];if(t.isArray(e))for(var i=this._getProbDistribution(e),n=Math.random(),o=0,s=0;s<i.length;s++){var r=i[s];if(n>o&&n<o+r){var a=e[s];t.isObject(a)?this.value=a.value:this.value=a}o+=r}else this.value=e}return this.value},t.CtrlMarkov.prototype._getProbDistribution=function(e){for(var i=[],n=0,o=!1,s=0;s<e.length;s++){var r=e[s];t.isObject(r)?(o=!0,i[s]=r.probability):i[s]=1/e.length,n+=i[s]}if(o)for(var a=0;a<i.length;a++)i[a]=i[a]/n;return i},t.CtrlMarkov.prototype.dispose=function(){this.values=null},t.CtrlMarkov}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(4)],void 0===(o=function(t){"use strict";return t.CtrlInterpolate=function(){var e=t.defaults(arguments,["values","index"],t.CtrlInterpolate);t.call(this),this.values=e.values,this.index=e.index},t.extend(t.CtrlInterpolate),t.CtrlInterpolate.defaults={index:0,values:[]},Object.defineProperty(t.CtrlInterpolate.prototype,"value",{get:function(){var t=this.index;t=Math.min(t,this.values.length-1);var e=Math.floor(t),i=this.values[e],n=this.values[Math.ceil(t)];return this._interpolate(t-e,i,n)}}),t.CtrlInterpolate.prototype._interpolate=function(e,i,n){if(t.isArray(i)){for(var o=[],s=0;s<i.length;s++)o[s]=this._interpolate(e,i[s],n[s]);return o}if(t.isObject(i)){var r={};for(var a in i)r[a]=this._interpolate(e,i[a],n[a]);return r}return(1-e)*(i=this._toNumber(i))+e*(n=this._toNumber(n))},t.CtrlInterpolate.prototype._toNumber=function(e){return t.isNumber(e)?e:this.toSeconds(e)},t.CtrlInterpolate.prototype.dispose=function(){this.values=null},t.CtrlInterpolate}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(44),i(2)],void 0===(o=function(t){return t.Waveform=function(){var e=t.defaults(arguments,["size"],t.Waveform);e.type=t.Analyser.Type.Waveform,t.AudioNode.call(this),this._analyser=this.input=this.output=new t.Analyser(e)},t.extend(t.Waveform,t.AudioNode),t.Waveform.defaults={size:1024},t.Waveform.prototype.getValue=function(){return this._analyser.getValue()},Object.defineProperty(t.Waveform.prototype,"size",{get:function(){return this._analyser.size},set:function(t){this._analyser.size=t}}),t.Waveform.prototype.dispose=function(){t.AudioNode.prototype.dispose.call(this),this._analyser.dispose(),this._analyser=null},t.Waveform}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(23),i(10),i(19),i(1),i(22),i(28),i(2)],void 0===(o=function(t){"use strict";return t.Panner3D=function(){var e=t.defaults(arguments,["positionX","positionY","positionZ"],t.Panner3D);t.AudioNode.call(this),this._panner=this.input=this.output=this.context.createPanner(),this._panner.panningModel=e.panningModel,this._panner.maxDistance=e.maxDistance,this._panner.distanceModel=e.distanceModel,this._panner.coneOuterGain=e.coneOuterGain,this._panner.coneOuterAngle=e.coneOuterAngle,this._panner.coneInnerAngle=e.coneInnerAngle,this._panner.refDistance=e.refDistance,this._panner.rolloffFactor=e.rolloffFactor,this._orientation=[e.orientationX,e.orientationY,e.orientationZ],this._position=[e.positionX,e.positionY,e.positionZ],this.orientationX=e.orientationX,this.orientationY=e.orientationY,this.orientationZ=e.orientationZ,this.positionX=e.positionX,this.positionY=e.positionY,this.positionZ=e.positionZ},t.extend(t.Panner3D,t.AudioNode),t.Panner3D.defaults={positionX:0,positionY:0,positionZ:0,orientationX:0,orientationY:0,orientationZ:0,panningModel:"equalpower",maxDistance:1e4,distanceModel:"inverse",coneOuterGain:0,coneOuterAngle:360,coneInnerAngle:360,refDistance:1,rolloffFactor:1},t.Panner3D.prototype._rampTimeConstant=.01,t.Panner3D.prototype.setPosition=function(t,e,i){if(this._panner.positionX){var n=this.now();this._panner.positionX.setTargetAtTime(t,n,this._rampTimeConstant),this._panner.positionY.setTargetAtTime(e,n,this._rampTimeConstant),this._panner.positionZ.setTargetAtTime(i,n,this._rampTimeConstant)}else this._panner.setPosition(t,e,i);return this._position=Array.prototype.slice.call(arguments),this},t.Panner3D.prototype.setOrientation=function(t,e,i){if(this._panner.orientationX){var n=this.now();this._panner.orientationX.setTargetAtTime(t,n,this._rampTimeConstant),this._panner.orientationY.setTargetAtTime(e,n,this._rampTimeConstant),this._panner.orientationZ.setTargetAtTime(i,n,this._rampTimeConstant)}else this._panner.setOrientation(t,e,i);return this._orientation=Array.prototype.slice.call(arguments),this},Object.defineProperty(t.Panner3D.prototype,"positionX",{set:function(t){this._position[0]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[0]}}),Object.defineProperty(t.Panner3D.prototype,"positionY",{set:function(t){this._position[1]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[1]}}),Object.defineProperty(t.Panner3D.prototype,"positionZ",{set:function(t){this._position[2]=t,this.setPosition.apply(this,this._position)},get:function(){return this._position[2]}}),Object.defineProperty(t.Panner3D.prototype,"orientationX",{set:function(t){this._orientation[0]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[0]}}),Object.defineProperty(t.Panner3D.prototype,"orientationY",{set:function(t){this._orientation[1]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[1]}}),Object.defineProperty(t.Panner3D.prototype,"orientationZ",{set:function(t){this._orientation[2]=t,this.setOrientation.apply(this,this._orientation)},get:function(){return this._orientation[2]}}),t.Panner3D._aliasProperty=function(e){Object.defineProperty(t.Panner3D.prototype,e,{set:function(t){this._panner[e]=t},get:function(){return this._panner[e]}})},t.Panner3D._aliasProperty("panningModel"),t.Panner3D._aliasProperty("refDistance"),t.Panner3D._aliasProperty("rolloffFactor"),t.Panner3D._aliasProperty("distanceModel"),t.Panner3D._aliasProperty("coneInnerAngle"),t.Panner3D._aliasProperty("coneOuterAngle"),t.Panner3D._aliasProperty("coneOuterGain"),t.Panner3D._aliasProperty("maxDistance"),t.Panner3D.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._panner.disconnect(),this._panner=null,this._orientation=null,this._position=null,this},t.Panner3D}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(59),i(43),i(2)],void 0===(o=function(t){"use strict";return t.MultibandCompressor=function(e){t.AudioNode.call(this),e=t.defaultArg(arguments,t.MultibandCompressor.defaults),this._splitter=this.input=new t.MultibandSplit({lowFrequency:e.lowFrequency,highFrequency:e.highFrequency}),this.lowFrequency=this._splitter.lowFrequency,this.highFrequency=this._splitter.highFrequency,this.output=new t.Gain,this.low=new t.Compressor(e.low),this.mid=new t.Compressor(e.mid),this.high=new t.Compressor(e.high),this._splitter.low.chain(this.low,this.output),this._splitter.mid.chain(this.mid,this.output),this._splitter.high.chain(this.high,this.output),this._readOnly(["high","mid","low","highFrequency","lowFrequency"])},t.extend(t.MultibandCompressor,t.AudioNode),t.MultibandCompressor.defaults={low:t.Compressor.defaults,mid:t.Compressor.defaults,high:t.Compressor.defaults,lowFrequency:250,highFrequency:2e3},t.MultibandCompressor.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._splitter.dispose(),this._writable(["high","mid","low","highFrequency","lowFrequency"]),this.low.dispose(),this.mid.dispose(),this.high.dispose(),this._splitter=null,this.low=null,this.mid=null,this.high=null,this.lowFrequency=null,this.highFrequency=null,this},t.MultibandCompressor}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(10),i(2)],void 0===(o=function(t){"use strict";return t.Mono=function(){t.AudioNode.call(this),this.createInsOuts(1,0),this._merge=this.output=new t.Merge,this.input.connect(this._merge,0,0),this.input.connect(this._merge,0,1)},t.extend(t.Mono,t.AudioNode),t.Mono.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._merge.dispose(),this._merge=null,this},t.Mono}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(52),i(51),i(43),i(2)],void 0===(o=function(t){"use strict";return t.MidSideCompressor=function(e){t.AudioNode.call(this),e=t.defaultArg(e,t.MidSideCompressor.defaults),this._midSideSplit=this.input=new t.MidSideSplit,this._midSideMerge=this.output=new t.MidSideMerge,this.mid=new t.Compressor(e.mid),this.side=new t.Compressor(e.side),this._midSideSplit.mid.chain(this.mid,this._midSideMerge.mid),this._midSideSplit.side.chain(this.side,this._midSideMerge.side),this._readOnly(["mid","side"])},t.extend(t.MidSideCompressor,t.AudioNode),t.MidSideCompressor.defaults={mid:{ratio:3,threshold:-24,release:.03,attack:.02,knee:16},side:{ratio:6,threshold:-30,release:.25,attack:.03,knee:10}},t.MidSideCompressor.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["mid","side"]),this.mid.dispose(),this.mid=null,this.side.dispose(),this.side=null,this._midSideSplit.dispose(),this._midSideSplit=null,this._midSideMerge.dispose(),this._midSideMerge=null,this},t.MidSideCompressor}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(44),i(2)],void 0===(o=function(t){"use strict";return t.Meter=function(){var e=t.defaults(arguments,["smoothing"],t.Meter);t.AudioNode.call(this),this.smoothing=e.smoothing,this._rms=0,this.input=this.output=this._analyser=new t.Analyser("waveform",256)},t.extend(t.Meter,t.AudioNode),t.Meter.defaults={smoothing:.8},t.Meter.prototype.getLevel=function(){for(var e=this._analyser.getValue(),i=0,n=0;n<e.length;n++){var o=e[n];i+=o*o}var s=Math.sqrt(i/e.length);return this._rms=Math.max(s,this._rms*this.smoothing),t.gainToDb(this._rms)},t.Meter.prototype.getValue=function(){return this._analyser.getValue()[0]},t.Meter.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._analyser.dispose(),this._analyser=null,this},t.Meter}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(43),i(2)],void 0===(o=function(t){"use strict";return t.Limiter=function(){var e=t.defaults(arguments,["threshold"],t.Limiter);t.AudioNode.call(this),this._compressor=this.input=this.output=new t.Compressor({attack:.001,decay:.001,threshold:e.threshold}),this.threshold=this._compressor.threshold,this._readOnly("threshold")},t.extend(t.Limiter,t.AudioNode),t.Limiter.defaults={threshold:-12},t.Limiter.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._compressor.dispose(),this._compressor=null,this._writable("threshold"),this.threshold=null,this},t.Limiter}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(57),i(88),i(2)],void 0===(o=function(t){"use strict";return t.Gate=function(){var e=t.defaults(arguments,["threshold","smoothing"],t.Gate);t.AudioNode.call(this),this.createInsOuts(1,1),this._follower=new t.Follower(e.smoothing),this._gt=new t.GreaterThan(t.dbToGain(e.threshold)),this.input.connect(this.output),this.input.chain(this._follower,this._gt,this.output.gain)},t.extend(t.Gate,t.AudioNode),t.Gate.defaults={smoothing:.1,threshold:-40},Object.defineProperty(t.Gate.prototype,"threshold",{get:function(){return t.gainToDb(this._gt.value)},set:function(e){this._gt.value=t.dbToGain(e)}}),Object.defineProperty(t.Gate.prototype,"smoothing",{get:function(){return this._follower.smoothing},set:function(t){this._follower.smoothing=t}}),t.Gate.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._follower.dispose(),this._gt.dispose(),this._follower=null,this._gt=null,this},t.Gate}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(44),i(2)],void 0===(o=function(t){return t.FFT=function(){var e=t.defaults(arguments,["size"],t.FFT);e.type=t.Analyser.Type.FFT,t.AudioNode.call(this),this._analyser=this.input=this.output=new t.Analyser(e)},t.extend(t.FFT,t.AudioNode),t.FFT.defaults={size:1024},t.FFT.prototype.getValue=function(){return this._analyser.getValue()},Object.defineProperty(t.FFT.prototype,"size",{get:function(){return this._analyser.size},set:function(t){this._analyser.size=t}}),t.FFT.prototype.dispose=function(){t.AudioNode.prototype.dispose.call(this),this._analyser.dispose(),this._analyser=null},t.FFT}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(59),i(3),i(2)],void 0===(o=function(t){"use strict";return t.EQ3=function(){var e=t.defaults(arguments,["low","mid","high"],t.EQ3);t.AudioNode.call(this),this.output=new t.Gain,this._multibandSplit=this.input=new t.MultibandSplit({lowFrequency:e.lowFrequency,highFrequency:e.highFrequency}),this._lowGain=new t.Gain(e.low,t.Type.Decibels),this._midGain=new t.Gain(e.mid,t.Type.Decibels),this._highGain=new t.Gain(e.high,t.Type.Decibels),this.low=this._lowGain.gain,this.mid=this._midGain.gain,this.high=this._highGain.gain,this.Q=this._multibandSplit.Q,this.lowFrequency=this._multibandSplit.lowFrequency,this.highFrequency=this._multibandSplit.highFrequency,this._multibandSplit.low.chain(this._lowGain,this.output),this._multibandSplit.mid.chain(this._midGain,this.output),this._multibandSplit.high.chain(this._highGain,this.output),this._readOnly(["low","mid","high","lowFrequency","highFrequency"])},t.extend(t.EQ3,t.AudioNode),t.EQ3.defaults={low:0,mid:0,high:0,lowFrequency:400,highFrequency:2500},t.EQ3.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["low","mid","high","lowFrequency","highFrequency"]),this._multibandSplit.dispose(),this._multibandSplit=null,this.lowFrequency=null,this.highFrequency=null,this._lowGain.dispose(),this._lowGain=null,this._midGain.dispose(),this._midGain=null,this._highGain.dispose(),this._highGain=null,this.low=null,this.mid=null,this.high=null,this.Q=null,this},t.EQ3}.apply(e,n))||(t.exports=o)},function(t,e,i){var n,o;n=[i(0),i(95),i(91),i(2)],void 0===(o=function(t){return t.Channel=function(){var e=t.defaults(arguments,["volume","pan"],t.PanVol);t.AudioNode.call(this,e),this._solo=this.input=new t.Solo(e.solo),this._panVol=this.output=new t.PanVol({pan:e.pan,volume:e.volume,mute:e.mute}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),this._readOnly(["pan","volume"])},t.extend(t.Channel,t.AudioNode),t.Channel.defaults={pan:0,volume:0,mute:!1,solo:!1},Object.defineProperty(t.Channel.prototype,"solo",{get:function(){return this._solo.solo},set:function(t){this._solo.solo=t}}),Object.defineProperty(t.Channel.prototype,"muted",{get:function(){return this._solo.muted||this.mute}}),Object.defineProperty(t.Channel.prototype,"mute",{get:function(){return this._panVol.mute},set:function(t){this._panVol.mute=t}}),t.Channel.prototype.dispose=function(){return t.AudioNode.prototype.dispose.call(this),this._writable(["pan","volume"]),this._panVol.dispose(),this._panVol=null,this.pan=null,this.volume=null,this._solo.dispose(),this._solo=null,this},t.Channel}.apply(e,n))||(t.exports=o)},function(t,e){t.exports="13.4.9"},function(t,e){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(i=window)}t.exports=i},function(t,e,i){i(30),i(44),i(152),i(43),i(23),i(47),i(151),i(58),i(150),i(9),i(57),i(41),i(149),i(12),i(148),i(53),i(10),i(147),i(146),i(51),i(52),i(145),i(144),i(59),i(60),i(143),i(95),i(89),i(91),i(19),i(27),i(142),i(141),i(140),i(80),i(139),i(2),i(11),i(79),i(138),i(86),i(20),i(18),i(137),i(35),i(3),i(84),i(136),i(40),i(78),i(62),i(14),i(24),i(33),i(16),i(55),i(83),i(135),i(134),i(133),i(132),i(131),i(130),i(76),i(129),i(8),i(128),i(32),i(127),i(126),i(75),i(125),i(124),i(123),i(122),i(15),i(121),i(120),i(74),i(119),i(118),i(50),i(73),i(72),i(117),i(116),i(115),i(114),i(113),i(21),i(112),i(111),i(25),i(68),i(110),i(109),i(108),i(107),i(38),i(96),i(81),i(34),i(63),i(97),i(66),i(106),i(92),i(98),i(90),i(29),i(22),i(93),i(105),i(88),i(87),i(77),i(5),i(94),i(104),i(61),i(26),i(42),i(1),i(36),i(13),i(85),i(103),i(7),i(28),i(70),i(31),i(69),i(48),i(102),i(39),i(37),i(17),i(82),i(67),i(101),i(49),i(71),i(6),i(56),i(100),i(46),i(99),i(54),i(65),i(64),i(45),i(4),t.exports=i(0)}])});
//# sourceMappingURL=Tone.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map