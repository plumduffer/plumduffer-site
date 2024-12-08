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
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewerOnly = void 0;
var restrictViewer = function (_a) {
    var _b;
    var user = _a.req.user;
    if (!user)
        return false;
    if ((_b = user.roles) === null || _b === void 0 ? void 0 : _b.includes("viewer"))
        return false;
    return true;
};
function viewerOnly(incomingOptions) {
    return function (incomingConfig) {
        var restrictMutationsFromViewer = function (element, _, array) {
            var _a, _b, _c, _d, _e, _f, _g;
            var _h, _j, _k, _l, _m;
            // check if this is the collections or globals
            var elementsKey = incomingConfig.collections === array
                ? "collections"
                : "globals";
            // restrict viewers from mutating all collections/globals
            (_a = element.access) !== null && _a !== void 0 ? _a : (element.access = {});
            (_b = (_h = element.access).update) !== null && _b !== void 0 ? _b : (_h.update = restrictViewer);
            if (elementsKey === "collections") {
                (_c = (_j = element.access).create) !== null && _c !== void 0 ? _c : (_j.create = restrictViewer);
                (_d = (_k = element.access).delete) !== null && _d !== void 0 ? _d : (_k.delete = restrictViewer);
            }
            // restrict viewers from accessing the admin dashboard on auth enabled collections
            if (Boolean(element.auth)) {
                (_e = (_l = element.access).admin) !== null && _e !== void 0 ? _e : (_l.admin = restrictViewer);
            }
            // if this collection/global is not to be restricted, make it readable by the public
            if (!((_f = incomingOptions === null || incomingOptions === void 0 ? void 0 : incomingOptions[elementsKey]) === null || _f === void 0 ? void 0 : _f.includes(element))) {
                (_g = (_m = element.access).read) !== null && _g !== void 0 ? _g : (_m.read = function () { return true; });
            }
            return element;
        };
        var config = __assign(__assign({}, incomingConfig), { collections: incomingConfig.collections.map(restrictMutationsFromViewer), globals: incomingConfig.globals.map(restrictMutationsFromViewer) });
        return config;
    };
}
exports.viewerOnly = viewerOnly;
