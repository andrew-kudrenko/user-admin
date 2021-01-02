import React, { useEffect } from 'react'
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core'
import { DateTimePicker } from '@material-ui/pickers'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { EditorLayout } from '../../components/layouts/editor-layout/EditorLayout'
import { messages } from '../../helpers/form-validator-messages.helper'
import { useLocalStorage } from '../../hooks/local-storage.hook'
import { ID, IDType, User } from '../../interfaces/entities.interfaces'
import { EditorViewProps } from '../../interfaces/components.interfaces'
import { useIDParam } from '../../hooks/id-param.hook'

const validationSchema = yup.object({
  email: yup
    .string()
    .email(`${messages.incorrect} email адреса`)
    .required(messages.required),
  name: yup
    .string()
    .max(100, messages.lessThan(100))
    .required(messages.required),
  password: yup
    .string()
    .min(8, messages.lessThan(8))
    .max(32, messages.greaterThan(32))
    .required(messages.required),

  phone: yup.string().max(20, messages.lessThan(20)),
  isAdmin: yup.boolean(),
  createdOn: yup.date(),
  updatedOn: yup.date(),
})

export const UserFormView: React.FC<EditorViewProps> = props => {
  const [users, setUsers] = useLocalStorage<Array<ID<User>>>('data-users', [])

  const id = useIDParam() ?? uuidv4()

  const onRemove = (id: IDType) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const onAdd = (user: User) => {
    setUsers([{ ...user, id }, ...users])
  }

  const onUpdate = (user: ID<User>) => {
    const foundIndex = users.findIndex(u => u.id === user.id)

    if (foundIndex !== -1) {
      setUsers([
        ...[...users].slice(0, foundIndex),
        { ...user, updatedOn: new Date() },
        ...[...users].slice(foundIndex + 1),
      ])
    }
  }

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      name: '',
      password: '',
      phone: '',
      isAdmin: false,
      createdOn: new Date(),
      updatedOn: new Date(),
    },
    onSubmit: () => {},
  })

  useEffect(() => {
    if (props.mode === 'edit') {
      const user = users.find(u => u.id === id)

      if (user) {
        formik.setValues({
          ...user,
          createdOn: new Date(user.createdOn),
          updatedOn: new Date(user.updatedOn),
        })
      }
    }
    // eslint-disable-next-line
  }, [users])

  console.log(formik)

  return (
    <EditorLayout
      {...props}
      id={id}
      valid={
        !formik.isValidating &&
        formik.isValid &&
        !!Object.keys(formik.touched).length
      }
      onRemove={onRemove.bind(null, id)}
      onSave={
        props.mode === 'add'
          ? onAdd.bind(null, { ...formik.values })
          : onUpdate.bind(null, {
              ...formik.values,
              // Default value '' is for preventing destroy
              // invoked by undefinded value after
              // removing item from editor form
              id: users.find(u => u.id === id)?.id || '',
            })
      }
    >
      <Grid item xs={12}>
        <TextField
          {...formik.getFieldProps('email')}
          id='email'
          fullWidth
          label='Email'
          variant='outlined'
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...formik.getFieldProps('name')}
          id='name'
          fullWidth
          label='Имя'
          variant='outlined'
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...formik.getFieldProps('password')}
          id='password'
          fullWidth
          type='password'
          label='Пароль'
          variant='outlined'
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...formik.getFieldProps('phone')}
          id='phone'
          fullWidth
          label='Телефон'
          variant='outlined'
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DateTimePicker
          {...formik.getFieldProps('createdOn')}
          id='createdOn'
          readOnly
          fullWidth
          label='Дата создания'
          error={formik.touched.createdOn && Boolean(formik.errors.createdOn)}
          helperText={formik.touched.createdOn && formik.errors.createdOn}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DateTimePicker
          {...formik.getFieldProps('updatedOn')}
          id='updatedOn'
          readOnly
          fullWidth
          label='Дата изменения'
          error={formik.touched.updatedOn && Boolean(formik.errors.updatedOn)}
          helperText={formik.touched.updatedOn && formik.errors.updatedOn}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              id='isAdmin'
              name='isAdmin'
              checked={formik.values.isAdmin}
              onChange={formik.handleChange}
              color='secondary'
            />
          }
          label='Администратор'
        />
      </Grid>
      <Grid item xs={12}></Grid>
    </EditorLayout>
  )
}
