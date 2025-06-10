import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Patient, MealPlan } from '@/types'

const API_URL = 'http://localhost:3001'

export const usePatientStore = defineStore('patient', () => {
  const patients = ref<Patient[]>([])
  const currentPatient = ref<Patient | null>(null)
  const patientMealPlans = ref<MealPlan[]>([])
  const isLoading = ref(false)
  const latestMealPlan = computed<MealPlan | null>(() => {
    return patientMealPlans.value.length > 0 ? patientMealPlans.value[0] : null
  })

  const kpiTotals = computed(() => {
    if (!latestMealPlan.value) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0 }
    }

    return latestMealPlan.value.meals
      .flatMap((meal) => meal.items)
      .reduce(
        (totals, item) => {
          totals.calories += item.calories
          totals.protein += item.protein
          totals.carbs += item.carbs
          totals.fat += item.fat
          return totals
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      )
  })

  async function fetchPatients() {
    isLoading.value = true
    try {
      const response = await fetch(`${API_URL}/patients`)
      patients.value = await response.json()
    } catch (error) {
      console.error('Failed to fetch patients:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPatientDetails(id: number) {
    isLoading.value = true
    try {
      const [patientRes, plansRes] = await Promise.all([
        fetch(`${API_URL}/patients/${id}`),
        fetch(`${API_URL}/mealPlans?patientId=${id}&_sort=date&_order=desc`),
      ])

      if (!patientRes.ok || !plansRes.ok) throw new Error('Failed to fetch data')

      currentPatient.value = await patientRes.json()
      patientMealPlans.value = await plansRes.json()
    } catch (error) {
      console.error('Failed to fetch patient details:', error)

      currentPatient.value = null
      patientMealPlans.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function saveMealPlan(plan: Omit<MealPlan, 'id'>) {
    isLoading.value = true

    try {
      const response = await fetch(`${API_URL}/mealPlans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      })

      if (!response.ok) throw new Error('Failed to save meal plan')

      await fetchPatientDetails(plan.patientId)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    patients,
    currentPatient,
    patientMealPlans,
    isLoading,
    kpiTotals,
    fetchPatients,
    fetchPatientDetails,
    saveMealPlan,
  }
})
