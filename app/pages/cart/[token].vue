<script setup lang="ts">
import type { Cart } from "~/types/cart";
import { useRoute } from "vue-router";
import { useCartsStore } from "~/stores/carts";
import { useCartApi } from "@/composables/api/useCartApi";

definePageMeta({
	key: (route) => String(route.params.token ?? ""),
});

const route = useRoute();
const cartsStore = useCartsStore();
const cartApi = useCartApi();
const toast = useToast();

const cartIndex = 0;

const showImportNotif = (): void => {
	if (!import.meta.client) {
		return;
	}

	toast.add({
		title: "Восстановлена корзина",
		description: "Корзина успешно восстановлена по ссылке.",
		icon: "i-lucide-check-circle",
		color: "info",
	});
};

const showImportError = (): void => {
	if (!import.meta.client) {
		return;
	}

	toast.add({
		title: "Ошибка восстановления",
		description: "Не удалось восстановить корзину по ссылке.",
		icon: "i-lucide-circle-alert",
		color: "error",
	});
};

const applyRestoredCart = (restoredCart: Cart): void => {
	if (!cartsStore.carts[cartIndex]) {
		cartsStore.carts[cartIndex] = {
			name: restoredCart.name,
			created_at: restoredCart.created_at,
			products: restoredCart.products ?? [],
		};
		return;
	}

	cartsStore.carts[cartIndex] = {
		...cartsStore.carts[cartIndex],
		name: restoredCart.name,
		created_at: restoredCart.created_at,
		products: restoredCart.products ?? [],
	};
};

const restoreCartFromToken = async (): Promise<void> => {
	const tokenParam = route.params.token;
	const token = typeof tokenParam === "string" ? tokenParam : "";

	if (!token) {
		await navigateTo("/cart");
		return;
	}

	try {
		const restoredCart = await cartApi.restoreShared(token);
		applyRestoredCart(restoredCart);
		showImportNotif();
	} catch (error) {
		console.error("restoreCartFromToken error:", error);
		showImportError();
	}
};

await restoreCartFromToken();
</script>

<template>
	<CartPage />
</template>
