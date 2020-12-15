import { Order } from '../helpers/table.helpers'
import { ID, IDType } from './entities.interfaces'

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
