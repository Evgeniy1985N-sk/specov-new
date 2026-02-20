<script setup lang="ts">
import Detail from '~/components/product/Detail.vue'
import { useProductApi } from '~/composables/api/useProductApi';

const { detailPage } = useProductApi();
const { picturePreview } = useProduct();

const route = useRoute()
const productSlug = route.params.slug as string;
const charSlug = route.params.charSlug as string | undefined;

const product = computed(() => {
  return data.value?.product;
});

//static product data, server cached
const { data, error } = await useAsyncData(
	`product-${productSlug}`,
  () => detailPage(productSlug),
  { server: true }
);

// Throw error if fetch fails
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Товар не найден'
  });
};

const productImg = computed(() => {
  return product.value?.pictures?.find(p => p.main) ?? undefined;
});

// useSeoMeta({
//   title: data.value?.product.name,
//   ogTitle: data.value?.product.name,
//   description: data.value?.product.description || data.value?.product.name,
//   ogDescription: data.value?.product.description || data.value?.product.name,
//   ogImage: productImg.value? picturePreview(productImg.value) : "",
// });
//
watch(product, (prod) => {
  if (!prod) return;

  useSeoMeta({
    title: prod.name,
    ogTitle: prod.name,
    description: prod.description || prod.name,
    ogDescription: prod.description || prod.name,
    ogImage: productImg.value ? picturePreview(productImg.value) : '',
  });
}, { immediate: true });
// const detailPageData = toRef(data, 'value');

</script>

<template>
	<Detail 
		v-if="data"
		:detail-page="data"
		:productSlug="productSlug"
		:product-img="productImg"
		:charSlug="charSlug"
	/>
</template>
