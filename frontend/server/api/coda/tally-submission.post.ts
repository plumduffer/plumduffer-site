export default defineEventHandler(async (event) => {
    const {
        codaApiKey,
        codaInsertIssueEndpoint,
        public: { cmsHost },
    } = useRuntimeConfig(event);
    const body = await readBody(event);

    const fields = body?.data.fields;

    const codaClientIdExists = fields?.some(
        (field: any) =>
            field.label === "coda_client_id" && Boolean(field.value),
    );

    if (!codaClientIdExists) {
        throw createError({
            statusCode: 400,
            statusMessage: "Client ID not provided",
        });
    }

    const fieldsForCoda = fields
        .map((field: any) => {
            return {
                // WARNING: make sure Coda column names and Tally field labels are identical
                column: field.label,
                value: getValueBasedOnFieldType(field),
            };
        }) // Remove fields meant for refreshing table automatically
        .filter((field: any) => {
            return (
                field.column !== "coda_doc_id" &&
                field.column !== "coda_issues_table_automation_id"
            );
        });

    // Coda row should have a created at column
    fieldsForCoda.push({
        column: "Created At",
        value: body.data.createdAt,
    });

    fieldsForCoda.push({
        column: "Status",
        value: "Not started",
    });

    // Get select fields that have the 'other' option
    const otherOptionFields = fields.filter((field: any) =>
        field.options?.some((option: any) => option.isOtherOption),
    );

    // Make sure 'other' option values are sent seperately
    otherOptionFields.forEach((field: any) => {
        const { options, value, label } = field;
        const otherOption = options.find((option: any) => option.isOtherOption);
        if (field.value?.[0] === otherOption.text) {
            fieldsForCoda.push({
                column: `${label} Other`,
                value: value[0],
            });
        }
    });

    try {
        await $fetch(codaInsertIssueEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${codaApiKey}`,
            },
            body: {
                rows: [
                    {
                        cells: fieldsForCoda,
                    },
                ],
            },
        });
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode,
            statusMessage: error.statusMessage,
        });
    }

    setResponseStatus(event, 200);

    const docId = fields.find(
        (field: any) => field.label === "coda_doc_id",
    ).value;

    const automationId = fields.find(
        (field: any) => field.label === "coda_issues_table_automation_id",
    ).value;

    event.waitUntil(
        $fetch(`https://${cmsHost}/api/refresh-table-delay`, {
            method: "POST",
            body: {
                docId,
                automationId,
            },
        }),
    );
});

const getValueBasedOnFieldType = (field: any) => {
    const { type, options, value } = field;
    if (!value) return "";
    if (type === "MULTIPLE_CHOICE") {
        const chosenOption = options.find(
            (option: any) => option.id === value[0],
        );
        if (chosenOption.isOtherOption) return "Other";
        return chosenOption.text;
    }
    if (type === "FILE_UPLOAD") return JSON.stringify(value);
    return value;
};
