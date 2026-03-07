<script setup lang="ts">
//leave temporarilly
import Battery from '@/components/header/catalogMenu/icon/Battery.vue';
import { useProductCatApi } from '@/composables/api/useProductCatApi';
import { type ProductCatPublicList } from "@/types/productCat";
import { categoryLink } from "@/utils/categoryLink";
import type { UiState } from '~/types/uiState';
const { lock, unlock, scrollbarWidth } = useScrollLock()

const { isShowCatalogMenu, closeCatalogMenu } = inject<UiState>('UiState')!
const emit = defineEmits(['hideCatalog'])
const levelMenu = ref(0)
const activeCategoryId = ref<number | null>(null);
const activeSubcategoryId = ref<number | null>(null);
const isShowAllSubItems = ref(false)

// Fetch catalog from server
const { publicList } = useProductCatApi();
const { data: categories } = await useAsyncData(
	'productCat',
	() => publicList()
);

// Transform the fetched data into the format needed for the menu
const menu = computed(() => {
	if (!categories.value) return [];

	if (!activeCategoryId.value && categories.value?.length) {
		//default
		activeCategoryId.value = categories.value[0]?.id ?? 0;
	}
	return categories.value.map(category => ({
		id: category.id,
		name: category.name,
		icon: markRaw(Battery), // fallback icon
		isActive: category.id === activeCategoryId.value,
		sub: category.children?.map((child: ProductCatPublicList) => ({
			id: child.id,
			title: child.name,
			name_lat: child.name_lat,
			isActive: child.id === activeSubcategoryId.value,
			quantity: child.product_count?.toString(),
			items: child.children?.map((grandChild: ProductCatPublicList) => ({
				id: grandChild.id,
				name: grandChild.name,
				name_lat: grandChild.name_lat,
				quantity: grandChild.product_count?.toString()
			}))
		}))
	}));
});

function toggleActive(id: number) {
	activeCategoryId.value = id;
	activeSubcategoryId.value = null;
	levelMenu.value = 1;
}

function toggleMenu(id: number) {
	activeCategoryId.value = id;
	activeSubcategoryId.value = null;
	levelMenu.value = 1;
}

function toggleSubMenu(id: number, idSub: number) {
	activeCategoryId.value = id;
	activeSubcategoryId.value = idSub;
	levelMenu.value = 2;
}

const goBack = () => {
	if (levelMenu.value > 0) {
		levelMenu.value--;

		if (levelMenu.value === 0) {
			activeCategoryId.value = null;
			activeSubcategoryId.value = null;
		} else if (levelMenu.value === 1) {
			activeSubcategoryId.value = null;
		}
	}
};

watch(isShowCatalogMenu, (val) => {
	if (val) lock()
	else unlock()
})

</script>

