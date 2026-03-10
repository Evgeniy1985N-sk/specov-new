<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

interface Props {
	label: string;
	collapsible?: boolean;
	defaultOpen?: boolean;
	hidePlainLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	collapsible: true,
	defaultOpen: false,
	hidePlainLabel: false,
});

const items = computed<AccordionItem[]>(() => [
	{
		label: props.label,
		slot: 'content',
	},
]);
</script>

<template>
	<div v-if="!props.collapsible">
		<div
			v-if="!props.hidePlainLabel"
			class="mb-0 text-sm font-medium text-gray-950"
		>
			{{ props.label }}
		</div>

		<slot />
	</div>

	<UAccordion
		v-else
		:items="items"
		type="multiple"
		:default-value="props.defaultOpen ? ['0'] : []"
		:ui="{ root: 'lg:grid lg:gap-6', trigger: 'lg:p-0' }"
	>
		<template #content>
			<slot />
		</template>
	</UAccordion>
</template>
