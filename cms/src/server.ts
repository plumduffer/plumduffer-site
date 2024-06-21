import express from "express";
import payload from "payload";

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
    app.post("/api/refresh-table-delay", async (req) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, 60000);
        });

        await fetch(
            `https://${process.env.PAYLOAD_PUBLIC_FRONTEND_HOST}/api/coda/refresh-table`,
            {
                method: "POST",
                body: JSON.stringify(req.body),
            },
        );
    });

    app.listen(3001);
};

start();
