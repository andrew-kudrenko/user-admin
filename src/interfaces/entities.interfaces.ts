export type IDType = string

export type ID<T extends object> = { id: IDType } & { [K in keyof T]: T[K] }

export interface User {
  email: string
  password: string
  name: string
  phone: string
  role: string
  createdOn: string
  updatedOn: string
}
