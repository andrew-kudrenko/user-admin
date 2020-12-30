import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  TableRow as MaterialTableRow,
  TableCell,
  Paper,
  TableContainer,
  Table as MaterialTable,
  TableBody,
  TablePagination,
} from '@material-ui/core'
import { Order, stableSort, getComparator } from '../../helpers/table.helpers'
import { TableHead } from './TableHead'
import { ID } from '../../interfaces/entities.interfaces'
import { TableToolbar } from './TableToolbar'
import { useSelect } from '../../hooks/select.hook'
import { TableRow } from './TableRow'
import { HeadCell, TableProps } from '../../interfaces/components.interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      minWidth: 450,
      maxWidth: 1000,
    },
  })
)

export function Table<T extends object>(props: TableProps<T>) {
  const { data, title, headCells, onRemove } = props

  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof ID<T>>('id')
  const [page, setPage] = React.useState(0)
  const [dataPerPage, setRowsPerPage] = React.useState(5)

  const { selected, onToggle, onToggleAll, includes } = useSelect(data)

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    dataPerPage - Math.min(dataPerPage, data.length - page * dataPerPage)

  return (
    <Paper className={classes.paper}>
      <TableToolbar
        numSelected={selected.length}
        onRemove={onRemove.bind(null, selected)}
        title={title}
      />
      <TableContainer>
        <MaterialTable size='medium'>
          <TableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy as string}
            onSelectAllClick={onToggleAll.bind(
              null,
              data.map(item => item.id)
            )}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            headCells={headCells as Array<HeadCell<object>>}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy as any))
              .slice(page * dataPerPage, page * dataPerPage + dataPerPage)
              .map(item => (
                <TableRow
                  onClick={onToggle.bind(null, item.id)}
                  selected={includes(item.id as string)}
                  key={item.id}
                  data={item}
                  headCells={headCells as Array<HeadCell<object>>}
                />
              ))}
            {emptyRows > 0 && (
              <MaterialTableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </MaterialTableRow>
            )}
          </TableBody>
        </MaterialTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={data.length}
        rowsPerPage={dataPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage='Показать на странице'
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count}`
        }
      />
    </Paper>
  )
}
