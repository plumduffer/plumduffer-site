import { BlockField } from "payload/types";
import Section from "../blocks/Section";

const Blocks: BlockField = {
    name: "blocks",
    type: "blocks",
    blocks: [Section],
};

export default Blocks;
