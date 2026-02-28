<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const stores = ref([
  {
    id: 1,
    coords: [57.132640, 65.604765],
    address: "Тюмень, улица 50 лет Октября, 118А",
    text1: "Пн-Пт 8:00 — 19:00",
    text2: "Сб-Вс Выходной",
    phone: "+7 (3452) 410-626",
    phoneModal1: '+7 (3452) 66-62-00',
    phoneModal2: '+7 (3452) 66-61-00',
    imgs: [

    ]
  },
  {
    id: 2,
    coords: [57.136904, 65.496751],
    address: "Тюмень, Горпищекомбинатовская улица, 1с1",
    text1: "Пн-Вс 8:00 — 19:00",
    text2: "",
    phone: "+7 (3452) 30-30-90",
    phoneModal1: '+7 (3452) 00-62-11',
    phoneModal2: '+7 (3452) 55-61-41',
  }
])

// Массивы для контейнеров и экземпляров карт
const mapContainers = ref<(HTMLDivElement | null)[]>(Array(stores.value.length).fill(null))
const mapInstances = ref<any[]>([])

// Загрузка API Яндекс.Карт
const loadYandexMaps = () => {
  return new Promise<void>((resolve) => {
    if ((window as any).ymaps) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=4dceb808-e55c-4c98-9645-5bd4c641065f&lang=ru_RU'
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

// Инициализация всех карт после загрузки API и DOM
const initMaps = async () => {
  await loadYandexMaps()
  await nextTick() // Гарантируем, что контейнеры уже в DOM

  // @ts-expect-error ymaps доступен глобально после загрузки
  const ymaps = window.ymaps
  if (!ymaps) return

  ymaps.ready(() => {
    stores.value.forEach((store, index) => {
      const container = mapContainers.value[index]
      if (!container || mapInstances.value[index]) return

      // Создание карты
      const map = new ymaps.Map(container, {
        center: store.coords,
        zoom: 14,
        controls: []
      })

      // Создание метки
      const placemark = new ymaps.Placemark(
        store.coords,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: '/image/pin.svg',
          iconImageSize: [60, 60],
          iconImageOffset: [-20, -40]
        }
      )

      map.geoObjects.add(placemark)
      mapInstances.value[index] = map
    })
  })
}

onMounted(() => {
  initMaps()
})

onUnmounted(() => {
  // Корректная очистка ресурсов карт
  mapInstances.value.forEach(map => {
    if (map?.destroy) map.destroy()
  })
  mapInstances.value = []
})
</script>

<template>
  <Header />
  <Breadcrumbs />

  <main>
    <Section>
      <SectionContainer>
        <TitleMain tag="h1" class="mb-6 sm:mb-20">
          Магазины
        </TitleMain>

        <div class="grid gap-10 sm:gap-20">
          <div v-for="(store, index) in stores" :key="store.id"
            class="grid gap-10 pb-10 sm:pb-20 border-b border-gray-200 last:pb-0 last:border-b-0">

            <div class="grid xl:grid-cols-2 gap-[34px] items-start">
              <StoresItem1 :address="store.address" :text1="store.text1" :text2="store.text2" :phone="store.phone"
                :phoneModal1="store.phoneModal1" :phoneModal2="store.phoneModal2" />

              <StoresSlider />

            </div>

            <!-- MAP-->
            <div class="map-container w-full h-[248px] sm:h-96 overflow-clip rounded-2xl">
              <div :ref="el => mapContainers[index] = el as HTMLDivElement" class="w-full h-full" />
            </div>
            <!-- MAP-->

          </div>
        </div>

      </SectionContainer>
    </Section>
  </main>

  <Footer />
</template>


<style>
.map-container .ymaps-2-1-79-ground-pane {
  filter: grayscale(1);
}
</style>