<script setup lang="ts">
import IconPhone from './icon/Phone.vue';

const isModal = ref(false)
const dropdown = ref<HTMLElement | null>(null)

const handleClickOutside = (event: Event) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isModal.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

interface Props {
  phone: string
  phoneModal1: string
  phoneModal2: string
  classPhone?: string
}

const props = defineProps<Props>()

</script>

<template>
  <div class="min-[1430px]:flex-nowrap gap-2 flex flex-wrap items-center">
    <div class="h-5 w-5">
      <IconPhone />
    </div>
    <a :href="'tel:' + props.phone" :class="props.classPhone" class="text-gray-950 leading-5 text-sm">
      {{ props.phone }}
    </a>

    <div ref="dropdown"
      class="relative border-zinc-300 p-[3px] flex justify-center h-6 w-6 flex-col bg-white items-center border border-solid rounded-full">

      <button @click="isModal = !isModal" class="btn-dots flex items-center justify-center w-6 h-6 shrink-0 rounded-full cursor-pointer border border-gray-200 hover:bg-gray-300 transition">
        <i v-for="item in 3" class="flex items-center justify-center w-[3px] h-[3px] bg-gray-600 rounded-full"></i>
      </button>

      <!-- Modal -->
      <div v-if="isModal"
        class="absolute right-0 sm:right-auto sm:left-[calc(100%+12px)] bottom-6 sm:-bottom-2 grid gap-3 -mr-2 p-4 bg-white rounded-xl shadow-lg">
        <div class="flex justify-between items-center">
          <span class="font-medium">
            Телефоны
          </span>
          <WrapIcon @click="isModal = !isModal" class="w-9 h-9 -mr-[11px] cursor-pointer">
            <StoresIconCross />
          </WrapIcon>

        </div>
        <div class="grid gap-4">
          <a class="text-lg leading-7 font-bold text-gray-950 whitespace-nowrap" :href="'tel:' + props.phoneModal1">
            {{ props.phoneModal1 }}
          </a>
          <a class="text-lg leading-7 font-bold text-gray-950 whitespace-nowrap" :href="'tel:' + props.phoneModal2">
            {{ props.phoneModal2 }}
          </a>
        </div>
      </div>
      <!-- Modal -->

    </div>

  </div>
</template>

<style scoped>
.btn-dots {
  gap: 1px;
}
.btn-dots:hover i {
  background: #097350;
}
.btn-dots i:after {
  content: '';
  flex-shrink: 0;
  width: .6px;
  height: .6px;
  background: white;
  border-radius: 50%;
}
</style>