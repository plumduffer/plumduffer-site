"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SectionComponent_1 = __importDefault(require("./SectionComponent"));
var RichText = (0, SectionComponent_1.default)({
    slug: "richText",
    fields: [
        {
            type: "richText",
            name: "richText",
            label: false,
        },
    ],
});
exports.default = RichText;
