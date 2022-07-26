"use strict";

function _interopDefault(e) {
    return e && "object" == typeof e && "default" in e ? e.default : e
}

function index(e) {
    const i = e.types;
    return {
        inherits: syntaxJsx,
        visitor: {
            Program(e) {
                e.traverse({
                    JSXAttribute(e) {
                        const n = parseVModel(i, e);
                        if (n) {
                            const {
                                modifiers: modifiers,
                                valuePath: valuePath
                            } = n, t = e.parentPath;
                            transformModel(i, t, valuePath, modifiers), e.remove()
                        }
                    }
                })
            }
        }
    }
}
var camelCase = _interopDefault(require("camelcase")),
    syntaxJsx = _interopDefault(require("@babel/plugin-syntax-jsx")),
    htmlTags = _interopDefault(require("html-tags")),
    svgTags = _interopDefault(require("svg-tags"));
const RANGE_TOKEN = "__r",
    cachedCamelCase = (() => {
        const e = Object.create(null);
        return i => {
            e[i] || (e[i] = camelCase(i));
            return e[i]
        }
    })(),
    equalCamel = (e, i) => e === i || e === cachedCamelCase(i),
    startsWithCamel = (e, i) => e.startsWith(i) || e.startsWith(cachedCamelCase(i)),
    parseVModel = (e, i) => {
        if (e.isJSXNamespacedName(i.get("name")) || !startsWithCamel(i.get("name.name").node, "v-model")) return null;
        if (!e.isJSXExpressionContainer(i.get("value"))) throw new Error("You have to use JSX Expression inside your v-model");
        const n = i.get("name.name").node.split("_");
        n.shift();
        return {
            modifiers: new Set(n),
            valuePath: i.get("value.expression")
        }
    },
    transformModel = (e, i, n, t) => {
        if (isComponent(e, i)) return genComponentModel(e, i, n, t);
        const r = getTagName(e, i);
        const s = getType(e, i);
        if ("select" === r) genSelect(e, i, n, t);
        else if ("input" === r && "checkbox" === s) genCheckboxModel(e, i, n, t);
        else if ("input" === r && "radio" === s) genRadioModel(e, i, n, t);
        else {
            if ("input" !== r && "textarea" !== r) throw new Error(`vModel: ${r}[type=${s}] is not supported`);
            genDefaultModel(e, i, n, t, s)
        }
        addModel(e, i, n, t)
    },
    isComponent = (e, i) => {
        const n = i.get("name");
        if (e.isJSXMemberExpression(n)) return !0;
        const t = n.get("name").node;
        return !htmlTags.includes(t) && !svgTags.includes(t)
    },
    getTagName = (e, i) => i.get("name.name").node,
    getType = (e, i) => {
        const n = i.get("attributes").find(i => e.isJSXAttribute(i) && e.isJSXIdentifier(i.get("name")) && "type" === i.get("name.name").node && e.isStringLiteral(i.get("value")));
        return n ? n.get("value.value").node : ""
    },
    addHandler = (e, i, n, t) => {
        addProp(e, i, `on-${n}`, e.arrowFunctionExpression([e.identifier("$event")], e.blockStatement(t)), !0)
    },
    addProp = (e, i, n, t, r = !1) => {
        i.node.attributes[r ? "unshift" : "push"](e.jSXAttribute(e.jSXIdentifier(n), e.jSXExpressionContainer(t)))
    },
    genAssignmentCode = (e, i, n) => {
        let t;
        return false && e.isMemberExpression(i) && !e.isThisExpression(t = i.get("object").node) ? e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("$set")), [t, i.node.computed ? i.get("property").node : e.stringLiteral(i.get("property.name").node), n]) : e.assignmentExpression("=", i.node, n)
    },
    getBindingAttr = (e, i, n) => {
        const t = i.get("attributes").find(i => e.isJSXAttribute(i) && e.isJSXIdentifier(i.get("name")) && equalCamel(i.get("name.name").node, n));
        if (t) {
            const i = e.isJSXExpressionContainer(t.get("value")) ? t.get("value.expression").node : t.get("value").node;
            return t.remove(), i
        }
        return null
    },
    genComponentModel = (e, i, n, t) => {
        const r = e.identifier("$$v");
        let s = r;
        t.has("trim") && (s = e.conditionalExpression(e.binaryExpression("===", e.unaryExpression("typeof", r), e.stringLiteral("string")), e.callExpression(e.memberExpression(r, e.identifier("trim")), []), r));
        t.has("number") && (s = e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_n")), [s]));
        const o = genAssignmentCode(e, n, s);
        i.node.attributes.push(e.jSXAttribute(e.jSXIdentifier("model"), e.jSXExpressionContainer(e.objectExpression([e.objectProperty(e.identifier("value"), n.node), e.objectProperty(e.identifier("callback"), e.arrowFunctionExpression([e.identifier("$$v")], e.blockStatement([e.expressionStatement(o)])))]))))
    },
    genSelect = (e, i, n, t) => {
        const r = t.has("number");
        const s = e.conditionalExpression(e.binaryExpression("in", e.stringLiteral("_value"), e.identifier("o")), e.memberExpression(e.identifier("o"), e.identifier("_value")), e.memberExpression(e.identifier("o"), e.identifier("value")));
        const o = e.callExpression(e.memberExpression(e.callExpression(e.memberExpression(e.memberExpression(e.memberExpression(e.identifier("Array"), e.identifier("prototype")), e.identifier("filter")), e.identifier("call")), [e.memberExpression(e.memberExpression(e.identifier("$event"), e.identifier("target")), e.identifier("options")), e.arrowFunctionExpression([e.identifier("o")], e.memberExpression(e.identifier("o"), e.identifier("selected")))]), e.identifier("map")), [e.arrowFunctionExpression([e.identifier("o")], r ? e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_n")), [s]) : s)]);
        const a = e.conditionalExpression(e.memberExpression(e.memberExpression(e.identifier("$event"), e.identifier("target")), e.identifier("multiple")), e.identifier("$$selectedVal"), e.memberExpression(e.identifier("$$selectedVal"), e.numericLiteral(0), !0));
        const d = e.variableDeclaration("const", [e.variableDeclarator(e.identifier("$$selectedVal"), o)]);
        addHandler(e, i, "change", [d, e.expressionStatement(genAssignmentCode(e, n, a))])
    },
    genCheckboxModel = (e, i, n, t) => {
        const r = n.node;
        const s = t.has("number");
        const o = getBindingAttr(e, i, "value") || e.nullLiteral();
        const a = getBindingAttr(e, i, "true-value") || e.booleanLiteral(!0);
        const d = getBindingAttr(e, i, "false-value") || e.booleanLiteral(!1);
        addProp(e, i, "domProps-checked", e.conditionalExpression(e.callExpression(e.memberExpression(e.identifier("Array"), e.identifier("isArray")), [r]), e.binaryExpression(">", e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_i")), [r, o]), e.unaryExpression("-", e.numericLiteral(1))), e.isBooleanLiteral(a) && a.value ? r : e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_q")), [r, a])));
        addHandler(e, i, "change", [e.variableDeclaration("const", [e.variableDeclarator(e.identifier("$$a"), r), e.variableDeclarator(e.identifier("$$el"), e.memberExpression(e.identifier("$event"), e.identifier("target"))), e.variableDeclarator(e.identifier("$$c"), e.conditionalExpression(e.memberExpression(e.identifier("$$el"), e.identifier("checked")), a, d))]), e.ifStatement(e.callExpression(e.memberExpression(e.identifier("Array"), e.identifier("isArray")), [e.identifier("$$a")]), e.blockStatement([e.variableDeclaration("const", [e.variableDeclarator(e.identifier("$$v"), s ? e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_n")), [o]) : o), e.variableDeclarator(e.identifier("$$i"), e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_i")), [e.identifier("$$a"), e.identifier("$$v")]))]), e.ifStatement(e.memberExpression(e.identifier("$$el"), e.identifier("checked")), e.blockStatement([e.expressionStatement(e.logicalExpression("&&", e.binaryExpression("<", e.identifier("$$i"), e.numericLiteral(0)), genAssignmentCode(e, n, e.callExpression(e.memberExpression(e.identifier("$$a"), e.identifier("concat")), [e.arrayExpression([e.identifier("$$v")])]))))]), e.blockStatement([e.expressionStatement(e.logicalExpression("&&", e.binaryExpression(">", e.identifier("$$i"), e.unaryExpression("-", e.numericLiteral(1))), genAssignmentCode(e, n, e.callExpression(e.memberExpression(e.callExpression(e.memberExpression(e.identifier("$$a"), e.identifier("slice")), [e.numericLiteral(0), e.identifier("$$i")]), e.identifier("concat")), [e.callExpression(e.memberExpression(e.identifier("$$a"), e.identifier("slice")), [e.binaryExpression("+", e.identifier("$$i"), e.numericLiteral(1))])]))))]))]), e.blockStatement([e.expressionStatement(genAssignmentCode(e, n, e.identifier("$$c")))]))])
    },
    genRadioModel = (e, i, n, t) => {
        const r = t.has("number");
        let s = getBindingAttr(e, i, "value") || e.nullLiteral();
        s = r ? e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_n")), [s]) : s;
        addProp(e, i, "domProps-checked", e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_q")), [n.node, s]));
        addHandler(e, i, "change", [e.expressionStatement(genAssignmentCode(e, n, s))])
    },
    addModel = (e, i, n, t) => {
        i.node.attributes.push(e.jSXSpreadAttribute(e.objectExpression([e.objectProperty(e.identifier("directives"), e.arrayExpression([e.objectExpression([e.objectProperty(e.identifier("name"), e.stringLiteral("model")), e.objectProperty(e.identifier("value"), n.node), e.objectProperty(e.identifier("modifiers"), e.objectExpression([...t].map(i => e.objectProperty(e.identifier(i), e.booleanLiteral(!0)))))])]))])))
    },
    genDefaultModel = (e, i, n, t, r) => {
        const s = t.has("lazy");
        const o = t.has("number");
        const a = t.has("trim");
        const d = !s && "range" !== r;
        const l = s ? "change" : "range" === r ? "__r" : "input";
        let c = e.memberExpression(e.memberExpression(e.identifier("$event"), e.identifier("target")), e.identifier("value"));
        a && (c = e.callExpression(e.memberExpression(c, e.identifier("trim")), []));
        o && (c = e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("_n")), [c]));
        let m = [e.expressionStatement(genAssignmentCode(e, n, c))];
        d && (m = [e.ifStatement(e.memberExpression(e.memberExpression(e.identifier("$event"), e.identifier("target")), e.identifier("composing")), e.returnStatement()), ...m]);
        addProp(e, i, "domProps-value", n.node);
        addHandler(e, i, l, m);
        (a || o) && addHandler(e, i, "blur", [e.expressionStatement(e.callExpression(e.memberExpression(e.thisExpression(), e.identifier("$forceUpdate")), []))])
    };
module.exports = index;