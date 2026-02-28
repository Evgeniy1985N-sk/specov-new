<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useStoreApi } from '@/composables/api/useStoreApi';

const mapContainer = ref<HTMLDivElement | null>(null)
let myMap: any = null
let myPlacemark: any = null

const currentStoreId = ref<number | undefined>(undefined);

const config = useRuntimeConfig();

const DEFAULT_STORE_ID = 1; //move to config??

onMounted(() => {
  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=${config.public.yandexAPIKey}&lang=ru_RU`;
  script.onload = () => {
    // @ts-expect-error ymaps доступен глобально
    const ymaps = window.ymaps
    ymaps.ready(() => {
      // const activeStore = stores.value.find(store => store.isActive)
      const activeStore = stores.value.find(store => store.id == currentStoreId.value)
      if (!activeStore) return;

      const coords = activeStore.coords

      myMap = new ymaps.Map(mapContainer.value, {
        center: coords,
        zoom: 14,
        controls: []
      })

      myPlacemark = new ymaps.Placemark(
        coords,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: '/image/pin.svg',
          iconImageSize: [60, 60],
          iconImageOffset: [-20, -40]
        }
      )

      myMap.geoObjects.add(myPlacemark)
    })
  }
  document.head.appendChild(script)
})

// Fetch stores from server
const { publicList } = useStoreApi();
const { data: storeList } = await useAsyncData(
  'store-list',
  () => publicList(),
  { server: true, lazy: false }
);

interface StoreType {
  id: number,
  coords: number[],
  isActive: boolean,
  address: string,
  time: string,
  phone: string
  phoneModal: string[]
}

const stores = ref<StoreType[]>([]);

watch(() => storeList.value, (newStoreList) => {
  if (!newStoreList) {
    stores.value = [];
    return;
  }

  currentStoreId.value = DEFAULT_STORE_ID;

  stores.value = newStoreList.map(store => ({
    id: store.id,
    coords: [parseFloat(store.pos_lat), parseFloat(store.pos_lon)],
    isActive: (currentStoreId.value == store.id),
    address: store.address,
    time: store.work_hours,
    phone: store.tels.split(',')[0] || '',
    phoneModal: store.tels.split(',') || '',
  }));

}, { immediate: true });

// console.log('store list', storeList.value)

function toggleActive(index: number) {
  if (stores.value[index]?.isActive) return

  stores.value = stores.value.map((item, i) => ({
    ...item,
    isActive: i === index
  }))
}

watch(() => stores.value.find(store => store.isActive), (newActiveStore) => {
  if (!newActiveStore || !myMap) return

  if (myPlacemark) {
    myMap.geoObjects.remove(myPlacemark)
  }

  myMap.setCenter(newActiveStore.coords, 14, {
    duration: 300
  })

  // @ts-expect-error ymaps доступен глобально
  const ymaps = window.ymaps
  myPlacemark = new ymaps.Placemark(
    newActiveStore.coords,
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: '/image/pin.svg',
      iconImageSize: [60, 60],
      iconImageOffset: [-20, -40]
    }
  )

  myMap.geoObjects.add(myPlacemark)
})

</script>

<template>

  <div class="flex flex-wrap lg:flex-nowrap gap-8">

    <!-- ADDRESS -->
    <div class="w-full gap-2 font-semibold flex flex-col md:flex-row lg:flex-col">
      <StoresItem v-for="(item, index) in stores" @click.self="toggleActive(index)" :isActive="item.isActive"
        :address="item.address" :time="item.time" :phone="item.phone" :key="item.id"
        :phoneModal="item.phoneModal" />
    </div>
    <!-- ADDRESS -->

    <!-- MAP -->
    <div class="w-full lg:max-w-[695px] h-[248px] sm:h-96 overflow-clip flex flex-col items-center rounded-2xl">
      <div ref="mapContainer" class="w-full h-full map-container" />
    </div>
    <!-- MAP -->

  </div>

</template>

<style>
.map-container .ymaps-2-1-79-ground-pane {
  filter: grayscale(1);
}
</style>
