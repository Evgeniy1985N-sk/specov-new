import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export function useDefinePosition(targetRef: Ref<HTMLElement | null>) {
  const initialTop = ref(0); // Позиция при загрузке (статичная)
  const height = ref(0);     // Высота (можно обновлять при resize)

  const updatePosition = () => {
    const element = targetRef.value;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    // Важно: initialTop считаем только один раз, либо при явном запросе
    // Но для sticky-логики нам нужно именно начальное положение относительно документа
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Если initialTop еще не задан, инициализируем его
    if (initialTop.value === 0 && !targetRef.value?.dataset.posSet) {
        initialTop.value = scrollTop + rect.top;
        if (targetRef.value) targetRef.value.dataset.posSet = 'true'; // маркер инициализации
    }
    
    height.value = rect.height;
  };

  const handleScroll = () => {
    requestAnimationFrame(() => {
        // При скролле обновляем только высоту (если нужно), но не top!
        const element = targetRef.value;
        if (element) {
             height.value = element.getBoundingClientRect().height;
        }
    });
  };

  onMounted(() => {
    updatePosition(); // Замер при старте
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updatePosition); // При ресайзе пересчет допустим
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', updatePosition);
  });

  return { initialTop, height };
}