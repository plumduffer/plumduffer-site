export const usePayloadUser = () => useState('user');

export const usePayloadAPI = async (apiRoute, { method = 'GET', ...restOfOptions} = {}) => {
	const baseURL = `https://${useRuntimeConfig().public.cmsHost}/api`;
	return await useFetch(apiRoute, {
		baseURL,
		method,
		credentials: 'include',
		headers: useRequestHeaders(),
		...restOfOptions,
	});
}

export const useGetPayloadUser = async () => {
	const payloadUser = usePayloadUser();
	const { data } = await usePayloadAPI('/users/me');
	payloadUser.value = data.value.user;
};