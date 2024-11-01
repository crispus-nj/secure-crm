<script setup lang="ts">
import api from '@/services/http'
import { processHttpErrors } from '@/services/app-service'

import Loader from '@/shared/components/Loader.vue'
import AddProject from './AddProject.vue'

import Button from '@/shared/ui/Button.vue'
import { ref, onMounted, watch, computed } from 'vue'
import Modal from '@/shared/components/Modal.vue'
import type { Project } from '@/models/project'

const projects = ref<Project[]>([])
const loader = ref<boolean>(false)
const showDialog = ref(false)
const searchTerm = ref<string>('')
const sortOrder = ref<string>('Newest')

watch(showDialog, async newValue => {
  if (!newValue) {
    await listProjects()
  }
})

onMounted(async () => {
  await listProjects()
})

const handleDialogClose = async () => {
  showDialog.value = false
  await listProjects()
}

const listProjects = async () => {
  loader.value = true
  try {
    const users = await api.get('/projects')
    projects.value = [...users.data]
    loader.value = false
  } catch (error) {
    loader.value = false
    processHttpErrors(error)
  }
}

const addProject = () => {
  showDialog.value = false
  setTimeout(() => {
    showDialog.value = true
  }, 50)
}

const handleSubmitResult = (result: boolean) => {
  if (result) {
    console.log('Project added successfully.')
    showDialog.value = false
  } else {
    console.error('Failed to add project.')
  }
}

const filteredProjects = computed(() => {
  if (searchTerm.value.trim().length > 5) {
    const filtered = projects.value.filter(project =>
      project.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
    return filtered.length ? filtered : 'Data Not Found'
  }
  return projects.value
})

const sortProjects = () => {
  if (sortOrder.value === 'Newest') {
    projects.value.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    )
  } else {
    projects.value.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    )
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-8">
    <Loader v-if="loader"></Loader>
    <div class="flex justify-end mb-5" v-if="projects.length > 0">
      <Button class="mt-5" @click="addProject">Add Project</Button>
    </div>
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
            v-model="searchTerm"
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
      <div class="overflow-x-auto" v-if="Array.isArray(filteredProjects)">
        <table
          class="w-full bg-white border border-gray-200 rounded-lg min-w-max"
        >
          <thead>
            <tr class="text-left text-gray-500 text-sm uppercase">
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3 hidden md:table-cell">Description</th>
              <th class="px-4 py-3 hidden lg:table-cell">Location</th>
              <th class="px-4 py-3 hidden lg:table-cell">Start Date</th>
              <th class="px-4 py-3 hidden lg:table-cell">End Date</th>
              <th class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in filteredProjects"
              :key="project.id"
              class="text-gray-700"
            >
              <td class="border-t px-4 py-3">
                {{ project.name }}
              </td>
              <td class="border-t px-4 py-3 hidden md:table-cell">
                {{ project.description }}
              </td>
              <td class="border-t px-4 py-3">{{ project.location }}</td>
              <td class="border-t px-4 py-3 hidden lg:table-cell">
                {{ project.startDate }}
              </td>
              <td class="border-t px-4 py-3 hidden lg:table-cell">
                {{ project.endDate }}
              </td>
              <td class="border-t px-4 py-3">
                <button
                  class="border border-gray-400 font-regular text-[12px] px-4 rounded-md py-1"
                >
                  {{ project?.status }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center text-gray-500 py-6">
        {{ filteredProjects }}
      </div>
    </div>
    <div class="flex flex-col justify-center items-center min-h-[50vh]" v-else>
      <span class="font-bold text-blue-500 text-lg">No Project available</span>
      <Button class="mt-5" @click="addProject">Add Project</Button>
    </div>
  </div>

  <Modal
    :modalTitle="'Add Project'"
    :state="showDialog"
    @stateChange="
      (value: any) => {
        showDialog = value
      }
    "
    @hidden="handleDialogClose"
  >
    <AddProject @submitResult="handleSubmitResult" />
  </Modal>
</template>
