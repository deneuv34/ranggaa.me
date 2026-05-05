import { ref, watch, onMounted } from 'vue'

const isDark = ref(true)

export function useTheme() {
  const toggle = () => {
    isDark.value = !isDark.value
  }

  const applyTheme = () => {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  })

  watch(isDark, applyTheme)

  return { isDark, toggle }
}
