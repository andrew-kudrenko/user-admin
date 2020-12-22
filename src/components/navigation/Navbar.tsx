import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Box,
} from '@material-ui/core'
import { MenuOutlined as MenuIcon } from '@material-ui/icons'
import { NavbarLogo } from './NavbarLogo'
import { ThemeToggler } from '../theme/ThemeToggler'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    row: {
      display: 'flex',
      alignItems: 'center',
    },
    toolbar: {
      justifyContent: 'space-between',
    },
  })
)

export const Navbar: React.FC = () => {
  const classes = useStyles()

  return (
    <AppBar position='static' className={classes.root}>
      <Container>
        <Toolbar className={classes.toolbar}>
          <Box className={classes.row}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>

            <NavbarLogo />
          </Box>
          <Box>
            <ThemeToggler />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
