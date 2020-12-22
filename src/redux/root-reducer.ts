import { combineReducers } from 'redux'
import themeReducer from './theme/theme-slice'

export const rootReducer = combineReducers({
  theme: themeReducer,
})
