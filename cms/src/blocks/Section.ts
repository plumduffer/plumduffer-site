import { Block } from "payload/types";
import Padding from "../fields/Padding";
import Components from "../fields/Components";

const Section: Block = {
    slug: "section",
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    name: "components",
                    fields: [Components],
                },
                {
                    name: "options",
                    fields: [
                        {
                            name: "backgroundColor",
                            type: "text",
                        },
                        Padding({ vertical: true }),
                    ],
                },
            ],
        },
    ],
};

export default Section;
