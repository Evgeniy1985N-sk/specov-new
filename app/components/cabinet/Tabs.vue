<script setup lang="ts">
interface Tab {
  id: string
  label: string
}

interface Props {
  tabs: Tab[]
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="flex gap-1 bg-(--Base-White) p-1 rounded-lg w-fit max-[510px]:w-full">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="activeTab = tab.id"
      :class="[
        'px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors max-[510px]:w-full',
        activeTab === tab.id
          ? 'bg-(--Background) text-(--Brand-700)'
          : 'bg-(--Base-White) text-(--Text-600)'
      ]"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

