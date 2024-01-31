export default defineNuxtRouteMiddleware(async (to) => {
    const user = usePayloadUser();

    if (!user.value && to.path !== "/password-login") {
        return navigateTo("/password-login");
    }

    if (user.value && to.path === "/password-login") {
        return navigateTo("/");
    }
});
