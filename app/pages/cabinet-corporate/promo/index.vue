<script setup lang="ts">
const cabinetStore = useCabinetStore()

const copyPromocode = (code: string) => {
  navigator.clipboard.writeText(code)
}

const usePromocode = (code: string) => {
  console.log('Использовать промокод:', code)
}
</script>

<template>
  <div class="pt-[117px] sm:pt-[73px] lg:pt-[173px] min-h-screen bg-gray-100">
    <Header />

    <main class="pt-8 pb-23">
      <div class="max-w-(--container) mx-auto px-4 min-[510px]:px-8 xl:px-0">
        <div class="flex gap-8 min-[1280px]:mx-4.5">
          <div class="hidden xl:block">
            <Sidebar />
          </div>

          <div class="flex-1 flex flex-col gap-4 min-[510px]:gap-6">
            <CabinetPageHeader title="Промокоды" back-to="/cabinet-corporate/navigation" />

            <div class="flex flex-col gap-4 min-[510px]:gap-6">
              <PromocodeCard 
                v-for="(promo, index) in cabinetStore.promocodes" 
                :key="index"
                :promo="promo"
                @copy="copyPromocode"
                @use="usePromocode"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
