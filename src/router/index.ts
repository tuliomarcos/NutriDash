import { createRouter, createWebHistory } from 'vue-router'
import PatientListView from '../views/PatientListView.vue'
import PatientDetailView from '@/views/PatientDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/patients',
    },
    {
      path: '/patients',
      name: 'patient-list',
      component: PatientListView,
    },
    {
      path: '/patient/:id',
      name: 'patient-detail',
      component: () => PatientDetailView,
    },
  ],
})

export default router
