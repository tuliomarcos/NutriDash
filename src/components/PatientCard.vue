<script setup lang="ts">
import * as ko from 'knockout'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Patient } from '@/types'
import { useRouter } from 'vue-router'

const props = defineProps<{ patient: Patient }>()
const containerRef = ref<HTMLElement | null>(null)
const router = useRouter()
let knockoutViewModel: {
  name: ko.Observable<string>
  email: ko.Observable<string>
  avatar: ko.Observable<string>
  goToPatient: () => void
} | null = null

onMounted(() => {
  if (containerRef.value) {
    knockoutViewModel = {
      name: ko.observable(props.patient.name),
      email: ko.observable(props.patient.email),
      avatar: ko.observable(props.patient.avatar),
      goToPatient: () => {
        router.push(`/patient/${props.patient.id}`)
      }
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
  <div ref="containerRef">
    <div class="group block cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
      data-bind="click: goToPatient">
      <div
        class="h-full p-4 rounded-xl transition-all duration-300 bg-white text-slate-900 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 group-hover:ring-primary-500 group-hover:shadow-lg">
        <div class="flex flex-col items-center text-center">
          <img
            class="w-24 h-24 rounded-full mb-4 ring-2 ring-slate-200 dark:ring-slate-600 group-hover:ring-primary-400 transition-all"
            data-bind="attr: { src: avatar }, attr: { alt: name }" />
          <h3 class="font-semibold text-lg" data-bind="text: name"></h3>
          <p class="text-sm text-slate-500 dark:text-slate-400" data-bind="text: email"></p>
        </div>
      </div>
    </div>
  </div>
</template>
