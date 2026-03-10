<script setup lang="ts">
interface CheckboxListItem {
	id: number | string;
	label: string;
	disabled?: boolean;
}

interface Props {
	items: CheckboxListItem[];
	modelValue: Array<number | string>;
	limit?: number;
	hiddenByDefault?: boolean;
	lowercaseFirstLetter?: boolean;
	singleLabelPrefix?: string;
	buttonClass?: string;
	wrapperClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
	limit: 5,
	hiddenByDefault: true,
	lowercaseFirstLetter: false,
	singleLabelPrefix: '',
	buttonClass: 'mt-3 text-[12px] leading-[18px] font-medium text-(--Brand-700)',
	wrapperClass: 'grid gap-4',
});

const emit = defineEmits<{
	toggle: [payload: { id: number | string; checked: boolean }];
}>();

const isHidden = ref(props.hiddenByDefault);

const visibleItems = computed(() => {
	if (!isHidden.value) {
		return props.items;
	}

	return props.items.slice(0, props.limit);
});

const shouldShowToggle = computed(() => props.items.length > props.limit);

const isChecked = (id: number | string): boolean => {
	return props.modelValue.includes(id);
};

const getLabel = (label: string): string => {
	if (props.singleLabelPrefix && props.items.length === 1) {
		return `${props.singleLabelPrefix}: ${label}`;
	}

	return label;
};
</script>

<template>
	<div :class="props.wrapperClass">
		<label
			v-for="item in visibleItems"
			:key="item.id"
			class="gap-2 items-center cursor-pointer"
			:class="[
				(item.disabled ? 'opacity-40 pointer-events-none' : ''),
				'flex'
			]"
		>
			<UCheckbox
				size="xl"
				:model-value="isChecked(item.id)"
				:disabled="Boolean(item.disabled)"
				@update:model-value="emit('toggle', { id: item.id, checked: $event as boolean })"
			/>
			<span
				class="text-sm leading-5 text-gray-950"
				:class="props.lowercaseFirstLetter ? 'lowercase first-letter:capitalize' : ''"
			>
				{{ getLabel(item.label) }}
			</span>
		</label>
	</div>

	<button
		v-if="shouldShowToggle"
		:class="props.buttonClass"
		@click="isHidden = !isHidden"
	>
		{{ isHidden ? 'Показать еще' : 'Скрыть' }}
	</button>
</template>
