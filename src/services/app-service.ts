import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processHttpErrors = (error: any) => {
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

export const timeAgo = (isoString: string) => {
  // Parse the ISO string into a Date object
  const date: Date = new Date(isoString)

  // Get the current date and time
  const now = new Date()
  const diffTime = now.getTime() - date.getTime() // Difference in milliseconds

  // Calculate time units
  const seconds = Math.floor(diffTime / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  // Determine the appropriate string based on the time difference
  let result
  if (seconds < 60) {
    result = seconds === 1 ? '1 second ago' : `${seconds} seconds ago`
  } else if (minutes < 60) {
    result = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  } else if (hours < 24) {
    result = hours === 1 ? '1 hour ago' : `${hours} hours ago`
  } else {
    result = days === 1 ? '1 day ago' : `${days} days ago`
  }

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showToast = (message: any, type: string) => {
  const $toast = useToast()

  const toastOptions = {
    position: 'top-right' as
      | 'top-right'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-left',
  }

  switch (type) {
    case 'error':
      $toast.error(message.toString(), toastOptions)
      break
    case 'success':
      $toast.success(message.toString(), toastOptions)
      break
    case 'info':
      $toast.info(message.toString(), toastOptions)
      break
    case 'warning':
      $toast.warning(message.toString(), toastOptions)
      break
  }
}
