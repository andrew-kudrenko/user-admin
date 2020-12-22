import { createSlice } from '@reduxjs/toolkit'
import { UsersState } from '../../interfaces/redux.interfaces'

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // addUser: {
    //   reducer: () => {},
    //   prepare: () => ({  })
    // }
  },
})

export default usersSlice.reducer

// export {  } = usersSlice.actions
