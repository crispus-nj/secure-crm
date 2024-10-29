<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '@/stores/user'
import Loader from '@/shared/components/Loader.vue'

const store = userStore()
const userInfor = ref({
  email: '',
  password: '',
})

function submit() {
  store.login({ ...userInfor.value })
}
</script>

<template>
  <div
    class="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center"
  >
    <div class="w-[350px] text-[#ffff] p-2">
      <div class="bg-[#6f68d1] p-4 rounded-md">
        <h2 class="text-xl mb-3 font-medium text-center">Welcome to CRM</h2>
        <p class="text-sm mb-3 font-medium text-center">
          Please sign in to your account
        </p>
        <form @submit.prevent="submit">
          <div class="flex flex-col w-full gap-1 mb-3">
            <label for="email">Email</label>
            <input
              v-model="userInfor.email"
              class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
              type="email"
              name="email"
              placeholder="Type Email address"
              id="email"
              required
            />
          </div>
          <div class="flex flex-col w-full gap-1 mb-3">
            <label for="password">Password</label>
            <input
              v-model="userInfor.password"
              class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
              type="password"
              name="password"
              placeholder="Type Password"
              id="password"
              required
            />
          </div>
          <Loader v-if="store.loading" />
          <button
            v-if="!store.loading"
            class="bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
          >
            Sign In
          </button>
          <div class="flex items-center mb-3 gap-3 justify-center">
            <p>
              Don't have an account?
              <router-link class="font-bold" to="/auth/register">
                Sign Up
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
