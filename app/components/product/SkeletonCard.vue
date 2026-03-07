<script setup lang="ts">

interface Props {
	isList: boolean;
	skeletonCount: number;
}
const props = defineProps<Props>();
	
const skeletonItems = computed(() => Array.from({ length: props.skeletonCount }));

</script>

<template>
	<div
		:class="isList ? 'grid-cols-1 gap-8 pt-6 border-t border-gray-300' : 'grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6'"
		class="grid lg:gap-8"
	>
		<div
			v-for="(_, i) in skeletonItems"
			:key="`sk-${i}`"
			:class="isList ? 'flex gap-4' : 'grid gap-3'"
			class="animate-pulse bg-white rounded-xl border border-gray-200 p-3"
		>
			<!-- Image -->
			<div
				:class="isList ? 'w-[140px] h-[140px] shrink-0' : 'w-full aspect-square'"
				class="rounded-lg bg-gray-200"
			></div>

			<!-- Text blocks -->
			<div class="flex-1 grid gap-2">
				<div class="h-4 w-3/4 rounded bg-gray-200"></div>
				<div class="h-4 w-2/3 rounded bg-gray-200"></div>
				<div class="h-3 w-1/2 rounded bg-gray-200 mt-1"></div>

				<div class="flex items-center justify-between mt-3">
					<div class="h-6 w-24 rounded bg-gray-200"></div>
					<div class="h-10 w-28 rounded-lg bg-gray-200"></div>
				</div>
			</div>
		</div>
	</div>
</template>

