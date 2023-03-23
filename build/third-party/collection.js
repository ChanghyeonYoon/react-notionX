var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../node_modules/lodash.throttle/index.js
var require_lodash = __commonJS({
  "../../node_modules/lodash.throttle/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function throttle2(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = throttle2;
  }
});

// ../../node_modules/date-fns/_lib/requiredArgs/index.js
var require_requiredArgs = __commonJS({
  "../../node_modules/date-fns/_lib/requiredArgs/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = requiredArgs;
    function requiredArgs(required, args) {
      if (args.length < required) {
        throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
      }
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/isDate/index.js
var require_isDate = __commonJS({
  "../../node_modules/date-fns/isDate/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isDate;
    var _index = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isDate(value) {
      (0, _index.default)(1, arguments);
      return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/toDate/index.js
var require_toDate = __commonJS({
  "../../node_modules/date-fns/toDate/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toDate;
    var _index = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function toDate(argument) {
      (0, _index.default)(1, arguments);
      var argStr = Object.prototype.toString.call(argument);
      if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
        return new Date(argument.getTime());
      } else if (typeof argument === "number" || argStr === "[object Number]") {
        return new Date(argument);
      } else {
        if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
          console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
          console.warn(new Error().stack);
        }
        return new Date(NaN);
      }
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/isValid/index.js
var require_isValid = __commonJS({
  "../../node_modules/date-fns/isValid/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isValid;
    var _index = _interopRequireDefault(require_isDate());
    var _index2 = _interopRequireDefault(require_toDate());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isValid(dirtyDate) {
      (0, _index3.default)(1, arguments);
      if (!(0, _index.default)(dirtyDate) && typeof dirtyDate !== "number") {
        return false;
      }
      var date = (0, _index2.default)(dirtyDate);
      return !isNaN(Number(date));
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/en-US/_lib/formatDistance/index.js
var require_formatDistance = __commonJS({
  "../../node_modules/date-fns/locale/en-US/_lib/formatDistance/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var formatDistanceLocale = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds"
      },
      xSeconds: {
        one: "1 second",
        other: "{{count}} seconds"
      },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes"
      },
      xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes"
      },
      aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours"
      },
      xHours: {
        one: "1 hour",
        other: "{{count}} hours"
      },
      xDays: {
        one: "1 day",
        other: "{{count}} days"
      },
      aboutXWeeks: {
        one: "about 1 week",
        other: "about {{count}} weeks"
      },
      xWeeks: {
        one: "1 week",
        other: "{{count}} weeks"
      },
      aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months"
      },
      xMonths: {
        one: "1 month",
        other: "{{count}} months"
      },
      aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years"
      },
      xYears: {
        one: "1 year",
        other: "{{count}} years"
      },
      overXYears: {
        one: "over 1 year",
        other: "over {{count}} years"
      },
      almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years"
      }
    };
    var formatDistance = function(token, count, options) {
      var result;
      var tokenValue = formatDistanceLocale[token];
      if (typeof tokenValue === "string") {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace("{{count}}", count.toString());
      }
      if (options !== null && options !== void 0 && options.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return "in " + result;
        } else {
          return result + " ago";
        }
      }
      return result;
    };
    var _default = formatDistance;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/_lib/buildFormatLongFn/index.js
var require_buildFormatLongFn = __commonJS({
  "../../node_modules/date-fns/locale/_lib/buildFormatLongFn/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = buildFormatLongFn;
    function buildFormatLongFn(args) {
      return function() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var width = options.width ? String(options.width) : args.defaultWidth;
        var format4 = args.formats[width] || args.formats[args.defaultWidth];
        return format4;
      };
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/en-US/_lib/formatLong/index.js
var require_formatLong = __commonJS({
  "../../node_modules/date-fns/locale/en-US/_lib/formatLong/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = _interopRequireDefault(require_buildFormatLongFn());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var dateFormats = {
      full: "EEEE, MMMM do, y",
      long: "MMMM do, y",
      medium: "MMM d, y",
      short: "MM/dd/yyyy"
    };
    var timeFormats = {
      full: "h:mm:ss a zzzz",
      long: "h:mm:ss a z",
      medium: "h:mm:ss a",
      short: "h:mm a"
    };
    var dateTimeFormats = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: "{{date}}, {{time}}",
      short: "{{date}}, {{time}}"
    };
    var formatLong = {
      date: (0, _index.default)({
        formats: dateFormats,
        defaultWidth: "full"
      }),
      time: (0, _index.default)({
        formats: timeFormats,
        defaultWidth: "full"
      }),
      dateTime: (0, _index.default)({
        formats: dateTimeFormats,
        defaultWidth: "full"
      })
    };
    var _default = formatLong;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/en-US/_lib/formatRelative/index.js
var require_formatRelative = __commonJS({
  "../../node_modules/date-fns/locale/en-US/_lib/formatRelative/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var formatRelativeLocale = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P"
    };
    var formatRelative = function(token, _date, _baseDate, _options) {
      return formatRelativeLocale[token];
    };
    var _default = formatRelative;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/_lib/buildLocalizeFn/index.js
var require_buildLocalizeFn = __commonJS({
  "../../node_modules/date-fns/locale/_lib/buildLocalizeFn/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = buildLocalizeFn;
    function buildLocalizeFn(args) {
      return function(dirtyIndex, dirtyOptions) {
        var options = dirtyOptions || {};
        var context = options.context ? String(options.context) : "standalone";
        var valuesArray;
        if (context === "formatting" && args.formattingValues) {
          var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          var width = options.width ? String(options.width) : defaultWidth;
          valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          var _defaultWidth = args.defaultWidth;
          var _width = options.width ? String(options.width) : args.defaultWidth;
          valuesArray = args.values[_width] || args.values[_defaultWidth];
        }
        var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
        return valuesArray[index];
      };
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/en-US/_lib/localize/index.js
var require_localize = __commonJS({
  "../../node_modules/date-fns/locale/en-US/_lib/localize/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = _interopRequireDefault(require_buildLocalizeFn());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var eraValues = {
      narrow: ["B", "A"],
      abbreviated: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"]
    };
    var quarterValues = {
      narrow: ["1", "2", "3", "4"],
      abbreviated: ["Q1", "Q2", "Q3", "Q4"],
      wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
    };
    var monthValues = {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    var dayValues = {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };
    var dayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
      }
    };
    var formattingDayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
      }
    };
    var ordinalNumber = function(dirtyNumber, _options) {
      var number = Number(dirtyNumber);
      var rem100 = number % 100;
      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + "st";
          case 2:
            return number + "nd";
          case 3:
            return number + "rd";
        }
      }
      return number + "th";
    };
    var localize = {
      ordinalNumber,
      era: (0, _index.default)({
        values: eraValues,
        defaultWidth: "wide"
      }),
      quarter: (0, _index.default)({
        values: quarterValues,
        defaultWidth: "wide",
        argumentCallback: function(quarter) {
          return quarter - 1;
        }
      }),
      month: (0, _index.default)({
        values: monthValues,
        defaultWidth: "wide"
      }),
      day: (0, _index.default)({
        values: dayValues,
        defaultWidth: "wide"
      }),
      dayPeriod: (0, _index.default)({
        values: dayPeriodValues,
        defaultWidth: "wide",
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: "wide"
      })
    };
    var _default = localize;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/_lib/buildMatchFn/index.js
var require_buildMatchFn = __commonJS({
  "../../node_modules/date-fns/locale/_lib/buildMatchFn/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = buildMatchFn;
    function buildMatchFn(args) {
      return function(string) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var width = options.width;
        var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        var matchResult = string.match(matchPattern);
        if (!matchResult) {
          return null;
        }
        var matchedString = matchResult[0];
        var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
          return pattern.test(matchedString);
        }) : findKey(parsePatterns, function(pattern) {
          return pattern.test(matchedString);
        });
        var value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value,
          rest
        };
      };
    }
    function findKey(object, predicate) {
      for (var key in object) {
        if (object.hasOwnProperty(key) && predicate(object[key])) {
          return key;
        }
      }
      return void 0;
    }
    function findIndex(array, predicate) {
      for (var key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }
      return void 0;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/_lib/buildMatchPatternFn/index.js
var require_buildMatchPatternFn = __commonJS({
  "../../node_modules/date-fns/locale/_lib/buildMatchPatternFn/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = buildMatchPatternFn;
    function buildMatchPatternFn(args) {
      return function(string) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var matchResult = string.match(args.matchPattern);
        if (!matchResult)
          return null;
        var matchedString = matchResult[0];
        var parseResult = string.match(args.parsePattern);
        if (!parseResult)
          return null;
        var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
          value,
          rest
        };
      };
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/en-US/_lib/match/index.js
var require_match = __commonJS({
  "../../node_modules/date-fns/locale/en-US/_lib/match/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = _interopRequireDefault(require_buildMatchFn());
    var _index2 = _interopRequireDefault(require_buildMatchPatternFn());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
    var parseOrdinalNumberPattern = /\d+/i;
    var matchEraPatterns = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i
    };
    var parseEraPatterns = {
      any: [/^b/i, /^(a|c)/i]
    };
    var matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i
    };
    var parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i]
    };
    var matchMonthPatterns = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    };
    var parseMonthPatterns = {
      narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
      any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    };
    var matchDayPatterns = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    };
    var parseDayPatterns = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    };
    var matchDayPeriodPatterns = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    };
    var parseDayPeriodPatterns = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i
      }
    };
    var match = {
      ordinalNumber: (0, _index2.default)({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: function(value) {
          return parseInt(value, 10);
        }
      }),
      era: (0, _index.default)({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseEraPatterns,
        defaultParseWidth: "any"
      }),
      quarter: (0, _index.default)({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: "any",
        valueCallback: function(index) {
          return index + 1;
        }
      }),
      month: (0, _index.default)({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: "any"
      }),
      day: (0, _index.default)({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseDayPatterns,
        defaultParseWidth: "any"
      }),
      dayPeriod: (0, _index.default)({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: "any",
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: "any"
      })
    };
    var _default = match;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/locale/en-US/index.js
var require_en_US = __commonJS({
  "../../node_modules/date-fns/locale/en-US/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = _interopRequireDefault(require_formatDistance());
    var _index2 = _interopRequireDefault(require_formatLong());
    var _index3 = _interopRequireDefault(require_formatRelative());
    var _index4 = _interopRequireDefault(require_localize());
    var _index5 = _interopRequireDefault(require_match());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var locale = {
      code: "en-US",
      formatDistance: _index.default,
      formatLong: _index2.default,
      formatRelative: _index3.default,
      localize: _index4.default,
      match: _index5.default,
      options: {
        weekStartsOn: 0,
        firstWeekContainsDate: 1
      }
    };
    var _default = locale;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/toInteger/index.js
var require_toInteger = __commonJS({
  "../../node_modules/date-fns/_lib/toInteger/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toInteger;
    function toInteger(dirtyNumber) {
      if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
        return NaN;
      }
      var number = Number(dirtyNumber);
      if (isNaN(number)) {
        return number;
      }
      return number < 0 ? Math.ceil(number) : Math.floor(number);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/addMilliseconds/index.js
var require_addMilliseconds = __commonJS({
  "../../node_modules/date-fns/addMilliseconds/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = addMilliseconds;
    var _index = _interopRequireDefault(require_toInteger());
    var _index2 = _interopRequireDefault(require_toDate());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function addMilliseconds(dirtyDate, dirtyAmount) {
      (0, _index3.default)(2, arguments);
      var timestamp = (0, _index2.default)(dirtyDate).getTime();
      var amount = (0, _index.default)(dirtyAmount);
      return new Date(timestamp + amount);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/subMilliseconds/index.js
var require_subMilliseconds = __commonJS({
  "../../node_modules/date-fns/subMilliseconds/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = subMilliseconds;
    var _index = _interopRequireDefault(require_toInteger());
    var _index2 = _interopRequireDefault(require_addMilliseconds());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function subMilliseconds(dirtyDate, dirtyAmount) {
      (0, _index3.default)(2, arguments);
      var amount = (0, _index.default)(dirtyAmount);
      return (0, _index2.default)(dirtyDate, -amount);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/getUTCDayOfYear/index.js
var require_getUTCDayOfYear = __commonJS({
  "../../node_modules/date-fns/_lib/getUTCDayOfYear/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getUTCDayOfYear;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var MILLISECONDS_IN_DAY = 864e5;
    function getUTCDayOfYear(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var timestamp = date.getTime();
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
      var startOfYearTimestamp = date.getTime();
      var difference = timestamp - startOfYearTimestamp;
      return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/startOfUTCISOWeek/index.js
var require_startOfUTCISOWeek = __commonJS({
  "../../node_modules/date-fns/_lib/startOfUTCISOWeek/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = startOfUTCISOWeek;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function startOfUTCISOWeek(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var weekStartsOn = 1;
      var date = (0, _index.default)(dirtyDate);
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/getUTCISOWeekYear/index.js
var require_getUTCISOWeekYear = __commonJS({
  "../../node_modules/date-fns/_lib/getUTCISOWeekYear/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getUTCISOWeekYear;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    var _index3 = _interopRequireDefault(require_startOfUTCISOWeek());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getUTCISOWeekYear(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var year = date.getUTCFullYear();
      var fourthOfJanuaryOfNextYear = new Date(0);
      fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = (0, _index3.default)(fourthOfJanuaryOfNextYear);
      var fourthOfJanuaryOfThisYear = new Date(0);
      fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = (0, _index3.default)(fourthOfJanuaryOfThisYear);
      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/startOfUTCISOWeekYear/index.js
var require_startOfUTCISOWeekYear = __commonJS({
  "../../node_modules/date-fns/_lib/startOfUTCISOWeekYear/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = startOfUTCISOWeekYear;
    var _index = _interopRequireDefault(require_getUTCISOWeekYear());
    var _index2 = _interopRequireDefault(require_startOfUTCISOWeek());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function startOfUTCISOWeekYear(dirtyDate) {
      (0, _index3.default)(1, arguments);
      var year = (0, _index.default)(dirtyDate);
      var fourthOfJanuary = new Date(0);
      fourthOfJanuary.setUTCFullYear(year, 0, 4);
      fourthOfJanuary.setUTCHours(0, 0, 0, 0);
      var date = (0, _index2.default)(fourthOfJanuary);
      return date;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/getUTCISOWeek/index.js
var require_getUTCISOWeek = __commonJS({
  "../../node_modules/date-fns/_lib/getUTCISOWeek/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getUTCISOWeek;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_startOfUTCISOWeek());
    var _index3 = _interopRequireDefault(require_startOfUTCISOWeekYear());
    var _index4 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var MILLISECONDS_IN_WEEK = 6048e5;
    function getUTCISOWeek(dirtyDate) {
      (0, _index4.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var diff = (0, _index2.default)(date).getTime() - (0, _index3.default)(date).getTime();
      return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/startOfUTCWeek/index.js
var require_startOfUTCWeek = __commonJS({
  "../../node_modules/date-fns/_lib/startOfUTCWeek/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = startOfUTCWeek;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    var _index3 = _interopRequireDefault(require_toInteger());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function startOfUTCWeek(dirtyDate, dirtyOptions) {
      (0, _index2.default)(1, arguments);
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
      var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index3.default)(localeWeekStartsOn);
      var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index3.default)(options.weekStartsOn);
      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
      }
      var date = (0, _index.default)(dirtyDate);
      var day = date.getUTCDay();
      var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      date.setUTCDate(date.getUTCDate() - diff);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/getUTCWeekYear/index.js
var require_getUTCWeekYear = __commonJS({
  "../../node_modules/date-fns/_lib/getUTCWeekYear/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getUTCWeekYear;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    var _index3 = _interopRequireDefault(require_startOfUTCWeek());
    var _index4 = _interopRequireDefault(require_toInteger());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getUTCWeekYear(dirtyDate, dirtyOptions) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var year = date.getUTCFullYear();
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
      var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index4.default)(localeFirstWeekContainsDate);
      var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index4.default)(options.firstWeekContainsDate);
      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
      }
      var firstWeekOfNextYear = new Date(0);
      firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
      firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
      var startOfNextYear = (0, _index3.default)(firstWeekOfNextYear, dirtyOptions);
      var firstWeekOfThisYear = new Date(0);
      firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
      var startOfThisYear = (0, _index3.default)(firstWeekOfThisYear, dirtyOptions);
      if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/startOfUTCWeekYear/index.js
var require_startOfUTCWeekYear = __commonJS({
  "../../node_modules/date-fns/_lib/startOfUTCWeekYear/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = startOfUTCWeekYear;
    var _index = _interopRequireDefault(require_getUTCWeekYear());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    var _index3 = _interopRequireDefault(require_startOfUTCWeek());
    var _index4 = _interopRequireDefault(require_toInteger());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
      (0, _index2.default)(1, arguments);
      var options = dirtyOptions || {};
      var locale = options.locale;
      var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
      var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index4.default)(localeFirstWeekContainsDate);
      var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index4.default)(options.firstWeekContainsDate);
      var year = (0, _index.default)(dirtyDate, dirtyOptions);
      var firstWeek = new Date(0);
      firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
      firstWeek.setUTCHours(0, 0, 0, 0);
      var date = (0, _index3.default)(firstWeek, dirtyOptions);
      return date;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/getUTCWeek/index.js
var require_getUTCWeek = __commonJS({
  "../../node_modules/date-fns/_lib/getUTCWeek/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getUTCWeek;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_startOfUTCWeek());
    var _index3 = _interopRequireDefault(require_startOfUTCWeekYear());
    var _index4 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var MILLISECONDS_IN_WEEK = 6048e5;
    function getUTCWeek(dirtyDate, options) {
      (0, _index4.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var diff = (0, _index2.default)(date, options).getTime() - (0, _index3.default)(date, options).getTime();
      return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/addLeadingZeros/index.js
var require_addLeadingZeros = __commonJS({
  "../../node_modules/date-fns/_lib/addLeadingZeros/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = addLeadingZeros;
    function addLeadingZeros(number, targetLength) {
      var sign = number < 0 ? "-" : "";
      var output = Math.abs(number).toString();
      while (output.length < targetLength) {
        output = "0" + output;
      }
      return sign + output;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/format/lightFormatters/index.js
var require_lightFormatters = __commonJS({
  "../../node_modules/date-fns/_lib/format/lightFormatters/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = _interopRequireDefault(require_addLeadingZeros());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var formatters = {
      y: function(date, token) {
        var signedYear = date.getUTCFullYear();
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return (0, _index.default)(token === "yy" ? year % 100 : year, token.length);
      },
      M: function(date, token) {
        var month = date.getUTCMonth();
        return token === "M" ? String(month + 1) : (0, _index.default)(month + 1, 2);
      },
      d: function(date, token) {
        return (0, _index.default)(date.getUTCDate(), token.length);
      },
      a: function(date, token) {
        var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
        switch (token) {
          case "a":
          case "aa":
            return dayPeriodEnumValue.toUpperCase();
          case "aaa":
            return dayPeriodEnumValue;
          case "aaaaa":
            return dayPeriodEnumValue[0];
          case "aaaa":
          default:
            return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
        }
      },
      h: function(date, token) {
        return (0, _index.default)(date.getUTCHours() % 12 || 12, token.length);
      },
      H: function(date, token) {
        return (0, _index.default)(date.getUTCHours(), token.length);
      },
      m: function(date, token) {
        return (0, _index.default)(date.getUTCMinutes(), token.length);
      },
      s: function(date, token) {
        return (0, _index.default)(date.getUTCSeconds(), token.length);
      },
      S: function(date, token) {
        var numberOfDigits = token.length;
        var milliseconds = date.getUTCMilliseconds();
        var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
        return (0, _index.default)(fractionalSeconds, token.length);
      }
    };
    var _default = formatters;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/format/formatters/index.js
var require_formatters = __commonJS({
  "../../node_modules/date-fns/_lib/format/formatters/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = _interopRequireDefault(require_getUTCDayOfYear());
    var _index2 = _interopRequireDefault(require_getUTCISOWeek());
    var _index3 = _interopRequireDefault(require_getUTCISOWeekYear());
    var _index4 = _interopRequireDefault(require_getUTCWeek());
    var _index5 = _interopRequireDefault(require_getUTCWeekYear());
    var _index6 = _interopRequireDefault(require_addLeadingZeros());
    var _index7 = _interopRequireDefault(require_lightFormatters());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var dayPeriodEnum = {
      am: "am",
      pm: "pm",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    };
    var formatters = {
      G: function(date, token, localize) {
        var era = date.getUTCFullYear() > 0 ? 1 : 0;
        switch (token) {
          case "G":
          case "GG":
          case "GGG":
            return localize.era(era, {
              width: "abbreviated"
            });
          case "GGGGG":
            return localize.era(era, {
              width: "narrow"
            });
          case "GGGG":
          default:
            return localize.era(era, {
              width: "wide"
            });
        }
      },
      y: function(date, token, localize) {
        if (token === "yo") {
          var signedYear = date.getUTCFullYear();
          var year = signedYear > 0 ? signedYear : 1 - signedYear;
          return localize.ordinalNumber(year, {
            unit: "year"
          });
        }
        return _index7.default.y(date, token);
      },
      Y: function(date, token, localize, options) {
        var signedWeekYear = (0, _index5.default)(date, options);
        var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
        if (token === "YY") {
          var twoDigitYear = weekYear % 100;
          return (0, _index6.default)(twoDigitYear, 2);
        }
        if (token === "Yo") {
          return localize.ordinalNumber(weekYear, {
            unit: "year"
          });
        }
        return (0, _index6.default)(weekYear, token.length);
      },
      R: function(date, token) {
        var isoWeekYear = (0, _index3.default)(date);
        return (0, _index6.default)(isoWeekYear, token.length);
      },
      u: function(date, token) {
        var year = date.getUTCFullYear();
        return (0, _index6.default)(year, token.length);
      },
      Q: function(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch (token) {
          case "Q":
            return String(quarter);
          case "QQ":
            return (0, _index6.default)(quarter, 2);
          case "Qo":
            return localize.ordinalNumber(quarter, {
              unit: "quarter"
            });
          case "QQQ":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "formatting"
            });
          case "QQQQQ":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "formatting"
            });
          case "QQQQ":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      q: function(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch (token) {
          case "q":
            return String(quarter);
          case "qq":
            return (0, _index6.default)(quarter, 2);
          case "qo":
            return localize.ordinalNumber(quarter, {
              unit: "quarter"
            });
          case "qqq":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "standalone"
            });
          case "qqqqq":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "standalone"
            });
          case "qqqq":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      M: function(date, token, localize) {
        var month = date.getUTCMonth();
        switch (token) {
          case "M":
          case "MM":
            return _index7.default.M(date, token);
          case "Mo":
            return localize.ordinalNumber(month + 1, {
              unit: "month"
            });
          case "MMM":
            return localize.month(month, {
              width: "abbreviated",
              context: "formatting"
            });
          case "MMMMM":
            return localize.month(month, {
              width: "narrow",
              context: "formatting"
            });
          case "MMMM":
          default:
            return localize.month(month, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      L: function(date, token, localize) {
        var month = date.getUTCMonth();
        switch (token) {
          case "L":
            return String(month + 1);
          case "LL":
            return (0, _index6.default)(month + 1, 2);
          case "Lo":
            return localize.ordinalNumber(month + 1, {
              unit: "month"
            });
          case "LLL":
            return localize.month(month, {
              width: "abbreviated",
              context: "standalone"
            });
          case "LLLLL":
            return localize.month(month, {
              width: "narrow",
              context: "standalone"
            });
          case "LLLL":
          default:
            return localize.month(month, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      w: function(date, token, localize, options) {
        var week = (0, _index4.default)(date, options);
        if (token === "wo") {
          return localize.ordinalNumber(week, {
            unit: "week"
          });
        }
        return (0, _index6.default)(week, token.length);
      },
      I: function(date, token, localize) {
        var isoWeek = (0, _index2.default)(date);
        if (token === "Io") {
          return localize.ordinalNumber(isoWeek, {
            unit: "week"
          });
        }
        return (0, _index6.default)(isoWeek, token.length);
      },
      d: function(date, token, localize) {
        if (token === "do") {
          return localize.ordinalNumber(date.getUTCDate(), {
            unit: "date"
          });
        }
        return _index7.default.d(date, token);
      },
      D: function(date, token, localize) {
        var dayOfYear = (0, _index.default)(date);
        if (token === "Do") {
          return localize.ordinalNumber(dayOfYear, {
            unit: "dayOfYear"
          });
        }
        return (0, _index6.default)(dayOfYear, token.length);
      },
      E: function(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        switch (token) {
          case "E":
          case "EE":
          case "EEE":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting"
            });
          case "EEEEE":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting"
            });
          case "EEEEEE":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting"
            });
          case "EEEE":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      e: function(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          case "e":
            return String(localDayOfWeek);
          case "ee":
            return (0, _index6.default)(localDayOfWeek, 2);
          case "eo":
            return localize.ordinalNumber(localDayOfWeek, {
              unit: "day"
            });
          case "eee":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting"
            });
          case "eeeee":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting"
            });
          case "eeeeee":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting"
            });
          case "eeee":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      c: function(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          case "c":
            return String(localDayOfWeek);
          case "cc":
            return (0, _index6.default)(localDayOfWeek, token.length);
          case "co":
            return localize.ordinalNumber(localDayOfWeek, {
              unit: "day"
            });
          case "ccc":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "standalone"
            });
          case "ccccc":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "standalone"
            });
          case "cccccc":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "standalone"
            });
          case "cccc":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "standalone"
            });
        }
      },
      i: function(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
        switch (token) {
          case "i":
            return String(isoDayOfWeek);
          case "ii":
            return (0, _index6.default)(isoDayOfWeek, token.length);
          case "io":
            return localize.ordinalNumber(isoDayOfWeek, {
              unit: "day"
            });
          case "iii":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting"
            });
          case "iiiii":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting"
            });
          case "iiiiii":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting"
            });
          case "iiii":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      a: function(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        switch (token) {
          case "a":
          case "aa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            });
          case "aaa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            }).toLowerCase();
          case "aaaaa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting"
            });
          case "aaaa":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      b: function(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours === 12) {
          dayPeriodEnumValue = dayPeriodEnum.noon;
        } else if (hours === 0) {
          dayPeriodEnumValue = dayPeriodEnum.midnight;
        } else {
          dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        }
        switch (token) {
          case "b":
          case "bb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            });
          case "bbb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            }).toLowerCase();
          case "bbbbb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting"
            });
          case "bbbb":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      B: function(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours >= 17) {
          dayPeriodEnumValue = dayPeriodEnum.evening;
        } else if (hours >= 12) {
          dayPeriodEnumValue = dayPeriodEnum.afternoon;
        } else if (hours >= 4) {
          dayPeriodEnumValue = dayPeriodEnum.morning;
        } else {
          dayPeriodEnumValue = dayPeriodEnum.night;
        }
        switch (token) {
          case "B":
          case "BB":
          case "BBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting"
            });
          case "BBBBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting"
            });
          case "BBBB":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting"
            });
        }
      },
      h: function(date, token, localize) {
        if (token === "ho") {
          var hours = date.getUTCHours() % 12;
          if (hours === 0)
            hours = 12;
          return localize.ordinalNumber(hours, {
            unit: "hour"
          });
        }
        return _index7.default.h(date, token);
      },
      H: function(date, token, localize) {
        if (token === "Ho") {
          return localize.ordinalNumber(date.getUTCHours(), {
            unit: "hour"
          });
        }
        return _index7.default.H(date, token);
      },
      K: function(date, token, localize) {
        var hours = date.getUTCHours() % 12;
        if (token === "Ko") {
          return localize.ordinalNumber(hours, {
            unit: "hour"
          });
        }
        return (0, _index6.default)(hours, token.length);
      },
      k: function(date, token, localize) {
        var hours = date.getUTCHours();
        if (hours === 0)
          hours = 24;
        if (token === "ko") {
          return localize.ordinalNumber(hours, {
            unit: "hour"
          });
        }
        return (0, _index6.default)(hours, token.length);
      },
      m: function(date, token, localize) {
        if (token === "mo") {
          return localize.ordinalNumber(date.getUTCMinutes(), {
            unit: "minute"
          });
        }
        return _index7.default.m(date, token);
      },
      s: function(date, token, localize) {
        if (token === "so") {
          return localize.ordinalNumber(date.getUTCSeconds(), {
            unit: "second"
          });
        }
        return _index7.default.s(date, token);
      },
      S: function(date, token) {
        return _index7.default.S(date, token);
      },
      X: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        if (timezoneOffset === 0) {
          return "Z";
        }
        switch (token) {
          case "X":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);
          case "XXXX":
          case "XX":
            return formatTimezone(timezoneOffset);
          case "XXXXX":
          case "XXX":
          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },
      x: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          case "x":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);
          case "xxxx":
          case "xx":
            return formatTimezone(timezoneOffset);
          case "xxxxx":
          case "xxx":
          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },
      O: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");
          case "OOOO":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },
      z: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch (token) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");
          case "zzzz":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },
      t: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = Math.floor(originalDate.getTime() / 1e3);
        return (0, _index6.default)(timestamp, token.length);
      },
      T: function(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = originalDate.getTime();
        return (0, _index6.default)(timestamp, token.length);
      }
    };
    function formatTimezoneShort(offset, dirtyDelimiter) {
      var sign = offset > 0 ? "-" : "+";
      var absOffset = Math.abs(offset);
      var hours = Math.floor(absOffset / 60);
      var minutes = absOffset % 60;
      if (minutes === 0) {
        return sign + String(hours);
      }
      var delimiter = dirtyDelimiter || "";
      return sign + String(hours) + delimiter + (0, _index6.default)(minutes, 2);
    }
    function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
      if (offset % 60 === 0) {
        var sign = offset > 0 ? "-" : "+";
        return sign + (0, _index6.default)(Math.abs(offset) / 60, 2);
      }
      return formatTimezone(offset, dirtyDelimiter);
    }
    function formatTimezone(offset, dirtyDelimiter) {
      var delimiter = dirtyDelimiter || "";
      var sign = offset > 0 ? "-" : "+";
      var absOffset = Math.abs(offset);
      var hours = (0, _index6.default)(Math.floor(absOffset / 60), 2);
      var minutes = (0, _index6.default)(absOffset % 60, 2);
      return sign + hours + delimiter + minutes;
    }
    var _default = formatters;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/format/longFormatters/index.js
