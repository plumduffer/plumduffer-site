import { CollectionConfig } from "payload";
import { slug } from "@/fields/Slug";

export const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            type: "text",
            name: "title",
            required: true,
        },
        slug,
    ],
};
