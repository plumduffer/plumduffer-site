import { BlockField } from "payload/types";
import RichText from "../blocks/RichText";

const Components: BlockField = {
    name: "components",
    type: "blocks",
    blocks: [RichText],
    label: "-",
    labels: {
        plural: "Components",
        singular: "Component",
    },
};

export default Components;
