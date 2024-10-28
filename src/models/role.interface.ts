import type { IUser } from './user.interface'

export interface IRole {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  users: IUser[]
}
