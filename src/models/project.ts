import type { IUser } from './User'

export interface Project {
  id: number
  name: string
  description?: string
  location?: string
  status: string
  startDate: Date
  endDate: Date
  createdBy: IUser
  assignedUsers: IUser[]
  createdAt: Date
  updatedAt: Date
}
