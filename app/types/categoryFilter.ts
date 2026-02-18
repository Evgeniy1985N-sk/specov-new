type CategoryFilterDataType = "t_text" | "t_bool" | "t_date" | "t_number" | "t_list";

export interface CategoryFilter {
	id: number;
	name: string;
	data_type: CategoryFilterDataType;
	options: Record<string, any>;
	items: {
		value: string;
		hash: string;
		disabled: boolean;
	}[];
	disabled?: boolean;
}

type CategoryFilterBoolPresentType = "is_radio" | "is_dropbos";

export interface CategoryFilterBoolOptions {
	text_true?: string;
	text_false?: string;
	present_type?: CategoryFilterBoolPresentType;
}

export interface CategoryFilterNumberOptions {
	min_val?: number;
	max_val?: number;
	is_range?: boolean;
	range_step?: number;
}

export type CategoryFilterListPresentType = "is_checkbox" | "is_radio" | "is_dropbos";

