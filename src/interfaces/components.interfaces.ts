import { ButtonProps } from '@material-ui/core'
import { Order } from '../helpers/table.helpers'
import { ID, IDType } from './entities.interfaces'

export type EditorMode = 'add' | 'edit'

export interface HeadCell<T extends object> {
  id: keyof T
  label: string
}

export interface TableRowProps<T extends object> {
  data: T
  selected: boolean
  headCells: Array<HeadCell<T>>
  onClick: () => void
}

export interface TableHeadProps<T extends object> {
  numSelected: number
  order: Order
  orderBy: string
  rowCount: number
  headCells: Array<HeadCell<T>>
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface TableProps<T extends object> {
  data: Array<ID<T>>
  title: string
  headCells: Array<HeadCell<T>>
  onRemove: (id: Array<IDType>) => void
}

export interface EditorBottomToolbarProps {
  mode: EditorMode
  onSave: (() => Promise<void>) | (() => void)
  onRemove: (() => Promise<void>) | (() => void)
}

export interface EditorLayoutProps extends EditorBottomToolbarProps {
  title: string
  valid: boolean
  onSave: (() => Promise<void>) | (() => void)
  onRemove: (() => Promise<void>) | (() => void)
}

export type EditorViewProps = Pick<EditorLayoutProps, 'title' | 'mode'>

export interface StatefulButtonProps extends ButtonProps {
  onClick: (() => Promise<void>) | (() => void)
}
