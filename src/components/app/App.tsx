import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { BaseRoutes } from '../../routes/BaseRoutes'
import { RootLayout } from '../layouts/RootLayout'

export const App: React.FC = () => {
  return (
    <RootLayout>
      <CssBaseline />
      <BaseRoutes />
    </RootLayout>
  )
}
