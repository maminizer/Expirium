
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
/**
 * Class representing a Grid Item
 */ class $783ed408c6d8e3ef$export$314aaaef607a8c3a {
    // DOM elements
    DOM = {
        // main element (.item)
        el: null,
        // image element (.item__img)
        image: null,
        // image inner element (.item__img-inner)
        imageInner: null,
        // item link (.item__link)
        link: null,
        // item meta (.item__meta)
        meta: null,
        // item link (.item__title)
        title: null,
        // item link (.item__desc)
        desc: null
    };
    /**
	 * Constructor.
	 * @param {Element} DOM_el - main element (.item)
     * @param {Preview} previewEl - the Preview element
	 */ constructor(DOM_el, previewEl){
        this.DOM.el = DOM_el;
        this.preview = previewEl;
        this.DOM.image = this.DOM.el.querySelector(".item__img");
        this.DOM.imageInner = this.DOM.el.querySelector(".item__img-inner");
        this.DOM.link = this.DOM.el.querySelector(".item__link");
        this.DOM.meta = this.DOM.el.querySelector(".item__meta");
        this.DOM.title = this.DOM.el.querySelector(".item__title");
        this.DOM.desc = this.DOM.el.querySelector(".item__desc");
        this.DOM.link.addEventListener("mouseenter", ()=>{
            gsap.killTweensOf(this.DOM.imageInner);
            gsap.to(this.DOM.imageInner, {
                duration: 2,
                ease: "power4",
                scale: 1.2
            });
        });
        this.DOM.link.addEventListener("mouseleave", ()=>{
            gsap.killTweensOf(this.DOM.imageInner);
            gsap.to(this.DOM.imageInner, {
                duration: 0.7,
                ease: "expo",
                scale: 1
            });
        });
    }
}


