import React from 'react'
import {
  Paper,
  Typography,
  Box,
  makeStyles,
  createStyles,
  Theme,
  Button,
  Grid,
} from '@material-ui/core'
import clsx from 'clsx'
import { FilterLayoutProps } from '../../../interfaces/components.interfaces'

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 300,
      margin: spacing(0, 2, 2),
      padding: spacing(2),
    },
    apply: { backgroundColor: palette.primary.main },
    clear: { backgroundColor: palette.secondary.main },
    mr: { marginRight: spacing(1) },
    children: {
      flexGrow: 1,
    },
  })
)

export const FilterLayout: React.FC<FilterLayoutProps> = props => {
  const { children, onClear } = props
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Typography variant='h6' gutterBottom align='center'>
        {'Фильтры'}
      </Typography>
      <Box
        className={classes.children}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Grid container spacing={2}>
          {children}
        </Grid>
        <Box display='flex' justifyContent='flex-end' alignItems='center'>
          <Button
            onClick={onClear}
            className={clsx([classes.clear, classes.mr])}
          >
            {'Сбросить'}
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
