import type { ProductFavoritePageAnonUserProducts } from "~/types/productLike";

export const likeEndpoints = {
	add: () => "/product-like/add",
	remove: () => "/product-like/remove",
	clear: () => "/product-like/clear",
	fetch: () => "/product-like/fetch",
	page: (products: ProductFavoritePageAnonUserProducts[]): string => {
		if (!products.length) {
			return "/product-like/page";
		};

		const encoded = encodeURIComponent(JSON.stringify(products));

		return `/product-like/page?products=${encoded}`;
	},
}

