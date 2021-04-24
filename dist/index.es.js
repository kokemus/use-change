import React, { useContext, useState, useEffect } from 'react';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var ChangeNotifier = /*#__PURE__*/function () {
  function ChangeNotifier() {
    _classCallCheck(this, ChangeNotifier);

    _defineProperty(this, "_listeners", []);
  }

  _createClass(ChangeNotifier, [{
    key: "addListener",
    value: function addListener(listener) {
      this._listeners.push(listener);
    }
  }, {
    key: "removeListener",
    value: function removeListener(listener) {
      var index = this._listeners.findIndex(function (l) {
        return l === listener;
      });

      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
  }, {
    key: "notifyListeners",
    value: function notifyListeners() {
      this._listeners.forEach(function (l) {
        return l();
      });
    }
  }, {
    key: "hasListeners",
    get: function get() {
      return this._listeners.length > 0;
    }
  }]);

  return ChangeNotifier;
}();

var ProvidersContext = /*#__PURE__*/React.createContext();
var MultiProvider = function MultiProvider(_ref) {
  var children = _ref.children,
      providers = _ref.providers;
  return /*#__PURE__*/React.createElement(ProvidersContext.Provider, {
    value: providers
  }, children);
};

var isFunction = function isFunction(type) {
  return typeof type === 'function';
};

var useProvider = function useProvider(name) {
  var _useContext;

  var providers = (_useContext = useContext(ProvidersContext)) !== null && _useContext !== void 0 ? _useContext : [];

  if (!(name in providers)) {
    throw new TypeError("".concat(name, " provider not found, use MultiProvider to declare one"));
  }

  var provider = isFunction(providers[name]) ? providers[name]() : providers[name];
  providers[name] = provider;
  return provider;
};

var useChange = function useChange(provider, key) {
  if (!provider) {
    throw new TypeError("provider is not defined, useChange(provider, 'key')");
  }

  if (_typeof(provider) === ChangeNotifier) {
    throw new TypeError("provider is not ChangeNotifier");
  }

  if (!(key in provider)) {
    throw new TypeError("key ".concat(key, " is not found in provider, useChange(provider, 'key')"));
  }

  var _useState = useState(provider[key]),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  useEffect(function () {
    var update = function update() {
      return setValue(provider[key]);
    };

    provider.addListener(update);
    return function () {
      provider.removeListener(update);
    };
  }, []);
  return value;
};

export { ChangeNotifier, MultiProvider, useChange, useProvider };
//# sourceMappingURL=index.es.js.map
