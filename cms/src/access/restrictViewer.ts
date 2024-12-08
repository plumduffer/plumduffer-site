import { CollectionConfig, GlobalConfig } from "payload/types";
import { Config } from "payload/config";

const restrictViewer = ({ req: { user } }) => {
    if (!user) return false;
    if (user.roles?.includes("viewer")) return false;
    return true;
};

type viewerOnlyConfig = {
    collections?: CollectionConfig[];
    globals?: GlobalConfig[];
};

export function viewerOnly(incomingOptions?: viewerOnlyConfig) {
    return (incomingConfig: Config) => {
        const restrictMutationsFromViewer = (element, _, array) => {
            // check if this is the collections or globals
            const elementsKey =
                incomingConfig.collections === array
                    ? "collections"
                    : "globals";

            // restrict viewers from mutating all collections/globals
            element.access ??= {};
            element.access.update ??= restrictViewer;
            if (elementsKey === "collections") {
                element.access.create ??= restrictViewer;
                element.access.delete ??= restrictViewer;
            }

            // restrict viewers from accessing the admin dashboard on auth enabled collections
            if (Boolean(element.auth)) {
                element.access.admin ??= restrictViewer;
            }

            // if this collection/global is not to be restricted, make it readable by the public
            if (!incomingOptions?.[elementsKey]?.includes(element)) {
                element.access.read ??= () => true;
            }

            return element;
        };

        const config: Config = {
            ...incomingConfig,
            collections: incomingConfig.collections.map(
                restrictMutationsFromViewer,
            ),
            globals: incomingConfig.globals.map(restrictMutationsFromViewer),
        };
        return config;
    };
}
