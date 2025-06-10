<script setup lang="ts">
import type { Patient } from '@/types'
import { RouterLink } from 'vue-router'

defineProps<{ patient: Patient }>()
</script>

<template>
  <RouterLink :to="`/patient/${patient.id}`" class="group block">
    <div
      class="h-full p-4  rounded-xl  transition-all duration-300 bg-white text-slate-900 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 group-hover:ring-primary-500 group-hover:shadow-lg">
      <div class="flex flex-col items-center text-center">
        <img :src="patient.avatar" alt="Avatar"
          class="w-24 h-24 rounded-full mb-4 transition-allring-2 ring-slate-200 dark:ring-slate-600 group-hover:ring-primary-400">
        <h3 class="font-semibold text-lg">
          {{ patient.name }}
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ patient.email }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>