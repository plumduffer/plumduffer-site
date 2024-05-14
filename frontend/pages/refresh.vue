<script setup lang="ts">
const { query } = useRoute();
const busy = ref(false);
useHead({
    meta: [{ name: "robots", content: "none" }],
});
definePageMeta({
    layout: false,
});
async function handleClick() {
    if (busy.value) return;
    busy.value = true;
    await useFetch("/api/coda/refresh-tables", {
        method: "POST",
        body: {
            docId: query.docId,
            automationIds: (query.automationIds as string)?.split(","),
        },
    });
    await new Promise((res) => setTimeout(res, 500));
    busy.value = false;
}
</script>

<template>
    <div class="w-screen h-screen grid place-items-center">
        <Button @click="handleClick">{{
            busy ? "Refreshing..." : query?.text ?? "Refresh"
        }}</Button>
    </div>
</template>
