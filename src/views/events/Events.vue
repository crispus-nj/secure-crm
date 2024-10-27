<script setup lang="ts"></script>
<template>
  <div class="title flex justify-between items-center mb-4">
    <p class="font-medium text-base">Nearest Events</p>
    <button>Add Events</button>
  </div>
  <div class="bg-gray-50 p-4">
    <div class="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      <!-- Card 1 -->
      <div
        class="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4"
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
              Presentation of the new department
            </h3>
          </div>
          <p class="text-sm text-gray-500">Today | 5:00 PM</p>
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

      <!-- Card 2 -->
      <div
        class="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4"
      >
        <div class="w-1 bg-pink-500 rounded h-full"></div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <svg
              class="h-5 w-5 text-pink-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <!-- Icon (Example: Birthday) -->
              <path
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.414V7a1 1 0 0 0-2 0v5.586l4.707 4.707a1 1 0 1 0 1.414-1.414z"
              ></path>
            </svg>
            <h3 class="font-semibold text-gray-700">Anna's Birthday</h3>
          </div>
          <p class="text-sm text-gray-500">Today | 6:00 PM</p>
        </div>
        <div class="flex items-center gap-1 text-gray-500">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <!-- Clock Icon -->
            <path
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.414V7a1 1 0 0 0-2 0v5.586l4.707 4.707a1 1 0 1 0 1.414-1.414z"
            ></path>
          </svg>
          <span class="text-sm">2h</span>
          <svg
            class="h-4 w-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <!-- Down Arrow Icon -->
            <path d="M12 20l-6-6h5V4h2v10h5l-6 6z"></path>
          </svg>
        </div>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4"
      >
        <div class="w-1 bg-pink-500 rounded h-full"></div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <svg
              class="h-5 w-5 text-pink-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <!-- Icon (Example: Birthday) -->
              <path
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.414V7a1 1 0 0 0-2 0v5.586l4.707 4.707a1 1 0 1 0 1.414-1.414z"
              ></path>
            </svg>
            <h3 class="font-semibold text-gray-700">Anna's Birthday</h3>
          </div>
          <p class="text-sm text-gray-500">Today | 6:00 PM</p>
        </div>
        <div class="flex items-center gap-1 text-gray-500">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <!-- Clock Icon -->
            <path
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.414V7a1 1 0 0 0-2 0v5.586l4.707 4.707a1 1 0 1 0 1.414-1.414z"
            ></path>
          </svg>
          <span class="text-sm">2h</span>
          <svg
            class="h-4 w-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <!-- Down Arrow Icon -->
            <path d="M12 20l-6-6h5V4h2v10h5l-6 6z"></path>
          </svg>
        </div>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4"
      >
        <div class="w-1 bg-pink-500 rounded h-full"></div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <svg
              class="h-5 w-5 text-pink-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <!-- Icon (Example: Birthday) -->
              <path
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.414V7a1 1 0 0 0-2 0v5.586l4.707 4.707a1 1 0 1 0 1.414-1.414z"
              ></path>
            </svg>
            <h3 class="font-semibold text-gray-700">Anna's Birthday</h3>
          </div>
          <p class="text-sm text-gray-500">Today | 6:00 PM</p>
        </div>
        <div class="flex items-center gap-1 text-gray-500">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <!-- Clock Icon -->
            <path
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.414V7a1 1 0 0 0-2 0v5.586l4.707 4.707a1 1 0 1 0 1.414-1.414z"
            ></path>
          </svg>
          <span class="text-sm">2h</span>
          <svg
            class="h-4 w-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <!-- Down Arrow Icon -->
            <path d="M12 20l-6-6h5V4h2v10h5l-6 6z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
