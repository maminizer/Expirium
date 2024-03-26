
      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire4b52"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire4b52"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("8tvo0", function(module, exports) {
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */ /* jshint unused: true, undef: true, strict: true */ (function(global, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, window */ if (typeof define == "function" && define.amd) // AMD - RequireJS
    define(factory);
    else if (0, module.exports) // CommonJS - Browserify, Webpack
    module.exports = factory();
    else // Browser globals
    global.EvEmitter = factory();
})(typeof window != "undefined" ? window : module.exports, function() {
    "use strict";
    function EvEmitter() {}
    var proto = EvEmitter.prototype;
    proto.on = function(eventName, listener) {
        if (!eventName || !listener) return;
        // set events hash
        var events = this._events = this._events || {};
        // set listeners array
        var listeners = events[eventName] = events[eventName] || [];
        // only add once
        if (listeners.indexOf(listener) == -1) listeners.push(listener);
        return this;
    };
    proto.once = function(eventName, listener) {
        if (!eventName || !listener) return;
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        var onceEvents = this._onceEvents = this._onceEvents || {};
        // set onceListeners object
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        // set flag
        onceListeners[listener] = true;
        return this;
    };
    proto.off = function(eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return;
        var index = listeners.indexOf(listener);
        if (index != -1) listeners.splice(index, 1);
        return this;
    };
    proto.emitEvent = function(eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return;
        // copy over to avoid interference if .off() in listener
        listeners = listeners.slice(0);
        args = args || [];
        // once stuff
        var onceListeners = this._onceEvents && this._onceEvents[eventName];
        for(var i = 0; i < listeners.length; i++){
            var listener = listeners[i];
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
        }
        return this;
    };
    proto.allOff = function() {
        delete this._events;
        delete this._onceEvents;
    };
    return EvEmitter;
});

});

var $ced5eaecaf500aa3$exports = {};

/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */ (function(window1, factory) {
    "use strict";
    // universal module definition
    /*global define: false, module: false, require: false */ if (typeof define == "function" && define.amd) // AMD
    define([
        "ev-emitter/ev-emitter"
    ], function(EvEmitter) {
        return factory(window1, EvEmitter);
    });
    else if (0, $ced5eaecaf500aa3$exports) // CommonJS
    $ced5eaecaf500aa3$exports = factory(window1, (parcelRequire("8tvo0")));
    else // browser global
    window1.imagesLoaded = factory(window1, window1.EvEmitter);
})(typeof window !== "undefined" ? window : $ced5eaecaf500aa3$exports, // --------------------------  factory -------------------------- //
function factory(window1, EvEmitter) {
    "use strict";
    var $ = window1.jQuery;
    var console = window1.console;
    // -------------------------- helpers -------------------------- //
    // extend objects
    function extend(a, b) {
        for(var prop in b)a[prop] = b[prop];
        return a;
    }
    var arraySlice = Array.prototype.slice;
    // turn element or nodeList into an array
    function makeArray(obj) {
        if (Array.isArray(obj)) // use object if already an array
        return obj;
        var isArrayLike = typeof obj == "object" && typeof obj.length == "number";
        if (isArrayLike) // convert nodeList to array
        return arraySlice.call(obj);
        // array of single index
        return [
            obj
        ];
    }
    // -------------------------- imagesLoaded -------------------------- //
    /**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */ function ImagesLoaded(elem, options, onAlways) {
        // coerce ImagesLoaded() without new, to be new ImagesLoaded()
        if (!(this instanceof ImagesLoaded)) return new ImagesLoaded(elem, options, onAlways);
        // use elem as selector string
        var queryElem = elem;
        if (typeof elem == "string") queryElem = document.querySelectorAll(elem);
        // bail if bad element
        if (!queryElem) {
            console.error("Bad element for imagesLoaded " + (queryElem || elem));
            return;
        }
        this.elements = makeArray(queryElem);
        this.options = extend({}, this.options);
        // shift arguments if no options set
        if (typeof options == "function") onAlways = options;
        else extend(this.options, options);
        if (onAlways) this.on("always", onAlways);
        this.getImages();
        if ($) // add jQuery Deferred object
        this.jqDeferred = new $.Deferred();
        // HACK check async to allow time to bind listeners
        setTimeout(this.check.bind(this));
    }
    ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
    ImagesLoaded.prototype.options = {};
    ImagesLoaded.prototype.getImages = function() {
        this.images = [];
        // filter & find items if we have an item selector
        this.elements.forEach(this.addElementImages, this);
    };
    /**
 * @param {Node} element
 */ ImagesLoaded.prototype.addElementImages = function(elem) {
        // filter siblings
        if (elem.nodeName == "IMG") this.addImage(elem);
        // get background image on element
        if (this.options.background === true) this.addElementBackgroundImages(elem);
        // find children
        // no non-element nodes, #143
        var nodeType = elem.nodeType;
        if (!nodeType || !elementNodeTypes[nodeType]) return;
        var childImgs = elem.querySelectorAll("img");
        // concat childElems to filterFound array
        for(var i = 0; i < childImgs.length; i++){
            var img = childImgs[i];
            this.addImage(img);
        }
        // get child background images
        if (typeof this.options.background == "string") {
            var children = elem.querySelectorAll(this.options.background);
            for(i = 0; i < children.length; i++){
                var child = children[i];
                this.addElementBackgroundImages(child);
            }
        }
    };
    var elementNodeTypes = {
        1: true,
        9: true,
        11: true
    };
    ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
        var style = getComputedStyle(elem);
        if (!style) // Firefox returns null if in a hidden iframe https://bugzil.la/548397
        return;
        // get url inside url("...")
        var reURL = /url\((['"])?(.*?)\1\)/gi;
        var matches = reURL.exec(style.backgroundImage);
        while(matches !== null){
            var url = matches && matches[2];
            if (url) this.addBackground(url, elem);
            matches = reURL.exec(style.backgroundImage);
        }
    };
    /**
 * @param {Image} img
 */ ImagesLoaded.prototype.addImage = function(img) {
        var loadingImage = new LoadingImage(img);
        this.images.push(loadingImage);
    };
    ImagesLoaded.prototype.addBackground = function(url, elem) {
        var background = new Background(url, elem);
        this.images.push(background);
    };
    ImagesLoaded.prototype.check = function() {
        var _this = this;
        this.progressedCount = 0;
        this.hasAnyBroken = false;
        // complete if no images
        if (!this.images.length) {
            this.complete();
            return;
        }
        function onProgress(image, elem, message) {
            // HACK - Chrome triggers event before object properties have changed. #83
            setTimeout(function() {
                _this.progress(image, elem, message);
            });
        }
        this.images.forEach(function(loadingImage) {
            loadingImage.once("progress", onProgress);
            loadingImage.check();
        });
    };
    ImagesLoaded.prototype.progress = function(image, elem, message) {
        this.progressedCount++;
        this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
        // progress event
        this.emitEvent("progress", [
            this,
            image,
            elem
        ]);
        if (this.jqDeferred && this.jqDeferred.notify) this.jqDeferred.notify(this, image);
        // check if completed
        if (this.progressedCount == this.images.length) this.complete();
        if (this.options.debug && console) console.log("progress: " + message, image, elem);
    };
    ImagesLoaded.prototype.complete = function() {
        var eventName = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = true;
        this.emitEvent(eventName, [
            this
        ]);
        this.emitEvent("always", [
            this
        ]);
        if (this.jqDeferred) {
            var jqMethod = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[jqMethod](this);
        }
    };
    // --------------------------  -------------------------- //
    function LoadingImage(img) {
        this.img = img;
    }
    LoadingImage.prototype = Object.create(EvEmitter.prototype);
    LoadingImage.prototype.check = function() {
        // If complete is true and browser supports natural sizes,
        // try to check for image status manually.
        var isComplete = this.getIsImageComplete();
        if (isComplete) {
            // report based on naturalWidth
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return;
        }
        // If none of the checks above matched, simulate loading on detached element.
        this.proxyImage = new Image();
        this.proxyImage.addEventListener("load", this);
        this.proxyImage.addEventListener("error", this);
        // bind to image as well for Firefox. #191
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.proxyImage.src = this.img.src;
    };
    LoadingImage.prototype.getIsImageComplete = function() {
        // check for non-zero, non-undefined naturalWidth
        // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
        return this.img.complete && this.img.naturalWidth;
    };
    LoadingImage.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        this.emitEvent("progress", [
            this,
            this.img,
            message
        ]);
    };
    // ----- events ----- //
    // trigger specified handler for event type
    LoadingImage.prototype.handleEvent = function(event) {
        var method = "on" + event.type;
        if (this[method]) this[method](event);
    };
    LoadingImage.prototype.onload = function() {
        this.confirm(true, "onload");
        this.unbindEvents();
    };
    LoadingImage.prototype.onerror = function() {
        this.confirm(false, "onerror");
        this.unbindEvents();
    };
    LoadingImage.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this);
        this.proxyImage.removeEventListener("error", this);
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
    };
    // -------------------------- Background -------------------------- //
    function Background(url, element) {
        this.url = url;
        this.element = element;
        this.img = new Image();
    }
    // inherit LoadingImage prototype
    Background.prototype = Object.create(LoadingImage.prototype);
    Background.prototype.check = function() {
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.img.src = this.url;
        // check if image is already complete
        var isComplete = this.getIsImageComplete();
        if (isComplete) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            this.unbindEvents();
        }
    };
    Background.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
    };
    Background.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        this.emitEvent("progress", [
            this,
            this.element,
            message
        ]);
    };
    // -------------------------- jQuery -------------------------- //
    ImagesLoaded.makeJQueryPlugin = function(jQuery) {
        jQuery = jQuery || window1.jQuery;
        if (!jQuery) return;
        // set local variable
        $ = jQuery;
        // $().imagesLoaded()
        $.fn.imagesLoaded = function(options, callback) {
            var instance = new ImagesLoaded(this, options, callback);
            return instance.jqDeferred.promise($(this));
        };
    };
    // try making plugin
    ImagesLoaded.makeJQueryPlugin();
    // --------------------------  -------------------------- //
    return ImagesLoaded;
});


// Preload images
const $1d4ed6463d272e8f$export$6b05b21262ec0515 = (selector = "img")=>{
    return new Promise((resolve)=>{
        $ced5eaecaf500aa3$exports(document.querySelectorAll(selector), {
            background: true
        }, resolve);
    });
};
const $1d4ed6463d272e8f$export$48a16acaeda4ce0e = ()=>{
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};
const $1d4ed6463d272e8f$export$6316de36b68d6b40 = (el)=>{
    var rect = el.getBoundingClientRect();
    var style = getComputedStyle(el);
    var tx = style.transform;
    if (tx) {
        var sx, sy, dx, dy;
        if (tx.startsWith("matrix3d(")) {
            var ta = tx.slice(9, -1).split(/, /);
            sx = +ta[0];
            sy = +ta[5];
            dx = +ta[12];
            dy = +ta[13];
        } else if (tx.startsWith("matrix(")) {
            var ta = tx.slice(7, -1).split(/, /);
            sx = +ta[0];
            sy = +ta[3];
            dx = +ta[4];
            dy = +ta[5];
        } else return rect;
        var to = style.transformOrigin;
        var x = rect.x - dx - (1 - sx) * parseFloat(to);
        var y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
        var w = sx ? rect.width / sx : el.offsetWidth;
        var h = sy ? rect.height / sy : el.offsetHeight;
        return {
            x: x,
            y: y,
            width: w,
            height: h,
            top: y,
            right: x + w,
            bottom: y + h,
            left: x
        };
    } else return rect;
};



