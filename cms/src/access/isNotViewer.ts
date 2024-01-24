export const isNotViewer = ({ req: { user } }) => {
    if (!user) return false;
    if (user.roles?.includes('viewer')) return false;
    return true;
}