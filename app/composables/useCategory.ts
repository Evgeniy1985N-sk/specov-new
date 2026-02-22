import type { Picture } from '@/types/picture';
import type { CategoryFilter } from "@/types/categoryFilter";
import type { BrandFilter, CountryFilter, StoreFilter } from "@/types/productCat";

export const useCategory = () => {
	const config = useRuntimeConfig();

	const picturePreview = (img: Picture): string => {
		return `${config.public.imgCatPreviewCDN}/${img.ref_1c}.${img.preview_ext ?? 'png'}`;
	}

	const pictureDetail = (img: Picture): string => {
		return `${config.public.imgCatCDN}/${img.ref_1c}.${img.ext ?? 'png'}`;
	}

	const link = (item: { name_lat: string, id: number }) => {
		return `/category/${item.id}`;
	}

	const imgSrc = (item: { picture?: Picture }) => {
		if (!item.picture) {
			return undefined;
		}
		return picturePreview(item.picture);
	}

	const mergeDynFilters = (
		base: CategoryFilter[],
		present: CategoryFilter[],
	): CategoryFilter[] => {
		type CategoryFilterItem = CategoryFilter["items"][number];

		const presentItemHashesByFilterId = new Map<number, Set<string>>();
		const presentFilterIds = new Set<number>();

		for (const f of present) {
			presentFilterIds.add(f.id);

			if (f.data_type === "t_list") {
				continue;
			}

			let set = presentItemHashesByFilterId.get(f.id);
			if (!set) {
				set = new Set<string>();
				presentItemHashesByFilterId.set(f.id, set);
			}

			for (const it of f.items ?? []) {
				if (it.hash) {
					set.add(it.hash);
				}
			}
		}

		return base.map((f) => {
			if (f.data_type === "t_list") {
				const isPresent = presentFilterIds.has(f.id);

				return {
					...f,
					options: {
						...f.options,
						disabled: !isPresent,
					},
				};
			}

			const presentHashes = presentItemHashesByFilterId.get(f.id) ?? new Set<string>();

			const items: CategoryFilterItem[] = (f.items ?? []).map((it) => {
				const hash = it.hash ?? "";
				const isPresent = hash !== "" && presentHashes.has(hash);

				return {
					...it,
					disabled: !isPresent,
				};
			});

			const anyEnabled = items.some((it) => !it.disabled);

			return {
				...f,
				items,
				disabled: !anyEnabled,
			};
		});
	};

	const mergeBrandFilters = (
		base: BrandFilter[],
		present: BrandFilter[],
	): BrandFilter[] => {
		const presentIds = new Set<number>(present.map((b) => b.id));

		return base.map((b) => ({
			...b,
			disabled: !presentIds.has(b.id),
		}));
	};
	const mergeStoreFilters = (
		base: StoreFilter[],
		present: StoreFilter[],
	): StoreFilter[] => {
		const presentIds = new Set<number>(present.map((s) => s.id));

		return base.map((s) => ({
			...s,
			disabled: !presentIds.has(s.id),
		}));
	};

	const mergeCountryFilters = (
		base: CountryFilter[],
		present: CountryFilter[],
	): CountryFilter[] => {
		const presentIds = new Set<number>(present.map((c) => c.id));

		const result = base.map((c) => ({
			...c,
			disabled: !presentIds.has(c.id),
		}));

		return result;
	};

	return {
		picturePreview,
		pictureDetail,
		link,
		imgSrc,
		mergeDynFilters,
		mergeBrandFilters,
		mergeStoreFilters,
		mergeCountryFilters,
	}
}


