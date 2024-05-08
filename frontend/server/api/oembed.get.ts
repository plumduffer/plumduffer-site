export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    return {
        type: "rich",
        version: "1.0",
        provider_name: "Plum Duffer",
        provider_url: `https://${event.node.req.headers.host}`,
        title: "Coda Refresh Button",
        width: "100%",
        height: "100%",
        html: `<iframe src="${query.url}">`,
    };
});
