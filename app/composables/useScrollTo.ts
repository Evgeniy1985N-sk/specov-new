// composables/useScrollTo.ts (или прямо в компоненте)
export const useScrollTo = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 160;

    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
    });
  };

  return { scrollToSection };
};