var require_longFormatters = __commonJS({
  "../../node_modules/date-fns/_lib/format/longFormatters/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function dateLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case "P":
          return formatLong.date({
            width: "short"
          });
        case "PP":
          return formatLong.date({
            width: "medium"
          });
        case "PPP":
          return formatLong.date({
            width: "long"
          });
        case "PPPP":
        default:
          return formatLong.date({
            width: "full"
          });
      }
    }
    function timeLongFormatter(pattern, formatLong) {
      switch (pattern) {
        case "p":
          return formatLong.time({
            width: "short"
          });
        case "pp":
          return formatLong.time({
            width: "medium"
          });
        case "ppp":
          return formatLong.time({
            width: "long"
          });
        case "pppp":
        default:
          return formatLong.time({
            width: "full"
          });
      }
    }
    function dateTimeLongFormatter(pattern, formatLong) {
      var matchResult = pattern.match(/(P+)(p+)?/) || [];
      var datePattern = matchResult[1];
      var timePattern = matchResult[2];
      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }
      var dateTimeFormat;
      switch (datePattern) {
        case "P":
          dateTimeFormat = formatLong.dateTime({
            width: "short"
          });
          break;
        case "PP":
          dateTimeFormat = formatLong.dateTime({
            width: "medium"
          });
          break;
        case "PPP":
          dateTimeFormat = formatLong.dateTime({
            width: "long"
          });
          break;
        case "PPPP":
        default:
          dateTimeFormat = formatLong.dateTime({
            width: "full"
          });
          break;
      }
      return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
    }
    var longFormatters = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter
    };
    var _default = longFormatters;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js
var require_getTimezoneOffsetInMilliseconds = __commonJS({
  "../../node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getTimezoneOffsetInMilliseconds;
    function getTimezoneOffsetInMilliseconds(date) {
      var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
      utcDate.setUTCFullYear(date.getFullYear());
      return date.getTime() - utcDate.getTime();
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/protectedTokens/index.js
var require_protectedTokens = __commonJS({
  "../../node_modules/date-fns/_lib/protectedTokens/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isProtectedDayOfYearToken = isProtectedDayOfYearToken;
    exports.isProtectedWeekYearToken = isProtectedWeekYearToken;
    exports.throwProtectedError = throwProtectedError;
    var protectedDayOfYearTokens = ["D", "DD"];
    var protectedWeekYearTokens = ["YY", "YYYY"];
    function isProtectedDayOfYearToken(token) {
      return protectedDayOfYearTokens.indexOf(token) !== -1;
    }
    function isProtectedWeekYearToken(token) {
      return protectedWeekYearTokens.indexOf(token) !== -1;
    }
    function throwProtectedError(token, format4, input) {
      if (token === "YYYY") {
        throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format4, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
      } else if (token === "YY") {
        throw new RangeError("Use `yy` instead of `YY` (in `".concat(format4, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
      } else if (token === "D") {
        throw new RangeError("Use `d` instead of `D` (in `".concat(format4, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
      } else if (token === "DD") {
        throw new RangeError("Use `dd` instead of `DD` (in `".concat(format4, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
      }
    }
  }
});

// ../../node_modules/date-fns/format/index.js
var require_format = __commonJS({
  "../../node_modules/date-fns/format/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = format4;
    var _index = _interopRequireDefault(require_isValid());
    var _index2 = _interopRequireDefault(require_en_US());
    var _index3 = _interopRequireDefault(require_subMilliseconds());
    var _index4 = _interopRequireDefault(require_toDate());
    var _index5 = _interopRequireDefault(require_formatters());
    var _index6 = _interopRequireDefault(require_longFormatters());
    var _index7 = _interopRequireDefault(require_getTimezoneOffsetInMilliseconds());
    var _index8 = require_protectedTokens();
    var _index9 = _interopRequireDefault(require_toInteger());
    var _index10 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
    var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    var escapedStringRegExp = /^'([^]*?)'?$/;
    var doubleQuoteRegExp = /''/g;
    var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
    function format4(dirtyDate, dirtyFormatStr, dirtyOptions) {
      (0, _index10.default)(2, arguments);
      var formatStr = String(dirtyFormatStr);
      var options = dirtyOptions || {};
      var locale = options.locale || _index2.default;
      var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;
      var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index9.default)(localeFirstWeekContainsDate);
      var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index9.default)(options.firstWeekContainsDate);
      if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
        throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
      }
      var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
      var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index9.default)(localeWeekStartsOn);
      var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index9.default)(options.weekStartsOn);
      if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
      }
      if (!locale.localize) {
        throw new RangeError("locale must contain localize property");
      }
      if (!locale.formatLong) {
        throw new RangeError("locale must contain formatLong property");
      }
      var originalDate = (0, _index4.default)(dirtyDate);
      if (!(0, _index.default)(originalDate)) {
        throw new RangeError("Invalid time value");
      }
      var timezoneOffset = (0, _index7.default)(originalDate);
      var utcDate = (0, _index3.default)(originalDate, timezoneOffset);
      var formatterOptions = {
        firstWeekContainsDate,
        weekStartsOn,
        locale,
        _originalDate: originalDate
      };
      var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
        var firstCharacter = substring[0];
        if (firstCharacter === "p" || firstCharacter === "P") {
          var longFormatter = _index6.default[firstCharacter];
          return longFormatter(substring, locale.formatLong, formatterOptions);
        }
        return substring;
      }).join("").match(formattingTokensRegExp).map(function(substring) {
        if (substring === "''") {
          return "'";
        }
        var firstCharacter = substring[0];
        if (firstCharacter === "'") {
          return cleanEscapedString(substring);
        }
        var formatter = _index5.default[firstCharacter];
        if (formatter) {
          if (!options.useAdditionalWeekYearTokens && (0, _index8.isProtectedWeekYearToken)(substring)) {
            (0, _index8.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);
          }
          if (!options.useAdditionalDayOfYearTokens && (0, _index8.isProtectedDayOfYearToken)(substring)) {
            (0, _index8.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);
          }
          return formatter(utcDate, substring, locale.localize, formatterOptions);
        }
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        }
        return substring;
      }).join("");
      return result;
    }
    function cleanEscapedString(input) {
      return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/format-number/index.js
var require_format_number = __commonJS({
  "../../node_modules/format-number/index.js"(exports, module) {
    module.exports = formatter;
    module.exports.default = formatter;
    function formatter(options) {
      options = options || {};
      options.negativeType = options.negativeType || (options.negative === "R" ? "right" : "left");
      if (typeof options.negativeLeftSymbol !== "string") {
        switch (options.negativeType) {
          case "left":
            options.negativeLeftSymbol = "-";
            break;
          case "brackets":
            options.negativeLeftSymbol = "(";
            break;
          default:
            options.negativeLeftSymbol = "";
        }
      }
      if (typeof options.negativeRightSymbol !== "string") {
        switch (options.negativeType) {
          case "right":
            options.negativeRightSymbol = "-";
            break;
          case "brackets":
            options.negativeRightSymbol = ")";
            break;
          default:
            options.negativeRightSymbol = "";
        }
      }
      if (typeof options.negativeLeftOut !== "boolean") {
        options.negativeLeftOut = options.negativeOut === false ? false : true;
      }
      if (typeof options.negativeRightOut !== "boolean") {
        options.negativeRightOut = options.negativeOut === false ? false : true;
      }
      options.prefix = options.prefix || "";
      options.suffix = options.suffix || "";
      if (typeof options.integerSeparator !== "string") {
        options.integerSeparator = typeof options.separator === "string" ? options.separator : ",";
      }
      options.decimalsSeparator = typeof options.decimalsSeparator === "string" ? options.decimalsSeparator : "";
      options.decimal = options.decimal || ".";
      options.padLeft = options.padLeft || -1;
      options.padRight = options.padRight || -1;
      function format4(number, overrideOptions) {
        overrideOptions = overrideOptions || {};
        if (number || number === 0) {
          number = "" + number;
        } else {
          return "";
        }
        var output = [];
        var negative = number.charAt(0) === "-";
        number = number.replace(/^\-/g, "");
        if (!options.negativeLeftOut && !overrideOptions.noUnits) {
          output.push(options.prefix);
        }
        if (negative) {
          output.push(options.negativeLeftSymbol);
        }
        if (options.negativeLeftOut && !overrideOptions.noUnits) {
          output.push(options.prefix);
        }
        number = number.split(".");
        if (options.round != null)
          round(number, options.round);
        if (options.truncate != null)
          number[1] = truncate(number[1], options.truncate);
        if (options.padLeft > 0)
          number[0] = padLeft(number[0], options.padLeft);
        if (options.padRight > 0)
          number[1] = padRight(number[1], options.padRight);
        if (!overrideOptions.noSeparator && number[1])
          number[1] = addDecimalSeparators(number[1], options.decimalsSeparator);
        if (!overrideOptions.noSeparator && number[0])
          number[0] = addIntegerSeparators(number[0], options.integerSeparator);
        output.push(number[0]);
        if (number[1]) {
          output.push(options.decimal);
          output.push(number[1]);
        }
        if (options.negativeRightOut && !overrideOptions.noUnits) {
          output.push(options.suffix);
        }
        if (negative) {
          output.push(options.negativeRightSymbol);
        }
        if (!options.negativeRightOut && !overrideOptions.noUnits) {
          output.push(options.suffix);
        }
        return output.join("");
      }
      format4.negative = options.negative;
      format4.negativeOut = options.negativeOut;
      format4.negativeType = options.negativeType;
      format4.negativeLeftOut = options.negativeLeftOut;
      format4.negativeLeftSymbol = options.negativeLeftSymbol;
      format4.negativeRightOut = options.negativeRightOut;
      format4.negativeRightSymbol = options.negativeRightSymbol;
      format4.prefix = options.prefix;
      format4.suffix = options.suffix;
      format4.separate = options.separate;
      format4.integerSeparator = options.integerSeparator;
      format4.decimalsSeparator = options.decimalsSeparator;
      format4.decimal = options.decimal;
      format4.padLeft = options.padLeft;
      format4.padRight = options.padRight;
      format4.truncate = options.truncate;
      format4.round = options.round;
      function unformat(number, allowedSeparators) {
        allowedSeparators = allowedSeparators || [];
        if (options.allowedSeparators) {
          options.allowedSeparators.forEach(function(s) {
            allowedSeparators.push(s);
          });
        }
        allowedSeparators.push(options.integerSeparator);
        allowedSeparators.push(options.decimalsSeparator);
        number = number.replace(options.prefix, "");
        number = number.replace(options.suffix, "");
        var newNumber = number;
        do {
          number = newNumber;
          for (var i = 0; i < allowedSeparators.length; i++) {
            newNumber = newNumber.replace(allowedSeparators[i], "");
          }
        } while (newNumber != number);
        return number;
      }
      format4.unformat = unformat;
      function validate(number, allowedSeparators) {
        number = unformat(number, allowedSeparators);
        number = number.split(options.decimal);
        if (number.length > 2) {
          return false;
        } else if (options.truncate != null && number[1] && number[1].length > options.truncate) {
          return false;
        } else if (options.round != null && number[1] && number[1].length > options.round) {
          return false;
        } else {
          return /^-?\d+\.?\d*$/.test(number);
        }
      }
      return format4;
    }
    function addIntegerSeparators(x, separator) {
      x += "";
      if (!separator)
        return x;
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x)) {
        x = x.replace(rgx, "$1" + separator + "$2");
      }
      return x;
    }
    function addDecimalSeparators(x, separator) {
      x += "";
      if (!separator)
        return x;
      var rgx = /(\d{3})(\d+)/;
      while (rgx.test(x)) {
        x = x.replace(rgx, "$1" + separator + "$2");
      }
      return x;
    }
    function padLeft(x, padding) {
      x = x + "";
      var buf = [];
      while (buf.length + x.length < padding) {
        buf.push("0");
      }
      return buf.join("") + x;
    }
    function padRight(x, padding) {
      if (x) {
        x += "";
      } else {
        x = "";
      }
      var buf = [];
      while (buf.length + x.length < padding) {
        buf.push("0");
      }
      return x + buf.join("");
    }
    function truncate(x, length) {
      if (x) {
        x += "";
      }
      if (x && x.length > length) {
        return x.substr(0, length);
      } else {
        return x;
      }
    }
    function round(number, places) {
      if (number[1] && places >= 0 && number[1].length > places) {
        var decim = number[1].slice(0, places);
        if (+number[1].substr(places, 1) >= 5) {
          var leadingzeros = "";
          while (decim.charAt(0) === "0") {
            leadingzeros = leadingzeros + "0";
            decim = decim.substr(1);
          }
          decim = +decim + 1 + "";
          decim = leadingzeros + decim;
          if (decim.length > places) {
            number[0] = +number[0] + +decim.charAt(0) + "";
            decim = decim.substring(1);
          }
        }
        number[1] = decim;
      }
      return number;
    }
  }
});

