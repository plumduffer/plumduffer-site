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
function SectionComponent(block) {
    var sectionComponentTabs = __assign(__assign({}, block), { fields: [
            {
                type: "tabs",
                tabs: [
                    {
                        name: block.slug,
                        fields: block.fields,
                    },
                    {
                        name: "options",
                        fields: [],
                    },
                ],
            },
        ] });
    return sectionComponentTabs;
}
exports.default = SectionComponent;
