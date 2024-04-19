import { Block } from "payload/types";
import SectionComponent from "./SectionComponent";

const RichText: Block = SectionComponent({
    slug: "richText",
    fields: [
        {
            type: "richText",
            name: "richText",
            label: false,
        },
    ],
});

export default RichText;
