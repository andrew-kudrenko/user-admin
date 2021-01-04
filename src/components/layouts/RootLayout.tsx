import React, { useState } from 'react'
import clsx from 'clsx'
import { Container, Box, makeStyles, Theme } from '@material-ui/core'
import { Navbar } from '../navigation/navbar/Navbar'

const drawerWidth = 240
const appBarHeight = 65

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: appBarHeight + theme.spacing(2),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 72,
  },
  shiftedByDrawer: {
    paddingLeft: drawerWidth,
  },
}))

export const RootLayout: React.FC = ({ children }) => {
  const classes = useStyles()

  const [opened, setOpened] = useState(false)

  return (
    <>
      <Navbar opened={opened} onToggle={setOpened.bind(null, !opened)} />
      <Container className={classes.container}>
        <Box
          className={clsx(classes.main, { [classes.shiftedByDrawer]: opened })}
        >
          {children}
        </Box>
      </Container>
    </>
  )
}
