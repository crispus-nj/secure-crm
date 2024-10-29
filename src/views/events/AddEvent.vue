<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Loader from '@/shared/components/Loader.vue'
import api from '@/services/http'
import { processHttpErrors } from '@/services/app-service'

const projectInfor = ref({
  name: '',
})

const loading = ref(false)

const emit = defineEmits(['submitResult'])

const submit = async () => {
  loading.value = true
  try {
    // Simulate an async operation here (e.g., API call)
    await api.post('/events', { ...projectInfor.value })

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
          placeholder="Type Event Name"
          id="projectName"
          required
        />
      </div>

      <Loader v-if="loading" />
      <button
        v-if="!loading"
        class="bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
      >
        Add Event
      </button>
    </form>
  </section>
</template>
