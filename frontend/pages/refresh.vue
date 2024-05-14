<script setup lang="ts">
const { query } = useRoute();
useHead({
    meta: [{ name: "robots", content: "none" }],
});
definePageMeta({
    layout: false,
});
async function handleClick() {
    await useFetch("/api/coda/refresh-tables", {
        method: "POST",
        body: {
            docId: query.docId,
            automationIds: (query.automationIds as string)?.split(","),
        },
    });
}
</script>

<template>
    <div class="w-screen h-screen grid place-items-center">
        <Button @click="handleClick">{{ query?.text ?? "Refresh" }}</Button>
    </div>
</template>
