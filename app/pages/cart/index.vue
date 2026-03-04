<script setup lang="ts" >
import { computed, ref } from "vue";
import { useCartsStore } from "~/stores/carts";
import type { ProductForCart } from "~/types/product";

const cartsStore = useCartsStore();
const { link: productDetailLink } = useProduct();

const likeStore = useLikeStore();

const { picturePreview } = useProductPicture();

const isShowThanks = ref(false);
const isShowMenu = ref(false);

const cartIndex = 0;

const cart = computed(() => cartsStore.carts[cartIndex]);
const products = computed<ProductForCart[]>(() => cart.value?.products ?? []);

const goodsCount = computed(() => products.value.reduce((sum, p) => sum + p.quant, 0));
const totalPrice = computed(() => products.value.reduce((sum, p) => sum + p.amount, 0));

const makeKey = (p: ProductForCart): string => {
	return `${p.id}:${p.char?.id ?? 0}`;
};

const selectedKeys = ref<Set<string>>(new Set());

watch(
	() => products.value.map((p) => makeKey(p)),
	(nextKeys) => {
		const nextSet = new Set(nextKeys);

		for (const k of selectedKeys.value) {
			if (!nextSet.has(k)) {
				selectedKeys.value.delete(k);
			}
		}
	},
	{ immediate: true },
);

const isSelected = (p: ProductForCart): boolean => {
	return selectedKeys.value.has(makeKey(p));
};

const setSelected = (p: ProductForCart, checked: boolean): void => {
	const k = makeKey(p);

	if (checked) {
		selectedKeys.value.add(k);
	} else {
		selectedKeys.value.delete(k);
	}

	selectedKeys.value = new Set(selectedKeys.value);
};

const allKeys = computed<string[]>(() => products.value.map((p) => makeKey(p)));

const setChecked = (checked: boolean): void => {
	if (checked) {
		selectedKeys.value = new Set(allKeys.value);
	} else {
		selectedKeys.value = new Set();
	}
};
const onSetQuantity = async (p: ProductForCart, nextQuant: number): Promise<void> => {
	await cartsStore.setQuantityInFirst(
		{
			id: p.id,
			name: p.name,
			name_lat: p.name_lat,
		},
		nextQuant,
		{
			char: p.char,
			price: p.price,
		},
		p.picture,
	);
};

const onIncrement = async (p: ProductForCart): Promise<void> => {
	await cartsStore.incrementQuantity(cartIndex, p.id, p.char?.id);
};

const onDecrement = async (p: ProductForCart): Promise<void> => {
	await cartsStore.decrementQuantity(cartIndex, p.id, p.char?.id);
};

const onRemove = async (p: ProductForCart): Promise<void> => {
	await cartsStore.removeProductFromCart(cartIndex, p.id, p.char?.id);
};

const printCart = () => {
	console.log("print cart");
}

const shareCart = () => {
	console.log("share cart");
}

const removeSelected = async (): Promise<void> => {
	const keysToRemove = Array.from(selectedKeys.value);
	if (keysToRemove.length === 0) {
		return;
	}

	const byKey = new Map<string, { id: number; charId?: number }>();
	for (const p of products.value) {
		byKey.set(makeKey(p), { id: p.id, charId: p.char?.id });
	}

	for (const k of keysToRemove) {
		const item = byKey.get(k);
		if (!item) {
			continue;
		}
		await cartsStore.removeProductFromCart(cartIndex, item.id, item.charId);
	}

	selectedKeys.value = new Set();
};
</script>

