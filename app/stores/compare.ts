import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import type { ProductForCompare, ProductUpdateCompare } from "~/types/productCompare";
import { useCompareApi } from "~/composables/api/useCompareApi";
import { useAuthStore } from "~/stores/auth";

const LS_KEY = "compare_products:v1";

type CompareLocalPayload = {
	v: 1;
	expiresAt: number;
	items: ProductForCompare[];
};

const nowMs = (): number => Date.now();

const productKey = (p: Pick<ProductForCompare, "id" | "char">): string => {
	const charId = p.char?.id;
	return `${p.id}:${charId ?? ""}`;
};

const toUpdateCompare = (p: Pick<ProductForCompare, "id" | "char">): ProductUpdateCompare => {
	const charId = p.char?.id;
	return {
		product_id: p.id,
		char_id: charId,
	};
};

const safeReadLocalPayload = (): CompareLocalPayload | null => {
	if (!import.meta.client) {
		return null;
	}

	try {
		const raw = localStorage.getItem(LS_KEY);
		if (!raw) {
			return null;
		}

		const parsed = JSON.parse(raw) as unknown;
		if (!parsed || typeof parsed !== "object") {
			return null;
		}

		const p = parsed as Partial<CompareLocalPayload>;

		if (p.v !== 1 || typeof p.expiresAt !== "number" || !Array.isArray(p.items)) {
			return null;
		}

		return p as CompareLocalPayload;
	} catch {
		return null;
	}
};

const safeReadLocalItems = (): ProductForCompare[] => {
	const payload = safeReadLocalPayload();
	if (!payload) {
		return [];
	}

	if (payload.expiresAt <= nowMs()) {
		try {
			localStorage.removeItem(LS_KEY);
		} catch {
			// ignore
		}
		return [];
	}

	return payload.items
		.map((v) => {
			const obj = v as Partial<ProductForCompare>;
			if (typeof obj.id !== "number") {
				return null;
			}
			return obj as ProductForCompare;
		})
		.filter((v): v is ProductForCompare => v !== null);
};

const safeWriteLocalPayload = (items: ProductForCompare[], expiresAt: number): void => {
	if (!import.meta.client) {
		return;
	}

	const payload: CompareLocalPayload = {
		v: 1,
		expiresAt,
		items,
	};

	localStorage.setItem(LS_KEY, JSON.stringify(payload));
};

