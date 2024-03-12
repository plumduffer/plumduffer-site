<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "vue-sonner";
import { UnlockKeyhole, Loader } from "lucide-vue-next";

const isLoading = ref(false);

useHead({
    title: "Plum Duffer",
    meta: [
        { name: "description", content: "Freelance Web Developer" },
        { property: "og:title", content: "Plum Duffer" },
        { property: "og:description", content: "Freelance Web Developer" },
        { property: "og:image", content: "/img/og.png" },
        { property: "og:url", content: useRequestURL().href },
        { property: "og:type", content: "website" },
    ],
    bodyAttrs: {
        class: "bg-plum-primary",
    },
});

const formSchema = toTypedSchema(
    z.object({
        password: z.string().min(1, { message: "Required" }).default(""),
    }),
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true;
    const { error } = await useLoginPayloadUser({
        email: useRuntimeConfig().public.guestEmail,
        password: values.password,
    });
    isLoading.value = false;

    if (error.value) {
        const errorsAsString = error.value.data.errors.reduce(
            (accumulator, current) => `${accumulator}\n${current.message}`,
            "",
        );
        return toast.error(errorsAsString);
    }

    await navigateTo("/");
});
</script>

<template>
    <main class="h-[100dvh] grid grid-rows-[2fr_1fr] sm:grid-rows-[1.3fr_1fr]">
        <div class="self-end px-12 lg:px-24">
            <hgroup class="text-center pb-12">
                <h1 class="text-8xl md:text-9xl pb-3">Plum Duffer</h1>
                <p class="text-2xl md:text-4xl font-semibold italic">
                    Freelance Web Developer
                </p>
            </hgroup>
            <form
                class="flex max-w-80 md:max-w-96 mx-auto gap-2"
                @submit="onSubmit"
            >
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem class="h-16 flex-grow">
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Password"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button type="submit" class="w-fit">
                    <Loader class="animate-spin" v-if="isLoading" />
                    <template v-else>
                        <UnlockKeyhole class="sm:hidden" />
                        <span class="max-sm:hidden">Unlock</span>
                    </template>
                </Button>
            </form>
        </div>
        <div class="mx-auto max-w-3xl self-end">
            <img
                class="pt-16"
                src="/img/plumduffer_t.png"
                alt="Plum Duffer Avatar"
            />
        </div>
    </main>
</template>
