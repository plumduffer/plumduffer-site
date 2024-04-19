import {
    GroupField,
    NumberField,
    RadioField,
    SelectField,
} from "payload/types";

type PaddingOptions = {
    all?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
};

function Padding(options: PaddingOptions = { all: true }): GroupField {
    const directions = ["top", "right", "bottom", "left"].filter(
        (direction) => {
            let keep = false;
            if (options.all) keep = true;

            const isTopOrBottom = direction === "top" || direction === "bottom";
            const isLeftOrRight = direction === "left" || direction === "right";

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
        },
    );

    return {
        name: "padding",
        type: "group",
        fields: directions.map((direction) => {
            const methodField: RadioField = {
                name: `${direction}Method`,
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

            const presetField: SelectField = {
                name: `${direction}Preset`,
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
                    condition: (_, siblingData) =>
                        siblingData?.[`${direction}Method`] === "preset",
                },
            };

            const pixelsField: NumberField = {
                name: `${direction}Pixels`,
                type: "number",
                admin: {
                    width: "70%",
                    condition: (_, siblingData) =>
                        siblingData?.[`${direction}Method`] === "custom",
                },
            };

            return {
                type: "row",
                fields: [methodField, presetField, pixelsField],
            };
        }),
    };
}

export default Padding;
