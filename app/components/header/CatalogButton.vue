<script setup lang="ts">

interface Props {
  isActive: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['toggle-catalog'])

</script>

<template>
  <!-- catalog -->
  <button @click="$emit('toggle-catalog')"
    class="hidden lg:flex bg-[#C3974C] hover:bg-[#D3B579] text-white transition gap-2 justify-center items-center py-2.5 px-4 rounded-lg cursor-pointer">
    <span v-if="!props.isActive" class="h-5 w-5">
      <HeaderIconDots />
    </span>
    <span v-else class="flex items-center justify-center h-5 w-5">
      <HeaderIconCross />
    </span>
    <div class="font-semibold">Каталог</div>
  </button>

</template>