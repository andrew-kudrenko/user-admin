import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  lighten,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Popover,
} from '@material-ui/core'
import {
  AddOutlined as AddOutlinedIcon,
  DeleteOutlined as DeleteIcon,
  FilterListOutlined as FilterListIcon,
} from '@material-ui/icons'
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { TableToolbarProps } from '../../interfaces/components.interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  })
)

export const TableToolbar: React.FC<TableToolbarProps> = props => {
  const { title, numSelected, onRemove, filter } = props

  const classes = useStyles()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'filter-popup',
  })

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {`${numSelected} выбрано`}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Удалить'>
          <IconButton onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <IconButton component={NavLink} to='add'>
            <AddOutlinedIcon color='inherit' />
          </IconButton>
          <IconButton {...bindTrigger(popupState)}>
            <FilterListIcon color='inherit' />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            {filter}
          </Popover>
        </>
      )}
    </Toolbar>
  )
}
