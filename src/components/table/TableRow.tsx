import React from 'react'
import {
  Box,
  Checkbox,
  IconButton,
  makeStyles,
  TableCell,
  TableRow as MaterialTableRow,
  Theme,
} from '@material-ui/core'
import { TableRowProps } from '../../interfaces/components.interfaces'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'
import { ID } from '../../interfaces/entities.interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export function TableRow<T extends object>(props: TableRowProps<ID<T>>) {
  const { data, selected, headCells, onClick } = props

  const classes = useStyles()

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
          {typeof data[c.id] === 'boolean' ? (
            <Box className={classes.centered}>
              {data[c.id] ? (
                <CheckOutlined className={classes.success} />
              ) : (
                <CloseOutlined className={classes.error} />
              )}
            </Box>
          ) : (
            data[c.id]
          )}
        </TableCell>
      ))}
      <TableCell padding='checkbox'>
        <IconButton component={NavLink} to={`edit/${data.id}`}>
          <EditOutlined />
        </IconButton>
      </TableCell>
    </MaterialTableRow>
  )
}
