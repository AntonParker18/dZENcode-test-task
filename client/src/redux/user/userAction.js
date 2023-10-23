import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUser = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/user')
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
