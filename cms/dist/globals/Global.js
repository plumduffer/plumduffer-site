"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Link_1 = __importDefault(require("../fields/Link"));
var Global = {
    slug: "global",
    fields: [(0, Link_1.default)({ name: "alert" })],
    admin: {
        group: "Content",
    },
};
exports.default = Global;
