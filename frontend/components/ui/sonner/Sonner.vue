<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from "vue-sonner";

const props = defineProps<ToasterProps>();
</script>

<template>
    <Sonner
        v-bind="props"
        :toast-options="{
            className:
                '!text-xl !text-neutral-50 !bg-shirt-darkest !border-shirt-dark !border-2',
        }"
    />
</template>
