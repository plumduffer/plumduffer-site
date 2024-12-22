import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isAdminOrSelf } from "@/access/isAdminOrSelf";

export const Users: CollectionConfig = {
    slug: "users",
    admin: {
        useAsTitle: "email",
    },
    auth: true,
    access: {
        create: isAdmin,
        read: isAdminOrSelf,
        update: isAdmin,
        delete: isAdmin,
    },
    hooks: {
        beforeValidate: [
            async ({ data, operation, req: { payload } }) => {
                if (operation !== "create") return data;
                const users = await payload.find({
                    collection: "users",
                    depth: 0,
                    limit: 1,
                    pagination: false,
                });
                if (users.docs.length) return data;
                if (!data)
                    return console.error("User hooks beforeValidate error");
                data.roles = ["admin"];
                return data;
            },
        ],
    },
    fields: [
        {
            name: "roles",
            saveToJWT: true,
            type: "select",
            hasMany: true,
            defaultValue: ["viewer"],
            admin: {
                description: `Choosing 'Viewer Only' will overwrite all other roles. The user will no longer have access to the content management system. They will only be able to view password protected pages.`,
            },
            access: {
                create: isAdmin,
                update: isAdmin,
            },
            hooks: {
                beforeValidate: [
                    ({ value }) => {
                        if (!value) return [];
                        if (!value.includes("viewer")) return value;
                        return ["viewer"];
                    },
                ],
            },
            validate: (val, { operation, id, req: { user } }) => {
                if (!val) return "Invalid Data";
                if (operation === "create") return true;
                if (!user || !id) return "Invalid User";
                if (val.includes("viewer") && +id === +user.id) {
                    return `Setting 'Viewer Only' on yourself will lock you out of the content management system. Aborting action.`;
                }
                return true;
            },
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "Viewer Only",
                    value: "viewer",
                },
            ],
        },
    ],
};