/* locomotive-scroll v4.1.3 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */ function $a4dc55fe1a84241d$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $a4dc55fe1a84241d$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $a4dc55fe1a84241d$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $a4dc55fe1a84241d$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $a4dc55fe1a84241d$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}
function $a4dc55fe1a84241d$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $a4dc55fe1a84241d$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $a4dc55fe1a84241d$var$_objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) $a4dc55fe1a84241d$var$ownKeys(Object(source), true).forEach(function(key) {
            $a4dc55fe1a84241d$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $a4dc55fe1a84241d$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $a4dc55fe1a84241d$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) $a4dc55fe1a84241d$var$_setPrototypeOf(subClass, superClass);
}
function $a4dc55fe1a84241d$var$_getPrototypeOf(o) {
    $a4dc55fe1a84241d$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $a4dc55fe1a84241d$var$_getPrototypeOf(o);
}
function $a4dc55fe1a84241d$var$_setPrototypeOf(o, p) {
    $a4dc55fe1a84241d$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $a4dc55fe1a84241d$var$_setPrototypeOf(o, p);
}
function $a4dc55fe1a84241d$var$_isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function $a4dc55fe1a84241d$var$_assertThisInitialized(self1) {
    if (self1 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self1;
}
function $a4dc55fe1a84241d$var$_possibleConstructorReturn(self1, call) {
    if (call && (typeof call === "object" || typeof call === "function")) return call;
    return $a4dc55fe1a84241d$var$_assertThisInitialized(self1);
}
function $a4dc55fe1a84241d$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $a4dc55fe1a84241d$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = $a4dc55fe1a84241d$var$_getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $a4dc55fe1a84241d$var$_getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $a4dc55fe1a84241d$var$_possibleConstructorReturn(this, result);
    };
}
function $a4dc55fe1a84241d$var$_superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = $a4dc55fe1a84241d$var$_getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
function $a4dc55fe1a84241d$var$_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) $a4dc55fe1a84241d$var$_get = Reflect.get;
    else $a4dc55fe1a84241d$var$_get = function _get(target, property, receiver) {
        var base = $a4dc55fe1a84241d$var$_superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) return desc.get.call(receiver);
        return desc.value;
    };
    return $a4dc55fe1a84241d$var$_get(target, property, receiver || target);
}
function $a4dc55fe1a84241d$var$_slicedToArray(arr, i) {
    return $a4dc55fe1a84241d$var$_arrayWithHoles(arr) || $a4dc55fe1a84241d$var$_iterableToArrayLimit(arr, i) || $a4dc55fe1a84241d$var$_unsupportedIterableToArray(arr, i) || $a4dc55fe1a84241d$var$_nonIterableRest();
}
function $a4dc55fe1a84241d$var$_toConsumableArray(arr) {
    return $a4dc55fe1a84241d$var$_arrayWithoutHoles(arr) || $a4dc55fe1a84241d$var$_iterableToArray(arr) || $a4dc55fe1a84241d$var$_unsupportedIterableToArray(arr) || $a4dc55fe1a84241d$var$_nonIterableSpread();
}
function $a4dc55fe1a84241d$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $a4dc55fe1a84241d$var$_arrayLikeToArray(arr);
}
function $a4dc55fe1a84241d$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function $a4dc55fe1a84241d$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function $a4dc55fe1a84241d$var$_iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function $a4dc55fe1a84241d$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $a4dc55fe1a84241d$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $a4dc55fe1a84241d$var$_arrayLikeToArray(o, minLen);
}
function $a4dc55fe1a84241d$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $a4dc55fe1a84241d$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $a4dc55fe1a84241d$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var $a4dc55fe1a84241d$var$defaults = {
    el: document,
    name: "scroll",
    offset: [
        0,
        0
    ],
    repeat: false,
    smooth: false,
    initPosition: {
        x: 0,
        y: 0
    },
    direction: "vertical",
    gestureDirection: "vertical",
    reloadOnContextChange: false,
    lerp: 0.1,
    "class": "is-inview",
    scrollbarContainer: false,
    scrollbarClass: "c-scrollbar",
    scrollingClass: "has-scroll-scrolling",
    draggingClass: "has-scroll-dragging",
    smoothClass: "has-scroll-smooth",
    initClass: "has-scroll-init",
    getSpeed: false,
    getDirection: false,
    scrollFromAnywhere: false,
    multiplier: 1,
    firefoxMultiplier: 50,
    touchMultiplier: 2,
    resetNativeScroll: true,
    tablet: {
        smooth: false,
        direction: "vertical",
        gestureDirection: "vertical",
        breakpoint: 1024
    },
    smartphone: {
        smooth: false,
        direction: "vertical",
        gestureDirection: "vertical"
    }
};
var $a4dc55fe1a84241d$var$_default = /*#__PURE__*/ function() {
    function _default() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        $a4dc55fe1a84241d$var$_classCallCheck(this, _default);
        Object.assign(this, $a4dc55fe1a84241d$var$defaults, options);
        this.smartphone = $a4dc55fe1a84241d$var$defaults.smartphone;
        if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
        this.tablet = $a4dc55fe1a84241d$var$defaults.tablet;
        if (options.tablet) Object.assign(this.tablet, options.tablet);
        this.namespace = "locomotive";
        this.html = document.documentElement;
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.windowMiddle = {
            x: this.windowWidth / 2,
            y: this.windowHeight / 2
        };
        this.els = {};
        this.currentElements = {};
        this.listeners = {};
        this.hasScrollTicking = false;
        this.hasCallEventSet = false;
        this.checkScroll = this.checkScroll.bind(this);
        this.checkResize = this.checkResize.bind(this);
        this.checkEvent = this.checkEvent.bind(this);
        this.instance = {
            scroll: {
                x: 0,
                y: 0
            },
            limit: {
                x: this.html.offsetWidth,
                y: this.html.offsetHeight
            },
            currentElements: this.currentElements
        };
        if (this.isMobile) {
            if (this.isTablet) this.context = "tablet";
            else this.context = "smartphone";
        } else this.context = "desktop";
        if (this.isMobile) this.direction = this[this.context].direction;
        if (this.direction === "horizontal") this.directionAxis = "x";
        else this.directionAxis = "y";
        if (this.getDirection) this.instance.direction = null;
        if (this.getDirection) this.instance.speed = 0;
        this.html.classList.add(this.initClass);
        window.addEventListener("resize", this.checkResize, false);
    }
    $a4dc55fe1a84241d$var$_createClass(_default, [
        {
            key: "init",
            value: function init() {
                this.initEvents();
            }
        },
        {
            key: "checkScroll",
            value: function checkScroll() {
                this.dispatchScroll();
            }
        },
        {
            key: "checkResize",
            value: function checkResize() {
                var _this = this;
                if (!this.resizeTick) {
                    this.resizeTick = true;
                    requestAnimationFrame(function() {
                        _this.resize();
                        _this.resizeTick = false;
                    });
                }
            }
        },
        {
            key: "resize",
            value: function resize() {}
        },
        {
            key: "checkContext",
            value: function checkContext() {
                if (!this.reloadOnContextChange) return;
                this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint;
                this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
                var oldContext = this.context;
                if (this.isMobile) {
                    if (this.isTablet) this.context = "tablet";
                    else this.context = "smartphone";
                } else this.context = "desktop";
                if (oldContext != this.context) {
                    var oldSmooth = oldContext == "desktop" ? this.smooth : this[oldContext].smooth;
                    var newSmooth = this.context == "desktop" ? this.smooth : this[this.context].smooth;
                    if (oldSmooth != newSmooth) window.location.reload();
                }
            }
        },
        {
            key: "initEvents",
            value: function initEvents() {
                var _this2 = this;
                this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"));
                this.setScrollTo = this.setScrollTo.bind(this);
                this.scrollToEls.forEach(function(el) {
                    el.addEventListener("click", _this2.setScrollTo, false);
                });
            }
        },
        {
            key: "setScrollTo",
            value: function setScrollTo(event) {
                event.preventDefault();
                this.scrollTo(event.currentTarget.getAttribute("data-".concat(this.name, "-href")) || event.currentTarget.getAttribute("href"), {
                    offset: event.currentTarget.getAttribute("data-".concat(this.name, "-offset"))
                });
            }
        },
        {
            key: "addElements",
            value: function addElements() {}
        },
        {
            key: "detectElements",
            value: function detectElements(hasCallEventSet) {
                var _this3 = this;
                var scrollTop = this.instance.scroll.y;
                var scrollBottom = scrollTop + this.windowHeight;
                var scrollLeft = this.instance.scroll.x;
                var scrollRight = scrollLeft + this.windowWidth;
                Object.entries(this.els).forEach(function(_ref) {
                    var _ref2 = $a4dc55fe1a84241d$var$_slicedToArray(_ref, 2), i = _ref2[0], el = _ref2[1];
                    if (el && (!el.inView || hasCallEventSet)) {
                        if (_this3.direction === "horizontal") {
                            if (scrollRight >= el.left && scrollLeft < el.right) _this3.setInView(el, i);
                        } else if (scrollBottom >= el.top && scrollTop < el.bottom) _this3.setInView(el, i);
                    }
                    if (el && el.inView) {
                        if (_this3.direction === "horizontal") {
                            var width = el.right - el.left;
                            el.progress = (_this3.instance.scroll.x - (el.left - _this3.windowWidth)) / (width + _this3.windowWidth);
                            if (scrollRight < el.left || scrollLeft > el.right) _this3.setOutOfView(el, i);
                        } else {
                            var height = el.bottom - el.top;
                            el.progress = (_this3.instance.scroll.y - (el.top - _this3.windowHeight)) / (height + _this3.windowHeight);
                            if (scrollBottom < el.top || scrollTop > el.bottom) _this3.setOutOfView(el, i);
                        }
                    }
                }); // this.els = this.els.filter((current, i) => {
                //     return current !== null;
                // });
                this.hasScrollTicking = false;
            }
        },
        {
            key: "setInView",
            value: function setInView(current, i) {
                this.els[i].inView = true;
                current.el.classList.add(current["class"]);
                this.currentElements[i] = current;
                if (current.call && this.hasCallEventSet) {
                    this.dispatchCall(current, "enter");
                    if (!current.repeat) this.els[i].call = false;
                } // if (!current.repeat && !current.speed && !current.sticky) {
            //     if (!current.call || current.call && this.hasCallEventSet) {
            //        this.els[i] = null
            //     }
            // }
            }
        },
        {
            key: "setOutOfView",
            value: function setOutOfView(current, i) {
                var _this4 = this;
                // if (current.repeat || current.speed !== undefined) {
                this.els[i].inView = false; // }
                Object.keys(this.currentElements).forEach(function(el) {
                    el === i && delete _this4.currentElements[el];
                });
                if (current.call && this.hasCallEventSet) this.dispatchCall(current, "exit");
                if (current.repeat) current.el.classList.remove(current["class"]);
            }
        },
        {
            key: "dispatchCall",
            value: function dispatchCall(current, way) {
                this.callWay = way;
                this.callValue = current.call.split(",").map(function(item) {
                    return item.trim();
                });
                this.callObj = current;
                if (this.callValue.length == 1) this.callValue = this.callValue[0];
                var callEvent = new Event(this.namespace + "call");
                this.el.dispatchEvent(callEvent);
            }
        },
        {
            key: "dispatchScroll",
            value: function dispatchScroll() {
                var scrollEvent = new Event(this.namespace + "scroll");
                this.el.dispatchEvent(scrollEvent);
            }
        },
        {
            key: "setEvents",
            value: function setEvents(event, func) {
                if (!this.listeners[event]) this.listeners[event] = [];
                var list = this.listeners[event];
                list.push(func);
                if (list.length === 1) this.el.addEventListener(this.namespace + event, this.checkEvent, false);
                if (event === "call") {
                    this.hasCallEventSet = true;
                    this.detectElements(true);
                }
            }
        },
        {
            key: "unsetEvents",
            value: function unsetEvents(event, func) {
                if (!this.listeners[event]) return;
                var list = this.listeners[event];
                var index = list.indexOf(func);
                if (index < 0) return;
                list.splice(index, 1);
                if (list.index === 0) this.el.removeEventListener(this.namespace + event, this.checkEvent, false);
            }
        },
        {
            key: "checkEvent",
            value: function checkEvent(event) {
                var _this5 = this;
                var name = event.type.replace(this.namespace, "");
                var list = this.listeners[name];
                if (!list || list.length === 0) return;
                list.forEach(function(func) {
                    switch(name){
                        case "scroll":
                            return func(_this5.instance);
                        case "call":
                            return func(_this5.callValue, _this5.callWay, _this5.callObj);
                        default:
                            return func();
                    }
                });
            }
        },
        {
            key: "startScroll",
            value: function startScroll() {}
        },
        {
            key: "stopScroll",
            value: function stopScroll() {}
        },
        {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.instance.scroll = {
                    x: 0,
                    y: 0
                };
            }
        },
        {
            key: "destroy",
            value: function destroy() {
                var _this6 = this;
                window.removeEventListener("resize", this.checkResize, false);
                Object.keys(this.listeners).forEach(function(event) {
                    _this6.el.removeEventListener(_this6.namespace + event, _this6.checkEvent, false);
                });
                this.listeners = {};
                this.scrollToEls.forEach(function(el) {
                    el.removeEventListener("click", _this6.setScrollTo, false);
                });
                this.html.classList.remove(this.initClass);
            }
        }
    ]);
    return _default;
}();
var $a4dc55fe1a84241d$var$commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof $parcel$global !== "undefined" ? $parcel$global : typeof self !== "undefined" ? self : {};
function $a4dc55fe1a84241d$var$createCommonjsModule(fn, module) {
    return module = {
        exports: {}
    }, fn(module, module.exports), module.exports;
}
var $a4dc55fe1a84241d$var$smoothscroll = $a4dc55fe1a84241d$var$createCommonjsModule(function(module, exports) {
    /* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */ (function() {
        // polyfill
        function polyfill() {
            // aliases
            var w = window;
            var d = document;
            // return if scroll behavior is supported and polyfill is not forced
            if ("scrollBehavior" in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) return;
            // globals
            var Element = w.HTMLElement || w.Element;
            var SCROLL_TIME = 468;
            // object gathering original scroll methods
            var original = {
                scroll: w.scroll || w.scrollTo,
                scrollBy: w.scrollBy,
                elementScroll: Element.prototype.scroll || scrollElement,
                scrollIntoView: Element.prototype.scrollIntoView
            };
            // define timing method
            var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;
            /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */ function isMicrosoftBrowser(userAgent) {
                var userAgentPatterns = [
                    "MSIE ",
                    "Trident/",
                    "Edge/"
                ];
                return new RegExp(userAgentPatterns.join("|")).test(userAgent);
            }
            /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */ var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;
            /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */ function scrollElement(x, y) {
                this.scrollLeft = x;
                this.scrollTop = y;
            }
            /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */ function ease(k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            }
            /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */ function shouldBailOut(firstArg) {
                if (firstArg === null || typeof firstArg !== "object" || firstArg.behavior === undefined || firstArg.behavior === "auto" || firstArg.behavior === "instant") // first argument is not an object/null
                // or behavior is auto, instant or undefined
                return true;
                if (typeof firstArg === "object" && firstArg.behavior === "smooth") // first argument is an object and behavior is smooth
                return false;
                // throw error when behavior is not supported
                throw new TypeError("behavior member of ScrollOptions " + firstArg.behavior + " is not a valid value for enumeration ScrollBehavior.");
            }
            /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */ function hasScrollableSpace(el, axis) {
                if (axis === "Y") return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
                if (axis === "X") return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
            }
            /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */ function canOverflow(el, axis) {
                var overflowValue = w.getComputedStyle(el, null)["overflow" + axis];
                return overflowValue === "auto" || overflowValue === "scroll";
            }
            /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */ function isScrollable(el) {
                var isScrollableY = hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
                var isScrollableX = hasScrollableSpace(el, "X") && canOverflow(el, "X");
                return isScrollableY || isScrollableX;
            }
            /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */ function findScrollableParent(el) {
                while(el !== d.body && isScrollable(el) === false)el = el.parentNode || el.host;
                return el;
            }
            /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */ function step(context) {
                var time = now();
                var value;
                var currentX;
                var currentY;
                var elapsed = (time - context.startTime) / SCROLL_TIME;
                // avoid elapsed times higher than one
                elapsed = elapsed > 1 ? 1 : elapsed;
                // apply easing to elapsed time
                value = ease(elapsed);
                currentX = context.startX + (context.x - context.startX) * value;
                currentY = context.startY + (context.y - context.startY) * value;
                context.method.call(context.scrollable, currentX, currentY);
                // scroll more if we have not reached our destination
                if (currentX !== context.x || currentY !== context.y) w.requestAnimationFrame(step.bind(w, context));
            }
            /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */ function smoothScroll(el, x, y) {
                var scrollable;
                var startX;
                var startY;
                var method;
                var startTime = now();
                // define scroll context
                if (el === d.body) {
                    scrollable = w;
                    startX = w.scrollX || w.pageXOffset;
                    startY = w.scrollY || w.pageYOffset;
                    method = original.scroll;
                } else {
                    scrollable = el;
                    startX = el.scrollLeft;
                    startY = el.scrollTop;
                    method = scrollElement;
                }
                // scroll looping over a frame
                step({
                    scrollable: scrollable,
                    method: method,
                    startTime: startTime,
                    startX: startX,
                    startY: startY,
                    x: x,
                    y: y
                });
            }
            // ORIGINAL METHODS OVERRIDES
            // w.scroll and w.scrollTo
            w.scroll = w.scrollTo = function() {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) return;
                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                    original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : typeof arguments[0] !== "object" ? arguments[0] : w.scrollX || w.pageXOffset, // use top prop, second argument if present or fallback to scrollY
                    arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);
                    return;
                }
                // LET THE SMOOTHNESS BEGIN!
                smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
            };
            // w.scrollBy
            w.scrollBy = function() {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) return;
                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0])) {
                    original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : typeof arguments[0] !== "object" ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);
                    return;
                }
                // LET THE SMOOTHNESS BEGIN!
                smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
            };
            // Element.prototype.scroll and Element.prototype.scrollTo
            Element.prototype.scroll = Element.prototype.scrollTo = function() {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) return;
                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                    // if one number is passed, throw error to match Firefox implementation
                    if (typeof arguments[0] === "number" && arguments[1] === undefined) throw new SyntaxError("Value could not be converted");
                    original.elementScroll.call(this, // use left prop, first number argument or fallback to scrollLeft
                    arguments[0].left !== undefined ? ~~arguments[0].left : typeof arguments[0] !== "object" ? ~~arguments[0] : this.scrollLeft, // use top prop, second argument or fallback to scrollTop
                    arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);
                    return;
                }
                var left = arguments[0].left;
                var top = arguments[0].top;
                // LET THE SMOOTHNESS BEGIN!
                smoothScroll.call(this, this, typeof left === "undefined" ? this.scrollLeft : ~~left, typeof top === "undefined" ? this.scrollTop : ~~top);
            };
            // Element.prototype.scrollBy
            Element.prototype.scrollBy = function() {
                // avoid action when no arguments are passed
                if (arguments[0] === undefined) return;
                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                    original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
                    return;
                }
                this.scroll({
                    left: ~~arguments[0].left + this.scrollLeft,
                    top: ~~arguments[0].top + this.scrollTop,
                    behavior: arguments[0].behavior
                });
            };
            // Element.prototype.scrollIntoView
            Element.prototype.scrollIntoView = function() {
                // avoid smooth behavior if not required
                if (shouldBailOut(arguments[0]) === true) {
                    original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);
                    return;
                }
                // LET THE SMOOTHNESS BEGIN!
                var scrollableParent = findScrollableParent(this);
                var parentRects = scrollableParent.getBoundingClientRect();
                var clientRects = this.getBoundingClientRect();
                if (scrollableParent !== d.body) {
                    // reveal element inside parent
                    smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);
                    // reveal parent in viewport unless is fixed
                    if (w.getComputedStyle(scrollableParent).position !== "fixed") w.scrollBy({
                        left: parentRects.left,
                        top: parentRects.top,
                        behavior: "smooth"
                    });
                } else // reveal element in viewport
                w.scrollBy({
                    left: clientRects.left,
                    top: clientRects.top,
                    behavior: "smooth"
                });
            };
        }
        // commonjs
        module.exports = {
            polyfill: polyfill
        };
    })();
});
var $a4dc55fe1a84241d$var$smoothscroll_1 = $a4dc55fe1a84241d$var$smoothscroll.polyfill;
var $a4dc55fe1a84241d$var$_default$1 = /*#__PURE__*/ function(_Core) {
    $a4dc55fe1a84241d$var$_inherits(_default, _Core);
    var _super = $a4dc55fe1a84241d$var$_createSuper(_default);
    function _default() {
        var _this;
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        $a4dc55fe1a84241d$var$_classCallCheck(this, _default);
        _this = _super.call(this, options);
        if (_this.resetNativeScroll) {
            if (history.scrollRestoration) history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
        }
        window.addEventListener("scroll", _this.checkScroll, false);
        if (window.smoothscrollPolyfill === undefined) {
            window.smoothscrollPolyfill = $a4dc55fe1a84241d$var$smoothscroll;
            window.smoothscrollPolyfill.polyfill();
        }
        return _this;
    }
    $a4dc55fe1a84241d$var$_createClass(_default, [
        {
            key: "init",
            value: function init() {
                this.instance.scroll.y = window.pageYOffset;
                this.addElements();
                this.detectElements();
                $a4dc55fe1a84241d$var$_get($a4dc55fe1a84241d$var$_getPrototypeOf(_default.prototype), "init", this).call(this);
            }
        },
        {
            key: "checkScroll",
            value: function checkScroll() {
                var _this2 = this;
                $a4dc55fe1a84241d$var$_get($a4dc55fe1a84241d$var$_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);
                if (this.getDirection) this.addDirection();
                if (this.getSpeed) {
                    this.addSpeed();
                    this.speedTs = Date.now();
                }
                this.instance.scroll.y = window.pageYOffset;
                if (Object.entries(this.els).length) {
                    if (!this.hasScrollTicking) {
                        requestAnimationFrame(function() {
                            _this2.detectElements();
                        });
                        this.hasScrollTicking = true;
                    }
                }
            }
        },
        {
            key: "addDirection",
            value: function addDirection() {
                if (window.pageYOffset > this.instance.scroll.y) {
                    if (this.instance.direction !== "down") this.instance.direction = "down";
                } else if (window.pageYOffset < this.instance.scroll.y) {
                    if (this.instance.direction !== "up") this.instance.direction = "up";
                }
            }
        },
        {
            key: "addSpeed",
            value: function addSpeed() {
                if (window.pageYOffset != this.instance.scroll.y) this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs);
                else this.instance.speed = 0;
            }
        },
        {
            key: "resize",
            value: function resize() {
                if (Object.entries(this.els).length) {
                    this.windowHeight = window.innerHeight;
                    this.updateElements();
                }
            }
        },
        {
            key: "addElements",
            value: function addElements() {
                var _this3 = this;
                this.els = {};
                var els = this.el.querySelectorAll("[data-" + this.name + "]");
                els.forEach(function(el, index) {
                    var BCR = el.getBoundingClientRect();
                    var cl = el.dataset[_this3.name + "Class"] || _this3["class"];
                    var id = typeof el.dataset[_this3.name + "Id"] === "string" ? el.dataset[_this3.name + "Id"] : index;
                    var top;
                    var left;
                    var offset = typeof el.dataset[_this3.name + "Offset"] === "string" ? el.dataset[_this3.name + "Offset"].split(",") : _this3.offset;
                    var repeat = el.dataset[_this3.name + "Repeat"];
                    var call = el.dataset[_this3.name + "Call"];
                    var target = el.dataset[_this3.name + "Target"];
                    var targetEl;
                    if (target !== undefined) targetEl = document.querySelector("".concat(target));
                    else targetEl = el;
                    var targetElBCR = targetEl.getBoundingClientRect();
                    top = targetElBCR.top + _this3.instance.scroll.y;
                    left = targetElBCR.left + _this3.instance.scroll.x;
                    var bottom = top + targetEl.offsetHeight;
                    var right = left + targetEl.offsetWidth;
                    if (repeat == "false") repeat = false;
                    else if (repeat != undefined) repeat = true;
                    else repeat = _this3.repeat;
                    var relativeOffset = _this3.getRelativeOffset(offset);
                    top = top + relativeOffset[0];
                    bottom = bottom - relativeOffset[1];
                    var mappedEl = {
                        el: el,
                        targetEl: targetEl,
                        id: id,
                        "class": cl,
                        top: top,
                        bottom: bottom,
                        left: left,
                        right: right,
                        offset: offset,
                        progress: 0,
                        repeat: repeat,
                        inView: false,
                        call: call
                    };
                    _this3.els[id] = mappedEl;
                    if (el.classList.contains(cl)) _this3.setInView(_this3.els[id], id);
                });
            }
        },
        {
            key: "updateElements",
            value: function updateElements() {
                var _this4 = this;
                Object.entries(this.els).forEach(function(_ref) {
                    var _ref2 = $a4dc55fe1a84241d$var$_slicedToArray(_ref, 2), i = _ref2[0], el = _ref2[1];
                    var top = el.targetEl.getBoundingClientRect().top + _this4.instance.scroll.y;
                    var bottom = top + el.targetEl.offsetHeight;
                    var relativeOffset = _this4.getRelativeOffset(el.offset);
                    _this4.els[i].top = top + relativeOffset[0];
                    _this4.els[i].bottom = bottom - relativeOffset[1];
                });
                this.hasScrollTicking = false;
            }
        },
        {
            key: "getRelativeOffset",
            value: function getRelativeOffset(offset) {
                var relativeOffset = [
                    0,
                    0
                ];
                if (offset) {
                    for(var i = 0; i < offset.length; i++)if (typeof offset[i] == "string") {
                        if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * this.windowHeight / 100);
                        else relativeOffset[i] = parseInt(offset[i]);
                    } else relativeOffset[i] = offset[i];
                }
                return relativeOffset;
            }
        },
        {
            key: "scrollTo",
            value: function scrollTo(target) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                // Parse options
                var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target
                var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)
                if (typeof target === "string") {
                    // Selector or boundaries
                    if (target === "top") target = this.html;
                    else if (target === "bottom") target = this.html.offsetHeight - window.innerHeight;
                    else {
                        target = document.querySelector(target); // If the query fails, abort
                        if (!target) return;
                    }
                } else if (typeof target === "number") // Absolute coordinate
                target = parseInt(target);
                else if (target && target.tagName) ;
                else {
                    console.warn("`target` parameter is not valid");
                    return;
                } // We have a target that is not a coordinate yet, get it
                if (typeof target !== "number") offset = target.getBoundingClientRect().top + offset + this.instance.scroll.y;
                else offset = target + offset;
                var isTargetReached = function isTargetReached() {
                    return parseInt(window.pageYOffset) === parseInt(offset);
                };
                if (callback) {
                    if (isTargetReached()) {
                        callback();
                        return;
                    } else {
                        var onScroll = function onScroll() {
                            if (isTargetReached()) {
                                window.removeEventListener("scroll", onScroll);
                                callback();
                            }
                        };
                        window.addEventListener("scroll", onScroll);
                    }
                }
                window.scrollTo({
                    top: offset,
                    behavior: options.duration === 0 ? "auto" : "smooth"
                });
            }
        },
        {
            key: "update",
            value: function update() {
                this.addElements();
                this.detectElements();
            }
        },
        {
            key: "destroy",
            value: function destroy() {
                $a4dc55fe1a84241d$var$_get($a4dc55fe1a84241d$var$_getPrototypeOf(_default.prototype), "destroy", this).call(this);
                window.removeEventListener("scroll", this.checkScroll, false);
            }
        }
    ]);
    return _default;
}($a4dc55fe1a84241d$var$_default);
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ /* eslint-disable no-unused-vars */ var $a4dc55fe1a84241d$var$getOwnPropertySymbols = Object.getOwnPropertySymbols;
var $a4dc55fe1a84241d$var$hasOwnProperty = Object.prototype.hasOwnProperty;
var $a4dc55fe1a84241d$var$propIsEnumerable = Object.prototype.propertyIsEnumerable;
function $a4dc55fe1a84241d$var$toObject(val) {
    if (val === null || val === undefined) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(val);
}
function $a4dc55fe1a84241d$var$shouldUseNative() {
    try {
        if (!Object.assign) return false;
        // Detect buggy property enumeration order in older V8 versions.
        // https://bugs.chromium.org/p/v8/issues/detail?id=4118
        var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") return false;
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test2 = {};
        for(var i = 0; i < 10; i++)test2["_" + String.fromCharCode(i)] = i;
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
        });
        if (order2.join("") !== "0123456789") return false;
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") return false;
        return true;
    } catch (err) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
    }
}
var $a4dc55fe1a84241d$var$objectAssign = $a4dc55fe1a84241d$var$shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = $a4dc55fe1a84241d$var$toObject(target);
    var symbols;
    for(var s = 1; s < arguments.length; s++){
        from = Object(arguments[s]);
        for(var key in from)if ($a4dc55fe1a84241d$var$hasOwnProperty.call(from, key)) to[key] = from[key];
        if ($a4dc55fe1a84241d$var$getOwnPropertySymbols) {
            symbols = $a4dc55fe1a84241d$var$getOwnPropertySymbols(from);
            for(var i = 0; i < symbols.length; i++)if ($a4dc55fe1a84241d$var$propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
        }
    }
    return to;
};
function $a4dc55fe1a84241d$var$E() {
// Keep this empty so it's easier to inherit from
// (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}
$a4dc55fe1a84241d$var$E.prototype = {
    on: function(name, callback, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx
        });
        return this;
    },
    once: function(name, callback, ctx) {
        var self1 = this;
        function listener() {
            self1.off(name, listener);
            callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
    },
    emit: function(name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for(i; i < len; i++)evtArr[i].fn.apply(evtArr[i].ctx, data);
        return this;
    },
    off: function(name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];
        if (evts && callback) {
            for(var i = 0, len = evts.length; i < len; i++)if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
        }
        // Remove event from queue to prevent memory leak
        // Suggested by https://github.com/lazd
        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
        liveEvents.length ? e[name] = liveEvents : delete e[name];
        return this;
    }
};
var $a4dc55fe1a84241d$var$tinyEmitter = $a4dc55fe1a84241d$var$E;
var $a4dc55fe1a84241d$var$lethargy = $a4dc55fe1a84241d$var$createCommonjsModule(function(module, exports) {
    // Generated by CoffeeScript 1.9.2
    (function() {
        var root;
        root = exports !== null ? exports : this;
        root.Lethargy = function() {
            function Lethargy(stability, sensitivity, tolerance, delay) {
                this.stability = stability != null ? Math.abs(stability) : 8;
                this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
                this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
                this.delay = delay != null ? delay : 150;
                this.lastUpDeltas = (function() {
                    var i, ref, results;
                    results = [];
                    for(i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--)results.push(null);
                    return results;
                }).call(this);
                this.lastDownDeltas = (function() {
                    var i, ref, results;
                    results = [];
                    for(i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--)results.push(null);
                    return results;
                }).call(this);
                this.deltasTimestamp = (function() {
                    var i, ref, results;
                    results = [];
                    for(i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--)results.push(null);
                    return results;
                }).call(this);
            }
            Lethargy.prototype.check = function(e) {
                var lastDelta;
                e = e.originalEvent || e;
                if (e.wheelDelta != null) lastDelta = e.wheelDelta;
                else if (e.deltaY != null) lastDelta = e.deltaY * -40;
                else if (e.detail != null || e.detail === 0) lastDelta = e.detail * -40;
                this.deltasTimestamp.push(Date.now());
                this.deltasTimestamp.shift();
                if (lastDelta > 0) {
                    this.lastUpDeltas.push(lastDelta);
                    this.lastUpDeltas.shift();
                    return this.isInertia(1);
                } else {
                    this.lastDownDeltas.push(lastDelta);
                    this.lastDownDeltas.shift();
                    return this.isInertia(-1);
                }
            };
            Lethargy.prototype.isInertia = function(direction) {
                var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
                lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
                if (lastDeltas[0] === null) return direction;
                if (this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[this.stability * 2 - 1]) return false;
                lastDeltasOld = lastDeltas.slice(0, this.stability);
                lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
                oldSum = lastDeltasOld.reduce(function(t, s) {
                    return t + s;
                });
                newSum = lastDeltasNew.reduce(function(t, s) {
                    return t + s;
                });
                oldAverage = oldSum / lastDeltasOld.length;
                newAverage = newSum / lastDeltasNew.length;
                if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && this.sensitivity < Math.abs(newAverage)) return direction;
                else return false;
            };
            Lethargy.prototype.showLastUpDeltas = function() {
                return this.lastUpDeltas;
            };
            Lethargy.prototype.showLastDownDeltas = function() {
                return this.lastDownDeltas;
            };
            return Lethargy;
        }();
    }).call($a4dc55fe1a84241d$var$commonjsGlobal);
});
var $a4dc55fe1a84241d$var$support = function getSupport() {
    return {
        hasWheelEvent: "onwheel" in document,
        hasMouseWheelEvent: "onmousewheel" in document,
        hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
        hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
        hasPointer: !!window.navigator.msPointerEnabled,
        hasKeyDown: "onkeydown" in document,
        isFirefox: navigator.userAgent.indexOf("Firefox") > -1
    };
}();
var $a4dc55fe1a84241d$var$toString = Object.prototype.toString, $a4dc55fe1a84241d$var$hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var $a4dc55fe1a84241d$var$bindallStandalone = function(object) {
    if (!object) return console.warn("bindAll requires at least one argument.");
    var functions = Array.prototype.slice.call(arguments, 1);
    if (functions.length === 0) for(var method in object){
        if ($a4dc55fe1a84241d$var$hasOwnProperty$1.call(object, method)) {
            if (typeof object[method] == "function" && $a4dc55fe1a84241d$var$toString.call(object[method]) == "[object Function]") functions.push(method);
        }
    }
    for(var i = 0; i < functions.length; i++){
        var f = functions[i];
        object[f] = $a4dc55fe1a84241d$var$bind(object[f], object);
    }
};
/*
    Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
    bindAll is only needed for events binding so no need to make slow fixes for constructor
    or partial application.
*/ function $a4dc55fe1a84241d$var$bind(func, context) {
    return function() {
        return func.apply(context, arguments);
    };
}
var $a4dc55fe1a84241d$var$Lethargy = $a4dc55fe1a84241d$var$lethargy.Lethargy;
var $a4dc55fe1a84241d$var$EVT_ID = "virtualscroll";
var $a4dc55fe1a84241d$var$src = $a4dc55fe1a84241d$var$VirtualScroll;
var $a4dc55fe1a84241d$var$keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32
};
function $a4dc55fe1a84241d$var$VirtualScroll(options) {
    $a4dc55fe1a84241d$var$bindallStandalone(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown");
    this.el = window;
    if (options && options.el) {
        this.el = options.el;
        delete options.el;
    }
    this.options = $a4dc55fe1a84241d$var$objectAssign({
        mouseMultiplier: 1,
        touchMultiplier: 2,
        firefoxMultiplier: 15,
        keyStep: 120,
        preventTouch: false,
        unpreventTouchClass: "vs-touchmove-allowed",
        limitInertia: false,
        useKeyboard: true,
        useTouch: true
    }, options);
    if (this.options.limitInertia) this._lethargy = new $a4dc55fe1a84241d$var$Lethargy();
    this._emitter = new $a4dc55fe1a84241d$var$tinyEmitter();
    this._event = {
        y: 0,
        x: 0,
        deltaX: 0,
        deltaY: 0
    };
    this.touchStartX = null;
    this.touchStartY = null;
    this.bodyTouchAction = null;
    if (this.options.passive !== undefined) this.listenerOptions = {
        passive: this.options.passive
    };
}
$a4dc55fe1a84241d$var$VirtualScroll.prototype._notify = function(e) {
    var evt = this._event;
    evt.x += evt.deltaX;
    evt.y += evt.deltaY;
    this._emitter.emit($a4dc55fe1a84241d$var$EVT_ID, {
        x: evt.x,
        y: evt.y,
        deltaX: evt.deltaX,
        deltaY: evt.deltaY,
        originalEvent: e
    });
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype._onWheel = function(e) {
    var options = this.options;
    if (this._lethargy && this._lethargy.check(e) === false) return;
    var evt = this._event;
    // In Chrome and in Firefox (at least the new one)
    evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
    // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
    if ($a4dc55fe1a84241d$var$support.isFirefox && e.deltaMode == 1) {
        evt.deltaX *= options.firefoxMultiplier;
        evt.deltaY *= options.firefoxMultiplier;
    }
    evt.deltaX *= options.mouseMultiplier;
    evt.deltaY *= options.mouseMultiplier;
    this._notify(e);
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype._onMouseWheel = function(e) {
    if (this.options.limitInertia && this._lethargy.check(e) === false) return;
    var evt = this._event;
    // In Safari, IE and in Chrome if 'wheel' isn't defined
    evt.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0;
    evt.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;
    this._notify(e);
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype._onTouchStart = function(e) {
    var t = e.targetTouches ? e.targetTouches[0] : e;
    this.touchStartX = t.pageX;
    this.touchStartY = t.pageY;
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype._onTouchMove = function(e) {
    var options = this.options;
    if (options.preventTouch && !e.target.classList.contains(options.unpreventTouchClass)) e.preventDefault();
    var evt = this._event;
    var t = e.targetTouches ? e.targetTouches[0] : e;
    evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
    evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;
    this.touchStartX = t.pageX;
    this.touchStartY = t.pageY;
    this._notify(e);
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype._onKeyDown = function(e) {
    var evt = this._event;
    evt.deltaX = evt.deltaY = 0;
    var windowHeight = window.innerHeight - 40;
    switch(e.keyCode){
        case $a4dc55fe1a84241d$var$keyCodes.LEFT:
        case $a4dc55fe1a84241d$var$keyCodes.UP:
            evt.deltaY = this.options.keyStep;
            break;
        case $a4dc55fe1a84241d$var$keyCodes.RIGHT:
        case $a4dc55fe1a84241d$var$keyCodes.DOWN:
            evt.deltaY = -this.options.keyStep;
            break;
        case e.shiftKey:
            evt.deltaY = windowHeight;
            break;
        case $a4dc55fe1a84241d$var$keyCodes.SPACE:
            evt.deltaY = -windowHeight;
            break;
        default:
            return;
    }
    this._notify(e);
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype._bind = function() {
    if ($a4dc55fe1a84241d$var$support.hasWheelEvent) this.el.addEventListener("wheel", this._onWheel, this.listenerOptions);
    if ($a4dc55fe1a84241d$var$support.hasMouseWheelEvent) this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions);
    if ($a4dc55fe1a84241d$var$support.hasTouch && this.options.useTouch) {
        this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions);
        this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions);
    }
    if ($a4dc55fe1a84241d$var$support.hasPointer && $a4dc55fe1a84241d$var$support.hasTouchWin) {
        this.bodyTouchAction = document.body.style.msTouchAction;
        document.body.style.msTouchAction = "none";
        this.el.addEventListener("MSPointerDown", this._onTouchStart, true);
        this.el.addEventListener("MSPointerMove", this._onTouchMove, true);
    }
    if ($a4dc55fe1a84241d$var$support.hasKeyDown && this.options.useKeyboard) document.addEventListener("keydown", this._onKeyDown);
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype._unbind = function() {
    if ($a4dc55fe1a84241d$var$support.hasWheelEvent) this.el.removeEventListener("wheel", this._onWheel);
    if ($a4dc55fe1a84241d$var$support.hasMouseWheelEvent) this.el.removeEventListener("mousewheel", this._onMouseWheel);
    if ($a4dc55fe1a84241d$var$support.hasTouch) {
        this.el.removeEventListener("touchstart", this._onTouchStart);
        this.el.removeEventListener("touchmove", this._onTouchMove);
    }
    if ($a4dc55fe1a84241d$var$support.hasPointer && $a4dc55fe1a84241d$var$support.hasTouchWin) {
        document.body.style.msTouchAction = this.bodyTouchAction;
        this.el.removeEventListener("MSPointerDown", this._onTouchStart, true);
        this.el.removeEventListener("MSPointerMove", this._onTouchMove, true);
    }
    if ($a4dc55fe1a84241d$var$support.hasKeyDown && this.options.useKeyboard) document.removeEventListener("keydown", this._onKeyDown);
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype.on = function(cb, ctx) {
    this._emitter.on($a4dc55fe1a84241d$var$EVT_ID, cb, ctx);
    var events = this._emitter.e;
    if (events && events[$a4dc55fe1a84241d$var$EVT_ID] && events[$a4dc55fe1a84241d$var$EVT_ID].length === 1) this._bind();
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype.off = function(cb, ctx) {
    this._emitter.off($a4dc55fe1a84241d$var$EVT_ID, cb, ctx);
    var events = this._emitter.e;
    if (!events[$a4dc55fe1a84241d$var$EVT_ID] || events[$a4dc55fe1a84241d$var$EVT_ID].length <= 0) this._unbind();
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype.reset = function() {
    var evt = this._event;
    evt.x = 0;
    evt.y = 0;
};
$a4dc55fe1a84241d$var$VirtualScroll.prototype.destroy = function() {
    this._emitter.off();
    this._unbind();
};
function $a4dc55fe1a84241d$var$lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}
function $a4dc55fe1a84241d$var$getTranslate(el) {
    var translate = {};
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(el);
    var transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
        translate.x = mat ? parseFloat(mat[1].split(", ")[12]) : 0;
        translate.y = mat ? parseFloat(mat[1].split(", ")[13]) : 0;
    } else {
        mat = transform.match(/^matrix\((.+)\)$/);
        translate.x = mat ? parseFloat(mat[1].split(", ")[4]) : 0;
        translate.y = mat ? parseFloat(mat[1].split(", ")[5]) : 0;
    }
    return translate;
}
/**
 * Returns an array containing all the parent nodes of the given node
 * @param  {object} node
 * @return {array} parent nodes
 */ function $a4dc55fe1a84241d$var$getParents(elem) {
    // Set up a parent array
    var parents = []; // Push each parent element to the array
    for(; elem && elem !== document; elem = elem.parentNode)parents.push(elem);
     // Return our parent array
    return parents;
} // https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */ // These values are established by empiricism with tests (tradeoff: performance VS precision)
var $a4dc55fe1a84241d$var$NEWTON_ITERATIONS = 4;
var $a4dc55fe1a84241d$var$NEWTON_MIN_SLOPE = 0.001;
var $a4dc55fe1a84241d$var$SUBDIVISION_PRECISION = 0.0000001;
var $a4dc55fe1a84241d$var$SUBDIVISION_MAX_ITERATIONS = 10;
var $a4dc55fe1a84241d$var$kSplineTableSize = 11;
var $a4dc55fe1a84241d$var$kSampleStepSize = 1.0 / ($a4dc55fe1a84241d$var$kSplineTableSize - 1.0);
var $a4dc55fe1a84241d$var$float32ArraySupported = typeof Float32Array === "function";
function $a4dc55fe1a84241d$var$A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}
function $a4dc55fe1a84241d$var$B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
}
function $a4dc55fe1a84241d$var$C(aA1) {
    return 3.0 * aA1;
}
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function $a4dc55fe1a84241d$var$calcBezier(aT, aA1, aA2) {
    return (($a4dc55fe1a84241d$var$A(aA1, aA2) * aT + $a4dc55fe1a84241d$var$B(aA1, aA2)) * aT + $a4dc55fe1a84241d$var$C(aA1)) * aT;
}
// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function $a4dc55fe1a84241d$var$getSlope(aT, aA1, aA2) {
    return 3.0 * $a4dc55fe1a84241d$var$A(aA1, aA2) * aT * aT + 2.0 * $a4dc55fe1a84241d$var$B(aA1, aA2) * aT + $a4dc55fe1a84241d$var$C(aA1);
}
function $a4dc55fe1a84241d$var$binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = $a4dc55fe1a84241d$var$calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) aB = currentT;
        else aA = currentT;
    }while (Math.abs(currentX) > $a4dc55fe1a84241d$var$SUBDIVISION_PRECISION && ++i < $a4dc55fe1a84241d$var$SUBDIVISION_MAX_ITERATIONS);
    return currentT;
}
function $a4dc55fe1a84241d$var$newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for(var i = 0; i < $a4dc55fe1a84241d$var$NEWTON_ITERATIONS; ++i){
        var currentSlope = $a4dc55fe1a84241d$var$getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) return aGuessT;
        var currentX = $a4dc55fe1a84241d$var$calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
}
function $a4dc55fe1a84241d$var$LinearEasing(x) {
    return x;
}
var $a4dc55fe1a84241d$var$src$1 = function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) throw new Error("bezier x values must be in [0, 1] range");
    if (mX1 === mY1 && mX2 === mY2) return $a4dc55fe1a84241d$var$LinearEasing;
    // Precompute samples table
    var sampleValues = $a4dc55fe1a84241d$var$float32ArraySupported ? new Float32Array($a4dc55fe1a84241d$var$kSplineTableSize) : new Array($a4dc55fe1a84241d$var$kSplineTableSize);
    for(var i = 0; i < $a4dc55fe1a84241d$var$kSplineTableSize; ++i)sampleValues[i] = $a4dc55fe1a84241d$var$calcBezier(i * $a4dc55fe1a84241d$var$kSampleStepSize, mX1, mX2);
    function getTForX(aX) {
        var intervalStart = 0.0;
        var currentSample = 1;
        var lastSample = $a4dc55fe1a84241d$var$kSplineTableSize - 1;
        for(; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample)intervalStart += $a4dc55fe1a84241d$var$kSampleStepSize;
        --currentSample;
        // Interpolate to provide an initial guess for t
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * $a4dc55fe1a84241d$var$kSampleStepSize;
        var initialSlope = $a4dc55fe1a84241d$var$getSlope(guessForT, mX1, mX2);
        if (initialSlope >= $a4dc55fe1a84241d$var$NEWTON_MIN_SLOPE) return $a4dc55fe1a84241d$var$newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        else if (initialSlope === 0.0) return guessForT;
        else return $a4dc55fe1a84241d$var$binarySubdivide(aX, intervalStart, intervalStart + $a4dc55fe1a84241d$var$kSampleStepSize, mX1, mX2);
    }
    return function BezierEasing(x) {
        // Because JavaScript number are imprecise, we should guarantee the extremes are right.
        if (x === 0) return 0;
        if (x === 1) return 1;
        return $a4dc55fe1a84241d$var$calcBezier(getTForX(x), mY1, mY2);
    };
};
var $a4dc55fe1a84241d$var$keyCodes$1 = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    TAB: 9,
    PAGEUP: 33,
    PAGEDOWN: 34,
    HOME: 36,
    END: 35
};
var $a4dc55fe1a84241d$var$_default$2 = /*#__PURE__*/ function(_Core) {
    $a4dc55fe1a84241d$var$_inherits(_default, _Core);
    var _super = $a4dc55fe1a84241d$var$_createSuper(_default);
    function _default() {
        var _this;
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        $a4dc55fe1a84241d$var$_classCallCheck(this, _default);
        if (history.scrollRestoration) history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
        _this = _super.call(this, options);
        if (_this.inertia) _this.lerp = _this.inertia * 0.1;
        _this.isScrolling = false;
        _this.isDraggingScrollbar = false;
        _this.isTicking = false;
        _this.hasScrollTicking = false;
        _this.parallaxElements = {};
        _this.stop = false;
        _this.scrollbarContainer = options.scrollbarContainer;
        _this.checkKey = _this.checkKey.bind($a4dc55fe1a84241d$var$_assertThisInitialized(_this));
        window.addEventListener("keydown", _this.checkKey, false);
        return _this;
    }
    $a4dc55fe1a84241d$var$_createClass(_default, [
        {
            key: "init",
            value: function init() {
                var _this2 = this;
                this.html.classList.add(this.smoothClass);
                this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction);
                this.instance = $a4dc55fe1a84241d$var$_objectSpread2({
                    delta: {
                        x: this.initPosition.x,
                        y: this.initPosition.y
                    },
                    scroll: {
                        x: this.initPosition.x,
                        y: this.initPosition.y
                    }
                }, this.instance);
                this.vs = new $a4dc55fe1a84241d$var$src({
                    el: this.scrollFromAnywhere ? document : this.el,
                    mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : 0.4,
                    firefoxMultiplier: this.firefoxMultiplier,
                    touchMultiplier: this.touchMultiplier,
                    useKeyboard: false,
                    passive: true
                });
                this.vs.on(function(e) {
                    if (_this2.stop) return;
                    if (!_this2.isDraggingScrollbar) requestAnimationFrame(function() {
                        _this2.updateDelta(e);
                        if (!_this2.isScrolling) _this2.startScrolling();
                    });
                });
                this.setScrollLimit();
                this.initScrollBar();
                this.addSections();
                this.addElements();
                this.checkScroll(true);
                this.transformElements(true, true);
                $a4dc55fe1a84241d$var$_get($a4dc55fe1a84241d$var$_getPrototypeOf(_default.prototype), "init", this).call(this);
            }
        },
        {
            key: "setScrollLimit",
            value: function setScrollLimit() {
                this.instance.limit.y = this.el.offsetHeight - this.windowHeight;
                if (this.direction === "horizontal") {
                    var totalWidth = 0;
                    var nodes = this.el.children;
                    for(var i = 0; i < nodes.length; i++)totalWidth += nodes[i].offsetWidth;
                    this.instance.limit.x = totalWidth - this.windowWidth;
                }
            }
        },
        {
            key: "startScrolling",
            value: function startScrolling() {
                this.startScrollTs = Date.now(); // Record timestamp
                this.isScrolling = true;
                this.checkScroll();
                this.html.classList.add(this.scrollingClass);
            }
        },
        {
            key: "stopScrolling",
            value: function stopScrolling() {
                cancelAnimationFrame(this.checkScrollRaf); // Prevent checkScroll to continue looping
                //Pevent scrollbar glitch/locking
                this.startScrollTs = undefined;
                if (this.scrollToRaf) {
                    cancelAnimationFrame(this.scrollToRaf);
                    this.scrollToRaf = null;
                }
                this.isScrolling = false;
                this.instance.scroll.y = Math.round(this.instance.scroll.y);
                this.html.classList.remove(this.scrollingClass);
            }
        },
        {
            key: "checkKey",
            value: function checkKey(e) {
                var _this3 = this;
                if (this.stop) {
                    // If we are stopped, we don't want any scroll to occur because of a keypress
                    // Prevent tab to scroll to activeElement
                    if (e.keyCode == $a4dc55fe1a84241d$var$keyCodes$1.TAB) requestAnimationFrame(function() {
                        // Make sure native scroll is always at top of page
                        _this3.html.scrollTop = 0;
                        document.body.scrollTop = 0;
                        _this3.html.scrollLeft = 0;
                        document.body.scrollLeft = 0;
                    });
                    return;
                }
                switch(e.keyCode){
                    case $a4dc55fe1a84241d$var$keyCodes$1.TAB:
                        // Do not remove the RAF
                        // It allows to override the browser's native scrollTo, which is essential
                        requestAnimationFrame(function() {
                            // Make sure native scroll is always at top of page
                            _this3.html.scrollTop = 0;
                            document.body.scrollTop = 0;
                            _this3.html.scrollLeft = 0;
                            document.body.scrollLeft = 0; // Request scrollTo on the focusedElement, putting it at the center of the screen
                            _this3.scrollTo(document.activeElement, {
                                offset: -window.innerHeight / 2
                            });
                        });
                        break;
                    case $a4dc55fe1a84241d$var$keyCodes$1.UP:
                        if (this.isActiveElementScrollSensitive()) this.instance.delta[this.directionAxis] -= 240;
                        break;
                    case $a4dc55fe1a84241d$var$keyCodes$1.DOWN:
                        if (this.isActiveElementScrollSensitive()) this.instance.delta[this.directionAxis] += 240;
                        break;
                    case $a4dc55fe1a84241d$var$keyCodes$1.PAGEUP:
                        this.instance.delta[this.directionAxis] -= window.innerHeight;
                        break;
                    case $a4dc55fe1a84241d$var$keyCodes$1.PAGEDOWN:
                        this.instance.delta[this.directionAxis] += window.innerHeight;
                        break;
                    case $a4dc55fe1a84241d$var$keyCodes$1.HOME:
                        this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
                        break;
                    case $a4dc55fe1a84241d$var$keyCodes$1.END:
                        this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
                        break;
                    case $a4dc55fe1a84241d$var$keyCodes$1.SPACE:
                        if (this.isActiveElementScrollSensitive()) {
                            if (e.shiftKey) this.instance.delta[this.directionAxis] -= window.innerHeight;
                            else this.instance.delta[this.directionAxis] += window.innerHeight;
                        }
                        break;
                    default:
                        return;
                }
                if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
                if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
                this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening
                this.isScrolling = true;
                this.checkScroll();
                this.html.classList.add(this.scrollingClass);
            }
        },
        {
            key: "isActiveElementScrollSensitive",
            value: function isActiveElementScrollSensitive() {
                return !(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement) && !(document.activeElement instanceof HTMLButtonElement) && !(document.activeElement instanceof HTMLSelectElement);
            }
        },
        {
            key: "checkScroll",
            value: function checkScroll() {
                var _this4 = this;
                var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                if (forced || this.isScrolling || this.isDraggingScrollbar) {
                    if (!this.hasScrollTicking) {
                        this.checkScrollRaf = requestAnimationFrame(function() {
                            return _this4.checkScroll();
                        });
                        this.hasScrollTicking = true;
                    }
                    this.updateScroll();
                    var distance = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]);
                    var timeSinceStart = Date.now() - this.startScrollTs; // Get the time since the scroll was started: the scroll can be stopped again only past 100ms
                    if (!this.animatingScroll && timeSinceStart > 100 && (distance < 0.5 && this.instance.delta[this.directionAxis] != 0 || distance < 0.5 && this.instance.delta[this.directionAxis] == 0)) this.stopScrolling();
                    Object.entries(this.sections).forEach(function(_ref) {
                        var _ref2 = $a4dc55fe1a84241d$var$_slicedToArray(_ref, 2), i = _ref2[0], section = _ref2[1];
                        if (section.persistent || _this4.instance.scroll[_this4.directionAxis] > section.offset[_this4.directionAxis] && _this4.instance.scroll[_this4.directionAxis] < section.limit[_this4.directionAxis]) {
                            if (_this4.direction === "horizontal") _this4.transform(section.el, -_this4.instance.scroll[_this4.directionAxis], 0);
                            else _this4.transform(section.el, 0, -_this4.instance.scroll[_this4.directionAxis]);
                            if (!section.inView) {
                                section.inView = true;
                                section.el.style.opacity = 1;
                                section.el.style.pointerEvents = "all";
                                section.el.setAttribute("data-".concat(_this4.name, "-section-inview"), "");
                            }
                        } else {
                            if (section.inView || forced) {
                                section.inView = false;
                                section.el.style.opacity = 0;
                                section.el.style.pointerEvents = "none";
                                section.el.removeAttribute("data-".concat(_this4.name, "-section-inview"));
                            }
                            _this4.transform(section.el, 0, 0);
                        }
                    });
                    if (this.getDirection) this.addDirection();
                    if (this.getSpeed) {
                        this.addSpeed();
                        this.speedTs = Date.now();
                    }
                    this.detectElements();
                    this.transformElements();
                    if (this.hasScrollbar) {
                        var scrollBarTranslation = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];
                        if (this.direction === "horizontal") this.transform(this.scrollbarThumb, scrollBarTranslation, 0);
                        else this.transform(this.scrollbarThumb, 0, scrollBarTranslation);
                    }
                    $a4dc55fe1a84241d$var$_get($a4dc55fe1a84241d$var$_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);
                    this.hasScrollTicking = false;
                }
            }
        },
        {
            key: "resize",
            value: function resize() {
                this.windowHeight = window.innerHeight;
                this.windowWidth = window.innerWidth;
                this.checkContext();
                this.windowMiddle = {
                    x: this.windowWidth / 2,
                    y: this.windowHeight / 2
                };
                this.update();
            }
        },
        {
            key: "updateDelta",
            value: function updateDelta(e) {
                var delta;
                var gestureDirection = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
                if (gestureDirection === "both") delta = e.deltaX + e.deltaY;
                else if (gestureDirection === "vertical") delta = e.deltaY;
                else if (gestureDirection === "horizontal") delta = e.deltaX;
                else delta = e.deltaY;
                this.instance.delta[this.directionAxis] -= delta * this.multiplier;
                if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
                if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
            }
        },
        {
            key: "updateScroll",
            value: function updateScroll(e) {
                if (this.isScrolling || this.isDraggingScrollbar) this.instance.scroll[this.directionAxis] = $a4dc55fe1a84241d$var$lerp(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp);
                else {
                    if (this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis]) this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]);
                    else if (this.instance.scroll.y < 0) this.setScroll(this.instance.scroll[this.directionAxis], 0);
                    else this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
                }
            }
        },
        {
            key: "addDirection",
            value: function addDirection() {
                if (this.instance.delta.y > this.instance.scroll.y) {
                    if (this.instance.direction !== "down") this.instance.direction = "down";
                } else if (this.instance.delta.y < this.instance.scroll.y) {
                    if (this.instance.direction !== "up") this.instance.direction = "up";
                }
                if (this.instance.delta.x > this.instance.scroll.x) {
                    if (this.instance.direction !== "right") this.instance.direction = "right";
                } else if (this.instance.delta.x < this.instance.scroll.x) {
                    if (this.instance.direction !== "left") this.instance.direction = "left";
                }
            }
        },
        {
            key: "addSpeed",
            value: function addSpeed() {
                if (this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis]) this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs);
                else this.instance.speed = 0;
            }
        },
        {
            key: "initScrollBar",
            value: function initScrollBar() {
                this.scrollbar = document.createElement("span");
                this.scrollbarThumb = document.createElement("span");
                this.scrollbar.classList.add("".concat(this.scrollbarClass));
                this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb"));
                this.scrollbar.append(this.scrollbarThumb);
                if (this.scrollbarContainer) this.scrollbarContainer.append(this.scrollbar);
                else document.body.append(this.scrollbar);
                 // Scrollbar Events
                this.getScrollBar = this.getScrollBar.bind(this);
                this.releaseScrollBar = this.releaseScrollBar.bind(this);
                this.moveScrollBar = this.moveScrollBar.bind(this);
                this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar);
                window.addEventListener("mouseup", this.releaseScrollBar);
                window.addEventListener("mousemove", this.moveScrollBar); // Set scrollbar values
                this.hasScrollbar = false;
                if (this.direction == "horizontal") {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                } else {
                    if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                }
                this.hasScrollbar = true;
                this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
                this.scrollbarHeight = this.scrollbarBCR.height;
                this.scrollbarWidth = this.scrollbarBCR.width;
                if (this.direction === "horizontal") this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px");
                else this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
                this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
                this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                };
            }
        },
        {
            key: "reinitScrollBar",
            value: function reinitScrollBar() {
                this.hasScrollbar = false;
                if (this.direction == "horizontal") {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                } else {
                    if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                }
                this.hasScrollbar = true;
                this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
                this.scrollbarHeight = this.scrollbarBCR.height;
                this.scrollbarWidth = this.scrollbarBCR.width;
                if (this.direction === "horizontal") this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px");
                else this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
                this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
                this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                };
            }
        },
        {
            key: "destroyScrollBar",
            value: function destroyScrollBar() {
                this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar);
                window.removeEventListener("mouseup", this.releaseScrollBar);
                window.removeEventListener("mousemove", this.moveScrollBar);
                this.scrollbar.remove();
            }
        },
        {
            key: "getScrollBar",
            value: function getScrollBar(e) {
                this.isDraggingScrollbar = true;
                this.checkScroll();
                this.html.classList.remove(this.scrollingClass);
                this.html.classList.add(this.draggingClass);
            }
        },
        {
            key: "releaseScrollBar",
            value: function releaseScrollBar(e) {
                this.isDraggingScrollbar = false;
                if (this.isScrolling) this.html.classList.add(this.scrollingClass);
                this.html.classList.remove(this.draggingClass);
            }
        },
        {
            key: "moveScrollBar",
            value: function moveScrollBar(e) {
                var _this5 = this;
                if (this.isDraggingScrollbar) requestAnimationFrame(function() {
                    var x = (e.clientX - _this5.scrollbarBCR.left) * 100 / _this5.scrollbarWidth * _this5.instance.limit.x / 100;
                    var y = (e.clientY - _this5.scrollbarBCR.top) * 100 / _this5.scrollbarHeight * _this5.instance.limit.y / 100;
                    if (y > 0 && y < _this5.instance.limit.y) _this5.instance.delta.y = y;
                    if (x > 0 && x < _this5.instance.limit.x) _this5.instance.delta.x = x;
                });
            }
        },
        {
            key: "addElements",
            value: function addElements() {
                var _this6 = this;
                this.els = {};
                this.parallaxElements = {}; // this.sections.forEach((section, y) => {
                var els = this.el.querySelectorAll("[data-".concat(this.name, "]"));
                els.forEach(function(el, index) {
                    // Try and find the target's parent section
                    var targetParents = $a4dc55fe1a84241d$var$getParents(el);
                    var section = Object.entries(_this6.sections).map(function(_ref3) {
                        var _ref4 = $a4dc55fe1a84241d$var$_slicedToArray(_ref3, 2), key = _ref4[0], section = _ref4[1];
                        return section;
                    }).find(function(section) {
                        return targetParents.includes(section.el);
                    });
                    var cl = el.dataset[_this6.name + "Class"] || _this6["class"];
                    var id = typeof el.dataset[_this6.name + "Id"] === "string" ? el.dataset[_this6.name + "Id"] : "el" + index;
                    var top;
                    var left;
                    var repeat = el.dataset[_this6.name + "Repeat"];
                    var call = el.dataset[_this6.name + "Call"];
                    var position = el.dataset[_this6.name + "Position"];
                    var delay = el.dataset[_this6.name + "Delay"];
                    var direction = el.dataset[_this6.name + "Direction"];
                    var sticky = typeof el.dataset[_this6.name + "Sticky"] === "string";
                    var speed = el.dataset[_this6.name + "Speed"] ? parseFloat(el.dataset[_this6.name + "Speed"]) / 10 : false;
                    var offset = typeof el.dataset[_this6.name + "Offset"] === "string" ? el.dataset[_this6.name + "Offset"].split(",") : _this6.offset;
                    var target = el.dataset[_this6.name + "Target"];
                    var targetEl;
                    if (target !== undefined) targetEl = document.querySelector("".concat(target));
                    else targetEl = el;
                    var targetElBCR = targetEl.getBoundingClientRect();
                    if (section === null) {
                        top = targetElBCR.top + _this6.instance.scroll.y - $a4dc55fe1a84241d$var$getTranslate(targetEl).y;
                        left = targetElBCR.left + _this6.instance.scroll.x - $a4dc55fe1a84241d$var$getTranslate(targetEl).x;
                    } else if (!section.inView) {
                        top = targetElBCR.top - $a4dc55fe1a84241d$var$getTranslate(section.el).y - $a4dc55fe1a84241d$var$getTranslate(targetEl).y;
                        left = targetElBCR.left - $a4dc55fe1a84241d$var$getTranslate(section.el).x - $a4dc55fe1a84241d$var$getTranslate(targetEl).x;
                    } else {
                        top = targetElBCR.top + _this6.instance.scroll.y - $a4dc55fe1a84241d$var$getTranslate(targetEl).y;
                        left = targetElBCR.left + _this6.instance.scroll.x - $a4dc55fe1a84241d$var$getTranslate(targetEl).x;
                    }
                    var bottom = top + targetEl.offsetHeight;
                    var right = left + targetEl.offsetWidth;
                    var middle = {
                        x: (right - left) / 2 + left,
                        y: (bottom - top) / 2 + top
                    };
                    if (sticky) {
                        var elBCR = el.getBoundingClientRect();
                        var elTop = elBCR.top;
                        var elLeft = elBCR.left;
                        var elDistance = {
                            x: elLeft - left,
                            y: elTop - top
                        };
                        top += window.innerHeight;
                        left += window.innerWidth;
                        bottom = elTop + targetEl.offsetHeight - el.offsetHeight - elDistance[_this6.directionAxis];
                        right = elLeft + targetEl.offsetWidth - el.offsetWidth - elDistance[_this6.directionAxis];
                        middle = {
                            x: (right - left) / 2 + left,
                            y: (bottom - top) / 2 + top
                        };
                    }
                    if (repeat == "false") repeat = false;
                    else if (repeat != undefined) repeat = true;
                    else repeat = _this6.repeat;
                    var relativeOffset = [
                        0,
                        0
                    ];
                    if (offset) {
                        if (_this6.direction === "horizontal") {
                            for(var i = 0; i < offset.length; i++)if (typeof offset[i] == "string") {
                                if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * _this6.windowWidth / 100);
                                else relativeOffset[i] = parseInt(offset[i]);
                            } else relativeOffset[i] = offset[i];
                            left = left + relativeOffset[0];
                            right = right - relativeOffset[1];
                        } else {
                            for(var i = 0; i < offset.length; i++)if (typeof offset[i] == "string") {
                                if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * _this6.windowHeight / 100);
                                else relativeOffset[i] = parseInt(offset[i]);
                            } else relativeOffset[i] = offset[i];
                            top = top + relativeOffset[0];
                            bottom = bottom - relativeOffset[1];
                        }
                    }
                    var mappedEl = {
                        el: el,
                        id: id,
                        "class": cl,
                        section: section,
                        top: top,
                        middle: middle,
                        bottom: bottom,
                        left: left,
                        right: right,
                        offset: offset,
                        progress: 0,
                        repeat: repeat,
                        inView: false,
                        call: call,
                        speed: speed,
                        delay: delay,
                        position: position,
                        target: targetEl,
                        direction: direction,
                        sticky: sticky
                    };
                    _this6.els[id] = mappedEl;
                    if (el.classList.contains(cl)) _this6.setInView(_this6.els[id], id);
                    if (speed !== false || sticky) _this6.parallaxElements[id] = mappedEl;
                }); // });
            }
        },
        {
            key: "addSections",
            value: function addSections() {
                var _this7 = this;
                this.sections = {};
                var sections = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                if (sections.length === 0) sections = [
                    this.el
                ];
                sections.forEach(function(section, index) {
                    var id = typeof section.dataset[_this7.name + "Id"] === "string" ? section.dataset[_this7.name + "Id"] : "section" + index;
                    var sectionBCR = section.getBoundingClientRect();
                    var offset = {
                        x: sectionBCR.left - window.innerWidth * 1.5 - $a4dc55fe1a84241d$var$getTranslate(section).x,
                        y: sectionBCR.top - window.innerHeight * 1.5 - $a4dc55fe1a84241d$var$getTranslate(section).y
                    };
                    var limit = {
                        x: offset.x + sectionBCR.width + window.innerWidth * 2,
                        y: offset.y + sectionBCR.height + window.innerHeight * 2
                    };
                    var persistent = typeof section.dataset[_this7.name + "Persistent"] === "string";
                    section.setAttribute("data-scroll-section-id", id);
                    var mappedSection = {
                        el: section,
                        offset: offset,
                        limit: limit,
                        inView: false,
                        persistent: persistent,
                        id: id
                    };
                    _this7.sections[id] = mappedSection;
                });
            }
        },
        {
            key: "transform",
            value: function transform(element, x, y, delay) {
                var transform;
                if (!delay) transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(x, ",").concat(y, ",0,1)");
                else {
                    var start = $a4dc55fe1a84241d$var$getTranslate(element);
                    var lerpX = $a4dc55fe1a84241d$var$lerp(start.x, x, delay);
                    var lerpY = $a4dc55fe1a84241d$var$lerp(start.y, y, delay);
                    transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(lerpX, ",").concat(lerpY, ",0,1)");
                }
                element.style.webkitTransform = transform;
                element.style.msTransform = transform;
                element.style.transform = transform;
            }
        },
        {
            key: "transformElements",
            value: function transformElements(isForced) {
                var _this8 = this;
                var setAllElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var scrollRight = this.instance.scroll.x + this.windowWidth;
                var scrollBottom = this.instance.scroll.y + this.windowHeight;
                var scrollMiddle = {
                    x: this.instance.scroll.x + this.windowMiddle.x,
                    y: this.instance.scroll.y + this.windowMiddle.y
                };
                Object.entries(this.parallaxElements).forEach(function(_ref5) {
                    var _ref6 = $a4dc55fe1a84241d$var$_slicedToArray(_ref5, 2), i = _ref6[0], current = _ref6[1];
                    var transformDistance = false;
                    if (isForced) transformDistance = 0;
                    if (current.inView || setAllElements) switch(current.position){
                        case "top":
                            transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
                            break;
                        case "elementTop":
                            transformDistance = (scrollBottom - current.top) * -current.speed;
                            break;
                        case "bottom":
                            transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollBottom + _this8.windowHeight) * current.speed;
                            break;
                        case "left":
                            transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
                            break;
                        case "elementLeft":
                            transformDistance = (scrollRight - current.left) * -current.speed;
                            break;
                        case "right":
                            transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollRight + _this8.windowHeight) * current.speed;
                            break;
                        default:
                            transformDistance = (scrollMiddle[_this8.directionAxis] - current.middle[_this8.directionAxis]) * -current.speed;
                            break;
                    }
                    if (current.sticky) {
                        if (current.inView) {
                            if (_this8.direction === "horizontal") transformDistance = _this8.instance.scroll.x - current.left + window.innerWidth;
                            else transformDistance = _this8.instance.scroll.y - current.top + window.innerHeight;
                        } else if (_this8.direction === "horizontal") {
                            if (_this8.instance.scroll.x < current.left - window.innerWidth && _this8.instance.scroll.x < current.left - window.innerWidth / 2) transformDistance = 0;
                            else if (_this8.instance.scroll.x > current.right && _this8.instance.scroll.x > current.right + 100) transformDistance = current.right - current.left + window.innerWidth;
                            else transformDistance = false;
                        } else {
                            if (_this8.instance.scroll.y < current.top - window.innerHeight && _this8.instance.scroll.y < current.top - window.innerHeight / 2) transformDistance = 0;
                            else if (_this8.instance.scroll.y > current.bottom && _this8.instance.scroll.y > current.bottom + 100) transformDistance = current.bottom - current.top + window.innerHeight;
                            else transformDistance = false;
                        }
                    }
                    if (transformDistance !== false) {
                        if (current.direction === "horizontal" || _this8.direction === "horizontal" && current.direction !== "vertical") _this8.transform(current.el, transformDistance, 0, isForced ? false : current.delay);
                        else _this8.transform(current.el, 0, transformDistance, isForced ? false : current.delay);
                    }
                });
            }
        },
        {
            key: "scrollTo",
            value: function scrollTo(target) {
                var _this9 = this;
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                // Parse options
                var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target
                var duration = !isNaN(parseInt(options.duration)) ? parseInt(options.duration) : 1000; // Duration of the scroll animation in milliseconds
                var easing = options.easing || [
                    0.25,
                    0.0,
                    0.35,
                    1.0
                ]; // An array of 4 floats between 0 and 1 defining the bezier curve for the animation's easing. See http://greweb.me/bezier-easing-editor/example/
                var disableLerp = options.disableLerp ? true : false; // Lerp effect won't be applied if set to true
                var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)
                easing = $a4dc55fe1a84241d$var$src$1.apply(void 0, $a4dc55fe1a84241d$var$_toConsumableArray(easing));
                if (typeof target === "string") {
                    // Selector or boundaries
                    if (target === "top") target = 0;
                    else if (target === "bottom") target = this.instance.limit.y;
                    else if (target === "left") target = 0;
                    else if (target === "right") target = this.instance.limit.x;
                    else {
                        target = document.querySelector(target); // If the query fails, abort
                        if (!target) return;
                    }
                } else if (typeof target === "number") // Absolute coordinate
                target = parseInt(target);
                else if (target && target.tagName) ;
                else {
                    console.warn("`target` parameter is not valid");
                    return;
                } // We have a target that is not a coordinate yet, get it
                if (typeof target !== "number") {
                    // Verify the given target belongs to this scroll scope
                    var targetInScope = $a4dc55fe1a84241d$var$getParents(target).includes(this.el);
                    if (!targetInScope) // If the target isn't inside our main element, abort any action
                    return;
                     // Get target offset from top
                    var targetBCR = target.getBoundingClientRect();
                    var offsetTop = targetBCR.top;
                    var offsetLeft = targetBCR.left; // Try and find the target's parent section
                    var targetParents = $a4dc55fe1a84241d$var$getParents(target);
                    var parentSection = targetParents.find(function(candidate) {
                        return Object.entries(_this9.sections) // Get sections associative array as a regular array
                        .map(function(_ref7) {
                            var _ref8 = $a4dc55fe1a84241d$var$_slicedToArray(_ref7, 2), key = _ref8[0], section = _ref8[1];
                            return section;
                        }) // map to section only (we dont need the key here)
                        .find(function(section) {
                            return section.el == candidate;
                        }); // finally find the section that matches the candidate
                    });
                    var parentSectionOffset = 0;
                    if (parentSection) parentSectionOffset = $a4dc55fe1a84241d$var$getTranslate(parentSection)[this.directionAxis]; // We got a parent section, store it's current offset to remove it later
                    else // if no parent section is found we need to use instance scroll directly
                    parentSectionOffset = -this.instance.scroll[this.directionAxis];
                     // Final value of scroll destination : offsetTop + (optional offset given in options) - (parent's section translate)
                    if (this.direction === "horizontal") offset = offsetLeft + offset - parentSectionOffset;
                    else offset = offsetTop + offset - parentSectionOffset;
                } else offset = target + offset;
                 // Actual scrollto
                // ==========================================================================
                // Setup
                var scrollStart = parseFloat(this.instance.delta[this.directionAxis]);
                var scrollTarget = Math.max(0, Math.min(offset, this.instance.limit[this.directionAxis])); // Make sure our target is in the scroll boundaries
                var scrollDiff = scrollTarget - scrollStart;
                var render = function render(p) {
                    if (disableLerp) {
                        if (_this9.direction === "horizontal") _this9.setScroll(scrollStart + scrollDiff * p, _this9.instance.delta.y);
                        else _this9.setScroll(_this9.instance.delta.x, scrollStart + scrollDiff * p);
                    } else _this9.instance.delta[_this9.directionAxis] = scrollStart + scrollDiff * p;
                }; // Prepare the scroll
                this.animatingScroll = true; // This boolean allows to prevent `checkScroll()` from calling `stopScrolling` when the animation is slow (i.e. at the beginning of an EaseIn)
                this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening
                this.startScrolling(); // Restart the scroll
                // Start the animation loop
                var start = Date.now();
                var loop = function loop() {
                    var p = (Date.now() - start) / duration; // Animation progress
                    if (p > 1) {
                        // Animation ends
                        render(1);
                        _this9.animatingScroll = false;
                        if (duration == 0) _this9.update();
                        if (callback) callback();
                    } else {
                        _this9.scrollToRaf = requestAnimationFrame(loop);
                        render(easing(p));
                    }
                };
                loop();
            }
        },
        {
            key: "update",
            value: function update() {
                this.setScrollLimit();
                this.addSections();
                this.addElements();
                this.detectElements();
                this.updateScroll();
                this.transformElements(true);
                this.reinitScrollBar();
                this.checkScroll(true);
            }
        },
        {
            key: "startScroll",
            value: function startScroll() {
                this.stop = false;
            }
        },
        {
            key: "stopScroll",
            value: function stopScroll() {
                this.stop = true;
            }
        },
        {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.instance = $a4dc55fe1a84241d$var$_objectSpread2($a4dc55fe1a84241d$var$_objectSpread2({}, this.instance), {}, {
                    scroll: {
                        x: x,
                        y: y
                    },
                    delta: {
                        x: x,
                        y: y
                    },
                    speed: 0
                });
            }
        },
        {
            key: "destroy",
            value: function destroy() {
                $a4dc55fe1a84241d$var$_get($a4dc55fe1a84241d$var$_getPrototypeOf(_default.prototype), "destroy", this).call(this);
                this.stopScrolling();
                this.html.classList.remove(this.smoothClass);
                this.vs.destroy();
                this.destroyScrollBar();
                window.removeEventListener("keydown", this.checkKey, false);
            }
        }
    ]);
    return _default;
}($a4dc55fe1a84241d$var$_default);
var $a4dc55fe1a84241d$export$cdb24735dcff2c36 = /*#__PURE__*/ function() {
    function Smooth() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        $a4dc55fe1a84241d$var$_classCallCheck(this, Smooth);
        this.options = options; // Override default options with given ones
        Object.assign(this, $a4dc55fe1a84241d$var$defaults, options);
        this.smartphone = $a4dc55fe1a84241d$var$defaults.smartphone;
        if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
        this.tablet = $a4dc55fe1a84241d$var$defaults.tablet;
        if (options.tablet) Object.assign(this.tablet, options.tablet);
        if (!this.smooth && this.direction == "horizontal") console.warn("\uD83D\uDEA8 `smooth:false` & `horizontal` direction are not yet compatible");
        if (!this.tablet.smooth && this.tablet.direction == "horizontal") console.warn("\uD83D\uDEA8 `smooth:false` & `horizontal` direction are not yet compatible (tablet)");
        if (!this.smartphone.smooth && this.smartphone.direction == "horizontal") console.warn("\uD83D\uDEA8 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)");
        this.init();
    }
    $a4dc55fe1a84241d$var$_createClass(Smooth, [
        {
            key: "init",
            value: function init() {
                this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint;
                this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint;
                if (this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet) this.scroll = new $a4dc55fe1a84241d$var$_default$2(this.options);
                else this.scroll = new $a4dc55fe1a84241d$var$_default$1(this.options);
                this.scroll.init();
                if (window.location.hash) {
                    // Get the hash without the '#' and find the matching element
                    var id = window.location.hash.slice(1, window.location.hash.length);
                    var target = document.getElementById(id); // If found, scroll to the element
                    if (target) this.scroll.scrollTo(target);
                }
            }
        },
        {
            key: "update",
            value: function update() {
                this.scroll.update();
            }
        },
        {
            key: "start",
            value: function start() {
                this.scroll.startScroll();
            }
        },
        {
            key: "stop",
            value: function stop() {
                this.scroll.stopScroll();
            }
        },
        {
            key: "scrollTo",
            value: function scrollTo(target, options) {
                this.scroll.scrollTo(target, options);
            }
        },
        {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.scroll.setScroll(x, y);
            }
        },
        {
            key: "on",
            value: function on(event, func) {
                this.scroll.setEvents(event, func);
            }
        },
        {
            key: "off",
            value: function off(event, func) {
                this.scroll.unsetEvents(event, func);
            }
        },
        {
            key: "destroy",
            value: function destroy() {
                this.scroll.destroy();
            }
        }
    ]);
    return Smooth;
}();
var $a4dc55fe1a84241d$export$7bbc682b75e8aad4 = /*#__PURE__*/ function() {
    function Native() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        $a4dc55fe1a84241d$var$_classCallCheck(this, Native);
        this.options = options; // Override default options with given ones
        Object.assign(this, $a4dc55fe1a84241d$var$defaults, options);
        this.smartphone = $a4dc55fe1a84241d$var$defaults.smartphone;
        if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
        this.tablet = $a4dc55fe1a84241d$var$defaults.tablet;
        if (options.tablet) Object.assign(this.tablet, options.tablet);
        this.init();
    }
    $a4dc55fe1a84241d$var$_createClass(Native, [
        {
            key: "init",
            value: function init() {
                this.scroll = new $a4dc55fe1a84241d$var$_default$1(this.options);
                this.scroll.init();
                if (window.location.hash) {
                    // Get the hash without the '#' and find the matching element
                    var id = window.location.hash.slice(1, window.location.hash.length);
                    var target = document.getElementById(id); // If found, scroll to the element
                    if (target) this.scroll.scrollTo(target);
                }
            }
        },
        {
            key: "update",
            value: function update() {
                this.scroll.update();
            }
        },
        {
            key: "start",
            value: function start() {
                this.scroll.startScroll();
            }
        },
        {
            key: "stop",
            value: function stop() {
                this.scroll.stopScroll();
            }
        },
        {
            key: "scrollTo",
            value: function scrollTo(target, options) {
                this.scroll.scrollTo(target, options);
            }
        },
        {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.scroll.setScroll(x, y);
            }
        },
        {
            key: "on",
            value: function on(event, func) {
                this.scroll.setEvents(event, func);
            }
        },
        {
            key: "off",
            value: function off(event, func) {
                this.scroll.unsetEvents(event, func);
            }
        },
        {
            key: "destroy",
            value: function destroy() {
                this.scroll.destroy();
            }
        }
    ]);
    return Native;
}();
var $a4dc55fe1a84241d$export$2e2bcd8739ae039 = $a4dc55fe1a84241d$export$cdb24735dcff2c36;