<template>

	<!-- MODAL WINDOW CATALOG MENU -->
	<div @click.self="closeCatalogMenu" v-if="isShowCatalogMenu"
		:style="{ paddingRight: scrollbarWidth + 'px' }"
		class="fixed inset-0 lg:top-[140px] z-100 h-[calc(100vh-71px)] lg:pt-2 bg-white lg:bg-black/20 overflow-auto">

		<!-- BUTTON BACK -->
		<div class="lg:hidden border-b border-(--border) py-2.5 sm:py-6">
			<SectionContainer class="max-w-full px-6">

				<div class="flex justify-between items-center">

					<button @click="goBack" class="flex items-center gap-2">
						<WrapIcon>
							<HeaderCatalogMenuIconBack />
						</WrapIcon>
						<p class="text-[24px] leading-8 font-['Russo_One'] text-black">
							Каталог
						</p>
					</button>
					<button @click="$emit('hideCatalog')">
						<WrapIcon class="w-9 h-9">
							<HeaderCatalogMenuIconCross />
						</WrapIcon>
					</button>

				</div>

			</SectionContainer>
		</div>
		<!-- BUTTON BACK -->

		<!-- WRAPPER -->
		<div class="lg:max-w-[1216px] w-full lg:pt-4 lg:mx-auto lg:px-4 lg:bg-white lg:rounded-3xl">
			<!-- CONTAINER MENU -->
			<SectionContainer
				class="custom-scrollbar relative max-w-full lg:max-w-[1248px] w-full p-4 lg:pt-0 lg:px-0 overflow-auto lg:h-[600px]">

				<HeaderSearch class="mt-6 mb-6 lg:hidden" />

				<!-- desk menu -->
				<ul class="hidden lg:grid gap-1 lg:max-w-[280px]">

					<li v-for="item in menu" :key="item.id" @click="toggleActive(item.id)"
						:class="[item.isActive ? 'lg:bg-gray-100' : 'lg:relative z-1']" class="py-2.5 px-3.5 rounded-lg">

						<!-- MAIN MENU ITEM -->
						<div :class="[item.isActive ? 'lg:text-(--Brand-700)' : 'text-gray-600']"
							class="flex gap-1.5 items-center text-sm leading-5 font-bold hover:text-(--Brand-700)  cursor-pointer">
							<WrapIcon class="shrink-0 h-6! w-6!">
								<component :is="item.icon" />
							</WrapIcon>
							{{ item.name }}
						</div>
						<!-- MAIN MENU ITEM -->

						<!-- SUB MENU -->
						<div v-if="item.isActive"
							class="lg:absolute lg:top-0 lg:left-0 p-4 pb-0 grid gap-8 grid-cols-[280px_1fr] lg:w-full">

							<!-- SUB MENU UL WRAPPER -->
							<ul class="grid gap-10 lg:gap-2 col-2 lg:pb-4">

								<!-- SUB MENU LI -->
								<li v-for="group in item.sub" class="grid gap-4 p-6 bg-gray-100 rounded-3xl">

									<!-- SUB MENU ITEM -->
									<NuxtLink :to="categoryLink(group)"
										class="flex items-center gap-2 text-[20px] leading-[30px] text-gray-950 font-semibold hover:text-(--Brand-700) transition-colors">
										{{ group.title }}
										<WrapIcon class="w-6! h-6!">
											<HeaderCatalogMenuIconAng />
										</WrapIcon>
									</NuxtLink>
									<!-- SUB MENU ITEM -->

									<!-- SUB MENU UL -->
									<ul v-if="group.items?.length" class="grid grid-cols-3 gap-x-8 gap-y-3">

										<li v-for="category in group.items.slice(0, !isShowAllSubItems ? 9 : group.items.length)">
											<NuxtLink
												class="custom-item flex items-center justify-between gap-2 text-gray-950 hover:text-(--Brand-700) transition-colors"
												:to="categoryLink(category)">
												<p class="w-full max-w-[190px] text-sm leading-5 font-medium">
													{{ category.name }}
												</p>
												<span class="shrink-0 text-sm leading-5 font-medium text-gray-600">
													{{ category.quantity }}
												</span>
											</NuxtLink>
										</li>

									</ul>
									<!-- SUB MENU UL -->

									<!-- BUTTON SHOW ALL ITEMS -->
									<button v-if="group.items && group.items?.length > 9" @click="isShowAllSubItems = !isShowAllSubItems"
										class="hidden lg:flex items-center gap-1.5 text-sm cursor-pointer">
										<span v-if="!isShowAllSubItems">
											Показать еще
										</span>
										<span v-else>
											Скрыть
										</span>
										<i :class="{ 'rotate-180': isShowAllSubItems }" class="flex items-center justify-center w-5 h-5">
											<HeaderCatalogMenuIconAngDown />
										</i>
									</button>
									<!-- BUTTON SHOW ALL ITEMS -->

								</li>
								<!-- SUB MENU LI -->

							</ul>
							<!-- SUB MENU UL WRAPPER -->

						</div>
						<!-- SUB MENU -->

					</li>

				</ul>

				<!-- mobile menu -->
				<ul
					class="grid gap-1 lg:hidden border-t border-(--border) text-sm leading-5 font-bold text-gray-600 pb-[100px]">

					<li v-for="item in menu" :key="item.id">

						<!-- menu 1 -->
						<div v-if="levelMenu == 0" @click="toggleMenu(item.id)"
							class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)">
							<span class="flex items-center justify-center h-6 w-6">
								<component :is="item.icon" />
							</span>
							{{ item.name }}
							<WrapIcon class="ml-auto">
								<HeaderCatalogMenuIconAng />
							</WrapIcon>
						</div>

						<!-- menu 1 SUB -->
						<ul v-if="item.isActive" class="h-0 lg:h-auto grid gap-1">

							<li v-for="group in item.sub" :key="group.id">

								<!-- menu 2 -->
								<div v-if="levelMenu == 1" @click="toggleSubMenu(item.id, group.id)"
									class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)">
									<NuxtLink :to="categoryLink(group)">
										{{ group.title }}
									</NuxtLink>
									<WrapIcon class="ml-auto">
										<HeaderCatalogMenuIconAng />
									</WrapIcon>
								</div>

								<ul v-if="levelMenu == 2 && group.isActive" class="grid gap-1">

									<li v-for="category in group.items">

										<!-- menu 3 -->
										<NuxtLink v-if="group.isActive"
											class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)"
											:to="categoryLink(category)">
											{{ category.name }}

											<WrapIcon class="ml-auto">
												<HeaderCatalogMenuIconAng />
											</WrapIcon>
										</NuxtLink>

									</li>

								</ul>

							</li>

						</ul>

					</li>

				</ul>

			</SectionContainer>
			<!-- CONTAINER MENU -->
		</div>
		<!-- WRAPPER -->

	</div>
	<!-- MODAL WINDOW CATALOG MENU -->

</template>


<style scoped>
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #c1c1c1 #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar {
	width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: #f1f1f1;
	border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #c1c1c1;
	border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #a8a8a8;
}

.custom-item:hover span {
	color: var(--Brand-700);
	transition: .1s;
}
</style>
