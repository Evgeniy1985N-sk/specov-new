<script setup lang="ts">
import type {
	CategoryFilter,
	CategoryFilterListOption,
} from '@/types/categoryFilter';

interface Props {
	filter: CategoryFilter;
	modelValue: any;
	inlineSingleLabel?: boolean;
	numberDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	inlineSingleLabel: false,
	numberDisabled: false,
});

const emit = defineEmits<{
	'update:modelValue': [value: any];
	change: [checked: boolean];
}>();

const getListOptions = (filter: CategoryFilter): CategoryFilterListOption[] => {
	const opts = (filter.options as any)?.values;
	return Array.isArray(opts) ? opts : [];
};

const formatDynNumVal = (val?: number): string => {
	return val !== undefined ? val.toString() : '';
};

const prefixedLabel = (value: string): string => {
	if (props.inlineSingleLabel) {
		return `${props.filter.name}: ${value}`;
	}

	return value;
};
</script>

<template>
	<!-- FILTER DYNAMICS -->
	<div class="lg:grid lg:gap-6">
		<template v-if="props.filter.data_type === 't_text'">
			<div class="custom-scrollbar mt-4 lg:overflow-auto lg:max-h-[244px] grid lg:grid-cols-1 gap-4">
				<label v-for="item in props.filter.items" :key="item.hash" class="flex gap-2 items-center cursor-pointer">
					<UCheckbox size="xl" :model-value="Boolean(props.modelValue?.[item.hash])" :disabled="Boolean(item.disabled)"
						@update:model-value="(v) => {
							const checked = v as boolean;
							emit('update:modelValue', {
								...(props.modelValue ?? {}),
								[item.hash]: checked,
							});
							emit('change', checked);
						}" />
					<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
						{{ prefixedLabel(item.value) }}
					</span>
				</label>
			</div>
		</template>

		<template
			v-else-if="props.filter.data_type === 't_list' && (props.filter.options as any)?.present_type === 'is_checkbox'">
			<div class="custom-scrollbar pt-4 lg:overflow-auto lg:max-h-[244px] flex flex-wrap lg:grid lg:grid-cols-1 gap-4">
				<label v-for="opt in getListOptions(props.filter)" :key="opt.id" class="flex gap-2 items-center cursor-pointer">
					<UCheckbox size="xl" :model-value="Boolean(props.modelValue?.[opt.id])"
						:disabled="Boolean((opt as any).disabled ?? props.filter.disabled)" @update:model-value="(v) => {
							const checked = v as boolean;
							emit('update:modelValue', {
								...(props.modelValue ?? {}),
								[opt.id]: checked,
							});
							emit('change', checked);
						}" />
					<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
						{{ prefixedLabel(opt.val) }}
					</span>
				</label>
			</div>
		</template>

		<template v-else-if="props.filter.data_type === 't_bool'">
			<label class="flex gap-2 items-center cursor-pointer">
				<UCheckbox size="xl" :model-value="Boolean(props.modelValue)" :disabled="Boolean(props.filter.disabled)"
					@update:model-value="(v) => {
						const checked = v as boolean;
						emit('update:modelValue', checked);
						emit('change', checked);
					}" />
				<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
					{{ props.filter.name }}
				</span>
			</label>
		</template>

		<template v-else-if="props.filter.data_type === 't_number'">
			<div class="flex gap-2">
				<UInput :model-value="props.modelValue?.min" type="number"
					:placeholder="`От ${formatDynNumVal(props.filter.items[0]?.min)}`" :disabled="props.numberDisabled"
					@update:model-value="(v) => {
						emit('update:modelValue', {
							min: v === '' ? undefined : Number(v),
							max: props.modelValue?.max,
						});
						emit('change', true);
					}" />
				<UInput :model-value="props.modelValue?.max" type="number"
					:placeholder="`До ${formatDynNumVal(props.filter.items[0]?.max)}`" :disabled="props.numberDisabled"
					@update:model-value="(v) => {
						emit('update:modelValue', {
							min: props.modelValue?.min,
							max: v === '' ? undefined : Number(v),
						});
						emit('change', true);
					}" />
			</div>
		</template>

		<template v-else-if="props.filter.data_type === 't_date'">
			<UInput :model-value="props.modelValue" type="date" :disabled="Boolean(props.filter.disabled)"
				@update:model-value="(v) => {
					emit('update:modelValue', v as string);
					emit('change', true);
				}" />
		</template>
	</div>
	<!-- FILTER DYNAMICS -->

</template>

<style>
@media (min-width: 1024px) {
	:deep(div[data-slot="content"])>div {
		gap: 12px;
		padding-top: 16px;
	}
}
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #0C8F61 #D5D7DA;
}

.custom-scrollbar::-webkit-scrollbar {
	width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: #D5D7DA;
	border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #0C8F61;
	border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #0C8F61;
}
</style>