import {
  createMuiTheme,
  Theme as MaterialTheme,
} from '@material-ui/core/styles'
import * as colors from '@material-ui/core/colors'
import { Theme } from '../interfaces/common.interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../interfaces/redux.interfaces'

export const useCustomTheme = (): MaterialTheme => {
  const { variant } = useSelector((state: RootState) => state.theme)

  return createMuiTheme({
    palette: {
      primary: { main: colors.deepPurple[500] },
      type: variant === Theme.Light ? 'light' : 'dark',
    },
  })
}
