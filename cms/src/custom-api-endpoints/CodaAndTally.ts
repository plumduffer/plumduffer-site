const CodaAndTally = async (req, res) => {
    const fields = req.body?.data.fields;

    const codaClientIdExists = fields?.some(
        (field) => field.label === "coda_client_id" && Boolean(field.value),
    );

    if (!codaClientIdExists) res.status(404).send("Client ID not provided");

    const fieldsForCoda = fields.map((field) => {
        return {
            // WARNING: make sure Coda column names and Tally field labels are identical
            column: field.label,
            value: getValueBasedOnFieldType(field),
        };
    });

    fieldsForCoda.push({
        column: "Created At",
        value: req.body.data.createdAt,
    });

    const otherOptionFields = fields.filter((field) =>
        field.options?.some((option) => option.isOtherOption),
    );

    otherOptionFields.forEach((field) => {
        const { options, value, label } = field;
        const otherOption = options.find((option) => option.isOtherOption);
        if (field.value?.[0] === otherOption.text) {
            fieldsForCoda.push({
                column: `${label} Other`,
                value: value[0],
            });
        }
    });

    const response = await fetch(process.env.CODA_INSERT_ISSUE_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CODA_API_KEY}`,
        },
        body: JSON.stringify({
            rows: [
                {
                    cells: fieldsForCoda,
                },
            ],
        }),
    });

    const responseData = await response.json();
    res.status(response.status).send(!response.ok ? responseData.message : "");
};

const getValueBasedOnFieldType = (field) => {
    const { type, options, value } = field;
    if (!value) return "";
    if (type === "MULTIPLE_CHOICE") {
        const chosenOption = options.find((option) => option.id === value[0]);
        if (chosenOption.isOtherOption) return "Other";
        return chosenOption.text;
    }
    if (type === "FILE_UPLOAD") return JSON.stringify(value);
    return value;
};

export default CodaAndTally;
