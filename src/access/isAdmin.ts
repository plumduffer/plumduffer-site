import type { User } from "payload";

export const isAdmin = ({
    req: { user },
}: {
    req: {
        user?: User | null;
    };
}) => {
    return Boolean(user?.roles?.includes("admin"));
};
