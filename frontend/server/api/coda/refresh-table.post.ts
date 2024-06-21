export default defineEventHandler(async (event) => {
    const { codaCsrfToken, codaAuthSession } = useRuntimeConfig(event);
    const body = JSON.parse(await readBody(event));
    if (!body?.docId || !body?.automationId) {
        throw createError({
            statusCode: 400,
            statusMessage:
                "Non-sufficient data. Needs a docId and an automationId: { docId: String, automationId: String }",
        });
    }
    const headers = {
        Cookie: `csrf_token=${codaCsrfToken}; auth_session=${codaAuthSession}`,
        "X-Csrf-Token": codaCsrfToken,
        Origin: "https://coda.io",
    };

    const { docId, automationId } = body;

    const url = `https://coda.io/internalAppApi/documents/${docId}/automations/${automationId}/initiate`;
    await $fetch(url, {
        method: "POST",
        headers,
    });

    setResponseStatus(event, 200);
});
