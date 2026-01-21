<script setup lang="ts">
interface Category {
  category: string
  count: number
  isActive: boolean
}
interface Props {
  items?: Category[]
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'handleClick', index: number): void,
  (e: 'clickOnCross'): void,
}>()

</script>

<template>
  <!-- TABS -->
  <div class="grid gap-6">

    <div class="flex gap-1 w-fit bg-gray-100 p-1 rounded-lg">

      <div v-for="(item, i) in props.items" :key="item.category" :class="{ 'bg-white': item.isActive }"
        class="flex items-center gap-4 h-10 px-4 cursor-pointer transition rounded-lg">

        <div class="flex items-center gap-2">
          <button @click="$emit('handleClick', i)" :class="item.isActive ? ' text-gray-950' : ' text-gray-600'"
            class="py-2.5 text-sm leading-5 text-left font-semibold cursor-pointer">
            {{ item.category }}
            {{ item.count }}
          </button>
          <button v-if="item.isActive" @click="$emit('clickOnCross')" class="py-2.5 cursor-pointer">
            <WrapIcon>
              <CompareIconCross />
            </WrapIcon>
          </button>
        </div>

      </div>

    </div>

  </div>
  <!-- TABS -->
</template>