import { createSlice } from '@reduxjs/toolkit'
import { getUser } from './userAction'

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.userInfo = payload
    },
  },
  extraReducers: {
    //getUser
    [getUser.pending]: state => {
      state.success = false
      state.loading = true
      state.error = null
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
