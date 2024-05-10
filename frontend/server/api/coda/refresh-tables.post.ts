export default defineEventHandler(async (event) => {
    const { codaCsrfToken, codaAuthSession } = useRuntimeConfig(event);
    const body = await readBody(event);
    if (!body?.docId || body?.automationIds?.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage:
                "Non-sufficient data. Needs a docId and at least one automationId: { docId: String, automationIds: String[] }",
        });
    }
    const headers = {
        Cookie: `csrf_token=${codaCsrfToken}; auth_session=${codaAuthSession}`,
        "X-Csrf-Token": codaCsrfToken,
        Origin: "https://coda.io",
    };

    const { docId, automationIds } = body;

    automationIds.map((automationId: String) => {
        const url = `https://coda.io/internalAppApi/documents/${docId}/automations/${automationId}/initiate`;
        return $fetch(url, {
            method: "POST",
            headers,
        });
    });
});
