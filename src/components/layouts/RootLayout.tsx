import React from 'react'
import { Container, Box, makeStyles, Theme } from '@material-ui/core'
import { Navbar } from '../navigation/Navbar'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export const RootLayout: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <Navbar />
      <Container className={classes.container}>
        <Box className={classes.main}>{children}</Box>
      </Container>
    </>
  )
}
