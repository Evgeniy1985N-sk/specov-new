import type { CategoryFilter } from "./categoryFilter";
import type { Picture } from "./picture";
import type { ProductCard } from "./product";

export interface ProductCatPublicList {
	id: number;
	name: string;
	name_lat: string;
	description: string;
	product_count: number;
	is_group: boolean;
	picture?: Picture;
	icon?: string;
	children?: ProductCatPublicList[];
	parents?: {
		id: number;
		name: string;
		name_lat: string;
	}[]
	filters: CategoryFilter[];
	brands: BrandFilter[];
	countries: CountryFilter[];
	stores: StoreFilter[];
}

export interface ProductCatMain {
	id: number;
	name: string;
	name_lat: string;
	picture?: Picture;
}
	
//******************
// CategoryCatalogParams is used to pass parameters to a service
// to fetch category catalog data.
export interface CategoryCatalogParams {
	brands?: number[]; //ids
	countries?: number[]; //ids
	stores?: number[]; //ids
	filters?: string[]; //filter[ID]=hash,hash or filter[ID][min]=111
	sort?: CategoryCatalogSortCol;
	dir?: CategoryCatalogSortDir;
	from: number;
	count: number;
}

export type BrandFilter = { id: number, name: string, disabled: boolean };
export type StoreFilter = { id: number, address: string, disabled: boolean };
export type CountryFilter = { id: number, name: string, disabled: boolean };

// CategoryCatalog is the main model for showing list of products
export interface CategoryCatalog {
	category: ProductCatPublicList;
	products: ProductCard[];
	filters: CategoryFilter[];
	brands: BrandFilter[];
	countries: CountryFilter[];
	stores: StoreFilter[];
	total_count: number;
	min_price: number;
	max_price: number;
	last_viewed: ProductCard[];
}

export type CategoryCatalogPrecalc = Pick<
	CategoryCatalog,
	| 'total_count'
	| 'brands'
	| 'countries'
	| 'stores'
	| 'filters'
	| 'min_price'
	| 'max_price'
>;

export type CategoryCatalogSortDir = "asc" | "desc";
export type CategoryCatalogSortCol =
	"popularity" |
	"price" |
	"review_count" |
	"is_new" |
	"has_discount" |
	"rating";

