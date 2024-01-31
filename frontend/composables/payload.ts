export const usePayloadUser = () => useState("user");

export const usePayloadAPI = async (
  apiRoute,
  { method = "GET", ...restOfOptions } = {}
) => {
  const baseURL = `https://${useRuntimeConfig().public.cmsHost}/api`;
  return await useFetch(apiRoute, {
    baseURL,
    method,
    credentials: "include",
    headers: useRequestHeaders(),
    ...restOfOptions,
  });
};

export const useLoginPayloadUser = async ({ email, password }) => {
  const payloadUser = usePayloadUser();

  const response = await usePayloadAPI("/users/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  if (response.status.value === "success") {
    payloadUser.value = response.data.value.user;
  }

  return response;
};

export const useGetPayloadUser = async () => {
  const payloadUser = usePayloadUser();
  const { data } = await usePayloadAPI("/users/me");
  payloadUser.value = data.value.user;
};
