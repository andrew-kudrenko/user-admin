import React from 'react'
import {
  Checkbox,
  TableCell,
  TableRow as MaterialTableRow,
} from '@material-ui/core'
import { TableRowProps } from '../../interfaces/components.interfaces'

export function TableRow<T extends object>(props: TableRowProps<T>) {
  const { data, selected, headCells, onClick } = props

  return (
    <MaterialTableRow
      hover
      role='checkbox'
      tabIndex={-1}
      onClick={onClick}
      selected={selected}
    >
      <TableCell padding='checkbox'>
        <Checkbox checked={selected} />
      </TableCell>
      {headCells.map(c => (
        <TableCell
          component='th'
          scope='row'
          padding='default'
          key={c.id as string}
        >
          {typeof data[c.id] === 'boolean'
            ? data[c.id]
              ? 'Да'
              : 'Нет'
            : data[c.id]}
        </TableCell>
      ))}
    </MaterialTableRow>
  )
}
