import React from 'react'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { EditorLayoutProps } from '../../../interfaces/components.interfaces'
import { EditorBottomToolbar } from './EditorBottomToolbar'

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    maxWidth: 600,
    paddingTop: theme.spacing(2),
  },
}))

export const EditorLayout: React.FC<EditorLayoutProps> = props => {
  const { title, children } = props

  const classes = useStyles()

  return (
    <>
      <Typography variant='h5' align='center'>
        {title}
      </Typography>
      <Grid container spacing={2} className={classes.form}>
        {children}
        <Grid item xs={12}>
          <EditorBottomToolbar {...props} />
        </Grid>
      </Grid>
    </>
  )
}
