<script setup lang="ts">
import type { MealPlan } from '@/types'
import { computed, ref } from 'vue'

const props = defineProps<{
  plan: MealPlan
}>()

const isExpanded = ref(false)

function toggleDetails() {
  isExpanded.value = !isExpanded.value
}

const totals = computed(() => {
  return props.plan.meals
    .flatMap(meal => meal.items)
    .reduce((acc, item) => {
      acc.calories += item.calories
      acc.itemsCount += 1
      return acc
    }, { calories: 0, itemsCount: 0 })
})

const formattedDate = computed(() => {
  const date = new Date(props.plan.date + 'T00:00:00')

  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm transition-all duration-300 mb-3">
    <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
      @click="toggleDetails">
      <div>
        <p class="font-bold text-lg text-slate-800 dark:text-slate-100">{{ formattedDate }}</p>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ totals.itemsCount }} itens - Aprox. {{ Math.round(totals.calories) }} kcal
        </p>
      </div>
      <button
        class="text-sm text-primary-600 dark:text-primary-500 hover:text-primary-700 font-semibold transition-colors flex items-center gap-1">
        <span>{{ isExpanded ? 'Ocultar Detalhes' : 'Ver Detalhes' }}</span>
        <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': isExpanded }" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <Transition name="slide-fade">
      <div v-if="isExpanded" class="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
        <div v-for="meal in plan.meals" :key="meal.name" class="mt-4">
          <div class="flex justify-between items-baseline mb-2">
            <h4 class="font-semibold text-slate-700 dark:text-slate-200">{{ meal.name }}</h4>
            <span class="text-xs font-mono text-slate-500 dark:text-slate-400">{{ meal.time }}</span>
          </div>

          <ul class="space-y-1">
            <li v-for="(item, index) in meal.items" :key="index"
              class="flex justify-between items-center text-sm p-2 rounded-md bg-slate-50 dark:bg-slate-700/60">
              <span class="font-medium text-slate-800 dark:text-slate-200">{{ item.name }}</span>
              <div class="flex gap-4 text-xs text-slate-600 dark:text-slate-300">
                <span><b class="font-semibold">{{ item.calories.toFixed(0) }}</b> kcal</span>
                <span><b class="font-semibold">{{ item.protein.toFixed(1) }}</b>g Prot.</span>
                <span><b class="font-semibold">{{ item.carbs.toFixed(1) }}</b>g Carb.</span>
                <span><b class="font-semibold">{{ item.fat.toFixed(1) }}</b>g Gord.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>