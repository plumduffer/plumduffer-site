export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path === "/coda-refresh-button" || to.path.startsWith("/api")) {
        return;
    }

    const user = usePayloadUser();

    if (!user.value && to.path !== "/password") {
        return navigateTo("/password");
    }

    if (user.value && to.path === "/password") {
        return navigateTo("/");
    }
});
