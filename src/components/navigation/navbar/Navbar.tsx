import React from 'react'
import clsx from 'clsx'
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
import { ThemeToggler } from '../../theme/ThemeToggler'
import { Drawer } from '../drawer/Drawer'
import { DrawerProps } from '../../../interfaces/components.interfaces'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
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

export const Navbar: React.FC<DrawerProps> = ({ opened, onToggle }) => {
  const classes = useStyles()

  return (
    <>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: opened,
        })}
      >
        <Container>
          <Toolbar className={classes.toolbar}>
            <Box className={classes.row}>
              {!opened && (
                <IconButton
                  edge='start'
                  className={classes.menuButton}
                  color='inherit'
                  onClick={onToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <NavbarLogo />
            </Box>
            <Box>
              <ThemeToggler />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer opened={opened} onToggle={onToggle} />
    </>
  )
}
