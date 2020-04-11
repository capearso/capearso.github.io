!function() {
    "use strict";
    function t() {
        return 0;
    }
    function e() {
        return f.length = 0, f;
    }
    function r(t) {
        return Boolean(t) && "[object Object]" === Object.prototype.toString.call(t);
    }
    function n(t) {
        return f.push(t), f;
    }
    function i(t, e, r, n) {
        for (var i in t) if (!o(t[i], n.exclude) && r.matches(t[i], e)) return t;
    }
    function o(t, e) {
        for (var r = !1, n = 0, i = (e = e || []).length; n < i; n++) {
            var o = e[n];
            !r && new RegExp(t).test(o) && (r = !0);
        }
        return r;
    }
    var a = {
        load: function(t, e) {
            var r = window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            r.open("GET", t, !0), r.onreadystatechange = (n = r, i = e, function() {
                if (4 === n.readyState && 200 === n.status) try {
                    i(null, JSON.parse(n.responseText));
                } catch (t) {
                    i(t, null);
                }
            }), r.send();
            var n, i;
        }
    }, u = function(t, e) {
        var r = e.length, n = t.length;
        if (r < n) return !1;
        if (n === r) return t === e;
        t: for (var i = 0, o = 0; i < n; i++) {
            for (var a = t.charCodeAt(i); o < r; ) if (e.charCodeAt(o++) === a) continue t;
            return !1;
        }
        return !0;
    }, l = new function() {
        this.matches = function(t, e) {
            return u(e.toLowerCase(), t.toLowerCase());
        };
    }, c = new function() {
        this.matches = function(t, e) {
            return "string" == typeof t && 0 <= (t = t.trim()).toLowerCase().indexOf(e.toLowerCase());
        };
    }, s = {
        put: function(t) {
            if (r(t)) return n(t);
            if (i = t, Boolean(i) && "[object Array]" === Object.prototype.toString.call(i)) return function(t) {
                var i = [];
                e();
                for (var o = 0, a = t.length; o < a; o++) r(t[o]) && i.push(n(t[o]));
                return i;
            }(t);
            var i;
        },
        clear: e,
        search: function(t) {
            return t ? function(t, e, r, n) {
                for (var o = [], a = 0; a < t.length && o.length < n.limit; a++) {
                    var u = i(t[a], e, r, n);
                    u && o.push(u);
                }
                return o;
            }(f, t, p.searchStrategy, p).sort(p.sort) : [];
        },
        setOptions: function(e) {
            (p = e || {}).fuzzy = e.fuzzy || !1, p.limit = e.limit || 10, p.searchStrategy = e.fuzzy ? l : c,
            p.sort = e.sort || t;
        }
    }, f = [], p = {};
    p.fuzzy = !1, p.limit = 10, p.searchStrategy = p.fuzzy ? l : c, p.sort = t;
    var h = {
        compile: function(t) {
            return d.template.replace(d.pattern, (function(e, r) {
                var n = d.middleware(r, t[r], d.template);
                return void 0 !== n ? n : t[r] || e;
            }));
        },
        setOptions: function(t) {
            d.pattern = t.pattern || d.pattern, d.template = t.template || d.template, "function" == typeof t.middleware && (d.middleware = t.middleware);
        }
    }, d = {};
    d.pattern = /\{(.*?)\}/g, d.template = "", d.middleware = function() {};
    var m = {
        merge: function(t, e) {
            var r = {};
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n], void 0 !== e[n] && (r[n] = e[n]));
            return r;
        },
        isJSON: function(t) {
            try {
                return !!(t instanceof Object && JSON.parse(JSON.stringify(t)));
            } catch (t) {
                return !1;
            }
        }
    };
    !function(t) {
        function e(t) {
            u.success(t), s.put(t), u.searchInput.addEventListener("keyup", (function(t) {
                var e;
                e = t.which, -1 === [ 13, 16, 20, 37, 38, 39, 40, 91 ].indexOf(e) && (r(), i(t.target.value));
            }));
        }
        function r() {
            results = u.resultsContainer;
            let result = results.lastElementChild;
            while (result) {
                results.removeChild(result);
                result = results.lastElementChild;
            }
        }
        function n(t) {
            let n = document.createRange().createContextualFragment(t);
            u.resultsContainer.appendChild(n);
        }
        function i(t) {
            var e;
            (e = t) && 0 < e.length && (r(), function(t) {
                var e = t.length;
                if (0 === e) return n(u.noResultsText);
                for (var r = 0; r < e; r++) n(h.compile(t[r]));
            }(s.search(t)));
        }
        function o(t) {
            throw new Error("SimpleJekyllSearch --- " + t);
        }
        var u = {
            searchInput: null,
            resultsContainer: null,
            json: [],
            success: Function.prototype,
            searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
            templateMiddleware: Function.prototype,
            sortMiddleware: function() {
                return 0;
            },
            noResultsText: "No results found",
            limit: 10,
            fuzzy: !1,
            exclude: []
        }, l = [ "searchInput", "resultsContainer", "json" ], c = function t(e) {
            if (!((r = e) && void 0 !== r.required && r.required instanceof Array)) throw new Error("-- OptionsValidator: required options missing");
            var r;
            if (!(this instanceof t)) return new t(e);
            var n = e.required;
            this.getRequiredOptions = function() {
                return n;
            }, this.validate = function(t) {
                var e = [];
                return n.forEach((function(r) {
                    void 0 === t[r] && e.push(r);
                })), e;
            };
        }({
            required: l
        });
        t.SimpleJekyllSearch = function(t) {
            var r;
            return 0 < c.validate(t).length && o("You must specify the following required options: " + l),
            u = m.merge(u, t), h.setOptions({
                template: u.searchResultTemplate,
                middleware: u.templateMiddleware
            }), s.setOptions({
                fuzzy: u.fuzzy,
                limit: u.limit,
                sort: u.sortMiddleware
            }), m.isJSON(u.json) ? e(u.json) : (r = u.json, a.load(r, (function(t, n) {
                t && o("failed to get JSON (" + r + ")"), e(n);
            }))), {
                search: i
            };
        }, t.SimpleJekyllSearch.init = t.SimpleJekyllSearch, "function" == typeof t.SimpleJekyllSearchInit && t.SimpleJekyllSearchInit.call(this, t.SimpleJekyllSearch);
    }(window);
}();
