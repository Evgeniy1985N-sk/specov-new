<script setup lang="ts">

const dropdown = ref<HTMLElement | null>(null)
const isShow = ref(false)
const value = ref('')

interface Item {
  label: string
  isActive: boolean
}
interface Props {
  class?: string
  items: Item[]
  label: string
}
const props = defineProps<Props>()

const handleClickOutside = (event: Event) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isShow.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const emit = defineEmits<{
  (e: 'handleClick', value: number): void
  (e: 'handleChange', value: string): void
}>()

function getIndexItem(index: number) {
  emit('handleClick', index)
}
function getValue(value: string) {
  emit('handleChange', value)
}

</script>

<template>

  <div ref="dropdown" :class="props.class" class="relative">


    <div @click="isShow = true" class="cursor-pointer">
      <UFormField class="w-full" :label="props.label" :ui="{ root: 'pointer-events-none', label: 'text-gray-700 font-medium' }">

        <UInput trailing-icon="i-lucide-chevron-down" @change="getValue(value)" @focus="isShow = true" v-model="value"
          placeholder="" color="neutral" size="xl" :ui="{ base: 'text-gray-950 font-bold' }" />

      </UFormField>
    </div>


    <div v-if="isShow"
      class="absolute top-full left-0 w-full min-w-[290px] rounded-xl bg-white isolate z-100 shadow-md">
      <ul class="grid gap-4 px-3.5 py-2.5">
        <li v-for="(item, i) in props.items" :key="i" @click="getIndexItem(i), isShow = false, value = item.label"
          class="cursor-pointer">
          <p class="text-gray-900 text-sm leading-5 font-medium">
            {{ item.label }}
          </p>
        </li>
      </ul>
    </div>

  </div>

</template>

<style scope></style>