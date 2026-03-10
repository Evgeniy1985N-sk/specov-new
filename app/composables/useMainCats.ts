import type { ProductCatPublicList } from "~/types/productCat";
import { useProductCatApi } from "~/composables/api/useProductCatApi";

export const useMainCats = () => {
	const cats = useState<ProductCatPublicList[]>("mainCats", () => []);
	const fetched = useState<boolean>("mainCatsFetched", () => false);
	const pending = useState<boolean>("mainCatsPending", () => false);

	const { mainCategories } = useProductCatApi();

	const ensure = async (): Promise<void> => {
		if (fetched.value || pending.value) {
			return;
		}

		pending.value = true;
		try {
			const data = await mainCategories();
			cats.value = Array.isArray(data) ? data : [];
			fetched.value = true;
		} finally {
			pending.value = false;
		}
	};

	return {
		mainCats: computed(() => cats.value),
		mainCatsPending: computed(() => pending.value),
		ensureMainCats: ensure,
		pending,
	};
};
