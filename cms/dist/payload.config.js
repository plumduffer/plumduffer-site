"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var plugin_cloud_1 = require("@payloadcms/plugin-cloud");
var db_postgres_1 = require("@payloadcms/db-postgres");
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var config_1 = require("payload/config");
var restrictViewer_1 = require("./access/restrictViewer");
var richtext_lexical_1 = require("@payloadcms/richtext-lexical");
var Users_1 = __importDefault(require("./collections/Users"));
var Pages_1 = __importDefault(require("./collections/Pages"));
var Global_1 = __importDefault(require("./globals/Global"));
var CMS_URL = "https://".concat(process.env.PAYLOAD_PUBLIC_CMS_HOST);
var FRONTEND_URLS = ["https://".concat(process.env.PAYLOAD_PUBLIC_FRONTEND_HOST)];
exports.default = (0, config_1.buildConfig)({
    serverURL: CMS_URL,
    admin: {
        user: Users_1.default.slug,
        bundler: (0, bundler_webpack_1.webpackBundler)(),
    },
    editor: (0, richtext_lexical_1.lexicalEditor)({}),
    collections: [Users_1.default, Pages_1.default],
    globals: [Global_1.default],
    cors: FRONTEND_URLS,
    csrf: FRONTEND_URLS,
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "payload-types.ts"),
    },
    graphQL: {
        schemaOutputFile: path_1.default.resolve(__dirname, "generated-schema.graphql"),
    },
    plugins: [
        (0, plugin_cloud_1.payloadCloud)(),
        (0, restrictViewer_1.viewerOnly)({
            collections: [Pages_1.default],
        }),
    ],
    db: (0, db_postgres_1.postgresAdapter)({
        pool: {
            connectionString: process.env.DATABASE_URI,
        },
    }),
});
