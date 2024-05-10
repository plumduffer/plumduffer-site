"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
var drizzle_orm_1 = require("drizzle-orm");
function up(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var payload = _b.payload;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, payload.db.drizzle.execute((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\nDO $$ BEGIN\n CREATE TYPE \"enum_users_roles\" AS ENUM('admin', 'viewer');\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n CREATE TYPE \"enum_global_alert_type\" AS ENUM('page', 'externalUrl');\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nCREATE TABLE IF NOT EXISTS \"users_roles\" (\n\t\"order\" integer NOT NULL,\n\t\"parent_id\" integer NOT NULL,\n\t\"value\" \"enum_users_roles\",\n\t\"id\" serial PRIMARY KEY NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS \"users\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"updated_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"created_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"email\" varchar NOT NULL,\n\t\"reset_password_token\" varchar,\n\t\"reset_password_expiration\" timestamp(3) with time zone,\n\t\"salt\" varchar,\n\t\"hash\" varchar,\n\t\"login_attempts\" numeric,\n\t\"lock_until\" timestamp(3) with time zone\n);\n\nCREATE TABLE IF NOT EXISTS \"pages\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"title\" varchar,\n\t\"updated_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"created_at\" timestamp(3) with time zone DEFAULT now() NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS \"payload_preferences\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"key\" varchar,\n\t\"value\" jsonb,\n\t\"updated_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"created_at\" timestamp(3) with time zone DEFAULT now() NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS \"payload_preferences_rels\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"order\" integer,\n\t\"parent_id\" integer NOT NULL,\n\t\"path\" varchar NOT NULL,\n\t\"users_id\" integer\n);\n\nCREATE TABLE IF NOT EXISTS \"payload_migrations\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"name\" varchar,\n\t\"batch\" numeric,\n\t\"updated_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"created_at\" timestamp(3) with time zone DEFAULT now() NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS \"global\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"alert_type\" \"enum_global_alert_type\" NOT NULL,\n\t\"alert_external_url\" varchar,\n\t\"alert_custom_text\" varchar,\n\t\"updated_at\" timestamp(3) with time zone,\n\t\"created_at\" timestamp(3) with time zone\n);\n\nCREATE TABLE IF NOT EXISTS \"global_rels\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"order\" integer,\n\t\"parent_id\" integer NOT NULL,\n\t\"path\" varchar NOT NULL,\n\t\"pages_id\" integer\n);\n\nCREATE INDEX IF NOT EXISTS \"order_idx\" ON \"users_roles\" (\"order\");\nCREATE INDEX IF NOT EXISTS \"parent_idx\" ON \"users_roles\" (\"parent_id\");\nCREATE INDEX IF NOT EXISTS \"created_at_idx\" ON \"users\" (\"created_at\");\nCREATE UNIQUE INDEX IF NOT EXISTS \"email_idx\" ON \"users\" (\"email\");\nCREATE INDEX IF NOT EXISTS \"created_at_idx\" ON \"pages\" (\"created_at\");\nCREATE INDEX IF NOT EXISTS \"key_idx\" ON \"payload_preferences\" (\"key\");\nCREATE INDEX IF NOT EXISTS \"created_at_idx\" ON \"payload_preferences\" (\"created_at\");\nCREATE INDEX IF NOT EXISTS \"order_idx\" ON \"payload_preferences_rels\" (\"order\");\nCREATE INDEX IF NOT EXISTS \"parent_idx\" ON \"payload_preferences_rels\" (\"parent_id\");\nCREATE INDEX IF NOT EXISTS \"path_idx\" ON \"payload_preferences_rels\" (\"path\");\nCREATE INDEX IF NOT EXISTS \"created_at_idx\" ON \"payload_migrations\" (\"created_at\");\nCREATE INDEX IF NOT EXISTS \"order_idx\" ON \"global_rels\" (\"order\");\nCREATE INDEX IF NOT EXISTS \"parent_idx\" ON \"global_rels\" (\"parent_id\");\nCREATE INDEX IF NOT EXISTS \"path_idx\" ON \"global_rels\" (\"path\");\nDO $$ BEGIN\n ALTER TABLE \"users_roles\" ADD CONSTRAINT \"users_roles_parent_id_users_id_fk\" FOREIGN KEY (\"parent_id\") REFERENCES \"users\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n ALTER TABLE \"payload_preferences_rels\" ADD CONSTRAINT \"payload_preferences_rels_parent_id_payload_preferences_id_fk\" FOREIGN KEY (\"parent_id\") REFERENCES \"payload_preferences\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n ALTER TABLE \"payload_preferences_rels\" ADD CONSTRAINT \"payload_preferences_rels_users_id_users_id_fk\" FOREIGN KEY (\"users_id\") REFERENCES \"users\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n ALTER TABLE \"global_rels\" ADD CONSTRAINT \"global_rels_parent_id_global_id_fk\" FOREIGN KEY (\"parent_id\") REFERENCES \"global\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n ALTER TABLE \"global_rels\" ADD CONSTRAINT \"global_rels_pages_id_pages_id_fk\" FOREIGN KEY (\"pages_id\") REFERENCES \"pages\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n"], ["\n\nDO $$ BEGIN\n CREATE TYPE \"enum_users_roles\" AS ENUM('admin', 'viewer');\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n CREATE TYPE \"enum_global_alert_type\" AS ENUM('page', 'externalUrl');\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nCREATE TABLE IF NOT EXISTS \"users_roles\" (\n\t\"order\" integer NOT NULL,\n\t\"parent_id\" integer NOT NULL,\n\t\"value\" \"enum_users_roles\",\n\t\"id\" serial PRIMARY KEY NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS \"users\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"updated_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"created_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"email\" varchar NOT NULL,\n\t\"reset_password_token\" varchar,\n\t\"reset_password_expiration\" timestamp(3) with time zone,\n\t\"salt\" varchar,\n\t\"hash\" varchar,\n\t\"login_attempts\" numeric,\n\t\"lock_until\" timestamp(3) with time zone\n);\n\nCREATE TABLE IF NOT EXISTS \"pages\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"title\" varchar,\n\t\"updated_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"created_at\" timestamp(3) with time zone DEFAULT now() NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS \"payload_preferences\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"key\" varchar,\n\t\"value\" jsonb,\n\t\"updated_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"created_at\" timestamp(3) with time zone DEFAULT now() NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS \"payload_preferences_rels\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"order\" integer,\n\t\"parent_id\" integer NOT NULL,\n\t\"path\" varchar NOT NULL,\n\t\"users_id\" integer\n);\n\nCREATE TABLE IF NOT EXISTS \"payload_migrations\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"name\" varchar,\n\t\"batch\" numeric,\n\t\"updated_at\" timestamp(3) with time zone DEFAULT now() NOT NULL,\n\t\"created_at\" timestamp(3) with time zone DEFAULT now() NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS \"global\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"alert_type\" \"enum_global_alert_type\" NOT NULL,\n\t\"alert_external_url\" varchar,\n\t\"alert_custom_text\" varchar,\n\t\"updated_at\" timestamp(3) with time zone,\n\t\"created_at\" timestamp(3) with time zone\n);\n\nCREATE TABLE IF NOT EXISTS \"global_rels\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"order\" integer,\n\t\"parent_id\" integer NOT NULL,\n\t\"path\" varchar NOT NULL,\n\t\"pages_id\" integer\n);\n\nCREATE INDEX IF NOT EXISTS \"order_idx\" ON \"users_roles\" (\"order\");\nCREATE INDEX IF NOT EXISTS \"parent_idx\" ON \"users_roles\" (\"parent_id\");\nCREATE INDEX IF NOT EXISTS \"created_at_idx\" ON \"users\" (\"created_at\");\nCREATE UNIQUE INDEX IF NOT EXISTS \"email_idx\" ON \"users\" (\"email\");\nCREATE INDEX IF NOT EXISTS \"created_at_idx\" ON \"pages\" (\"created_at\");\nCREATE INDEX IF NOT EXISTS \"key_idx\" ON \"payload_preferences\" (\"key\");\nCREATE INDEX IF NOT EXISTS \"created_at_idx\" ON \"payload_preferences\" (\"created_at\");\nCREATE INDEX IF NOT EXISTS \"order_idx\" ON \"payload_preferences_rels\" (\"order\");\nCREATE INDEX IF NOT EXISTS \"parent_idx\" ON \"payload_preferences_rels\" (\"parent_id\");\nCREATE INDEX IF NOT EXISTS \"path_idx\" ON \"payload_preferences_rels\" (\"path\");\nCREATE INDEX IF NOT EXISTS \"created_at_idx\" ON \"payload_migrations\" (\"created_at\");\nCREATE INDEX IF NOT EXISTS \"order_idx\" ON \"global_rels\" (\"order\");\nCREATE INDEX IF NOT EXISTS \"parent_idx\" ON \"global_rels\" (\"parent_id\");\nCREATE INDEX IF NOT EXISTS \"path_idx\" ON \"global_rels\" (\"path\");\nDO $$ BEGIN\n ALTER TABLE \"users_roles\" ADD CONSTRAINT \"users_roles_parent_id_users_id_fk\" FOREIGN KEY (\"parent_id\") REFERENCES \"users\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n ALTER TABLE \"payload_preferences_rels\" ADD CONSTRAINT \"payload_preferences_rels_parent_id_payload_preferences_id_fk\" FOREIGN KEY (\"parent_id\") REFERENCES \"payload_preferences\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n ALTER TABLE \"payload_preferences_rels\" ADD CONSTRAINT \"payload_preferences_rels_users_id_users_id_fk\" FOREIGN KEY (\"users_id\") REFERENCES \"users\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n ALTER TABLE \"global_rels\" ADD CONSTRAINT \"global_rels_parent_id_global_id_fk\" FOREIGN KEY (\"parent_id\") REFERENCES \"global\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n\nDO $$ BEGIN\n ALTER TABLE \"global_rels\" ADD CONSTRAINT \"global_rels_pages_id_pages_id_fk\" FOREIGN KEY (\"pages_id\") REFERENCES \"pages\"(\"id\") ON DELETE cascade ON UPDATE no action;\nEXCEPTION\n WHEN duplicate_object THEN null;\nEND $$;\n"]))))];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.up = up;
;
function down(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var payload = _b.payload;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, payload.db.drizzle.execute((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\nDROP TABLE \"users_roles\";\nDROP TABLE \"users\";\nDROP TABLE \"pages\";\nDROP TABLE \"payload_preferences\";\nDROP TABLE \"payload_preferences_rels\";\nDROP TABLE \"payload_migrations\";\nDROP TABLE \"global\";\nDROP TABLE \"global_rels\";"], ["\n\nDROP TABLE \"users_roles\";\nDROP TABLE \"users\";\nDROP TABLE \"pages\";\nDROP TABLE \"payload_preferences\";\nDROP TABLE \"payload_preferences_rels\";\nDROP TABLE \"payload_migrations\";\nDROP TABLE \"global\";\nDROP TABLE \"global_rels\";"]))))];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.down = down;
;
var templateObject_1, templateObject_2;
