import { GlobalConfig } from "payload/types";
import Link from "../fields/Link";

const Global: GlobalConfig = {
    slug: "global",
    fields: [Link({ name: "alert" })],
    admin: {
        group: "Content",
    },
};

export default Global;
