"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowLabel = void 0;
var react_1 = require("react");
function RowLabel(_a) {
    var data = _a.data;
    var link = data.link;
    var linkedPageId = (0, react_1.useMemo)(function () { var _a; return (_a = link.page) === null || _a === void 0 ? void 0 : _a.value; }, [link.page]);
    var _b = (0, react_1.useState)(""), linkedPageTitle = _b[0], setLinkedPageTitle = _b[1];
    (0, react_1.useEffect)(function () {
        if (!linkedPageId)
            return setLinkedPageTitle("");
        fetch("/api/pages/".concat(linkedPageId))
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var title = _a.title;
            return setLinkedPageTitle(title);
        });
    }, [linkedPageId]);
    if (link.type === "page")
        return link.customText || linkedPageTitle;
    if (link.type === "externalUrl")
        return link.customText || link.externalUrl;
}
exports.RowLabel = RowLabel;
function Link(_a) {
    var userDefinedProperties = __rest(_a, []);
    return __assign(__assign({ type: "group", name: "link", interfaceName: "SharedLink" }, userDefinedProperties), { fields: [
            {
                name: "type",
                type: "radio",
                defaultValue: "page",
                required: true,
                options: [
                    { label: "Page", value: "page" },
                    { label: "External URL", value: "externalUrl" },
                ],
            },
            {
                name: "page",
                type: "relationship",
                relationTo: ["pages"],
                required: true,
                admin: {
                    condition: function (_, siblingData) { return (siblingData === null || siblingData === void 0 ? void 0 : siblingData.type) === "page"; },
                },
            },
            {
                name: "externalUrl",
                type: "text",
                required: true,
                admin: {
                    condition: function (_, siblingData) {
                        return (siblingData === null || siblingData === void 0 ? void 0 : siblingData.type) === "externalUrl";
                    },
                },
            },
            {
                name: "customText",
                type: "text",
            },
        ] });
}
exports.default = Link;