export const useCompareStore = defineStore("compare", () => {
	const authStore = useAuthStore();
	const { isAuthenticated } = storeToRefs(authStore);

	const config = useRuntimeConfig();
	const anonTtlSeconds = Number(config.public?.compareTtlSeconds ?? 60 * 60 * 24 * 14);

	const ttlMs = computed<number>(() => {
		const s = anonTtlSeconds;
		if (!Number.isFinite(s) || s <= 0) {
			return 0;
		}
		return Math.floor(s * 1000);
	});

	const initialized = ref(false);
	const initPromise = ref<Promise<void> | null>(null);

	const userList = ref<ProductForCompare[]>([]);
	const localList = ref<ProductForCompare[]>([]);
	const keySet = ref<Set<string>>(new Set<string>());

	const isLoggedIn = computed<boolean>(() => isAuthenticated.value);

	const items = computed<ProductForCompare[]>(() => {
		return isLoggedIn.value ? userList.value : localList.value;
	});

	const hasProducts = computed<boolean>(() => items.value.length > 0);

	const rebuildKeySet = (): void => {
		const next = new Set<string>();
		for (const p of items.value) {
			next.add(productKey(p));
		}
		keySet.value = next;
	};

	const getAnonExpiryDate = (): Date | null => {
		if (!import.meta.client) {
			return null;
		}

		const payload = safeReadLocalPayload();
		if (!payload) {
			return null;
		}

		if (payload.expiresAt <= nowMs()) {
			return null;
		}

		return new Date(payload.expiresAt);
	};

	const touchAnonTtl = (): void => {
		if (!import.meta.client) {
			return;
		}

		if (ttlMs.value <= 0) {
			return;
		}

		const expiresAt = nowMs() + ttlMs.value;
		safeWriteLocalPayload(localList.value, expiresAt);
	};

	const setAnonFromLocalStorage = (): void => {
		userList.value = [];
		localList.value = safeReadLocalItems();
		rebuildKeySet();
	};

	const fetchAuthList = async (): Promise<void> => {
		const api = useCompareApi();
		userList.value = await api.fetch();
		localList.value = [];
		rebuildKeySet();
	};

	const ensureInitialized = async (): Promise<void> => {
		if (initialized.value) {
			return;
		}

		if (initPromise.value) {
			await initPromise.value;
			return;
		}

		initPromise.value = (async () => {
			if (isLoggedIn.value) {
				try {
					await fetchAuthList();
				} catch {
					userList.value = [];
					localList.value = [];
					rebuildKeySet();
				}
			} else {
				setAnonFromLocalStorage();
			}

			initialized.value = true;
		})();

		try {
			await initPromise.value;
		} finally {
			initPromise.value = null;
		}
	};

	const refresh = async (): Promise<void> => {
		initialized.value = false;
		await ensureInitialized();
	};

	const isInCompare = (p: Pick<ProductForCompare, "id" | "char">): boolean => {
		return keySet.value.has(productKey(p));
	};

	const addLocal = (p: ProductForCompare): void => {
		const k = productKey(p);
		if (keySet.value.has(k)) {
			return;
		}

		localList.value.push(p);
		keySet.value.add(k);
		touchAnonTtl();
	};

	const removeLocal = (p: Pick<ProductForCompare, "id" | "char">): void => {
		const k = productKey(p);
		if (!keySet.value.has(k)) {
			return;
		}

		localList.value = localList.value.filter((x) => productKey(x) !== k);
		keySet.value.delete(k);

		if (localList.value.length === 0) {
			try {
				localStorage.removeItem(LS_KEY);
			} catch {
				// ignore
			}
			return;
		}

		touchAnonTtl();
	};

	const addItem = async (p: ProductForCompare): Promise<void> => {
		await ensureInitialized();

		const api = useCompareApi();
		const payload = toUpdateCompare(p);

		if (!isInCompare(p)) {
			if (isLoggedIn.value) {
				userList.value.push(p);
				rebuildKeySet();
			} else {
				addLocal(p);
			}
		}

		try {
			await api.add(payload);
		} catch {
			// optional rollback
		}
	};

	const deleteItem = async (p: ProductForCompare): Promise<void> => {
		await ensureInitialized();

		const api = useCompareApi();
		const payload = toUpdateCompare(p);

		if (isInCompare(p)) {
			if (isLoggedIn.value) {
				const k = productKey(p);
				userList.value = userList.value.filter((x) => productKey(x) !== k);
				rebuildKeySet();
			} else {
				removeLocal(p);
			}
		}

		try {
			await api.remove(payload);
		} catch {
			// optional rollback
		}
	};

	const toggleItem = async (p: ProductForCompare): Promise<void> => {
		if (isInCompare(p)) {
			await deleteItem(p);
			return;
		}

		await addItem(p);
	};

	const clear = async (): Promise<void> => {
		await ensureInitialized();

		const api = useCompareApi();

		if (isLoggedIn.value) {
			userList.value = [];
			keySet.value = new Set<string>();

			try {
				await api.clear([]);
			} catch {
				// ignore
			}
			return;
		}

		const itemsForAnalytics = localList.value.map(toUpdateCompare);

		localList.value = [];
		keySet.value = new Set<string>();

		try {
			localStorage.removeItem(LS_KEY);
		} catch {
			// ignore
		}

		try {
			await api.clear(itemsForAnalytics);
		} catch {
			// optional rollback
		}
	};

	watch(
		() => isLoggedIn.value,
		async (next, prev) => {
			if (next === prev) {
				return;
			}

			if (!initialized.value) {
				return;
			}

			if (next) {
				try {
					await fetchAuthList();
				} catch {
					userList.value = [];
					rebuildKeySet();
				}
				return;
			}

			setAnonFromLocalStorage();
		},
	);

	return {
		initialized,
		isLoggedIn,

		userList,
		localList,
		items,
		hasProducts,

		ensureInitialized,
		refresh,

		isInCompare,
		toggleItem,
		deleteItem,
		addItem,
		clear,

		getAnonExpiryDate,
	};
});
