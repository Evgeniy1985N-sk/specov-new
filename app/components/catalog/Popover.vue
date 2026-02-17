<script setup lang="ts">
interface Props {
	goods: number
	class?: string
	top: number;
}
const props = defineProps<Props>()

const emit = defineEmits<{
	handleClick: []
}>();

</script>



<template>
	<div 
		:class="[
			props.class,
			'absolute left-4 sm:left-full z-10 inline-block min-w-[196px]'
		]"
		:style="{ top: `${props.top}px` }"
	>

		<div class="grid gap-4 popup-with-arrow bg-white border border-gray-200 rounded-xl shadow-xl p-4 max-w-xs">
			<p class="text-sm font-semibold text-center text-gray-950">Подобрано товаров: {{ props.goods }}</p>
			<UButton @click="$emit('handleClick')" class="shrink-0 gap-1 px-4 min-h-10">
				<span class="text-sm leading-5">
					Показать
				</span>
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
