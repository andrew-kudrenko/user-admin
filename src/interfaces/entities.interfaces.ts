export type IDType = string

export type ID<T extends object> = { id: IDType } & { [K in keyof T]: T[K] }

export type Role = 'admin' | 'partner' | 'client'

export interface User {
  email: string
  password: string
  name: string
  phone: string
  role: Role
  createdOn: Date | string
  updatedOn: Date | string
}
