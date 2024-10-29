<script setup lang="ts">
import api from '@/services/http'
import Loader from '@/shared/components/Loader.vue'

import { ref, onMounted } from 'vue'

interface Role {
  name: string
}

interface Customer {
  firstName: string
  lastName: string
  kraPin: string
  phoneNumber: string
  email: string
  role?: Role // Make role optional if it can be undefined
}

const customers = ref<Customer[]>([])
const loader = ref(false)

onMounted(async () => {
  loader.value = true
  try {
    const users = await api.get('/users')
    customers.value = [...users.data] // Ensure the data structure matches your expected format
    loader.value = false
  } catch (error) {
    loader.value = false
    console.log('Error fetching customers:', error) // Log any errors in the console
  }
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0"
      >
        <div class="flex justify-between items-center w-full">
          <h1 class="text-2xl font-semibold">Users</h1>
        </div>
        <div class="flex items-center space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            class="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto"
          />
          <select
            class="border border-gray-300 rounded-md px-3 py-2 text-gray-600"
          >
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
          </select>
        </div>
      </div>
      <Loader v-if="loader"></Loader>
      <!-- Table Wrapper for Horizontal Scroll -->
      <div class="overflow-x-auto">
        <table
          class="w-full bg-white border border-gray-200 rounded-lg min-w-max"
        >
          <thead>
            <tr class="text-left text-gray-500 text-sm uppercase">
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3 hidden md:table-cell">KRA Pin</th>
              <th class="px-4 py-3">Phone Number</th>
              <th class="px-4 py-3 hidden lg:table-cell">Email</th>
              <th class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in customers"
              :key="customer.email"
              class="text-gray-700"
            >
              <td class="border-t px-4 py-3">
                {{ customer.firstName }} {{ customer.lastName }}
              </td>
              <td class="border-t px-4 py-3 hidden md:table-cell">
                {{ customer.kraPin }}
              </td>
              <td class="border-t px-4 py-3">{{ customer.phoneNumber }}</td>
              <td class="border-t px-4 py-3 hidden lg:table-cell">
                {{ customer.email }}
              </td>
              <td class="border-t px-4 py-3">
                <span class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ customer.role?.name }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
