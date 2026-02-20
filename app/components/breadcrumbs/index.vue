<script setup lang="ts">
import BreadcrumbsIconHome from '@/components/breadcrumbs/icon/Home.vue'
import { categoryLink } from "@/utils/categoryLink";

interface Props {
	categories?: {id: number, name: string, name_lat: string}[];
}
const props = defineProps<Props>();

interface TUIBreadcrumb {
	slot?: string;
	label?: string;
	to: string;
}

const items = computed(() => {
	const breadcrumbs: TUIBreadcrumb[] = [
		{ slot: 'home', to: '/' }
	];

	props.categories?.forEach((category) => {
		breadcrumbs.push({
			label: category.name,
			to: categoryLink(category),
		});
	});

	return breadcrumbs;
});

// const items = [
//   {
//     slot: 'home',
//     to: '/'
//   },
//   {
//     label: 'Инструмент',
//     to: '/'
//   },
//   {
//     label: 'Электроинструмент',
//     to: '/'
//   },
//   {
//     label: 'Перфораторы',
//     to: '/'
//   },
//   {
//     label: 'Электроперфораторы Makita',
//   },
// ]
</script>

<template>

	<div class="overflow-hidden">
		<div class="overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch">
			<SectionContainer>
				<UBreadcrumb :items="items" class="breadcrumb py-6 sm:py-8"
					:ui="{ item: 'min-w-max text-(--Brand-950)', link: 'text-gray-600 hover:text-(--Brand-700) font-bold', separatorIcon: 'text-300' }">
					<template #home>
						<div class="flex items center justify-center w-5 h-5">
							<BreadcrumbsIconHome />
						</div>
					</template>
				</UBreadcrumb>
			</SectionContainer>
		</div>
	</div>

</template>

<style scoped>
.breadcrumb :deep(li:last-child span) {
	color: var(--Brand-700);
}
</style>
