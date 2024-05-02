import express from "express";
import payload from "payload";
import CodaAndTally from "./custom-api-endpoints/CodaAndTally";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
    res.redirect("/admin");
});

app.use((_, res, next) => {
    res.setHeader("X-Robots-Tag", "none");
    next();
});

const start = async () => {
    // Initialize Payload
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        express: app,
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        },
    });

    // Add your own express routes here
    app.post("/api/coda-and-tally", CodaAndTally);

    app.listen(3001);
};

start();
