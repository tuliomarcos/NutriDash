<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePatientStore } from '@/stores/patientStore'
import { storeToRefs } from 'pinia'
import MealPlanModal from '@/components/MealPlanModal.vue'
import KpiCard from '@/components/KpiCard.vue'
import MealPlanHistoryItem from '@/components/MealPlanHistoryItem.vue'

const route = useRoute()
const store = usePatientStore()
const { currentPatient, patientMealPlans, isLoading, kpiTotals } = storeToRefs(store)
const isModalOpen = ref(false)
const dateFilter = ref('')
let pollingInterval: ReturnType<typeof setInterval> | undefined

const filteredPlans = computed(() => {
  if (!dateFilter.value) {
    return patientMealPlans.value
  }

  return patientMealPlans.value.filter(plan => plan.date.startsWith(dateFilter.value))
})

onMounted(() => {
  const patientId = Number(route.params.id)
  console.log(patientId)
  store.fetchPatientDetails(patientId)

  pollingInterval = setInterval(() => {
    console.log('Polling for KPI updates...')
    store.fetchPatientDetails(patientId)
  }, 30000)
})

onUnmounted(() => {
  clearInterval(pollingInterval)
  store.currentPatient = null
  store.patientMealPlans = []
})
</script>

<template>
  <MealPlanModal v-if="currentPatient" :is-open="isModalOpen" :patient-id="currentPatient.id"
    @close="isModalOpen = false" />

  <div v-if="isLoading" class="text-center mt-10">
    <p class="text-gray-500 dark:text-gray-400">Carregando dados do paciente...</p>
  </div>

  <div v-else-if="currentPatient" class="max-w-5xl mx-auto">
    <header class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
      <div class="flex items-center gap-4">
        <img :src="currentPatient.avatar" :alt="currentPatient.name" class="w-20 h-20 rounded-full object-cover">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ currentPatient.name }}</h2>
          <p class="text-gray-500 dark:text-gray-400">{{ currentPatient.email }}</p>
        </div>
      </div>
      <button @click="isModalOpen = true"
        class="bg-green-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-sm w-full sm:w-auto cursor-pointer">
        + Novo Plano Alimentar
      </button>
    </header>

    <section class="mb-10">
      <h3 class="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Resumo do Plano Atual</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Calorias" :value="kpiTotals.calories" unit="kcal" />
        <KpiCard title="Proteínas" :value="kpiTotals.protein" unit="g" />
        <KpiCard title="Carboidratos" :value="kpiTotals.carbs" unit="g" />
        <KpiCard title="Gorduras" :value="kpiTotals.fat" unit="g" />
      </div>
    </section>

    <section>
      <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Histórico de Planos</h3>
        <input type="date" v-model="dateFilter"
          class="p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors dark:text-gray-200">
      </div>

      <div v-if="filteredPlans.length > 0">
        <MealPlanHistoryItem v-for="plan in filteredPlans" :key="plan.id" :plan="plan" />
      </div>
      <div v-else class="text-center bg-white dark:bg-gray-800 p-8 rounded-lg">
        <p class="text-gray-500 dark:text-gray-400">Nenhum plano alimentar encontrado para esta data.</p>
      </div>
    </section>

  </div>

  <div v-else class="text-center mt-10">
    <p class="text-red-500">Não foi possível carregar os dados do paciente.</p>
  </div>
</template>