// ../../node_modules/date-fns/addDays/index.js
var require_addDays = __commonJS({
  "../../node_modules/date-fns/addDays/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = addDays;
    var _index = _interopRequireDefault(require_toInteger());
    var _index2 = _interopRequireDefault(require_toDate());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function addDays(dirtyDate, dirtyAmount) {
      (0, _index3.default)(2, arguments);
      var date = (0, _index2.default)(dirtyDate);
      var amount = (0, _index.default)(dirtyAmount);
      if (isNaN(amount)) {
        return new Date(NaN);
      }
      if (!amount) {
        return date;
      }
      date.setDate(date.getDate() + amount);
      return date;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/addMonths/index.js
var require_addMonths = __commonJS({
  "../../node_modules/date-fns/addMonths/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = addMonths;
    var _index = _interopRequireDefault(require_toInteger());
    var _index2 = _interopRequireDefault(require_toDate());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function addMonths(dirtyDate, dirtyAmount) {
      (0, _index3.default)(2, arguments);
      var date = (0, _index2.default)(dirtyDate);
      var amount = (0, _index.default)(dirtyAmount);
      if (isNaN(amount)) {
        return new Date(NaN);
      }
      if (!amount) {
        return date;
      }
      var dayOfMonth = date.getDate();
      var endOfDesiredMonth = new Date(date.getTime());
      endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
      var daysInMonth = endOfDesiredMonth.getDate();
      if (dayOfMonth >= daysInMonth) {
        return endOfDesiredMonth;
      } else {
        date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
        return date;
      }
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/add/index.js
var require_add = __commonJS({
  "../../node_modules/date-fns/add/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = add2;
    var _index = _interopRequireDefault(require_addDays());
    var _index2 = _interopRequireDefault(require_addMonths());
    var _index3 = _interopRequireDefault(require_toDate());
    var _index4 = _interopRequireDefault(require_requiredArgs());
    var _index5 = _interopRequireDefault(require_toInteger());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function add2(dirtyDate, duration) {
      (0, _index4.default)(2, arguments);
      if (!duration || typeof duration !== "object")
        return new Date(NaN);
      var years = duration.years ? (0, _index5.default)(duration.years) : 0;
      var months = duration.months ? (0, _index5.default)(duration.months) : 0;
      var weeks = duration.weeks ? (0, _index5.default)(duration.weeks) : 0;
      var days = duration.days ? (0, _index5.default)(duration.days) : 0;
      var hours = duration.hours ? (0, _index5.default)(duration.hours) : 0;
      var minutes = duration.minutes ? (0, _index5.default)(duration.minutes) : 0;
      var seconds = duration.seconds ? (0, _index5.default)(duration.seconds) : 0;
      var date = (0, _index3.default)(dirtyDate);
      var dateWithMonths = months || years ? (0, _index2.default)(date, months + years * 12) : date;
      var dateWithDays = days || weeks ? (0, _index.default)(dateWithMonths, days + weeks * 7) : dateWithMonths;
      var minutesToAdd = minutes + hours * 60;
      var secondsToAdd = seconds + minutesToAdd * 60;
      var msToAdd = secondsToAdd * 1e3;
      var finalDate = new Date(dateWithDays.getTime() + msToAdd);
      return finalDate;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/getDate/index.js
var require_getDate = __commonJS({
  "../../node_modules/date-fns/getDate/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getDate2;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getDate2(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var dayOfMonth = date.getDate();
      return dayOfMonth;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/getDay/index.js
var require_getDay = __commonJS({
  "../../node_modules/date-fns/getDay/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getDay2;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getDay2(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var day = date.getDay();
      return day;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/getHours/index.js
var require_getHours = __commonJS({
  "../../node_modules/date-fns/getHours/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getHours2;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getHours2(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var hours = date.getHours();
      return hours;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/getMinutes/index.js
var require_getMinutes = __commonJS({
  "../../node_modules/date-fns/getMinutes/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getMinutes2;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getMinutes2(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var minutes = date.getMinutes();
      return minutes;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/getMonth/index.js
var require_getMonth = __commonJS({
  "../../node_modules/date-fns/getMonth/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getMonth2;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getMonth2(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var month = date.getMonth();
      return month;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/getYear/index.js
var require_getYear = __commonJS({
  "../../node_modules/date-fns/getYear/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getYear2;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getYear2(dirtyDate) {
      (0, _index2.default)(1, arguments);
      return (0, _index.default)(dirtyDate).getFullYear();
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/compareAsc/index.js
var require_compareAsc = __commonJS({
  "../../node_modules/date-fns/compareAsc/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = compareAsc;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function compareAsc(dirtyDateLeft, dirtyDateRight) {
      (0, _index2.default)(2, arguments);
      var dateLeft = (0, _index.default)(dirtyDateLeft);
      var dateRight = (0, _index.default)(dirtyDateRight);
      var diff = dateLeft.getTime() - dateRight.getTime();
      if (diff < 0) {
        return -1;
      } else if (diff > 0) {
        return 1;
      } else {
        return diff;
      }
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/differenceInCalendarYears/index.js
var require_differenceInCalendarYears = __commonJS({
  "../../node_modules/date-fns/differenceInCalendarYears/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInCalendarYears;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
      (0, _index2.default)(2, arguments);
      var dateLeft = (0, _index.default)(dirtyDateLeft);
      var dateRight = (0, _index.default)(dirtyDateRight);
      return dateLeft.getFullYear() - dateRight.getFullYear();
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/differenceInYears/index.js
var require_differenceInYears = __commonJS({
  "../../node_modules/date-fns/differenceInYears/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInYears;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_differenceInCalendarYears());
    var _index3 = _interopRequireDefault(require_compareAsc());
    var _index4 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function differenceInYears(dirtyDateLeft, dirtyDateRight) {
      (0, _index4.default)(2, arguments);
      var dateLeft = (0, _index.default)(dirtyDateLeft);
      var dateRight = (0, _index.default)(dirtyDateRight);
      var sign = (0, _index3.default)(dateLeft, dateRight);
      var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
      dateLeft.setFullYear(1584);
      dateRight.setFullYear(1584);
      var isLastYearNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign;
      var result = sign * (difference - Number(isLastYearNotFull));
      return result === 0 ? 0 : result;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/differenceInCalendarMonths/index.js
var require_differenceInCalendarMonths = __commonJS({
  "../../node_modules/date-fns/differenceInCalendarMonths/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInCalendarMonths;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
      (0, _index2.default)(2, arguments);
      var dateLeft = (0, _index.default)(dirtyDateLeft);
      var dateRight = (0, _index.default)(dirtyDateRight);
      var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
      var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
      return yearDiff * 12 + monthDiff;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/endOfDay/index.js
var require_endOfDay = __commonJS({
  "../../node_modules/date-fns/endOfDay/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = endOfDay;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function endOfDay(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      date.setHours(23, 59, 59, 999);
      return date;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/endOfMonth/index.js
var require_endOfMonth = __commonJS({
  "../../node_modules/date-fns/endOfMonth/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = endOfMonth;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function endOfMonth(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      var month = date.getMonth();
      date.setFullYear(date.getFullYear(), month + 1, 0);
      date.setHours(23, 59, 59, 999);
      return date;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/isLastDayOfMonth/index.js
var require_isLastDayOfMonth = __commonJS({
  "../../node_modules/date-fns/isLastDayOfMonth/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isLastDayOfMonth;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_endOfDay());
    var _index3 = _interopRequireDefault(require_endOfMonth());
    var _index4 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isLastDayOfMonth(dirtyDate) {
      (0, _index4.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      return (0, _index2.default)(date).getTime() === (0, _index3.default)(date).getTime();
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/differenceInMonths/index.js
var require_differenceInMonths = __commonJS({
  "../../node_modules/date-fns/differenceInMonths/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInMonths;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_differenceInCalendarMonths());
    var _index3 = _interopRequireDefault(require_compareAsc());
    var _index4 = _interopRequireDefault(require_requiredArgs());
    var _index5 = _interopRequireDefault(require_isLastDayOfMonth());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
      (0, _index4.default)(2, arguments);
      var dateLeft = (0, _index.default)(dirtyDateLeft);
      var dateRight = (0, _index.default)(dirtyDateRight);
      var sign = (0, _index3.default)(dateLeft, dateRight);
      var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
      var result;
      if (difference < 1) {
        result = 0;
      } else {
        if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
          dateLeft.setDate(30);
        }
        dateLeft.setMonth(dateLeft.getMonth() - sign * difference);
        var isLastMonthNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign;
        if ((0, _index5.default)((0, _index.default)(dirtyDateLeft)) && difference === 1 && (0, _index3.default)(dirtyDateLeft, dateRight) === 1) {
          isLastMonthNotFull = false;
        }
        result = sign * (difference - Number(isLastMonthNotFull));
      }
      return result === 0 ? 0 : result;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/startOfDay/index.js
var require_startOfDay = __commonJS({
  "../../node_modules/date-fns/startOfDay/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = startOfDay;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function startOfDay(dirtyDate) {
      (0, _index2.default)(1, arguments);
      var date = (0, _index.default)(dirtyDate);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/differenceInCalendarDays/index.js
var require_differenceInCalendarDays = __commonJS({
  "../../node_modules/date-fns/differenceInCalendarDays/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInCalendarDays;
    var _index = _interopRequireDefault(require_getTimezoneOffsetInMilliseconds());
    var _index2 = _interopRequireDefault(require_startOfDay());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var MILLISECONDS_IN_DAY = 864e5;
    function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
      (0, _index3.default)(2, arguments);
      var startOfDayLeft = (0, _index2.default)(dirtyDateLeft);
      var startOfDayRight = (0, _index2.default)(dirtyDateRight);
      var timestampLeft = startOfDayLeft.getTime() - (0, _index.default)(startOfDayLeft);
      var timestampRight = startOfDayRight.getTime() - (0, _index.default)(startOfDayRight);
      return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/differenceInDays/index.js
var require_differenceInDays = __commonJS({
  "../../node_modules/date-fns/differenceInDays/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInDays;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_differenceInCalendarDays());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function compareLocalAsc(dateLeft, dateRight) {
      var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();
      if (diff < 0) {
        return -1;
      } else if (diff > 0) {
        return 1;
      } else {
        return diff;
      }
    }
    function differenceInDays(dirtyDateLeft, dirtyDateRight) {
      (0, _index3.default)(2, arguments);
      var dateLeft = (0, _index.default)(dirtyDateLeft);
      var dateRight = (0, _index.default)(dirtyDateRight);
      var sign = compareLocalAsc(dateLeft, dateRight);
      var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
      dateLeft.setDate(dateLeft.getDate() - sign * difference);
      var isLastDayNotFull = Number(compareLocalAsc(dateLeft, dateRight) === -sign);
      var result = sign * (difference - isLastDayNotFull);
      return result === 0 ? 0 : result;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/constants/index.js
var require_constants = __commonJS({
  "../../node_modules/date-fns/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.secondsInMinute = exports.secondsInHour = exports.quartersInYear = exports.monthsInYear = exports.monthsInQuarter = exports.minutesInHour = exports.minTime = exports.millisecondsInSecond = exports.millisecondsInHour = exports.millisecondsInMinute = exports.maxTime = exports.daysInWeek = void 0;
    var daysInWeek = 7;
    exports.daysInWeek = daysInWeek;
    var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
    exports.maxTime = maxTime;
    var millisecondsInMinute = 6e4;
    exports.millisecondsInMinute = millisecondsInMinute;
    var millisecondsInHour = 36e5;
    exports.millisecondsInHour = millisecondsInHour;
    var millisecondsInSecond = 1e3;
    exports.millisecondsInSecond = millisecondsInSecond;
    var minTime = -maxTime;
    exports.minTime = minTime;
    var minutesInHour = 60;
    exports.minutesInHour = minutesInHour;
    var monthsInQuarter = 3;
    exports.monthsInQuarter = monthsInQuarter;
    var monthsInYear = 12;
    exports.monthsInYear = monthsInYear;
    var quartersInYear = 4;
    exports.quartersInYear = quartersInYear;
    var secondsInHour = 3600;
    exports.secondsInHour = secondsInHour;
    var secondsInMinute = 60;
    exports.secondsInMinute = secondsInMinute;
  }
});

// ../../node_modules/date-fns/differenceInMilliseconds/index.js
var require_differenceInMilliseconds = __commonJS({
  "../../node_modules/date-fns/differenceInMilliseconds/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInMilliseconds;
    var _index = _interopRequireDefault(require_toDate());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function differenceInMilliseconds(dateLeft, dateRight) {
      (0, _index2.default)(2, arguments);
      return (0, _index.default)(dateLeft).getTime() - (0, _index.default)(dateRight).getTime();
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/_lib/roundingMethods/index.js
var require_roundingMethods = __commonJS({
  "../../node_modules/date-fns/_lib/roundingMethods/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getRoundingMethod = getRoundingMethod;
    var roundingMap = {
      ceil: Math.ceil,
      round: Math.round,
      floor: Math.floor,
      trunc: function(value) {
        return value < 0 ? Math.ceil(value) : Math.floor(value);
      }
    };
    var defaultRoundingMethod = "trunc";
    function getRoundingMethod(method) {
      return method ? roundingMap[method] : roundingMap[defaultRoundingMethod];
    }
  }
});

// ../../node_modules/date-fns/differenceInHours/index.js
var require_differenceInHours = __commonJS({
  "../../node_modules/date-fns/differenceInHours/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInHours;
    var _index = require_constants();
    var _index2 = _interopRequireDefault(require_differenceInMilliseconds());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    var _index4 = require_roundingMethods();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function differenceInHours(dateLeft, dateRight, options) {
      (0, _index3.default)(2, arguments);
      var diff = (0, _index2.default)(dateLeft, dateRight) / _index.millisecondsInHour;
      return (0, _index4.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/differenceInMinutes/index.js
var require_differenceInMinutes = __commonJS({
  "../../node_modules/date-fns/differenceInMinutes/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInMinutes;
    var _index = require_constants();
    var _index2 = _interopRequireDefault(require_differenceInMilliseconds());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    var _index4 = require_roundingMethods();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function differenceInMinutes(dateLeft, dateRight, options) {
      (0, _index3.default)(2, arguments);
      var diff = (0, _index2.default)(dateLeft, dateRight) / _index.millisecondsInMinute;
      return (0, _index4.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/differenceInSeconds/index.js
var require_differenceInSeconds = __commonJS({
  "../../node_modules/date-fns/differenceInSeconds/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = differenceInSeconds;
    var _index = _interopRequireDefault(require_differenceInMilliseconds());
    var _index2 = _interopRequireDefault(require_requiredArgs());
    var _index3 = require_roundingMethods();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function differenceInSeconds(dateLeft, dateRight, options) {
      (0, _index2.default)(2, arguments);
      var diff = (0, _index.default)(dateLeft, dateRight) / 1e3;
      return (0, _index3.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/subDays/index.js
var require_subDays = __commonJS({
  "../../node_modules/date-fns/subDays/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = subDays;
    var _index = _interopRequireDefault(require_toInteger());
    var _index2 = _interopRequireDefault(require_addDays());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function subDays(dirtyDate, dirtyAmount) {
      (0, _index3.default)(2, arguments);
      var amount = (0, _index.default)(dirtyAmount);
      return (0, _index2.default)(dirtyDate, -amount);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/subMonths/index.js
var require_subMonths = __commonJS({
  "../../node_modules/date-fns/subMonths/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = subMonths;
    var _index = _interopRequireDefault(require_toInteger());
    var _index2 = _interopRequireDefault(require_addMonths());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function subMonths(dirtyDate, dirtyAmount) {
      (0, _index3.default)(2, arguments);
      var amount = (0, _index.default)(dirtyAmount);
      return (0, _index2.default)(dirtyDate, -amount);
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/sub/index.js
var require_sub = __commonJS({
  "../../node_modules/date-fns/sub/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = sub2;
    var _index = _interopRequireDefault(require_subDays());
    var _index2 = _interopRequireDefault(require_subMonths());
    var _index3 = _interopRequireDefault(require_requiredArgs());
    var _index4 = _interopRequireDefault(require_toInteger());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sub2(date, duration) {
      (0, _index3.default)(2, arguments);
      if (!duration || typeof duration !== "object")
        return new Date(NaN);
      var years = duration.years ? (0, _index4.default)(duration.years) : 0;
      var months = duration.months ? (0, _index4.default)(duration.months) : 0;
      var weeks = duration.weeks ? (0, _index4.default)(duration.weeks) : 0;
      var days = duration.days ? (0, _index4.default)(duration.days) : 0;
      var hours = duration.hours ? (0, _index4.default)(duration.hours) : 0;
      var minutes = duration.minutes ? (0, _index4.default)(duration.minutes) : 0;
      var seconds = duration.seconds ? (0, _index4.default)(duration.seconds) : 0;
      var dateWithoutMonths = (0, _index2.default)(date, months + years * 12);
      var dateWithoutDays = (0, _index.default)(dateWithoutMonths, days + weeks * 7);
      var minutestoSub = minutes + hours * 60;
      var secondstoSub = seconds + minutestoSub * 60;
      var mstoSub = secondstoSub * 1e3;
      var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
      return finalDate;
    }
    module.exports = exports.default;
  }
});

// ../../node_modules/date-fns/intervalToDuration/index.js
var require_intervalToDuration = __commonJS({
  "../../node_modules/date-fns/intervalToDuration/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = intervalToDuration2;
    var _index = _interopRequireDefault(require_compareAsc());
    var _index2 = _interopRequireDefault(require_differenceInYears());
    var _index3 = _interopRequireDefault(require_differenceInMonths());
    var _index4 = _interopRequireDefault(require_differenceInDays());
    var _index5 = _interopRequireDefault(require_differenceInHours());
    var _index6 = _interopRequireDefault(require_differenceInMinutes());
    var _index7 = _interopRequireDefault(require_differenceInSeconds());
    var _index8 = _interopRequireDefault(require_isValid());
    var _index9 = _interopRequireDefault(require_requiredArgs());
    var _index10 = _interopRequireDefault(require_toDate());
    var _index11 = _interopRequireDefault(require_sub());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function intervalToDuration2(_ref) {
      var start = _ref.start, end = _ref.end;
      (0, _index9.default)(1, arguments);
      var dateLeft = (0, _index10.default)(start);
      var dateRight = (0, _index10.default)(end);
      if (!(0, _index8.default)(dateLeft)) {
        throw new RangeError("Start Date is invalid");
      }
      if (!(0, _index8.default)(dateRight)) {
        throw new RangeError("End Date is invalid");
      }
      var duration = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      var sign = (0, _index.default)(dateLeft, dateRight);
      duration.years = Math.abs((0, _index2.default)(dateLeft, dateRight));
      var remainingMonths = (0, _index11.default)(dateLeft, {
        years: sign * duration.years
      });
      duration.months = Math.abs((0, _index3.default)(remainingMonths, dateRight));
      var remainingDays = (0, _index11.default)(remainingMonths, {
        months: sign * duration.months
      });
      duration.days = Math.abs((0, _index4.default)(remainingDays, dateRight));
      var remainingHours = (0, _index11.default)(remainingDays, {
        days: sign * duration.days
      });
      duration.hours = Math.abs((0, _index5.default)(remainingHours, dateRight));
      var remainingMinutes = (0, _index11.default)(remainingHours, {
        hours: sign * duration.hours
      });
      duration.minutes = Math.abs((0, _index6.default)(remainingMinutes, dateRight));
      var remainingSeconds = (0, _index11.default)(remainingMinutes, {
        minutes: sign * duration.minutes
      });
      duration.seconds = Math.abs((0, _index7.default)(remainingSeconds, dateRight));
      return duration;
    }
    module.exports = exports.default;
  }
});

// src/third-party/collection.tsx
import * as React53 from "react";
import {
  getBlockCollectionId,
  getBlockParentPage as getBlockParentPage2,
  getTextContent as getTextContent4
} from "notion-utils";
import { useLocalStorage, useWindowSize } from "react-use";

// src/components/page-icon.tsx
import * as React20 from "react";
import { getBlockIcon, getBlockTitle as getBlockTitle3 } from "notion-utils";

// src/context.tsx
import * as React18 from "react";

// src/components/asset-wrapper.tsx
import * as React14 from "react";
import { parsePageId as parsePageId2 } from "notion-utils";

// src/utils.ts
import { isUrl, formatDate, formatNotionDateTime } from "notion-utils";

// src/map-image-url.ts
var defaultMapImageUrl = (url, block) => {
  if (!url) {
    return null;
  }
  if (url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("https://images.unsplash.com")) {
    return url;
  }
  try {
    const u = new URL(url);
    if (u.pathname.startsWith("/secure.notion-static.com") && u.hostname.endsWith(".amazonaws.com")) {
      if (u.searchParams.has("X-Amz-Credential") && u.searchParams.has("X-Amz-Signature") && u.searchParams.has("X-Amz-Algorithm")) {
        return url;
      }
    }
  } catch (e) {
  }
  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`;
  }
  url = `https://www.notion.so${url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`}`;
  const notionImageUrlV2 = new URL(url);
  let table = block.parent_table === "space" ? "block" : block.parent_table;
  if (table === "collection" || table === "team") {
    table = "block";
  }
  notionImageUrlV2.searchParams.set("table", table);
  notionImageUrlV2.searchParams.set("id", block.id);
  notionImageUrlV2.searchParams.set("cache", "v2");
  url = notionImageUrlV2.toString();
  return url;
};

// src/map-page-url.ts
var defaultMapPageUrl = (rootPageId) => (pageId) => {
  pageId = (pageId || "").replace(/-/g, "");
  if (rootPageId && pageId === rootPageId) {
    return "/";
  } else {
    return `/${pageId}`;
  }
};

// src/utils.ts
var cs = (...classes) => classes.filter((a) => !!a).join(" ");
var getHashFragmentValue = (url) => {
  return url.includes("#") ? url.replace(/^.+(#.+)$/, "$1") : "";
};
var isBrowser = typeof window !== "undefined";
var youtubeDomains = /* @__PURE__ */ new Set([
  "youtu.be",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com"
]);
var getYoutubeId = (url) => {
  try {
    const { hostname } = new URL(url);
    if (!youtubeDomains.has(hostname)) {
      return null;
    }
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  } catch (e) {
  }
  return null;
};

// src/components/eoi.tsx
import * as React2 from "react";

// src/icons/type-github.tsx
import * as React from "react";
function SvgTypeGitHub(props) {
  return /* @__PURE__ */ React.createElement("svg", __spreadValues({
    viewBox: "0 0 260 260"
  }, props), /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("path", {
    d: "M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z",
    fill: "#161614"
  })));
}
var type_github_default = SvgTypeGitHub;

// src/components/eoi.tsx
var EOI = ({ block, inline, className }) => {
  var _a, _b, _c;
  const { components } = useNotionContext();
  const { original_url, attributes, domain } = (block == null ? void 0 : block.format) || {};
  if (!original_url || !attributes) {
    return null;
  }
  const title = (_a = attributes.find((attr) => attr.id === "title")) == null ? void 0 : _a.values[0];
  let owner = (_b = attributes.find((attr) => attr.id === "owner")) == null ? void 0 : _b.values[0];
  const lastUpdatedAt = (_c = attributes.find((attr) => attr.id === "updated_at")) == null ? void 0 : _c.values[0];
  const lastUpdated = lastUpdatedAt ? formatNotionDateTime(lastUpdatedAt) : null;
  let externalImage;
  switch (domain) {
    case "github.com":
      externalImage = /* @__PURE__ */ React2.createElement(type_github_default, null);
      if (owner) {
        const parts = owner.split("/");
        owner = parts[parts.length - 1];
      }
      break;
    default:
      if (true) {
        console.log(
          `Unsupported external_object_instance domain "${domain}"`,
          JSON.stringify(block, null, 2)
        );
      }
      return null;
  }
  return /* @__PURE__ */ React2.createElement(components.Link, {
    target: "_blank",
    rel: "noopener noreferrer",
    href: original_url,
    className: cs(
      "notion-external",
      inline ? "notion-external-mention" : "notion-external-block notion-row",
      className
    )
  }, externalImage && /* @__PURE__ */ React2.createElement("div", {
    className: "notion-external-image"
  }, externalImage), /* @__PURE__ */ React2.createElement("div", {
    className: "notion-external-description"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "notion-external-title"
  }, title), (owner || lastUpdated) && /* @__PURE__ */ React2.createElement("div", {
    className: "notion-external-subtitle"
  }, owner && /* @__PURE__ */ React2.createElement("span", null, owner), owner && lastUpdated && /* @__PURE__ */ React2.createElement("span", null, " \u2022 "), lastUpdated && /* @__PURE__ */ React2.createElement("span", null, "Updated ", lastUpdated))));
};

// src/components/text.tsx
import * as React5 from "react";
import { parsePageId } from "notion-utils";

// src/components/graceful-image.tsx
import * as React3 from "react";
import { Img } from "react-image";
var GracefulImage = (props) => {
  if (isBrowser) {
    return /* @__PURE__ */ React3.createElement(Img, __spreadValues({}, props));
  } else {
    return /* @__PURE__ */ React3.createElement("img", __spreadValues({}, props));
  }
};

// src/components/page-title.tsx
import * as React4 from "react";
import { getBlockTitle } from "notion-utils";
var PageTitleImpl = (_a) => {
  var _b = _a, { block, className, defaultIcon } = _b, rest = __objRest(_b, ["block", "className", "defaultIcon"]);
  var _a2, _b2;
  const { recordMap } = useNotionContext();
  if (!block)
    return null;
  if (block.type === "collection_view_page" || block.type === "collection_view") {
    const title = getBlockTitle(block, recordMap);
    if (!title) {
      return null;
    }
    const titleDecoration = [[title]];
    return /* @__PURE__ */ React4.createElement("span", __spreadValues({
      className: cs("notion-page-title", className)
    }, rest), /* @__PURE__ */ React4.createElement(PageIcon, {
      block,
      defaultIcon,
      className: "notion-page-title-icon"
    }), /* @__PURE__ */ React4.createElement("span", {
      className: "notion-page-title-text"
    }, /* @__PURE__ */ React4.createElement(Text, {
      value: titleDecoration,
      block
    })));
  }
  if (!((_a2 = block.properties) == null ? void 0 : _a2.title)) {
    return null;
  }
  return /* @__PURE__ */ React4.createElement("span", __spreadValues({
    className: cs("notion-page-title", className)
  }, rest), /* @__PURE__ */ React4.createElement(PageIcon, {
    block,
    defaultIcon,
    className: "notion-page-title-icon"
  }), /* @__PURE__ */ React4.createElement("span", {
    className: "notion-page-title-text"
  }, /* @__PURE__ */ React4.createElement(Text, {
    value: (_b2 = block.properties) == null ? void 0 : _b2.title,
    block
  })));
};
var PageTitle = React4.memo(PageTitleImpl);

// src/components/text.tsx
var Text = ({ value, block, linkProps, linkProtocol }) => {
  const { components, recordMap, mapPageUrl, mapImageUrl, rootDomain } = useNotionContext();
  return /* @__PURE__ */ React5.createElement(React5.Fragment, null, value == null ? void 0 : value.map(([text, decorations], index) => {
    if (!decorations) {
      if (text === ",") {
        return /* @__PURE__ */ React5.createElement("span", {
          key: index,
          style: { padding: "0.5em" }
        });
      } else {
        return /* @__PURE__ */ React5.createElement(React5.Fragment, {
          key: index
        }, text);
      }
    }
    const formatted = decorations.reduce(
      (element, decorator) => {
        var _a, _b, _c, _d, _e;
        switch (decorator[0]) {
          case "p": {
            const blockId = decorator[1];
            const linkedBlock = (_a = recordMap.block[blockId]) == null ? void 0 : _a.value;
            if (!linkedBlock) {
              console.log('"p" missing block', blockId);
              return null;
            }
            return /* @__PURE__ */ React5.createElement(components.PageLink, {
              className: "notion-link",
              href: mapPageUrl(blockId)
            }, /* @__PURE__ */ React5.createElement(PageTitle, {
              block: linkedBlock
            }));
          }
          case "\u2023": {
            const linkType = decorator[1][0];
            const id = decorator[1][1];
            switch (linkType) {
              case "u": {
                const user = (_b = recordMap.notion_user[id]) == null ? void 0 : _b.value;
                if (!user) {
                  console.log('"\u2023" missing user', id);
                  return null;
                }
                const name = [user.given_name, user.family_name].filter(Boolean).join(" ");
                return /* @__PURE__ */ React5.createElement(GracefulImage, {
                  className: "notion-user",
                  src: mapImageUrl(user.profile_photo, block),
                  alt: name
                });
              }
              default: {
                const linkedBlock = (_c = recordMap.block[id]) == null ? void 0 : _c.value;
                if (!linkedBlock) {
                  console.log('"\u2023" missing block', linkType, id);
                  return null;
                }
                return /* @__PURE__ */ React5.createElement(components.PageLink, __spreadProps(__spreadValues({
                  className: "notion-link",
                  href: mapPageUrl(id)
                }, linkProps), {
                  target: "_blank",
                  rel: "noopener noreferrer"
                }), /* @__PURE__ */ React5.createElement(PageTitle, {
                  block: linkedBlock
                }));
              }
            }
          }
          case "h":
            return /* @__PURE__ */ React5.createElement("span", {
              className: `notion-${decorator[1]}`
            }, element);
          case "c":
            return /* @__PURE__ */ React5.createElement("code", {
              className: "notion-inline-code"
            }, element);
          case "b":
            return /* @__PURE__ */ React5.createElement("b", null, element);
          case "i":
            return /* @__PURE__ */ React5.createElement("em", null, element);
          case "s":
            return /* @__PURE__ */ React5.createElement("s", null, element);
          case "_":
            return /* @__PURE__ */ React5.createElement("span", {
              className: "notion-inline-underscore"
            }, element);
          case "e":
            return /* @__PURE__ */ React5.createElement(components.Equation, {
              math: decorator[1],
              inline: true
            });
          case "m":
            return element;
          case "a": {
            const v = decorator[1];
            const pathname = v.substr(1);
            const id = parsePageId(pathname, { uuid: true });
            if ((v[0] === "/" || v.includes(rootDomain)) && id) {
              const href = v.includes(rootDomain) ? v : `${mapPageUrl(id)}${getHashFragmentValue(v)}`;
              return /* @__PURE__ */ React5.createElement(components.PageLink, __spreadValues({
                className: "notion-link",
                href
              }, linkProps), element);
            } else {
              return /* @__PURE__ */ React5.createElement(components.Link, __spreadValues({
                className: "notion-link",
                href: linkProtocol ? `${linkProtocol}:${decorator[1]}` : decorator[1]
              }, linkProps), element);
            }
          }
          case "d": {
            const v = decorator[1];
            const type = v == null ? void 0 : v.type;
            if (type === "date") {
              const startDate = v.start_date;
              return formatDate(startDate);
            } else if (type === "daterange") {
              const startDate = v.start_date;
              const endDate = v.end_date;
              return `${formatDate(startDate)} \u2192 ${formatDate(endDate)}`;
            } else {
              return element;
            }
          }
          case "u": {
            const userId = decorator[1];
            const user = (_d = recordMap.notion_user[userId]) == null ? void 0 : _d.value;
            if (!user) {
              console.log("missing user", userId);
              return null;
            }
            const name = [user.given_name, user.family_name].filter(Boolean).join(" ");
            return /* @__PURE__ */ React5.createElement(GracefulImage, {
              className: "notion-user",
              src: mapImageUrl(user.profile_photo, block),
              alt: name
            });
          }
          case "eoi": {
            const blockId = decorator[1];
            const externalObjectInstance = (_e = recordMap.block[blockId]) == null ? void 0 : _e.value;
            return /* @__PURE__ */ React5.createElement(EOI, {
              block: externalObjectInstance,
              inline: true
            });
          }
          default:
            if (true) {
              console.log("unsupported text format", decorator);
            }
            return element;
        }
      },
      /* @__PURE__ */ React5.createElement(React5.Fragment, null, text)
    );
    return /* @__PURE__ */ React5.createElement(React5.Fragment, {
      key: index
    }, formatted);
  }));
};

// src/components/lazy-image.tsx
import * as React6 from "react";
import { normalizeUrl } from "notion-utils";
import { ImageState, LazyImageFull } from "react-lazy-images";
var LazyImage = (_a) => {
  var _b = _a, {
    src,
    alt,
    className,
    style,
    zoomable = false,
    priority = false,
    height
  } = _b, rest = __objRest(_b, [
    "src",
    "alt",
    "className",
    "style",
    "zoomable",
    "priority",
    "height"
  ]);
  var _a2, _b2, _c;
  const { recordMap, zoom, previewImages, forceCustomImages, components } = useNotionContext();
  const zoomRef = React6.useRef(zoom ? zoom.clone() : null);
  const previewImage = previewImages ? (_c = (_a2 = recordMap == null ? void 0 : recordMap.preview_images) == null ? void 0 : _a2[src]) != null ? _c : (_b2 = recordMap == null ? void 0 : recordMap.preview_images) == null ? void 0 : _b2[normalizeUrl(src)] : null;
  const onLoad = React6.useCallback(
    (e) => {
      if (zoomable && (e.target.src || e.target.srcset)) {
        if (zoomRef.current) {
          ;
          zoomRef.current.attach(e.target);
        }
      }
    },
    [zoomRef, zoomable]
  );
  const attachZoom = React6.useCallback(
    (image) => {
      if (zoomRef.current && image) {
        ;
        zoomRef.current.attach(image);
      }
    },
    [zoomRef]
  );
  const attachZoomRef = React6.useMemo(
    () => zoomable ? attachZoom : void 0,
    [zoomable, attachZoom]
  );
  if (previewImage) {
    const aspectRatio = previewImage.originalHeight / previewImage.originalWidth;
    if (components.Image) {
      return /* @__PURE__ */ React6.createElement(components.Image, {
        src,
        alt,
        style,
        className,
        width: previewImage.originalWidth,
        height: previewImage.originalHeight,
        blurDataURL: previewImage.dataURIBase64,
        placeholder: "blur",
        priority,
        onLoad
      });
    }
    return /* @__PURE__ */ React6.createElement(LazyImageFull, __spreadProps(__spreadValues({
      src
    }, rest), {
      experimentalDecode: true
    }), ({ imageState, ref }) => {
      const isLoaded = imageState === ImageState.LoadSuccess;
      const wrapperStyle = {
        width: "100%"
      };
      const imgStyle = {};
      if (height) {
        wrapperStyle.height = height;
      } else {
        imgStyle.position = "absolute";
        wrapperStyle.paddingBottom = `${aspectRatio * 100}%`;
      }
      return /* @__PURE__ */ React6.createElement("div", {
        className: cs(
          "lazy-image-wrapper",
          isLoaded && "lazy-image-loaded",
          className
        ),
        style: wrapperStyle
      }, /* @__PURE__ */ React6.createElement("img", {
        className: "lazy-image-preview",
        src: previewImage.dataURIBase64,
        alt,
        ref,
        style,
        decoding: "async"
      }), /* @__PURE__ */ React6.createElement("img", {
        className: "lazy-image-real",
        src,
        alt,
        ref: attachZoomRef,
        style: __spreadValues(__spreadValues({}, style), imgStyle),
        width: previewImage.originalWidth,
        height: previewImage.originalHeight,
        decoding: "async",
        loading: "lazy"
      }));
    });
  } else {
    if (components.Image && forceCustomImages) {
      return /* @__PURE__ */ React6.createElement(components.Image, {
        src,
        alt,
        className,
        style,
        width: null,
        height: height || null,
        priority,
        onLoad
      });
    }
    return /* @__PURE__ */ React6.createElement("img", __spreadValues({
      className,
      style,
      src,
      alt,
      ref: attachZoomRef,
      loading: "lazy",
      decoding: "async"
    }, rest));
  }
};

// src/components/header.tsx
import * as React11 from "react";
import { getPageBreadcrumbs } from "notion-utils";
import { useHotkeys } from "react-hotkeys-hook";

// src/icons/search-icon.tsx
import * as React7 from "react";
var SearchIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React7.createElement("svg", __spreadValues({
    className: cs("notion-icon", className),
    viewBox: "0 0 17 17"
  }, rest), /* @__PURE__ */ React7.createElement("path", {
    d: "M6.78027 13.6729C8.24805 13.6729 9.60156 13.1982 10.709 12.4072L14.875 16.5732C15.0684 16.7666 15.3232 16.8633 15.5957 16.8633C16.167 16.8633 16.5713 16.4238 16.5713 15.8613C16.5713 15.5977 16.4834 15.3516 16.29 15.1582L12.1504 11.0098C13.0205 9.86719 13.5391 8.45215 13.5391 6.91406C13.5391 3.19629 10.498 0.155273 6.78027 0.155273C3.0625 0.155273 0.0214844 3.19629 0.0214844 6.91406C0.0214844 10.6318 3.0625 13.6729 6.78027 13.6729ZM6.78027 12.2139C3.87988 12.2139 1.48047 9.81445 1.48047 6.91406C1.48047 4.01367 3.87988 1.61426 6.78027 1.61426C9.68066 1.61426 12.0801 4.01367 12.0801 6.91406C12.0801 9.81445 9.68066 12.2139 6.78027 12.2139Z"
  }));
};

// src/components/search-dialog.tsx
var import_lodash = __toESM(require_lodash(), 1);
import * as React10 from "react";
import { getBlockParentPage, getBlockTitle as getBlockTitle2 } from "notion-utils";

// src/icons/clear-icon.tsx
import * as React8 from "react";
var ClearIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React8.createElement("svg", __spreadProps(__spreadValues({
    className: cs("notion-icon", className)
  }, rest), {
    viewBox: "0 0 30 30"
  }), /* @__PURE__ */ React8.createElement("path", {
    d: "M15,0C6.716,0,0,6.716,0,15s6.716,15,15,15s15-6.716,15-15S23.284,0,15,0z M22,20.6L20.6,22L15,16.4L9.4,22L8,20.6l5.6-5.6 L8,9.4L9.4,8l5.6,5.6L20.6,8L22,9.4L16.4,15L22,20.6z"
  }));
};

// src/icons/loading-icon.tsx
import * as React9 from "react";
var LoadingIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React9.createElement("svg", __spreadProps(__spreadValues({
    className: cs("notion-icon", className)
  }, rest), {
    viewBox: "0 0 24 24"
  }), /* @__PURE__ */ React9.createElement("defs", null, /* @__PURE__ */ React9.createElement("linearGradient", {
    x1: "28.1542969%",
    y1: "63.7402344%",
    x2: "74.6289062%",
    y2: "17.7832031%",
    id: "linearGradient-1"
  }, /* @__PURE__ */ React9.createElement("stop", {
    stopColor: "rgba(164, 164, 164, 1)",
    offset: "0%"
  }), /* @__PURE__ */ React9.createElement("stop", {
    stopColor: "rgba(164, 164, 164, 0)",
    stopOpacity: "0",
    offset: "100%"
  }))), /* @__PURE__ */ React9.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: "1",
    fill: "none"
  }, /* @__PURE__ */ React9.createElement("g", {
    transform: "translate(-236.000000, -286.000000)"
  }, /* @__PURE__ */ React9.createElement("g", {
    transform: "translate(238.000000, 286.000000)"
  }, /* @__PURE__ */ React9.createElement("circle", {
    id: "Oval-2",
    stroke: "url(#linearGradient-1)",
    strokeWidth: "4",
    cx: "10",
    cy: "12",
    r: "10"
  }), /* @__PURE__ */ React9.createElement("path", {
    d: "M10,2 C4.4771525,2 0,6.4771525 0,12",
    id: "Oval-2",
    stroke: "rgba(164, 164, 164, 1)",
    strokeWidth: "4"
  }), /* @__PURE__ */ React9.createElement("rect", {
    id: "Rectangle-1",
    fill: "rgba(164, 164, 164, 1)",
    x: "8",
    y: "0",
    width: "4",
    height: "4",
    rx: "8"
  })))));
};

// src/components/search-dialog.tsx
var SearchDialog = class extends React10.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: "",
      searchResult: null,
      searchError: null
    };
    this._onAfterOpen = () => {
      if (this._inputRef.current) {
        this._inputRef.current.focus();
      }
    };
    this._onChangeQuery = (e) => {
      const query = e.target.value;
      this.setState({ query });
      if (!query.trim()) {
        this.setState({ isLoading: false, searchResult: null, searchError: null });
        return;
      } else {
        this._search();
      }
    };
    this._onClearQuery = () => {
      this._onChangeQuery({ target: { value: "" } });
    };
    this._warmupSearch = () => __async(this, null, function* () {
      const { searchNotion, rootBlockId } = this.props;
      yield searchNotion({
        query: "",
        ancestorId: rootBlockId
      });
    });
    this._searchImpl = () => __async(this, null, function* () {
      const { searchNotion, rootBlockId } = this.props;
      const { query } = this.state;
      if (!query.trim()) {
        this.setState({ isLoading: false, searchResult: null, searchError: null });
        return;
      }
      this.setState({ isLoading: true });
      const result = yield searchNotion({
        query,
        ancestorId: rootBlockId
      });
      console.log("search", query, result);
      let searchResult = null;
      let searchError = null;
      if (result.error || result.errorId) {
        searchError = result;
      } else {
        searchResult = __spreadValues({}, result);
        const results = searchResult.results.map((result2) => {
          var _a, _b;
          const block = (_a = searchResult.recordMap.block[result2.id]) == null ? void 0 : _a.value;
          if (!block)
            return;
          const title = getBlockTitle2(block, searchResult.recordMap);
          if (!title) {
            return;
          }
          result2.title = title;
          result2.block = block;
          result2.recordMap = searchResult.recordMap;
          result2.page = getBlockParentPage(block, searchResult.recordMap, {
            inclusive: true
          }) || block;
          if (!result2.page.id) {
            return;
          }
          if ((_b = result2.highlight) == null ? void 0 : _b.text) {
            result2.highlight.html = result2.highlight.text.replace(/<gzkNfoUU>/gi, "<b>").replace(/<\/gzkNfoUU>/gi, "</b>");
          }
          return result2;
        }).filter(Boolean);
        const searchResultsMap = results.reduce(
          (map, result2) => __spreadProps(__spreadValues({}, map), {
            [result2.page.id]: result2
          }),
          {}
        );
        searchResult.results = Object.values(searchResultsMap);
      }
      if (this.state.query === query) {
        this.setState({ isLoading: false, searchResult, searchError });
      }
    });
    this._inputRef = React10.createRef();
  }
  componentDidMount() {
    this._search = (0, import_lodash.default)(this._searchImpl.bind(this), 1e3);
    this._warmupSearch();
  }
  render() {
    const { isOpen, onClose } = this.props;
    const { isLoading, query, searchResult, searchError } = this.state;
    const hasQuery = !!query.trim();
    return /* @__PURE__ */ React10.createElement(NotionContextConsumer, null, (ctx2) => {
      const { components, defaultPageIcon, mapPageUrl } = ctx2;
      return /* @__PURE__ */ React10.createElement(components.Modal, {
        isOpen,
        contentLabel: "Search",
        className: "notion-search",
        overlayClassName: "notion-search-overlay",
        onRequestClose: onClose,
        onAfterOpen: this._onAfterOpen
      }, /* @__PURE__ */ React10.createElement("div", {
        className: "quickFindMenu"
      }, /* @__PURE__ */ React10.createElement("div", {
        className: "searchBar"
      }, /* @__PURE__ */ React10.createElement("div", {
        className: "inlineIcon"
      }, isLoading ? /* @__PURE__ */ React10.createElement(LoadingIcon, {
        className: "loadingIcon"
      }) : /* @__PURE__ */ React10.createElement(SearchIcon, null)), /* @__PURE__ */ React10.createElement("input", {
        className: "searchInput",
        placeholder: "Search",
        value: query,
        ref: this._inputRef,
        onChange: this._onChangeQuery
      }), query && /* @__PURE__ */ React10.createElement("div", {
        role: "button",
        className: "clearButton",
        onClick: this._onClearQuery
      }, /* @__PURE__ */ React10.createElement(ClearIcon, {
        className: "clearIcon"
      }))), hasQuery && searchResult && /* @__PURE__ */ React10.createElement(React10.Fragment, null, searchResult.results.length ? /* @__PURE__ */ React10.createElement(NotionContextProvider, __spreadProps(__spreadValues({}, ctx2), {
        recordMap: searchResult.recordMap
      }), /* @__PURE__ */ React10.createElement("div", {
        className: "resultsPane"
      }, searchResult.results.map((result) => {
        var _a;
        return /* @__PURE__ */ React10.createElement(components.PageLink, {
          key: result.id,
          className: cs("result", "notion-page-link"),
          href: mapPageUrl(
            result.page.id,
            searchResult.recordMap
          )
        }, /* @__PURE__ */ React10.createElement(PageTitle, {
          block: result.page,
          defaultIcon: defaultPageIcon
        }), ((_a = result.highlight) == null ? void 0 : _a.html) && /* @__PURE__ */ React10.createElement("div", {
          className: "notion-search-result-highlight",
          dangerouslySetInnerHTML: {
            __html: result.highlight.html
          }
        }));
      })), /* @__PURE__ */ React10.createElement("footer", {
        className: "resultsFooter"
      }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("span", {
        className: "resultsCount"
      }, searchResult.total), searchResult.total === 1 ? " result" : " results"))) : /* @__PURE__ */ React10.createElement("div", {
        className: "noResultsPane"
      }, /* @__PURE__ */ React10.createElement("div", {
        className: "noResults"
      }, "No results"), /* @__PURE__ */ React10.createElement("div", {
        className: "noResultsDetail"
      }, "Try different search terms"))), hasQuery && !searchResult && searchError && /* @__PURE__ */ React10.createElement("div", {
        className: "noResultsPane"
      }, /* @__PURE__ */ React10.createElement("div", {
        className: "noResults"
      }, "Search error"))));
    });
  }
};

// src/components/header.tsx
var Header = ({ block }) => {
  return /* @__PURE__ */ React11.createElement("header", {
    className: "notion-header"
  }, /* @__PURE__ */ React11.createElement("div", {
    className: "notion-nav-header"
  }, /* @__PURE__ */ React11.createElement(Breadcrumbs, {
    block
  }), /* @__PURE__ */ React11.createElement(Search, {
    block
  })));
};
var Breadcrumbs = ({ block, rootOnly = false }) => {
  const { recordMap, mapPageUrl, components } = useNotionContext();
  const breadcrumbs = React11.useMemo(() => {
    const breadcrumbs2 = getPageBreadcrumbs(recordMap, block.id);
    if (rootOnly) {
      return [breadcrumbs2[0]].filter(Boolean);
    }
    return breadcrumbs2;
  }, [recordMap, block.id, rootOnly]);
  return /* @__PURE__ */ React11.createElement("div", {
    className: "breadcrumbs",
    key: "breadcrumbs"
  }, breadcrumbs.map((breadcrumb, index) => {
    if (!breadcrumb) {
      return null;
    }
    const pageLinkProps = {};
    const componentMap = {
      pageLink: components.PageLink
    };
    if (breadcrumb.active) {
      componentMap.pageLink = (props) => /* @__PURE__ */ React11.createElement("div", __spreadValues({}, props));
    } else {
      pageLinkProps.href = mapPageUrl(breadcrumb.pageId);
    }
    return /* @__PURE__ */ React11.createElement(React11.Fragment, {
      key: breadcrumb.pageId
    }, /* @__PURE__ */ React11.createElement(componentMap.pageLink, __spreadValues({
      className: cs("breadcrumb", breadcrumb.active && "active")
    }, pageLinkProps), breadcrumb.icon && /* @__PURE__ */ React11.createElement(PageIcon, {
      className: "icon",
      block: breadcrumb.block
    }), breadcrumb.title && /* @__PURE__ */ React11.createElement("span", {
      className: "title"
    }, breadcrumb.title)), index < breadcrumbs.length - 1 && /* @__PURE__ */ React11.createElement("span", {
      className: "spacer"
    }, "/"));
  }));
};
var Search = ({ block, search, title = "Search" }) => {
  const { searchNotion, rootPageId, isShowingSearch, onHideSearch } = useNotionContext();
  const onSearchNotion = search || searchNotion;
  const [isSearchOpen, setIsSearchOpen] = React11.useState(isShowingSearch);
  React11.useEffect(() => {
    setIsSearchOpen(isShowingSearch);
  }, [isShowingSearch]);
  const onOpenSearch = React11.useCallback(() => {
    setIsSearchOpen(true);
  }, []);
  const onCloseSearch = React11.useCallback(() => {
    setIsSearchOpen(false);
    if (onHideSearch) {
      onHideSearch();
    }
  }, [onHideSearch]);
  useHotkeys("cmd+p", (event) => {
    onOpenSearch();
    event.preventDefault();
    event.stopPropagation();
  });
  useHotkeys("cmd+k", (event) => {
    onOpenSearch();
    event.preventDefault();
    event.stopPropagation();
  });
  const hasSearch = !!onSearchNotion;
  return /* @__PURE__ */ React11.createElement(React11.Fragment, null, hasSearch && /* @__PURE__ */ React11.createElement("div", {
    role: "button",
    className: cs("breadcrumb", "button", "notion-search-button"),
    onClick: onOpenSearch
  }, /* @__PURE__ */ React11.createElement(SearchIcon, {
    className: "searchIcon"
  }), title && /* @__PURE__ */ React11.createElement("span", {
    className: "title"
  }, title)), isSearchOpen && hasSearch && /* @__PURE__ */ React11.createElement(SearchDialog, {
    isOpen: isSearchOpen,
    rootBlockId: rootPageId || (block == null ? void 0 : block.id),
    onClose: onCloseSearch,
    searchNotion: onSearchNotion
  }));
};

// src/components/asset.tsx
import * as React13 from "react";
import { getTextContent } from "notion-utils";

// src/components/lite-youtube-embed.tsx
import * as React12 from "react";
var qs = (params) => {
  return Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  ).join("&");
};
var LiteYouTubeEmbed = ({
  id,
  defaultPlay = false,
  mute = false,
  lazyImage = false,
  iframeTitle = "YouTube video",
  alt = "Video preview",
  params = {},
  adLinksPreconnect = true,
  style,
  className
}) => {
  const muteParam = mute || defaultPlay ? "1" : "0";
  const queryString = React12.useMemo(
    () => qs(__spreadValues({ autoplay: "1", mute: muteParam }, params)),
    [muteParam, params]
  );
  const resolution = "hqdefault";
  const posterUrl = `https://i.ytimg.com/vi/${id}/${resolution}.jpg`;
  const ytUrl = "https://www.youtube-nocookie.com";
  const iframeSrc = `${ytUrl}/embed/${id}?${queryString}`;
  const [isPreconnected, setIsPreconnected] = React12.useState(false);
  const [iframeInitialized, setIframeInitialized] = React12.useState(defaultPlay);
  const [isIframeLoaded, setIsIframeLoaded] = React12.useState(false);
  const warmConnections = React12.useCallback(() => {
    if (isPreconnected)
      return;
    setIsPreconnected(true);
  }, [isPreconnected]);
  const onLoadIframe = React12.useCallback(() => {
    if (iframeInitialized)
      return;
    setIframeInitialized(true);
  }, [iframeInitialized]);
  const onIframeLoaded = React12.useCallback(() => {
    setIsIframeLoaded(true);
  }, []);
  return /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement("link", {
    rel: "preload",
    href: posterUrl,
    as: "image"
  }), isPreconnected && /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement("link", {
    rel: "preconnect",
    href: ytUrl
  }), /* @__PURE__ */ React12.createElement("link", {
    rel: "preconnect",
    href: "https://www.google.com"
  })), isPreconnected && adLinksPreconnect && /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement("link", {
    rel: "preconnect",
    href: "https://static.doubleclick.net"
  }), /* @__PURE__ */ React12.createElement("link", {
    rel: "preconnect",
    href: "https://googleads.g.doubleclick.net"
  })), /* @__PURE__ */ React12.createElement("div", {
    onClick: onLoadIframe,
    onPointerOver: warmConnections,
    className: cs(
      "notion-yt-lite",
      isIframeLoaded && "notion-yt-loaded",
      iframeInitialized && "notion-yt-initialized",
      className
    ),
    style
  }, /* @__PURE__ */ React12.createElement("img", {
    src: posterUrl,
    className: "notion-yt-thumbnail",
    loading: lazyImage ? "lazy" : void 0,
    alt
  }), /* @__PURE__ */ React12.createElement("div", {
    className: "notion-yt-playbtn"
  }), iframeInitialized && /* @__PURE__ */ React12.createElement("iframe", {
    width: "560",
    height: "315",
    frameBorder: "0",
    allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true,
    title: iframeTitle,
    src: iframeSrc,
    onLoad: onIframeLoaded
  })));
};

// src/components/asset.tsx
var isServer = typeof window === "undefined";
var supportedAssetTypes = [
  "video",
  "image",
  "embed",
  "figma",
  "typeform",
  "excalidraw",
  "maps",
  "tweet",
  "pdf",
  "gist",
  "codepen",
  "drive"
];
var Asset = ({ block, zoomable = true, children }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const { recordMap, mapImageUrl, components } = useNotionContext();
  if (!block || !supportedAssetTypes.includes(block.type)) {
    return null;
  }
  const style = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    maxWidth: "100%",
    flexDirection: "column"
  };
  const assetStyle = {};
  if (block.format) {
    const {
      block_aspect_ratio,
      block_height,
      block_width,
      block_full_width,
      block_page_width,
      block_preserve_scale
    } = block.format;
    if (block_full_width || block_page_width) {
      if (block_full_width) {
        style.width = "100vw";
      } else {
        style.width = "100%";
      }
      if (block.type === "video") {
        if (block_height) {
          style.height = block_height;
        } else if (block_aspect_ratio) {
          style.paddingBottom = `${block_aspect_ratio * 100}%`;
        } else if (block_preserve_scale) {
          style.objectFit = "contain";
        }
      } else if (block_aspect_ratio && block.type !== "image") {
        style.paddingBottom = `${block_aspect_ratio * 100}%`;
      } else if (block_height) {
        style.height = block_height;
      } else if (block_preserve_scale) {
        if (block.type === "image") {
          style.height = "100%";
        } else {
          style.paddingBottom = "75%";
          style.minHeight = 100;
        }
      }
    } else {
      switch ((_a = block.format) == null ? void 0 : _a.block_alignment) {
        case "center": {
          style.alignSelf = "center";
          break;
        }
        case "left": {
          style.alignSelf = "start";
          break;
        }
        case "right": {
          style.alignSelf = "end";
          break;
        }
      }
      if (block_width) {
        style.width = block_width;
      }
      if (block_preserve_scale && block.type !== "image") {
        style.paddingBottom = "50%";
        style.minHeight = 100;
      } else {
        if (block_height && block.type !== "image") {
          style.height = block_height;
        }
      }
    }
    if (block.type === "image") {
      assetStyle.objectFit = "cover";
    } else if (block_preserve_scale) {
      assetStyle.objectFit = "contain";
    }
  }
  let source = ((_b = recordMap.signed_urls) == null ? void 0 : _b[block.id]) || ((_e = (_d = (_c = block.properties) == null ? void 0 : _c.source) == null ? void 0 : _d[0]) == null ? void 0 : _e[0]);
  if (block.space_id) {
    source = source.concat("&spaceId=", block.space_id);
  }
  let content = null;
  if (!source) {
    return null;
  }
  if (block.type === "tweet") {
    const src = source;
    if (!src)
      return null;
    const id = src.split("?")[0].split("/").pop();
    if (!id)
      return null;
    content = /* @__PURE__ */ React13.createElement("div", {
      style: __spreadProps(__spreadValues({}, assetStyle), {
        maxWidth: 420,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto"
      })
    }, /* @__PURE__ */ React13.createElement(components.Tweet, {
      id
    }));
  } else if (block.type === "pdf") {
    style.overflow = "auto";
    style.background = "rgb(226, 226, 226)";
    style.display = "block";
    if (!style.padding) {
      style.padding = "8px 16px";
    }
    if (!isServer) {
      content = /* @__PURE__ */ React13.createElement(components.Pdf, {
        file: source
      });
    }
  } else if (block.type === "embed" || block.type === "video" || block.type === "figma" || block.type === "typeform" || block.type === "gist" || block.type === "maps" || block.type === "excalidraw" || block.type === "codepen" || block.type === "drive") {
    if (block.type === "video" && source && source.indexOf("youtube") < 0 && source.indexOf("youtu.be") < 0 && source.indexOf("vimeo") < 0 && source.indexOf("wistia") < 0 && source.indexOf("loom") < 0 && source.indexOf("videoask") < 0 && source.indexOf("getcloudapp") < 0) {
      style.paddingBottom = void 0;
      content = /* @__PURE__ */ React13.createElement("video", {
        playsInline: true,
        controls: true,
        preload: "metadata",
        style: assetStyle,
        src: source,
        title: block.type
      });
    } else {
      let src = ((_f = block.format) == null ? void 0 : _f.display_source) || source;
      if (src) {
        const youtubeVideoId = block.type === "video" ? getYoutubeId(src) : null;
        if (youtubeVideoId) {
          content = /* @__PURE__ */ React13.createElement(LiteYouTubeEmbed, {
            id: youtubeVideoId,
            style: assetStyle,
            className: "notion-asset-object-fit"
          });
        } else if (block.type === "gist") {
          if (!src.endsWith(".pibb")) {
            src = `${src}.pibb`;
          }
          assetStyle.width = "100%";
          style.paddingBottom = "50%";
          content = /* @__PURE__ */ React13.createElement("iframe", {
            style: assetStyle,
            className: "notion-asset-object-fit",
            src,
            title: "GitHub Gist",
            frameBorder: "0",
            loading: "lazy",
            scrolling: "auto"
          });
        } else {
          content = /* @__PURE__ */ React13.createElement("iframe", {
            className: "notion-asset-object-fit",
            style: assetStyle,
            src,
            title: `iframe ${block.type}`,
            frameBorder: "0",
            allowFullScreen: true,
            loading: "lazy",
            scrolling: "auto"
          });
        }
      }
    }
  } else if (block.type === "image") {
    if (source.includes("file.notion.so")) {
      source = (_i = (_h = (_g = block.properties) == null ? void 0 : _g.source) == null ? void 0 : _h[0]) == null ? void 0 : _i[0];
    }
    const src = mapImageUrl(source, block);
    const caption = getTextContent((_j = block.properties) == null ? void 0 : _j.caption);
    const alt = caption || "notion image";
    content = /* @__PURE__ */ React13.createElement(LazyImage, {
      src,
      alt,
      zoomable,
      height: style.height,
      style: assetStyle
    });
  }
  return /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement("div", {
    style
  }, content, block.type === "image" && children), block.type !== "image" && children);
};

// src/components/asset-wrapper.tsx
var urlStyle = { width: "100%" };
var AssetWrapper = ({ blockId, block }) => {
  var _a, _b, _c, _d, _e, _f;
  const value = block;
  const { components, mapPageUrl, rootDomain, zoom } = useNotionContext();
  let isURL = false;
  if (block.type === "image") {
    const caption = (_c = (_b = (_a = value == null ? void 0 : value.properties) == null ? void 0 : _a.caption) == null ? void 0 : _b[0]) == null ? void 0 : _c[0];
    if (caption) {
      const id = parsePageId2(caption, { uuid: true });
      const isPage = caption.charAt(0) === "/" && id;
      if (isPage || isValidURL(caption)) {
        isURL = true;
      }
    }
  }
  const figure = /* @__PURE__ */ React14.createElement("figure", {
    className: cs(
      "notion-asset-wrapper",
      `notion-asset-wrapper-${block.type}`,
      ((_d = value.format) == null ? void 0 : _d.block_full_width) && "notion-asset-wrapper-full",
      blockId
    )
  }, /* @__PURE__ */ React14.createElement(Asset, {
    block: value,
    zoomable: zoom && !isURL
  }, ((_e = value == null ? void 0 : value.properties) == null ? void 0 : _e.caption) && !isURL && /* @__PURE__ */ React14.createElement("figcaption", {
    className: "notion-asset-caption"
  }, /* @__PURE__ */ React14.createElement(Text, {
    value: value.properties.caption,
    block
  }))));
  if (isURL) {
    const caption = (_f = value == null ? void 0 : value.properties) == null ? void 0 : _f.caption[0][0];
    const id = parsePageId2(caption, { uuid: true });
    const isPage = caption.charAt(0) === "/" && id;
    const captionHostname = extractHostname(caption);
    return /* @__PURE__ */ React14.createElement(components.PageLink, {
      style: urlStyle,
      href: isPage ? mapPageUrl(id) : caption,
      target: captionHostname && captionHostname !== rootDomain && !caption.startsWith("/") ? "blank_" : null
    }, figure);
  }
  return figure;
};
function isValidURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}
function extractHostname(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname;
  } catch (err) {
    return "";
  }
}

// src/components/checkbox.tsx
import * as React16 from "react";

// src/icons/check.tsx
import * as React15 from "react";
function SvgCheck(props) {
  return /* @__PURE__ */ React15.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React15.createElement("path", {
    d: "M5.5 12L14 3.5 12.5 2l-7 7-4-4.003L0 6.499z"
  }));
}
var check_default = SvgCheck;

// src/components/checkbox.tsx
var Checkbox = ({ isChecked }) => {
  let content = null;
  if (isChecked) {
    content = /* @__PURE__ */ React16.createElement("div", {
      className: "notion-property-checkbox-checked"
    }, /* @__PURE__ */ React16.createElement(check_default, null));
  } else {
    content = /* @__PURE__ */ React16.createElement("div", {
      className: "notion-property-checkbox-unchecked"
    });
  }
  return /* @__PURE__ */ React16.createElement("span", {
    className: "notion-property notion-property-checkbox"
  }, content);
};

// src/next.tsx
import * as React17 from "react";
import isEqual from "react-fast-compare";
var wrapNextImage = (NextImage) => {
  return React17.memo(function ReactNotionXNextImage(_a) {
    var _b = _a, {
      src,
      alt,
      width,
      height,
      className,
      style,
      layout
    } = _b, rest = __objRest(_b, [
      "src",
      "alt",
      "width",
      "height",
      "className",
      "style",
      "layout"
    ]);
    if (!layout) {
      layout = width && height ? "intrinsic" : "fill";
    }
    return /* @__PURE__ */ React17.createElement(NextImage, __spreadValues({
      className,
      src,
      alt,
      width: layout === "intrinsic" && width,
      height: layout === "intrinsic" && height,
      objectFit: style == null ? void 0 : style.objectFit,
      objectPosition: style == null ? void 0 : style.objectPosition,
      layout
    }, rest));
  }, isEqual);
};
var wrapNextLink = (NextLink) => function ReactNotionXNextLink(_a) {
  var _b = _a, {
    href,
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    locale
  } = _b, linkProps = __objRest(_b, [
    "href",
    "as",
    "passHref",
    "prefetch",
    "replace",
    "scroll",
    "shallow",
    "locale"
  ]);
  return /* @__PURE__ */ React17.createElement(NextLink, {
    href,
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    locale
  }, /* @__PURE__ */ React17.createElement("a", __spreadValues({}, linkProps)));
};

// src/context.tsx
var DefaultLink = (props) => /* @__PURE__ */ React18.createElement("a", __spreadValues({
  target: "_blank",
  rel: "noopener noreferrer"
}, props));
var DefaultLinkMemo = React18.memo(DefaultLink);
var DefaultPageLink = (props) => /* @__PURE__ */ React18.createElement("a", __spreadValues({}, props));
var DefaultPageLinkMemo = React18.memo(DefaultPageLink);
var DefaultEmbed = (props) => /* @__PURE__ */ React18.createElement(AssetWrapper, __spreadValues({}, props));
var DefaultHeader = Header;
var dummyLink = (_a) => {
  var _b = _a, { href, rel, target, title } = _b, rest = __objRest(_b, ["href", "rel", "target", "title"]);
  return /* @__PURE__ */ React18.createElement("span", __spreadValues({}, rest));
};
var dummyComponent = (name) => () => {
  console.warn(
    `Warning: using empty component "${name}" (you should override this in NotionRenderer.components)`
  );
  return null;
};
var dummyOverrideFn = (_, defaultValueFn) => defaultValueFn();
var defaultComponents = {
  Image: null,
  Link: DefaultLinkMemo,
  PageLink: DefaultPageLinkMemo,
  Checkbox,
  Callout: void 0,
  Code: dummyComponent("Code"),
  Equation: dummyComponent("Equation"),
  Collection: dummyComponent("Collection"),
  Property: void 0,
  propertyTextValue: dummyOverrideFn,
  propertySelectValue: dummyOverrideFn,
  propertyRelationValue: dummyOverrideFn,
  propertyFormulaValue: dummyOverrideFn,
  propertyTitleValue: dummyOverrideFn,
  propertyPersonValue: dummyOverrideFn,
  propertyFileValue: dummyOverrideFn,
  propertyCheckboxValue: dummyOverrideFn,
  propertyUrlValue: dummyOverrideFn,
  propertyEmailValue: dummyOverrideFn,
  propertyPhoneNumberValue: dummyOverrideFn,
  propertyNumberValue: dummyOverrideFn,
  propertyLastEditedTimeValue: dummyOverrideFn,
  propertyCreatedTimeValue: dummyOverrideFn,
  propertyDateValue: dummyOverrideFn,
  Pdf: dummyComponent("Pdf"),
  Tweet: dummyComponent("Tweet"),
  Modal: dummyComponent("Modal"),
  Header: DefaultHeader,
  Embed: DefaultEmbed
};
var defaultNotionContext = {
  recordMap: {
    block: {},
    collection: {},
    collection_view: {},
    collection_query: {},
    notion_user: {},
    signed_urls: {}
  },
  components: defaultComponents,
  mapPageUrl: defaultMapPageUrl(),
  mapImageUrl: defaultMapImageUrl,
  searchNotion: null,
  isShowingSearch: false,
  onHideSearch: null,
  fullPage: false,
  darkMode: false,
  previewImages: false,
  forceCustomImages: false,
  showCollectionViewDropdown: true,
  linkTableTitleProperties: true,
  isLinkCollectionToUrlProperty: false,
  showTableOfContents: false,
  minTableOfContentsItems: 3,
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,
  zoom: null
};
var ctx = React18.createContext(defaultNotionContext);
var NotionContextProvider = (_a) => {
  var _b = _a, {
    components: themeComponents = {},
    children,
    mapPageUrl,
    mapImageUrl,
    rootPageId
  } = _b, rest = __objRest(_b, [
    "components",
    "children",
    "mapPageUrl",
    "mapImageUrl",
    "rootPageId"
  ]);
  for (const key of Object.keys(rest)) {
    if (rest[key] === void 0) {
      delete rest[key];
    }
  }
  const wrappedThemeComponents = React18.useMemo(
    () => __spreadValues({}, themeComponents),
    [themeComponents]
  );
  if (wrappedThemeComponents.nextImage) {
    wrappedThemeComponents.Image = wrapNextImage(themeComponents.nextImage);
  }
  if (wrappedThemeComponents.nextLink) {
    wrappedThemeComponents.nextLink = wrapNextLink(themeComponents.nextLink);
  }
  for (const key of Object.keys(wrappedThemeComponents)) {
    if (!wrappedThemeComponents[key]) {
      delete wrappedThemeComponents[key];
    }
  }
  const value = React18.useMemo(
    () => __spreadProps(__spreadValues(__spreadValues({}, defaultNotionContext), rest), {
      rootPageId,
      mapPageUrl: mapPageUrl != null ? mapPageUrl : defaultMapPageUrl(rootPageId),
      mapImageUrl: mapImageUrl != null ? mapImageUrl : defaultMapImageUrl,
      components: __spreadValues(__spreadValues({}, defaultComponents), wrappedThemeComponents)
    }),
    [mapImageUrl, mapPageUrl, wrappedThemeComponents, rootPageId, rest]
  );
  return /* @__PURE__ */ React18.createElement(ctx.Provider, {
    value
  }, children);
};
var NotionContextConsumer = ctx.Consumer;
var useNotionContext = () => {
  return React18.useContext(ctx);
};

// src/icons/default-page-icon.tsx
import * as React19 from "react";
var DefaultPageIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React19.createElement("svg", __spreadProps(__spreadValues({
    className
  }, rest), {
    viewBox: "0 0 30 30",
    width: "16"
  }), /* @__PURE__ */ React19.createElement("path", {
    d: "M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"
  }));
};

// src/components/page-icon.tsx
var isIconBlock = (value) => {
  return value.type === "page" || value.type === "callout" || value.type === "collection_view" || value.type === "collection_view_page";
};
var PageIconImpl = ({
  block,
  className,
  inline = true,
  hideDefaultIcon = false,
  defaultIcon
}) => {
  var _a;
  const { mapImageUrl, recordMap, darkMode } = useNotionContext();
  let isImage = false;
  let content = null;
  if (isIconBlock(block)) {
    const icon = ((_a = getBlockIcon(block, recordMap)) == null ? void 0 : _a.trim()) || defaultIcon;
    const title = getBlockTitle3(block, recordMap);
    if (icon && isUrl(icon)) {
      const url = mapImageUrl(icon, block);
      isImage = true;
      content = /* @__PURE__ */ React20.createElement(LazyImage, {
        src: url,
        alt: title || "page icon",
        className: cs(className, "notion-page-icon")
      });
    } else if (icon && icon.startsWith("/icons/")) {
      const url = "https://www.notion.so" + icon + "?mode=" + (darkMode ? "dark" : "light");
      content = /* @__PURE__ */ React20.createElement(LazyImage, {
        src: url,
        alt: title || "page icon",
        className: cs(className, "notion-page-icon")
      });
    } else if (!icon) {
      if (!hideDefaultIcon) {
        isImage = true;
        content = /* @__PURE__ */ React20.createElement(DefaultPageIcon, {
          className: cs(className, "notion-page-icon"),
          alt: title ? title : "page icon"
        });
      }
    } else {
      isImage = false;
      content = /* @__PURE__ */ React20.createElement("span", {
        className: cs(className, "notion-page-icon"),
        role: "img",
        "aria-label": icon
      }, icon);
    }
  }
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ React20.createElement("div", {
    className: cs(
      inline ? "notion-page-icon-inline" : "notion-page-icon-hero",
      isImage ? "notion-page-icon-image" : "notion-page-icon-span"
    )
  }, content);
};
var PageIcon = React20.memo(PageIconImpl);

// src/icons/collection-view-board.tsx
import * as React21 from "react";
function SvgCollectionViewBoard(props) {
  return /* @__PURE__ */ React21.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React21.createElement("path", {
    d: "M12 1.5H2a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5zM2 0h10a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm1 3h2v6H3V3zm3 0h2v8H6V3zm3 0h2v4H9V3z"
  }));
}
var collection_view_board_default = SvgCollectionViewBoard;

// src/icons/collection-view-calendar.tsx
import * as React22 from "react";
function SvgCollectionViewCalendar(props) {
  return /* @__PURE__ */ React22.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React22.createElement("path", {
    d: "M2.564 4.004c-.586 0-.71.024-.833.09a.319.319 0 00-.141.14c-.066.124-.09.247-.09.834v6.368c0 .586.024.71.09.833a.319.319 0 00.14.141c.124.066.248.09.834.09h8.872c.586 0 .71-.024.833-.09a.319.319 0 00.141-.14c.066-.124.09-.248.09-.834V5.068c0-.587-.024-.71-.09-.834a.319.319 0 00-.14-.14c-.124-.066-.248-.09-.834-.09H2.564zm0-4.004h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v8.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267H2.563c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 01-.757-.756C.093 12.65 0 12.327 0 11.437V2.563c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757C1.35.093 1.673 0 2.563 0zm4.044 7.88c.179.11.318.256.418.436.1.18.148.394.148.64 0 .304-.08.597-.238.876-.16.28-.392.498-.692.65-.299.15-.685.224-1.16.224-.46 0-.827-.055-1.1-.166a1.687 1.687 0 01-.68-.492 2.227 2.227 0 01-.404-.802l.083-.127 1.37-.182.112.08c.05.258.126.431.221.52a.507.507 0 00.364.133.495.495 0 00.386-.169c.105-.115.158-.27.158-.472 0-.205-.051-.358-.15-.463a.527.527 0 00-.407-.157 1.65 1.65 0 00-.417.077l-.127-.104.07-.98.115-.091c.072.01.127.015.164.015.154 0 .28-.047.38-.144.1-.096.15-.205.15-.335a.388.388 0 00-.106-.29c-.07-.07-.168-.105-.3-.105a.444.444 0 00-.324.118c-.083.08-.143.232-.176.457l-.117.084-1.297-.233-.079-.123c.114-.435.334-.772.66-1.006.326-.234.78-.349 1.36-.349.666 0 1.153.126 1.462.384.31.259.467.589.467.982 0 .233-.064.446-.192.636a1.43 1.43 0 01-.37.365c.1.034.182.072.248.113zm1.747-.145a5.186 5.186 0 01-.806.31l-.129-.097V6.824l.07-.096c.455-.147.807-.322 1.055-.524.246-.202.439-.45.579-.747l.09-.057h1.135l.1.1v5.021l-.1.1H8.961l-.1-.1V7.428a4.053 4.053 0 01-.506.307z"
  }));
}
var collection_view_calendar_default = SvgCollectionViewCalendar;

// src/icons/collection-view-gallery.tsx
import * as React23 from "react";
function SvgCollectionViewGallery(props) {
  return /* @__PURE__ */ React23.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React23.createElement("path", {
    d: "M12 1.5H2a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5zM2 0h10a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm1 3h3.5v3.5H3V3zm4.5 0H11v3.5H7.5V3zM3 7.5h3.5V11H3V7.5zm4.5 0H11V11H7.5V7.5z"
  }));
}
var collection_view_gallery_default = SvgCollectionViewGallery;

// src/icons/collection-view-list.tsx
import * as React24 from "react";
function SvgCollectionViewList(props) {
  return /* @__PURE__ */ React24.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React24.createElement("path", {
    d: "M12 1.5H2a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5zM2 0h10a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm1 3h6v1.5H3V3zm0 2.5h8V7H3V5.5zM3 8h4v1.5H3V8z"
  }));
}
var collection_view_list_default = SvgCollectionViewList;

// src/icons/collection-view-table.tsx
import * as React25 from "react";
function SvgCollectionViewTable(props) {
  return /* @__PURE__ */ React25.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React25.createElement("path", {
    d: "M2 0h10a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm3.75 5.67v2.66h6.75V5.67H5.75zm0 4.17v2.66h5.75a1 1 0 001-1V9.84H5.75zM1.5 5.67v2.66h2.75V5.67H1.5zm0 4.17v1.66a1 1 0 001 1h1.75V9.84H1.5zm1-8.34a1 1 0 00-1 1v1.66h2.75V1.5H2.5zm3.25 0v2.66h6.75V2.5a1 1 0 00-1-1H5.75z"
  }));
}
var collection_view_table_default = SvgCollectionViewTable;

// src/icons/collection-view-icon.tsx
var iconMap = {
  table: collection_view_table_default,
  board: collection_view_board_default,
  gallery: collection_view_gallery_default,
  list: collection_view_list_default,
  calendar: collection_view_calendar_default
};
var CollectionViewIcon = (_a) => {
  var _b = _a, {
    type
  } = _b, rest = __objRest(_b, [
    "type"
  ]);
  const icon = iconMap[type];
  if (!icon) {
    return null;
  }
  return icon(rest);
};

// src/third-party/collection-row.tsx
import * as React44 from "react";

// src/third-party/collection-column-title.tsx
import * as React42 from "react";

// src/icons/type-checkbox.tsx
import * as React26 from "react";
function SvgTypeCheckbox(props) {
  return /* @__PURE__ */ React26.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React26.createElement("path", {
    d: "M0 3a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3H3a3 3 0 01-3-3V3zm3-1.5A1.5 1.5 0 001.5 3v8A1.5 1.5 0 003 12.5h8a1.5 1.5 0 001.5-1.5V3A1.5 1.5 0 0011 1.5H3zm-.167 5.316l.566-.542.177-.17.347-.332.346.334.176.17 1.139 1.098 3.699-3.563.177-.17.347-.335.347.334.177.17.563.543.177.171.372.36-.372.36-.177.17-4.786 4.615-.177.171-.347.334-.347-.334-.177-.17-2.23-2.15-.177-.172-.375-.361.376-.36.179-.17z"
  }));
}
var type_checkbox_default = SvgTypeCheckbox;

// src/icons/type-date.tsx
import * as React27 from "react";
function SvgTypeDate(props) {
  return /* @__PURE__ */ React27.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React27.createElement("path", {
    d: "M10.889 5.5H3.11v1.556h7.778V5.5zm1.555-4.444h-.777V0H10.11v1.056H3.89V0H2.333v1.056h-.777c-.864 0-1.548.7-1.548 1.555L0 12.5c0 .856.692 1.5 1.556 1.5h10.888C13.3 14 14 13.356 14 12.5V2.611c0-.855-.7-1.555-1.556-1.555zm0 11.444H1.556V3.944h10.888V12.5zM8.556 8.611H3.11v1.556h5.445V8.61z"
  }));
}
var type_date_default = SvgTypeDate;

// src/icons/type-email.tsx
import * as React28 from "react";
function SvgTypeEmail(props) {
  return /* @__PURE__ */ React28.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React28.createElement("path", {
    d: "M14 6.225c0 .822-.133 1.574-.4 2.256-.267.683-.644 1.218-1.13 1.606-.488.388-.946.6-1.494.6-.429 0-.808-.102-1.139-.305a1.753 1.753 0 01-.713-.8c-.613.736-1.563 1.104-2.531 1.104-1.027 0-1.835-.304-2.427-.912-.591-.608-.887-1.44-.887-2.496 0-1.204.389-2.175 1.166-2.911.776-.736 1.791-1.105 3.044-1.105.498 0 2.032.212 2.252.268.51.13.86.593.835 1.112l-.156 3.287c0 .794.22 1.19.66 1.19.372 0 .668-.267.888-.8.22-.534.33-1.232.33-2.094 0-.919-.194-1.731-.582-2.436a3.924 3.924 0 00-1.64-1.614c-.704-.371-1.509-.557-2.413-.557-1.172 0-2.19.237-3.053.711a4.785 4.785 0 00-1.988 2.05c-.46.894-.691 1.926-.691 3.096 0 1.576.428 2.784 1.283 3.627.855.841 2.094 1.262 3.718 1.262.615 0 1.29-.067 2.027-.2.225-.042.518-.108.877-.2a.863.863 0 011.025.527.76.76 0 01-.502.993c-1.052.316-2.17.488-3.357.516-2.204 0-3.922-.57-5.154-1.713C.616 11.146 0 9.56 0 7.527c0-1.41.315-2.69.944-3.84A6.792 6.792 0 013.63.98C4.794.327 6.131 0 7.645 0c1.276 0 2.514.29 3.418.77.905.481 1.574 1.228 2.12 2.176.544.947.817 2.04.817 3.28zm-8.615 1.01c0 1.208.488 1.811 1.466 1.811.511 0 .9-.181 1.168-.545.267-.363.429-.954.486-1.772l.11-1.896a4.638 4.638 0 00-.98-.095c-.71 0-1.263.224-1.658.67-.395.446-.592 1.055-.592 1.828z"
  }));
}
var type_email_default = SvgTypeEmail;

// src/icons/type-file.tsx
import * as React29 from "react";
function SvgTypeFile(props) {
  return /* @__PURE__ */ React29.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React29.createElement("path", {
    d: "M5.946 14a4.975 4.975 0 01-3.497-1.415A4.731 4.731 0 011 9.174c0-1.288.515-2.5 1.449-3.41L7.456.986c1.345-1.313 3.722-1.318 5.08.007a3.453 3.453 0 010 4.961L8.03 10.241c-.867.847-2.293.848-3.17-.006a2.158 2.158 0 010-3.102l1.744-1.701 1.272 1.24-1.744 1.701a.43.43 0 000 .621c.23.223.405.223.636 0l4.503-4.288a1.723 1.723 0 00-.007-2.473c-.68-.663-1.864-.663-2.543 0L3.713 7.011a3.006 3.006 0 00-.915 2.163c0 .82.328 1.591.922 2.17 1.19 1.162 3.262 1.162 4.451 0l2.248-2.192 1.272 1.24-2.248 2.193A4.978 4.978 0 015.946 14z"
  }));
}
var type_file_default = SvgTypeFile;

// src/icons/type-formula.tsx
import * as React30 from "react";
function SvgTypeFormula(props) {
  return /* @__PURE__ */ React30.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React30.createElement("path", {
    d: "M7.779 7.063l-3.157 4.224a.49.49 0 00-.072.218.35.35 0 00.346.357h6.242c.476 0 .862.398.862.889v.36c0 .491-.386.889-.862.889H1.862A.876.876 0 011 13.111v-.425a.82.82 0 01.177-.54L4.393 7.8a1.367 1.367 0 00-.006-1.625L1.4 2.194a.822.822 0 01-.18-.544V.89C1.22.398 1.604 0 2.08 0h8.838c.476 0 .861.398.861.889v.36c0 .491-.385.89-.86.89H5.135c-.19 0-.345.159-.345.356a.489.489 0 00.07.216l2.92 3.975c.049.062.063.107.06.188a.246.246 0 01-.062.189z"
  }));
}
var type_formula_default = SvgTypeFormula;

// src/icons/type-multi-select.tsx
import * as React31 from "react";
function SvgTypeMultiSelect(props) {
  return /* @__PURE__ */ React31.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React31.createElement("path", {
    d: "M4 3a1 1 0 011-1h7a1 1 0 110 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h7a1 1 0 110 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h7a1 1 0 110 2H5a1 1 0 01-1-1zM2 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2z"
  }));
}
var type_multi_select_default = SvgTypeMultiSelect;

// src/icons/type-number.tsx
import * as React32 from "react";
function SvgTypeNumber(props) {
  return /* @__PURE__ */ React32.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React32.createElement("path", {
    d: "M4.462 0c-.595 0-1.078.482-1.078 1.078v2.306H1.078a1.078 1.078 0 100 2.155h2.306v2.922H1.078a1.078 1.078 0 100 2.155h2.306v2.306a1.078 1.078 0 002.155 0v-2.306H8.46v2.306a1.078 1.078 0 002.156 0v-2.306h2.306a1.078 1.078 0 100-2.155h-2.306V5.539h2.306a1.078 1.078 0 100-2.155h-2.306V1.078a1.078 1.078 0 00-2.156 0v2.306H5.54V1.078C5.54.482 5.056 0 4.461 0zm1.077 8.46V5.54H8.46v2.92H5.54z"
  }));
}
var type_number_default = SvgTypeNumber;

// src/icons/type-person.tsx
import * as React33 from "react";
function SvgTypePerson(props) {
  return /* @__PURE__ */ React33.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React33.createElement("path", {
    d: "M9.625 10.847C8.912 10.289 8.121 9.926 7 9.26v-.54a3.33 3.33 0 00.538-.888c.408-.1.774-.498.774-.832 0-.482-.202-.673-.44-.829 0-.015.003-.03.003-.046 0-.711-.438-2.625-2.625-2.625-2.188 0-2.625 1.915-2.625 2.625 0 .017.003.03.003.046-.238.156-.44.347-.44.829 0 .334.366.731.774.833.146.343.326.643.538.886v.541c-1.12.665-1.912 1.028-2.625 1.587C.041 11.498 0 12.469 0 14h10.5c0-1.531-.041-2.502-.875-3.153zm3.5-3.5c-.713-.558-1.504-.921-2.625-1.587v-.54c.212-.244.392-.544.538-.888.408-.1.774-.498.774-.832 0-.482-.202-.673-.44-.829 0-.015.003-.03.003-.046C11.375 1.914 10.937 0 8.75 0 6.562 0 6.125 1.915 6.125 2.625c0 .017.003.03.003.046-.016.012-.03.025-.047.036 1.751.359 2.516 1.841 2.647 3.04.248.262.46.65.46 1.253 0 .603-.417 1.203-1.004 1.515-.057.109-.117.214-.181.315l.437.245c.64.357 1.194.666 1.724 1.081.138.108.256.224.365.343H14c0-1.53-.041-2.5-.875-3.153z"
  }));
}
var type_person_default = SvgTypePerson;

// src/icons/type-person-2.tsx
import * as React34 from "react";
function SvgTypePerson2(props) {
  return /* @__PURE__ */ React34.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React34.createElement("path", {
    d: "M13.125 10.035c-.571-.55-2.324-1.504-3.5-2.16v-.834c.224-.322.42-.671.566-1.055.394-.242.746-.702.746-1.173 0-.458-.005-.87-.47-1.208C10.305 1.558 9.436 0 7 0S3.695 1.558 3.533 3.605c-.465.338-.47.75-.47 1.208 0 .471.352.93.746 1.173.146.384.342.733.566 1.055v.834c-1.176.656-2.929 1.61-3.5 2.16C.165 10.72 0 11.812 0 14h14c0-2.188-.164-3.281-.875-3.965z"
  }));
}
var type_person_2_default = SvgTypePerson2;

// src/icons/type-phone-number.tsx
import * as React35 from "react";
function SvgTypePhoneNumber(props) {
  return /* @__PURE__ */ React35.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React35.createElement("path", {
    d: "M2.207.013a.487.487 0 00-.29.02C.87.438.213 1.93.058 2.955c-.484 3.33 2.15 6.215 4.57 8.113 2.149 1.684 6.273 4.453 8.713 1.781.31-.329.678-.813.658-1.297-.058-.813-.813-1.394-1.394-1.84-.445-.329-1.375-1.239-1.956-1.22-.522.02-.851.562-1.18.891l-.582.581c-.096.097-1.336-.716-1.471-.813a9.881 9.881 0 01-1.414-1.104A9.13 9.13 0 014.86 6.732c-.097-.136-.89-1.317-.813-1.414 0 0 .677-.736.871-1.026.407-.62.717-1.104.252-1.84-.174-.27-.387-.484-.62-.716-.406-.387-.813-.794-1.278-1.123-.251-.194-.677-.542-1.065-.6z"
  }));
}
var type_phone_number_default = SvgTypePhoneNumber;

// src/icons/type-relation.tsx
import * as React36 from "react";
function SvgTypeRelation(props) {
  return /* @__PURE__ */ React36.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React36.createElement("path", {
    d: "M4.5 1v2h5.086L1 11.586 2.414 13 11 4.414V9.5h2V1z"
  }));
}
var type_relation_default = SvgTypeRelation;

// src/icons/type-select.tsx
import * as React37 from "react";
function SvgTypeSelect(props) {
  return /* @__PURE__ */ React37.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React37.createElement("path", {
    d: "M7 13A6 6 0 107 1a6 6 0 000 12zM3.751 5.323A.2.2 0 013.909 5h6.182a.2.2 0 01.158.323L7.158 9.297a.2.2 0 01-.316 0L3.751 5.323z"
  }));
}
var type_select_default = SvgTypeSelect;

// src/icons/type-text.tsx
import * as React38 from "react";
function SvgTypeText(props) {
  return /* @__PURE__ */ React38.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React38.createElement("path", {
    d: "M7 4.568a.5.5 0 00-.5-.5h-6a.5.5 0 00-.5.5v1.046a.5.5 0 00.5.5h6a.5.5 0 00.5-.5V4.568zM.5 1a.5.5 0 00-.5.5v1.045a.5.5 0 00.5.5h12a.5.5 0 00.5-.5V1.5a.5.5 0 00-.5-.5H.5zM0 8.682a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V7.636a.5.5 0 00-.5-.5H.5a.5.5 0 00-.5.5v1.046zm0 3.068a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-1.045a.5.5 0 00-.5-.5h-9a.5.5 0 00-.5.5v1.045z"
  }));
}
var type_text_default = SvgTypeText;

// src/icons/type-timestamp.tsx
import * as React39 from "react";
function SvgTypeTimestamp(props) {
  return /* @__PURE__ */ React39.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React39.createElement("path", {
    d: "M6.986 14c-1.79 0-3.582-.69-4.944-2.068-2.723-2.72-2.723-7.172 0-9.892 2.725-2.72 7.182-2.72 9.906 0A6.972 6.972 0 0114 6.996c0 1.88-.728 3.633-2.052 4.955A7.058 7.058 0 016.986 14zm3.285-6.99v1.645H5.526v-5.47h1.841v3.63h2.904v.194zm1.89-.014c0-1.379-.542-2.67-1.522-3.648-2.006-2.005-5.287-2.007-7.297-.009l-.009.009a5.168 5.168 0 000 7.295c2.01 2.007 5.297 2.007 7.306 0a5.119 5.119 0 001.521-3.647z"
  }));
}
var type_timestamp_default = SvgTypeTimestamp;

// src/icons/type-title.tsx
import * as React40 from "react";
function SvgTypeTitle(props) {
  return /* @__PURE__ */ React40.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React40.createElement("path", {
    d: "M7.74 8.697a.81.81 0 01.073.308.894.894 0 01-.9.888.867.867 0 01-.825-.592l-.333-.961H2.058l-.333.961a.882.882 0 01-.838.592A.884.884 0 010 9.005c0-.11.025-.222.062-.308l2.403-6.211c.222-.58.776-.986 1.442-.986.653 0 1.22.407 1.442.986l2.39 6.211zM2.6 6.824h2.613L3.907 3.102 2.6 6.824zm8.8-3.118c1.355 0 2.6.542 2.6 2.255V9.08a.8.8 0 01-.789.814.797.797 0 01-.788-.703c-.395.468-1.097.764-1.874.764-.949 0-2.07-.64-2.07-1.972 0-1.392 1.121-1.897 2.07-1.897.789 0 1.491.246 1.886.727v-.826c0-.604-.518-.998-1.306-.998-.469 0-.888.123-1.32.394a.64.64 0 01-.307.086.602.602 0 01-.592-.604c0-.221.123-.419.284-.517a3.963 3.963 0 012.206-.641zm-.222 5.188c.505 0 .998-.172 1.257-.517v-.74c-.259-.345-.752-.517-1.257-.517-.616 0-1.122.332-1.122.9 0 .554.506.874 1.122.874zM.656 11.125h12.688a.656.656 0 110 1.313H.656a.656.656 0 110-1.313z"
  }));
}
var type_title_default = SvgTypeTitle;

// src/icons/type-url.tsx
import * as React41 from "react";
function SvgTypeUrl(props) {
  return /* @__PURE__ */ React41.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React41.createElement("path", {
    d: "M3.733 3.867h3.734c1.03 0 1.866.837 1.866 1.866 0 1.03-.837 1.867-1.866 1.867h-.934a.934.934 0 000 1.867h.934a3.734 3.734 0 000-7.467H3.733A3.73 3.73 0 001.89 8.977a4.637 4.637 0 01.314-2.18 1.854 1.854 0 01-.336-1.064c0-1.03.837-1.866 1.866-1.866zm8.377 1.422a4.6 4.6 0 01-.316 2.176c.212.303.34.67.34 1.068 0 1.03-.838 1.867-1.867 1.867H6.533a1.869 1.869 0 01-1.866-1.867c0-1.03.837-1.866 1.866-1.866h.934a.934.934 0 000-1.867h-.934a3.733 3.733 0 000 7.467h3.734a3.73 3.73 0 001.843-6.978z"
  }));
}
var type_url_default = SvgTypeUrl;

// src/icons/property-icon.tsx
var iconMap2 = {
  title: type_title_default,
  text: type_text_default,
  number: type_number_default,
  select: type_select_default,
  multi_select: type_multi_select_default,
  date: type_date_default,
  person: type_person_default,
  file: type_file_default,
  checkbox: type_checkbox_default,
  url: type_url_default,
  email: type_email_default,
  phone_number: type_phone_number_default,
  formula: type_formula_default,
  relation: type_relation_default,
  created_time: type_timestamp_default,
  last_edited_time: type_timestamp_default,
  created_by: type_person_2_default,
  last_edited_by: type_person_2_default
};
var PropertyIcon = (_a) => {
  var _b = _a, {
    type
  } = _b, rest = __objRest(_b, [
    "type"
  ]);
  const icon = iconMap2[type];
  if (!icon)
    return null;
  return icon(rest);
};

// src/third-party/collection-column-title.tsx
var CollectionColumnTitle = ({ schema }) => {
  return /* @__PURE__ */ React42.createElement("div", {
    className: "notion-collection-column-title"
  }, /* @__PURE__ */ React42.createElement(PropertyIcon, {
    className: "notion-collection-column-title-icon",
    type: schema.type
  }), /* @__PURE__ */ React42.createElement("div", {
    className: "notion-collection-column-title-body"
  }, schema.name));
};

// src/third-party/property.tsx
var import_format2 = __toESM(require_format(), 1);
var import_format_number = __toESM(require_format_number(), 1);
import * as React43 from "react";

// src/third-party/eval-formula.ts
var import_add = __toESM(require_add(), 1);
var import_format = __toESM(require_format(), 1);
var import_getDate = __toESM(require_getDate(), 1);
var import_getDay = __toESM(require_getDay(), 1);
var import_getHours = __toESM(require_getHours(), 1);
var import_getMinutes = __toESM(require_getMinutes(), 1);
var import_getMonth = __toESM(require_getMonth(), 1);
var import_getYear = __toESM(require_getYear(), 1);
var import_intervalToDuration = __toESM(require_intervalToDuration(), 1);
var import_sub = __toESM(require_sub(), 1);
import { getDateValue, getTextContent as getTextContent2 } from "notion-utils";
function evalFormula(formula, context) {
  const _a = context, { endDate } = _a, ctx2 = __objRest(_a, ["endDate"]);
  switch (formula == null ? void 0 : formula.type) {
    case "symbol":
      return formula.name === "true";
    case "constant": {
      const value = formula.value;
      switch (formula.result_type) {
        case "text":
          return value;
        case "number":
          return parseFloat(value);
        default:
          return value;
      }
    }
    case "property": {
      const value = ctx2.properties[formula.id];
      const text = getTextContent2(value);
      switch (formula.result_type) {
        case "text":
          return text;
        case "number":
          return parseFloat(text);
        case "boolean":
          if (typeof text === "string") {
            return text === "true";
          } else {
            return !!text;
          }
        case "date": {
          const v = getDateValue(value);
          if (v) {
            if (endDate && v.end_date) {
              const date = new Date(v.end_date);
              return new Date(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate()
              );
            } else {
              const date = new Date(v.start_date);
              return new Date(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate()
              );
            }
          } else {
            return new Date(text);
          }
        }
        default:
          return text;
      }
    }
    case "operator":
    case "function":
      return evalFunctionFormula(formula, ctx2);
    default:
      throw new Error(
        `invalid or unsupported formula "${formula == null ? void 0 : formula.type}`
      );
  }
}
function evalFunctionFormula(formula, ctx2) {
  const args = formula == null ? void 0 : formula.args;
  switch (formula.name) {
    case "and":
      return evalFormula(args[0], ctx2) && evalFormula(args[1], ctx2);
    case "empty":
      return !evalFormula(args[0], ctx2);
    case "equal":
      return evalFormula(args[0], ctx2) == evalFormula(args[1], ctx2);
    case "if":
      return evalFormula(args[0], ctx2) ? evalFormula(args[1], ctx2) : evalFormula(args[2], ctx2);
    case "larger":
      return evalFormula(args[0], ctx2) > evalFormula(args[1], ctx2);
    case "largerEq":
      return evalFormula(args[0], ctx2) >= evalFormula(args[1], ctx2);
    case "not":
      return !evalFormula(args[0], ctx2);
    case "or":
      return evalFormula(args[0], ctx2) || evalFormula(args[1], ctx2);
    case "smaller":
      return evalFormula(args[0], ctx2) < evalFormula(args[1], ctx2);
    case "smallerEq":
      return evalFormula(args[0], ctx2) <= evalFormula(args[1], ctx2);
    case "unequal":
      return evalFormula(args[0], ctx2) != evalFormula(args[1], ctx2);
    case "abs":
      return Math.abs(evalFormula(args[0], ctx2));
    case "add": {
      const v0 = evalFormula(args[0], ctx2);
      const v1 = evalFormula(args[1], ctx2);
      if (typeof v0 === "number") {
        return v0 + +v1;
      } else if (typeof v0 === "string") {
        return v0 + `${v1}`;
      } else {
        return v0;
      }
    }
    case "cbrt":
      return Math.cbrt(evalFormula(args[0], ctx2));
    case "ceil":
      return Math.ceil(evalFormula(args[0], ctx2));
    case "divide":
      return evalFormula(args[0], ctx2) / evalFormula(args[1], ctx2);
    case "exp":
      return Math.exp(evalFormula(args[0], ctx2));
    case "floor":
      return Math.floor(evalFormula(args[0], ctx2));
    case "ln":
      return Math.log(evalFormula(args[0], ctx2));
    case "log10":
      return Math.log10(evalFormula(args[0], ctx2));
    case "log2":
      return Math.log2(evalFormula(args[0], ctx2));
    case "max": {
      const values = args.map((arg) => evalFormula(arg, ctx2));
      return values.reduce(
        (acc, value) => Math.max(acc, value),
        Number.NEGATIVE_INFINITY
      );
    }
    case "min": {
      const values = args.map((arg) => evalFormula(arg, ctx2));
      return values.reduce(
        (acc, value) => Math.min(acc, value),
        Number.POSITIVE_INFINITY
      );
    }
    case "mod":
      return evalFormula(args[0], ctx2) % evalFormula(args[1], ctx2);
    case "multiply":
      return evalFormula(args[0], ctx2) * evalFormula(args[1], ctx2);
    case "pow":
      return Math.pow(
        evalFormula(args[0], ctx2),
        evalFormula(args[1], ctx2)
      );
    case "round":
      return Math.round(evalFormula(args[0], ctx2));
    case "sign":
      return Math.sign(evalFormula(args[0], ctx2));
    case "sqrt":
      return Math.sqrt(evalFormula(args[0], ctx2));
    case "subtract":
      return evalFormula(args[0], ctx2) - evalFormula(args[1], ctx2);
    case "toNumber":
      return parseFloat(evalFormula(args[0], ctx2));
    case "unaryMinus":
      return evalFormula(args[0], ctx2) * -1;
    case "unaryPlus":
      return parseFloat(evalFormula(args[0], ctx2));
    case "concat": {
      const values = args.map((arg) => evalFormula(arg, ctx2));
      return values.join("");
    }
    case "contains":
      return evalFormula(args[0], ctx2).includes(
        evalFormula(args[1], ctx2)
      );
    case "format": {
      const value = evalFormula(args[0], ctx2);
      switch (typeof value) {
        case "string":
          return value;
        case "object":
          if (value instanceof Date) {
            return (0, import_format.default)(value, "MMM d, YYY");
          } else {
            return `${value}`;
          }
        case "number":
        default:
          return `${value}`;
      }
    }
    case "join": {
      const [delimiterArg, ...restArgs] = args;
      const delimiter = evalFormula(delimiterArg, ctx2);
      const values = restArgs.map((arg) => evalFormula(arg, ctx2));
      return values.join(delimiter);
    }
    case "length":
      return evalFormula(args[0], ctx2).length;
    case "replace": {
      const value = evalFormula(args[0], ctx2);
      const regex = evalFormula(args[1], ctx2);
      const replacement = evalFormula(args[2], ctx2);
      return value.replace(new RegExp(regex), replacement);
    }
    case "replaceAll": {
      const value = evalFormula(args[0], ctx2);
      const regex = evalFormula(args[1], ctx2);
      const replacement = evalFormula(args[2], ctx2);
      return value.replace(new RegExp(regex, "g"), replacement);
    }
    case "slice": {
      const value = evalFormula(args[0], ctx2);
      const beginIndex = evalFormula(args[1], ctx2);
      const endIndex = args[2] ? evalFormula(args[2], ctx2) : value.length;
      return value.slice(beginIndex, endIndex);
    }
    case "test": {
      const value = evalFormula(args[0], ctx2);
      const regex = evalFormula(args[1], ctx2);
      return new RegExp(regex).test(value);
    }
    case "date":
      return (0, import_getDate.default)(evalFormula(args[0], ctx2));
    case "dateAdd": {
      const date = evalFormula(args[0], ctx2);
      const number = evalFormula(args[1], ctx2);
      const unit = evalFormula(args[1], ctx2);
      return (0, import_add.default)(date, { [unit]: number });
    }
    case "dateBetween": {
      const date1 = evalFormula(args[0], ctx2);
      const date2 = evalFormula(args[1], ctx2);
      const unit = evalFormula(args[1], ctx2);
      return (0, import_intervalToDuration.default)({
        start: date2,
        end: date1
      })[unit];
    }
    case "dateSubtract": {
      const date = evalFormula(args[0], ctx2);
      const number = evalFormula(args[1], ctx2);
      const unit = evalFormula(args[1], ctx2);
      return (0, import_sub.default)(date, { [unit]: number });
    }
    case "day":
      return (0, import_getDay.default)(evalFormula(args[0], ctx2));
    case "end":
      return evalFormula(args[0], __spreadProps(__spreadValues({}, ctx2), { endDate: true }));
    case "formatDate": {
      const date = evalFormula(args[0], ctx2);
      const formatValue = evalFormula(args[1], ctx2).replace(
        "dddd",
        "eeee"
      );
      return (0, import_format.default)(date, formatValue);
    }
    case "fromTimestamp":
      return new Date(evalFormula(args[0], ctx2));
    case "hour":
      return (0, import_getHours.default)(evalFormula(args[0], ctx2));
    case "minute":
      return (0, import_getMinutes.default)(evalFormula(args[0], ctx2));
    case "month":
      return (0, import_getMonth.default)(evalFormula(args[0], ctx2));
    case "now":
      return new Date();
    case "start":
      return evalFormula(args[0], __spreadProps(__spreadValues({}, ctx2), { endDate: false }));
    case "timestamp":
      return evalFormula(args[0], ctx2).getTime();
    case "year":
      return (0, import_getYear.default)(evalFormula(args[0], ctx2));
    default:
      throw new Error(
        `invalid or unsupported function formula "${formula == null ? void 0 : formula.type}`
      );
  }
}

// src/third-party/property.tsx
var Property = (props) => {
  const { components } = useNotionContext();
  if (components.Property) {
    return /* @__PURE__ */ React43.createElement(components.Property, __spreadValues({}, props));
  } else {
    return /* @__PURE__ */ React43.createElement(PropertyImplMemo, __spreadValues({}, props));
  }
};
var PropertyImpl = (props) => {
  const { components, mapImageUrl, mapPageUrl } = useNotionContext();
  const {
    schema,
    data,
    block,
    collection,
    inline = false,
    linkToTitlePage = true
  } = props;
  const renderTextValue = React43.useMemo(
    () => function TextProperty() {
      return /* @__PURE__ */ React43.createElement(Text, {
        value: data,
        block
      });
    },
    [block, data]
  );
  const renderDateValue = React43.useMemo(
    () => function DateProperty() {
      return /* @__PURE__ */ React43.createElement(Text, {
        value: data,
        block
      });
    },
    [block, data]
  );
  const renderRelationValue = React43.useMemo(
    () => function RelationProperty() {
      return /* @__PURE__ */ React43.createElement(Text, {
        value: data,
        block
      });
    },
    [block, data]
  );
  const renderFormulaValue = React43.useMemo(
    () => function FormulaProperty() {
      let content2;
      try {
        content2 = evalFormula(schema.formula, {
          schema: collection == null ? void 0 : collection.schema,
          properties: block == null ? void 0 : block.properties
        });
        if (isNaN(content2)) {
        }
        if (content2 instanceof Date) {
          content2 = (0, import_format2.default)(content2, "MMM d, YYY hh:mm aa");
        }
      } catch (err) {
        content2 = null;
      }
      return content2;
    },
    [block == null ? void 0 : block.properties, collection == null ? void 0 : collection.schema, schema]
  );
  const renderTitleValue = React43.useMemo(
    () => function FormulaTitle() {
      if (block && linkToTitlePage) {
        return /* @__PURE__ */ React43.createElement(components.PageLink, {
          className: cs("notion-page-link"),
          href: mapPageUrl(block.id)
        }, /* @__PURE__ */ React43.createElement(PageTitle, {
          block
        }));
      } else {
        return /* @__PURE__ */ React43.createElement(Text, {
          value: data,
          block
        });
      }
    },
    [block, components, data, linkToTitlePage, mapPageUrl]
  );
  const renderPersonValue = React43.useMemo(
    () => function PersonProperty() {
      return /* @__PURE__ */ React43.createElement(Text, {
        value: data,
        block
      });
    },
    [block, data]
  );
  const renderFileValue = React43.useMemo(
    () => function FileProperty() {
      const files = data.filter((v) => v.length === 2).map((f) => f.flat().flat());
      return files.map((file, i) => /* @__PURE__ */ React43.createElement(components.Link, {
        key: i,
        className: "notion-property-file",
        href: mapImageUrl(file[2], block),
        target: "_blank",
        rel: "noreferrer noopener"
      }, /* @__PURE__ */ React43.createElement(GracefulImage, {
        alt: file[0],
        src: mapImageUrl(file[2], block),
        loading: "lazy"
      })));
    },
    [block, components, data, mapImageUrl]
  );
  const renderCheckboxValue = React43.useMemo(
    () => function CheckboxProperty() {
      const isChecked = data && data[0][0] === "Yes";
      return /* @__PURE__ */ React43.createElement("div", {
        className: "notion-property-checkbox-container"
      }, /* @__PURE__ */ React43.createElement(Checkbox, {
        isChecked,
        blockId: void 0
      }), /* @__PURE__ */ React43.createElement("span", {
        className: "notion-property-checkbox-text"
      }, schema.name));
    },
    [data, schema]
  );
  const renderUrlValue = React43.useMemo(
    () => function UrlProperty() {
      const d = JSON.parse(JSON.stringify(data));
      if (inline) {
        try {
          const url = new URL(d[0][0]);
          d[0][0] = url.hostname.replace(/^www\./, "");
        } catch (err) {
        }
      }
      return /* @__PURE__ */ React43.createElement(Text, {
        value: d,
        block,
        inline,
        linkProps: {
          target: "_blank",
          rel: "noreferrer noopener"
        }
      });
    },
    [block, data, inline]
  );
  const renderEmailValue = React43.useMemo(
    () => function EmailProperty() {
      return /* @__PURE__ */ React43.createElement(Text, {
        value: data,
        linkProtocol: "mailto",
        block
      });
    },
    [block, data]
  );
  const renderPhoneNumberValue = React43.useMemo(
    () => function PhoneNumberProperty() {
      return /* @__PURE__ */ React43.createElement(Text, {
        value: data,
        linkProtocol: "tel",
        block
      });
    },
    [block, data]
  );
  const renderNumberValue = React43.useMemo(
    () => function NumberProperty() {
      const value = parseFloat(data[0][0] || "0");
      let output = "";
      if (isNaN(value)) {
        return /* @__PURE__ */ React43.createElement(Text, {
          value: data,
          block
        });
      } else {
        switch (schema.number_format) {
          case "number_with_commas":
            output = (0, import_format_number.default)()(value);
            break;
          case "percent":
            output = (0, import_format_number.default)({ suffix: "%" })(value * 100);
            break;
          case "dollar":
            output = (0, import_format_number.default)({ prefix: "$", round: 2, padRight: 2 })(
              value
            );
            break;
          case "euro":
            output = (0, import_format_number.default)({ prefix: "\u20AC", round: 2, padRight: 2 })(
              value
            );
            break;
          case "pound":
            output = (0, import_format_number.default)({ prefix: "\xA3", round: 2, padRight: 2 })(
              value
            );
            break;
          case "yen":
            output = (0, import_format_number.default)({ prefix: "\xA5", round: 0 })(value);
            break;
          case "rupee":
            output = (0, import_format_number.default)({ prefix: "\u20B9", round: 2, padRight: 2 })(
              value
            );
            break;
          case "won":
            output = (0, import_format_number.default)({ prefix: "\u20A9", round: 0 })(value);
            break;
          case "yuan":
            output = (0, import_format_number.default)({ prefix: "CN\xA5", round: 2, padRight: 2 })(
              value
            );
            break;
          default:
            return /* @__PURE__ */ React43.createElement(Text, {
              value: data,
              block
            });
        }
        return /* @__PURE__ */ React43.createElement(Text, {
          value: [[output]],
          block
        });
      }
    },
    [block, data, schema]
  );
  const renderCreatedTimeValue = React43.useMemo(
    () => function CreatedTimeProperty() {
      return (0, import_format2.default)(new Date(block == null ? void 0 : block.created_time), "MMM d, YYY hh:mm aa");
    },
    [block == null ? void 0 : block.created_time]
  );
  const renderLastEditedTimeValue = React43.useMemo(
    () => function LastEditedTimeProperty() {
      return (0, import_format2.default)(new Date(block == null ? void 0 : block.last_edited_time), "MMM d, YYY hh:mm aa");
    },
    [block == null ? void 0 : block.last_edited_time]
  );
  if (!schema) {
    return null;
  }
  let content = null;
  if (data || schema.type === "checkbox" || schema.type === "title" || schema.type === "formula" || schema.type === "created_by" || schema.type === "last_edited_by" || schema.type === "created_time" || schema.type === "last_edited_time") {
    switch (schema.type) {
      case "relation":
        content = components.propertyRelationValue(props, renderRelationValue);
        break;
      case "formula":
        content = components.propertyFormulaValue(props, renderFormulaValue);
        break;
      case "title":
        content = components.propertyTitleValue(props, renderTitleValue);
        break;
      case "select":
      case "multi_select": {
        const values = (data[0][0] || "").split(",");
        content = values.map((value, index) => {
          var _a;
          const option = (_a = schema.options) == null ? void 0 : _a.find(
            (option2) => value === option2.value
          );
          const color = option == null ? void 0 : option.color;
          return components.propertySelectValue(
            __spreadProps(__spreadValues({}, props), {
              key: index,
              value,
              option,
              color
            }),
            () => /* @__PURE__ */ React43.createElement("div", {
              key: index,
              className: cs(
                `notion-property-${schema.type}-item`,
                color && `notion-item-${color}`
              )
            }, value)
          );
        });
        break;
      }
      case "person":
        content = components.propertyPersonValue(props, renderPersonValue);
        break;
      case "file":
        content = components.propertyFileValue(props, renderFileValue);
        break;
      case "checkbox":
        content = components.propertyCheckboxValue(props, renderCheckboxValue);
        break;
      case "url":
        content = components.propertyUrlValue(props, renderUrlValue);
        break;
      case "email":
        content = components.propertyEmailValue(props, renderEmailValue);
        break;
      case "phone_number":
        content = components.propertyPhoneNumberValue(
          props,
          renderPhoneNumberValue
        );
        break;
      case "number":
        content = components.propertyNumberValue(props, renderNumberValue);
        break;
      case "created_time":
        content = components.propertyCreatedTimeValue(
          props,
          renderCreatedTimeValue
        );
        break;
      case "last_edited_time":
        content = components.propertyLastEditedTimeValue(
          props,
          renderLastEditedTimeValue
        );
        break;
      case "created_by":
        break;
      case "last_edited_by":
        break;
      case "text":
        content = components.propertyTextValue(props, renderTextValue);
        break;
      case "date":
        content = components.propertyDateValue(props, renderDateValue);
        break;
      default:
        content = /* @__PURE__ */ React43.createElement(Text, {
          value: data,
          block
        });
        break;
    }
  }
  return /* @__PURE__ */ React43.createElement("span", {
    className: `notion-property notion-property-${schema.type}`
  }, content);
};
var PropertyImplMemo = React43.memo(PropertyImpl);

// src/third-party/collection-row.tsx
var CollectionRow = ({ block, pageHeader = false, className }) => {
  var _a, _b, _c, _d;
  const { recordMap } = useNotionContext();
  const collectionId = block.parent_id;
  const collection = (_a = recordMap.collection[collectionId]) == null ? void 0 : _a.value;
  const schemas = collection == null ? void 0 : collection.schema;
  if (!collection || !schemas) {
    return null;
  }
  let propertyIds = Object.keys(schemas).filter((id) => id !== "title");
  if ((_b = collection.format) == null ? void 0 : _b.property_visibility) {
    propertyIds = propertyIds.filter(
      (id) => {
        var _a2;
        return ((_a2 = collection.format.property_visibility.find(
          ({ property }) => property === id
        )) == null ? void 0 : _a2.visibility) !== "hide";
      }
    );
  }
  if ((_c = collection.format) == null ? void 0 : _c.collection_page_properties) {
    const idToIndex = (_d = collection.format) == null ? void 0 : _d.collection_page_properties.reduce(
      (acc, p, i) => __spreadProps(__spreadValues({}, acc), {
        [p.property]: i
      }),
      {}
    );
    propertyIds.sort((a, b) => idToIndex[a] - idToIndex[b]);
  } else {
    propertyIds.sort((a, b) => schemas[a].name.localeCompare(schemas[b].name));
  }
  return /* @__PURE__ */ React44.createElement("div", {
    className: cs("notion-collection-row", className)
  }, /* @__PURE__ */ React44.createElement("div", {
    className: "notion-collection-row-body"
  }, propertyIds.map((propertyId) => {
    var _a2;
    const schema = schemas[propertyId];
    return /* @__PURE__ */ React44.createElement("div", {
      className: "notion-collection-row-property",
      key: propertyId
    }, /* @__PURE__ */ React44.createElement(CollectionColumnTitle, {
      schema
    }), /* @__PURE__ */ React44.createElement("div", {
      className: "notion-collection-row-value"
    }, /* @__PURE__ */ React44.createElement(Property, {
      schema,
      data: (_a2 = block.properties) == null ? void 0 : _a2[propertyId],
      propertyId,
      block,
      collection,
      pageHeader
    })));
  })));
};

// src/third-party/collection-view.tsx
import * as React52 from "react";

// src/third-party/collection-view-board.tsx
import * as React48 from "react";

// src/icons/empty-icon.tsx
import * as React45 from "react";
var EmptyIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React45.createElement("svg", __spreadProps(__spreadValues({
    className
  }, rest), {
    viewBox: "0 0 14 14",
    width: "14"
  }), /* @__PURE__ */ React45.createElement("path", {
    d: "M11.0918,0 C11.5383,0 11.9307,0.295898 12.0533,0.725586 L13.9615,7.40332 C13.9871,7.49316 14,7.58594 14,7.67871 L14,13 C14,13.5527 13.5522,14 13,14 L1,14 C0.447754,14 0,13.5527 0,13 L0,7.67871 C0,7.58594 0.0129395,7.49316 0.0384521,7.40332 L1.94666,0.725586 C2.06934,0.295898 2.46167,0 2.9082,0 L11.0918,0 Z M4.27271,1.5 C3.83728,1.5 3.45178,1.78223 3.31982,2.19727 L1.91455,6.61328 C1.70947,7.25879 2.1908,7.91699 2.86755,7.91699 L4.70837,7.91699 C4.70837,8.93652 5.16663,10.168 7,10.168 C8.83337,10.168 9.29163,8.93652 9.29163,7.91699 L11.1478,7.89355 C11.8201,7.88477 12.2927,7.22852 12.0876,6.58887 L10.681,2.19531 C10.5485,1.78125 10.1635,1.5 9.72864,1.5 L4.27271,1.5 Z"
  }));
};

// src/third-party/collection-card.tsx
import * as React46 from "react";
import { getTextContent as getTextContent3 } from "notion-utils";
var CollectionCard = (_a) => {
  var _b = _a, {
    collection,
    block,
    cover,
    coverSize,
    coverAspect,
    properties,
    className
  } = _b, rest = __objRest(_b, [
    "collection",
    "block",
    "cover",
    "coverSize",
    "coverAspect",
    "properties",
    "className"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const ctx2 = useNotionContext();
  const {
    components,
    recordMap,
    mapPageUrl,
    mapImageUrl,
    isLinkCollectionToUrlProperty
  } = ctx2;
  let coverContent = null;
  const { page_cover_position = 0.5 } = block.format || {};
  const coverPosition = (1 - page_cover_position) * 100;
  if ((cover == null ? void 0 : cover.type) === "page_content") {
    const contentBlockId = (_a2 = block.content) == null ? void 0 : _a2.find((blockId) => {
      var _a3;
      const block2 = (_a3 = recordMap.block[blockId]) == null ? void 0 : _a3.value;
      if ((block2 == null ? void 0 : block2.type) === "image") {
        return true;
      }
    });
    if (contentBlockId) {
      const contentBlock = (_b2 = recordMap.block[contentBlockId]) == null ? void 0 : _b2.value;
      const source = (_g = (_e = (_d = (_c = contentBlock.properties) == null ? void 0 : _c.source) == null ? void 0 : _d[0]) == null ? void 0 : _e[0]) != null ? _g : (_f = contentBlock.format) == null ? void 0 : _f.display_source;
      if (source) {
        const src = mapImageUrl(source, contentBlock);
        const caption = (_j = (_i = (_h = contentBlock.properties) == null ? void 0 : _h.caption) == null ? void 0 : _i[0]) == null ? void 0 : _j[0];
        coverContent = /* @__PURE__ */ React46.createElement(LazyImage, {
          src,
          alt: caption || "notion image",
          style: {
            objectFit: coverAspect
          }
        });
      }
    }
    if (!coverContent) {
      coverContent = /* @__PURE__ */ React46.createElement("div", {
        className: "notion-collection-card-cover-empty"
      });
    }
  } else if ((cover == null ? void 0 : cover.type) === "page_cover") {
    const { page_cover } = block.format || {};
    if (page_cover) {
      const coverPosition2 = (1 - page_cover_position) * 100;
      coverContent = /* @__PURE__ */ React46.createElement(LazyImage, {
        src: mapImageUrl(page_cover, block),
        alt: getTextContent3((_k = block.properties) == null ? void 0 : _k.title),
        style: {
          objectFit: coverAspect,
          objectPosition: `center ${coverPosition2}%`
        }
      });
    }
  } else if ((cover == null ? void 0 : cover.type) === "property") {
    const { property } = cover;
    const schema = collection.schema[property];
    const data = (_l = block.properties) == null ? void 0 : _l[property];
    if (schema && data) {
      if (schema.type === "file") {
        const files = data.filter((v) => v.length === 2).map((f) => f.flat().flat());
        const file = files[0];
        if (file) {
          coverContent = /* @__PURE__ */ React46.createElement("span", {
            className: `notion-property-${schema.type}`
          }, /* @__PURE__ */ React46.createElement(LazyImage, {
            alt: file[0],
            src: mapImageUrl(file[2], block),
            style: {
              objectFit: coverAspect,
              objectPosition: `center ${coverPosition}%`
            }
          }));
        }
      } else {
        coverContent = /* @__PURE__ */ React46.createElement(Property, {
          propertyId: property,
          schema,
          data
        });
      }
    }
  }
  let linkProperties = [];
  if (isLinkCollectionToUrlProperty) {
    linkProperties = (_m = properties == null ? void 0 : properties.filter(
      (p) => p.visible && p.property !== "title" && collection.schema[p.property]
    ).filter((p) => {
      if (!block.properties)
        return false;
      const schema = collection.schema[p.property];
      return schema.type == "url";
    }).map((p) => {
      return block.properties[p.property];
    })) == null ? void 0 : _m.filter((p) => p && p.length > 0 && p[0] != void 0);
  }
  let url = null;
  if (linkProperties && linkProperties.length > 0 && linkProperties[0].length > 0 && linkProperties[0][0].length > 0) {
    url = linkProperties[0][0][0];
  }
  const innerCard = /* @__PURE__ */ React46.createElement(React46.Fragment, null, (coverContent || (cover == null ? void 0 : cover.type) !== "none") && /* @__PURE__ */ React46.createElement("div", {
    className: "notion-collection-card-cover"
  }, coverContent), /* @__PURE__ */ React46.createElement("div", {
    className: "notion-collection-card-body"
  }, /* @__PURE__ */ React46.createElement("div", {
    className: "notion-collection-card-property"
  }, /* @__PURE__ */ React46.createElement(Property, {
    schema: collection.schema.title,
    data: (_n = block == null ? void 0 : block.properties) == null ? void 0 : _n.title,
    block,
    collection
  })), properties == null ? void 0 : properties.filter(
    (p) => p.visible && p.property !== "title" && collection.schema[p.property]
  ).map((p) => {
    if (!block.properties)
      return null;
    const schema = collection.schema[p.property];
    const data = block.properties[p.property];
    return /* @__PURE__ */ React46.createElement("div", {
      className: "notion-collection-card-property",
      key: p.property
    }, /* @__PURE__ */ React46.createElement(Property, {
      schema,
      data,
      block,
      collection,
      inline: true
    }));
  })));
  return /* @__PURE__ */ React46.createElement(NotionContextProvider, __spreadProps(__spreadValues({}, ctx2), {
    components: __spreadProps(__spreadValues({}, ctx2.components), {
      Link: (props) => {
        var _a3, _b3, _c2;
        return /* @__PURE__ */ React46.createElement("form", {
          action: props.href,
          target: "_blank"
        }, /* @__PURE__ */ React46.createElement("input", {
          type: "submit",
          value: (_c2 = (_b3 = (_a3 = props == null ? void 0 : props.children) == null ? void 0 : _a3.props) == null ? void 0 : _b3.children) != null ? _c2 : props.href,
          className: "nested-form-link notion-link"
        }));
      },
      PageLink: dummyLink
    })
  }), isLinkCollectionToUrlProperty && url ? /* @__PURE__ */ React46.createElement(components.Link, __spreadValues({
    className: cs(
      "notion-collection-card",
      `notion-collection-card-size-${coverSize}`,
      className
    ),
    href: url
  }, rest), innerCard) : /* @__PURE__ */ React46.createElement(components.PageLink, __spreadValues({
    className: cs(
      "notion-collection-card",
      `notion-collection-card-size-${coverSize}`,
      className
    ),
    href: mapPageUrl(block.id)
  }, rest), innerCard));
};

// src/third-party/collection-group.tsx
import * as React47 from "react";
var CollectionGroup = (_a) => {
  var _b = _a, {
    collectionViewComponent: CollectionViewComponent,
    collection,
    collectionGroup,
    schema,
    value,
    hidden,
    summaryProps,
    detailsProps
  } = _b, rest = __objRest(_b, [
    "collectionViewComponent",
    "collection",
    "collectionGroup",
    "schema",
    "value",
    "hidden",
    "summaryProps",
    "detailsProps"
  ]);
  if (hidden)
    return null;
  return /* @__PURE__ */ React47.createElement("details", __spreadValues({
    open: true,
    className: "notion-collection-group"
  }, detailsProps), /* @__PURE__ */ React47.createElement("summary", __spreadValues({
    className: "notion-collection-group-title"
  }, summaryProps), /* @__PURE__ */ React47.createElement("div", null, /* @__PURE__ */ React47.createElement(Property, {
    schema,
    data: [[value]],
    collection
  }), /* @__PURE__ */ React47.createElement("span", {
    className: "notion-board-th-count"
  }, collectionGroup == null ? void 0 : collectionGroup.total))), /* @__PURE__ */ React47.createElement(CollectionViewComponent, __spreadValues({
    collection,
    collectionGroup
  }, rest)));
};

// src/third-party/collection-utils.ts
var import_format3 = __toESM(require_format(), 1);
function getCollectionGroups(collection, collectionView, collectionData, ...rest) {
  var _a;
  const elems = ((_a = collectionView == null ? void 0 : collectionView.format) == null ? void 0 : _a.collection_groups) || [];
  return elems == null ? void 0 : elems.map(({ property, hidden, value: { value, type } }) => {
    var _a2, _b;
    const isUncategorizedValue = typeof value === "undefined";
    const isDateValue = value == null ? void 0 : value.range;
    const queryLabel = isUncategorizedValue ? "uncategorized" : isDateValue ? ((_a2 = value.range) == null ? void 0 : _a2.start_date) || ((_b = value.range) == null ? void 0 : _b.end_date) : (value == null ? void 0 : value.value) || value;
    const collectionGroup = collectionData[`results:${type}:${queryLabel}`];
    let queryValue = !isUncategorizedValue && (isDateValue || (value == null ? void 0 : value.value) || value);
    let schema = collection.schema[property];
    if (type === "checkbox" && value) {
      queryValue = "Yes";
    }
    if (isDateValue) {
      schema = {
        type: "text",
        name: "text"
      };
      queryValue = (0, import_format3.default)(new Date(queryLabel), "MMM d, YYY hh:mm aa");
    }
    return __spreadValues({
      collectionGroup,
      schema,
      value: queryValue || "No description",
      hidden,
      collection,
      collectionView,
      collectionData,
      blockIds: collectionGroup == null ? void 0 : collectionGroup.blockIds
    }, rest);
  });
}

// src/third-party/collection-view-board.tsx
var CollectionViewBoard = ({
  collection,
  collectionView,
  collectionData,
  padding
}) => {
  var _a;
  const isGroupedCollection = (_a = collectionView == null ? void 0 : collectionView.format) == null ? void 0 : _a.collection_group_by;
  if (isGroupedCollection) {
    const collectionGroups = getCollectionGroups(
      collection,
      collectionView,
      collectionData,
      padding
    );
    return collectionGroups.map((group, index) => /* @__PURE__ */ React48.createElement(CollectionGroup, __spreadProps(__spreadValues({
      key: index
    }, group), {
      summaryProps: {
        style: {
          paddingLeft: padding
        }
      },
      collectionViewComponent: (props) => /* @__PURE__ */ React48.createElement(Board, __spreadValues({
        padding
      }, props))
    })));
  }
  return /* @__PURE__ */ React48.createElement(Board, {
    padding,
    collectionView,
    collection,
    collectionData
  });
};
function Board({ collectionView, collectionData, collection, padding }) {
  var _a, _b;
  const { recordMap } = useNotionContext();
  const {
    board_cover = { type: "none" },
    board_cover_size = "medium",
    board_cover_aspect = "cover"
  } = (collectionView == null ? void 0 : collectionView.format) || {};
  const boardGroups = ((_a = collectionView == null ? void 0 : collectionView.format) == null ? void 0 : _a.board_columns) || ((_b = collectionView == null ? void 0 : collectionView.format) == null ? void 0 : _b.board_groups2) || [];
  const boardStyle = React48.useMemo(
    () => ({
      paddingLeft: padding
    }),
    [padding]
  );
  return /* @__PURE__ */ React48.createElement("div", {
    className: "notion-board"
  }, /* @__PURE__ */ React48.createElement("div", {
    className: cs(
      "notion-board-view",
      `notion-board-view-size-${board_cover_size}`
    ),
    style: boardStyle
  }, /* @__PURE__ */ React48.createElement("div", {
    className: "notion-board-header"
  }, /* @__PURE__ */ React48.createElement("div", {
    className: "notion-board-header-inner"
  }, boardGroups.map((p, index) => {
    var _a2, _b2, _c;
    if (!((_a2 = collectionData.board_columns) == null ? void 0 : _a2.results)) {
      return null;
    }
    const group = collectionData.board_columns.results[index];
    const schema = collection.schema[p.property];
    if (!group || !schema || p.hidden) {
      return null;
    }
    return /* @__PURE__ */ React48.createElement("div", {
      className: "notion-board-th",
      key: index
    }, /* @__PURE__ */ React48.createElement("div", {
      className: "notion-board-th-body"
    }, ((_b2 = group.value) == null ? void 0 : _b2.value) ? /* @__PURE__ */ React48.createElement(Property, {
      schema,
      data: [[(_c = group.value) == null ? void 0 : _c.value]],
      collection
    }) : /* @__PURE__ */ React48.createElement("span", null, /* @__PURE__ */ React48.createElement(EmptyIcon, {
      className: "notion-board-th-empty"
    }), " No Select"), /* @__PURE__ */ React48.createElement("span", {
      className: "notion-board-th-count"
    }, group.total)));
  }))), /* @__PURE__ */ React48.createElement("div", {
    className: "notion-board-header-placeholder"
  }), /* @__PURE__ */ React48.createElement("div", {
    className: "notion-board-body"
  }, boardGroups.map((p, index) => {
    var _a2, _b2, _c, _d, _e;
    const boardResults = (_a2 = collectionData.board_columns) == null ? void 0 : _a2.results;
    if (!boardResults)
      return null;
    if (!((_b2 = p == null ? void 0 : p.value) == null ? void 0 : _b2.type))
      return null;
    const schema = collection.schema[p.property];
    const group = collectionData[`results:${(_c = p == null ? void 0 : p.value) == null ? void 0 : _c.type}:${((_d = p == null ? void 0 : p.value) == null ? void 0 : _d.value) || "uncategorized"}`];
    if (!group || !schema || p.hidden) {
      return null;
    }
    return /* @__PURE__ */ React48.createElement("div", {
      className: "notion-board-group",
      key: index
    }, (_e = group.blockIds) == null ? void 0 : _e.map((blockId) => {
      var _a3, _b3;
      const block = (_a3 = recordMap.block[blockId]) == null ? void 0 : _a3.value;
      if (!block)
        return null;
      return /* @__PURE__ */ React48.createElement(CollectionCard, {
        className: "notion-board-group-card",
        collection,
        block,
        cover: board_cover,
        coverSize: board_cover_size,
        coverAspect: board_cover_aspect,
        properties: (_b3 = collectionView.format) == null ? void 0 : _b3.board_properties,
        key: blockId
      });
    }));
  }))));
}

// src/third-party/collection-view-gallery.tsx
import * as React49 from "react";
var defaultBlockIds = [];
var CollectionViewGallery = ({
  collection,
  collectionView,
  collectionData
}) => {
  var _a, _b, _c, _d, _e;
  const isGroupedCollection = (_a = collectionView == null ? void 0 : collectionView.format) == null ? void 0 : _a.collection_group_by;
  if (isGroupedCollection) {
    const collectionGroups = getCollectionGroups(
      collection,
      collectionView,
      collectionData
    );
    return collectionGroups.map((group, index) => /* @__PURE__ */ React49.createElement(CollectionGroup, __spreadProps(__spreadValues({
      key: index
    }, group), {
      collectionViewComponent: Gallery
    })));
  }
  const blockIds = ((_e = (_d = (_b = collectionData["collection_group_results"]) == null ? void 0 : _b.blockIds) != null ? _d : (_c = collectionData["results:relation:uncategorized"]) == null ? void 0 : _c.blockIds) != null ? _e : collectionData.blockIds) || defaultBlockIds;
  return /* @__PURE__ */ React49.createElement(Gallery, {
    collectionView,
    collection,
    blockIds
  });
};
function Gallery({ blockIds, collectionView, collection }) {
  const { recordMap } = useNotionContext();
  const {
    gallery_cover = { type: "none" },
    gallery_cover_size = "medium",
    gallery_cover_aspect = "cover"
  } = collectionView.format || {};
  return /* @__PURE__ */ React49.createElement("div", {
    className: "notion-gallery"
  }, /* @__PURE__ */ React49.createElement("div", {
    className: "notion-gallery-view"
  }, /* @__PURE__ */ React49.createElement("div", {
    className: cs(
      "notion-gallery-grid",
      `notion-gallery-grid-size-${gallery_cover_size}`
    )
  }, blockIds == null ? void 0 : blockIds.map((blockId) => {
    var _a, _b;
    const block = (_a = recordMap.block[blockId]) == null ? void 0 : _a.value;
    if (!block)
      return null;
    return /* @__PURE__ */ React49.createElement(CollectionCard, {
      collection,
      block,
      cover: gallery_cover,
      coverSize: gallery_cover_size,
      coverAspect: gallery_cover_aspect,
      properties: (_b = collectionView.format) == null ? void 0 : _b.gallery_properties,
      key: blockId
    });
  }))));
}

// src/third-party/collection-view-list.tsx
import * as React50 from "react";
var defaultBlockIds2 = [];
var CollectionViewList = ({
  collection,
  collectionView,
  collectionData
}) => {
  var _a, _b, _c;
  const isGroupedCollection = (_a = collectionView == null ? void 0 : collectionView.format) == null ? void 0 : _a.collection_group_by;
  if (isGroupedCollection) {
    const collectionGroups = getCollectionGroups(
      collection,
      collectionView,
      collectionData
    );
    return collectionGroups.map((group, key) => /* @__PURE__ */ React50.createElement(CollectionGroup, __spreadProps(__spreadValues({
      key
    }, group), {
      collectionViewComponent: List
    })));
  }
  const blockIds = ((_c = (_b = collectionData["collection_group_results"]) == null ? void 0 : _b.blockIds) != null ? _c : collectionData.blockIds) || defaultBlockIds2;
  return /* @__PURE__ */ React50.createElement(List, {
    blockIds,
    collection,
    collectionView
  });
};
function List({ blockIds, collection, collectionView }) {
  const { components, recordMap, mapPageUrl } = useNotionContext();
  return /* @__PURE__ */ React50.createElement("div", {
    className: "notion-list-collection"
  }, /* @__PURE__ */ React50.createElement("div", {
    className: "notion-list-view"
  }, /* @__PURE__ */ React50.createElement("div", {
    className: "notion-list-body"
  }, blockIds == null ? void 0 : blockIds.map((blockId) => {
    var _a, _b, _c, _d;
    const block = (_a = recordMap.block[blockId]) == null ? void 0 : _a.value;
    if (!block)
      return null;
    const titleSchema = collection.schema.title;
    const titleData = (_b = block == null ? void 0 : block.properties) == null ? void 0 : _b.title;
    return /* @__PURE__ */ React50.createElement(components.PageLink, {
      className: "notion-list-item notion-page-link",
      href: mapPageUrl(block.id),
      key: blockId
    }, /* @__PURE__ */ React50.createElement("div", {
      className: "notion-list-item-title"
    }, /* @__PURE__ */ React50.createElement(Property, {
      schema: titleSchema,
      data: titleData,
      block,
      collection
    })), /* @__PURE__ */ React50.createElement("div", {
      className: "notion-list-item-body"
    }, (_d = (_c = collectionView.format) == null ? void 0 : _c.list_properties) == null ? void 0 : _d.filter((p) => p.visible).map((p) => {
      var _a2;
      const schema = collection.schema[p.property];
      const data = block && ((_a2 = block.properties) == null ? void 0 : _a2[p.property]);
      if (!schema) {
        return null;
      }
      return /* @__PURE__ */ React50.createElement("div", {
        className: "notion-list-item-property",
        key: p.property
      }, /* @__PURE__ */ React50.createElement(Property, {
        schema,
        data,
        block,
        collection
      }));
    })));
  }))));
}

// src/third-party/collection-view-table.tsx
import * as React51 from "react";
var defaultBlockIds3 = [];
var CollectionViewTable = ({
  collection,
  collectionView,
  collectionData,
  padding,
  width
}) => {
  var _a, _b, _c;
  const isGroupedCollection = (_a = collectionView == null ? void 0 : collectionView.format) == null ? void 0 : _a.collection_group_by;
  if (isGroupedCollection) {
    const collectionGroups = getCollectionGroups(
      collection,
      collectionView,
      collectionData,
      padding,
      width
    );
    return collectionGroups.map((group, index) => /* @__PURE__ */ React51.createElement(CollectionGroup, __spreadProps(__spreadValues({
      key: index
    }, group), {
      collectionViewComponent: (props) => /* @__PURE__ */ React51.createElement(Table, __spreadProps(__spreadValues({}, props), {
        padding,
        width
      })),
      summaryProps: {
        style: {
          paddingLeft: padding,
          paddingRight: padding
        }
      }
    })));
  }
  const blockIds = ((_c = (_b = collectionData["collection_group_results"]) == null ? void 0 : _b.blockIds) != null ? _c : collectionData.blockIds) || defaultBlockIds3;
  return /* @__PURE__ */ React51.createElement(Table, {
    blockIds,
    collection,
    collectionView,
    padding,
    width
  });
};
function Table({ blockIds = [], collection, collectionView, width, padding }) {
  var _a;
  const { recordMap, linkTableTitleProperties } = useNotionContext();
  const tableStyle = React51.useMemo(
    () => ({
      width,
      maxWidth: width
    }),
    [width]
  );
  const tableViewStyle = React51.useMemo(
    () => ({
      paddingLeft: padding,
      paddingRight: padding
    }),
    [padding]
  );
  let properties = [];
  if ((_a = collectionView.format) == null ? void 0 : _a.table_properties) {
    properties = collectionView.format.table_properties.filter(
      (p) => p.visible && collection.schema[p.property]
    );
  } else {
    properties = [{ property: "title" }].concat(
      Object.keys(collection.schema).filter((p) => p !== "title").map((property) => ({ property }))
    );
  }
  return /* @__PURE__ */ React51.createElement("div", {
    className: "notion-table",
    style: tableStyle
  }, /* @__PURE__ */ React51.createElement("div", {
    className: "notion-table-view",
    style: tableViewStyle
  }, !!properties.length && /* @__PURE__ */ React51.createElement(React51.Fragment, null, /* @__PURE__ */ React51.createElement("div", {
    className: "notion-table-header"
  }, /* @__PURE__ */ React51.createElement("div", {
    className: "notion-table-header-inner"
  }, properties.map((p) => {
    var _a2;
    const schema = (_a2 = collection.schema) == null ? void 0 : _a2[p.property];
    const isTitle = p.property === "title";
    const style = {};
    if (p.width) {
      style.width = p.width;
    } else if (isTitle) {
      style.width = 280;
    } else {
      style.width = 200;
    }
    return /* @__PURE__ */ React51.createElement("div", {
      className: "notion-table-th",
      key: p.property
    }, /* @__PURE__ */ React51.createElement("div", {
      className: "notion-table-view-header-cell",
      style
    }, /* @__PURE__ */ React51.createElement("div", {
      className: "notion-table-view-header-cell-inner"
    }, /* @__PURE__ */ React51.createElement(CollectionColumnTitle, {
      schema
    }))));
  }))), /* @__PURE__ */ React51.createElement("div", {
    className: "notion-table-header-placeholder"
  }), /* @__PURE__ */ React51.createElement("div", {
    className: "notion-table-body"
  }, blockIds == null ? void 0 : blockIds.map((blockId) => /* @__PURE__ */ React51.createElement("div", {
    className: "notion-table-row",
    key: blockId
  }, properties.map((p) => {
    var _a2, _b, _c;
    const schema = (_a2 = collection.schema) == null ? void 0 : _a2[p.property];
    const block = (_b = recordMap.block[blockId]) == null ? void 0 : _b.value;
    const data = (_c = block == null ? void 0 : block.properties) == null ? void 0 : _c[p.property];
    const isTitle = p.property === "title";
    const style = {};
    if (p.width) {
      style.width = p.width;
    } else if (isTitle) {
      style.width = 280;
    } else {
      style.width = 200;
    }
    return /* @__PURE__ */ React51.createElement("div", {
      key: p.property,
      className: cs(
        "notion-table-cell",
        `notion-table-cell-${schema.type}`
      ),
      style
    }, /* @__PURE__ */ React51.createElement(Property, {
      schema,
      data,
      block,
      collection,
      linkToTitlePage: linkTableTitleProperties
    }));
  })))))));
}

// src/third-party/collection-view.tsx
var CollectionViewImpl = (props) => {
  const { collectionView } = props;
  switch (collectionView.type) {
    case "table":
      return /* @__PURE__ */ React52.createElement(CollectionViewTable, __spreadValues({}, props));
    case "gallery":
      return /* @__PURE__ */ React52.createElement(CollectionViewGallery, __spreadValues({}, props));
    case "list":
      return /* @__PURE__ */ React52.createElement(CollectionViewList, __spreadValues({}, props));
    case "board":
      return /* @__PURE__ */ React52.createElement(CollectionViewBoard, __spreadValues({}, props));
    default:
      console.warn("unsupported collection view", collectionView);
      return null;
  }
};
var CollectionView = React52.memo(CollectionViewImpl);

// src/third-party/collection.tsx
var isServer2 = typeof window === "undefined";
var Collection = ({ block, className, ctx: ctx2 }) => {
  const context = React53.useMemo(
    () => __spreadValues({}, ctx2),
    [ctx2]
  );
  if (block.type === "page") {
    if (block.parent_table !== "collection") {
      return null;
    }
    return /* @__PURE__ */ React53.createElement(NotionContextProvider, __spreadValues({}, context), /* @__PURE__ */ React53.createElement("div", {
      className: "notion-collection-page-properties"
    }, /* @__PURE__ */ React53.createElement(CollectionRow, {
      block,
      pageHeader: true,
      className
    })));
  } else {
    return /* @__PURE__ */ React53.createElement(NotionContextProvider, __spreadValues({}, context), /* @__PURE__ */ React53.createElement(CollectionViewBlock, {
      block,
      className
    }));
  }
};
var CollectionViewBlock = ({ block, className }) => {
  var _a, _b, _c, _d;
  const { recordMap, showCollectionViewDropdown } = useNotionContext();
  const { view_ids: viewIds } = block;
  const collectionId = getBlockCollectionId(block, recordMap);
  const [isMounted, setIsMounted] = React53.useState(false);
  React53.useEffect(() => {
    setIsMounted(true);
  }, []);
  const defaultCollectionViewId = viewIds[0];
  const [collectionState, setCollectionState] = useLocalStorage(block.id, {
    collectionViewId: defaultCollectionViewId
  });
  const collectionViewId = isMounted && viewIds.find((id) => id === collectionState.collectionViewId) || defaultCollectionViewId;
  const onChangeView = React53.useCallback(
    (collectionViewId2) => {
      console.log("change collection view", collectionViewId2);
      setCollectionState(__spreadProps(__spreadValues({}, collectionState), {
        collectionViewId: collectionViewId2
      }));
    },
    [collectionState, setCollectionState]
  );
  let { width: windowWidth } = useWindowSize();
  if (isServer2) {
    windowWidth = 1024;
  }
  const collection = (_a = recordMap.collection[collectionId]) == null ? void 0 : _a.value;
  const collectionView = (_b = recordMap.collection_view[collectionViewId]) == null ? void 0 : _b.value;
  const collectionData = (_c = recordMap.collection_query[collectionId]) == null ? void 0 : _c[collectionViewId];
  const parentPage = getBlockParentPage2(block, recordMap);
  const { width, padding } = React53.useMemo(() => {
    var _a2;
    const style = {};
    if ((collectionView == null ? void 0 : collectionView.type) !== "table" && (collectionView == null ? void 0 : collectionView.type) !== "board") {
      return {
        style,
        width: 0,
        padding: 0
      };
    }
    const width2 = windowWidth;
    const maxNotionBodyWidth = 708;
    let notionBodyWidth = maxNotionBodyWidth;
    if ((_a2 = parentPage == null ? void 0 : parentPage.format) == null ? void 0 : _a2.page_full_width) {
      notionBodyWidth = width2 - 2 * Math.min(96, width2 * 0.08) | 0;
    } else {
      notionBodyWidth = width2 < maxNotionBodyWidth ? width2 - width2 * 0.02 | 0 : maxNotionBodyWidth;
    }
    const padding2 = isServer2 && !isMounted ? 96 : (width2 - notionBodyWidth) / 2 | 0;
    style.paddingLeft = padding2;
    style.paddingRight = padding2;
    return {
      style,
      width: width2,
      padding: padding2
    };
  }, [windowWidth, parentPage, collectionView == null ? void 0 : collectionView.type, isMounted]);
  if (!(collection && collectionView && collectionData)) {
    console.warn("skipping missing collection view for block", block.id, {
      collectionId,
      collectionViewId,
      collectionView,
      collectionData,
      recordMap
    });
    return null;
  }
  const title = getTextContent4(collection.name).trim();
  const showTitle = ((_d = collectionView.format) == null ? void 0 : _d.hide_linked_collection_name) !== true && title;
  if (collection.icon) {
    block.format = __spreadProps(__spreadValues({}, block.format), {
      page_icon: collection.icon
    });
  }
  return /* @__PURE__ */ React53.createElement(React53.Fragment, null, /* @__PURE__ */ React53.createElement("div", null, /* @__PURE__ */ React53.createElement("div", null, viewIds.length > 1 && showCollectionViewDropdown && /* @__PURE__ */ React53.createElement(CollectionViewTabs, {
    collectionViewId,
    viewIds,
    onChangeView
  })), showTitle && /* @__PURE__ */ React53.createElement("div", {
    className: "notion-collection-header"
  }, /* @__PURE__ */ React53.createElement("div", {
    className: "notion-collection-header-title"
  }, /* @__PURE__ */ React53.createElement(PageIcon, {
    block,
    className: "notion-page-title-icon",
    hideDefaultIcon: true
  }), title))), /* @__PURE__ */ React53.createElement("div", {
    className: cs("notion-collection", className)
  }, /* @__PURE__ */ React53.createElement(CollectionView, {
    collection,
    collectionView,
    collectionData,
    padding,
    width
  })));
};
var CollectionViewTabs = ({ collectionViewId, viewIds, onChangeView }) => {
  const { recordMap } = useNotionContext();
  return /* @__PURE__ */ React53.createElement("div", {
    className: "notion-collection-view-tabs-row"
  }, viewIds.map((viewId) => {
    var _a;
    return /* @__PURE__ */ React53.createElement("button", {
      onClick: () => onChangeView(viewId),
      key: viewId,
      className: cs(
        "notion-collection-view-tabs-content-item",
        collectionViewId === viewId && "notion-collection-view-tabs-content-item-active"
      )
    }, /* @__PURE__ */ React53.createElement(CollectionViewColumnDesc, {
      collectionView: (_a = recordMap.collection_view[viewId]) == null ? void 0 : _a.value
    }));
  }));
};
var CollectionViewColumnDesc = (_a) => {
  var _b = _a, { collectionView, className, children } = _b, rest = __objRest(_b, ["collectionView", "className", "children"]);
  const { type } = collectionView;
  const name = collectionView.name || `${type[0].toUpperCase()}${type.slice(1)} view`;
  return /* @__PURE__ */ React53.createElement("div", __spreadValues({
    className: cs("notion-collection-view-type", className)
  }, rest), /* @__PURE__ */ React53.createElement(CollectionViewIcon, {
    className: "notion-collection-view-type-icon",
    type
  }), /* @__PURE__ */ React53.createElement("span", {
    className: "notion-collection-view-type-title"
  }, name), children);
};
export {
  Collection,
  PropertyImplMemo as Property
};
