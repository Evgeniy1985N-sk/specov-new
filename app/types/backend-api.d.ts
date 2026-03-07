import type { $Fetch } from "ofetch";

declare module "#app" {
	interface NuxtApp {
		$backendAPI: $Fetch;
	}
}

declare module "vue" {
	interface ComponentCustomProperties {
		$backendAPI: $Fetch;
	}
}

export {};
