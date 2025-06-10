import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePatientStore } from '@/stores/patientStore'
import type { Patient, MealPlan } from '@/types'

global.fetch = vi.fn()

function createFetchResponse(data: any, ok = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  } as Response)
}

describe('Patient Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetchPatients should update state with patients on success', async () => {
    const mockPatients: Patient[] = [
      { id: 1, name: 'João Teste', email: 'joao@teste.com', avatar: '' },
    ]
    ;(fetch as vi.Mock).mockReturnValue(createFetchResponse(mockPatients))

    const store = usePatientStore()

    expect(store.patients).toEqual([])
    expect(store.isLoading).toBe(false)

    const fetchPromise = store.fetchPatients()

    expect(store.isLoading).toBe(true)

    await fetchPromise

    expect(store.patients).toEqual(mockPatients)
    expect(store.isLoading).toBe(false)
  })

  it('fetchPatientDetails should handle API errors gracefully', async () => {
    ;(fetch as vi.Mock).mockReturnValue(createFetchResponse({}, false))
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const store = usePatientStore()
    await store.fetchPatientDetails(99)

    expect(store.currentPatient).toBeNull()
    expect(store.patientMealPlans).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('kpiTotals getter should calculate totals correctly from the latest meal plan', () => {
    const store = usePatientStore()
    const mockPlans: MealPlan[] = [
      {
        id: 101,
        patientId: 1,
        date: '2025-06-10',
        meals: [
          {
            name: 'Almoço',
            time: '12:00',
            items: [{ name: 'Item A', calories: 100, protein: 10, carbs: 5, fat: 2 }],
          },
          {
            name: 'Jantar',
            time: '19:00',
            items: [{ name: 'Item B', calories: 200, protein: 20, carbs: 10, fat: 4 }],
          },
        ],
      },
      {
        id: 102,
        patientId: 1,
        date: '2025-06-09',
        meals: [
          {
            name: 'Café',
            time: '08:00',
            items: [{ name: 'Item C', calories: 50, protein: 5, carbs: 2.5, fat: 1 }],
          },
        ],
      },
    ]

    store.patientMealPlans = mockPlans

    const totals = store.kpiTotals
    expect(totals.calories).toBe(300)
    expect(totals.protein).toBe(30)
    expect(totals.carbs).toBe(15)
    expect(totals.fat).toBe(6)
  })
})
