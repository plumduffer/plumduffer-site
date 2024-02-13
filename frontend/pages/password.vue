<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "vue-sonner";

useHead({
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
    const { error } = await useLoginPayloadUser({
        email: useRuntimeConfig().public.guestEmail,
        password: values.password,
    });

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
    <main class="h-[100dvh] grid px-12 place-items-center">
        <div>
            <hgroup class="text-center pb-12 self-end">
                <h1 class="text-7xl lg:text-9xl pb-3">Plum Duffer</h1>
                <p class="text-2xl lg:text-4xl font-semibold italic">
                    Freelance Web Developer
                </p>
            </hgroup>
            <form
                class="flex flex-col max-w-96 mx-auto lg:flex-row gap-3"
                @submit="onSubmit"
            >
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem class="h-16">
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
                <Button type="submit" class="w-fit mx-auto"> Unlock </Button>
            </form>
        </div>
    </main>
</template>
