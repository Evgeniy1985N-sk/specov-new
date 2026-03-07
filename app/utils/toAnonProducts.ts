import type { PageAnonUserProducts } from "~/types/product";
import type { ProductForCompare } from "~/types/productCompare";
import type { ProductForLike } from "~/types/productLike";

export const likeToAnonProducts = (list: ProductForLike[]): PageAnonUserProducts[] => {
	return list
		.map((p) => {
			const charId = (p.char as any)?.id as number | undefined;
			if (!Number.isFinite(p.id)) {
				return null;
			}
			return {
				id: p.id,
				char_id: charId,
			};
		})
		.filter((x): x is PageAnonUserProducts => x !== null);
};

export const compareToAnonProducts = (list: ProductForCompare[]): PageAnonUserProducts[] => {
	return list
		.map((p) => {
			const charId = (p.char as any)?.id as number | undefined;
			if (!Number.isFinite(p.id)) {
				return null;
			}
			return {
				id: p.id,
				char_id: charId,
			};
		})
		.filter((x): x is PageAnonUserProducts => x !== null);
};
