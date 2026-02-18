<script setup lang="ts">

import { useProductCatApi } from '~/composables/api/useProductCatApi';
import Category from '~/components/catalog/Category.vue'
import { type CategoryCatalogParams } from '~/types/productCat';

const route = useRoute()

const { catalog } = useProductCatApi();
const { mainCategories } = useProductCatApi()

const { data, error } = await useAsyncData(
	() => {
		// Extract parameters inside the key function
		const catSlug = parseInt(route.params.slug as string, 10);
		const count = Number(route.query.count) || 40;
		const from = Number(route.query.count) || 0;

		return `category-${catSlug}-${from}-${count}-${JSON.stringify(route.query)}`;
	},
	async () => {
		const catSlug = parseInt(route.params.slug as string, 10);
		const from = Number(route.query.from) || 0;
		const count = Number(route.query.count) || 20;

		const apiParams = <CategoryCatalogParams>{
			from,
			count,
			...route.query,
		};

		const [pageData, mainCats] = await Promise.all([
			catalog(catSlug, apiParams),
			mainCategories(),
		]);

		return {
			pageData,
			mainCats
		}
	},
	{ 
		server: true, 
		watch: [
		  () => route.params.slug,
		  () => route.query
		]
	}
);

// Throw error if fetch fails
if (error.value) {
	const errorDetails = error.value as any;

	// Extract status code from error response
	let statusCode = 500;
	let statusMessage = 'Произошла ошибка при загрузке категории';

	if (errorDetails?.statusCode) {
		statusCode = errorDetails.statusCode;
	} else if (errorDetails?.response?.status) {
		statusCode = errorDetails.response.status;
	} else if (errorDetails?.status) {
		statusCode = errorDetails.status;
	}

	// Customize messages based on status code
	switch (statusCode) {
		case 400:
			statusMessage = 'Некорректный запрос';
			break;
		case 401:
			statusMessage = 'Требуется авторизация';
			break;
		case 403:
			statusMessage = 'Доступ запрещен';
			break;
		case 404:
			statusMessage = 'Категория не найдена';
			break;
		case 500:
			statusMessage = 'Внутренняя ошибка сервера';
			break;
		case 502:
		case 503:
		case 504:
			statusMessage = 'Сервис временно недоступен';
			break;
		default:
			if (statusCode >= 400 && statusCode < 500) {
				statusMessage = 'Ошибка клиента';
			} else if (statusCode >= 500) {
				statusMessage = 'Ошибка сервера';
			}
	}

	const catSlug = parseInt(route.params.slug as string, 10);
	// Log error for debugging
	console.error('Category page error:', {
		statusCode,
		message: errorDetails?.message || 'Unknown error',
		url: route.fullPath,
		catSlug,
	});

	// Throw the error with appropriate status
	throw createError({
		statusCode,
		statusMessage,
		// Pass original error details if needed
		data: {
			originalError: errorDetails?.message,
			slug: catSlug
		},
	});
}

const curCategory = computed(() => {
	return data.value?.pageData.category;
});

const { picturePreview } = useCategory();

//header
provide('mainCatsData', data.value?.mainCats );

watch(curCategory, (cat) => {
	if (!cat) return;

	useSeoMeta({
		title: cat.name,
		ogTitle: cat.name,
		description: cat.description || cat.name,
		ogDescription: cat.description || cat.name,
		ogImage: cat.picture ? picturePreview(cat.picture) : '',
	});
}, { immediate: true });

</script>

<template>
	<Category v-if="data?.pageData.category" :data="data.pageData" />
</template>
