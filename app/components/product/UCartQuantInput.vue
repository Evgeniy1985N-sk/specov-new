<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

type ButtonProps = false | Record<string, unknown>;
type UiProps = Record<string, unknown>;

type USize = "xl" | "xs" | "sm" | "md" | "lg" | undefined;
type UColor = "neutral" | "primary" | "secondary" | "success" | "info" | "warning" | "error" | undefined;

interface Props {
	modelValue?: number | null;
	min?: number;
	max?: number;
	step?: number;
	size?: USize;
	color?: UColor;
	ui?: UiProps;
	increment?: ButtonProps;
	decrement?: ButtonProps;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	min: undefined,
	max: undefined,
	step: 1,
	size: "md",
	color: "neutral",
	ui: () => ({}),
	increment: () => ({
		color: "neutral",
		size: "md",
		variant: "ghost",
	}),
	decrement: () => ({
		color: "neutral",
		size: "md",
		variant: "ghost",
	}),
	disabled: false,
});

const emit = defineEmits<{
	"update:modelValue": [value: number | null];
}>();

const inputNumberRef = ref<{
	inputRef?: HTMLInputElement;
} | null>(null);

let attachedInput: HTMLInputElement | null = null;

let inputDebounceTimer: ReturnType<typeof setTimeout> | null = null;

const emitDebouncedModelValue = (value: number): void => {
	if (inputDebounceTimer) {
		clearTimeout(inputDebounceTimer);
	}

	inputDebounceTimer = setTimeout(() => {
		emit("update:modelValue", value);
	}, 300);
};

const onNativeInput = (event: Event): void => {
	const target = event.target as HTMLInputElement;
	const raw = target.value.trim();

	if (raw === "") {
		return;
	}

	if (!/^-?\d+$/.test(raw)) {
		return;
	}

	const parsed = Number(raw);

	if (!Number.isSafeInteger(parsed)) {
		return;
	}

	emitDebouncedModelValue(parsed);
};

const detachNativeListener = (): void => {
	if (!attachedInput) {
		return;
	}

	attachedInput.removeEventListener("input", onNativeInput);
	attachedInput = null;
};

const attachNativeListener = async (): Promise<void> => {
	await nextTick();

	const inputEl = inputNumberRef.value?.inputRef;

	if (!inputEl) {
		return;
	}

	if (attachedInput === inputEl) {
		return;
	}

	detachNativeListener();
	inputEl.addEventListener("input", onNativeInput);
	attachedInput = inputEl;
};

const onModelUpdate = (value: number | null): void => {
	emit("update:modelValue", value);
};

onMounted(async () => {
	await attachNativeListener();
});

watch(
	() => [
		props.size,
		props.color,
		props.disabled,
		props.increment,
		props.decrement,
		props.ui,
	],
	async () => {
		await attachNativeListener();
	},
	{ deep: true },
);

onBeforeUnmount(() => {
	detachNativeListener();
	if (inputDebounceTimer) {
		clearTimeout(inputDebounceTimer);
	}
});
</script>

<template>
	<UInputNumber
		ref="inputNumberRef"
		:model-value="modelValue"
		:min="min"
		:max="max"
		:step="step"
		:size="size"
		:color="color"
		:ui="ui"
		:increment="increment"
		:decrement="decrement"
		:disabled="disabled"
		@update:model-value="onModelUpdate"
	/>
</template>
