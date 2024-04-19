import { Block } from "payload/types";

function SectionComponent(block: Block): Block {
    const sectionComponentTabs: Block = {
        ...block,
        fields: [
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
        ],
    };

    return sectionComponentTabs;
}

export default SectionComponent;
