<script setup lang="ts">
import { watch } from 'vue'
import { userStore } from '@/stores/user'
import { RouterView } from 'vue-router'
import router from './router'

const store = userStore()
watch(
  () => store.isAuthenticated,
  newValue => {
    if (newValue) {
      router.push({ name: 'Dashboard' })
    }
  },
  {
    deep: true,
  },
)
</script>

<template>
  <RouterView />
</template>
