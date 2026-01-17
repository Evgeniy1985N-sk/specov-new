<script setup lang="ts">
interface Address {
  label: string
  coords: number[]
  isActive: boolean
}
const companyStore = useCompanyStore()
const mapContainer = ref<HTMLDivElement | null>(null)
let myMap: any = null
let myPlacemark: any = null
const address = ref<Address[]>()

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=4dceb808-e55c-4c98-9645-5bd4c641065f&lang=ru_RU'
  script.onload = () => {
    // @ts-expect-error ymaps доступен глобально
    const ymaps = window.ymaps
    ymaps.ready(() => {
      if (!address.value || address.value.length === 0) return

      // Берём координаты первого адреса как начальный центр
      const firstCoords = address.value[0]?.coords

      myMap = new ymaps.Map(mapContainer.value, {
        center: firstCoords,
        zoom: 14,
        // controls: []
      })

      // Массив для хранения всех меток (опционально)
      const placemarks = address.value.map(addr => {
        return new ymaps.Placemark(
          addr.coords,
          {
            balloonContent: `
              <div class="grid gap-4">
                <p class="text-sm leading-5 text-gray-950 font-semibold">${addr.label}</p>
                <button class="px-[14px] py-2 rounded-lg bg-(--Brand-950) text-sm leading-5 text-white font-semibold cursor-pointer">Выбрать</button>
              </div>
            `,
            hintContent: addr.label
          }, // можно добавить балун с данными: { balloonContent: addr.name }
          {
            iconLayout: 'default#image',
            iconImageHref: '/image/pin2.svg',
            iconImageSize: [60, 60],
            iconImageOffset: [-20, -40]
          }
        )
      })

      // Добавляем все метки на карту
      placemarks.forEach(placemark => {
        myMap.geoObjects.add(placemark)
      })

      // Опционально: автоматически подогнать масштаб под все точки
      myMap.setBounds(myMap.geoObjects.getBounds(), {
        checkZoomRange: true
      })
    })
  }
  document.head.appendChild(script)
})

const company = computed(() => {
  return companyStore.company
})
watch(company, (newVal) => {
  if (!newVal) return;

  const activeItem = newVal.find(item => item.isActive);
  if (activeItem) {
    address.value = activeItem.address;
  }
}, { immediate: true });

watch(() => address.value?.find(address => address.isActive), (newactiveAddress) => {
  if (!newactiveAddress || !myMap) return

  if (myPlacemark) {
    myMap.geoObjects.remove(myPlacemark)
  }

  myMap.setCenter(newactiveAddress.coords, 18, {
    duration: 300
  })

  // @ts-expect-error ymaps доступен глобально
  const ymaps = window.ymaps
  myPlacemark = new ymaps.Placemark(
    newactiveAddress.coords,
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: '/image/pin2.svg',
      iconImageSize: [60, 60],
      iconImageOffset: [-20, -40]
    }
  )

  myMap.geoObjects.add(myPlacemark)
})
</script>

<template>

  <div ref="mapContainer" class="w-full h-full map-container" />

</template>

<style>
.map-container .ymaps-2-1-79-ground-pane {
  filter: grayscale(1);
}
</style>