<script setup lang="ts">
import CompanyCard from '@/components/cabinet/CompanyCard.vue'
import CreditDebtCard from '@/components/cabinet/CreditDebtCard.vue'
import OrdersPreviewCard from '@/components/cabinet/OrdersPreviewCard.vue'
import DiscountsPreviewCard from '@/components/cabinet/DiscountsPreviewCard.vue'
import ManagerCard from '@/components/cabinet/ManagerCard.vue'
import AppealsPreviewCard from '@/components/cabinet/AppealsPreviewCard.vue'

const cabinetStore = useCabinetStore()

const handleNewAppeal = () => {
  console.log('New appeal')
}
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
          <CabinetPageHeader title="Кабинет" back-to="/cabinet-individual/navigation" />

          <div class="flex flex-col xl:flex-row justify-between gap-4 min-[510px]:gap-6">
            <div class="w-full xl:w-[590px] flex flex-col gap-4 min-[510px]:gap-6">
              <div class="bg-(--Base-White) rounded-xl p-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src="/image/cabinet/user-square.svg" alt="">
                  </div>
                  <div>
                    <div class="font-semibold text-(--Text-950)">Кирилл</div>
                    <div class="text-sm text-(--Text-600)">+7 (999) 999-99-99</div>
                  </div>
                </div>
              </div>
              <OrdersPreviewCard :orders="cabinetStore.orders" :format-price="cabinetStore.formatPrice" />

              <DiscountsPreviewCard :discounts="cabinetStore.discounts" />
            </div>

            <div class="w-full xl:w-[280px] flex flex-col gap-4 min-[510px]:gap-6">
              <ManagerCard :manager="cabinetStore.manager" />

              <AppealsPreviewCard :appeals="cabinetStore.appeals" @new-appeal="handleNewAppeal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
