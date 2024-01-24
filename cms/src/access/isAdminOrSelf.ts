export const isAdminOrSelf = ({ req: { user } }) => {
    if (!user) return false;
    if (user.roles?.includes('admin')) return true;
    return {
        id: {
            equals: user.id
        }
    }
}