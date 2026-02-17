import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";
import { productEndpoints } from '@/api/endpoints/product';
import { type ProductDetailStatic, type SearchResult } from "@/types/product";
import { type ProductDetailDynamic, type ProductDetailPage } from "@/types/product";
import { type ProductCard } from "@/types/product";
import { type CollectionParams } from "@/types/collection";
import { type ProductReviewCollection } from "@/types/productReview";

export function useProductApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		detailPage(prodSlug: string, charSlug?: string): Promise<ProductDetailPage>{
			return api<ProductDetailPage>(productEndpoints.detailPage(prodSlug, charSlug));
		},

		detail(prodSlug: string, charSlug?: string): Promise<ProductDetailStatic>{
			return api<ProductDetailStatic>(productEndpoints.detail(prodSlug, charSlug));
		},

		live(id: number, charSlug?: string): Promise<ProductDetailDynamic>{
			return api<ProductDetailDynamic>(productEndpoints.live(id, charSlug));
		},

		similar(id: number): Promise<ProductCard[]>{
			return api<ProductCard[]>(productEndpoints.similar(id));
		},
		related(id: number): Promise<ProductCard[]>{
			return api<ProductCard[]>(productEndpoints.related(id));
		},
		reviews(id: number, params?: CollectionParams): Promise<ProductReviewCollection>{
			return api<ProductReviewCollection>(productEndpoints.reviews(id, params));
		},
		search(term: string): Promise<SearchResult>{
			return api<SearchResult>(productEndpoints.search(term));
		},
		// catalog(catetoryNameLat?: string, searchTerm?: string, filters: string[]): Promise<SearchResult>{
		// 	return api<SearchResult>(productEndpoints.search(term));
		// }
	}
}

