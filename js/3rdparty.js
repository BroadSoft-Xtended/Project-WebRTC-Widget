/***************************************************
* Created on Mon Jan 14 15:32:43 GMT 2013 by:
*
* Copyright 2013 Broadsoft
* http://www.broadsoft.com
***************************************************/


!function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a);
    } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [], d = c.slice, e = c.concat, f = c.push, g = c.indexOf, h = {}, i = h.toString, j = h.hasOwnProperty, k = "".trim, l = {}, m = "1.11.0", n = function(a, b) {
        return new n.fn.init(a, b);
    }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function(a, b) {
        return b.toUpperCase();
    };
    n.fn = n.prototype = {
        jquery: m,
        constructor: n,
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this);
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this);
        },
        pushStack: function(a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b;
        },
        each: function(a, b) {
            return n.each(this, a, b);
        },
        map: function(a) {
            return this.pushStack(n.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [ this[c] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: f,
        sort: c.sort,
        splice: c.splice
    }, n.extend = n.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), 
        h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], 
        c = e[d], g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1, 
        f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {}, g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g;
    }, n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a);
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === n.type(a);
        },
        isArray: Array.isArray || function(a) {
            return "array" === n.type(a);
        },
        isWindow: function(a) {
            return null != a && a == a.window;
        },
        isNumeric: function(a) {
            return a - parseFloat(a) >= 0;
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
            try {
                if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (c) {
                return !1;
            }
            if (l.ownLast) for (b in a) return j.call(a, b);
            for (b in a) ;
            return void 0 === b || j.call(a, b);
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a;
        },
        globalEval: function(b) {
            b && n.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b);
            })(b);
        },
        camelCase: function(a) {
            return a.replace(p, "ms-").replace(q, r);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function(a, b, c) {
            var d, e = 0, f = a.length, g = s(a);
            if (c) {
                if (g) {
                    for (;f > e; e++) if (d = b.apply(a[e], c), d === !1) break;
                } else for (e in a) if (d = b.apply(a[e], c), d === !1) break;
            } else if (g) {
                for (;f > e; e++) if (d = b.call(a[e], e, a[e]), d === !1) break;
            } else for (e in a) if (d = b.call(a[e], e, a[e]), d === !1) break;
            return a;
        },
        trim: k && !k.call("﻿ ") ? function(a) {
            return null == a ? "" : k.call(a);
        } : function(a) {
            return null == a ? "" : (a + "").replace(o, "");
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [ a ] : a) : f.call(c, a)), 
            c;
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (g) return g.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c;
            }
            return -1;
        },
        merge: function(a, b) {
            var c = +b.length, d = 0, e = a.length;
            while (c > d) a[e++] = b[d++];
            if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
            return a.length = e, a;
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e;
        },
        map: function(a, b, c) {
            var d, f = 0, g = a.length, h = s(a), i = [];
            if (h) for (;g > f; f++) d = b(a[f], f, c), null != d && i.push(d); else for (f in a) d = b(a[f], f, c), 
            null != d && i.push(d);
            return e.apply([], i);
        },
        guid: 1,
        proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (f = a[b], b = a, a = f), n.isFunction(a) ? (c = d.call(arguments, 2), 
            e = function() {
                return a.apply(b || this, c.concat(d.call(arguments)));
            }, e.guid = a.guid = a.guid || n.guid++, e) : void 0;
        },
        now: function() {
            return +new Date();
        },
        support: l
    }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase();
    });
    function s(a) {
        var b = a.length, c = n.type(a);
        return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
    }
    var t = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = "sizzle" + -new Date(), t = a.document, u = 0, v = 0, w = eb(), x = eb(), y = eb(), z = function(a, b) {
            return a === b && (j = !0), 0;
        }, A = "undefined", B = 1 << 31, C = {}.hasOwnProperty, D = [], E = D.pop, F = D.push, G = D.push, H = D.slice, I = D.indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
            return -1;
        }, J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", K = "[\\x20\\t\\r\\n\\f]", L = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", M = L.replace("w", "w#"), N = "\\[" + K + "*(" + L + ")" + K + "*(?:([*^$|!~]?=)" + K + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + M + ")|)|)" + K + "*\\]", O = ":(" + L + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + N.replace(3, 8) + ")*)|.*)\\)|)", P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"), Q = new RegExp("^" + K + "*," + K + "*"), R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"), S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"), T = new RegExp(O), U = new RegExp("^" + M + "$"), V = {
            ID: new RegExp("^#(" + L + ")"),
            CLASS: new RegExp("^\\.(" + L + ")"),
            TAG: new RegExp("^(" + L.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + N),
            PSEUDO: new RegExp("^" + O),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + J + ")$", "i"),
            needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i")
        }, W = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, $ = /[+~]/, _ = /'|\\/g, ab = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"), bb = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        };
        try {
            G.apply(D = H.call(t.childNodes), t.childNodes), D[t.childNodes.length].nodeType;
        } catch (cb) {
            G = {
                apply: D.length ? function(a, b) {
                    F.apply(a, H.call(b));
                } : function(a, b) {
                    var c = a.length, d = 0;
                    while (a[c++] = b[d++]) ;
                    a.length = c - 1;
                }
            };
        }
        function db(a, b, d, e) {
            var f, g, h, i, j, m, p, q, u, v;
            if ((b ? b.ownerDocument || b : t) !== l && k(b), b = b || l, d = d || [], !a || "string" != typeof a) return d;
            if (1 !== (i = b.nodeType) && 9 !== i) return [];
            if (n && !e) {
                if (f = Z.exec(a)) if (h = f[1]) {
                    if (9 === i) {
                        if (g = b.getElementById(h), !g || !g.parentNode) return d;
                        if (g.id === h) return d.push(g), d;
                    } else if (b.ownerDocument && (g = b.ownerDocument.getElementById(h)) && r(b, g) && g.id === h) return d.push(g), 
                    d;
                } else {
                    if (f[2]) return G.apply(d, b.getElementsByTagName(a)), d;
                    if ((h = f[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(h)), 
                    d;
                }
                if (c.qsa && (!o || !o.test(a))) {
                    if (q = p = s, u = b, v = 9 === i && a, 1 === i && "object" !== b.nodeName.toLowerCase()) {
                        m = ob(a), (p = b.getAttribute("id")) ? q = p.replace(_, "\\$&") : b.setAttribute("id", q), 
                        q = "[id='" + q + "'] ", j = m.length;
                        while (j--) m[j] = q + pb(m[j]);
                        u = $.test(a) && mb(b.parentNode) || b, v = m.join(",");
                    }
                    if (v) try {
                        return G.apply(d, u.querySelectorAll(v)), d;
                    } catch (w) {} finally {
                        p || b.removeAttribute("id");
                    }
                }
            }
            return xb(a.replace(P, "$1"), b, d, e);
        }
        function eb() {
            var a = [];
            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
            }
            return b;
        }
        function fb(a) {
            return a[s] = !0, a;
        }
        function gb(a) {
            var b = l.createElement("div");
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null;
            }
        }
        function hb(a, b) {
            var c = a.split("|"), e = a.length;
            while (e--) d.attrHandle[c[e]] = b;
        }
        function ib(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || B) - (~a.sourceIndex || B);
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function jb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function kb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function lb(a) {
            return fb(function(b) {
                return b = +b, fb(function(c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }
        function mb(a) {
            return a && typeof a.getElementsByTagName !== A && a;
        }
        c = db.support = {}, f = db.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1;
        }, k = db.setDocument = function(a) {
            var b, e = a ? a.ownerDocument || a : t, g = e.defaultView;
            return e !== l && 9 === e.nodeType && e.documentElement ? (l = e, m = e.documentElement, 
            n = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function() {
                k();
            }, !1) : g.attachEvent && g.attachEvent("onunload", function() {
                k();
            })), c.attributes = gb(function(a) {
                return a.className = "i", !a.getAttribute("className");
            }), c.getElementsByTagName = gb(function(a) {
                return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length;
            }), c.getElementsByClassName = Y.test(e.getElementsByClassName) && gb(function(a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 
                2 === a.getElementsByClassName("i").length;
            }), c.getById = gb(function(a) {
                return m.appendChild(a).id = s, !e.getElementsByName || !e.getElementsByName(s).length;
            }), c.getById ? (d.find.ID = function(a, b) {
                if (typeof b.getElementById !== A && n) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [ c ] : [];
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(ab, bb);
                return function(a) {
                    return a.getAttribute("id") === b;
                };
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(ab, bb);
                return function(a) {
                    var c = typeof a.getAttributeNode !== A && a.getAttributeNode("id");
                    return c && c.value === b;
                };
            }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return typeof b.getElementsByTagName !== A ? b.getElementsByTagName(a) : void 0;
            } : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d;
                }
                return f;
            }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return typeof b.getElementsByClassName !== A && n ? b.getElementsByClassName(a) : void 0;
            }, p = [], o = [], (c.qsa = Y.test(e.querySelectorAll)) && (gb(function(a) {
                a.innerHTML = "<select t=''><option selected=''></option></select>", a.querySelectorAll("[t^='']").length && o.push("[*^$]=" + K + "*(?:''|\"\")"), 
                a.querySelectorAll("[selected]").length || o.push("\\[" + K + "*(?:value|" + J + ")"), 
                a.querySelectorAll(":checked").length || o.push(":checked");
            }), gb(function(a) {
                var b = e.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && o.push("name" + K + "*[*^$|!~]?="), 
                a.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), 
                o.push(",.*:");
            })), (c.matchesSelector = Y.test(q = m.webkitMatchesSelector || m.mozMatchesSelector || m.oMatchesSelector || m.msMatchesSelector)) && gb(function(a) {
                c.disconnectedMatch = q.call(a, "div"), q.call(a, "[s!='']:x"), p.push("!=", O);
            }), o = o.length && new RegExp(o.join("|")), p = p.length && new RegExp(p.join("|")), 
            b = Y.test(m.compareDocumentPosition), r = b || Y.test(m.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function(a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;
                return !1;
            }, z = b ? function(a, b) {
                if (a === b) return j = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === t && r(t, a) ? -1 : b === e || b.ownerDocument === t && r(t, b) ? 1 : i ? I.call(i, a) - I.call(i, b) : 0 : 4 & d ? -1 : 1);
            } : function(a, b) {
                if (a === b) return j = !0, 0;
                var c, d = 0, f = a.parentNode, g = b.parentNode, h = [ a ], k = [ b ];
                if (!f || !g) return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : i ? I.call(i, a) - I.call(i, b) : 0;
                if (f === g) return ib(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) k.unshift(c);
                while (h[d] === k[d]) d++;
                return d ? ib(h[d], k[d]) : h[d] === t ? -1 : k[d] === t ? 1 : 0;
            }, e) : l;
        }, db.matches = function(a, b) {
            return db(a, null, null, b);
        }, db.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== l && k(a), b = b.replace(S, "='$1']"), !(!c.matchesSelector || !n || p && p.test(b) || o && o.test(b))) try {
                var d = q.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
            } catch (e) {}
            return db(b, l, null, [ a ]).length > 0;
        }, db.contains = function(a, b) {
            return (a.ownerDocument || a) !== l && k(a), r(a, b);
        }, db.attr = function(a, b) {
            (a.ownerDocument || a) !== l && k(a);
            var e = d.attrHandle[b.toLowerCase()], f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !n) : void 0;
            return void 0 !== f ? f : c.attributes || !n ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
        }, db.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }, db.uniqueSort = function(a) {
            var b, d = [], e = 0, f = 0;
            if (j = !c.detectDuplicates, i = !c.sortStable && a.slice(0), a.sort(z), j) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1);
            }
            return i = null, a;
        }, e = db.getText = function(a) {
            var b, c = "", d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
                } else if (3 === f || 4 === f) return a.nodeValue;
            } else while (b = a[d++]) c += e(b);
            return c;
        }, d = db.selectors = {
            cacheLength: 50,
            createPseudo: fb,
            match: V,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ab, bb), a[3] = (a[4] || a[5] || "").replace(ab, bb), 
                    "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || db.error(a[0]), 
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && db.error(a[0]), 
                    a;
                },
                PSEUDO: function(a) {
                    var b, c = !a[5] && a[2];
                    return V.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && T.test(c) && (b = ob(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), 
                    a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ab, bb).toLowerCase();
                    return "*" === a ? function() {
                        return !0;
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                },
                CLASS: function(a) {
                    var b = w[a + " "];
                    return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && w(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== A && a.getAttribute("class") || "");
                    });
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = db.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
                    };
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode;
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), t = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling";
                                }
                                return !0;
                            }
                            if (o = [ g ? q.firstChild : q.lastChild ], g && t) {
                                k = q[s] || (q[s] = {}), j = k[a] || [], n = j[0] === u && j[1], m = j[0] === u && j[2], 
                                l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [ u, n, m ];
                                    break;
                                }
                            } else if (t && (j = (b[s] || (b[s] = {}))[a]) && j[0] === u) m = j[1]; else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (t && ((l[s] || (l[s] = {}))[a] = [ u, m ]), 
                            l === b)) break;
                            return m -= e, m === d || m % d === 0 && m / d >= 0;
                        }
                    };
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || db.error("unsupported pseudo: " + a);
                    return e[s] ? e(b) : e.length > 1 ? (c = [ a, a, "", b ], d.setFilters.hasOwnProperty(a.toLowerCase()) ? fb(function(a, c) {
                        var d, f = e(a, b), g = f.length;
                        while (g--) d = I.call(a, f[g]), a[d] = !(c[d] = f[g]);
                    }) : function(a) {
                        return e(a, 0, c);
                    }) : e;
                }
            },
            pseudos: {
                not: fb(function(a) {
                    var b = [], c = [], d = g(a.replace(P, "$1"));
                    return d[s] ? fb(function(a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--) (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop();
                    };
                }),
                has: fb(function(a) {
                    return function(b) {
                        return db(a, b).length > 0;
                    };
                }),
                contains: fb(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
                    };
                }),
                lang: fb(function(a) {
                    return U.test(a || "") || db.error("unsupported lang: " + a), a = a.replace(ab, bb).toLowerCase(), 
                    function(b) {
                        var c;
                        do if (c = n ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), 
                        c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1;
                    };
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id;
                },
                root: function(a) {
                    return a === m;
                },
                focus: function(a) {
                    return a === l.activeElement && (!l.hasFocus || l.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                },
                enabled: function(a) {
                    return a.disabled === !1;
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(a) {
                    return !d.pseudos.empty(a);
                },
                header: function(a) {
                    return X.test(a.nodeName);
                },
                input: function(a) {
                    return W.test(a.nodeName);
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b;
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                },
                first: lb(function() {
                    return [ 0 ];
                }),
                last: lb(function(a, b) {
                    return [ b - 1 ];
                }),
                eq: lb(function(a, b, c) {
                    return [ 0 > c ? c + b : c ];
                }),
                even: lb(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a;
                }),
                odd: lb(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a;
                }),
                lt: lb(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                    return a;
                }),
                gt: lb(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                    return a;
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) d.pseudos[b] = jb(b);
        for (b in {
            submit: !0,
            reset: !0
        }) d.pseudos[b] = kb(b);
        function nb() {}
        nb.prototype = d.filters = d.pseudos, d.setFilters = new nb();
        function ob(a, b) {
            var c, e, f, g, h, i, j, k = x[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = Q.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), 
                c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(P, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), 
                f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break;
            }
            return b ? h.length : h ? db.error(a) : x(a, i).slice(0);
        }
        function pb(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function qb(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = v++;
            return b.first ? function(b, c, f) {
                while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f);
            } : function(b, c, g) {
                var h, i, j = [ u, f ];
                if (g) {
                    while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                } else while (b = b[d]) if (1 === b.nodeType || e) {
                    if (i = b[s] || (b[s] = {}), (h = i[d]) && h[0] === u && h[1] === f) return j[2] = h[2];
                    if (i[d] = j, j[2] = a(b, c, g)) return !0;
                }
            };
        }
        function rb(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return !1;
                return !0;
            } : a[0];
        }
        function sb(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), 
            j && b.push(h));
            return g;
        }
        function tb(a, b, c, d, e, f) {
            return d && !d[s] && (d = tb(d)), e && !e[s] && (e = tb(e, f)), fb(function(f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || wb(b || "*", h.nodeType ? [ h ] : h, []), q = !a || !f && b ? p : sb(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = sb(r, n), d(j, [], h, i), k = j.length;
                    while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--) (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i);
                        }
                        k = r.length;
                        while (k--) (l = r[k]) && (j = e ? I.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
                    }
                } else r = sb(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r);
            });
        }
        function ub(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], i = g || d.relative[" "], j = g ? 1 : 0, k = qb(function(a) {
                return a === b;
            }, i, !0), l = qb(function(a) {
                return I.call(b, a) > -1;
            }, i, !0), m = [ function(a, c, d) {
                return !g && (d || c !== h) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
            } ]; f > j; j++) if (c = d.relative[a[j].type]) m = [ qb(rb(m), c) ]; else {
                if (c = d.filter[a[j].type].apply(null, a[j].matches), c[s]) {
                    for (e = ++j; f > e; e++) if (d.relative[a[e].type]) break;
                    return tb(j > 1 && rb(m), j > 1 && pb(a.slice(0, j - 1).concat({
                        value: " " === a[j - 2].type ? "*" : ""
                    })).replace(P, "$1"), c, e > j && ub(a.slice(j, e)), f > e && ub(a = a.slice(e)), f > e && pb(a));
                }
                m.push(c);
            }
            return rb(m);
        }
        function vb(a, b) {
            var c = b.length > 0, e = a.length > 0, f = function(f, g, i, j, k) {
                var m, n, o, p = 0, q = "0", r = f && [], s = [], t = h, v = f || e && d.find.TAG("*", k), w = u += null == t ? 1 : Math.random() || .1, x = v.length;
                for (k && (h = g !== l && g); q !== x && null != (m = v[q]); q++) {
                    if (e && m) {
                        n = 0;
                        while (o = a[n++]) if (o(m, g, i)) {
                            j.push(m);
                            break;
                        }
                        k && (u = w);
                    }
                    c && ((m = !o && m) && p--, f && r.push(m));
                }
                if (p += q, c && q !== p) {
                    n = 0;
                    while (o = b[n++]) o(r, s, g, i);
                    if (f) {
                        if (p > 0) while (q--) r[q] || s[q] || (s[q] = E.call(j));
                        s = sb(s);
                    }
                    G.apply(j, s), k && !f && s.length > 0 && p + b.length > 1 && db.uniqueSort(j);
                }
                return k && (u = w, h = t), r;
            };
            return c ? fb(f) : f;
        }
        g = db.compile = function(a, b) {
            var c, d = [], e = [], f = y[a + " "];
            if (!f) {
                b || (b = ob(a)), c = b.length;
                while (c--) f = ub(b[c]), f[s] ? d.push(f) : e.push(f);
                f = y(a, vb(e, d));
            }
            return f;
        };
        function wb(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) db(a, b[d], c);
            return c;
        }
        function xb(a, b, e, f) {
            var h, i, j, k, l, m = ob(a);
            if (!f && 1 === m.length) {
                if (i = m[0] = m[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && c.getById && 9 === b.nodeType && n && d.relative[i[1].type]) {
                    if (b = (d.find.ID(j.matches[0].replace(ab, bb), b) || [])[0], !b) return e;
                    a = a.slice(i.shift().value.length);
                }
                h = V.needsContext.test(a) ? 0 : i.length;
                while (h--) {
                    if (j = i[h], d.relative[k = j.type]) break;
                    if ((l = d.find[k]) && (f = l(j.matches[0].replace(ab, bb), $.test(i[0].type) && mb(b.parentNode) || b))) {
                        if (i.splice(h, 1), a = f.length && pb(i), !a) return G.apply(e, f), e;
                        break;
                    }
                }
            }
            return g(a, m)(f, b, !n, e, $.test(a) && mb(b.parentNode) || b), e;
        }
        return c.sortStable = s.split("").sort(z).join("") === s, c.detectDuplicates = !!j, 
        k(), c.sortDetached = gb(function(a) {
            return 1 & a.compareDocumentPosition(l.createElement("div"));
        }), gb(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
        }) || hb("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }), c.attributes && gb(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
        }) || hb("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
        }), gb(function(a) {
            return null == a.getAttribute("disabled");
        }) || hb(J, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), db;
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, 
    n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = n.expr.match.needsContext, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, w = /^.[^:#\[\.,]*$/;
    function x(a, b, c) {
        if (n.isFunction(b)) return n.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c;
        });
        if (b.nodeType) return n.grep(a, function(a) {
            return a === b !== c;
        });
        if ("string" == typeof b) {
            if (w.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a);
        }
        return n.grep(a, function(a) {
            return n.inArray(a, b) >= 0 !== c;
        });
    }
    n.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [ d ] : [] : n.find.matches(a, n.grep(b, function(a) {
            return 1 === a.nodeType;
        }));
    }, n.fn.extend({
        find: function(a) {
            var b, c = [], d = this, e = d.length;
            if ("string" != typeof a) return this.pushStack(n(a).filter(function() {
                for (b = 0; e > b; b++) if (n.contains(d[b], this)) return !0;
            }));
            for (b = 0; e > b; b++) n.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? n.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, 
            c;
        },
        filter: function(a) {
            return this.pushStack(x(this, a || [], !1));
        },
        not: function(a) {
            return this.pushStack(x(this, a || [], !0));
        },
        is: function(a) {
            return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length;
        }
    });
    var y, z = a.document, A = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, B = n.fn.init = function(a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [ null, a, null ] : A.exec(a), 
            !c || !c[1] && b) return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : z, !0)), 
                v.test(c[1]) && n.isPlainObject(b)) for (c in b) n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this;
            }
            if (d = z.getElementById(c[2]), d && d.parentNode) {
                if (d.id !== c[2]) return y.find(a);
                this.length = 1, this[0] = d;
            }
            return this.context = z, this.selector = a, this;
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, 
        this.context = a.context), n.makeArray(a, this));
    };
    B.prototype = n.fn, y = n(z);
    var C = /^(?:parents|prev(?:Until|All))/, D = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    n.extend({
        dir: function(a, b, c) {
            var d = [], e = a[b];
            while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !n(e).is(c))) 1 === e.nodeType && d.push(e), 
            e = e[b];
            return d;
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c;
        }
    }), n.fn.extend({
        has: function(a) {
            var b, c = n(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0;
            });
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                f.push(c);
                break;
            }
            return this.pushStack(f.length > 1 ? n.unique(f) : f);
        },
        index: function(a) {
            return a ? "string" == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(a, b) {
            return this.pushStack(n.unique(n.merge(this.get(), n(a, b))));
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    });
    function E(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a;
    }
    n.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function(a) {
            return n.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return n.dir(a, "parentNode", c);
        },
        next: function(a) {
            return E(a, "nextSibling");
        },
        prev: function(a) {
            return E(a, "previousSibling");
        },
        nextAll: function(a) {
            return n.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return n.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return n.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return n.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return n.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return n.sibling(a.firstChild);
        },
        contents: function(a) {
            return n.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes);
        }
    }, function(a, b) {
        n.fn[a] = function(c, d) {
            var e = n.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), 
            this.length > 1 && (D[a] || (e = n.unique(e)), C.test(a) && (e = e.reverse())), 
            this.pushStack(e);
        };
    });
    var F = /\S+/g, G = {};
    function H(a) {
        var b = G[a] = {};
        return n.each(a.match(F) || [], function(a, c) {
            b[c] = !0;
        }), b;
    }
    n.Callbacks = function(a) {
        a = "string" == typeof a ? G[a] || H(a) : n.extend({}, a);
        var b, c, d, e, f, g, h = [], i = !a.once && [], j = function(l) {
            for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                c = !1;
                break;
            }
            b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable());
        }, k = {
            add: function() {
                if (h) {
                    var d = h.length;
                    !function f(b) {
                        n.each(b, function(b, c) {
                            var d = n.type(c);
                            "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c);
                        });
                    }(arguments), b ? e = h.length : c && (g = d, j(c));
                }
                return this;
            },
            remove: function() {
                return h && n.each(arguments, function(a, c) {
                    var d;
                    while ((d = n.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--);
                }), this;
            },
            has: function(a) {
                return a ? n.inArray(a, h) > -1 : !(!h || !h.length);
            },
            empty: function() {
                return h = [], e = 0, this;
            },
            disable: function() {
                return h = i = c = void 0, this;
            },
            disabled: function() {
                return !h;
            },
            lock: function() {
                return i = void 0, c || k.disable(), this;
            },
            locked: function() {
                return !i;
            },
            fireWith: function(a, c) {
                return !h || d && !i || (c = c || [], c = [ a, c.slice ? c.slice() : c ], b ? i.push(c) : j(c)), 
                this;
            },
            fire: function() {
                return k.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!d;
            }
        };
        return k;
    }, n.extend({
        Deferred: function(a) {
            var b = [ [ "resolve", "done", n.Callbacks("once memory"), "resolved" ], [ "reject", "fail", n.Callbacks("once memory"), "rejected" ], [ "notify", "progress", n.Callbacks("memory") ] ], c = "pending", d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return n.Deferred(function(c) {
                        n.each(b, function(b, f) {
                            var g = n.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [ a ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                promise: function(a) {
                    return null != a ? n.extend(a, d) : d;
                }
            }, e = {};
            return d.pipe = d.then, n.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this;
                }, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function(a) {
            var b = 0, c = d.call(arguments), e = c.length, f = 1 !== e || a && n.isFunction(a.promise) ? e : 0, g = 1 === f ? a : n.Deferred(), h = function(a, b, c) {
                return function(e) {
                    b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
                };
            }, i, j, k;
            if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise();
        }
    });
    var I;
    n.fn.ready = function(a) {
        return n.ready.promise().done(a), this;
    }, n.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? n.readyWait++ : n.ready(!0);
        },
        ready: function(a) {
            if (a === !0 ? !--n.readyWait : !n.isReady) {
                if (!z.body) return setTimeout(n.ready);
                n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(z, [ n ]), n.fn.trigger && n(z).trigger("ready").off("ready"));
            }
        }
    });
    function J() {
        z.addEventListener ? (z.removeEventListener("DOMContentLoaded", K, !1), a.removeEventListener("load", K, !1)) : (z.detachEvent("onreadystatechange", K), 
        a.detachEvent("onload", K));
    }
    function K() {
        (z.addEventListener || "load" === event.type || "complete" === z.readyState) && (J(), 
        n.ready());
    }
    n.ready.promise = function(b) {
        if (!I) if (I = n.Deferred(), "complete" === z.readyState) setTimeout(n.ready); else if (z.addEventListener) z.addEventListener("DOMContentLoaded", K, !1), 
        a.addEventListener("load", K, !1); else {
            z.attachEvent("onreadystatechange", K), a.attachEvent("onload", K);
            var c = !1;
            try {
                c = null == a.frameElement && z.documentElement;
            } catch (d) {}
            c && c.doScroll && !function e() {
                if (!n.isReady) {
                    try {
                        c.doScroll("left");
                    } catch (a) {
                        return setTimeout(e, 50);
                    }
                    J(), n.ready();
                }
            }();
        }
        return I.promise(b);
    };
    var L = "undefined", M;
    for (M in n(l)) break;
    l.ownLast = "0" !== M, l.inlineBlockNeedsLayout = !1, n(function() {
        var a, b, c = z.getElementsByTagName("body")[0];
        c && (a = z.createElement("div"), a.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
        b = z.createElement("div"), c.appendChild(a).appendChild(b), typeof b.style.zoom !== L && (b.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", 
        (l.inlineBlockNeedsLayout = 3 === b.offsetWidth) && (c.style.zoom = 1)), c.removeChild(a), 
        a = b = null);
    }), function() {
        var a = z.createElement("div");
        if (null == l.deleteExpando) {
            l.deleteExpando = !0;
            try {
                delete a.test;
            } catch (b) {
                l.deleteExpando = !1;
            }
        }
        a = null;
    }(), n.acceptData = function(a) {
        var b = n.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b;
    };
    var N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, O = /([A-Z])/g;
    function P(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(O, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c;
                } catch (e) {}
                n.data(a, b, c);
            } else c = void 0;
        }
        return c;
    }
    function Q(a) {
        var b;
        for (b in a) if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0;
    }
    function R(a, b, d, e) {
        if (n.acceptData(a)) {
            var f, g, h = n.expando, i = a.nodeType, j = i ? n.cache : a, k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || n.guid++ : h), 
            j[k] || (j[k] = i ? {} : {
                toJSON: n.noop
            }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)), 
            g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[n.camelCase(b)] = d), 
            "string" == typeof b ? (f = g[b], null == f && (f = g[n.camelCase(b)])) : f = g, 
            f;
        }
    }
    function S(a, b, c) {
        if (n.acceptData(a)) {
            var d, e, f = a.nodeType, g = f ? n.cache : a, h = f ? a[n.expando] : n.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [ b ] : (b = n.camelCase(b), 
                    b = b in d ? [ b ] : b.split(" ")), e = b.length;
                    while (e--) delete d[b[e]];
                    if (c ? !Q(d) : !n.isEmptyObject(d)) return;
                }
                (c || (delete g[h].data, Q(g[h]))) && (f ? n.cleanData([ a ], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = null);
            }
        }
    }
    n.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !Q(a);
        },
        data: function(a, b, c) {
            return R(a, b, c);
        },
        removeData: function(a, b) {
            return S(a, b);
        },
        _data: function(a, b, c) {
            return R(a, b, c, !0);
        },
        _removeData: function(a, b) {
            return S(a, b, !0);
        }
    }), n.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = n.data(f), 1 === f.nodeType && !n._data(f, "parsedAttrs"))) {
                    c = g.length;
                    while (c--) d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), 
                    P(f, d, e[d]));
                    n._data(f, "parsedAttrs", !0);
                }
                return e;
            }
            return "object" == typeof a ? this.each(function() {
                n.data(this, a);
            }) : arguments.length > 1 ? this.each(function() {
                n.data(this, a, b);
            }) : f ? P(f, a, n.data(f, a)) : void 0;
        },
        removeData: function(a) {
            return this.each(function() {
                n.removeData(this, a);
            });
        }
    }), n.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), 
            d || []) : void 0;
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = n.queue(a, b), d = c.length, e = c.shift(), f = n._queueHooks(a, b), g = function() {
                n.dequeue(a, b);
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), 
            delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return n._data(a, c) || n._data(a, c, {
                empty: n.Callbacks("once memory").add(function() {
                    n._removeData(a, b + "queue"), n._removeData(a, c);
                })
            });
        }
    }), n.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                n.dequeue(this, a);
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, b) {
            var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [ f ]);
            };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = n._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b);
        }
    });
    var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, U = [ "Top", "Right", "Bottom", "Left" ], V = function(a, b) {
        return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a);
    }, W = n.access = function(a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === n.type(c)) {
            e = !0;
            for (h in c) n.access(a, b, h, c[h], !0, f, g);
        } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), 
        b = null) : (j = b, b = function(a, b, c) {
            return j.call(n(a), c);
        })), b)) for (;i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    }, X = /^(?:checkbox|radio)$/i;
    !function() {
        var a = z.createDocumentFragment(), b = z.createElement("div"), c = z.createElement("input");
        if (b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a>", 
        l.leadingWhitespace = 3 === b.firstChild.nodeType, l.tbody = !b.getElementsByTagName("tbody").length, 
        l.htmlSerialize = !!b.getElementsByTagName("link").length, l.html5Clone = "<:nav></:nav>" !== z.createElement("nav").cloneNode(!0).outerHTML, 
        c.type = "checkbox", c.checked = !0, a.appendChild(c), l.appendChecked = c.checked, 
        b.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, 
        a.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", 
        l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !0, 
        b.attachEvent && (b.attachEvent("onclick", function() {
            l.noCloneEvent = !1;
        }), b.cloneNode(!0).click()), null == l.deleteExpando) {
            l.deleteExpando = !0;
            try {
                delete b.test;
            } catch (d) {
                l.deleteExpando = !1;
            }
        }
        a = b = c = null;
    }(), function() {
        var b, c, d = z.createElement("div");
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        }) c = "on" + b, (l[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), l[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null;
    }();
    var Y = /^(?:input|select|textarea)$/i, Z = /^key/, $ = /^(?:mouse|contextmenu)|click/, _ = /^(?:focusinfocus|focusoutblur)$/, ab = /^([^.]*)(?:\.(.+)|)$/;
    function bb() {
        return !0;
    }
    function cb() {
        return !1;
    }
    function db() {
        try {
            return z.activeElement;
        } catch (a) {}
    }
    n.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n._data(a);
            if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = n.guid++), 
                (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) {
                    return typeof n === L || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments);
                }, k.elem = a), b = (b || "").match(F) || [ "" ], h = b.length;
                while (h--) f = ab.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), 
                o && (j = n.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, 
                j = n.event.special[o] || {}, l = n.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && n.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, i), (m = g[o]) || (m = g[o] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), 
                j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), 
                n.event.global[o] = !0);
                a = null;
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
            if (r && (k = r.events)) {
                b = (b || "").match(F) || [ "" ], j = b.length;
                while (j--) if (h = ab.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), 
                o) {
                    l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = k[o] || [], 
                    h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length;
                    while (f--) g = m[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), 
                    g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), 
                    delete k[o]);
                } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(k) && (delete r.handle, n._removeData(a, "events"));
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, k, l, m, o = [ d || z ], p = j.call(b, "type") ? b.type : b, q = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = l = d = d || z, 3 !== d.nodeType && 8 !== d.nodeType && !_.test(p + n.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), 
            p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[n.expando] ? b : new n.Event(p, "object" == typeof b && b), 
            b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            b.result = void 0, b.target || (b.target = d), c = null == c ? [ b ] : n.makeArray(c, [ b ]), 
            k = n.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                if (!e && !k.noBubble && !n.isWindow(d)) {
                    for (i = k.delegateType || p, _.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), 
                    l = h;
                    l === (d.ownerDocument || z) && o.push(l.defaultView || l.parentWindow || a);
                }
                m = 0;
                while ((h = o[m++]) && !b.isPropagationStopped()) b.type = m > 1 ? i : k.bindType || p, 
                f = (n._data(h, "events") || {})[b.type] && n._data(h, "handle"), f && f.apply(h, c), 
                f = g && h[g], f && f.apply && n.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && n.acceptData(d) && g && d[p] && !n.isWindow(d)) {
                    l = d[g], l && (d[g] = null), n.event.triggered = p;
                    try {
                        d[p]();
                    } catch (r) {}
                    n.event.triggered = void 0, l && (d[g] = l);
                }
                return b.result;
            }
        },
        dispatch: function(a) {
            a = n.event.fix(a);
            var b, c, e, f, g, h = [], i = d.call(arguments), j = (n._data(this, "events") || {})[a.type] || [], k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, g = 0;
                    while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped()) (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, 
                    a.data = e.data, c = ((n.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), 
                    void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type)) for (;i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? n(c, this).index(i) >= 0 : n.find(c, this, null, [ i ]).length), 
                e[c] && e.push(d);
                e.length && g.push({
                    elem: i,
                    handlers: e
                });
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g;
        },
        fix: function(a) {
            if (a[n.expando]) return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = $.test(e) ? this.mouseHooks : Z.test(e) ? this.keyHooks : {}), 
            d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
            while (b--) c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || z), 3 === a.target.nodeType && (a.target = a.target.parentNode), 
            a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), 
                a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button, g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || z, 
                e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), 
                a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), 
                !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), 
                a;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== db() && this.focus) try {
                        return this.focus(), !1;
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === db() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return n.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(a) {
                    return n.nodeName(a.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && (a.originalEvent.returnValue = a.result);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = n.extend(new n.Event(), c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, n.removeEvent = z.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === L && (a[d] = null), a.detachEvent(d, c));
    }, n.Event = function(a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, 
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && (a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault()) ? bb : cb) : this.type = a, 
        b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);
    }, n.Event.prototype = {
        isDefaultPrevented: cb,
        isPropagationStopped: cb,
        isImmediatePropagationStopped: cb,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = bb, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = bb, a && (a.stopPropagation && a.stopPropagation(), 
            a.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = bb, this.stopPropagation();
        }
    }, n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b), c;
            }
        };
    }), l.submitBubbles || (n.event.special.submit = {
        setup: function() {
            return n.nodeName(this, "form") ? !1 : void n.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target, c = n.nodeName(b, "input") || n.nodeName(b, "button") ? b.form : void 0;
                c && !n._data(c, "submitBubbles") && (n.event.add(c, "submit._submit", function(a) {
                    a._submit_bubble = !0;
                }), n._data(c, "submitBubbles", !0));
            });
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && n.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function() {
            return n.nodeName(this, "form") ? !1 : void n.event.remove(this, "._submit");
        }
    }), l.changeBubbles || (n.event.special.change = {
        setup: function() {
            return Y.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (n.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0);
            }), n.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), n.event.simulate("change", this, a, !0);
            })), !1) : void n.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                Y.test(b.nodeName) && !n._data(b, "changeBubbles") && (n.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate("change", this.parentNode, a, !0);
                }), n._data(b, "changeBubbles", !0));
            });
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return n.event.remove(this, "._change"), !Y.test(this.nodeName);
        }
    }), l.focusinBubbles || n.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            n.event.simulate(b, a.target, n.event.fix(a), !0);
        };
        n.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this, e = n._data(d, b);
                e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
            },
            teardown: function() {
                var d = this.ownerDocument || this, e = n._data(d, b) - 1;
                e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0), n._removeData(d, b));
            }
        };
    }), n.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (f in a) this.on(f, b, c, a[f], e);
                return this;
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, 
            c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = cb; else if (!d) return this;
            return 1 === e && (g = d, d = function(a) {
                return n().off(a), g.apply(this, arguments);
            }, d.guid = g.guid || (g.guid = n.guid++)), this.each(function() {
                n.event.add(this, a, d, c, b);
            });
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), 
            this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this;
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = cb), 
            this.each(function() {
                n.event.remove(this, a, c, b);
            });
        },
        trigger: function(a, b) {
            return this.each(function() {
                n.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0;
        }
    });
    function eb(a) {
        var b = fb.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c;
    }
    var fb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gb = / jQuery\d+="(?:null|\d+)"/g, hb = new RegExp("<(?:" + fb + ")[\\s/>]", "i"), ib = /^\s+/, jb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, kb = /<([\w:]+)/, lb = /<tbody/i, mb = /<|&#?\w+;/, nb = /<(?:script|style|link)/i, ob = /checked\s*(?:[^=]|=\s*.checked.)/i, pb = /^$|\/(?:java|ecma)script/i, qb = /^true\/(.*)/, rb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, sb = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: l.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, tb = eb(z), ub = tb.appendChild(z.createElement("div"));
    sb.optgroup = sb.option, sb.tbody = sb.tfoot = sb.colgroup = sb.caption = sb.thead, 
    sb.th = sb.td;
    function vb(a, b) {
        var c, d, e = 0, f = typeof a.getElementsByTagName !== L ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== L ? a.querySelectorAll(b || "*") : void 0;
        if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, vb(d, b));
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([ a ], f) : f;
    }
    function wb(a) {
        X.test(a.type) && (a.defaultChecked = a.checked);
    }
    function xb(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function yb(a) {
        return a.type = (null !== n.find.attr(a, "type")) + "/" + a.type, a;
    }
    function zb(a) {
        var b = qb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }
    function Ab(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) n._data(c, "globalEval", !b || n._data(b[d], "globalEval"));
    }
    function Bb(a, b) {
        if (1 === b.nodeType && n.hasData(a)) {
            var c, d, e, f = n._data(a), g = n._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = n.extend({}, g.data));
        }
    }
    function Cb(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !l.noCloneEvent && b[n.expando]) {
                e = n._data(b);
                for (d in e.events) n.removeEvent(b, d, e.handle);
                b.removeAttribute(n.expando);
            }
            "script" === c && b.text !== a.text ? (yb(b).text = a.text, zb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), 
            l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && X.test(a.type) ? (b.defaultChecked = b.checked = a.checked, 
            b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
        }
    }
    n.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = n.contains(a.ownerDocument, a);
            if (l.html5Clone || n.isXMLDoc(a) || !hb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ub.innerHTML = a.outerHTML, 
            ub.removeChild(f = ub.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (d = vb(f), 
            h = vb(a), g = 0; null != (e = h[g]); ++g) d[g] && Cb(e, d[g]);
            if (b) if (c) for (h = h || vb(a), d = d || vb(f), g = 0; null != (e = h[g]); g++) Bb(e, d[g]); else Bb(a, f);
            return d = vb(f, "script"), d.length > 0 && Ab(d, !i && vb(a, "script")), d = h = e = null, 
            f;
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k, m = a.length, o = eb(b), p = [], q = 0; m > q; q++) if (f = a[q], 
            f || 0 === f) if ("object" === n.type(f)) n.merge(p, f.nodeType ? [ f ] : f); else if (mb.test(f)) {
                h = h || o.appendChild(b.createElement("div")), i = (kb.exec(f) || [ "", "" ])[1].toLowerCase(), 
                k = sb[i] || sb._default, h.innerHTML = k[1] + f.replace(jb, "<$1></$2>") + k[2], 
                e = k[0];
                while (e--) h = h.lastChild;
                if (!l.leadingWhitespace && ib.test(f) && p.push(b.createTextNode(ib.exec(f)[0])), 
                !l.tbody) {
                    f = "table" !== i || lb.test(f) ? "<table>" !== k[1] || lb.test(f) ? 0 : h : h.firstChild, 
                    e = f && f.childNodes.length;
                    while (e--) n.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                }
                n.merge(p, h.childNodes), h.textContent = "";
                while (h.firstChild) h.removeChild(h.firstChild);
                h = o.lastChild;
            } else p.push(b.createTextNode(f));
            h && o.removeChild(h), l.appendChecked || n.grep(vb(p, "input"), wb), q = 0;
            while (f = p[q++]) if ((!d || -1 === n.inArray(f, d)) && (g = n.contains(f.ownerDocument, f), 
            h = vb(o.appendChild(f), "script"), g && Ab(h), c)) {
                e = 0;
                while (f = h[e++]) pb.test(f.type || "") && c.push(f);
            }
            return h = null, o;
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.deleteExpando, m = n.event.special; null != (d = a[h]); h++) if ((b || n.acceptData(d)) && (f = d[i], 
            g = f && j[f])) {
                if (g.events) for (e in g.events) m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
                j[f] && (delete j[f], k ? delete d[i] : typeof d.removeAttribute !== L ? d.removeAttribute(i) : d[i] = null, 
                c.push(f));
            }
        }
    }), n.fn.extend({
        text: function(a) {
            return W(this, function(a) {
                return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || z).createTextNode(a));
            }, null, a, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = xb(this, a);
                    b.appendChild(a);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = xb(this, a);
                    b.insertBefore(a, b.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        remove: function(a, b) {
            for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || n.cleanData(vb(c)), 
            c.parentNode && (b && n.contains(c.ownerDocument, c) && Ab(vb(c, "script")), c.parentNode.removeChild(c));
            return this;
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && n.cleanData(vb(a, !1));
                while (a.firstChild) a.removeChild(a.firstChild);
                a.options && n.nodeName(a, "select") && (a.options.length = 0);
            }
            return this;
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return n.clone(this, a, b);
            });
        },
        html: function(a) {
            return W(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(gb, "") : void 0;
                if (!("string" != typeof a || nb.test(a) || !l.htmlSerialize && hb.test(a) || !l.leadingWhitespace && ib.test(a) || sb[(kb.exec(a) || [ "", "" ])[1].toLowerCase()])) {
                    a = a.replace(jb, "<$1></$2>");
                    try {
                        for (;d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(vb(b, !1)), 
                        b.innerHTML = a);
                        b = 0;
                    } catch (e) {}
                }
                b && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, n.cleanData(vb(this)), a && a.replaceChild(b, this);
            }), a && (a.length || a.nodeType) ? this : this.remove();
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0, k = this.length, m = this, o = k - 1, p = a[0], q = n.isFunction(p);
            if (q || k > 1 && "string" == typeof p && !l.checkClone && ob.test(p)) return this.each(function(c) {
                var d = m.eq(c);
                q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
            });
            if (k && (i = n.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 
            1 === i.childNodes.length && (i = c), c)) {
                for (g = n.map(vb(i, "script"), yb), f = g.length; k > j; j++) d = i, j !== o && (d = n.clone(d, !0, !0), 
                f && n.merge(g, vb(d, "script"))), b.call(this[j], d, j);
                if (f) for (h = g[g.length - 1].ownerDocument, n.map(g, zb), j = 0; f > j; j++) d = g[j], 
                pb.test(d.type || "") && !n._data(d, "globalEval") && n.contains(h, d) && (d.src ? n._evalUrl && n._evalUrl(d.src) : n.globalEval((d.text || d.textContent || d.innerHTML || "").replace(rb, "")));
                i = c = null;
            }
            return this;
        }
    }), n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        n.fn[a] = function(a) {
            for (var c, d = 0, e = [], g = n(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), 
            n(g[d])[b](c), f.apply(e, c.get());
            return this.pushStack(e);
        };
    });
    var Db, Eb = {};
    function Fb(b, c) {
        var d = n(c.createElement(b)).appendTo(c.body), e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : n.css(d[0], "display");
        return d.detach(), e;
    }
    function Gb(a) {
        var b = z, c = Eb[a];
        return c || (c = Fb(a, b), "none" !== c && c || (Db = (Db || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), 
        b = (Db[0].contentWindow || Db[0].contentDocument).document, b.write(), b.close(), 
        c = Fb(a, b), Db.detach()), Eb[a] = c), c;
    }
    !function() {
        var a, b, c = z.createElement("div"), d = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = c.getElementsByTagName("a")[0], a.style.cssText = "float:left;opacity:.5", l.opacity = /^0.5/.test(a.style.opacity), 
        l.cssFloat = !!a.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", 
        l.clearCloneStyle = "content-box" === c.style.backgroundClip, a = c = null, l.shrinkWrapBlocks = function() {
            var a, c, e, f;
            if (null == b) {
                if (a = z.getElementsByTagName("body")[0], !a) return;
                f = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", c = z.createElement("div"), 
                e = z.createElement("div"), a.appendChild(c).appendChild(e), b = !1, typeof e.style.zoom !== L && (e.style.cssText = d + ";width:1px;padding:1px;zoom:1", 
                e.innerHTML = "<div></div>", e.firstChild.style.width = "5px", b = 3 !== e.offsetWidth), 
                a.removeChild(c), a = c = e = null;
            }
            return b;
        };
    }();
    var Hb = /^margin/, Ib = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"), Jb, Kb, Lb = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Jb = function(a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null);
    }, Kb = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Jb(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), 
        Ib.test(g) && Hb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, 
        g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + "";
    }) : z.documentElement.currentStyle && (Jb = function(a) {
        return a.currentStyle;
    }, Kb = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Jb(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), 
        Ib.test(g) && !Lb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), 
        h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), 
        void 0 === g ? g : g + "" || "auto";
    });
    function Mb(a, b) {
        return {
            get: function() {
                var c = a();
                if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments);
            }
        };
    }
    !function() {
        var b, c, d, e, f, g, h = z.createElement("div"), i = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", j = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        b = h.getElementsByTagName("a")[0], b.style.cssText = "float:left;opacity:.5", l.opacity = /^0.5/.test(b.style.opacity), 
        l.cssFloat = !!b.style.cssFloat, h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", 
        l.clearCloneStyle = "content-box" === h.style.backgroundClip, b = h = null, n.extend(l, {
            reliableHiddenOffsets: function() {
                if (null != c) return c;
                var a, b, d, e = z.createElement("div"), f = z.getElementsByTagName("body")[0];
                if (f) return e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
                a = z.createElement("div"), a.style.cssText = i, f.appendChild(a).appendChild(e), 
                e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", b = e.getElementsByTagName("td"), 
                b[0].style.cssText = "padding:0;margin:0;border:0;display:none", d = 0 === b[0].offsetHeight, 
                b[0].style.display = "", b[1].style.display = "none", c = d && 0 === b[0].offsetHeight, 
                f.removeChild(a), e = f = null, c;
            },
            boxSizing: function() {
                return null == d && k(), d;
            },
            boxSizingReliable: function() {
                return null == e && k(), e;
            },
            pixelPosition: function() {
                return null == f && k(), f;
            },
            reliableMarginRight: function() {
                var b, c, d, e;
                if (null == g && a.getComputedStyle) {
                    if (b = z.getElementsByTagName("body")[0], !b) return;
                    c = z.createElement("div"), d = z.createElement("div"), c.style.cssText = i, b.appendChild(c).appendChild(d), 
                    e = d.appendChild(z.createElement("div")), e.style.cssText = d.style.cssText = j, 
                    e.style.marginRight = e.style.width = "0", d.style.width = "1px", g = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), 
                    b.removeChild(c);
                }
                return g;
            }
        });
        function k() {
            var b, c, h = z.getElementsByTagName("body")[0];
            h && (b = z.createElement("div"), c = z.createElement("div"), b.style.cssText = i, 
            h.appendChild(b).appendChild(c), c.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", 
            n.swap(h, null != h.style.zoom ? {
                zoom: 1
            } : {}, function() {
                d = 4 === c.offsetWidth;
            }), e = !0, f = !1, g = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(c, null) || {}).top, 
            e = "4px" === (a.getComputedStyle(c, null) || {
                width: "4px"
            }).width), h.removeChild(b), c = h = null);
        }
    }(), n.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e;
    };
    var Nb = /alpha\([^)]*\)/i, Ob = /opacity\s*=\s*([^)]*)/, Pb = /^(none|table(?!-c[ea]).+)/, Qb = new RegExp("^(" + T + ")(.*)$", "i"), Rb = new RegExp("^([+-])=(" + T + ")", "i"), Sb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Tb = {
        letterSpacing: 0,
        fontWeight: 400
    }, Ub = [ "Webkit", "O", "Moz", "ms" ];
    function Vb(a, b) {
        if (b in a) return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Ub.length;
        while (e--) if (b = Ub[e] + c, b in a) return b;
        return d;
    }
    function Wb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = n._data(d, "olddisplay"), 
        c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && V(d) && (f[g] = n._data(d, "olddisplay", Gb(d.nodeName)))) : f[g] || (e = V(d), 
        (c && "none" !== c || !e) && n._data(d, "olddisplay", e ? c : n.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function Xb(a, b, c) {
        var d = Qb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function Yb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + U[f], !0, e)), 
        d ? ("content" === c && (g -= n.css(a, "padding" + U[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + U[f] + "Width", !0, e))) : (g += n.css(a, "padding" + U[f], !0, e), 
        "padding" !== c && (g += n.css(a, "border" + U[f] + "Width", !0, e)));
        return g;
    }
    function Zb(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Jb(a), g = l.boxSizing() && "border-box" === n.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = Kb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ib.test(e)) return e;
            d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
        }
        return e + Yb(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Kb(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": l.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b), i = a.style;
                if (b = n.cssProps[h] || (n.cssProps[h] = Vb(i, h)), g = n.cssHooks[b] || n.cssHooks[h], 
                void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = Rb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), 
                f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), 
                l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), 
                !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = "", i[b] = c;
                } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = Vb(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], 
            g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Kb(a, b, d)), "normal" === f && b in Tb && (f = Tb[b]), 
            "" === c || c ? (e = parseFloat(f), c === !0 || n.isNumeric(e) ? e || 0 : f) : f;
        }
    }), n.each([ "height", "width" ], function(a, b) {
        n.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? 0 === a.offsetWidth && Pb.test(n.css(a, "display")) ? n.swap(a, Sb, function() {
                    return Zb(a, b, d);
                }) : Zb(a, b, d) : void 0;
            },
            set: function(a, c, d) {
                var e = d && Jb(a);
                return Xb(a, c, d ? Yb(a, b, d, l.boxSizing() && "border-box" === n.css(a, "boxSizing", !1, e), e) : 0);
            }
        };
    }), l.opacity || (n.cssHooks.opacity = {
        get: function(a, b) {
            return Ob.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === n.trim(f.replace(Nb, "")) && c.removeAttribute && (c.removeAttribute("filter"), 
            "" === b || d && !d.filter) || (c.filter = Nb.test(f) ? f.replace(Nb, e) : f + " " + e);
        }
    }), n.cssHooks.marginRight = Mb(l.reliableMarginRight, function(a, b) {
        return b ? n.swap(a, {
            display: "inline-block"
        }, Kb, [ a, "marginRight" ]) : void 0;
    }), n.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        n.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; 4 > d; d++) e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, Hb.test(a) || (n.cssHooks[a + b].set = Xb);
    }), n.fn.extend({
        css: function(a, b) {
            return W(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (n.isArray(b)) {
                    for (d = Jb(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
                    return f;
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
            }, a, b, arguments.length > 1);
        },
        show: function() {
            return Wb(this, !0);
        },
        hide: function() {
            return Wb(this);
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                V(this) ? n(this).show() : n(this).hide();
            });
        }
    });
    function $b(a, b, c, d, e) {
        return new $b.prototype.init(a, b, c, d, e);
    }
    n.Tween = $b, $b.prototype = {
        constructor: $b,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), 
            this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = $b.propHooks[this.prop];
            return a && a.get ? a.get(this) : $b.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = $b.propHooks[this.prop];
            return this.pos = b = this.options.duration ? n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : $b.propHooks._default.set(this), this;
        }
    }, $b.prototype.init.prototype = $b.prototype, $b.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), 
                b && "auto" !== b ? b : 0) : a.elem[a.prop];
            },
            set: function(a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
            }
        }
    }, $b.propHooks.scrollTop = $b.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, n.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        }
    }, n.fx = $b.prototype.init, n.fx.step = {};
    var _b, ac, bc = /^(?:toggle|show|hide)$/, cc = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"), dc = /queueHooks$/, ec = [ jc ], fc = {
        "*": [ function(a, b) {
            var c = this.createTween(a, b), d = c.cur(), e = cc.exec(b), f = e && e[3] || (n.cssNumber[a] ? "" : "px"), g = (n.cssNumber[a] || "px" !== f && +d) && cc.exec(n.css(c.elem, a)), h = 1, i = 20;
            if (g && g[3] !== f) {
                f = f || g[3], e = e || [], g = +d || 1;
                do h = h || ".5", g /= h, n.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i);
            }
            return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), 
            c;
        } ]
    };
    function gc() {
        return setTimeout(function() {
            _b = void 0;
        }), _b = n.now();
    }
    function hc(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = U[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d;
    }
    function ic(a, b, c) {
        for (var d, e = (fc[b] || []).concat(fc["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d;
    }
    function jc(a, b, c) {
        var d, e, f, g, h, i, j, k, m = this, o = {}, p = a.style, q = a.nodeType && V(a), r = n._data(a, "fxshow");
        c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, 
        h.empty.fire = function() {
            h.unqueued || i();
        }), h.unqueued++, m.always(function() {
            m.always(function() {
                h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
            });
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [ p.overflow, p.overflowX, p.overflowY ], 
        j = n.css(a, "display"), k = Gb(a.nodeName), "none" === j && (j = k), "inline" === j && "none" === n.css(a, "float") && (l.inlineBlockNeedsLayout && "inline" !== k ? p.zoom = 1 : p.display = "inline-block")), 
        c.overflow && (p.overflow = "hidden", l.shrinkWrapBlocks() || m.always(function() {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2];
        }));
        for (d in b) if (e = b[d], bc.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                if ("show" !== e || !r || void 0 === r[d]) continue;
                q = !0;
            }
            o[d] = r && r[d] || n.style(a, d);
        }
        if (!n.isEmptyObject(o)) {
            r ? "hidden" in r && (q = r.hidden) : r = n._data(a, "fxshow", {}), f && (r.hidden = !q), 
            q ? n(a).show() : m.done(function() {
                n(a).hide();
            }), m.done(function() {
                var b;
                n._removeData(a, "fxshow");
                for (b in o) n.style(a, b, o[b]);
            });
            for (d in o) g = ic(q ? r[d] : 0, d, m), d in r || (r[d] = g.start, q && (g.end = g.start, 
            g.start = "width" === d || "height" === d ? 1 : 0));
        }
    }
    function kc(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], 
        f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e);
        } else b[d] = e;
    }
    function lc(a, b, c) {
        var d, e, f = 0, g = ec.length, h = n.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            if (e) return !1;
            for (var b = _b || gc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [ j, f, c ]), 1 > f && i ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: n.extend({}, b),
            opts: n.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: _b || gc(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this;
            }
        }), k = j.props;
        for (kc(k, j.opts.specialEasing); g > f; f++) if (d = ec[f].call(j, a, k, j.opts)) return d;
        return n.map(k, ic, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    n.Animation = n.extend(lc, {
        tweener: function(a, b) {
            n.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], fc[c] = fc[c] || [], fc[c].unshift(b);
        },
        prefilter: function(a, b) {
            b ? ec.unshift(a) : ec.push(a);
        }
    }), n.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? n.extend({}, a) : {
            complete: c || !c && b || n.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !n.isFunction(b) && b
        };
        return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, 
        (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
        }, d;
    }, n.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(V).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function() {
                var b = lc(this, n.extend({}, a), f);
                (e || n._data(this, "finish")) && b.stop(!0);
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c);
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), 
            this.each(function() {
                var b = !0, e = null != a && a + "queueHooks", f = n.timers, g = n._data(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && dc.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), 
                b = !1, f.splice(e, 1));
                (b || !c) && n.dequeue(this, a);
            });
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = n._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = n.timers, g = d ? d.length : 0;
                for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), 
                b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), 
                f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), n.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = n.fn[b];
        n.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(hc(b, !0), a, d, e);
        };
    }), n.each({
        slideDown: hc("show"),
        slideUp: hc("hide"),
        slideToggle: hc("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        n.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), n.timers = [], n.fx.tick = function() {
        var a, b = n.timers, c = 0;
        for (_b = n.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || n.fx.stop(), _b = void 0;
    }, n.fx.timer = function(a) {
        n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
    }, n.fx.interval = 13, n.fx.start = function() {
        ac || (ac = setInterval(n.fx.tick, n.fx.interval));
    }, n.fx.stop = function() {
        clearInterval(ac), ac = null;
    }, n.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, n.fn.delay = function(a, b) {
        return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d);
            };
        });
    }, function() {
        var a, b, c, d, e = z.createElement("div");
        e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = e.getElementsByTagName("a")[0], c = z.createElement("select"), d = c.appendChild(z.createElement("option")), 
        b = e.getElementsByTagName("input")[0], a.style.cssText = "top:1px", l.getSetAttribute = "t" !== e.className, 
        l.style = /top/.test(a.getAttribute("style")), l.hrefNormalized = "/a" === a.getAttribute("href"), 
        l.checkOn = !!b.value, l.optSelected = d.selected, l.enctype = !!z.createElement("form").enctype, 
        c.disabled = !0, l.optDisabled = !d.disabled, b = z.createElement("input"), b.setAttribute("value", ""), 
        l.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), 
        l.radioValue = "t" === b.value, a = b = c = d = e = null;
    }();
    var mc = /\r/g;
    n.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length) return d = n.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
                        return null == a ? "" : a + "";
                    })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
                });
                if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, 
                "string" == typeof c ? c.replace(mc, "") : null == c ? "" : c);
            }
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = n.find.attr(a, "value");
                    return null != b ? b : n.text(a);
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], 
                    !(!c.selected && i !== e || (l.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
                        if (b = n(c).val(), f) return b;
                        g.push(b);
                    }
                    return g;
                },
                set: function(a, b) {
                    var c, d, e = a.options, f = n.makeArray(b), g = e.length;
                    while (g--) if (d = e[g], n.inArray(n.valHooks.option.get(d), f) >= 0) try {
                        d.selected = c = !0;
                    } catch (h) {
                        d.scrollHeight;
                    } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e;
                }
            }
        }
    }), n.each([ "radio", "checkbox" ], function() {
        n.valHooks[this] = {
            set: function(a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0;
            }
        }, l.checkOn || (n.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value;
        });
    });
    var nc, oc, pc = n.expr.attrHandle, qc = /^(?:checked|selected)$/i, rc = l.getSetAttribute, sc = l.input;
    n.fn.extend({
        attr: function(a, b) {
            return W(this, n.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                n.removeAttr(this, a);
            });
        }
    }), n.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === L ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), 
            d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? oc : nc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), 
            null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), 
            c) : void n.removeAttr(a, b));
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(F);
            if (f && 1 === a.nodeType) while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) ? sc && rc || !qc.test(c) ? a[d] = !1 : a[n.camelCase("default-" + c)] = a[d] = !1 : n.attr(a, c, ""), 
            a.removeAttribute(rc ? c : d);
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            }
        }
    }), oc = {
        set: function(a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : sc && rc || !qc.test(c) ? a.setAttribute(!rc && n.propFix[c] || c, c) : a[n.camelCase("default-" + c)] = a[c] = !0, 
            c;
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = pc[b] || n.find.attr;
        pc[b] = sc && rc || !qc.test(b) ? function(a, b, d) {
            var e, f;
            return d || (f = pc[b], pc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, 
            pc[b] = f), e;
        } : function(a, b, c) {
            return c ? void 0 : a[n.camelCase("default-" + b)] ? b.toLowerCase() : null;
        };
    }), sc && rc || (n.attrHooks.value = {
        set: function(a, b, c) {
            return n.nodeName(a, "input") ? void (a.defaultValue = b) : nc && nc.set(a, b, c);
        }
    }), rc || (nc = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", 
            "value" === c || b === a.getAttribute(c) ? b : void 0;
        }
    }, pc.id = pc.name = pc.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null;
    }, n.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0;
        },
        set: nc.set
    }, n.attrHooks.contenteditable = {
        set: function(a, b, c) {
            nc.set(a, "" === b ? !1 : b, c);
        }
    }, n.each([ "width", "height" ], function(a, b) {
        n.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
            }
        };
    })), l.style || (n.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0;
        },
        set: function(a, b) {
            return a.style.cssText = b + "";
        }
    });
    var tc = /^(?:input|select|textarea|button|object)$/i, uc = /^(?:a|area)$/i;
    n.fn.extend({
        prop: function(a, b) {
            return W(this, n.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return a = n.propFix[a] || a, this.each(function() {
                try {
                    this[a] = void 0, delete this[a];
                } catch (b) {}
            });
        }
    }), n.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, 
            e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = n.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : tc.test(a.nodeName) || uc.test(a.nodeName) && a.href ? 0 : -1;
                }
            }
        }
    }), l.hrefNormalized || n.each([ "href", "src" ], function(a, b) {
        n.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4);
            }
        };
    }), l.optSelected || (n.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    }), n.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        n.propFix[this.toLowerCase()] = this;
    }), l.enctype || (n.propFix.enctype = "encoding");
    var vc = /[\t\r\n\f]/g;
    n.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).addClass(a.call(this, b, this.className));
            });
            if (j) for (b = (a || "").match(F) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(vc, " ") : " ")) {
                f = 0;
                while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = n.trim(d), c.className !== g && (c.className = g);
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).removeClass(a.call(this, b, this.className));
            });
            if (j) for (b = (a || "").match(F) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(vc, " ") : "")) {
                f = 0;
                while (e = b[f++]) while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                g = a ? n.trim(d) : "", c.className !== g && (c.className = g);
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function(c) {
                n(this).toggleClass(a.call(this, c, this.className, b), b);
            } : function() {
                if ("string" === c) {
                    var b, d = 0, e = n(this), f = a.match(F) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                } else (c === L || "boolean" === c) && (this.className && n._data(this, "__className__", this.className), 
                this.className = this.className || a === !1 ? "" : n._data(this, "__className__") || "");
            });
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(vc, " ").indexOf(b) >= 0) return !0;
            return !1;
        }
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        n.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), n.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
        }
    });
    var wc = n.now(), xc = /\?/, yc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    n.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null, e = n.trim(b + "");
        return e && !n.trim(e.replace(yc, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "");
        })) ? Function("return " + e)() : n.error("Invalid JSON: " + b);
    }, n.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new DOMParser(), c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), 
            c.async = "false", c.loadXML(b));
        } catch (e) {
            c = void 0;
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), 
        c;
    };
    var zc, Ac, Bc = /#.*$/, Cc = /([?&])_=[^&]*/, Dc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Ec = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Fc = /^(?:GET|HEAD)$/, Gc = /^\/\//, Hc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Ic = {}, Jc = {}, Kc = "*/".concat("*");
    try {
        Ac = location.href;
    } catch (Lc) {
        Ac = z.createElement("a"), Ac.href = "", Ac = Ac.href;
    }
    zc = Hc.exec(Ac.toLowerCase()) || [];
    function Mc(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(F) || [];
            if (n.isFunction(c)) while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", 
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function Nc(a, b, c, d) {
        var e = {}, f = a === Jc;
        function g(h) {
            var i;
            return e[h] = !0, n.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), 
                g(j), !1);
            }), i;
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*");
    }
    function Oc(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && n.extend(!0, a, c), a;
    }
    function Pc(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e) for (g in h) if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break;
        }
        if (i[0] in c) f = i[0]; else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break;
                }
                d || (d = g);
            }
            f = f || d;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function Qc(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), 
        i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break;
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b);
            } catch (l) {
                return {
                    state: "parsererror",
                    error: g ? l : "No conversion from " + i + " to " + f
                };
            }
        }
        return {
            state: "success",
            data: b
        };
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ac,
            type: "GET",
            isLocal: Ec.test(zc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Kc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Oc(Oc(a, n.ajaxSettings), b) : Oc(n.ajaxSettings, a);
        },
        ajaxPrefilter: Mc(Ic),
        ajaxTransport: Mc(Jc),
        ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = n.ajaxSetup({}, b), l = k.context || k, m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event, o = n.Deferred(), p = n.Callbacks("once memory"), q = k.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === t) {
                        if (!j) {
                            j = {};
                            while (b = Dc.exec(f)) j[b[1].toLowerCase()] = b[2];
                        }
                        b = j[a.toLowerCase()];
                    }
                    return null == b ? null : b;
                },
                getAllResponseHeaders: function() {
                    return 2 === t ? f : null;
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a, r[a] = b), this;
                },
                overrideMimeType: function(a) {
                    return t || (k.mimeType = a), this;
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (2 > t) for (b in a) q[b] = [ q[b], a[b] ]; else v.always(a[v.status]);
                    return this;
                },
                abort: function(a) {
                    var b = a || u;
                    return i && i.abort(b), x(0, b), this;
                }
            };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || Ac) + "").replace(Bc, "").replace(Gc, zc[1] + "//"), 
            k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(F) || [ "" ], 
            null == k.crossDomain && (c = Hc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === zc[1] && c[2] === zc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (zc[3] || ("http:" === zc[1] ? "80" : "443")))), 
            k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), 
            Nc(Ic, k, b, v), 2 === t) return v;
            h = k.global, h && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), 
            k.hasContent = !Fc.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (xc.test(e) ? "&" : "?") + k.data, 
            delete k.data), k.cache === !1 && (k.url = Cc.test(e) ? e.replace(Cc, "$1_=" + wc++) : e + (xc.test(e) ? "&" : "?") + "_=" + wc++)), 
            k.ifModified && (n.lastModified[e] && v.setRequestHeader("If-Modified-Since", n.lastModified[e]), 
            n.etag[e] && v.setRequestHeader("If-None-Match", n.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), 
            v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Kc + "; q=0.01" : "") : k.accepts["*"]);
            for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (d in {
                success: 1,
                error: 1,
                complete: 1
            }) v[d](k[d]);
            if (i = Nc(Jc, k, b, v)) {
                v.readyState = 1, h && m.trigger("ajaxSend", [ v, k ]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout");
                }, k.timeout));
                try {
                    t = 1, i.send(r, x);
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x(-1, w);
                }
            } else x(-1, "No Transport");
            function x(a, b, c, d) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, 
                j = a >= 200 && 300 > a || 304 === a, c && (u = Pc(k, v, c)), u = Qc(k, u, v, j), 
                j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[e] = w), 
                w = v.getResponseHeader("etag"), w && (n.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, 
                r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), 
                v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [ r, x, v ]) : o.rejectWith(l, [ v, x, s ]), 
                v.statusCode(q), q = void 0, h && m.trigger(j ? "ajaxSuccess" : "ajaxError", [ v, k, j ? r : s ]), 
                p.fireWith(l, [ v, x ]), h && (m.trigger("ajaxComplete", [ v, k ]), --n.active || n.event.trigger("ajaxStop")));
            }
            return v;
        },
        getJSON: function(a, b, c) {
            return n.get(a, b, c, "json");
        },
        getScript: function(a, b) {
            return n.get(a, void 0, b, "script");
        }
    }), n.each([ "get", "post" ], function(a, b) {
        n[b] = function(a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            });
        };
    }), n.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
        n.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), n._evalUrl = function(a) {
        return n.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, n.fn.extend({
        wrapAll: function(a) {
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return this.each(n.isFunction(a) ? function(b) {
                n(this).wrapInner(a.call(this, b));
            } : function() {
                var b = n(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = n.isFunction(a);
            return this.each(function(c) {
                n(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
            }).end();
        }
    }), n.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !l.reliableHiddenOffsets() && "none" === (a.style && a.style.display || n.css(a, "display"));
    }, n.expr.filters.visible = function(a) {
        return !n.expr.filters.hidden(a);
    };
    var Rc = /%20/g, Sc = /\[\]$/, Tc = /\r?\n/g, Uc = /^(?:submit|button|image|reset|file)$/i, Vc = /^(?:input|select|textarea|keygen)/i;
    function Wc(a, b, c, d) {
        var e;
        if (n.isArray(b)) n.each(b, function(b, e) {
            c || Sc.test(a) ? d(a, e) : Wc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
        }); else if (c || "object" !== n.type(b)) d(a, b); else for (e in b) Wc(a + "[" + e + "]", b[e], c, d);
    }
    n.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function() {
            e(this.name, this.value);
        }); else for (c in a) Wc(c, a[c], b, e);
        return d.join("&").replace(Rc, "+");
    }, n.fn.extend({
        serialize: function() {
            return n.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this;
            }).filter(function() {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && Vc.test(this.nodeName) && !Uc.test(a) && (this.checked || !X.test(a));
            }).map(function(a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Tc, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(Tc, "\r\n")
                };
            }).get();
        }
    }), n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && $c() || _c();
    } : $c;
    var Xc = 0, Yc = {}, Zc = n.ajaxSettings.xhr();
    a.ActiveXObject && n(a).on("unload", function() {
        for (var a in Yc) Yc[a](void 0, !0);
    }), l.cors = !!Zc && "withCredentials" in Zc, Zc = l.ajax = !!Zc, Zc && n.ajaxTransport(function(a) {
        if (!a.crossDomain || l.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f = a.xhr(), g = ++Xc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null), b = function(c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState)) if (delete Yc[g], b = void 0, f.onreadystatechange = n.noop, 
                        e) 4 !== f.readyState && f.abort(); else {
                            j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                            try {
                                i = f.statusText;
                            } catch (k) {
                                i = "";
                            }
                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404;
                        }
                        j && d(h, i, j, f.getAllResponseHeaders());
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Yc[g] = b : b();
                },
                abort: function() {
                    b && b(void 0, !0);
                }
            };
        }
    });
    function $c() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {}
    }
    function _c() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    n.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return n.globalEval(a), a;
            }
        }
    }), n.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), n.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = z.head || n("head")[0] || z.documentElement;
            return {
                send: function(d, e) {
                    b = z.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), 
                    b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, 
                        b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"));
                    }, c.insertBefore(b, c.firstChild);
                },
                abort: function() {
                    b && b.onload(void 0, !0);
                }
            };
        }
    });
    var ad = [], bd = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = ad.pop() || n.expando + "_" + wc++;
            return this[a] = !0, a;
        }
    }), n.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (bd.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bd.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, 
        h ? b[h] = b[h].replace(bd, "$1" + e) : b.jsonp !== !1 && (b.url += (xc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), 
        b.converters["script json"] = function() {
            return g || n.error(e + " was not called"), g[0];
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments;
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ad.push(e)), g && n.isFunction(f) && f(g[0]), 
            g = f = void 0;
        }), "script") : void 0;
    }), n.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || z;
        var d = v.exec(a), e = !c && [];
        return d ? [ b.createElement(d[1]) ] : (d = n.buildFragment([ a ], b, e), e && e.length && n(e).remove(), 
        n.merge([], d.childNodes));
    };
    var cd = n.fn.load;
    n.fn.load = function(a, b, c) {
        if ("string" != typeof a && cd) return cd.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = a.slice(h, a.length), a = a.slice(0, h)), n.isFunction(b) ? (c = b, 
        b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && n.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function(a) {
            e = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
        }).complete(c && function(a, b) {
            g.each(c, e || [ a.responseText, b, a ]);
        }), this;
    }, n.expr.filters.animated = function(a) {
        return n.grep(n.timers, function(b) {
            return a === b.elem;
        }).length;
    };
    var dd = a.document.documentElement;
    function ed(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
    }
    n.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"), l = n(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), 
            i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && n.inArray("auto", [ f, i ]) > -1, 
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), 
            n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), 
            null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
        }
    }, n.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                n.offset.setOffset(this, a, b);
            });
            var b, c, d = {
                top: 0,
                left: 0
            }, e = this[0], f = e && e.ownerDocument;
            if (f) return b = f.documentElement, n.contains(b, e) ? (typeof e.getBoundingClientRect !== L && (d = e.getBoundingClientRect()), 
            c = ed(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d;
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === n.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), 
                b = this.offset(), n.nodeName(a[0], "html") || (c = a.offset()), c.top += n.css(a[0], "borderTopWidth", !0), 
                c.left += n.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - n.css(d, "marginTop", !0),
                    left: b.left - c.left - n.css(d, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || dd;
                while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;
                return a || dd;
            });
        }
    }), n.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function(d) {
            return W(this, function(a, d, e) {
                var f = ed(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e);
            }, a, d, arguments.length, null);
        };
    }), n.each([ "top", "left" ], function(a, b) {
        n.cssHooks[b] = Mb(l.pixelPosition, function(a, c) {
            return c ? (c = Kb(a, b), Ib.test(c) ? n(a).position()[b] + "px" : c) : void 0;
        });
    }), n.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        n.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            n.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return W(this, function(b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, 
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
                }, b, f ? d : void 0, f, null);
            };
        });
    }), n.fn.size = function() {
        return this.length;
    }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return n;
    });
    var fd = a.jQuery, gd = a.$;
    return n.noConflict = function(b) {
        return a.$ === n && (a.$ = gd), b && a.jQuery === n && (a.jQuery = fd), n;
    }, typeof b === L && (a.jQuery = a.$ = n), n;
});

(function(factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else {
        factory(jQuery);
    }
})(function($) {
    var pluses = /\+/g;
    function raw(s) {
        return s;
    }
    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, " "));
    }
    function converted(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch (er) {}
    }
    var config = $.cookie = function(key, value, options) {
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === "number") {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = config.json ? JSON.stringify(value) : String(value);
            return document.cookie = [ config.raw ? key : encodeURIComponent(key), "=", config.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
        }
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split("; ");
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split("=");
            var name = decode(parts.shift());
            var cookie = decode(parts.join("="));
            if (key && key === name) {
                result = converted(cookie);
                break;
            }
            if (!key) {
                result[name] = converted(cookie);
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) !== undefined) {
            $.cookie(key, "", $.extend({}, options, {
                expires: -1
            }));
            return true;
        }
        return false;
    };
});

(function(e, t) {
    function i(t, i) {
        var s, a, o, r = t.nodeName.toLowerCase();
        return "area" === r ? (s = t.parentNode, a = s.name, t.href && a && "map" === s.nodeName.toLowerCase() ? (o = e("img[usemap=#" + a + "]")[0], 
        !!o && n(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || i : i) && n(t);
    }
    function n(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return "hidden" === e.css(this, "visibility");
        }).length;
    }
    var s = 0, a = /^ui-id-\d+$/;
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        focus: function(t) {
            return function(i, n) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), n && n.call(t);
                    }, i);
                }) : t.apply(this, arguments);
            };
        }(e.fn.focus),
        scrollParent: function() {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t;
        },
        zIndex: function(i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length) for (var n, s, a = e(this[0]); a.length && a[0] !== document; ) {
                if (n = a.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(a.css("zIndex"), 10), 
                !isNaN(s) && 0 !== s)) return s;
                a = a.parent();
            }
            return 0;
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++s);
            });
        },
        removeUniqueId: function() {
            return this.each(function() {
                a.test(this.id) && e(this).removeAttr("id");
            });
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t);
            };
        }) : function(t, i, n) {
            return !!e.data(t, n[3]);
        },
        focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")));
        },
        tabbable: function(t) {
            var n = e.attr(t, "tabindex"), s = isNaN(n);
            return (s || n >= 0) && i(t, !s);
        }
    }), e("<a>").outerWidth(1).jquery || e.each([ "Width", "Height" ], function(i, n) {
        function s(t, i, n, s) {
            return e.each(a, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), 
                s && (i -= parseFloat(e.css(t, "margin" + this)) || 0);
            }), i;
        }
        var a = "Width" === n ? [ "Left", "Right" ] : [ "Top", "Bottom" ], o = n.toLowerCase(), r = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight
        };
        e.fn["inner" + n] = function(i) {
            return i === t ? r["inner" + n].call(this) : this.each(function() {
                e(this).css(o, s(this, i) + "px");
            });
        }, e.fn["outer" + n] = function(t, i) {
            return "number" != typeof t ? r["outer" + n].call(this, t) : this.each(function() {
                e(this).css(o, s(this, t, !0, i) + "px");
            });
        };
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this);
        };
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), 
    e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault();
            });
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        }
    }), e.extend(e.ui, {
        plugin: {
            add: function(t, i, n) {
                var s, a = e.ui[t].prototype;
                for (s in n) a.plugins[s] = a.plugins[s] || [], a.plugins[s].push([ i, n[s] ]);
            },
            call: function(e, t, i) {
                var n, s = e.plugins[t];
                if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (n = 0; s.length > n; n++) e.options[s[n][0]] && s[n][1].apply(e.element, i);
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === e(t).css("overflow")) return !1;
            var n = i && "left" === i ? "scrollLeft" : "scrollTop", s = !1;
            return t[n] > 0 ? !0 : (t[n] = 1, s = t[n] > 0, t[n] = 0, s);
        }
    });
})(jQuery);

(function(t, e) {
    var i = 0, s = Array.prototype.slice, n = t.cleanData;
    t.cleanData = function(e) {
        for (var i, s = 0; null != (i = e[s]); s++) try {
            t(i).triggerHandler("remove");
        } catch (o) {}
        n(e);
    }, t.widget = function(i, s, n) {
        var o, a, r, h, l = {}, c = i.split(".")[0];
        i = i.split(".")[1], o = c + "-" + i, n || (n = s, s = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) {
            return !!t.data(e, o);
        }, t[c] = t[c] || {}, a = t[c][i], r = t[c][i] = function(t, i) {
            return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new r(t, i);
        }, t.extend(r, a, {
            version: n.version,
            _proto: t.extend({}, n),
            _childConstructors: []
        }), h = new s(), h.options = t.widget.extend({}, h.options), t.each(n, function(i, n) {
            return t.isFunction(n) ? (l[i] = function() {
                var t = function() {
                    return s.prototype[i].apply(this, arguments);
                }, e = function(t) {
                    return s.prototype[i].apply(this, t);
                };
                return function() {
                    var i, s = this._super, o = this._superApply;
                    return this._super = t, this._superApply = e, i = n.apply(this, arguments), this._super = s, 
                    this._superApply = o, i;
                };
            }(), e) : (l[i] = n, e);
        }), r.prototype = t.widget.extend(h, {
            widgetEventPrefix: a ? h.widgetEventPrefix : i
        }, l, {
            constructor: r,
            namespace: c,
            widgetName: i,
            widgetFullName: o
        }), a ? (t.each(a._childConstructors, function(e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, r, i._proto);
        }), delete a._childConstructors) : s._childConstructors.push(r), t.widget.bridge(i, r);
    }, t.widget.extend = function(i) {
        for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++) for (n in a[r]) o = a[r][n], 
        a[r].hasOwnProperty(n) && o !== e && (i[n] = t.isPlainObject(o) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], o) : t.widget.extend({}, o) : o);
        return i;
    }, t.widget.bridge = function(i, n) {
        var o = n.prototype.widgetFullName || i;
        t.fn[i] = function(a) {
            var r = "string" == typeof a, h = s.call(arguments, 1), l = this;
            return a = !r && h.length ? t.widget.extend.apply(null, [ a ].concat(h)) : a, r ? this.each(function() {
                var s, n = t.data(this, o);
                return n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (s = n[a].apply(n, h), s !== n && s !== e ? (l = s && s.jquery ? l.pushStack(s.get()) : s, 
                !1) : e) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + a + "'");
            }) : this.each(function() {
                var e = t.data(this, o);
                e ? e.option(a || {})._init() : t.data(this, o, new n(a, this));
            }), l;
        };
    }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(e, s) {
            s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, 
            this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), 
            this.bindings = t(), this.hoverable = t(), this.focusable = t(), s !== this && (t.data(s, this.widgetFullName, this), 
            this._on(!0, this.element, {
                remove: function(t) {
                    t.target === s && this.destroy();
                }
            }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), 
            this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), 
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), 
            this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), 
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: t.noop,
        widget: function() {
            return this.element;
        },
        option: function(i, s) {
            var n, o, a, r = i;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof i) if (r = {}, n = i.split("."), i = n.shift(), n.length) {
                for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; n.length - 1 > a; a++) o[n[a]] = o[n[a]] || {}, 
                o = o[n[a]];
                if (i = n.pop(), s === e) return o[i] === e ? null : o[i];
                o[i] = s;
            } else {
                if (s === e) return this.options[i] === e ? null : this.options[i];
                r[i] = s;
            }
            return this._setOptions(r), this;
        },
        _setOptions: function(t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this;
        },
        _setOption: function(t, e) {
            return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), 
            this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), 
            this;
        },
        enable: function() {
            return this._setOption("disabled", !1);
        },
        disable: function() {
            return this._setOption("disabled", !0);
        },
        _on: function(i, s, n) {
            var o, a = this;
            "boolean" != typeof i && (n = s, s = i, i = !1), n ? (s = o = t(s), this.bindings = this.bindings.add(s)) : (n = s, 
            s = this.element, o = this.widget()), t.each(n, function(n, r) {
                function h() {
                    return i || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? a[r] : r).apply(a, arguments) : e;
                }
                "string" != typeof r && (h.guid = r.guid = r.guid || h.guid || t.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/), c = l[1] + a.eventNamespace, u = l[2];
                u ? o.delegate(u, c, h) : s.bind(c, h);
            });
        },
        _off: function(t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
            t.unbind(e).undelegate(e);
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? s[t] : t).apply(s, arguments);
            }
            var s = this;
            return setTimeout(i, e || 0);
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function(e) {
                    t(e.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(e) {
                    t(e.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function(e) {
                    t(e.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(e) {
                    t(e.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function(e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), 
            i.target = this.element[0], o = i.originalEvent) for (n in o) n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [ i ].concat(s)) === !1 || i.isDefaultPrevented());
        }
    }, t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, i) {
        t.Widget.prototype["_" + e] = function(s, n, o) {
            "string" == typeof n && (n = {
                effect: n
            });
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = {
                duration: n
            }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
                t(this)[e](), o && o.call(s[0]), i();
            });
        };
    });
})(jQuery);

(function(t) {
    var e = !1;
    t(document).mouseup(function() {
        e = !1;
    }), t.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t);
            }).bind("click." + this.widgetName, function(i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), 
                i.stopImmediatePropagation(), !1) : undefined;
            }), this.started = !1;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function(i) {
            if (!e) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var s = this, n = 1 === i.which, a = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, 
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    s.mouseDelayMet = !0;
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, 
                !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), 
                this._mouseMoveDelegate = function(t) {
                    return s._mouseMove(t);
                }, this._mouseUpDelegate = function(t) {
                    return s._mouseUp(t);
                }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
                i.preventDefault(), e = !0, !0)) : !0;
            }
        },
        _mouseMove: function(e) {
            return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), 
            e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, 
            this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
        },
        _mouseUp: function(e) {
            return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
            this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), 
            this._mouseStop(e)), !1;
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0;
        }
    });
})(jQuery);

(function(t) {
    t.widget("ui.draggable", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), 
            this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), 
            this._mouseInit();
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), 
            this._mouseDestroy();
        },
        _mouseCapture: function(e) {
            var i = this.options;
            return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), 
            this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(t(this).offset()).appendTo("body");
            }), !0) : !1);
        },
        _mouseStart: function(e) {
            var i = this.options;
            return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), 
            this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), 
            this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), 
            this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), 
            this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, this.offset.scroll = !1, t.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, 
            this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), 
            this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), 
            t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), 
            t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0);
        },
        _mouseDrag: function(e, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), 
            this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), 
            !i) {
                var s = this._uiHash();
                if (this._trigger("drag", e, s) === !1) return this._mouseUp({}), !1;
                this.position = s.position;
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1;
        },
        _mouseStop: function(e) {
            var i = this, s = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), 
            this.dropped && (s = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                i._trigger("stop", e) !== !1 && i._clear();
            }) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1;
        },
        _mouseUp: function(e) {
            return t("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this);
            }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e);
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), 
            this;
        },
        _getHandle: function(e) {
            return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0;
        },
        _createHelper: function(e) {
            var i = this.options, s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [ e ])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), 
            s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), 
            s;
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), 
            "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
        },
        _getParentOffset: function() {
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), 
            e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.element.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            }
            return {
                top: 0,
                left: 0
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var e, i, s, n = this.options;
            return n.containment ? "window" === n.containment ? (this.containment = [ t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
            undefined) : "document" === n.containment ? (this.containment = [ 0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ], 
            undefined) : n.containment.constructor === Array ? (this.containment = n.containment, 
            undefined) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), 
            i = t(n.containment), s = i[0], s && (e = "hidden" !== i.css("overflow"), this.containment = [ (parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
            this.relative_container = i), undefined) : (this.containment = null, undefined);
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var s = "absolute" === e ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: n.scrollTop(),
                left: n.scrollLeft()
            }), {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s
            };
        },
        _generatePosition: function(e) {
            var i, s, n, a, o = this.options, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = e.pageX, h = e.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: r.scrollTop(),
                left: r.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), 
            i = [ this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top ]) : i = this.containment, 
            e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), 
            e.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), 
            e.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, 
            h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, 
            a = o.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, 
            l = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a)), 
            {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            };
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
            this.helper = null, this.cancelHelperRemoval = !1;
        },
        _trigger: function(e, i, s) {
            return s = s || this._uiHash(), t.ui.plugin.call(this, e, [ i, s ]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), 
            t.Widget.prototype._trigger.call(this, e, i, s);
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            };
        }
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, i) {
            var s = t(this).data("ui-draggable"), n = s.options, a = t.extend({}, i, {
                item: s.element
            });
            s.sortables = [], t(n.connectToSortable).each(function() {
                var i = t.data(this, "ui-sortable");
                i && !i.options.disabled && (s.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }), i.refreshPositions(), i._trigger("activate", e, a));
            });
        },
        stop: function(e, i) {
            var s = t(this).data("ui-draggable"), n = t.extend({}, i, {
                item: s.element
            });
            t.each(s.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, 
                this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), 
                this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, n));
            });
        },
        drag: function(e, i) {
            var s = t(this).data("ui-draggable"), n = this;
            t.each(s.sortables, function() {
                var a = !1, o = this;
                this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, 
                this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (a = !0, 
                t.each(s.sortables, function() {
                    return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, 
                    this.instance.offset.click = s.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && t.contains(o.instance.element[0], this.instance.element[0]) && (a = !1), 
                    a;
                })), a ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), 
                this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return i.helper[0];
                }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), 
                this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = s.offset.click.top, 
                this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, 
                this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, 
                s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element, 
                this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, 
                this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), 
                this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, 
                this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), 
                s._trigger("fromSortable", e), s.dropped = !1);
            });
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var e = t("body"), i = t(this).data("ui-draggable").options;
            e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor);
        },
        stop: function() {
            var e = t(this).data("ui-draggable").options;
            e._cursor && t("body").css("cursor", e._cursor);
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function(e, i) {
            var s = t(i.helper), n = t(this).data("ui-draggable").options;
            s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity);
        },
        stop: function(e, i) {
            var s = t(this).data("ui-draggable").options;
            s._opacity && t(i.helper).css("opacity", s._opacity);
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var e = t(this).data("ui-draggable");
            e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset());
        },
        drag: function(e) {
            var i = t(this).data("ui-draggable"), s = i.options, n = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), 
            s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? n = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (n = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed))), 
            s.axis && "y" === s.axis || (e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? n = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (n = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed)))), 
            n !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e);
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function() {
            var e = t(this).data("ui-draggable"), i = e.options;
            e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                var i = t(this), s = i.offset();
                this !== e.element[0] && e.snapElements.push({
                    item: this,
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: s.top,
                    left: s.left
                });
            });
        },
        drag: function(e, i) {
            var s, n, a, o, r, l, h, c, u, d, p = t(this).data("ui-draggable"), g = p.options, f = g.snapTolerance, m = i.offset.left, _ = m + p.helperProportions.width, v = i.offset.top, b = v + p.helperProportions.height;
            for (u = p.snapElements.length - 1; u >= 0; u--) r = p.snapElements[u].left, l = r + p.snapElements[u].width, 
            h = p.snapElements[u].top, c = h + p.snapElements[u].height, r - f > _ || m > l + f || h - f > b || v > c + f || !t.contains(p.snapElements[u].item.ownerDocument, p.snapElements[u].item) ? (p.snapElements[u].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), {
                snapItem: p.snapElements[u].item
            })), p.snapElements[u].snapping = !1) : ("inner" !== g.snapMode && (s = f >= Math.abs(h - b), 
            n = f >= Math.abs(c - v), a = f >= Math.abs(r - _), o = f >= Math.abs(l - m), s && (i.position.top = p._convertPositionTo("relative", {
                top: h - p.helperProportions.height,
                left: 0
            }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
                top: c,
                left: 0
            }).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: r - p.helperProportions.width
            }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left - p.margins.left)), d = s || n || a || o, "outer" !== g.snapMode && (s = f >= Math.abs(h - v), 
            n = f >= Math.abs(c - b), a = f >= Math.abs(r - m), o = f >= Math.abs(l - _), s && (i.position.top = p._convertPositionTo("relative", {
                top: h,
                left: 0
            }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
                top: c - p.helperProportions.height,
                left: 0
            }).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: r
            }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: l - p.helperProportions.width
            }).left - p.margins.left)), !p.snapElements[u].snapping && (s || n || a || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), {
                snapItem: p.snapElements[u].item
            })), p.snapElements[u].snapping = s || n || a || o || d);
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function() {
            var e, i = this.data("ui-draggable").options, s = t.makeArray(t(i.stack)).sort(function(e, i) {
                return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0);
            });
            s.length && (e = parseInt(t(s[0]).css("zIndex"), 10) || 0, t(s).each(function(i) {
                t(this).css("zIndex", e + i);
            }), this.css("zIndex", e + s.length));
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function(e, i) {
            var s = t(i.helper), n = t(this).data("ui-draggable").options;
            s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex);
        },
        stop: function(e, i) {
            var s = t(this).data("ui-draggable").options;
            s._zIndex && t(i.helper).css("zIndex", s._zIndex);
        }
    });
})(jQuery);

(function(t) {
    function e(t, e, i) {
        return t > e && e + i > t;
    }
    t.widget("ui.droppable", {
        version: "1.10.3",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var e = this.options, i = e.accept;
            this.isover = !1, this.isout = !0, this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i);
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || [], 
            t.ui.ddmanager.droppables[e.scope].push(this), e.addClasses && this.element.addClass("ui-droppable");
        },
        _destroy: function() {
            for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; i.length > e; e++) i[e] === this && i.splice(e, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled");
        },
        _setOption: function(e, i) {
            "accept" === e && (this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i);
            }), t.Widget.prototype._setOption.apply(this, arguments);
        },
        _activate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i));
        },
        _deactivate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), 
            i && this._trigger("deactivate", e, this.ui(i));
        },
        _over: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), 
            this._trigger("over", e, this.ui(i)));
        },
        _out: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), 
            this._trigger("out", e, this.ui(i)));
        },
        _drop: function(e, i) {
            var s = i || t.ui.ddmanager.current, n = !1;
            return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var e = t.data(this, "ui-droppable");
                return e.options.greedy && !e.options.disabled && e.options.scope === s.options.scope && e.accept.call(e.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(e, {
                    offset: e.element.offset()
                }), e.options.tolerance) ? (n = !0, !1) : undefined;
            }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), 
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(s)), 
            this.element) : !1) : !1;
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            };
        }
    }), t.ui.intersect = function(t, i, s) {
        if (!i.offset) return !1;
        var n, a, o = (t.positionAbs || t.position.absolute).left, r = o + t.helperProportions.width, l = (t.positionAbs || t.position.absolute).top, h = l + t.helperProportions.height, c = i.offset.left, u = c + i.proportions.width, d = i.offset.top, p = d + i.proportions.height;
        switch (s) {
          case "fit":
            return o >= c && u >= r && l >= d && p >= h;

          case "intersect":
            return o + t.helperProportions.width / 2 > c && u > r - t.helperProportions.width / 2 && l + t.helperProportions.height / 2 > d && p > h - t.helperProportions.height / 2;

          case "pointer":
            return n = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, 
            a = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, 
            e(a, d, i.proportions.height) && e(n, c, i.proportions.width);

          case "touch":
            return (l >= d && p >= l || h >= d && p >= h || d > l && h > p) && (o >= c && u >= o || r >= c && u >= r || c > o && r > u);

          default:
            return !1;
        }
    }, t.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(e, i) {
            var s, n, a = t.ui.ddmanager.droppables[e.options.scope] || [], o = i ? i.type : null, r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t: for (s = 0; a.length > s; s++) if (!(a[s].options.disabled || e && !a[s].accept.call(a[s].element[0], e.currentItem || e.element))) {
                for (n = 0; r.length > n; n++) if (r[n] === a[s].element[0]) {
                    a[s].proportions.height = 0;
                    continue t;
                }
                a[s].visible = "none" !== a[s].element.css("display"), a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i), 
                a[s].offset = a[s].element.offset(), a[s].proportions = {
                    width: a[s].element[0].offsetWidth,
                    height: a[s].element[0].offsetHeight
                });
            }
        },
        drop: function(e, i) {
            var s = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), 
                !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, 
                this.isover = !1, this._deactivate.call(this, i)));
            }), s;
        },
        dragStart: function(e, i) {
            e.element.parentsUntil("body").bind("scroll.droppable", function() {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
            });
        },
        drag: function(e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var s, n, a, o = t.ui.intersect(e, this, this.options.tolerance), r = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                    r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function() {
                        return t.data(this, "ui-droppable").options.scope === n;
                    }), a.length && (s = t.data(a[0], "ui-droppable"), s.greedyChild = "isover" === r)), 
                    s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, 
                    this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), 
                    s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)));
                }
            });
        },
        dragStop: function(e, i) {
            e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
        }
    };
})(jQuery);

var peerConnectionsListElem = null;

var ssrcInfoManager = null;

var peerConnectionUpdateTable = null;

var statsTable = null;

var dumpCreator = null;

var SsrcInfoManager = function() {
    "use strict";
    function SsrcInfoManager() {
        this.streamInfoContainer_ = {};
        this.ATTRIBUTE_SEPARATOR_ = /[\r,\n]/;
        this.FIELD_SEPARATOR_REGEX_ = / .*:/;
        this.SSRC_ATTRIBUTE_PREFIX_ = "a=ssrc:";
        this.SSRC_INFO_BLOCK_CLASS_ = "ssrc-info-block";
    }
    SsrcInfoManager.prototype = {
        addSsrcStreamInfo: function(sdp) {
            var attributes = sdp.split(this.ATTRIBUTE_SEPARATOR_);
            for (var i = 0; i < attributes.length; ++i) {
                if (attributes[i].indexOf(this.SSRC_ATTRIBUTE_PREFIX_) != 0) continue;
                var nextFieldIndex = attributes[i].search(this.FIELD_SEPARATOR_REGEX_);
                if (nextFieldIndex == -1) continue;
                var ssrc = attributes[i].substring(this.SSRC_ATTRIBUTE_PREFIX_.length, nextFieldIndex);
                if (!this.streamInfoContainer_[ssrc]) this.streamInfoContainer_[ssrc] = {};
                var rest = attributes[i].substring(nextFieldIndex + 1);
                var name, value;
                while (rest.length > 0) {
                    nextFieldIndex = rest.search(this.FIELD_SEPARATOR_REGEX_);
                    if (nextFieldIndex == -1) nextFieldIndex = rest.length;
                    name = rest.substring(0, rest.indexOf(":"));
                    value = rest.substring(rest.indexOf(":") + 1, nextFieldIndex);
                    this.streamInfoContainer_[ssrc][name] = value;
                    rest = rest.substring(nextFieldIndex + 1);
                }
            }
        },
        getStreamInfo: function(ssrc) {
            return this.streamInfoContainer_[ssrc];
        },
        populateSsrcInfo: function(parentElement, ssrc) {
            if (!this.streamInfoContainer_[ssrc]) return;
            parentElement.className = this.SSRC_INFO_BLOCK_CLASS_;
            var fieldElement;
            for (var property in this.streamInfoContainer_[ssrc]) {
                fieldElement = document.createElement("div");
                parentElement.appendChild(fieldElement);
                fieldElement.textContent = property + ":" + this.streamInfoContainer_[ssrc][property];
            }
        }
    };
    return SsrcInfoManager;
}();

var TimelineDataSeries = function() {
    "use strict";
    function TimelineDataSeries() {
        this.dataPoints_ = [];
        this.color_ = "red";
        this.isVisible_ = true;
        this.cacheStartTime_ = null;
        this.cacheStepSize_ = 0;
        this.cacheValues_ = [];
    }
    TimelineDataSeries.prototype = {
        addPoint: function(timeTicks, value) {
            var time = new Date(timeTicks);
            this.dataPoints_.push(new DataPoint(time, value));
        },
        isVisible: function() {
            return this.isVisible_;
        },
        show: function(isVisible) {
            this.isVisible_ = isVisible;
        },
        getColor: function() {
            return this.color_;
        },
        setColor: function(color) {
            this.color_ = color;
        },
        getAvg: function() {
            var sum = 0;
            for (var i = 0; i < this.dataPoints_.length; i++) {
                sum += this.dataPoints_[i].value;
            }
            return sum / this.dataPoints_.length;
        },
        getValues: function(startTime, stepSize, count) {
            if (this.cacheStartTime_ == startTime && this.cacheStepSize_ == stepSize && this.cacheValues_.length == count) {
                return this.cacheValues_;
            }
            this.cacheValues_ = this.getValuesInternal_(startTime, stepSize, count);
            this.cacheStartTime_ = startTime;
            this.cacheStepSize_ = stepSize;
            return this.cacheValues_;
        },
        getValuesInternal_: function(startTime, stepSize, count) {
            var values = [];
            var nextPoint = 0;
            var currentValue = 0;
            var time = startTime;
            for (var i = 0; i < count; ++i) {
                while (nextPoint < this.dataPoints_.length && this.dataPoints_[nextPoint].time < time) {
                    currentValue = this.dataPoints_[nextPoint].value;
                    ++nextPoint;
                }
                values[i] = currentValue;
                time += stepSize;
            }
            return values;
        }
    };
    function DataPoint(time, value) {
        this.time = time;
        this.value = value;
    }
    return TimelineDataSeries;
}();

var TimelineGraphView = function() {
    "use strict";
    var DEFAULT_SCALE = 2e3;
    var MAX_VERTICAL_LABELS = 6;
    var LABEL_VERTICAL_SPACING = 4;
    var LABEL_HORIZONTAL_SPACING = 3;
    var LABEL_LABEL_HORIZONTAL_SPACING = 25;
    var Y_AXIS_TICK_LENGTH = 10;
    var GRID_COLOR = "#CCC";
    var TEXT_COLOR = "#000";
    var BACKGROUND_COLOR = "#FFF";
    function TimelineGraphView(divId, canvasId) {
        this.scrollbar_ = {
            position_: 0,
            range_: 0
        };
        this.graphDiv_ = $('[id="' + divId + '"]')[0];
        this.canvas_ = $('[id="' + canvasId + '"]')[0];
        this.startTime_ = 0;
        this.endTime_ = 1;
        this.graph_ = null;
        this.updateScrollbarRange_(true);
    }
    TimelineGraphView.prototype = {
        getLength_: function() {
            var timeRange = this.endTime_ - this.startTime_;
            return Math.floor(timeRange / DEFAULT_SCALE);
        },
        graphScrolledToRightEdge_: function() {
            return this.scrollbar_.position_ == this.scrollbar_.range_;
        },
        updateScrollbarRange_: function(resetPosition) {
            var scrollbarRange = this.getLength_() - this.canvas_.width;
            if (scrollbarRange < 0) scrollbarRange = 0;
            if (this.scrollbar_.position_ > scrollbarRange) resetPosition = true;
            this.scrollbar_.range_ = scrollbarRange;
            if (resetPosition) {
                this.scrollbar_.position_ = scrollbarRange;
                this.repaint();
            }
        },
        setDateRange: function(startDate, endDate) {
            this.startTime_ = startDate.getTime();
            this.endTime_ = endDate.getTime();
            if (this.endTime_ <= this.startTime_) this.startTime_ = this.endTime_ - 1;
            this.updateScrollbarRange_(true);
        },
        updateEndDate: function() {
            this.endTime_ = new Date().getTime();
            this.updateScrollbarRange_(this.graphScrolledToRightEdge_());
        },
        getStartDate: function() {
            return new Date(this.startTime_);
        },
        setDataSeries: function(dataSeries) {
            this.graph_ = new Graph();
            for (var i = 0; i < dataSeries.length; ++i) this.graph_.addDataSeries(dataSeries[i]);
            this.repaint();
        },
        addDataSeries: function(dataSeries) {
            if (!this.graph_) this.graph_ = new Graph();
            this.graph_.addDataSeries(dataSeries);
            this.repaint();
        },
        repaint: function() {
            this.repaintTimerRunning_ = false;
            var width = this.canvas_.width;
            var height = this.canvas_.height;
            var context = this.canvas_.getContext("2d");
            context.fillStyle = BACKGROUND_COLOR;
            context.fillRect(0, 0, width, height);
            var fontHeightString = context.font.match(/([0-9]+)px/)[1];
            var fontHeight = parseInt(fontHeightString);
            if (fontHeightString.length == 0 || fontHeight <= 0 || fontHeight * 4 > height || width < 50) {
                return;
            }
            context.save();
            context.translate(.5, .5);
            var position = this.scrollbar_.position_;
            if (this.scrollbar_.range_ == 0) position = this.getLength_() - this.canvas_.width;
            var visibleStartTime = this.startTime_ + position * DEFAULT_SCALE;
            var textHeight = height;
            height -= fontHeight + LABEL_VERTICAL_SPACING;
            this.drawTimeLabels(context, width, height, textHeight, visibleStartTime);
            context.strokeStyle = GRID_COLOR;
            context.strokeRect(0, 0, width - 1, height - 1);
            if (this.graph_) {
                this.graph_.layout(width, height, fontHeight, visibleStartTime, DEFAULT_SCALE);
                this.graph_.drawTicks(context);
                this.graph_.drawLines(context);
                this.graph_.drawLabels(context);
            }
            context.restore();
        },
        drawTimeLabels: function(context, width, height, textHeight, startTime) {
            var sampleText = new Date(startTime).toLocaleTimeString();
            var targetSpacing = context.measureText(sampleText).width + LABEL_LABEL_HORIZONTAL_SPACING;
            var timeStepValues = [ 1e3, 1e3 * 5, 1e3 * 30, 1e3 * 60, 1e3 * 60 * 5, 1e3 * 60 * 30, 1e3 * 60 * 60, 1e3 * 60 * 60 * 5 ];
            var timeStep = null;
            for (var i = 0; i < timeStepValues.length; ++i) {
                if (timeStepValues[i] / DEFAULT_SCALE >= targetSpacing) {
                    timeStep = timeStepValues[i];
                    break;
                }
            }
            if (!timeStep) return;
            var time = Math.ceil(startTime / timeStep) * timeStep;
            context.textBaseline = "bottom";
            context.textAlign = "center";
            context.fillStyle = TEXT_COLOR;
            context.strokeStyle = GRID_COLOR;
            while (true) {
                var x = Math.round((time - startTime) / DEFAULT_SCALE);
                if (x >= width) break;
                var text = new Date(time).toLocaleTimeString();
                context.fillText(text, x, textHeight);
                context.beginPath();
                context.lineTo(x, 0);
                context.lineTo(x, height);
                context.stroke();
                time += timeStep;
            }
        },
        getDataSeriesCount: function() {
            if (this.graph_) return this.graph_.dataSeries_.length;
            return 0;
        },
        hasDataSeries: function(dataSeries) {
            if (this.graph_) return this.graph_.hasDataSeries(dataSeries);
            return false;
        }
    };
    var Graph = function() {
        function Graph() {
            this.dataSeries_ = [];
            this.width_ = 0;
            this.height_ = 0;
            this.fontHeight_ = 0;
            this.startTime_ = 0;
            this.scale_ = 0;
            this.max_ = 0;
            this.labels_ = [];
        }
        function Label(height, text) {
            this.height = height;
            this.text = text;
        }
        Graph.prototype = {
            addDataSeries: function(dataSeries) {
                this.dataSeries_.push(dataSeries);
            },
            hasDataSeries: function(dataSeries) {
                for (var i = 0; i < this.dataSeries_.length; ++i) {
                    if (this.dataSeries_[i] == dataSeries) return true;
                }
                return false;
            },
            getValues: function(dataSeries) {
                if (!dataSeries.isVisible()) return null;
                return dataSeries.getValues(this.startTime_, this.scale_, this.width_);
            },
            layout: function(width, height, fontHeight, startTime, scale) {
                this.width_ = width;
                this.height_ = height;
                this.fontHeight_ = fontHeight;
                this.startTime_ = startTime;
                this.scale_ = scale;
                var max = 0;
                for (var i = 0; i < this.dataSeries_.length; ++i) {
                    var values = this.getValues(this.dataSeries_[i]);
                    if (!values) continue;
                    for (var j = 0; j < values.length; ++j) {
                        if (values[j] > max) max = values[j];
                    }
                }
                this.layoutLabels_(max);
            },
            layoutLabels_: function(maxValue) {
                if (maxValue < 1024) {
                    this.layoutLabelsBasic_(maxValue, 0);
                    return;
                }
                var units = [ "", "m", "M", "G", "T", "P" ];
                var unit = 1;
                maxValue /= 1024;
                while (units[unit + 1] && maxValue >= 1024) {
                    maxValue /= 1024;
                    ++unit;
                }
                this.layoutLabelsBasic_(maxValue, 1);
                for (var i = 0; i < this.labels_.length; ++i) this.labels_[i] += " " + units[unit];
                this.max_ *= Math.pow(1024, unit);
            },
            layoutLabelsBasic_: function(maxValue, maxDecimalDigits) {
                this.labels_ = [];
                if (maxValue == 0) {
                    this.max_ = maxValue;
                    return;
                }
                var minLabelSpacing = 2 * this.fontHeight_ + LABEL_VERTICAL_SPACING;
                var maxLabels = 1 + this.height_ / minLabelSpacing;
                if (maxLabels < 2) {
                    maxLabels = 2;
                } else if (maxLabels > MAX_VERTICAL_LABELS) {
                    maxLabels = MAX_VERTICAL_LABELS;
                }
                var stepSize = Math.pow(10, -maxDecimalDigits);
                var stepSizeDecimalDigits = maxDecimalDigits;
                while (true) {
                    if (Math.ceil(maxValue / stepSize) + 1 <= maxLabels) break;
                    if (Math.ceil(maxValue / (stepSize * 2)) + 1 <= maxLabels) {
                        stepSize *= 2;
                        break;
                    }
                    if (Math.ceil(maxValue / (stepSize * 5)) + 1 <= maxLabels) {
                        stepSize *= 5;
                        break;
                    }
                    stepSize *= 10;
                    if (stepSizeDecimalDigits > 0) --stepSizeDecimalDigits;
                }
                this.max_ = Math.ceil(maxValue / stepSize) * stepSize;
                for (var label = this.max_; label >= 0; label -= stepSize) this.labels_.push(label.toFixed(stepSizeDecimalDigits));
            },
            drawTicks: function(context) {
                var x1;
                var x2;
                x1 = this.width_ - 1;
                x2 = this.width_ - 1 - Y_AXIS_TICK_LENGTH;
                context.fillStyle = GRID_COLOR;
                context.beginPath();
                for (var i = 1; i < this.labels_.length - 1; ++i) {
                    var y = Math.round(this.height_ * i / (this.labels_.length - 1));
                    context.moveTo(x1, y);
                    context.lineTo(x2, y);
                }
                context.stroke();
            },
            drawLines: function(context) {
                var scale = 0;
                var bottom = this.height_ - 1;
                if (this.max_) scale = bottom / this.max_;
                for (var i = this.dataSeries_.length - 1; i >= 0; --i) {
                    var values = this.getValues(this.dataSeries_[i]);
                    if (!values) continue;
                    context.strokeStyle = this.dataSeries_[i].getColor();
                    context.beginPath();
                    for (var x = 0; x < values.length; ++x) {
                        context.lineTo(x, bottom - Math.round(values[x] * scale));
                    }
                    context.stroke();
                }
            },
            drawLabels: function(context) {
                if (this.labels_.length == 0) return;
                var x = this.width_ - LABEL_HORIZONTAL_SPACING;
                context.fillStyle = TEXT_COLOR;
                context.textAlign = "right";
                context.textBaseline = "top";
                context.fillText(this.labels_[0], x, 0);
                context.textBaseline = "bottom";
                var step = (this.height_ - 1) / (this.labels_.length - 1);
                for (var i = 1; i < this.labels_.length; ++i) context.fillText(this.labels_[i], x, step * i);
            }
        };
        return Graph;
    }();
    return TimelineGraphView;
}();

var STATS_GRAPH_CONTAINER_HEADING_CLASS = "stats-graph-container-heading";

var bweCompoundGraphConfig = {
    googAvailableSendBandwidth: {
        color: "red"
    },
    googTargetEncBitrateCorrected: {
        color: "purple"
    },
    googActualEncBitrate: {
        color: "orange"
    },
    googRetransmitBitrate: {
        color: "blue"
    },
    googTransmitBitrate: {
        color: "green"
    }
};

var totalToPerSecond = function(srcDataSeries) {
    var length = srcDataSeries.dataPoints_.length;
    if (length >= 2) {
        var lastDataPoint = srcDataSeries.dataPoints_[length - 1];
        var secondLastDataPoint = srcDataSeries.dataPoints_[length - 2];
        return Math.round((lastDataPoint.value - secondLastDataPoint.value) * 1e3 / (lastDataPoint.time - secondLastDataPoint.time));
    }
    return 0;
};

var totalBytesToBitsPerSecond = function(srcDataSeries) {
    return totalToPerSecond(srcDataSeries) * 8;
};

var totalKiloBytesToBitsPerSecond = function(srcDataSeries) {
    return totalBytesToBitsPerSecond(srcDataSeries) / 1e3;
};

var packetsLostPercentage = function(srcDataSeries, peerConnectionElement, reportType, reportId) {
    var packetsLost = getLastValue(peerConnectionElement, reportType, reportId, "packetsLost");
    var packetsReceived = getLastValue(peerConnectionElement, reportType, reportId, "packetsReceived");
    if (packetsLost != null && packetsReceived != null) {
        return Math.round(packetsLost * 100 / (packetsReceived + packetsLost) * 100) / 100;
    } else {
        return null;
    }
};

function getLastValue(peerConnectionElement, reportType, reportId, label) {
    return getLastValueAt(peerConnectionElement, reportType, reportId, label, 1);
}

function getLastValueAt(peerConnectionElement, reportType, reportId, label, index) {
    var srcDataSeries = getDataSeries(peerConnectionElement.id, reportType, reportId, label);
    if (srcDataSeries) {
        return srcDataSeries.dataPoints_[srcDataSeries.dataPoints_.length - index].value;
    }
    return null;
}

function getAvgValue(peerConnectionElement, reportType, reportId, label) {
    var srcDataSeries = getDataSeries(peerConnectionElement.id, reportType, reportId, label);
    return srcDataSeries ? srcDataSeries.getAvg() : null;
}

function getDataSeries(peerConnectionId, reportType, reportId, label) {
    var dataSeriesId = this.dataSeriesId(peerConnectionId, reportType, reportId, label);
    return dataSeries[dataSeriesId];
}

function getDataSeriesByLabel(peerConnectionId, type, label) {
    var keys = Object.keys(dataSeries);
    var results = [];
    var regex = new RegExp(peerConnectionId + ".*" + type + ".*" + label);
    for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (regex.test(key)) {
            var obj = {};
            results.push(dataSeries[key]);
        }
    }
    return results;
}

function getValueBefore(peerConnectionElement, reportType, reportId, label, timestamp) {
    var dataSeriesId = this.dataSeriesId(peerConnectionElement.id, reportType, reportId, label);
    var srcDataSeries = dataSeries[dataSeriesId];
    if (srcDataSeries) {
        for (i = srcDataSeries.dataPoints_.length - 1; i >= 0; i--) {
            if (srcDataSeries.dataPoints_[i].time < timestamp) {
                return srcDataSeries.dataPoints_[i].value;
            }
        }
        return srcDataSeries.dataPoints_[0].value;
    }
    return null;
}

function dataSeriesId(peerConnectionId, reportType, reportId, label) {
    return peerConnectionId + "-" + reportType + "-" + reportId + "-" + label;
}

function graphViewId(peerConnectionElement, reportType, reportId, graphType) {
    return peerConnectionElement.id + "-" + reportType + "-" + reportId + "-" + graphType;
}

function matchesType(label, type, statsData) {
    if (type == "video" && isVideoStats(statsData)) {
        return true;
    } else if (type == "audio" && isAudioStats(statsData)) {
        if (label == "googJitterReceived" && !containsLabel(statsData, "audioOutputLevel")) {
            return false;
        }
        return true;
    }
    return false;
}

function isVideoStats(statsData) {
    return containsLabel(statsData, "googFrameHeightSent") || containsLabel(statsData, "googFrameHeightReceived");
}

function isAudioStats(statsData) {
    return containsLabel(statsData, "audioInputLevel") || containsLabel(statsData, "audioOutputLevel");
}

function getStatsDataType(label, statsData) {
    if (isVideoStats(statsData)) {
        return "video";
    } else if (isAudioStats(statsData)) {
        if (label == "googJitterReceived" && !containsLabel(statsData, "audioOutputLevel")) {
            return null;
        }
        return "audio";
    }
    return null;
}

function containsLabel(statsData, label) {
    for (var i = 0; i < statsData.length - 1; i = i + 2) {
        if (statsData[i] == label) {
            return true;
        }
    }
    return false;
}

var dataConversionConfig = {
    packetsSent: {
        convertedName: "packetsSentPerSecond",
        convertFunction: totalToPerSecond
    },
    bytesSent: {
        convertedName: "kiloBitsSentPerSecond",
        convertFunction: totalKiloBytesToBitsPerSecond
    },
    packetsReceived: {
        convertedName: "packetsReceivedPerSecond",
        convertFunction: totalToPerSecond
    },
    bytesReceived: {
        convertedName: "kiloBitsReceivedPerSecond",
        convertFunction: totalKiloBytesToBitsPerSecond
    },
    packetsLost: {
        convertedName: "packetsLostPer",
        convertFunction: packetsLostPercentage
    },
    googTargetEncBitrate: {
        convertedName: "googTargetEncBitrateCorrected",
        convertFunction: function(srcDataSeries) {
            var length = srcDataSeries.dataPoints_.length;
            var lastDataPoint = srcDataSeries.dataPoints_[length - 1];
            if (lastDataPoint.value < 5e3) return lastDataPoint.value * 1e3;
            return lastDataPoint.value;
        }
    }
};

var graphViews = {};

var dataSeries = {};

function updateGraph(peerConnectionElement, reportType, reportId, singleReport, label) {
    var graphType = bweCompoundGraphConfig[label] ? "bweCompound" : label;
    var graphViewId = this.graphViewId(peerConnectionElement, reportType, reportId, graphType);
    if (!graphViews[graphViewId]) {
        var statsType = getStatsDataType(label, singleReport.values);
        graphViews[graphViewId] = createStatsGraphView(peerConnectionElement, reportType, reportId, graphType, statsType);
        var date = new Date(singleReport.timestamp);
        graphViews[graphViewId].setDateRange(date, date);
    }
    var dataSeriesId = this.dataSeriesId(peerConnectionElement.id, reportType, reportId, label);
    if (!graphViews[graphViewId].hasDataSeries(dataSeries[dataSeriesId])) graphViews[graphViewId].addDataSeries(dataSeries[dataSeriesId]);
    graphViews[graphViewId].updateEndDate();
}

function drawSingleReport(peerConnectionElement, reportType, reportId, singleReport) {
    if (!singleReport || !singleReport.values) return;
    for (var i = 0; i < singleReport.values.length - 1; i = i + 2) {
        var rawLabel = singleReport.values[i];
        var rawValue = parseInt(singleReport.values[i + 1]);
        if (isNaN(rawValue)) continue;
        var rawDataSeriesId = dataSeriesId(peerConnectionElement.id, reportType, reportId, rawLabel);
        var finalDataSeriesId = rawDataSeriesId;
        var finalLabel = rawLabel;
        var finalValue = rawValue;
        if (dataConversionConfig[rawLabel]) {
            addDataSeriesPoint(rawDataSeriesId, singleReport.timestamp, rawLabel, rawValue);
            finalValue = dataConversionConfig[rawLabel].convertFunction(dataSeries[rawDataSeriesId], peerConnectionElement, reportType, reportId);
            finalLabel = dataConversionConfig[rawLabel].convertedName;
            finalDataSeriesId = dataSeriesId(peerConnectionElement.id, reportType, reportId, finalLabel);
        }
        addDataSeriesPoint(finalDataSeriesId, singleReport.timestamp, finalLabel, finalValue);
        updateGraph(peerConnectionElement, reportType, reportId, singleReport, rawLabel);
        if (finalLabel != rawLabel) {
            updateGraph(peerConnectionElement, reportType, reportId, singleReport, finalLabel);
        }
    }
}

function addDataSeriesPoint(dataSeriesId, time, label, value) {
    if (!dataSeries[dataSeriesId]) {
        dataSeries[dataSeriesId] = new TimelineDataSeries();
        if (bweCompoundGraphConfig[label]) {
            dataSeries[dataSeriesId].setColor(bweCompoundGraphConfig[label].color);
        }
    }
    if (label == "packetsLost" && value < 0) {
        value = 0;
    }
    dataSeries[dataSeriesId].addPoint(time, value);
}

function ensureStatsGraphTopContainer(peerConnectionElement, reportType, reportId) {
    var containerId = peerConnectionElement.id + "-" + reportType + "-" + reportId + "-graph-container";
    var container = $('[id="' + containerId + '"]')[0];
    if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        container.className = "stats-graph-container";
        peerConnectionElement.appendChild(container);
    }
    return container;
}

function createStatsGraphView(peerConnectionElement, reportType, reportId, statsName, statsType) {
    var topContainer = ensureStatsGraphTopContainer(peerConnectionElement, reportType, reportId);
    var graphViewId = peerConnectionElement.id + "-" + reportType + "-" + reportId + "-" + statsName;
    var divId = graphViewId + "-div";
    var canvasId = graphViewId + "-canvas";
    var container = document.createElement("div");
    container.className = "stats-graph-sub-container " + statsName + "-" + statsType;
    topContainer.appendChild(container);
    container.innerHTML = "<div>" + statsName + "</div>" + "<div id=" + divId + "><canvas id=" + canvasId + "></canvas></div>";
    if (statsName == "bweCompound") {
        container.insertBefore(createBweCompoundLegend(peerConnectionElement, reportType + "-" + reportId), $('[id="' + divId + '"]')[0]);
    }
    return new TimelineGraphView(divId, canvasId);
}

function createBweCompoundLegend(peerConnectionElement, reportName) {
    var legend = document.createElement("div");
    for (var prop in bweCompoundGraphConfig) {
        var div = document.createElement("div");
        legend.appendChild(div);
        div.innerHTML = "<input type=checkbox checked></input>" + prop;
        div.style.color = bweCompoundGraphConfig[prop].color;
        div.dataSeriesId = peerConnectionElement.id + "-" + reportName + "-" + prop;
        div.graphViewId = peerConnectionElement.id + "-" + reportName + "-bweCompound";
        div.firstChild.addEventListener("click", function(event) {
            var target = dataSeries[event.target.parentNode.dataSeriesId];
            target.show(event.target.checked);
            graphViews[event.target.parentNode.graphViewId].repaint();
        });
    }
    return legend;
}

var StatsTable = function(ssrcInfoManager) {
    "use strict";
    function StatsTable(ssrcInfoManager) {
        this.ssrcInfoManager_ = ssrcInfoManager;
    }
    StatsTable.prototype = {
        addStatsReport: function(peerConnectionElement, reportType, reportId, report) {
            var statsTable = this.ensureStatsTable_(peerConnectionElement, report);
            if (report.stats) {
                this.addStatsToTable_(peerConnectionElement, reportType, reportId, statsTable, report.stats.timestamp, report.stats.values);
            }
        },
        ensureStatsTableContainer_: function(peerConnectionElement) {
            var containerId = peerConnectionElement.id + "-table-container";
            var container = $('[id="' + containerId + '"]')[0];
            if (!container) {
                container = document.createElement("div");
                container.id = containerId;
                container.className = "stats-table-container";
                peerConnectionElement.appendChild(container);
            }
            return container;
        },
        ensureStatsTable_: function(peerConnectionElement, report) {
            var tableId = peerConnectionElement.id + "-table-" + report.type + "-" + report.id;
            var table = $(document.getElementById(tableId))[0];
            if (!table) {
                var container = this.ensureStatsTableContainer_(peerConnectionElement);
                table = document.createElement("table");
                container.appendChild(table);
                table.id = tableId;
                table.border = 1;
                table.innerHTML = "<tr><th colspan=2></th></tr>";
                table.rows[0].cells[0].textContent = "Statistics " + report.type + "-" + report.id;
                if (report.type == "ssrc") {
                    table.insertRow(1);
                    table.rows[1].innerHTML = "<td colspan=2></td>";
                    this.ssrcInfoManager_.populateSsrcInfo(table.rows[1].cells[0], report.id);
                }
            }
            return table;
        },
        addStatsToTable_: function(peerConnectionElement, reportType, reportId, statsTable, time, statsData) {
            var date = Date(time);
            $(".stats-var").each(function() {
                var label = $(this).data("var");
                var type = $(this).data("type");
                if (matchesType(label, type, statsData)) {
                    var value = getLastValue(peerConnectionElement, reportType, reportId, label);
                    if (value != null) {
                        $(this).html(value);
                        $(this).attr("data-avg", getAvgValue(peerConnectionElement, reportType, reportId, label));
                    } else {}
                }
            });
        },
        updateStatsTableRow_: function(statsTable, rowName, value) {
            var trId = statsTable.id + "-" + rowName;
            var trElement = $('[id="' + trId + '"]')[0];
            if (!trElement) {
                trElement = document.createElement("tr");
                trElement.id = trId;
                statsTable.firstChild.appendChild(trElement);
                trElement.innerHTML = "<td>" + rowName + "</td><td></td>";
            }
            trElement.cells[1].textContent = value;
        }
    };
    return StatsTable;
}();

var PeerConnectionUpdateEntry = function(pid, lid, type, value) {
    this.pid = pid;
    this.lid = lid;
    this.type = type;
    this.value = value;
};

var PeerConnectionUpdateTable = function() {
    "use strict";
    function PeerConnectionUpdateTable() {
        this.UPDATE_LOG_ID_SUFFIX_ = "-update-log";
        this.UPDATE_LOG_CONTAINER_CLASS_ = "update-log-container";
        this.UPDATE_LOG_TABLE_CLASS_ = "update-log-table";
    }
    PeerConnectionUpdateTable.prototype = {
        addPeerConnectionUpdate: function(peerConnectionElement, update) {
            var tableElement = this.ensureUpdateContainer_(peerConnectionElement);
            var row = document.createElement("tr");
            tableElement.firstChild.appendChild(row);
            row.innerHTML = "<td>" + new Date().toLocaleString() + "</td>";
            if (update.value.length == 0) {
                row.innerHTML += "<td>" + update.type + "</td>";
                return;
            }
            row.innerHTML += "<td><details><summary>" + update.type + "</summary></details></td>";
            var valueContainer = document.createElement("pre");
            var details = row.cells[1].childNodes[0];
            details.appendChild(valueContainer);
            valueContainer.textContent = update.value;
        },
        ensureUpdateContainer_: function(peerConnectionElement) {
            var tableId = peerConnectionElement.id + this.UPDATE_LOG_ID_SUFFIX_;
            var tableElement = $('[id="' + tableId + '"]')[0];
            if (!tableElement) {
                var tableContainer = document.createElement("div");
                tableContainer.className = this.UPDATE_LOG_CONTAINER_CLASS_;
                peerConnectionElement.appendChild(tableContainer);
                tableElement = document.createElement("table");
                tableElement.className = this.UPDATE_LOG_TABLE_CLASS_;
                tableElement.id = tableId;
                tableElement.border = 1;
                tableContainer.appendChild(tableElement);
                tableElement.innerHTML = "<tr><th>Time</th>" + '<th class="update-log-header-event">Event</th></tr>';
            }
            return tableElement;
        }
    };
    return PeerConnectionUpdateTable;
}();

var DumpCreator = function() {
    function DumpCreator(containerElement) {
        this.recording_ = false;
        this.StatusStrings_ = {
            NOT_STARTED: "not started.",
            RECORDING: "recording..."
        }, this.status_ = this.StatusStrings_.NOT_STARTED;
        this.root_ = document.createElement("details");
        this.root_.className = "peer-connection-dump-root";
        containerElement.appendChild(this.root_);
        var summary = document.createElement("summary");
        this.root_.appendChild(summary);
        summary.textContent = "Create Dump";
        var content = document.createElement("pre");
        this.root_.appendChild(content);
        content.innerHTML = "<button></button> Status: <span></span>";
        content.getElementsByTagName("button")[0].addEventListener("click", this.onToggled_.bind(this));
        this.updateDisplay_();
    }
    DumpCreator.prototype = {
        onToggled_: function() {
            if (this.recording_) {
                this.recording_ = false;
                this.status_ = this.StatusStrings_.NOT_STARTED;
                chrome.send("stopRtpRecording");
            } else {
                this.recording_ = true;
                this.status_ = this.StatusStrings_.RECORDING;
                chrome.send("startRtpRecording");
            }
            this.updateDisplay_();
        },
        updateDisplay_: function() {
            if (this.recording_) {
                this.root_.getElementsByTagName("button")[0].textContent = "Stop Recording RTP Packets";
            } else {
                this.root_.getElementsByTagName("button")[0].textContent = "Start Recording RTP Packets";
            }
            this.root_.getElementsByTagName("span")[0].textContent = this.status_;
        },
        onUpdate: function(update) {
            if (this.recording_) {
                this.status_ = JSON.stringify(update);
                this.updateDisplay_();
            }
        }
    };
    return DumpCreator;
}();

function initialize() {
    ssrcInfoManager = new SsrcInfoManager();
    peerConnectionUpdateTable = new PeerConnectionUpdateTable();
    statsTable = new StatsTable(ssrcInfoManager);
}

document.addEventListener("DOMContentLoaded", initialize);

function getPeerConnectionId(data) {
    return data.pid + "-" + data.lid;
}

function extractSsrcInfo(data) {
    if (data.type == "setLocalDescription" || data.type == "setRemoteDescription") {
        ssrcInfoManager.addSsrcStreamInfo(data.value);
    }
}

function removePeerConnection(data) {
    var element = $('[id="' + getPeerConnectionId(data) + '"]')[0];
    if (element) peerConnectionsListElem.removeChild(element);
}

function addPeerConnection(data) {
    var peerConnectionElement = $('[id="' + getPeerConnectionId(data) + '"]')[0];
    if (!peerConnectionElement) {
        peerConnectionElement = document.createElement("li");
        peerConnectionsListElem.appendChild(peerConnectionElement);
        peerConnectionElement.id = getPeerConnectionId(data);
    }
    peerConnectionElement.innerHTML = "<h3>PeerConnection " + peerConnectionElement.id + "</h3>" + "<div>" + data.url + " " + data.servers + " " + data.constraints + "</div>";
    peerConnectionElement.firstChild.title = "Click to collapse or expand";
    peerConnectionElement.firstChild.addEventListener("click", function(e) {
        if (e.target.parentElement.className == "") e.target.parentElement.className = "peer-connection-hidden"; else e.target.parentElement.className = "";
    });
    return peerConnectionElement;
}

function updatePeerConnection(data) {
    var peerConnectionElement = $('[id="' + getPeerConnectionId(data) + '"]')[0];
    peerConnectionUpdateTable.addPeerConnectionUpdate(peerConnectionElement, data);
    extractSsrcInfo(data);
}

function updateAllPeerConnections(data) {
    for (var i = 0; i < data.length; ++i) {
        var peerConnection = addPeerConnection(data[i]);
        var log = data[i].log;
        for (var j = 0; j < log.length; ++j) {
            peerConnectionUpdateTable.addPeerConnectionUpdate(peerConnection, log[j]);
            extractSsrcInfo(log[j]);
        }
    }
}

function addStats(data) {
    var peerConnectionElement = getPeerConnectionElement(data);
    if (!peerConnectionElement) return;
    for (var i = 0; i < data.reports.length; ++i) {
        var report = data.reports[i];
        drawSingleReport(peerConnectionElement, report.type, report.id, report.stats);
        statsTable.addStatsReport(peerConnectionElement, report.type, report.id, report);
        if (isVideoStats(report.stats.values)) {
            var oneMinAgo = new Date(new Date().getTime() - 1e3 * 60);
            var videoPacketsLost = getLastValue(peerConnectionElement, report.type, report.id, "packetsLost");
            var packetsSent = getLastValue(peerConnectionElement, report.type, report.id, "packetsReceived");
            if (videoPacketsLost != null && packetsSent != null) {
                var videoPacketsLostOneMinAgo = getValueBefore(peerConnectionElement, report.type, report.id, "packetsLost", oneMinAgo);
                var packetsSentOneMinAgo = getValueBefore(peerConnectionElement, report.type, report.id, "packetsReceived", oneMinAgo);
                var quality = (videoPacketsLost - videoPacketsLostOneMinAgo) / (packetsSent - packetsSentOneMinAgo) * 100;
                if (quality < 10) {
                    $("#quality1").fadeIn(10);
                    $("#quality2, #quality3, #quality4").fadeOut(10);
                } else if (quality > 10 && quality < 20) {
                    $("#quality2").fadeIn(10);
                    $("#quality1, #quality3, #quality4").fadeOut(10);
                } else if (quality > 20 && quality < 100) {
                    $("#quality3").fadeIn(10);
                    $("#quality1, #quality2, #quality4").fadeOut(10);
                } else if (quality > 100 && quality < 1e3) {
                    $("#quality4").fadeIn(10);
                    $("#quality1, #quality2, #quality3").fadeOut(10);
                }
            }
        }
    }
}

function getPeerConnectionElement(data) {
    return $('[id="' + getPeerConnectionId(data) + '"]')[0];
}

function updateDumpStatus(update) {
    dumpCreator.onUpdate(update);
}

(function(root, undefined) {
    var detect = root.detect = function() {
        var _this = function() {};
        var regexes = {
            browser_parsers: [ {
                regex: "^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii",
                family_replacement: "Wii",
                manufacturer: "Nintendo"
            }, {
                regex: "(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                family_replacement: "Camino",
                other: true
            }, {
                regex: "(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                family_replacement: "Pale Moon (Firefox Variant)",
                other: true
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)(pre)",
                family_replacment: "Firefox Mobile"
            }, {
                regex: "(Fennec)/(\\d+)\\.(\\d+)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "Mobile.*(Firefox)/(\\d+)\\.(\\d+)",
                family_replacement: "Firefox Mobile"
            }, {
                regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)",
                family_replacement: "Firefox ($1)"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                family_replacement: "Firefox Alpha"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                family_replacement: "Firefox Beta"
            }, {
                regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                family_replacement: "Firefox Alpha"
            }, {
                regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                family_replacement: "Firefox Beta"
            }, {
                regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?",
                family_replacement: "Firefox ($1)"
            }, {
                regex: "(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "MicroB",
                tablet: true
            }, {
                regex: "(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?"
            }, {
                regex: "(Flock)/(\\d+)\\.(\\d+)(b\\d+?)",
                family_replacement: "Flock",
                other: true
            }, {
                regex: "(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Rockmelt",
                other: true
            }, {
                regex: "(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Netscape"
            }, {
                regex: "(MyIBrow)/(\\d+)\\.(\\d+)",
                family_replacement: "My Internet Browser",
                other: true
            }, {
                regex: "(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera Tablet",
                tablet: true
            }, {
                regex: "(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mobile"
            }, {
                regex: "Opera Mobi",
                family_replacement: "Opera Mobile"
            }, {
                regex: "(Opera Mini)/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mini"
            }, {
                regex: "(Opera Mini)/att/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mini"
            }, {
                regex: "(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera"
            }, {
                regex: "(webOSBrowser)/(\\d+)\\.(\\d+)",
                family_replacement: "webOS"
            }, {
                regex: "(webOS)/(\\d+)\\.(\\d+)",
                family_replacement: "webOS"
            }, {
                regex: "(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)",
                family_replacement: "webOS TouchPad"
            }, {
                regex: "(luakit)",
                family_replacement: "LuaKit",
                other: true
            }, {
                regex: "(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)",
                family_replacement: "Lightning",
                other: true
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)",
                family_replacement: "Swiftfox",
                other: true
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)",
                family_replacement: "Swiftfox",
                other: true
            }, {
                regex: "rekonq",
                family_replacement: "Rekonq",
                other: true
            }, {
                regex: "(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                family_replacement: "Conkeror",
                other: true
            }, {
                regex: "(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Konqueror",
                other: true
            }, {
                regex: "(WeTab)-Browser",
                family_replacement: "WeTab",
                other: true
            }, {
                regex: "(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Comodo Dragon",
                other: true
            }, {
                regex: "(YottaaMonitor)",
                family_replacement: "Yottaa Monitor",
                other: true
            }, {
                regex: "(Kindle)/(\\d+)\\.(\\d+)",
                family_replacement: "Kindle"
            }, {
                regex: "(Symphony) (\\d+).(\\d+)",
                family_replacement: "Symphony",
                other: true
            }, {
                regex: "Minimo",
                family_replacement: "Minimo",
                other: true
            }, {
                regex: "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Mobile"
            }, {
                regex: "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Mobile iOS"
            }, {
                regex: "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile",
                family_replacement: "Chrome Mobile"
            }, {
                regex: "(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Frame"
            }, {
                regex: "(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "UC Browser",
                other: true
            }, {
                regex: "(SLP Browser)/(\\d+)\\.(\\d+)",
                family_replacement: "Tizen Browser",
                other: true
            }, {
                regex: "(Epiphany)/(\\d+)\\.(\\d+).(\\d+)",
                family_replacement: "Epiphany",
                other: true
            }, {
                regex: "(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)",
                family_replacement: "Sogou Explorer",
                other: true
            }, {
                regex: "(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)",
                family_replacement: "PingdomBot",
                other: true
            }, {
                regex: "(facebookexternalhit)/(\\d+)\\.(\\d+)",
                family_replacement: "FacebookBot"
            }, {
                regex: "(Twitterbot)/(\\d+)\\.(\\d+)",
                family_replacement: "TwitterBot"
            }, {
                regex: "(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iron|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris)/(\\d+)\\.(\\d+)"
            }, {
                regex: "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?"
            }, {
                regex: "(Android) Donut",
                v2_replacement: "2",
                v1_replacement: "1"
            }, {
                regex: "(Android) Eclair",
                v2_replacement: "1",
                v1_replacement: "2"
            }, {
                regex: "(Android) Froyo",
                v2_replacement: "2",
                v1_replacement: "2"
            }, {
                regex: "(Android) Gingerbread",
                v2_replacement: "3",
                v1_replacement: "2"
            }, {
                regex: "(Android) Honeycomb",
                v1_replacement: "3"
            }, {
                regex: "(IEMobile)[ /](\\d+)\\.(\\d+)",
                family_replacement: "IE Mobile"
            }, {
                regex: "(MSIE) (\\d+)\\.(\\d+).*XBLWP7",
                family_replacement: "IE Large Screen"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)"
            }, {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?"
            }, {
                regex: "(Obigo)InternetBrowser",
                other: true
            }, {
                regex: "(Obigo)\\-Browser",
                other: true
            }, {
                regex: "(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?",
                other: true
            }, {
                regex: "(MAXTHON|Maxthon) (\\d+)\\.(\\d+)",
                family_replacement: "Maxthon",
                other: true
            }, {
                regex: "(Maxthon|MyIE2|Uzbl|Shiira)",
                v1_replacement: "0",
                other: true
            }, {
                regex: "(PLAYSTATION) (\\d+)",
                family_replacement: "PlayStation",
                manufacturer: "Sony"
            }, {
                regex: "(PlayStation Portable)[^\\d]+(\\d+).(\\d+)",
                manufacturer: "Sony"
            }, {
                regex: "(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(POLARIS)/(\\d+)\\.(\\d+)",
                family_replacement: "Polaris",
                other: true
            }, {
                regex: "(Embider)/(\\d+)\\.(\\d+)",
                family_replacement: "Polaris",
                other: true
            }, {
                regex: "(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Bon Echo",
                other: true
            }, {
                regex: "(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPod).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPod)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            }, {
                regex: "(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPad).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPad)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(AvantGo) (\\d+).(\\d+)",
                other: true
            }, {
                regex: "(Avant)",
                v1_replacement: "1",
                other: true
            }, {
                regex: "^(Nokia)",
                family_replacement: "Nokia Services (WAP) Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)",
                family_replacement: "NokiaBrowser",
                manufacturer: "Nokia"
            }, {
                regex: "(Series60)/5\\.0",
                v2_replacement: "0",
                v1_replacement: "7",
                family_replacement: "NokiaBrowser",
                manufacturer: "Nokia"
            }, {
                regex: "(Series60)/(\\d+)\\.(\\d+)",
                family_replacement: "Nokia OSS Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Nokia Series 40 Ovi Browser",
                manufacturer: "Nokia"
            }, {
                regex: "(Nokia)[EN]?(\\d+)",
                manufacturer: "Nokia"
            }, {
                regex: "(BB10);",
                family_replacement: "Blackberry WebKit",
                manufacturer: "RIM"
            }, {
                regex: "(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Blackberry WebKit",
                tablet: true,
                manufacturer: "Nokia"
            }, {
                regex: "(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Blackberry WebKit",
                manufacturer: "RIM"
            }, {
                regex: "(Black[bB]erry)\\s?(\\d+)",
                family_replacement: "Blackberry",
                manufacturer: "RIM"
            }, {
                regex: "(OmniWeb)/v(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Blazer)/(\\d+)\\.(\\d+)",
                family_replacement: "Palm Blazer",
                manufacturer: "Palm"
            }, {
                regex: "(Pre)/(\\d+)\\.(\\d+)",
                family_replacement: "Palm Pre",
                manufacturer: "Palm"
            }, {
                regex: "(Links) \\((\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(QtWeb) Internet Browser/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                other: true,
                tablet: true
            }, {
                regex: "(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Version/\\d+\\.\\d+.\\d+ Safari/",
                family_replacement: "WebKit Nightly"
            }, {
                regex: "(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/",
                family_replacement: "Safari"
            }, {
                regex: "(Safari)/\\d+"
            }, {
                regex: "(OLPC)/Update(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(OLPC)/Update()\\.(\\d+)",
                v1_replacement: "0",
                other: true
            }, {
                regex: "(SEMC\\-Browser)/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Teleca)",
                family_replacement: "Teleca Browser",
                other: true
            }, {
                regex: "(MSIE) (\\d+)\\.(\\d+)",
                family_replacement: "IE"
            } ],
            os_parsers: [ {
                regex: "(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
            }, {
                regex: "(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
            }, {
                regex: "(Android) Donut",
                os_v2_replacement: "2",
                os_v1_replacement: "1"
            }, {
                regex: "(Android) Eclair",
                os_v2_replacement: "1",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Froyo",
                os_v2_replacement: "2",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Gingerbread",
                os_v2_replacement: "3",
                os_v1_replacement: "2"
            }, {
                regex: "(Android) Honeycomb",
                os_v1_replacement: "3"
            }, {
                regex: "(Windows Phone 6\\.5)"
            }, {
                regex: "(Windows (?:NT 5\\.2|NT 5\\.1))",
                os_replacement: "Windows XP"
            }, {
                regex: "(XBLWP7)",
                os_replacement: "Windows Phone OS"
            }, {
                regex: "(Windows NT 6\\.1)",
                os_replacement: "Windows 7"
            }, {
                regex: "(Windows NT 6\\.0)",
                os_replacement: "Windows Vista"
            }, {
                regex: "(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)"
            }, {
                regex: "(Windows NT 6\\.2)",
                os_replacement: "Windows 8"
            }, {
                regex: "(Windows Phone 8)",
                os_replacement: "Windows Phone 8"
            }, {
                regex: "(Windows NT 5\\.0)",
                os_replacement: "Windows 2000"
            }, {
                regex: "(Windows Phone OS) (\\d+)\\.(\\d+)"
            }, {
                regex: "(Windows ?Mobile)",
                os_replacement: "Windows Mobile"
            }, {
                regex: "(WinNT4.0)",
                os_replacement: "Windows NT 4.0"
            }, {
                regex: "(Win98)",
                os_replacement: "Windows 98"
            }, {
                regex: "(Tizen)/(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?",
                manufacturer: "Apple"
            }, {
                regex: "(?:PPC|Intel) (Mac OS X)",
                manufacturer: "Apple"
            }, {
                regex: "(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone|iPad|iPod); Opera",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(iPad); Opera",
                tablet: true,
                manufacturer: "Apple"
            }, {
                regex: "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)",
                os_replacement: "iOS",
                manufacturer: "Apple"
            }, {
                regex: "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "Chrome OS"
            }, {
                regex: "(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                other: true
            }, {
                regex: "(Linux Mint)(?:/(\\d+))?",
                other: true
            }, {
                regex: "(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                other: true
            }, {
                regex: "(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)",
                os_replacement: "Symbian OS"
            }, {
                regex: "(Symbian/3).+NokiaBrowser/7\\.3",
                os_replacement: "Symbian^3 Anna"
            }, {
                regex: "(Symbian/3).+NokiaBrowser/7\\.4",
                os_replacement: "Symbian^3 Belle"
            }, {
                regex: "(Symbian/3)",
                os_replacement: "Symbian^3"
            }, {
                regex: "(Series 60|SymbOS|S60)",
                os_replacement: "Symbian OS"
            }, {
                regex: "(MeeGo)",
                other: true
            }, {
                regex: "Symbian [Oo][Ss]",
                os_replacement: "Symbian OS"
            }, {
                regex: "(BB10);.+Version/(\\d+).(\\d+).(\\d+)",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            }, {
                regex: "(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)",
                os_replacement: "BlackBerry Tablet OS",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Play[Bb]ook)",
                os_replacement: "BlackBerry Tablet OS",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry)",
                os_replacement: "Blackberry OS",
                manufacturer: "RIM"
            }, {
                regex: "(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "webOS"
            }, {
                regex: "(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            }, {
                regex: "(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)"
            }, {
                regex: "(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)"
            }, {
                regex: "(Linux|BSD)",
                other: true
            } ],
            mobile_os_families: [ "Windows Phone 6.5", "Windows CE", "Symbian OS" ],
            device_parsers: [ {
                regex: "HTC ([A-Z][a-z0-9]+) Build",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Z][a-z0-9 ]+) \\d+\\.\\d+\\.\\d+\\.\\d+",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC_Touch_([A-Za-z0-9]+)",
                device_replacement: "HTC Touch ($1)",
                manufacturer: "HTC"
            }, {
                regex: "USCCHTC(\\d+)",
                device_replacement: "HTC $1 (US Cellular)",
                manufacturer: "HTC"
            }, {
                regex: "Sprint APA(9292)",
                device_replacement: "HTC $1 (Sprint)",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Za-z0-9]+ [A-Z])",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC-([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC_([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "HTC ([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "(ADR[A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            }, {
                regex: "(HTC)",
                manufacturer: "HTC"
            }, {
                regex: "SonyEricsson([A-Za-z0-9]+)/",
                device_replacement: "Ericsson $1",
                other: true,
                manufacturer: "Sony"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; WOWMobile (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\-update1\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            }, {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; (.+) Build"
            }, {
                regex: "NokiaN([0-9]+)",
                device_replacement: "Nokia N$1",
                manufacturer: "Nokia"
            }, {
                regex: "Nokia([A-Za-z0-9\\v-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "NOKIA ([A-Za-z0-9\\-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Nokia ([A-Za-z0-9\\-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Lumia ([A-Za-z0-9\\-]+)",
                device_replacement: "Lumia $1",
                manufacturer: "Nokia"
            }, {
                regex: "Symbian",
                device_replacement: "Nokia",
                manufacturer: "Nokia"
            }, {
                regex: "BB10; ([A-Za-z0-9- ]+)\\)",
                device_replacement: "BlackBerry $1",
                manufacturer: "RIM"
            }, {
                regex: "(PlayBook).+RIM Tablet OS",
                device_replacement: "Blackberry Playbook",
                tablet: true,
                manufacturer: "RIM"
            }, {
                regex: "(Black[Bb]erry [0-9]+);",
                manufacturer: "RIM"
            }, {
                regex: "Black[Bb]erry([0-9]+)",
                device_replacement: "BlackBerry $1",
                manufacturer: "RIM"
            }, {
                regex: "(Pre)/(\\d+)\\.(\\d+)",
                device_replacement: "Palm Pre",
                manufacturer: "Palm"
            }, {
                regex: "(Pixi)/(\\d+)\\.(\\d+)",
                device_replacement: "Palm Pixi",
                manufacturer: "Palm"
            }, {
                regex: "(Touchpad)/(\\d+)\\.(\\d+)",
                device_replacement: "HP Touchpad",
                manufacturer: "HP"
            }, {
                regex: "HPiPAQ([A-Za-z0-9]+)/(\\d+).(\\d+)",
                device_replacement: "HP iPAQ $1",
                manufacturer: "HP"
            }, {
                regex: "Palm([A-Za-z0-9]+)",
                device_replacement: "Palm $1",
                manufacturer: "Palm"
            }, {
                regex: "Treo([A-Za-z0-9]+)",
                device_replacement: "Palm Treo $1",
                manufacturer: "Palm"
            }, {
                regex: "webOS.*(P160UNA)/(\\d+).(\\d+)",
                device_replacement: "HP Veer",
                manufacturer: "HP"
            }, {
                regex: "(Kindle Fire)",
                manufacturer: "Amazon"
            }, {
                regex: "(Kindle)",
                manufacturer: "Amazon"
            }, {
                regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                device_replacement: "Kindle Fire",
                tablet: true,
                manufacturer: "Amazon"
            }, {
                regex: "(iPad) Simulator;",
                manufacturer: "Apple"
            }, {
                regex: "(iPad);",
                manufacturer: "Apple"
            }, {
                regex: "(iPod);",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone) Simulator;",
                manufacturer: "Apple"
            }, {
                regex: "(iPhone);",
                manufacturer: "Apple"
            }, {
                regex: "Nexus\\ ([A-Za-z0-9\\-]+)",
                device_replacement: "Nexus $1"
            }, {
                regex: "acer_([A-Za-z0-9]+)_",
                device_replacement: "Acer $1",
                manufacturer: "Acer"
            }, {
                regex: "acer_([A-Za-z0-9]+)_",
                device_replacement: "Acer $1",
                manufacturer: "Acer"
            }, {
                regex: "Amoi\\-([A-Za-z0-9]+)",
                device_replacement: "Amoi $1",
                other: true,
                manufacturer: "Amoi"
            }, {
                regex: "AMOI\\-([A-Za-z0-9]+)",
                device_replacement: "Amoi $1",
                other: true,
                manufacturer: "Amoi"
            }, {
                regex: "Asus\\-([A-Za-z0-9]+)",
                device_replacement: "Asus $1",
                manufacturer: "Asus"
            }, {
                regex: "ASUS\\-([A-Za-z0-9]+)",
                device_replacement: "Asus $1",
                manufacturer: "Asus"
            }, {
                regex: "BIRD\\-([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "BIRD\\.([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "BIRD ([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            }, {
                regex: "Dell ([A-Za-z0-9]+)",
                device_replacement: "Dell $1",
                manufacturer: "Dell"
            }, {
                regex: "DoCoMo/2\\.0 ([A-Za-z0-9]+)",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "([A-Za-z0-9]+)\\_W\\;FOMA",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "([A-Za-z0-9]+)\\;FOMA",
                device_replacement: "DoCoMo $1",
                other: true
            }, {
                regex: "vodafone([A-Za-z0-9]+)",
                device_replacement: "Huawei Vodafone $1",
                other: true
            }, {
                regex: "i\\-mate ([A-Za-z0-9]+)",
                device_replacement: "i-mate $1",
                other: true
            }, {
                regex: "Kyocera\\-([A-Za-z0-9]+)",
                device_replacement: "Kyocera $1",
                other: true
            }, {
                regex: "KWC\\-([A-Za-z0-9]+)",
                device_replacement: "Kyocera $1",
                other: true
            }, {
                regex: "Lenovo\\-([A-Za-z0-9]+)",
                device_replacement: "Lenovo $1",
                manufacturer: "Lenovo"
            }, {
                regex: "Lenovo\\_([A-Za-z0-9]+)",
                device_replacement: "Lenovo $1",
                manufacturer: "Levovo"
            }, {
                regex: "LG/([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG-LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE-LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE VX([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG ([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE LG\\-AX([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG\\-([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LGE\\-([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            }, {
                regex: "(KIN)\\.One (\\d+)\\.(\\d+)",
                device_replacement: "Microsoft $1"
            }, {
                regex: "(KIN)\\.Two (\\d+)\\.(\\d+)",
                device_replacement: "Microsoft $1"
            }, {
                regex: "(Motorola)\\-([A-Za-z0-9]+)",
                manufacturer: "Motorola"
            }, {
                regex: "MOTO\\-([A-Za-z0-9]+)",
                device_replacement: "Motorola $1",
                manufacturer: "Motorola"
            }, {
                regex: "MOT\\-([A-Za-z0-9]+)",
                device_replacement: "Motorola $1",
                manufacturer: "Motorola"
            }, {
                regex: "Philips([A-Za-z0-9]+)",
                device_replacement: "Philips $1",
                manufacturer: "Philips"
            }, {
                regex: "Philips ([A-Za-z0-9]+)",
                device_replacement: "Philips $1",
                manufacturer: "Philips"
            }, {
                regex: "SAMSUNG-([A-Za-z0-9\\-]+)",
                device_replacement: "Samsung $1",
                manufacturer: "Samsung"
            }, {
                regex: "SAMSUNG\\; ([A-Za-z0-9\\-]+)",
                device_replacement: "Samsung $1",
                manufacturer: "Samsung"
            }, {
                regex: "Softbank/1\\.0/([A-Za-z0-9]+)",
                device_replacement: "Softbank $1",
                other: true
            }, {
                regex: "Softbank/2\\.0/([A-Za-z0-9]+)",
                device_replacement: "Softbank $1",
                other: true
            }, {
                regex: "(hiptop|avantgo|plucker|xiino|blazer|elaine|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|mobile|pda)",
                device_replacement: "Generic Smartphone"
            }, {
                regex: "^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|craw|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|el49|erk0|esl8|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly\\_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(htcp|htcs|htct|htc\\_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|java|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|lynx|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda\\_)",
                device_replacement: "Generic Feature Phone"
            }, {
                regex: "(bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\\-webcrawler|converacrawler|dataparksearch|findlinks)",
                device_replacement: "Spider"
            } ],
            mobile_browser_families: [ "Firefox Mobile", "Opera Mobile", "Opera Mini", "Mobile Safari", "webOS", "IE Mobile", "Playstation Portable", "Nokia", "Blackberry", "Palm", "Silk", "Android", "Maemo", "Obigo", "Netfront", "AvantGo", "Teleca", "SEMC-Browser", "Bolt", "Iris", "UP.Browser", "Symphony", "Minimo", "Bunjaloo", "Jasmine", "Dolfin", "Polaris", "BREW", "Chrome Mobile", "Chrome Mobile iOS", "UC Browser", "Tizen Browser" ]
        };
        _this.parsers = [ "device_parsers", "browser_parsers", "os_parsers", "mobile_os_families", "mobile_browser_families" ];
        _this.types = [ "browser", "os", "device" ];
        _this.regexes = regexes || function() {
            var results = {};
            _this.parsers.map(function(parser) {
                results[parser] = [];
            });
            return results;
        }();
        _this.families = function() {
            var results = {};
            _this.types.map(function(type) {
                results[type] = [];
            });
            return results;
        }();
        var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, nativeForEach = ArrayProto.forEach, nativeIndexOf = ArrayProto.indexOf;
        var find = function(ua, obj) {
            var ret = {};
            for (var i = 0; i < obj.length; i++) {
                ret = obj[i](ua);
                if (ret) {
                    break;
                }
            }
            return ret;
        };
        var remove = function(arr, props) {
            each(arr, function(obj) {
                each(props, function(prop) {
                    delete obj[prop];
                });
            });
        };
        var contains = function(obj, target) {
            var found = false;
            if (obj == null) return found;
            if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
            found = any(obj, function(value) {
                return value === target;
            });
            return found;
        };
        var each = forEach = function(obj, iterator, context) {
            if (obj == null) return;
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === {}) return;
                }
            } else {
                for (var key in obj) {
                    if (_.has(obj, key)) {
                        if (iterator.call(context, obj[key], key, obj) === {}) return;
                    }
                }
            }
        };
        var extend = function(obj) {
            each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            });
            return obj;
        };
        var check = function(str) {
            return !!(str && typeof str != "undefined" && str != null);
        };
        var toVersionString = function(obj) {
            var output = "";
            obj = obj || {};
            if (check(obj)) {
                if (check(obj.major)) {
                    output += obj.major;
                    if (check(obj.minor)) {
                        output += "." + obj.minor;
                        if (check(obj.patch)) {
                            output += "." + obj.patch;
                        }
                    }
                }
            }
            return output;
        };
        var toString = function(obj) {
            obj = obj || {};
            var suffix = toVersionString(obj);
            if (suffix) suffix = " " + suffix;
            return obj && check(obj.family) ? obj.family + suffix : "";
        };
        _this.parse = function(ua) {
            var parsers = function(type) {
                return _this.regexes[type + "_parsers"].map(function(obj) {
                    var regexp = new RegExp(obj.regex), rep = obj[(type === "browser" ? "family" : type) + "_replacement"], major_rep = obj.major_version_replacement;
                    function parser(ua) {
                        var m = ua.match(regexp);
                        if (!m) return null;
                        var ret = {};
                        ret.family = (rep ? rep.replace("$1", m[1]) : m[1]) || "other";
                        ret.major = parseInt(major_rep ? major_rep : m[2]) || null;
                        ret.minor = m[3] ? parseInt(m[3]) : null;
                        ret.patch = m[4] ? parseInt(m[4]) : null;
                        ret.tablet = obj.tablet;
                        ret.man = obj.manufacturer || null;
                        return ret;
                    }
                    return parser;
                });
            };
            var UserAgent = function() {};
            var browser_parsers = parsers("browser");
            var os_parsers = parsers("os");
            var device_parsers = parsers("device");
            var agent = a = new UserAgent();
            a.browser = find(ua, browser_parsers);
            if (check(a.browser)) {
                a.browser.name = toString(a.browser);
                a.browser.version = toVersionString(a.browser);
            } else {
                a.browser = {};
            }
            a.os = find(ua, os_parsers);
            if (check(a.os)) {
                a.os.name = toString(a.os);
                a.os.version = toVersionString(a.os);
            } else {
                a.os = {};
            }
            a.device = find(ua, device_parsers);
            if (check(a.device)) {
                a.device.name = toString(a.device);
                a.device.version = toVersionString(a.device);
            } else {
                a.device = {
                    tablet: false
                };
            }
            var mobile_agents = {};
            var mobile_browser_families = _this.regexes.mobile_browser_families.map(function(str) {
                mobile_agents[str] = true;
            });
            var mobile_os_families = _this.regexes.mobile_os_families.map(function(str) {
                mobile_agents[str] = true;
            });
            if (a.browser.family === "Spider") {
                a.device.type = "Spider";
            } else if (a.browser.tablet || a.os.tablet || a.device.tablet) {
                a.device.type = "Tablet";
            } else if (mobile_agents.hasOwnProperty(a.browser.family)) {
                a.device.type = "Mobile";
            } else {
                a.device.type = "Desktop";
            }
            a.device.manufacturer = a.browser.man || a.os.man || a.device.man || null;
            remove([ a.browser, a.os, a.device ], [ "tablet", "man" ]);
            return a;
        };
        return _this;
    }();
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = detect;
        }
        exports.detect = detect;
    } else {
        root["detect"] = detect;
    }
    if (typeof define === "function" && define.amd) {
        define(function(require) {
            return detect;
        });
    }
})(window);

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = factory();
    } else {
        root.Salsa20 = factory();
    }
})(this, function() {
    function Salsa20(key, nonce) {
        this.rounds = 20;
        this.sigmaWords = [ 1634760805, 857760878, 2036477234, 1797285236 ];
        this.keyWords = [];
        this.nonceWords = [ 0, 0 ];
        this.counterWords = [ 0, 0 ];
        this.block = [];
        this.blockUsed = 64;
        this.setKey(key);
        this.setNonce(nonce);
    }
    Salsa20.prototype.setKey = function(key) {
        for (var i = 0, j = 0; i < 8; i++, j += 4) {
            this.keyWords[i] = key[j] & 255 | (key[j + 1] & 255) << 8 | (key[j + 2] & 255) << 16 | (key[j + 3] & 255) << 24;
        }
        this._reset();
    };
    Salsa20.prototype.setNonce = function(nonce) {
        this.nonceWords[0] = nonce[0] & 255 | (nonce[1] & 255) << 8 | (nonce[2] & 255) << 16 | (nonce[3] & 255) << 24;
        this.nonceWords[1] = nonce[4] & 255 | (nonce[5] & 255) << 8 | (nonce[6] & 255) << 16 | (nonce[7] & 255) << 24;
        this._reset();
    };
    Salsa20.prototype.getBytes = function(numberOfBytes) {
        var out = new Array(numberOfBytes);
        for (var i = 0; i < numberOfBytes; i++) {
            if (this.blockUsed == 64) {
                this._generateBlock();
                this._incrementCounter();
                this.blockUsed = 0;
            }
            out[i] = this.block[this.blockUsed];
            this.blockUsed++;
        }
        return out;
    };
    Salsa20.prototype.getHexString = function(numberOfBytes) {
        var hex = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
        var out = [];
        var bytes = this.getBytes(numberOfBytes);
        for (var i = 0; i < bytes.length; i++) {
            out.push(hex[bytes[i] >> 4 & 15]);
            out.push(hex[bytes[i] & 15]);
        }
        return out.join("");
    };
    Salsa20.prototype._reset = function() {
        this.counterWords[0] = 0;
        this.counterWords[1] = 0;
        this.blockUsed = 64;
    };
    Salsa20.prototype._incrementCounter = function() {
        this.counterWords[0] = this.counterWords[0] + 1 & 4294967295;
        if (this.counterWords[0] == 0) {
            this.counterWords[1] = this.counterWords[1] + 1 & 4294967295;
        }
    };
    Salsa20.prototype._generateBlock = function() {
        var j0 = this.sigmaWords[0], j1 = this.keyWords[0], j2 = this.keyWords[1], j3 = this.keyWords[2], j4 = this.keyWords[3], j5 = this.sigmaWords[1], j6 = this.nonceWords[0], j7 = this.nonceWords[1], j8 = this.counterWords[0], j9 = this.counterWords[1], j10 = this.sigmaWords[2], j11 = this.keyWords[4], j12 = this.keyWords[5], j13 = this.keyWords[6], j14 = this.keyWords[7], j15 = this.sigmaWords[3];
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15;
        var u;
        for (var i = 0; i < this.rounds; i += 2) {
            u = x0 + x12;
            x4 ^= u << 7 | u >>> 32 - 7;
            u = x4 + x0;
            x8 ^= u << 9 | u >>> 32 - 9;
            u = x8 + x4;
            x12 ^= u << 13 | u >>> 32 - 13;
            u = x12 + x8;
            x0 ^= u << 18 | u >>> 32 - 18;
            u = x5 + x1;
            x9 ^= u << 7 | u >>> 32 - 7;
            u = x9 + x5;
            x13 ^= u << 9 | u >>> 32 - 9;
            u = x13 + x9;
            x1 ^= u << 13 | u >>> 32 - 13;
            u = x1 + x13;
            x5 ^= u << 18 | u >>> 32 - 18;
            u = x10 + x6;
            x14 ^= u << 7 | u >>> 32 - 7;
            u = x14 + x10;
            x2 ^= u << 9 | u >>> 32 - 9;
            u = x2 + x14;
            x6 ^= u << 13 | u >>> 32 - 13;
            u = x6 + x2;
            x10 ^= u << 18 | u >>> 32 - 18;
            u = x15 + x11;
            x3 ^= u << 7 | u >>> 32 - 7;
            u = x3 + x15;
            x7 ^= u << 9 | u >>> 32 - 9;
            u = x7 + x3;
            x11 ^= u << 13 | u >>> 32 - 13;
            u = x11 + x7;
            x15 ^= u << 18 | u >>> 32 - 18;
            u = x0 + x3;
            x1 ^= u << 7 | u >>> 32 - 7;
            u = x1 + x0;
            x2 ^= u << 9 | u >>> 32 - 9;
            u = x2 + x1;
            x3 ^= u << 13 | u >>> 32 - 13;
            u = x3 + x2;
            x0 ^= u << 18 | u >>> 32 - 18;
            u = x5 + x4;
            x6 ^= u << 7 | u >>> 32 - 7;
            u = x6 + x5;
            x7 ^= u << 9 | u >>> 32 - 9;
            u = x7 + x6;
            x4 ^= u << 13 | u >>> 32 - 13;
            u = x4 + x7;
            x5 ^= u << 18 | u >>> 32 - 18;
            u = x10 + x9;
            x11 ^= u << 7 | u >>> 32 - 7;
            u = x11 + x10;
            x8 ^= u << 9 | u >>> 32 - 9;
            u = x8 + x11;
            x9 ^= u << 13 | u >>> 32 - 13;
            u = x9 + x8;
            x10 ^= u << 18 | u >>> 32 - 18;
            u = x15 + x14;
            x12 ^= u << 7 | u >>> 32 - 7;
            u = x12 + x15;
            x13 ^= u << 9 | u >>> 32 - 9;
            u = x13 + x12;
            x14 ^= u << 13 | u >>> 32 - 13;
            u = x14 + x13;
            x15 ^= u << 18 | u >>> 32 - 18;
        }
        x0 += j0;
        x1 += j1;
        x2 += j2;
        x3 += j3;
        x4 += j4;
        x5 += j5;
        x6 += j6;
        x7 += j7;
        x8 += j8;
        x9 += j9;
        x10 += j10;
        x11 += j11;
        x12 += j12;
        x13 += j13;
        x14 += j14;
        x15 += j15;
        this.block[0] = x0 >>> 0 & 255;
        this.block[1] = x0 >>> 8 & 255;
        this.block[2] = x0 >>> 16 & 255;
        this.block[3] = x0 >>> 24 & 255;
        this.block[4] = x1 >>> 0 & 255;
        this.block[5] = x1 >>> 8 & 255;
        this.block[6] = x1 >>> 16 & 255;
        this.block[7] = x1 >>> 24 & 255;
        this.block[8] = x2 >>> 0 & 255;
        this.block[9] = x2 >>> 8 & 255;
        this.block[10] = x2 >>> 16 & 255;
        this.block[11] = x2 >>> 24 & 255;
        this.block[12] = x3 >>> 0 & 255;
        this.block[13] = x3 >>> 8 & 255;
        this.block[14] = x3 >>> 16 & 255;
        this.block[15] = x3 >>> 24 & 255;
        this.block[16] = x4 >>> 0 & 255;
        this.block[17] = x4 >>> 8 & 255;
        this.block[18] = x4 >>> 16 & 255;
        this.block[19] = x4 >>> 24 & 255;
        this.block[20] = x5 >>> 0 & 255;
        this.block[21] = x5 >>> 8 & 255;
        this.block[22] = x5 >>> 16 & 255;
        this.block[23] = x5 >>> 24 & 255;
        this.block[24] = x6 >>> 0 & 255;
        this.block[25] = x6 >>> 8 & 255;
        this.block[26] = x6 >>> 16 & 255;
        this.block[27] = x6 >>> 24 & 255;
        this.block[28] = x7 >>> 0 & 255;
        this.block[29] = x7 >>> 8 & 255;
        this.block[30] = x7 >>> 16 & 255;
        this.block[31] = x7 >>> 24 & 255;
        this.block[32] = x8 >>> 0 & 255;
        this.block[33] = x8 >>> 8 & 255;
        this.block[34] = x8 >>> 16 & 255;
        this.block[35] = x8 >>> 24 & 255;
        this.block[36] = x9 >>> 0 & 255;
        this.block[37] = x9 >>> 8 & 255;
        this.block[38] = x9 >>> 16 & 255;
        this.block[39] = x9 >>> 24 & 255;
        this.block[40] = x10 >>> 0 & 255;
        this.block[41] = x10 >>> 8 & 255;
        this.block[42] = x10 >>> 16 & 255;
        this.block[43] = x10 >>> 24 & 255;
        this.block[44] = x11 >>> 0 & 255;
        this.block[45] = x11 >>> 8 & 255;
        this.block[46] = x11 >>> 16 & 255;
        this.block[47] = x11 >>> 24 & 255;
        this.block[48] = x12 >>> 0 & 255;
        this.block[49] = x12 >>> 8 & 255;
        this.block[50] = x12 >>> 16 & 255;
        this.block[51] = x12 >>> 24 & 255;
        this.block[52] = x13 >>> 0 & 255;
        this.block[53] = x13 >>> 8 & 255;
        this.block[54] = x13 >>> 16 & 255;
        this.block[55] = x13 >>> 24 & 255;
        this.block[56] = x14 >>> 0 & 255;
        this.block[57] = x14 >>> 8 & 255;
        this.block[58] = x14 >>> 16 & 255;
        this.block[59] = x14 >>> 24 & 255;
        this.block[60] = x15 >>> 0 & 255;
        this.block[61] = x15 >>> 8 & 255;
        this.block[62] = x15 >>> 16 & 255;
        this.block[63] = x15 >>> 24 & 255;
    };
    return Salsa20;
});

(function(root, factory) {
    var Salsa20, crypto;
    if (typeof define === "function" && define.amd) {
        define([ "salsa20" ], factory.bind(root, root.crypto));
    } else if (typeof module !== "undefined" && module.exports) {
        Salsa20 = require("./salsa20.js");
        crypto = require("crypto");
        module.exports = factory(crypto, Salsa20);
    } else {
        root.BigInt = factory(root.crypto, root.Salsa20);
    }
})(this, function(crypto, Salsa20) {
    var bpe = 0;
    var mask = 0;
    var radix = mask + 1;
    var digitsStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-";
    for (bpe = 0; 1 << bpe + 1 > 1 << bpe; bpe++) ;
    bpe >>= 1;
    mask = (1 << bpe) - 1;
    radix = mask + 1;
    var one = int2bigInt(1, 1, 1);
    var t = new Array(0);
    var ss = t;
    var s0 = t;
    var s1 = t;
    var s2 = t;
    var s3 = t;
    var s4 = t, s5 = t;
    var s6 = t;
    var s7 = t;
    var T = t;
    var sa = t;
    var mr_x1 = t, mr_r = t, mr_a = t;
    var eg_v = t, eg_u = t, eg_A = t, eg_B = t, eg_C = t, eg_D = t;
    var md_q1 = t, md_q2 = t, md_q3 = t, md_r = t, md_r1 = t, md_r2 = t, md_tt = t;
    var primes = t, pows = t, s_i = t, s_i2 = t, s_R = t, s_rm = t, s_q = t, s_n1 = t;
    var s_a = t, s_r2 = t, s_n = t, s_b = t, s_d = t, s_x1 = t, s_x2 = t, s_aa = t;
    var rpprb = t;
    function findPrimes(n) {
        var i, s, p, ans;
        s = new Array(n);
        for (i = 0; i < n; i++) s[i] = 0;
        s[0] = 2;
        p = 0;
        for (;s[p] < n; ) {
            for (i = s[p] * s[p]; i < n; i += s[p]) s[i] = 1;
            p++;
            s[p] = s[p - 1] + 1;
            for (;s[p] < n && s[s[p]]; s[p]++) ;
        }
        ans = new Array(p);
        for (i = 0; i < p; i++) ans[i] = s[i];
        return ans;
    }
    function millerRabinInt(x, b) {
        if (mr_x1.length != x.length) {
            mr_x1 = dup(x);
            mr_r = dup(x);
            mr_a = dup(x);
        }
        copyInt_(mr_a, b);
        return millerRabin(x, mr_a);
    }
    function millerRabin(x, b) {
        var i, j, k, s;
        if (mr_x1.length != x.length) {
            mr_x1 = dup(x);
            mr_r = dup(x);
            mr_a = dup(x);
        }
        copy_(mr_a, b);
        copy_(mr_r, x);
        copy_(mr_x1, x);
        addInt_(mr_r, -1);
        addInt_(mr_x1, -1);
        if (isZero(mr_r)) return 0;
        for (k = 0; mr_r[k] == 0; k++) ;
        for (i = 1, j = 2; mr_r[k] % j == 0; j *= 2, i++) ;
        s = k * bpe + i - 1;
        if (s) rightShift_(mr_r, s);
        powMod_(mr_a, mr_r, x);
        if (!equalsInt(mr_a, 1) && !equals(mr_a, mr_x1)) {
            j = 1;
            while (j <= s - 1 && !equals(mr_a, mr_x1)) {
                squareMod_(mr_a, x);
                if (equalsInt(mr_a, 1)) {
                    return 0;
                }
                j++;
            }
            if (!equals(mr_a, mr_x1)) {
                return 0;
            }
        }
        return 1;
    }
    function bitSize(x) {
        var j, z, w;
        for (j = x.length - 1; x[j] == 0 && j > 0; j--) ;
        for (z = 0, w = x[j]; w; w >>= 1, z++) ;
        z += bpe * j;
        return z;
    }
    function expand(x, n) {
        var ans = int2bigInt(0, (x.length > n ? x.length : n) * bpe, 0);
        copy_(ans, x);
        return ans;
    }
    function randTruePrime(k) {
        var ans = int2bigInt(0, k, 0);
        randTruePrime_(ans, k);
        return trim(ans, 1);
    }
    function randProbPrime(k) {
        if (k >= 600) return randProbPrimeRounds(k, 2);
        if (k >= 550) return randProbPrimeRounds(k, 4);
        if (k >= 500) return randProbPrimeRounds(k, 5);
        if (k >= 400) return randProbPrimeRounds(k, 6);
        if (k >= 350) return randProbPrimeRounds(k, 7);
        if (k >= 300) return randProbPrimeRounds(k, 9);
        if (k >= 250) return randProbPrimeRounds(k, 12);
        if (k >= 200) return randProbPrimeRounds(k, 15);
        if (k >= 150) return randProbPrimeRounds(k, 18);
        if (k >= 100) return randProbPrimeRounds(k, 27);
        return randProbPrimeRounds(k, 40);
    }
    function randProbPrimeRounds(k, n) {
        var ans, i, divisible, B;
        B = 3e4;
        ans = int2bigInt(0, k, 0);
        if (primes.length == 0) primes = findPrimes(3e4);
        if (rpprb.length != ans.length) rpprb = dup(ans);
        for (;;) {
            randBigInt_(ans, k, 0);
            ans[0] |= 1;
            divisible = 0;
            for (i = 0; i < primes.length && primes[i] <= B; i++) if (modInt(ans, primes[i]) == 0 && !equalsInt(ans, primes[i])) {
                divisible = 1;
                break;
            }
            for (i = 0; i < n && !divisible; i++) {
                randBigInt_(rpprb, k, 0);
                while (!greater(ans, rpprb)) randBigInt_(rpprb, k, 0);
                if (!millerRabin(ans, rpprb)) divisible = 1;
            }
            if (!divisible) return ans;
        }
    }
    function mod(x, n) {
        var ans = dup(x);
        mod_(ans, n);
        return trim(ans, 1);
    }
    function addInt(x, n) {
        var ans = expand(x, x.length + 1);
        addInt_(ans, n);
        return trim(ans, 1);
    }
    function mult(x, y) {
        var ans = expand(x, x.length + y.length);
        mult_(ans, y);
        return trim(ans, 1);
    }
    function powMod(x, y, n) {
        var ans = expand(x, n.length);
        powMod_(ans, trim(y, 2), trim(n, 2), 0);
        return trim(ans, 1);
    }
    function sub(x, y) {
        var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);
        sub_(ans, y);
        return trim(ans, 1);
    }
    function add(x, y) {
        var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);
        add_(ans, y);
        return trim(ans, 1);
    }
    function inverseMod(x, n) {
        var ans = expand(x, n.length);
        var s;
        s = inverseMod_(ans, n);
        return s ? trim(ans, 1) : null;
    }
    function multMod(x, y, n) {
        var ans = expand(x, n.length);
        multMod_(ans, y, n);
        return trim(ans, 1);
    }
    function randTruePrime_(ans, k) {
        var c, w, m, pm, dd, j, r, B, divisible, z, zz, recSize, recLimit;
        if (primes.length == 0) primes = findPrimes(3e4);
        if (pows.length == 0) {
            pows = new Array(512);
            for (j = 0; j < 512; j++) {
                pows[j] = Math.pow(2, j / 511 - 1);
            }
        }
        c = .1;
        m = 20;
        recLimit = 20;
        if (s_i2.length != ans.length) {
            s_i2 = dup(ans);
            s_R = dup(ans);
            s_n1 = dup(ans);
            s_r2 = dup(ans);
            s_d = dup(ans);
            s_x1 = dup(ans);
            s_x2 = dup(ans);
            s_b = dup(ans);
            s_n = dup(ans);
            s_i = dup(ans);
            s_rm = dup(ans);
            s_q = dup(ans);
            s_a = dup(ans);
            s_aa = dup(ans);
        }
        if (k <= recLimit) {
            pm = (1 << (k + 2 >> 1)) - 1;
            copyInt_(ans, 0);
            for (dd = 1; dd; ) {
                dd = 0;
                ans[0] = 1 | 1 << k - 1 | randomBitInt(k);
                for (j = 1; j < primes.length && (primes[j] & pm) == primes[j]; j++) {
                    if (0 == ans[0] % primes[j]) {
                        dd = 1;
                        break;
                    }
                }
            }
            carry_(ans);
            return;
        }
        B = c * k * k;
        if (k > 2 * m) for (r = 1; k - k * r <= m; ) r = pows[randomBitInt(9)]; else r = .5;
        recSize = Math.floor(r * k) + 1;
        randTruePrime_(s_q, recSize);
        copyInt_(s_i2, 0);
        s_i2[Math.floor((k - 2) / bpe)] |= 1 << (k - 2) % bpe;
        divide_(s_i2, s_q, s_i, s_rm);
        z = bitSize(s_i);
        for (;;) {
            for (;;) {
                randBigInt_(s_R, z, 0);
                if (greater(s_i, s_R)) break;
            }
            addInt_(s_R, 1);
            add_(s_R, s_i);
            copy_(s_n, s_q);
            mult_(s_n, s_R);
            multInt_(s_n, 2);
            addInt_(s_n, 1);
            copy_(s_r2, s_R);
            multInt_(s_r2, 2);
            for (divisible = 0, j = 0; j < primes.length && primes[j] < B; j++) if (modInt(s_n, primes[j]) == 0 && !equalsInt(s_n, primes[j])) {
                divisible = 1;
                break;
            }
            if (!divisible) if (!millerRabinInt(s_n, 2)) divisible = 1;
            if (!divisible) {
                addInt_(s_n, -3);
                for (j = s_n.length - 1; s_n[j] == 0 && j > 0; j--) ;
                for (zz = 0, w = s_n[j]; w; w >>= 1, zz++) ;
                zz += bpe * j;
                for (;;) {
                    randBigInt_(s_a, zz, 0);
                    if (greater(s_n, s_a)) break;
                }
                addInt_(s_n, 3);
                addInt_(s_a, 2);
                copy_(s_b, s_a);
                copy_(s_n1, s_n);
                addInt_(s_n1, -1);
                powMod_(s_b, s_n1, s_n);
                addInt_(s_b, -1);
                if (isZero(s_b)) {
                    copy_(s_b, s_a);
                    powMod_(s_b, s_r2, s_n);
                    addInt_(s_b, -1);
                    copy_(s_aa, s_n);
                    copy_(s_d, s_b);
                    GCD_(s_d, s_n);
                    if (equalsInt(s_d, 1)) {
                        copy_(ans, s_aa);
                        return;
                    }
                }
            }
        }
    }
    function randBigInt(n, s) {
        var a, b;
        a = Math.floor((n - 1) / bpe) + 2;
        b = int2bigInt(0, 0, a);
        randBigInt_(b, n, s);
        return b;
    }
    function randBigInt_(b, n, s) {
        var i, a;
        for (i = 0; i < b.length; i++) b[i] = 0;
        a = Math.floor((n - 1) / bpe) + 1;
        for (i = 0; i < a; i++) {
            b[i] = randomBitInt(bpe);
        }
        b[a - 1] &= (2 << (n - 1) % bpe) - 1;
        if (s == 1) b[a - 1] |= 1 << (n - 1) % bpe;
    }
    function GCD(x, y) {
        var xc, yc;
        xc = dup(x);
        yc = dup(y);
        GCD_(xc, yc);
        return xc;
    }
    function GCD_(x, y) {
        var i, xp, yp, A, B, C, D, q, sing, qp;
        if (T.length != x.length) T = dup(x);
        sing = 1;
        while (sing) {
            sing = 0;
            for (i = 1; i < y.length; i++) if (y[i]) {
                sing = 1;
                break;
            }
            if (!sing) break;
            for (i = x.length; !x[i] && i >= 0; i--) ;
            xp = x[i];
            yp = y[i];
            A = 1;
            B = 0;
            C = 0;
            D = 1;
            while (yp + C && yp + D) {
                q = Math.floor((xp + A) / (yp + C));
                qp = Math.floor((xp + B) / (yp + D));
                if (q != qp) break;
                t = A - q * C;
                A = C;
                C = t;
                t = B - q * D;
                B = D;
                D = t;
                t = xp - q * yp;
                xp = yp;
                yp = t;
            }
            if (B) {
                copy_(T, x);
                linComb_(x, y, A, B);
                linComb_(y, T, D, C);
            } else {
                mod_(x, y);
                copy_(T, x);
                copy_(x, y);
                copy_(y, T);
            }
        }
        if (y[0] == 0) return;
        t = modInt(x, y[0]);
        copyInt_(x, y[0]);
        y[0] = t;
        while (y[0]) {
            x[0] %= y[0];
            t = x[0];
            x[0] = y[0];
            y[0] = t;
        }
    }
    function inverseMod_(x, n) {
        var k = 1 + 2 * Math.max(x.length, n.length);
        if (!(x[0] & 1) && !(n[0] & 1)) {
            copyInt_(x, 0);
            return 0;
        }
        if (eg_u.length != k) {
            eg_u = new Array(k);
            eg_v = new Array(k);
            eg_A = new Array(k);
            eg_B = new Array(k);
            eg_C = new Array(k);
            eg_D = new Array(k);
        }
        copy_(eg_u, x);
        copy_(eg_v, n);
        copyInt_(eg_A, 1);
        copyInt_(eg_B, 0);
        copyInt_(eg_C, 0);
        copyInt_(eg_D, 1);
        for (;;) {
            while (!(eg_u[0] & 1)) {
                halve_(eg_u);
                if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {
                    halve_(eg_A);
                    halve_(eg_B);
                } else {
                    add_(eg_A, n);
                    halve_(eg_A);
                    sub_(eg_B, x);
                    halve_(eg_B);
                }
            }
            while (!(eg_v[0] & 1)) {
                halve_(eg_v);
                if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {
                    halve_(eg_C);
                    halve_(eg_D);
                } else {
                    add_(eg_C, n);
                    halve_(eg_C);
                    sub_(eg_D, x);
                    halve_(eg_D);
                }
            }
            if (!greater(eg_v, eg_u)) {
                sub_(eg_u, eg_v);
                sub_(eg_A, eg_C);
                sub_(eg_B, eg_D);
            } else {
                sub_(eg_v, eg_u);
                sub_(eg_C, eg_A);
                sub_(eg_D, eg_B);
            }
            if (equalsInt(eg_u, 0)) {
                while (negative(eg_C)) add_(eg_C, n);
                copy_(x, eg_C);
                if (!equalsInt(eg_v, 1)) {
                    copyInt_(x, 0);
                    return 0;
                }
                return 1;
            }
        }
    }
    function inverseModInt(x, n) {
        var a = 1, b = 0, t;
        for (;;) {
            if (x == 1) return a;
            if (x == 0) return 0;
            b -= a * Math.floor(n / x);
            n %= x;
            if (n == 1) return b;
            if (n == 0) return 0;
            a -= b * Math.floor(x / n);
            x %= n;
        }
    }
    function inverseModInt_(x, n) {
        return inverseModInt(x, n);
    }
    function eGCD_(x, y, v, a, b) {
        var g = 0;
        var k = Math.max(x.length, y.length);
        if (eg_u.length != k) {
            eg_u = new Array(k);
            eg_A = new Array(k);
            eg_B = new Array(k);
            eg_C = new Array(k);
            eg_D = new Array(k);
        }
        while (!(x[0] & 1) && !(y[0] & 1)) {
            halve_(x);
            halve_(y);
            g++;
        }
        copy_(eg_u, x);
        copy_(v, y);
        copyInt_(eg_A, 1);
        copyInt_(eg_B, 0);
        copyInt_(eg_C, 0);
        copyInt_(eg_D, 1);
        for (;;) {
            while (!(eg_u[0] & 1)) {
                halve_(eg_u);
                if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {
                    halve_(eg_A);
                    halve_(eg_B);
                } else {
                    add_(eg_A, y);
                    halve_(eg_A);
                    sub_(eg_B, x);
                    halve_(eg_B);
                }
            }
            while (!(v[0] & 1)) {
                halve_(v);
                if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {
                    halve_(eg_C);
                    halve_(eg_D);
                } else {
                    add_(eg_C, y);
                    halve_(eg_C);
                    sub_(eg_D, x);
                    halve_(eg_D);
                }
            }
            if (!greater(v, eg_u)) {
                sub_(eg_u, v);
                sub_(eg_A, eg_C);
                sub_(eg_B, eg_D);
            } else {
                sub_(v, eg_u);
                sub_(eg_C, eg_A);
                sub_(eg_D, eg_B);
            }
            if (equalsInt(eg_u, 0)) {
                while (negative(eg_C)) {
                    add_(eg_C, y);
                    sub_(eg_D, x);
                }
                multInt_(eg_D, -1);
                copy_(a, eg_C);
                copy_(b, eg_D);
                leftShift_(v, g);
                return;
            }
        }
    }
    function negative(x) {
        return x[x.length - 1] >> bpe - 1 & 1;
    }
    function greaterShift(x, y, shift) {
        var i, kx = x.length, ky = y.length;
        var k = kx + shift < ky ? kx + shift : ky;
        for (i = ky - 1 - shift; i < kx && i >= 0; i++) if (x[i] > 0) return 1;
        for (i = kx - 1 + shift; i < ky; i++) if (y[i] > 0) return 0;
        for (i = k - 1; i >= shift; i--) if (x[i - shift] > y[i]) return 1; else if (x[i - shift] < y[i]) return 0;
        return 0;
    }
    function greater(x, y) {
        var i;
        var k = x.length < y.length ? x.length : y.length;
        for (i = x.length; i < y.length; i++) if (y[i]) return 0;
        for (i = y.length; i < x.length; i++) if (x[i]) return 1;
        for (i = k - 1; i >= 0; i--) if (x[i] > y[i]) return 1; else if (x[i] < y[i]) return 0;
        return 0;
    }
    function divide_(x, y, q, r) {
        var kx, ky;
        var i, j, y1, y2, c, a, b;
        copy_(r, x);
        for (ky = y.length; y[ky - 1] == 0; ky--) ;
        b = y[ky - 1];
        for (a = 0; b; a++) b >>= 1;
        a = bpe - a;
        leftShift_(y, a);
        leftShift_(r, a);
        for (kx = r.length; r[kx - 1] == 0 && kx > ky; kx--) ;
        copyInt_(q, 0);
        while (!greaterShift(y, r, kx - ky)) {
            subShift_(r, y, kx - ky);
            q[kx - ky]++;
        }
        for (i = kx - 1; i >= ky; i--) {
            if (r[i] == y[ky - 1]) q[i - ky] = mask; else q[i - ky] = Math.floor((r[i] * radix + r[i - 1]) / y[ky - 1]);
            for (;;) {
                y2 = (ky > 1 ? y[ky - 2] : 0) * q[i - ky];
                c = y2 >> bpe;
                y2 = y2 & mask;
                y1 = c + q[i - ky] * y[ky - 1];
                c = y1 >> bpe;
                y1 = y1 & mask;
                if (c == r[i] ? y1 == r[i - 1] ? y2 > (i > 1 ? r[i - 2] : 0) : y1 > r[i - 1] : c > r[i]) q[i - ky]--; else break;
            }
            linCombShift_(r, y, -q[i - ky], i - ky);
            if (negative(r)) {
                addShift_(r, y, i - ky);
                q[i - ky]--;
            }
        }
        rightShift_(y, a);
        rightShift_(r, a);
    }
    function carry_(x) {
        var i, k, c, b;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i];
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
        }
    }
    function modInt(x, n) {
        var i, c = 0;
        for (i = x.length - 1; i >= 0; i--) c = (c * radix + x[i]) % n;
        return c;
    }
    function int2bigInt(t, bits, minSize) {
        var i, k, buff;
        k = Math.ceil(bits / bpe) + 1;
        k = minSize > k ? minSize : k;
        buff = new Array(k);
        copyInt_(buff, t);
        return buff;
    }
    function str2bigInt(s, base, minSize) {
        var d, i, j, x, y, kk;
        var k = s.length;
        if (base == -1) {
            x = new Array(0);
            for (;;) {
                y = new Array(x.length + 1);
                for (i = 0; i < x.length; i++) y[i + 1] = x[i];
                y[0] = parseInt(s, 10);
                x = y;
                d = s.indexOf(",", 0);
                if (d < 1) break;
                s = s.substring(d + 1);
                if (s.length == 0) break;
            }
            if (x.length < minSize) {
                y = new Array(minSize);
                copy_(y, x);
                return y;
            }
            return x;
        }
        var bb = base, p = 0;
        var b = base == 1 ? k : 0;
        while (bb > 1) {
            if (bb & 1) p = 1;
            b += k;
            bb >>= 1;
        }
        b += p * k;
        x = int2bigInt(0, b, 0);
        for (i = 0; i < k; i++) {
            d = digitsStr.indexOf(s.substring(i, i + 1), 0);
            if (base <= 36 && d >= 36) d -= 26;
            if (d >= base || d < 0) {
                break;
            }
            multInt_(x, base);
            addInt_(x, d);
        }
        for (k = x.length; k > 0 && !x[k - 1]; k--) ;
        k = minSize > k + 1 ? minSize : k + 1;
        y = new Array(k);
        kk = k < x.length ? k : x.length;
        for (i = 0; i < kk; i++) y[i] = x[i];
        for (;i < k; i++) y[i] = 0;
        return y;
    }
    function equalsInt(x, y) {
        var i;
        if (x[0] != y) return 0;
        for (i = 1; i < x.length; i++) if (x[i]) return 0;
        return 1;
    }
    function equals(x, y) {
        var i;
        var k = x.length < y.length ? x.length : y.length;
        for (i = 0; i < k; i++) if (x[i] != y[i]) return 0;
        if (x.length > y.length) {
            for (;i < x.length; i++) if (x[i]) return 0;
        } else {
            for (;i < y.length; i++) if (y[i]) return 0;
        }
        return 1;
    }
    function isZero(x) {
        var i;
        for (i = 0; i < x.length; i++) if (x[i]) return 0;
        return 1;
    }
    function bigInt2str(x, base) {
        var i, t, s = "";
        if (s6.length != x.length) s6 = dup(x); else copy_(s6, x);
        if (base == -1) {
            for (i = x.length - 1; i > 0; i--) s += x[i] + ",";
            s += x[0];
        } else {
            while (!isZero(s6)) {
                t = divInt_(s6, base);
                s = digitsStr.substring(t, t + 1) + s;
            }
        }
        if (s.length == 0) s = "0";
        return s;
    }
    function dup(x) {
        var i, buff;
        buff = new Array(x.length);
        copy_(buff, x);
        return buff;
    }
    function copy_(x, y) {
        var i;
        var k = x.length < y.length ? x.length : y.length;
        for (i = 0; i < k; i++) x[i] = y[i];
        for (i = k; i < x.length; i++) x[i] = 0;
    }
    function copyInt_(x, n) {
        var i, c;
        for (c = n, i = 0; i < x.length; i++) {
            x[i] = c & mask;
            c >>= bpe;
        }
    }
    function addInt_(x, n) {
        var i, k, c, b;
        x[0] += n;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i];
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
            if (!c) return;
        }
    }
    function rightShift_(x, n) {
        var i;
        var k = Math.floor(n / bpe);
        if (k) {
            for (i = 0; i < x.length - k; i++) x[i] = x[i + k];
            for (;i < x.length; i++) x[i] = 0;
            n %= bpe;
        }
        for (i = 0; i < x.length - 1; i++) {
            x[i] = mask & (x[i + 1] << bpe - n | x[i] >> n);
        }
        x[i] >>= n;
    }
    function halve_(x) {
        var i;
        for (i = 0; i < x.length - 1; i++) {
            x[i] = mask & (x[i + 1] << bpe - 1 | x[i] >> 1);
        }
        x[i] = x[i] >> 1 | x[i] & radix >> 1;
    }
    function leftShift_(x, n) {
        var i;
        var k = Math.floor(n / bpe);
        if (k) {
            for (i = x.length; i >= k; i--) x[i] = x[i - k];
            for (;i >= 0; i--) x[i] = 0;
            n %= bpe;
        }
        if (!n) return;
        for (i = x.length - 1; i > 0; i--) {
            x[i] = mask & (x[i] << n | x[i - 1] >> bpe - n);
        }
        x[i] = mask & x[i] << n;
    }
    function multInt_(x, n) {
        var i, k, c, b;
        if (!n) return;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i] * n;
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
        }
    }
    function divInt_(x, n) {
        var i, r = 0, s;
        for (i = x.length - 1; i >= 0; i--) {
            s = r * radix + x[i];
            x[i] = Math.floor(s / n);
            r = s % n;
        }
        return r;
    }
    function linComb_(x, y, a, b) {
        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        kk = x.length;
        for (c = 0, i = 0; i < k; i++) {
            c += a * x[i] + b * y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; i < kk; i++) {
            c += a * x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }
    function linCombShift_(x, y, b, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] + b * y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }
    function addShift_(x, y, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] + y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }
    function subShift_(x, y, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] - y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }
    function sub_(x, y) {
        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        for (c = 0, i = 0; i < k; i++) {
            c += x[i] - y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < x.length; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }
    function add_(x, y) {
        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        for (c = 0, i = 0; i < k; i++) {
            c += x[i] + y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < x.length; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }
    function mult_(x, y) {
        var i;
        if (ss.length != 2 * x.length) ss = new Array(2 * x.length);
        copyInt_(ss, 0);
        for (i = 0; i < y.length; i++) if (y[i]) linCombShift_(ss, x, y[i], i);
        copy_(x, ss);
    }
    function mod_(x, n) {
        if (s4.length != x.length) s4 = dup(x); else copy_(s4, x);
        if (s5.length != x.length) s5 = dup(x);
        divide_(s4, n, s5, x);
    }
    function multMod_(x, y, n) {
        var i;
        if (s0.length != 2 * x.length) s0 = new Array(2 * x.length);
        copyInt_(s0, 0);
        for (i = 0; i < y.length; i++) if (y[i]) linCombShift_(s0, x, y[i], i);
        mod_(s0, n);
        copy_(x, s0);
    }
    function squareMod_(x, n) {
        var i, j, d, c, kx, kn, k;
        for (kx = x.length; kx > 0 && !x[kx - 1]; kx--) ;
        k = kx > n.length ? 2 * kx : 2 * n.length;
        if (s0.length != k) s0 = new Array(k);
        copyInt_(s0, 0);
        for (i = 0; i < kx; i++) {
            c = s0[2 * i] + x[i] * x[i];
            s0[2 * i] = c & mask;
            c >>= bpe;
            for (j = i + 1; j < kx; j++) {
                c = s0[i + j] + 2 * x[i] * x[j] + c;
                s0[i + j] = c & mask;
                c >>= bpe;
            }
            s0[i + kx] = c;
        }
        mod_(s0, n);
        copy_(x, s0);
    }
    function trim(x, k) {
        var i, y;
        for (i = x.length; i > 0 && !x[i - 1]; i--) ;
        y = new Array(i + k);
        copy_(y, x);
        return y;
    }
    function powMod_(x, y, n) {
        var k1, k2, kn, np;
        if (s7.length != n.length) s7 = dup(n);
        if ((n[0] & 1) == 0) {
            copy_(s7, x);
            copyInt_(x, 1);
            while (!equalsInt(y, 0)) {
                if (y[0] & 1) multMod_(x, s7, n);
                divInt_(y, 2);
                squareMod_(s7, n);
            }
            return;
        }
        copyInt_(s7, 0);
        for (kn = n.length; kn > 0 && !n[kn - 1]; kn--) ;
        np = radix - inverseModInt(modInt(n, radix), radix);
        s7[kn] = 1;
        multMod_(x, s7, n);
        if (s3.length != x.length) s3 = dup(x); else copy_(s3, x);
        for (k1 = y.length - 1; k1 > 0 & !y[k1]; k1--) ;
        if (y[k1] == 0) {
            copyInt_(x, 1);
            return;
        }
        for (k2 = 1 << bpe - 1; k2 && !(y[k1] & k2); k2 >>= 1) ;
        for (;;) {
            if (!(k2 >>= 1)) {
                k1--;
                if (k1 < 0) {
                    mont_(x, one, n, np);
                    return;
                }
                k2 = 1 << bpe - 1;
            }
            mont_(x, x, n, np);
            if (k2 & y[k1]) mont_(x, s3, n, np);
        }
    }
    function mont_(x, y, n, np) {
        var i, j, c, ui, t, ks;
        var kn = n.length;
        var ky = y.length;
        if (sa.length != kn) sa = new Array(kn);
        copyInt_(sa, 0);
        for (;kn > 0 && n[kn - 1] == 0; kn--) ;
        for (;ky > 0 && y[ky - 1] == 0; ky--) ;
        ks = sa.length - 1;
        for (i = 0; i < kn; i++) {
            t = sa[0] + x[i] * y[0];
            ui = (t & mask) * np & mask;
            c = t + ui * n[0] >> bpe;
            t = x[i];
            j = 1;
            for (;j < ky - 4; ) {
                c += sa[j] + ui * n[j] + t * y[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
                c += sa[j] + ui * n[j] + t * y[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
                c += sa[j] + ui * n[j] + t * y[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
                c += sa[j] + ui * n[j] + t * y[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
                c += sa[j] + ui * n[j] + t * y[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
            }
            for (;j < ky; ) {
                c += sa[j] + ui * n[j] + t * y[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
            }
            for (;j < kn - 4; ) {
                c += sa[j] + ui * n[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
                c += sa[j] + ui * n[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
                c += sa[j] + ui * n[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
                c += sa[j] + ui * n[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
                c += sa[j] + ui * n[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
            }
            for (;j < kn; ) {
                c += sa[j] + ui * n[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
            }
            for (;j < ks; ) {
                c += sa[j];
                sa[j - 1] = c & mask;
                c >>= bpe;
                j++;
            }
            sa[j - 1] = c & mask;
        }
        if (!greater(n, sa)) sub_(sa, n);
        copy_(x, sa);
    }
    var BigInt = {
        str2bigInt: str2bigInt,
        bigInt2str: bigInt2str,
        int2bigInt: int2bigInt,
        multMod: multMod,
        powMod: powMod,
        inverseMod: inverseMod,
        randBigInt: randBigInt,
        randBigInt_: randBigInt_,
        equals: equals,
        equalsInt: equalsInt,
        sub: sub,
        mod: mod,
        mod_: mod_,
        modInt: modInt,
        mult: mult,
        divInt_: divInt_,
        rightShift_: rightShift_,
        leftShift_: leftShift_,
        dup: dup,
        greater: greater,
        add: add,
        addInt: addInt,
        addInt_: addInt_,
        isZero: isZero,
        bitSize: bitSize,
        randTruePrime: randTruePrime,
        millerRabin: millerRabin,
        divide_: divide_,
        trim: trim,
        expand: expand,
        bpe: bpe,
        primes: primes,
        findPrimes: findPrimes,
        getSeed: getSeed
    };
    var randomBitInt;
    function seedRand(buf) {
        var state = new Salsa20([ buf[0], buf[1], buf[2], buf[3], buf[4], buf[5], buf[6], buf[7], buf[8], buf[9], buf[10], buf[11], buf[12], buf[13], buf[14], buf[15], buf[16], buf[17], buf[18], buf[19], buf[20], buf[21], buf[22], buf[23], buf[24], buf[25], buf[26], buf[27], buf[28], buf[29], buf[30], buf[31] ], [ buf[32], buf[33], buf[34], buf[35], buf[36], buf[37], buf[38], buf[39] ]);
        var width = 256, chunks = 6, significance = Math.pow(2, 52), overflow = significance * 2;
        function numerator() {
            var bytes = state.getBytes(chunks);
            var i = 0, r = 0;
            for (;i < chunks; i++) {
                r = r * width + bytes[i];
            }
            return r;
        }
        function randomByte() {
            return state.getBytes(1)[0];
        }
        randomBitInt = function(k) {
            if (k > 31) throw new Error("Too many bits.");
            var i = 0, r = 0;
            var b = Math.floor(k / 8);
            var mask = (1 << k % 8) - 1;
            if (mask) r = randomByte() & mask;
            for (;i < b; i++) r = 256 * r + randomByte();
            return r;
        };
        return function() {
            var n = numerator(), d = Math.pow(width, chunks), x = 0;
            while (n < significance) {
                n = (n + x) * width;
                d *= width;
                x = randomByte();
            }
            while (n >= overflow) {
                n /= 2;
                d /= 2;
                x >>>= 1;
            }
            return (n + x) / d;
        };
    }
    function getSeed() {
        var buf;
        if (typeof crypto !== "undefined" && typeof crypto.randomBytes === "function") {
            try {
                buf = crypto.randomBytes(40);
            } catch (e) {
                throw e;
            }
        } else if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
            buf = new Uint8Array(40);
            crypto.getRandomValues(buf);
        } else {
            throw new Error("Keys should not be generated without CSPRNG.");
        }
        return Array.prototype.slice.call(buf, 0);
    }
    (function seed() {
        Math.random = seedRand(getSeed());
        if (typeof setTimeout === "function" && typeof document !== "undefined") setTimeout(seed, 5 * 60 * 1e3);
    })();
    return BigInt;
});

var CryptoJS = CryptoJS || function(Math, undefined) {
    var C = {};
    var C_lib = C.lib = {};
    var Base = C_lib.Base = function() {
        function F() {}
        return {
            extend: function(overrides) {
                F.prototype = this;
                var subtype = new F();
                if (overrides) {
                    subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init")) {
                    subtype.init = function() {
                        subtype.$super.init.apply(this, arguments);
                    };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
            },
            create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
            },
            init: function() {},
            mixIn: function(properties) {
                for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                        this[propertyName] = properties[propertyName];
                    }
                }
                if (properties.hasOwnProperty("toString")) {
                    this.toString = properties.toString;
                }
            },
            clone: function() {
                return this.init.prototype.extend(this);
            }
        };
    }();
    var WordArray = C_lib.WordArray = Base.extend({
        init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 4;
            }
        },
        toString: function(encoder) {
            return (encoder || Hex).stringify(this);
        },
        concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
            } else if (thatWords.length > 65535) {
                for (var i = 0; i < thatSigBytes; i += 4) {
                    thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
                }
            } else {
                thisWords.push.apply(thisWords, thatWords);
            }
            this.sigBytes += thatSigBytes;
            return this;
        },
        clamp: function() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math.ceil(sigBytes / 4);
        },
        clone: function() {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
        },
        random: function(nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
                words.push(Math.random() * 4294967296 | 0);
            }
            return new WordArray.init(words, nBytes);
        }
    });
    var C_enc = C.enc = {};
    var Hex = C_enc.Hex = {
        stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
        },
        parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }
            return new WordArray.init(words, hexStrLength / 2);
        }
    };
    var Latin1 = C_enc.Latin1 = {
        stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
        },
        parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }
            return new WordArray.init(words, latin1StrLength);
        }
    };
    var Utf8 = C_enc.Utf8 = {
        stringify: function(wordArray) {
            try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
                throw new Error("Malformed UTF-8 data");
            }
        },
        parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
    };
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        reset: function() {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
        },
        _append: function(data) {
            if (typeof data == "string") {
                data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
        },
        _process: function(doFlush) {
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
                nBlocksReady = Math.ceil(nBlocksReady);
            } else {
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    this._doProcessBlock(dataWords, offset);
                }
                var processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
        },
        clone: function() {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
        },
        _minBufferSize: 0
    });
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
        },
        reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
        },
        update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
        },
        finalize: function(messageUpdate) {
            if (messageUpdate) {
                this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
        },
        blockSize: 512 / 32,
        _createHelper: function(hasher) {
            return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
            };
        },
        _createHmacHelper: function(hasher) {
            return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
        }
    });
    var C_algo = C.algo = {};
    return C;
}(Math);

(function() {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;
    var Base64 = C_enc.Base64 = {
        stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * .75 < sigBytes; j++) {
                    base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                while (base64Chars.length % 4) {
                    base64Chars.push(paddingChar);
                }
            }
            return base64Chars.join("");
        },
        parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex != -1) {
                    base64StrLength = paddingIndex;
                }
            }
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
                if (i % 4) {
                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2;
                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;
                    words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
                    nBytes++;
                }
            }
            return WordArray.create(words, nBytes);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
})();

(function(Math) {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;
    var T = [];
    (function() {
        for (var i = 0; i < 64; i++) {
            T[i] = Math.abs(Math.sin(i + 1)) * 4294967296 | 0;
        }
    })();
    var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function() {
            this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
        },
        _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
        },
        clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
        }
    });
    function FF(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + x + t;
        return (n << s | n >>> 32 - s) + b;
    }
    function GG(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + x + t;
        return (n << s | n >>> 32 - s) + b;
    }
    function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return (n << s | n >>> 32 - s) + b;
    }
    function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return (n << s | n >>> 32 - s) + b;
    }
    C.MD5 = Hasher._createHelper(MD5);
    C.HmacMD5 = Hasher._createHmacHelper(MD5);
})(Math);

(function() {
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var MD5 = C_algo.MD5;
    var EvpKDF = C_algo.EvpKDF = Base.extend({
        cfg: Base.extend({
            keySize: 128 / 32,
            hasher: MD5,
            iterations: 1
        }),
        init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
        },
        compute: function(password, salt) {
            var cfg = this.cfg;
            var hasher = cfg.hasher.create();
            var derivedKey = WordArray.create();
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
                if (block) {
                    hasher.update(block);
                }
                var block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i = 1; i < iterations; i++) {
                    block = hasher.finalize(block);
                    hasher.reset();
                }
                derivedKey.concat(block);
            }
            derivedKey.sigBytes = keySize * 4;
            return derivedKey;
        }
    });
    C.EvpKDF = function(password, salt, cfg) {
        return EvpKDF.create(cfg).compute(password, salt);
    };
})();

CryptoJS.lib.Cipher || function(undefined) {
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var Base64 = C_enc.Base64;
    var C_algo = C.algo;
    var EvpKDF = C_algo.EvpKDF;
    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        createEncryptor: function(key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
        },
        createDecryptor: function(key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
        },
        init: function(xformMode, key, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key;
            this.reset();
        },
        reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
        },
        process: function(dataUpdate) {
            this._append(dataUpdate);
            return this._process();
        },
        finalize: function(dataUpdate) {
            if (dataUpdate) {
                this._append(dataUpdate);
            }
            var finalProcessedData = this._doFinalize();
            return finalProcessedData;
        },
        keySize: 128 / 32,
        ivSize: 128 / 32,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function() {
            function selectCipherStrategy(key) {
                if (typeof key == "string") {
                    return PasswordBasedCipher;
                } else {
                    return SerializableCipher;
                }
            }
            return function(cipher) {
                return {
                    encrypt: function(message, key, cfg) {
                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                    },
                    decrypt: function(ciphertext, key, cfg) {
                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                    }
                };
            };
        }()
    });
    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
        _doFinalize: function() {
            var finalProcessedBlocks = this._process(!!"flush");
            return finalProcessedBlocks;
        },
        blockSize: 1
    });
    var C_mode = C.mode = {};
    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
        createEncryptor: function(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
        },
        createDecryptor: function(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
        },
        init: function(cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
        }
    });
    var CBC = C_mode.CBC = function() {
        var CBC = BlockCipherMode.extend();
        CBC.Encryptor = CBC.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
            }
        });
        CBC.Decryptor = CBC.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
            }
        });
        function xorBlock(words, offset, blockSize) {
            var iv = this._iv;
            if (iv) {
                var block = iv;
                this._iv = undefined;
            } else {
                var block = this._prevBlock;
            }
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
            }
        }
        return CBC;
    }();
    var C_pad = C.pad = {};
    var Pkcs7 = C_pad.Pkcs7 = {
        pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
            }
            var padding = WordArray.create(paddingWords, nPaddingBytes);
            data.concat(padding);
        },
        unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
        }
    };
    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
        cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
        }),
        reset: function() {
            Cipher.reset.call(this);
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                var modeCreator = mode.createEncryptor;
            } else {
                var modeCreator = mode.createDecryptor;
                this._minBufferSize = 1;
            }
            this._mode = modeCreator.call(mode, this, iv && iv.words);
        },
        _doProcessBlock: function(words, offset) {
            this._mode.processBlock(words, offset);
        },
        _doFinalize: function() {
            var padding = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                var finalProcessedBlocks = this._process(!!"flush");
            } else {
                var finalProcessedBlocks = this._process(!!"flush");
                padding.unpad(finalProcessedBlocks);
            }
            return finalProcessedBlocks;
        },
        blockSize: 128 / 32
    });
    var CipherParams = C_lib.CipherParams = Base.extend({
        init: function(cipherParams) {
            this.mixIn(cipherParams);
        },
        toString: function(formatter) {
            return (formatter || this.formatter).stringify(this);
        }
    });
    var C_format = C.format = {};
    var OpenSSLFormatter = C_format.OpenSSL = {
        stringify: function(cipherParams) {
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;
            if (salt) {
                var wordArray = WordArray.create([ 1398893684, 1701076831 ]).concat(salt).concat(ciphertext);
            } else {
                var wordArray = ciphertext;
            }
            return wordArray.toString(Base64);
        },
        parse: function(openSSLStr) {
            var ciphertext = Base64.parse(openSSLStr);
            var ciphertextWords = ciphertext.words;
            if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                var salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
            }
            return CipherParams.create({
                ciphertext: ciphertext,
                salt: salt
            });
        }
    };
    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
        cfg: Base.extend({
            format: OpenSSLFormatter
        }),
        encrypt: function(cipher, message, key, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
                ciphertext: ciphertext,
                key: key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
            });
        },
        decrypt: function(cipher, ciphertext, key, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
            return plaintext;
        },
        _parse: function(ciphertext, format) {
            if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
            } else {
                return ciphertext;
            }
        }
    });
    var C_kdf = C.kdf = {};
    var OpenSSLKdf = C_kdf.OpenSSL = {
        execute: function(password, keySize, ivSize, salt) {
            if (!salt) {
                salt = WordArray.random(64 / 8);
            }
            var key = EvpKDF.create({
                keySize: keySize + ivSize
            }).compute(password, salt);
            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
            key.sigBytes = keySize * 4;
            return CipherParams.create({
                key: key,
                iv: iv,
                salt: salt
            });
        }
    };
    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
        cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
        }),
        encrypt: function(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
            cfg.iv = derivedParams.iv;
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
            ciphertext.mixIn(derivedParams);
            return ciphertext;
        },
        decrypt: function(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
            cfg.iv = derivedParams.iv;
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
            return plaintext;
        }
    });
}();

(function() {
    var C = CryptoJS;
    var C_lib = C.lib;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;
    var SBOX = [];
    var INV_SBOX = [];
    var SUB_MIX_0 = [];
    var SUB_MIX_1 = [];
    var SUB_MIX_2 = [];
    var SUB_MIX_3 = [];
    var INV_SUB_MIX_0 = [];
    var INV_SUB_MIX_1 = [];
    var INV_SUB_MIX_2 = [];
    var INV_SUB_MIX_3 = [];
    (function() {
        var d = [];
        for (var i = 0; i < 256; i++) {
            if (i < 128) {
                d[i] = i << 1;
            } else {
                d[i] = i << 1 ^ 283;
            }
        }
        var x = 0;
        var xi = 0;
        for (var i = 0; i < 256; i++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ sx & 255 ^ 99;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t = d[sx] * 257 ^ sx * 16843008;
            SUB_MIX_0[x] = t << 24 | t >>> 8;
            SUB_MIX_1[x] = t << 16 | t >>> 16;
            SUB_MIX_2[x] = t << 8 | t >>> 24;
            SUB_MIX_3[x] = t;
            var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
            INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
            INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
            INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
            INV_SUB_MIX_3[sx] = t;
            if (!x) {
                x = xi = 1;
            } else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
            }
        }
    })();
    var RCON = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ];
    var AES = C_algo.AES = BlockCipher.extend({
        _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            var nRounds = this._nRounds = keySize + 6;
            var ksRows = (nRounds + 1) * 4;
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                    keySchedule[ksRow] = keyWords[ksRow];
                } else {
                    var t = keySchedule[ksRow - 1];
                    if (!(ksRow % keySize)) {
                        t = t << 8 | t >>> 24;
                        t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                        t ^= RCON[ksRow / keySize | 0] << 24;
                    } else if (keySize > 6 && ksRow % keySize == 4) {
                        t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                    }
                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
            }
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;
                if (invKsRow % 4) {
                    var t = keySchedule[ksRow];
                } else {
                    var t = keySchedule[ksRow - 4];
                }
                if (invKsRow < 4 || ksRow <= 4) {
                    invKeySchedule[invKsRow] = t;
                } else {
                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
                }
            }
        },
        encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
        },
        decryptBlock: function(M, offset) {
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
        },
        _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
            var nRounds = this._nRounds;
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round = 1; round < nRounds; round++) {
                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[s3 & 255] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[s0 & 255] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[s1 & 255] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[s2 & 255] ^ keySchedule[ksRow++];
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
            }
            var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[s3 & 255]) ^ keySchedule[ksRow++];
            var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[s0 & 255]) ^ keySchedule[ksRow++];
            var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[s1 & 255]) ^ keySchedule[ksRow++];
            var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[s2 & 255]) ^ keySchedule[ksRow++];
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
        },
        keySize: 256 / 32
    });
    C.AES = BlockCipher._createHelper(AES);
})();

(function() {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;
    var W = [];
    var SHA1 = C_algo.SHA1 = Hasher.extend({
        _doReset: function() {
            this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
        },
        _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            for (var i = 0; i < 80; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                    W[i] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i];
                if (i < 20) {
                    t += (b & c | ~b & d) + 1518500249;
                } else if (i < 40) {
                    t += (b ^ c ^ d) + 1859775393;
                } else if (i < 60) {
                    t += (b & c | b & d | c & d) - 1894007588;
                } else {
                    t += (b ^ c ^ d) - 899497514;
                }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
        },
        _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
        },
        clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
        }
    });
    C.SHA1 = Hasher._createHelper(SHA1);
    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
})();

(function(Math) {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;
    var H = [];
    var K = [];
    (function() {
        function isPrime(n) {
            var sqrtN = Math.sqrt(n);
            for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n % factor)) {
                    return false;
                }
            }
            return true;
        }
        function getFractionalBits(n) {
            return (n - (n | 0)) * 4294967296 | 0;
        }
        var n = 2;
        var nPrime = 0;
        while (nPrime < 64) {
            if (isPrime(n)) {
                if (nPrime < 8) {
                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
                nPrime++;
            }
            n++;
        }
    })();
    var W = [];
    var SHA256 = C_algo.SHA256 = Hasher.extend({
        _doReset: function() {
            this._hash = new WordArray.init(H.slice(0));
        },
        _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];
            for (var i = 0; i < 64; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var gamma0x = W[i - 15];
                    var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                    var gamma1x = W[i - 2];
                    var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = e & f ^ ~e & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
            H[5] = H[5] + f | 0;
            H[6] = H[6] + g | 0;
            H[7] = H[7] + h | 0;
        },
        _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
        },
        clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
        }
    });
    C.SHA256 = Hasher._createHelper(SHA256);
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
})(Math);

(function() {
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var C_algo = C.algo;
    var HMAC = C_algo.HMAC = Base.extend({
        init: function(hasher, key) {
            hasher = this._hasher = new hasher.init();
            if (typeof key == "string") {
                key = Utf8.parse(key);
            }
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;
            if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
            }
            key.clamp();
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 1549556828;
                iKeyWords[i] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
        },
        reset: function() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
        },
        update: function(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
        },
        finalize: function(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac;
        }
    });
})();

CryptoJS.pad.NoPadding = {
    pad: function() {},
    unpad: function() {}
};

CryptoJS.mode.CTR = function() {
    var CTR = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = CTR.Encryptor = CTR.extend({
        processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = undefined;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });
    CTR.Decryptor = Encryptor;
    return CTR;
}();

(function() {
    "use strict";
    function EventEmitter() {}
    var proto = EventEmitter.prototype;
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }
        return -1;
    }
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;
        if (typeof evt === "object") {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        } else {
            response = events[evt] || (events[evt] = []);
        }
        return response;
    };
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;
        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }
        return flatListeners;
    };
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;
        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }
        return response || listeners;
    };
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === "object";
        var key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }
        return this;
    };
    proto.on = alias("addListener");
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };
    proto.once = alias("addOnceListener");
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);
                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }
        return this;
    };
    proto.off = alias("removeListener");
    proto.addListeners = function addListeners(evt, listeners) {
        return this.manipulateListeners(false, evt, listeners);
    };
    proto.removeListeners = function removeListeners(evt, listeners) {
        return this.manipulateListeners(true, evt, listeners);
    };
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;
        if (typeof evt === "object" && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    if (typeof value === "function") {
                        single.call(this, i, value);
                    } else {
                        multiple.call(this, i, value);
                    }
                }
            }
        } else {
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }
        return this;
    };
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;
        if (type === "string") {
            delete events[evt];
        } else if (type === "object") {
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        } else {
            delete this._events;
        }
        return this;
    };
    proto.emitEvent = function emitEvent(evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;
                while (i--) {
                    listener = listeners[key][i];
                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }
                    response = listener.listener.apply(this, args || []);
                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }
        return this;
    };
    proto.trigger = alias("emitEvent");
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty("_onceReturnValue")) {
            return this._onceReturnValue;
        } else {
            return true;
        }
    };
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };
    if (typeof define === "function" && define.amd) {
        define(function() {
            return EventEmitter;
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = EventEmitter;
    } else {
        this.EventEmitter = EventEmitter;
    }
}).call(this);

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "bigint", "crypto", "eventemitter" ], function(BigInt, CryptoJS, EventEmitter) {
            var root = {
                BigInt: BigInt,
                CryptoJS: CryptoJS,
                EventEmitter: EventEmitter,
                OTR: {},
                DSA: {}
            };
            return factory.call(root);
        });
    } else {
        root.OTR = {};
        root.DSA = {};
        factory.call(root);
    }
})(this, function() {
    (function() {
        "use strict";
        var root = this;
        var CONST = {
            N: "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA237327FFFFFFFFFFFFFFFF",
            G: "2",
            MSGSTATE_PLAINTEXT: 0,
            MSGSTATE_ENCRYPTED: 1,
            MSGSTATE_FINISHED: 2,
            AUTHSTATE_NONE: 0,
            AUTHSTATE_AWAITING_DHKEY: 1,
            AUTHSTATE_AWAITING_REVEALSIG: 2,
            AUTHSTATE_AWAITING_SIG: 3,
            WHITESPACE_TAG: " 	  				 	 	 	  ",
            WHITESPACE_TAG_V2: "  		  	 ",
            WHITESPACE_TAG_V3: "  		  		",
            OTR_TAG: "?OTR",
            OTR_VERSION_1: "\x00",
            OTR_VERSION_2: "\x00",
            OTR_VERSION_3: "\x00",
            SMPSTATE_EXPECT0: 0,
            SMPSTATE_EXPECT1: 1,
            SMPSTATE_EXPECT2: 2,
            SMPSTATE_EXPECT3: 3,
            SMPSTATE_EXPECT4: 4,
            STATUS_SEND_QUERY: 0,
            STATUS_AKE_INIT: 1,
            STATUS_AKE_SUCCESS: 2,
            STATUS_END_OTR: 3
        };
        if (typeof module !== "undefined" && module.exports) {
            module.exports = CONST;
        } else {
            root.OTR.CONST = CONST;
        }
    }).call(this);
    (function() {
        "use strict";
        var root = this;
        var HLP = {}, CryptoJS, BigInt;
        if (typeof module !== "undefined" && module.exports) {
            module.exports = HLP = {};
            CryptoJS = require("../vendor/crypto.js");
            BigInt = require("../vendor/bigint.js");
        } else {
            if (root.OTR) root.OTR.HLP = HLP;
            if (root.DSA) root.DSA.HLP = HLP;
            CryptoJS = root.CryptoJS;
            BigInt = root.BigInt;
        }
        var DTS = {
            BYTE: 1,
            SHORT: 2,
            INT: 4,
            CTR: 8,
            MAC: 20,
            SIG: 40
        };
        var WRAPPER_BEGIN = "?OTR", WRAPPER_END = ".";
        HLP.debug = function(msg) {
            if (this.debug && typeof this.debug !== "function" && typeof console !== "undefined") console.log(msg);
        };
        HLP.extend = function(child, parent) {
            for (var key in parent) {
                if (Object.hasOwnProperty.call(parent, key)) child[key] = parent[key];
            }
            function Ctor() {
                this.constructor = child;
            }
            Ctor.prototype = parent.prototype;
            child.prototype = new Ctor();
            child.__super__ = parent.prototype;
        };
        HLP.compare = function(str1, str2) {
            if (str1.length !== str2.length) return false;
            var i = 0, result = 0;
            for (;i < str1.length; i++) result |= str1[i].charCodeAt(0) ^ str2[i].charCodeAt(0);
            return result === 0;
        };
        HLP.divMod = function(num, den, n) {
            return BigInt.multMod(num, BigInt.inverseMod(den, n), n);
        };
        HLP.subMod = function(one, two, n) {
            one = BigInt.mod(one, n);
            two = BigInt.mod(two, n);
            if (BigInt.greater(two, one)) one = BigInt.add(one, n);
            return BigInt.sub(one, two);
        };
        HLP.randomExponent = function() {
            return BigInt.randBigInt(1536);
        };
        HLP.smpHash = function(version, fmpi, smpi) {
            var sha256 = CryptoJS.algo.SHA256.create();
            sha256.update(CryptoJS.enc.Latin1.parse(HLP.packBytes(version, DTS.BYTE)));
            sha256.update(CryptoJS.enc.Latin1.parse(HLP.packMPI(fmpi)));
            if (smpi) sha256.update(CryptoJS.enc.Latin1.parse(HLP.packMPI(smpi)));
            var hash = sha256.finalize();
            return HLP.bits2bigInt(hash.toString(CryptoJS.enc.Latin1));
        };
        HLP.makeMac = function(aesctr, m) {
            var pass = CryptoJS.enc.Latin1.parse(m);
            var mac = CryptoJS.HmacSHA256(CryptoJS.enc.Latin1.parse(aesctr), pass);
            return HLP.mask(mac.toString(CryptoJS.enc.Latin1), 0, 160);
        };
        HLP.make1Mac = function(aesctr, m) {
            var pass = CryptoJS.enc.Latin1.parse(m);
            var mac = CryptoJS.HmacSHA1(CryptoJS.enc.Latin1.parse(aesctr), pass);
            return mac.toString(CryptoJS.enc.Latin1);
        };
        HLP.encryptAes = function(msg, c, iv) {
            var opts = {
                mode: CryptoJS.mode.CTR,
                iv: CryptoJS.enc.Latin1.parse(iv),
                padding: CryptoJS.pad.NoPadding
            };
            var aesctr = CryptoJS.AES.encrypt(msg, CryptoJS.enc.Latin1.parse(c), opts);
            var aesctr_decoded = CryptoJS.enc.Base64.parse(aesctr.toString());
            return CryptoJS.enc.Latin1.stringify(aesctr_decoded);
        };
        HLP.decryptAes = function(msg, c, iv) {
            msg = CryptoJS.enc.Latin1.parse(msg);
            var opts = {
                mode: CryptoJS.mode.CTR,
                iv: CryptoJS.enc.Latin1.parse(iv),
                padding: CryptoJS.pad.NoPadding
            };
            return CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(msg), CryptoJS.enc.Latin1.parse(c), opts);
        };
        HLP.multPowMod = function(a, b, c, d, e) {
            return BigInt.multMod(BigInt.powMod(a, b, e), BigInt.powMod(c, d, e), e);
        };
        HLP.ZKP = function(v, c, d, e) {
            return BigInt.equals(c, HLP.smpHash(v, d, e));
        };
        HLP.GTOE = function(a, b) {
            return BigInt.equals(a, b) || BigInt.greater(a, b);
        };
        HLP.between = function(x, a, b) {
            return BigInt.greater(x, a) && BigInt.greater(b, x);
        };
        HLP.checkGroup = function(g, N) {
            var TWO = BigInt.str2bigInt("2", 10);
            var N_MINUS_2 = BigInt.sub(N, TWO);
            return HLP.GTOE(g, TWO) && HLP.GTOE(N_MINUS_2, g);
        };
        var OPS = {
            XOR: function(c, s) {
                return c ^ s;
            },
            OR: function(c, s) {
                return c | s;
            },
            AND: function(c, s) {
                return c & s;
            }
        };
        HLP.bigBitWise = function(op, a, b) {
            var tf = a.length > b.length, short = tf ? b : a, long = tf ? a : b, len = long.length, c = BigInt.expand(short, len), i = 0;
            for (;i < len; i++) {
                c[i] = OPS[op](c[i], long[i]);
            }
            return c;
        };
        HLP.h1 = function(b, secbytes) {
            var sha1 = CryptoJS.algo.SHA1.create();
            sha1.update(CryptoJS.enc.Latin1.parse(b));
            sha1.update(CryptoJS.enc.Latin1.parse(secbytes));
            return sha1.finalize().toString(CryptoJS.enc.Latin1);
        };
        HLP.h2 = function(b, secbytes) {
            var sha256 = CryptoJS.algo.SHA256.create();
            sha256.update(CryptoJS.enc.Latin1.parse(b));
            sha256.update(CryptoJS.enc.Latin1.parse(secbytes));
            return sha256.finalize().toString(CryptoJS.enc.Latin1);
        };
        HLP.mask = function(bytes, start, n) {
            return bytes.substr(start / 8, n / 8);
        };
        HLP.twotothe = function(m) {
            var t = [ 1 << m % BigInt.bpe, 0 ];
            var i = 0, b = Math.floor(m / BigInt.bpe);
            for (;i < b; i++) t.unshift(0);
            return t;
        };
        HLP.packBytes = function(val, bytes) {
            val = val.toString(16);
            var nex, res = "";
            for (;bytes > 0; bytes--) {
                nex = val.length ? val.substr(-2, 2) : "0";
                val = val.substr(0, val.length - 2);
                res = _toString(parseInt(nex, 16)) + res;
            }
            return res;
        };
        HLP.packINT = function(d) {
            return HLP.packBytes(d, DTS.INT);
        };
        HLP.packCtr = function(d) {
            return HLP.padCtr(HLP.packBytes(d, DTS.CTR));
        };
        HLP.padCtr = function(ctr) {
            return ctr + "\x00\x00\x00\x00\x00\x00\x00\x00";
        };
        HLP.unpackCtr = function(d) {
            d = HLP.toByteArray(d.substring(0, 8));
            return HLP.unpack(d);
        };
        HLP.unpack = function(arr) {
            arr.reverse();
            var val = 0, i = 0, len = arr.length;
            for (;i < len; i++) {
                val += Math.pow(256, i) * arr[i];
            }
            return val;
        };
        HLP.packData = function(d) {
            return HLP.packINT(d.length) + d;
        };
        HLP.bigInt2bits = function(bi, pad) {
            pad || (pad = 0);
            bi = BigInt.dup(bi);
            var ba = "";
            while (!BigInt.isZero(bi)) {
                ba = _num2bin[bi[0] & 255] + ba;
                BigInt.rightShift_(bi, 8);
            }
            while (ba.length < pad) {
                ba = "\x00" + ba;
            }
            return ba;
        };
        HLP.bits2bigInt = function(bits) {
            bits = HLP.toByteArray(bits);
            return HLP.retMPI(bits);
        };
        HLP.packMPI = function(mpi) {
            return HLP.packData(HLP.bigInt2bits(BigInt.trim(mpi, 0)));
        };
        HLP.packSHORT = function(short) {
            return HLP.packBytes(short, DTS.SHORT);
        };
        HLP.unpackSHORT = function(short) {
            short = HLP.toByteArray(short);
            return HLP.unpack(short);
        };
        HLP.packTLV = function(type, value) {
            return HLP.packSHORT(type) + HLP.packSHORT(value.length) + value;
        };
        HLP.readLen = function(msg) {
            msg = HLP.toByteArray(msg.substring(0, 4));
            return HLP.unpack(msg);
        };
        HLP.readData = function(data) {
            var n = HLP.unpack(data.splice(0, 4));
            return [ n, data ];
        };
        HLP.retMPI = function(data) {
            var mpi = BigInt.str2bigInt("0", 10, data.length);
            data.forEach(function(d, i) {
                if (i) BigInt.leftShift_(mpi, 8);
                mpi[0] |= d;
            });
            return mpi;
        };
        HLP.readMPI = function(data) {
            data = HLP.toByteArray(data);
            data = HLP.readData(data);
            return HLP.retMPI(data[1]);
        };
        HLP.packMPIs = function(arr) {
            return arr.reduce(function(prv, cur) {
                return prv + HLP.packMPI(cur);
            }, "");
        };
        HLP.unpackMPIs = function(num, mpis) {
            var i = 0, arr = [];
            for (;i < num; i++) arr.push("MPI");
            return HLP.splitype(arr, mpis).map(function(m) {
                return HLP.readMPI(m);
            });
        };
        HLP.wrapMsg = function(msg, fs, v3, our_it, their_it) {
            msg = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Latin1.parse(msg));
            msg = WRAPPER_BEGIN + ":" + msg + WRAPPER_END;
            var its;
            if (v3) {
                its = "|";
                its += HLP.readLen(our_it).toString(16);
                its += "|";
                its += HLP.readLen(their_it).toString(16);
            }
            if (!fs) return [ null, msg ];
            var n = Math.ceil(msg.length / fs);
            if (n > 65535) return [ "Too many fragments" ];
            if (n == 1) return [ null, msg ];
            var k, bi, ei, frag, mf, mfs = [];
            for (k = 1; k <= n; k++) {
                bi = (k - 1) * fs;
                ei = k * fs;
                frag = msg.slice(bi, ei);
                mf = WRAPPER_BEGIN;
                if (v3) mf += its;
                mf += "," + k + ",";
                mf += n + ",";
                mf += frag + ",";
                mfs.push(mf);
            }
            return [ null, mfs ];
        };
        HLP.splitype = function splitype(arr, msg) {
            var data = [];
            arr.forEach(function(a) {
                var str;
                switch (a) {
                  case "PUBKEY":
                    str = splitype([ "SHORT", "MPI", "MPI", "MPI", "MPI" ], msg).join("");
                    break;

                  case "DATA":
                  case "MPI":
                    str = msg.substring(0, HLP.readLen(msg) + 4);
                    break;

                  default:
                    str = msg.substring(0, DTS[a]);
                }
                data.push(str);
                msg = msg.substring(str.length);
            });
            return data;
        };
        var _bin2num = {}, _num2bin = {}, _toString = String.fromCharCode;
        var i = 0, v;
        for (;i < 256; ++i) {
            v = _toString(i);
            _bin2num[v] = i;
            _num2bin[i] = v;
        }
        for (i = 128; i < 256; ++i) {
            _bin2num[_toString(63232 + i)] = i;
        }
        HLP.toByteArray = function(data) {
            var rv = [], bin2num = _bin2num, remain, ary = data.split(""), i = -1, iz;
            iz = ary.length;
            remain = iz % 8;
            while (remain--) {
                ++i;
                rv[i] = bin2num[ary[i]];
            }
            remain = iz >> 3;
            while (remain--) {
                rv.push(bin2num[ary[++i]], bin2num[ary[++i]], bin2num[ary[++i]], bin2num[ary[++i]], bin2num[ary[++i]], bin2num[ary[++i]], bin2num[ary[++i]], bin2num[ary[++i]]);
            }
            return rv;
        };
    }).call(this);
    (function() {
        "use strict";
        var root = this;
        var CryptoJS, BigInt, HLP;
        if (typeof module !== "undefined" && module.exports) {
            module.exports = DSA;
            CryptoJS = require("../vendor/crypto.js");
            BigInt = require("../vendor/bigint.js");
            HLP = require("./helpers.js");
        } else {
            Object.keys(root.DSA).forEach(function(k) {
                DSA[k] = root.DSA[k];
            });
            root.DSA = DSA;
            CryptoJS = root.CryptoJS;
            BigInt = root.BigInt;
            HLP = DSA.HLP;
        }
        var ZERO = BigInt.str2bigInt("0", 10), ONE = BigInt.str2bigInt("1", 10), TWO = BigInt.str2bigInt("2", 10), KEY_TYPE = "\x00\x00";
        var DEBUG = false;
        function timer() {
            var start = new Date().getTime();
            return function(s) {
                if (!DEBUG || typeof console === "undefined") return;
                var t = new Date().getTime();
                console.log(s + ": " + (t - start));
                start = t;
            };
        }
        function makeRandom(min, max) {
            var c = BigInt.randBigInt(BigInt.bitSize(max));
            if (!HLP.between(c, min, max)) return makeRandom(min, max);
            return c;
        }
        var rpprb = [];
        function isProbPrime(k, n) {
            var i, B = 3e4, l = BigInt.bitSize(k);
            var primes = BigInt.primes;
            if (primes.length === 0) primes = BigInt.findPrimes(B);
            if (rpprb.length != k.length) rpprb = BigInt.dup(k);
            for (i = 0; i < primes.length && primes[i] <= B; i++) if (BigInt.modInt(k, primes[i]) === 0 && !BigInt.equalsInt(k, primes[i])) return 0;
            for (i = 0; i < n; i++) {
                BigInt.randBigInt_(rpprb, l, 0);
                while (!BigInt.greater(k, rpprb)) BigInt.randBigInt_(rpprb, l, 0);
                if (!BigInt.millerRabin(k, rpprb)) return 0;
            }
            return 1;
        }
        var bit_lengths = {
            "1024": {
                N: 160,
                repeat: 40
            },
            "2048": {
                N: 224,
                repeat: 56
            }
        };
        var primes = {};
        function generatePrimes(bit_length) {
            var t = timer();
            var repeat = bit_lengths[bit_length].repeat;
            var N = bit_lengths[bit_length].N;
            var LM1 = HLP.twotothe(bit_length - 1);
            var bl4 = 4 * bit_length;
            var brk = false;
            var q, p, rem, counter;
            for (;;) {
                q = BigInt.randBigInt(N, 1);
                q[0] |= 1;
                if (!isProbPrime(q, repeat)) continue;
                t("q");
                for (counter = 0; counter < bl4; counter++) {
                    p = BigInt.randBigInt(bit_length, 1);
                    p[0] |= 1;
                    rem = BigInt.mod(p, q);
                    rem = BigInt.sub(rem, ONE);
                    p = BigInt.sub(p, rem);
                    if (BigInt.greater(LM1, p)) continue;
                    if (!isProbPrime(p, repeat)) continue;
                    t("p");
                    primes[bit_length] = {
                        p: p,
                        q: q
                    };
                    brk = true;
                    break;
                }
                if (brk) break;
            }
            var h = BigInt.dup(TWO);
            var pm1 = BigInt.sub(p, ONE);
            var e = BigInt.multMod(pm1, BigInt.inverseMod(q, p), p);
            var g;
            for (;;) {
                g = BigInt.powMod(h, e, p);
                if (BigInt.equals(g, ONE)) {
                    h = BigInt.add(h, ONE);
                    continue;
                }
                primes[bit_length].g = g;
                t("g");
                return;
            }
            throw new Error("Unreachable!");
        }
        function DSA(obj, opts) {
            if (!(this instanceof DSA)) return new DSA(obj, opts);
            opts = opts || {};
            if (obj) {
                var self = this;
                [ "p", "q", "g", "y", "x" ].forEach(function(prop) {
                    self[prop] = obj[prop];
                });
                this.type = obj.type || KEY_TYPE;
                return;
            }
            var bit_length = parseInt(opts.bit_length ? opts.bit_length : 1024, 10);
            if (!bit_lengths[bit_length]) throw new Error("Unsupported bit length.");
            if (!primes[bit_length]) generatePrimes(bit_length);
            this.p = primes[bit_length].p;
            this.q = primes[bit_length].q;
            this.g = primes[bit_length].g;
            this.type = KEY_TYPE;
            this.x = makeRandom(ZERO, this.q);
            this.y = BigInt.powMod(this.g, this.x, this.p);
            if (opts.nocache) primes[bit_length] = null;
        }
        DSA.prototype = {
            constructor: DSA,
            packPublic: function() {
                var str = this.type;
                str += HLP.packMPI(this.p);
                str += HLP.packMPI(this.q);
                str += HLP.packMPI(this.g);
                str += HLP.packMPI(this.y);
                return str;
            },
            packPrivate: function() {
                var str = this.packPublic() + HLP.packMPI(this.x);
                str = CryptoJS.enc.Latin1.parse(str);
                return str.toString(CryptoJS.enc.Base64);
            },
            generateNonce: function(m) {
                var priv = HLP.bigInt2bits(BigInt.trim(this.x, 0));
                var rand = HLP.bigInt2bits(BigInt.randBigInt(256));
                var sha256 = CryptoJS.algo.SHA256.create();
                sha256.update(CryptoJS.enc.Latin1.parse(priv));
                sha256.update(m);
                sha256.update(CryptoJS.enc.Latin1.parse(rand));
                var hash = sha256.finalize();
                hash = HLP.bits2bigInt(hash.toString(CryptoJS.enc.Latin1));
                BigInt.rightShift_(hash, 256 - BigInt.bitSize(this.q));
                return HLP.between(hash, ZERO, this.q) ? hash : this.generateNonce(m);
            },
            sign: function(m) {
                m = CryptoJS.enc.Latin1.parse(m);
                var b = BigInt.str2bigInt(m.toString(CryptoJS.enc.Hex), 16);
                var k, r = ZERO, s = ZERO;
                while (BigInt.isZero(s) || BigInt.isZero(r)) {
                    k = this.generateNonce(m);
                    r = BigInt.mod(BigInt.powMod(this.g, k, this.p), this.q);
                    if (BigInt.isZero(r)) continue;
                    s = BigInt.inverseMod(k, this.q);
                    s = BigInt.mult(s, BigInt.add(b, BigInt.mult(this.x, r)));
                    s = BigInt.mod(s, this.q);
                }
                return [ r, s ];
            },
            fingerprint: function() {
                var pk = this.packPublic();
                if (this.type === KEY_TYPE) pk = pk.substring(2);
                pk = CryptoJS.enc.Latin1.parse(pk);
                return CryptoJS.SHA1(pk).toString(CryptoJS.enc.Hex);
            }
        };
        DSA.parsePublic = function(str, priv) {
            var fields = [ "SHORT", "MPI", "MPI", "MPI", "MPI" ];
            if (priv) fields.push("MPI");
            str = HLP.splitype(fields, str);
            var obj = {
                type: str[0],
                p: HLP.readMPI(str[1]),
                q: HLP.readMPI(str[2]),
                g: HLP.readMPI(str[3]),
                y: HLP.readMPI(str[4])
            };
            if (priv) obj.x = HLP.readMPI(str[5]);
            return new DSA(obj);
        };
        function tokenizeStr(str) {
            var start, end;
            start = str.indexOf("(");
            end = str.lastIndexOf(")");
            if (start < 0 || end < 0) throw new Error("Malformed S-Expression");
            str = str.substring(start + 1, end);
            var splt = str.search(/\s/);
            var obj = {
                type: str.substring(0, splt),
                val: []
            };
            str = str.substring(splt + 1, end);
            start = str.indexOf("(");
            if (start < 0) obj.val.push(str); else {
                var i, len, ss, es;
                while (start > -1) {
                    i = start + 1;
                    len = str.length;
                    for (ss = 1, es = 0; i < len && es < ss; i++) {
                        if (str[i] === "(") ss++;
                        if (str[i] === ")") es++;
                    }
                    obj.val.push(tokenizeStr(str.substring(start, ++i)));
                    str = str.substring(++i);
                    start = str.indexOf("(");
                }
            }
            return obj;
        }
        function parseLibotr(obj) {
            if (!obj.type) throw new Error("Parse error.");
            var o, val;
            if (obj.type === "privkeys") {
                o = [];
                obj.val.forEach(function(i) {
                    o.push(parseLibotr(i));
                });
                return o;
            }
            o = {};
            obj.val.forEach(function(i) {
                val = i.val[0];
                if (typeof val === "string") {
                    if (val.indexOf("#") === 0) {
                        val = val.substring(1, val.lastIndexOf("#"));
                        val = BigInt.str2bigInt(val, 16);
                    }
                } else {
                    val = parseLibotr(i);
                }
                o[i.type] = val;
            });
            return o;
        }
        DSA.parsePrivate = function(str, libotr) {
            if (!libotr) {
                str = CryptoJS.enc.Base64.parse(str);
                str = str.toString(CryptoJS.enc.Latin1);
                return DSA.parsePublic(str, true);
            }
            return parseLibotr(tokenizeStr(str))[0]["private-key"].dsa;
        };
        DSA.verify = function(key, m, r, s) {
            if (!HLP.between(r, ZERO, key.q) || !HLP.between(s, ZERO, key.q)) return false;
            var hm = CryptoJS.enc.Latin1.parse(m);
            hm = BigInt.str2bigInt(hm.toString(CryptoJS.enc.Hex), 16);
            var w = BigInt.inverseMod(s, key.q);
            var u1 = BigInt.multMod(hm, w, key.q);
            var u2 = BigInt.multMod(r, w, key.q);
            u1 = BigInt.powMod(key.g, u1, key.p);
            u2 = BigInt.powMod(key.y, u2, key.p);
            var v = BigInt.mod(BigInt.multMod(u1, u2, key.p), key.q);
            return BigInt.equals(v, r);
        };
    }).call(this);
    (function() {
        "use strict";
        var root = this;
        var Parse = {}, CryptoJS, CONST, HLP;
        if (typeof module !== "undefined" && module.exports) {
            module.exports = Parse;
            CryptoJS = require("../vendor/crypto.js");
            CONST = require("./const.js");
            HLP = require("./helpers.js");
        } else {
            root.OTR.Parse = Parse;
            CryptoJS = root.CryptoJS;
            CONST = root.OTR.CONST;
            HLP = root.OTR.HLP;
        }
        var tags = {};
        tags[CONST.WHITESPACE_TAG_V2] = CONST.OTR_VERSION_2;
        tags[CONST.WHITESPACE_TAG_V3] = CONST.OTR_VERSION_3;
        Parse.parseMsg = function(otr, msg) {
            var ver = [];
            var start = msg.indexOf(CONST.OTR_TAG);
            if (!~start) {
                this.initFragment(otr);
                ind = msg.indexOf(CONST.WHITESPACE_TAG);
                if (~ind) {
                    msg = msg.split("");
                    msg.splice(ind, 16);
                    var tag, len = msg.length;
                    for (;ind < len; ) {
                        tag = msg.slice(ind, ind + 8).join("");
                        if (Object.hasOwnProperty.call(tags, tag)) {
                            msg.splice(ind, 8);
                            ver.push(tags[tag]);
                            continue;
                        }
                        ind += 8;
                    }
                    msg = msg.join("");
                }
                return {
                    msg: msg,
                    ver: ver
                };
            }
            var ind = start + CONST.OTR_TAG.length;
            var com = msg[ind];
            if (com === "," || com === "|") {
                return this.msgFragment(otr, msg.substring(ind + 1), com === "|");
            }
            this.initFragment(otr);
            if (~[ "?", "v" ].indexOf(com)) {
                if (msg[ind] === "?") {
                    ver.push(CONST.OTR_VERSION_1);
                    ind += 1;
                }
                var vers = {
                    "2": CONST.OTR_VERSION_2,
                    "3": CONST.OTR_VERSION_3
                };
                var qs = msg.substring(ind + 1);
                var qi = qs.indexOf("?");
                if (qi >= 1) {
                    qs = qs.substring(0, qi).split("");
                    if (msg[ind] === "v") {
                        qs.forEach(function(q) {
                            if (Object.hasOwnProperty.call(vers, q)) ver.push(vers[q]);
                        });
                    }
                }
                return {
                    cls: "query",
                    ver: ver
                };
            }
            if (com === ":") {
                ind += 1;
                var info = msg.substring(ind, ind + 4);
                if (info.length < 4) return {
                    msg: msg
                };
                info = CryptoJS.enc.Base64.parse(info).toString(CryptoJS.enc.Latin1);
                var version = info.substring(0, 2);
                var type = info.substring(2);
                if (!otr["ALLOW_V" + HLP.unpackSHORT(version)]) return {
                    msg: msg
                };
                ind += 4;
                var end = msg.substring(ind).indexOf(".");
                if (!~end) return {
                    msg: msg
                };
                msg = CryptoJS.enc.Base64.parse(msg.substring(ind, ind + end));
                msg = CryptoJS.enc.Latin1.stringify(msg);
                var instance_tags;
                if (version === CONST.OTR_VERSION_3) {
                    instance_tags = msg.substring(0, 8);
                    msg = msg.substring(8);
                }
                var cls;
                if (~[ "", "\n", "", "" ].indexOf(type)) {
                    cls = "ake";
                } else if (type === "") {
                    cls = "data";
                }
                return {
                    version: version,
                    type: type,
                    msg: msg,
                    cls: cls,
                    instance_tags: instance_tags
                };
            }
            if (msg.substring(ind, ind + 7) === " Error:") {
                if (otr.ERROR_START_AKE) {
                    otr.sendQueryMsg();
                }
                return {
                    msg: msg.substring(ind + 7),
                    cls: "error"
                };
            }
            return {
                msg: msg
            };
        };
        Parse.initFragment = function(otr) {
            otr.fragment = {
                s: "",
                j: 0,
                k: 0
            };
        };
        Parse.msgFragment = function(otr, msg, v3) {
            msg = msg.split(",");
            if (v3) {
                var its = msg.shift().split("|");
                var their_it = HLP.packINT(parseInt(its[0], 16));
                var our_it = HLP.packINT(parseInt(its[1], 16));
                if (otr.checkInstanceTags(their_it + our_it)) return;
            }
            if (msg.length < 4 || isNaN(parseInt(msg[0], 10)) || isNaN(parseInt(msg[1], 10))) return;
            var k = parseInt(msg[0], 10);
            var n = parseInt(msg[1], 10);
            msg = msg[2];
            if (n < k || n === 0 || k === 0) {
                this.initFragment(otr);
                return;
            }
            if (k === 1) {
                this.initFragment(otr);
                otr.fragment = {
                    k: 1,
                    n: n,
                    s: msg
                };
            } else if (n === otr.fragment.n && k === otr.fragment.k + 1) {
                otr.fragment.s += msg;
                otr.fragment.k += 1;
            } else {
                this.initFragment(otr);
            }
            if (n === k) {
                msg = otr.fragment.s;
                this.initFragment(otr);
                return this.parseMsg(otr, msg);
            }
            return;
        };
    }).call(this);
    (function() {
        "use strict";
        var root = this;
        var CryptoJS, BigInt, CONST, HLP, DSA;
        if (typeof module !== "undefined" && module.exports) {
            module.exports = AKE;
            CryptoJS = require("../vendor/crypto.js");
            BigInt = require("../vendor/bigint.js");
            CONST = require("./const.js");
            HLP = require("./helpers.js");
            DSA = require("./dsa.js");
        } else {
            root.OTR.AKE = AKE;
            CryptoJS = root.CryptoJS;
            BigInt = root.BigInt;
            CONST = root.OTR.CONST;
            HLP = root.OTR.HLP;
            DSA = root.DSA;
        }
        var N = BigInt.str2bigInt(CONST.N, 16);
        function hMac(gx, gy, pk, kid, m) {
            var pass = CryptoJS.enc.Latin1.parse(m);
            var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, pass);
            hmac.update(CryptoJS.enc.Latin1.parse(HLP.packMPI(gx)));
            hmac.update(CryptoJS.enc.Latin1.parse(HLP.packMPI(gy)));
            hmac.update(CryptoJS.enc.Latin1.parse(pk));
            hmac.update(CryptoJS.enc.Latin1.parse(kid));
            return hmac.finalize().toString(CryptoJS.enc.Latin1);
        }
        function AKE(otr) {
            if (!(this instanceof AKE)) return new AKE(otr);
            this.otr = otr;
            this.our_dh = otr.our_old_dh;
            this.our_keyid = otr.our_keyid - 1;
            this.their_y = null;
            this.their_keyid = null;
            this.their_priv_pk = null;
            this.ssid = null;
            this.transmittedRS = false;
            this.r = null;
            this.priv = otr.priv;
            var self = this;
            [ "sendMsg" ].forEach(function(meth) {
                self[meth] = self[meth].bind(self);
            });
        }
        AKE.prototype = {
            constructor: AKE,
            createKeys: function(g) {
                var s = BigInt.powMod(g, this.our_dh.privateKey, N);
                var secbytes = HLP.packMPI(s);
                this.ssid = HLP.mask(HLP.h2("\x00", secbytes), 0, 64);
                var tmp = HLP.h2("", secbytes);
                this.c = HLP.mask(tmp, 0, 128);
                this.c_prime = HLP.mask(tmp, 128, 128);
                this.m1 = HLP.h2("", secbytes);
                this.m2 = HLP.h2("", secbytes);
                this.m1_prime = HLP.h2("", secbytes);
                this.m2_prime = HLP.h2("", secbytes);
            },
            verifySignMac: function(mac, aesctr, m2, c, their_y, our_dh_pk, m1, ctr) {
                var vmac = HLP.makeMac(aesctr, m2);
                if (!HLP.compare(mac, vmac)) return [ "MACs do not match." ];
                var x = HLP.decryptAes(aesctr.substring(4), c, ctr);
                x = HLP.splitype([ "PUBKEY", "INT", "SIG" ], x.toString(CryptoJS.enc.Latin1));
                var m = hMac(their_y, our_dh_pk, x[0], x[1], m1);
                var pub = DSA.parsePublic(x[0]);
                var r = HLP.bits2bigInt(x[2].substring(0, 20));
                var s = HLP.bits2bigInt(x[2].substring(20));
                if (!DSA.verify(pub, m, r, s)) return [ "Cannot verify signature of m." ];
                return [ null, HLP.readLen(x[1]), pub ];
            },
            makeM: function(their_y, m1, c, m2) {
                var pk = this.priv.packPublic();
                var kid = HLP.packINT(this.our_keyid);
                var m = hMac(this.our_dh.publicKey, their_y, pk, kid, m1);
                m = this.priv.sign(m);
                var msg = pk + kid;
                msg += HLP.bigInt2bits(m[0], 20);
                msg += HLP.bigInt2bits(m[1], 20);
                msg = CryptoJS.enc.Latin1.parse(msg);
                var aesctr = HLP.packData(HLP.encryptAes(msg, c, HLP.packCtr(0)));
                var mac = HLP.makeMac(aesctr, m2);
                return aesctr + mac;
            },
            akeSuccess: function(version) {
                HLP.debug.call(this.otr, "success");
                if (BigInt.equals(this.their_y, this.our_dh.publicKey)) return this.otr.error("equal keys - we have a problem.", true);
                if (this.their_keyid !== this.otr.their_keyid && this.their_keyid !== this.otr.their_keyid - 1) {
                    this.otr.our_old_dh = this.our_dh;
                    this.otr.their_y = this.their_y;
                    this.otr.their_old_y = null;
                    this.otr.their_keyid = this.their_keyid;
                    this.otr.their_priv_pk = this.their_priv_pk;
                    this.otr.sessKeys[0] = [ new this.otr.DHSession(this.otr.our_dh, this.otr.their_y), null ];
                    this.otr.sessKeys[1] = [ new this.otr.DHSession(this.otr.our_old_dh, this.otr.their_y), null ];
                }
                this.otr.ssid = this.ssid;
                this.otr.transmittedRS = this.transmittedRS;
                this.otr_version = version;
                this.otr.authstate = CONST.AUTHSTATE_NONE;
                this.otr.msgstate = CONST.MSGSTATE_ENCRYPTED;
                this.r = null;
                this.myhashed = null;
                this.dhcommit = null;
                this.encrypted = null;
                this.hashed = null;
                this.otr.trigger("status", [ CONST.STATUS_AKE_SUCCESS ]);
                this.otr.sendStored();
            },
            handleAKE: function(msg) {
                var send, vsm, type;
                var version = msg.version;
                switch (msg.type) {
                  case "":
                    HLP.debug.call(this.otr, "d-h key message");
                    msg = HLP.splitype([ "DATA", "DATA" ], msg.msg);
                    if (this.otr.authstate === CONST.AUTHSTATE_AWAITING_DHKEY) {
                        var ourHash = HLP.readMPI(this.myhashed);
                        var theirHash = HLP.readMPI(msg[1]);
                        if (BigInt.greater(ourHash, theirHash)) {
                            type = "";
                            send = this.dhcommit;
                            break;
                        } else {
                            this.our_dh = this.otr.dh();
                            this.otr.authstate = CONST.AUTHSTATE_NONE;
                            this.r = null;
                            this.myhashed = null;
                        }
                    } else if (this.otr.authstate === CONST.AUTHSTATE_AWAITING_SIG) this.our_dh = this.otr.dh();
                    this.otr.authstate = CONST.AUTHSTATE_AWAITING_REVEALSIG;
                    this.encrypted = msg[0].substring(4);
                    this.hashed = msg[1].substring(4);
                    type = "\n";
                    send = HLP.packMPI(this.our_dh.publicKey);
                    break;

                  case "\n":
                    HLP.debug.call(this.otr, "reveal signature message");
                    msg = HLP.splitype([ "MPI" ], msg.msg);
                    if (this.otr.authstate !== CONST.AUTHSTATE_AWAITING_DHKEY) {
                        if (this.otr.authstate === CONST.AUTHSTATE_AWAITING_SIG) {
                            if (!BigInt.equals(this.their_y, HLP.readMPI(msg[0]))) return;
                        } else {
                            return;
                        }
                    }
                    this.otr.authstate = CONST.AUTHSTATE_AWAITING_SIG;
                    this.their_y = HLP.readMPI(msg[0]);
                    if (!HLP.checkGroup(this.their_y, N)) return this.otr.error("Illegal g^y.", true);
                    this.createKeys(this.their_y);
                    type = "";
                    send = HLP.packMPI(this.r);
                    send += this.makeM(this.their_y, this.m1, this.c, this.m2);
                    this.m1 = null;
                    this.m2 = null;
                    this.c = null;
                    break;

                  case "":
                    HLP.debug.call(this.otr, "signature message");
                    if (this.otr.authstate !== CONST.AUTHSTATE_AWAITING_REVEALSIG) return;
                    msg = HLP.splitype([ "DATA", "DATA", "MAC" ], msg.msg);
                    this.r = HLP.readMPI(msg[0]);
                    var key = CryptoJS.enc.Hex.parse(BigInt.bigInt2str(this.r, 16));
                    key = CryptoJS.enc.Latin1.stringify(key);
                    var gxmpi = HLP.decryptAes(this.encrypted, key, HLP.packCtr(0));
                    gxmpi = gxmpi.toString(CryptoJS.enc.Latin1);
                    this.their_y = HLP.readMPI(gxmpi);
                    var hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(gxmpi));
                    if (!HLP.compare(this.hashed, hash.toString(CryptoJS.enc.Latin1))) return this.otr.error("Hashed g^x does not match.", true);
                    if (!HLP.checkGroup(this.their_y, N)) return this.otr.error("Illegal g^x.", true);
                    this.createKeys(this.their_y);
                    vsm = this.verifySignMac(msg[2], msg[1], this.m2, this.c, this.their_y, this.our_dh.publicKey, this.m1, HLP.packCtr(0));
                    if (vsm[0]) return this.otr.error(vsm[0], true);
                    this.their_keyid = vsm[1];
                    this.their_priv_pk = vsm[2];
                    send = this.makeM(this.their_y, this.m1_prime, this.c_prime, this.m2_prime);
                    this.m1 = null;
                    this.m2 = null;
                    this.m1_prime = null;
                    this.m2_prime = null;
                    this.c = null;
                    this.c_prime = null;
                    this.sendMsg(version, "", send);
                    this.akeSuccess(version);
                    return;

                  case "":
                    HLP.debug.call(this.otr, "data message");
                    if (this.otr.authstate !== CONST.AUTHSTATE_AWAITING_SIG) return;
                    msg = HLP.splitype([ "DATA", "MAC" ], msg.msg);
                    vsm = this.verifySignMac(msg[1], msg[0], this.m2_prime, this.c_prime, this.their_y, this.our_dh.publicKey, this.m1_prime, HLP.packCtr(0));
                    if (vsm[0]) return this.otr.error(vsm[0], true);
                    this.their_keyid = vsm[1];
                    this.their_priv_pk = vsm[2];
                    this.m1_prime = null;
                    this.m2_prime = null;
                    this.c_prime = null;
                    this.transmittedRS = true;
                    this.akeSuccess(version);
                    return;

                  default:
                    return;
                }
                this.sendMsg(version, type, send);
            },
            sendMsg: function(version, type, msg) {
                var send = version + type;
                var v3 = version === CONST.OTR_VERSION_3;
                if (v3) {
                    HLP.debug.call(this.otr, "instance tags");
                    send += this.otr.our_instance_tag;
                    send += this.otr.their_instance_tag;
                }
                send += msg;
                send = HLP.wrapMsg(send, this.otr.fragment_size, v3, this.otr.our_instance_tag, this.otr.their_instance_tag);
                if (send[0]) return this.otr.error(send[0]);
                this.otr._sendMsg(send[1], true);
            },
            initiateAKE: function(version) {
                HLP.debug.call(this.otr, "d-h commit message");
                this.otr.trigger("status", [ CONST.STATUS_AKE_INIT ]);
                this.otr.authstate = CONST.AUTHSTATE_AWAITING_DHKEY;
                var gxmpi = HLP.packMPI(this.our_dh.publicKey);
                gxmpi = CryptoJS.enc.Latin1.parse(gxmpi);
                this.r = BigInt.randBigInt(128);
                var key = CryptoJS.enc.Hex.parse(BigInt.bigInt2str(this.r, 16));
                key = CryptoJS.enc.Latin1.stringify(key);
                this.myhashed = CryptoJS.SHA256(gxmpi);
                this.myhashed = HLP.packData(this.myhashed.toString(CryptoJS.enc.Latin1));
                this.dhcommit = HLP.packData(HLP.encryptAes(gxmpi, key, HLP.packCtr(0)));
                this.dhcommit += this.myhashed;
                this.sendMsg(version, "", this.dhcommit);
            }
        };
    }).call(this);
    (function() {
        "use strict";
        var root = this;
        var CryptoJS, BigInt, EventEmitter, CONST, HLP;
        if (typeof module !== "undefined" && module.exports) {
            module.exports = SM;
            CryptoJS = require("../vendor/crypto.js");
            BigInt = require("../vendor/bigint.js");
            EventEmitter = require("../vendor/eventemitter.js");
            CONST = require("./const.js");
            HLP = require("./helpers.js");
        } else {
            root.OTR.SM = SM;
            CryptoJS = root.CryptoJS;
            BigInt = root.BigInt;
            EventEmitter = root.EventEmitter;
            CONST = root.OTR.CONST;
            HLP = root.OTR.HLP;
        }
        var G = BigInt.str2bigInt(CONST.G, 10);
        var N = BigInt.str2bigInt(CONST.N, 16);
        var Q = BigInt.sub(N, BigInt.str2bigInt("1", 10));
        BigInt.divInt_(Q, 2);
        function SM(reqs) {
            if (!(this instanceof SM)) return new SM(reqs);
            this.version = 1;
            this.our_fp = reqs.our_fp;
            this.their_fp = reqs.their_fp;
            this.ssid = reqs.ssid;
            this.debug = !!reqs.debug;
            this.init();
        }
        HLP.extend(SM, EventEmitter);
        SM.prototype.init = function() {
            this.smpstate = CONST.SMPSTATE_EXPECT1;
            this.secret = null;
        };
        SM.prototype.makeSecret = function(our, secret) {
            var sha256 = CryptoJS.algo.SHA256.create();
            sha256.update(CryptoJS.enc.Latin1.parse(HLP.packBytes(this.version, 1)));
            sha256.update(CryptoJS.enc.Hex.parse(our ? this.our_fp : this.their_fp));
            sha256.update(CryptoJS.enc.Hex.parse(our ? this.their_fp : this.our_fp));
            sha256.update(CryptoJS.enc.Latin1.parse(this.ssid));
            sha256.update(CryptoJS.enc.Latin1.parse(secret));
            var hash = sha256.finalize();
            this.secret = HLP.bits2bigInt(hash.toString(CryptoJS.enc.Latin1));
        };
        SM.prototype.makeG2s = function() {
            this.a2 = HLP.randomExponent();
            this.a3 = HLP.randomExponent();
            this.g2a = BigInt.powMod(G, this.a2, N);
            this.g3a = BigInt.powMod(G, this.a3, N);
            if (!HLP.checkGroup(this.g2a, N) || !HLP.checkGroup(this.g3a, N)) this.makeG2s();
        };
        SM.prototype.computeGs = function(g2a, g3a) {
            this.g2 = BigInt.powMod(g2a, this.a2, N);
            this.g3 = BigInt.powMod(g3a, this.a3, N);
        };
        SM.prototype.computePQ = function(r) {
            this.p = BigInt.powMod(this.g3, r, N);
            this.q = HLP.multPowMod(G, r, this.g2, this.secret, N);
        };
        SM.prototype.computeR = function() {
            this.r = BigInt.powMod(this.QoQ, this.a3, N);
        };
        SM.prototype.computeRab = function(r) {
            return BigInt.powMod(r, this.a3, N);
        };
        SM.prototype.computeC = function(v, r) {
            return HLP.smpHash(v, BigInt.powMod(G, r, N));
        };
        SM.prototype.computeD = function(r, a, c) {
            return HLP.subMod(r, BigInt.multMod(a, c, Q), Q);
        };
        SM.prototype.handleSM = function(msg) {
            var send, r2, r3, r7, t1, t2, t3, t4, rab, tmp2, cR, d7, ms, trust;
            var expectStates = {
                2: CONST.SMPSTATE_EXPECT1,
                3: CONST.SMPSTATE_EXPECT2,
                4: CONST.SMPSTATE_EXPECT3,
                5: CONST.SMPSTATE_EXPECT4,
                7: CONST.SMPSTATE_EXPECT1
            };
            if (msg.type === 6) {
                this.init();
                this.trigger("trust", [ false ]);
                return;
            }
            if (this.smpstate !== expectStates[msg.type]) return this.abort();
            switch (this.smpstate) {
              case CONST.SMPSTATE_EXPECT1:
                HLP.debug.call(this, "smp tlv 2");
                var ind, question;
                if (msg.type === 7) {
                    ind = msg.msg.indexOf("\x00");
                    question = msg.msg.substring(0, ind);
                    msg.msg = msg.msg.substring(ind + 1);
                }
                ms = HLP.readLen(msg.msg.substr(0, 4));
                if (ms !== 6) return this.abort();
                msg = HLP.unpackMPIs(6, msg.msg.substring(4));
                if (!HLP.checkGroup(msg[0], N) || !HLP.checkGroup(msg[3], N)) return this.abort();
                if (!HLP.ZKP(1, msg[1], HLP.multPowMod(G, msg[2], msg[0], msg[1], N))) return this.abort();
                if (!HLP.ZKP(2, msg[4], HLP.multPowMod(G, msg[5], msg[3], msg[4], N))) return this.abort();
                this.g3ao = msg[3];
                this.makeG2s();
                r2 = HLP.randomExponent();
                r3 = HLP.randomExponent();
                this.c2 = this.computeC(3, r2);
                this.c3 = this.computeC(4, r3);
                this.d2 = this.computeD(r2, this.a2, this.c2);
                this.d3 = this.computeD(r3, this.a3, this.c3);
                this.computeGs(msg[0], msg[3]);
                this.smpstate = CONST.SMPSTATE_EXPECT0;
                this.trigger("question", [ question ]);
                return;

              case CONST.SMPSTATE_EXPECT2:
                HLP.debug.call(this, "smp tlv 3");
                ms = HLP.readLen(msg.msg.substr(0, 4));
                if (ms !== 11) return this.abort();
                msg = HLP.unpackMPIs(11, msg.msg.substring(4));
                if (!HLP.checkGroup(msg[0], N) || !HLP.checkGroup(msg[3], N) || !HLP.checkGroup(msg[6], N) || !HLP.checkGroup(msg[7], N)) return this.abort();
                if (!HLP.ZKP(3, msg[1], HLP.multPowMod(G, msg[2], msg[0], msg[1], N))) return this.abort();
                if (!HLP.ZKP(4, msg[4], HLP.multPowMod(G, msg[5], msg[3], msg[4], N))) return this.abort();
                this.g3ao = msg[3];
                this.computeGs(msg[0], msg[3]);
                t1 = HLP.multPowMod(this.g3, msg[9], msg[6], msg[8], N);
                t2 = HLP.multPowMod(G, msg[9], this.g2, msg[10], N);
                t2 = BigInt.multMod(t2, BigInt.powMod(msg[7], msg[8], N), N);
                if (!HLP.ZKP(5, msg[8], t1, t2)) return this.abort();
                var r4 = HLP.randomExponent();
                this.computePQ(r4);
                var r5 = HLP.randomExponent();
                var r6 = HLP.randomExponent();
                var tmp = HLP.multPowMod(G, r5, this.g2, r6, N);
                var cP = HLP.smpHash(6, BigInt.powMod(this.g3, r5, N), tmp);
                var d5 = this.computeD(r5, r4, cP);
                var d6 = this.computeD(r6, this.secret, cP);
                this.QoQ = HLP.divMod(this.q, msg[7], N);
                this.PoP = HLP.divMod(this.p, msg[6], N);
                this.computeR();
                r7 = HLP.randomExponent();
                tmp2 = BigInt.powMod(this.QoQ, r7, N);
                cR = HLP.smpHash(7, BigInt.powMod(G, r7, N), tmp2);
                d7 = this.computeD(r7, this.a3, cR);
                this.smpstate = CONST.SMPSTATE_EXPECT4;
                send = HLP.packINT(8) + HLP.packMPIs([ this.p, this.q, cP, d5, d6, this.r, cR, d7 ]);
                send = HLP.packTLV(4, send);
                break;

              case CONST.SMPSTATE_EXPECT3:
                HLP.debug.call(this, "smp tlv 4");
                ms = HLP.readLen(msg.msg.substr(0, 4));
                if (ms !== 8) return this.abort();
                msg = HLP.unpackMPIs(8, msg.msg.substring(4));
                if (!HLP.checkGroup(msg[0], N) || !HLP.checkGroup(msg[1], N) || !HLP.checkGroup(msg[5], N)) return this.abort();
                t1 = HLP.multPowMod(this.g3, msg[3], msg[0], msg[2], N);
                t2 = HLP.multPowMod(G, msg[3], this.g2, msg[4], N);
                t2 = BigInt.multMod(t2, BigInt.powMod(msg[1], msg[2], N), N);
                if (!HLP.ZKP(6, msg[2], t1, t2)) return this.abort();
                t3 = HLP.multPowMod(G, msg[7], this.g3ao, msg[6], N);
                this.QoQ = HLP.divMod(msg[1], this.q, N);
                t4 = HLP.multPowMod(this.QoQ, msg[7], msg[5], msg[6], N);
                if (!HLP.ZKP(7, msg[6], t3, t4)) return this.abort();
                this.computeR();
                r7 = HLP.randomExponent();
                tmp2 = BigInt.powMod(this.QoQ, r7, N);
                cR = HLP.smpHash(8, BigInt.powMod(G, r7, N), tmp2);
                d7 = this.computeD(r7, this.a3, cR);
                send = HLP.packINT(3) + HLP.packMPIs([ this.r, cR, d7 ]);
                send = HLP.packTLV(5, send);
                rab = this.computeRab(msg[5]);
                trust = !!BigInt.equals(rab, HLP.divMod(msg[0], this.p, N));
                this.trigger("trust", [ trust, "answered" ]);
                this.init();
                break;

              case CONST.SMPSTATE_EXPECT4:
                HLP.debug.call(this, "smp tlv 5");
                ms = HLP.readLen(msg.msg.substr(0, 4));
                if (ms !== 3) return this.abort();
                msg = HLP.unpackMPIs(3, msg.msg.substring(4));
                if (!HLP.checkGroup(msg[0], N)) return this.abort();
                t3 = HLP.multPowMod(G, msg[2], this.g3ao, msg[1], N);
                t4 = HLP.multPowMod(this.QoQ, msg[2], msg[0], msg[1], N);
                if (!HLP.ZKP(8, msg[1], t3, t4)) return this.abort();
                rab = this.computeRab(msg[0]);
                trust = !!BigInt.equals(rab, this.PoP);
                this.trigger("trust", [ trust, "asked" ]);
                this.init();
                return;
            }
            this.sendMsg(send);
        };
        SM.prototype.sendMsg = function(send) {
            this.trigger("send", [ this.ssid, "\x00" + send ]);
        };
        SM.prototype.rcvSecret = function(secret, question) {
            HLP.debug.call(this, "receive secret");
            var fn, our = false;
            if (this.smpstate === CONST.SMPSTATE_EXPECT0) {
                fn = this.answer;
            } else {
                fn = this.initiate;
                our = true;
            }
            this.makeSecret(our, secret);
            fn.call(this, question);
        };
        SM.prototype.answer = function() {
            HLP.debug.call(this, "smp answer");
            var r4 = HLP.randomExponent();
            this.computePQ(r4);
            var r5 = HLP.randomExponent();
            var r6 = HLP.randomExponent();
            var tmp = HLP.multPowMod(G, r5, this.g2, r6, N);
            var cP = HLP.smpHash(5, BigInt.powMod(this.g3, r5, N), tmp);
            var d5 = this.computeD(r5, r4, cP);
            var d6 = this.computeD(r6, this.secret, cP);
            this.smpstate = CONST.SMPSTATE_EXPECT3;
            var send = HLP.packINT(11) + HLP.packMPIs([ this.g2a, this.c2, this.d2, this.g3a, this.c3, this.d3, this.p, this.q, cP, d5, d6 ]);
            this.sendMsg(HLP.packTLV(3, send));
        };
        SM.prototype.initiate = function(question) {
            HLP.debug.call(this, "smp initiate");
            if (this.smpstate !== CONST.SMPSTATE_EXPECT1) this.abort();
            this.makeG2s();
            var r2 = HLP.randomExponent();
            var r3 = HLP.randomExponent();
            this.c2 = this.computeC(1, r2);
            this.c3 = this.computeC(2, r3);
            this.d2 = this.computeD(r2, this.a2, this.c2);
            this.d3 = this.computeD(r3, this.a3, this.c3);
            this.smpstate = CONST.SMPSTATE_EXPECT2;
            var send = "";
            var type = 2;
            if (question) {
                send += question;
                send += "\x00";
                type = 7;
            }
            send += HLP.packINT(6) + HLP.packMPIs([ this.g2a, this.c2, this.d2, this.g3a, this.c3, this.d3 ]);
            this.sendMsg(HLP.packTLV(type, send));
        };
        SM.prototype.abort = function() {
            this.init();
            this.sendMsg(HLP.packTLV(6, ""));
            this.trigger("abort");
        };
    }).call(this);
    (function() {
        "use strict";
        var root = this;
        var CryptoJS, BigInt, EventEmitter, Worker, SMWPath, CONST, HLP, Parse, AKE, SM, DSA;
        if (typeof module !== "undefined" && module.exports) {
            module.exports = OTR;
            CryptoJS = require("../vendor/crypto.js");
            BigInt = require("../vendor/bigint.js");
            EventEmitter = require("../vendor/eventemitter.js");
            Worker = require("webworker-threads").Worker;
            SMWPath = require("path").join(__dirname, "/sm-webworker.js");
            CONST = require("./const.js");
            HLP = require("./helpers.js");
            Parse = require("./parse.js");
            AKE = require("./ake.js");
            SM = require("./sm.js");
            DSA = require("./dsa.js");
            OTR.CONST = CONST;
        } else {
            Object.keys(root.OTR).forEach(function(k) {
                OTR[k] = root.OTR[k];
            });
            root.OTR = OTR;
            CryptoJS = root.CryptoJS;
            BigInt = root.BigInt;
            EventEmitter = root.EventEmitter;
            Worker = root.Worker;
            SMWPath = "sm-webworker.js";
            CONST = OTR.CONST;
            HLP = OTR.HLP;
            Parse = OTR.Parse;
            AKE = OTR.AKE;
            SM = OTR.SM;
            DSA = root.DSA;
        }
        var G = BigInt.str2bigInt(CONST.G, 10);
        var N = BigInt.str2bigInt(CONST.N, 16);
        var MAX_INT = Math.pow(2, 53) - 1;
        var MAX_UINT = Math.pow(2, 31) - 1;
        function OTR(options) {
            if (!(this instanceof OTR)) return new OTR(options);
            options = options || {};
            if (options.priv && !(options.priv instanceof DSA)) throw new Error("Requires long-lived DSA key.");
            this.priv = options.priv ? options.priv : new DSA();
            this.fragment_size = options.fragment_size || 0;
            if (this.fragment_size < 0) throw new Error("Fragment size must be a positive integer.");
            this.send_interval = options.send_interval || 0;
            if (this.send_interval < 0) throw new Error("Send interval must be a positive integer.");
            this.outgoing = [];
            this.our_instance_tag = options.instance_tag || OTR.makeInstanceTag();
            this.debug = !!options.debug;
            this.smw = options.smw;
            this.init();
            var self = this;
            [ "sendMsg", "receiveMsg" ].forEach(function(meth) {
                self[meth] = self[meth].bind(self);
            });
            EventEmitter.call(this);
        }
        HLP.extend(OTR, EventEmitter);
        OTR.prototype.init = function() {
            this.msgstate = CONST.MSGSTATE_PLAINTEXT;
            this.authstate = CONST.AUTHSTATE_NONE;
            this.ALLOW_V2 = true;
            this.ALLOW_V3 = true;
            this.REQUIRE_ENCRYPTION = false;
            this.SEND_WHITESPACE_TAG = false;
            this.WHITESPACE_START_AKE = false;
            this.ERROR_START_AKE = false;
            Parse.initFragment(this);
            this.their_y = null;
            this.their_old_y = null;
            this.their_keyid = 0;
            this.their_priv_pk = null;
            this.their_instance_tag = "\x00\x00\x00\x00";
            this.our_dh = this.dh();
            this.our_old_dh = this.dh();
            this.our_keyid = 2;
            this.sessKeys = [ new Array(2), new Array(2) ];
            this.storedMgs = [];
            this.oldMacKeys = [];
            this.sm = null;
            this._akeInit();
            this.receivedPlaintext = false;
        };
        OTR.prototype._akeInit = function() {
            this.ake = new AKE(this);
            this.transmittedRS = false;
            this.ssid = null;
        };
        OTR.prototype._SMW = function(otr, reqs) {
            this.otr = otr;
            var opts = {
                path: SMWPath,
                seed: BigInt.getSeed
            };
            if (typeof otr.smw === "object") Object.keys(otr.smw).forEach(function(k) {
                opts[k] = otr.smw[k];
            });
            this.worker = new Worker(opts.path);
            var self = this;
            this.worker.onmessage = function(e) {
                var d = e.data;
                if (!d) return;
                self.trigger(d.method, d.args);
            };
            this.worker.postMessage({
                type: "seed",
                seed: opts.seed(),
                imports: opts.imports
            });
            this.worker.postMessage({
                type: "init",
                reqs: reqs
            });
        };
        HLP.extend(OTR.prototype._SMW, EventEmitter);
        [ "handleSM", "rcvSecret", "abort" ].forEach(function(m) {
            OTR.prototype._SMW.prototype[m] = function() {
                this.worker.postMessage({
                    type: "method",
                    method: m,
                    args: Array.prototype.slice.call(arguments, 0)
                });
            };
        });
        OTR.prototype._smInit = function() {
            var reqs = {
                ssid: this.ssid,
                our_fp: this.priv.fingerprint(),
                their_fp: this.their_priv_pk.fingerprint(),
                debug: this.debug
            };
            if (this.smw) {
                if (this.sm) this.sm.worker.terminate();
                this.sm = new this._SMW(this, reqs);
            } else {
                this.sm = new SM(reqs);
            }
            var self = this;
            [ "trust", "abort", "question" ].forEach(function(e) {
                self.sm.on(e, function() {
                    self.trigger("smp", [ e ].concat(Array.prototype.slice.call(arguments)));
                });
            });
            this.sm.on("send", function(ssid, send) {
                if (self.ssid === ssid) self._sendMsg(send);
            });
        };
        OTR.prototype.io = function(msg) {
            this.outgoing = this.outgoing.concat(msg);
            var self = this;
            (function send(first) {
                if (!first) {
                    if (!self.outgoing.length) return;
                    var msg = self.outgoing.shift();
                    self.trigger("io", [ msg ]);
                }
                setTimeout(send, first ? 0 : self.send_interval);
            })(true);
        };
        OTR.prototype.dh = function dh() {
            var keys = {
                privateKey: BigInt.randBigInt(320)
            };
            keys.publicKey = BigInt.powMod(G, keys.privateKey, N);
            return keys;
        };
        OTR.prototype.DHSession = function DHSession(our_dh, their_y) {
            if (!(this instanceof DHSession)) return new DHSession(our_dh, their_y);
            var s = BigInt.powMod(their_y, our_dh.privateKey, N);
            var secbytes = HLP.packMPI(s);
            this.id = HLP.mask(HLP.h2("\x00", secbytes), 0, 64);
            var sq = BigInt.greater(our_dh.publicKey, their_y);
            var sendbyte = sq ? "" : "";
            var rcvbyte = sq ? "" : "";
            this.sendenc = HLP.mask(HLP.h1(sendbyte, secbytes), 0, 128);
            this.sendmac = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(this.sendenc));
            this.sendmac = this.sendmac.toString(CryptoJS.enc.Latin1);
            this.sendmacused = false;
            this.rcvenc = HLP.mask(HLP.h1(rcvbyte, secbytes), 0, 128);
            this.rcvmac = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(this.rcvenc));
            this.rcvmac = this.rcvmac.toString(CryptoJS.enc.Latin1);
            this.rcvmacused = false;
            this.extra_symkey = HLP.h2("ÿ", secbytes);
            this.send_counter = 0;
            this.rcv_counter = 0;
        };
        OTR.prototype.rotateOurKeys = function() {
            var self = this;
            this.sessKeys[1].forEach(function(sk) {
                if (sk && sk.sendmacused) self.oldMacKeys.push(sk.sendmac);
                if (sk && sk.rcvmacused) self.oldMacKeys.push(sk.rcvmac);
            });
            this.our_old_dh = this.our_dh;
            this.our_dh = this.dh();
            this.our_keyid += 1;
            this.sessKeys[1][0] = this.sessKeys[0][0];
            this.sessKeys[1][1] = this.sessKeys[0][1];
            this.sessKeys[0] = [ this.their_y ? new this.DHSession(this.our_dh, this.their_y) : null, this.their_old_y ? new this.DHSession(this.our_dh, this.their_old_y) : null ];
        };
        OTR.prototype.rotateTheirKeys = function(their_y) {
            this.their_keyid += 1;
            var self = this;
            this.sessKeys.forEach(function(sk) {
                if (sk[1] && sk[1].sendmacused) self.oldMacKeys.push(sk[1].sendmac);
                if (sk[1] && sk[1].rcvmacused) self.oldMacKeys.push(sk[1].rcvmac);
            });
            this.their_old_y = this.their_y;
            this.sessKeys[0][1] = this.sessKeys[0][0];
            this.sessKeys[1][1] = this.sessKeys[1][0];
            this.their_y = their_y;
            this.sessKeys[0][0] = new this.DHSession(this.our_dh, this.their_y);
            this.sessKeys[1][0] = new this.DHSession(this.our_old_dh, this.their_y);
        };
        OTR.prototype.prepareMsg = function(msg, esk) {
            if (this.msgstate !== CONST.MSGSTATE_ENCRYPTED || this.their_keyid === 0) return this.error("Not ready to encrypt.");
            var sessKeys = this.sessKeys[1][0];
            if (sessKeys.send_counter >= MAX_INT) return this.error("Should have rekeyed by now.");
            sessKeys.send_counter += 1;
            var ctr = HLP.packCtr(sessKeys.send_counter);
            var send = this.ake.otr_version + "";
            var v3 = this.ake.otr_version === CONST.OTR_VERSION_3;
            if (v3) {
                send += this.our_instance_tag;
                send += this.their_instance_tag;
            }
            send += "\x00";
            send += HLP.packINT(this.our_keyid - 1);
            send += HLP.packINT(this.their_keyid);
            send += HLP.packMPI(this.our_dh.publicKey);
            send += ctr.substring(0, 8);
            if (Math.ceil(msg.length / 8) >= MAX_UINT) return this.error("Message is too long.");
            var aes = HLP.encryptAes(CryptoJS.enc.Latin1.parse(msg), sessKeys.sendenc, ctr);
            send += HLP.packData(aes);
            send += HLP.make1Mac(send, sessKeys.sendmac);
            send += HLP.packData(this.oldMacKeys.splice(0).join(""));
            sessKeys.sendmacused = true;
            send = HLP.wrapMsg(send, this.fragment_size, v3, this.our_instance_tag, this.their_instance_tag);
            if (send[0]) return this.error(send[0]);
            if (esk) this.trigger("file", [ "send", sessKeys.extra_symkey, esk ]);
            return send[1];
        };
        OTR.prototype.handleDataMsg = function(msg) {
            var vt = msg.version + msg.type;
            if (this.ake.otr_version === CONST.OTR_VERSION_3) vt += msg.instance_tags;
            var types = [ "BYTE", "INT", "INT", "MPI", "CTR", "DATA", "MAC", "DATA" ];
            msg = HLP.splitype(types, msg.msg);
            var ign = msg[0] === "";
            if (this.msgstate !== CONST.MSGSTATE_ENCRYPTED || msg.length !== 8) {
                if (!ign) this.error("Received an unreadable encrypted message.", true);
                return;
            }
            var our_keyid = this.our_keyid - HLP.readLen(msg[2]);
            var their_keyid = this.their_keyid - HLP.readLen(msg[1]);
            if (our_keyid < 0 || our_keyid > 1) {
                if (!ign) this.error("Not of our latest keys.", true);
                return;
            }
            if (their_keyid < 0 || their_keyid > 1) {
                if (!ign) this.error("Not of your latest keys.", true);
                return;
            }
            var their_y = their_keyid ? this.their_old_y : this.their_y;
            if (their_keyid === 1 && !their_y) {
                if (!ign) this.error("Do not have that key.");
                return;
            }
            var sessKeys = this.sessKeys[our_keyid][their_keyid];
            var ctr = HLP.unpackCtr(msg[4]);
            if (ctr <= sessKeys.rcv_counter) {
                if (!ign) this.error("Counter in message is not larger.");
                return;
            }
            sessKeys.rcv_counter = ctr;
            vt += msg.slice(0, 6).join("");
            var vmac = HLP.make1Mac(vt, sessKeys.rcvmac);
            if (!HLP.compare(msg[6], vmac)) {
                if (!ign) this.error("MACs do not match.");
                return;
            }
            sessKeys.rcvmacused = true;
            var out = HLP.decryptAes(msg[5].substring(4), sessKeys.rcvenc, HLP.padCtr(msg[4]));
            out = out.toString(CryptoJS.enc.Latin1);
            if (!our_keyid) this.rotateOurKeys();
            if (!their_keyid) this.rotateTheirKeys(HLP.readMPI(msg[3]));
            var ind = out.indexOf("\x00");
            if (~ind) {
                this.handleTLVs(out.substring(ind + 1), sessKeys);
                out = out.substring(0, ind);
            }
            out = CryptoJS.enc.Latin1.parse(out);
            return out.toString(CryptoJS.enc.Utf8);
        };
        OTR.prototype.handleTLVs = function(tlvs, sessKeys) {
            var type, len, msg;
            for (;tlvs.length; ) {
                type = HLP.unpackSHORT(tlvs.substr(0, 2));
                len = HLP.unpackSHORT(tlvs.substr(2, 2));
                msg = tlvs.substr(4, len);
                if (msg.length < len) break;
                switch (type) {
                  case 1:
                    this.msgstate = CONST.MSGSTATE_FINISHED;
                    this.trigger("status", [ CONST.STATUS_END_OTR ]);
                    break;

                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    if (this.msgstate !== CONST.MSGSTATE_ENCRYPTED) {
                        if (this.sm) this.sm.abort();
                        return;
                    }
                    if (!this.sm) this._smInit();
                    this.sm.handleSM({
                        msg: msg,
                        type: type
                    });
                    break;

                  case 8:
                    msg = msg.substring(4);
                    msg = CryptoJS.enc.Latin1.parse(msg);
                    msg = msg.toString(CryptoJS.enc.Utf8);
                    this.trigger("file", [ "receive", sessKeys.extra_symkey, msg ]);
                    break;
                }
                tlvs = tlvs.substring(4 + len);
            }
        };
        OTR.prototype.smpSecret = function(secret, question) {
            if (this.msgstate !== CONST.MSGSTATE_ENCRYPTED) return this.error("Must be encrypted for SMP.");
            if (typeof secret !== "string" || secret.length < 1) return this.error("Secret is required.");
            if (!this.sm) this._smInit();
            this.sm.rcvSecret(secret, question);
        };
        OTR.prototype.sendQueryMsg = function() {
            var versions = {}, msg = CONST.OTR_TAG;
            if (this.ALLOW_V2) versions["2"] = true;
            if (this.ALLOW_V3) versions["3"] = true;
            var vs = Object.keys(versions);
            if (vs.length) {
                msg += "v";
                vs.forEach(function(v) {
                    if (v !== "1") msg += v;
                });
                msg += "?";
            }
            this._sendMsg(msg, true);
            this.trigger("status", [ CONST.STATUS_SEND_QUERY ]);
        };
        OTR.prototype.sendMsg = function(msg) {
            if (this.REQUIRE_ENCRYPTION || this.msgstate !== CONST.MSGSTATE_PLAINTEXT) {
                msg = CryptoJS.enc.Utf8.parse(msg);
                msg = msg.toString(CryptoJS.enc.Latin1);
            }
            this._sendMsg(msg);
        };
        OTR.prototype._sendMsg = function(msg, internal) {
            if (!internal) {
                switch (this.msgstate) {
                  case CONST.MSGSTATE_PLAINTEXT:
                    if (this.REQUIRE_ENCRYPTION) {
                        this.storedMgs.push(msg);
                        this.sendQueryMsg();
                        return;
                    }
                    if (this.SEND_WHITESPACE_TAG && !this.receivedPlaintext) {
                        msg += CONST.WHITESPACE_TAG;
                        if (this.ALLOW_V3) msg += CONST.WHITESPACE_TAG_V3;
                        if (this.ALLOW_V2) msg += CONST.WHITESPACE_TAG_V2;
                    }
                    break;

                  case CONST.MSGSTATE_FINISHED:
                    this.storedMgs.push(msg);
                    this.error("Message cannot be sent at this time.");
                    return;

                  default:
                    msg = this.prepareMsg(msg);
                }
            }
            if (msg) this.io(msg);
        };
        OTR.prototype.receiveMsg = function(msg) {
            msg = Parse.parseMsg(this, msg);
            if (!msg) return;
            switch (msg.cls) {
              case "error":
                this.error(msg.msg);
                return;

              case "ake":
                if (msg.version === CONST.OTR_VERSION_3 && this.checkInstanceTags(msg.instance_tags)) return;
                this.ake.handleAKE(msg);
                return;

              case "data":
                if (msg.version === CONST.OTR_VERSION_3 && this.checkInstanceTags(msg.instance_tags)) return;
                msg.msg = this.handleDataMsg(msg);
                msg.encrypted = true;
                break;

              case "query":
                if (this.msgstate === CONST.MSGSTATE_ENCRYPTED) this._akeInit();
                this.doAKE(msg);
                break;

              default:
                if (this.REQUIRE_ENCRYPTION || this.msgstate !== CONST.MSGSTATE_PLAINTEXT) this.error("Received an unencrypted message.");
                this.receivedPlaintext = true;
                if (this.WHITESPACE_START_AKE && msg.ver.length > 0) this.doAKE(msg);
            }
            if (msg.msg) this.trigger("ui", [ msg.msg, msg.encrypted ]);
        };
        OTR.prototype.checkInstanceTags = function(it) {
            var their_it = HLP.readLen(it.substr(0, 4));
            var our_it = HLP.readLen(it.substr(4, 4));
            if (our_it && our_it !== HLP.readLen(this.our_instance_tag)) return true;
            if (HLP.readLen(this.their_instance_tag)) {
                if (HLP.readLen(this.their_instance_tag) !== their_it) return true;
            } else {
                if (their_it < 100) return true;
                this.their_instance_tag = HLP.packINT(their_it);
            }
        };
        OTR.prototype.doAKE = function(msg) {
            if (this.ALLOW_V3 && ~msg.ver.indexOf(CONST.OTR_VERSION_3)) {
                this.ake.initiateAKE(CONST.OTR_VERSION_3);
            } else if (this.ALLOW_V2 && ~msg.ver.indexOf(CONST.OTR_VERSION_2)) {
                this.ake.initiateAKE(CONST.OTR_VERSION_2);
            } else {
                this.error("OTR conversation requested, " + "but no compatible protocol version found.");
            }
        };
        OTR.prototype.error = function(err, send) {
            if (send) {
                if (!this.debug) err = "An OTR error has occurred.";
                err = "?OTR Error:" + err;
                this._sendMsg(err, true);
                return;
            }
            this.trigger("error", [ err ]);
        };
        OTR.prototype.sendStored = function() {
            var self = this;
            this.storedMgs.splice(0).forEach(function(msg) {
                self._sendMsg(msg);
            });
        };
        OTR.prototype.sendFile = function(filename) {
            if (this.msgstate !== CONST.MSGSTATE_ENCRYPTED) return this.error("Not ready to encrypt.");
            if (this.ake.otr_version !== CONST.OTR_VERSION_3) return this.error("Protocol v3 required.");
            if (!filename) return this.error("Please specify a filename.");
            var l1name = CryptoJS.enc.Utf8.parse(filename);
            l1name = l1name.toString(CryptoJS.enc.Latin1);
            if (l1name.length >= 65532) return this.error("filename is too long.");
            var msg = "\x00";
            msg += "\x00\b";
            msg += HLP.packSHORT(4 + l1name.length);
            msg += "\x00\x00\x00";
            msg += l1name;
            msg = this.prepareMsg(msg, filename);
            if (msg) this._sendMsg(msg, true);
        };
        OTR.prototype.endOtr = function() {
            if (this.msgstate === CONST.MSGSTATE_ENCRYPTED) {
                this.sendMsg("\x00\x00\x00\x00");
                if (this.sm) {
                    if (this.smw) this.sm.worker.terminate();
                    this.sm = null;
                }
            }
            this.msgstate = CONST.MSGSTATE_PLAINTEXT;
            this.receivedPlaintext = false;
            this.trigger("status", [ CONST.STATUS_END_OTR ]);
        };
        OTR.makeInstanceTag = function() {
            var num = BigInt.randBigInt(32);
            if (BigInt.greater(BigInt.str2bigInt("100", 16), num)) return OTR.makeInstanceTag();
            return HLP.packINT(parseInt(BigInt.bigInt2str(num, 10), 10));
        };
    }).call(this);
    return {
        OTR: this.OTR,
        DSA: this.DSA
    };
});

var Base64 = function() {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var obj = {
        encode: function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            } while (i < input.length);
            return output;
        },
        decode: function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            } while (i < input.length);
            return output;
        }
    };
    return obj;
}();

var hexcase = 0;

var b64pad = "=";

var chrsz = 8;

function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}

function b64_sha1(s) {
    return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}

function str_sha1(s) {
    return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}

function hex_hmac_sha1(key, data) {
    return binb2hex(core_hmac_sha1(key, data));
}

function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
}

function str_hmac_sha1(key, data) {
    return binb2str(core_hmac_sha1(key, data));
}

function sha1_vm_test() {
    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

function core_sha1(x, len) {
    x[len >> 5] |= 128 << 24 - len % 32;
    x[(len + 64 >> 9 << 4) + 15] = len;
    var w = new Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    var i, j, t, olda, oldb, oldc, oldd, olde;
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        olde = e;
        for (j = 0; j < 80; j++) {
            if (j < 16) {
                w[j] = x[i + j];
            } else {
                w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            }
            t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return [ a, b, c, d, e ];
}

function sha1_ft(t, b, c, d) {
    if (t < 20) {
        return b & c | ~b & d;
    }
    if (t < 40) {
        return b ^ c ^ d;
    }
    if (t < 60) {
        return b & c | b & d | c & d;
    }
    return b ^ c ^ d;
}

function sha1_kt(t) {
    return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
}

function core_hmac_sha1(key, data) {
    var bkey = str2binb(key);
    if (bkey.length > 16) {
        bkey = core_sha1(bkey, key.length * chrsz);
    }
    var ipad = new Array(16), opad = new Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 909522486;
        opad[i] = bkey[i] ^ 1549556828;
    }
    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160);
}

function safe_add(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
}

function rol(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}

function str2binb(str) {
    var bin = [];
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 32 - chrsz - i % 32;
    }
    return bin;
}

function binb2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz) {
        str += String.fromCharCode(bin[i >> 5] >>> 32 - chrsz - i % 32 & mask);
    }
    return str;
}

function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 15);
    }
    return str;
}

function binb2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    var triplet, j;
    for (var i = 0; i < binarray.length * 4; i += 3) {
        triplet = (binarray[i >> 2] >> 8 * (3 - i % 4) & 255) << 16 | (binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 255) << 8 | binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 255;
        for (j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) {
                str += b64pad;
            } else {
                str += tab.charAt(triplet >> 6 * (3 - j) & 63);
            }
        }
    }
    return str;
}

var MD5 = function() {
    var hexcase = 0;
    var b64pad = "";
    var chrsz = 8;
    var safe_add = function(x, y) {
        var lsw = (x & 65535) + (y & 65535);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 65535;
    };
    var bit_rol = function(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
    };
    var str2binl = function(str) {
        var bin = [];
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
        }
        return bin;
    };
    var binl2str = function(bin) {
        var str = "";
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < bin.length * 32; i += chrsz) {
            str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
        }
        return str;
    };
    var binl2hex = function(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 15);
        }
        return str;
    };
    var binl2b64 = function(binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        var triplet, j;
        for (var i = 0; i < binarray.length * 4; i += 3) {
            triplet = (binarray[i >> 2] >> 8 * (i % 4) & 255) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 255) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 255;
            for (j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > binarray.length * 32) {
                    str += b64pad;
                } else {
                    str += tab.charAt(triplet >> 6 * (3 - j) & 63);
                }
            }
        }
        return str;
    };
    var md5_cmn = function(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    };
    var md5_ff = function(a, b, c, d, x, s, t) {
        return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    };
    var md5_gg = function(a, b, c, d, x, s, t) {
        return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    };
    var md5_hh = function(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    var md5_ii = function(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    };
    var core_md5 = function(x, len) {
        x[len >> 5] |= 128 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var olda, oldb, oldc, oldd;
        for (var i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [ a, b, c, d ];
    };
    var core_hmac_md5 = function(key, data) {
        var bkey = str2binl(key);
        if (bkey.length > 16) {
            bkey = core_md5(bkey, key.length * chrsz);
        }
        var ipad = new Array(16), opad = new Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 909522486;
            opad[i] = bkey[i] ^ 1549556828;
        }
        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
        return core_md5(opad.concat(hash), 512 + 128);
    };
    var obj = {
        hexdigest: function(s) {
            return binl2hex(core_md5(str2binl(s), s.length * chrsz));
        },
        b64digest: function(s) {
            return binl2b64(core_md5(str2binl(s), s.length * chrsz));
        },
        hash: function(s) {
            return binl2str(core_md5(str2binl(s), s.length * chrsz));
        },
        hmac_hexdigest: function(key, data) {
            return binl2hex(core_hmac_md5(key, data));
        },
        hmac_b64digest: function(key, data) {
            return binl2b64(core_hmac_md5(key, data));
        },
        hmac_hash: function(key, data) {
            return binl2str(core_hmac_md5(key, data));
        },
        test: function() {
            return MD5.hexdigest("abc") === "900150983cd24fb0d6963f7d28e17f72";
        }
    };
    return obj;
}();

if (!Function.prototype.bind) {
    Function.prototype.bind = function(obj) {
        var func = this;
        var _slice = Array.prototype.slice;
        var _concat = Array.prototype.concat;
        var _args = _slice.call(arguments, 1);
        return function() {
            return func.apply(obj ? obj : this, _concat.call(_args, _slice.call(arguments, 0)));
        };
    };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
        var len = this.length;
        var from = Number(arguments[1]) || 0;
        from = from < 0 ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
        }
        for (;from < len; from++) {
            if (from in this && this[from] === elt) {
                return from;
            }
        }
        return -1;
    };
}

(function(callback) {
    var Strophe;
    function $build(name, attrs) {
        return new Strophe.Builder(name, attrs);
    }
    function $msg(attrs) {
        return new Strophe.Builder("message", attrs);
    }
    function $iq(attrs) {
        return new Strophe.Builder("iq", attrs);
    }
    function $pres(attrs) {
        return new Strophe.Builder("presence", attrs);
    }
    Strophe = {
        VERSION: "9b3af57",
        NS: {
            HTTPBIND: "http://jabber.org/protocol/httpbind",
            BOSH: "urn:xmpp:xbosh",
            CLIENT: "jabber:client",
            AUTH: "jabber:iq:auth",
            ROSTER: "jabber:iq:roster",
            PROFILE: "jabber:iq:profile",
            DISCO_INFO: "http://jabber.org/protocol/disco#info",
            DISCO_ITEMS: "http://jabber.org/protocol/disco#items",
            MUC: "http://jabber.org/protocol/muc",
            SASL: "urn:ietf:params:xml:ns:xmpp-sasl",
            STREAM: "http://etherx.jabber.org/streams",
            BIND: "urn:ietf:params:xml:ns:xmpp-bind",
            SESSION: "urn:ietf:params:xml:ns:xmpp-session",
            VERSION: "jabber:iq:version",
            STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas",
            XHTML_IM: "http://jabber.org/protocol/xhtml-im",
            XHTML: "http://www.w3.org/1999/xhtml"
        },
        XHTML: {
            tags: [ "a", "blockquote", "br", "cite", "em", "img", "li", "ol", "p", "span", "strong", "ul", "body" ],
            attributes: {
                a: [ "href" ],
                blockquote: [ "style" ],
                br: [],
                cite: [ "style" ],
                em: [],
                img: [ "src", "alt", "style", "height", "width" ],
                li: [ "style" ],
                ol: [ "style" ],
                p: [ "style" ],
                span: [ "style" ],
                strong: [],
                ul: [ "style" ],
                body: []
            },
            css: [ "background-color", "color", "font-family", "font-size", "font-style", "font-weight", "margin-left", "margin-right", "text-align", "text-decoration" ],
            validTag: function(tag) {
                for (var i = 0; i < Strophe.XHTML.tags.length; i++) {
                    if (tag == Strophe.XHTML.tags[i]) {
                        return true;
                    }
                }
                return false;
            },
            validAttribute: function(tag, attribute) {
                if (typeof Strophe.XHTML.attributes[tag] !== "undefined" && Strophe.XHTML.attributes[tag].length > 0) {
                    for (var i = 0; i < Strophe.XHTML.attributes[tag].length; i++) {
                        if (attribute == Strophe.XHTML.attributes[tag][i]) {
                            return true;
                        }
                    }
                }
                return false;
            },
            validCSS: function(style) {
                for (var i = 0; i < Strophe.XHTML.css.length; i++) {
                    if (style == Strophe.XHTML.css[i]) {
                        return true;
                    }
                }
                return false;
            }
        },
        addNamespace: function(name, value) {
            Strophe.NS[name] = value;
        },
        Status: {
            ERROR: 0,
            CONNECTING: 1,
            CONNFAIL: 2,
            AUTHENTICATING: 3,
            AUTHFAIL: 4,
            CONNECTED: 5,
            DISCONNECTED: 6,
            DISCONNECTING: 7,
            ATTACHED: 8
        },
        LogLevel: {
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            FATAL: 4
        },
        ElementType: {
            NORMAL: 1,
            TEXT: 3,
            CDATA: 4,
            FRAGMENT: 11
        },
        TIMEOUT: 1.1,
        SECONDARY_TIMEOUT: .1,
        forEachChild: function(elem, elemName, func) {
            var i, childNode;
            for (i = 0; i < elem.childNodes.length; i++) {
                childNode = elem.childNodes[i];
                if (childNode.nodeType == Strophe.ElementType.NORMAL && (!elemName || this.isTagEqual(childNode, elemName))) {
                    func(childNode);
                }
            }
        },
        isTagEqual: function(el, name) {
            return el.tagName.toLowerCase() == name.toLowerCase();
        },
        _xmlGenerator: null,
        _makeGenerator: function() {
            var doc;
            if (document.implementation.createDocument === undefined || document.implementation.createDocument && document.documentMode && document.documentMode < 10) {
                doc = this._getIEXmlDom();
                doc.appendChild(doc.createElement("strophe"));
            } else {
                doc = document.implementation.createDocument("jabber:client", "strophe", null);
            }
            return doc;
        },
        xmlGenerator: function() {
            if (!Strophe._xmlGenerator) {
                Strophe._xmlGenerator = Strophe._makeGenerator();
            }
            return Strophe._xmlGenerator;
        },
        _getIEXmlDom: function() {
            var doc = null;
            var docStrings = [ "Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM" ];
            for (var d = 0; d < docStrings.length; d++) {
                if (doc === null) {
                    try {
                        doc = new ActiveXObject(docStrings[d]);
                    } catch (e) {
                        doc = null;
                    }
                } else {
                    break;
                }
            }
            return doc;
        },
        xmlElement: function(name) {
            if (!name) {
                return null;
            }
            var node = Strophe.xmlGenerator().createElement(name);
            var a, i, k;
            for (a = 1; a < arguments.length; a++) {
                if (!arguments[a]) {
                    continue;
                }
                if (typeof arguments[a] == "string" || typeof arguments[a] == "number") {
                    node.appendChild(Strophe.xmlTextNode(arguments[a]));
                } else if (typeof arguments[a] == "object" && typeof arguments[a].sort == "function") {
                    for (i = 0; i < arguments[a].length; i++) {
                        if (typeof arguments[a][i] == "object" && typeof arguments[a][i].sort == "function") {
                            node.setAttribute(arguments[a][i][0], arguments[a][i][1]);
                        }
                    }
                } else if (typeof arguments[a] == "object") {
                    for (k in arguments[a]) {
                        if (arguments[a].hasOwnProperty(k)) {
                            node.setAttribute(k, arguments[a][k]);
                        }
                    }
                }
            }
            return node;
        },
        xmlescape: function(text) {
            text = text.replace(/\&/g, "&amp;");
            text = text.replace(/</g, "&lt;");
            text = text.replace(/>/g, "&gt;");
            text = text.replace(/'/g, "&apos;");
            text = text.replace(/"/g, "&quot;");
            return text;
        },
        xmlTextNode: function(text) {
            return Strophe.xmlGenerator().createTextNode(text);
        },
        xmlHtmlNode: function(html) {
            if (window.DOMParser) {
                parser = new DOMParser();
                node = parser.parseFromString(html, "text/xml");
            } else {
                node = new ActiveXObject("Microsoft.XMLDOM");
                node.async = "false";
                node.loadXML(html);
            }
            return node;
        },
        getText: function(elem) {
            if (!elem) {
                return null;
            }
            var str = "";
            if (elem.childNodes.length === 0 && elem.nodeType == Strophe.ElementType.TEXT) {
                str += elem.nodeValue;
            }
            for (var i = 0; i < elem.childNodes.length; i++) {
                if (elem.childNodes[i].nodeType == Strophe.ElementType.TEXT) {
                    str += elem.childNodes[i].nodeValue;
                }
            }
            return Strophe.xmlescape(str);
        },
        copyElement: function(elem) {
            var i, el;
            if (elem.nodeType == Strophe.ElementType.NORMAL) {
                el = Strophe.xmlElement(elem.tagName);
                for (i = 0; i < elem.attributes.length; i++) {
                    el.setAttribute(elem.attributes[i].nodeName.toLowerCase(), elem.attributes[i].value);
                }
                for (i = 0; i < elem.childNodes.length; i++) {
                    el.appendChild(Strophe.copyElement(elem.childNodes[i]));
                }
            } else if (elem.nodeType == Strophe.ElementType.TEXT) {
                el = Strophe.xmlGenerator().createTextNode(elem.nodeValue);
            }
            return el;
        },
        createHtml: function(elem) {
            var i, el, j, tag, attribute, value, css, cssAttrs, attr, cssName, cssValue, children, child;
            if (elem.nodeType == Strophe.ElementType.NORMAL) {
                tag = elem.nodeName.toLowerCase();
                if (Strophe.XHTML.validTag(tag)) {
                    try {
                        el = Strophe.xmlElement(tag);
                        for (i = 0; i < Strophe.XHTML.attributes[tag].length; i++) {
                            attribute = Strophe.XHTML.attributes[tag][i];
                            value = elem.getAttribute(attribute);
                            if (typeof value == "undefined" || value === null || value === "" || value === false || value === 0) {
                                continue;
                            }
                            if (attribute == "style" && typeof value == "object") {
                                if (typeof value.cssText != "undefined") {
                                    value = value.cssText;
                                }
                            }
                            if (attribute == "style") {
                                css = [];
                                cssAttrs = value.split(";");
                                for (j = 0; j < cssAttrs.length; j++) {
                                    attr = cssAttrs[j].split(":");
                                    cssName = attr[0].replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase();
                                    if (Strophe.XHTML.validCSS(cssName)) {
                                        cssValue = attr[1].replace(/^\s*/, "").replace(/\s*$/, "");
                                        css.push(cssName + ": " + cssValue);
                                    }
                                }
                                if (css.length > 0) {
                                    value = css.join("; ");
                                    el.setAttribute(attribute, value);
                                }
                            } else {
                                el.setAttribute(attribute, value);
                            }
                        }
                        for (i = 0; i < elem.childNodes.length; i++) {
                            el.appendChild(Strophe.createHtml(elem.childNodes[i]));
                        }
                    } catch (e) {
                        el = Strophe.xmlTextNode("");
                    }
                } else {
                    el = Strophe.xmlGenerator().createDocumentFragment();
                    for (i = 0; i < elem.childNodes.length; i++) {
                        el.appendChild(Strophe.createHtml(elem.childNodes[i]));
                    }
                }
            } else if (elem.nodeType == Strophe.ElementType.FRAGMENT) {
                el = Strophe.xmlGenerator().createDocumentFragment();
                for (i = 0; i < elem.childNodes.length; i++) {
                    el.appendChild(Strophe.createHtml(elem.childNodes[i]));
                }
            } else if (elem.nodeType == Strophe.ElementType.TEXT) {
                el = Strophe.xmlTextNode(elem.nodeValue);
            }
            return el;
        },
        escapeNode: function(node) {
            return node.replace(/^\s+|\s+$/g, "").replace(/\\/g, "\\5c").replace(/ /g, "\\20").replace(/\"/g, "\\22").replace(/\&/g, "\\26").replace(/\'/g, "\\27").replace(/\//g, "\\2f").replace(/:/g, "\\3a").replace(/</g, "\\3c").replace(/>/g, "\\3e").replace(/@/g, "\\40");
        },
        unescapeNode: function(node) {
            return node.replace(/\\20/g, " ").replace(/\\22/g, '"').replace(/\\26/g, "&").replace(/\\27/g, "'").replace(/\\2f/g, "/").replace(/\\3a/g, ":").replace(/\\3c/g, "<").replace(/\\3e/g, ">").replace(/\\40/g, "@").replace(/\\5c/g, "\\");
        },
        getNodeFromJid: function(jid) {
            if (jid.indexOf("@") < 0) {
                return null;
            }
            return jid.split("@")[0];
        },
        getDomainFromJid: function(jid) {
            var bare = Strophe.getBareJidFromJid(jid);
            if (bare.indexOf("@") < 0) {
                return bare;
            } else {
                var parts = bare.split("@");
                parts.splice(0, 1);
                return parts.join("@");
            }
        },
        getResourceFromJid: function(jid) {
            var s = jid.split("/");
            if (s.length < 2) {
                return null;
            }
            s.splice(0, 1);
            return s.join("/");
        },
        getBareJidFromJid: function(jid) {
            return jid ? jid.split("/")[0] : null;
        },
        log: function(level, msg) {
            return;
        },
        debug: function(msg) {
            this.log(this.LogLevel.DEBUG, msg);
        },
        info: function(msg) {
            this.log(this.LogLevel.INFO, msg);
        },
        warn: function(msg) {
            this.log(this.LogLevel.WARN, msg);
        },
        error: function(msg) {
            this.log(this.LogLevel.ERROR, msg);
        },
        fatal: function(msg) {
            this.log(this.LogLevel.FATAL, msg);
        },
        serialize: function(elem) {
            var result;
            if (!elem) {
                return null;
            }
            if (typeof elem.tree === "function") {
                elem = elem.tree();
            }
            var nodeName = elem.nodeName;
            var i, child;
            if (elem.getAttribute("_realname")) {
                nodeName = elem.getAttribute("_realname");
            }
            result = "<" + nodeName;
            for (i = 0; i < elem.attributes.length; i++) {
                if (elem.attributes[i].nodeName != "_realname") {
                    result += " " + elem.attributes[i].nodeName.toLowerCase() + "='" + elem.attributes[i].value.replace(/&/g, "&amp;").replace(/\'/g, "&apos;").replace(/>/g, "&gt;").replace(/</g, "&lt;") + "'";
                }
            }
            if (elem.childNodes.length > 0) {
                result += ">";
                for (i = 0; i < elem.childNodes.length; i++) {
                    child = elem.childNodes[i];
                    switch (child.nodeType) {
                      case Strophe.ElementType.NORMAL:
                        result += Strophe.serialize(child);
                        break;

                      case Strophe.ElementType.TEXT:
                        result += Strophe.xmlescape(child.nodeValue);
                        break;

                      case Strophe.ElementType.CDATA:
                        result += "<![CDATA[" + child.nodeValue + "]]>";
                    }
                }
                result += "</" + nodeName + ">";
            } else {
                result += "/>";
            }
            return result;
        },
        _requestId: 0,
        _connectionPlugins: {},
        addConnectionPlugin: function(name, ptype) {
            Strophe._connectionPlugins[name] = ptype;
        }
    };
    Strophe.Builder = function(name, attrs) {
        if (name == "presence" || name == "message" || name == "iq") {
            if (attrs && !attrs.xmlns) {
                attrs.xmlns = Strophe.NS.CLIENT;
            } else if (!attrs) {
                attrs = {
                    xmlns: Strophe.NS.CLIENT
                };
            }
        }
        this.nodeTree = Strophe.xmlElement(name, attrs);
        this.node = this.nodeTree;
    };
    Strophe.Builder.prototype = {
        tree: function() {
            return this.nodeTree;
        },
        toString: function() {
            return Strophe.serialize(this.nodeTree);
        },
        up: function() {
            this.node = this.node.parentNode;
            return this;
        },
        attrs: function(moreattrs) {
            for (var k in moreattrs) {
                if (moreattrs.hasOwnProperty(k)) {
                    this.node.setAttribute(k, moreattrs[k]);
                }
            }
            return this;
        },
        c: function(name, attrs, text) {
            var child = Strophe.xmlElement(name, attrs, text);
            this.node.appendChild(child);
            if (!text) {
                this.node = child;
            }
            return this;
        },
        cnode: function(elem) {
            var xmlGen = Strophe.xmlGenerator();
            try {
                var impNode = xmlGen.importNode !== undefined;
            } catch (e) {
                var impNode = false;
            }
            var newElem = impNode ? xmlGen.importNode(elem, true) : Strophe.copyElement(elem);
            this.node.appendChild(newElem);
            this.node = newElem;
            return this;
        },
        t: function(text) {
            var child = Strophe.xmlTextNode(text);
            this.node.appendChild(child);
            return this;
        },
        h: function(html) {
            var fragment = document.createElement("body");
            fragment.innerHTML = html;
            var xhtml = Strophe.createHtml(fragment);
            while (xhtml.childNodes.length > 0) {
                this.node.appendChild(xhtml.childNodes[0]);
            }
            return this;
        }
    };
    Strophe.Handler = function(handler, ns, name, type, id, from, options) {
        this.handler = handler;
        this.ns = ns;
        this.name = name;
        this.type = type;
        this.id = id;
        this.options = options || {
            matchBare: false
        };
        if (!this.options.matchBare) {
            this.options.matchBare = false;
        }
        if (this.options.matchBare) {
            this.from = from ? Strophe.getBareJidFromJid(from) : null;
        } else {
            this.from = from;
        }
        this.user = true;
    };
    Strophe.Handler.prototype = {
        isMatch: function(elem) {
            var nsMatch;
            var from = null;
            if (this.options.matchBare) {
                from = Strophe.getBareJidFromJid(elem.getAttribute("from"));
            } else {
                from = elem.getAttribute("from");
            }
            nsMatch = false;
            if (!this.ns) {
                nsMatch = true;
            } else {
                var that = this;
                Strophe.forEachChild(elem, null, function(elem) {
                    if (elem.getAttribute("xmlns") == that.ns) {
                        nsMatch = true;
                    }
                });
                nsMatch = nsMatch || elem.getAttribute("xmlns") == this.ns;
            }
            if (nsMatch && (!this.name || Strophe.isTagEqual(elem, this.name)) && (!this.type || elem.getAttribute("type") == this.type) && (!this.id || elem.getAttribute("id") == this.id) && (!this.from || from == this.from)) {
                return true;
            }
            return false;
        },
        run: function(elem) {
            var result = null;
            try {
                result = this.handler(elem);
            } catch (e) {
                if (e.sourceURL) {
                    Strophe.fatal("error: " + this.handler + " " + e.sourceURL + ":" + e.line + " - " + e.name + ": " + e.message);
                } else if (e.fileName) {
                    if (typeof console != "undefined") {
                        console.trace();
                        console.error(this.handler, " - error - ", e, e.message);
                    }
                    Strophe.fatal("error: " + this.handler + " " + e.fileName + ":" + e.lineNumber + " - " + e.name + ": " + e.message);
                } else {
                    Strophe.fatal("error: " + e.message + "\n" + e.stack);
                }
                throw e;
            }
            return result;
        },
        toString: function() {
            return "{Handler: " + this.handler + "(" + this.name + "," + this.id + "," + this.ns + ")}";
        }
    };
    Strophe.TimedHandler = function(period, handler) {
        this.period = period;
        this.handler = handler;
        this.lastCalled = new Date().getTime();
        this.user = true;
    };
    Strophe.TimedHandler.prototype = {
        run: function() {
            this.lastCalled = new Date().getTime();
            return this.handler();
        },
        reset: function() {
            this.lastCalled = new Date().getTime();
        },
        toString: function() {
            return "{TimedHandler: " + this.handler + "(" + this.period + ")}";
        }
    };
    Strophe.Request = function(elem, func, rid, sends) {
        this.id = ++Strophe._requestId;
        this.xmlData = elem;
        this.data = Strophe.serialize(elem);
        this.origFunc = func;
        this.func = func;
        this.rid = rid;
        this.date = NaN;
        this.sends = sends || 0;
        this.abort = false;
        this.dead = null;
        this.age = function() {
            if (!this.date) {
                return 0;
            }
            var now = new Date();
            return (now - this.date) / 1e3;
        };
        this.timeDead = function() {
            if (!this.dead) {
                return 0;
            }
            var now = new Date();
            return (now - this.dead) / 1e3;
        };
        this.xhr = this._newXHR();
    };
    Strophe.Request.prototype = {
        getResponse: function() {
            var node = null;
            if (this.xhr.responseXML && this.xhr.responseXML.documentElement) {
                node = this.xhr.responseXML.documentElement;
                if (node.tagName == "parsererror") {
                    Strophe.error("invalid response received");
                    Strophe.error("responseText: " + this.xhr.responseText);
                    Strophe.error("responseXML: " + Strophe.serialize(this.xhr.responseXML));
                    throw "parsererror";
                }
            } else if (this.xhr.responseText) {
                Strophe.error("invalid response received");
                Strophe.error("responseText: " + this.xhr.responseText);
                Strophe.error("responseXML: " + Strophe.serialize(this.xhr.responseXML));
            }
            return node;
        },
        _newXHR: function() {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("text/xml");
                }
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = this.func.bind(null, this);
            return xhr;
        }
    };
    Strophe.Connection = function(service) {
        this.service = service;
        this.jid = "";
        this.domain = null;
        this.rid = Math.floor(Math.random() * 4294967295);
        this.sid = null;
        this.streamId = null;
        this.features = null;
        this._sasl_data = [];
        this.do_session = false;
        this.do_bind = false;
        this.timedHandlers = [];
        this.handlers = [];
        this.removeTimeds = [];
        this.removeHandlers = [];
        this.addTimeds = [];
        this.addHandlers = [];
        this._authentication = {};
        this._idleTimeout = null;
        this._disconnectTimeout = null;
        this.do_authentication = true;
        this.authenticated = false;
        this.disconnecting = false;
        this.connected = false;
        this.errors = 0;
        this.paused = false;
        this.hold = 1;
        this.wait = 60;
        this.window = 5;
        this._data = [];
        this._requests = [];
        this._uniqueId = Math.round(Math.random() * 1e4);
        this._sasl_success_handler = null;
        this._sasl_failure_handler = null;
        this._sasl_challenge_handler = null;
        this.maxRetries = 5;
        this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
        for (var k in Strophe._connectionPlugins) {
            if (Strophe._connectionPlugins.hasOwnProperty(k)) {
                var ptype = Strophe._connectionPlugins[k];
                var F = function() {};
                F.prototype = ptype;
                this[k] = new F();
                this[k].init(this);
            }
        }
    };
    Strophe.Connection.prototype = {
        reset: function() {
            this.rid = Math.floor(Math.random() * 4294967295);
            this.sid = null;
            this.streamId = null;
            this.do_session = false;
            this.do_bind = false;
            this.timedHandlers = [];
            this.handlers = [];
            this.removeTimeds = [];
            this.removeHandlers = [];
            this.addTimeds = [];
            this.addHandlers = [];
            this._authentication = {};
            this.authenticated = false;
            this.disconnecting = false;
            this.connected = false;
            this.errors = 0;
            this._requests = [];
            this._uniqueId = Math.round(Math.random() * 1e4);
        },
        pause: function() {
            this.paused = true;
        },
        resume: function() {
            this.paused = false;
        },
        getUniqueId: function(suffix) {
            if (typeof suffix == "string" || typeof suffix == "number") {
                return ++this._uniqueId + ":" + suffix;
            } else {
                return ++this._uniqueId + "";
            }
        },
        connect: function(jid, pass, callback, wait, hold, route) {
            this.jid = jid;
            this.pass = pass;
            this.connect_callback = callback;
            this.disconnecting = false;
            this.connected = false;
            this.authenticated = false;
            this.errors = 0;
            this.wait = wait || this.wait;
            this.hold = hold || this.hold;
            this.domain = this.domain || Strophe.getDomainFromJid(this.jid);
            var body = this._buildBody().attrs({
                to: this.domain,
                "xml:lang": "en",
                wait: this.wait,
                hold: this.hold,
                content: "text/xml; charset=utf-8",
                ver: "1.6",
                "xmpp:version": "1.0",
                "xmlns:xmpp": Strophe.NS.BOSH
            });
            if (route) {
                body.attrs({
                    route: route
                });
            }
            this._changeConnectStatus(Strophe.Status.CONNECTING, null);
            var _connect_cb = this._connect_callback || this._connect_cb;
            this._connect_callback = null;
            this._requests.push(new Strophe.Request(body.tree(), this._onRequestStateChange.bind(this, _connect_cb.bind(this)), body.tree().getAttribute("rid")));
            this._throttledRequestHandler();
        },
        attach: function(jid, sid, rid, callback, wait, hold, wind) {
            this.jid = jid;
            this.sid = sid;
            this.rid = rid;
            this.connect_callback = callback;
            this.domain = Strophe.getDomainFromJid(this.jid);
            this.authenticated = true;
            this.connected = true;
            this.wait = wait || this.wait;
            this.hold = hold || this.hold;
            this.window = wind || this.window;
            this._changeConnectStatus(Strophe.Status.ATTACHED, null);
        },
        xmlInput: function(elem) {
            return;
        },
        xmlOutput: function(elem) {
            return;
        },
        rawInput: function(data) {
            return;
        },
        rawOutput: function(data) {
            return;
        },
        send: function(elem) {
            if (elem === null) {
                return;
            }
            if (typeof elem.sort === "function") {
                for (var i = 0; i < elem.length; i++) {
                    this._queueData(elem[i]);
                }
            } else if (typeof elem.tree === "function") {
                this._queueData(elem.tree());
            } else {
                this._queueData(elem);
            }
            this._throttledRequestHandler();
            clearTimeout(this._idleTimeout);
            this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
        },
        flush: function() {
            clearTimeout(this._idleTimeout);
            this._onIdle();
        },
        sendIQ: function(elem, callback, errback, timeout) {
            var timeoutHandler = null;
            var that = this;
            if (typeof elem.tree === "function") {
                elem = elem.tree();
            }
            var id = elem.getAttribute("id");
            if (!id) {
                id = this.getUniqueId("sendIQ");
                elem.setAttribute("id", id);
            }
            var handler = this.addHandler(function(stanza) {
                if (timeoutHandler) {
                    that.deleteTimedHandler(timeoutHandler);
                }
                var iqtype = stanza.getAttribute("type");
                if (iqtype == "result") {
                    if (callback) {
                        callback(stanza);
                    }
                } else if (iqtype == "error") {
                    if (errback) {
                        errback(stanza);
                    }
                } else {
                    throw {
                        name: "StropheError",
                        message: "Got bad IQ type of " + iqtype
                    };
                }
            }, null, "iq", null, id);
            if (timeout) {
                timeoutHandler = this.addTimedHandler(timeout, function() {
                    that.deleteHandler(handler);
                    if (errback) {
                        errback(null);
                    }
                    return false;
                });
            }
            this.send(elem);
            return id;
        },
        _queueData: function(element) {
            if (element === null || !element.tagName || !element.childNodes) {
                throw {
                    name: "StropheError",
                    message: "Cannot queue non-DOMElement."
                };
            }
            this._data.push(element);
        },
        _sendRestart: function() {
            this._data.push("restart");
            this._throttledRequestHandler();
            clearTimeout(this._idleTimeout);
            this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
        },
        addTimedHandler: function(period, handler) {
            var thand = new Strophe.TimedHandler(period, handler);
            this.addTimeds.push(thand);
            return thand;
        },
        deleteTimedHandler: function(handRef) {
            this.removeTimeds.push(handRef);
        },
        addHandler: function(handler, ns, name, type, id, from, options) {
            var hand = new Strophe.Handler(handler, ns, name, type, id, from, options);
            this.addHandlers.push(hand);
            return hand;
        },
        deleteHandler: function(handRef) {
            this.removeHandlers.push(handRef);
        },
        disconnect: function(reason) {
            this._changeConnectStatus(Strophe.Status.DISCONNECTING, reason);
            Strophe.info("Disconnect was called because: " + reason);
            if (this.connected) {
                this._disconnectTimeout = this._addSysTimedHandler(3e3, this._onDisconnectTimeout.bind(this));
                this._sendTerminate();
            }
        },
        _changeConnectStatus: function(status, condition) {
            for (var k in Strophe._connectionPlugins) {
                if (Strophe._connectionPlugins.hasOwnProperty(k)) {
                    var plugin = this[k];
                    if (plugin.statusChanged) {
                        try {
                            plugin.statusChanged(status, condition);
                        } catch (err) {
                            Strophe.error("" + k + " plugin caused an exception " + "changing status: " + err);
                        }
                    }
                }
            }
            if (this.connect_callback) {
                try {
                    this.connect_callback(status, condition);
                } catch (e) {
                    Strophe.error("User connection callback caused an " + "exception: " + e);
                }
            }
        },
        _buildBody: function() {
            var bodyWrap = $build("body", {
                rid: this.rid++,
                xmlns: Strophe.NS.HTTPBIND
            });
            if (this.sid !== null) {
                bodyWrap.attrs({
                    sid: this.sid
                });
            }
            return bodyWrap;
        },
        _removeRequest: function(req) {
            Strophe.debug("removing request");
            var i;
            for (i = this._requests.length - 1; i >= 0; i--) {
                if (req == this._requests[i]) {
                    this._requests.splice(i, 1);
                }
            }
            req.xhr.onreadystatechange = function() {};
            this._throttledRequestHandler();
        },
        _restartRequest: function(i) {
            var req = this._requests[i];
            if (req.dead === null) {
                req.dead = new Date();
            }
            this._processRequest(i);
        },
        _processRequest: function(i) {
            var req = this._requests[i];
            var reqStatus = -1;
            try {
                if (req.xhr.readyState == 4) {
                    reqStatus = req.xhr.status;
                }
            } catch (e) {
                Strophe.error("caught an error in _requests[" + i + "], reqStatus: " + reqStatus);
            }
            if (typeof reqStatus == "undefined") {
                reqStatus = -1;
            }
            if (req.sends > this.maxRetries) {
                this._onDisconnectTimeout();
                return;
            }
            var time_elapsed = req.age();
            var primaryTimeout = !isNaN(time_elapsed) && time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait);
            var secondaryTimeout = req.dead !== null && req.timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait);
            var requestCompletedWithServerError = req.xhr.readyState == 4 && (reqStatus < 1 || reqStatus >= 500);
            if (primaryTimeout || secondaryTimeout || requestCompletedWithServerError) {
                if (secondaryTimeout) {
                    Strophe.error("Request " + this._requests[i].id + " timed out (secondary), restarting");
                }
                req.abort = true;
                req.xhr.abort();
                req.xhr.onreadystatechange = function() {};
                this._requests[i] = new Strophe.Request(req.xmlData, req.origFunc, req.rid, req.sends);
                req = this._requests[i];
            }
            if (req.xhr.readyState === 0) {
                Strophe.debug("request id " + req.id + "." + req.sends + " posting");
                try {
                    req.xhr.open("POST", this.service, true);
                } catch (e2) {
                    Strophe.error("XHR open failed.");
                    if (!this.connected) {
                        this._changeConnectStatus(Strophe.Status.CONNFAIL, "bad-service");
                    }
                    this.disconnect();
                    return;
                }
                var sendFunc = function() {
                    req.date = new Date();
                    req.xhr.send(req.data);
                };
                if (req.sends > 1) {
                    var backoff = Math.min(Math.floor(Strophe.TIMEOUT * this.wait), Math.pow(req.sends, 3)) * 1e3;
                    setTimeout(sendFunc, backoff);
                } else {
                    sendFunc();
                }
                req.sends++;
                if (this.xmlOutput !== Strophe.Connection.prototype.xmlOutput) {
                    this.xmlOutput(req.xmlData);
                }
                if (this.rawOutput !== Strophe.Connection.prototype.rawOutput) {
                    this.rawOutput(req.data);
                }
            } else {
                Strophe.debug("_processRequest: " + (i === 0 ? "first" : "second") + " request has readyState of " + req.xhr.readyState);
            }
        },
        _throttledRequestHandler: function() {
            if (!this._requests) {
                Strophe.debug("_throttledRequestHandler called with " + "undefined requests");
            } else {
                Strophe.debug("_throttledRequestHandler called with " + this._requests.length + " requests");
            }
            if (!this._requests || this._requests.length === 0) {
                return;
            }
            if (this._requests.length > 0) {
                this._processRequest(0);
            }
            if (this._requests.length > 1 && Math.abs(this._requests[0].rid - this._requests[1].rid) < this.window) {
                this._processRequest(1);
            }
        },
        _onRequestStateChange: function(func, req) {
            Strophe.debug("request id " + req.id + "." + req.sends + " state changed to " + req.xhr.readyState);
            if (req.abort) {
                req.abort = false;
                return;
            }
            var reqStatus;
            if (req.xhr.readyState == 4) {
                reqStatus = 0;
                try {
                    reqStatus = req.xhr.status;
                } catch (e) {}
                if (typeof reqStatus == "undefined") {
                    reqStatus = 0;
                }
                if (this.disconnecting) {
                    if (reqStatus >= 400) {
                        this._hitError(reqStatus);
                        return;
                    }
                }
                var reqIs0 = this._requests[0] == req;
                var reqIs1 = this._requests[1] == req;
                if (reqStatus > 0 && reqStatus < 500 || req.sends > 5) {
                    this._removeRequest(req);
                    Strophe.debug("request id " + req.id + " should now be removed");
                }
                if (reqStatus == 200) {
                    if (reqIs1 || reqIs0 && this._requests.length > 0 && this._requests[0].age() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) {
                        this._restartRequest(0);
                    }
                    Strophe.debug("request id " + req.id + "." + req.sends + " got 200");
                    func(req);
                    this.errors = 0;
                } else {
                    Strophe.error("request id " + req.id + "." + req.sends + " error " + reqStatus + " happened");
                    if (reqStatus === 0 || reqStatus >= 400 && reqStatus < 600 || reqStatus >= 12e3) {
                        this._hitError(reqStatus);
                        if (reqStatus >= 400 && reqStatus < 500) {
                            this._changeConnectStatus(Strophe.Status.DISCONNECTING, null);
                            this._doDisconnect();
                        }
                    }
                }
                if (!(reqStatus > 0 && reqStatus < 500 || req.sends > 5)) {
                    this._throttledRequestHandler();
                }
            }
        },
        _hitError: function(reqStatus) {
            this.errors++;
            Strophe.warn("request errored, status: " + reqStatus + ", number of errors: " + this.errors);
            if (this.errors > 4) {
                this._onDisconnectTimeout();
            }
        },
        _doDisconnect: function() {
            Strophe.info("_doDisconnect was called");
            this.authenticated = false;
            this.disconnecting = false;
            this.sid = null;
            this.streamId = null;
            this.rid = Math.floor(Math.random() * 4294967295);
            if (this.connected) {
                this._changeConnectStatus(Strophe.Status.DISCONNECTED, null);
                this.connected = false;
            }
            this.handlers = [];
            this.timedHandlers = [];
            this.removeTimeds = [];
            this.removeHandlers = [];
            this.addTimeds = [];
            this.addHandlers = [];
        },
        _dataRecv: function(req) {
            try {
                var elem = req.getResponse();
            } catch (e) {
                if (e != "parsererror") {
                    throw e;
                }
                this.disconnect("strophe-parsererror");
            }
            if (elem === null) {
                return;
            }
            if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
                this.xmlInput(elem);
            }
            if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
                this.rawInput(Strophe.serialize(elem));
            }
            var i, hand;
            while (this.removeHandlers.length > 0) {
                hand = this.removeHandlers.pop();
                i = this.handlers.indexOf(hand);
                if (i >= 0) {
                    this.handlers.splice(i, 1);
                }
            }
            while (this.addHandlers.length > 0) {
                this.handlers.push(this.addHandlers.pop());
            }
            if (this.disconnecting && this._requests.length === 0) {
                this.deleteTimedHandler(this._disconnectTimeout);
                this._disconnectTimeout = null;
                this._doDisconnect();
                return;
            }
            var typ = elem.getAttribute("type");
            var cond, conflict;
            if (typ !== null && typ == "terminate") {
                if (this.disconnecting) {
                    return;
                }
                cond = elem.getAttribute("condition");
                conflict = elem.getElementsByTagName("conflict");
                if (cond !== null) {
                    if (cond == "remote-stream-error" && conflict.length > 0) {
                        cond = "conflict";
                    }
                    this._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
                } else {
                    this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
                }
                this.disconnect();
                return;
            }
            var that = this;
            Strophe.forEachChild(elem, null, function(child) {
                var i, newList;
                newList = that.handlers;
                that.handlers = [];
                for (i = 0; i < newList.length; i++) {
                    var hand = newList[i];
                    try {
                        if (hand.isMatch(child) && (that.authenticated || !hand.user)) {
                            if (hand.run(child)) {
                                that.handlers.push(hand);
                            }
                        } else {
                            that.handlers.push(hand);
                        }
                    } catch (e) {}
                }
            });
        },
        _sendTerminate: function() {
            Strophe.info("_sendTerminate was called");
            var body = this._buildBody().attrs({
                type: "terminate"
            });
            if (this.authenticated) {
                body.c("presence", {
                    xmlns: Strophe.NS.CLIENT,
                    type: "unavailable"
                });
            }
            this.disconnecting = true;
            var req = new Strophe.Request(body.tree(), this._onRequestStateChange.bind(this, this._dataRecv.bind(this)), body.tree().getAttribute("rid"));
            this._requests.push(req);
            this._throttledRequestHandler();
        },
        _connect_cb: function(req, _callback) {
            Strophe.info("_connect_cb was called");
            this.connected = true;
            var bodyWrap = req.getResponse();
            if (!bodyWrap) {
                return;
            }
            if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
                this.xmlInput(bodyWrap);
            }
            if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
                this.rawInput(Strophe.serialize(bodyWrap));
            }
            var typ = bodyWrap.getAttribute("type");
            var cond, conflict;
            if (typ !== null && typ == "terminate") {
                cond = bodyWrap.getAttribute("condition");
                conflict = bodyWrap.getElementsByTagName("conflict");
                if (cond !== null) {
                    if (cond == "remote-stream-error" && conflict.length > 0) {
                        cond = "conflict";
                    }
                    this._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
                } else {
                    this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
                }
                return;
            }
            if (!this.sid) {
                this.sid = bodyWrap.getAttribute("sid");
            }
            if (!this.stream_id) {
                this.stream_id = bodyWrap.getAttribute("authid");
            }
            var wind = bodyWrap.getAttribute("requests");
            if (wind) {
                this.window = parseInt(wind, 10);
            }
            var hold = bodyWrap.getAttribute("hold");
            if (hold) {
                this.hold = parseInt(hold, 10);
            }
            var wait = bodyWrap.getAttribute("wait");
            if (wait) {
                this.wait = parseInt(wait, 10);
            }
            this._authentication.sasl_scram_sha1 = false;
            this._authentication.sasl_plain = false;
            this._authentication.sasl_digest_md5 = false;
            this._authentication.sasl_anonymous = false;
            this._authentication.legacy_auth = false;
            var hasFeatures = bodyWrap.getElementsByTagName("stream:features").length > 0;
            if (!hasFeatures) {
                hasFeatures = bodyWrap.getElementsByTagName("features").length > 0;
            }
            var mechanisms = bodyWrap.getElementsByTagName("mechanism");
            var i, mech, auth_str, hashed_auth_str, found_authentication = false;
            if (hasFeatures && mechanisms.length > 0) {
                var missmatchedmechs = 0;
                for (i = 0; i < mechanisms.length; i++) {
                    mech = Strophe.getText(mechanisms[i]);
                    if (mech == "SCRAM-SHA-1") {
                        this._authentication.sasl_scram_sha1 = true;
                    } else if (mech == "DIGEST-MD5") {
                        this._authentication.sasl_digest_md5 = true;
                    } else if (mech == "PLAIN") {
                        this._authentication.sasl_plain = true;
                    } else if (mech == "ANONYMOUS") {
                        this._authentication.sasl_anonymous = true;
                    } else missmatchedmechs++;
                }
                this._authentication.legacy_auth = bodyWrap.getElementsByTagName("auth").length > 0;
                found_authentication = this._authentication.legacy_auth || missmatchedmechs < mechanisms.length;
            }
            if (!found_authentication) {
                _callback = _callback || this._connect_cb;
                var body = this._buildBody();
                this._requests.push(new Strophe.Request(body.tree(), this._onRequestStateChange.bind(this, _callback.bind(this)), body.tree().getAttribute("rid")));
                this._throttledRequestHandler();
                return;
            }
            if (this.do_authentication !== false) this.authenticate();
        },
        authenticate: function() {
            if (Strophe.getNodeFromJid(this.jid) === null && this._authentication.sasl_anonymous) {
                this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
                this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
                this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
                this.send($build("auth", {
                    xmlns: Strophe.NS.SASL,
                    mechanism: "ANONYMOUS"
                }).tree());
            } else if (Strophe.getNodeFromJid(this.jid) === null) {
                this._changeConnectStatus(Strophe.Status.CONNFAIL, "x-strophe-bad-non-anon-jid");
                this.disconnect();
            } else if (this._authentication.sasl_scram_sha1) {
                var cnonce = MD5.hexdigest(Math.random() * 1234567890);
                var auth_str = "n=" + Strophe.getNodeFromJid(this.jid);
                auth_str += ",r=";
                auth_str += cnonce;
                this._sasl_data["cnonce"] = cnonce;
                this._sasl_data["client-first-message-bare"] = auth_str;
                auth_str = "n,," + auth_str;
                this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
                this._sasl_challenge_handler = this._addSysHandler(this._sasl_scram_challenge_cb.bind(this), null, "challenge", null, null);
                this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
                this.send($build("auth", {
                    xmlns: Strophe.NS.SASL,
                    mechanism: "SCRAM-SHA-1"
                }).t(Base64.encode(auth_str)).tree());
            } else if (this._authentication.sasl_digest_md5) {
                this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
                this._sasl_challenge_handler = this._addSysHandler(this._sasl_digest_challenge1_cb.bind(this), null, "challenge", null, null);
                this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
                this.send($build("auth", {
                    xmlns: Strophe.NS.SASL,
                    mechanism: "DIGEST-MD5"
                }).tree());
            } else if (this._authentication.sasl_plain) {
                auth_str = Strophe.getBareJidFromJid(this.jid);
                auth_str = auth_str + "\x00";
                auth_str = auth_str + Strophe.getNodeFromJid(this.jid);
                auth_str = auth_str + "\x00";
                auth_str = auth_str + this.pass;
                this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
                this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
                this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
                hashed_auth_str = Base64.encode(auth_str);
                this.send($build("auth", {
                    xmlns: Strophe.NS.SASL,
                    mechanism: "PLAIN"
                }).t(hashed_auth_str).tree());
            } else {
                this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
                this._addSysHandler(this._auth1_cb.bind(this), null, null, null, "_auth_1");
                this.send($iq({
                    type: "get",
                    to: this.domain,
                    id: "_auth_1"
                }).c("query", {
                    xmlns: Strophe.NS.AUTH
                }).c("username", {}).t(Strophe.getNodeFromJid(this.jid)).tree());
            }
        },
        _sasl_digest_challenge1_cb: function(elem) {
            var attribMatch = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/;
            var challenge = Base64.decode(Strophe.getText(elem));
            var cnonce = MD5.hexdigest("" + Math.random() * 1234567890);
            var realm = "";
            var host = null;
            var nonce = "";
            var qop = "";
            var matches;
            this.deleteHandler(this._sasl_failure_handler);
            while (challenge.match(attribMatch)) {
                matches = challenge.match(attribMatch);
                challenge = challenge.replace(matches[0], "");
                matches[2] = matches[2].replace(/^"(.+)"$/, "$1");
                switch (matches[1]) {
                  case "realm":
                    realm = matches[2];
                    break;

                  case "nonce":
                    nonce = matches[2];
                    break;

                  case "qop":
                    qop = matches[2];
                    break;

                  case "host":
                    host = matches[2];
                    break;
                }
            }
            var digest_uri = "xmpp/" + this.domain;
            if (host !== null) {
                digest_uri = digest_uri + "/" + host;
            }
            var A1 = MD5.hash(Strophe.getNodeFromJid(this.jid) + ":" + realm + ":" + this.pass) + ":" + nonce + ":" + cnonce;
            var A2 = "AUTHENTICATE:" + digest_uri;
            var responseText = "";
            responseText += "username=" + this._quote(Strophe.getNodeFromJid(this.jid)) + ",";
            responseText += "realm=" + this._quote(realm) + ",";
            responseText += "nonce=" + this._quote(nonce) + ",";
            responseText += "cnonce=" + this._quote(cnonce) + ",";
            responseText += 'nc="00000001",';
            responseText += 'qop="auth",';
            responseText += "digest-uri=" + this._quote(digest_uri) + ",";
            responseText += "response=" + this._quote(MD5.hexdigest(MD5.hexdigest(A1) + ":" + nonce + ":00000001:" + cnonce + ":auth:" + MD5.hexdigest(A2))) + ",";
            responseText += 'charset="utf-8"';
            this._sasl_challenge_handler = this._addSysHandler(this._sasl_digest_challenge2_cb.bind(this), null, "challenge", null, null);
            this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
            this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
            this.send($build("response", {
                xmlns: Strophe.NS.SASL
            }).t(Base64.encode(responseText)).tree());
            return false;
        },
        _quote: function(str) {
            return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
        },
        _sasl_digest_challenge2_cb: function(elem) {
            this.deleteHandler(this._sasl_success_handler);
            this.deleteHandler(this._sasl_failure_handler);
            this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
            this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
            this.send($build("response", {
                xmlns: Strophe.NS.SASL
            }).tree());
            return false;
        },
        _sasl_scram_challenge_cb: function(elem) {
            var nonce, salt, iter, Hi, U, U_old;
            var clientKey, serverKey, clientSignature;
            var responseText = "c=biws,";
            var challenge = Base64.decode(Strophe.getText(elem));
            var authMessage = this._sasl_data["client-first-message-bare"] + "," + challenge + ",";
            var cnonce = this._sasl_data["cnonce"];
            var attribMatch = /([a-z]+)=([^,]+)(,|$)/;
            this.deleteHandler(this._sasl_failure_handler);
            while (challenge.match(attribMatch)) {
                matches = challenge.match(attribMatch);
                challenge = challenge.replace(matches[0], "");
                switch (matches[1]) {
                  case "r":
                    nonce = matches[2];
                    break;

                  case "s":
                    salt = matches[2];
                    break;

                  case "i":
                    iter = matches[2];
                    break;
                }
            }
            if (!(nonce.substr(0, cnonce.length) === cnonce)) {
                this._sasl_data = [];
                return this._sasl_failure_cb(null);
            }
            responseText += "r=" + nonce;
            authMessage += responseText;
            salt = Base64.decode(salt);
            salt += "\x00\x00\x00";
            Hi = U_old = core_hmac_sha1(this.pass, salt);
            for (i = 1; i < iter; i++) {
                U = core_hmac_sha1(this.pass, binb2str(U_old));
                for (k = 0; k < 5; k++) {
                    Hi[k] ^= U[k];
                }
                U_old = U;
            }
            Hi = binb2str(Hi);
            clientKey = core_hmac_sha1(Hi, "Client Key");
            serverKey = str_hmac_sha1(Hi, "Server Key");
            clientSignature = core_hmac_sha1(str_sha1(binb2str(clientKey)), authMessage);
            this._sasl_data["server-signature"] = b64_hmac_sha1(serverKey, authMessage);
            for (k = 0; k < 5; k++) {
                clientKey[k] ^= clientSignature[k];
            }
            responseText += ",p=" + Base64.encode(binb2str(clientKey));
            this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null);
            this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null);
            this.send($build("response", {
                xmlns: Strophe.NS.SASL
            }).t(Base64.encode(responseText)).tree());
            return false;
        },
        _auth1_cb: function(elem) {
            var iq = $iq({
                type: "set",
                id: "_auth_2"
            }).c("query", {
                xmlns: Strophe.NS.AUTH
            }).c("username", {}).t(Strophe.getNodeFromJid(this.jid)).up().c("password").t(this.pass);
            if (!Strophe.getResourceFromJid(this.jid)) {
                this.jid = Strophe.getBareJidFromJid(this.jid) + "/strophe";
            }
            iq.up().c("resource", {}).t(Strophe.getResourceFromJid(this.jid));
            this._addSysHandler(this._auth2_cb.bind(this), null, null, null, "_auth_2");
            this.send(iq.tree());
            return false;
        },
        _sasl_success_cb: function(elem) {
            if (this._sasl_data["server-signature"]) {
                var serverSignature;
                var success = Base64.decode(Strophe.getText(elem));
                var attribMatch = /([a-z]+)=([^,]+)(,|$)/;
                matches = success.match(attribMatch);
                if (matches[1] == "v") {
                    serverSignature = matches[2];
                }
                if (serverSignature != this._sasl_data["server-signature"]) {
                    this.deleteHandler(this._sasl_failure_handler);
                    this._sasl_failure_handler = null;
                    if (this._sasl_challenge_handler) {
                        this.deleteHandler(this._sasl_challenge_handler);
                        this._sasl_challenge_handler = null;
                    }
                    this._sasl_data = [];
                    return this._sasl_failure_cb(null);
                }
            }
            Strophe.info("SASL authentication succeeded.");
            this.deleteHandler(this._sasl_failure_handler);
            this._sasl_failure_handler = null;
            if (this._sasl_challenge_handler) {
                this.deleteHandler(this._sasl_challenge_handler);
                this._sasl_challenge_handler = null;
            }
            this._addSysHandler(this._sasl_auth1_cb.bind(this), null, "stream:features", null, null);
            this._sendRestart();
            return false;
        },
        _sasl_auth1_cb: function(elem) {
            this.features = elem;
            var i, child;
            for (i = 0; i < elem.childNodes.length; i++) {
                child = elem.childNodes[i];
                if (child.nodeName == "bind") {
                    this.do_bind = true;
                }
                if (child.nodeName == "session") {
                    this.do_session = true;
                }
            }
            if (!this.do_bind) {
                this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                return false;
            } else {
                this._addSysHandler(this._sasl_bind_cb.bind(this), null, null, null, "_bind_auth_2");
                var resource = Strophe.getResourceFromJid(this.jid);
                if (resource) {
                    this.send($iq({
                        type: "set",
                        id: "_bind_auth_2"
                    }).c("bind", {
                        xmlns: Strophe.NS.BIND
                    }).c("resource", {}).t(resource).tree());
                } else {
                    this.send($iq({
                        type: "set",
                        id: "_bind_auth_2"
                    }).c("bind", {
                        xmlns: Strophe.NS.BIND
                    }).tree());
                }
            }
            return false;
        },
        _sasl_bind_cb: function(elem) {
            if (elem.getAttribute("type") == "error") {
                Strophe.info("SASL binding failed.");
                var conflict = elem.getElementsByTagName("conflict"), condition;
                if (conflict.length > 0) {
                    condition = "conflict";
                }
                this._changeConnectStatus(Strophe.Status.AUTHFAIL, condition);
                return false;
            }
            var bind = elem.getElementsByTagName("bind");
            var jidNode;
            if (bind.length > 0) {
                jidNode = bind[0].getElementsByTagName("jid");
                if (jidNode.length > 0) {
                    this.jid = Strophe.getText(jidNode[0]);
                    if (this.do_session) {
                        this._addSysHandler(this._sasl_session_cb.bind(this), null, null, null, "_session_auth_2");
                        this.send($iq({
                            type: "set",
                            id: "_session_auth_2"
                        }).c("session", {
                            xmlns: Strophe.NS.SESSION
                        }).tree());
                    } else {
                        this.authenticated = true;
                        this._changeConnectStatus(Strophe.Status.CONNECTED, null);
                    }
                }
            } else {
                Strophe.info("SASL binding failed.");
                this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                return false;
            }
        },
        _sasl_session_cb: function(elem) {
            if (elem.getAttribute("type") == "result") {
                this.authenticated = true;
                this._changeConnectStatus(Strophe.Status.CONNECTED, null);
            } else if (elem.getAttribute("type") == "error") {
                Strophe.info("Session creation failed.");
                this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                return false;
            }
            return false;
        },
        _sasl_failure_cb: function(elem) {
            if (this._sasl_success_handler) {
                this.deleteHandler(this._sasl_success_handler);
                this._sasl_success_handler = null;
            }
            if (this._sasl_challenge_handler) {
                this.deleteHandler(this._sasl_challenge_handler);
                this._sasl_challenge_handler = null;
            }
            this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
            return false;
        },
        _auth2_cb: function(elem) {
            if (elem.getAttribute("type") == "result") {
                this.authenticated = true;
                this._changeConnectStatus(Strophe.Status.CONNECTED, null);
            } else if (elem.getAttribute("type") == "error") {
                this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                this.disconnect();
            }
            return false;
        },
        _addSysTimedHandler: function(period, handler) {
            var thand = new Strophe.TimedHandler(period, handler);
            thand.user = false;
            this.addTimeds.push(thand);
            return thand;
        },
        _addSysHandler: function(handler, ns, name, type, id) {
            var hand = new Strophe.Handler(handler, ns, name, type, id);
            hand.user = false;
            this.addHandlers.push(hand);
            return hand;
        },
        _onDisconnectTimeout: function() {
            Strophe.info("_onDisconnectTimeout was called");
            var req;
            while (this._requests.length > 0) {
                req = this._requests.pop();
                req.abort = true;
                req.xhr.abort();
                req.xhr.onreadystatechange = function() {};
            }
            this._doDisconnect();
            return false;
        },
        _onIdle: function() {
            var i, thand, since, newList;
            while (this.addTimeds.length > 0) {
                this.timedHandlers.push(this.addTimeds.pop());
            }
            while (this.removeTimeds.length > 0) {
                thand = this.removeTimeds.pop();
                i = this.timedHandlers.indexOf(thand);
                if (i >= 0) {
                    this.timedHandlers.splice(i, 1);
                }
            }
            var now = new Date().getTime();
            newList = [];
            for (i = 0; i < this.timedHandlers.length; i++) {
                thand = this.timedHandlers[i];
                if (this.authenticated || !thand.user) {
                    since = thand.lastCalled + thand.period;
                    if (since - now <= 0) {
                        if (thand.run()) {
                            newList.push(thand);
                        }
                    } else {
                        newList.push(thand);
                    }
                }
            }
            this.timedHandlers = newList;
            var body, time_elapsed;
            if (this.authenticated && this._requests.length === 0 && this._data.length === 0 && !this.disconnecting) {
                Strophe.info("no requests during idle cycle, sending " + "blank request");
                this._data.push(null);
            }
            if (this._requests.length < 2 && this._data.length > 0 && !this.paused) {
                body = this._buildBody();
                for (i = 0; i < this._data.length; i++) {
                    if (this._data[i] !== null) {
                        if (this._data[i] === "restart") {
                            body.attrs({
                                to: this.domain,
                                "xml:lang": "en",
                                "xmpp:restart": "true",
                                "xmlns:xmpp": Strophe.NS.BOSH
                            });
                        } else {
                            body.cnode(this._data[i]).up();
                        }
                    }
                }
                delete this._data;
                this._data = [];
                this._requests.push(new Strophe.Request(body.tree(), this._onRequestStateChange.bind(this, this._dataRecv.bind(this)), body.tree().getAttribute("rid")));
                this._processRequest(this._requests.length - 1);
            }
            if (this._requests.length > 0) {
                time_elapsed = this._requests[0].age();
                if (this._requests[0].dead !== null) {
                    if (this._requests[0].timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) {
                        this._throttledRequestHandler();
                    }
                }
                if (time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait)) {
                    Strophe.warn("Request " + this._requests[0].id + " timed out, over " + Math.floor(Strophe.TIMEOUT * this.wait) + " seconds since last activity");
                    this._throttledRequestHandler();
                }
            }
            clearTimeout(this._idleTimeout);
            if (this.connected) {
                this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
            }
        }
    };
    if (callback) {
        callback(Strophe, $build, $msg, $iq, $pres);
    }
})(function() {
    window.Strophe = arguments[0];
    window.$build = arguments[1];
    window.$msg = arguments[2];
    window.$iq = arguments[3];
    window.$pres = arguments[4];
});

Strophe.addConnectionPlugin("roster", {
    _connection: null,
    _callbacks: [],
    items: [],
    ver: null,
    init: function(conn) {
        this._connection = conn;
        this.items = [];
        var oldCallback, roster = this, _connect = conn.connect, _attach = conn.attach;
        var newCallback = function(status) {
            if (status == Strophe.Status.ATTACHED || status == Strophe.Status.CONNECTED) {
                try {
                    conn.addHandler(roster._onReceivePresence.bind(roster), null, "presence", null, null, null);
                    conn.addHandler(roster._onReceiveIQ.bind(roster), Strophe.NS.ROSTER, "iq", "set", null, null);
                } catch (e) {
                    Strophe.error(e);
                }
            }
            if (oldCallback !== null) oldCallback.apply(this, arguments);
        };
        conn.connect = function(jid, pass, callback, wait, hold) {
            oldCallback = callback;
            if (typeof arguments[0] == "undefined") arguments[0] = null;
            if (typeof arguments[1] == "undefined") arguments[1] = null;
            arguments[2] = newCallback;
            _connect.apply(conn, arguments);
        };
        conn.attach = function(jid, sid, rid, callback, wait, hold, wind) {
            oldCallback = callback;
            if (typeof arguments[0] == "undefined") arguments[0] = null;
            if (typeof arguments[1] == "undefined") arguments[1] = null;
            if (typeof arguments[2] == "undefined") arguments[2] = null;
            arguments[3] = newCallback;
            _attach.apply(conn, arguments);
        };
        Strophe.addNamespace("ROSTER_VER", "urn:xmpp:features:rosterver");
        Strophe.addNamespace("NICK", "http://jabber.org/protocol/nick");
    },
    supportVersioning: function() {
        return this._connection.features && this._connection.features.getElementsByTagName("ver").length > 0;
    },
    get: function(userCallback, ver, items) {
        var attrs = {
            xmlns: Strophe.NS.ROSTER
        };
        this.items = [];
        if (this.supportVersioning()) {
            attrs.ver = ver || "";
            this.items = items || [];
        }
        var iq = $iq({
            type: "get",
            id: this._connection.getUniqueId("roster")
        }).c("query", attrs);
        return this._connection.sendIQ(iq, this._onReceiveRosterSuccess.bind(this, userCallback), this._onReceiveRosterError.bind(this, userCallback));
    },
    registerCallback: function(call_back) {
        this._callbacks.push(call_back);
    },
    findItem: function(jid) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] && this.items[i].jid == jid) {
                return this.items[i];
            }
        }
        return false;
    },
    removeItem: function(jid) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] && this.items[i].jid == jid) {
                this.items.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    subscribe: function(jid, message, nick) {
        var pres = $pres({
            to: jid,
            type: "subscribe"
        });
        if (message && message !== "") {
            pres.c("status").t(message);
        }
        if (nick && nick !== "") {
            pres.c("nick", {
                xmlns: Strophe.NS.NICK
            }).t(nick);
        }
        this._connection.send(pres);
    },
    unsubscribe: function(jid, message) {
        var pres = $pres({
            to: jid,
            type: "unsubscribe"
        });
        if (message && message != "") pres.c("status").t(message);
        this._connection.send(pres);
    },
    authorize: function(jid, message) {
        var pres = $pres({
            to: jid,
            type: "subscribed"
        });
        if (message && message != "") pres.c("status").t(message);
        this._connection.send(pres);
    },
    unauthorize: function(jid, message) {
        var pres = $pres({
            to: jid,
            type: "unsubscribed"
        });
        if (message && message != "") pres.c("status").t(message);
        this._connection.send(pres);
    },
    add: function(jid, name, groups, call_back) {
        var iq = $iq({
            type: "set"
        }).c("query", {
            xmlns: Strophe.NS.ROSTER
        }).c("item", {
            jid: jid,
            name: name
        });
        for (var i = 0; i < groups.length; i++) {
            iq.c("group").t(groups[i]).up();
        }
        this._connection.sendIQ(iq, call_back, call_back);
    },
    update: function(jid, name, groups, call_back) {
        var item = this.findItem(jid);
        if (!item) {
            throw "item not found";
        }
        var newName = name || item.name;
        var newGroups = groups || item.groups;
        var iq = $iq({
            type: "set"
        }).c("query", {
            xmlns: Strophe.NS.ROSTER
        }).c("item", {
            jid: item.jid,
            name: newName
        });
        for (var i = 0; i < newGroups.length; i++) {
            iq.c("group").t(newGroups[i]).up();
        }
        return this._connection.sendIQ(iq, call_back, call_back);
    },
    remove: function(jid, call_back) {
        var item = this.findItem(jid);
        if (!item) {
            throw "item not found";
        }
        var iq = $iq({
            type: "set"
        }).c("query", {
            xmlns: Strophe.NS.ROSTER
        }).c("item", {
            jid: item.jid,
            subscription: "remove"
        });
        this._connection.sendIQ(iq, call_back, call_back);
    },
    _onReceiveRosterSuccess: function(userCallback, stanza) {
        this._updateItems(stanza);
        userCallback(this.items);
    },
    _onReceiveRosterError: function(userCallback, stanza) {
        userCallback(this.items);
    },
    _onReceivePresence: function(presence) {
        var jid = presence.getAttribute("from");
        var from = Strophe.getBareJidFromJid(jid);
        var item = this.findItem(from);
        if (!item) {
            return true;
        }
        var type = presence.getAttribute("type");
        if (type == "unavailable") {
            delete item.resources[Strophe.getResourceFromJid(jid)];
        } else if (!type) {
            item.resources[Strophe.getResourceFromJid(jid)] = {
                show: presence.getElementsByTagName("show").length != 0 ? Strophe.getText(presence.getElementsByTagName("show")[0]) : "",
                status: presence.getElementsByTagName("status").length != 0 ? Strophe.getText(presence.getElementsByTagName("status")[0]) : "",
                priority: presence.getElementsByTagName("priority").length != 0 ? Strophe.getText(presence.getElementsByTagName("priority")[0]) : ""
            };
        } else {
            return true;
        }
        this._call_backs(this.items, item);
        return true;
    },
    _call_backs: function(items, item) {
        for (var i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](items, item);
        }
    },
    _onReceiveIQ: function(iq) {
        var id = iq.getAttribute("id");
        var from = iq.getAttribute("from");
        if (from && from != "" && from != this._connection.jid && from != Strophe.getBareJidFromJid(this._connection.jid)) return true;
        var iqresult = $iq({
            type: "result",
            id: id,
            from: this._connection.jid
        });
        this._connection.send(iqresult);
        this._updateItems(iq);
        return true;
    },
    _updateItems: function(iq) {
        var query = iq.getElementsByTagName("query");
        if (query.length != 0) {
            this.ver = query.item(0).getAttribute("ver");
            var self = this;
            Strophe.forEachChild(query.item(0), "item", function(item) {
                self._updateItem(item);
            });
        }
        this._call_backs(this.items);
    },
    _updateItem: function(item) {
        var jid = item.getAttribute("jid");
        var name = item.getAttribute("name");
        var subscription = item.getAttribute("subscription");
        var ask = item.getAttribute("ask");
        var groups = [];
        Strophe.forEachChild(item, "group", function(group) {
            groups.push(Strophe.getText(group));
        });
        if (subscription == "remove") {
            this.removeItem(jid);
            return;
        }
        var item = this.findItem(jid);
        if (!item) {
            this.items.push({
                name: name,
                jid: jid,
                subscription: subscription,
                ask: ask,
                groups: groups,
                resources: {}
            });
        } else {
            item.name = name;
            item.subscription = subscription;
            item.ask = ask;
            item.groups = groups;
        }
    }
});

(function() {
    var Occupant, RoomConfig, XmppRoom, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    Strophe.addConnectionPlugin("muc", {
        _connection: null,
        rooms: {},
        roomNames: [],
        init: function(conn) {
            this._connection = conn;
            this._muc_handler = null;
            Strophe.addNamespace("MUC_OWNER", Strophe.NS.MUC + "#owner");
            Strophe.addNamespace("MUC_ADMIN", Strophe.NS.MUC + "#admin");
            Strophe.addNamespace("MUC_USER", Strophe.NS.MUC + "#user");
            return Strophe.addNamespace("MUC_ROOMCONF", Strophe.NS.MUC + "#roomconfig");
        },
        join: function(room, nick, msg_handler_cb, pres_handler_cb, roster_cb, password, history_attrs) {
            var msg, room_nick, _this = this;
            room_nick = this.test_append_nick(room, nick);
            msg = $pres({
                from: this._connection.jid,
                to: room_nick
            }).c("x", {
                xmlns: Strophe.NS.MUC
            });
            if (history_attrs != null) {
                msg = msg.c("history", history_attrs).up;
            }
            if (password != null) {
                msg.cnode(Strophe.xmlElement("password", [], password));
            }
            if (typeof extended_presence !== "undefined" && extended_presence !== null) {
                msg.up.cnode(extended_presence);
            }
            if (this._muc_handler == null) {
                this._muc_handler = this._connection.addHandler(function(stanza) {
                    var from, handler, handlers, id, roomname, x, xmlns, xquery, _i, _len;
                    from = stanza.getAttribute("from");
                    if (!from) {
                        return true;
                    }
                    roomname = from.split("/")[0];
                    if (!_this.rooms[roomname]) {
                        return true;
                    }
                    room = _this.rooms[roomname];
                    handlers = {};
                    if (stanza.nodeName === "message") {
                        handlers = room._message_handlers;
                    } else if (stanza.nodeName === "presence") {
                        xquery = stanza.getElementsByTagName("x");
                        if (xquery.length > 0) {
                            for (_i = 0, _len = xquery.length; _i < _len; _i++) {
                                x = xquery[_i];
                                xmlns = x.getAttribute("xmlns");
                                if (xmlns && xmlns.match(Strophe.NS.MUC)) {
                                    handlers = room._presence_handlers;
                                    break;
                                }
                            }
                        }
                    }
                    for (id in handlers) {
                        handler = handlers[id];
                        if (!handler(stanza, room)) {
                            delete handlers[id];
                        }
                    }
                    return true;
                });
            }
            if (!this.rooms.hasOwnProperty(room)) {
                this.rooms[room] = new XmppRoom(this, room, nick, password);
                this.roomNames.push(room);
            }
            if (pres_handler_cb) {
                this.rooms[room].addHandler("presence", pres_handler_cb);
            }
            if (msg_handler_cb) {
                this.rooms[room].addHandler("message", msg_handler_cb);
            }
            if (roster_cb) {
                this.rooms[room].addHandler("roster", roster_cb);
            }
            return this._connection.send(msg);
        },
        leave: function(room, nick, handler_cb, exit_msg) {
            var id, presence, presenceid, room_nick;
            id = this.roomNames.indexOf(room);
            delete this.rooms[room];
            if (id >= 0) {
                this.roomNames.splice(id, 1);
                if (this.roomNames.length === 0) {
                    this._connection.deleteHandler(this._muc_handler);
                    this._muc_handler = null;
                }
            }
            room_nick = this.test_append_nick(room, nick);
            presenceid = this._connection.getUniqueId();
            presence = $pres({
                type: "unavailable",
                id: presenceid,
                from: this._connection.jid,
                to: room_nick
            });
            if (exit_msg != null) {
                presence.c("status", exit_msg);
            }
            if (handler_cb != null) {
                this._connection.addHandler(handler_cb, null, "presence", null, presenceid);
            }
            this._connection.send(presence);
            return presenceid;
        },
        message: function(room, nick, message, html_message, type) {
            var msg, msgid, parent, room_nick;
            room_nick = this.test_append_nick(room, nick);
            type = type || (nick != null ? "chat" : "groupchat");
            msgid = this._connection.getUniqueId();
            msg = $msg({
                to: room_nick,
                from: this._connection.jid,
                type: type,
                id: msgid
            }).c("body", {
                xmlns: Strophe.NS.CLIENT
            }).t(message);
            msg.up();
            if (html_message != null) {
                msg.c("html", {
                    xmlns: Strophe.NS.XHTML_IM
                }).c("body", {
                    xmlns: Strophe.NS.XHTML
                }).t(html_message);
                if (msg.node.childNodes.length === 0) {
                    parent = msg.node.parentNode;
                    msg.up().up();
                    msg.node.removeChild(parent);
                } else {
                    msg.up().up();
                }
            }
            msg.c("x", {
                xmlns: "jabber:x:event"
            }).c("composing");
            this._connection.send(msg);
            return msgid;
        },
        groupchat: function(room, message, html_message) {
            return this.message(room, null, message, html_message);
        },
        invite: function(room, receiver, reason) {
            var invitation, msgid;
            msgid = this._connection.getUniqueId();
            invitation = $msg({
                from: this._connection.jid,
                to: room,
                id: msgid
            }).c("x", {
                xmlns: Strophe.NS.MUC_USER
            }).c("invite", {
                to: receiver
            });
            if (reason != null) {
                invitation.c("reason", reason);
            }
            this._connection.send(invitation);
            return msgid;
        },
        directInvite: function(room, receiver, reason, password) {
            var attrs, invitation, msgid;
            msgid = this._connection.getUniqueId();
            attrs = {
                xmlns: "jabber:x:conference",
                jid: room
            };
            if (reason != null) {
                attrs.reason = reason;
            }
            if (password != null) {
                attrs.password = password;
            }
            invitation = $msg({
                from: this._connection.jid,
                to: receiver,
                id: msgid
            }).c("x", attrs);
            this._connection.send(invitation);
            return msgid;
        },
        queryOccupants: function(room, success_cb, error_cb) {
            var attrs, info;
            attrs = {
                xmlns: Strophe.NS.DISCO_ITEMS
            };
            info = $iq({
                from: this._connection.jid,
                to: room,
                type: "get"
            }).c("query", attrs);
            return this._connection.sendIQ(info, success_cb, error_cb);
        },
        configure: function(room, handler_cb, error_cb) {
            var config, stanza;
            config = $iq({
                to: room,
                type: "get"
            }).c("query", {
                xmlns: Strophe.NS.MUC_OWNER
            });
            stanza = config.tree();
            return this._connection.sendIQ(stanza, handler_cb, error_cb);
        },
        cancelConfigure: function(room) {
            var config, stanza;
            config = $iq({
                to: room,
                type: "set"
            }).c("query", {
                xmlns: Strophe.NS.MUC_OWNER
            }).c("x", {
                xmlns: "jabber:x:data",
                type: "cancel"
            });
            stanza = config.tree();
            return this._connection.sendIQ(stanza);
        },
        saveConfiguration: function(room, config, success_cb, error_cb) {
            var conf, iq, stanza, _i, _len;
            iq = $iq({
                to: room,
                type: "set"
            }).c("query", {
                xmlns: Strophe.NS.MUC_OWNER
            });
            if (typeof Form !== "undefined" && config instanceof Form) {
                config.type = "submit";
                iq.cnode(config.toXML());
            } else {
                iq.c("x", {
                    xmlns: "jabber:x:data",
                    type: "submit"
                });
                for (_i = 0, _len = config.length; _i < _len; _i++) {
                    conf = config[_i];
                    iq.cnode(conf).up();
                }
            }
            stanza = iq.tree();
            return this._connection.sendIQ(stanza, success_cb, error_cb);
        },
        createInstantRoom: function(room, success_cb, error_cb) {
            var roomiq;
            roomiq = $iq({
                to: room,
                type: "set"
            }).c("query", {
                xmlns: Strophe.NS.MUC_OWNER
            }).c("x", {
                xmlns: "jabber:x:data",
                type: "submit"
            });
            return this._connection.sendIQ(roomiq.tree(), success_cb, error_cb);
        },
        setTopic: function(room, topic) {
            var msg;
            msg = $msg({
                to: room,
                from: this._connection.jid,
                type: "groupchat"
            }).c("subject", {
                xmlns: "jabber:client"
            }).t(topic);
            return this._connection.send(msg.tree());
        },
        _modifyPrivilege: function(room, item, reason, handler_cb, error_cb) {
            var iq;
            iq = $iq({
                to: room,
                type: "set"
            }).c("query", {
                xmlns: Strophe.NS.MUC_ADMIN
            }).cnode(item.node);
            if (reason != null) {
                iq.c("reason", reason);
            }
            return this._connection.sendIQ(iq.tree(), handler_cb, error_cb);
        },
        modifyRole: function(room, nick, role, reason, handler_cb, error_cb) {
            var item;
            item = $build("item", {
                nick: nick,
                role: role
            });
            return this._modifyPrivilege(room, item, reason, handler_cb, error_cb);
        },
        kick: function(room, nick, reason, handler_cb, error_cb) {
            return this.modifyRole(room, nick, "none", reason, handler_cb, error_cb);
        },
        voice: function(room, nick, reason, handler_cb, error_cb) {
            return this.modifyRole(room, nick, "participant", reason, handler_cb, error_cb);
        },
        mute: function(room, nick, reason, handler_cb, error_cb) {
            return this.modifyRole(room, nick, "visitor", reason, handler_cb, error_cb);
        },
        op: function(room, nick, reason, handler_cb, error_cb) {
            return this.modifyRole(room, nick, "moderator", reason, handler_cb, error_cb);
        },
        deop: function(room, nick, reason, handler_cb, error_cb) {
            return this.modifyRole(room, nick, "participant", reason, handler_cb, error_cb);
        },
        modifyAffiliation: function(room, jid, affiliation, reason, handler_cb, error_cb) {
            var item;
            item = $build("item", {
                jid: jid,
                affiliation: affiliation
            });
            return this._modifyPrivilege(room, item, reason, handler_cb, error_cb);
        },
        ban: function(room, jid, reason, handler_cb, error_cb) {
            return this.modifyAffiliation(room, jid, "outcast", reason, handler_cb, error_cb);
        },
        member: function(room, jid, reason, handler_cb, error_cb) {
            return this.modifyAffiliation(room, jid, "member", reason, handler_cb, error_cb);
        },
        revoke: function(room, jid, reason, handler_cb, error_cb) {
            return this.modifyAffiliation(room, jid, "none", reason, handler_cb, error_cb);
        },
        owner: function(room, jid, reason, handler_cb, error_cb) {
            return this.modifyAffiliation(room, jid, "owner", reason, handler_cb, error_cb);
        },
        admin: function(room, jid, reason, handler_cb, error_cb) {
            return this.modifyAffiliation(room, jid, "admin", reason, handler_cb, error_cb);
        },
        changeNick: function(room, user) {
            var presence, room_nick;
            room_nick = this.test_append_nick(room, user);
            presence = $pres({
                from: this._connection.jid,
                to: room_nick,
                id: this._connection.getUniqueId()
            });
            return this._connection.send(presence.tree());
        },
        setStatus: function(room, user, show, status) {
            var presence, room_nick;
            room_nick = this.test_append_nick(room, user);
            presence = $pres({
                from: this._connection.jid,
                to: room_nick
            });
            if (show != null) {
                presence.c("show", show).up();
            }
            if (status != null) {
                presence.c("status", status);
            }
            return this._connection.send(presence.tree());
        },
        listRooms: function(server, handle_cb, error_cb) {
            var iq;
            iq = $iq({
                to: server,
                from: this._connection.jid,
                type: "get"
            }).c("query", {
                xmlns: Strophe.NS.DISCO_ITEMS
            });
            return this._connection.sendIQ(iq, handle_cb, error_cb);
        },
        test_append_nick: function(room, nick) {
            return room + (nick != null ? "/" + Strophe.escapeNode(nick) : "");
        }
    });
    XmppRoom = function() {
        function XmppRoom(client, name, nick, password) {
            this.client = client;
            this.name = name;
            this.nick = nick;
            this.password = password;
            this._roomRosterHandler = __bind(this._roomRosterHandler, this);
            this._addOccupant = __bind(this._addOccupant, this);
            this.roster = {};
            this._message_handlers = {};
            this._presence_handlers = {};
            this._roster_handlers = {};
            this._handler_ids = 0;
            if (client.muc) {
                this.client = client.muc;
            }
            this.name = Strophe.getBareJidFromJid(name);
            this.addHandler("presence", this._roomRosterHandler);
        }
        XmppRoom.prototype.join = function(msg_handler_cb, pres_handler_cb, roster_cb) {
            return this.client.join(this.name, this.nick, msg_handler_cb, pres_handler_cb, roster_cb, this.password);
        };
        XmppRoom.prototype.leave = function(handler_cb, message) {
            this.client.leave(this.name, this.nick, handler_cb, message);
            return delete this.client.rooms[this.name];
        };
        XmppRoom.prototype.message = function(nick, message, html_message, type) {
            return this.client.message(this.name, nick, message, html_message, type);
        };
        XmppRoom.prototype.groupchat = function(message, html_message) {
            return this.client.groupchat(this.name, message, html_message);
        };
        XmppRoom.prototype.invite = function(receiver, reason) {
            return this.client.invite(this.name, receiver, reason);
        };
        XmppRoom.prototype.directInvite = function(receiver, reason) {
            return this.client.directInvite(this.name, receiver, reason, this.password);
        };
        XmppRoom.prototype.configure = function(handler_cb) {
            return this.client.configure(this.name, handler_cb);
        };
        XmppRoom.prototype.cancelConfigure = function() {
            return this.client.cancelConfigure(this.name);
        };
        XmppRoom.prototype.saveConfiguration = function(config) {
            return this.client.saveConfiguration(this.name, config);
        };
        XmppRoom.prototype.queryOccupants = function(success_cb, error_cb) {
            return this.client.queryOccupants(this.name, success_cb, error_cb);
        };
        XmppRoom.prototype.setTopic = function(topic) {
            return this.client.setTopic(this.name, topic);
        };
        XmppRoom.prototype.modifyRole = function(nick, role, reason, success_cb, error_cb) {
            return this.client.modifyRole(this.name, nick, role, reason, success_cb, error_cb);
        };
        XmppRoom.prototype.kick = function(nick, reason, handler_cb, error_cb) {
            return this.client.kick(this.name, nick, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.voice = function(nick, reason, handler_cb, error_cb) {
            return this.client.voice(this.name, nick, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.mute = function(nick, reason, handler_cb, error_cb) {
            return this.client.mute(this.name, nick, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.op = function(nick, reason, handler_cb, error_cb) {
            return this.client.op(this.name, nick, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.deop = function(nick, reason, handler_cb, error_cb) {
            return this.client.deop(this.name, nick, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.modifyAffiliation = function(jid, affiliation, reason, success_cb, error_cb) {
            return this.client.modifyAffiliation(this.name, jid, affiliation, reason, success_cb, error_cb);
        };
        XmppRoom.prototype.ban = function(jid, reason, handler_cb, error_cb) {
            return this.client.ban(this.name, jid, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.member = function(jid, reason, handler_cb, error_cb) {
            return this.client.member(this.name, jid, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.revoke = function(jid, reason, handler_cb, error_cb) {
            return this.client.revoke(this.name, jid, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.owner = function(jid, reason, handler_cb, error_cb) {
            return this.client.owner(this.name, jid, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.admin = function(jid, reason, handler_cb, error_cb) {
            return this.client.admin(this.name, jid, reason, handler_cb, error_cb);
        };
        XmppRoom.prototype.changeNick = function(nick) {
            this.nick = nick;
            return this.client.changeNick(this.name, nick);
        };
        XmppRoom.prototype.setStatus = function(show, status) {
            return this.client.setStatus(this.name, this.nick, show, status);
        };
        XmppRoom.prototype.addHandler = function(handler_type, handler) {
            var id;
            id = this._handler_ids++;
            switch (handler_type) {
              case "presence":
                this._presence_handlers[id] = handler;
                break;

              case "message":
                this._message_handlers[id] = handler;
                break;

              case "roster":
                this._roster_handlers[id] = handler;
                break;

              default:
                this._handler_ids--;
                return null;
            }
            return id;
        };
        XmppRoom.prototype.removeHandler = function(id) {
            delete this._presence_handlers[id];
            delete this._message_handlers[id];
            return delete this._roster_handlers[id];
        };
        XmppRoom.prototype._addOccupant = function(data) {
            var occ;
            occ = new Occupant(data, this);
            this.roster[occ.nick] = occ;
            return occ;
        };
        XmppRoom.prototype._roomRosterHandler = function(pres) {
            var data, handler, id, newnick, nick, _ref;
            data = XmppRoom._parsePresence(pres);
            nick = data.nick;
            newnick = data.newnick || null;
            switch (data.type) {
              case "error":
                return;

              case "unavailable":
                if (newnick) {
                    data.nick = newnick;
                    if (this.roster[nick] && this.roster[newnick]) {
                        this.roster[nick].update(this.roster[newnick]);
                        this.roster[newnick] = this.roster[nick];
                    }
                    if (this.roster[nick] && !this.roster[newnick]) {
                        this.roster[newnick] = this.roster[nick].update(data);
                    }
                }
                delete this.roster[nick];
                break;

              default:
                if (this.roster[nick]) {
                    this.roster[nick].update(data);
                } else {
                    this._addOccupant(data);
                }
            }
            _ref = this._roster_handlers;
            for (id in _ref) {
                handler = _ref[id];
                if (!handler(this.roster, this)) {
                    delete this._roster_handlers[id];
                }
            }
            return true;
        };
        XmppRoom._parsePresence = function(pres) {
            var a, c, c2, data, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
            data = {};
            a = pres.attributes;
            data.nick = Strophe.getResourceFromJid(a.from.textContent);
            data.type = ((_ref = a.type) != null ? _ref.textContent : void 0) || null;
            data.states = [];
            _ref1 = pres.childNodes;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                c = _ref1[_i];
                switch (c.nodeName) {
                  case "status":
                    data.status = c.textContent || null;
                    break;

                  case "show":
                    data.show = c.textContent || null;
                    break;

                  case "x":
                    a = c.attributes;
                    if (((_ref2 = a.xmlns) != null ? _ref2.textContent : void 0) === Strophe.NS.MUC_USER) {
                        _ref3 = c.childNodes;
                        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                            c2 = _ref3[_j];
                            switch (c2.nodeName) {
                              case "item":
                                a = c2.attributes;
                                data.affiliation = ((_ref4 = a.affiliation) != null ? _ref4.textContent : void 0) || null;
                                data.role = ((_ref5 = a.role) != null ? _ref5.textContent : void 0) || null;
                                data.jid = ((_ref6 = a.jid) != null ? _ref6.textContent : void 0) || null;
                                data.newnick = ((_ref7 = a.nick) != null ? _ref7.textContent : void 0) || null;
                                break;

                              case "status":
                                if (c2.attributes.code) {
                                    data.states.push(c2.attributes.code.textContent);
                                }
                            }
                        }
                    }
                }
            }
            return data;
        };
        return XmppRoom;
    }();
    RoomConfig = function() {
        function RoomConfig(info) {
            this.parse = __bind(this.parse, this);
            if (info != null) {
                this.parse(info);
            }
        }
        RoomConfig.prototype.parse = function(result) {
            var attr, attrs, child, field, identity, query, _i, _j, _k, _len, _len1, _len2, _ref;
            query = result.getElementsByTagName("query")[0].childNodes;
            this.identities = [];
            this.features = [];
            this.x = [];
            for (_i = 0, _len = query.length; _i < _len; _i++) {
                child = query[_i];
                attrs = child.attributes;
                switch (child.nodeName) {
                  case "identity":
                    identity = {};
                    for (_j = 0, _len1 = attrs.length; _j < _len1; _j++) {
                        attr = attrs[_j];
                        identity[attr.name] = attr.textContent;
                    }
                    this.identities.push(identity);
                    break;

                  case "feature":
                    this.features.push(attrs["var"].textContent);
                    break;

                  case "x":
                    attrs = child.childNodes[0].attributes;
                    if (!attrs["var"].textContent === "FORM_TYPE" || !attrs.type.textContent === "hidden") {
                        break;
                    }
                    _ref = child.childNodes;
                    for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
                        field = _ref[_k];
                        if (!!field.attributes.type) {
                            continue;
                        }
                        attrs = field.attributes;
                        this.x.push({
                            "var": attrs["var"].textContent,
                            label: attrs.label.textContent || "",
                            value: field.firstChild.textContent || ""
                        });
                    }
                }
            }
            return {
                identities: this.identities,
                features: this.features,
                x: this.x
            };
        };
        return RoomConfig;
    }();
    Occupant = function() {
        function Occupant(data, room) {
            this.room = room;
            this.update = __bind(this.update, this);
            this.admin = __bind(this.admin, this);
            this.owner = __bind(this.owner, this);
            this.revoke = __bind(this.revoke, this);
            this.member = __bind(this.member, this);
            this.ban = __bind(this.ban, this);
            this.modifyAffiliation = __bind(this.modifyAffiliation, this);
            this.deop = __bind(this.deop, this);
            this.op = __bind(this.op, this);
            this.mute = __bind(this.mute, this);
            this.voice = __bind(this.voice, this);
            this.kick = __bind(this.kick, this);
            this.modifyRole = __bind(this.modifyRole, this);
            this.update(data);
        }
        Occupant.prototype.modifyRole = function(role, reason, success_cb, error_cb) {
            return this.room.modifyRole(this.nick, role, reason, success_cb, error_cb);
        };
        Occupant.prototype.kick = function(reason, handler_cb, error_cb) {
            return this.room.kick(this.nick, reason, handler_cb, error_cb);
        };
        Occupant.prototype.voice = function(reason, handler_cb, error_cb) {
            return this.room.voice(this.nick, reason, handler_cb, error_cb);
        };
        Occupant.prototype.mute = function(reason, handler_cb, error_cb) {
            return this.room.mute(this.nick, reason, handler_cb, error_cb);
        };
        Occupant.prototype.op = function(reason, handler_cb, error_cb) {
            return this.room.op(this.nick, reason, handler_cb, error_cb);
        };
        Occupant.prototype.deop = function(reason, handler_cb, error_cb) {
            return this.room.deop(this.nick, reason, handler_cb, error_cb);
        };
        Occupant.prototype.modifyAffiliation = function(affiliation, reason, success_cb, error_cb) {
            return this.room.modifyAffiliation(this.jid, affiliation, reason, success_cb, error_cb);
        };
        Occupant.prototype.ban = function(reason, handler_cb, error_cb) {
            return this.room.ban(this.jid, reason, handler_cb, error_cb);
        };
        Occupant.prototype.member = function(reason, handler_cb, error_cb) {
            return this.room.member(this.jid, reason, handler_cb, error_cb);
        };
        Occupant.prototype.revoke = function(reason, handler_cb, error_cb) {
            return this.room.revoke(this.jid, reason, handler_cb, error_cb);
        };
        Occupant.prototype.owner = function(reason, handler_cb, error_cb) {
            return this.room.owner(this.jid, reason, handler_cb, error_cb);
        };
        Occupant.prototype.admin = function(reason, handler_cb, error_cb) {
            return this.room.admin(this.jid, reason, handler_cb, error_cb);
        };
        Occupant.prototype.update = function(data) {
            this.nick = data.nick || null;
            this.affiliation = data.affiliation || null;
            this.role = data.role || null;
            this.jid = data.jid || null;
            this.status = data.status || null;
            this.show = data.show || null;
            return this;
        };
        return Occupant;
    }();
}).call(this);

var buildIq;

buildIq = function(type, jid, vCardEl) {
    var iq;
    iq = $iq(jid ? {
        type: type,
        to: jid
    } : {
        type: type
    });
    iq.c("vCard", {
        xmlns: Strophe.NS.VCARD
    });
    if (vCardEl) {
        iq.cnode(vCardEl);
    }
    return iq;
};

Strophe.addConnectionPlugin("vcard", {
    _connection: null,
    init: function(conn) {
        this._connection = conn;
        return Strophe.addNamespace("VCARD", "vcard-temp");
    },
    get: function(handler_cb, jid, error_cb) {
        var iq;
        iq = buildIq("get", jid);
        return this._connection.sendIQ(iq, handler_cb, error_cb);
    },
    set: function(handler_cb, vCardEl, jid, error_cb) {
        var iq;
        iq = buildIq("set", jid, vCardEl);
        return this._connection.sendIQ(iq, handler_cb, error_rb);
    }
});

Strophe.addConnectionPlugin("disco", {
    _connection: null,
    _identities: [],
    _features: [],
    _items: [],
    init: function(conn) {
        this._connection = conn;
        this._identities = [];
        this._features = [];
        this._items = [];
        conn.addHandler(this._onDiscoInfo.bind(this), Strophe.NS.DISCO_INFO, "iq", "get", null, null);
        conn.addHandler(this._onDiscoItems.bind(this), Strophe.NS.DISCO_ITEMS, "iq", "get", null, null);
    },
    addIdentity: function(category, type, name, lang) {
        for (var i = 0; i < this._identities.length; i++) {
            if (this._identities[i].category == category && this._identities[i].type == type && this._identities[i].name == name && this._identities[i].lang == lang) {
                return false;
            }
        }
        this._identities.push({
            category: category,
            type: type,
            name: name,
            lang: lang
        });
        return true;
    },
    addFeature: function(var_name) {
        for (var i = 0; i < this._features.length; i++) {
            if (this._features[i] == var_name) return false;
        }
        this._features.push(var_name);
        return true;
    },
    removeFeature: function(var_name) {
        for (var i = 0; i < this._features.length; i++) {
            if (this._features[i] === var_name) {
                this._features.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    addItem: function(jid, name, node, call_back) {
        if (node && !call_back) return false;
        this._items.push({
            jid: jid,
            name: name,
            node: node,
            call_back: call_back
        });
        return true;
    },
    info: function(jid, node, success, error, timeout) {
        var attrs = {
            xmlns: Strophe.NS.DISCO_INFO
        };
        if (node) attrs.node = node;
        var info = $iq({
            from: this._connection.jid,
            to: jid,
            type: "get"
        }).c("query", attrs);
        this._connection.sendIQ(info, success, error, timeout);
    },
    items: function(jid, node, success, error, timeout) {
        var attrs = {
            xmlns: Strophe.NS.DISCO_ITEMS
        };
        if (node) attrs.node = node;
        var items = $iq({
            from: this._connection.jid,
            to: jid,
            type: "get"
        }).c("query", attrs);
        this._connection.sendIQ(items, success, error, timeout);
    },
    _buildIQResult: function(stanza, query_attrs) {
        var id = stanza.getAttribute("id");
        var from = stanza.getAttribute("from");
        var iqresult = $iq({
            type: "result",
            id: id
        });
        if (from !== null) {
            iqresult.attrs({
                to: from
            });
        }
        return iqresult.c("query", query_attrs);
    },
    _onDiscoInfo: function(stanza) {
        var node = stanza.getElementsByTagName("query")[0].getAttribute("node");
        var attrs = {
            xmlns: Strophe.NS.DISCO_INFO
        };
        if (node) {
            attrs.node = node;
        }
        var iqresult = this._buildIQResult(stanza, attrs);
        for (var i = 0; i < this._identities.length; i++) {
            var attrs = {
                category: this._identities[i].category,
                type: this._identities[i].type
            };
            if (this._identities[i].name) attrs.name = this._identities[i].name;
            if (this._identities[i].lang) attrs["xml:lang"] = this._identities[i].lang;
            iqresult.c("identity", attrs).up();
        }
        for (var i = 0; i < this._features.length; i++) {
            iqresult.c("feature", {
                "var": this._features[i]
            }).up();
        }
        this._connection.send(iqresult.tree());
        return true;
    },
    _onDiscoItems: function(stanza) {
        var query_attrs = {
            xmlns: Strophe.NS.DISCO_ITEMS
        };
        var node = stanza.getElementsByTagName("query")[0].getAttribute("node");
        if (node) {
            query_attrs.node = node;
            var items = [];
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].node == node) {
                    items = this._items[i].call_back(stanza);
                    break;
                }
            }
        } else {
            var items = this._items;
        }
        var iqresult = this._buildIQResult(stanza, query_attrs);
        for (var i = 0; i < items.length; i++) {
            var attrs = {
                jid: items[i].jid
            };
            if (items[i].name) attrs.name = items[i].name;
            if (items[i].node) attrs.node = items[i].node;
            iqresult.c("item", attrs).up();
        }
        this._connection.send(iqresult.tree());
        return true;
    }
});

(function() {
    var root = this;
    var previousUnderscore = root._;
    var breaker = {};
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
    _.VERSION = "1.5.1";
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (_.has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    };
    var reduceError = "Reduce of empty array with no initial value";
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduce && obj.reduce === nativeReduce) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
            if (!initial) {
                memo = value;
                initial = true;
            } else {
                memo = iterator.call(context, memo, value, index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length;
        }
        each(obj, function(value, index, list) {
            index = keys ? keys[--length] : --length;
            if (!initial) {
                memo = obj[index];
                initial = true;
            } else {
                memo = iterator.call(context, memo, obj[index], index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.find = _.detect = function(obj, iterator, context) {
        var result;
        any(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) results.push(value);
        });
        return results;
    };
    _.reject = function(obj, iterator, context) {
        return _.filter(obj, function(value, index, list) {
            return !iterator.call(context, value, index, list);
        }, context);
    };
    _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = true;
        if (obj == null) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
        each(obj, function(value, index, list) {
            if (!(result = result && iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = false;
        if (obj == null) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
        each(obj, function(value, index, list) {
            if (result || (result = iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    _.contains = _.include = function(obj, target) {
        if (obj == null) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
        return any(obj, function(value) {
            return value === target;
        });
    };
    _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    };
    _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
            return value[key];
        });
    };
    _.where = function(obj, attrs, first) {
        if (_.isEmpty(attrs)) return first ? void 0 : [];
        return _[first ? "find" : "filter"](obj, function(value) {
            for (var key in attrs) {
                if (attrs[key] !== value[key]) return false;
            }
            return true;
        });
    };
    _.findWhere = function(obj, attrs) {
        return _.where(obj, attrs, true);
    };
    _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.max.apply(Math, obj);
        }
        if (!iterator && _.isEmpty(obj)) return -Infinity;
        var result = {
            computed: -Infinity,
            value: -Infinity
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed > result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.min.apply(Math, obj);
        }
        if (!iterator && _.isEmpty(obj)) return Infinity;
        var result = {
            computed: Infinity,
            value: Infinity
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed < result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.shuffle = function(obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function(value) {
            rand = _.random(index++);
            shuffled[index - 1] = shuffled[rand];
            shuffled[rand] = value;
        });
        return shuffled;
    };
    var lookupIterator = function(value) {
        return _.isFunction(value) ? value : function(obj) {
            return obj[value];
        };
    };
    _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index < right.index ? -1 : 1;
        }), "value");
    };
    var group = function(obj, value, context, behavior) {
        var result = {};
        var iterator = lookupIterator(value == null ? _.identity : value);
        each(obj, function(value, index) {
            var key = iterator.call(context, value, index, obj);
            behavior(result, key, value);
        });
        return result;
    };
    _.groupBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key, value) {
            (_.has(result, key) ? result[key] : result[key] = []).push(value);
        });
    };
    _.countBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key) {
            if (!_.has(result, key)) result[key] = 0;
            result[key]++;
        });
    };
    _.sortedIndex = function(array, obj, iterator, context) {
        iterator = iterator == null ? _.identity : lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = low + high >>> 1;
            iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
    };
    _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
    };
    _.size = function(obj) {
        if (obj == null) return 0;
        return obj.length === +obj.length ? obj.length : _.keys(obj).length;
    };
    _.first = _.head = _.take = function(array, n, guard) {
        if (array == null) return void 0;
        return n != null && !guard ? slice.call(array, 0, n) : array[0];
    };
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - (n == null || guard ? 1 : n));
    };
    _.last = function(array, n, guard) {
        if (array == null) return void 0;
        if (n != null && !guard) {
            return slice.call(array, Math.max(array.length - n, 0));
        } else {
            return array[array.length - 1];
        }
    };
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };
    _.compact = function(array) {
        return _.filter(array, _.identity);
    };
    var flatten = function(input, shallow, output) {
        if (shallow && _.every(input, _.isArray)) {
            return concat.apply(output, input);
        }
        each(input, function(value) {
            if (_.isArray(value) || _.isArguments(value)) {
                shallow ? push.apply(output, value) : flatten(value, shallow, output);
            } else {
                output.push(value);
            }
        });
        return output;
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, []);
    };
    _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.uniq = _.unique = function(array, isSorted, iterator, context) {
        if (_.isFunction(isSorted)) {
            context = iterator;
            iterator = isSorted;
            isSorted = false;
        }
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function(value, index) {
            if (isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) {
                seen.push(value);
                results.push(array[index]);
            }
        });
        return results;
    };
    _.union = function() {
        return _.uniq(_.flatten(arguments, true));
    };
    _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.indexOf(other, item) >= 0;
            });
        });
    };
    _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    };
    _.zip = function() {
        var length = _.max(_.pluck(arguments, "length").concat(0));
        var results = new Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = _.pluck(arguments, "" + i);
        }
        return results;
    };
    _.object = function(list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, l = list.length; i < l; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };
    _.indexOf = function(array, item, isSorted) {
        if (array == null) return -1;
        var i = 0, l = array.length;
        if (isSorted) {
            if (typeof isSorted == "number") {
                i = isSorted < 0 ? Math.max(0, l + isSorted) : isSorted;
            } else {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (;i < l; i++) if (array[i] === item) return i;
        return -1;
    };
    _.lastIndexOf = function(array, item, from) {
        if (array == null) return -1;
        var hasIndex = from != null;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
            return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        }
        var i = hasIndex ? from : array.length;
        while (i--) if (array[i] === item) return i;
        return -1;
    };
    _.range = function(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var len = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(len);
        while (idx < len) {
            range[idx++] = start;
            start += step;
        }
        return range;
    };
    var ctor = function() {};
    _.bind = function(func, context) {
        var args, bound;
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError();
        args = slice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor();
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) return result;
            return self;
        };
    };
    _.partial = function(func) {
        var args = slice.call(arguments, 1);
        return function() {
            return func.apply(this, args.concat(slice.call(arguments)));
        };
    };
    _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length === 0) throw new Error("bindAll must be passed function names");
        each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };
    _.memoize = function(func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments);
        };
    };
    _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = function(func) {
        return _.delay.apply(_, [ func, 1 ].concat(slice.call(arguments, 1)));
    };
    _.throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function() {
            previous = options.leading === false ? 0 : new Date();
            timeout = null;
            result = func.apply(context, args);
        };
        return function() {
            var now = new Date();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };
    _.debounce = function(func, wait, immediate) {
        var result;
        var timeout = null;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) result = func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(context, args);
            return result;
        };
    };
    _.once = function(func) {
        var ran = false, memo;
        return function() {
            if (ran) return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };
    _.wrap = function(func, wrapper) {
        return function() {
            var args = [ func ];
            push.apply(args, arguments);
            return wrapper.apply(this, args);
        };
    };
    _.compose = function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) {
                args = [ funcs[i].apply(this, args) ];
            }
            return args[0];
        };
    };
    _.after = function(times, func) {
        return function() {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };
    _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError("Invalid object");
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        return keys;
    };
    _.values = function(obj) {
        var values = [];
        for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
        return values;
    };
    _.pairs = function(obj) {
        var pairs = [];
        for (var key in obj) if (_.has(obj, key)) pairs.push([ key, obj[key] ]);
        return pairs;
    };
    _.invert = function(obj) {
        var result = {};
        for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
        return result;
    };
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    _.pick = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        each(keys, function(key) {
            if (key in obj) copy[key] = obj[key];
        });
        return copy;
    };
    _.omit = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) {
            if (!_.contains(keys, key)) copy[key] = obj[key];
        }
        return copy;
    };
    _.defaults = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] === void 0) obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return a === b;
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
          case "[object String]":
            return a == String(b);

          case "[object Number]":
            return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;

          case "[object Date]":
          case "[object Boolean]":
            return +a == +b;

          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != "object" || typeof b != "object") return false;
        var length = aStack.length;
        while (length--) {
            if (aStack[length] == a) return bStack[length] == b;
        }
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) {
            return false;
        }
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;
        if (className == "[object Array]") {
            size = a.length;
            result = size == b.length;
            if (result) {
                while (size--) {
                    if (!(result = eq(a[size], b[size], aStack, bStack))) break;
                }
            }
        } else {
            for (var key in a) {
                if (_.has(a, key)) {
                    size++;
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            }
            if (result) {
                for (key in b) {
                    if (_.has(b, key) && !size--) break;
                }
                result = !size;
            }
        }
        aStack.pop();
        bStack.pop();
        return result;
    };
    _.isEqual = function(a, b) {
        return eq(a, b, [], []);
    };
    _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
    };
    _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) == "[object Array]";
    };
    _.isObject = function(obj) {
        return obj === Object(obj);
    };
    each([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(name) {
        _["is" + name] = function(obj) {
            return toString.call(obj) == "[object " + name + "]";
        };
    });
    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
            return !!(obj && _.has(obj, "callee"));
        };
    }
    if (typeof /./ !== "function") {
        _.isFunction = function(obj) {
            return typeof obj === "function";
        };
    }
    _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj;
    };
    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) == "[object Boolean]";
    };
    _.isNull = function(obj) {
        return obj === null;
    };
    _.isUndefined = function(obj) {
        return obj === void 0;
    };
    _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function(value) {
        return value;
    };
    _.times = function(n, iterator, context) {
        var accum = Array(Math.max(0, n));
        for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
        return accum;
    };
    _.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    var entityMap = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: new RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")
    };
    _.each([ "escape", "unescape" ], function(method) {
        _[method] = function(string) {
            if (string == null) return "";
            return ("" + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match];
            });
        };
    });
    _.result = function(object, property) {
        if (object == null) return void 0;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    };
    _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [ this._wrapped ];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function(text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([ (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source ].join("|") + "|$", "g");
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, function(match) {
                return "\\" + escapes[match];
            });
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";
        if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";
        source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
            render = new Function(settings.variable || "obj", "_", source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        if (data) return render(data, _);
        var template = function(data) {
            return render.call(this, data, _);
        };
        template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";
        return template;
    };
    _.chain = function(obj) {
        return _(obj).chain();
    };
    var result = function(obj) {
        return this._chain ? _(obj).chain() : obj;
    };
    _.mixin(_);
    each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name == "shift" || name == "splice") && obj.length === 0) delete obj[0];
            return result.call(this, obj);
        };
    });
    each([ "concat", "join", "slice" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });
    _.extend(_.prototype, {
        chain: function() {
            this._chain = true;
            return this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}).call(this);

(function() {
    var root = this;
    var previousBackbone = root.Backbone;
    var array = [];
    var push = array.push;
    var slice = array.slice;
    var splice = array.splice;
    var Backbone;
    if (typeof exports !== "undefined") {
        Backbone = exports;
    } else {
        Backbone = root.Backbone = {};
    }
    Backbone.VERSION = "1.0.0";
    var _ = root._;
    if (!_ && typeof require !== "undefined") _ = require("underscore");
    Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$;
    Backbone.noConflict = function() {
        root.Backbone = previousBackbone;
        return this;
    };
    Backbone.emulateHTTP = false;
    Backbone.emulateJSON = false;
    var Events = Backbone.Events = {
        on: function(name, callback, context) {
            if (!eventsApi(this, "on", name, [ callback, context ]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({
                callback: callback,
                context: context,
                ctx: context || this
            });
            return this;
        },
        once: function(name, callback, context) {
            if (!eventsApi(this, "once", name, [ callback, context ]) || !callback) return this;
            var self = this;
            var once = _.once(function() {
                self.off(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
            return this.on(name, once, context);
        },
        off: function(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, "off", name, [ callback, context ])) return this;
            if (!name && !callback && !context) {
                this._events = {};
                return this;
            }
            names = name ? [ name ] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                name = names[i];
                if (events = this._events[name]) {
                    this._events[name] = retain = [];
                    if (callback || context) {
                        for (j = 0, k = events.length; j < k; j++) {
                            ev = events[j];
                            if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
                                retain.push(ev);
                            }
                        }
                    }
                    if (!retain.length) delete this._events[name];
                }
            }
            return this;
        },
        trigger: function(name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, "trigger", name, args)) return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, arguments);
            return this;
        },
        stopListening: function(obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners) return this;
            var deleteListener = !name && !callback;
            if (typeof name === "object") callback = this;
            if (obj) (listeners = {})[obj._listenerId] = obj;
            for (var id in listeners) {
                listeners[id].off(name, callback, this);
                if (deleteListener) delete this._listeners[id];
            }
            return this;
        }
    };
    var eventSplitter = /\s+/;
    var eventsApi = function(obj, action, name, rest) {
        if (!name) return true;
        if (typeof name === "object") {
            for (var key in name) {
                obj[action].apply(obj, [ key, name[key] ].concat(rest));
            }
            return false;
        }
        if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
                obj[action].apply(obj, [ names[i] ].concat(rest));
            }
            return false;
        }
        return true;
    };
    var triggerEvents = function(events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        switch (args.length) {
          case 0:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx);
            return;

          case 1:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
            return;

          case 2:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
            return;

          case 3:
            while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
            return;

          default:
            while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
        }
    };
    var listenMethods = {
        listenTo: "on",
        listenToOnce: "once"
    };
    _.each(listenMethods, function(implementation, method) {
        Events[method] = function(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = _.uniqueId("l"));
            listeners[id] = obj;
            if (typeof name === "object") callback = this;
            obj[implementation](name, callback, this);
            return this;
        };
    });
    Events.bind = Events.on;
    Events.unbind = Events.off;
    _.extend(Backbone, Events);
    var Model = Backbone.Model = function(attributes, options) {
        var defaults;
        var attrs = attributes || {};
        options || (options = {});
        this.cid = _.uniqueId("c");
        this.attributes = {};
        _.extend(this, _.pick(options, modelOptions));
        if (options.parse) attrs = this.parse(attrs, options) || {};
        if (defaults = _.result(this, "defaults")) {
            attrs = _.defaults({}, attrs, defaults);
        }
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
    };
    var modelOptions = [ "url", "urlRoot", "collection" ];
    _.extend(Model.prototype, Events, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function(options) {
            return _.clone(this.attributes);
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        get: function(attr) {
            return this.attributes[attr];
        },
        escape: function(attr) {
            return _.escape(this.get(attr));
        },
        has: function(attr) {
            return this.get(attr) != null;
        },
        set: function(key, val, options) {
            var attr, attrs, unset, changes, silent, changing, prev, current;
            if (key == null) return this;
            if (typeof key === "object") {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }
            options || (options = {});
            if (!this._validate(attrs, options)) return false;
            unset = options.unset;
            silent = options.silent;
            changes = [];
            changing = this._changing;
            this._changing = true;
            if (!changing) {
                this._previousAttributes = _.clone(this.attributes);
                this.changed = {};
            }
            current = this.attributes, prev = this._previousAttributes;
            if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];
            for (attr in attrs) {
                val = attrs[attr];
                if (!_.isEqual(current[attr], val)) changes.push(attr);
                if (!_.isEqual(prev[attr], val)) {
                    this.changed[attr] = val;
                } else {
                    delete this.changed[attr];
                }
                unset ? delete current[attr] : current[attr] = val;
            }
            if (!silent) {
                if (changes.length) this._pending = true;
                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger("change:" + changes[i], this, current[changes[i]], options);
                }
            }
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    this._pending = false;
                    this.trigger("change", this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        },
        unset: function(attr, options) {
            return this.set(attr, void 0, _.extend({}, options, {
                unset: true
            }));
        },
        clear: function(options) {
            var attrs = {};
            for (var key in this.attributes) attrs[key] = void 0;
            return this.set(attrs, _.extend({}, options, {
                unset: true
            }));
        },
        hasChanged: function(attr) {
            if (attr == null) return !_.isEmpty(this.changed);
            return _.has(this.changed, attr);
        },
        changedAttributes: function(diff) {
            if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
            var val, changed = false;
            var old = this._changing ? this._previousAttributes : this.attributes;
            for (var attr in diff) {
                if (_.isEqual(old[attr], val = diff[attr])) continue;
                (changed || (changed = {}))[attr] = val;
            }
            return changed;
        },
        previous: function(attr) {
            if (attr == null || !this._previousAttributes) return null;
            return this._previousAttributes[attr];
        },
        previousAttributes: function() {
            return _.clone(this._previousAttributes);
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var model = this;
            var success = options.success;
            options.success = function(resp) {
                if (!model.set(model.parse(resp, options), options)) return false;
                if (success) success(model, resp, options);
                model.trigger("sync", model, resp, options);
            };
            wrapError(this, options);
            return this.sync("read", this, options);
        },
        save: function(key, val, options) {
            var attrs, method, xhr, attributes = this.attributes;
            if (key == null || typeof key === "object") {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }
            if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;
            options = _.extend({
                validate: true
            }, options);
            if (!this._validate(attrs, options)) return false;
            if (attrs && options.wait) {
                this.attributes = _.extend({}, attributes, attrs);
            }
            if (options.parse === void 0) options.parse = true;
            var model = this;
            var success = options.success;
            options.success = function(resp) {
                model.attributes = attributes;
                var serverAttrs = model.parse(resp, options);
                if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
                if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
                    return false;
                }
                if (success) success(model, resp, options);
                model.trigger("sync", model, resp, options);
            };
            wrapError(this, options);
            method = this.isNew() ? "create" : options.patch ? "patch" : "update";
            if (method === "patch") options.attrs = attrs;
            xhr = this.sync(method, this, options);
            if (attrs && options.wait) this.attributes = attributes;
            return xhr;
        },
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;
            var destroy = function() {
                model.trigger("destroy", model, model.collection, options);
            };
            options.success = function(resp) {
                if (options.wait || model.isNew()) destroy();
                if (success) success(model, resp, options);
                if (!model.isNew()) model.trigger("sync", model, resp, options);
            };
            if (this.isNew()) {
                options.success();
                return false;
            }
            wrapError(this, options);
            var xhr = this.sync("delete", this, options);
            if (!options.wait) destroy();
            return xhr;
        },
        url: function() {
            var base = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id);
        },
        parse: function(resp, options) {
            return resp;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return this.id == null;
        },
        isValid: function(options) {
            return this._validate({}, _.extend(options || {}, {
                validate: true
            }));
        },
        _validate: function(attrs, options) {
            if (!options.validate || !this.validate) return true;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validationError = this.validate(attrs, options) || null;
            if (!error) return true;
            this.trigger("invalid", this, error, _.extend(options || {}, {
                validationError: error
            }));
            return false;
        }
    });
    var modelMethods = [ "keys", "values", "pairs", "invert", "pick", "omit" ];
    _.each(modelMethods, function(method) {
        Model.prototype[method] = function() {
            var args = slice.call(arguments);
            args.unshift(this.attributes);
            return _[method].apply(_, args);
        };
    });
    var Collection = Backbone.Collection = function(models, options) {
        options || (options = {});
        if (options.url) this.url = options.url;
        if (options.model) this.model = options.model;
        if (options.comparator !== void 0) this.comparator = options.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (models) this.reset(models, _.extend({
            silent: true
        }, options));
    };
    var setOptions = {
        add: true,
        remove: true,
        merge: true
    };
    var addOptions = {
        add: true,
        merge: false,
        remove: false
    };
    _.extend(Collection.prototype, Events, {
        model: Model,
        initialize: function() {},
        toJSON: function(options) {
            return this.map(function(model) {
                return model.toJSON(options);
            });
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        add: function(models, options) {
            return this.set(models, _.defaults(options || {}, addOptions));
        },
        remove: function(models, options) {
            models = _.isArray(models) ? models.slice() : [ models ];
            options || (options = {});
            var i, l, index, model;
            for (i = 0, l = models.length; i < l; i++) {
                model = this.get(models[i]);
                if (!model) continue;
                delete this._byId[model.id];
                delete this._byId[model.cid];
                index = this.indexOf(model);
                this.models.splice(index, 1);
                this.length--;
                if (!options.silent) {
                    options.index = index;
                    model.trigger("remove", model, this, options);
                }
                this._removeReference(model);
            }
            return this;
        },
        set: function(models, options) {
            options = _.defaults(options || {}, setOptions);
            if (options.parse) models = this.parse(models, options);
            if (!_.isArray(models)) models = models ? [ models ] : [];
            var i, l, model, attrs, existing, sort;
            var at = options.at;
            var sortable = this.comparator && at == null && options.sort !== false;
            var sortAttr = _.isString(this.comparator) ? this.comparator : null;
            var toAdd = [], toRemove = [], modelMap = {};
            for (i = 0, l = models.length; i < l; i++) {
                if (!(model = this._prepareModel(models[i], options))) continue;
                if (existing = this.get(model)) {
                    if (options.remove) modelMap[existing.cid] = true;
                    if (options.merge) {
                        existing.set(model.attributes, options);
                        if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
                    }
                } else if (options.add) {
                    toAdd.push(model);
                    model.on("all", this._onModelEvent, this);
                    this._byId[model.cid] = model;
                    if (model.id != null) this._byId[model.id] = model;
                }
            }
            if (options.remove) {
                for (i = 0, l = this.length; i < l; ++i) {
                    if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
                }
                if (toRemove.length) this.remove(toRemove, options);
            }
            if (toAdd.length) {
                if (sortable) sort = true;
                this.length += toAdd.length;
                if (at != null) {
                    splice.apply(this.models, [ at, 0 ].concat(toAdd));
                } else {
                    push.apply(this.models, toAdd);
                }
            }
            if (sort) this.sort({
                silent: true
            });
            if (options.silent) return this;
            for (i = 0, l = toAdd.length; i < l; i++) {
                (model = toAdd[i]).trigger("add", model, this, options);
            }
            if (sort) this.trigger("sort", this, options);
            return this;
        },
        reset: function(models, options) {
            options || (options = {});
            for (var i = 0, l = this.models.length; i < l; i++) {
                this._removeReference(this.models[i]);
            }
            options.previousModels = this.models;
            this._reset();
            this.add(models, _.extend({
                silent: true
            }, options));
            if (!options.silent) this.trigger("reset", this, options);
            return this;
        },
        push: function(model, options) {
            model = this._prepareModel(model, options);
            this.add(model, _.extend({
                at: this.length
            }, options));
            return model;
        },
        pop: function(options) {
            var model = this.at(this.length - 1);
            this.remove(model, options);
            return model;
        },
        unshift: function(model, options) {
            model = this._prepareModel(model, options);
            this.add(model, _.extend({
                at: 0
            }, options));
            return model;
        },
        shift: function(options) {
            var model = this.at(0);
            this.remove(model, options);
            return model;
        },
        slice: function(begin, end) {
            return this.models.slice(begin, end);
        },
        get: function(obj) {
            if (obj == null) return void 0;
            return this._byId[obj.id != null ? obj.id : obj.cid || obj];
        },
        at: function(index) {
            return this.models[index];
        },
        where: function(attrs, first) {
            if (_.isEmpty(attrs)) return first ? void 0 : [];
            return this[first ? "find" : "filter"](function(model) {
                for (var key in attrs) {
                    if (attrs[key] !== model.get(key)) return false;
                }
                return true;
            });
        },
        findWhere: function(attrs) {
            return this.where(attrs, true);
        },
        sort: function(options) {
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            options || (options = {});
            if (_.isString(this.comparator) || this.comparator.length === 1) {
                this.models = this.sortBy(this.comparator, this);
            } else {
                this.models.sort(_.bind(this.comparator, this));
            }
            if (!options.silent) this.trigger("sort", this, options);
            return this;
        },
        sortedIndex: function(model, value, context) {
            value || (value = this.comparator);
            var iterator = _.isFunction(value) ? value : function(model) {
                return model.get(value);
            };
            return _.sortedIndex(this.models, model, iterator, context);
        },
        pluck: function(attr) {
            return _.invoke(this.models, "get", attr);
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var success = options.success;
            var collection = this;
            options.success = function(resp) {
                var method = options.reset ? "reset" : "set";
                collection[method](resp, options);
                if (success) success(collection, resp, options);
                collection.trigger("sync", collection, resp, options);
            };
            wrapError(this, options);
            return this.sync("read", this, options);
        },
        create: function(model, options) {
            options = options ? _.clone(options) : {};
            if (!(model = this._prepareModel(model, options))) return false;
            if (!options.wait) this.add(model, options);
            var collection = this;
            var success = options.success;
            options.success = function(resp) {
                if (options.wait) collection.add(model, options);
                if (success) success(model, resp, options);
            };
            model.save(null, options);
            return model;
        },
        parse: function(resp, options) {
            return resp;
        },
        clone: function() {
            return new this.constructor(this.models);
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {};
        },
        _prepareModel: function(attrs, options) {
            if (attrs instanceof Model) {
                if (!attrs.collection) attrs.collection = this;
                return attrs;
            }
            options || (options = {});
            options.collection = this;
            var model = new this.model(attrs, options);
            if (!model._validate(attrs, options)) {
                this.trigger("invalid", this, attrs, options);
                return false;
            }
            return model;
        },
        _removeReference: function(model) {
            if (this === model.collection) delete model.collection;
            model.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function(event, model, collection, options) {
            if ((event === "add" || event === "remove") && collection !== this) return;
            if (event === "destroy") this.remove(model, options);
            if (model && event === "change:" + model.idAttribute) {
                delete this._byId[model.previous(model.idAttribute)];
                if (model.id != null) this._byId[model.id] = model;
            }
            this.trigger.apply(this, arguments);
        }
    });
    var methods = [ "forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain" ];
    _.each(methods, function(method) {
        Collection.prototype[method] = function() {
            var args = slice.call(arguments);
            args.unshift(this.models);
            return _[method].apply(_, args);
        };
    });
    var attributeMethods = [ "groupBy", "countBy", "sortBy" ];
    _.each(attributeMethods, function(method) {
        Collection.prototype[method] = function(value, context) {
            var iterator = _.isFunction(value) ? value : function(model) {
                return model.get(value);
            };
            return _[method](this.models, iterator, context);
        };
    });
    var View = Backbone.View = function(options) {
        this.cid = _.uniqueId("view");
        this._configure(options || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
    };
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    var viewOptions = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
    _.extend(View.prototype, Events, {
        tagName: "div",
        $: function(selector) {
            return this.$el.find(selector);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this;
        },
        setElement: function(element, delegate) {
            if (this.$el) this.undelegateEvents();
            this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
            this.el = this.$el[0];
            if (delegate !== false) this.delegateEvents();
            return this;
        },
        delegateEvents: function(events) {
            if (!(events || (events = _.result(this, "events")))) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) continue;
                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                method = _.bind(method, this);
                eventName += ".delegateEvents" + this.cid;
                if (selector === "") {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method);
                }
            }
            return this;
        },
        undelegateEvents: function() {
            this.$el.off(".delegateEvents" + this.cid);
            return this;
        },
        _configure: function(options) {
            if (this.options) options = _.extend({}, _.result(this, "options"), options);
            _.extend(this, _.pick(options, viewOptions));
            this.options = options;
        },
        _ensureElement: function() {
            if (!this.el) {
                var attrs = _.extend({}, _.result(this, "attributes"));
                if (this.id) attrs.id = _.result(this, "id");
                if (this.className) attrs["class"] = _.result(this, "className");
                var $el = Backbone.$("<" + _.result(this, "tagName") + ">").attr(attrs);
                this.setElement($el, false);
            } else {
                this.setElement(_.result(this, "el"), false);
            }
        }
    });
    Backbone.sync = function(method, model, options) {
        var type = methodMap[method];
        _.defaults(options || (options = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });
        var params = {
            type: type,
            dataType: "json"
        };
        if (!options.url) {
            params.url = _.result(model, "url") || urlError();
        }
        if (options.data == null && model && (method === "create" || method === "update" || method === "patch")) {
            params.contentType = "application/json";
            params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }
        if (options.emulateJSON) {
            params.contentType = "application/x-www-form-urlencoded";
            params.data = params.data ? {
                model: params.data
            } : {};
        }
        if (options.emulateHTTP && (type === "PUT" || type === "DELETE" || type === "PATCH")) {
            params.type = "POST";
            if (options.emulateJSON) params.data._method = type;
            var beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader("X-HTTP-Method-Override", type);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }
        if (params.type !== "GET" && !options.emulateJSON) {
            params.processData = false;
        }
        if (params.type === "PATCH" && window.ActiveXObject && !(window.external && window.external.msActiveXFilteringEnabled)) {
            params.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            };
        }
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        model.trigger("request", model, xhr, options);
        return xhr;
    };
    var methodMap = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    Backbone.ajax = function() {
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    };
    var Router = Backbone.Router = function(options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };
    var optionalParam = /\((.*?)\)/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*\w+/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    _.extend(Router.prototype, Events, {
        initialize: function() {},
        route: function(route, name, callback) {
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = "";
            }
            if (!callback) callback = this[name];
            var router = this;
            Backbone.history.route(route, function(fragment) {
                var args = router._extractParameters(route, fragment);
                callback && callback.apply(router, args);
                router.trigger.apply(router, [ "route:" + name ].concat(args));
                router.trigger("route", name, args);
                Backbone.history.trigger("route", router, name, args);
            });
            return this;
        },
        navigate: function(fragment, options) {
            Backbone.history.navigate(fragment, options);
            return this;
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            this.routes = _.result(this, "routes");
            var route, routes = _.keys(this.routes);
            while ((route = routes.pop()) != null) {
                this.route(route, this.routes[route]);
            }
        },
        _routeToRegExp: function(route) {
            route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
                return optional ? match : "([^/]+)";
            }).replace(splatParam, "(.*?)");
            return new RegExp("^" + route + "$");
        },
        _extractParameters: function(route, fragment) {
            var params = route.exec(fragment).slice(1);
            return _.map(params, function(param) {
                return param ? decodeURIComponent(param) : null;
            });
        }
    });
    var History = Backbone.History = function() {
        this.handlers = [];
        _.bindAll(this, "checkUrl");
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history;
        }
    };
    var routeStripper = /^[#\/]|\s+$/g;
    var rootStripper = /^\/+|\/+$/g;
    var isExplorer = /msie [\w.]+/;
    var trailingSlash = /\/$/;
    History.started = false;
    _.extend(History.prototype, Events, {
        interval: 50,
        getHash: function(window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : "";
        },
        getFragment: function(fragment, forcePushState) {
            if (fragment == null) {
                if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                    fragment = this.location.pathname;
                    var root = this.root.replace(trailingSlash, "");
                    if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
                } else {
                    fragment = this.getHash();
                }
            }
            return fragment.replace(routeStripper, "");
        },
        start: function(options) {
            if (History.started) throw new Error("Backbone.history has already been started");
            History.started = true;
            this.options = _.extend({}, {
                root: "/"
            }, this.options, options);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var fragment = this.getFragment();
            var docMode = document.documentMode;
            var oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7);
            this.root = ("/" + this.root + "/").replace(rootStripper, "/");
            if (oldIE && this._wantsHashChange) {
                this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(fragment);
            }
            if (this._hasPushState) {
                Backbone.$(window).on("popstate", this.checkUrl);
            } else if (this._wantsHashChange && "onhashchange" in window && !oldIE) {
                Backbone.$(window).on("hashchange", this.checkUrl);
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            }
            this.fragment = fragment;
            var loc = this.location;
            var atRoot = loc.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
                this.fragment = this.getFragment(null, true);
                this.location.replace(this.root + this.location.search + "#" + this.fragment);
                return true;
            } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
                this.fragment = this.getHash().replace(routeStripper, "");
                this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
            }
            if (!this.options.silent) return this.loadUrl();
        },
        stop: function() {
            Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            History.started = false;
        },
        route: function(route, callback) {
            this.handlers.unshift({
                route: route,
                callback: callback
            });
        },
        checkUrl: function(e) {
            var current = this.getFragment();
            if (current === this.fragment && this.iframe) {
                current = this.getFragment(this.getHash(this.iframe));
            }
            if (current === this.fragment) return false;
            if (this.iframe) this.navigate(current);
            this.loadUrl() || this.loadUrl(this.getHash());
        },
        loadUrl: function(fragmentOverride) {
            var fragment = this.fragment = this.getFragment(fragmentOverride);
            var matched = _.any(this.handlers, function(handler) {
                if (handler.route.test(fragment)) {
                    handler.callback(fragment);
                    return true;
                }
            });
            return matched;
        },
        navigate: function(fragment, options) {
            if (!History.started) return false;
            if (!options || options === true) options = {
                trigger: options
            };
            fragment = this.getFragment(fragment || "");
            if (this.fragment === fragment) return;
            this.fragment = fragment;
            var url = this.root + fragment;
            if (this._hasPushState) {
                this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url);
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, fragment, options.replace);
                if (this.iframe && fragment !== this.getFragment(this.getHash(this.iframe))) {
                    if (!options.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, fragment, options.replace);
                }
            } else {
                return this.location.assign(url);
            }
            if (options.trigger) this.loadUrl(fragment);
        },
        _updateHash: function(location, fragment, replace) {
            if (replace) {
                var href = location.href.replace(/(javascript:|#).*$/, "");
                location.replace(href + "#" + fragment);
            } else {
                location.hash = "#" + fragment;
            }
        }
    });
    Backbone.history = new History();
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && _.has(protoProps, "constructor")) {
            child = protoProps.constructor;
        } else {
            child = function() {
                return parent.apply(this, arguments);
            };
        }
        _.extend(child, parent, staticProps);
        var Surrogate = function() {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();
        if (protoProps) _.extend(child.prototype, protoProps);
        child.__super__ = parent.prototype;
        return child;
    };
    Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
    var urlError = function() {
        throw new Error('A "url" property or function must be specified');
    };
    var wrapError = function(model, options) {
        var error = options.error;
        options.error = function(resp) {
            if (error) error(model, resp, options);
            model.trigger("error", model, resp, options);
        };
    };
}).call(this);

(function(root, factory) {
    if (typeof exports === "object" && root.require) {
        module.exports = factory(require("underscore"), require("backbone"));
    } else if (typeof define === "function" && define.amd) {
        define([ "underscore", "backbone" ], function(_, Backbone) {
            return factory(_ || root._, Backbone || root.Backbone);
        });
    } else {
        factory(_, Backbone);
    }
})(this, function(_, Backbone) {
    function S4() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    function guid() {
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    }
    Backbone.LocalStorage = window.Store = function(name) {
        if (!this.localStorage) {
            throw "Backbone.localStorage: Environment does not support localStorage.";
        }
        this.name = name;
        var store = this.localStorage().getItem(this.name);
        this.records = store && store.split(",") || [];
    };
    _.extend(Backbone.LocalStorage.prototype, {
        save: function() {
            this.localStorage().setItem(this.name, this.records.join(","));
        },
        create: function(model) {
            if (!model.id) {
                model.id = guid();
                model.set(model.idAttribute, model.id);
            }
            this.localStorage().setItem(this.name + "-" + model.id, JSON.stringify(model));
            this.records.push(model.id.toString());
            this.save();
            return this.find(model);
        },
        update: function(model) {
            this.localStorage().setItem(this.name + "-" + model.id, JSON.stringify(model));
            if (!_.include(this.records, model.id.toString())) this.records.push(model.id.toString());
            this.save();
            return this.find(model);
        },
        find: function(model) {
            return this.jsonData(this.localStorage().getItem(this.name + "-" + model.id));
        },
        findAll: function() {
            return (_.chain || _)(this.records).map(function(id) {
                return this.jsonData(this.localStorage().getItem(this.name + "-" + id));
            }, this).compact().value();
        },
        destroy: function(model) {
            if (model.isNew()) return false;
            this.localStorage().removeItem(this.name + "-" + model.id);
            this.records = _.reject(this.records, function(id) {
                return id === model.id.toString();
            });
            this.save();
            return model;
        },
        localStorage: function() {
            return localStorage;
        },
        jsonData: function(data) {
            return data && JSON.parse(data);
        },
        _clear: function() {
            var local = this.localStorage(), itemRe = new RegExp("^" + this.name + "-");
            local.removeItem(this.name);
            (_.chain || _)(local).keys().filter(function(k) {
                return itemRe.test(k);
            }).each(function(k) {
                local.removeItem(k);
            });
            this.records.length = 0;
        },
        _storageSize: function() {
            return this.localStorage().length;
        }
    });
    Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options) {
        var store = model.localStorage || model.collection.localStorage;
        var resp, errorMessage, syncDfd = Backbone.$.Deferred && Backbone.$.Deferred();
        try {
            switch (method) {
              case "read":
                resp = model.id != undefined ? store.find(model) : store.findAll();
                break;

              case "create":
                resp = store.create(model);
                break;

              case "update":
                resp = store.update(model);
                break;

              case "delete":
                resp = store.destroy(model);
                break;
            }
        } catch (error) {
            if (error.code === 22 && store._storageSize() === 0) errorMessage = "Private browsing is unsupported"; else errorMessage = error.message;
        }
        if (resp) {
            if (options && options.success) {
                if (Backbone.VERSION === "0.9.10") {
                    options.success(model, resp, options);
                } else {
                    options.success(resp);
                }
            }
            if (syncDfd) {
                syncDfd.resolve(resp);
            }
        } else {
            errorMessage = errorMessage ? errorMessage : "Record Not Found";
            if (options && options.error) if (Backbone.VERSION === "0.9.10") {
                options.error(model, errorMessage, options);
            } else {
                options.error(errorMessage);
            }
            if (syncDfd) syncDfd.reject(errorMessage);
        }
        if (options && options.complete) options.complete(resp);
        return syncDfd && syncDfd.promise();
    };
    Backbone.ajaxSync = Backbone.sync;
    Backbone.getSyncMethod = function(model) {
        if (model.localStorage || model.collection && model.collection.localStorage) {
            return Backbone.localSync;
        }
        return Backbone.ajaxSync;
    };
    Backbone.sync = function(method, model, options) {
        return Backbone.getSyncMethod(model).apply(this, [ method, model, options ]);
    };
    return Backbone.LocalStorage;
});

(function($, undefined) {
    "use strict";
    var fls = !1, nll = null, prsflt = parseFloat, mathmn = Math.min, rxLastNr = /(-?\d+\.?\d*)$/g, rxLastNrNoDash = /(\d+\.?\d*)$/g, aPluginPrepare = [], aPluginSort = [], isString = function(o) {
        return typeof o == "string";
    }, loop = function(array, func) {
        var l = array.length, i = l, j;
        while (i--) {
            j = l - i - 1;
            func(array[j], j);
        }
    }, fnIndexOf = Array.prototype.indexOf || function(elm) {
        var len = this.length, from = Number(arguments[1]) || 0;
        from = from < 0 ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;
        for (;from < len; from++) {
            if (from in this && this[from] === elm) return from;
        }
        return -1;
    };
    $.tinysort = {
        id: "TinySort",
        version: "1.5.6",
        copyright: "Copyright (c) 2008-2013 Ron Valstar",
        uri: "http://tinysort.sjeiti.com/",
        licensed: {
            MIT: "http://www.opensource.org/licenses/mit-license.php",
            GPL: "http://www.gnu.org/licenses/gpl.html"
        },
        plugin: function() {
            var fn = function(prepare, sort) {
                aPluginPrepare.push(prepare);
                aPluginSort.push(sort);
            };
            fn.indexOf = fnIndexOf;
            return fn;
        }(),
        defaults: {
            order: "asc",
            attr: nll,
            data: nll,
            useVal: fls,
            place: "start",
            returns: fls,
            cases: fls,
            forceStrings: fls,
            ignoreDashes: fls,
            sortFunction: nll
        }
    };
    $.fn.extend({
        tinysort: function() {
            var i, j, l, oThis = this, aNewOrder = [], aElements = [], aElementsParent = [], aCriteria = [], iCriteria = 0, iCriteriaMax, aFind = [], aSettings = [], fnPluginPrepare = function(_settings) {
                loop(aPluginPrepare, function(fn) {
                    fn.call(fn, _settings);
                });
            }, fnPrepareSortElement = function(settings, element) {
                if (typeof element == "string") {
                    if (!settings.cases) element = toLowerCase(element);
                    element = element.replace(/^\s*(.*?)\s*$/i, "$1");
                }
                return element;
            }, fnSort = function(a, b) {
                var iReturn = 0;
                if (iCriteria !== 0) iCriteria = 0;
                while (iReturn === 0 && iCriteria < iCriteriaMax) {
                    var oPoint = aCriteria[iCriteria], oSett = oPoint.oSettings, rxLast = oSett.ignoreDashes ? rxLastNrNoDash : rxLastNr;
                    fnPluginPrepare(oSett);
                    if (oSett.sortFunction) {
                        iReturn = oSett.sortFunction(a, b);
                    } else if (oSett.order == "rand") {
                        iReturn = Math.random() < .5 ? 1 : -1;
                    } else {
                        var bNumeric = fls, sA = fnPrepareSortElement(oSett, a.s[iCriteria]), sB = fnPrepareSortElement(oSett, b.s[iCriteria]);
                        if (!oSett.forceStrings) {
                            var aAnum = isString(sA) ? sA && sA.match(rxLast) : fls, aBnum = isString(sB) ? sB && sB.match(rxLast) : fls;
                            if (aAnum && aBnum) {
                                var sAprv = sA.substr(0, sA.length - aAnum[0].length), sBprv = sB.substr(0, sB.length - aBnum[0].length);
                                if (sAprv == sBprv) {
                                    bNumeric = !fls;
                                    sA = prsflt(aAnum[0]);
                                    sB = prsflt(aBnum[0]);
                                }
                            }
                        }
                        iReturn = oPoint.iAsc * (sA < sB ? -1 : sA > sB ? 1 : 0);
                    }
                    loop(aPluginSort, function(fn) {
                        iReturn = fn.call(fn, bNumeric, sA, sB, iReturn);
                    });
                    if (iReturn === 0) iCriteria++;
                }
                return iReturn;
            };
            for (i = 0, l = arguments.length; i < l; i++) {
                var o = arguments[i];
                if (isString(o)) {
                    if (aFind.push(o) - 1 > aSettings.length) aSettings.length = aFind.length - 1;
                } else {
                    if (aSettings.push(o) > aFind.length) aFind.length = aSettings.length;
                }
            }
            if (aFind.length > aSettings.length) aSettings.length = aFind.length;
            iCriteriaMax = aFind.length;
            if (iCriteriaMax === 0) {
                iCriteriaMax = aFind.length = 1;
                aSettings.push({});
            }
            for (i = 0, l = iCriteriaMax; i < l; i++) {
                var sFind = aFind[i], oSettings = $.extend({}, $.tinysort.defaults, aSettings[i]), bFind = !(!sFind || sFind === ""), bFilter = bFind && sFind[0] === ":";
                aCriteria.push({
                    sFind: sFind,
                    oSettings: oSettings,
                    bFind: bFind,
                    bAttr: !(oSettings.attr === nll || oSettings.attr === ""),
                    bData: oSettings.data !== nll,
                    bFilter: bFilter,
                    $Filter: bFilter ? oThis.filter(sFind) : oThis,
                    fnSort: oSettings.sortFunction,
                    iAsc: oSettings.order == "asc" ? 1 : -1
                });
            }
            oThis.each(function(i, el) {
                var $Elm = $(el), mParent = $Elm.parent().get(0), mFirstElmOrSub, aSort = [];
                for (j = 0; j < iCriteriaMax; j++) {
                    var oPoint = aCriteria[j], mElmOrSub = oPoint.bFind ? oPoint.bFilter ? oPoint.$Filter.filter(el) : $Elm.find(oPoint.sFind) : $Elm;
                    aSort.push(oPoint.bData ? mElmOrSub.data(oPoint.oSettings.data) : oPoint.bAttr ? mElmOrSub.attr(oPoint.oSettings.attr) : oPoint.oSettings.useVal ? mElmOrSub.val() : mElmOrSub.text());
                    if (mFirstElmOrSub === undefined) mFirstElmOrSub = mElmOrSub;
                }
                var iElmIndex = fnIndexOf.call(aElementsParent, mParent);
                if (iElmIndex < 0) {
                    iElmIndex = aElementsParent.push(mParent) - 1;
                    aElements[iElmIndex] = {
                        s: [],
                        n: []
                    };
                }
                if (mFirstElmOrSub.length > 0) aElements[iElmIndex].s.push({
                    s: aSort,
                    e: $Elm,
                    n: i
                }); else aElements[iElmIndex].n.push({
                    e: $Elm,
                    n: i
                });
            });
            loop(aElements, function(oParent) {
                oParent.s.sort(fnSort);
            });
            loop(aElements, function(oParent) {
                var aSorted = oParent.s, aUnsorted = oParent.n, iSorted = aSorted.length, iUnsorted = aUnsorted.length, iNumElm = iSorted + iUnsorted, aOriginal = [], iLow = iNumElm, aCount = [ 0, 0 ];
                switch (oSettings.place) {
                  case "first":
                    loop(aSorted, function(obj) {
                        iLow = mathmn(iLow, obj.n);
                    });
                    break;

                  case "org":
                    loop(aSorted, function(obj) {
                        aOriginal.push(obj.n);
                    });
                    break;

                  case "end":
                    iLow = iUnsorted;
                    break;

                  default:
                    iLow = 0;
                }
                for (i = 0; i < iNumElm; i++) {
                    var bFromSortList = contains(aOriginal, i) ? !fls : i >= iLow && i < iLow + iSorted, iCountIndex = bFromSortList ? 0 : 1, mEl = (bFromSortList ? aSorted : aUnsorted)[aCount[iCountIndex]].e;
                    mEl.parent().append(mEl);
                    if (bFromSortList || !oSettings.returns) aNewOrder.push(mEl.get(0));
                    aCount[iCountIndex]++;
                }
            });
            oThis.length = 0;
            Array.prototype.push.apply(oThis, aNewOrder);
            return oThis;
        }
    });
    function toLowerCase(s) {
        return s && s.toLowerCase ? s.toLowerCase() : s;
    }
    function contains(a, n) {
        for (var i = 0, l = a.length; i < l; i++) if (a[i] == n) return !fls;
        return fls;
    }
    $.fn.TinySort = $.fn.Tinysort = $.fn.tsort = $.fn.tinysort;
})(jQuery);

(function(root, undef) {
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, slice = ArrayProto.slice, hasOwnProp = ObjProto.hasOwnProperty, nativeForEach = ArrayProto.forEach, breaker = {};
    var _ = {
        forEach: function(obj, iterator, context) {
            var i, l, key;
            if (obj === null) {
                return;
            }
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (i = 0, l = obj.length; i < l; i++) {
                    if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                        return;
                    }
                }
            } else {
                for (key in obj) {
                    if (hasOwnProp.call(obj, key)) {
                        if (iterator.call(context, obj[key], key, obj) === breaker) {
                            return;
                        }
                    }
                }
            }
        },
        extend: function(obj) {
            this.forEach(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            });
            return obj;
        }
    };
    var Jed = function(options) {
        this.defaults = {
            locale_data: {
                messages: {
                    "": {
                        domain: "messages",
                        lang: "en",
                        plural_forms: "nplurals=2; plural=(n != 1);"
                    }
                }
            },
            domain: "messages"
        };
        this.options = _.extend({}, this.defaults, options);
        this.textdomain(this.options.domain);
        if (options.domain && !this.options.locale_data[this.options.domain]) {
            throw new Error("Text domain set to non-existent domain: `" + options.domain + "`");
        }
    };
    Jed.context_delimiter = String.fromCharCode(4);
    function getPluralFormFunc(plural_form_string) {
        return Jed.PF.compile(plural_form_string || "nplurals=2; plural=(n != 1);");
    }
    function Chain(key, i18n) {
        this._key = key;
        this._i18n = i18n;
    }
    _.extend(Chain.prototype, {
        onDomain: function(domain) {
            this._domain = domain;
            return this;
        },
        withContext: function(context) {
            this._context = context;
            return this;
        },
        ifPlural: function(num, pkey) {
            this._val = num;
            this._pkey = pkey;
            return this;
        },
        fetch: function(sArr) {
            if ({}.toString.call(sArr) != "[object Array]") {
                sArr = [].slice.call(arguments);
            }
            return (sArr && sArr.length ? Jed.sprintf : function(x) {
                return x;
            })(this._i18n.dcnpgettext(this._domain, this._context, this._key, this._pkey, this._val), sArr);
        }
    });
    _.extend(Jed.prototype, {
        translate: function(key) {
            return new Chain(key, this);
        },
        textdomain: function(domain) {
            if (!domain) {
                return this._textdomain;
            }
            this._textdomain = domain;
        },
        gettext: function(key) {
            return this.dcnpgettext.call(this, undef, undef, key);
        },
        dgettext: function(domain, key) {
            return this.dcnpgettext.call(this, domain, undef, key);
        },
        dcgettext: function(domain, key) {
            return this.dcnpgettext.call(this, domain, undef, key);
        },
        ngettext: function(skey, pkey, val) {
            return this.dcnpgettext.call(this, undef, undef, skey, pkey, val);
        },
        dngettext: function(domain, skey, pkey, val) {
            return this.dcnpgettext.call(this, domain, undef, skey, pkey, val);
        },
        dcngettext: function(domain, skey, pkey, val) {
            return this.dcnpgettext.call(this, domain, undef, skey, pkey, val);
        },
        pgettext: function(context, key) {
            return this.dcnpgettext.call(this, undef, context, key);
        },
        dpgettext: function(domain, context, key) {
            return this.dcnpgettext.call(this, domain, context, key);
        },
        dcpgettext: function(domain, context, key) {
            return this.dcnpgettext.call(this, domain, context, key);
        },
        npgettext: function(context, skey, pkey, val) {
            return this.dcnpgettext.call(this, undef, context, skey, pkey, val);
        },
        dnpgettext: function(domain, context, skey, pkey, val) {
            return this.dcnpgettext.call(this, domain, context, skey, pkey, val);
        },
        dcnpgettext: function(domain, context, singular_key, plural_key, val) {
            plural_key = plural_key || singular_key;
            domain = domain || this._textdomain;
            val = typeof val == "undefined" ? 1 : val;
            var fallback;
            if (!this.options) {
                fallback = new Jed();
                return fallback.dcnpgettext.call(fallback, undefined, undefined, singular_key, plural_key, val);
            }
            if (!this.options.locale_data) {
                throw new Error("No locale data provided.");
            }
            if (!this.options.locale_data[domain]) {
                throw new Error("Domain `" + domain + "` was not found.");
            }
            if (!this.options.locale_data[domain][""]) {
                throw new Error("No locale meta information provided.");
            }
            if (!singular_key) {
                throw new Error("No translation key found.");
            }
            if (typeof val != "number") {
                val = parseInt(val, 10);
                if (isNaN(val)) {
                    throw new Error("The number that was passed in is not a number.");
                }
            }
            var key = context ? context + Jed.context_delimiter + singular_key : singular_key, locale_data = this.options.locale_data, dict = locale_data[domain], pluralForms = dict[""].plural_forms || (locale_data.messages || this.defaults.locale_data.messages)[""].plural_forms, val_idx = getPluralFormFunc(pluralForms)(val) + 1, val_list, res;
            if (!dict) {
                throw new Error("No domain named `" + domain + "` could be found.");
            }
            val_list = dict[key];
            if (!val_list || val_idx >= val_list.length) {
                if (this.options.missing_key_callback) {
                    this.options.missing_key_callback(key);
                }
                res = [ null, singular_key, plural_key ];
                return res[getPluralFormFunc(pluralForms)(val) + 1];
            }
            res = val_list[val_idx];
            if (!res) {
                res = [ null, singular_key, plural_key ];
                return res[getPluralFormFunc(pluralForms)(val) + 1];
            }
            return res;
        }
    });
    var sprintf = function() {
        function get_type(variable) {
            return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
        }
        function str_repeat(input, multiplier) {
            for (var output = []; multiplier > 0; output[--multiplier] = input) {}
            return output.join("");
        }
        var str_format = function() {
            if (!str_format.cache.hasOwnProperty(arguments[0])) {
                str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
            }
            return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
        };
        str_format.format = function(parse_tree, argv) {
            var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length;
            for (i = 0; i < tree_length; i++) {
                node_type = get_type(parse_tree[i]);
                if (node_type === "string") {
                    output.push(parse_tree[i]);
                } else if (node_type === "array") {
                    match = parse_tree[i];
                    if (match[2]) {
                        arg = argv[cursor];
                        for (k = 0; k < match[2].length; k++) {
                            if (!arg.hasOwnProperty(match[2][k])) {
                                throw sprintf('[sprintf] property "%s" does not exist', match[2][k]);
                            }
                            arg = arg[match[2][k]];
                        }
                    } else if (match[1]) {
                        arg = argv[match[1]];
                    } else {
                        arg = argv[cursor++];
                    }
                    if (/[^s]/.test(match[8]) && get_type(arg) != "number") {
                        throw sprintf("[sprintf] expecting number but found %s", get_type(arg));
                    }
                    if (typeof arg == "undefined" || arg === null) {
                        arg = "";
                    }
                    switch (match[8]) {
                      case "b":
                        arg = arg.toString(2);
                        break;

                      case "c":
                        arg = String.fromCharCode(arg);
                        break;

                      case "d":
                        arg = parseInt(arg, 10);
                        break;

                      case "e":
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                        break;

                      case "f":
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                        break;

                      case "o":
                        arg = arg.toString(8);
                        break;

                      case "s":
                        arg = (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;
                        break;

                      case "u":
                        arg = Math.abs(arg);
                        break;

                      case "x":
                        arg = arg.toString(16);
                        break;

                      case "X":
                        arg = arg.toString(16).toUpperCase();
                        break;
                    }
                    arg = /[def]/.test(match[8]) && match[3] && arg >= 0 ? "+" + arg : arg;
                    pad_character = match[4] ? match[4] == "0" ? "0" : match[4].charAt(1) : " ";
                    pad_length = match[6] - String(arg).length;
                    pad = match[6] ? str_repeat(pad_character, pad_length) : "";
                    output.push(match[5] ? arg + pad : pad + arg);
                }
            }
            return output.join("");
        };
        str_format.cache = {};
        str_format.parse = function(fmt) {
            var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
            while (_fmt) {
                if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
                    parse_tree.push(match[0]);
                } else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
                    parse_tree.push("%");
                } else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
                    if (match[2]) {
                        arg_names |= 1;
                        var field_list = [], replacement_field = match[2], field_match = [];
                        if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                            field_list.push(field_match[1]);
                            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                } else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                } else {
                                    throw "[sprintf] huh?";
                                }
                            }
                        } else {
                            throw "[sprintf] huh?";
                        }
                        match[2] = field_list;
                    } else {
                        arg_names |= 2;
                    }
                    if (arg_names === 3) {
                        throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                    }
                    parse_tree.push(match);
                } else {
                    throw "[sprintf] huh?";
                }
                _fmt = _fmt.substring(match[0].length);
            }
            return parse_tree;
        };
        return str_format;
    }();
    var vsprintf = function(fmt, argv) {
        argv.unshift(fmt);
        return sprintf.apply(null, argv);
    };
    Jed.parse_plural = function(plural_forms, n) {
        plural_forms = plural_forms.replace(/n/g, n);
        return Jed.parse_expression(plural_forms);
    };
    Jed.sprintf = function(fmt, args) {
        if ({}.toString.call(args) == "[object Array]") {
            return vsprintf(fmt, [].slice.call(args));
        }
        return sprintf.apply(this, [].slice.call(arguments));
    };
    Jed.prototype.sprintf = function() {
        return Jed.sprintf.apply(this, arguments);
    };
    Jed.PF = {};
    Jed.PF.parse = function(p) {
        var plural_str = Jed.PF.extractPluralExpr(p);
        return Jed.PF.parser.parse.call(Jed.PF.parser, plural_str);
    };
    Jed.PF.compile = function(p) {
        function imply(val) {
            return val === true ? 1 : val ? val : 0;
        }
        var ast = Jed.PF.parse(p);
        return function(n) {
            return imply(Jed.PF.interpreter(ast)(n));
        };
    };
    Jed.PF.interpreter = function(ast) {
        return function(n) {
            var res;
            switch (ast.type) {
              case "GROUP":
                return Jed.PF.interpreter(ast.expr)(n);

              case "TERNARY":
                if (Jed.PF.interpreter(ast.expr)(n)) {
                    return Jed.PF.interpreter(ast.truthy)(n);
                }
                return Jed.PF.interpreter(ast.falsey)(n);

              case "OR":
                return Jed.PF.interpreter(ast.left)(n) || Jed.PF.interpreter(ast.right)(n);

              case "AND":
                return Jed.PF.interpreter(ast.left)(n) && Jed.PF.interpreter(ast.right)(n);

              case "LT":
                return Jed.PF.interpreter(ast.left)(n) < Jed.PF.interpreter(ast.right)(n);

              case "GT":
                return Jed.PF.interpreter(ast.left)(n) > Jed.PF.interpreter(ast.right)(n);

              case "LTE":
                return Jed.PF.interpreter(ast.left)(n) <= Jed.PF.interpreter(ast.right)(n);

              case "GTE":
                return Jed.PF.interpreter(ast.left)(n) >= Jed.PF.interpreter(ast.right)(n);

              case "EQ":
                return Jed.PF.interpreter(ast.left)(n) == Jed.PF.interpreter(ast.right)(n);

              case "NEQ":
                return Jed.PF.interpreter(ast.left)(n) != Jed.PF.interpreter(ast.right)(n);

              case "MOD":
                return Jed.PF.interpreter(ast.left)(n) % Jed.PF.interpreter(ast.right)(n);

              case "VAR":
                return n;

              case "NUM":
                return ast.val;

              default:
                throw new Error("Invalid Token found.");
            }
        };
    };
    Jed.PF.extractPluralExpr = function(p) {
        p = p.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        if (!/;\s*$/.test(p)) {
            p = p.concat(";");
        }
        var nplurals_re = /nplurals\=(\d+);/, plural_re = /plural\=(.*);/, nplurals_matches = p.match(nplurals_re), res = {}, plural_matches;
        if (nplurals_matches.length > 1) {
            res.nplurals = nplurals_matches[1];
        } else {
            throw new Error("nplurals not found in plural_forms string: " + p);
        }
        p = p.replace(nplurals_re, "");
        plural_matches = p.match(plural_re);
        if (!(plural_matches && plural_matches.length > 1)) {
            throw new Error("`plural` expression not found: " + p);
        }
        return plural_matches[1];
    };
    Jed.PF.parser = function() {
        var parser = {
            trace: function trace() {},
            yy: {},
            symbols_: {
                error: 2,
                expressions: 3,
                e: 4,
                EOF: 5,
                "?": 6,
                ":": 7,
                "||": 8,
                "&&": 9,
                "<": 10,
                "<=": 11,
                ">": 12,
                ">=": 13,
                "!=": 14,
                "==": 15,
                "%": 16,
                "(": 17,
                ")": 18,
                n: 19,
                NUMBER: 20,
                $accept: 0,
                $end: 1
            },
            terminals_: {
                2: "error",
                5: "EOF",
                6: "?",
                7: ":",
                8: "||",
                9: "&&",
                10: "<",
                11: "<=",
                12: ">",
                13: ">=",
                14: "!=",
                15: "==",
                16: "%",
                17: "(",
                18: ")",
                19: "n",
                20: "NUMBER"
            },
            productions_: [ 0, [ 3, 2 ], [ 4, 5 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 1 ], [ 4, 1 ] ],
            performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
                var $0 = $$.length - 1;
                switch (yystate) {
                  case 1:
                    return {
                        type: "GROUP",
                        expr: $$[$0 - 1]
                    };
                    break;

                  case 2:
                    this.$ = {
                        type: "TERNARY",
                        expr: $$[$0 - 4],
                        truthy: $$[$0 - 2],
                        falsey: $$[$0]
                    };
                    break;

                  case 3:
                    this.$ = {
                        type: "OR",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 4:
                    this.$ = {
                        type: "AND",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 5:
                    this.$ = {
                        type: "LT",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 6:
                    this.$ = {
                        type: "LTE",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 7:
                    this.$ = {
                        type: "GT",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 8:
                    this.$ = {
                        type: "GTE",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 9:
                    this.$ = {
                        type: "NEQ",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 10:
                    this.$ = {
                        type: "EQ",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 11:
                    this.$ = {
                        type: "MOD",
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;

                  case 12:
                    this.$ = {
                        type: "GROUP",
                        expr: $$[$0 - 1]
                    };
                    break;

                  case 13:
                    this.$ = {
                        type: "VAR"
                    };
                    break;

                  case 14:
                    this.$ = {
                        type: "NUM",
                        val: Number(yytext)
                    };
                    break;
                }
            },
            table: [ {
                3: 1,
                4: 2,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                1: [ 3 ]
            }, {
                5: [ 1, 6 ],
                6: [ 1, 7 ],
                8: [ 1, 8 ],
                9: [ 1, 9 ],
                10: [ 1, 10 ],
                11: [ 1, 11 ],
                12: [ 1, 12 ],
                13: [ 1, 13 ],
                14: [ 1, 14 ],
                15: [ 1, 15 ],
                16: [ 1, 16 ]
            }, {
                4: 17,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                5: [ 2, 13 ],
                6: [ 2, 13 ],
                7: [ 2, 13 ],
                8: [ 2, 13 ],
                9: [ 2, 13 ],
                10: [ 2, 13 ],
                11: [ 2, 13 ],
                12: [ 2, 13 ],
                13: [ 2, 13 ],
                14: [ 2, 13 ],
                15: [ 2, 13 ],
                16: [ 2, 13 ],
                18: [ 2, 13 ]
            }, {
                5: [ 2, 14 ],
                6: [ 2, 14 ],
                7: [ 2, 14 ],
                8: [ 2, 14 ],
                9: [ 2, 14 ],
                10: [ 2, 14 ],
                11: [ 2, 14 ],
                12: [ 2, 14 ],
                13: [ 2, 14 ],
                14: [ 2, 14 ],
                15: [ 2, 14 ],
                16: [ 2, 14 ],
                18: [ 2, 14 ]
            }, {
                1: [ 2, 1 ]
            }, {
                4: 18,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 19,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 20,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 21,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 22,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 23,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 24,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 25,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 26,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                4: 27,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                6: [ 1, 7 ],
                8: [ 1, 8 ],
                9: [ 1, 9 ],
                10: [ 1, 10 ],
                11: [ 1, 11 ],
                12: [ 1, 12 ],
                13: [ 1, 13 ],
                14: [ 1, 14 ],
                15: [ 1, 15 ],
                16: [ 1, 16 ],
                18: [ 1, 28 ]
            }, {
                6: [ 1, 7 ],
                7: [ 1, 29 ],
                8: [ 1, 8 ],
                9: [ 1, 9 ],
                10: [ 1, 10 ],
                11: [ 1, 11 ],
                12: [ 1, 12 ],
                13: [ 1, 13 ],
                14: [ 1, 14 ],
                15: [ 1, 15 ],
                16: [ 1, 16 ]
            }, {
                5: [ 2, 3 ],
                6: [ 2, 3 ],
                7: [ 2, 3 ],
                8: [ 2, 3 ],
                9: [ 1, 9 ],
                10: [ 1, 10 ],
                11: [ 1, 11 ],
                12: [ 1, 12 ],
                13: [ 1, 13 ],
                14: [ 1, 14 ],
                15: [ 1, 15 ],
                16: [ 1, 16 ],
                18: [ 2, 3 ]
            }, {
                5: [ 2, 4 ],
                6: [ 2, 4 ],
                7: [ 2, 4 ],
                8: [ 2, 4 ],
                9: [ 2, 4 ],
                10: [ 1, 10 ],
                11: [ 1, 11 ],
                12: [ 1, 12 ],
                13: [ 1, 13 ],
                14: [ 1, 14 ],
                15: [ 1, 15 ],
                16: [ 1, 16 ],
                18: [ 2, 4 ]
            }, {
                5: [ 2, 5 ],
                6: [ 2, 5 ],
                7: [ 2, 5 ],
                8: [ 2, 5 ],
                9: [ 2, 5 ],
                10: [ 2, 5 ],
                11: [ 2, 5 ],
                12: [ 2, 5 ],
                13: [ 2, 5 ],
                14: [ 2, 5 ],
                15: [ 2, 5 ],
                16: [ 1, 16 ],
                18: [ 2, 5 ]
            }, {
                5: [ 2, 6 ],
                6: [ 2, 6 ],
                7: [ 2, 6 ],
                8: [ 2, 6 ],
                9: [ 2, 6 ],
                10: [ 2, 6 ],
                11: [ 2, 6 ],
                12: [ 2, 6 ],
                13: [ 2, 6 ],
                14: [ 2, 6 ],
                15: [ 2, 6 ],
                16: [ 1, 16 ],
                18: [ 2, 6 ]
            }, {
                5: [ 2, 7 ],
                6: [ 2, 7 ],
                7: [ 2, 7 ],
                8: [ 2, 7 ],
                9: [ 2, 7 ],
                10: [ 2, 7 ],
                11: [ 2, 7 ],
                12: [ 2, 7 ],
                13: [ 2, 7 ],
                14: [ 2, 7 ],
                15: [ 2, 7 ],
                16: [ 1, 16 ],
                18: [ 2, 7 ]
            }, {
                5: [ 2, 8 ],
                6: [ 2, 8 ],
                7: [ 2, 8 ],
                8: [ 2, 8 ],
                9: [ 2, 8 ],
                10: [ 2, 8 ],
                11: [ 2, 8 ],
                12: [ 2, 8 ],
                13: [ 2, 8 ],
                14: [ 2, 8 ],
                15: [ 2, 8 ],
                16: [ 1, 16 ],
                18: [ 2, 8 ]
            }, {
                5: [ 2, 9 ],
                6: [ 2, 9 ],
                7: [ 2, 9 ],
                8: [ 2, 9 ],
                9: [ 2, 9 ],
                10: [ 2, 9 ],
                11: [ 2, 9 ],
                12: [ 2, 9 ],
                13: [ 2, 9 ],
                14: [ 2, 9 ],
                15: [ 2, 9 ],
                16: [ 1, 16 ],
                18: [ 2, 9 ]
            }, {
                5: [ 2, 10 ],
                6: [ 2, 10 ],
                7: [ 2, 10 ],
                8: [ 2, 10 ],
                9: [ 2, 10 ],
                10: [ 2, 10 ],
                11: [ 2, 10 ],
                12: [ 2, 10 ],
                13: [ 2, 10 ],
                14: [ 2, 10 ],
                15: [ 2, 10 ],
                16: [ 1, 16 ],
                18: [ 2, 10 ]
            }, {
                5: [ 2, 11 ],
                6: [ 2, 11 ],
                7: [ 2, 11 ],
                8: [ 2, 11 ],
                9: [ 2, 11 ],
                10: [ 2, 11 ],
                11: [ 2, 11 ],
                12: [ 2, 11 ],
                13: [ 2, 11 ],
                14: [ 2, 11 ],
                15: [ 2, 11 ],
                16: [ 2, 11 ],
                18: [ 2, 11 ]
            }, {
                5: [ 2, 12 ],
                6: [ 2, 12 ],
                7: [ 2, 12 ],
                8: [ 2, 12 ],
                9: [ 2, 12 ],
                10: [ 2, 12 ],
                11: [ 2, 12 ],
                12: [ 2, 12 ],
                13: [ 2, 12 ],
                14: [ 2, 12 ],
                15: [ 2, 12 ],
                16: [ 2, 12 ],
                18: [ 2, 12 ]
            }, {
                4: 30,
                17: [ 1, 3 ],
                19: [ 1, 4 ],
                20: [ 1, 5 ]
            }, {
                5: [ 2, 2 ],
                6: [ 1, 7 ],
                7: [ 2, 2 ],
                8: [ 1, 8 ],
                9: [ 1, 9 ],
                10: [ 1, 10 ],
                11: [ 1, 11 ],
                12: [ 1, 12 ],
                13: [ 1, 13 ],
                14: [ 1, 14 ],
                15: [ 1, 15 ],
                16: [ 1, 16 ],
                18: [ 2, 2 ]
            } ],
            defaultActions: {
                6: [ 2, 1 ]
            },
            parseError: function parseError(str, hash) {
                throw new Error(str);
            },
            parse: function parse(input) {
                var self = this, stack = [ 0 ], vstack = [ null ], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
                this.lexer.setInput(input);
                this.lexer.yy = this.yy;
                this.yy.lexer = this.lexer;
                if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
                var yyloc = this.lexer.yylloc;
                lstack.push(yyloc);
                if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
                function popStack(n) {
                    stack.length = stack.length - 2 * n;
                    vstack.length = vstack.length - n;
                    lstack.length = lstack.length - n;
                }
                function lex() {
                    var token;
                    token = self.lexer.lex() || 1;
                    if (typeof token !== "number") {
                        token = self.symbols_[token] || token;
                    }
                    return token;
                }
                var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
                while (true) {
                    state = stack[stack.length - 1];
                    if (this.defaultActions[state]) {
                        action = this.defaultActions[state];
                    } else {
                        if (symbol == null) symbol = lex();
                        action = table[state] && table[state][symbol];
                    }
                    _handle_error: if (typeof action === "undefined" || !action.length || !action[0]) {
                        if (!recovering) {
                            expected = [];
                            for (p in table[state]) if (this.terminals_[p] && p > 2) {
                                expected.push("'" + this.terminals_[p] + "'");
                            }
                            var errStr = "";
                            if (this.lexer.showPosition) {
                                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'";
                            } else {
                                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                            }
                            this.parseError(errStr, {
                                text: this.lexer.match,
                                token: this.terminals_[symbol] || symbol,
                                line: this.lexer.yylineno,
                                loc: yyloc,
                                expected: expected
                            });
                        }
                        if (recovering == 3) {
                            if (symbol == EOF) {
                                throw new Error(errStr || "Parsing halted.");
                            }
                            yyleng = this.lexer.yyleng;
                            yytext = this.lexer.yytext;
                            yylineno = this.lexer.yylineno;
                            yyloc = this.lexer.yylloc;
                            symbol = lex();
                        }
                        while (1) {
                            if (TERROR.toString() in table[state]) {
                                break;
                            }
                            if (state == 0) {
                                throw new Error(errStr || "Parsing halted.");
                            }
                            popStack(1);
                            state = stack[stack.length - 1];
                        }
                        preErrorSymbol = symbol;
                        symbol = TERROR;
                        state = stack[stack.length - 1];
                        action = table[state] && table[state][TERROR];
                        recovering = 3;
                    }
                    if (action[0] instanceof Array && action.length > 1) {
                        throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                    }
                    switch (action[0]) {
                      case 1:
                        stack.push(symbol);
                        vstack.push(this.lexer.yytext);
                        lstack.push(this.lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = this.lexer.yyleng;
                            yytext = this.lexer.yytext;
                            yylineno = this.lexer.yylineno;
                            yyloc = this.lexer.yylloc;
                            if (recovering > 0) recovering--;
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;

                      case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                        if (typeof r !== "undefined") {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;

                      case 3:
                        return true;
                    }
                }
                return true;
            }
        };
        var lexer = function() {
            var lexer = {
                EOF: 1,
                parseError: function parseError(str, hash) {
                    if (this.yy.parseError) {
                        this.yy.parseError(str, hash);
                    } else {
                        throw new Error(str);
                    }
                },
                setInput: function(input) {
                    this._input = input;
                    this._more = this._less = this.done = false;
                    this.yylineno = this.yyleng = 0;
                    this.yytext = this.matched = this.match = "";
                    this.conditionStack = [ "INITIAL" ];
                    this.yylloc = {
                        first_line: 1,
                        first_column: 0,
                        last_line: 1,
                        last_column: 0
                    };
                    return this;
                },
                input: function() {
                    var ch = this._input[0];
                    this.yytext += ch;
                    this.yyleng++;
                    this.match += ch;
                    this.matched += ch;
                    var lines = ch.match(/\n/);
                    if (lines) this.yylineno++;
                    this._input = this._input.slice(1);
                    return ch;
                },
                unput: function(ch) {
                    this._input = ch + this._input;
                    return this;
                },
                more: function() {
                    this._more = true;
                    return this;
                },
                pastInput: function() {
                    var past = this.matched.substr(0, this.matched.length - this.match.length);
                    return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
                },
                upcomingInput: function() {
                    var next = this.match;
                    if (next.length < 20) {
                        next += this._input.substr(0, 20 - next.length);
                    }
                    return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
                },
                showPosition: function() {
                    var pre = this.pastInput();
                    var c = new Array(pre.length + 1).join("-");
                    return pre + this.upcomingInput() + "\n" + c + "^";
                },
                next: function() {
                    if (this.done) {
                        return this.EOF;
                    }
                    if (!this._input) this.done = true;
                    var token, match, col, lines;
                    if (!this._more) {
                        this.yytext = "";
                        this.match = "";
                    }
                    var rules = this._currentRules();
                    for (var i = 0; i < rules.length; i++) {
                        match = this._input.match(this.rules[rules[i]]);
                        if (match) {
                            lines = match[0].match(/\n.*/g);
                            if (lines) this.yylineno += lines.length;
                            this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match[0].length
                            };
                            this.yytext += match[0];
                            this.match += match[0];
                            this.matches = match;
                            this.yyleng = this.yytext.length;
                            this._more = false;
                            this._input = this._input.slice(match[0].length);
                            this.matched += match[0];
                            token = this.performAction.call(this, this.yy, this, rules[i], this.conditionStack[this.conditionStack.length - 1]);
                            if (token) return token; else return;
                        }
                    }
                    if (this._input === "") {
                        return this.EOF;
                    } else {
                        this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        });
                    }
                },
                lex: function lex() {
                    var r = this.next();
                    if (typeof r !== "undefined") {
                        return r;
                    } else {
                        return this.lex();
                    }
                },
                begin: function begin(condition) {
                    this.conditionStack.push(condition);
                },
                popState: function popState() {
                    return this.conditionStack.pop();
                },
                _currentRules: function _currentRules() {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                },
                topState: function() {
                    return this.conditionStack[this.conditionStack.length - 2];
                },
                pushState: function begin(condition) {
                    this.begin(condition);
                }
            };
            lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                  case 0:
                    break;

                  case 1:
                    return 20;
                    break;

                  case 2:
                    return 19;
                    break;

                  case 3:
                    return 8;
                    break;

                  case 4:
                    return 9;
                    break;

                  case 5:
                    return 6;
                    break;

                  case 6:
                    return 7;
                    break;

                  case 7:
                    return 11;
                    break;

                  case 8:
                    return 13;
                    break;

                  case 9:
                    return 10;
                    break;

                  case 10:
                    return 12;
                    break;

                  case 11:
                    return 14;
                    break;

                  case 12:
                    return 15;
                    break;

                  case 13:
                    return 16;
                    break;

                  case 14:
                    return 17;
                    break;

                  case 15:
                    return 18;
                    break;

                  case 16:
                    return 5;
                    break;

                  case 17:
                    return "INVALID";
                    break;
                }
            };
            lexer.rules = [ /^\s+/, /^[0-9]+(\.[0-9]+)?\b/, /^n\b/, /^\|\|/, /^&&/, /^\?/, /^:/, /^<=/, /^>=/, /^</, /^>/, /^!=/, /^==/, /^%/, /^\(/, /^\)/, /^$/, /^./ ];
            lexer.conditions = {
                INITIAL: {
                    rules: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
                    inclusive: true
                }
            };
            return lexer;
        }();
        parser.lexer = lexer;
        return parser;
    }();
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = Jed;
        }
        exports.Jed = Jed;
    } else {
        if (typeof define === "function" && define.amd) {
            define("jed", function() {
                return Jed;
            });
        }
        root["Jed"] = Jed;
    }
})(this);

(function(root, factory) {
    var translations = {
        domain: "converse",
        locale_data: {
            converse: {
                "": {
                    domain: "converse",
                    lang: "en",
                    plural_forms: "nplurals=2; plural=(n != 1);"
                }
            }
        }
    };
    if (typeof define === "function" && define.amd) {
        define("en", [ "jed" ], function() {
            return factory(new Jed(translations));
        });
    } else {
        if (!window.locales) {
            window.locales = {};
        }
        window.locales.en = factory(new Jed(translations));
    }
})(this, function(en) {
    return en;
});

var saveAs = saveAs || typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(view) {
    "use strict";
    if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var doc = view.document, get_URL = function() {
        return view.URL || view.webkitURL || view;
    }, URL = view.URL || view.webkitURL || view, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"), can_use_save_link = !view.externalHost && "download" in save_link, click = function(node) {
        var event = doc.createEvent("MouseEvents");
        event.initMouseEvent("click", true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        node.dispatchEvent(event);
    }, webkit_req_fs = view.webkitRequestFileSystem, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem, throw_outside = function(ex) {
        (view.setImmediate || view.setTimeout)(function() {
            throw ex;
        }, 0);
    }, force_saveable_type = "application/octet-stream", fs_min_size = 0, deletion_queue = [], process_deletion_queue = function() {
        var i = deletion_queue.length;
        while (i--) {
            var file = deletion_queue[i];
            if (typeof file === "string") {
                URL.revokeObjectURL(file);
            } else {
                file.remove();
            }
        }
        deletion_queue.length = 0;
    }, dispatch = function(filesaver, event_types, event) {
        event_types = [].concat(event_types);
        var i = event_types.length;
        while (i--) {
            var listener = filesaver["on" + event_types[i]];
            if (typeof listener === "function") {
                try {
                    listener.call(filesaver, event || filesaver);
                } catch (ex) {
                    throw_outside(ex);
                }
            }
        }
    }, FileSaver = function(blob, name) {
        var filesaver = this, type = blob.type, blob_changed = false, object_url, target_view, get_object_url = function() {
            var object_url = get_URL().createObjectURL(blob);
            deletion_queue.push(object_url);
            return object_url;
        }, dispatch_all = function() {
            dispatch(filesaver, "writestart progress write writeend".split(" "));
        }, fs_error = function() {
            if (blob_changed || !object_url) {
                object_url = get_object_url(blob);
            }
            if (target_view) {
                target_view.location.href = object_url;
            } else {
                window.open(object_url, "_blank");
            }
            filesaver.readyState = filesaver.DONE;
            dispatch_all();
        }, abortable = function(func) {
            return function() {
                if (filesaver.readyState !== filesaver.DONE) {
                    return func.apply(this, arguments);
                }
            };
        }, create_if_not_found = {
            create: true,
            exclusive: false
        }, slice;
        filesaver.readyState = filesaver.INIT;
        if (!name) {
            name = "download";
        }
        if (can_use_save_link) {
            object_url = get_object_url(blob);
            doc = view.document;
            save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
            save_link.href = object_url;
            save_link.download = name;
            var event = doc.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
            filesaver.readyState = filesaver.DONE;
            dispatch_all();
            return;
        }
        if (view.chrome && type && type !== force_saveable_type) {
            slice = blob.slice || blob.webkitSlice;
            blob = slice.call(blob, 0, blob.size, force_saveable_type);
            blob_changed = true;
        }
        if (webkit_req_fs && name !== "download") {
            name += ".download";
        }
        if (type === force_saveable_type || webkit_req_fs) {
            target_view = view;
        }
        if (!req_fs) {
            fs_error();
            return;
        }
        fs_min_size += blob.size;
        req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
            fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
                var save = function() {
                    dir.getFile(name, create_if_not_found, abortable(function(file) {
                        file.createWriter(abortable(function(writer) {
                            writer.onwriteend = function(event) {
                                target_view.location.href = file.toURL();
                                deletion_queue.push(file);
                                filesaver.readyState = filesaver.DONE;
                                dispatch(filesaver, "writeend", event);
                            };
                            writer.onerror = function() {
                                var error = writer.error;
                                if (error.code !== error.ABORT_ERR) {
                                    fs_error();
                                }
                            };
                            "writestart progress write abort".split(" ").forEach(function(event) {
                                writer["on" + event] = filesaver["on" + event];
                            });
                            writer.write(blob);
                            filesaver.abort = function() {
                                writer.abort();
                                filesaver.readyState = filesaver.DONE;
                            };
                            filesaver.readyState = filesaver.WRITING;
                        }), fs_error);
                    }), fs_error);
                };
                dir.getFile(name, {
                    create: false
                }, abortable(function(file) {
                    file.remove();
                    save();
                }), abortable(function(ex) {
                    if (ex.code === ex.NOT_FOUND_ERR) {
                        save();
                    } else {
                        fs_error();
                    }
                }));
            }), fs_error);
        }), fs_error);
    }, FS_proto = FileSaver.prototype, saveAs = function(blob, name) {
        return new FileSaver(blob, name);
    };
    FS_proto.abort = function() {
        var filesaver = this;
        filesaver.readyState = filesaver.DONE;
        dispatch(filesaver, "abort");
    };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;
    FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
    view.addEventListener("unload", process_deletion_queue, false);
    saveAs.unload = function() {
        process_deletion_queue();
        view.removeEventListener("unload", process_deletion_queue, false);
    };
    return saveAs;
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content);

if (typeof module !== "undefined") module.exports = saveAs;

var __slice = Array.prototype.slice;

(function($) {
    var Sketch;
    $.fn.sketch = function() {
        var args, key, sketch;
        key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (this.length > 1) {
            $.error("Sketch.js can only be called on one element at a time.");
        }
        sketch = this.data("sketch");
        if (typeof key === "string" && sketch) {
            if (sketch[key]) {
                if (typeof sketch[key] === "function") {
                    return sketch[key].apply(sketch, args);
                } else if (args.length === 0) {
                    return sketch[key];
                } else if (args.length === 1) {
                    return sketch[key] = args[0];
                }
            } else {
                return $.error("Sketch.js did not recognize the given command.");
            }
        } else if (sketch) {
            return sketch;
        } else {
            this.data("sketch", new Sketch(this.get(0), key));
            return this;
        }
    };
    Sketch = function() {
        function Sketch(el, opts) {
            this.el = el;
            this.canvas = $(el);
            this.context = el.getContext("2d");
            this.options = $.extend({
                toolLinks: true,
                defaultTool: "marker",
                defaultColor: "#000000",
                defaultSize: 5
            }, opts);
            this.painting = false;
            this.color = this.options.defaultColor;
            this.size = this.options.defaultSize;
            this.tool = this.options.defaultTool;
            this.actions = [];
            this.action = [];
            this.canvas.bind("click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel", this.onEvent);
            if (this.options.toolLinks) {
                $("body").delegate('a[href="#' + this.canvas.attr("id") + '"]', "click", function(e) {
                    var $canvas, $this, key, sketch, _i, _len, _ref;
                    $this = $(this);
                    $canvas = $($this.attr("href"));
                    sketch = $canvas.data("sketch");
                    _ref = [ "color", "size", "tool" ];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        key = _ref[_i];
                        if ($this.attr("data-" + key)) {
                            sketch.set(key, $(this).attr("data-" + key));
                        }
                    }
                    if ($(this).attr("data-download")) {
                        sketch.download($(this).attr("data-download"));
                    }
                    return false;
                });
            }
        }
        Sketch.prototype.download = function(format) {
            var mime;
            format || (format = "png");
            if (format === "jpg") {
                format = "jpeg";
            }
            mime = "image/" + format;
            return window.open(this.el.toDataURL(mime));
        };
        Sketch.prototype.set = function(key, value) {
            this[key] = value;
            return this.canvas.trigger("sketch.change" + key, value);
        };
        Sketch.prototype.startPainting = function() {
            this.painting = true;
            return this.action = {
                tool: this.tool,
                color: this.color,
                size: parseFloat(this.size),
                events: []
            };
        };
        Sketch.prototype.stopPainting = function() {
            if (this.action) {
                this.actions.push(this.action);
            }
            this.painting = false;
            this.action = null;
            return this.redraw();
        };
        Sketch.prototype.onEvent = function(e) {
            if (e.originalEvent && e.originalEvent.targetTouches) {
                e.pageX = e.originalEvent.targetTouches[0].pageX;
                e.pageY = e.originalEvent.targetTouches[0].pageY;
            }
            $.sketch.tools[$(this).data("sketch").tool].onEvent.call($(this).data("sketch"), e);
            e.preventDefault();
            return false;
        };
        Sketch.prototype.redraw = function() {};
        return Sketch;
    }();
    $.sketch = {
        tools: {}
    };
    $.sketch.tools.marker = {
        onEvent: function(e) {
            switch (e.type) {
              case "mousedown":
              case "touchstart":
                this.startPainting();
                break;

              case "mouseup":
              case "mouseout":
              case "mouseleave":
              case "touchend":
              case "touchcancel":
                this.stopPainting();
            }
            if (this.painting) {
                this.action.events.push({
                    x: e.pageX - this.canvas.offset().left,
                    y: e.pageY - this.canvas.offset().top,
                    event: e.type
                });
                return this.redraw();
            }
        },
        draw: function(action) {
            var event, previous, _i, _len, _ref;
            this.context.lineJoin = "round";
            this.context.lineCap = "round";
            this.context.beginPath();
            this.context.moveTo(action.events[0].x, action.events[0].y);
            _ref = action.events;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                event = _ref[_i];
                this.context.lineTo(event.x, event.y);
                previous = event;
            }
            this.context.strokeStyle = action.color;
            this.context.lineWidth = action.size;
            return this.context.stroke();
        }
    };
    return $.sketch.tools.eraser = {
        onEvent: function(e) {
            return $.sketch.tools.marker.onEvent.call(this, e);
        },
        draw: function(action) {
            var oldcomposite;
            oldcomposite = this.context.globalCompositeOperation;
            this.context.globalCompositeOperation = "copy";
            action.color = "rgba(0,0,0,0)";
            $.sketch.tools.marker.draw.call(this, action);
            return this.context.globalCompositeOperation = oldcomposite;
        }
    };
})(jQuery);

(function(root, factory) {
    if (typeof console === "undefined" || typeof console.log === "undefined") {
        console = {
            log: function() {},
            error: function() {}
        };
    }
    if (typeof define === "function" && define.amd) {
        define("converse", [ "converse-dependencies" ], function(otr) {
            _.templateSettings = {
                evaluate: /\{\[([\s\S]+?)\]\}/g,
                interpolate: /\{\{([\s\S]+?)\}\}/g
            };
            if (typeof otr !== "undefined") {
                return factory(jQuery, _, otr.OTR, otr.DSA, console);
            } else {
                return factory(jQuery, _, undefined, undefined, console);
            }
        });
    } else {
        _.templateSettings = {
            evaluate: /\{\[([\s\S]+?)\]\}/g,
            interpolate: /\{\{([\s\S]+?)\}\}/g
        };
        if (typeof OTR !== "undefined" && typeof DSA !== "undefined") {
            root.converse = factory(jQuery, _, OTR, DSA, console);
        } else {
            root.converse = factory(jQuery, _, undefined, undefined, console);
        }
    }
})(this, function($, _, OTR, DSA, console) {
    $.fn.addHyperlinks = function() {
        if (this.length > 0) {
            this.each(function(i, obj) {
                var x = $(obj).html();
                var list = x.match(/\b(https?:\/\/|www\.|https?:\/\/www\.)[^\s<]{2,200}\b/g);
                if (list) {
                    for (i = 0; i < list.length; i++) {
                        var prot = list[i].indexOf("http://") === 0 || list[i].indexOf("https://") === 0 ? "" : "http://";
                        var escaped_url = encodeURI(decodeURI(list[i])).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
                        x = x.replace(list[i], "<a target='_blank' href='" + prot + escaped_url + "'>" + list[i] + "</a>");
                    }
                }
                $(obj).html(x);
            });
        }
        return this;
    };
    $.fn.addEmoticons = function() {
        if (converse.show_emoticons) {
            if (this.length > 0) {
                this.each(function(i, obj) {
                    var text = $(obj).html();
                    text = text.replace(/:\)/g, '<span class="emoticon icon-smiley"></span>');
                    text = text.replace(/:\-\)/g, '<span class="emoticon icon-smiley"></span>');
                    text = text.replace(/;\)/g, '<span class="emoticon icon-wink"></span>');
                    text = text.replace(/;\-\)/g, '<span class="emoticon icon-wink"></span>');
                    text = text.replace(/:D/g, '<span class="emoticon icon-grin"></span>');
                    text = text.replace(/:\-D/g, '<span class="emoticon icon-grin"></span>');
                    text = text.replace(/:P/g, '<span class="emoticon icon-tongue"></span>');
                    text = text.replace(/:\-P/g, '<span class="emoticon icon-tongue"></span>');
                    text = text.replace(/:p/g, '<span class="emoticon icon-tongue"></span>');
                    text = text.replace(/:\-p/g, '<span class="emoticon icon-tongue"></span>');
                    text = text.replace(/8\)/g, '<span class="emoticon icon-cool"></span>');
                    text = text.replace(/&gt;:\)/g, '<span class="emoticon icon-evil"></span>');
                    text = text.replace(/:S/g, '<span class="emoticon icon-confused"></span>');
                    text = text.replace(/:\\/g, '<span class="emoticon icon-wondering"></span>');
                    text = text.replace(/:\/ /g, '<span class="emoticon icon-wondering"></span>');
                    text = text.replace(/&gt;:\(/g, '<span class="emoticon icon-angry"></span>');
                    text = text.replace(/:\(/g, '<span class="emoticon icon-sad"></span>');
                    text = text.replace(/:\-\(/g, '<span class="emoticon icon-sad"></span>');
                    text = text.replace(/:O/g, '<span class="emoticon icon-shocked"></span>');
                    text = text.replace(/:\-O/g, '<span class="emoticon icon-shocked"></span>');
                    text = text.replace(/\=\-O/g, '<span class="emoticon icon-shocked"></span>');
                    text = text.replace(/\(\^.\^\)b/g, '<span class="emoticon icon-thumbs-up"></span>');
                    text = text.replace(/<3/g, '<span class="emoticon icon-heart"></span>');
                    $(obj).html(text);
                });
            }
        }
        return this;
    };
    var converse = {
        emit: function(evt, data) {
            $(this).trigger(evt, data);
        },
        once: function(evt, handler) {
            $(this).one(evt, handler);
        },
        on: function(evt, handler) {
            $(this).bind(evt, handler);
        },
        off: function(evt, handler) {
            $(this).unbind(evt, handler);
        }
    };
    converse.initialize = function(settings, callback) {
        var converse = this;
        var UNENCRYPTED = 0;
        var UNVERIFIED = 1;
        var VERIFIED = 2;
        var FINISHED = 3;
        var KEY = {
            ENTER: 13
        };
        var HAS_CSPRNG = typeof crypto !== "undefined" && (typeof crypto.randomBytes === "function" || typeof crypto.getRandomValues === "function");
        var HAS_CRYPTO = HAS_CSPRNG && (typeof CryptoJS !== "undefined" && typeof OTR !== "undefined" && typeof DSA !== "undefined");
        this.allow_contact_requests = true;
        this.allow_muc = true;
        this.allow_otr = true;
        this.animate = true;
        this.auto_list_rooms = false;
        this.auto_reconnect = true;
        this.auto_subscribe = false;
        this.bosh_service_url = undefined;
        this.cache_otr_key = false;
        this.debug = false;
        this.expose_rid_and_sid = false;
        this.hide_muc_server = false;
        this.i18n = locales.en;
        this.prebind = false;
        this.show_controlbox_by_default = false;
        this.show_only_online_users = false;
        this.show_call_button = false;
        this.show_emoticons = true;
        this.show_toolbar = true;
        this.use_otr_by_default = false;
        this.use_vcards = true;
        this.xhr_custom_status = false;
        this.xhr_custom_status_url = "";
        this.xhr_user_search = false;
        this.xhr_user_search_url = "";
        _.extend(this, _.pick(settings, [ "allow_contact_requests", "allow_muc", "allow_otr", "animate", "auto_list_rooms", "auto_reconnect", "auto_subscribe", "bosh_service_url", "cache_otr_key", "connection", "debug", "expose_rid_and_sid", "fullname", "hide_muc_server", "i18n", "jid", "prebind", "rid", "show_call_button", "show_controlbox_by_default", "show_emoticons", "show_only_online_users", "show_toolbar", "sid", "use_otr_by_default", "use_vcards", "xhr_custom_status", "xhr_custom_status_url", "xhr_user_search", "xhr_user_search_url" ]));
        this.allow_otr = this.allow_otr && HAS_CRYPTO;
        this.use_otr_by_default = this.use_otr_by_default && this.allow_otr;
        var __ = $.proxy(function(str) {
            if (this.i18n === undefined) {
                this.i18n = locales.en;
            }
            var t = this.i18n.translate(str);
            if (arguments.length > 1) {
                return t.fetch.apply(t, [].slice.call(arguments, 1));
            } else {
                return t.fetch();
            }
        }, this);
        var ___ = function(str) {
            return str;
        };
        var OTR_CLASS_MAPPING = {};
        OTR_CLASS_MAPPING[UNENCRYPTED] = "unencrypted";
        OTR_CLASS_MAPPING[UNVERIFIED] = "unverified";
        OTR_CLASS_MAPPING[VERIFIED] = "verified";
        OTR_CLASS_MAPPING[FINISHED] = "finished";
        var OTR_TRANSLATED_MAPPING = {};
        OTR_TRANSLATED_MAPPING[UNENCRYPTED] = __("unencrypted");
        OTR_TRANSLATED_MAPPING[UNVERIFIED] = __("unverified");
        OTR_TRANSLATED_MAPPING[VERIFIED] = __("verified");
        OTR_TRANSLATED_MAPPING[FINISHED] = __("finished");
        var STATUSES = {
            dnd: __("This contact is busy"),
            online: __("This contact is online"),
            offline: __("This contact is offline"),
            unavailable: __("This contact is unavailable"),
            xa: __("This contact is away for an extended period"),
            away: __("This contact is away")
        };
        this.callback = callback || function() {};
        this.initial_presence_sent = 0;
        this.msg_counter = 0;
        this.giveFeedback = function(message, klass) {
            $(".conn-feedback").text(message);
            $(".conn-feedback").attr("class", "conn-feedback");
            if (klass) {
                $(".conn-feedback").addClass(klass);
            }
        };
        this.log = function(txt, level) {
            if (this.debug) {
                if (level == "error") {
                    console.log("ERROR: " + txt);
                } else {
                    console.log(txt);
                }
            }
        };
        this.getVCard = function(jid, callback, errback) {
            if (!this.use_vcards) {
                if (callback) {
                    callback(jid, jid);
                }
                return;
            }
            converse.connection.vcard.get($.proxy(function(iq) {
                var $vcard = $(iq).find("vCard");
                var fullname = $vcard.find("FN").text(), img = $vcard.find("BINVAL").text(), img_type = $vcard.find("TYPE").text(), url = $vcard.find("URL").text();
                if (jid) {
                    var rosteritem = converse.roster.get(jid);
                    if (rosteritem) {
                        fullname = _.isEmpty(fullname) ? rosteritem.get("fullname") || jid : fullname;
                        rosteritem.save({
                            fullname: fullname,
                            image_type: img_type,
                            image: img,
                            url: url,
                            vcard_updated: converse.toISOString(new Date())
                        });
                    }
                }
                if (callback) {
                    callback(jid, fullname, img, img_type, url);
                }
            }, this), jid, function(iq) {
                var rosteritem = converse.roster.get(jid);
                if (rosteritem) {
                    rosteritem.save({
                        vcard_updated: converse.toISOString(new Date())
                    });
                }
                if (errback) {
                    errback(iq);
                }
            });
        };
        this.reconnect = function() {
            converse.giveFeedback(__("Reconnecting"), "error");
            if (!converse.prebind) {
                this.connection.connect(this.connection.jid, this.connection.pass, function(status, condition) {
                    converse.onConnect(status, condition, true);
                }, this.connection.wait, this.connection.hold, this.connection.route);
            }
        };
        this.showLoginButton = function() {
            var view = converse.chatboxesview.views.controlbox;
            if (typeof view.loginpanel !== "undefined") {
                view.loginpanel.showLoginButton();
            }
        };
        this.onConnect = function(status, condition, reconnect) {
            var $button, $form;
            if (status === Strophe.Status.CONNECTED || status === Strophe.Status.ATTACHED) {
                if (typeof reconnect !== "undefined" && reconnect) {
                    converse.log(status === Strophe.Status.CONNECTED ? "Reconnected" : "Reattached");
                    converse.onReconnected();
                } else {
                    converse.log(status === Strophe.Status.CONNECTED ? "Connected" : "Attached");
                    converse.onConnected();
                }
            } else if (status === Strophe.Status.DISCONNECTED) {
                converse.giveFeedback(__("Disconnected"), "error");
                if (converse.auto_reconnect) {
                    converse.reconnect();
                } else {
                    converse.showLoginButton();
                }
            } else if (status === Strophe.Status.Error) {
                converse.showLoginButton();
                converse.giveFeedback(__("Error"), "error");
            } else if (status === Strophe.Status.CONNECTING) {
                converse.giveFeedback(__("Connecting"));
            } else if (status === Strophe.Status.CONNFAIL) {
                converse.showLoginButton();
                converse.giveFeedback(__("Connection Failed"), "error");
            } else if (status === Strophe.Status.AUTHENTICATING) {
                converse.giveFeedback(__("Authenticating"));
            } else if (status === Strophe.Status.AUTHFAIL) {
                converse.showLoginButton();
                converse.giveFeedback(__("Authentication Failed"), "error");
            } else if (status === Strophe.Status.DISCONNECTING) {
                converse.giveFeedback(__("Disconnecting"), "error");
            }
        };
        this.toISOString = function(date) {
            var pad;
            if (typeof date.toISOString !== "undefined") {
                return date.toISOString();
            } else {
                pad = function(num) {
                    return num < 10 ? "0" + num : "" + num;
                };
                return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + "T" + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + ".000Z";
            }
        };
        this.parseISO8601 = function(datestr) {
            var numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ], struct = /^\s*(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}\.?\d*)Z\s*$/.exec(datestr), minutesOffset = 0, i, k;
            for (i = 0; k = numericKeys[i]; ++i) {
                struct[k] = +struct[k] || 0;
            }
            struct[2] = (+struct[2] || 1) - 1;
            struct[3] = +struct[3] || 1;
            if (struct[8] !== "Z" && struct[9] !== undefined) {
                minutesOffset = struct[10] * 60 + struct[11];
                if (struct[9] === "+") {
                    minutesOffset = 0 - minutesOffset;
                }
            }
            return new Date(Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]));
        };
        this.updateMsgCounter = function() {
            if (this.msg_counter > 0) {
                if (document.title.search(/^Messages \(\d+\) /) == -1) {
                    document.title = "Messages (" + this.msg_counter + ") " + document.title;
                } else {
                    document.title = document.title.replace(/^Messages \(\d+\) /, "Messages (" + this.msg_counter + ") ");
                }
                window.blur();
                window.focus();
            } else if (document.title.search(/^Messages \(\d+\) /) != -1) {
                document.title = document.title.replace(/^Messages \(\d+\) /, "");
            }
        };
        this.incrementMsgCounter = function() {
            this.msg_counter += 1;
            this.updateMsgCounter();
        };
        this.clearMsgCounter = function() {
            this.msg_counter = 0;
            this.updateMsgCounter();
        };
        this.initStatus = function(callback) {
            this.xmppstatus = new this.XMPPStatus();
            var id = hex_sha1("converse.xmppstatus-" + this.bare_jid);
            this.xmppstatus.id = id;
            this.xmppstatus.localStorage = new Backbone.LocalStorage(id);
            this.xmppstatus.fetch({
                success: callback,
                error: callback
            });
        };
        this.registerRosterHandler = function() {
            this.connection.roster.registerCallback($.proxy(this.roster.rosterHandler, this.roster), null, "presence", null);
        };
        this.registerRosterXHandler = function() {
            this.connection.addHandler($.proxy(this.roster.subscribeToSuggestedItems, this.roster), "http://jabber.org/protocol/rosterx", "message", null);
        };
        this.registerPresenceHandler = function() {
            this.connection.addHandler($.proxy(function(presence) {
                this.presenceHandler(presence);
                return true;
            }, this.roster), null, "presence", null);
        };
        this.initRoster = function() {
            this.roster = new this.RosterItems();
            this.roster.localStorage = new Backbone.LocalStorage(hex_sha1("converse.rosteritems-" + converse.bare_jid));
            this.registerRosterHandler();
            this.registerRosterXHandler();
            this.registerPresenceHandler();
            this.rosterview = new this.RosterView({
                model: this.roster
            });
        };
        this.registerGlobalEventHandlers = function() {
            $(document).click(function() {
                if ($(".toggle-otr ul").is(":visible")) {
                    $(".toggle-otr ul", this).slideUp();
                }
                if ($(".toggle-smiley ul").is(":visible")) {
                    $(".toggle-smiley ul", this).slideUp();
                }
            });
            $(window).on("blur focus", $.proxy(function(e) {
                if (this.windowState != e.type && e.type == "focus") {
                    converse.clearMsgCounter();
                }
                this.windowState = e.type;
            }, this));
        };
        this.onReconnected = function() {
            this.initStatus($.proxy(function() {
                this.registerRosterXHandler();
                this.registerPresenceHandler();
                this.chatboxes.registerMessageHandler();
                converse.xmppstatus.sendPresence();
                this.giveFeedback(__("Online Contacts"));
            }, this));
        };
        this.onConnected = function() {
            if (this.debug) {
                this.connection.xmlInput = function(body) {
                    console.log(body);
                };
                this.connection.xmlOutput = function(body) {
                    console.log(body);
                };
                Strophe.log = function(level, msg) {
                    console.log(level + " " + msg);
                };
                Strophe.error = function(msg) {
                    console.log("ERROR: " + msg);
                };
            }
            this.bare_jid = Strophe.getBareJidFromJid(this.connection.jid);
            this.domain = Strophe.getDomainFromJid(this.connection.jid);
            this.features = new this.Features();
            this.initStatus($.proxy(function() {
                this.initRoster();
                this.chatboxes.onConnected();
                this.connection.roster.get(function() {});
                this.registerGlobalEventHandlers();
                this.giveFeedback(__("Online Contacts"));
                if (this.callback) {
                    if (this.connection.service === "jasmine tests") {
                        this.callback(this);
                    } else {
                        this.callback();
                    }
                }
            }, this));
            converse.emit("onReady");
        };
        this.OTR = Backbone.Model.extend({
            getSessionPassphrase: function() {
                if (converse.prebind) {
                    var key = hex_sha1(converse.connection.jid), pass = window.sessionStorage[key];
                    if (typeof pass === "undefined") {
                        pass = Math.floor(Math.random() * 4294967295).toString();
                        window.sessionStorage[key] = pass;
                    }
                    return pass;
                } else {
                    return converse.connection.pass;
                }
            },
            generatePrivateKey: function() {
                var key = new DSA();
                var jid = converse.connection.jid;
                if (converse.cache_otr_key) {
                    var cipher = CryptoJS.lib.PasswordBasedCipher;
                    var pass = this.getSessionPassphrase();
                    if (typeof pass !== "undefined") {
                        window.sessionStorage[hex_sha1(jid + "priv_key")] = cipher.encrypt(CryptoJS.algo.AES, key.packPrivate(), pass).toString();
                        window.sessionStorage[hex_sha1(jid + "instance_tag")] = instance_tag;
                        window.sessionStorage[hex_sha1(jid + "pass_check")] = cipher.encrypt(CryptoJS.algo.AES, "match", pass).toString();
                    }
                }
                return key;
            }
        });
        this.Message = Backbone.Model.extend();
        this.Messages = Backbone.Collection.extend({
            model: converse.Message
        });
        this.ChatBox = Backbone.Model.extend({
            initialize: function() {
                if (this.get("box_id") !== "controlbox") {
                    this.messages = new converse.Messages();
                    this.messages.localStorage = new Backbone.LocalStorage(hex_sha1("converse.messages" + this.get("jid") + converse.bare_jid));
                    this.set({
                        user_id: Strophe.getNodeFromJid(this.get("jid")),
                        box_id: hex_sha1(this.get("jid")),
                        otr_status: this.get("otr_status") || UNENCRYPTED
                    });
                }
            },
            getSession: function(callback) {
                var cipher = CryptoJS.lib.PasswordBasedCipher;
                var result, pass, instance_tag, saved_key, pass_check;
                if (converse.cache_otr_key) {
                    pass = converse.otr.getSessionPassphrase();
                    if (typeof pass !== "undefined") {
                        instance_tag = window.sessionStorage[hex_sha1(this.id + "instance_tag")];
                        saved_key = window.sessionStorage[hex_sha1(this.id + "priv_key")];
                        pass_check = window.sessionStorage[hex_sha1(this.connection.jid + "pass_check")];
                        if (saved_key && instance_tag && typeof pass_check !== "undefined") {
                            var decrypted = cipher.decrypt(CryptoJS.algo.AES, saved_key, pass);
                            var key = DSA.parsePrivate(decrypted.toString(CryptoJS.enc.Latin1));
                            if (cipher.decrypt(CryptoJS.algo.AES, pass_check, pass).toString(CryptoJS.enc.Latin1) === "match") {
                                this.trigger("showHelpMessages", [ __("Re-establishing encrypted session") ]);
                                callback({
                                    key: key,
                                    instance_tag: instance_tag
                                });
                                return;
                            }
                        }
                    }
                }
                this.trigger("showHelpMessages", [ __("Generating private key."), __("Your browser might become unresponsive.") ], null, true);
                setTimeout(function() {
                    callback({
                        key: converse.otr.generatePrivateKey.apply(this),
                        instance_tag: OTR.makeInstanceTag()
                    });
                }, 500);
            },
            updateOTRStatus: function(state) {
                switch (state) {
                  case OTR.CONST.STATUS_AKE_SUCCESS:
                    if (this.otr.msgstate === OTR.CONST.MSGSTATE_ENCRYPTED) {
                        this.save({
                            otr_status: UNVERIFIED
                        });
                    }
                    break;

                  case OTR.CONST.STATUS_END_OTR:
                    if (this.otr.msgstate === OTR.CONST.MSGSTATE_FINISHED) {
                        this.save({
                            otr_status: FINISHED
                        });
                    } else if (this.otr.msgstate === OTR.CONST.MSGSTATE_PLAINTEXT) {
                        this.save({
                            otr_status: UNENCRYPTED
                        });
                    }
                    break;
                }
            },
            onSMP: function(type, data) {
                switch (type) {
                  case "question":
                    this.otr.smpSecret(prompt(__("Authentication request from %1$s\n\nYour buddy is attempting to verify your identity, by asking you the question below.\n\n%2$s", [ this.get("fullname"), data ])));
                    break;

                  case "trust":
                    if (data === true) {
                        this.save({
                            otr_status: VERIFIED
                        });
                    } else {
                        this.trigger("showHelpMessages", [ __("Could not verify this user's identify.") ], "error");
                        this.save({
                            otr_status: UNVERIFIED
                        });
                    }
                    break;

                  default:
                    throw new Error("Unknown type.");
                }
            },
            initiateOTR: function(query_msg) {
                this.save({
                    otr_status: UNENCRYPTED
                });
                var session = this.getSession($.proxy(function(session) {
                    this.otr = new OTR({
                        fragment_size: 140,
                        send_interval: 200,
                        priv: session.key,
                        instance_tag: session.instance_tag,
                        debug: this.debug
                    });
                    this.otr.on("status", $.proxy(this.updateOTRStatus, this));
                    this.otr.on("smp", $.proxy(this.onSMP, this));
                    this.otr.on("ui", $.proxy(function(msg) {
                        this.trigger("showReceivedOTRMessage", msg);
                    }, this));
                    this.otr.on("io", $.proxy(function(msg) {
                        this.trigger("sendMessageStanza", msg);
                    }, this));
                    this.otr.on("error", $.proxy(function(msg) {
                        this.trigger("showOTRError", msg);
                    }, this));
                    this.trigger("showHelpMessages", [ __("Exchanging private key with buddy.") ]);
                    if (query_msg) {
                        this.otr.receiveMsg(query_msg);
                    } else {
                        this.otr.sendQueryMsg();
                    }
                }, this));
            },
            endOTR: function() {
                if (this.otr) {
                    this.otr.endOtr();
                }
                this.save({
                    otr_status: UNENCRYPTED
                });
            },
            createMessage: function(message) {
                var $message = $(message), body = $message.children("body").text(), from = Strophe.getBareJidFromJid($message.attr("from")), composing = $message.find("composing"), delayed = $message.find("delay").length > 0, fullname = this.get("fullname"), stamp, time, sender;
                fullname = (_.isEmpty(fullname) ? from : fullname).split(" ")[0];
                if (!body) {
                    if (composing.length) {
                        this.messages.add({
                            fullname: fullname,
                            sender: "them",
                            delayed: delayed,
                            time: converse.toISOString(new Date()),
                            composing: composing.length
                        });
                    }
                } else {
                    if (delayed) {
                        stamp = $message.find("delay").attr("stamp");
                        time = stamp;
                    } else {
                        time = converse.toISOString(new Date());
                    }
                    if (from == converse.bare_jid) {
                        sender = "me";
                    } else {
                        sender = "them";
                    }
                    this.messages.create({
                        fullname: fullname,
                        sender: sender,
                        delayed: delayed,
                        time: time,
                        message: body
                    });
                }
            },
            receiveMessage: function(message) {
                var $body = $(message).children("body");
                var text = $body.length > 0 ? $body.text() : undefined;
                if (!text || !converse.allow_otr) {
                    return this.createMessage(message);
                }
                if (text.match(/^\?OTRv23?/)) {
                    this.initiateOTR(text);
                } else {
                    if (_.contains([ UNVERIFIED, VERIFIED ], this.get("otr_status"))) {
                        this.otr.receiveMsg(text);
                    } else {
                        if (text.match(/^\?OTR/)) {
                            if (!this.otr) {
                                this.initiateOTR(text);
                            } else {
                                this.otr.receiveMsg(text);
                            }
                        } else {
                            this.createMessage(message);
                        }
                    }
                }
            }
        });
        this.ChatBoxView = Backbone.View.extend({
            length: 200,
            tagName: "div",
            className: "chatbox",
            is_chatroom: false,
            events: {
                "click .close-chatbox-button": "closeChat",
                "keypress textarea.chat-textarea": "keyPressed",
                "click .toggle-smiley": "toggleEmoticonMenu",
                "click .toggle-smiley ul li": "insertEmoticon",
                "click .toggle-otr": "toggleOTRMenu",
                "click .start-otr": "startOTRFromToolbar",
                "click .end-otr": "endOTR",
                "click .auth-otr": "authOTR",
                "click .toggle-call": "toggleCall"
            },
            template: _.template('<div class="chat-head chat-head-chatbox">' + '<a class="close-chatbox-button icon-close"></a>' + '<a href="{{url}}" target="_blank" class="user">' + '<div class="chat-title"> {{ fullname }} </div>' + "</a>" + '<p class="user-custom-message"><p/>' + "</div>" + '<div class="chat-content"></div>' + '<form class="sendXMPPMessage" action="" method="post">' + "{[ if (" + converse.show_toolbar + ") { ]}" + '<ul class="chat-toolbar no-text-select"></ul>' + "{[ } ]}" + "<textarea " + 'type="text" ' + 'class="chat-textarea" ' + 'placeholder="' + __("Personal message") + '"/>' + "</form>"),
            toolbar_template: _.template("{[ if (show_emoticons)  { ]}" + '<li class="toggle-smiley icon-happy" title="Insert a smilery">' + "<ul>" + '<li><a class="icon-smiley" href="#" data-emoticon=":)"></a></li>' + '<li><a class="icon-wink" href="#" data-emoticon=";)"></a></li>' + '<li><a class="icon-grin" href="#" data-emoticon=":D"></a></li>' + '<li><a class="icon-tongue" href="#" data-emoticon=":P"></a></li>' + '<li><a class="icon-cool" href="#" data-emoticon="8)"></a></li>' + '<li><a class="icon-evil" href="#" data-emoticon=">:)"></a></li>' + '<li><a class="icon-confused" href="#" data-emoticon=":S"></a></li>' + '<li><a class="icon-wondering" href="#" data-emoticon=":\\"></a></li>' + '<li><a class="icon-angry" href="#" data-emoticon=">:("></a></li>' + '<li><a class="icon-sad" href="#" data-emoticon=":("></a></li>' + '<li><a class="icon-shocked" href="#" data-emoticon=":O"></a></li>' + '<li><a class="icon-thumbs-up" href="#" data-emoticon="(^.^)b"></a></li>' + '<li><a class="icon-heart" href="#" data-emoticon="<3"></a></li>' + "</ul>" + "</li>" + "{[ } ]}" + "{[ if (" + converse.show_call_button + ")  { ]}" + '<li><a class="toggle-call icon-phone" title="Start a call"></a></li>' + "{[ } ]}" + "{[ if (allow_otr)  { ]}" + '<li class="toggle-otr {{otr_status_class}}" title="{{otr_tooltip}}">' + '<span class="chat-toolbar-text">{{otr_translated_status}}</span>' + '{[ if (otr_status == "' + UNENCRYPTED + '") { ]}' + '<span class="icon-unlocked"></span>' + "{[ } ]}" + '{[ if (otr_status == "' + UNVERIFIED + '") { ]}' + '<span class="icon-lock"></span>' + "{[ } ]}" + '{[ if (otr_status == "' + VERIFIED + '") { ]}' + '<span class="icon-lock"></span>' + "{[ } ]}" + '{[ if (otr_status == "' + FINISHED + '") { ]}' + '<span class="icon-unlocked"></span>' + "{[ } ]}" + "<ul>" + '{[ if (otr_status == "' + UNENCRYPTED + '") { ]}' + '<li><a class="start-otr" href="#">' + __("Start encrypted conversation") + "</a></li>" + "{[ } ]}" + '{[ if (otr_status != "' + UNENCRYPTED + '") { ]}' + '<li><a class="start-otr" href="#">' + __("Refresh encrypted conversation") + "</a></li>" + '<li><a class="end-otr" href="#">' + __("End encrypted conversation") + "</a></li>" + '<li><a class="auth-otr" data-scheme="smp" href="#">' + __("Verify with SMP") + "</a></li>" + "{[ } ]}" + '{[ if (otr_status == "' + UNVERIFIED + '") { ]}' + '<li><a class="auth-otr" data-scheme="fingerprint" href="#">' + __("Verify with fingerprints") + "</a></li>" + "{[ } ]}" + '<li><a href="http://www.cypherpunks.ca/otr/help/3.2.0/levels.php" target="_blank">' + __("What's this?") + "</a></li>" + "</ul>" + "</li>" + "{[ } ]}"),
            message_template: _.template('<div class="chat-message {{extra_classes}}">' + '<span class="chat-message-{{sender}}">{{time}} {{username}}:&nbsp;</span>' + '<span class="chat-message-content">{{message}}</span>' + "</div>"),
            action_template: _.template('<div class="chat-message {{extra_classes}}">' + '<span class="chat-message-{{sender}}">{{time}} **{{username}} </span>' + '<span class="chat-message-content">{{message}}</span>' + "</div>"),
            new_day_template: _.template('<time class="chat-date" datetime="{{isodate}}">{{datestring}}</time>'),
            initialize: function() {
                this.model.messages.on("add", this.onMessageAdded, this);
                this.model.on("show", this.show, this);
                this.model.on("destroy", this.hide, this);
                this.model.on("change", this.onChange, this);
                this.model.on("showOTRError", this.showOTRError, this);
                this.model.on("buddyStartsOTR", this.buddyStartsOTR, this);
                this.model.on("showHelpMessages", this.showHelpMessages, this);
                this.model.on("sendMessageStanza", this.sendMessageStanza, this);
                this.model.on("showSentOTRMessage", function(text) {
                    this.showMessage({
                        message: text,
                        sender: "me"
                    });
                }, this);
                this.model.on("showReceivedOTRMessage", function(text) {
                    this.showMessage({
                        message: text,
                        sender: "them"
                    });
                }, this);
                this.updateVCard();
                this.$el.appendTo(converse.chatboxesview.$el);
                this.render().show().model.messages.fetch({
                    add: true
                });
                if (this.model.get("status")) {
                    this.showStatusMessage(this.model.get("status"));
                }
                if (_.contains([ UNVERIFIED, VERIFIED ], this.model.get("otr_status")) || converse.use_otr_by_default) {
                    this.model.initiateOTR();
                }
            },
            render: function() {
                this.$el.attr("id", this.model.get("box_id")).html(this.template(this.model.toJSON()));
                this.renderToolbar().renderAvatar();
                return this;
            },
            showStatusNotification: function(message, replace) {
                var $chat_content = this.$el.find(".chat-content");
                $chat_content.find("div.chat-event").remove().end().append($('<div class="chat-event"></div>').text(message));
                this.scrollDown();
            },
            showMessage: function(msg_dict) {
                var $el = this.$el.find(".chat-content"), msg_date = msg_dict.time ? converse.parseISO8601(msg_dict.time) : new Date(), text = msg_dict.message, match = text.match(/^\/(.*?)(?: (.*))?$/), fullname = msg_dict.fullname || this.model.get("fullname"), template, username;
                if (match && match[1] === "me") {
                    text = text.replace(/^\/me/, "");
                    template = this.action_template;
                    username = fullname;
                } else {
                    template = this.message_template;
                    username = msg_dict.sender === "me" && __("me") || fullname;
                }
                $el.find("div.chat-event").remove();
                var message = template({
                    sender: msg_dict.sender,
                    time: msg_date.toTimeString().substring(0, 5),
                    username: username,
                    message: "",
                    extra_classes: msg_dict.delayed && "delayed" || ""
                });
                $el.append($(message).children(".chat-message-content").first().text(text).addHyperlinks().addEmoticons().parent());
                return this.scrollDown();
            },
            showHelpMessages: function(msgs, type, spinner) {
                var $chat_content = this.$el.find(".chat-content"), i, msgs_length = msgs.length;
                for (i = 0; i < msgs_length; i++) {
                    $chat_content.append($('<div class="chat-' + (type || "info") + '">' + msgs[i] + "</div>"));
                }
                if (spinner === true) {
                    $chat_content.append('<span class="spinner"/>');
                } else if (spinner === false) {
                    $chat_content.find("span.spinner").remove();
                }
                return this.scrollDown();
            },
            onMessageAdded: function(message) {
                var time = message.get("time"), times = this.model.messages.pluck("time"), this_date = converse.parseISO8601(time), previous_message, idx, prev_date, isodate, text, match;
                idx = _.indexOf(times, time) - 1;
                if (idx >= 0) {
                    previous_message = this.model.messages.at(idx);
                    prev_date = converse.parseISO8601(previous_message.get("time"));
                    isodate = new Date(this_date.getTime());
                    isodate.setUTCHours(0, 0, 0, 0);
                    isodate = converse.toISOString(isodate);
                    if (this.isDifferentDay(prev_date, this_date)) {
                        this.$el.find(".chat-content").append(this.new_day_template({
                            isodate: isodate,
                            datestring: this_date.toString().substring(0, 15)
                        }));
                    }
                }
                if (message.get("composing")) {
                    this.showStatusNotification(message.get("fullname") + " " + "is typing");
                    return;
                } else {
                    this.showMessage(_.clone(message.attributes));
                }
                if (message.get("sender") != "me" && converse.windowState == "blur") {
                    converse.incrementMsgCounter();
                }
                return this.scrollDown();
            },
            isDifferentDay: function(prev_date, next_date) {
                return next_date.getDate() != prev_date.getDate() || next_date.getFullYear() != prev_date.getFullYear() || next_date.getMonth() != prev_date.getMonth();
            },
            sendMessageStanza: function(text) {
                var timestamp = new Date().getTime();
                var bare_jid = this.model.get("jid");
                var message = $msg({
                    from: converse.connection.jid,
                    to: bare_jid,
                    type: "chat",
                    id: timestamp
                }).c("body").t(text).up().c("active", {
                    xmlns: "http://jabber.org/protocol/chatstates"
                });
                var forwarded = $msg({
                    to: converse.bare_jid,
                    type: "chat",
                    id: timestamp
                }).c("forwarded", {
                    xmlns: "urn:xmpp:forward:0"
                }).c("delay", {
                    xmns: "urn:xmpp:delay",
                    stamp: timestamp
                }).up().cnode(message.tree());
                converse.connection.send(message);
                converse.connection.send(forwarded);
            },
            sendMessage: function(text) {
                var match = text.replace(/^\s*/, "").match(/^\/(.*)\s*$/), msgs;
                if (match) {
                    if (match[1] === "clear") {
                        this.$el.find(".chat-content").empty();
                        this.model.messages.reset().localStorage._clear();
                        return;
                    } else if (match[1] === "help") {
                        msgs = [ "<strong>/help</strong>:" + __("Show this menu") + "", "<strong>/me</strong>:" + __("Write in the third person") + "", "<strong>/clear</strong>:" + __("Remove messages") + "" ];
                        this.showHelpMessages(msgs);
                        return;
                    } else if (converse.allow_otr && match[1] === "endotr") {
                        return this.endOTR();
                    } else if (converse.allow_otr && match[1] === "otr") {
                        return this.model.initiateOTR();
                    }
                }
                if (_.contains([ UNVERIFIED, VERIFIED ], this.model.get("otr_status"))) {
                    this.model.otr.sendMsg(text);
                    this.model.trigger("showSentOTRMessage", text);
                } else {
                    var fullname = converse.xmppstatus.get("fullname");
                    fullname = _.isEmpty(fullname) ? converse.bare_jid : fullname;
                    this.model.messages.create({
                        fullname: fullname,
                        sender: "me",
                        time: converse.toISOString(new Date()),
                        message: text
                    });
                    this.sendMessageStanza(text);
                }
            },
            keyPressed: function(ev) {
                var $textarea = $(ev.target), message, notify, composing;
                if (ev.keyCode == KEY.ENTER) {
                    ev.preventDefault();
                    message = $textarea.val();
                    $textarea.val("").focus();
                    if (message !== "") {
                        if (this.model.get("chatroom")) {
                            this.sendChatRoomMessage(message);
                        } else {
                            this.sendMessage(message);
                        }
                        converse.emit("onMessageSend", message);
                    }
                    this.$el.data("composing", false);
                } else if (!this.model.get("chatroom")) {
                    composing = this.$el.data("composing");
                    if (!composing) {
                        if (ev.keyCode != 47) {
                            notify = $msg({
                                to: this.model.get("jid"),
                                type: "chat"
                            }).c("composing", {
                                xmlns: "http://jabber.org/protocol/chatstates"
                            });
                            converse.connection.send(notify);
                        }
                        this.$el.data("composing", true);
                    }
                }
            },
            insertEmoticon: function(ev) {
                ev.stopPropagation();
                this.$el.find(".toggle-smiley ul").slideToggle(200);
                var $textbox = this.$el.find("textarea.chat-textarea");
                var value = $textbox.val();
                var $target = $(ev.target);
                $target = $target.is("a") ? $target : $target.children("a");
                if (value && value[value.length - 1] !== " ") {
                    value = value + " ";
                }
                $textbox.focus().val(value + $target.data("emoticon") + " ");
            },
            toggleEmoticonMenu: function(ev) {
                ev.stopPropagation();
                this.$el.find(".toggle-smiley ul").slideToggle(200);
            },
            toggleOTRMenu: function(ev) {
                ev.stopPropagation();
                this.$el.find(".toggle-otr ul").slideToggle(200);
            },
            showOTRError: function(msg) {
                if (msg == "Message cannot be sent at this time.") {
                    this.showHelpMessages([ __("Your message could not be sent") ], "error");
                } else if (msg == "Received an unencrypted message.") {
                    this.showHelpMessages([ __("We received an unencrypted message") ], "error");
                } else if (msg == "Received an unreadable encrypted message.") {
                    this.showHelpMessages([ __("We received an unreadable encrypted message") ], "error");
                } else {
                    this.showHelpMessages([ "Encryption error occured: " + msg ], "error");
                }
                console.log("OTR ERROR:" + msg);
            },
            buddyStartsOTR: function(ev) {
                this.showHelpMessages([ __("This user has requested an encrypted session.") ]);
                this.model.initiateOTR();
            },
            startOTRFromToolbar: function(ev) {
                $(ev.target).parent().parent().slideUp();
                ev.stopPropagation();
                this.model.initiateOTR();
            },
            endOTR: function(ev) {
                if (typeof ev !== "undefined") {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                this.model.endOTR();
            },
            authOTR: function(ev) {
                var scheme = $(ev.target).data().scheme;
                var result, question, answer;
                if (scheme === "fingerprint") {
                    result = confirm(__("Here are the fingerprints, please confirm them with %1$s, outside of this chat.\n\nFingerprint for you, %2$s: %3$s\n\nFingerprint for %1$s: %4$s\n\nIf you have confirmed that the fingerprints match, click OK, otherwise click Cancel.", [ this.model.get("fullname"), converse.xmppstatus.get("fullname") || converse.bare_jid, this.model.otr.priv.fingerprint(), this.model.otr.their_priv_pk.fingerprint() ]));
                    if (result === true) {
                        this.model.save({
                            otr_status: VERIFIED
                        });
                    } else {
                        this.model.save({
                            otr_status: UNVERIFIED
                        });
                    }
                } else if (scheme === "smp") {
                    alert(__("You will be prompted to provide a security question and then an answer to that question.\n\nYour buddy will then be prompted the same question and if they type the exact same answer (case sensitive), their identity will be verified."));
                    question = prompt(__("What is your security question?"));
                    if (question) {
                        answer = prompt(__("What is the answer to the security question?"));
                        this.model.otr.smpSecret(answer, question);
                    }
                } else {
                    this.showHelpMessages([ __("Invalid authentication scheme provided") ], "error");
                }
            },
            toggleCall: function(ev) {
                ev.stopPropagation();
                converse.emit("onCallButtonClicked", {
                    connection: converse.connection,
                    model: this.model
                });
            },
            onChange: function(item, changed) {
                if (_.has(item.changed, "chat_status")) {
                    var chat_status = item.get("chat_status"), fullname = item.get("fullname");
                    fullname = _.isEmpty(fullname) ? item.get("jid") : fullname;
                    if (this.$el.is(":visible")) {
                        if (chat_status === "offline") {
                            this.showStatusNotification(fullname + " " + "has gone offline");
                        } else if (chat_status === "away") {
                            this.showStatusNotification(fullname + " " + "has gone away");
                        } else if (chat_status === "dnd") {
                            this.showStatusNotification(fullname + " " + "is busy");
                        } else if (chat_status === "online") {
                            this.$el.find("div.chat-event").remove();
                        }
                    }
                    converse.emit("onBuddyStatusChanged", item.attributes, item.get("chat_status"));
                }
                if (_.has(item.changed, "status")) {
                    this.showStatusMessage(item.get("status"));
                    converse.emit("onBuddyStatusMessageChanged", item.attributes, item.get("status"));
                }
                if (_.has(item.changed, "image")) {
                    this.renderAvatar();
                }
                if (_.has(item.changed, "otr_status")) {
                    this.renderToolbar().informOTRChange();
                }
            },
            showStatusMessage: function(msg) {
                this.$el.find("p.user-custom-message").text(msg).attr("title", msg);
            },
            closeChat: function() {
                if (converse.connection) {
                    this.model.destroy();
                } else {
                    this.model.trigger("hide");
                }
            },
            updateVCard: function() {
                var jid = this.model.get("jid"), rosteritem = converse.roster.get(jid);
                if (rosteritem && !rosteritem.get("vcard_updated")) {
                    converse.getVCard(jid, $.proxy(function(jid, fullname, image, image_type, url) {
                        this.model.save({
                            fullname: fullname || jid,
                            url: url,
                            image_type: image_type,
                            image: image
                        });
                    }, this), $.proxy(function(stanza) {
                        converse.log("ChatBoxView.initialize: An error occured while fetching vcard");
                    }, this));
                }
            },
            informOTRChange: function() {
                var data = this.model.toJSON();
                var msgs = [];
                if (data.otr_status == UNENCRYPTED) {
                    msgs.push(__("Your messages are not encrypted anymore"));
                } else if (data.otr_status == UNVERIFIED) {
                    msgs.push(__("Your messages are now encrypted but your buddy's identity has not been verified."));
                } else if (data.otr_status == VERIFIED) {
                    msgs.push(__("Your buddy's identify has been verified."));
                } else if (data.otr_status == FINISHED) {
                    msgs.push(__("Your buddy has ended encryption on their end, you should do the same."));
                }
                return this.showHelpMessages(msgs, "info", false);
            },
            renderToolbar: function() {
                if (converse.show_toolbar) {
                    var data = this.model.toJSON();
                    if (data.otr_status == UNENCRYPTED) {
                        data.otr_tooltip = __("Your messages are not encrypted. Click here to enable OTR encryption.");
                    } else if (data.otr_status == UNVERIFIED) {
                        data.otr_tooltip = __("Your messages are encrypted, but your buddy has not been verified.");
                    } else if (data.otr_status == VERIFIED) {
                        data.otr_tooltip = __("Your messages are encrypted and your buddy verified.");
                    } else if (data.otr_status == FINISHED) {
                        data.otr_tooltip = __("Your buddy has closed their end of the private session, you should do the same");
                    }
                    data.allow_otr = converse.allow_otr && !this.is_chatroom;
                    data.show_emoticons = converse.show_emoticons;
                    data.otr_translated_status = OTR_TRANSLATED_MAPPING[data.otr_status];
                    data.otr_status_class = OTR_CLASS_MAPPING[data.otr_status];
                    this.$el.find(".chat-toolbar").html(this.toolbar_template(data));
                }
                return this;
            },
            renderAvatar: function() {
                if (!this.model.get("image")) {
                    return;
                }
                var img_src = "data:" + this.model.get("image_type") + ";base64," + this.model.get("image"), canvas = $('<canvas height="33px" width="33px" class="avatar"></canvas>').get(0);
                if (!(canvas.getContext && canvas.getContext("2d"))) {
                    return this;
                }
                var ctx = canvas.getContext("2d");
                var img = new Image();
                img.onload = function() {
                    var ratio = img.width / img.height;
                    ctx.drawImage(img, 0, 0, 35 * ratio, 35);
                };
                img.src = img_src;
                this.$el.find(".chat-title").before(canvas);
                return this;
            },
            focus: function() {
                this.$el.find(".chat-textarea").focus();
                return this;
            },
            hide: function() {
                if (this.$el.is(":visible") && this.$el.css("opacity") == "1") {
                    if (converse.animate) {
                        this.$el.hide("fast");
                    } else {
                        this.$el.hide();
                    }
                    converse.emit("onChatBoxClosed", this);
                }
            },
            show: function() {
                if (this.$el.is(":visible") && this.$el.css("opacity") == "1") {
                    converse.emit("onChatBoxFocused", this);
                    return this.focus();
                }
                if (converse.animate) {
                    this.$el.css({
                        opacity: 0,
                        display: "inline"
                    }).animate({
                        opacity: "1"
                    }, 200);
                } else {
                    this.$el.css({
                        opacity: 1,
                        display: "inline"
                    });
                }
                if (converse.connection) {
                    this.model.save();
                }
                converse.emit("onChatBoxOpened", this);
                return this;
            },
            scrollDown: function() {
                var $content = this.$el.find(".chat-content");
                $content.scrollTop($content[0].scrollHeight);
                return this;
            }
        });
        this.ContactsPanel = Backbone.View.extend({
            tagName: "div",
            className: "oc-chat-content",
            id: "users",
            events: {
                "click a.toggle-xmpp-contact-form": "toggleContactForm",
                "submit form.add-xmpp-contact": "addContactFromForm",
                "submit form.search-xmpp-contact": "searchContacts",
                "click a.subscribe-to-user": "addContactFromList"
            },
            tab_template: _.template('<li><a class="s current" href="#users">' + __("Contacts") + "</a></li>"),
            template: _.template('<form class="set-xmpp-status" action="" method="post">' + '<span id="xmpp-status-holder">' + '<select id="select-xmpp-status" style="display:none">' + '<option value="online">' + __("Online") + "</option>" + '<option value="dnd">' + __("Busy") + "</option>" + '<option value="away">' + __("Away") + "</option>" + '<option value="offline">' + __("Offline") + "</option>" + "</select>" + "</span>" + "</form>"),
            add_contact_dropdown_template: _.template('<dl class="add-converse-contact dropdown">' + '<dt id="xmpp-contact-search" class="fancy-dropdown">' + '<a class="toggle-xmpp-contact-form" href="#"' + 'title="' + __("Click to add new chat contacts") + '">' + '<span class="icon-plus"></span>' + __("Add a contact") + "</a>" + "</dt>" + '<dd class="search-xmpp" style="display:none"><ul></ul></dd>' + "</dl>"),
            add_contact_form_template: _.template("<li>" + '<form class="add-xmpp-contact">' + '<input type="text" name="identifier" class="username" placeholder="' + __("Contact username") + '"/>' + '<button type="submit">' + __("Add") + "</button>" + "</form>" + "<li>"),
            search_contact_template: _.template("<li>" + '<form class="search-xmpp-contact">' + '<input type="text" name="identifier" class="username" placeholder="' + __("Contact name") + '"/>' + '<button type="submit">' + __("Search") + "</button>" + "</form>" + "<li>"),
            initialize: function(cfg) {
                cfg.$parent.append(this.$el);
                this.$tabs = cfg.$parent.parent().find("#controlbox-tabs");
            },
            render: function() {
                var markup;
                var widgets = this.template();
                this.$tabs.append(this.tab_template());
                if (converse.xhr_user_search) {
                    markup = this.search_contact_template();
                } else {
                    markup = this.add_contact_form_template();
                }
                if (converse.allow_contact_requests) {
                    widgets += this.add_contact_dropdown_template();
                }
                this.$el.html(widgets);
                this.$el.find(".search-xmpp ul").append(markup);
                this.$el.append(converse.rosterview.$el);
                return this;
            },
            toggleContactForm: function(ev) {
                ev.preventDefault();
                this.$el.find(".search-xmpp").toggle("fast", function() {
                    if ($(this).is(":visible")) {
                        $(this).find("input.username").focus();
                    }
                });
            },
            searchContacts: function(ev) {
                ev.preventDefault();
                $.getJSON(xhr_user_search_url + "?q=" + $(ev.target).find("input.username").val(), function(data) {
                    var $ul = $(".search-xmpp ul");
                    $ul.find("li.found-user").remove();
                    $ul.find("li.chat-info").remove();
                    if (!data.length) {
                        $ul.append('<li class="chat-info">' + __("No users found") + "</li>");
                    }
                    $(data).each(function(idx, obj) {
                        $ul.append($('<li class="found-user"></li>').append($('<a class="subscribe-to-user" href="#" title="' + __("Click to add as a chat contact") + '"></a>').attr("data-recipient", Strophe.escapeNode(obj.id) + "@" + converse.domain).text(obj.fullname)));
                    });
                });
            },
            addContactFromForm: function(ev) {
                ev.preventDefault();
                var $input = $(ev.target).find("input");
                var jid = $input.val();
                if (!jid) {
                    $input.addClass("error");
                    return;
                }
                this.addContact(jid);
                $(".search-xmpp").hide();
            },
            addContactFromList: function(ev) {
                ev.preventDefault();
                var $target = $(ev.target), jid = $target.attr("data-recipient"), name = $target.text();
                this.addContact(jid, name);
                $target.parent().remove();
                $(".search-xmpp").hide();
            },
            addContact: function(jid, name) {
                name = _.isEmpty(name) ? jid : name;
                converse.connection.roster.add(jid, name, [], function(iq) {
                    converse.connection.roster.subscribe(jid, null, converse.xmppstatus.get("fullname"));
                });
            }
        });
        this.RoomsPanel = Backbone.View.extend({
            tagName: "div",
            id: "chatrooms",
            events: {
                "submit form.add-chatroom": "createChatRoom",
                "click input#show-rooms": "showRooms",
                "click a.open-room": "createChatRoom",
                "click a.room-info": "showRoomInfo"
            },
            room_template: _.template('<dd class="available-chatroom">' + '<a class="open-room" data-room-jid="{{jid}}"' + 'title="' + __("Click to open this room") + '" href="#">{{name}}</a>' + '<a class="room-info icon-room-info" data-room-jid="{{jid}}"' + 'title="' + __("Show more information on this room") + '" href="#">&nbsp;</a>' + "</dd>"),
            room_description_template: _.template('<div class="room-info">' + '<p class="room-info"><strong>' + __("Description:") + "</strong> {{desc}}</p>" + '<p class="room-info"><strong>' + __("Occupants:") + "</strong> {{occ}}</p>" + '<p class="room-info"><strong>' + __("Features:") + "</strong> <ul>" + "{[ if (passwordprotected) { ]}" + '<li class="room-info locked">' + __("Requires authentication") + "</li>" + "{[ } ]}" + "{[ if (hidden) { ]}" + '<li class="room-info">' + __("Hidden") + "</li>" + "{[ } ]}" + "{[ if (membersonly) { ]}" + '<li class="room-info">' + __("Requires an invitation") + "</li>" + "{[ } ]}" + "{[ if (moderated) { ]}" + '<li class="room-info">' + __("Moderated") + "</li>" + "{[ } ]}" + "{[ if (nonanonymous) { ]}" + '<li class="room-info">' + __("Non-anonymous") + "</li>" + "{[ } ]}" + "{[ if (open) { ]}" + '<li class="room-info">' + __("Open room") + "</li>" + "{[ } ]}" + "{[ if (persistent) { ]}" + '<li class="room-info">' + __("Permanent room") + "</li>" + "{[ } ]}" + "{[ if (publicroom) { ]}" + '<li class="room-info">' + __("Public") + "</li>" + "{[ } ]}" + "{[ if (semianonymous) { ]}" + '<li class="room-info">' + __("Semi-anonymous") + "</li>" + "{[ } ]}" + "{[ if (temporary) { ]}" + '<li class="room-info">' + __("Temporary room") + "</li>" + "{[ } ]}" + "{[ if (unmoderated) { ]}" + '<li class="room-info">' + __("Unmoderated") + "</li>" + "{[ } ]}" + "</p>" + "</div>"),
            tab_template: _.template('<li><a class="s" href="#chatrooms">' + __("Rooms") + "</a></li>"),
            template: _.template('<form class="add-chatroom" action="" method="post">' + '<input type="text" name="chatroom" class="new-chatroom-name" placeholder="' + __("Room name") + '"/>' + '<input type="text" name="nick" class="new-chatroom-nick" placeholder="' + __("Nickname") + '"/>' + '<input type="{{ server_input_type }}" name="server" class="new-chatroom-server" placeholder="' + __("Server") + '"/>' + '<input type="submit" name="join" value="' + __("Join") + '"/>' + '<input type="button" name="show" id="show-rooms" value="' + __("Show rooms") + '"/>' + "</form>" + '<dl id="available-chatrooms"></dl>'),
            initialize: function(cfg) {
                cfg.$parent.append(this.$el.html(this.template({
                    server_input_type: converse.hide_muc_server && "hidden" || "text"
                })).hide());
                this.$tabs = cfg.$parent.parent().find("#controlbox-tabs");
                this.on("update-rooms-list", function(ev) {
                    this.updateRoomsList();
                });
                converse.xmppstatus.on("change", $.proxy(function(model) {
                    if (!_.has(model.changed, "fullname")) {
                        return;
                    }
                    var $nick = this.$el.find("input.new-chatroom-nick");
                    if (!$nick.is(":focus")) {
                        $nick.val(model.get("fullname"));
                    }
                }, this));
            },
            render: function() {
                this.$tabs.append(this.tab_template());
                return this;
            },
            informNoRoomsFound: function() {
                var $available_chatrooms = this.$el.find("#available-chatrooms");
                $available_chatrooms.html("<dt>" + __("No rooms on %1$s", this.muc_domain) + "</dt>");
                $("input#show-rooms").show().siblings("span.spinner").remove();
            },
            updateRoomsList: function(domain) {
                converse.connection.muc.listRooms(this.muc_domain, $.proxy(function(iq) {
                    var name, jid, i, fragment, that = this, $available_chatrooms = this.$el.find("#available-chatrooms");
                    this.rooms = $(iq).find("query").find("item");
                    if (this.rooms.length) {
                        $available_chatrooms.html("<dt>" + __("Rooms on %1$s", this.muc_domain) + "</dt>");
                        fragment = document.createDocumentFragment();
                        for (i = 0; i < this.rooms.length; i++) {
                            name = Strophe.unescapeNode($(this.rooms[i]).attr("name") || $(this.rooms[i]).attr("jid"));
                            jid = $(this.rooms[i]).attr("jid");
                            fragment.appendChild($(this.room_template({
                                name: name,
                                jid: jid
                            }))[0]);
                        }
                        $available_chatrooms.append(fragment);
                        $("input#show-rooms").show().siblings("span.spinner").remove();
                    } else {
                        this.informNoRoomsFound();
                    }
                    return true;
                }, this), $.proxy(function(iq) {
                    this.informNoRoomsFound();
                }, this));
            },
            showRooms: function(ev) {
                var $available_chatrooms = this.$el.find("#available-chatrooms");
                var $server = this.$el.find("input.new-chatroom-server");
                var server = $server.val();
                if (!server) {
                    $server.addClass("error");
                    return;
                }
                this.$el.find("input.new-chatroom-name").removeClass("error");
                $server.removeClass("error");
                $available_chatrooms.empty();
                $("input#show-rooms").hide().after('<span class="spinner"/>');
                this.muc_domain = server;
                this.updateRoomsList();
            },
            showRoomInfo: function(ev) {
                var target = ev.target, $dd = $(target).parent("dd"), $div = $dd.find("div.room-info");
                if ($div.length) {
                    $div.remove();
                } else {
                    $dd.find("span.spinner").remove();
                    $dd.append('<span class="spinner hor_centered"/>');
                    converse.connection.disco.info($(target).attr("data-room-jid"), null, $.proxy(function(stanza) {
                        var $stanza = $(stanza);
                        $dd.find("span.spinner").replaceWith(this.room_description_template({
                            desc: $stanza.find('field[var="muc#roominfo_description"] value').text(),
                            occ: $stanza.find('field[var="muc#roominfo_occupants"] value').text(),
                            hidden: $stanza.find('feature[var="muc_hidden"]').length,
                            membersonly: $stanza.find('feature[var="muc_membersonly"]').length,
                            moderated: $stanza.find('feature[var="muc_moderated"]').length,
                            nonanonymous: $stanza.find('feature[var="muc_nonanonymous"]').length,
                            open: $stanza.find('feature[var="muc_open"]').length,
                            passwordprotected: $stanza.find('feature[var="muc_passwordprotected"]').length,
                            persistent: $stanza.find('feature[var="muc_persistent"]').length,
                            publicroom: $stanza.find('feature[var="muc_public"]').length,
                            semianonymous: $stanza.find('feature[var="muc_semianonymous"]').length,
                            temporary: $stanza.find('feature[var="muc_temporary"]').length,
                            unmoderated: $stanza.find('feature[var="muc_unmoderated"]').length
                        }));
                    }, this));
                }
            },
            createChatRoom: function(ev) {
                ev.preventDefault();
                var name, $name, server, $server, jid, $nick = this.$el.find("input.new-chatroom-nick"), nick = $nick.val(), chatroom;
                if (!nick) {
                    $nick.addClass("error");
                } else {
                    $nick.removeClass("error");
                }
                if (ev.type === "click") {
                    jid = $(ev.target).attr("data-room-jid");
                } else {
                    $name = this.$el.find("input.new-chatroom-name");
                    $server = this.$el.find("input.new-chatroom-server");
                    server = $server.val();
                    name = $name.val().trim().toLowerCase();
                    $name.val("");
                    if (name && server) {
                        jid = Strophe.escapeNode(name) + "@" + server;
                        $name.removeClass("error");
                        $server.removeClass("error");
                        this.muc_domain = server;
                    } else {
                        if (!name) {
                            $name.addClass("error");
                        }
                        if (!server) {
                            $server.addClass("error");
                        }
                        return;
                    }
                }
                if (!nick) {
                    return;
                }
                chatroom = converse.chatboxesview.showChatBox({
                    id: jid,
                    jid: jid,
                    name: Strophe.unescapeNode(Strophe.getNodeFromJid(jid)),
                    nick: nick,
                    chatroom: true,
                    box_id: hex_sha1(jid)
                });
                if (!chatroom.get("connected")) {
                    converse.chatboxesview.views[jid].connect(null);
                }
            }
        });
        this.ControlBoxView = converse.ChatBoxView.extend({
            tagName: "div",
            className: "chatbox",
            id: "controlbox",
            events: {
                "click a.close-chatbox-button": "closeChat",
                "click ul#controlbox-tabs li a": "switchTab"
            },
            initialize: function() {
                this.$el.appendTo(converse.chatboxesview.$el);
                this.model.on("change", $.proxy(function(item, changed) {
                    var i;
                    if (_.has(item.changed, "connected")) {
                        this.render();
                        converse.features.on("add", $.proxy(this.featureAdded, this));
                        var feature = converse.features.findWhere({
                            "var": "http://jabber.org/protocol/muc"
                        });
                        if (feature) {
                            this.featureAdded(feature);
                        }
                    }
                    if (_.has(item.changed, "visible")) {
                        if (item.changed.visible === true) {
                            this.show();
                        }
                    }
                }, this));
                this.model.on("show", this.show, this);
                this.model.on("destroy", this.hide, this);
                this.model.on("hide", this.hide, this);
                if (this.model.get("visible")) {
                    this.show();
                }
            },
            featureAdded: function(feature) {
                if (feature.get("var") == "http://jabber.org/protocol/muc" && converse.allow_muc) {
                    this.roomspanel.muc_domain = feature.get("from");
                    var $server = this.$el.find("input.new-chatroom-server");
                    if (!$server.is(":focus")) {
                        $server.val(this.roomspanel.muc_domain);
                    }
                    if (converse.auto_list_rooms) {
                        this.roomspanel.trigger("update-rooms-list");
                    }
                }
            },
            template: _.template('<div class="chat-head oc-chat-head">' + '<ul id="controlbox-tabs"></ul>' + '<a class="close-chatbox-button icon-close"></a>' + "</div>" + '<div class="controlbox-panes"></div>'),
            switchTab: function(ev) {
                ev.preventDefault();
                var $tab = $(ev.target), $sibling = $tab.parent().siblings("li").children("a"), $tab_panel = $($tab.attr("href")), $sibling_panel = $($sibling.attr("href"));
                $sibling_panel.fadeOut("fast", function() {
                    $sibling.removeClass("current");
                    $tab.addClass("current");
                    $tab_panel.fadeIn("fast", function() {});
                });
            },
            showHelpMessages: function(msgs) {
                return;
            },
            render: function() {
                if (!converse.prebind && !converse.connection) {
                    this.$el.html(this.template(this.model.toJSON()));
                    this.loginpanel = new converse.LoginPanel({
                        $parent: this.$el.find(".controlbox-panes"),
                        model: this
                    });
                    this.loginpanel.render();
                } else if (!this.contactspanel) {
                    this.$el.html(this.template(this.model.toJSON()));
                    this.contactspanel = new converse.ContactsPanel({
                        $parent: this.$el.find(".controlbox-panes")
                    });
                    this.contactspanel.render();
                    converse.xmppstatusview = new converse.XMPPStatusView({
                        model: converse.xmppstatus
                    });
                    converse.xmppstatusview.render();
                    if (converse.allow_muc) {
                        this.roomspanel = new converse.RoomsPanel({
                            $parent: this.$el.find(".controlbox-panes")
                        });
                        this.roomspanel.render();
                    }
                }
                return this;
            }
        });
        this.ChatRoomView = converse.ChatBoxView.extend({
            length: 300,
            tagName: "div",
            className: "chatroom",
            events: {
                "click a.close-chatbox-button": "closeChat",
                "click a.configure-chatroom-button": "configureChatRoom",
                "click .toggle-smiley": "toggleEmoticonMenu",
                "click .toggle-smiley ul li": "insertEmoticon",
                "keypress textarea.chat-textarea": "keyPressed"
            },
            info_template: _.template('<div class="chat-info">{{message}}</div>'),
            is_chatroom: true,
            sendChatRoomMessage: function(body) {
                var match = body.replace(/^\s*/, "").match(/^\/(.*?)(?: (.*))?$/) || [ false ], $chat_content;
                switch (match[1]) {
                  case "msg":
                    break;

                  case "clear":
                    this.$el.find(".chat-content").empty();
                    break;

                  case "topic":
                    converse.connection.muc.setTopic(this.model.get("jid"), match[2]);
                    break;

                  case "kick":
                    converse.connection.muc.kick(this.model.get("jid"), match[2]);
                    break;

                  case "ban":
                    converse.connection.muc.ban(this.model.get("jid"), match[2]);
                    break;

                  case "op":
                    converse.connection.muc.op(this.model.get("jid"), match[2]);
                    break;

                  case "deop":
                    converse.connection.muc.deop(this.model.get("jid"), match[2]);
                    break;

                  case "help":
                    $chat_content = this.$el.find(".chat-content");
                    msgs = [ "<strong>/help</strong>:" + __("Show this menu") + "", "<strong>/me</strong>:" + __("Write in the third person") + "", "<strong>/topic</strong>:" + __("Set chatroom topic") + "", "<strong>/kick</strong>:" + __("Kick user from chatroom") + "", "<strong>/ban</strong>:" + __("Ban user from chatroom") + "", "<strong>/clear</strong>:" + __("Remove messages") + "" ];
                    this.showHelpMessages(msgs);
                    break;

                  default:
                    this.last_msgid = converse.connection.muc.groupchat(this.model.get("jid"), body);
                    break;
                }
            },
            template: _.template('<div class="chat-head chat-head-chatroom">' + '<a class="close-chatbox-button icon-close"></a>' + '<a class="configure-chatroom-button icon-wrench" style="display:none"></a>' + '<div class="chat-title"> {{ name }} </div>' + '<p class="chatroom-topic"><p/>' + "</div>" + '<div class="chat-body">' + '<span class="spinner centered"/>' + "</div>"),
            chatarea_template: _.template('<div class="chat-area">' + '<div class="chat-content"></div>' + '<form class="sendXMPPMessage" action="" method="post">' + "{[ if (" + converse.show_toolbar + ") { ]}" + '<ul class="chat-toolbar no-text-select"></ul>' + "{[ } ]}" + '<textarea type="text" class="chat-textarea" ' + 'placeholder="' + __("Message") + '"/>' + "</form>" + "</div>" + '<div class="participants">' + '<ul class="participant-list"></ul>' + "</div>"),
            render: function() {
                this.$el.attr("id", this.model.get("box_id")).html(this.template(this.model.toJSON()));
                return this;
            },
            renderChatArea: function() {
                if (!this.$el.find(".chat-area").length) {
                    this.$el.find(".chat-body").empty().append(this.chatarea_template());
                    this.renderToolbar();
                }
                return this;
            },
            connect: function(password) {
                if (_.has(converse.connection.muc.rooms, this.model.get("jid"))) {
                    converse.connection.muc.join(this.model.get("jid"), this.model.get("nick"), null, null, null, password);
                } else {
                    converse.connection.muc.join(this.model.get("jid"), this.model.get("nick"), $.proxy(this.onChatRoomMessage, this), $.proxy(this.onChatRoomPresence, this), $.proxy(this.onChatRoomRoster, this), password);
                }
            },
            initialize: function() {
                this.connect(null);
                this.model.messages.on("add", this.onMessageAdded, this);
                this.model.on("destroy", function(model, response, options) {
                    this.hide();
                    converse.connection.muc.leave(this.model.get("jid"), this.model.get("nick"), $.proxy(this.onLeave, this), undefined);
                }, this);
                this.$el.appendTo(converse.chatboxesview.$el);
                this.render().show().model.messages.fetch({
                    add: true
                });
            },
            onLeave: function() {
                this.model.set("connected", false);
            },
            form_input_template: _.template('<label>{{label}}<input name="{{name}}" type="{{type}}" value="{{value}}"></label>'),
            select_option_template: _.template('<option value="{{value}}">{{label}}</option>'),
            form_select_template: _.template('<label>{{label}}<select name="{{name}}">{{options}}</select></label>'),
            form_checkbox_template: _.template('<label>{{label}}<input name="{{name}}" type="{{type}}" {{checked}}"></label>'),
            renderConfigurationForm: function(stanza) {
                var $form = this.$el.find("form.chatroom-form"), $stanza = $(stanza), $fields = $stanza.find("field"), title = $stanza.find("title").text(), instructions = $stanza.find("instructions").text(), i, j, options = [];
                var input_types = {
                    "text-private": "password",
                    "text-single": "textline",
                    "boolean": "checkbox",
                    hidden: "hidden",
                    "list-single": "dropdown"
                };
                $form.find("span.spinner").remove();
                $form.append($("<legend>").text(title));
                if (instructions != title) {
                    $form.append($("<p>").text(instructions));
                }
                for (i = 0; i < $fields.length; i++) {
                    $field = $($fields[i]);
                    if ($field.attr("type") == "list-single") {
                        options = [];
                        $options = $field.find("option");
                        for (j = 0; j < $options.length; j++) {
                            options.push(this.select_option_template({
                                value: $($options[j]).find("value").text(),
                                label: $($options[j]).attr("label")
                            }));
                        }
                        $form.append(this.form_select_template({
                            name: $field.attr("var"),
                            label: $field.attr("label"),
                            options: options.join("")
                        }));
                    } else if ($field.attr("type") == "boolean") {
                        $form.append(this.form_checkbox_template({
                            name: $field.attr("var"),
                            type: input_types[$field.attr("type")],
                            label: $field.attr("label") || "",
                            checked: $field.find("value").text() === "1" && 'checked="1"' || ""
                        }));
                    } else {
                        $form.append(this.form_input_template({
                            name: $field.attr("var"),
                            type: input_types[$field.attr("type")],
                            label: $field.attr("label") || "",
                            value: $field.find("value").text()
                        }));
                    }
                }
                $form.append('<input type="submit" value="' + __("Save") + '"/>');
                $form.append('<input type="button" value="' + __("Cancel") + '"/>');
                $form.on("submit", $.proxy(this.saveConfiguration, this));
                $form.find("input[type=button]").on("click", $.proxy(this.cancelConfiguration, this));
            },
            field_template: _.template('<field var="{{name}}"><value>{{value}}</value></field>'),
            saveConfiguration: function(ev) {
                ev.preventDefault();
                var that = this;
                var $inputs = $(ev.target).find(":input:not([type=button]):not([type=submit])"), count = $inputs.length, configArray = [];
                $inputs.each(function() {
                    var $input = $(this), value;
                    if ($input.is("[type=checkbox]")) {
                        value = $input.is(":checked") && 1 || 0;
                    } else {
                        value = $input.val();
                    }
                    var cnode = $(that.field_template({
                        name: $input.attr("name"),
                        value: value
                    }))[0];
                    configArray.push(cnode);
                    if (!--count) {
                        converse.connection.muc.saveConfiguration(that.model.get("jid"), configArray, $.proxy(that.onConfigSaved, that), $.proxy(that.onErrorConfigSaved, that));
                    }
                });
                this.$el.find("div.chatroom-form-container").hide(function() {
                    $(this).remove();
                    that.$el.find(".chat-area").show();
                    that.$el.find(".participants").show();
                });
            },
            onConfigSaved: function(stanza) {},
            onErrorConfigSaved: function(stanza) {
                this.showStatusNotification(__("An error occurred while trying to save the form."));
            },
            cancelConfiguration: function(ev) {
                ev.preventDefault();
                var that = this;
                this.$el.find("div.chatroom-form-container").hide(function() {
                    $(this).remove();
                    that.$el.find(".chat-area").show();
                    that.$el.find(".participants").show();
                });
            },
            configureChatRoom: function(ev) {
                ev.preventDefault();
                if (this.$el.find("div.chatroom-form-container").length) {
                    return;
                }
                this.$el.find(".chat-area").hide();
                this.$el.find(".participants").hide();
                this.$el.find(".chat-body").append($('<div class="chatroom-form-container">' + '<form class="chatroom-form">' + '<span class="spinner centered"/>' + "</form>" + "</div>"));
                converse.connection.muc.configure(this.model.get("jid"), $.proxy(this.renderConfigurationForm, this));
            },
            submitPassword: function(ev) {
                ev.preventDefault();
                var password = this.$el.find(".chatroom-form").find("input[type=password]").val();
                this.$el.find(".chatroom-form-container").replaceWith('<span class="spinner centered"/>');
                this.connect(password);
            },
            renderPasswordForm: function() {
                this.$el.find("span.centered.spinner").remove();
                this.$el.find(".chat-body").append($('<div class="chatroom-form-container">' + '<form class="chatroom-form">' + "<legend>" + __("This chatroom requires a password") + "</legend>" + "<label>" + __("Password: ") + '<input type="password" name="password"/></label>' + '<input type="submit" value="' + __("Submit") + "/>" + "</form>" + "</div>"));
                this.$el.find(".chatroom-form").on("submit", $.proxy(this.submitPassword, this));
            },
            showDisconnectMessage: function(msg) {
                this.$el.find(".chat-area").remove();
                this.$el.find(".participants").remove();
                this.$el.find("span.centered.spinner").remove();
                this.$el.find(".chat-body").append($("<p>" + msg + "</p>"));
            },
            infoMessages: {
                100: __("This room is not anonymous"),
                102: __("This room now shows unavailable members"),
                103: __("This room does not show unavailable members"),
                104: __("Non-privacy-related room configuration has changed"),
                170: __("Room logging is now enabled"),
                171: __("Room logging is now disabled"),
                172: __("This room is now non-anonymous"),
                173: __("This room is now semi-anonymous"),
                174: __("This room is now fully-anonymous"),
                201: __("A new room has been created"),
                210: __("Your nickname has been changed")
            },
            actionInfoMessages: {
                301: ___("<strong>%1$s</strong> has been banned"),
                307: ___("<strong>%1$s</strong> has been kicked out"),
                321: ___("<strong>%1$s</strong> has been removed because of an affiliation change"),
                322: ___("<strong>%1$s</strong> has been removed for not being a member")
            },
            disconnectMessages: {
                301: __("You have been banned from this room"),
                307: __("You have been kicked from this room"),
                321: __("You have been removed from this room because of an affiliation change"),
                322: __("You have been removed from this room because the room has changed to members-only and you're not a member"),
                332: __("You have been removed from this room because the MUC (Multi-user chat) service is being shut down.")
            },
            showStatusMessages: function($el, is_self) {
                var $chat_content = this.$el.find(".chat-content"), $stats = $el.find("status"), disconnect_msgs = [], info_msgs = [], action_msgs = [], msgs, i;
                for (i = 0; i < $stats.length; i++) {
                    var stat = $stats[i].getAttribute("code");
                    if (is_self) {
                        if (_.contains(_.keys(this.disconnectMessages), stat)) {
                            disconnect_msgs.push(this.disconnectMessages[stat]);
                        }
                    } else {
                        if (_.contains(_.keys(this.infoMessages), stat)) {
                            info_msgs.push(this.infoMessages[stat]);
                        } else if (_.contains(_.keys(this.actionInfoMessages), stat)) {
                            action_msgs.push(__(this.actionInfoMessages[stat], Strophe.unescapeNode(Strophe.getResourceFromJid($el.attr("from")))));
                        }
                    }
                }
                if (disconnect_msgs.length > 0) {
                    for (i = 0; i < disconnect_msgs.length; i++) {
                        this.showDisconnectMessage(disconnect_msgs[i]);
                    }
                    this.model.set("connected", false);
                    return;
                }
                this.renderChatArea();
                for (i = 0; i < info_msgs.length; i++) {
                    $chat_content.append(this.info_template({
                        message: info_msgs[i]
                    }));
                }
                for (i = 0; i < action_msgs.length; i++) {
                    $chat_content.append(this.info_template({
                        message: action_msgs[i]
                    }));
                }
                return this.scrollDown();
            },
            showErrorMessage: function($error, room) {
                delete converse.connection.muc[room.name];
                if ($error.attr("type") == "auth") {
                    if ($error.find("not-authorized").length) {
                        this.renderPasswordForm();
                    } else if ($error.find("registration-required").length) {
                        this.showDisconnectMessage(__("You are not on the member list of this room"));
                    } else if ($error.find("forbidden").length) {
                        this.showDisconnectMessage(__("You have been banned from this room"));
                    }
                } else if ($error.attr("type") == "modify") {
                    if ($error.find("jid-malformed").length) {
                        this.showDisconnectMessage(__("No nickname was specified"));
                    }
                } else if ($error.attr("type") == "cancel") {
                    if ($error.find("not-allowed").length) {
                        this.showDisconnectMessage(__("You are not allowed to create new rooms"));
                    } else if ($error.find("not-acceptable").length) {
                        this.showDisconnectMessage(__("Your nickname doesn't conform to this room's policies"));
                    } else if ($error.find("conflict").length) {
                        this.showDisconnectMessage(__("Your nickname is already taken"));
                    } else if ($error.find("item-not-found").length) {
                        this.showDisconnectMessage(__("This room does not (yet) exist"));
                    } else if ($error.find("service-unavailable").length) {
                        this.showDisconnectMessage(__("This room has reached it's maximum number of occupants"));
                    }
                }
            },
            onChatRoomPresence: function(presence, room) {
                var nick = room.nick, $presence = $(presence), from = $presence.attr("from"), is_self = $presence.find("status[code='110']").length || from == room.name + "/" + Strophe.escapeNode(nick), $item;
                if ($presence.attr("type") === "error") {
                    this.model.set("connected", false);
                    this.showErrorMessage($presence.find("error"), room);
                } else {
                    this.model.set("connected", true);
                    this.showStatusMessages($presence, is_self);
                    if (!this.model.get("connected")) {
                        return true;
                    }
                    if ($presence.find("status[code='201']").length) {
                        converse.connection.muc.createInstantRoom(room.name);
                    }
                    if (is_self) {
                        $item = $presence.find("item");
                        if ($item.length) {
                            if ($item.attr("affiliation") == "owner") {
                                this.$el.find("a.configure-chatroom-button").show();
                            }
                        }
                        if ($presence.find("status[code='210']").length) {
                            this.model.set({
                                nick: Strophe.getResourceFromJid(from)
                            });
                        }
                    }
                }
                return true;
            },
            onChatRoomMessage: function(message) {
                var $message = $(message), body = $message.children("body").text(), jid = $message.attr("from"), $chat_content = this.$el.find(".chat-content"), resource = Strophe.getResourceFromJid(jid), sender = resource && Strophe.unescapeNode(resource) || "", delayed = $message.find("delay").length > 0, subject = $message.children("subject").text(), match, template, message_datetime, message_date, dates, isodate, stamp;
                if (delayed) {
                    stamp = $message.find("delay").attr("stamp");
                    message_datetime = converse.parseISO8601(stamp);
                } else {
                    message_datetime = new Date();
                }
                dates = $chat_content.find("time").map(function() {
                    return $(this).attr("datetime");
                }).get();
                message_date = new Date(message_datetime.getTime());
                message_date.setUTCHours(0, 0, 0, 0);
                isodate = converse.toISOString(message_date);
                if (_.indexOf(dates, isodate) == -1) {
                    $chat_content.append(this.new_day_template({
                        isodate: isodate,
                        datestring: message_date.toString().substring(0, 15)
                    }));
                }
                this.showStatusMessages($message);
                if (subject) {
                    this.$el.find(".chatroom-topic").text(subject).attr("title", subject);
                    $chat_content.append(this.info_template({
                        message: __("Topic set by %1$s to: %2$s", sender, subject)
                    }));
                }
                if (!body) {
                    return true;
                }
                var display_sender = sender === this.model.get("nick") && "me" || "room";
                this.showMessage({
                    message: body,
                    sender: display_sender,
                    fullname: sender,
                    time: converse.toISOString(message_datetime)
                });
                if (display_sender === "room") {
                    converse.emit("onMessage", message);
                }
                return true;
            },
            occupant_template: _.template('<li class="{{role}}" ' + '{[ if (role === "moderator") { ]}' + 'title="' + __("This user is a moderator") + '"' + "{[ } ]}" + '{[ if (role === "participant") { ]}' + 'title="' + __("This user can send messages in this room") + '"' + "{[ } ]}" + '{[ if (role === "visitor") { ]}' + 'title="' + __("This user can NOT send messages in this room") + '"' + "{[ } ]}" + ">{{nick}}</li>"),
            onChatRoomRoster: function(roster, room) {
                this.renderChatArea();
                var controlboxview = converse.chatboxesview.views.controlbox, roster_size = _.size(roster), $participant_list = this.$el.find(".participant-list"), participants = [], keys = _.keys(roster), i;
                this.$el.find(".participant-list").empty();
                for (i = 0; i < roster_size; i++) {
                    participants.push(this.occupant_template({
                        role: roster[keys[i]].role,
                        nick: Strophe.unescapeNode(keys[i])
                    }));
                }
                $participant_list.append(participants.join(""));
                return true;
            }
        });
        this.ChatBoxes = Backbone.Collection.extend({
            model: converse.ChatBox,
            registerMessageHandler: function() {
                converse.connection.addHandler($.proxy(function(message) {
                    this.onMessage(message);
                    return true;
                }, this), null, "message", "chat");
            },
            onConnected: function() {
                this.localStorage = new Backbone.LocalStorage(hex_sha1("converse.chatboxes-" + converse.bare_jid));
                if (!this.get("controlbox")) {
                    this.add({
                        id: "controlbox",
                        box_id: "controlbox"
                    });
                } else {
                    this.get("controlbox").save();
                }
                this.get("controlbox").set({
                    connected: true
                });
                this.registerMessageHandler();
                this.fetch({
                    add: true,
                    success: $.proxy(function(collection, resp) {
                        if (_.include(_.pluck(resp, "id"), "controlbox")) {
                            this.get("controlbox").set({
                                visible: true
                            }).save();
                        }
                    }, this)
                });
            },
            onMessage: function(message) {
                var buddy_jid, $message = $(message), message_from = $message.attr("from");
                if (message_from == converse.connection.jid) {
                    return true;
                }
                var $forwarded = $message.children("forwarded");
                if ($forwarded.length) {
                    $message = $forwarded.children("message");
                }
                var from = Strophe.getBareJidFromJid(message_from), to = Strophe.getBareJidFromJid($message.attr("to")), resource, chatbox, roster_item;
                if (from == converse.bare_jid) {
                    buddy_jid = to;
                    resource = Strophe.getResourceFromJid($message.attr("to"));
                } else {
                    buddy_jid = from;
                    resource = Strophe.getResourceFromJid(message_from);
                }
                chatbox = this.get(buddy_jid);
                roster_item = converse.roster.get(buddy_jid);
                if (roster_item === undefined) {
                    converse.log("Could not get roster item for JID " + buddy_jid, "error");
                    return true;
                }
                if (!chatbox) {
                    var fullname = roster_item.get("fullname");
                    fullname = _.isEmpty(fullname) ? buddy_jid : fullname;
                    chatbox = this.create({
                        id: buddy_jid,
                        jid: buddy_jid,
                        fullname: fullname,
                        image_type: roster_item.get("image_type"),
                        image: roster_item.get("image"),
                        url: roster_item.get("url")
                    });
                }
                chatbox.receiveMessage(message);
                converse.roster.addResource(buddy_jid, resource);
                converse.emit("onMessage", message);
                return true;
            }
        });
        this.ChatBoxesView = Backbone.View.extend({
            el: "#conversejs",
            initialize: function() {
                this.views = {};
                this.model.on("add", function(item) {
                    var view = this.views[item.get("id")];
                    if (!view) {
                        if (item.get("chatroom")) {
                            view = new converse.ChatRoomView({
                                model: item
                            });
                        } else if (item.get("box_id") === "controlbox") {
                            view = new converse.ControlBoxView({
                                model: item
                            });
                            view.render();
                        } else {
                            view = new converse.ChatBoxView({
                                model: item
                            });
                        }
                        this.views[item.get("id")] = view;
                    } else {
                        delete view.model;
                        view.model = item;
                        view.initialize();
                        if (item.get("id") !== "controlbox") {
                            view.$el.appendTo(this.$el);
                        }
                    }
                }, this);
            },
            showChatBox: function(attrs) {
                var chatbox = this.model.get(attrs.jid);
                if (chatbox) {
                    chatbox.trigger("show");
                } else {
                    chatbox = this.model.create(attrs, {
                        error: function(model, response) {
                            converse.log(response.responseText);
                        }
                    });
                }
                return chatbox;
            }
        });
        this.RosterItem = Backbone.Model.extend({
            initialize: function(attributes, options) {
                var jid = attributes.jid;
                if (!attributes.fullname) {
                    attributes.fullname = jid;
                }
                var attrs = _.extend({
                    id: jid,
                    user_id: Strophe.getNodeFromJid(jid),
                    resources: [],
                    status: ""
                }, attributes);
                attrs.sorted = false;
                attrs.chat_status = "offline";
                this.set(attrs);
            }
        });
        this.RosterItemView = Backbone.View.extend({
            tagName: "dd",
            events: {
                "click .accept-xmpp-request": "acceptRequest",
                "click .decline-xmpp-request": "declineRequest",
                "click .open-chat": "openChat",
                "click .remove-xmpp-contact": "removeContact"
            },
            openChat: function(ev) {
                ev.preventDefault();
                converse.chatboxesview.showChatBox({
                    id: this.model.get("jid"),
                    jid: this.model.get("jid"),
                    fullname: this.model.get("fullname"),
                    image_type: this.model.get("image_type"),
                    image: this.model.get("image"),
                    url: this.model.get("url"),
                    status: this.model.get("status")
                });
            },
            removeContact: function(ev) {
                ev.preventDefault();
                var result = confirm("Are you sure you want to remove this contact?");
                if (result === true) {
                    var bare_jid = this.model.get("jid");
                    converse.connection.roster.remove(bare_jid, function(iq) {
                        converse.connection.roster.unauthorize(bare_jid);
                        converse.rosterview.model.remove(bare_jid);
                    });
                }
            },
            acceptRequest: function(ev) {
                var jid = this.model.get("jid");
                converse.connection.roster.authorize(jid);
                converse.connection.roster.add(jid, this.model.get("fullname"), [], function(iq) {
                    converse.connection.roster.subscribe(jid, null, converse.xmppstatus.get("fullname"));
                });
                ev.preventDefault();
            },
            declineRequest: function(ev) {
                ev.preventDefault();
                converse.connection.roster.unauthorize(this.model.get("jid"));
                this.model.destroy();
            },
            template: _.template('<a class="open-chat" title="' + __("Click to chat with this contact") + '" href="#">' + '<span class="icon-{{ chat_status }}" title="{{ status_desc }}"></span>{{ fullname }}' + "</a>" + '<a class="remove-xmpp-contact icon-remove" title="' + __("Click to remove this contact") + '" href="#"></a>'),
            pending_template: _.template("<span>{{ fullname }}</span>" + '<a class="remove-xmpp-contact icon-remove" title="' + __("Click to remove this contact") + '" href="#"></a>'),
            request_template: _.template("<div>{{ fullname }}</div>" + '<button type="button" class="accept-xmpp-request">' + "Accept</button>" + '<button type="button" class="decline-xmpp-request">' + "Decline</button>" + ""),
            render: function() {
                var item = this.model, ask = item.get("ask"), requesting = item.get("requesting"), subscription = item.get("subscription");
                var classes_to_remove = [ "current-xmpp-contact", "pending-xmpp-contact", "requesting-xmpp-contact" ].concat(_.keys(STATUSES));
                _.each(classes_to_remove, function(cls) {
                    if (this.el.className.indexOf(cls) !== -1) {
                        this.$el.removeClass(cls);
                    }
                }, this);
                this.$el.addClass(item.get("chat_status"));
                if (ask === "subscribe") {
                    this.$el.addClass("pending-xmpp-contact");
                    this.$el.html(this.pending_template(item.toJSON()));
                } else if (requesting === true) {
                    this.$el.addClass("requesting-xmpp-contact");
                    this.$el.html(this.request_template(item.toJSON()));
                    converse.controlboxtoggle.showControlBox();
                } else if (subscription === "both" || subscription === "to") {
                    this.$el.addClass("current-xmpp-contact");
                    this.$el.html(this.template(_.extend(item.toJSON(), {
                        status_desc: STATUSES[item.get("chat_status") || "offline"]
                    })));
                }
                return this;
            }
        });
        this.RosterItems = Backbone.Collection.extend({
            model: converse.RosterItem,
            comparator: function(rosteritem) {
                var chat_status = rosteritem.get("chat_status"), rank = 4;
                switch (chat_status) {
                  case "offline":
                    rank = 0;
                    break;

                  case "unavailable":
                    rank = 1;
                    break;

                  case "xa":
                    rank = 2;
                    break;

                  case "away":
                    rank = 3;
                    break;

                  case "dnd":
                    rank = 4;
                    break;

                  case "online":
                    rank = 5;
                    break;
                }
                return rank;
            },
            subscribeToSuggestedItems: function(msg) {
                $(msg).find("item").each(function() {
                    var $this = $(this), jid = $this.attr("jid"), action = $this.attr("action"), fullname = $this.attr("name");
                    if (action === "add") {
                        converse.connection.roster.add(jid, fullname, [], function(iq) {
                            converse.connection.roster.subscribe(jid, null, converse.xmppstatus.get("fullname"));
                        });
                    }
                });
                return true;
            },
            isSelf: function(jid) {
                return Strophe.getBareJidFromJid(jid) === Strophe.getBareJidFromJid(converse.connection.jid);
            },
            addResource: function(bare_jid, resource) {
                var item = this.get(bare_jid), resources;
                if (item) {
                    resources = item.get("resources");
                    if (resources) {
                        if (_.indexOf(resources, resource) == -1) {
                            resources.push(resource);
                            item.set({
                                resources: resources
                            });
                        }
                    } else {
                        item.set({
                            resources: [ resource ]
                        });
                    }
                }
            },
            removeResource: function(bare_jid, resource) {
                var item = this.get(bare_jid), resources, idx;
                if (item) {
                    resources = item.get("resources");
                    idx = _.indexOf(resources, resource);
                    if (idx !== -1) {
                        resources.splice(idx, 1);
                        item.set({
                            resources: resources
                        });
                        return resources.length;
                    }
                }
                return 0;
            },
            subscribeBack: function(jid) {
                var bare_jid = Strophe.getBareJidFromJid(jid);
                if (converse.connection.roster.findItem(bare_jid)) {
                    converse.connection.roster.authorize(bare_jid);
                    converse.connection.roster.subscribe(jid, null, converse.xmppstatus.get("fullname"));
                } else {
                    converse.connection.roster.add(jid, "", [], function(iq) {
                        converse.connection.roster.authorize(bare_jid);
                        converse.connection.roster.subscribe(jid, null, converse.xmppstatus.get("fullname"));
                    });
                }
            },
            unsubscribe: function(jid) {
                converse.xmppstatus.sendPresence("unsubscribe");
                if (converse.connection.roster.findItem(jid)) {
                    converse.connection.roster.remove(jid, function(iq) {
                        converse.rosterview.model.remove(jid);
                    });
                }
            },
            getNumOnlineContacts: function() {
                var count = 0, ignored = [ "offline", "unavailable" ], models = this.models, models_length = models.length, i;
                if (converse.show_only_online_users) {
                    ignored = _.union(ignored, [ "dnd", "xa", "away" ]);
                }
                for (i = 0; i < models_length; i++) {
                    if (_.indexOf(ignored, models[i].get("chat_status")) === -1) {
                        count++;
                    }
                }
                return count;
            },
            cleanCache: function(items) {
                var id, i, roster_ids = [];
                for (i = 0; i < items.length; ++i) {
                    roster_ids.push(items[i].jid);
                }
                for (i = 0; i < this.models.length; ++i) {
                    id = this.models[i].get("id");
                    if (_.indexOf(roster_ids, id) === -1) {
                        this.get(id).destroy();
                    }
                }
            },
            rosterHandler: function(items) {
                converse.emit("onRoster", items);
                this.cleanCache(items);
                _.each(items, function(item, index, items) {
                    if (this.isSelf(item.jid)) {
                        return;
                    }
                    var model = this.get(item.jid);
                    if (!model) {
                        var is_last = index === items.length - 1 ? true : false;
                        if (item.subscription === "none" && item.ask === null && !is_last) {
                            return;
                        }
                        this.create({
                            jid: item.jid,
                            subscription: item.subscription,
                            ask: item.ask,
                            fullname: item.name || item.jid,
                            is_last: is_last
                        });
                    } else {
                        if (item.subscription === "none" && item.ask === null) {
                            model.destroy();
                        } else if (model.get("subscription") !== item.subscription || model.get("ask") !== item.ask) {
                            model.set({
                                subscription: item.subscription,
                                ask: item.ask,
                                requesting: null
                            });
                            model.save();
                        }
                    }
                }, this);
                if (!converse.initial_presence_sent) {
                    converse.initial_presence_sent = 1;
                    converse.xmppstatus.sendPresence();
                }
            },
            handleIncomingSubscription: function(jid) {
                var bare_jid = Strophe.getBareJidFromJid(jid);
                var item = this.get(bare_jid);
                if (!converse.allow_contact_requests) {
                    converse.connection.roster.unauthorize(bare_jid);
                    return true;
                }
                if (converse.auto_subscribe) {
                    if (!item || item.get("subscription") != "to") {
                        this.subscribeBack(jid);
                    } else {
                        converse.connection.roster.authorize(bare_jid);
                    }
                } else {
                    if (item && item.get("subscription") != "none") {
                        converse.connection.roster.authorize(bare_jid);
                    } else {
                        if (!this.get(bare_jid)) {
                            converse.getVCard(bare_jid, $.proxy(function(jid, fullname, img, img_type, url) {
                                this.add({
                                    jid: bare_jid,
                                    subscription: "none",
                                    ask: null,
                                    requesting: true,
                                    fullname: fullname,
                                    image: img,
                                    image_type: img_type,
                                    url: url,
                                    vcard_updated: converse.toISOString(new Date()),
                                    is_last: true
                                });
                            }, this), $.proxy(function(jid, fullname, img, img_type, url) {
                                converse.log("Error while retrieving vcard");
                                this.add({
                                    jid: bare_jid,
                                    subscription: "none",
                                    ask: null,
                                    requesting: true,
                                    fullname: jid,
                                    is_last: true
                                });
                            }, this));
                        } else {
                            return true;
                        }
                    }
                }
                return true;
            },
            presenceHandler: function(presence) {
                var $presence = $(presence), presence_type = $presence.attr("type");
                if (presence_type === "error") {
                    return true;
                }
                var jid = $presence.attr("from"), bare_jid = Strophe.getBareJidFromJid(jid), resource = Strophe.getResourceFromJid(jid), $show = $presence.find("show"), chat_status = $show.text() || "online", status_message = $presence.find("status"), item;
                if (this.isSelf(bare_jid)) {
                    if (converse.connection.jid !== jid && presence_type !== "unavailable") {
                        converse.xmppstatus.save({
                            status: chat_status
                        });
                    }
                    return true;
                } else if (($presence.find("x").attr("xmlns") || "").indexOf(Strophe.NS.MUC) === 0) {
                    return true;
                }
                item = this.get(bare_jid);
                if (item && status_message.text() != item.get("status")) {
                    item.save({
                        status: status_message.text()
                    });
                }
                if (presence_type === "subscribed" || presence_type === "unsubscribe") {
                    return true;
                } else if (presence_type === "subscribe") {
                    return this.handleIncomingSubscription(jid);
                } else if (presence_type === "unsubscribed") {
                    this.unsubscribe(bare_jid);
                } else if (presence_type === "unavailable") {
                    if (this.removeResource(bare_jid, resource) === 0) {
                        if (item) {
                            item.set({
                                chat_status: "offline"
                            });
                        }
                    }
                } else if (item) {
                    this.addResource(bare_jid, resource);
                    item.set({
                        chat_status: chat_status
                    });
                }
                return true;
            }
        });
        this.RosterView = Backbone.View.extend({
            tagName: "dl",
            id: "converse-roster",
            rosteritemviews: {},
            requesting_contacts_template: _.template('<dt id="xmpp-contact-requests">' + __("Contact requests") + "</dt>"),
            contacts_template: _.template('<dt id="xmpp-contacts">' + __("My contacts") + "</dt>"),
            pending_contacts_template: _.template('<dt id="pending-xmpp-contacts">' + __("Pending contacts") + "</dt>"),
            initialize: function() {
                this.model.on("add", function(item) {
                    this.addRosterItemView(item).render(item);
                    if (!item.get("vcard_updated")) {
                        converse.getVCard(item.get("jid"));
                    }
                }, this);
                this.model.on("change", function(item) {
                    if (_.size(item.changed) === 1 && _.contains(_.keys(item.changed), "sorted")) {
                        return;
                    }
                    this.updateChatBox(item).render(item);
                }, this);
                this.model.on("remove", function(item) {
                    this.removeRosterItemView(item);
                }, this);
                this.model.on("destroy", function(item) {
                    this.removeRosterItemView(item);
                }, this);
                var roster_markup = this.contacts_template();
                if (converse.allow_contact_requests) {
                    roster_markup = this.requesting_contacts_template() + roster_markup + this.pending_contacts_template();
                }
                this.$el.hide().html(roster_markup);
                this.model.fetch({
                    add: true
                });
            },
            updateChatBox: function(item, changed) {
                var chatbox = converse.chatboxes.get(item.get("jid")), changes = {};
                if (!chatbox) {
                    return this;
                }
                if (_.has(item.changed, "chat_status")) {
                    changes.chat_status = item.get("chat_status");
                }
                if (_.has(item.changed, "status")) {
                    changes.status = item.get("status");
                }
                chatbox.save(changes);
                return this;
            },
            addRosterItemView: function(item) {
                var view = new converse.RosterItemView({
                    model: item
                });
                this.rosteritemviews[item.id] = view;
                return this;
            },
            removeRosterItemView: function(item) {
                var view = this.rosteritemviews[item.id];
                if (view) {
                    view.$el.remove();
                    delete this.rosteritemviews[item.id];
                    this.render();
                }
                return this;
            },
            renderRosterItem: function(item, view) {
                if (converse.show_only_online_users && item.get("chat_status") !== "online") {
                    view.$el.remove();
                    view.delegateEvents();
                    return this;
                }
                if ($.contains(document.documentElement, view.el)) {
                    view.render();
                } else {
                    this.$el.find("#xmpp-contacts").after(view.render().el);
                }
            },
            render: function(item) {
                var $my_contacts = this.$el.find("#xmpp-contacts"), $contact_requests = this.$el.find("#xmpp-contact-requests"), $pending_contacts = this.$el.find("#pending-xmpp-contacts"), sorted = false, $count, changed_presence;
                if (item) {
                    var jid = item.id, view = this.rosteritemviews[item.id], ask = item.get("ask"), subscription = item.get("subscription"), requesting = item.get("requesting"), crit = {
                        order: "asc"
                    };
                    if (ask === "subscribe" && subscription == "none") {
                        $pending_contacts.after(view.render().el);
                        $pending_contacts.after($pending_contacts.siblings("dd.pending-xmpp-contact").tsort(crit));
                    } else if (ask === "subscribe" && subscription == "from") {
                        $pending_contacts.after(view.render().el);
                        $pending_contacts.after($pending_contacts.siblings("dd.pending-xmpp-contact").tsort(crit));
                    } else if (requesting === true) {
                        $contact_requests.after(view.render().el);
                        $contact_requests.after($contact_requests.siblings("dd.requesting-xmpp-contact").tsort(crit));
                    } else if (subscription === "both" || subscription === "to") {
                        this.renderRosterItem(item, view);
                    }
                    changed_presence = item.changed.chat_status;
                    if (changed_presence) {
                        this.sortRoster(changed_presence);
                        sorted = true;
                    }
                    if (item.get("is_last")) {
                        if (!sorted) {
                            this.sortRoster(item.get("chat_status"));
                        }
                        if (!this.$el.is(":visible")) {
                            this.$el.show();
                        }
                    }
                }
                _.each([ $my_contacts, $contact_requests, $pending_contacts ], function(h) {
                    if (h.nextUntil("dt").length) {
                        if (!h.is(":visible")) {
                            h.show();
                        }
                    } else if (h.is(":visible")) {
                        h.hide();
                    }
                });
                $count = $("#online-count");
                $count.text("(" + this.model.getNumOnlineContacts() + ")");
                if (!$count.is(":visible")) {
                    $count.show();
                }
                converse.emit("onRosterViewUpdated");
                return this;
            },
            sortRoster: function(chat_status) {
                var $my_contacts = this.$el.find("#xmpp-contacts");
                $my_contacts.siblings("dd.current-xmpp-contact." + chat_status).tsort("a", {
                    order: "asc"
                });
                $my_contacts.after($my_contacts.siblings("dd.current-xmpp-contact.offline"));
                $my_contacts.after($my_contacts.siblings("dd.current-xmpp-contact.unavailable"));
                $my_contacts.after($my_contacts.siblings("dd.current-xmpp-contact.xa"));
                $my_contacts.after($my_contacts.siblings("dd.current-xmpp-contact.away"));
                $my_contacts.after($my_contacts.siblings("dd.current-xmpp-contact.dnd"));
                $my_contacts.after($my_contacts.siblings("dd.current-xmpp-contact.online"));
            }
        });
        this.XMPPStatus = Backbone.Model.extend({
            initialize: function() {
                this.set({
                    status: this.get("status") || "online"
                });
                this.on("change", $.proxy(function(item) {
                    if (this.get("fullname") === undefined) {
                        converse.getVCard(null, $.proxy(function(jid, fullname, image, image_type, url) {
                            this.save({
                                fullname: fullname
                            });
                        }, this));
                    }
                    if (_.has(item.changed, "status")) {
                        converse.emit("onStatusChanged", this.get("status"));
                    }
                    if (_.has(item.changed, "status_message")) {
                        converse.emit("onStatusMessageChanged", this.get("status_message"));
                    }
                }, this));
            },
            sendPresence: function(type) {
                if (type === undefined) {
                    type = this.get("status") || "online";
                }
                var status_message = this.get("status_message"), presence;
                if (type === "unavailable" || type === "probe" || type === "error" || type === "unsubscribe" || type === "unsubscribed" || type === "subscribe" || type === "subscribed") {
                    presence = $pres({
                        type: type
                    });
                } else {
                    if (type === "online") {
                        presence = $pres();
                    } else {
                        presence = $pres().c("show").t(type).up();
                    }
                    if (status_message) {
                        presence.c("status").t(status_message);
                    }
                }
                converse.connection.send(presence);
            },
            setStatus: function(value) {
                this.sendPresence(value);
                this.save({
                    status: value
                });
            },
            setStatusMessage: function(status_message) {
                converse.connection.send($pres().c("show").t(this.get("status")).up().c("status").t(status_message));
                this.save({
                    status_message: status_message
                });
                if (this.xhr_custom_status) {
                    $.ajax({
                        url: this.xhr_custom_status_url,
                        type: "POST",
                        data: {
                            msg: status_message
                        }
                    });
                }
            }
        });
        this.XMPPStatusView = Backbone.View.extend({
            el: "span#xmpp-status-holder",
            events: {
                "click a.choose-xmpp-status": "toggleOptions",
                "click #fancy-xmpp-status-select a.change-xmpp-status-message": "renderStatusChangeForm",
                "submit #set-custom-xmpp-status": "setStatusMessage",
                "click .dropdown dd ul li a": "setStatus"
            },
            toggleOptions: function(ev) {
                ev.preventDefault();
                $(ev.target).parent().parent().siblings("dd").find("ul").toggle("fast");
            },
            change_status_message_template: _.template('<form id="set-custom-xmpp-status">' + '<input type="text" class="custom-xmpp-status" {{ status_message }}"' + 'placeholder="' + __("Custom status") + '"/>' + '<button type="submit">' + __("Save") + "</button>" + "</form>"),
            status_template: _.template('<div class="xmpp-status">' + '<a class="choose-xmpp-status {{ chat_status }}" data-value="{{status_message}}" href="#" title="' + __("Click to change your chat status") + '">' + '<span class="icon-{{ chat_status }}"></span>' + "{{ status_message }}" + "</a>" + '<a class="change-xmpp-status-message icon-pencil" href="#" title="' + __("Click here to write a custom status message") + '"></a>' + "</div>"),
            renderStatusChangeForm: function(ev) {
                ev.preventDefault();
                var status_message = this.model.get("status") || "offline";
                var input = this.change_status_message_template({
                    status_message: status_message
                });
                this.$el.find(".xmpp-status").replaceWith(input);
                this.$el.find(".custom-xmpp-status").focus().focus();
            },
            setStatusMessage: function(ev) {
                ev.preventDefault();
                var status_message = $(ev.target).find("input").val();
                if (status_message === "") {}
                this.model.setStatusMessage(status_message);
            },
            setStatus: function(ev) {
                ev.preventDefault();
                var $el = $(ev.target), value = $el.attr("data-value");
                this.model.setStatus(value);
                this.$el.find(".dropdown dd ul").hide();
            },
            getPrettyStatus: function(stat) {
                if (stat === "chat") {
                    pretty_status = __("online");
                } else if (stat === "dnd") {
                    pretty_status = __("busy");
                } else if (stat === "xa") {
                    pretty_status = __("away for long");
                } else if (stat === "away") {
                    pretty_status = __("away");
                } else {
                    pretty_status = __(stat) || __("online");
                }
                return pretty_status;
            },
            updateStatusUI: function(model) {
                if (!_.has(model.changed, "status") && !_.has(model.changed, "status_message")) {
                    return;
                }
                var stat = model.get("status");
                var status_message = model.get("status_message") || __("I am %1$s", this.getPrettyStatus(stat));
                this.$el.find("#fancy-xmpp-status-select").html(this.status_template({
                    chat_status: stat,
                    status_message: status_message
                }));
            },
            choose_template: _.template('<dl id="target" class="dropdown">' + '<dt id="fancy-xmpp-status-select" class="fancy-dropdown"></dt>' + '<dd><ul class="xmpp-status-menu"></ul></dd>' + "</dl>"),
            option_template: _.template("<li>" + '<a href="#" class="{{ value }}" data-value="{{ value }}">' + '<span class="icon-{{ value }}"></span>' + "{{ text }}" + "</a>" + "</li>"),
            initialize: function() {
                this.model.on("change", this.updateStatusUI, this);
            },
            render: function() {
                var $select = this.$el.find("select#select-xmpp-status"), chat_status = this.model.get("status") || "offline", options = $("option", $select), $options_target, options_list = [], that = this;
                this.$el.html(this.choose_template());
                this.$el.find("#fancy-xmpp-status-select").html(this.status_template({
                    status_message: this.model.get("status_message") || __("I am %1$s", this.getPrettyStatus(chat_status)),
                    chat_status: chat_status
                }));
                options.each(function() {
                    options_list.push(that.option_template({
                        value: $(this).val(),
                        text: this.text
                    }));
                });
                $options_target = this.$el.find("#target dd ul").hide();
                $options_target.append(options_list.join(""));
                $select.remove();
                return this;
            }
        });
        this.Feature = Backbone.Model.extend();
        this.Features = Backbone.Collection.extend({
            model: converse.Feature,
            initialize: function() {
                this.localStorage = new Backbone.LocalStorage(hex_sha1("converse.features" + converse.bare_jid));
                if (this.localStorage.records.length === 0) {
                    converse.connection.disco.info(converse.domain, null, $.proxy(this.onInfo, this));
                    converse.connection.disco.items(converse.domain, null, $.proxy(this.onItems, this));
                } else {
                    this.fetch({
                        add: true
                    });
                }
            },
            onItems: function(stanza) {
                $(stanza).find("query item").each($.proxy(function(idx, item) {
                    converse.connection.disco.info($(item).attr("jid"), null, $.proxy(this.onInfo, this));
                }, this));
            },
            onInfo: function(stanza) {
                var $stanza = $(stanza);
                if ($stanza.find("identity[category=server][type=im]").length === 0 && $stanza.find("identity[category=conference][type=text]").length === 0) {
                    return;
                }
                $stanza.find("feature").each($.proxy(function(idx, feature) {
                    this.create({
                        "var": $(feature).attr("var"),
                        from: $stanza.attr("from")
                    });
                }, this));
            }
        });
        this.LoginPanel = Backbone.View.extend({
            tagName: "div",
            id: "login-dialog",
            events: {
                "submit form#converse-login": "authenticate"
            },
            tab_template: _.template('<li><a class="current" href="#login">' + __("Sign in") + "</a></li>"),
            template: _.template('<form id="converse-login">' + "<label>" + __("XMPP/Jabber Username:") + "</label>" + '<input type="username" name="jid">' + "<label>" + __("Password:") + "</label>" + '<input type="password" name="password">' + '<input class="login-submit" type="submit" value="' + __("Log In") + '">' + '</form">'),
            bosh_url_input: _.template("<label>" + __("BOSH Service URL:") + "</label>" + '<input type="text" id="bosh_service_url">'),
            connect: function($form, jid, password) {
                if ($form) {
                    $form.find("input[type=submit]").hide().after('<span class="spinner login-submit"/>');
                }
                converse.connection = new Strophe.Connection(converse.bosh_service_url);
                converse.connection.connect(jid, password, converse.onConnect);
            },
            showLoginButton: function() {
                var $form = this.$el.find("#converse-login");
                var $button = $form.find("input[type=submit]");
                if ($button.length) {
                    $button.show().siblings("span").remove();
                }
            },
            initialize: function(cfg) {
                cfg.$parent.html(this.$el.html(this.template()));
                this.$tabs = cfg.$parent.parent().find("#controlbox-tabs");
            },
            render: function() {
                this.$tabs.append(this.tab_template());
                this.$el.find("input#jid").focus();
                return this;
            },
            authenticate: function(ev) {
                var $form = $(ev.target), $jid_input = $form.find("input[name=jid]"), jid = $jid_input.val(), $pw_input = $form.find("input[name=password]"), password = $pw_input.val(), $bsu_input = null, errors = false;
                if (!converse.bosh_service_url) {
                    $bsu_input = $form.find("input#bosh_service_url");
                    converse.bosh_service_url = $bsu_input.val();
                    if (!converse.bosh_service_url) {
                        errors = true;
                        $bsu_input.addClass("error");
                    }
                }
                if (!jid) {
                    errors = true;
                    $jid_input.addClass("error");
                }
                if (!password) {
                    errors = true;
                    $pw_input.addClass("error");
                }
                if (errors) {
                    return;
                }
                this.connect($form, jid, password);
                return false;
            },
            remove: function() {
                this.$tabs.empty();
                this.$el.parent().empty();
            }
        });
        this.ControlBoxToggle = Backbone.View.extend({
            tagName: "a",
            className: "toggle-online-users",
            id: "toggle-controlbox",
            events: {
                click: "onClick"
            },
            attributes: {
                href: "#"
            },
            template: _.template('<strong class="conn-feedback">Toggle chat</strong>' + '<strong style="display: none" id="online-count">(0)</strong>'),
            initialize: function() {
                this.render();
            },
            render: function() {
                $("#conversejs").append(this.$el.html(this.template()));
                return this;
            },
            showControlBox: function() {
                var controlbox = converse.chatboxes.get("controlbox");
                if (!controlbox) {
                    converse.chatboxes.add({
                        id: "controlbox",
                        box_id: "controlbox",
                        visible: true
                    });
                    if (converse.connection) {
                        converse.chatboxes.get("controlbox").save();
                    }
                } else {
                    controlbox.trigger("show");
                }
            },
            onClick: function(e) {
                e.preventDefault();
                if ($("div#controlbox").is(":visible")) {
                    var controlbox = converse.chatboxes.get("controlbox");
                    if (converse.connection) {
                        controlbox.destroy();
                    } else {
                        controlbox.trigger("hide");
                    }
                } else {
                    this.showControlBox();
                }
            }
        });
        this.chatboxes = new this.ChatBoxes();
        this.chatboxesview = new this.ChatBoxesView({
            model: this.chatboxes
        });
        this.controlboxtoggle = new this.ControlBoxToggle();
        this.otr = new this.OTR();
        if (this.prebind && !this.connection) {
            if (!this.jid || !this.sid || !this.rid || !this.bosh_service_url) {
                this.log("If you set prebind=true, you MUST supply JID, RID and SID values");
                return;
            }
            this.connection = new Strophe.Connection(this.bosh_service_url);
            this.connection.attach(this.jid, this.sid, this.rid, this.onConnect);
        } else if (this.connection) {
            this.onConnected();
        }
        if (this.show_controlbox_by_default) {
            this.controlboxtoggle.showControlBox();
        }
        converse.emit("onInitialized");
    };
    return {
        initialize: function(settings, callback) {
            converse.initialize(settings, callback);
        },
        setStatus: function(type) {
            if (converse.xmppstatus) {
                converse.xmppstatus.setStatus(type);
            }
        },
        getStatus: function() {
            if (converse.xmppstatus && converse.xmppstatus.attributes) {
                return converse.xmppstatus.attributes.status;
            }
            return null;
        },
        getRID: function() {
            if (converse.expose_rid_and_sid && typeof converse.connection !== "undefined") {
                return converse.connection.rid;
            }
            return null;
        },
        getSID: function() {
            if (converse.expose_rid_and_sid && typeof converse.connection !== "undefined") {
                return converse.connection.sid;
            }
            return null;
        },
        once: function(evt, handler) {
            converse.once(evt, handler);
        },
        on: function(evt, handler) {
            converse.on(evt, handler);
        },
        off: function(evt, handler) {
            converse.off(evt, handler);
        }
    };
});

(function($) {
    var as = $.ajaxSettings;
    $.xhr = {
        r: {
            xhr: as.xhr
        },
        register: function(name, fn) {
            this.r[name] = fn;
        }
    };
    as.transport = "xhr";
    as.xhr = function() {
        return $.xhr.r[this.transport](this);
    };
})(jQuery);