<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

interface Props {
	goods: number;
	class?: string;
	top: number;	// desired Y in viewport coords (clientY)
	left: number;	// desired X in viewport coords (clientX or sidebar right edge)
}

const props = defineProps<Props>();

const rootEl = ref<HTMLElement | null>(null);

const viewportW = ref(0);
const viewportH = ref(0);

const syncViewport = () => {
	viewportW.value = window.innerWidth;
	viewportH.value = window.innerHeight;
};

onMounted(() => {
	syncViewport();
	window.addEventListener("resize", syncViewport);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", syncViewport);
});

const clampedTop = computed(() => {
	const h = rootEl.value?.offsetHeight ?? 0;
	const pad = 12;
	const min = pad + h / 2;
	const max = (viewportH.value || 0) - pad - h / 2;

	if (!viewportH.value) return props.top;

	return Math.min(max, Math.max(min, props.top));
});

const clampedLeft = computed(() => {
	const w = rootEl.value?.offsetWidth ?? 0;
	const pad = 12;
	const min = pad;
	const max = (viewportW.value || 0) - pad - w;

	if (!viewportW.value) return props.left;

	return Math.min(max, Math.max(min, props.left));
});
</script>

<template>
	<div
		ref="rootEl"
		:class="[
			props.class,
			'fixed z-[9999] inline-block min-w-[196px] pointer-events-auto'
		]"
		:style="{
			top: `${clampedTop}px`,
			left: `${clampedLeft}px`,
			transform: 'translateY(-50%)'
		}"
	>
		<div class="grid gap-4 popup-with-arrow bg-white border border-gray-200 rounded-xl shadow-xl p-4 max-w-xs">
			<p class="text-sm font-semibold text-center text-gray-950">
				Подобрано товаров: {{ props.goods }}
			</p>
			<UButton @click="$emit('handleClick')" class="shrink-0 gap-1 px-4 min-h-10">
				<span class="text-sm leading-5">Показать</span>
			</UButton>
		</div>
	</div>
</template>

<style scoped>
.popup-with-arrow::before {
	content: '';
	position: absolute;
	top: 50%;
	left: -7px;
	transform: translateY(-50%);
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 8px 8px 8px 0;
	border-color: transparent white transparent transparent;
	filter: drop-shadow(-2px 0 1px rgba(0, 0, 0, 0.05));
}
</style>
