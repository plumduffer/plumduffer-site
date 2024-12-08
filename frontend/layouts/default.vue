<script setup lang="ts">
import type { Global } from "@payload-types";
import { X } from "lucide-vue-next";
import PayloadLink from "../components/ui/payload-link/PayloadLink.vue";
import { useStorage } from "@vueuse/core";

const { data } = await usePayloadAPI("/globals/global");
const alert = ref((data.value as Global)?.alert);

const showAlert = ref(false);
const alertBooleanStorage = useStorage("plumduffer-alert", true);

onMounted(() => {
    if (alertBooleanStorage.value) {
        showAlert.value = true;
    }
});

function handleCloseAlert(event: Event) {
    event.preventDefault();
    showAlert.value = false;
    alertBooleanStorage.value = false;
}
</script>

<template>
    <Head>
        <Link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
        />
        <Link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
        />
        <Link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
        />
        <Link rel="manifest" href="/site.webmanifest" />
    </Head>
    <PayloadLink v-if="showAlert" v-bind="alert">
        <Alert class="px-8">
            <AlertDescription class="font-semibold">{{
                alert.customText
            }}</AlertDescription>
            <Button
                class="absolute right-2 bottom-1/2 translate-y-1/2"
                variant="ghost"
                size="icon"
                @click="handleCloseAlert"
            >
                <X />
            </Button>
        </Alert>
    </PayloadLink>
    <Toaster />
    <slot />
</template>
