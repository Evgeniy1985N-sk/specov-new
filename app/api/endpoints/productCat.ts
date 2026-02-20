import type { CategoryCatalogParams } from "~/types/productCat";

export const productCatEndpoints = {
	publicList: () => '/category',
	mainCatetories: () => '/main-categories',

	catalog: (
		id: number,
		params: CategoryCatalogParams
	) => {
		const query = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value == null) return;
			query.append(key, String(value));
		})

		return `/catalog/${id}?${query.toString()}`;
	},

	//count only
	catalogProductCount: (
		id: number,
		params: CategoryCatalogParams
	) => {
		const query = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value == null) return;
			query.append(key, String(value));
		})

		return `/catalog-product-count/${id}?${query.toString()}`;
	}
};

