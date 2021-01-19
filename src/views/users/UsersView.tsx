import React from 'react'
import { UserFilter } from '../../components/filters/UserFilter'
import { Table } from '../../components/table/Table'
import { useFilteringState } from '../../hooks/filter-state.hook'
import { useLocalStorage } from '../../hooks/local-storage.hook'
import { HeadCell } from '../../interfaces/components.interfaces'
import { ID, IDType, Role, User } from '../../interfaces/entities.interfaces'

export const UsersView: React.FC = () => {
  const headCells: Array<HeadCell<User>> = [
    { id: 'name', label: 'Имя' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Телефон' },
    { id: 'role', label: 'Роль' },
    { id: 'createdOn', label: 'Создан' },
    { id: 'updatedOn', label: 'Обновлён' },
  ]

  const roles = new Map<Role, string>([
    ['client', 'Клиент'],
    ['partner', 'Партнер'],
    ['admin', 'Администратор'],
  ])

  const [users, setUsers] = useLocalStorage<Array<ID<User>>>('data-users', [])
  const [filtered, setFiltered] = useFilteringState<ID<User>>(users)

  const onRemove = (identifiers: Array<IDType>) => {
    setUsers(users.filter(u => !identifiers.includes(u.id)))
  }

  const normalizedUsers: Array<ID<User>> = filtered.map(u => ({
    ...u,
    createdOn: new Date(u.createdOn).toLocaleString(),
    updatedOn: new Date(u.updatedOn).toLocaleString(),
    role: roles.get(u.role) as Role,
  }))

  return (
    <Table<User>
      data={normalizedUsers}
      title='Пользователи'
      headCells={headCells}
      onRemove={onRemove}
      filter={<UserFilter onFilter={setFiltered} />}
    />
  )
}
