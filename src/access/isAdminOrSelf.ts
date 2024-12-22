import type { User } from "payload";

export const isAdminOrSelf = ({
    req: { user },
}: {
    req: {
        user?: User | null;
    };
}) => {
    if (!user) return false;
    if (user.roles?.includes("admin")) return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
