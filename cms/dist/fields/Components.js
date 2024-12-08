"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RichText_1 = __importDefault(require("../blocks/RichText"));
var Components = {
    name: "components",
    type: "blocks",
    blocks: [RichText_1.default],
    label: "-",
    labels: {
        plural: "Components",
        singular: "Component",
    },
};
exports.default = Components;
