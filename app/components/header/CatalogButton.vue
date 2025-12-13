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
    class="hidden lg:flex bg-[#C3974C] hover:bg-[#D3B579] transition gap-2 justify-center items-center py-2.5 px-4 rounded-lg cursor-pointer">
    <span v-if="!props.isActive" class="h-5 w-5">
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 20 20" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.99992 5.00001C10.4602 5.00001 10.8333 4.62691 10.8333 4.16668C10.8333 3.70644 10.4602 3.33334 9.99992 3.33334C9.53968 3.33334 9.16659 3.70644 9.16659 4.16668C9.16659 4.62691 9.53968 5.00001 9.99992 5.00001Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:14:4"></path>
        <path
          d="M9.99992 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53977 10.4602 9.16668 9.99992 9.16668C9.53968 9.16668 9.16659 9.53977 9.16659 10C9.16659 10.4602 9.53968 10.8333 9.99992 10.8333Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:21:4"></path>
        <path
          d="M9.99992 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 9.99992 15C9.53968 15 9.16659 15.3731 9.16659 15.8333C9.16659 16.2936 9.53968 16.6667 9.99992 16.6667Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:28:4"></path>
        <path
          d="M15.8333 5.00001C16.2935 5.00001 16.6666 4.62691 16.6666 4.16668C16.6666 3.70644 16.2935 3.33334 15.8333 3.33334C15.373 3.33334 14.9999 3.70644 14.9999 4.16668C14.9999 4.62691 15.373 5.00001 15.8333 5.00001Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:35:4"></path>
        <path
          d="M15.8333 10.8333C16.2935 10.8333 16.6666 10.4602 16.6666 10C16.6666 9.53977 16.2935 9.16668 15.8333 9.16668C15.373 9.16668 14.9999 9.53977 14.9999 10C14.9999 10.4602 15.373 10.8333 15.8333 10.8333Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:42:4"></path>
        <path
          d="M15.8333 16.6667C16.2935 16.6667 16.6666 16.2936 16.6666 15.8333C16.6666 15.3731 16.2935 15 15.8333 15C15.373 15 14.9999 15.3731 14.9999 15.8333C14.9999 16.2936 15.373 16.6667 15.8333 16.6667Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:49:4"></path>
        <path
          d="M4.16659 5.00001C4.62682 5.00001 4.99992 4.62691 4.99992 4.16668C4.99992 3.70644 4.62682 3.33334 4.16659 3.33334C3.70635 3.33334 3.33325 3.70644 3.33325 4.16668C3.33325 4.62691 3.70635 5.00001 4.16659 5.00001Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:56:4"></path>
        <path
          d="M4.16659 10.8333C4.62682 10.8333 4.99992 10.4602 4.99992 10C4.99992 9.53977 4.62682 9.16668 4.16659 9.16668C3.70635 9.16668 3.33325 9.53977 3.33325 10C3.33325 10.4602 3.70635 10.8333 4.16659 10.8333Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:63:4"></path>
        <path
          d="M4.16659 16.6667C4.62682 16.6667 4.99992 16.2936 4.99992 15.8333C4.99992 15.3731 4.62682 15 4.16659 15C3.70635 15 3.33325 15.3731 3.33325 15.8333C3.33325 16.2936 3.70635 16.6667 4.16659 16.6667Z"
          stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"
          data-v-inspector="src/components/assets/DotsGrid.vue:70:4"></path>
      </svg>
    </span>
    <span v-else class="flex items-center justify-center h-5 w-5">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8335 0.833344L0.833496 10.8333M0.833496 0.833344L10.8335 10.8333" stroke="white"
          stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <div class="font-semibold text-white">Каталог</div>
  </button>

</template>