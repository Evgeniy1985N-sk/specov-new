<script setup lang="ts">
const cabinetStore = useCabinetStore()
</script>

<template>
  <Header />

  <main class="pt-8 pb-23 bg-gray-100">
    <div class="max-w-(--container) mx-auto px-4 min-[510px]:px-8 xl:px-0">
      <div class="flex gap-8 min-[1280px]:mx-4.5">
        <div class="hidden xl:block">
          <Sidebar />
        </div>

        <div class="flex-1 flex flex-col gap-4 min-[510px]:gap-6">
          <CabinetPageHeader title="Скидки" back-to="/cabinet-individual/navigation" />

          <div class="grid grid-cols-1 min-[510px]:grid-cols-2 gap-2">
            <DiscountCard v-for="(discount, index) in cabinetStore.discountsWithIcons" :key="index"
              :discount="discount" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
