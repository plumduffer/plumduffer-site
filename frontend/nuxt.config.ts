// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        "@payload-types": "../cms/src/payload-types.ts",
    },
    modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
    devtools: { enabled: true },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: "./components/ui",
    },
    tailwindcss: {
        cssPath: "~/assets/css/main.css",
    },
    runtimeConfig: {
        codaApiKey: process.env.NUXT_CODA_API_KEY,
        codaInsertIssueEndpoint: process.env.NUXT_CODA_INSERT_ISSUE_ENDPOINT,
        codaCsrfToken: process.env.NUXT_CODA_CSRF_TOKEN,
        codaAuthSession: process.env.NUXT_CODA_AUTH_SESSION,
        public: {
            cmsHost: process.env.NUXT_PUBLIC_CMS_HOST,
            guestEmail: process.env.NUXT_PUBLIC_GUEST_EMAIL,
        },
    },
});
