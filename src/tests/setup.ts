import { afterEach, vi } from 'vitest'

const createLocalStorageMock = () => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
}

vi.stubGlobal('localStorage', createLocalStorageMock())

afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})
