"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Padding(options) {
    if (options === void 0) { options = { all: true }; }
    var directions = ["top", "right", "bottom", "left"].filter(function (direction) {
        var keep = false;
        if (options.all)
            keep = true;
        var isTopOrBottom = direction === "top" || direction === "bottom";
        var isLeftOrRight = direction === "left" || direction === "right";
        if (typeof options.vertical === "boolean" && isTopOrBottom) {
            keep = options.vertical;
        }
        if (typeof options.horizontal === "boolean" && isLeftOrRight) {
            keep = options.horizontal;
        }
        if (typeof options[direction] === "boolean") {
            keep = options[direction];
        }
        return keep;
    });
    return {
        name: "padding",
        type: "group",
        fields: directions.map(function (direction) {
            var methodField = {
                name: "".concat(direction, "Method"),
                type: "radio",
                defaultValue: "preset",
                required: true,
                options: [
                    { label: "Preset", value: "preset" },
                    { label: "Custom", value: "custom" },
                ],
                admin: {
                    width: "30%",
                },
            };
            var presetField = {
                name: "".concat(direction, "Preset"),
                type: "select",
                defaultValue: "Medium",
                options: [
                    { label: "None", value: "none" },
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                ],
                admin: {
                    width: "70%",
                    condition: function (_, siblingData) {
                        return (siblingData === null || siblingData === void 0 ? void 0 : siblingData["".concat(direction, "Method")]) === "preset";
                    },
                },
            };
            var pixelsField = {
                name: "".concat(direction, "Pixels"),
                type: "number",
                admin: {
                    width: "70%",
                    condition: function (_, siblingData) {
                        return (siblingData === null || siblingData === void 0 ? void 0 : siblingData["".concat(direction, "Method")]) === "custom";
                    },
                },
            };
            return {
                type: "row",
                fields: [methodField, presetField, pixelsField],
            };
        }),
    };
}
exports.default = Padding;
