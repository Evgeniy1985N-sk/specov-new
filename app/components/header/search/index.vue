<script setup lang="ts">

interface Item {
  id: string
  image: string
  title: string
  dsc: string
  link: string
  price?: number,
  oldPrice?: number,
  discont?: number,
}

interface Props {
  class?: string
  itemsPart?: Item[]
  itemsPart2?: Item[]
}

const props = defineProps<Props>()
const input = ref('')
const dropdown = ref<HTMLElement | null>(null)
const isShow = ref(false)

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
  (e: 'handleClick', value: string): void
}>()


</script>

<template>

  <div :class="props.class" @click="isShow = true" class="relative w-full flex items-center gap-2">

    <button v-if="isShow" @click="input = ''" class="sm:hidden">
      <WrapIcon>
        <HeaderIconArrowLeft />
      </WrapIcon>
    </button>

    <div ref="dropdown" class="w-full border-zinc-300 border border-solid rounded-lg bg-white">

      <form class="relative w-full py-[7px] sm:py-[9px] px-[11px] gap-2 flex justify-center items-center">
        <input v-model="input"
          class="line-clamp-1 w-full font-medium text-gray-500 overflow-ellipsis focus:outline-none"
          placeholder="Найти спецодежду или инструменты">
          <div class="flex items-center gap-2">
            <WrapIcon v-if="input" @click="input = ''" class="cursor-pointer">
              <HeaderIconCross />
            </WrapIcon>
            <span v-if="input" class="text-gray-200">|</span>
            <button class="h-5 w-5 cursor-pointer">
              <HeaderIconSearch />
            </button>
          </div>
      </form>

      <div v-if="isShow" class="absolute top-full left-0 mt-1.5 w-full p-4 rounded-xl bg-white isolate z-100 shadow">

        <NuxtLink v-for="item in itemsPart" :to="item.link"
          class="flex items-center gap-3 p-2 transition bg-white hover:bg-gray-100 rounded-lg cursor-pointer">
          <span class="flex items-cnter justify-center w-10 h-10 bg-white rounded-lg">
            <img class="object-contain" :src="item.image" :alt="item.title">
          </span>
          <div class="grid gap-1">
            <p class="text-sm leading-5 font-semibold text-gray-950">
              {{ item.title }}
            </p>
            <span>
              {{ item.dsc }}
            </span>
          </div>
        </NuxtLink>

        <div class="flex items-center justify-between mt-4 py-4 border-t border-gray-200 text-sm leading-5 font-medium">
          <p>
            Найденные товары
          </p>
          <NuxtLink class="text-(--Brand-700) cursor-pointer" to="/catalog">
            Показать всё
          </NuxtLink>
        </div>

        <div class="grid">
          <NuxtLink v-for="item in itemsPart2" :to="item.link"
            class="flex items-center gap-3 p-2 transition bg-white hover:bg-gray-100 rounded-lg cursor-pointer">
            <span class="flex items-cnter justify-center w-10 h-10 bg-white rounded-lg">
              <img class="object-contain" :src="item.image" :alt="item.title">
            </span>
            <div class="grid gap-1">
              <p class="text-sm leading-5 font-semibold text-gray-950">
                {{ item.title }}
              </p>
              <div class="flex gap-2 items-center">
                <div v-if="item.price" class="text-sm leading-5 text-gray-950 font-bold">
                  {{ item.price?.toLocaleString('ru-RU') }} ₽
                </div>
                <div v-if="item.oldPrice" class="text-zinc-400 line-through shrink-0">
                  {{ item.oldPrice?.toLocaleString('ru-RU') }} ₽
                </div>
                <div v-if="item.discont"
                  class="bg-[seagreen] leading-[22px] text-center text-white text-xs px-1.5 rounded-md">
                  -{{ item.discont }}%
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <NuxtLink
          class="sm:hidden flex items-center justify-center mt-4 p-2.5 text-sm leading-5 text-(--Brand-950) border border-gray-200 rounded-lg cursor-pointer"
          to="/catalog">
          Показать все товары
        </NuxtLink>

      </div>

    </div>

  </div>


</template>