import { $fetch } from "ofetch";
import { useRuntimeConfig } from "nuxt/app";

const SESSION_BOOTSTRAP_PATH = "/session/bootstrap";

// Global (client) single-flight across the SPA lifetime.
let clientBootstrapPromise: Promise<void> | null = null;

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();

	const backendAPI = $fetch.create({
		baseURL: config.public.apiBase,
		credentials: "include",

		async onRequest({ request, options }) {
			const url = typeof request === "string" ? request : request.toString();

			// 1) SSR: forward incoming Cookie header to backend (required for SSR API calls).
			if (import.meta.server) {
				const incomingCookie = useRequestHeaders(["cookie"]).cookie;
				if (incomingCookie) {
					const headers = options.headers instanceof Headers
						? options.headers
						: new Headers(options.headers as any);

					headers.set("cookie", incomingCookie);
					options.headers = headers;
				}

				// IMPORTANT: do NOT bootstrap on SSR here.
				return;
			}

			// 2) Client: bootstrap once, before any non-bootstrap request.
			if (!url.includes(SESSION_BOOTSTRAP_PATH)) {
				if (!clientBootstrapPromise) {
					clientBootstrapPromise = (async () => {
						await $fetch<void>(SESSION_BOOTSTRAP_PATH, {
							baseURL: config.public.apiBase,
							method: "POST",
							credentials: "include",
						});
					})();
				}

				await clientBootstrapPromise;
			}
		},

		async onResponse({ response }) {
			if ((response as any)._data) {
				(response as any)._data = transformJSON((response as any)._data);
			}
			console.log("got response");
		},

		async onResponseError({ response }) {
			console.log("onResponseError:", response);
			if (response.status === 401) {
				// await nuxtApp.runWithContext(() => navigateTo("/login"));
			}
		},
	});

	return {
		provide: {
			backendAPI,
		},
	};
});
