<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCartsStore } from "~/stores/carts";
import type { ProductForCart } from "~/types/product";

const cartsStore = useCartsStore();
const { picturePreview } = useProductPicture();

const cartIndex = 0;

const cart = computed(() => cartsStore.carts[cartIndex]);
const products = computed<ProductForCart[]>(() => cart.value?.products ?? []);
const totalPrice = computed(() => cartsStore.totalAmount(cartIndex));

const totalQuantity = computed(() => {
	return products.value.reduce((sum, product) => sum + product.quant, 0);
});

const printedAt = computed(() => {
	return new Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date());
});

const lineTotal = (product: ProductForCart): number => {
	return product.price * product.quant;
};

const formatPrice = (value: number): string => {
	return `${value.toLocaleString("ru-RU")} ₽`;
};

const onPrint = (): void => {
	if (import.meta.client) {
		window.print();
	}
};

onMounted(async () => {
	if (!cart.value?.products?.length && !cartsStore.isFetching) {
		try {
			//await cartsStore.fetch();
		} catch {
		}
	}
});
</script>

<template>
	<div class="print-page">
		<div class="print-toolbar no-print">
			<div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
				<div>
					<p class="text-sm text-gray-500">
						Версия для печати
					</p>
				</div>

				<div class="flex items-center gap-3">
					<UButton
						color="neutral"
						variant="outline"
						size="sm"
						@click="navigateTo('/cart')"
					>
						Назад в корзину
					</UButton>

					<UButton
						size="sm"
						@click="onPrint"
					>
						Печать
					</UButton>
				</div>
			</div>
		</div>

		<main class="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
			<header class="mb-8 border-b border-gray-300 pb-6">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div class="grid gap-2">
						<h1 class="text-2xl font-bold text-gray-950 sm:text-3xl">
							Корзина
						</h1>

						<div class="grid gap-1 text-sm text-gray-600">
							<p>Дата печати: {{ printedAt }}</p>
							<p>Позиций: {{ products.length }}</p>
							<p>Количество товаров: {{ totalQuantity }}</p>
						</div>
					</div>

					<div class="grid gap-1 rounded-xl bg-gray-100 p-4 text-sm sm:min-w-[260px]">
						<p class="font-semibold text-gray-950">
							Итоги
						</p>
						<div class="flex items-center justify-between gap-4">
							<span class="text-gray-600">Товаров</span>
							<span class="font-medium text-gray-950">{{ totalQuantity }}</span>
						</div>
						<div class="flex items-center justify-between gap-4">
							<span class="text-gray-600">Позиций</span>
							<span class="font-medium text-gray-950">{{ products.length }}</span>
						</div>
						<div class="flex items-center justify-between gap-4 border-t border-gray-300 pt-3">
							<span class="font-semibold text-gray-950">Итого</span>
							<span class="text-lg font-bold text-gray-950">{{ formatPrice(totalPrice) }}</span>
						</div>
					</div>
				</div>
			</header>

			<section v-if="cartsStore.isFetching" class="grid gap-4">
				<div
					v-for="i in 4"
					:key="`print-skeleton-${i}`"
					class="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
				>
					<div class="flex gap-4">
						<div class="h-20 w-20 shrink-0 rounded bg-gray-200" />
						<div class="flex-1">
							<div class="mb-3 h-4 w-24 rounded bg-gray-200" />
							<div class="mb-2 h-5 w-2/3 rounded bg-gray-200" />
							<div class="mb-4 h-4 w-1/3 rounded bg-gray-200" />
							<div class="flex gap-4">
								<div class="h-4 w-20 rounded bg-gray-200" />
								<div class="h-4 w-20 rounded bg-gray-200" />
								<div class="h-4 w-24 rounded bg-gray-200" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section
				v-else-if="products.length"
				class="grid gap-4"
			>
				<article
					v-for="product in products"
					:key="`${product.id}:${product.char?.id ?? 0}`"
					class="rounded-xl border border-gray-200 bg-white p-4"
				>
					<div class="flex gap-4">
						<img
							v-if="product.picture"
							:src="picturePreview(product.picture)"
							:alt="product.name"
							class="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
						/>

						<div
							v-else
							class="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-gray-100 text-xs text-gray-400 sm:h-24 sm:w-24"
						>
							Нет фото
						</div>

						<div class="min-w-0 flex-1">
							<div class="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
								<span class="text-xs font-medium text-gray-500 sm:text-sm">
									Код товара: {{ product.code_1c }}
								</span>

								<span
									v-if="product.char?.name"
									class="text-xs font-medium text-gray-500 sm:text-sm"
								>
									Вариант: {{ product.char.name }}
								</span>
							</div>

							<h2 class="mb-4 text-sm font-semibold text-gray-950 sm:text-base">
								{{ product.name }}
							</h2>

							<div class="grid gap-2 text-sm sm:grid-cols-3 sm:gap-4">
								<div class="rounded-lg bg-gray-50 px-3 py-2">
									<div class="text-xs text-gray-500">
										Цена
									</div>
									<div class="font-semibold text-gray-950">
										{{ formatPrice(product.price) }}
									</div>
								</div>

								<div class="rounded-lg bg-gray-50 px-3 py-2">
									<div class="text-xs text-gray-500">
										Количество
									</div>
									<div class="font-semibold text-gray-950">
										{{ product.quant }}
									</div>
								</div>

								<div class="rounded-lg bg-gray-50 px-3 py-2">
									<div class="text-xs text-gray-500">
										Сумма
									</div>
									<div class="font-semibold text-gray-950">
										{{ formatPrice(lineTotal(product)) }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</article>

				<div class="mt-4 ml-auto w-full max-w-sm rounded-xl border border-gray-300 bg-gray-50 p-4">
					<div class="grid gap-3">
						<div class="flex items-center justify-between gap-4 text-sm">
							<span class="text-gray-600">Позиций</span>
							<span class="font-medium text-gray-950">{{ products.length }}</span>
						</div>

						<div class="flex items-center justify-between gap-4 text-sm">
							<span class="text-gray-600">Количество товаров</span>
							<span class="font-medium text-gray-950">{{ totalQuantity }}</span>
						</div>

						<div class="flex items-center justify-between gap-4 border-t border-gray-300 pt-3">
							<span class="text-base font-semibold text-gray-950">Итого</span>
							<span class="text-xl font-bold text-gray-950">{{ formatPrice(totalPrice) }}</span>
						</div>
					</div>
				</div>
			</section>

			<!--
			<section
				v-else-if="products.length===0"
				class="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center"
			>
				<h2 class="mb-2 text-lg font-semibold text-gray-950">
					Корзина пуста
				</h2>
				<p class="text-sm text-gray-500">
					Нечего печатать.
				</p>
			</section>
			-->
		</main>
	</div>
</template>

<style scoped>
@media print {
	.no-print {
		display: none !important;
	}

	.print-page {
		background: #ffffff !important;
	}

	@page {
		size: auto;
		margin: 12mm;
	}
}
</style>
