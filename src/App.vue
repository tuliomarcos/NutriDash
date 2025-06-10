<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div :class="theme" class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen font-sans">
    <header
      class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <h1 class="text-xl font-bold text-primary-600 dark:text-primary-500">
          <RouterLink :to="`/`" class="group block">NutriDash</RouterLink>
        </h1>
        <button @click="toggleTheme"
          class="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <span v-if="theme === 'light'" class="text-xl">🌙</span>
          <span v-else class="text-xl">☀️</span>
        </button>
      </div>
    </header>
    <main class="container mx-auto p-4 sm:p-6 lg:p-8">
      <RouterView />
    </main>
  </div>
</template>