<script setup lang="ts">
import api from '@/services/http'
import {
  processHttpErrors,
  convertDateToMoreReadable,
  timeAgo,
} from '@/services/app-service'

import Loader from '@/shared/components/Loader.vue'
import AddEvent from './AddEvent.vue'

import Button from '@/shared/ui/Button.vue'

import { ref, onMounted, watch } from 'vue'
import Modal from '@/shared/components/Modal.vue'
import type { IEvent } from '@/models/Event'

const events = ref<IEvent[]>([])
const loader = ref(false)
const showDialog = ref(false)

watch(showDialog, async newValue => {
  if (!newValue) {
    await listEvents()
  }
})

onMounted(async () => {
  await listEvents()
})

const handleDialogClose = async () => {
  console.log('a-a-a-a-a-a--a-a--a')
  showDialog.value = false
  await listEvents()
}

const listEvents = async () => {
  loader.value = true
  try {
    const users = await api.get('/events')
    events.value = [...users.data] // Ensure the data structure matches your expected format
    loader.value = false
  } catch (error) {
    loader.value = false
    processHttpErrors(error)
  }
}

const addEvent = () => {
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
</script>
<template>
  <Loader v-if="loader"></Loader>
  <div class="title flex justify-between items-center mb-4">
    <p class="font-medium text-base">Events</p>
    <Button class="mt-5" @click="addEvent">Add Event</Button>
  </div>
  <div class="bg-gray-50 p-4">
    <div class="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      <!-- Card 1 -->
      <div
        class="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4"
        v-for="event in events"
        v-bind:key="event.id"
      >
        <div class="w-1 bg-blue-500 rounded h-full"></div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <svg
              class="h-5 w-5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <!-- Icon (Example: Event or Calendar) -->
              <path
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.414V7a1 1 0 0 0-2 0v5.586l4.707 4.707a1 1 0 1 0 1.414-1.414z"
              ></path>
            </svg>
            <h3 class="font-semibold text-gray-700">
              {{ event.name }}
            </h3>
          </div>
          <p class="text-sm text-gray-500">
            {{ convertDateToMoreReadable(event.createdAt) }}
          </p>
        </div>
        <div class="flex items-center gap-1 text-gray-500">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <!-- Clock Icon -->
            <path
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.414V7a1 1 0 0 0-2 0v5.586l4.707 4.707a1 1 0 1 0 1.414-1.414z"
            ></path>
          </svg>
          <span class="text-sm">{{ timeAgo(event.createdAt) }}</span>
          <svg
            class="h-4 w-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <!-- Up Arrow Icon -->
            <path d="M12 4l6 6h-5v10h-2V10H6l6-6z"></path>
          </svg>
        </div>
      </div>
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
    <AddEvent @submitResult="handleSubmitResult" />
  </Modal>
</template>
