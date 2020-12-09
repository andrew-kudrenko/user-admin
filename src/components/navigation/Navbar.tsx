import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Container,
} from '@material-ui/core'
import { MenuOutlined as MenuIcon } from '@material-ui/icons'
import { NavbarLogo } from './NavbarLogo'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
)

export const Navbar: React.FC = () => {
  const classes = useStyles()

  return (
    <AppBar position='static' className={classes.root}>
      <Container>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <NavbarLogo />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
