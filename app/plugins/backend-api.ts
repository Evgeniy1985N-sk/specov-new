import { $fetch } from "ofetch";

const SESSION_BOOTSTRAP_PATH = "/session/bootstrap";

let clientBootstrapPromise: Promise<void> | null = null;

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();

	const backendAPI = $fetch.create({
		baseURL: config.public.apiBase,
		credentials: "include",

		async onRequest({ request, options }) {
			const url = typeof request === "string" ? request : request.toString();

			if (import.meta.server) {
				const incomingCookie = useRequestHeaders(["cookie"]).cookie;
				if (incomingCookie) {
					const headers = options.headers instanceof Headers
						? options.headers
						: new Headers(options.headers as HeadersInit | undefined);

					headers.set("cookie", incomingCookie);
					options.headers = headers;
				}

				return;
			}

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
			const contentType = response.headers.get("content-type") ?? "";

			if (
				contentType.includes("application/json") &&
				(response as { _data?: unknown })._data
			) {
				(response as { _data?: unknown })._data = transformJSON(
					(response as { _data?: unknown })._data,
				);
			}
		},

		async onResponseError({ response }) {
			console.log("onResponseError:", response);

			if (response.status === 401) {
				// await navigateTo("/login");
			}
		},
	});

	return {
		provide: {
			backendAPI,
		},
	};
});
