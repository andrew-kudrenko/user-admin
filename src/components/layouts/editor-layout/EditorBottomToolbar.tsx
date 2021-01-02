import React from 'react'
import { Box, makeStyles, Theme } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { EditorBottomToolbarProps } from '../../../interfaces/components.interfaces'
import { StatefulButton } from '../../buttons/StatefulButton'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  success: {
    backgroundColor: theme.palette.success.main,
  },
  info: {
    backgroundColor: theme.palette.info.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
}))

export const EditorBottomToolbar: React.FC<EditorBottomToolbarProps> = props => {
  const { onSave, onRemove, mode, valid, id } = props

  const classes = useStyles()
  const history = useHistory()

  const delay = 1500

  const onSaveAndLeave = async () => {
    try {
      await onSave()
      setTimeout(history.goBack, delay)
    } catch (e) {
      throw e
    }
  }

  const onSaveAndResumeEditing = async () => {
    try {
      await onSave()

      const pathname = window.location.pathname
        .split('/')
        .map(s => (s === 'add' ? 'edit' : s))
        .join('/')

      history.replace(`${pathname}/${id}`)
    } catch (e) {
      throw e
    }
  }

  const onRemoveAndLeave = async () => {
    try {
      await onRemove()

      const pathFragments = window.location.pathname.split('/')
      const indexOfActionFragment = pathFragments.findIndex(
        f => f === 'edit' || f === 'add'
      )
      const pathname = pathFragments.slice(0, indexOfActionFragment).join('/')

      history.replace(`${pathname}/`)
    } catch (e) {
      throw e
    }
  }

  return (
    <Box className={classes.root}>
      {mode === 'edit' && (
        <StatefulButton
          className={classes.error}
          onClick={onRemoveAndLeave}
          variant='contained'
        >
          {'Удалить'}
        </StatefulButton>
      )}
      <StatefulButton
        className={`${classes.info} ${classes.middle}`}
        onClick={mode === 'add' ? onSaveAndResumeEditing : onSave}
        variant='outlined'
        disabled={!valid}
      >
        {'Сохранить'}
      </StatefulButton>
      <StatefulButton
        className={classes.success}
        onClick={onSaveAndLeave}
        variant='contained'
        disabled={!valid}
      >
        {'Сохранить и выйти'}
      </StatefulButton>
    </Box>
  )
}
