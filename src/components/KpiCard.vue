<script setup lang="ts">
import * as ko from 'knockout'
import { onMounted, ref, onBeforeUnmount } from 'vue'

const props = defineProps<{
  title: string
  value: number
  unit: string
}>()

const containerRef = ref<HTMLElement | null>(null)
let knockoutViewModel: any = null

onMounted(() => {
  if (window.ko && containerRef.value) {
    knockoutViewModel = {
      title: ko.observable(props.title),
      value: ko.observable(props.value),
      unit: ko.observable(props.unit),
      formattedValue: ko.pureComputed(() => {
        return knockoutViewModel.value().toLocaleString('pt-BR', {
          maximumFractionDigits: 1
        })
      })
    }

    ko.applyBindings(knockoutViewModel, containerRef.value)
  }
})

onBeforeUnmount(() => {
  if (containerRef.value) {
    ko.cleanNode(containerRef.value)
  }
})
</script>

<template>
  <div ref="containerRef" class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-all">
    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1" data-bind="text: title"></h3>
    <p class="text-3xl font-bold text-gray-900 dark:text-gray-50">
      <span data-bind="text: formattedValue"></span>
      <span class="text-base font-normal text-gray-500 dark:text-gray-400 ml-1" data-bind="text: unit"></span>
    </p>
  </div>
</template>
