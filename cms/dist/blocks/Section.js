"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Padding_1 = __importDefault(require("../fields/Padding"));
var Components_1 = __importDefault(require("../fields/Components"));
var Section = {
    slug: "section",
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    name: "components",
                    fields: [Components_1.default],
                },
                {
                    name: "options",
                    fields: [
                        {
                            name: "backgroundColor",
                            type: "text",
                        },
                        (0, Padding_1.default)({ vertical: true }),
                    ],
                },
            ],
        },
    ],
};
exports.default = Section;
