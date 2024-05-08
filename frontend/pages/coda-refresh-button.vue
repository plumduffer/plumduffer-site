<script setup lang="ts">
const requestUrl = useRequestURL();
definePageMeta({
    layout: false,
});
useHead({
    link: [
        {
            rel: "alternate",
            type: "application/json+oembed",
            href: `https://${requestUrl.host}/api/oembed?url=${encodeURIComponent(requestUrl.href)}&format=json`,
            title: "Coda Refresh Button",
        },
    ],
    bodyAttrs: { class: "w-fit" },
    meta: [{ name: "robots", content: "none" }],
});
</script>

<template>
    <Button class="bg-green-600 rounded-none w-64 h-14">Test</Button>
</template>
