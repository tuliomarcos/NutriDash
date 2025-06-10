<script setup lang="ts">
import { reactive, watch } from 'vue'
import { usePatientStore } from '@/stores/patientStore'
import type { MealPlan } from '@/types'

const props = defineProps<{
  isOpen: boolean
  patientId: number
}>()

const emit = defineEmits(['close'])
const store = usePatientStore()
const createInitialFormState = (): Omit<MealPlan, 'id'> => ({
  patientId: props.patientId,
  date: new Date().toISOString().split('T')[0],
  meals: [
    {
      name: 'Café da Manhã',
      time: '08:00',
      items: [{ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 }]
    }
  ]
})

const formState = reactive(createInitialFormState())

const addMeal = () => {
  formState.meals.push({
    name: 'Nova Refeição',
    time: '12:00',
    items: [{ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 }]
  })
}

const removeMeal = (mealIndex: number) => {
  formState.meals.splice(mealIndex, 1)
}

const addFoodItem = (mealIndex: number) => {
  formState.meals[mealIndex].items.push({
    name: '', calories: 0, protein: 0, carbs: 0, fat: 0
  })
}

const removeFoodItem = (mealIndex: number, itemIndex: number) => {
  formState.meals[mealIndex].items.splice(itemIndex, 1)
}

const handleSubmit = async () => {
  if (formState.meals.length === 0) {
    alert('O plano deve ter pelo menos uma refeição.')
    return
  }

  await store.saveMealPlan(formState)
  emit('close')
}

const handleClose = () => {
  emit('close')
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      Object.assign(formState, createInitialFormState())
    }, 300)
  } else {
    formState.patientId = props.patientId
  }
})
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col transition-all">
        <header
          class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
            Criar Novo Plano Alimentar
          </h2>
          <button @click="handleClose" class="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </header>

        <form @submit.prevent="handleSubmit" class="p-6 overflow-y-auto">
          <div class="mb-6">
            <label for="plan-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data do
              Plano</label>
            <input type="date" id="plan-date" v-model="formState.date"
              class="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors dark:text-gray-200" />
          </div>

          <div v-for="(meal, mealIndex) in formState.meals" :key="mealIndex"
            class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div class="flex justify-between items-center mb-4">
              <div class="flex-grow grid grid-cols-2 gap-4">
                <input type="text" v-model="meal.name" placeholder="Nome da Refeição"
                  class="p-2 rounded-md bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 dark:text-gray-200">
                <input type="time" v-model="meal.time"
                  class="p-2 rounded-md bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 dark:text-gray-200">
              </div>
              <button @click="removeMeal(mealIndex)" type="button"
                class="ml-4 text-red-500 hover:text-red-700 text-sm font-semibold">Remover</button>
            </div>

            <div v-for="(item, itemIndex) in meal.items" :key="itemIndex"
              class="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2 items-center">
              <input type="text" v-model="item.name" placeholder="Alimento"
                class="md:col-span-2 p-2 rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-gray-200 text-sm">
              <input type="number" v-model.number="item.calories" placeholder="kcal"
                class="p-2 rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-gray-200 text-sm">
              <input type="number" v-model.number="item.protein" placeholder="Prot."
                class="p-2 rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-gray-200 text-sm">
              <div class="flex items-center">
                <input type="number" v-model.number="item.carbs" placeholder="Carb."
                  class="flex-grow p-2 rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-gray-200 text-sm">
                <button @click="removeFoodItem(mealIndex, itemIndex)" type="button"
                  class="ml-2 text-gray-400 hover:text-red-500">&#10005;</button>
              </div>
            </div>

            <button @click="addFoodItem(mealIndex)" type="button"
              class="mt-2 text-green-600 dark:text-green-400 hover:text-green-700 text-sm font-semibold">+ Adicionar
              Alimento</button>
          </div>

          <button @click="addMeal" type="button"
            class="w-full p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">+
            Adicionar Refeição</button>
        </form>

        <footer class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4 flex-shrink-0">
          <button @click="handleClose" type="button"
            class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 font-semibold">
            Cancelar
          </button>
          <button @click="handleSubmit" type="button"
            class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 font-semibold shadow">
            Salvar Plano
          </button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0
}
</style>