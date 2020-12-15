import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { UsersView } from '../views/UsersView'

export const BaseRoutes: React.FC = () => (
  <Switch>
    <Route path='/' component={UsersView} />
    <Redirect from='*' to='/' />
  </Switch>
)
