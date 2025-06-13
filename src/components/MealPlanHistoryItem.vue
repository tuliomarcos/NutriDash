<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { MealPlan } from '@/types'

const props = defineProps<{
  plan: MealPlan
}>()

const containerRef = ref<HTMLElement | null>(null)
let koViewModel: any = null

onMounted(() => {
  if (window.ko && containerRef.value) {
    const meals = ko.observableArray(props.plan.meals)

    koViewModel = {
      isExpanded: ko.observable(false),
      toggleDetails: function () {
        this.isExpanded(!this.isExpanded())
      },
      formattedDate: ko.observable(
        new Date(props.plan.date + 'T00:00:00').toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      ),
      meals: meals,
      totals: ko.pureComputed(() => {
        let calories = 0
        let itemsCount = 0

        meals().forEach(meal => {
          meal.items.forEach(item => {
            calories += item.calories
            itemsCount += 1
          })
        })

        return { calories: Math.round(calories), itemsCount }
      })
    }

    ko.applyBindings(koViewModel, containerRef.value)
  }
})

onBeforeUnmount(() => {
  if (containerRef.value) {
    ko.cleanNode(containerRef.value)
  }
})
</script>

<template>
  <div ref="containerRef"
    class="bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm transition-all duration-300 mb-3">
    <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
      data-bind="click: toggleDetails">
      <div>
        <p class="font-bold text-lg text-slate-800 dark:text-slate-100" data-bind="text: formattedDate"></p>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          <span data-bind="text: totals().itemsCount"></span>
          itens -
          Aprox.
          <span data-bind="text: totals().calories"></span>
          kcal
        </p>
      </div>
      <button
        class="text-sm text-primary-600 dark:text-primary-500 hover:text-primary-700 font-semibold transition-colors flex items-center gap-1">
        <span data-bind="text: isExpanded() ? 'Ocultar Detalhes' : 'Ver Detalhes'"></span>
        <svg class="w-4 h-4 transition-transform duration-300" data-bind="css: { 'rotate-180': isExpanded }" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <div data-bind="if: isExpanded" class="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
      <!-- Meals -->
      <div data-bind="foreach: meals">
        <div class="mt-4">
          <div class="flex justify-between items-baseline mb-2">
            <h4 class="font-semibold text-slate-700 dark:text-slate-200" data-bind="text: name"></h4>
            <span class="text-xs font-mono text-slate-500 dark:text-slate-400" data-bind="text: time"></span>
          </div>

          <ul class="space-y-1" data-bind="foreach: items">
            <li class="flex justify-between items-center text-sm p-2 rounded-md bg-slate-50 dark:bg-slate-700/60">
              <span class="font-medium text-slate-800 dark:text-slate-200" data-bind="text: name"></span>
              <div class="flex gap-4 text-xs text-slate-600 dark:text-slate-300">
                <span>
                  <b class="font-semibold" data-bind="text: calories.toFixed(0)"></b>
                  kcal
                </span>
                <span>
                  <b class="font-semibold" data-bind="text: protein.toFixed(1)"></b>
                  g Prot.
                </span>
                <span>
                  <b class="font-semibold" data-bind="text: carbs.toFixed(1)"></b>
                  g Carb.
                </span>
                <span>
                  <b class="font-semibold" data-bind="text: fat.toFixed(1)"></b>
                  g Gord.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {transform: translateY(-10px);
  opacity: 0;
}
</style>
