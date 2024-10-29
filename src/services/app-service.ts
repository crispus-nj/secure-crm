import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const processHttpErrors = (error: unknown) => {
  console.log(error)
  const router = useRouter()
  const $toast = useToast()
  if (error.status == 401) {
    $toast.error(error.response.data.message, {
      position: 'top-right',
    })
    router.push({ name: 'Login' })
  } else {
    $toast.error(error.toString(), {
      position: 'top-right',
    })
  }
}
