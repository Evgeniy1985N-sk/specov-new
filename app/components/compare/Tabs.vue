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
  <div class="grid gap-6 max-w-available custom-scrollbar w-fit overflow-auto rounded-xl hide-scrollbar">

    <div class="flex gap-1 w-fit bg-gray-100 p-1">

      <div v-for="(item, i) in props.items" :key="item.category" :class="{ 'bg-white': item.isActive }"
        class="flex items-center gap-4 sm:h-10 px-4 cursor-pointer transition  rounded-xl">

        <div class="flex items-center gap-2">
          <button @click="$emit('handleClick', i)" :class="item.isActive ? ' text-gray-950' : ' text-gray-600'"
            class="py-1.5 sm:py-2.5 text-[12px] leading-[18px] sm:text-sm sm:leading-5 text-left font-semibold cursor-pointer whitespace-nowrap capitalize">
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

<style scoped>
.max-w-available {
  max-width: -webkit-fill-available;
  max-width: -moz-available;
  max-width: stretch;
}

@media (max-width: 1024px) {
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
}

@media (min-width: 1025px) {
  .custom-scrollbar {
    scrollbar-width: thin;
    /* Firefox */
    scrollbar-color: #888 transparent;
    /* thumb / track */
  }

  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
    /* для горизонтального */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>