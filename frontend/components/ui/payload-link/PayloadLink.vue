<script setup lang="ts">
import type { SharedLink } from "@payload-types";

const props = defineProps<SharedLink>();
const isExternalUrl = computed(() => props.type === "externalUrl");
const fallbackLinkText = computed(() => {
    if (props.customText) return props.customText;
    if (isExternalUrl) return props.externalUrl;
    return "placeholder";
});
</script>

<template>
    <NuxtLink
        :to="isExternalUrl ? (props.externalUrl as string) : '/placeholder'"
        :target="isExternalUrl ? '_blank' : null"
        :external="isExternalUrl"
    >
        <slot>
            {{ fallbackLinkText }}
        </slot>
    </NuxtLink>
</template>
