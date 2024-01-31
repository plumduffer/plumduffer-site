<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "vue-sonner";

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
        return toast(errorsAsString);
    }

    await navigateTo("/");
});
</script>

<template>
    <main class="h-[100dvh] grid place-items-center">
        <hgroup class="text-center">
            <h1 class="text-5xl lg:text-7xl">Plum Duffer</h1>
            <p>Coming soon</p>
        </hgroup>
        <form @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
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
            <Button type="submit"> Unlock </Button>
        </form>
    </main>
</template>
