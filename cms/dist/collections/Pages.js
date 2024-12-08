"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Blocks_1 = __importDefault(require("../fields/Blocks"));
// import Link from '../fields/Link'
var Pages = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
        group: "Content",
    },
    fields: [
        {
            type: "text",
            name: "title",
        },
        {
            type: "richText",
            name: "content",
        },
        Blocks_1.default,
    ],
};
exports.default = Pages;
