<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '@/stores/user'
import Loader from '@/shared/components/Loader.vue'

const store = userStore()

const userInfor = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  kraPin: '',
  password: '',
  attachments: [],
})

const submit = async () => {
  const attachments = await Promise.all(
    (userInfor.value.attachments || []).map(file => convertFileToBase64(file)),
  )
  const userObj = {
    firstName: userInfor.value.firstName.trim(),
    lastName: userInfor.value.lastName.trim(),
    password: userInfor.value.password.trim(),
    kraPin: userInfor.value.kraPin.trim(),
    email: userInfor.value.email.trim(),
    address: userInfor.value.address.trim(),
    attachments: attachments,
    phoneNumber: userInfor.value.phoneNumber.trim(),
    role: 1,
  }
  store.register({ ...userObj })
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}
</script>

<template>
  <div
    class="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center"
  >
    <div class="md:w-1/2 text-[#ffff] p-2">
      <div class="bg-[#6f68d1] p-4 rounded-md">
        <h2 class="text-xl mb-3 font-medium text-center">Welcome to CRM</h2>
        <p class="text-sm mb-3 font-medium text-center">
          Please create your account
        </p>
        <form @submit.prevent="submit">
          <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2">
            <div class="flex flex-col w-full gap-1 mb-3">
              <label for="email">First Name</label>
              <input
                v-model="userInfor.firstName"
                class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="text"
                name="firstName"
                placeholder="Type First Name"
                id="firstName"
                required
              />
            </div>
            <div class="flex flex-col w-full gap-1 mb-3">
              <label for="email">Last Name</label>
              <input
                v-model="userInfor.lastName"
                class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="text"
                name="lastName"
                placeholder="Type Last Name"
                id="lastName"
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
              <label for="email">Address</label>
              <input
                v-model="userInfor.address"
                class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="text"
                name="address"
                placeholder="Type Address"
                id="address"
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
              <label for="email">KRA Pin photo</label>
              <input
                v-on="userInfor.attachments"
                class="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="file"
                multiple
                name="attachments"
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
          </div>
          <div class="flex flex-col justify-center items-center mt-6">
            <Loader v-if="store.loading" />
            <button
              v-if="!store.loading"
              class="bg-slate-800 w-full md:w-1/3 hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
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
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
