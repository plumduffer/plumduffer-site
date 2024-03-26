import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { viewerOnly } from "./access/restrictViewer";

import Users from "./collections/Users";
import Pages from "./collections/Pages";

import Global from "./globals/Global";

const CMS_URL = `https://${process.env.PAYLOAD_PUBLIC_CMS_HOST}`;
const FRONTEND_URLS = [`https://${process.env.PAYLOAD_PUBLIC_FRONTEND_HOST}`];

export default buildConfig({
    serverURL: CMS_URL,
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
    },
    editor: slateEditor({}),
    collections: [Users, Pages],
    globals: [Global],
    cors: FRONTEND_URLS,
    csrf: FRONTEND_URLS,
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    },
    plugins: [
        payloadCloud(),
        viewerOnly({
            collections: [Pages],
        }),
    ],
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI,
        },
    }),
});
