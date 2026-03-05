<script setup lang="ts">
interface Props {
  class?: string
}
const props = defineProps<Props>()
</script>


<template>

  <div :class="props.class"
    class="hidden lg:flex max-w-(--container) w-full m-auto px-4 overflow-clip justify-center items-center">

    <div
      class="w-full font-semibold leading-6 text-gray-600 flex flex-wrap self-stretch gap-x-5 gap-y-3 items-center">

      <div class="hidden border-zinc-300 xl:flex pr-4 self-stretch border-r border-solid">
        <div class="gap-2 leading-5 text-sm flex justify-center">

          <NuxtLink to="/stores"
            class="gap-1 flex items-center justify-center bg-green-100 hover:bg-[#AAF0CD] transition py-1 px-2.5 rounded-2xl">
            <WrapIcon class="w-3! h-3!">
              <HeaderIconStore />
            </WrapIcon>
            <span class="text-sm text-green-800"> Магазины </span>
          </NuxtLink>

          <NuxtLink to="/for-business"
            class="gap-1 flex items-center justify-center bg-yellow-50 hover:bg-[#EAE0BE] transition py-1 px-2.5 rounded-2xl">
            <WrapIcon class="w-3! h-3!">
              <HeaderIconSuitCase />
            </WrapIcon>
            <span class="test-sm text-yellow-800"> Юрлицам </span>
          </NuxtLink>
        </div>
      </div>

      <HeaderMenu />

    </div>

  </div>
</template>