<script setup lang="ts">
import type { IEvent } from '@/models/Event'
import type { IUser } from '@/models/User'
import {
  processHttpErrors,
  convertDateToMoreReadable,
} from '@/services/app-service'
import api from '@/services/http'
import Loader from '@/shared/components/Loader.vue'
import Card from '@/shared/ui/Card.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref<IUser[]>([])
const events = ref<IEvent[]>([])
const loading = ref<boolean>(false)

const limit = defineProps({
  limit: {
    type: Number,
    default: 3,
  },
})

const viewUsers = () => {
  router.push({ name: 'Users' })
}
const viewAllevents = () => {
  router.push({ name: 'Events' })
}

const listUsers = async () => {
  try {
    loading.value = true
    const response = await api.get('/users')
    users.value = response.data
    loading.value = false
  } catch (error) {
    loading.value = false
    processHttpErrors(error)
  }
}

const listEvents = async () => {
  loading.value = true
  try {
    const users = await api.get('/events')
    events.value = [...users.data].splice(0, 4)
    loading.value = false
  } catch (error) {
    loading.value = false
    processHttpErrors(error)
  }
}

onMounted(async () => {
  listEvents()
  listUsers()
})
</script>

<template>
  <!-- lg:flex lg:space-x-6 -->
  <div class="grid lg:grid-cols-[3fr_1fr] lg:gap-4 gap-8">
    <div class="shadow-xl rounded-lg flex-grow">
      <p class="flex justify-between items-center px-10">
        <span class="font-medium text-lg">Users</span>
        <span
          class="text-[#3F8CFF] cursor-pointer hover:underline"
          @click="viewUsers"
          >View All</span
        >
      </p>
      <section v-if="!loading">
        <div class="grid md:grid-cols-3 md:gap-6 gap-8 lg:gap-4 p-10">
          <Card
            class="space-y-2 pt-6 pb-6 rounded-2xl bg-[#F4F9FD] shadow-lg border-none"
            v-for="user in users.splice(0, limit.limit)"
            v-bind:key="user.id"
          >
            <!-- Profile logo -->
            <div class="">
              <img src="" class="w-20 rounded-full" />
              <!-- <i class="pi pi-user w-10 h-10 bg-transparent"></i> -->
            </div>
            <!-- name -->
            <p class="font-semibold text-sm text-center">
              {{ user?.firstName }} {{ user?.lastName }}
            </p>
            <!-- title -->
            <p class="font-regular text-sm text-center">{{ user?.email }}</p>
            <p class="font-regular text-sm text-center">
              {{ user?.phoneNumber }}
            </p>
            <!-- level -->

            <button
              class="border border-gray-400 font-regular text-[12px] px-4 rounded-md py-1"
            >
              {{ user?.role?.name }}
            </button>
          </Card>
        </div>
      </section>

      <div
        class="flex flex-col justify-center items-center min-h-[50vh]"
        v-else
      >
        <!-- <span class="font-bold text-blue-500 text-lg">No Users available</span> -->
        <Loader />
      </div>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Events</h2>
        <a href="#" class="text-blue-500 hover:underline" @click="viewAllevents"
          >View all</a
        >
      </div>

      <!-- Event Item 1 -->
      <div
        class="flex items-center gap-4 mb-4"
        v-for="event in events"
        v-bind:key="event.id"
      >
        <div class="w-1 bg-blue-500 h-full rounded"></div>
        <div class="flex-1">
          <h3 class="font-semibold">{{ event.name }}</h3>
          <p class="text-gray-500 text-sm">
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
          <span class="text-sm">4h</span>
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
</template>
