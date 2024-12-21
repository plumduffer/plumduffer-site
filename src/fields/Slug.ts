import type { TextField } from "payload";

export const slug: TextField = {
    name: "slug",
    type: "text",
    admin: {
        position: "sidebar",
    },
    hooks: {
        beforeChange: [
            ({ data, value }) => {
                if (!data) return value;
                return value ? value : slugify(data.title);
            },
        ],
    },
};

const slugify = (str: String, options = {}) => {
    const defaults = {
        maxLength: Infinity,
        lower: true,
    };
    const opts = { ...defaults, ...options };

    // Handle null/undefined input
    if (!str) return "";

    let slug = str
        .toString()
        .normalize("NFKD") // Split accented characters into their base characters and diacritics
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen

    if (opts.lower) {
        slug = slug.toLowerCase();
    }

    // Apply maximum length if set, ensuring we don't break words
    if (opts.maxLength < Infinity) {
        slug = slug.slice(0, opts.maxLength);
        // If we cut in the middle of a word, remove the partial word
        if (slug.charAt(slug.length - 1) !== "-") {
            slug = slug.slice(0, slug.lastIndexOf("-"));
        }
    }

    return slug;
};
