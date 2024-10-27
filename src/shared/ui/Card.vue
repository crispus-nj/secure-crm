<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/services/app-service'

const props = defineProps<{
  class: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm flex justify-center items-center flex-col',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
