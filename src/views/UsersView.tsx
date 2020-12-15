import React from 'react'
// import { Typography } from '@material-ui/core'
import { Table } from '../components/table/Table'
import { dateTime } from '../helpers/date.helpers'
import { HeadCell } from '../interfaces/components.interfaces'
import { ID, User } from '../interfaces/entities.interfaces'

export const UsersView: React.FC = () => {
  const data: Array<ID<User>> = [
    {
      id: '0',
      name: 'John',
      email: 'example@yandex.ru',
      password: '0000000000',
      phone: '+79507120993',
      role: 'User',
      createdOn: dateTime(new Date()),
      updatedOn: dateTime(new Date(228).toJSON()),
    },
  ]

  const headCells: Array<HeadCell<User>> = [
    { id: 'name', label: 'Имя' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Телефон' },
    { id: 'role', label: 'Роль' },
    { id: 'createdOn', label: 'Создан' },
    { id: 'updatedOn', label: 'Обновлён' },
  ]

  return (
    <>
      {/* <Typography variant='h4'>{'View all users'}</Typography> */}
      <Table
        data={data}
        title='Пользователи '
        headCells={headCells}
        onRemove={() => {}}
      />
    </>
  )
}
