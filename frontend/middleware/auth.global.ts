export default defineNuxtRouteMiddleware(async (to) => {
    const user = usePayloadUser();

    if (!user.value && to.path !== "/password") {
        return navigateTo("/password");
    }

    if (user.value && to.path === "/password") {
        return navigateTo("/");
    }
});
