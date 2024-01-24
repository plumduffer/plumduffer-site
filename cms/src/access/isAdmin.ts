export const isAdmin = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'));
}

export const isAdminFieldLevel = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'));
}