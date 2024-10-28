import type { IRole } from './role.interface'

export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  kraPin: string
  role: IRole
  attachments: string[]
  createdAt: Date
  updatedAt: Date
  token: string
}