<template>
	<Header />

	<main v-if="!isShowThanks">
		<Section class="mt-6! overflow-visible">
			<SectionContainer>
				<div class="flex gap-8">
					<div class="w-full pb-50 lg:pb-0">
						<div class="grid gap-6 border-b border-gray-300 lg:border-0 pb-10 lg:pb-0">
							<div class="flex items-center justify-between">
								<TitleGoods title="Корзина" :goods="goodsCount" />

								<div class="flex gap-4 md:hidden">
									<CartButton>
										<WrapIcon>
											<CartIconShare />
										</WrapIcon>
									</CartButton>
									<CartButton>
										<WrapIcon>
											<CartIconDownload />
										</WrapIcon>
									</CartButton>
									<CartButton>
										<WrapIcon>
											<CartIconFax />
										</WrapIcon>
									</CartButton>
								</div>
							</div>

							<CartPanel 
								@print="printCart"
								@share="shareCart"
								@remove="removeSelected"
								@set-check="setChecked"
							/>

							<!-- card -->
							<div v-for="product in products" class="w-full sm:p-4 bg-white transition" :key="`${product.id}:${product.char?.id ?? 0}`">
								<div class="flex justify-between items-center gap-6 flex-wrap">
									<div class="flex sm:items-center gap-4 lg:max-w-[520px] w-full">
										<!-- per-row checkbox: keep local UI if you need selection later -->
										<UCheckbox size="xl" 
											:model-value="isSelected(product)"
											@update:model-value="(v: boolean | 'indeterminate') => setSelected(product, v===true)"
										/>

										<img
											class="w-20 h-20 object-contain"
											:src="product.picture ? picturePreview(product.picture) : undefined"
											alt="prod-image"
										/>

										<div class="lg:max-w-[392px] w-full">
											<div class="grid gap-1 sm:gap-0">
												<div class="flex flex-col-reverse sm:flex-row gap-2 sm:gap-6">
													<span class="text-[12px] leading-[18px] sm:text-sm sm:leading-5 font-medium">
														Код товара: {{ product.code_1c }}
													</span>
													<CartMark />
												</div>

												<NuxtLink
													:to="productDetailLink(product)"
													class="text-[12px] leading-[18px] sm:text-base sm:leading-6 text-gray-950 font-semibold transition-colors hover:text-(--Brand-700) lg:max-w-[308px] sm:line-clamp-2 sm:overflow-hidden"
												>
													{{ product.name }}
												</NuxtLink>
											</div>

											<!-- Mobile row controls -->
											<div class="flex justify-between flex-wrap gap-2 lg:hidden mt-4">
												<div class="max-w-[92px] sm:max-w-[116px]">
													<UInputNumber
														:model-value="product.quant"
														:min="0"
														size="md"
														color="neutral"
														:ui="{ root: 'h-[28px] sm:h-[36px]', base: 'text-[12px] leading-[18px] sm:text-sm leading-5' }"
														@update:model-value="(v: number | null) => onSetQuantity(product, v ?? 0)"
														:increment="{
															class: 'bg-transparen',
															color: 'neutral',
															variant: 'ghost',
															size: 'md',
														}"
														:decrement="{
															color: 'neutral',
															variant: 'ghost',
															size: 'md',
														}"
														@increment="() => onIncrement(product)"
														@decrement="() => onDecrement(product)"
													/>
												</div>

												<div class="flex items-center justify-between sm:max-w-[150px] w-full">
													<p class="text-[18px] leading-7 font-semibold text-gray-950">
														{{ product.price.toLocaleString("ru-RU") }} ₽
													</p>
													<CartButton class="ml-auto sm:ml-0" @click="likeStore.toggle(product)">
														<WrapIcon class="w-9 h-9">
															<CartIconFavorite 
																  :selected="likeStore.isLiked(product)"
															/>
														</WrapIcon>
													</CartButton>
													<CartButton @click="onRemove(product)">
														<WrapIcon class="w-9 h-9">
															<CartIconTrash />
														</WrapIcon>
													</CartButton>
												</div>
											</div>
										</div>
									</div>

									<!-- Desktop quantity -->
									<div class="hidden lg:block max-w-[116px]">
										<UInputNumber
											:model-value="product.quant"
											:min="0"
											size="md"
											color="neutral"
											:ui="{ root: 'h-[36px]' }"
											@update:model-value="(v: number | null) => onSetQuantity(product, v ?? 0)"
											:increment="{
												color: 'neutral',
												variant: 'ghost',
												size: 'md',
											}"
											:decrement="{
												color: 'neutral',
												variant: 'ghost',
												size: 'md',
											}"
											@increment="() => onIncrement(product)"
											@decrement="() => onDecrement(product)"
										/>
									</div>

									<!-- Desktop actions -->
									<div class="hidden lg:flex items-center justify-end max-w-[180px] w-full">
										<p class="mr-1 text-[20px] leading-[30px] font-semibold text-gray-950">
											{{ product.price.toLocaleString("ru-RU") }} ₽
										</p>
										<CartButton @click="likeStore.toggle(product)">
											<WrapIcon class="w-9 h-9">
												<CartIconFavorite 
													  :selected="likeStore.isLiked(product)"
												/>
											</WrapIcon>
										</CartButton>
										<CartButton @click="onRemove(product)">
											<WrapIcon class="w-9 h-9">
												<CartIconTrash />
											</WrapIcon>
										</CartButton>
									</div>
								</div>
							</div>

							<!-- /card -->
						</div>

						<!-- Mobile -->
						<div class="grid gap-4 pt-6 pb-9 lg:hidden">
							<p class="text-black font-bold">Промокод</p>

							<div class="flex items-center gap-4">
								<UInput color="neutral" size="xl" placeholder="Введите промокод" />
								<UButton class="flex w-fit items-center justify-center h-10 cursor-pointer rounded-lg bg-white! text-(--Brand-950) px-4" color="neutral">
									Применить
								</UButton>
							</div>
						</div>
						<!-- Mobile -->

						<div id="tabs" class="hidden lg:grid gap-6 pt-20">
							<h2 class="text-[24px] leading-8 text-gray-950 font-['Russo_One']">Выберите способ получения</h2>
							<CartTabs />
						</div>

						<div id="pay" class="hidden lg:grid gap-6 pt-20">
							<h2 class="text-[24px] leading-8 text-gray-950 font-['Russo_One']">Выберите способ оплаты</h2>
							<CartTabs2 />
						</div>
					</div>

					<!-- ASIDE -->
					<aside class="hidden lg:flex items-start w-full max-w-[280px]">
						<div class="sticky top-0 grid gap-4 p-6 bg-gray-100 rounded-lg w-full">
							<div class="font-bold text-black">Детали заказа</div>

							<div class="grid gap-3">
								<div class="grid gap-1">
									<p class="flex text-gray-950 font-semibold gap-1.5 items-center">
										<WrapIcon><CartIconShop /></WrapIcon>
										<span class="text-sm font-medium leading-5">Самовывоз</span>
									</p>
									<span class="text-sm font-medium leading-5">ул. 50 лет Октября, 118А</span>
									<a href="#tabs" class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">Изменить</a>
								</div>

								<div class="grid gap-1">
									<p class="flex text-gray-950 font-semibold gap-1.5 items-center">
										<WrapIcon><CartIconUser /></WrapIcon>
										<span class="text-sm font-medium leading-5">Покупатель</span>
									</p>
									<HeaderLogin>
										<button class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">Указать данные</button>
									</HeaderLogin>
								</div>

								<div class="grid gap-1">
									<p class="flex text-gray-950 font-semibold gap-1.5 items-center">
										<WrapIcon><CartIconCurrency /></WrapIcon>
										<span class="text-sm font-medium leading-5">Способ оплаты</span>
									</p>
									<span class="text-sm font-medium leading-5">СБП</span>
									<a href="#pay" class="text-(--Brand-700) cursor-pointer text-sm leading-5 text-left">Изменить</a>
								</div>
							</div>

							<div class="grid gap-4">
								<CartTotal :item-count="products.length" :total-amount="cartsStore.totalAmount(cartIndex)"/>

								<UButton @click="isShowThanks = true" size="xl" type="submit" :disabled="goodsCount === 0">
									Оформить заказ
								</UButton>
							</div>
						</div>
					</aside>
					<!-- ASIDE -->
				</div>
			</SectionContainer>

			<!-- Panel Mobile -->
			<div class="fixed bottom-[71px] sm:bottom-20 left-0 w-full py-6 bg-gray-100 lg:hidden">
				<SectionContainer>
					<div class="grid gap-4">
						<p class="flex items-baseline text-sm leading-5 text-gray-950 font-semibold">
							<span class="max-w-[500px] whitespace-nowrap pr-2">
								{{ goodsCount }} товар(ов)
							</span>
							<span class="flex-1 border-b border-dotted border-gray-300 border-opacity-0 relative h-0 mx-2"></span>
							<b class="font-semibold text-gray-950 whitespace-nowrap">
								{{ totalPrice.toLocaleString("ru-RU") }} ₽
							</b>
						</p>
						<UButton @click="isShowMenu = true" class="min-h-9 sm:min-h-11" :disabled="goodsCount === 0">
							Оформить заказ
						</UButton>
					</div>
				</SectionContainer>
			</div>
			<!-- Panel Mobile -->

			<!-- Menu -->
			<CartMenu :is-show="isShowMenu" @close="isShowMenu = false" @open-thanks="isShowThanks = true" />
			<!-- Menu -->
		</Section>

		<Feedback class="hidden lg:block" />

		<Section class="hidden lg:block">
			<SectionContainer>
				<Stores />
			</SectionContainer>
		</Section>
	</main>

	<CartThanks v-if="isShowThanks" @close-thanks="isShowThanks = false" />
	<Footer class="hidden lg:block" />
</template>
