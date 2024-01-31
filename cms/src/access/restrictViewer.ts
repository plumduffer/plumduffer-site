export const restrictViewer = ({ req: { user } }) => {
    if (!user) return false;
    if (user.roles?.includes("viewer")) return false;
    return true;
};
