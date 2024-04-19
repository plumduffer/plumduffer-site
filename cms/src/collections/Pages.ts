import { CollectionConfig } from "payload/types";
import Blocks from "../fields/Blocks";
// import Link from '../fields/Link'

const Pages: CollectionConfig = {
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
        Blocks,
    ],
};

export default Pages;