/**
 * Preload fonts
 * @param {String} id
 */ const $1dc435e69dec08c5$export$f2704129bd95623f = (id)=>{
    return new Promise((resolve)=>{
        WebFont.load({
            typekit: {
                id: id
            },
            active: resolve
        });
    });
};
/**
 * Gets the height of an element without counting with the padding
 * @param {Element} el
 */ const $1dc435e69dec08c5$export$c08559766941f856 = (el)=>{
    const computedStyle = getComputedStyle(el);
    let elementHeight = el.clientHeight; // height with padding
    elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    return elementHeight;
};
const $1dc435e69dec08c5$export$48a16acaeda4ce0e = ()=>{
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};
const $1dc435e69dec08c5$export$6316de36b68d6b40 = (el)=>{
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
const $1dc435e69dec08c5$export$fec9ba7939aa9b65 = (arr, wrapType, wrapClass)=>{
    arr.forEach((el)=>{
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        el.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(el);
    });
};
/**
 * Preloads images specified by the CSS selector.
 * @function
 * @param {string} [selector='img'] - CSS selector for target images.
 * @returns {Promise} - Resolves when all specified images are loaded.
 */ const $1dc435e69dec08c5$export$6b05b21262ec0515 = (selector = "img")=>{
    return new Promise((resolve)=>{
        // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
        imagesLoaded(document.querySelectorAll(selector), {
            background: true
        }, resolve);
    });
};


class $b9fb952c90236acf$export$8d6dee1bc13078fb {
    // DOM elements
    DOM = {
        // main element (a text DOM element)
        el: null
    };
    // Split Type instance
    SplitTypeInstance;
    // Checks if the Split Type lines are visible or not
    isVisible;
    // Animation timelines
    inTimeline;
    outTimeline;
    /**
     * Constructor.
     * @param {Element} DOM_el - a text DOM element
     */ constructor(DOM_el){
        this.DOM = {
            el: DOM_el
        };
        this.SplitTypeInstance = new SplitType(this.DOM.el, {
            types: "lines"
        });
        // Wrap the lines (div with class .oh)
        // The inner child will be the one animating the transform
        (0, $1dc435e69dec08c5$export$fec9ba7939aa9b65)(this.SplitTypeInstance.lines, "div", "oh");
        this.initEvents();
    }
    /**
     * Animates the lines in.
     * @return {GSAP Timeline} the animation timeline
     * @param {Boolean} animation - with or without animation.
     */ in(animation = true) {
        // Lines are visible
        this.isVisible = true;
        gsap.killTweensOf(this.SplitTypeInstance.lines);
        this.inTimeline = gsap.timeline({
            defaults: {
                duration: 1.1,
                ease: "power4.inOut"
            }
        }).addLabel("start", 0).set(this.SplitTypeInstance.lines, {
            yPercent: 105
        }, "start");
        if (animation) this.inTimeline.to(this.SplitTypeInstance.lines, {
            yPercent: 0,
            stagger: 0.05
        }, "start");
        else this.inTimeline.set(this.SplitTypeInstance.lines, {
            yPercent: 0
        }, "start");
        return this.inTimeline;
    }
    /**
     * Animates the lines out.
     * @param {Boolean} animation - with or without animation.
     * @return {GSAP Timeline} the animation timeline
     */ out(animation = true) {
        // Lines are invisible
        this.isVisible = false;
        gsap.killTweensOf(this.SplitTypeInstance.lines);
        this.outTimeline = gsap.timeline({
            defaults: {
                duration: 1.1,
                ease: "power4.inOut"
            }
        }).addLabel("start", 0);
        if (animation) this.outTimeline.to(this.SplitTypeInstance.lines, {
            yPercent: -105,
            stagger: 0.05
        }, "start");
        else this.outTimeline.set(this.SplitTypeInstance.lines, {
            yPercent: -105
        }, "start");
        return this.outTimeline;
    }
    /**
     * Initializes some events.
     */ initEvents() {
        // Re-initialize the Split Text on window resize.
        window.addEventListener("resize", ()=>{
            // Re-split text
            // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
            this.SplitTypeInstance.split();
            // Need to wrap again the new lines elements (div with class .oh)
            (0, $1dc435e69dec08c5$export$fec9ba7939aa9b65)(this.SplitTypeInstance.lines, "div", "oh");
            // Hide the lines
            if (!this.isVisible) gsap.set(this.SplitTypeInstance.lines, {
                yPercent: 105
            });
        });
    }
}


class $014b69a3fbf67b08$export$133773870222880f {
    // DOM elements
    DOM = {
        // main element (.preview)
        el: null,
        // image element (.preview__img)
        image: null,
        // image inner element (.preview__img-inner)
        imageInner: null,
        // title
        title: null,
        // backCtrl
        backCtrl: null,
        // oh__inner elements
        innerElements: null,
        multiLineWrap: null
    };
    multiLines = [];
    /**
	 * Constructor.
	 * @param {Element} DOM_el - main element (.preview)
	 */ constructor(DOM_el){
        this.DOM.el = DOM_el;
        this.DOM.image = this.DOM.el.querySelector(".preview__img");
        this.DOM.imageInner = this.DOM.el.querySelector(".preview__img-inner");
        this.DOM.title = this.DOM.el.querySelector(".preview__title");
        this.DOM.backCtrl = this.DOM.el.querySelector(".preview__back");
        this.DOM.innerElements = [
            ...this.DOM.el.querySelectorAll(".oh__inner")
        ];
        // the TextLinesReveal instance (animate each text line using the SplitText library)
        this.DOM.multiLineWrap = [
            ...this.DOM.el.querySelectorAll(".preview__column > p")
        ];
        this.DOM.multiLineWrap.forEach((line)=>this.multiLines.push(new (0, $b9fb952c90236acf$export$8d6dee1bc13078fb)(line)));
    }
}



function $f92fa1e7db8cc046$var$t(t, e, i) {
    return Math.max(t, Math.min(e, i));
}
class $f92fa1e7db8cc046$var$Animate {
    advance(e) {
        if (!this.isRunning) return;
        let i = !1;
        if (this.lerp) this.value = (s = this.value, o = this.to, n = 60 * this.lerp, r = e, function(t, e, i) {
            return (1 - i) * t + i * e;
        }(s, o, 1 - Math.exp(-n * r))), Math.round(this.value) === this.to && (this.value = this.to, i = !0);
        else {
            this.currentTime += e;
            const s = $f92fa1e7db8cc046$var$t(0, this.currentTime / this.duration, 1);
            i = s >= 1;
            const o = i ? 1 : this.easing(s);
            this.value = this.from + (this.to - this.from) * o;
        }
        var s, o, n, r;
        this.onUpdate?.(this.value, i), i && this.stop();
    }
    stop() {
        this.isRunning = !1;
    }
    fromTo(t, e, { lerp: i = .1, duration: s = 1, easing: o = (t)=>t, onStart: n, onUpdate: r }) {
        this.from = this.value = t, this.to = e, this.lerp = i, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = !0, n?.(), this.onUpdate = r;
    }
}
class $f92fa1e7db8cc046$var$Dimensions {
    constructor({ wrapper: t, content: e, autoResize: i = !0, debounce: s = 250 } = {}){
        this.wrapper = t, this.content = e, i && (this.debouncedResize = function(t, e) {
            let i;
            return function() {
                let s = arguments, o = this;
                clearTimeout(i), i = setTimeout(function() {
                    t.apply(o, s);
                }, e);
            };
        }(this.resize, s), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
    }
    destroy() {
        this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), window.removeEventListener("resize", this.debouncedResize, !1);
    }
    resize = ()=>{
        this.onWrapperResize(), this.onContentResize();
    };
    onWrapperResize = ()=>{
        this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    };
    onContentResize = ()=>{
        this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    };
    get limit() {
        return {
            x: this.scrollWidth - this.width,
            y: this.scrollHeight - this.height
        };
    }
}
class $f92fa1e7db8cc046$var$Emitter {
    constructor(){
        this.events = {};
    }
    emit(t, ...e) {
        let i = this.events[t] || [];
        for(let t = 0, s = i.length; t < s; t++)i[t](...e);
    }
    on(t, e) {
        return this.events[t]?.push(e) || (this.events[t] = [
            e
        ]), ()=>{
            this.events[t] = this.events[t]?.filter((t)=>e !== t);
        };
    }
    off(t, e) {
        this.events[t] = this.events[t]?.filter((t)=>e !== t);
    }
    destroy() {
        this.events = {};
    }
}
const $f92fa1e7db8cc046$var$e = 100 / 6;
class $f92fa1e7db8cc046$var$VirtualScroll {
    constructor(t, { wheelMultiplier: e = 1, touchMultiplier: i = 1 }){
        this.element = t, this.wheelMultiplier = e, this.touchMultiplier = i, this.touchStart = {
            x: null,
            y: null
        }, this.emitter = new $f92fa1e7db8cc046$var$Emitter, window.addEventListener("resize", this.onWindowResize, !1), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, {
            passive: !1
        }), this.element.addEventListener("touchstart", this.onTouchStart, {
            passive: !1
        }), this.element.addEventListener("touchmove", this.onTouchMove, {
            passive: !1
        }), this.element.addEventListener("touchend", this.onTouchEnd, {
            passive: !1
        });
    }
    on(t, e) {
        return this.emitter.on(t, e);
    }
    destroy() {
        this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, !1), this.element.removeEventListener("wheel", this.onWheel, {
            passive: !1
        }), this.element.removeEventListener("touchstart", this.onTouchStart, {
            passive: !1
        }), this.element.removeEventListener("touchmove", this.onTouchMove, {
            passive: !1
        }), this.element.removeEventListener("touchend", this.onTouchEnd, {
            passive: !1
        });
    }
    onTouchStart = (t)=>{
        const { clientX: e, clientY: i } = t.targetTouches ? t.targetTouches[0] : t;
        this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
            x: 0,
            y: 0
        }, this.emitter.emit("scroll", {
            deltaX: 0,
            deltaY: 0,
            event: t
        });
    };
    onTouchMove = (t)=>{
        const { clientX: e, clientY: i } = t.targetTouches ? t.targetTouches[0] : t, s = -(e - this.touchStart.x) * this.touchMultiplier, o = -(i - this.touchStart.y) * this.touchMultiplier;
        this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
            x: s,
            y: o
        }, this.emitter.emit("scroll", {
            deltaX: s,
            deltaY: o,
            event: t
        });
    };
    onTouchEnd = (t)=>{
        this.emitter.emit("scroll", {
            deltaX: this.lastDelta.x,
            deltaY: this.lastDelta.y,
            event: t
        });
    };
    onWheel = (t)=>{
        let { deltaX: i, deltaY: s, deltaMode: o } = t;
        i *= 1 === o ? $f92fa1e7db8cc046$var$e : 2 === o ? this.windowWidth : 1, s *= 1 === o ? $f92fa1e7db8cc046$var$e : 2 === o ? this.windowHeight : 1, i *= this.wheelMultiplier, s *= this.wheelMultiplier, this.emitter.emit("scroll", {
            deltaX: i,
            deltaY: s,
            event: t
        });
    };
    onWindowResize = ()=>{
        this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
    };
}
class $f92fa1e7db8cc046$export$2e2bcd8739ae039 {
    constructor({ wrapper: t = window, content: e = document.documentElement, wheelEventsTarget: i = t, eventsTarget: s = i, smoothWheel: o = !0, syncTouch: n = !1, syncTouchLerp: r = .075, touchInertiaMultiplier: l = 35, duration: h, easing: a = (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t)), lerp: c = !h && .1, infinite: d = !1, orientation: p = "vertical", gestureOrientation: u = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = !0, __experimental__naiveDimensions: S = !1 } = {}){
        this.__isSmooth = !1, this.__isScrolling = !1, this.__isStopped = !1, this.__isLocked = !1, this.onVirtualScroll = ({ deltaX: t, deltaY: e, event: i })=>{
            if (i.ctrlKey) return;
            const s = i.type.includes("touch"), o = i.type.includes("wheel");
            if (this.options.syncTouch && s && "touchstart" === i.type && !this.isStopped && !this.isLocked) return void this.reset();
            const n = 0 === t && 0 === e, r = "vertical" === this.options.gestureOrientation && 0 === e || "horizontal" === this.options.gestureOrientation && 0 === t;
            if (n || r) return;
            let l = i.composedPath();
            if (l = l.slice(0, l.indexOf(this.rootElement)), l.find((t)=>{
                var e, i, n, r, l;
                return (null === (e = t.hasAttribute) || void 0 === e ? void 0 : e.call(t, "data-lenis-prevent")) || s && (null === (i = t.hasAttribute) || void 0 === i ? void 0 : i.call(t, "data-lenis-prevent-touch")) || o && (null === (n = t.hasAttribute) || void 0 === n ? void 0 : n.call(t, "data-lenis-prevent-wheel")) || (null === (r = t.classList) || void 0 === r ? void 0 : r.contains("lenis")) && !(null === (l = t.classList) || void 0 === l ? void 0 : l.contains("lenis-stopped"));
            })) return;
            if (this.isStopped || this.isLocked) return void i.preventDefault();
            if (this.isSmooth = this.options.syncTouch && s || this.options.smoothWheel && o, !this.isSmooth) return this.isScrolling = !1, void this.animate.stop();
            i.preventDefault();
            let h = e;
            "both" === this.options.gestureOrientation ? h = Math.abs(e) > Math.abs(t) ? e : t : "horizontal" === this.options.gestureOrientation && (h = t);
            const a = s && this.options.syncTouch, c = s && "touchend" === i.type && Math.abs(h) > 5;
            c && (h = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + h, Object.assign({
                programmatic: !1
            }, a ? {
                lerp: c ? this.options.syncTouchLerp : 1
            } : {
                lerp: this.options.lerp,
                duration: this.options.duration,
                easing: this.options.easing
            }));
        }, this.onNativeScroll = ()=>{
            if (!this.__preventNextScrollEvent && !this.isScrolling) {
                const t = this.animatedScroll;
                this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t), this.emit();
            }
        }, window.lenisVersion = "1.0.42", t !== document.documentElement && t !== document.body || (t = window), this.options = {
            wrapper: t,
            content: e,
            wheelEventsTarget: i,
            eventsTarget: s,
            smoothWheel: o,
            syncTouch: n,
            syncTouchLerp: r,
            touchInertiaMultiplier: l,
            duration: h,
            easing: a,
            lerp: c,
            infinite: d,
            gestureOrientation: u,
            orientation: p,
            touchMultiplier: m,
            wheelMultiplier: v,
            autoResize: g,
            __experimental__naiveDimensions: S
        }, this.animate = new $f92fa1e7db8cc046$var$Animate, this.emitter = new $f92fa1e7db8cc046$var$Emitter, this.dimensions = new $f92fa1e7db8cc046$var$Dimensions({
            wrapper: t,
            content: e,
            autoResize: g
        }), this.toggleClassName("lenis", !0), this.velocity = 0, this.isLocked = !1, this.isStopped = !1, this.isSmooth = n || o, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1), this.virtualScroll = new $f92fa1e7db8cc046$var$VirtualScroll(s, {
            touchMultiplier: m,
            wheelMultiplier: v
        }), this.virtualScroll.on("scroll", this.onVirtualScroll);
    }
    destroy() {
        this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClassName("lenis", !1), this.toggleClassName("lenis-smooth", !1), this.toggleClassName("lenis-scrolling", !1), this.toggleClassName("lenis-stopped", !1), this.toggleClassName("lenis-locked", !1);
    }
    on(t, e) {
        return this.emitter.on(t, e);
    }
    off(t, e) {
        return this.emitter.off(t, e);
    }
    setScroll(t) {
        this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t;
    }
    resize() {
        this.dimensions.resize();
    }
    emit() {
        this.emitter.emit("scroll", this);
    }
    reset() {
        this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.animate.stop();
    }
    start() {
        this.isStopped && (this.isStopped = !1, this.reset());
    }
    stop() {
        this.isStopped || (this.isStopped = !0, this.animate.stop(), this.reset());
    }
    raf(t) {
        const e = t - (this.time || t);
        this.time = t, this.animate.advance(.001 * e);
    }
    scrollTo(e, { offset: i = 0, immediate: s = !1, lock: o = !1, duration: n = this.options.duration, easing: r = this.options.easing, lerp: l = !n && this.options.lerp, onComplete: h, force: a = !1, programmatic: c = !0 } = {}) {
        if (!this.isStopped && !this.isLocked || a) {
            if ([
                "top",
                "left",
                "start"
            ].includes(e)) e = 0;
            else if ([
                "bottom",
                "right",
                "end"
            ].includes(e)) e = this.limit;
            else {
                let t;
                if ("string" == typeof e ? t = document.querySelector(e) : (null == e ? void 0 : e.nodeType) && (t = e), t) {
                    if (this.options.wrapper !== window) {
                        const t = this.options.wrapper.getBoundingClientRect();
                        i -= this.isHorizontal ? t.left : t.top;
                    }
                    const s = t.getBoundingClientRect();
                    e = (this.isHorizontal ? s.left : s.top) + this.animatedScroll;
                }
            }
            if ("number" == typeof e) {
                if (e += i, e = Math.round(e), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : e = $f92fa1e7db8cc046$var$t(0, e, this.limit), s) return this.animatedScroll = this.targetScroll = e, this.setScroll(this.scroll), this.reset(), void (null == h || h(this));
                if (!c) {
                    if (e === this.targetScroll) return;
                    this.targetScroll = e;
                }
                this.animate.fromTo(this.animatedScroll, e, {
                    duration: n,
                    easing: r,
                    lerp: l,
                    onStart: ()=>{
                        o && (this.isLocked = !0), this.isScrolling = !0;
                    },
                    onUpdate: (t, e)=>{
                        this.isScrolling = !0, this.velocity = t - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t, this.setScroll(this.scroll), c && (this.targetScroll = t), e || this.emit(), e && (this.reset(), this.emit(), null == h || h(this), this.__preventNextScrollEvent = !0, requestAnimationFrame(()=>{
                            delete this.__preventNextScrollEvent;
                        }));
                    }
                });
            }
        }
    }
    get rootElement() {
        return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
    }
    get limit() {
        return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
    get isHorizontal() {
        return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
        return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
    }
    get scroll() {
        var t, e;
        return this.options.infinite ? (t = this.animatedScroll, e = this.limit, (t % e + e) % e) : this.animatedScroll;
    }
    get progress() {
        return 0 === this.limit ? 1 : this.scroll / this.limit;
    }
    get isSmooth() {
        return this.__isSmooth;
    }
    set isSmooth(t) {
        this.__isSmooth !== t && (this.__isSmooth = t, this.toggleClassName("lenis-smooth", t));
    }
    get isScrolling() {
        return this.__isScrolling;
    }
    set isScrolling(t) {
        this.__isScrolling !== t && (this.__isScrolling = t, this.toggleClassName("lenis-scrolling", t));
    }
    get isStopped() {
        return this.__isStopped;
    }
    set isStopped(t) {
        this.__isStopped !== t && (this.__isStopped = t, this.toggleClassName("lenis-stopped", t));
    }
    get isLocked() {
        return this.__isLocked;
    }
    set isLocked(t) {
        this.__isLocked !== t && (this.__isLocked = t, this.toggleClassName("lenis-locked", t));
    }
    get className() {
        let t = "lenis";
        return this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), this.isSmooth && (t += " lenis-smooth"), t;
    }
    toggleClassName(t, e) {
        this.rootElement.classList.toggle(t, e), this.emitter.emit("className change", this);
    }
}



