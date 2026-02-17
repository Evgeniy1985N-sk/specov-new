<script setup lang="ts">
//leave temporarilly
import Battery from '@/components/header/catalogMenu/icon/Battery.vue';
import { useProductCatApi } from '@/composables/api/useProductCatApi';
import { type ProductCatPublicList } from "@/types/productCat";
import { categoryLink } from "@/utils/categoryLink";

interface Props {
	isShow: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['hideCatalog'])
const levelMenu = ref(0)
const activeCategoryId = ref<number | null>(null);
const activeSubcategoryId = ref<number | null>(null);

// Fetch catalog from server
const { publicList } = useProductCatApi();
const { data: categories} = await useAsyncData(
	'productCat',
	() => publicList()
);

// Transform the fetched data into the format needed for the menu
const menu = computed(() => {
	if (!categories.value) return [];

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

onMounted(() => {
	const html = document.querySelector('html')
	if (html) {
		html.classList.remove('xl:overflow-hidden', 'xl:mr-[17px]')
	}
})

watch(() => props.isShow, (newVal) => {
	const html = document.querySelector('html')
	if (newVal) {
		if (html) {
			html.classList = 'xl:overflow-hidden xl:mr-[17px]'
		}
	} else {
		if (html) {
			html.classList.remove('xl:overflow-hidden', 'xl:mr-[17px]')
		}
	}

})

// interface Search {
//   showSearch: () => void
// }
// const { showSearch } = inject<Search>('search')!

</script>

<template>
	<div v-if="props.isShow"
		class="custom-scrollbar absolute h-[calc(100vh-128px)] inset-0 lg:top-32 z-100 lg:py-6 bg-white lg:border-t border-(--border) overflow-auto">

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

		<SectionContainer class="max-w-full lg:max-w-(--container) relative px-6 lg:px-4">

			<HeaderSearch class="mt-6 mb-6 lg:hidden" />

			<!-- desk menu -->
			<ul class="hidden lg:grid gap-1 lg:max-w-[280px]">

				<li v-for="item in menu" :key="item.id" @click="toggleActive(item.id)"
					:class="[item.isActive ? 'lg:bg-gray-100' : 'lg:relative z-1']"
					class="py-2.5 px-3.5 rounded-lg cursor-pointer">

					<div :class="[item.isActive ? 'lg:text-(--Brand-700)' : 'text-gray-600']"
						class="flex gap-1.5 items-center text-sm leading-5 font-bold hover:text-(--Brand-700)">
						<span class="flex items-center justify-center h-6 w-6">
							<component :is="item.icon" />
						</span>
						{{ item.name }}
					</div>

					<div v-if="item.isActive"
						class="lg:absolute top-0 left-0 px-4 pb-4 grid gap-8 grid-cols-[280px_1fr]">
						<ul class="grid gap-10 col-2">
							<li v-for="group in item.sub">

								<p class="mb-4 text-[20px] leading-[30px] text-gray-950 font-bold">
									{{ group.title }}
								</p>

								<ul class="columns-3 gap-x-8 gap-y-3">

									<li v-for="category in group.items" class="mb-3">
										<NuxtLink
											class="custom-item flex items-center justify-between gap-2 hover:text-(--Brand-700) text-gray-950 transition"
											:to="categoryLink(category)">
											<p class="w-full max-w-[190px] text-sm leading-5 font-medium">
												{{ category.name }}
											</p>
											<span class="shrink-0 text-sm leading-5 font-medium text-gray-600">
												{{ category.quantity }}
											</span>
											<WrapIcon class="w-9 h-9">
												<HeaderCatalogMenuIconAng />
											</WrapIcon>
										</NuxtLink>
									</li>

								</ul>

							</li>
						</ul>
					</div>

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

					<ul v-if="item.isActive" class="grid gap-1">

						<li v-for="group in item.sub" :key="group.id">

							<!-- menu 2 -->
							<div v-if="levelMenu == 1" @click="toggleSubMenu(item.id, group.id)"
								class="flex gap-1.5 items-center py-2.5 px-3.5 border-b border-(--border)">
								{{ group.title }}
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

	</div>
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
