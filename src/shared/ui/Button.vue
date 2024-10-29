<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/services/app-service'

const props = defineProps<{
  class: HTMLAttributes['class']
}>()
</script>

<template>
  <button
    :class="
      cn(
        'rounded-lg py-2 border border-blue-600 text-slate-950 hover:bg-blue-500 hover:text-white font-medium px-10',
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>
