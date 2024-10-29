import type { IUser } from './User'

export interface Role {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  users: IUser[]
}
