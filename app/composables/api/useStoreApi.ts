import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";
import { storeEndpoints } from '@/api/endpoints/store';
import { type StorePublicList } from "@/types/store";

export function useStoreApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		publicList(): Promise<StorePublicList[]>{
			return api<StorePublicList[]>(storeEndpoints.publicList());
		}
	}
}


