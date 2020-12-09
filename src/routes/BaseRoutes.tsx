import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

export const BaseRoutes: React.FC = () => (
  <Switch>
    <Route />
    <Redirect from='*' to='/' />
  </Switch>
)