var $2rwrw = parcelRequire("2rwrw");

var $4KH4f = parcelRequire("4KH4f");
(0, $2rwrw.gsap).registerPlugin((0, $4KH4f.ScrollTrigger));
const $f16a859cb452021a$var$lenis = new (0, $f92fa1e7db8cc046$export$2e2bcd8739ae039)({
    lerp: 0.07
});
$f16a859cb452021a$var$lenis.on("scroll", (0, $4KH4f.ScrollTrigger).update);
(0, $2rwrw.gsap).ticker.add((time)=>{
    $f16a859cb452021a$var$lenis.raf(time * 1000);
});
$f16a859cb452021a$var$lenis.stop();
(0, $1dc435e69dec08c5$export$6b05b21262ec0515)("img").then(()=>{
    // Once images are preloaded, remove the 'loading' indicator/class from the body
    document.body.classList.remove("loading");
    $f16a859cb452021a$var$panelloader();
});
const $f16a859cb452021a$var$panelloader = ()=>{
    const box_even = document.querySelectorAll(".box_even");
    const box_odd = document.querySelectorAll(".box_odd");
    const header_text = new SplitType("#text-hero");
    const image_hero = document.querySelector(".image-container");
    const navbar_divider = document.querySelector(".navbar span");
    const navbar_logo = document.querySelector("#navbar-logo");
    function enableLenis() {
        $f16a859cb452021a$var$lenis.start();
    }
    // Images parallax
    const container = document.querySelector(".image-container");
    const img = container.querySelector(".image-parallax");
    const tl_banner = (0, $2rwrw.gsap).timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: false
        }
    });
    tl_banner.fromTo(img, {
        yPercent: -20,
        ease: "none"
    }, {
        yPercent: 20,
        ease: "none"
    });
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
    tl.to(header_text.chars, {
        y: 0,
        stagger: 0.05,
        delay: 0.5,
        duration: 0.1,
        ease: "power3.inOut"
    }, "start"), tl.fromTo(image_hero, {
        x: "100%",
        delay: 1,
        duration: 2,
        ease: "power4.inOut"
    }, {
        x: "-0.05%",
        delay: 1,
        duration: 2,
        opacity: 1,
        ease: "power4.inOut"
    }, "start");
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
};
// menu navigation animation
let $f16a859cb452021a$var$tl_menu = (0, $2rwrw.gsap).timeline({
    paused: true
});
$f16a859cb452021a$var$tl_menu.to(".navbar", {
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
function $f16a859cb452021a$var$openMenu() {
    $f16a859cb452021a$var$tl_menu.play();
}
function $f16a859cb452021a$var$closeMenu() {
    $f16a859cb452021a$var$tl_menu.reverse();
}
document.querySelector(".btn").addEventListener("click", ()=>{
    $f16a859cb452021a$var$openMenu();
});
document.querySelector(".item-2").addEventListener("click", ()=>{
    $f16a859cb452021a$var$closeMenu();
});
const $f16a859cb452021a$var$screenWidth = window.innerWidth;
const $f16a859cb452021a$var$screenHeight = window.innerHeight;
let $f16a859cb452021a$var$random = (0, $2rwrw.gsap).utils.random(0, 100, 4, true);
let $f16a859cb452021a$var$randomImageSize = (0, $2rwrw.gsap).utils.random(200, 500, true);
function $f16a859cb452021a$var$setImages() {
    const images = document.querySelectorAll(".image");
    images.forEach((image)=>{
        let randomY = Math.round($f16a859cb452021a$var$random() * $f16a859cb452021a$var$screenHeight / 200);
        let randomW = Math.round($f16a859cb452021a$var$random() * $f16a859cb452021a$var$screenWidth) / 100;
        //image.style.top = Math.round(screenHeight + randomY) + "px";
        image.style.top = Math.round($f16a859cb452021a$var$screenHeight) + "px";
        image.style.left = randomW + "px";
        if ($f16a859cb452021a$var$screenWidth < 800) {
            image.style.width = Math.round($f16a859cb452021a$var$randomImageSize() / 3) + "px";
            console.log(image.style.width = Math.round($f16a859cb452021a$var$randomImageSize() / 3) + "px");
        } else image.style.width = Math.round($f16a859cb452021a$var$randomImageSize()) + "px";
        // Make larger images appear closer
        image.style.zIndex = Math.round(image.style.width.replace("px", "") / 40);
    });
}
const $f16a859cb452021a$var$animateImageGallery = ()=>{
    (0, $2rwrw.gsap).to(".image", {
        y: function(index, target) {
            return -Math.round(target.offsetHeight + $f16a859cb452021a$var$screenHeight) + "px";
        },
        ease: "none",
        duration: function(index, target) {
            return 10000 / target.style.width.replace("px", "");
        },
        stagger: {
            amount: 3,
            repeat: -1,
            delay: function(index, target) {
                return -10000 / target.style.width.replace("px", "");
            }
        }
    }).progress(0.5);
};
// GSAP Scroll Triggers work section
const $f16a859cb452021a$var$scroll = ()=>{
    [
        ...document.querySelectorAll("[data-split]")
    ].forEach((el)=>{
        $f16a859cb452021a$var$animateWords(el);
    });
};
const $f16a859cb452021a$var$animateWords = (el)=>{
    // from: https://www.npmjs.com/package/split-type#splitting-text
    // Important: The following style should be applied to all target elements. This prevents the characters from shifting slightly when text is split/reverted.
    (0, $2rwrw.gsap).set(el, {
        "font-kerning": "none"
    });
    // Apply SplitType
    const st = new SplitType(el, {
        types: "lines, words"
    });
    const lines = st.lines;
    const tl = (0, $2rwrw.gsap).timeline({
        scrollTrigger: {
            trigger: el,
            start: "center center",
            end: "+=300%",
            scrub: true,
            pin: el
        }
    }).set(el, {
        perspective: 1000
    });
    for (const [linepos, line] of lines.entries()){
        (0, $2rwrw.gsap).set(line, {
            transformStyle: "preserve-3d"
        });
        const words = line.querySelectorAll(".word");
        tl.to(words, {
            ease: "power2",
            opacity: 0,
            xPercent: (pos, _, arr)=>pos < arr.length / 2 ? Math.abs(pos - arr.length / 2) * (0, $2rwrw.gsap).utils.random(-40, -10) : Math.abs(pos - arr.length / 2) * (0, $2rwrw.gsap).utils.random(10, 40),
            yPercent: (pos, _, arr)=>Math.abs(pos - arr.length / 2) * (0, $2rwrw.gsap).utils.random(-80, -40) - 150,
            rotationY: (pos, _, arr)=>pos > arr.length / 2 ? Math.abs(pos - arr.length / 2) * -15 : Math.abs(pos - arr.length / 2) * 15,
            z: (pos, _, arr)=>Math.abs(pos - arr.length / 2) ? (0, $2rwrw.gsap).utils.random(-40, -20) : (0, $2rwrw.gsap).utils.random(20, 40),
            stagger: {
                each: 0.01,
                from: "edges"
            }
        }, linepos * 0.05);
    }
};
$f16a859cb452021a$var$setImages();
$f16a859cb452021a$var$animateImageGallery();
$f16a859cb452021a$var$scroll();
// Expand the about us section
const $f16a859cb452021a$var$aboutUsAnimation = (0, $2rwrw.gsap).to(".about-wrapper", {
    width: "100vw",
    ease: "back"
});
(0, $4KH4f.ScrollTrigger).create({
    trigger: ".about-title",
    start: "top center",
    end: "bottom center",
    scrub: 1,
    animation: $f16a859cb452021a$var$aboutUsAnimation
});
// Event section image full width animation
const $f16a859cb452021a$var$eventAnimation = (0, $2rwrw.gsap).to(".events-transition", {
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
}, 0);
(0, $4KH4f.ScrollTrigger).create({
    trigger: ".events-transition",
    start: "top top",
    end: "+=30%",
    scrub: true,
    pin: true,
    animation: $f16a859cb452021a$var$eventAnimation,
    markers: false
});
// event section color fade transition
const $f16a859cb452021a$var$eventImageFadeAnimation = (0, $2rwrw.gsap).to(".fullwidth-image__overlay", {
    opacity: 0.7
});
(0, $4KH4f.ScrollTrigger).create({
    trigger: ".events-transition",
    start: "top top",
    end: "+=30%",
    scrub: 1,
    animation: $f16a859cb452021a$var$eventImageFadeAnimation,
    markers: false
});
// event section text reveal animation
const $f16a859cb452021a$var$eventTextAnimation = (0, $2rwrw.gsap).from(".fullwidth-image__text", {
    opacity: 0
});
(0, $4KH4f.ScrollTrigger).create({
    trigger: ".events-transition",
    start: "top top",
    end: "+=30%",
    scrub: 1,
    animation: $f16a859cb452021a$var$eventTextAnimation,
    markers: false
});
// work subsection
const $f16a859cb452021a$var$body = document.body;
// .content element
const $f16a859cb452021a$var$contentEl = document.querySelector(".work-subcontent");
// top and bottom overlay overlay elements
const $f16a859cb452021a$var$overlayRows = [
    ...document.querySelectorAll(".overlay__row")
];
// Preview instances array
const $f16a859cb452021a$var$previews = [];
[
    ...document.querySelectorAll(".preview")
].forEach((preview)=>$f16a859cb452021a$var$previews.push(new (0, $014b69a3fbf67b08$export$133773870222880f)(preview)));
// Item instances array
const $f16a859cb452021a$var$items = [];
[
    ...document.querySelectorAll(".item")
].forEach((item, pos)=>$f16a859cb452021a$var$items.push(new (0, $783ed408c6d8e3ef$export$314aaaef607a8c3a)(item, $f16a859cb452021a$var$previews[pos])));
const $f16a859cb452021a$var$openItem = (item)=>{
    (0, $2rwrw.gsap).timeline({
        defaults: {
            duration: 1,
            ease: "power3.inOut"
        }
    }).add(()=>{
        // pointer events none to the content
        $f16a859cb452021a$var$contentEl.classList.add("content--hidden");
    }, "start").addLabel("start", 0).set([
        item.preview.DOM.innerElements,
        item.preview.DOM.backCtrl
    ], {
        opacity: 0
    }, "start").to($f16a859cb452021a$var$overlayRows, {
        scaleY: 1
    }, "start").addLabel("content", "start+=0.6").add(()=>{
        $f16a859cb452021a$var$body.classList.add("preview-visible");
        $f16a859cb452021a$var$body.style.overflow = "hidden";
        item.preview.DOM.el.classList.add("preview--current");
    }, "content")// Image animation (reveal animation)
    .to([
        item.preview.DOM.image,
        item.preview.DOM.imageInner
    ], {
        startAt: {
            y: (pos)=>pos ? "101%" : "-101%"
        },
        y: "0%"
    }, "content").add(()=>{
        for (const line of item.preview.multiLines)line.in();
        (0, $2rwrw.gsap).set(item.preview.DOM.multiLineWrap, {
            opacity: 1,
            delay: 0.1
        });
    }, "content")// animate frame element
    .to(item.preview.DOM.innerElements, {
        ease: "expo",
        startAt: {
            yPercent: 101
        },
        yPercent: 0,
        opacity: 1
    }, "content+=0.3").to(item.preview.DOM.backCtrl, {
        opacity: 1
    }, "content");
};
const $f16a859cb452021a$var$closeItem = (item)=>{
    (0, $2rwrw.gsap).timeline({
        defaults: {
            duration: 1,
            ease: "power3.inOut"
        }
    }).addLabel("start", 0).to(item.preview.DOM.innerElements, {
        yPercent: -101,
        opacity: 0
    }, "start").add(()=>{
        $f16a859cb452021a$var$body.style.overflowY = "visible";
        for (const line of item.preview.multiLines)line.out();
    }, "start").to(item.preview.DOM.backCtrl, {
        opacity: 0
    }, "start").to(item.preview.DOM.image, {
        y: "101%"
    }, "start").to(item.preview.DOM.imageInner, {
        y: "-101%"
    }, "start")// animate frame element
    .addLabel("grid", "start+=0.6").to($f16a859cb452021a$var$overlayRows, {
        //ease: 'expo',
        scaleY: 0,
        onComplete: ()=>{
            item.preview.DOM.el.classList.remove("preview--current");
            $f16a859cb452021a$var$contentEl.classList.remove("content--hidden");
        }
    }, "grid");
};
for (const item of $f16a859cb452021a$var$items){
    // Opens the item preview
    item.DOM.link.addEventListener("click", ()=>$f16a859cb452021a$var$openItem(item));
    // Closes the item preview
    item.preview.DOM.backCtrl.addEventListener("click", ()=>$f16a859cb452021a$var$closeItem(item));
}
// animate text on scroll 
const $f16a859cb452021a$var$tl_intro = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".intro-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        markers: 0
    }
});
// tl_intro.from(
//   ".introduction",
//   {
//     opacity: 0,
//     duration: 1,
//     ease: "power4.inOut",
//   },
//   "start+=10%"
// )
// .from(
//   ".introduction",
//   {
//     y: "30%",
//     duration: 1,
//     ease: "power4.inOut",
//   },
//   "start"
// )
$f16a859cb452021a$var$tl_intro.from(".quote", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut"
}, "start+=10%").from(".quote", {
    y: "30%",
    duration: 1,
    ease: "power4.inOut"
}, "start").from(".quotation-mark", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut"
}, "start+=10%").from(".quotation-mark", {
    y: "30%",
    duration: 1,
    ease: "power4.inOut"
}, "start");
const $f16a859cb452021a$var$tl_about = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".welcome-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1
    }
});
$f16a859cb452021a$var$tl_about.from(".left-welcome", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
    stagger: 0.05
}, "start+=10%").from(".left-welcome", {
    x: "30%",
    duration: 1,
    ease: "power4.inOut",
    stagger: 0.05
}, "start");
const $f16a859cb452021a$var$tl_welcome = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".about-discription",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1
    }
});
$f16a859cb452021a$var$tl_welcome.from(".contentLeft", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
    stagger: 0.05
}, "start+=10%").from(".contentLeft", {
    x: "-30%",
    duration: 1,
    ease: "power4.inOut",
    stagger: 0.05
}, "start").from(".contentRight", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
    stagger: 0.05
}, "start+=10%").from(".contentRight", {
    x: "30%",
    duration: 1,
    ease: "power4.inOut",
    stagger: 0.05
}, "start");
// experiences section animation 
const $f16a859cb452021a$var$tl_experience_1 = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".text-1",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1
    }
});
$f16a859cb452021a$var$tl_experience_1.from(".text-1", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut"
}, "start+=10%").from(".text-1", {
    y: "30%",
    duration: 1,
    ease: "power4.inOut"
}, "start");
const $f16a859cb452021a$var$tl_experience_2 = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".Img-1",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1
    }
});
$f16a859cb452021a$var$tl_experience_2.from(".Img-1", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut"
}, "start+=10%").from(".Img-1", {
    x: "-30%",
    duration: 1,
    ease: "power4.inOut"
}, "start");
const $f16a859cb452021a$var$tl_experience_3 = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".img-2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1
    }
});
$f16a859cb452021a$var$tl_experience_3.from(".img-2", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
    delay: 1
}, "start+=10%").from(".img-2", {
    x: "30%",
    duration: 1,
    ease: "power4.inOut",
    delay: 1
}, "start");
const $f16a859cb452021a$var$tl_experience_4 = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".text-2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1
    }
});
$f16a859cb452021a$var$tl_experience_4.from(".text-2", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut"
}, "start+=10%").from(".text-2", {
    x: "30%",
    duration: 1,
    ease: "power4.inOut"
}, "start");
const $f16a859cb452021a$var$tl_experience_5 = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".img-3",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1
    }
});
$f16a859cb452021a$var$tl_experience_5.from(".img-3", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut"
}, "start+=10%").from(".img-3", {
    x: "-30%",
    duration: 1,
    ease: "power4.inOut"
}, "start");
const $f16a859cb452021a$var$tl_experience_6 = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".text-3",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1
    }
});
$f16a859cb452021a$var$tl_experience_6.from(".text-3", {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut"
}, "start+=10%").from(".text-3", {
    y: "-30%",
    duration: 1,
    ease: "power4.inOut"
}, "start");
$f16a859cb452021a$var$lenis.stop();
// storytelling section 
let $f16a859cb452021a$var$lenis_new;
// Selecting DOM elements
const $f16a859cb452021a$var$contentElements = [
    ...document.querySelectorAll(".content--sticky")
];
const $f16a859cb452021a$var$totalContentElements = $f16a859cb452021a$var$contentElements.length;
// Initializes Lenis for smooth scrolling with specific properties
const $f16a859cb452021a$var$initSmoothScrolling = ()=>{
    // Instantiate the Lenis object with specified properties
    $f16a859cb452021a$var$lenis_new = new (0, $f92fa1e7db8cc046$export$2e2bcd8739ae039)({
        lerp: 0.2,
        smoothWheel: true // Enables smooth scrolling for mouse wheel events
    });
    // Update ScrollTrigger each time the user scrolls
    $f16a859cb452021a$var$lenis_new.on("scroll", ()=>(0, $4KH4f.ScrollTrigger).update());
    // Define a function to run at each animation frame
    const scrollFn = (time)=>{
        $f16a859cb452021a$var$lenis_new.raf(time); // Run Lenis' requestAnimationFrame method
        requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
    };
    // Start the animation frame loop
    requestAnimationFrame(scrollFn);
};
// Function to handle scroll-triggered animations
const $f16a859cb452021a$var$scroll_story = ()=>{
    $f16a859cb452021a$var$contentElements.forEach((el, position)=>{
        const isLast = position === $f16a859cb452021a$var$totalContentElements - 1;
        const isPreLast = position === $f16a859cb452021a$var$totalContentElements - 2;
        (0, $2rwrw.gsap).timeline({
            scrollTrigger: {
                trigger: el,
                start: ()=>{
                    if (isLast) return "top top";
                    else if (isPreLast) return "bottom top";
                    else return "bottom+=100% top";
                },
                end: "+=100%",
                scrub: true
            }
        }).to(el, {
            ease: "none",
            yPercent: -100
        }, 0);
    });
};
// Initialization function
const $f16a859cb452021a$var$init = ()=>{
    $f16a859cb452021a$var$initSmoothScrolling(); // Initialize Lenis for smooth scrolling
    $f16a859cb452021a$var$scroll_story(); // Apply scroll-triggered animations
};
$f16a859cb452021a$var$init();
const $f16a859cb452021a$var$tl_storytelling_1 = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".seperator-storytelling",
        start: "top bottom-=10%"
    }
});
$f16a859cb452021a$var$tl_storytelling_1.from(".seperator-storytelling", {
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
}, "start+=10%").from(".seperator-storytelling", {
    x: "100%",
    duration: 1.5,
    ease: "power4.out"
}, "start");
const $f16a859cb452021a$var$tl_events_sep = (0, $2rwrw.gsap).timeline({
    scrollTrigger: {
        trigger: ".seperator-events",
        start: "top bottom-=10%"
    }
});
$f16a859cb452021a$var$tl_events_sep.from(".seperator-events", {
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
}, "start+=10%").from(".seperator-events", {
    x: "-100%",
    duration: 1.5,
    ease: "power4.out"
}, "start");


