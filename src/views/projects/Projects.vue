<script setup lang="ts">
import api from '@/services/http'
import { processHttpErrors } from '@/services/app-service.ts'
import Loader from '@/shared/components/Loader.vue'

import Button from '@/shared/ui/Button.vue'

import { ref, onMounted } from 'vue'
import Modal from '@/shared/components/Modal.vue'

const projects = ref<unknown[]>([])
const loader = ref(false)
const showDialog = ref(false)

onMounted(async () => {
  loader.value = true
  try {
    const users = await api.get('/projects')
    projects.value = [...users.data] // Ensure the data structure matches your expected format
    loader.value = false
  } catch (error) {
    loader.value = false
    processHttpErrors(error)
  }
})

const addProject = () => {
  showDialog.value = false
  setTimeout(() => {
    showDialog.value = true
  }, 50)
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-8">
    <Loader v-if="loader"></Loader>
    <div class="bg-white rounded-lg shadow-lg p-6" v-if="projects.length > 0">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0"
      >
        <div class="flex justify-between items-center w-full">
          <h1 class="text-2xl font-semibold">Projects</h1>
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
              v-for="project in projects"
              :key="project.id"
              class="text-gray-700"
            >
              <td class="border-t px-4 py-3">
                {{ project.firstName }} {{ project.lastName }}
              </td>
              <td class="border-t px-4 py-3 hidden md:table-cell">
                {{ project.kraPin }}
              </td>
              <td class="border-t px-4 py-3">{{ project.phoneNumber }}</td>
              <td class="border-t px-4 py-3 hidden lg:table-cell">
                {{ project.email }}
              </td>
              <td class="border-t px-4 py-3">
                <span class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ customer?.role?.name }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center min-h-[50vh]" v-else>
      <span class="font-bold text-blue-500 text-lg">No Project available</span>
      <Button class="mt-5" @click="addProject">Add Project</Button>
    </div>
  </div>
  <!-- <Modal
    :modalTitle="'Add Project'"
    :state="showDialog"
    @stateChange="showDialog = $event"
  >
  </Modal> -->
  <Modal
    :modalTitle="'Add Project'"
    :state="showDialog"
    @stateChange="
      value => {
        showDialog = value
      }
    "
    @hidden="showDialog = false"
  >
  </Modal>
</template>
