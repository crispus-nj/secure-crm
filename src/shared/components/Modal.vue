<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { Modal, type modalPlacement, type modalBackdrop } from 'flowbite'

// Define props
const props = defineProps<{
  modalTitle?: string
  state?: boolean
  closable?: boolean
  backdrop?: modalBackdrop
  placement?: modalPlacement
  width?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full'
}>()

// Define emitted events
const emit = defineEmits<{
  (e: 'stateChange', value: boolean): void
  (e: 'hidden', modal: Modal | null): void
  (e: 'show', modal: Modal | null): void
  (e: 'toggled', modal: Modal | null): void
}>()

const modalElement = ref<HTMLElement | null>(null)
const modal = ref<Modal | null>(null)

// Dynamically compute the width class based on prop
const widthClass = computed(() => {
  const widths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  }

  return widths[props.width || '2xl'] // Default to 'max-w-2xl' if width prop is unrecognized
})

const showModal = () => {
  modal.value?.show()
  emit('stateChange', true)
  emit('show', modal.value)
}

const hideModal = () => {
  modal.value?.hide()
  emit('stateChange', false)
  emit('hidden', modal.value)
}

const toggleModal = () => {
  if (modal.value?.isVisible) {
    hideModal()
  } else {
    showModal()
  }
  emit('toggled', modal.value)
}

const initModal = () => {
  const modalOptions = {
    closable: props.closable,
    backdrop: props.backdrop, // `backdrop` is now typed as modalBackdrop
    placement: props.placement,
    backdropClasses:
      'bg-gray-900 opacity-50 dark:bg-gray-900 dark:opacity-80 fixed inset-0',
    onHide: hideModal,
    onShow: showModal,
    onToggle: toggleModal,
  }

  modal.value = new Modal(modalElement.value as HTMLElement, modalOptions)
}

// Initialize the modal when the component is mounted
onMounted(() => {
  initModal()
  if (props.state) {
    showModal()
  }
})

// Watch the state prop to control modal visibility
watch(
  () => props.state,
  newValue => {
    if (newValue) {
      showModal()
    } else {
      hideModal()
    }
  },
)
</script>

<template>
  <div
    ref="modalElement"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div :class="widthClass" class="relative max-h-full w-full">
      <!-- Modal content -->
      <div
        class="relative rounded-2xl p-4 lg:p-6 2xl:p-8 bg-white shadow dark:bg-gray-700"
      >
        <!-- Modal header -->
        <div
          class="flex items-start justify-between rounded-t dark:border-gray-600"
        >
          <slot name="heading">
            <h3
              class="text-gray-900 dark:text-white title primary-text font-semibold text-base"
            >
              {{ modalTitle }}
            </h3>
          </slot>
          <button
            @click="hideModal"
            type="button"
            class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="max-h-[80vh] overflow-y-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
