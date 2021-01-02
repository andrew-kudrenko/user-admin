import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { UserFormView } from '../views/users/UserFormView'
import { UsersView } from '../views/users/UsersView'

export const BaseRoutes: React.FC = () => (
  <Switch>
    <Route exact path='/users/edit/:id'>
      <UserFormView mode='edit' title='Редактировать пользователя' />
    </Route>
    <Route exact path='/users/add'>
      <UserFormView mode='add' title='Создать пользователя' />
    </Route>
    <Route exact path='/users/' component={UsersView} />

    <Redirect from='*' to='/users/' />
  </Switch>
)
