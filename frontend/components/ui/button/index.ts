import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md whitespace-nowrap font-medium ring-offset-plum-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-darkest focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-plum-darkest text-neutral-50 hover:bg-neutral-900/90",
                destructive: "bg-red-500 text-neutral-50 hover:bg-red-500/90",
                outline:
                    "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900",
                secondary:
                    "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80",
                ghost: "text-inherit hover:bg-neutral-100/20",
                link: "text-neutral-900 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);
