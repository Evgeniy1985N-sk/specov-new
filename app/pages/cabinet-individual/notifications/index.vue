<script setup lang="ts">
</script>

<template>
  <Header />

  <main class="pt-8 pb-23 bg-gray-100">
    <div class="max-w-(--container) mx-auto px-4 min-[750px]:px-8 xl:px-0">
      <div class="flex gap-8 min-[1280px]:mx-4.5">
        <div class="hidden xl:block">
          <Sidebar />
        </div>

        <div class="flex-1 flex flex-col gap-4 min-[750px]:gap-6">
          <CabinetPageHeader title="Уведомления о статусах заказов" back-to="/cabinet-individual/navigation" />

          <CabinetNotificationSettings />
        </div>
      </div>
    </div>
  </main>
</template>
