import { CollectionConfig } from "payload/types";
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
    ],
};

export default Pages;
