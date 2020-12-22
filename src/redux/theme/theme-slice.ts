import { createSlice } from '@reduxjs/toolkit'
import { Theme } from '../../interfaces/common.interfaces'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { variant: Theme.Light },
  reducers: {
    toggleTheme: state => {
      state.variant = state.variant === Theme.Light ? Theme.Dark : Theme.Light
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
