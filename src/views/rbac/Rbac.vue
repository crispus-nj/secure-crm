<script setup lang="ts">
import { processHttpErrors } from '@/services/app-service'
import Card from '@/shared/ui/Card.vue'
import api from '@/services/http'
import { ref, onMounted } from 'vue'

const roles = ref([])
const loader = ref(false)

onMounted(async () => {
  await listRoles()
})

const listRoles = async () => {
  loader.value = true
  try {
    const users = await api.get('/users/listroles')
    roles.value = [...users.data] // Ensure the data structure matches your expected format
    loader.value = false
  } catch (error) {
    loader.value = false
    processHttpErrors(error)
  }
}
</script>
<template>
  <ul
    class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
  >
    <li class="me-2">
      <a
        href="#"
        aria-current="page"
        class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
        >Roles</a
      >
    </li>
    <!-- <li class="me-2">
      <a
        href="#"
        class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >Permissions</a
      >
    </li> -->
  </ul>
  <Card
    class="space-y-2 pt-6 pb-6 rounded-2xl bg-[#F4F9FD] shadow-lg border-none"
    v-for="user in roles"
    v-bind:key="user.id"
  >
    <!-- Profile logo -->
    <div class="">
      <img src="" alt="profile" class="w-20 rounded-full" />
    </div>
    <!-- name -->
    <p class="font-semibold text-sm text-center">
      {{ user?.name }}
    </p>
    <!-- title -->
    <p class="font-regular text-sm text-center">{{ user?.createdAt }}</p>
    <!-- level -->
  </Card>
</template>
