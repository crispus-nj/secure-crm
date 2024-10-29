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

export const convertDateToMoreReadable = (date: string) => {
  const receivedDate = new Date(date)

  // Define an array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Define an array of day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const day = String(receivedDate.getUTCDate()).padStart(2, '0')
  const month = monthNames[receivedDate.getUTCMonth()] // Get month name
  const year = receivedDate.getUTCFullYear()
  const hours = String(receivedDate.getUTCHours()).padStart(2, '0')
  const minutes = String(receivedDate.getUTCMinutes()).padStart(2, '0')
  const seconds = String(receivedDate.getUTCSeconds()).padStart(2, '0')
  const weekday = dayNames[receivedDate.getUTCDay()] // Get day name

  // Return the formatted date string
  return `${weekday}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds}`
}