/**
 * Class representing a grid of items
 */ class $91722259633158e0$export$9eb849b9b922d396 {
    // DOM elements
    DOM = {
        // main element (.column__item)
        el: null,
        // The image element
        img: {
            outer: null,
            inner: null
        },
        // The caption
        caption: null,
        // The GridItem's content item id.
        contentId: null,
        // The ContentItem instance
        contentItem: null
    };
    // Position on the grid.
    position = -1;
    /**
     * Constructor.
     * @param {Element} DOM_el - the .column__item element
     */ constructor(DOM_el){
        this.DOM.el = DOM_el;
        this.DOM.img.outer = this.DOM.el.querySelector(".column__item-imgwrap");
        this.DOM.img.inner = this.DOM.el.querySelector(".column__item-img");
        this.position = Number(this.DOM.img.outer.dataset.pos) - 1;
        this.DOM.caption = this.DOM.el.querySelector("figcaption");
    }
}


/**
 * Class representing a content item (.content__item).
 */ class $916583bb452635ea$export$f240a6b5c2f72910 {
    // DOM elements
    DOM = {
        // Main element (.content__item)
        el: null,
        // .content__item-title
        title: null,
        // .content__item-text
        text: null
    };
    /**
     * Constructor.
     * @param {Element} DOM_el - the .content__item element.
     */ constructor(DOM_el){
        this.DOM.el = DOM_el;
        this.DOM.title = this.DOM.el.querySelector(".content__item-title");
        this.DOM.text = this.DOM.el.querySelector(".content__item-text");
    }
}



