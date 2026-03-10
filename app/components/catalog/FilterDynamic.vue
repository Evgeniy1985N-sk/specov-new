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
	<div class="grid gap-4">
		<template v-if="props.filter.data_type === 't_text'">
			<label
				v-for="item in props.filter.items"
				:key="item.hash"
				class="flex gap-2 items-center cursor-pointer"
			>
				<UCheckbox
					size="xl"
					:model-value="Boolean(props.modelValue?.[item.hash])"
					:disabled="Boolean(item.disabled)"
					@update:model-value="(v) => {
						const checked = v as boolean;
						emit('update:modelValue', {
							...(props.modelValue ?? {}),
							[item.hash]: checked,
						});
						emit('change', checked);
					}"
				/>
				<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
					{{ prefixedLabel(item.value) }}
				</span>
			</label>
		</template>

		<template v-else-if="props.filter.data_type === 't_list' && (props.filter.options as any)?.present_type === 'is_checkbox'">
			<label
				v-for="opt in getListOptions(props.filter)"
				:key="opt.id"
				class="flex gap-2 items-center cursor-pointer"
			>
				<UCheckbox
					size="xl"
					:model-value="Boolean(props.modelValue?.[opt.id])"
					:disabled="Boolean((opt as any).disabled ?? props.filter.disabled)"
					@update:model-value="(v) => {
						const checked = v as boolean;
						emit('update:modelValue', {
							...(props.modelValue ?? {}),
							[opt.id]: checked,
						});
						emit('change', checked);
					}"
				/>
				<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
					{{ prefixedLabel(opt.val) }}
				</span>
			</label>
		</template>

		<template v-else-if="props.filter.data_type === 't_bool'">
			<label class="flex gap-2 items-center cursor-pointer">
				<UCheckbox
					size="xl"
					:model-value="Boolean(props.modelValue)"
					:disabled="Boolean(props.filter.disabled)"
					@update:model-value="(v) => {
						const checked = v as boolean;
						emit('update:modelValue', checked);
						emit('change', checked);
					}"
				/>
				<span class="text-sm leading-5 text-gray-950 lowercase first-letter:capitalize">
					{{ props.filter.name }}
				</span>
			</label>
		</template>

		<template v-else-if="props.filter.data_type === 't_number'">
			<div class="flex gap-2">
				<UInput
					:model-value="props.modelValue?.min"
					type="number"
					:placeholder="`От ${formatDynNumVal(props.filter.items[0]?.min)}`"
					:disabled="props.numberDisabled"
					@update:model-value="(v) => {
						emit('update:modelValue', {
							min: v === '' ? undefined : Number(v),
							max: props.modelValue?.max,
						});
						emit('change', true);
					}"
				/>
				<UInput
					:model-value="props.modelValue?.max"
					type="number"
					:placeholder="`До ${formatDynNumVal(props.filter.items[0]?.max)}`"
					:disabled="props.numberDisabled"
					@update:model-value="(v) => {
						emit('update:modelValue', {
							min: props.modelValue?.min,
							max: v === '' ? undefined : Number(v),
						});
						emit('change', true);
					}"
				/>
			</div>
		</template>

		<template v-else-if="props.filter.data_type === 't_date'">
			<UInput
				:model-value="props.modelValue"
				type="date"
				:disabled="Boolean(props.filter.disabled)"
				@update:model-value="(v) => {
					emit('update:modelValue', v as string);
					emit('change', true);
				}"
			/>
		</template>
	</div>
</template>
