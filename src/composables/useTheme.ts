import { ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark'

export function useTheme() {
  const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'light')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
  }

  watchEffect(() => {
    const htmlElement = document.documentElement
    if (theme.value === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  })

  return { theme, toggleTheme }
}
