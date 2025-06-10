import { describe, it, expect, vi } from 'vitest'
import { useTheme } from '@/composables/useTheme'
import { nextTick } from 'vue'

describe('useTheme Composable', () => {
  it('should initialize with "light" theme by default', () => {
    const { theme } = useTheme()
    expect(theme.value).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should initialize with theme from localStorage if present', () => {
    localStorage.setItem('theme', 'dark')
    const { theme } = useTheme()
    expect(theme.value).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should toggle theme and update localStorage', async () => {
    const { theme, toggleTheme } = useTheme()
    const setItemSpy = vi.spyOn(localStorage, 'setItem')

    toggleTheme()
    await nextTick()

    expect(theme.value).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark')

    setItemSpy.mockRestore()
  })
})