var $2rwrw = parcelRequire("2rwrw");
// body element
const $c30b3060ba78ed06$var$bodyEl = document.body;
const $c30b3060ba78ed06$var$navbar = document.querySelector(".navbar");
// Calculate the viewport size
let $c30b3060ba78ed06$var$winsize = (0, $1d4ed6463d272e8f$export$48a16acaeda4ce0e)();
window.addEventListener("resize", ()=>$c30b3060ba78ed06$var$winsize = (0, $1d4ed6463d272e8f$export$48a16acaeda4ce0e)());
class $c30b3060ba78ed06$export$ef2184bd89960b14 {
    // DOM elements
    DOM = {
        // main element (.columns)
        el: null,
        // The .column elements (odd columns) that eill animate to the opposite scroll direction
        oddColumns: null,
        // .column__item
        gridItems: null,
        // .content
        content: document.querySelector(".content"),
        // .content__item
        contentItems: document.querySelectorAll(".content__item"),
        // .heading
        heading: {
            top: document.querySelector(".heading--up"),
            bottom: document.querySelector(".heading--down")
        },
        // .button-back button
        backCtrl: document.querySelector(".button-back"),
        // .content__nav
        contentNav: document.querySelector(".content__nav"),
        // For demo purposes only (proof of concept).
        // .content__nav-item
        contentNavItems: document.querySelectorAll(".content__nav-item")
    };
    // GridItem instances array.
    gridItemArr = [];
    // Index of current GridItem.
    currentGridItem = -1;
    // Checks if in grid mode or if in content mode.
    isGridView = true;
    // Checks for active animation.
    isAnimating = false;
    // Scroll cached value
    lastscroll = 0;
    /**
     * Constructor.
     * @param {Element} DOM_el - the .columns element
     */ constructor(DOM_el){
        this.DOM.el = DOM_el;
        // first and third columns
        this.DOM.oddColumns = [
            ...this.DOM.el.querySelectorAll(".column")
        ].filter((_, index)=>index != 1);
        // grid items (figure.column__item)
        this.DOM.gridItems = [
            ...this.DOM.el.querySelectorAll(".column__item")
        ];
        // Assign a ContentItem to each GridItem
        this.DOM.gridItems.forEach((gridItem)=>{
            const newItem = new (0, $91722259633158e0$export$9eb849b9b922d396)(gridItem);
            this.gridItemArr.push(newItem);
            // The ContentItem instance
            newItem.contentItem = new (0, $916583bb452635ea$export$f240a6b5c2f72910)(this.DOM.contentItems[newItem.position]);
        });
        // Initialize the Locomotive scroll
        this.initSmoothScroll();
        // Initialize the events on the page.
        this.initEvents();
        // Track which items are visible
        this.trackVisibleItems();
    }
    /**
     * Initialize the Locomotive scroll.
     */ initSmoothScroll() {
        this.lscroll = new (0, $a4dc55fe1a84241d$export$2e2bcd8739ae039)({
            el: this.DOM.el,
            smooth: true,
            lerp: 0.13,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });
        // Locomotive scroll event: translate the first and third grid column -1*scrollValue px.
        this.lscroll.on("scroll", (obj)=>{
            this.lastscroll = obj.scroll.y;
            this.DOM.oddColumns.forEach((column)=>column.style.transform = `translateY(${obj.scroll.y}px)`);
        });
    }
    /**
     * Initialize the events.
     */ initEvents() {
        // For every GridItem
        for (const [position, gridItem] of this.gridItemArr.entries()){
            // Open the gridItem and reveal its content
            gridItem.DOM.img.outer.addEventListener("click", ()=>{
                if (!this.isGridView || this.isAnimating || document.documentElement.classList.contains("has-scroll-scrolling")) return false;
                this.isAnimating = true;
                this.isGridView = false;
                // Update currentGridItem
                this.currentGridItem = position;
                // Stop/Destroy the Locomotive scroll
                this.lscroll.destroy();
                this.showContent(gridItem);
            });
            // Hovering on the grid item's image outer.
            gridItem.DOM.img.outer.addEventListener("mouseenter", ()=>{
                if (!this.isGridView || this.isAnimating) return false;
                (0, $2rwrw.gsap).killTweensOf([
                    gridItem.DOM.img.outer,
                    gridItem.DOM.img.inner
                ]);
                (0, $2rwrw.gsap).timeline({
                    defaults: {
                        duration: 1.4,
                        ease: "expo"
                    },
                    onComplete: ()=>(0, $2rwrw.gsap).set([
                            gridItem.DOM.img.outer,
                            gridItem.DOM.img.inner
                        ], {
                            willChange: ""
                        })
                }).addLabel("start", 0).set([
                    gridItem.DOM.img.outer,
                    gridItem.DOM.img.inner
                ], {
                    willChange: "transform"
                }, "start").to(gridItem.DOM.img.outer, {
                    scaleY: 0.95,
                    scaleX: 0.88
                }, "start").to(gridItem.DOM.img.inner, {
                    ease: "power4",
                    scaleY: 1.2,
                    scaleX: 1.7
                }, "start");
            });
            // Hovering out will reverse the scale values.
            gridItem.DOM.img.outer.addEventListener("mouseleave", ()=>{
                if (!this.isGridView || this.isAnimating) return false;
                (0, $2rwrw.gsap).killTweensOf([
                    gridItem.DOM.img.outer,
                    gridItem.DOM.img.inner
                ]);
                (0, $2rwrw.gsap).timeline({
                    defaults: {
                        duration: 1.4,
                        ease: "expo"
                    },
                    onComplete: ()=>(0, $2rwrw.gsap).set([
                            gridItem.DOM.img.outer,
                            gridItem.DOM.img.inner
                        ], {
                            willChange: ""
                        })
                }).addLabel("start", 0).set([
                    gridItem.DOM.img.outer,
                    gridItem.DOM.img.inner
                ], {
                    willChange: "transform"
                }, "start").to([
                    gridItem.DOM.img.outer,
                    gridItem.DOM.img.inner
                ], {
                    scale: 1
                }, 0);
            });
        }
        // Recalculate current image transform
        window.addEventListener("resize", ()=>{
            if (this.isGridView) return false;
            // Calculate the transform to apply to the current grid item image
            const imageTransform = this.calcTransformImage();
            (0, $2rwrw.gsap).set(this.gridItemArr[this.currentGridItem].DOM.img.outer, {
                scale: imageTransform.scale,
                x: imageTransform.x,
                y: imageTransform.y
            });
            // Adjust the transform value for all the other grid items that moved to the thumbnails area.
            for (const [position, viewportGridItem] of this.viewportGridItems.entries()){
                const imgOuter = viewportGridItem.DOM.img.outer;
                (0, $2rwrw.gsap).set(viewportGridItem.DOM.img.outer, {
                    scale: this.getFinalScaleValue(imgOuter),
                    x: this.getFinalTranslationValue(imgOuter, position).x,
                    y: this.getFinalTranslationValue(imgOuter, position).y
                });
            }
        });
        // Close the current item's content and reveal back the grid.
        this.DOM.backCtrl.addEventListener("click", ()=>{
            if (this.isGridView || this.isAnimating) return false;
            this.isAnimating = true;
            this.isGridView = true;
            // Restart the Locomotive scroll
            this.initSmoothScroll();
            this.lscroll.scrollTo(this.lastscroll, {
                duration: 0,
                disableLerp: true
            });
            this.closeContent();
        });
    }
    /**
     * Scale up the image and reveal its content.
     * @param {GridItem} gridItem - the gridItem element.
     */ showContent(gridItem) {
        // All the other (that are inside the viewport)
        this.viewportGridItems = this.gridItemArr.filter((el)=>el != gridItem && el.DOM.el.classList.contains("in-view"));
        // Remaining (not in the viewport)
        this.remainingGridItems = this.gridItemArr.filter((el)=>!this.viewportGridItems.includes(el) && el != gridItem).map((gridItem)=>gridItem.DOM.el);
        // image outer elements
        this.viewportGridItemsImgOuter = this.viewportGridItems.map((gridItem)=>gridItem.DOM.img.outer);
        // Calculate the transform to apply to the gridItem's image .
        const imageTransform = this.calcTransformImage();
        (0, $2rwrw.gsap).killTweensOf([
            gridItem.DOM.img.outer,
            gridItem.DOM.img.inner
        ]);
        this.timeline = (0, $2rwrw.gsap).timeline({
            defaults: {
                duration: 1.4,
                ease: "expo.inOut"
            },
            // overflow hidden
            onStart: ()=>(0, $2rwrw.gsap).to($c30b3060ba78ed06$var$navbar, {
                    opacity: 0
                }),
            //navbar.classList.add('oh'),
            onComplete: ()=>{
                // Hide all other grid items from the grid.
                (0, $2rwrw.gsap).set(this.remainingGridItems, {
                    opacity: 0
                });
                this.isAnimating = false;
            }
        }).addLabel("start", 0).set([
            gridItem.DOM.el,
            gridItem.DOM.el.parentNode.parentNode
        ], {
            zIndex: 100
        }, "start").set([
            gridItem.DOM.img.outer,
            gridItem.DOM.img.inner,
            this.viewportGridItemsImgOuter
        ], {
            willChange: "transform, opacity"
        }, "start").to(this.DOM.heading.top, {
            y: "-200%",
            scaleY: 4
        }, "start").to(this.DOM.heading.bottom, {
            y: "200%",
            scaleY: 4
        }, "start+=0.05").to(gridItem.DOM.img.outer, {
            scale: imageTransform.scale,
            x: imageTransform.x,
            y: imageTransform.y,
            onComplete: ()=>(0, $2rwrw.gsap).set(gridItem.DOM.img.outer, {
                    willChange: ""
                })
        }, "start").to(gridItem.DOM.img.inner, {
            scale: 1,
            onComplete: ()=>(0, $2rwrw.gsap).set(gridItem.DOM.img.inner, {
                    willChange: ""
                })
        }, "start").add(()=>{
            (0, $2rwrw.gsap).set(this.DOM.contentNavItems, {
                y: `${(0, $2rwrw.gsap).utils.random(100, 300)}%`,
                opacity: 0
            });
        }, "start");
        for (const [position, viewportGridItem] of this.viewportGridItems.entries()){
            const imgOuter = viewportGridItem.DOM.img.outer;
            this.timeline.to([
                viewportGridItem.DOM.caption,
                gridItem.DOM.caption
            ], {
                ease: "expo",
                opacity: 0,
                delay: 0.03 * position
            }, "start").to(viewportGridItem.DOM.img.outer, {
                scale: this.getFinalScaleValue(imgOuter),
                x: this.getFinalTranslationValue(imgOuter, position).x,
                y: this.getFinalTranslationValue(imgOuter, position).y,
                onComplete: ()=>(0, $2rwrw.gsap).set(imgOuter, {
                        willChange: ""
                    }),
                delay: 0.03 * position
            }, "start");
        }
        this.timeline.addLabel("showContent", "start+=0.2").to([
            ...this.DOM.contentNavItems
        ].slice(this.viewportGridItems.length + 1), {
            y: "0%",
            opacity: 1,
            delay: (pos)=>0.03 * pos
        }, "showContent").add(()=>{
            gridItem.contentItem.DOM.el.classList.add("content__item--current");
            $c30b3060ba78ed06$var$bodyEl.classList.add("view-content");
        }, "showContent").to([
            this.DOM.backCtrl,
            this.DOM.contentNav,
            gridItem.contentItem.DOM.text
        ], {
            opacity: 1
        }, "showContent").to(gridItem.contentItem.DOM.title, {
            opacity: 1,
            startAt: {
                y: "-100%",
                scaleY: 3
            },
            y: "0%",
            scaleY: 1
        }, "showContent");
    }
    /**
     * Scale down the image and reveal the grid again.
     */ closeContent() {
        // Current grid item
        const gridItem = this.gridItemArr[this.currentGridItem];
        (0, $2rwrw.gsap).timeline({
            defaults: {
                duration: 1.4,
                ease: "expo.inOut"
            },
            // overflow hidden
            onStart: ()=>{
                // Show all other grid items in the grid.
                (0, $2rwrw.gsap).set(this.remainingGridItems, {
                    opacity: 1
                });
                $c30b3060ba78ed06$var$bodyEl.classList.remove("oh");
                (0, $2rwrw.gsap).to($c30b3060ba78ed06$var$navbar, {
                    opacity: 1,
                    delay: 1
                });
            },
            onComplete: ()=>{
                this.isAnimating = false;
            }
        }).addLabel("start", 0).to([
            this.DOM.backCtrl,
            this.DOM.contentNav,
            gridItem.contentItem.DOM.text
        ], {
            opacity: 0
        }, "start").to(gridItem.contentItem.DOM.title, {
            opacity: 0,
            y: "-100%",
            scaleY: 3
        }, "start").to([
            ...this.DOM.contentNavItems
        ].slice(this.viewportGridItems.length + 1), {
            y: `${(0, $2rwrw.gsap).utils.random(100, 300)}%`,
            opacity: 0,
            delay: (pos)=>-0.03 * pos,
            onComplete: ()=>$c30b3060ba78ed06$var$bodyEl.classList.remove("view-content")
        }, "start").add(()=>gridItem.contentItem.DOM.el.classList.remove("content__item--current")).set([
            gridItem.DOM.img.outer,
            this.viewportGridItemsImgOuter
        ], {
            willChange: "transform, opacity"
        }, "start").to(gridItem.DOM.img.outer, {
            scale: 1,
            x: 0,
            y: 0,
            onComplete: ()=>{
                (0, $2rwrw.gsap).set(gridItem.DOM.img.outer, {
                    willChange: ""
                });
                (0, $2rwrw.gsap).set([
                    gridItem.DOM.el,
                    gridItem.DOM.el.parentNode.parentNode
                ], {
                    zIndex: 1
                });
            }
        }, "start").to(this.viewportGridItemsImgOuter, {
            scale: 1,
            x: 0,
            y: 0,
            stagger: (pos)=>-0.03 * pos,
            onComplete: ()=>{
                (0, $2rwrw.gsap).set(this.viewportGridItemsImgOuter, {
                    willChange: ""
                });
            }
        }, "start").addLabel("showGrid", "start+=0.2")// .to([this.DOM.heading.top, this.DOM.heading.bottom], {
        //     y: '0%',
        //     scaleY: 1
        // }, 'showGrid')
        .to([
            this.viewportGridItems.map((gridItem)=>gridItem.DOM.caption),
            gridItem.DOM.caption
        ], {
            ease: "power4.in",
            opacity: 1
        }, "showGrid");
    }
    /**
     * Calculates the scale value to apply to the images that animate to the .content__nav area (scale down to the size of a nav area item).
     * @param {Element} gridItemImageOuter - the gridItem image outer element.
     * @return {Number} the scale value.
     */ getFinalScaleValue(gridItemImageOuter) {
        return this.DOM.contentNavItems[0].offsetHeight / gridItemImageOuter.offsetHeight;
    }
    /**
     * Calculates the translate value to apply to the images that animate to the .content__nav area (position it on the nav area).
     * @param {Element} gridItemImageOuter - the gridItem image outer element.
     * @param {Number} position - the gridItem's position.
     * @return {JSON} the translation values.
     */ getFinalTranslationValue(gridItemImageOuter, position) {
        const imgrect = (0, $1d4ed6463d272e8f$export$6316de36b68d6b40)(gridItemImageOuter);
        const navrect = (0, $1d4ed6463d272e8f$export$6316de36b68d6b40)(this.DOM.contentNavItems[position]);
        return {
            x: navrect.left + navrect.width / 2 - (imgrect.left + imgrect.width / 2),
            y: navrect.top + navrect.height / 2 - (imgrect.top + imgrect.height / 2)
        };
    }
    /**
     * Track which items are visible (inside the viewport)
     * by adding/removing the 'in-view' class when scrolling.
     * This will be used to animate only the ones that are visible.
     */ trackVisibleItems() {
        const observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach((entry)=>{
                if (entry.intersectionRatio > 0) entry.target.classList.add("in-view");
                else entry.target.classList.remove("in-view");
            });
        });
        this.DOM.gridItems.forEach((item)=>observer.observe(item));
    }
    /**
     * Calculates the scale and translation values to apply to the images when we click on it (scale up and center it). 
     * Also used to recalculate those values on resize.
     * @return {JSON} the translation and scale values
     */ calcTransformImage() {
        const imgrect = (0, $1d4ed6463d272e8f$export$6316de36b68d6b40)(this.gridItemArr[this.currentGridItem].DOM.img.outer);
        return {
            scale: $c30b3060ba78ed06$var$winsize.height * 0.7 / imgrect.height,
            x: $c30b3060ba78ed06$var$winsize.width * 0.5 - (imgrect.left + imgrect.width / 2),
            y: $c30b3060ba78ed06$var$winsize.height * 0.5 - (imgrect.top + imgrect.height / 2)
        };
    }
}




