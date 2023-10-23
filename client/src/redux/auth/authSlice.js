import { createSlice } from '@reduxjs/toolkit'
import { getCaptcha, login, logout, registration } from './authAction'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    success: null,
    loading: null,
    error: null,
    captcha: null,
  },
  reducers: {},
  extraReducers: {
    //Registration
    [registration.pending]: state => {
      state.success = false
      state.loading = true
      state.error = null
    },
    [registration.fulfilled]: (state, { payload }) => {
      state.token = payload.token
      state.loading = false
      state.success = true
    },
    [registration.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    //Login
    [login.pending]: state => {
      state.success = false
      state.loading = true
      state.error = null
    },
    [login.fulfilled]: (state, { payload }) => {
      state.token = payload.token
      state.success = true
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    //Logout
    [logout.pending]: state => {
      state.success = false
      state.loading = true
      state.error = null
    },
    [logout.fulfilled]: state => {
      state.token = null
      state.loading = false
      state.success = true
    },
    [logout.rejected]: (state, { payload }) => {
      state.token = null
      state.loading = false
      state.error = payload
    },
    //getCaptcha
    [getCaptcha.pending]: state => {
      state.success = null
      state.loading = true
      state.error = null
      state.captcha = null
    },
    [getCaptcha.fulfilled]: (state, { payload }) => {
      state.captcha = payload
      state.loading = false
      state.success = true
    },
    [getCaptcha.rejected]: (state, { payload }) => {
      state.token = null
      state.loading = false
      state.error = payload
    },
  },
})

// export const {
//   /* Ваши другие редукс-действия */
// } = authSlice.actions

export default authSlice.reducer
