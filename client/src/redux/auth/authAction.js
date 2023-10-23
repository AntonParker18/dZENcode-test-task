import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { setUser } from '../user/userSlice'

const apiUrl = process.env.REACT_APP_API_URL

export const registration = createAsyncThunk(
  'user/register',
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/auth/registration`, {
        userName,
        email,
        password,
      })
      return data
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message)
      } else if (error.response?.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      })
      dispatch(setUser(data))
      return data
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ token }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/auth/logout`, { token })
      dispatch(setUser(null))
      return data
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getCaptcha = createAsyncThunk(
  'auth/getCaptcha',
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: 'image/svg+xml; charset=utf-8'
      }

      const {data} = await axios.get(`${apiUrl}/auth/captcha`, config)
      console.log(data)
      return data
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
