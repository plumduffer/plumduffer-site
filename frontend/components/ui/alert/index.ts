import { type VariantProps, cva } from "class-variance-authority";

export { default as Alert } from "./Alert.vue";
export { default as AlertTitle } from "./AlertTitle.vue";
export { default as AlertDescription } from "./AlertDescription.vue";

export const alertVariants = cva(
    "relative w-full rounded-lg border border-shirt-darkest p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutral-950",
    {
        variants: {
            variant: {
                default: "bg-shirt-dark text-neutral-950 text-center",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
