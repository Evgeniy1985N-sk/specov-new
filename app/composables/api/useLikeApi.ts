import { useNuxtApp } from "nuxt/app";
import type { $Fetch } from "ofetch";
import { likeEndpoints } from "~/api/endpoints/like";
import type { ProductFavoritePage, ProductFavoritePageAnonUserProducts, ProductForLike, ProductUpdateLike } from "~/types/productLike";

export function useLikeApi() {
	const api = useNuxtApp().$backendAPI as $Fetch;

	return {
		add(item: ProductUpdateLike): Promise<void>{
			return api<void>(
				likeEndpoints.add(),
					{ method: 'POST', body: item },
			);
		},
		remove(item: ProductUpdateLike): Promise<void>{
			return api<void>(
				likeEndpoints.remove(),
					{ method: 'POST', body: item },
			);
		},
		clear(items: ProductUpdateLike[]): Promise<void>{
			return api<void>(
				likeEndpoints.clear(),
					{ method: 'POST', body: items },
			);
		},
		fetch(): Promise<ProductForLike[]>{
			return api<ProductForLike[]>(
				likeEndpoints.fetch(),
					{ method: 'GET' },
			);
		},
		page(products: ProductFavoritePageAnonUserProducts[]): Promise<ProductFavoritePage>{
			return api<ProductFavoritePage>(
				likeEndpoints.page(products),
					{ method: 'GET' },
			);
		},
	}
}
