<script setup lang="ts">
import { ref } from 'vue'

const userInfor = ref({
  email: '',
  password: '',
})

function submit() {
  // Form submission logic
  console.log(userInfor.value.email)
  console.log(userInfor.value.password)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleInputChange(event: Event) {
  // Input change handling logic if needed
  const { name, value } = event.target as HTMLInputElement
  console.log(name, value)
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
          Please create your account
        </p>
        <form @submit.prevent="submit">
          <div class="flex flex-col w-full gap-1 mb-3">
            <label for="email">Name</label>
            <input
              v-model="userInfor.name"
              class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
              type="text"
              name="name"
              placeholder="Type Name"
              id="name"
              required
            />
          </div>
          <div class="flex flex-col w-full gap-1 mb-3">
            <label for="email">Phone Number</label>
            <input
              v-model="userInfor.phoneNumber"
              class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
              type="text"
              name="phoneNumber"
              placeholder="Type Phone Number"
              id="phoneNumber"
              required
            />
          </div>
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
            <label for="email">KRA Pin</label>
            <input
              v-model="userInfor.kraPin"
              class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
              type="text"
              name="kraPin"
              placeholder="Type KRA Pin"
              id="kraPin"
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
          <div class="flex flex-col w-full gap-1 mb-3">
            <label for="password">Confirm Password</label>
            <input
              v-model="userInfor.password2"
              class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
              type="password"
              name="password"
              placeholder="Type Password"
              id="password"
              required
            />
          </div>
          <button
            class="bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
          >
            Register
          </button>
          <div class="flex items-center mb-3 gap-3 justify-center">
            <p>
              Already have an account?
              <router-link class="font-bold" to="/auth/login">
                Sign In
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
