export const usePayloadUser = () => useState("user");

export const usePayloadAPI = (
    apiRoute: Parameters<typeof useFetch>[0],
    options?: Parameters<typeof useFetch>[1],
) => {
    const { method = "GET", ...restOfOptions } = options ?? {};
    const baseURL = `https://${useRuntimeConfig().public.cmsHost}/api`;
    return useFetch(apiRoute, {
        baseURL,
        method,
        credentials: "include",
        headers: useRequestHeaders(["cookie"]),
        ...restOfOptions,
    });
};

export const useLoginPayloadUser = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const payloadUser = usePayloadUser();

    const response = await usePayloadAPI("/users/login", {
        method: "POST",
        body: {
            email,
            password,
        },
    });

    if (response.status.value === "success") {
        payloadUser.value = (response.data.value as any).user;
    }

    return response;
};

export const useGetPayloadUser = async () => {
    const payloadUser = usePayloadUser();
    const { data, error } = await usePayloadAPI("/users/me");
    console.log(error.value);
    console.log(data.value);
    payloadUser.value = (data.value as any).user;
};
