<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface RangeSliderProps {
  minValue?: number
  maxValue?: number
  minRange?: number
  maxRange?: number
  step?: number
}

const props = withDefaults(defineProps<RangeSliderProps>(), {
  minValue: 10,
  maxValue: 100,
  minRange: 10,
  maxRange: 100,
  step: 5
})

const emit = defineEmits<{
  'update:minValue': [value: number]
  'update:maxValue': [value: number]
  'change': [min: number, max: number]
}>()

// Реактивные значения
const min = ref(props.minValue)
const max = ref(props.maxValue)

// Следим за изменением props
watch(
  () => [props.minValue, props.maxValue],
  ([newMin, newMax]) => {
    if (newMin !== undefined && newMin <= max.value) {
      min.value = newMin
    }
    if (newMax !== undefined && newMax >= min.value) {
      max.value = newMax
    }
  },
  { immediate: true }
)

// Вычисляем позиции в процентах
const calcLeftPosition = (value: number) => {
  return 100 / (props.maxRange - props.minRange) * (value - props.minRange)
}

// Вычисляемые свойства для позиций
const thumbMinPosition = computed(() => `${calcLeftPosition(min.value)}%`)
const thumbMaxPosition = computed(() => `${calcLeftPosition(max.value)}%`)

// Стили для линии между ползунками
const lineStyle = computed(() => ({
  left: `${calcLeftPosition(min.value)}%`,
  right: `${100 - calcLeftPosition(max.value)}%`
}))

// Обработчики изменений
const handleMinChange = (e: Event) => {
  const newValue = parseInt((e.target as HTMLInputElement).value)
  
  if (newValue > max.value) return
  
  min.value = newValue
  emit('update:minValue', newValue)
  emit('change', min.value, max.value)
}

const handleMaxChange = (e: Event) => {
  const newValue = parseInt((e.target as HTMLInputElement).value)
  
  if (newValue < min.value) return
  
  max.value = newValue
  emit('update:maxValue', newValue)
  emit('change', min.value, max.value)
}
</script>

<template>
  <div>
    <div class="range-slide">
      <div class="slide">
        <div class="line" :style="lineStyle"></div>
        <span class="thumb" :style="{ left: thumbMinPosition }"></span>
        <span class="thumb" :style="{ left: thumbMaxPosition }"></span>
      </div>
      <input 
        id="rangeMin" 
        type="range" 
        :max="maxRange" 
        :min="minRange" 
        :step="step" 
        :value="min"
        @input="handleMinChange"
      >
      <input 
        id="rangeMax" 
        type="range" 
        :max="maxRange" 
        :min="minRange" 
        :step="step" 
        :value="max"
        @input="handleMaxChange"
      >
    </div>
  </div>
</template>

<style scoped>
.range-slide {
  position: relative;
  margin: 20px 0;
  height: 4px;
}

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
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background-color: var(--Brand-600);
  transition: left 0.1s, right 0.1s;
}

.thumb {
  position: absolute;
  z-index: 2;
  text-align: left;
  border: 2px solid var(--Brand-600);
  background-color: #fff;
  border-radius: 50%;
  outline: none;
  top: -7px;
  height: 18px;
  width: 18px;
  margin-left: -9px;
  transition: left 0.1s;
}

input {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  pointer-events: none;
  z-index: 3;
  height: 3px;
  top: 0;
  width: 100%;
  opacity: 0;
  margin: 0;
}

input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: all;
  border-radius: 50%;
  cursor: pointer;
  width: 18px;
  height: 18px;
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