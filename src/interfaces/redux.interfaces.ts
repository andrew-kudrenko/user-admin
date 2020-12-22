import { Nullable, Theme } from './common.interfaces'
import { User } from './entities.interfaces'

export interface PartialState<T, E = string> {
  data: T
  loading: boolean
  error: Nullable<E>
}

export interface ThemeState {
  variant: Theme
}

export interface RootState {
  theme: ThemeState
}

export type UsersState = PartialState<Array<User>>
