export const useScroll = function () {
  const scrollPosition = ref(0);
  const isScrolled = ref(false);

  const handleScroll = () => {
    scrollPosition.value = window.scrollY;
    isScrolled.value = window.scrollY > 50;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return {
    scrollPosition,
    isScrolled
  }
};
