import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { BaseRoutes } from '../../routes/BaseRoutes'
import { RootLayout } from '../layouts/root/RootLayout'
import { useCustomTheme } from '../../styles/theme'

export const App: React.FC = () => {
  const theme = useCustomTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootLayout>
        <BaseRoutes />
      </RootLayout>
    </ThemeProvider>
  )
}
