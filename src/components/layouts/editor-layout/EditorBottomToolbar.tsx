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
  const { onSave, onRemove, mode } = props

  const classes = useStyles()
  const history = useHistory()

  const delay = 1500

  const onDelayedSave = async () => {
    try {
      await onSave()
      setTimeout(history.goBack, delay)
    } catch (e) {
      throw e
    }
  }

  return (
    <Box className={classes.root}>
      {mode === 'edit' && (
        <StatefulButton
          className={classes.error}
          onClick={onRemove}
          variant='contained'
        >
          {'Удалить'}
        </StatefulButton>
      )}
      <StatefulButton
        className={`${classes.info} ${classes.middle}`}
        onClick={onSave}
        variant='outlined'
      >
        {'Сохранить'}
      </StatefulButton>
      <StatefulButton
        className={classes.success}
        onClick={onDelayedSave}
        variant='contained'
      >
        {'Сохранить и выйти'}
      </StatefulButton>
    </Box>
  )
}
