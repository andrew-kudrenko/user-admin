import React from 'react'
import {
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  TableHead as MaterialTableHead,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { TableHeadProps } from '../../interfaces/components.interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
)

export function TableHead<T extends object>(props: TableHeadProps<T>) {
  const classes = useStyles()
  const {
    headCells,
    numSelected,
    rowCount,
    orderBy,
    order,
    onRequestSort,
    onSelectAllClick,
  } = props

  const createSortHandler = (property: keyof T) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property)
  }

  return (
    <MaterialTableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map(c => (
          <TableCell
            key={c.id as string}
            align='left'
            padding='default'
            sortDirection={orderBy === c.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === c.id}
              direction={orderBy === c.id ? order : 'asc'}
              onClick={createSortHandler(c.id)}
            >
              {c.label}
              {orderBy === c.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'По убыванию' : 'По возрастанию'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MaterialTableHead>
  )
}
