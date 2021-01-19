import React, { useEffect } from 'react'
import * as yup from 'yup'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { FilterProps } from '../../interfaces/components.interfaces'
import {
  ID,
  Role,
  User,
  UserFilterFields,
} from '../../interfaces/entities.interfaces'
import { FilterLayout } from '../layouts/filter/FilterLayout'
import { useFormik } from 'formik'
import { useLocalStorage } from '../../hooks/local-storage.hook'

const roles = new Map<Role, string>([
  ['client', 'Клиент'],
  ['partner', 'Партнер'],
  ['admin', 'Администратор'],
])

const validationSchema = yup.object({
  email: yup.string(),
  name: yup.string(),
  phone: yup.string().max(20),
  role: yup.string().oneOf([...roles.keys()]),
  createdOn: yup.date(),
  updatedOn: yup.date(),
})

const initialValues = {
  email: '',
  name: '',
  password: '',
  phone: '',
  role: '',
  createdOn: new Date(),
  updatedOn: new Date(),
}

export const UserFilter: React.FC<FilterProps<ID<User>>> = ({ onFilter }) => {
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: () => {},
  })

  const filterInitialValue: UserFilterFields = {
    ...formik.values,
    role: formik.values.role as Role,
  }

  const [storedFilter, setStoredFilter] = useLocalStorage<UserFilterFields>(
    "users'-filter",
    filterInitialValue
  )

  const { email, role, phone, name } = formik.values

  const clearFilters = () => {
    formik.setValues(initialValues)
  }

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      ...storedFilter,
    })
  }, [])

  useEffect(() => {
    const newValue = {
      ...formik.values,
      role: formik.values.role as Role,
    }
    console.log(newValue)
    setStoredFilter(newValue)
  }, [formik.values])

  useEffect(() => {
    onFilter(
      item =>
        (!email.length || item.email.includes(email)) &&
        (!name.length ||
          item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!role.length || item.role === role) &&
        (!phone.length || item.phone.includes(phone))
    )
  }, [email, role, phone, name, onFilter])

  return (
    <FilterLayout onClear={clearFilters}>
      <Grid item xs={12}>
        <TextField
          {...formik.getFieldProps('email')}
          id='email'
          fullWidth
          label='Email'
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant='outlined' fullWidth>
          <InputLabel id='role-label'>{'Роль'}</InputLabel>
          <Select
            {...formik.getFieldProps('role')}
            id='role'
            labelId='role-label'
            label='Роль'
          >
            {[...roles].map(([role, label]) => (
              <MenuItem value={role} key={role}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...formik.getFieldProps('name')}
          id='name'
          fullWidth
          label='Имя'
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...formik.getFieldProps('phone')}
          id='phone'
          fullWidth
          label='Телефон'
          variant='outlined'
        />
      </Grid>
    </FilterLayout>
  )
}
