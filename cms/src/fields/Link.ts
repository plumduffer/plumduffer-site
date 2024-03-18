import { GroupField } from "payload/types";
import { useState, useEffect, useMemo } from "react";

export function RowLabel({ data }) {
    const { link } = data;
    const linkedPageId = useMemo(() => link.page?.value, [link.page]);
    const [linkedPageTitle, setLinkedPageTitle] = useState("");
    useEffect(() => {
        if (!linkedPageId) return setLinkedPageTitle("");
        fetch(`/api/pages/${linkedPageId}`)
            .then((res) => res.json())
            .then(({ title }) => setLinkedPageTitle(title));
    }, [linkedPageId]);

    if (link.type === "page") return link.customText || linkedPageTitle;
    if (link.type === "externalUrl") return link.customText || link.externalUrl;
}

function Link({ ...props }): GroupField {
    return {
        type: "group",
        name: "link",
        ...props,
        fields: [
            {
                name: "type",
                type: "radio",
                defaultValue: "page",
                required: true,
                options: [
                    { label: "Page", value: "page" },
                    { label: "External URL", value: "externalUrl" },
                ],
            },
            {
                name: "page",
                type: "relationship",
                relationTo: ["pages"],
                required: true,
                admin: {
                    condition: (_, siblingData) => siblingData?.type === "page",
                },
            },
            {
                name: "externalUrl",
                type: "text",
                required: true,
                admin: {
                    condition: (_, siblingData) =>
                        siblingData?.type === "externalUrl",
                },
            },
            {
                name: "customText",
                type: "text",
            },
        ],
    };
}

export default Link;
