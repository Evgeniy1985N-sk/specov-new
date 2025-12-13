<script lang="ts">
import SectionContainer from '@/components/section/Container.vue'
import FooterLogo from '@/components/footer/Logo.vue'
import FooterMenu from '@/components/footer/Menu.vue'
import FooterLinks from '@/components/footer/Links.vue'

export default {
  name: 'Footer',
  components: {
    SectionContainer,
    FooterLogo,
    FooterMenu,
    FooterLinks
  }
}
</script>

<template>
  <footer class="pt-16 pb-[66px] lg:pb-0 lg:pt-22">
    <SectionContainer>

      <div class="flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-6 lg:gap-3 pb-6 border-b border-(--border) border-solid">
        <FooterLogo />
        <FooterMenu />
      </div>

      <div class="flex flex-col-reverse justify-center items-center lg:flex-row lg:justify-between gap-6 lg:gap-3 py-6 sm:pb-20 lg:pb-6">
        <p class="text-gray-600 text-xs leading-4">
          © 2003–2025 ТД «Спецов»
        </p>
        <FooterLinks />
      </div>

    </SectionContainer>
  </footer>
</template>