var $2rwrw = parcelRequire("2rwrw");

var $4KH4f = parcelRequire("4KH4f");
(0, $2rwrw.gsap).registerPlugin((0, $4KH4f.ScrollTrigger));
function $4dff0c795384d75a$var$panelloader() {
    console.log("im in");
    const box_even = document.querySelectorAll(".box_even");
    const box_odd = document.querySelectorAll(".box_odd");
    const navbar_divider = document.querySelector(".navbar span");
    const navbar_logo = document.querySelector("#navbar-logo");
    function enableLenis() {
        lenis.start();
    }
    //   Initiate the timeline
    let tl = (0, $2rwrw.gsap).timeline({
        onComplete: enableLenis,
        defaults: {
            ease: "power4.inOut"
        }
    });
    box_even.forEach((box)=>{
        tl.to(box, {
            y: "-105%",
            duration: 1.5,
            onComplete: ()=>(0, $2rwrw.gsap).set(box, {
                    opacity: 0
                })
        }, "start");
    });
    box_odd.forEach((box)=>{
        tl.to(box, {
            y: "105%",
            duration: 1.5,
            onComplete: ()=>(0, $2rwrw.gsap).set(box, {
                    opacity: 0
                })
        }, "start");
    });
    tl.from(navbar_divider, {
        x: "-100%",
        delay: 1,
        duration: 2.3,
        ease: "power3.inOut"
    }, "start");
    tl.to(navbar_logo, {
        y: -50,
        delay: 2,
        duration: 1.2,
        ease: "power4.inOut"
    }, "start"), tl.to(".menu_navbar", {
        y: 0,
        delay: 2.2,
        duration: 1.2,
        ease: "power4.inOut"
    }, "start");
    tl.from(".btn", {
        opacity: 0,
        y: 0,
        delay: 2.5,
        duration: 1.2,
        ease: "power4.inOut"
    }, "start");
    tl.to(".container", {
        zIndex: -1,
        delay: 2.5
    }, "start");
}
// menu navigation animation
let $4dff0c795384d75a$var$tl_menu = (0, $2rwrw.gsap).timeline({
    paused: true
});
$4dff0c795384d75a$var$tl_menu.to(".navbar", {
    opacity: 0,
    // duration: 1,
    ease: "power4.inOut"
}, "start").to(".navbar", {
    zIndex: -1
}).to(".menu-container", {
    opacity: 1,
    duration: 1,
    ease: "power4.inOut"
}, "start").to(".menu-container", {
    zIndex: 9999999,
    duration: 1,
    ease: "power4.inOut"
}, "start").from(".left-menu", {
    y: "-100%",
    duration: 1.5,
    ease: "power4.inOut"
}, "start").from(".right-menu", {
    y: "100%",
    duration: 1.5,
    ease: "power4.inOut"
}, "start").addLabel("AnimateRight", ">").from(".menu-btn a", {
    opacity: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, "AnimateRight-=70%").from(".menu-btn a", {
    y: "30%",
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, ">-1.3").from(".menu-btn", {
    borderBottomWidth: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, ">-1.3").from(".right-menu-info", {
    opacity: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, "AnimateRight-=70%").from(".right-menu-info", {
    y: "30%",
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, ">-1.3").addLabel("RightTitle", "<").from(".right-menu-socials", {
    opacity: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, "RightTitle+=0.5").from(".right-menu-socials", {
    y: "30%",
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, ">-1.3").from(".right-menu-footer-divider", {
    width: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, ">-0.5").addLabel("RightFooter", "<").from(".right-menu-footer-info", {
    opacity: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, "RightFooter+=0.5").from(".right-menu-footer-info", {
    y: "30%",
    duration: 1,
    stagger: 0.05,
    ease: "power4.inOut"
}, ">-1.3").from(".item-2", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut"
}, ">-1");
function $4dff0c795384d75a$var$openMenu() {
    $4dff0c795384d75a$var$tl_menu.play();
}
function $4dff0c795384d75a$var$closeMenu() {
    $4dff0c795384d75a$var$tl_menu.reverse();
}
document.querySelector(".btn").addEventListener("click", ()=>{
    $4dff0c795384d75a$var$openMenu();
});
document.querySelector(".item-2").addEventListener("click", ()=>{
    $4dff0c795384d75a$var$closeMenu();
});
$4dff0c795384d75a$var$panelloader();
// Initialize the grid
new (0, $c30b3060ba78ed06$export$ef2184bd89960b14)(document.querySelector(".columns"));


