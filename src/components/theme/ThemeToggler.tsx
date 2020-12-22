import React from 'react'
import { IconButton } from '@material-ui/core'
import { Brightness4Outlined, Brightness5Outlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../interfaces/redux.interfaces'
import { toggleTheme } from '../../redux/theme/theme-slice'
import { Theme } from '../../interfaces/common.interfaces'

export const ThemeToggler: React.FC = () => {
  const dispatch = useDispatch()
  const { variant } = useSelector((state: RootState) => state.theme)

  const onToggleTheme = dispatch.bind(null, toggleTheme())

  return (
    <IconButton onClick={onToggleTheme} color='inherit'>
      {variant === Theme.Light ? (
        <Brightness4Outlined />
      ) : (
        <Brightness5Outlined />
      )}
    </IconButton>
  )
}
