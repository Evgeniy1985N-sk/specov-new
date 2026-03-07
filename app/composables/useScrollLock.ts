// composables/useScrollLock.ts
export const useScrollLock = () => {
  const isLocked = ref(false)
  const initialPadding = ref('')

  const lock = () => {
    if (import.meta.server) return
    if (isLocked.value) return

    const body = document.body // ✅ Тип: HTMLBodyElement (автоматически)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    initialPadding.value = body.style.paddingRight
    body.setAttribute('data-padding-right', initialPadding.value)

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    body.style.overflow = 'hidden'
    isLocked.value = true
  }

  const unlock = () => {
    if (import.meta.server) return

    const body = document.body
    body.style.overflow = ''

    const originalPadding = body.getAttribute('data-padding-right')
    if (originalPadding !== null) {
      body.style.paddingRight = originalPadding
      body.removeAttribute('data-padding-right')
    } else {
      body.style.paddingRight = ''
    }

    isLocked.value = false
  }

  onUnmounted(() => {
    if (isLocked.value) unlock()
  })

  return { isLocked, lock, unlock }
}