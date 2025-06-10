<script setup lang="ts">
import { onMounted } from 'vue'
import { usePatientStore } from '@/stores/patientStore'
import { storeToRefs } from 'pinia'
import PatientCard from '@/components/PatientCard.vue'

const store = usePatientStore()
const { patients, isLoading } = storeToRefs(store)

onMounted(() => {
  store.fetchPatients()
})
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6">Meus Pacientes</h2>
    <div v-if="isLoading" class="text-center text-slate-500">Carregando...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PatientCard v-for="patient in patients" :key="patient.id" :patient="patient" />
    </div>
  </div>
</template>