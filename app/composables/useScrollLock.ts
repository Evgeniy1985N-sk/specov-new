// composables/useScrollLock.ts
import { ref, onUnmounted } from 'vue'

// Выносим ширину скролла наружу, чтобы она была доступна при импорте
export const scrollbarWidth = ref(0)

export const useScrollLock = () => {
  const isLocked = ref(false)
  const initialPadding = ref('')
  const initialOverflow = ref('')

  const lock = () => {
    if (import.meta.server) return
    if (isLocked.value) return

    const html = document.documentElement
    
    const width = window.innerWidth - html.clientWidth
    scrollbarWidth.value = width

    initialPadding.value = html.style.paddingRight
    initialOverflow.value = html.style.overflow
    
    html.setAttribute('data-padding-right', initialPadding.value)
    html.setAttribute('data-overflow', initialOverflow.value)

    if (width > 0) {
      html.style.boxSizing = 'border-box'
      html.style.paddingRight = `${width}px`
    }

    html.style.overflow = 'hidden'
    isLocked.value = true
  }

  const unlock = () => {
    if (import.meta.server) return
    if (!isLocked.value) return

    const html = document.documentElement
    
    html.style.overflow = initialOverflow.value || ''
    html.style.boxSizing = ''

    const originalPadding = html.getAttribute('data-padding-right')
    if (originalPadding !== null) {
      html.style.paddingRight = originalPadding
      html.removeAttribute('data-padding-right')
    } else {
      html.style.paddingRight = ''
    }
    
    html.removeAttribute('data-overflow')

    isLocked.value = false
  }

  onUnmounted(() => {
    if (isLocked.value) unlock()
  })

  return { 
    isLocked, 
    lock, 
    unlock,
    scrollbarWidth 
  }
}