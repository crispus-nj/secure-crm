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
    $toast.error(error.response.message)
    router.push('Login')
  } else {
    $toast.error(error.toString())
  }
}
