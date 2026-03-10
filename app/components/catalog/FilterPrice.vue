<script setup lang="ts">
interface Props {
	modelMin?: number;
	modelMax?: number;
	currentMin: number;
	currentMax: number;
	absoluteMin: number;
	absoluteMax: number;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelMin: undefined,
	modelMax: undefined,
	disabled: false,
});

const emit = defineEmits<{
	'update:modelMin': [value: number | undefined];
	'update:modelMax': [value: number | undefined];
	'change': [];
}>();

const formatPrice = (price?: number): string => {
	return price !== undefined ? String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';
};

const minProxy = computed({
	get: (): string => {
		return formatPrice(props.modelMin);
	},
	set: (val: string): void => {
		const clean = val.replace(/\D/g, '');
		emit('update:modelMin', clean ? Number(clean) : undefined);
	},
});

const maxProxy = computed({
	get: (): string => {
		return formatPrice(props.modelMax);
	},
	set: (val: string): void => {
		const clean = val.replace(/\D/g, '');
		emit('update:modelMax', clean ? Number(clean) : undefined);
	},
});

const onInputChange = (): void => {
	emit('change');
};

const clearMin = (): void => {
	minProxy.value = '';
	emit('change');
};

const clearMax = (): void => {
	maxProxy.value = '';
	emit('change');
};
</script>

<template>
	<div class="grid gap-4 mt-4">
		<div class="flex gap-2">
			<UInput
				v-model="minProxy"
				color="neutral"
				:disabled="props.disabled"
				:placeholder="`от ${formatPrice(props.absoluteMin)}`"
				:ui="{ base: 'font-medium text-gray-950 ring-gray-900', trailing: 'pe-1' }"
				@update:model-value="onInputChange"
			>
				<template v-if="minProxy.length" #trailing>
					<UButton
						color="neutral"
						variant="link"
						size="sm"
						icon="i-lucide-x"
						aria-label="Clear input"
						class="text-gray-500 hover:text-gray-600"
						@click="clearMin"
					/>
				</template>
			</UInput>

			<UInput
				v-model="maxProxy"
				color="neutral"
				:disabled="props.disabled"
				:placeholder="`до ${formatPrice(props.absoluteMax)}`"
				:ui="{ base: 'font-medium text-gray-950', trailing: 'pe-1' }"
				@update:model-value="onInputChange"
			>
				<template v-if="maxProxy.length" #trailing>
					<UButton
						color="neutral"
						variant="link"
						size="sm"
						icon="i-lucide-x"
						aria-label="Clear input"
						class="text-gray-500 hover:text-gray-600"
						@click="clearMax"
					/>
				</template>
			</UInput>
		</div>

		<CatalogInputRange
			:disabled="props.disabled"
			:min-range="props.absoluteMin"
			:max-range="props.absoluteMax"
			:min-value="props.modelMin"
			:max-value="props.modelMax"
			@update:min-value="emit('update:modelMin', $event)"
			@update:max-value="emit('update:modelMax', $event)"
			@change="emit('change')"
		/>
	</div>
</template>

