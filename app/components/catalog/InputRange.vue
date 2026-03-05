<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface RangeSliderProps {
	disabled?: boolean;
	minValue?: number;
	maxValue?: number;
	minRange?: number;
	maxRange?: number;
	step?: number;
}

const props = withDefaults(defineProps<RangeSliderProps>(), {
	disabled: false,
	minRange: 10,
	maxRange: 100,
	step: 5,
});

const emit = defineEmits<{
	"update:minValue": [value: number];
	"update:maxValue": [value: number];
	"change": [min: number, max: number];
}>();

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

const min = ref<number>(props.minValue ?? props.minRange);
const max = ref<number>(props.maxValue ?? props.maxRange);

watch(
	() => [props.minValue, props.maxValue, props.minRange, props.maxRange],
	() => {
		const lo = props.minRange;
		const hi = props.maxRange;

		if (hi <= lo) {
			min.value = lo;
			max.value = lo;
			return;
		}

		const nextMin = props.minValue === undefined ? lo : clamp(props.minValue, lo, hi);
		const nextMax = props.maxValue === undefined ? hi : clamp(props.maxValue, lo, hi);

		min.value = Math.min(nextMin, nextMax);
		max.value = Math.max(nextMin, nextMax);
	},
	{ immediate: true },
);

const span = computed(() => Math.max(1, props.maxRange - props.minRange));

const toPercent = (value: number): number => {
	const v = clamp(value, props.minRange, props.maxRange);
	return ((v - props.minRange) / span.value) * 100;
};

const thumbMinPosition = computed(() => `${toPercent(min.value)}%`);
const thumbMaxPosition = computed(() => `${toPercent(max.value)}%`);

const lineStyle = computed(() => ({
	left: `${toPercent(min.value)}%`,
	right: `${100 - toPercent(max.value)}%`,
}));

// Important when thumbs overlap: bring the active one on top.
const minInputZ = computed(() => (min.value >= max.value - props.step ? 6 : 4));
const maxInputZ = computed(() => (min.value >= max.value - props.step ? 5 : 6));

const handleMinChange = (e: Event): void => {
	const next = clamp(Number((e.target as HTMLInputElement).value), props.minRange, props.maxRange);
	if (next > max.value) return;

	min.value = next;
	emit("update:minValue", next);
	emit("change", min.value, max.value);
};

const handleMaxChange = (e: Event): void => {
	const next = clamp(Number((e.target as HTMLInputElement).value), props.minRange, props.maxRange);
	if (next < min.value) return;

	max.value = next;
	emit("update:maxValue", next);
	emit("change", min.value, max.value);
};
</script>

<template>
	<div class="range-slide">
		<div class="slide">
			<div class="line" :style="lineStyle"></div>
			<span class="thumb" :style="{ left: thumbMinPosition }"></span>
			<span class="thumb" :style="{ left: thumbMaxPosition }"></span>
		</div>

		<input
			id="rangeMin"
			type="range"
			:min="minRange"
			:max="maxRange"
			:step="step"
			:value="min"
			:disabled="disabled"
			:style="{ zIndex: minInputZ }"
			@input="handleMinChange"
		/>

		<input
			id="rangeMax"
			type="range"
			:min="minRange"
			:max="maxRange"
			:step="step"
			:value="max"
			:disabled="disabled"
			:style="{ zIndex: maxInputZ }"
			@input="handleMaxChange"
		/>
	</div>
</template>

<style scoped>
.range-slide {
	position: relative;
	margin: 20px 0;
	height: 4px;
}

/* Your visible track */
.slide {
	position: absolute;
	top: 0;
	height: 2px;
	background: #ccc;
	left: 9px;
	right: 9px;
}

.line {
	position: absolute;
	top: 0;
	height: 2px;
	background-color: var(--Brand-600);
	transition: left 0.1s, right 0.1s;
}

.thumb {
	position: absolute;
	z-index: 2;
	border: 2px solid var(--Brand-600);
	background-color: #fff;
	border-radius: 50%;
	top: -7px;
	height: 18px;
	width: 18px;
	margin-left: -9px;
	transition: left 0.1s;
}

/* Hidden native slider, but thumbs are still draggable */
input {
	-webkit-appearance: none;
	appearance: none;
	position: absolute;
	left: 9px;
	right: 9px;
	top: 0;
	height: 3px;
	margin: 0;
	background: transparent;
	outline: none;

	/* IMPORTANT: we hide the native track, not your .slide */
	opacity: 0;
	/*pointer-events: none;*/
	z-index: 3;
}

/* Make native tracks fully transparent (prevents "second bar") */
input::-webkit-slider-runnable-track {
	background: transparent;
	border: none;
	height: 3px;
}

input::-moz-range-track {
	background: transparent;
	border: none;
	height: 3px;
}

input::-moz-range-progress {
	background: transparent;
}

/* Keep thumbs interactive even though input itself is not */
input::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	pointer-events: all;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	cursor: pointer;
}

input::-moz-range-thumb {
	border: none;
	border-radius: 50%;
	pointer-events: all;
	cursor: pointer;
	width: 18px;
	height: 18px;
}
</style>
