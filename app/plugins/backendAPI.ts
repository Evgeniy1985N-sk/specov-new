// import { navigateTo } from 'nuxt/app';
import { $fetch } from 'ofetch';
import { useRuntimeConfig } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp: nuxtApp) => {
	// const { session } = useUserSession()
	const config = useRuntimeConfig();

	const backendAPI = $fetch.create({
		baseURL: config.public.apiBase,

		credentials: 'include',

		// onRequest({ request, options, error }) {
			// console.log("onRequest")
			// if (session.value?.token) {
			// 	options.headers.set('Authorization', `Bearer ${session.value?.token}`)
			// }
		// },

		async onResponse({ response }) {
		  if (response._data) {
			response._data = transformJSON(response._data)
		  }
			console.log("got response");
		},

		async onResponseError({ response }) {
			console.log("onResponseError:",response);
			if (response.status === 401) {
				//await nuxtApp.runWithContext(() => navigateTo('/login'))
			}
		},
	});

	// Expose to useNuxtApp().$api
	return {
		provide: {
			backendAPI,
		},
	}
});

