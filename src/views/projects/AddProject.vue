<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Loader from '@/shared/components/Loader.vue'
import api from '@/services/http'
import { processHttpErrors } from '@/services/app-service'

const projectInfor = ref({
  name: '',
  description: '',
  location: '',
  status: '',
  startDate: '',
  endDate: '',
})

const loading = ref(false)

const emit = defineEmits(['submitResult'])

const submit = async () => {
  loading.value = true
  try {
    // Simulate an async operation here (e.g., API call)
    await api.post('/projects', { ...projectInfor.value })

    // Emit true if operation succeeds
    emit('submitResult', true)
  } catch (error) {
    // Emit false if operation fails
    emit('submitResult', false)
    processHttpErrors(error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <section>
    <form @submit.prevent="submit">
      <div class="flex flex-col w-full gap-1 mb-3">
        <label for="email">Name</label>
        <input
          v-model="projectInfor.name"
          class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
          type="text"
          name="name"
          placeholder="Type Project Name"
          id="projectName"
          required
        />
      </div>
      <div class="flex flex-col w-full gap-1 mb-3">
        <label for="email">Start Date</label>
        <input
          v-model="projectInfor.startDate"
          class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
          type="date"
          name="startDate"
          id="startDate"
          required
        />
      </div>
      <div class="flex flex-col w-full gap-1 mb-3">
        <label for="email">End Date</label>
        <input
          v-model="projectInfor.endDate"
          class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
          type="date"
          name="endDate"
          id="emendDateail"
          required
        />
      </div>
      <div class="flex flex-col w-full gap-1 mb-3">
        <label for="location">Location</label>
        <input
          v-model="projectInfor.location"
          class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
          type="location"
          name="location"
          placeholder="Type location"
          id="location"
          required
        />
      </div>
      <div class="flex flex-col w-full gap-1 mb-3">
        <label for="status">Status</label>
        <select
          v-model="projectInfor.status"
          class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
          name="status"
          id="status"
          required
        >
          <option value="" disabled>Select Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div class="flex flex-col w-full gap-1 mb-3">
        <label for="password">Description</label>
        <textarea
          v-model="projectInfor.description"
          class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
          type="password"
          name="password"
          placeholder="Type Project Description"
          id="password"
          required
        ></textarea>
      </div>
      <Loader v-if="loading" />
      <button
        v-if="!loading"
        class="bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
      >
        Add Project
      </button>
    </form>
  </section>
</template>
