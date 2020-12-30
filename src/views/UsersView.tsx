import React from 'react'
import { Table } from '../components/table/Table'
import { useLocalStorage } from '../hooks/local-storage.hook'
import { HeadCell } from '../interfaces/components.interfaces'
import { ID, IDType, User } from '../interfaces/entities.interfaces'

export const UsersView: React.FC = () => {
  const headCells: Array<HeadCell<User>> = [
    { id: 'name', label: 'Имя' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Телефон' },
    { id: 'isAdmin', label: 'Администратор' },
    { id: 'createdOn', label: 'Создан' },
    { id: 'updatedOn', label: 'Обновлён' },
  ]

  const [users, setUsers] = useLocalStorage<Array<ID<User>>>('data-users', [])

  const onRemove = (identifiers: Array<IDType>) => {
    identifiers.forEach(id => {
      setUsers(users.filter(u => u.id !== id))
    })
  }
  console.log(users)
  const normalizedUsers: Array<ID<User>> = users.map(u => ({
    ...u,
    createdOn: new Date(u.createdOn).toLocaleString(),
    updatedOn: new Date(u.createdOn).toLocaleString(),
  }))

  return (
    <Table<User>
      data={normalizedUsers}
      title='Пользователи'
      headCells={headCells}
      onRemove={onRemove}
    />
  )
}
