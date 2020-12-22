import {
  createMuiTheme,
  Theme as MaterialTheme,
} from '@material-ui/core/styles'
import * as colors from '@material-ui/core/colors'
import { Theme } from '../interfaces/common.interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../interfaces/redux.interfaces'
import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/local-storage.hook'

export const useCustomTheme = (): MaterialTheme => {
  const { variant } = useSelector((state: RootState) => state.theme)
  const [, setStoredTheme] = useLocalStorage<Theme>('theme', variant)

  useEffect(setStoredTheme.bind(null, variant), [variant])

  return createMuiTheme({
    palette: {
      primary: { main: colors.deepPurple[500] },
      type: variant === Theme.Light ? 'light' : 'dark',
    },
  })
}
