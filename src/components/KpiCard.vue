<script setup lang="ts">
const props = defineProps<{
  title: string
  value: number
  unit: string
}>()

const formattedValue = props.value.toLocaleString('pt-BR', {
  maximumFractionDigits: 1
})

</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-all">
    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{{ title }}</h3>
    <p class="text-3xl font-bold text-gray-900 dark:text-gray-50">
      {{ formattedValue }}
      <span class="text-base font-normal text-gray-500 dark:text-gray-400 ml-1">{{ unit }}</span>
    </p>
  </div>
</template>