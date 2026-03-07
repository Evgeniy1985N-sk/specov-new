<script setup lang="ts">
interface Props {
	count?: number;
}

withDefaults(defineProps<Props>(), {
	count: 5,
});
</script>

<template>
	<div class="flex flex-col gap-3">
		<div
			v-for="i in count"
			:key="i"
			class="flex items-center justify-between rounded-lg px-4 py-3 bg-white lg:bg-gray-200/60 animate-pulse"
		>
			<div
				class="h-4 rounded bg-gray-300"
				:class="i === 1 ? 'w-3/4' : 'w-1/2'"
			/>
			<div class="h-5 w-10 rounded-full bg-gray-300" />
		</div>
	</div>
</template>
