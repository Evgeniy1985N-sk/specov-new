import { type CollectionParams } from "@/types/collection";

export const productEndpoints = {
  search: (searchTerm: string) => `/search/${encodeURIComponent(searchTerm)}`,

  catalog: (categoryNameLat?: string, searchTerm?: string) => {
	let url = categoryNameLat
			? `/catalog/${encodeURIComponent(categoryNameLat)}`
			: "/catalog";
	if(searchTerm && searchTerm.length){
		url+= "?search=" +encodeURIComponent(searchTerm);
	}
	return url;
  },

  detail: (prodSlug: string, charSlug?: string) => 
		`/product/${encodeURIComponent(prodSlug)}`+(charSlug? `/${encodeURIComponent(charSlug)}`: ""),

  detailPage: (prodSlug: string, charSlug?: string) => 
		`/product-page/${encodeURIComponent(prodSlug)}`+(charSlug? `/${encodeURIComponent(charSlug)}`: ""),

  live: (id: number, charName?: string) => 
		charName
		? `/product-live/${id}/${encodeURIComponent(charName)}`
		: `/product-live/${id}`,

  //Вам может понравиться
  similar: (id: number) => `/product-similar/${id}`,

  //Сопутствующие товары
  related: (id: number) => `/product-related/${id}`,

  reviews: (id: number, params?: CollectionParams) => {
	let paramsStr = params? "?"+encodeURIComponent(JSON.stringify(params)) : "";
	return `/product-review/${id}${paramsStr}`;
  }
}
