import type { PageAnonUserProducts } from "~/types/product";

export const compareEndpoints = {
	add: () => "/product-compare/add",
	remove: () => "/product-compare/remove",
	clear: () => "/product-compare/clear",
	fetch: () => "/product-compare/fetch",
	page: (products: PageAnonUserProducts[]): string => {
		if (!products.length) {
			return "/product-compare/page";
		};

		const encoded = encodeURIComponent(JSON.stringify(products));

		return `/product-compare/page?products=${encoded}`;
	},
}


